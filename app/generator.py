from pathlib import Path
import random


def load_words(path):
    text = Path(path).read_text(encoding="utf-8-sig")
    return [w for line in text.splitlines() for w in line.split()[2:]]


def build_model(words):
    model = {}
    for i in range(len(words) - 1):
        current_word = words[i]
        next_word = words[i + 1]
        if current_word not in model:
            model[current_word] = []
        model[current_word].append(next_word)
    return model


def generate(model, seed="", length=60):
    output_words = seed.split()

    if len(output_words) == 0:
        first_word = random.choice(list(model))
        output_words = [first_word]
        length = length - 1

    if output_words[-1] in model:
        current_word = output_words[-1]
    else:
        current_word = random.choice(list(model))

    for _ in range(length):
        if current_word not in model:
            current_word = random.choice(list(model))
        next_word = random.choice(model[current_word])
        output_words.append(next_word)
        current_word = next_word

    return " ".join(output_words)
