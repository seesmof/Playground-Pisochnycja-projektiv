from dataclasses import dataclass
import tkinter as tk


class Status:
    PENDING = "Pending"
    DONE = "Done"


@dataclass
class Todo:
    name: str
    status: Status = Status.PENDING


todos = [
    Todo(name="Finish this app", status=Status.PENDING),
    Todo(name="Contact a teacher about diploma", status=Status.DONE),
]


def format_status(status):
    return "✅" if status == Status.DONE else "❌"


def show_todos():
    for item in todos:
        print(f"{format_status(item.status)}. {item.name}")


while True:
    print()
    todo_text = input("Please enter todo's text: ")
    new_todo = Todo(name=todo_text)
    todos.append(new_todo)
    show_todos()
    print()
