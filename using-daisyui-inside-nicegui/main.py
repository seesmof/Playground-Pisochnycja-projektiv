from nicegui import ui

# 1. Tell NiceGUI where your local CSS file is
# This ensures it works even if your Wi-Fi is down later
ui.add_head_html('<link rel="stylesheet" href="static/daisyui.css">')

with ui.column().classes("p-8 gap-4"):
    ui.label("DaisyUI + NiceGUI").classes("text-3xl font-bold")

    # 2. Using DaisyUI Components
    # We use .classes() to apply DaisyUI names like 'btn' or 'card'
    with ui.row():
        ui.button("Primary").classes("btn btn-primary")
        ui.button("Secondary").classes("btn btn-secondary")
        ui.button("Outline").classes("btn btn-outline btn-accent")

    # 3. A DaisyUI Card
    with ui.element("div").classes("card w-96 bg-base-100 shadow-xl border"):
        with ui.element("div").classes("card-body"):
            ui.label("Modern Card").classes("card-title")
            ui.label("This card looks great and uses pure DaisyUI classes.")
            with ui.element("div").classes("card-actions justify-end"):
                ui.button("Buy Now").classes("btn btn-primary")

ui.run()
