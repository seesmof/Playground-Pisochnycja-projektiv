"""Entry point: ``uv run main.py`` (or the packaged VerseFeed.exe)."""

from __future__ import annotations

import argparse
import os
import sys
import time
import traceback
from pathlib import Path


def find_bible(explicit: Path | None) -> Path:
    candidates: list[Path] = []

    if explicit is not None:
        candidates.append(explicit)

    # Packaged app: bible.json is bundled next to the executable's internal
    # files (one-folder builds put it under _internal, exposed as sys._MEIPASS).
    if getattr(sys, "frozen", False):
        bundle_root = Path(getattr(sys, "_MEIPASS", Path(sys.executable).parent))
        candidates.append(bundle_root / "bible.json")
        candidates.append(Path(sys.executable).parent / "bible.json")

    repo_root = Path(__file__).resolve().parent.parent
    candidates.extend(
        (
            Path.cwd() / "bible.json",
            Path.cwd().parent / "bible.json",
            repo_root / "bible.json",
        )
    )

    for candidate in candidates:
        resolved = candidate.expanduser().resolve()
        if resolved.is_file():
            return resolved

    raise SystemExit(
        "Could not find bible.json. Put it next to the app or pass --bible PATH."
    )


def _log(message: str) -> None:
    # A windowed PyInstaller build has no stdout.
    if sys.stdout is not None:
        print(message)


def _install_crash_log() -> None:
    """Write uncaught errors to a log when running without a console."""
    if sys.stderr is not None:
        return

    log_dir = Path(os.environ.get("LOCALAPPDATA", Path.home())) / "VerseFeed"

    def handle(exc_type, exc, tb) -> None:
        try:
            log_dir.mkdir(parents=True, exist_ok=True)
            with (log_dir / "crash.log").open("a", encoding="utf-8") as handle_file:
                handle_file.write(time.strftime("%Y-%m-%d %H:%M:%S\n"))
                traceback.print_exception(exc_type, exc, tb, file=handle_file)
                handle_file.write("\n")
        except Exception:
            pass

    sys.excepthook = handle


def main() -> None:
    parser = argparse.ArgumentParser(description="Random Bible verse feed")
    parser.add_argument("--bible", type=Path, help="Path to bible.json")
    parser.add_argument("--seed", type=int, help="Seed the random feed")
    parser.add_argument(
        "--screenshot",
        type=Path,
        help="Render the first page to a PNG and exit",
    )
    parser.add_argument("--width", type=int, default=430, help="Window width")
    parser.add_argument("--height", type=int, default=860, help="Window height")
    args = parser.parse_args()

    _install_crash_log()

    from PySide6.QtCore import Qt
    from PySide6.QtGui import QGuiApplication
    from PySide6.QtWidgets import QApplication

    from verse_feed.bible import RandomFeed, load_verses
    from verse_feed.window import MainWindow

    QGuiApplication.setHighDpiScaleFactorRoundingPolicy(
        Qt.HighDpiScaleFactorRoundingPolicy.PassThrough
    )

    app = QApplication(sys.argv)
    app.setApplicationName("Verse Feed")
    app.setApplicationDisplayName("Біблія — випадкові вірші")

    started = time.perf_counter()
    bible = find_bible(args.bible)
    rows = load_verses(bible)
    feed = RandomFeed(rows, seed=args.seed)
    elapsed_ms = (time.perf_counter() - started) * 1000

    window = MainWindow(feed)
    window.resize(args.width, args.height)

    if args.screenshot is not None:
        args.screenshot.parent.mkdir(parents=True, exist_ok=True)
        window.show()
        app.processEvents()
        if not window.deck.grab().save(str(args.screenshot)):
            raise SystemExit(f"Could not save screenshot to {args.screenshot}")
        window.close()
        _log(
            f"Loaded {len(rows):,} verses in {elapsed_ms:.0f} ms; "
            f"wrote {args.screenshot}"
        )
        return

    window.show()
    window.deck.setFocus()
    _log(f"Loaded {len(rows):,} verses from {bible.name} in {elapsed_ms:.0f} ms")
    sys.exit(app.exec())


if __name__ == "__main__":
    main()
