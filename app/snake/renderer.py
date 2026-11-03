"""Pygame drawing layer: turns a :class:`SnakeGame` into pixels."""

from __future__ import annotations

import math

import pygame

from .config import CELL, COLORS, COLS, HEADER, ROWS, TITLE, WINDOW_SIZE, speed_for
from .game import Direction, SnakeGame, Status

Color = tuple[int, int, int]


def _mix(a: Color, b: Color, t: float) -> Color:
    t = max(0.0, min(1.0, t))
    return tuple(round(x + (y - x) * t) for x, y in zip(a, b))  # type: ignore[return-value]


def _snake_color(t: float) -> Color:
    head, middle, tail = COLORS.accents
    if t < 0.5:
        return _mix(head, middle, t * 2)
    return _mix(middle, tail, (t - 0.5) * 2)


class Renderer:
    def __init__(self) -> None:
        self.screen = pygame.display.set_mode(WINDOW_SIZE)
        pygame.display.set_caption(TITLE)
        self.board_rect = pygame.Rect(0, HEADER, COLS * CELL, ROWS * CELL)
        self._fonts: dict[tuple[int, bool], pygame.font.Font] = {}

    # ------------------------------------------------------------------- fonts

    def _font(self, size: int, bold: bool = False) -> pygame.font.Font:
        key = (size, bold)
        if key not in self._fonts:
            self._fonts[key] = pygame.font.SysFont(
                "segoeui,arial,dejavusans", size, bold=bold
            )
        return self._fonts[key]

    # ------------------------------------------------------------------ public

    def draw(self, game: SnakeGame, best: int, now: float) -> None:
        self.screen.fill(COLORS.background)
        self._draw_header(game, best)
        self._draw_board()
        self._draw_food(game, now)
        self._draw_snake(game)
        self._draw_overlay(game, best)

    # ------------------------------------------------------------------ pieces

    def _draw_header(self, game: SnakeGame, best: int) -> None:
        pygame.draw.rect(self.screen, COLORS.header, (0, 0, WINDOW_SIZE[0], HEADER))

        left_x = 24
        label = self._font(13, True).render("SCORE", True, COLORS.muted)
        value = self._font(28, True).render(str(game.score), True, COLORS.text)
        self.screen.blit(label, (left_x, 10))
        self.screen.blit(value, (left_x, 24))

        right = WINDOW_SIZE[0] - 24
        label = self._font(13, True).render("BEST", True, COLORS.muted)
        value = self._font(28, True).render(str(best), True, COLORS.text)
        self.screen.blit(label, (right - label.get_width(), 10))
        self.screen.blit(value, (right - value.get_width(), 24))

        speed = speed_for(game.score)
        meta = self._font(14).render(
            f"LEN {game.length}   ·   {speed:.1f} steps/s", True, COLORS.muted
        )
        self.screen.blit(
            meta, (WINDOW_SIZE[0] // 2 - meta.get_width() // 2, HEADER // 2 - 9)
        )

    def _draw_board(self) -> None:
        pygame.draw.rect(self.screen, COLORS.board, self.board_rect)
        for x in range(1, COLS):
            line_x = self.board_rect.x + x * CELL
            pygame.draw.line(
                self.screen,
                COLORS.grid,
                (line_x, self.board_rect.top),
                (line_x, self.board_rect.bottom - 1),
            )
        for y in range(1, ROWS):
            line_y = self.board_rect.y + y * CELL
            pygame.draw.line(
                self.screen,
                COLORS.grid,
                (self.board_rect.left, line_y),
                (self.board_rect.right - 1, line_y),
            )

    def _cell_center(self, cell: tuple[int, int]) -> tuple[int, int]:
        x, y = cell
        return (
            self.board_rect.x + x * CELL + CELL // 2,
            self.board_rect.y + y * CELL + CELL // 2,
        )

    def _draw_food(self, game: SnakeGame, now: float) -> None:
        if game.food is None:
            return
        cx, cy = self._cell_center(game.food)
        pulse = 0.5 + 0.5 * math.sin(now * 5.0)
        radius = int(CELL * 0.30 + pulse * CELL * 0.05)
        pygame.draw.circle(self.screen, COLORS.food_glow, (cx, cy), radius + 7)
        pygame.draw.circle(self.screen, COLORS.food, (cx, cy), radius)
        pygame.draw.circle(
            self.screen,
            _mix(COLORS.food, (255, 255, 255), 0.55),
            (cx - radius // 3, cy - radius // 3),
            max(2, radius // 4),
        )

    def _draw_snake(self, game: SnakeGame) -> None:
        segments = game.segments
        last = len(segments) - 1
        for index, cell in enumerate(segments):
            t = index / last if last else 0.0
            color = _snake_color(t)
            inset = 2 if index else 1
            rect = pygame.Rect(
                self.board_rect.x + cell[0] * CELL + inset,
                self.board_rect.y + cell[1] * CELL + inset,
                CELL - inset * 2,
                CELL - inset * 2,
            )
            radius = CELL // 4 if index else CELL // 3
            pygame.draw.rect(self.screen, color, rect, border_radius=radius)

        self._draw_eyes(game)

    def _draw_eyes(self, game: SnakeGame) -> None:
        cx, cy = self._cell_center(game.head)
        direction: Direction = game.direction
        eye_radius = max(2, CELL // 10)
        forward = CELL * 0.17
        sideways = CELL * 0.20
        pupil = max(1, eye_radius // 2)

        positions: list[tuple[float, float]] = []
        for side in (-1, 1):
            if direction in (Direction.LEFT, Direction.RIGHT):
                positions.append((cx + direction.dx * forward, cy + side * sideways))
            else:
                positions.append((cx + side * sideways, cy + direction.dy * forward))

        for ex, ey in positions:
            center = (round(ex), round(ey))
            pygame.draw.circle(self.screen, (245, 250, 255), center, eye_radius)
            pygame.draw.circle(
                self.screen,
                (17, 24, 39),
                (center[0] + direction.dx * 2, center[1] + direction.dy * 2),
                pupil,
            )

    # ----------------------------------------------------------------- overlay

    def _draw_overlay(self, game: SnakeGame, best: int) -> None:
        if game.status is Status.RUNNING:
            return

        dim = pygame.Surface(self.board_rect.size, pygame.SRCALPHA)
        dim.fill((*COLORS.overlay[:3], 148 if game.status is Status.READY else 190))
        self.screen.blit(dim, self.board_rect.topleft)

        title, lines = self._overlay_content(game, best)
        title_surface = self._font(52, True).render(title, True, COLORS.text)
        shadow = self._font(52, True).render(title, True, (4, 6, 10))

        entries: list[tuple[pygame.Surface, int]] = [(title_surface, 16)]
        for text, size, bold, color in lines:
            entries.append((self._font(size, bold).render(text, True, color), 8))

        total_height = sum(surface.get_height() + gap for surface, gap in entries) - 8
        if game.status is Status.READY:
            # Keep the start screen clear of the snake resting in the middle.
            y = self.board_rect.top + 56
        else:
            y = self.board_rect.centery - total_height // 2

        for surface, gap in entries:
            x = self.board_rect.centerx - surface.get_width() // 2
            if surface is title_surface:
                self.screen.blit(shadow, (x + 3, y + 3))
            self.screen.blit(surface, (x, y))
            y += surface.get_height() + gap

    def _overlay_content(
        self, game: SnakeGame, best: int
    ) -> tuple[str, list[tuple[str, int, bool, Color]]]:
        muted, text = COLORS.muted, COLORS.text
        if game.status is Status.READY:
            return "SNAKE", [
                ("Press SPACE or ENTER to start", 20, True, text),
                ("Arrows / WASD to steer  ·  P to pause", 15, False, muted),
            ]
        if game.status is Status.PAUSED:
            return "PAUSED", [
                ("Press P or SPACE to resume", 20, True, text),
                ("R restarts  ·  ESC quits", 15, False, muted),
            ]
        if game.status is Status.WON:
            return "YOU WIN!", [
                (f"Perfect game — score {game.score}", 20, True, text),
                ("Press R to play again", 15, False, muted),
            ]
        return "GAME OVER", [
            (f"Score {game.score}   ·   Best {best}", 20, True, text),
            ("Press R or SPACE to play again", 15, False, muted),
        ]
