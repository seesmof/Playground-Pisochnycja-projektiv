# Okay so the idea is to work with Peewee ORM. I wanna make a CRUD thing ideally.
import os
import peewee as p

current_dir = os.path.dirname(os.path.abspath(__file__))
db_file_name = "data.db"
db_file_path = os.path.join(current_dir, db_file_name)
db = p.SqliteDatabase(db_file_path)


class Animal(p.Model):
    nickname = p.CharField()
    type = p.CharField()


db.connect()
