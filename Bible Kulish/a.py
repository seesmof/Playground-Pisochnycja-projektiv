import glob
from shutil import copy2
import os
import time 

root_folder=os.path.dirname(os.path.abspath(__file__))
paratext_folder=os.path.join(r'C:\My Paratext 9 Projects\UFB')
revision_folder=os.path.join(root_folder,'Revision')
revision_files = glob.glob(revision_folder + "\\*.USFM")

def copy_to_paratext():
    try:
        for file_path in revision_files:
            copy2(file_path, os.path.join(paratext_folder, file_path.split("\\")[-1]))
    except: pass

def perform_automations():
    print()
    copy_to_paratext()
    print("Paratext")

def monitor_files_for_changes():
    latest_file = max(revision_files, key=os.path.getmtime)
    last_modification_time = os.path.getmtime(latest_file)
    perform_automations()
    while 1:
        latest_file = max(revision_files, key=os.path.getmtime)
        current_modification_time = os.path.getmtime(latest_file)
        if last_modification_time != current_modification_time:
            perform_automations()
            last_modification_time = current_modification_time
        time.sleep(1)

if __name__ == "__main__":
    monitor_files_for_changes()