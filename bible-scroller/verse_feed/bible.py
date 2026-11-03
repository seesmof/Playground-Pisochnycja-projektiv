"""Loading the Bible and serving a random, buffered feed of verses."""

from __future__ import annotations

import json
import random
from dataclasses import dataclass
from pathlib import Path

from .books import BOOK_NAMES

# (book code, chapter, verse number, text)
RawVerse = tuple[str, int, int, str]


@dataclass(frozen=True, slots=True)
class Verse:
    book: str
    chapter: int
    number: int
    text: str

    @property
    def reference(self) -> str:
        name = BOOK_NAMES.get(self.book, self.book)
        return f"{name} {self.chapter}:{self.number}"


def load_verses(path: Path) -> list[RawVerse]:
    """Flatten ``{BOOK: {chapter: {verse: text}}}`` into a list of tuples."""
    with path.open("r", encoding="utf-8") as handle:
        bible = json.load(handle)

    verses: list[RawVerse] = []
    for book, chapters in bible.items():
        for chapter, rows in chapters.items():
            for number, text in rows.items():
                verses.append((book, int(chapter), int(number), text))

    if not verses:
        raise ValueError(f"No verses found in {path}")

    return verses


class RandomFeed:
    """An append-only list of random verses.

    Verses are generated ahead of time, so moving through the feed never waits
    on I/O. Pure random sampling: repeats are allowed, matching the web build.
    """

    def __init__(
        self,
        rows: list[RawVerse],
        *,
        seed: int | None = None,
        preload: int = 12,
    ) -> None:
        if not rows:
            raise ValueError("RandomFeed needs at least one verse")

        self._rows = rows
        self._rng = random.Random(seed)
        self._items: list[Verse] = []
        self.ensure(preload)

    def ensure(self, count: int) -> None:
        while len(self._items) < count:
            book, chapter, number, text = self._rows[
                self._rng.randrange(len(self._rows))
            ]
            self._items.append(Verse(book, chapter, number, text))

    def get(self, index: int) -> Verse:
        if index < 0:
            raise IndexError(index)
        self.ensure(index + 1)
        return self._items[index]

    def __len__(self) -> int:
        return len(self._items)
