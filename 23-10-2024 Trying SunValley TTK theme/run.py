import tkinter as tk
from tkinter import ttk
import sv_ttk

window = tk.Tk()
window.geometry("700x300")
window.title("JESUS IS LORD")
window.bind("<Escape>",lambda _:window.destroy())

a=ttk.Combobox(window)
a.pack(expand=1)

sv_ttk.use_light_theme()
window.mainloop()
