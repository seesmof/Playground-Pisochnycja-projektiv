from nicegui import ui


@ui.page("/store")
def store_page():
    ui.label("This is a store, praise King Jesus.")


@ui.page("/login")
def login_page():
    ui.label("This is a login page, praise King Jesus!")
    ui.link("Store", store_page)


@ui.page("/")
def index_page():
    ui.link("Store", store_page)
    ui.link("Login", login_page)


ui.run(favicon="🏪", title="Store App")
