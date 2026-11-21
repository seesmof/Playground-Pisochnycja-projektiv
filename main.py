from nicegui import ui

users = [
    {"id": 1, "name": "Elmer Lucas"},
    {"id": 2, "name": "Fannie Morales"},
    {"id": 3, "name": "Alex Waters"},
]

columns = [
    {"name": "id", "label": "ID", "field": "id"},
    {"name": "name", "label": "Full Name", "field": "name"},
]

table = ui.table(columns=columns, rows=users).classes("w-full")


def filter_users(event):
    query = event.value.lower()
    table.rows = [u for u in users if query in u["name"].lower()]


ui.input(label="Search users", on_change=filter_users)
ui.run()
