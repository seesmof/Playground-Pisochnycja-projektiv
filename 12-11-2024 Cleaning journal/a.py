import glob
import os
from datetime import datetime

root=os.path.dirname(os.path.abspath(__file__))
target_folder=os.path.join(root,"entries")
target_files=os.listdir(target_folder)
def get_formatted_date(date:str):
    day,month,year=date.replace('.md','').split('-')
    return year,month,day
target_files.sort(key=get_formatted_date)