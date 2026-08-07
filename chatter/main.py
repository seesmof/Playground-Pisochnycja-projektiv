import uuid
import customtkinter as ctk
from peewee import SqliteDatabase, Model, CharField, TextField, DateTimeField
import datetime

# ==========================================
# 1. DATABASE & ORM MODELS (Peewee + SQLite)
# ==========================================
db = SqliteDatabase("chat_app.db")


class BaseModel(Model):
    class Meta:
        database = db


class User(BaseModel):
    id = CharField(primary_key=True, default=lambda: str(uuid.uuid4()))
    username = CharField(unique=True)
    created_at = DateTimeField(default=datetime.datetime.now)


class Message(BaseModel):
    id = CharField(primary_key=True, default=lambda: str(uuid.uuid4()))
    sender = CharField()  # Username or User ID
    receiver = CharField()  # Username or User ID
    content = TextField()
    created_at = DateTimeField(default=datetime.datetime.now)


# Initialize DB and create tables if they don't exist
db.connect()
db.create_tables([User, Message])

# Ensure default seed users exist for testing
if not User.select().where(User.username == "Alice").exists():
    User.create(username="Alice")
if not User.select().where(User.username == "Bob").exists():
    User.create(username="Bob")


# ==========================================
# 2. GUI APPLICATION (CustomTkinter)
# ==========================================
ctk.set_appearance_mode("Dark")
ctk.set_default_color_theme("blue")


class ChatApp(ctk.CTk):
    def __init__(self):
        super().__init__()

        self.title("Offline Local Chat")
        self.geometry("650x500")

        # Current session configuration (simulating two local accounts)
        self.current_user = "Alice"
        self.active_chat_partner = "Bob"

        self.grid_columnconfigure(1, weight=1)
        self.grid_rowconfigure(0, weight=1)

        # ---------------- Side Bar (User Selection) ----------------
        self.sidebar = ctk.CTkFrame(self, width=180, corner_radius=0)
        self.sidebar.grid(row=0, column=0, sticky="nsew", padx=5, pady=5)

        self.lbl_switch = ctk.CTkLabel(
            self.sidebar, text="LoggedIn As:", font=ctk.CTkFont(size=12, weight="bold")
        )
        self.lbl_switch.pack(padx=10, pady=(10, 2))

        self.user_dropdown = ctk.CTkOptionMenu(
            self.sidebar, values=["Alice", "Bob"], command=self.change_current_user
        )
        self.user_dropdown.set(self.current_user)
        self.user_dropdown.pack(padx=10, pady=(0, 20))

        self.lbl_partner = ctk.CTkLabel(
            self.sidebar,
            text="Chatting With:",
            font=ctk.CTkFont(size=12, weight="bold"),
        )
        self.lbl_partner.pack(padx=10, pady=(10, 2))

        self.partner_dropdown = ctk.CTkOptionMenu(
            self.sidebar, values=["Bob", "Alice"], command=self.change_chat_partner
        )
        self.partner_dropdown.set(self.active_chat_partner)
        self.partner_dropdown.pack(padx=10, pady=(0, 10))

        # ---------------- Main Chat Area ----------------
        self.chat_frame = ctk.CTkFrame(self)
        self.chat_frame.grid(row=0, column=1, sticky="nsew", padx=5, pady=5)
        self.chat_frame.grid_columnconfigure(0, weight=1)
        self.chat_frame.grid_rowconfigure(0, weight=1)

        # Scrollable message view
        self.messages_box = ctk.CTkScrollableFrame(
            self.chat_frame, label_text=f"Chat with {self.active_chat_partner}"
        )
        self.messages_box.grid(
            row=0, column=0, columnspan=2, sticky="nsew", padx=10, pady=10
        )

        # Input & Send button
        self.msg_entry = ctk.CTkEntry(
            self.chat_frame, placeholder_text="Type a message..."
        )
        self.msg_entry.grid(row=1, column=0, sticky="ew", padx=(10, 5), pady=10)
        self.msg_entry.bind("<Return>", lambda event: self.send_message())

        self.btn_send = ctk.CTkButton(
            self.chat_frame, text="Send", width=80, command=self.send_message
        )
        self.btn_send.grid(row=1, column=1, sticky="e", padx=(0, 10), pady=10)

        # Load existing messages on startup
        self.load_messages()

    # ---------------- Application Logic ----------------
    def load_messages(self):
        """Fetch chat history between current_user and active_chat_partner from SQLite."""
        # Clear existing message widgets in UI
        for widget in self.messages_box.winfo_children():
            widget.destroy()

        # Query messages in chronological order
        query = (
            Message.select()
            .where(
                (
                    (Message.sender == self.current_user)
                    & (Message.receiver == self.active_chat_partner)
                )
                | (
                    (Message.sender == self.active_chat_partner)
                    & (Message.receiver == self.current_user)
                )
            )
            .order_by(Message.created_at.asc())
        )

        for msg in query:
            self.display_message_bubble(msg.sender, msg.content, msg.created_at)

    def display_message_bubble(self, sender, text, timestamp):
        """Render a single message bubble aligned based on who sent it."""
        is_me = sender == self.current_user
        align = "e" if is_me else "w"
        color = ("#3B82F6", "#2563EB") if is_me else ("#374151", "#1F2937")

        bubble_container = ctk.CTkFrame(self.messages_box, fg_color="transparent")
        bubble_container.pack(fill="x", pady=4, padx=5)

        time_str = (
            timestamp.strftime("%H:%M")
            if isinstance(timestamp, datetime.datetime)
            else ""
        )
        formatted_text = f"{text}\n\n{time_str}" if time_str else text

        lbl = ctk.CTkLabel(
            bubble_container,
            text=formatted_text,
            fg_color=color,
            corner_radius=8,
            padx=12,
            pady=8,
            justify="left" if not is_me else "right",
        )
        lbl.pack(side="right" if is_me else "left")

    def send_message(self):
        """Save a new message to local SQLite and update UI."""
        content = self.msg_entry.get().strip()
        if not content:
            return

        # 1. Write to SQLite database
        msg = Message.create(
            sender=self.current_user, receiver=self.active_chat_partner, content=content
        )

        # 2. Render to screen
        self.display_message_bubble(msg.sender, msg.content, msg.created_at)

        # 3. Clear text input
        self.msg_entry.delete(0, "end")

    def change_current_user(self, new_user):
        self.current_user = new_user
        if self.current_user == self.active_chat_partner:
            # Swap partner if user picks their own name
            self.active_chat_partner = "Bob" if new_user == "Alice" else "Alice"
            self.partner_dropdown.set(self.active_chat_partner)
        self.messages_box.configure(label_text=f"Chat with {self.active_chat_partner}")
        self.load_messages()

    def change_chat_partner(self, new_partner):
        self.active_chat_partner = new_partner
        self.messages_box.configure(label_text=f"Chat with {self.active_chat_partner}")
        self.load_messages()


if __name__ == "__main__":
    app = ChatApp()
    app.mainloop()
