from nicegui import ui, app
from sqlmodel import SQLModel, Session, create_engine


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


# Configurations
DATABASE_URL = "sqlite:///database.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
create_db_and_tables()
app.colors(primary="#4E7D3A")


ui.label("Jesus is LORD")
ui.button("CLick")

ui.run(title="Ферменеджер", favicon="🐴")
