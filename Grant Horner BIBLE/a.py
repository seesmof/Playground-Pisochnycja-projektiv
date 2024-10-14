import os 
import json 

teka=os.path.dirname(os.path.abspath(__file__))
data=os.path.join(teka,"data")
BooksDataFile=os.path.join(data,"BooksData.json")
ListsDataFile=os.path.join(data,"Lists.json")

def cycle(a,start=0):
    start=0 if not start else a.index(start)
    while 1:
        yield a[start]
        start=(start+1)%len(a)

plan='''
Matthew, Mark, Luke, John
Genesis, Exodus, Leviticus, Numbers, Deuteronomy
Romans, 1 Corinthians, 2 Corinthians, Galatians, Ephesians, Philippians, Colossians, Hebrews
1 Thessalonians, 2 Thessalonians, 1 Timothy, 2 Timothy, Titus, Philemon, James, 1 Peter, 2 Peter, 1 John, 2 John, 3 John, Jude, Revelation
Job, Ecclesiastes, Song of Songs
Psalms
Proverbs
Joshua, Judges, Ruth, 1 Samuel, 2 Samuel, 1 Kings, 2 Kings, 1 Chronicles, 2 Chronicles, Ezra, Nehemiah, Esther
Isaiah, Jeremiah, Lamentations, Ezekiel, Daniel, Hosea, Joel, Amos, Obadiah, Jonah, Micah, Nahum, Habakkuk, Zephaniah, Haggai, Zechariah, Malachi
Acts
'''
lists=[[n for n in l.split(", ")] for l in plan.split("\n") if l]
lists_cycle=cycle(lists)


class Book:
    num:int 
    name:str 
    chapters:int 

    def __init__(self,id:int,name:str,chapters:int):
        self.num=id 
        self.name=name 
        self.chapters=chapters 

def loadBooksData():
    a:list[Book]=[]
    with open(BooksDataFile,encoding="utf-8",mode="r") as f: data=json.load(f)
    for B in data: a.append(Book(B["id"],B["name"],B["chapters"]))
    return a

class BooksGroup:
    name:str
    Books:list[Book]

BooksList=loadBooksData()
for B in BooksList: print(B.name,B.chapters)