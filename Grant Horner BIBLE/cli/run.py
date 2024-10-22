import os 
import json 
current_folder=os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(current_folder,"chapters.json")) as f: chapters=json.load(f)
with open(os.path.join(current_folder,"lists.json")) as f: lists=json.load(f)
with open(os.path.join(current_folder,"names.json")) as f: names=json.load(f)

cur=0

if lists[cur]['chapter']<chapters[str(lists[cur]['Books'][lists[cur]['Book']])]:lists[cur]['chapter']+=1
else: 
    lists[cur]['chapter']=1
    lists[cur]['Book']=lists[cur]['Book']+1 if lists[cur]['Book']<len(lists[cur]['Books'])-1 else 0

print(names[str(lists[cur]['Books'][lists[cur]['Book']])], lists[cur]['chapter'])

with open(os.path.join(current_folder,"lists.json"),'w') as f: json.dump(lists,f,indent=2)