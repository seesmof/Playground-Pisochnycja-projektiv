# okay so im trying to learn streamlit and also i would love to learn to type with my all 10 fingers but its a bit tricky. also, i would love to know how to create a sidebar in streamlit.

import streamlit as st


def main():
    st.set_page_config(page_title="Ферменеджер", page_icon="🐄")

    st.subheader(body="Корівки файні", icon="🐮", help="Які корівки?")


if __name__ == "__main__":
    main()
