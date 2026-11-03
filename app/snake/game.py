"""Pure game rules for Snake, with no pygame imports so it stays testable."""

from __future__ import annotations

import random
from collections import deque
from enum import Enum, auto
from typing import Final

from .config import COLS, ROWS

Point = tuple[int, int]


class Direction(Enum):
    UP = (0, -1)
    DOWN = (0, 1)
    LEFT = (-1, 0)
    RIGHT = (1, 0)

    def __init__(self, dx: int, dy: int) -> None:
        self.dx = dx
        self.dy = dy

    def is_opposite(self, other: Direction) -> bool:
        return self.dx == -other.dx and self.dy == -other.dy


class Status(Enum):
    READY = auto()
    RUNNING = auto()
    PAUSED = auto()
    GAME_OVER = auto()
    WON = auto()

    @property
    def is_finished(self) -> bool:
        return self in (Status.GAME_OVER, Status.WON)


START_LENGTH: Final = 3
_MAX_QUEUED_TURNS: Final = 2


class SnakeGame:
    """Grid-based snake with buffered turns and self/wall collision."""

    def __init__(
        self,
        cols: int = COLS,
        rows: int = ROWS,
        rng: random.Random | None = None,
    ) -> None:
        if cols < 6 or rows < 6:
            raise ValueError("the board must be at least 6x6 cells")
        self.cols = cols
        self.rows = rows
        self._rng = rng if rng is not None else random.Random()
        self.reset()

    def reset(self) -> None:
        centre_x, centre_y = self.cols // 2, self.rows // 2
        start = (centre_x, centre_y)
        self._segments: deque[Point] = deque(
            (start[0] - offset, start[1]) for offset in range(START_LENGTH)
        )
        self.direction = Direction.RIGHT
        self._pending: deque[Direction] = deque()
        self.score = 0
        self.status = Status.READY
        self.food: Point | None = self._spawn_food()

    # ------------------------------------------------------------------ queries

    @property
    def head(self) -> Point:
        return self._segments[0]

    @property
    def segments(self) -> tuple[Point, ...]:
        """Snake cells from head to tail."""
        return tuple(self._segments)

    @property
    def length(self) -> int:
        return len(self._segments)

    def in_bounds(self, point: Point) -> bool:
        x, y = point
        return 0 <= x < self.cols and 0 <= y < self.rows

    # ------------------------------------------------------------------ control

    def start(self) -> None:
        if self.status is Status.READY:
            self.status = Status.RUNNING

    def restart(self) -> None:
        self.reset()
        self.status = Status.RUNNING

    def toggle_pause(self) -> None:
        if self.status is Status.RUNNING:
            self.status = Status.PAUSED
        elif self.status is Status.PAUSED:
            self.status = Status.RUNNING

    def turn(self, direction: Direction) -> bool:
        """Queue a turn; ignores reversals and same-direction presses."""
        if self.status not in (Status.READY, Status.RUNNING):
            return False
        if len(self._pending) >= _MAX_QUEUED_TURNS:
            return False
        reference = self._pending[-1] if self._pending else self.direction
        if direction is reference or direction.is_opposite(reference):
            return False
        self._pending.append(direction)
        return True

    # --------------------------------------------------------------------- step

    def step(self) -> None:
        """Advance the snake by one cell."""
        if self.status is not Status.RUNNING:
            return

        if self._pending:
            self.direction = self._pending.popleft()

        new_head = (self.head[0] + self.direction.dx, self.head[1] + self.direction.dy)
        if not self.in_bounds(new_head):
            self.status = Status.GAME_OVER
            return

        eating = new_head == self.food
        blocked = set(self._segments)
        if not eating:
            blocked.discard(self._segments[-1])  # the tail moves out of the way
        if new_head in blocked:
            self.status = Status.GAME_OVER
            return

        self._segments.appendleft(new_head)
        if eating:
            self.score += 1
            self.food = self._spawn_food()
            if self.food is None:
                self.status = Status.WON
        else:
            self._segments.pop()

    # -------------------------------------------------------------------- food

    def _spawn_food(self) -> Point | None:
        free_cells = [
            (x, y)
            for y in range(self.rows)
            for x in range(self.cols)
            if (x, y) not in self._segments
        ]
        return self._rng.choice(free_cells) if free_cells else None
