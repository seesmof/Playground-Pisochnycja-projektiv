"""Streamlit-застосунок генерації тексту на основі локальної відкритої LLM (TinyLlama)."""

from __future__ import annotations

import streamlit as st
from transformers import pipeline

MODEL_NAME = "Qwen/Qwen2.5-1.5B-Instruct"

st.set_page_config(page_title="Генерація тексту (NLP)", page_icon=":material/edit_note:", layout="centered")
st.title("Генерація тексту")
st.caption("Локальна відкрита LLM (TinyLlama) працює на вашому комп'ютері.")

@st.cache_resource
def load_generator():
    return pipeline("text-generation", model=MODEL_NAME)

prompt = st.text_area("Запит (prompt)", value="Розкажи коротку історію про кіта.", height=120)
max_new_tokens = st.slider("Макс. нових токенів", 10, 300, 120)
temperature = st.slider("Температура", 0.1, 1.5, 0.7, 0.1)

if st.button("Згенерувати", type="primary", disabled=not prompt.strip()):
    with st.spinner("Генерую..."):
        gen = load_generator()
        out = gen(prompt, max_new_tokens=max_new_tokens, temperature=temperature, do_sample=True)
    st.text_area("Результат", value=out[0]["generated_text"], height=260)
    st.success("Готово")
