class Reader:
    def __init__(self, path):
        self.path = path
        self.abbreviations = {}
        self.names = {}

    def read_abbreviations(self):
        with open(self.path + "/abbreviations.yml", "r", encoding="utf-8") as f:
            abbreviations = f.read().splitlines()

        for count, abbreviation in enumerate(abbreviations, start=1):
            self.abbreviations[count] = abbreviation

    def read_names(self):
        with open(self.path + "/names.yml", "r", encoding="utf-8") as f:
            names = f.read().splitlines()

        for count, name in enumerate(names, start=1):
            self.names[count] = name


def get_abbreviations(path):
    reader = Reader(path)
    reader.read_abbreviations()
    return reader.abbreviations


def get_names(path):
    reader = Reader(path)
    reader.read_names()
    return reader.names
