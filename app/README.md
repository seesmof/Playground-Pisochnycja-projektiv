# Українське текст-у-відео 🎬

Paste Ukrainian text → get an MP4 with a natural Ukrainian voiceover and the same
text rendered BIG, BOLD and CENTERED. Fully automated.

## Run (UI)

```bash
cd app
uv sync
uv run streamlit run main.py
```

UI options: male/female neural voice (Ostap/Polina), 9:16 / 1:1 / 16:9,
speech rate, background gradient, font size, MP4 preview + download.

## Run (CLI)

```bash
uv run python main.py --text "Слава Україні! Разом ми сильні." --out video.mp4
uv run python main.py --file text.txt --out video.mp4 --format vertical --voice uk-UA-PolinaNeural
```

## How it works

1. **TTS:** Edge-TTS neural Ukrainian voices (`uk-UA-OstapNeural` / `uk-UA-PolinaNeural`),
   automatic fallback to gTTS (`lang="uk"`) if offline.
2. **Frames:** Pillow renders one gradient background + auto-wrapped, auto-shrunk
   bold centered text (Arial Bold / DejaVuSans-Bold, black stroke for readability).
3. **Mux:** OpenCV writes silent MP4, then the static ffmpeg binary from
   `imageio-ffmpeg` muxes it with the TTS audio (H.264 + AAC, faststart).
   No system ffmpeg install needed. Video length = audio length + padding.
