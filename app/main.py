from sqlmodel import Field, Session, SQLModel, create_engine, select
import streamlit as st


class Task(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    content: str
    isCompleted: bool = Field(default=False)


# SQLModel config
sqlite_url = "sqlite:///./database.db"
engine = create_engine(sqlite_url)
SQLModel.metadata.create_all(engine)

# Streamlit config
st.set_page_config(page_title="Tasks Manager", page_icon="📋")

with Session(engine) as s:
    all_tasks = s.exec(select(Task)).all()
    for task in all_tasks:
        left, right = st.columns([0.8, 0.2])
