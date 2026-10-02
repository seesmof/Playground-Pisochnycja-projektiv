"""Utilities to load Bible.txt and generate Bible-style text with a word-level Markov chain."""
from __future__ import annotations

import random
import re
from collections import Counter, defaultdict

_REF_RE = re.compile(r"^\S+\s+\d+:\d+\s+(.*)$", re.DOTALL)


def strip_reference(line: str) -> str:
    """Remove `BOOK_ABBR CHAPTER:VERSE` prefix, return verse text."""
    line = line.strip()
    if not line:
        return ""
    m = _REF_RE.match(line)
    return m.group(1).strip() if m else line


def load_verses(path: str) -> list[str]:
    with open(path, encoding="utf-8-sig") as f:
        verses = [strip_reference(line) for line in f]
    return [v for v in verses if v]


def to_wall_of_text(verses: list[str]) -> str:
    return " ".join(verses)


def tokenize(text: str) -> list[str]:
    return text.split()


def build_model(tokens: list[str], order: int = 2) -> dict[tuple[str, ...], Counter]:
    """Map state (N-gram tuple) -> Counter of next words."""
    model: dict[tuple[str, ...], Counter] = defaultdict(Counter)
    if len(tokens) <= order:
        return dict(model)
    for i in range(len(tokens) - order):
        state = tuple(tokens[i : i + order])
        model[state][tokens[i + order]] += 1
    return dict(model)


def _sample_next(counter: Counter, temperature: float, rng: random.Random) -> str:
    words = list(counter.keys())
    counts = [counter[w] for w in words]
    if temperature <= 0:
        best = max(counts)
        candidates = [w for w, c in zip(words, counts) if c == best]
        return rng.choice(candidates)
    total = sum(counts)
    probs = [c / total for c in counts]
    if temperature == 1.0:
        return rng.choices(words, weights=probs, k=1)[0]
    # temperature on logits: p ~ softmax(log(p) / T)
    import math

    logits = [math.log(p + 1e-12) / temperature for p in probs]
    m = max(logits)
    exps = [math.exp(x - m) for x in logits]
    s = sum(exps)
    weights = [e / s for e in exps]
    return rng.choices(words, weights=weights, k=1)[0]


def generate(
    model: dict[tuple[str, ...], Counter],
    length: int = 60,
    seed: str = "",
    temperature: float = 1.0,
    rng_seed: int | None = None,
) -> str:
    if not model:
        return ""
    rng = random.Random(rng_seed)
    order = len(next(iter(model)))
    seed_tokens = seed.split()
    if len(seed_tokens) >= order:
        state = tuple(seed_tokens[-order:])
        if state not in model:
            state = rng.choice(list(model.keys()))
        prefix = list(seed_tokens)
    elif seed_tokens:
        # try to find a state starting with the seed words
        matches = [s for s in model if list(s[: len(seed_tokens)]) == seed_tokens]
        state = rng.choice(matches) if matches else rng.choice(list(model.keys()))
        prefix = list(state)
    else:
        state = rng.choice(list(model.keys()))
        prefix = list(state)

    out = list(prefix)
    current = tuple(out[-order:])
    for _ in range(length):
        nxt_counter = model.get(current)
        if nxt_counter is None:
            current = rng.choice(list(model.keys()))
            continue
        nxt = _sample_next(nxt_counter, temperature, rng)
        out.append(nxt)
        current = tuple(out[-order:])
    # if user gave a seed, keep it; else output starts at random state
    text = " ".join(out)
    if seed and not text.startswith(seed):
        text = seed + " " + text
    return text
