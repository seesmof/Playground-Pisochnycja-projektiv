"""Renders one verse page to a cached QPixmap.

Pages are pre-rendered at the current window size and blitted while scrolling,
so dragging stays smooth regardless of verse length.
"""

from __future__ import annotations

from collections import OrderedDict

from PySide6.QtCore import QPointF, QRectF, Qt
from PySide6.QtGui import (
    QFont,
    QFontMetricsF,
    QPainter,
    QPixmap,
    QTextBlockFormat,
    QTextCharFormat,
    QTextCursor,
    QTextDocument,
    QTextOption,
)

from .bible import Verse
from .theme import HAIRLINE, INK, PAPER, serif_family, ui_family

MIN_FONT_SIZE = 12.0
MAX_FONT_SIZE = 56.0
HINT_ZONE = 58.0


def _text_document(text: str, width: float, font: QFont) -> QTextDocument:
    document = QTextDocument()
    document.setDocumentMargin(0)
    document.setDefaultFont(font)

    option = QTextOption()
    option.setWrapMode(QTextOption.WrapMode.WrapAtWordBoundaryOrAnywhere)
    option.setAlignment(Qt.AlignmentFlag.AlignLeft)
    document.setDefaultTextOption(option)

    cursor = QTextCursor(document)
    block = QTextBlockFormat()
    block.setLineHeight(
        112.0, QTextBlockFormat.LineHeightTypes.ProportionalHeight.value
    )
    cursor.setBlockFormat(block)

    char = QTextCharFormat()
    char.setForeground(INK)
    cursor.insertText(text, char)

    document.setTextWidth(width)
    return document


def _reference_font(width: float) -> QFont:
    font = QFont(ui_family())
    font.setPixelSize(max(10, min(13, round(width * 0.027))))
    font.setWeight(QFont.Weight.DemiBold)
    font.setLetterSpacing(QFont.SpacingType.AbsoluteSpacing, 1.6)
    return font


def paint_page(painter: QPainter, verse: Verse, width: float, height: float) -> None:
    painter.fillRect(QRectF(0, 0, width, height), PAPER)

    margin_x = max(30.0, min(width * 0.095, 110.0))
    content_width = max(80.0, min(width - margin_x * 2, 760.0))
    margin_y = max(36.0, height * 0.08)
    available_height = height - margin_y * 2 - HINT_ZONE

    reference_font = _reference_font(width)
    reference_text = verse.reference.upper()
    reference_metrics = QFontMetricsF(reference_font)
    reference_height = reference_metrics.height()
    gap = max(16.0, min(28.0, height * 0.028))

    font = QFont(serif_family())
    size = max(19.0, min(MAX_FONT_SIZE, width * 0.095, height * 0.052))
    document = _text_document(verse.text, content_width, font)

    while True:
        font.setPixelSize(max(MIN_FONT_SIZE, int(round(size))))
        font.setWeight(QFont.Weight.Normal)
        font.setLetterSpacing(QFont.SpacingType.AbsoluteSpacing, -0.2)
        document = _text_document(verse.text, content_width, font)
        text_height = document.size().height()

        if text_height + gap + reference_height <= available_height:
            break
        if size <= MIN_FONT_SIZE:
            break
        size *= 0.93

    block_height = text_height + gap + reference_height
    top = max(margin_y, (height - block_height) / 2 - height * 0.015)
    left = (width - content_width) / 2

    painter.save()
    painter.translate(left, top)
    painter.setPen(INK)
    document.drawContents(
        painter, QRectF(0, 0, content_width, text_height)
    )

    reference_top = text_height + gap
    rule_width = 22.0
    painter.setPen(Qt.PenStyle.NoPen)
    painter.setBrush(HAIRLINE)
    painter.drawRect(QRectF(0, reference_top + reference_height / 2, rule_width, 1))

    painter.setFont(reference_font)
    painter.setPen(HAIRLINE)
    painter.drawText(
        QRectF(
            rule_width + 10,
            reference_top,
            content_width - rule_width - 10,
            reference_height,
        ),
        Qt.AlignmentFlag.AlignLeft | Qt.AlignmentFlag.AlignVCenter,
        reference_text,
    )
    painter.restore()


class PageRenderer:
    """LRU cache of rendered pages keyed by verse + viewport size."""

    def __init__(self, max_cached: int = 48) -> None:
        self._max_cached = max_cached
        self._cache: OrderedDict[tuple[object, ...], QPixmap] = OrderedDict()

    def clear(self) -> None:
        self._cache.clear()

    def pixmap(
        self, verse: Verse, width: int, height: int, device_pixel_ratio: float
    ) -> QPixmap:
        key = (
            verse.reference,
            verse.text,
            width,
            height,
            round(device_pixel_ratio, 2),
        )
        cached = self._cache.get(key)
        if cached is not None:
            self._cache.move_to_end(key)
            return cached

        pixmap = QPixmap(
            max(1, round(width * device_pixel_ratio)),
            max(1, round(height * device_pixel_ratio)),
        )
        pixmap.setDevicePixelRatio(device_pixel_ratio)
        pixmap.fill(PAPER)

        painter = QPainter(pixmap)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing, True)
        painter.setRenderHint(QPainter.RenderHint.TextAntialiasing, True)
        paint_page(painter, verse, float(width), float(height))
        painter.end()

        self._cache[key] = pixmap
        while len(self._cache) > self._max_cached:
            self._cache.popitem(last=False)

        return pixmap


def draw_hint(painter: QPainter, width: float, height: float, opacity: float) -> None:
    if opacity <= 0.01:
        return

    painter.save()
    painter.setOpacity(opacity)

    font = QFont(ui_family())
    font.setPixelSize(max(9, min(12, round(width * 0.022))))
    font.setWeight(QFont.Weight.DemiBold)
    font.setLetterSpacing(QFont.SpacingType.AbsoluteSpacing, 2.4)
    painter.setFont(font)
    painter.setPen(HAIRLINE)

    label = "ГОРТАЙТЕ ВГОРУ"
    metrics = QFontMetricsF(font)
    label_width = metrics.horizontalAdvance(label)
    label_height = metrics.height()

    bottom = max(20.0, height * 0.045)
    chevron_height = 11.0
    chevron_width = 18.0
    gap = 7.0
    chevron_top = height - bottom - chevron_height
    label_top = chevron_top - gap - label_height

    painter.drawText(
        QRectF((width - label_width) / 2, label_top, label_width, label_height),
        Qt.AlignmentFlag.AlignCenter,
        label,
    )

    cx = width / 2
    pen = painter.pen()
    pen.setWidthF(1.4)
    pen.setColor(HAIRLINE)
    painter.setPen(pen)
    painter.drawLine(
        QPointF(cx - chevron_width / 2, chevron_top + chevron_height),
        QPointF(cx, chevron_top),
    )
    painter.drawLine(
        QPointF(cx, chevron_top),
        QPointF(cx + chevron_width / 2, chevron_top + chevron_height),
    )
    painter.restore()
