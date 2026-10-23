import streamlit as st
from sqlmodel import Session, col, select

from llm import generate_reply, load_model
from db import engine, init_db
from models import Message, Role

init_db()

st.title("💭 Чат")


@st.cache_resource
def get_model():
    return load_model()


with st.spinner("Завантаження моделі (лише у перший раз)..."):
    tokenizer, model = get_model()

with Session(engine) as s:
    rows = s.exec(select(Message).order_by(col(Message.created_at))).all()
    history = [{"role": r.role.value, "content": r.content} for r in rows]

if history:
    if st.button("🗑️ Очистити чат"):
        with Session(engine) as s:
            rows = s.exec(select(Message)).all()
            for r in rows:
                s.delete(r)
            s.commit()
        st.rerun()

if not history:
    st.info("Напишіть щось у полі нижче, щоби почати розмову...")
for h in history:
    with st.chat_message(h["role"]):
        st.markdown(h["content"])

prompt = st.chat_input("Введіть повідомлення...")
if prompt:
    with Session(engine) as s:
        s.add(Message(role=Role.user, content=prompt))
        s.commit()

    history_for_llm = history + [{"role": "user", "content": prompt}]

    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        with st.spinner("Думаю..."):
            reply = generate_reply(tokenizer, model, history_for_llm)
        st.markdown(reply)

    with Session(engine) as s:
        s.add(Message(role=Role.ai, content=reply))
        s.commit()
    st.rerun()
