from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from constants import Constants as c

base = declarative_base()


class Names(base):
    __tablename__ = "names"

    id = Column(Integer, primary_key=True)
    full_name = Column(String)
    abbreviation = Column(String)


def get_session():
    engine = create_engine("sqlite:///" + c.DATABASE)
    session = sessionmaker(bind=engine)()
    base.metadata.create_all(engine)
    return session


def see_names():
    session = get_session()
    names = session.query(Names).all()
    for name in names:
        print(f"{name.abbreviation} - {name.full_name}")


def get_count():
    session = get_session()
    count = session.query(Names).count()
    return count


def delete_names():
    session = get_session()
    session.query(Names).delete()
    session.commit()


def add_name(full_name, abbreviation):
    session = get_session()
    name = Names(full_name=full_name, abbreviation=abbreviation)
    session.add(name)
    session.commit()


def get_name(full_name):
    session = get_session()
    name = session.query(Names).filter_by(full_name=full_name).first()
    return name
