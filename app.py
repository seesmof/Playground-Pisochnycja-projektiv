from __future__ import annotations

import streamlit as st

from tts_service import VOICES, generate_audio
from video_service import create_video, video_duration

st.set_page_config(page_title="Bible verse studio", page_icon=":material/menu_book:", layout="wide")
st.title("Bible verse video")
st.caption("Створіть відео 9:16 українською: текст вірша, озвучка та готове MP4.")

with st.form("verse_form", border=False):
    verse = st.text_area(
        "Текст вірша",
        placeholder="Наприклад: «Бо так Бог полюбив світ, що віддав Сина Свого Єдинородного…»",
        height=180,
    )
    voice = st.selectbox("Український голос", list(VOICES.keys()), key="voice")
    rate = st.select_slider("Темп озвучення", options=["-10%", "+0%", "+10%"], value="+0%")
    submitted = st.form_submit_button("Створити відео", type="primary", icon=":material/movie:")

if submitted:
    if not verse.strip():
        st.warning("Спочатку введіть текст вірша.")
        st.stop()
    try:
        with st.spinner("Генерую українську озвучку..."):
            audio_path = generate_audio(verse.strip(), VOICES[voice], rate=rate)
        st.audio(str(audio_path), format="audio/mp3")
        with st.spinner("Малюю кадр і збираю відео..."):
            video_path, cover_path = create_video(verse.strip(), audio_path)
        with st.container(border=True):
            preview_col, info_col = st.columns([2, 1])
            with preview_col:
                st.video(str(video_path))
            with info_col:
                st.metric("Формат", "1080 × 1920")
                st.metric("Тривалість", f"{video_duration(video_path):.1f} с")
                st.download_button(
                    "Завантажити MP4",
                    data=video_path.read_bytes(),
                    file_name="bible-verse-uk.mp4",
                    mime="video/mp4",
                    type="primary",
                    icon=":material/download:",
                )
                st.image(str(cover_path), caption="Постер", width=180)
    except Exception as exc:
        st.error(f"Не вдалося створити відео: {exc}")