from datetime import datetime
from sqlmodel import Session, select

from db import engine, init_db
from models import Chat, Message, Role

init_db()

with Session(engine) as session:
    chat = Chat(title="First chat")
    session.add(chat)
    session.commit()
    session.refresh(chat)
    assert chat.id is not None

    session.add(Message(chat_id=chat.id, role=Role.user, content="Hello"))
    session.add(Message(chat_id=chat.id, role=Role.ai, content="Hi there!"))
    session.commit()

    stmt = select(Chat).where(Chat.id == chat.id)
    c = session.exec(stmt).one()
    print(f"Chat: {c.id}, {c.title}")
    for m in c.messages:
        print("  ", m.role, "->", m.content)

    session.delete(c)
    session.commit()
    print(f"After delete, messages left: {session.exec(select(Message)).all()}")
