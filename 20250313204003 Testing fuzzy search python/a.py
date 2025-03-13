import difflib

a="Всяк бо, хто призове імя Господнє, спасеть ся. Римлян 10:13"
b="Бо всяк, хто призове ім'я Господнє, спасеться. Римляни 10:13"

res=difflib.SequenceMatcher(None,a,b).ratio()
print(res)