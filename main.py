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


def create_land(name: str, area: float) -> Land:
    with Session(engine) as s:
        land_object = Land(name=name, area_hectares=area)
        s.add(land_object)
        s.commit()
        s.refresh(land_object)
        return land_object


def get_lands() -> list[Land]:
    with Session(engine) as s:
        lands = s.exec(select(Land)).all()
        return list(lands)


def get_land(id: int) -> Land | None:
    with Session(engine) as s:
        land = s.exec(select(Land).where(Land.id == id)).first()
        if not land:
            return None
        return land


def update_land(name: str = "", area: float = 0.0) -> bool:
    with Session(engine) as s:
        land_object = s.exec(select(Land).where(Land.name == name)).first()
        if not land_object:
            return False
        if name:
            land_object.name = name
        if area:
            land_object.area_hectares = area
        s.commit()
        s.refresh(land_object)
        return True


def delete_land(id: int) -> bool:
    with Session(engine) as s:
        land_object = s.get(Land, id)
        if land_object:
            s.delete(land_object)
            s.commit()
            return True
        return False


def create_sidebar_button(text: str, icon_name: str, route: str):
    return (
        ui.button(text=text, icon=icon_name, on_click=lambda: ui.navigate.to(route))
        .classes("w-full")
        .props("flat align=left")
    )


def sidebar():
    with ui.left_drawer().classes("bg-green-50"):
        create_sidebar_button("Головна", "home", "/")
        create_sidebar_button("Поля", "grass", "/fields")


@ui.page("/")
def main_page():
    sidebar()


@ui.page("/fields")
def fields_page():
    sidebar()
    with ui.dialog() as d, ui.card():
        name_input = ui.input(
            label="Назва (або номер)",
        )
        area_input = ui.number(label="Площа поля (га)")
        with ui.row().classes("flex justify-end w-full"):
            ui.button("Відмінити", on_click=d.close)
            ui.button("Додати", icon="check", on_click=lambda: create_field())

    ui.label("Fields").classes("font-bold text-3xl")
    ui.button(text="Додати нове поле", icon="add", on_click=d.open)


ui.run(title="Ферменеджер", favicon="🐑")
