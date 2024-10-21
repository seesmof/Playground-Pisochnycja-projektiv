from tkinter import *
w=Tk()
w.bind("<Escape>",lambda _:w.destroy())
b=Button(w,text="Слава ІСУСУ ХРИСТУ")
b.pack(padx=7,pady=7)
b.bind("<Double-Button-1>",lambda _:b.config(text="Навіки слава!"))
w.mainloop()