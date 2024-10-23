import os 
import json 
this_folder=os.path.dirname(os.path.abspath(__file__))
get_path=lambda name:os.path.join(this_folder,name)
with open(get_path('chapters.json')) as f: chapters=json.load(f)
with open(get_path('names.json')) as f: names=json.load(f)
with open(get_path('abbreviations.json')) as f: abbreviations=json.load(f)
with open(get_path('lists.json')) as f: lists=json.load(f)

def get_list_data(list_number:int):
    list_data=lists[list_number]
    chapter=list_data['chapter']
    Book=list_data['Book']
    Books=list_data['Books']
    return chapter,Book,Books

def move_to_next_reading_on_list(list_number:int):
    chapter,Book,Books=get_list_data(list_number)

    if chapter < chapters[str(Books[Book])]:
        lists[list_number]['chapter']+=1
    else: 
        lists[list_number]['chapter']=1
        lists[list_number]['Book']=Book+1 if Book<len(Books)-1 else 0

def show_current_reading_for_list(list_number:int):
    chapter,Book,Books=get_list_data(list_number)

    print(names[str(Books[Book])], chapter)

def open_link(link:str):
    os.startfile(link)

class Resource:
    BOLLS_LIFE='Bolls.Life'
    BIBLE_GATEWAY='BibleGateway'
    YOU_VERSION='YouVersion'

class Language:
    UK='Ukrainian'
    EN='English'

def open_chapter(
    Book_number:int,
    chapter:int,
    resource=Resource.BOLLS_LIFE,
    lang=Language.UK
):
    if resource==Resource.BOLLS_LIFE:
        base_link='https://bolls.life'
        version='UKRK' if lang==Language.UK else 'KJV'
        ready_link=f'{base_link}/{version}/{Book_number}/{chapter}/'
        open_link(ready_link)
    elif resource==Resource.BIBLE_GATEWAY:
        base_link='https://www.biblegateway.com/passage/?search'
        passage=names[str(Book_number)]+str(chapter)
        version='UKR' if lang==Language.UK else 'KJV'
        ready_link=f'{base_link}={passage}&version={version}'
        open_link(ready_link)
    elif resource==Resource.YOU_VERSION:
        base_link='https://www.bible.com/bible'
        version='188' if lang==Language.UK else '1'
        abbreviation=abbreviations[str(Book_number)]
        ready_link=f'{base_link}/{version}/{abbreviation}.{chapter}'
        open_link(ready_link)

def get_readings_for_next_day():
    for list_number in range(10):
        move_to_next_reading_on_list(list_number)

        chapter,Book,Books=get_list_data(list_number)
        open_chapter(Books[Book],chapter)

        print(names[str(Books[Book])],chapter)

def get_readings_for_specified_day(day:int): ...

with open(get_path('lists.json'),'w') as f: json.dump(lists,f,indent=2)