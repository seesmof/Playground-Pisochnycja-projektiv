import random


def load_words(path):
    words = []
    with open(path, encoding="utf-8-sig") as f:
        for line in f:
            parts = line.strip().split(" ", 2)
            text = parts[2] if len(parts) == 3 else line.strip()
            if text:
                words.extend(text.split())
    return words


def build_model(words):
    model = {}
    for a, b in zip(words, words[1:]):
        model.setdefault(a, []).append(b)
    return model


def generate(model, seed="", length=60):
    out = seed.split()
    current = out[-1] if out and out[-1] in model else random.choice(list(model))
    if not out:
        out = [current]
        length -= 1
    for _ in range(length):
        if current not in model:
            current = random.choice(list(model))
        nxt = random.choice(model[current])
        out.append(nxt)
        current = nxt
    return " ".join(out)
