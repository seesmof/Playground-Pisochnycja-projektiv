import pandas as pd
import streamlit as st

title = "Математика"
icon = "🔢"
st.set_page_config(page_title=title, page_icon=icon)

df = pd.DataFrame(
    {
        "Імена": ["Зойка", "Бура", "Майка"],
        "Вік": [7, 9, 8],
        "Скільки принесла молока (літрів)": [32, 76, 35],
    }
)
st.dataframe(df)
