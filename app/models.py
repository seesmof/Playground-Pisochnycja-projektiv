from datetime import datetime, timezone
from enum import Enum
from typing import Optional

from sqlalchemy import Column, DateTime
from sqlmodel import Field, SQLModel


class Role(str, Enum):
    user = "user"
    ai = "ai"


def _utc_now_naive() -> datetime:
    return datetime.now(timezone.utc).replace(tzinfo=None)


class Message(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    role: Role = Field(...)
    content: str = Field(...)
    created_at: datetime = Field(
        default_factory=_utc_now_naive, sa_column=Column(DateTime, nullable=False)
    )
