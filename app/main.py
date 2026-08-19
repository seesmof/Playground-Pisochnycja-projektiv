import customtkinter as ctk
from CTkMessagebox import CTkMessagebox as alert
from ctksidebar import CTkSidebarNavigation


class App(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.geometry("400x150")

        self.button = ctk.CTkButton(self, text="Click", command=self.button_click)
        self.button.grid(row=0, column=0, padx=20, pady=20)

    def button_click(self):
        alert(
            title="Clicked a button",
            message="Hello, you clicked a button, praise Jesus.",
            icon="info",
            option_1="Cancel",
            option_2="Okay",
        )


if __name__ == "__main__":
    app = App()
    app.mainloop()
