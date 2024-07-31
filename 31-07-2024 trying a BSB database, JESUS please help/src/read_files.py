import os

from constants import Constants as c
from read_data import load_names

folder = c.BIBLE

# read each file in the folder
for filename in os.listdir(folder):

    def extract_name(filename):
        name, ext = os.path.splitext(filename)
        name = name.replace("BSB ", "").split(" ")[0]
        names = load_names(c.DATA)
        return names[int(name)]

    full_name = extract_name(filename)

    with open(os.path.join(folder, filename), "r", encoding="utf-8") as f:
        ...
