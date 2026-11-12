from fastapi import FastAPI
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


@app.post("/")
def create_task(task: TaskCreate):
    with Session(engine) as s:
        new_task = Task(content=task.content, is_completed=task.is_completed)

        s.add(new_task)
        s.commit()
        s.refresh(new_task)

        return {"status": "success", "task": new_task}
    return {"status": "failed"}
