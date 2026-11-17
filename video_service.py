from __future__ import annotations

import subprocess
import tempfile
from pathlib import Path

from moviepy import AudioFileClip, ImageClip

from render import render_frame


def video_duration(path: Path) -> float:
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", str(path)],
        check=True,
        capture_output=True,
        text=True,
    )
    return float(result.stdout.strip())


def create_video(text: str, audio_path: Path) -> tuple[Path, Path]:
    audio = AudioFileClip(str(audio_path))
    cover_path = Path(tempfile.mkdtemp(prefix="bible_verse_")) / "frame.png"
    render_frame(text, cover_path)
    output_path = Path(tempfile.mkdtemp(prefix="bible_verse_")) / "video.mp4"
    video = ImageClip(str(cover_path)).with_duration(audio.duration)
    video.write_videofile(
        str(output_path),
        fps=30,
        codec="libx264",
        audio_codec="aac",
        audio=str(audio_path),
        temp_audiofile=str(output_path.with_suffix(".m4a")),
        remove_temp=True,
        threads=4,
        logger=None,
    )
    audio.close()
    video.close()
    return output_path, cover_path