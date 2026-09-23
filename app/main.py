import streamlit as st

number = st.slider("Оберіть номер", 0, 10)

st.write(f"Ви обрали: {number}")
st.write(f"Номер в квадраті: {number*number}")

st.set_page_config(page_title="Номер", page_icon="🔢")
