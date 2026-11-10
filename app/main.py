import streamlit as st

st.set_page_config(
    page_title="Карусель",
    page_icon="🎠",
)


def handle_back():
    print(st.session_state.tab)


def handle_forward():
    st.session_state.tab = tabs_data[int(st.session_state.tab) + 1 % len(tabs_data)]


prev_button = st.button("Назад", on_click=handle_back)
next_button = st.button("Вперед", on_click=handle_forward)

tabs_data = ["One", "Two", "Three"]
tab_one, tab_two, tab_three = st.tabs(tabs_data, key="tab", on_change="rerun")

with tab_one:
    st.header("Tab One")
with tab_two:
    st.header("Tab Two")
with tab_three:
    st.header("Tab Three")
