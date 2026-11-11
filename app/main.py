from sqlmodel import SQLModel, Field, create_engine, Session, select, col


def display_tasks(tasks):
    if not tasks:
        print("No tasks found.")
        return
    for task in tasks:
        print(
            f'{task.id}. {task.title} is {"completed" if task.isCompleted else "NOT completed"}.'
        )


class Task(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    isCompleted: bool = False


engine = create_engine("sqlite:///./database.db")
SQLModel.metadata.create_all(engine)

# Create
with Session(engine) as session:
    given_task_name = "Complete this tutorial"
    given_task = session.exec(select(Task).where(Task.title == given_task_name)).first()
    if not given_task:
        new_task = Task(title=given_task_name)
        session.add(new_task)
        session.commit()

# Read
with Session(engine) as session:
    tasks = session.exec(select(Task)).all()
    display_tasks(tasks)

# Update
with Session(engine) as session:
    given_task = session.exec(select(Task).where(Task.title == given_task_name)).first()
    if given_task:
        given_task.isCompleted = not given_task.isCompleted
        session.commit()
    tasks = session.exec(select(Task)).all()
    display_tasks(tasks)

# Delete
with Session(engine) as session:
    given_task = session.exec(select(Task).where(Task.title == given_task_name)).first()
    if given_task:
        session.delete(given_task)
        session.commit()
    tasks = session.exec(select(Task)).all()
    display_tasks(tasks)
