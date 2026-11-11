from sqlmodel import SQLModel, Field, create_engine, Session, select, col


class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    email: str


engine = create_engine("sqlite:///./database.db")
SQLModel.metadata.create_all(engine)

with Session(engine) as session:
    got_that_name = "Laura Olson"
    statement = select(User).where(User.name == got_that_name)
    found_user = session.exec(statement).first()
    if not found_user:
        new_user = User(name="Laura Olson", email="lulius@mon.tc")
        session.add(new_user)
        session.commit()

with Session(engine) as session:
    statement = select(User)
    users = session.exec(statement)
    for user in users:
        print(f"{user.id}. {user.name} has {user.email}")

with Session(engine) as session:
    user = session.get(User, 1)
    if user:
        user.name = "Shane Dawson"
        session.commit()

users = session.exec(select(User).where(col(User.name).is_not(None)))
for user in users:
    print(f"{user.id}. {user.name}, email: {user.email}")
