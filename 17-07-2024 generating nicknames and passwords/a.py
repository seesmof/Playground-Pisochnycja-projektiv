"""
Hallelujah thank YOU Jesus Christ our Holy Lord GOD Almighty ✝️💗🙏🏼
all the Glory be to YOU Jesus forever and ever AMEN ✝️💖
"""

import os
import random
import string
from rich.console import Console
from rich.traceback import install

install()
console = Console()

CONSONANTS: list[str] = [
    "b",
    "c",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "m",
    "n",
    "p",
    "q",
    "r",
    "s",
    "t",
    "v",
    "w",
    "x",
    "y",
    "z",
]
VOWELS: list[str] = ["a", "e", "i", "o", "u"]
NAMES_AMOUNT: int = 17
PASSWORD_LENGTH: int = 23
EMAIL_BASE: str = "seesmwork"


def generate_name() -> str:
    start_with: str = "ble"
    plus_s = start_with + random.choice(["s", "c"])
    plus_vowel = plus_s + random.choice(VOWELS)
    plus_consonant = plus_vowel + random.choice(["f", "v", "w"])

    return plus_consonant


def generate_bunch(amount: int = NAMES_AMOUNT) -> list[str]:
    names = set()
    while len(names) < amount:
        names.add(generate_name())

    return list(sorted(names))


def generate_password(length):
    all_characters = string.ascii_letters + string.digits + string.punctuation
    password = "".join(random.choices(all_characters, k=length))
    return password


names: list[str] = generate_bunch(NAMES_AMOUNT)
passwords: list[str] = [generate_password(PASSWORD_LENGTH) for _ in names]
emails: list[str] = [f"{EMAIL_BASE}+twitch-{name}@gmail.com" for name in names]
for name, password, email in zip(names, passwords, emails):
    console.print(f"{name}   {password}   {email}\n")

current_dir: str = os.path.dirname(os.path.abspath(__file__))
file_path: str = os.path.join(current_dir, "results.md")
with open(file_path, "w", encoding="utf-8") as file:
    for name, password, email in zip(names, passwords, emails):
        file.write(f"{name}   {password}   {email}\n")
