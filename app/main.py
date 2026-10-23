import streamlit as st

st.set_page_config(page_title="Chat", page_icon="💭", layout="centered")
st.title("💭 Chat")

# Mock conversation state
if "messages" not in st.session_state:
    st.session_state.messages = [
        {
            "role": "assistant",
            "content": "Hi! This is mock data. Type something and I'll echo it.",
        },
        {"role": "user", "content": "Hello"},
        {"role": "assistant", "content": "Hello back! (mock reply)"},
    ]

# Render chat history
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# User's input
prompt = st.chat_input("Type a message...")
if prompt:
    # append users's message
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    # mock ai reply
    reply = f"You said: **{prompt}** (mock reply #{len(st.session_state.messages)})"
    st.session_state.messages.append({"role": "ai", "content": reply})
    with st.chat_message("assistant"):
        st.markdown(reply)
