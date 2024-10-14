import os 
import json 

teka=os.path.dirname(os.path.abspath(__file__))
data=os.path.join(teka,"data")

def cycle(a,start):
    start=0 if not start else a.index(start)
    while 1:
        yield a[start]
        start=(start+1)%len(a)

with open(os.path.join(data,"Lists.json"),encoding="utf-8",mode="r") as f: lists=json.load(f)
for l in lists: print(l["parts"])

