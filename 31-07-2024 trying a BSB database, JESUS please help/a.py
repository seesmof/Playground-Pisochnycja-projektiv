import os
import json


root: str = os.path.dirname(os.path.abspath(__file__))
Bible_files = os.path.join(root, "BSB")
Bible_Books = os.path.join(root, "Bible_Books.yml")
Bible_Books_concordance_file = os.path.join(root, "Bible_Books_concordance.json")


def form_Bible_Books_concordance():
    Bible_Book_names = {}
    with open(Bible_Books, "r", encoding="utf-8") as f:
        lines = f.read().splitlines()
        for counter, line in enumerate(lines, start=1):
            Bible_Book_names[counter] = line
    return Bible_Book_names, len(Bible_Book_names.keys()) == 66


Bible_Book_names, success = form_Bible_Books_concordance()
if success:
    with open(Bible_Books_concordance_file, "w", encoding="utf-8") as f:
        json.dump(Bible_Book_names, f, indent=2)
    print(Bible_Book_names)
