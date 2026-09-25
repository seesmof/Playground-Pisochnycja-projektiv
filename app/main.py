import streamlit as st


def change_nickname():
    title.value = "Зорька"


def main():
    title = st.text_input("Кличка коровки")
    st.button(label="Привіт", on_click=change_nickname)


if __name__ == "__main__":
    main()
