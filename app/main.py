# Okay so the idea is to work with Peewee ORM. I wanna make a CRUD thing ideally. Tried peewee but i dont feel like thats it for me. i wanna learn raw sql that will help me understand how things work better i hope. Praise King Jesus Christ our Lord. I love Jesus Christ Amen. So right now i wanna create a crud app with SQLite and raw sql, let's see how it goes. so for crud i need create, update, read, delete operations.
import os
import sqlite3

current_dir = os.path.dirname(os.path.abspath(__file__))
db_file_name = "data.db"
db_file_path = os.path.join(current_dir, db_file_name)
db = sqlite3.connect(db_file_path)
