"""The paged verse deck: rendering, animation and input handling."""

from __future__ import annotations

import math
import time

from PySide6.QtCore import (
    QAbstractAnimation,
    QEasingCurve,
    QSize,
    Qt,
    QTimer,
    QVariantAnimation,
)
from PySide6.QtGui import QKeyEvent, QMouseEvent, QPainter, QWheelEvent
from PySide6.QtWidgets import QWidget

from .bible import RandomFeed
from .render import PageRenderer, draw_hint
from .theme import PAPER

PREFETCH_AHEAD = 8
ANIMATION_MS = 260
DRAG_THRESHOLD = 0.16
FLICK_VELOCITY = 900.0  # pixels per second
WHEEL_PIXEL_THRESHOLD = 70.0
WHEEL_NOTCH_THRESHOLD = 0.85


class VerseDeck(QWidget):
    """One full-window verse per page, navigated by wheel, keys or drag."""

    def __init__(self, feed: RandomFeed, parent: QWidget | None = None) -> None:
        super().__init__(parent)

        self._feed = feed
        self._index = 0
        self._offset = 0.0
        self._renderer = PageRenderer()

        self._hint_opacity = 1.0
        self._hint_dismissed = False

        self._anim = QVariantAnimation(self)
        self._anim.setDuration(ANIMATION_MS)
        self._anim.setEasingCurve(QEasingCurve.Type.OutCubic)
        self._anim.valueChanged.connect(self._on_animation_value)
        self._anim.finished.connect(self._on_animation_finished)
        self._anim_target = 0.0
        self._queued_step = 0

        self._hint_anim = QVariantAnimation(self)
        self._hint_anim.setDuration(420)
        self._hint_anim.setEasingCurve(QEasingCurve.Type.OutCubic)
        self._hint_anim.valueChanged.connect(self._on_hint_value)

        self._wheel_pixels = 0.0
        self._wheel_notches = 0.0
        self._wheel_timer = QTimer(self)
        self._wheel_timer.setSingleShot(True)
        self._wheel_timer.timeout.connect(self._reset_wheel)

        self._dragging = False
        self._drag_start_y = 0.0
        self._drag_start_offset = 0.0
        self._drag_delta = 0.0
        self._drag_started_at = 0.0

        self.setFocusPolicy(Qt.FocusPolicy.StrongFocus)
        self.setAttribute(Qt.WidgetAttribute.WA_OpaquePaintEvent, True)
        self.setCursor(Qt.CursorShape.OpenHandCursor)

        self._feed.ensure(PREFETCH_AHEAD + 4)

    # ------------------------------------------------------------------ paint

    def paintEvent(self, event) -> None:
        painter = QPainter(self)
        painter.setRenderHint(QPainter.RenderHint.SmoothPixmapTransform, True)
        painter.fillRect(self.rect(), PAPER)

        width = self.width()
        height = self.height()
        dpr = self.devicePixelRatioF()

        first = math.floor(self._offset) - 1
        last = math.ceil(self._offset) + 1

        for relative in range(first, last + 1):
            index = self._index + relative
            if index < 0:
                continue

            verse = self._feed.get(index)
            pixmap = self._renderer.pixmap(verse, width, height, dpr)
            y = round((relative - self._offset) * height)
            painter.drawPixmap(0, y, pixmap)

        draw_hint(painter, width, height, self._hint_opacity)
        painter.end()

    # -------------------------------------------------------------- animation

    def _go(self, step: int) -> None:
        if step == 0:
            return
        if step < 0 and self._index == 0:
            return

        if self._anim.state() == QAbstractAnimation.State.Running:
            self._queued_step = step
            return

        self._feed.ensure(self._index + 2)
        self._animate_to(1.0 if step > 0 else -1.0)

    def _animate_to(self, target: float) -> None:
        self._anim.stop()
        self._anim_target = target
        self._anim.setStartValue(float(self._offset))
        self._anim.setEndValue(float(target))
        self._anim.start()

    def _on_animation_value(self, value: object) -> None:
        self._offset = float(value)
        self.update()

    def _on_animation_finished(self) -> None:
        step = int(round(self._anim_target))
        self._offset = 0.0

        if step:
            self._index = max(0, self._index + step)
            self._feed.ensure(self._index + PREFETCH_AHEAD + 2)
            if not self._hint_dismissed:
                self._dismiss_hint()

        self.update()

        if self._queued_step:
            queued = self._queued_step
            self._queued_step = 0
            self._go(queued)

    def _dismiss_hint(self) -> None:
        self._hint_dismissed = True
        self._hint_anim.stop()
        self._hint_anim.setStartValue(float(self._hint_opacity))
        self._hint_anim.setEndValue(0.0)
        self._hint_anim.start()

    def _on_hint_value(self, value: object) -> None:
        self._hint_opacity = float(value)
        self.update()

    # ------------------------------------------------------------------ input

    def wheelEvent(self, event: QWheelEvent) -> None:
        pixels = event.pixelDelta().y()
        if pixels:
            self._wheel_pixels -= pixels
            if abs(self._wheel_pixels) >= WHEEL_PIXEL_THRESHOLD:
                self._go(1 if self._wheel_pixels > 0 else -1)
                self._wheel_pixels = 0.0
        else:
            notches = event.angleDelta().y() / 120.0
            self._wheel_notches -= notches
            if abs(self._wheel_notches) >= WHEEL_NOTCH_THRESHOLD:
                self._go(1 if self._wheel_notches > 0 else -1)
                self._wheel_notches = 0.0

        self._wheel_timer.start(240)
        event.accept()

    def _reset_wheel(self) -> None:
        self._wheel_pixels = 0.0
        self._wheel_notches = 0.0

    def mousePressEvent(self, event: QMouseEvent) -> None:
        if event.button() != Qt.MouseButton.LeftButton:
            super().mousePressEvent(event)
            return

        self._anim.stop()
        self._dragging = True
        self._drag_start_y = event.position().y()
        self._drag_start_offset = self._offset
        self._drag_delta = 0.0
        self._drag_started_at = time.perf_counter()
        self._feed.ensure(self._index + 2)
        self.setCursor(Qt.CursorShape.ClosedHandCursor)
        event.accept()

    def mouseMoveEvent(self, event: QMouseEvent) -> None:
        if not self._dragging:
            super().mouseMoveEvent(event)
            return

        delta = event.position().y() - self._drag_start_y
        self._drag_delta = delta

        offset = self._drag_start_offset - delta / max(1, self.height())
        if self._index == 0 and offset < 0:
            offset = max(-0.32, offset * 0.35)

        self._offset = max(-1.1, min(1.1, offset))
        self.update()
        event.accept()

    def mouseReleaseEvent(self, event: QMouseEvent) -> None:
        if event.button() != Qt.MouseButton.LeftButton or not self._dragging:
            super().mouseReleaseEvent(event)
            return

        self._dragging = False
        self.setCursor(Qt.CursorShape.OpenHandCursor)

        elapsed = max(0.001, time.perf_counter() - self._drag_started_at)
        velocity = self._drag_delta / elapsed
        offset = self._offset

        target = 0.0
        if offset > DRAG_THRESHOLD or velocity < -FLICK_VELOCITY:
            target = 1.0
        elif offset < -DRAG_THRESHOLD or velocity > FLICK_VELOCITY:
            target = -1.0

        if target < 0 and self._index == 0:
            target = 0.0
        if target > 0:
            self._feed.ensure(self._index + 2)

        self._animate_to(target)
        event.accept()

    def keyPressEvent(self, event: QKeyEvent) -> None:
        key = event.key()

        if key in (Qt.Key.Key_Down, Qt.Key.Key_PageDown, Qt.Key.Key_Space):
            self._go(1)
            event.accept()
            return

        if key in (Qt.Key.Key_Up, Qt.Key.Key_PageUp):
            self._go(-1)
            event.accept()
            return

        if key == Qt.Key.Key_F11:
            window = self.window()
            if window.isFullScreen():
                window.showNormal()
            else:
                window.showFullScreen()
            event.accept()
            return

        if key == Qt.Key.Key_Escape and self.window().isFullScreen():
            self.window().showNormal()
            event.accept()
            return

        super().keyPressEvent(event)

    # ----------------------------------------------------------------- layout

    def resizeEvent(self, event) -> None:
        self._anim.stop()
        self._offset = 0.0
        self._queued_step = 0
        self._renderer.clear()
        super().resizeEvent(event)
        self.update()

    def sizeHint(self) -> QSize:
        return QSize(430, 860)
