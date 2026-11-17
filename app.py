"""
Bible verse video - the web page.

This is the only file Streamlit runs. It contains the whole user interface:
one text box, one voice picker, one speed slider, one button.

Everything else lives in small helper files:
    config.py  -> all the numbers and names
    tts.py     -> text to speech (MP3)
    frame.py   -> the still picture of the verse (PNG)
    video.py   -> MP4 made from picture + MP3

Run it with:  streamlit run app.py
"""

from __future__ import annotations

import streamlit as st

from config import DEFAULT_RATE, DEFAULT_VOICE, SPEECH_RATES, VOICES
from tts import make_speech
from video import build_video

# Page settings must be the first Streamlit call.
st.set_page_config(
    page_title="Bible verse studio",
    page_icon=":material/menu_book:",
    layout="centered",
)

st.title("Bible verse video")
st.caption("Український текст вірша → вертикальне відео 9:16 з озвучкою.")

# ---------------------------------------------------------------------------
# 1. The form
# ---------------------------------------------------------------------------
verse = st.text_area(
    "Текст вірша",
    placeholder="Бо так Бог полюбив світ, що віддав Сина Свого Єдинородного…",
    height=180,
)

# VOICES maps a readable label ("Polina (жіночий)") to a technical voice name.
voice_label = st.selectbox("Голос", list(VOICES), index=0)

# st.select_slider gives a slider with a few fixed stops - no free typing.
# Options come from config so the list stays in one place.
initial_rate = SPEECH_RATES.index(DEFAULT_RATE)
rate = st.select_slider("Темп озвучення", options=SPEECH_RATES, value=SPEECH_RATES[initial_rate])

# The button is disabled while the box is empty, so we never run with no text.
generate = st.button(
    "Створити відео",
    type="primary",
    icon=":material/movie:",
    disabled=not verse.strip(),
)

# ---------------------------------------------------------------------------
# 2. Generation
# ---------------------------------------------------------------------------
# Nothing below runs until the user clicks the button.
if generate:
    # `verse` is a text box: users often add spaces and newlines around the
    # verse, which would be spoken aloud, so we clean it up here.
    clean_verse = verse.strip()

    try:
        # --- Step 1: speech ------------------------------------------------
        with st.spinner("Озвучую текст українською… (10–30 с)"):
            audio_path = make_speech(clean_verse, VOICES[voice_label], rate)

        # Let the user listen to the voice-over right away.
        st.audio(str(audio_path), format="audio/mp3")

        # --- Step 2: video -------------------------------------------------
        with st.spinner("Малюю кадр і збираю відео…"):
            # The audio file already sits in its own temporary folder, so the
            # video files are written next to it.
            video_path, frame_path, duration = build_video(clean_verse, audio_path, audio_path.parent)

        # --- Step 3: result ------------------------------------------------
        st.video(str(video_path))

        # Read the finished file into memory: it is small (a few hundred KB for
        # a short verse) and this is what the download button hands to the browser.
        mp4_bytes = video_path.read_bytes()

        st.download_button(
            "Завантажити відео (MP4)",
            data=mp4_bytes,
            file_name="bible-verse-uk.mp4",
            mime="video/mp4",
            type="primary",
            icon=":material/download:",
        )

        st.caption(f"Тривалість: {duration:.1f} с · 1080×1920 · MP4 (H.264 + AAC)")

    # Any failure (no internet, Edge TTS busy, FFmpeg missing) is shown inside
    # the page instead of crashing the app.
    except Exception as error:  # noqa: BLE001 - we want to show every reason
        st.error(f"Не вдалося створити відео: {error}")