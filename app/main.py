"""
uvicorn main:app --reload
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def index():
    return {"message": "Jesus is LORD"}


class User(BaseModel):
    name: str
    age: int
    email: str


@app.post("/users/")
async def create_user(user: User):
    return {
        "user": f"{user.name} is {user.age} years old and has an email {user.email}"
    }
