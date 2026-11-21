from nicegui import ui, app
from sqlmodel import SQLModel, Session, create_engine


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


# Configurations
DATABASE_URL = "sqlite:///database.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
create_db_and_tables()
app.colors(primary="#4E7D3A")


def navbar():
    with ui.header().classes("flex items-center justify-between"):
        ui.link(text="Ферменеджер", target="/").classes("text-white no-underline")
        # ui.button(icon="menu")


def sidebar():
    with ui.left_drawer().classes("bg-green-50"):
        ui.button(
            text="Поля", icon="grass", on_click=lambda: ui.navigate.to("/fields")
        ).classes("w-full").props("flat align=left")


@ui.page("/")
def main_page():
    navbar()
    sidebar()


@ui.page("/fields")
def fields_page():
    navbar()
    sidebar()
    ui.label("Fields")


ui.run(title="Ферменеджер", favicon="🐴")
