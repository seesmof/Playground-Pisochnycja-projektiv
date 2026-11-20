import os
from sqlmodel import Session, SQLModel, Field, create_engine
from nicegui import ui


class Task(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    content: str
    is_completed: bool = False


sqlite_file_name = "sqlite:///database.db"
engine = create_engine(sqlite_file_name)


def create_database_and_tables():
    SQLModel.metadata.create_all(engine)


create_database_and_tables()

with ui.column().classes("max-w-3xl mx-auto p-3 w-full"):
    ui.label("Task Manager")
    ui.button("Click")

ui.run()
