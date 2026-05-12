import os


def get_full_name(first_name: str, last_name: str) -> str:
    return f"{first_name.title()} {last_name.title()}"


first_name = "oleh"
last_name = "onyshchenko"
full_name = get_full_name(first_name=first_name, last_name=last_name)
print(full_name)


def get_name_with_age(name: str, age: int) -> str:
    return f"{name} is {age} years old."


name: str = "Clarence"
age: int = 21
name_with_age = get_name_with_age(name=name, age=age)
print(name_with_age)


def process_items(items: list[str]):
    results: list[str] = list()
    for index, item in enumerate(items, start=1):
        formatted_item = f"{index}. {item}"
        print(formatted_item)
        results.append(formatted_item)
    return results


names = ["Susie", "Lizzie", "Julia"]
listed_names: list[str] = process_items(names)

current_dir = os.path.dirname(os.path.abspath(__file__))
html_output_file_path: str = os.path.join(current_dir, "index.html")
with open(html_output_file_path, encoding="utf-8", mode="w") as f:
    f.write("<ul>")
    f.writelines([f"<li>{line}</li>" for line in listed_names])
    f.write("</ul>")
