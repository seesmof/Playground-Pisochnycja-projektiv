import glob
import os


root=os.path.dirname(os.path.abspath(__file__))
target_folder=os.path.join(root,"entries")
target_files=glob.glob(target_folder+"\\*.md")
for file_path in target_files:
    with open(file_path,encoding='utf-8',mode='r') as f:
        lines=f.readlines()
    if not lines: 
        print("Empty file",file_path.split('\\')[-1])
        os.remove(file_path)