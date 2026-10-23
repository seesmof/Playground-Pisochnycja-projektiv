import streamlit as st
from sqlmodel import Session, col, select

from db import engine, init_db
from models import Message, Role

init_db()

st.title("💭 Чат")

with Session(engine) as s:
    messages = s.exec(select(Message).order_by(col(Message.created_at))).all()

if messages:
    if st.button("🗑️ Очистити чат"):
        with Session(engine) as s:
            rows = s.exec(select(Message)).all()
            for r in rows:
                s.delete(r)
            s.commit()
        st.rerun()

if not messages:
    st.info("Напишіть щось у полі нижче щоби почати розмову...")
for m in messages:
    with st.chat_message(m.role):
        st.markdown(m.content)

prompt = st.chat_input("Введіть повідомлення...")
if prompt:
    with Session(engine) as s:
        s.add(Message(role=Role.user, content=prompt))
        s.commit()

        reply = f"Ви сказали: {prompt}"
        s.add(Message(role=Role.ai, content=reply))
        s.commit()
    st.rerun()
