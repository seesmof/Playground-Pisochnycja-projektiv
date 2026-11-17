from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

FONT_PATH = "C:/Windows/Fonts/DejaVuSans.ttf"


def wrap_text(text: str, font, max_width: int, draw: ImageDraw.ImageDraw) -> list[str]:
    words = text.split()
    if not words:
        return []
    lines: list[str] = []
    current = words[0]
    for word in words[1:]:
        candidate = f"{current} {word}"
        if draw.textlength(candidate, font=font) <= max_width:
            current = candidate
        else:
            lines.append(current)
            current = word
    lines.append(current)
    return lines


def render_frame(text: str, output: Path) -> None:
    width, height = 1080, 1920
    image = Image.new("RGB", (width, height), "#FFFFFF")
    draw = ImageDraw.Draw(image)
    verse_font = ImageFont.truetype(FONT_PATH, 76)

    margin = 105
    lines = wrap_text(text, verse_font, width - margin * 2, draw)
    line_height = 106
    y = (height - len(lines) * line_height) / 2 - 40
    for line in lines:
        box = draw.textbbox((0, 0), line, font=verse_font)
        draw.text(((width - (box[2] - box[0])) / 2, y), line, font=verse_font, fill="#111827")
        y += line_height

    image.save(output)