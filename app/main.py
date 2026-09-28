"""Ukrainian Text-to-Video app.

User pastes Ukrainian text -> natural Ukrainian TTS (Edge Neural, gTTS fallback)
is synthesized, and an MP4 is rendered with the same text BIG, BOLD and CENTERED.

Run as UI:
    streamlit run main.py
Run as CLI:
    uv run python main.py --text "Привіт! Це тестове відео." --out out.mp4
"""

from __future__ import annotations

import argparse
import asyncio
import os
import subprocess
import sys
import tempfile
import textwrap
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

# --------------------------------------------------------------------------
# Voices
# --------------------------------------------------------------------------

UK_VOICES = {
    "Ostap (male, natural)": "uk-UA-OstapNeural",
    "Polina (female, natural)": "uk-UA-PolinaNeural",
}

FORMATS = {
    "Vertical 9:16 (1080x1920) — Shorts/Reels/TikTok": (1080, 1920),
    "Square 1:1 (1080x1080)": (1080, 1080),
    "Horizontal 16:9 (1920x1080) — YouTube": (1920, 1080),
}

DEFAULT_FONT_CANDIDATES = [
    r"C:\Windows\Fonts\arialbd.ttf",  # Arial Bold, has Ukrainian Cyrillic
    r"C:\Windows\Fonts\arial.ttf",
    r"C:\Windows\Fonts\DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]


def find_bold_font() -> str | None:
    for p in DEFAULT_FONT_CANDIDATES:
        if os.path.exists(p):
            return p
    return None


# --------------------------------------------------------------------------
# TTS
# --------------------------------------------------------------------------


async def _edge_tts_save(text: str, voice: str, rate: str, out_mp3: Path) -> None:
    import edge_tts  # lazy import so CLI --help works without it

    communicate = edge_tts.Communicate(text, voice, rate=rate)
    await communicate.save(str(out_mp3))


def synthesize_ukrainian_tts(
    text: str, out_mp3: Path, voice: str = "uk-UA-OstapNeural", rate_percent: int = 0
) -> str:
    """Synthesize Ukrainian speech. Returns engine used: 'edge-tts' or 'gtts'.

    Edge-TTS (Microsoft neural voices) is much more natural and free, but needs
    internet. gTTS is the offline-tolerant fallback.
    """
    rate = f"{rate_percent:+d}%"  # edge-tts wants e.g. "+0%", "-10%"
    try:
        asyncio.run(_edge_tts_save(text, voice, rate, out_mp3))
        if out_mp3.stat().st_size > 1000:
            return "edge-tts"
        raise RuntimeError("edge-tts produced an empty file")
    except Exception as e:
        print(f"[tts] edge-tts failed ({e}), falling back to gTTS...", file=sys.stderr)
        from gtts import gTTS

        gTTS(text=text, lang="uk").save(str(out_mp3))
        return "gtts"


def audio_duration_sec(mp3_path: Path) -> float:
    from mutagen.mp3 import MP3

    audio = MP3(str(mp3_path))
    dur = float(audio.info.length)
    if dur <= 0:
        raise RuntimeError("Could not determine audio duration")
    return dur


# --------------------------------------------------------------------------
# Frame rendering (PIL) — big bold centered text
# --------------------------------------------------------------------------


def _load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    path = find_bold_font()
    if path:
        return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def wrap_text_to_width(
    draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, max_width: int
) -> list[str]:
    """Greedy word-wrap; collapses whitespace/newlines into flowable words."""
    words = text.split()
    if not words:
        return [""]
    lines: list[str] = []
    current = ""
    for w in words:
        trial = (current + " " + w).strip()
        if draw.textlength(trial, font=font) <= max_width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = w
            # a single word longer than the line: hard-break it
            while draw.textlength(current, font=font) > max_width and len(current) > 1:
                # binary-search a fitting prefix
                lo, hi = 1, len(current)
                while lo < hi:
                    mid = (lo + hi + 1) // 2
                    if draw.textlength(current[:mid] + "-", font=font) <= max_width:
                        lo = mid
                    else:
                        hi = mid - 1
                lines.append(current[:lo] + "-")
                current = current[lo:]
    if current:
        lines.append(current)
    return lines


def fit_font_size(
    text: str, width: int, height: int, max_font_size: int
) -> tuple[ImageFont.FreeTypeFont, list[str]]:
    """Find the largest bold font size so wrapped text fits the safe area."""
    probe = Image.new("RGB", (width, height))
    draw = ImageDraw.Draw(probe)
    max_w = int(width * 0.86)
    max_h = int(height * 0.72)
    size = max_font_size
    while size >= 20:
        font = _load_font(size)
        lines = wrap_text_to_width(draw, text, font, max_w)
        line_h = int(size * 1.22)
        block_h = line_h * len(lines)
        widest = max((draw.textlength(l, font=font) for l in lines), default=0)
        if block_h <= max_h and widest <= max_w:
            return font, lines
        size -= 4
    font = _load_font(20)
    return font, wrap_text_to_width(draw, text, font, max_w)


def _hex_to_rgb(h: str) -> tuple[int, int, int]:
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def make_background(
    width: int, height: int, top_hex: str, bottom_hex: str
) -> Image.Image:
    top = np.array(_hex_to_rgb(top_hex), dtype=np.float32)
    bottom = np.array(_hex_to_rgb(bottom_hex), dtype=np.float32)
    t = np.linspace(0, 1, height, dtype=np.float32)[:, None, None]
    row = top[None, None, :] * (1 - t) + bottom[None, None, :] * t
    bg = np.repeat(row, width, axis=1).astype(np.uint8)
    return Image.fromarray(bg, "RGB")


def render_frame(
    text: str,
    width: int,
    height: int,
    top_hex: str,
    bottom_hex: str,
    font_color: str,
    max_font_size: int,
) -> np.ndarray:
    """Render one BGR frame (OpenCV-ready) with big bold centered text."""
    img = make_background(width, height, top_hex, bottom_hex)
    draw = ImageDraw.Draw(img)
    font, lines = fit_font_size(text, width, height, max_font_size)

    line_h = int(font.size * 1.22)
    block_h = line_h * len(lines)
    y = (height - block_h) // 2

    stroke_w = max(2, font.size // 28)
    for line in lines:
        line_w = draw.textlength(line, font=font)
        x = (width - line_w) / 2  # centered horizontally
        draw.text(
            (x, y),
            line,
            font=font,
            fill=font_color,
            stroke_width=stroke_w,
            stroke_fill="black",
            align="center",
        )
        y += line_h

    return cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)


# --------------------------------------------------------------------------
# Video assembly
# --------------------------------------------------------------------------


def write_silent_mp4(
    frame_bgr: np.ndarray, duration_sec: float, tmp_mp4: Path, fps: int = 30
) -> None:
    h, w = frame_bgr.shape[:2]
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    out = cv2.VideoWriter(str(tmp_mp4), fourcc, fps, (w, h))
    if not out.isOpened():
        raise RuntimeError("OpenCV could not open VideoWriter (mp4v missing?)")
    n = max(1, int(round(duration_sec * fps)))
    for _ in range(n):
        out.write(frame_bgr)
    out.release()


def mux_audio(silent_mp4: Path, audio_mp3: Path, final_mp4: Path) -> None:
    """Mux with the static ffmpeg binary bundled by imageio-ffmpeg (no system ffmpeg needed)."""
    import imageio_ffmpeg

    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    cmd = [
        ffmpeg,
        "-y",
        "-i",
        str(silent_mp4),
        "-i",
        str(audio_mp3),
        "-c:v",
        "libx264",
        "-pix_fmt",
        "yuv420p",
        "-c:a",
        "aac",
        "-b:a",
        "160k",
        "-shortest",
        "-movflags",
        "+faststart",
        str(final_mp4),
    ]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0 or not final_mp4.exists():
        raise RuntimeError(f"ffmpeg mux failed:\n{r.stderr[-3000:]}")


def make_video(
    text: str,
    out_path: str | Path,
    voice: str = "uk-UA-OstapNeural",
    rate_percent: int = 0,
    size: tuple[int, int] = (1080, 1920),
    top_hex: str = "#0f2027",
    bottom_hex: str = "#2c5364",
    font_color: str = "white",
    max_font_size: int = 110,
    lead_sec: float = 0.4,
    tail_sec: float = 0.8,
    fps: int = 30,
    keep_audio: str | None = None,
) -> dict:
    """Full pipeline: text -> Ukrainian TTS mp3 -> centered-text MP4. Returns info dict."""
    text = " ".join(text.split())
    if not text:
        raise ValueError("Text is empty — nothing to speak or show.")
    out_path = Path(out_path)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    width, height = size

    with tempfile.TemporaryDirectory() as td:
        audio_mp3 = Path(td) / "tts.mp3"
        engine = synthesize_ukrainian_tts(text, audio_mp3, voice, rate_percent)
        dur = audio_duration_sec(audio_mp3)
        total = dur + lead_sec + tail_sec

        frame = render_frame(
            text, width, height, top_hex, bottom_hex, font_color, max_font_size
        )
        silent = Path(td) / "silent.mp4"
        write_silent_mp4(frame, total, silent, fps)
        mux_audio(silent, audio_mp3, out_path)

        if keep_audio:
            import shutil

            shutil.copy(audio_mp3, keep_audio)

    return {
        "out": str(out_path),
        "engine": engine,
        "audio_sec": round(dur, 2),
        "video_sec": round(total, 2),
        "size": f"{width}x{height}",
        "voice": voice,
    }


# --------------------------------------------------------------------------
# Streamlit UI
# --------------------------------------------------------------------------


def run_ui() -> None:
    import streamlit as st

    st.set_page_config(
        page_title="Українське текст-у-відео", page_icon="🎬", layout="centered"
    )
    st.title("🎬 Українське текст-у-відео")
    st.caption(
        "Введіть текст → природний український голос (TTS) + великі жирні титри по центру. Все автоматично."
    )

    text = st.text_area(
        "Текст (українською) — буде озвучено і показано на екрані",
        value="Слава Ісусу Христу!",
        height=150,
        max_chars=1500,
    )
    col1, col2 = st.columns(2)
    with col1:
        voice_label = st.selectbox("Голос", list(UK_VOICES), index=0)
        fmt_label = st.selectbox("Формат відео", list(FORMATS), index=0)
    with col2:
        rate = st.slider("Швидкість мовлення (%)", -30, 30, 0, 5)
        max_font = st.slider("Макс. розмір шрифту", 60, 180, 110, 5)

    col3, col4, col5 = st.columns(3)
    with col3:
        top_hex = st.color_picker("Фон (верх)", "#ffffff")
    with col4:
        bottom_hex = st.color_picker("Фон (низ)", "#ffffff")
    with col5:
        font_color = st.color_picker("Колір тексту", "#000000")

    if st.button("🎥 Згенерувати відео", type="primary", use_container_width=True):
        if not text.strip():
            st.warning("Введіть текст спочатку.")
            return
        with st.status("Генерація...", expanded=False) as status:
            st.write("🔊 Синтез українського TTS...")
            tmp_out = str(Path(tempfile.gettempdir()) / "uk_video.mp4")
            try:
                info = make_video(
                    text,
                    tmp_out,
                    voice=UK_VOICES[voice_label],
                    rate_percent=rate,
                    size=FORMATS[fmt_label],
                    top_hex=top_hex,
                    bottom_hex=bottom_hex,
                    font_color=font_color,
                    max_font_size=max_font,
                )
            except Exception as e:
                status.update(label="Помилка", state="error")
                st.error(f"Не вдалося: {e}")
                return
            status.update(label="Готово!", state="complete")
        st.success(
            f"Готово за {info['video_sec']}с відео · голос {info['voice']} · рушій {info['engine']}"
        )
        st.video(tmp_out)
        with open(tmp_out, "rb") as f:
            st.download_button(
                "⬇️ Завантажити MP4",
                f,
                file_name="ukrainian_video.mp4",
                mime="video/mp4",
                use_container_width=True,
            )


# --------------------------------------------------------------------------
# CLI
# --------------------------------------------------------------------------


def run_cli(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(
        description="Ukrainian text -> video with natural TTS + big bold centered text."
    )
    ap.add_argument(
        "--text", "-t", required=False, help="Ukrainian text to speak and display."
    )
    ap.add_argument(
        "--file", "-f", required=False, help="Read text from a .txt file (UTF-8)."
    )
    ap.add_argument(
        "--out", "-o", default="ukrainian_video.mp4", help="Output MP4 path."
    )
    ap.add_argument(
        "--voice",
        default="uk-UA-OstapNeural",
        help="Edge voice (uk-UA-OstapNeural / uk-UA-PolinaNeural).",
    )
    ap.add_argument(
        "--rate", type=int, default=0, help="Speech rate percent, e.g. -10, +10."
    )
    ap.add_argument(
        "--format", choices=["vertical", "square", "horizontal"], default="vertical"
    )
    ap.add_argument("--top", default="#0f2027", help="Background gradient top hex.")
    ap.add_argument(
        "--bottom", default="#2c5364", help="Background gradient bottom hex."
    )
    ap.add_argument("--font-color", default="white")
    ap.add_argument("--max-font", type=int, default=110)
    args = ap.parse_args(argv)

    text = args.text or ""
    if args.file:
        text = Path(args.file).read_text(encoding="utf-8")
    if not text.strip():
        ap.error("Provide --text or --file with non-empty content.")
    sizes = {
        "vertical": (1080, 1920),
        "square": (1080, 1080),
        "horizontal": (1920, 1080),
    }
    info = make_video(
        text,
        args.out,
        voice=args.voice,
        rate_percent=args.rate,
        size=sizes[args.format],
        top_hex=args.top,
        bottom_hex=args.bottom,
        font_color=args.font_color,
        max_font_size=args.max_font,
    )
    print(info)
    return 0


if __name__ == "__main__":
    try:
        import streamlit as st  # noqa

        if st.runtime.exists():
            run_ui()
        else:
            raise SystemExit(run_cli())
    except ImportError:
        raise SystemExit(run_cli())
