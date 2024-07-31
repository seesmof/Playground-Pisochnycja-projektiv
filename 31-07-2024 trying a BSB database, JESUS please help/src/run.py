from read_data import load_abbreviations, load_names
from database import add_name, get_name, see_names
from constants import Constants as c


def fill_database():
    names = load_names(c.DATA)
    abbreviations = load_abbreviations(c.DATA)

    for abbreviation, full_name in zip(abbreviations.values(), names.values()):
        add_name(full_name, abbreviation) if not get_name(full_name) else None
