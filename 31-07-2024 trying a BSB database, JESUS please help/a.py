import os
import json
from pydantic import BaseModel


Root: str = os.path.dirname(os.path.abspath(__file__))
BIBLE_Text_Files = os.path.join(Root, "BSB")
BIBLE_Books_File = os.path.join(Root, "Bible_Books.yml")
BIBLE_Books_Numbered_File = os.path.join(Root, "Bible_Books.json")


def Load_BIBLE_Books():
    BIBLE_Books = {}
    with open(BIBLE_Books_File, "r", encoding="utf-8") as f:
        lines = f.read().splitlines()
        for counter, line in enumerate(lines, start=1):
            BIBLE_Books[counter] = line
    return BIBLE_Books, len(BIBLE_Books.keys()) == 66


def Make_BIBLE_Json():
    BIBLE_Books, success = Load_BIBLE_Books()
    if not success:
        print("Failed to open the file")
    with open(BIBLE_Books_Numbered_File, "w", encoding="utf-8") as f:
        json.dump(BIBLE_Books, f, indent=2)


BIBLE_Books, _ = Load_BIBLE_Books()


class Verse(BaseModel):
    ID: int = 1
    text: str = ""


class Chapter(BaseModel):
    ID: int = 1
    Verses: list[Verse] = []


class Book(BaseModel):
    ID: int = 1
    Chapters: list[Chapter] = []

    def get_name(self):
        return BIBLE_Books[self.ID]


class BIBLE(BaseModel):
    Books: list[Book] = []
    Books_Number: int = 0


# open each file in BIBLE_Text_Files:
for filename in os.listdir(BIBLE_Text_Files):
    name, ext = os.path.splitext(filename)

    def extract_name(name):
        Book_Number, Chapter_Number = name.replace("BSB ", "").split(" ")
        Book_Name = BIBLE_Books[int(Book_Number)]
        return Book_Name, int(Chapter_Number)

    Book_Name, Chapter_Number = extract_name(name)
    print(Book_Name, Chapter_Number)
