import difflib

a="Всяк бо, хто призове імя Господнє, спасеть ся. Римлян 10:13"
b="Бо всяк, хто призове ім'я Господнє, спасеться. Римляни 10:13"

res=difflib.SequenceMatcher(None,a,b).ratio()
print(res)

a="Так бо полюбив Бог сьвіт, що Сина свого єдинородного дав, щоб кожен, віруючий в Него, не погиб, а мав життє вічнє. Йоана 3:16"
b="не загинув але мав життя вічне"

res=difflib.SequenceMatcher(None,a,b).ratio()
print(res)

word_list=a.split()
res=difflib.get_close_matches(b,word_list,cutoff=.33)
print(res)