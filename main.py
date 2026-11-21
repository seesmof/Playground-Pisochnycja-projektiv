from nicegui import ui, app
from sqlmodel import SQLModel, Session, Field, create_engine, select


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


# Configurations
DATABASE_URL = "sqlite:///sqlite.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
app.colors(primary="#4E7D3A")


# Land CRUD
class Land(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    area: float


def create_land(name: str, area: float) -> Land:
    with Session(engine) as s:
        land = Land(name=name, area=area)
        s.add(land)
        s.commit()
        s.refresh(land)
        return land


def get_lands() -> list[Land]:
    with Session(engine) as s:
        lands = s.exec(select(Land)).all()
        return list(lands)


def get_land(land_id: int) -> Land | None:
    with Session(engine) as s:
        land = s.get(Land, land_id)
        return land


def update_land(
    land_id: int | None = None, name: str | None = None, area: float | None = None
) -> Land | None:
    with Session(engine) as s:
        land = s.get(Land, land_id)
        if land is None:
            return None
        if name is not None:
            land.name = name
        if area is not None:
            land.area = area
        s.commit()
        return land


def delete_land(land_id: int) -> bool:
    with Session(engine) as s:
        land = s.get(Land, land_id)
        if land:
            s.delete(land)
            s.commit()
            return True
        return False


# Pages and UI
def sidebar():
    with ui.left_drawer().classes("bg-green-50"):
        ui.button(
            text="Головна", icon="home", on_click=lambda: ui.navigate.to("/")
        ).classes("w-full").props("flat align=left")
        ui.button(
            text="Поля", icon="grass", on_click=lambda: ui.navigate.to("/fields")
        ).classes("w-full").props("flat align=left")


@ui.page("/")
def main_page():
    sidebar()


@ui.page("/fields")
def fields_page():
    def add_land():
        if not name_input.value:
            ui.notify("Введіть назву поля", color="negative")
            return
        if area_input.value is None:
            ui.notify("Введіть площу поля", color="negative")

        create_land(name=name_input.value, area=float(area_input.value or 0.0))

        ui.notify("Поле додано", color="positive")
        d.close()
        list_lands.refresh()

    @ui.refreshable
    def list_lands():
        lands = get_lands()
        if not lands:
            ui.label("Жодного поля не додано 🌱").classes("text-gray-600 text-lg")
            return
        with ui.row().classes("gap-3"):
            for land in lands:
                with ui.card():
                    ui.label(f'Поле "{land.name}"').classes("font-medium")
                    ui.label(str(land.area)).classes("text-green-700")
                    with ui.row().classes("gap-3"):
                        ui.button("Змінити", color="primary")
                        ui.button("Видалити", color="negative")

    @ui.refreshable
    def show_stats():
        lands = get_lands()

        total_lands = len(lands)
        average_area = sum(land.area for land in lands) / total_lands
        largest_field = max(lands, key=lambda l: l.area)

        with ui.row().classes("w-full gap-3"):
            with ui.card().classes("flex-1 min-w-64"):
                ui.label("Загалом полів")
                ui.label(str(total_lands)).classes("font-bold text-lg")
            with ui.card().classes("flex-1 min-w-64"):
                ui.label("Середня площа поля")
                ui.label(f"{average_area:.2f} га").classes("font-bold text-lg")
            with ui.card().classes("flex-1 min-w-64"):
                ui.label("Найбільше поле")
                ui.label(f'Поле "{largest_field.name}"').classes("font-bold text-lg")

    sidebar()
    with ui.dialog() as d, ui.card():
        name_input = ui.input(
            label="Назва (або номер)",
        ).classes("w-full")
        area_input = ui.number(label="Площа поля (га)").classes("w-full")
        with ui.row().classes("flex justify-end w-full"):
            ui.button("Відмінити", on_click=d.close).props("flat")
            ui.button(
                "Додати",
                icon="check",
                on_click=add_land,
            )

    ui.label("Статистика").classes("text-lg")
    show_stats()
    ui.label("Поля").classes("text-lg mt-7")
    ui.button(text="Додати нове поле", icon="add", on_click=d.open)
    list_lands()


create_db_and_tables()
ui.run(title="Ферменеджер", favicon="🐑")
