"""Tunable game constants and the colour palette."""

from __future__ import annotations

from typing import Final, NamedTuple

COLS: Final = 24
ROWS: Final = 18
CELL: Final = 32
HEADER: Final = 64

WINDOW_SIZE: Final = (COLS * CELL, ROWS * CELL + HEADER)
TITLE: Final = "Snake"

START_SPEED: Final = 7.5  # board steps per second
MAX_SPEED: Final = 18.0
SPEED_PER_FOOD: Final = 0.35

FPS: Final = 60


class Palette(NamedTuple):
    background: tuple[int, int, int] = (12, 15, 22)
    board: tuple[int, int, int] = (19, 24, 34)
    grid: tuple[int, int, int] = (25, 31, 43)
    header: tuple[int, int, int] = (16, 20, 29)
    text: tuple[int, int, int] = (233, 238, 246)
    muted: tuple[int, int, int] = (122, 136, 158)
    accents: tuple[tuple[int, int, int], ...] = (
        (74, 222, 128),
        (34, 197, 94),
        (21, 128, 61),
    )
    food: tuple[int, int, int] = (248, 113, 113)
    food_glow: tuple[int, int, int] = (127, 29, 29)
    overlay: tuple[int, int, int, int] = (8, 11, 17, 172)


COLORS: Final = Palette()


def speed_for(score: int) -> float:
    """Return the board speed in steps per second for a given score."""
    return min(MAX_SPEED, START_SPEED + SPEED_PER_FOOD * score)
