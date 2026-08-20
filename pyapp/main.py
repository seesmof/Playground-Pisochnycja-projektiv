from peewee import *

db = SqliteDatabase(":memory:")


class BaseModel(Model):
    class Meta:
        database = db


class Item(BaseModel):
    content = CharField(max_length=200)
    isCompleted = BooleanField()
