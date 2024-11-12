import glob
import os
from datetime import datetime


root=os.path.dirname(os.path.abspath(__file__))
target_folder=os.path.join(root,"entries")
target_files=glob.glob(target_folder+"\\*.md")
print(os.listdir(target_folder))
ls=[]
for file_path in target_files:
    file_name=file_path.split('\\')[-1].replace('.md','')
    day_header='### ' + file_name + '\n'
    current_lines=[day_header]
    with open(file_path,encoding='utf-8',mode='r') as f:
        lines=f.readlines()
    if not lines: 
        print("Empty file",file_name)
        os.remove(file_path)
    current_lines+=lines