import streamlit as st

title = "Ферма"
icon = "🐮"
st.set_page_config(page_title=title, page_icon=icon)

farm_name = st.text_input(label="Назва ферми", value="Ферма")
cows_number = st.slider(label="Кількість корів", min_value=0, max_value=12)
st.write(f"Ферма називається '{farm_name}' і має {cows_number} корівок.")
