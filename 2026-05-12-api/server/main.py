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
result = get_name_with_age(name=name, age=age)
print(result)
