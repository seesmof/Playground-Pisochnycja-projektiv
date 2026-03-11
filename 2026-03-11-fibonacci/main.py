from nicegui import ui


def fibonacci(n: int) -> int:
    if n == 0:
        return 0
    if n == 1:
        return 1
    if n == 2:
        return 1
    return fibonacci(n - 1) + fibonacci(n - 2)


class State:
    def __init__(self):
        self.n: int = 0
        self.res: int = 0

    def calculate(self):
        self.res = fibonacci(self.n)


state = State()

ui.number("Input").bind_value(state, "n")
ui.button("Calcualte", on_click=state.calculate)
ui.label().bind_text_from(state, "res").classes("text-xl font-bold")

ui.run(title="Fibonacci", favicon="🔎")
