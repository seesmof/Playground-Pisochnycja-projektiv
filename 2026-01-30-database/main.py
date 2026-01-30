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
    CECILIA = "Cecilia Morrison"
    EMILY = "Emily Alexander"
    WALTER = "Walter Ball"
    VICENT = "Vincent Walters"


class Entry:
    vehicle: Car
    time: Time
    person: Person
