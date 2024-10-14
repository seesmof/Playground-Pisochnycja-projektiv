import os,json

ListOrder='''1. Matthew, Mark, Luke, John
2. Genesis, Exodus, Leviticus, Numbers, Deuteronomy
3. Romans, 1 Corinthians, 2 Corinthians, Galatians, Ephesians, Philippians, Colossians, Hebrews
4. 1 Thessalonians, 2 Thessalonians, 1 Timothy, 2 Timothy, Titus, Philemon, James, 1 Peter, 2 Peter, 1 John, 2 John, 3 John, Jude, Revelation
5. Job, Ecclesiastes, Song of Songs
6. Psalms
7. Proverbs
8. Joshua, Judges, Ruth, 1 Samuel, 2 Samuel, 1 Kings, 2 Kings, 1 Chronicles, 2 Chronicles, Ezra, Nehemiah, Esther
9. Isaiah, Jeremiah, Lamentations, Ezekiel, Daniel, Hosea, Joel, Amos, Obadiah, Jonah, Micah, Nahum, Habakkuk, Zephaniah, Haggai, Zechariah, Malachi
10. Acts
'''
Lists={}
for line in [l for l in ListOrder.split("\n") if l]:
    Lists[line.split(". ")[0]]=line.split(". ")[-1]

with open(os.path.join(os.path.dirname(os.path.abspath(__file__)),"Lists.json"),mode="w") as f: json.dump(Lists,f,indent=2)