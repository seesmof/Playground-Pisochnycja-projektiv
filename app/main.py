import os

current_dir = os.path.dirname(os.path.abspath(__file__))
text_path = os.path.join(current_dir, "..", "Bible.txt")
with open(text_path, encoding="utf-8", mode="r") as f:
    lines = f.readlines()
texts = dict()
for line in lines:
    book, reference, text = line.split(" ", 2)
    ref = f"{book} {reference}"
    texts[ref] = text.strip()

from fuzzywuzzy import process

incoming_text = input("> ")
result = process.extractBests(query=incoming_text, choices=texts.values())
