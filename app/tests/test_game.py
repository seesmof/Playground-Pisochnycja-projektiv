"""Rules-level tests that never open a window."""

from __future__ import annotations

import random
from collections import deque

import pytest

from snake.game import Direction, SnakeGame, Status


def make_game(cols: int = 12, rows: int = 10, seed: int = 7) -> SnakeGame:
    return SnakeGame(cols, rows, rng=random.Random(seed))


def start(game: SnakeGame) -> SnakeGame:
    game.start()
    return game


def test_starts_ready_with_even_snake_and_food() -> None:
    game = make_game()
    assert game.status is Status.READY
    assert game.length == 3
    assert game.score == 0
    assert game.food is not None
    assert game.food not in game.segments
    assert len(set(game.segments)) == game.length


def test_step_moves_forward_without_growing() -> None:
    game = start(make_game())
    head = game.head
    game.step()
    assert game.head == (head[0] + 1, head[1])
    assert game.length == 3
    assert game.status is Status.RUNNING


def test_cannot_reverse_into_itself() -> None:
    game = start(make_game())
    assert game.turn(Direction.LEFT) is False
    game.turn(Direction.UP)
    game.step()
    assert game.direction is Direction.UP
    assert game.status is Status.RUNNING


def test_queued_turn_is_applied_on_next_step() -> None:
    game = start(make_game())
    game.turn(Direction.UP)
    game.turn(Direction.LEFT)
    game.step()
    assert game.direction is Direction.UP
    game.step()
    assert game.direction is Direction.LEFT


def test_turn_queue_is_capped() -> None:
    game = start(make_game())
    assert game.turn(Direction.UP) is True
    assert game.turn(Direction.LEFT) is True
    assert game.turn(Direction.DOWN) is False


def test_wall_collision_ends_game() -> None:
    game = start(make_game())
    for _ in range(game.cols):
        game.step()
    assert game.status is Status.GAME_OVER


def test_eating_food_grows_snake_and_scores() -> None:
    game = start(make_game())
    ahead = (game.head[0] + 1, game.head[1])
    game.food = ahead
    game.step()
    assert game.score == 1
    assert game.length == 4
    assert game.head == ahead
    assert game.food != ahead
    assert game.food not in game.segments


def test_self_collision_ends_game() -> None:
    game = start(make_game())
    # Grow to length 5, then bite the body with a tight loop.
    game.food = (game.head[0] + 1, game.head[1])
    game.step()
    game.food = (game.head[0] + 1, game.head[1])
    game.step()

    for direction in (Direction.UP, Direction.LEFT, Direction.DOWN):
        game.turn(direction)
        game.step()
        if game.status is Status.GAME_OVER:
            break

    assert game.status is Status.GAME_OVER


def test_pause_freezes_the_board() -> None:
    game = start(make_game())
    head = game.head
    game.toggle_pause()
    game.step()
    assert game.head == head
    game.toggle_pause()
    game.step()
    assert game.head != head


def test_restart_clears_score_and_resumes() -> None:
    game = start(make_game())
    game.food = (game.head[0] + 1, game.head[1])
    game.step()
    game.restart()
    assert game.score == 0
    assert game.status is Status.RUNNING
    assert game.length == 3


def test_filling_the_board_wins() -> None:
    game = make_game(cols=6, rows=6)
    # Cover every cell but one, leaving the head next to the final free cell.
    cells = [
        (x, y) for y in range(6) for x in range(6) if (x, y) not in {(4, 5), (5, 5)}
    ]
    game._segments = deque([(4, 5), *cells])
    game.direction = Direction.RIGHT
    game.food = (5, 5)
    game.start()

    game.step()

    assert game.status is Status.WON
    assert game.score == 1
    assert game.length == 36


def test_rejects_tiny_boards() -> None:
    with pytest.raises(ValueError):
        SnakeGame(cols=4, rows=4)
