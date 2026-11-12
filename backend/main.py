from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlmodel import Field, SQLModel, create_engine, Session, select

app = FastAPI()


class TaskCreate(BaseModel):
    content: str
    is_completed: bool = False


class Task(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    content: str
    is_completed: bool = Field(default=False)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = create_engine("sqlite:///./database.db")
SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


@app.post("/tasks")
def create_task(task_in: TaskCreate, session: Session = Depends(get_session)):
    new_task = Task.model_validate(task_in)
    session.add(new_task)
    session.commit()
    session.refresh(new_task)
    return new_task


@app.get("/tasks")
def list_tasks(session: Session = Depends(get_session)):
    all_tasks = session.exec(select(Task)).all()
    return all_tasks


class TaskUpdate(BaseModel):
    is_completed: bool


@app.patch("/tasks/{task_id}")
def update_task_status(
    task_id: int, task_in: TaskUpdate, session: Session = Depends(get_session)
):
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.is_completed = task_in.is_completed
    session.add(task)
    session.commit()
    session.refresh(task)
    return task
