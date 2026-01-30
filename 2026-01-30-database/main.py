from dataclasses import dataclass
import os
from nicegui import ui


class Car:
    FABIA = "Skoda Fabia"
    LOGAN = "Renault Logan"
    BOLT = "Chevrolet Bolt"


class Time:
    ONE = "1 hour"
    TWO = "2 hours"
    THREE = "3 hours"


class Person:
    EUGENE = "Eugene Castro"
    WALTER = "Walter Ball"
    VINCENT = "Vincent Walters"


@dataclass
class Entry:
    time: Time
    vehicle: Car
    person: Person


data = [
    Entry(time=Time.ONE, vehicle=Car.BOLT, person=Person.WALTER),
    Entry(time=Time.TWO, vehicle=Car.BOLT, person=Person.EUGENE),
    Entry(time=Time.ONE, vehicle=Car.FABIA, person=Person.EUGENE),
    Entry(time=Time.ONE, vehicle=Car.BOLT, person=Person.VINCENT),
    Entry(time=Time.TWO, vehicle=Car.LOGAN, person=Person.EUGENE),
    Entry(time=Time.THREE, vehicle=Car.FABIA, person=Person.WALTER),
    Entry(time=Time.ONE, vehicle=Car.BOLT, person=Person.VINCENT),
]

current_dir = os.path.dirname(os.path.abspath(__file__))
file_name = "data.csv"
file_path = os.path.join(current_dir, file_name)
with open(file_path, encoding="utf-8", mode="w") as f:
    f.write("time,vehicle,person\n")
    for entry in data:
        f.write(f"{entry.time},{entry.vehicle},{entry.person}\n")
