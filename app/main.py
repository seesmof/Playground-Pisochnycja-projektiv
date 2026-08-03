from dataclasses import dataclass
from nicegui import ui


@dataclass
class CartItme:
    name: str
    price: int


class State:
    cart_items: list[CartItme] = []


@ui.refreshable
def main_page():
    ui.button(on_click=...)

    for item in State.cart_items:
        ui.label(f"{item.name} costs ${item.price}")


main_page()
ui.run(favicon="👜", title="Shopper")
