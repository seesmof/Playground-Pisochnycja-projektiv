from datetime import datetime
from enum import Enum
from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class Role(str, Enum):
    user = "user"
    ai = "ai"


class Chat(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(default="New chat")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    messages: List["Message"] = Relationship(
        back_populates="chat",
        cascade_delete=True,
    )


class Message(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    chat_id: int = Field(foreign_key="chat.id", index=True)
    role: Role = Field(...)
    content: str = Field(...)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    chat: Optional[Chat] = Relationship(back_populates="messages")
