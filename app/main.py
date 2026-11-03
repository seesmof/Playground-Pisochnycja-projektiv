"""Entry point: run the Snake game window."""

from __future__ import annotations

import pygame

from snake.config import FPS, speed_for
from snake.game import Direction, SnakeGame, Status
from snake.renderer import Renderer

KEY_TO_DIRECTION = {
    pygame.K_UP: Direction.UP,
    pygame.K_w: Direction.UP,
    pygame.K_DOWN: Direction.DOWN,
    pygame.K_s: Direction.DOWN,
    pygame.K_LEFT: Direction.LEFT,
    pygame.K_a: Direction.LEFT,
    pygame.K_RIGHT: Direction.RIGHT,
    pygame.K_d: Direction.RIGHT,
}

QUIT_KEYS = {pygame.K_ESCAPE, pygame.K_q}


def main() -> None:
    pygame.init()
    try:
        renderer = Renderer()
        clock = pygame.time.Clock()
        game = SnakeGame()
        best = 0
        accumulator = 0.0
        running = True

        while running:
            dt = min(clock.tick(FPS) / 1000.0, 0.25)

            for event in pygame.event.get():
                if event.type == pygame.KEYDOWN:
                    running = handle_key(game, event.key)
                elif event.type == pygame.QUIT:
                    running = False

            if game.status is Status.RUNNING:
                accumulator += dt
                interval = 1.0 / speed_for(game.score)
                while accumulator >= interval and game.status is Status.RUNNING:
                    game.step()
                    accumulator -= interval
                    interval = 1.0 / speed_for(game.score)
                best = max(best, game.score)
            else:
                accumulator = 0.0

            renderer.draw(game, best, pygame.time.get_ticks() / 1000.0)
            pygame.display.flip()
    finally:
        pygame.quit()


def handle_key(game: SnakeGame, key: int) -> bool:
    """Apply a key press. Returns False when the player asked to quit."""
    if key in QUIT_KEYS:
        return False
    if key in KEY_TO_DIRECTION:
        game.turn(KEY_TO_DIRECTION[key])
    elif key == pygame.K_r:
        game.restart()
    elif key == pygame.K_p:
        game.toggle_pause()
    elif key in (pygame.K_SPACE, pygame.K_RETURN):
        if game.status is Status.READY:
            game.start()
        elif game.status in (Status.RUNNING, Status.PAUSED):
            game.toggle_pause()
        else:
            game.restart()
    return True


if __name__ == "__main__":
    main()
