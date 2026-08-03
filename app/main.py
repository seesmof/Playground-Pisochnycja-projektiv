from dataclasses import dataclass
from nicegui import ui


@dataclass
class CartItme:
    name: str
    price: int


class State:
    cart_items: list[CartItme] = []


def add_new_item():
    new_cart: CartItme = CartItme(name="iPhone 15 Max", price=1000)
    State.cart_items.append(new_cart)
    main_page.refresh()


@ui.refreshable
def main_page():
    ui.button("Add", on_click=add_new_item)

    for item in State.cart_items:
        ui.label(f"{item.name} costs ${item.price}")


main_page()
ui.run(favicon="👜", title="Shopper")
