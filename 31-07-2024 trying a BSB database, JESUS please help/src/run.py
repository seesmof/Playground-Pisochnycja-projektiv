import os

from read_data import get_abbreviations, get_names

root = os.path.dirname(os.path.abspath(__file__))
folder = os.path.join(root, "..", "Bible_Data")

names_path = os.path.join(folder, "names.yml")
abbreviations_path = os.path.join(folder, "abbreviations.yml")
database_path = os.path.join(folder, "data.db")

from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

base = declarative_base()


class Names(base):
    __tablename__ = "names"

    id = Column(Integer, primary_key=True)
    full_name = Column(String)
    abbreviation = Column(String)


engine = create_engine("sqlite:///" + database_path)
session = sessionmaker(bind=engine)()
base.metadata.create_all(engine)


def see_names():
    names = session.query(Names).all()
    for name in names:
        print(f"{name.abbreviation} - {name.full_name}")


def get_count():
    count = session.query(Names).count()
    return count


def delete_names():
    session.query(Names).delete()
    session.commit()


def add_name(full_name, abbreviation):
    name = Names(full_name=full_name, abbreviation=abbreviation)
    session.add(name)
    session.commit()


def get_name(full_name):
    name = session.query(Names).filter_by(full_name=full_name).first()
    return name


names = get_names(folder)
abbreviations = get_abbreviations(folder)

for abbreviation, full_name in zip(abbreviations.values(), names.values()):
    add_name(full_name, abbreviation) if not get_name(full_name) else None

see_names()
