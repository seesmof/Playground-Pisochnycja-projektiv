from dataclasses import dataclass
import tkinter as tk


class Status:
    PENDING = "Pending"
    DONE = "Done"


@dataclass
class Todo:
    name: str
    status: Status = Status.PENDING


root = tk.Tk()
root.title("Todos App")
root.geometry("600x400")

todos = [
    Todo(name="Finish this app", status=Status.PENDING),
    Todo(name="Contact a teacher about diploma", status=Status.DONE),
]


def format_todo(todo_item: Todo):
    return f"{'✅' if todo_item.status == Status.DONE else '❌'} {todo_item.name}"


def submit_todo():
    todo_text = input_box.get()
    todo_item = Todo(name=todo_text)
    todos.append(format_todo(todo_item))


input_box = tk.Entry(root)
input_box.pack(padx=3, pady=3, fill="x")

submit_button = tk.Button(root, text="Submit", command=submit_todo)
submit_button.pack(padx=3)

listbox = tk.Listbox(root)
listbox.pack(padx=3, pady=3, fill="both", expand=True)
for item in todos:
    listbox.insert(tk.END, format_todo(item))

if __name__ == "__main__":
    root.mainloop()
