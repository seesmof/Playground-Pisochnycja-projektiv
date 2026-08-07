import streamlit as st
import pandas as pd
import sqlite3

st.title("First App")

user_name = st.text_input("What is your name?", "Guest")

if st.button("Greet!"):
    st.success(f"Hallelujah! Greetings, {user_name}")

number = st.slider("Select a project scope", 1, 100, 50)
st.write(f"Your scope: {number}")
