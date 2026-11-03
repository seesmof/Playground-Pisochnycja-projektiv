"""Application window and icon."""

from __future__ import annotations

from PySide6.QtCore import QRectF, Qt
from PySide6.QtGui import QFont, QGuiApplication, QIcon, QPainter, QPixmap
from PySide6.QtWidgets import QMainWindow

from .bible import RandomFeed
from .deck import VerseDeck
from .theme import INK, PAPER, serif_family


def make_icon_pixmap(size: int) -> QPixmap:
    """Black tile, white serif Б — used for the window and the .ico file."""
    pixmap = QPixmap(size, size)
    pixmap.fill(Qt.GlobalColor.transparent)

    painter = QPainter(pixmap)
    painter.setRenderHint(QPainter.RenderHint.Antialiasing, True)
    painter.setRenderHint(QPainter.RenderHint.TextAntialiasing, True)

    radius = size * 0.22
    painter.setPen(Qt.PenStyle.NoPen)
    painter.setBrush(INK)
    painter.drawRoundedRect(QRectF(0, 0, size, size), radius, radius)

    font = QFont(serif_family())
    font.setPixelSize(max(8, round(size * 0.66)))
    painter.setFont(font)
    painter.setPen(PAPER)
    painter.drawText(pixmap.rect(), Qt.AlignmentFlag.AlignCenter, "Б")
    painter.end()

    return pixmap


def make_app_icon() -> QIcon:
    icon = QIcon()
    for size in (16, 24, 32, 48, 64, 128, 256):
        icon.addPixmap(make_icon_pixmap(size))
    return icon


class MainWindow(QMainWindow):
    def __init__(self, feed: RandomFeed) -> None:
        super().__init__()

        self.deck = VerseDeck(feed)
        self.setCentralWidget(self.deck)

        self.setWindowTitle("Біблія — випадкові вірші")
        self.setStyleSheet("QMainWindow { background: #ffffff; }")
        self.setWindowIcon(make_app_icon())
        self.resize(430, 860)
        self.setMinimumSize(320, 520)

        screen = QGuiApplication.primaryScreen()
        if screen is not None:
            geometry = screen.availableGeometry()
            self.move(
                geometry.center().x() - self.width() // 2,
                geometry.center().y() - self.height() // 2,
            )
