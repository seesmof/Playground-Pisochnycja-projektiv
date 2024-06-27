concordance: dict = {
    "а": "a",
    "б": "b",
    "в": "v",
    "г": "g",
    "ґ": "ĝ",
    "д": "d",
    "дь": "d'",
    "е": "e",
    "є": "je",
    "ж": "ž",
    "з": "z",
    "зь": "z'",
    "и": "y",
    "і": "i",
    "ї": "ji",
    "й": "j",
    "к": "k",
    "л": "l",
    "ль": "l'",
    "м": "m",
    "н": "n",
    "нь": "n'",
    "о": "o",
    "п": "p",
    "р": "r",
    "рь": "r'",
    "с": "s",
    "сь": "s'",
    "т": "t",
    "ть": "t'",
    "у": "u",
    "ф": "f",
    "х": "h",
    "ц": "c",
    "ць": "c'",
    "ч": "č",
    "ш": "š",
    "щ": "šč",
    "ь": "'",
    "ю": "ju",
    "я": "ja",
    "'": "'",
}

input_text: str = (
    "Алелуя слава Ісусу Христу Святому Господу БОГУ Одвічному Великому Всемогутньому навіки вічні! Алелуя Слава Ісусу Христу нашому Святому Господа БОГУ Одвічному Великому Всемогутньому, ВСевишньому навіки Віків АМІНЬ"
)
output_check: str = (
    "Aleluja slava Isusu Hrystu Svjatomu Gospodu BOGU Odvičnomu Velykomu Vsemogutn'omu naviky vični! Aleluja Slava Isusu Hrystu našomu Svjatomu Gospoda BOGU Odvičnomu Velykomu Vsemogutn'omu, VSevyšn'omu naviky Vikiv AMIN'"
)


def romanize(text: str) -> str:
    """
    Takes in a Ukrainian text in cyrillic and converts it to latin

    < text: str
        Ukrainian text in cyrillic

    > str
        Ukrainian text in latin
    """

    output_text: str = ""
    for letter in input_text:
        if letter.lower() in concordance:
            if letter.islower():
                output_text += concordance[letter.lower()].lower()
            else:
                output_text += concordance[letter.lower()].upper()
        else:
            output_text += letter

    return output_text


output_text: str = romanize(input_text)
print(output_text)
