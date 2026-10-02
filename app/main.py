"""Bible-style text generator (word-level Markov chain)."""

from pathlib import Path

import streamlit as st

from generator import build_model, generate, load_verses, to_wall_of_text, tokenize

st.set_page_config(page_title="Bible text generator", layout="centered")

st.title("Bible text generator")
st.caption(
    "Word-level Markov chain trained on your Bible.txt. Converts `BOOK CH:VERSE TEXT` to a wall of text, then generates new verses in the same style."
)

BASE_DIR = Path(__file__).parent
DEFAULT_PATH = BASE_DIR / ".." / "Bible.txt"


@st.cache_data(ttl="1h", max_entries=5)
def load_corpus(path: str) -> tuple[tuple[str, ...], tuple[str, ...]]:
    verses = load_verses(path)
    wall = to_wall_of_text(verses)
    return tuple(verses), tuple(tokenize(wall))


st.sidebar.header("Corpus")
corpus_path = st.sidebar.text_input("Bible file path", value=str(DEFAULT_PATH))

try:
    verses, tokens = load_corpus(corpus_path)
except FileNotFoundError:
    st.error(f"File not found: {corpus_path}")
    st.stop()

st.sidebar.metric("Verses", f"{len(verses):,}".replace(",", " "))
st.sidebar.metric("Words", f"{len(tokens):,}".replace(",", " "))
with st.expander("Corpus preview"):
    st.text("\n".join(verses[:5]))

st.header("Generation settings")
with st.form("gen_form", border=False):
    seed = st.text_input("Seed text", placeholder="e.g. І рече Бог")
    col1, col2 = st.columns(2)
    with col1:
        order = st.slider("Order (context size)", 1, 4, 2)
        length = st.slider("Words to generate", 10, 200, 60)
    with col2:
        temperature = st.slider("Temperature (creativity)", 0.1, 2.0, 1.0, step=0.1)
        rng_seed = st.number_input("Random seed (0 = random)", 0, 999999, 0, step=1)
    submitted = st.form_submit_button("Generate", icon=":material/auto_awesome:")

result_slot = st.container()
if submitted:
    with result_slot.skeleton():
        model = build_model(list(tokens), order=order)
        text = generate(
            model,
            length=length,
            seed=seed.strip(),
            temperature=temperature,
            rng_seed=None if rng_seed == 0 else int(rng_seed),
        )
        result_slot.subheader("Generated text")
        result_slot.write(text)
elif "last_text" not in st.session_state:
    st.info("Set the options and press Generate.")
