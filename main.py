from nicegui import ui

with ui.header().classes("items-center flex justify-between"):
    ui.label("This Farm").classes("text-xl font-bold")

    ui.button(icon="menu", on_click=lambda: drawer.toggle())

with ui.left_drawer().classes("bg-gray-100") as drawer:
    ui.label("Navigation".upper()).classes("text-gray-500")

    ui.button(
        "Dashboard", icon="dashboard", on_click=lambda: ui.navigate.to("/")
    ).props(add="flat align=left").classes("w-full")

    ui.button(
        "Fields", icon="landscape", on_click=lambda: ui.navigate.to("/fields")
    ).props(add="flat align=left").classes("w-full")

    ui.button(
        "Animals", icon="pets", on_click=lambda: ui.navigate.to("/animals")
    ).props("flat align=left").classes("w-full")

    ui.button("Tasks", icon="task", on_click=lambda: ui.navigate.to("/tasks")).props(
        add="flat align=left"
    ).classes("w-full")

ui.label("Dashboard")

ui.run()
