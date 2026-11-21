from nicegui import ui

"""
Okay, so what do I want? I want ultimately a farm management app that will have reactivity. For this I need to learn events like how events work in nicegui and how the UI is updated.
"""

count: int = 0


def handle_increment():
    global count
    count += 1
    increment_button.set_text(f"Increment: {count}")


increment_button = ui.button(text=f"Increment: {count}", on_click=handle_increment)

ui.run()
