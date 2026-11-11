from sqlmodel import SQLModel, Field, create_engine, Session, select


class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    email: str


# Create a database
engine = create_engine("sqlite:///./database.db")
# Create all tables
SQLModel.metadata.create_all(engine)

# Insert
with Session(engine) as session:
    new_user = User(name="Laura Olson", email="lulius@mon.tc")
    session.add(new_user)
    session.commit()

# Query
with Session(engine) as s:
    statement = select(User)
    print(f"{statement = }")
    users = session.exec(statement)
    for user in users:
        print(f"{user.id}. {user.name} has {user.email}")
