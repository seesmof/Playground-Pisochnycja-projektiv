# okay so im trying to learn streamlit and also i would love to learn to type with my all 10 fingers but its a bit tricky. also, i would love to know how to create a sidebar in streamlit. okay so im stuck a little bit. i dont know what to do. okay so perhaps the Lord is disallowing me to learn streamlit, in general i have to be very loose with this world, not have anything permamnent here, because im only a pilgrim and a комірник here, Amen.

import streamlit as st

st.set_page_config(page_title="Ферменеджер", page_icon="🐄")

column_kg, column_lbs = st.columns(2)
with column_kg:
    kg = st.number_input()
