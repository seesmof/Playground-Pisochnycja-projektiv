from nicegui import ui, app
from sqlmodel import SQLModel, Session, Field, create_engine, select


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


# Configurations
DATABASE_URL = "sqlite:///database.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
create_db_and_tables()
app.colors(primary="#4E7D3A")


class Land(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    area_hectares: float


def sidebar():
    with ui.left_drawer().classes("bg-green-50"):
        ui.button(
            text="Поля", icon="grass", on_click=lambda: ui.navigate.to("/fields")
        ).classes("w-full").props("flat align=left")


@ui.page("/")
def main_page():
    sidebar()


@ui.page("/fields")
def fields_page():
    sidebar()
    ui.label("Fields")


ui.run(title="Ферменеджер", favicon="🐑")
