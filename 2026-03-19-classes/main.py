from collections import namedtuple

class Grade:
    A='A'
    B='B'
    C='C'
    D='D'
    F='F'

Student=namedtuple('Student','name,height,grade')

students:list[Student] = [
    Student(name='Connor', height=192,grade=Grade.A),
    Student(name='Frederick', height=186,grade=Grade.A),
    Student(name='Andre', height=179,grade=Grade.A),
    Student(name='Rachel', height=187,grade=Grade.A),
    Student(name='Jay', height=195,grade=Grade.A),
    Student(name='Howard', height=200,grade=Grade.A),
    Student(name='Lucille', height=194,grade=Grade.A),
]

print(students[0].name)