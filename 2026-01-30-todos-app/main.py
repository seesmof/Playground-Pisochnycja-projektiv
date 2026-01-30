from dataclasses import dataclass
import tkinter as tk


class Status:
    PENDING = "Pending"
    DONE = "Done"


@dataclass
class Todo:
    name: str
    status: Status


root = tk.Tk()
root.title("Todos App")
root.geometry("600x400")

todos = [
    Todo(name="Finish this app", status=Status.PENDING),
    Todo(name="Contact a teacher about diploma", status=Status.DONE),
]

listbox = tk.Listbox(root)
listbox.pack(padx=3, pady=3, fill="both", expand=True)
for item in todos:
    listbox.insert(
        tk.END, f"{'✅' if item.status == Status.DONE else '❌'} {item.name}"
    )

if __name__ == "__main__":
    root.mainloop()
