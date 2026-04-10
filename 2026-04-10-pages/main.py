from nicegui import ui


@ui.page("/admin")
def admin_page():
    ui.label("Welcome to the Admin page!")
    ui.link("Go back home", index)


@ui.page("/")
def index():
    ui.link("Admin", admin_page)


ui.run(favicon="🏢")
