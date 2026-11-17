"""
The picture on top of which the video is built.

It draws ONE still image: a white 1080x1920 canvas with the verse text centred
vertically and horizontally. No titles, no decorations - only the verse.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

from config import (
    FONT_CANDIDATES,
    FRAME_BACKGROUND,
    TEXT_COLOR,
    VERSE_FONT_MAX,
    VERSE_FONT_MIN,
    VERSE_SIDE_MARGIN,
    VIDEO_HEIGHT,
    VIDEO_WIDTH,
)

# The text block may not grow taller than this share of the frame.
MAX_TEXT_HEIGHT = int(VIDEO_HEIGHT * 0.75)


def _load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    """Return a font of the given size that can draw Ukrainian letters.

    The first existing file from FONT_CANDIDATES is used. If none is found
    (unlikely), Pillow's built-in font is the last resort.
    """
    for candidate in FONT_CANDIDATES:
        if Path(candidate).exists():
            try:
                return ImageFont.truetype(candidate, size)
            except OSError:
                # File exists but cannot be loaded - just try the next one.
                continue

    return ImageFont.load_default(size=size)


def _wrap(text: str, font, draw: ImageDraw.ImageDraw, max_width: int) -> list[str]:
    """Split `text` into lines that are not wider than `max_width` pixels.

    Words are added one by one; a word that would make the line too long starts
    a new line instead.
    """
    lines: list[str] = []
    current = ""

    for word in text.split():
        candidate = word if not current else f"{current} {word}"

        # `draw.textlength` tells us how many pixels the candidate line needs.
        if not current or draw.textlength(candidate, font=font) <= max_width:
            current = candidate
        else:
            lines.append(current)
            current = word

    if current:
        lines.append(current)

    return lines


def make_frame(verse: str, folder: Path) -> Path:
    """Draw the verse and save it as `frame.png` inside `folder`.

    Returns the path of the saved image.
    """
    image = Image.new("RGB", (VIDEO_WIDTH, VIDEO_HEIGHT), FRAME_BACKGROUND)
    draw = ImageDraw.Draw(image)

    # Horizontal space the text is allowed to use.
    max_width = VIDEO_WIDTH - 2 * VERSE_SIDE_MARGIN

    # Try the biggest font first and shrink it until the whole verse fits.
    font_size = VERSE_FONT_MAX
    while True:
        font = _load_font(font_size)
        lines = _wrap(verse, font, draw, max_width)
        line_height = int(font_size * 1.4)  # distance between two lines

        fits = len(lines) * line_height <= MAX_TEXT_HEIGHT
        if fits or font_size <= VERSE_FONT_MIN:
            break
        font_size -= 4

    # Start high enough that the whole block ends up in the vertical middle.
    y = (VIDEO_HEIGHT - len(lines) * line_height) // 2

    for line in lines:
        # Centring: (canvas width - text width) / 2
        x = (VIDEO_WIDTH - draw.textlength(line, font=font)) / 2
        draw.text((x, y), line, font=font, fill=TEXT_COLOR)
        y += line_height

    frame_path = folder / "frame.png"
    image.save(frame_path)
    return frame_path