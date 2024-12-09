"""
get a file path input 
get file creation time 
form a timestamp 
add it to a note name 
form a complete file path with a renamed file 
rename the file with new name 
"""

import datetime
import os

file_path = (
    r"E:\Notatnyk\Файли\Користувацькі налаштування сайтів\Speedtest light theme.md"
)
file_creation_time = os.path.getctime(file_path)
timestamp_format = "%Y%m%d%H%M%S"
file_creation_timestamp = datetime.datetime.fromtimestamp(file_creation_time)
formatted_file_creation_time = file_creation_timestamp.strftime(timestamp_format)
file_name = file_path.split("\\")[-1]
file_title, file_extension = file_name.split(".")
file_title_with_timestamp = formatted_file_creation_time + " " + file_title
print(file_title_with_timestamp)
