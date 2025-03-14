import difflib

a="Всяк бо, хто призове імя Господнє, спасеть ся. Римлян 10:13"
b="Бо всяк, хто призове ім'я Господнє, спасеться. Римляни 10:13"

res=difflib.SequenceMatcher(None,a,b).ratio()

a="Так бо полюбив Бог сьвіт, що Сина свого єдинородного дав, щоб кожен, віруючий в Него, не погиб, а мав життє вічнє. Йоана 3:16"
a="не погиб, а мав життє вічнє."
b="не загинув але мав життя вічне"

# split the original string into the substrings of the same length as input and do search this way

def calcualte_similarity(source: str, given: str) -> float:
    source_words: list[str] = source.split()
    given_words: list[str] = given.split()
    scores: list[float] = list()

    for i, word in enumerate(source_words):
        given_word 
        score: float = difflib.SequenceMatcher(None, word, )


res=difflib.SequenceMatcher(None,a,b).ratio()
print(calcualte_similarity(a,b))