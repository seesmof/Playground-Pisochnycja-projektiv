import os 
import json 
this_folder=os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(this_folder,"chapters.json")) as f: chapters=json.load(f)
with open(os.path.join(this_folder,"lists.json")) as f: lists=json.load(f)
with open(os.path.join(this_folder,"names.json")) as f: names=json.load(f)