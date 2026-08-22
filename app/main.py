from customtkinter import *

app = CTk()
app.geometry("600x400")

button = CTkButton(
    app, text="Click This", command=lambda: print("You clicked it Amen.")
)
button.pack(pady=20, padx=20)

app.mainloop()
