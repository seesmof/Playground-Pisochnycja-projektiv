import os
import re

FILE_NAME = "a.txt"


def main():
    current_folder = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_folder, FILE_NAME)

    with open(file_path, encoding="utf-8", mode="r") as f:
        text = f.read()

    # Remove anything withing the corner brackets
    pattern = r"<.*?>"
    text = re.sub(pattern, "", text)

    with open(file_path, encoding="utf-8", mode="w") as f:
        f.write(text)


if __name__ == "__main__":
    main()
