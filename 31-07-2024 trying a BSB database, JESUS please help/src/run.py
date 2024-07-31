from read_data import load_abbreviations, load_names
from database import add_name, get_name, see_names
from constants import Constants as c

names = load_names(c.TARGET)
abbreviations = load_abbreviations(c.TARGET)

for abbreviation, full_name in zip(abbreviations.values(), names.values()):
    add_name(full_name, abbreviation) if not get_name(full_name) else None

see_names()
