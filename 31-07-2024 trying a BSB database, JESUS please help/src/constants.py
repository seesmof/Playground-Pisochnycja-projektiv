import os


class Constants:
    ROOT = os.path.dirname(os.path.abspath(__file__))
    TARGET = os.path.join(ROOT, "..", "Bible_Data")
    NAMES = os.path.join(TARGET, "names.yml")
    ABBREVIATIONS = os.path.join(TARGET, "abbreviations.yml")
    DATABASE = os.path.join(TARGET, "data.db")
