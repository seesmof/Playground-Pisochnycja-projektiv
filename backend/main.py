from fastapi import APIRouter, FastAPI
from pydantic import BaseModel
from sqlmodel import SQLModel, Field, create_engine, Session, select, col


class TaskDTO(BaseModel):
    title: str
    isCompleted: bool = False


class Task(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    isCompleted: bool = False


# Database init
engine = create_engine("sqlite:///./database.db")
SQLModel.metadata.create_all(engine)

# FastAPI init
app = FastAPI()
tasks_router = APIRouter(prefix="/tasks", tags=["tasks"])


@app.get("/")
def get_tasks():
    with Session(engine) as s:
        tasks = s.exec(select(Task)).all()
        return {"tasks": tasks}


@app.get("/{task_id}")
def get_task(task_id: int):
    with Session(engine) as s:
        task = s.get(Task, task_id)
        return {"task": task}


@app.post("/")
def create_task(given_task: TaskDTO):
    with Session(engine) as s:
        new_task = Task(title=given_task.title, isCompleted=given_task.isCompleted)

        s.add(new_task)
        s.commit()
        s.refresh(new_task)

        return {"task": new_task}
