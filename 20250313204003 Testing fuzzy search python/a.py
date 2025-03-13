import difflib

a="Всяк бо, хто призове імя Господнє, спасеть ся. Римлян 10:13"
b="Бо всяк, хто призове ім'я Господнє, спасеться. Римляни 10:13"

res=difflib.SequenceMatcher(None,a,b).ratio()
print(res)

a="Так бо полюбив Бог сьвіт, що Сина свого єдинородного дав, щоб кожен, віруючий в Него, не погиб, а мав життє вічнє. Йоана 3:16"
a="не погиб, а мав життє вічнє."
b="не загинув але мав життя вічне"

# split the original string into the substrings of the same length as input and do search this way

res=difflib.SequenceMatcher(None,a,b).ratio()
print(res)