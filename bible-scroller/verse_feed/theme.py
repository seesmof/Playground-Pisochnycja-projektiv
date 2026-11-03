"""Paper, ink and font helpers shared by the renderer."""

from __future__ import annotations

from functools import lru_cache

from PySide6.QtGui import QColor, QFontDatabase

PAPER = QColor("#ffffff")
INK = QColor("#000000")
MUTED = QColor(0, 0, 0, 110)  # reference line and hint
HAIRLINE = QColor(0, 0, 0, 110)


@lru_cache(maxsize=1)
def serif_family() -> str:
    families = set(QFontDatabase.families())
    for name in ("Georgia", "Noto Serif", "Cambria", "Times New Roman", "DejaVu Serif"):
        if name in families:
            return name
    return "Serif"


@lru_cache(maxsize=1)
def ui_family() -> str:
    families = set(QFontDatabase.families())
    for name in ("Segoe UI", "Inter", "Helvetica Neue", "Arial", "DejaVu Sans"):
        if name in families:
            return name
    return "Sans Serif"
