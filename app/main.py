import streamlit as st
from sqlmodel import Session, col, select, desc

from db import engine, init_db
from models import Chat, Message, Role

init_db()

# --- Sidebar: chats list ---
st.sidebar.title("Чати")

if "selected_chat_id" not in st.session_state:
    st.session_state.selected_chat_id = None

if st.sidebar.button("Новий чат"):
    with Session(engine) as s:
        chat = Chat(title="Новий чат")
        s.add(chat)
        s.commit()
        s.refresh(chat)
        st.session_state.selected_chat_id = chat.id
    st.rerun()

with Session(engine) as s:
    chats = s.exec(select(Chat).order_by(col(Chat.created_at).desc())).all()

for c in chats:
    if st.sidebar.button(c.title, key=f"chat_{c.id}"):
        st.session_state.selected_chat_id = c.id
        st.rerun()

# default to first chat if none selected
if st.session_state.selected_chat_id is None and chats:
    st.session_state.selected_chat_id = chats[0].id

chat_id = st.session_state.selected_chat_id

if chat_id is None:
    st.info("Створіть новий чат щоб почати роботу.")
    st.stop()

# --- Main: selected chat ---
with Session(engine) as s:
    chat = s.get(Chat, chat_id)
    messages = s.exec(
        select(Message)
        .where(Message.chat_id == chat_id)
        .order_by(col(Message.created_at))
    ).all()

st.title(chat.title if chat else "Чат")

for m in messages:
    with st.chat_message(m.role):
        st.markdown(m.content)


prompt = st.chat_input("Введіть повідомлення...")
if prompt:
    with Session(engine) as s:
        s.add(Message(chat_id=chat_id, role=Role.user, content=prompt))
        s.commit()

        reply = f"Ви сказали: {prompt}"
        s.add(Message(chat_id=chat_id, role=Role.ai, content=reply))
        s.commit()
    st.rerun()
