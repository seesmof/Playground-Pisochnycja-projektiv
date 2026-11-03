"""Generate assets/verse-feed.ico from the app's own icon drawing."""

from __future__ import annotations

import struct
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from PySide6.QtCore import QBuffer, QIODevice  # noqa: E402
from PySide6.QtGui import QGuiApplication  # noqa: E402

from verse_feed.window import make_icon_pixmap  # noqa: E402

SIZES = (16, 24, 32, 48, 64, 128, 256)


def _png_bytes(size: int) -> bytes:
    buffer = QBuffer()
    buffer.open(QIODevice.OpenModeFlag.WriteOnly)
    make_icon_pixmap(size).save(buffer, "PNG")
    return bytes(buffer.data())


def main() -> None:
    app = QGuiApplication([])
    payloads = [_png_bytes(size) for size in SIZES]

    target = ROOT / "assets" / "verse-feed.ico"
    target.parent.mkdir(parents=True, exist_ok=True)

    offset = 6 + 16 * len(SIZES)
    entries = []
    for size, payload in zip(SIZES, payloads):
        dimension = 0 if size >= 256 else size
        entries.append(
            struct.pack(
                "<BBBBHHII",
                dimension,
                dimension,
                0,
                0,
                1,
                32,
                len(payload),
                offset,
            )
        )
        offset += len(payload)

    with target.open("wb") as handle:
        handle.write(struct.pack("<HHH", 0, 1, len(SIZES)))
        for entry in entries:
            handle.write(entry)
        for payload in payloads:
            handle.write(payload)

    print(f"Wrote {target} ({target.stat().st_size:,} bytes)")
    app.quit()


if __name__ == "__main__":
    main()
