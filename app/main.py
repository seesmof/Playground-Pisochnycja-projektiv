from pathlib import Path
import streamlit as st

from generator import build_model, generate, load_words

st.title("Bible text generator")


@st.cache_data
def get_model():
    words = load_words(Path(__file__).parent / ".." / "Bible.txt")
    return build_model(words)


model = get_model()

seed = st.text_input("Seed text")
length = st.slider("Words", 10, 200, 60)

if st.button("Generate"):
    st.write(generate(model, seed, length))
