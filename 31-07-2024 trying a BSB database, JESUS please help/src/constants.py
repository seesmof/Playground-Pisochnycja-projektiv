import os


class Constants:
    ROOT = os.path.dirname(os.path.abspath(__file__))
    BIBLE = os.path.join(ROOT, "..", "BSB")
    DATA = os.path.join(ROOT, "..", "Bible_Data")

    NAMES = os.path.join(DATA, "names.yml")
    ABBREVIATIONS = os.path.join(DATA, "abbreviations.yml")
    DATABASE = os.path.join(DATA, "data.db")
