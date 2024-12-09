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


def add_file_creation_timestamp_to_file(file_path: str):
    FILE_CREATION_TIMESTAMP_FORMAT = "%Y%m%d%H%M%S"
    file_creation_time = os.path.getctime(file_path)
    file_creation_timestamp = datetime.datetime.fromtimestamp(file_creation_time)
    formatted_file_creation_time = file_creation_timestamp.strftime(
        FILE_CREATION_TIMESTAMP_FORMAT
    )
    file_name = file_path.split("\\")[-1]
    file_title, file_extension = file_name.split(".")
    file_title_with_timestamp = formatted_file_creation_time + " " + file_title
    file_name_with_timestamp = f"{file_title_with_timestamp}.{file_extension}"
    original_file_path_parts = file_path.split("\\")[:-1]
    path_to_given_file = "\\".join(original_file_path_parts)
    renamed_file_path = os.path.join(path_to_given_file, file_name_with_timestamp)
    os.rename(file_path, renamed_file_path)


input_file_path = r"E:\Notatnyk\План.md"
add_file_creation_timestamp_to_file(input_file_path)
