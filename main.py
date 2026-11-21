from nicegui import ui

"""
Okay, we need a counter app that will be prevented from going below zero, with a decreased and increased buttons.
"""

count: int = 0


def update_count_label(count: int) -> None:
    count_label.set_text(str(count))

    if count == 0:
        count_label.classes(remove="text-green-700", add="text-red-700")
    else:
        count_label.classes(add="text-green-700", remove="text-red-700")


def handle_decrement():
    global count
    if count > 0:
        count -= 1
    update_count_label(count)


def handle_increment():
    global count
    count += 1
    update_count_label(count)


def handle_reset():
    global count
    count = 0
    update_count_label(count)


with ui.row().classes("flex flex-row gap-3 items-center"):
    decrement_button = ui.button(text="Decrease", on_click=handle_decrement)
    count_label = ui.label(text=str(count)).classes("font-bold")
    increment_button = ui.button(text="Increase", on_click=handle_increment)

reset_button = ui.button(text="Reset", on_click=handle_reset)

"""
Okay, so conditionally applying classes don't work for some reason but applying it in the update on click events works. Why?
"""

ui.run(title="Clicker", favicon="📎")
