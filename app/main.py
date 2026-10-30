from __future__ import annotations

import json
import sys
import textwrap
from datetime import datetime
from html.parser import HTMLParser
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

BASE_URL = "https://bolls.life"
FAVORITES_FILE = Path(__file__).with_name("favorites.json")
TIMEOUT = 12

TRANSLATIONS = {
    "UBIO": "Українська — переклад Івана Огієнка",
    "YLT": "English — Young's Literal Translation",
    "SYNOD": "Русский — Синодальный перевод",
}


class HTMLTextParser(HTMLParser):
    """Convert the API's HTML-formatted verse text into readable plain text."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag in {"br", "p", "div", "li"}:
            self.parts.append(" ")

    def handle_data(self, data: str) -> None:
        self.parts.append(data)

    def get_text(self) -> str:
        return " ".join(" ".join(self.parts).split())


def fetch_json(url: str) -> Any:
    """GET JSON from Bolls.life and report common network/API errors clearly."""
    request = Request(
        url,
        headers={"User-Agent": "RandomBibleVerse/1.0 (personal console app)"},
    )

    try:
        with urlopen(request, timeout=TIMEOUT) as response:
            return json.loads(response.read().decode("utf-8"))
    except HTTPError as exc:
        raise RuntimeError(f"API returned HTTP {exc.code}.") from exc
    except (URLError, TimeoutError) as exc:
        raise RuntimeError(
            "Could not connect to Bolls.life. Check your internet connection."
        ) from exc
    except json.JSONDecodeError as exc:
        raise RuntimeError("Bolls.life returned an invalid JSON response.") from exc


def get_book_names(translation: str) -> dict[int, str]:
    """Fetch book names for this translation and map book IDs to names."""
    data = fetch_json(f"{BASE_URL}/get-books/{translation}/")
    if not isinstance(data, list):
        raise RuntimeError("Unexpected response while loading the Bible book list.")

    books: dict[int, str] = {}
    for item in data:
        try:
            books[int(item["bookid"])] = str(item["name"])
        except (KeyError, TypeError, ValueError):
            continue
    return books


def get_random_verse(translation: str, book_names: dict[int, str]) -> dict[str, Any]:
    data = fetch_json(f"{BASE_URL}/get-random-verse/{translation}/")
    if not isinstance(data, dict):
        raise RuntimeError("The API returned an unexpected verse format.")

    try:
        book_id = int(data["book"])
        chapter = int(data["chapter"])
        verse_number = int(data["verse"])
        raw_text = str(data["text"])
    except (KeyError, TypeError, ValueError) as exc:
        raise RuntimeError(
            "The API response is missing required verse information."
        ) from exc

    parser = HTMLTextParser()
    parser.feed(raw_text)
    verse_text = parser.get_text()
    if not verse_text:
        raise RuntimeError("The API returned an empty verse.")

    book_name = book_names.get(book_id, f"Книга №{book_id}")
    reference = f"{book_name} {chapter}:{verse_number}"
    verse_url = (
        f"{BASE_URL}/get-verse/{translation}/{book_id}/{chapter}/{verse_number}/"
    )

    return {
        "pk": data.get("pk"),
        "translation": translation,
        "reference": reference,
        "text": verse_text,
        "url": verse_url,
    }


def load_favorites() -> list[dict[str, Any]]:
    if not FAVORITES_FILE.exists():
        return []

    try:
        data = json.loads(FAVORITES_FILE.read_text(encoding="utf-8"))
        return data if isinstance(data, list) else []
    except (OSError, json.JSONDecodeError):
        print("Не вдалося прочитати favorites.json. Починаю зі списку обраного.")
        return []


def save_favorite(verse: dict[str, Any], favorites: list[dict[str, Any]]) -> None:
    # A verse is unique by its translation and Bolls.life primary key.
    verse_key = (verse["translation"], verse.get("pk"))
    if any(
        (item.get("translation"), item.get("pk")) == verse_key for item in favorites
    ):
        print("Цей вірш уже є в обраному.")
        return

    favorite = {
        **verse,
        "saved_at": datetime.now().astimezone().isoformat(timespec="seconds"),
    }
    favorites.append(favorite)

    try:
        FAVORITES_FILE.write_text(
            json.dumps(favorites, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        print("Вірш збережено у favorites.json.")
    except OSError as exc:
        favorites.pop()
        print(f"Не вдалося зберегти файл: {exc}")


def print_verse(verse: dict[str, Any]) -> None:
    width = min(max(50, shutil_width() - 4), 76)
    print("\n" + "─" * width)
    print(f"{verse['reference']}  [{verse['translation']}]")
    print("─" * width)
    print(textwrap.fill(verse["text"], width=width))
    print("\nДжерело: " + verse["url"])
    print("─" * width)


def print_favorites(favorites: list[dict[str, Any]]) -> None:
    if not favorites:
        print("\nСписок обраного поки порожній.")
        return

    print("\nОБРАНІ ВІРШІ")
    print("=" * 40)
    for index, verse in enumerate(favorites, start=1):
        print(
            f"\n{index}. {verse.get('reference', 'Невідоме посилання')} [{verse.get('translation', '?')}]"
        )
        print(
            textwrap.fill(
                str(verse.get("text", "")),
                width=72,
                initial_indent="   ",
                subsequent_indent="   ",
            )
        )


def choose_translation() -> str:
    print("\nОберіть переклад:")
    for code, description in TRANSLATIONS.items():
        print(f"  {code:<6} — {description}")

    while True:
        choice = input("Переклад [UBIO]: ").strip().upper() or "UBIO"
        if choice in TRANSLATIONS:
            return choice
        print("Невідомий код. Оберіть один із наведених варіантів.")


def shutil_width() -> int:
    # Kept in a helper so the app still works in terminals without a known width.
    try:
        import shutil

        return shutil.get_terminal_size((80, 24)).columns
    except OSError:
        return 80


def main() -> None:
    print("=" * 42)
    print("          RANDOM BIBLE VERSE")
    print("       A small Scripture companion")
    print("=" * 42)

    translation = choose_translation()
    favorites = load_favorites()
    book_names: dict[int, str] = {}
    current_verse: dict[str, Any] | None = None

    while True:
        if not book_names:
            try:
                book_names = get_book_names(translation)
            except RuntimeError as exc:
                print(f"\nПомилка завантаження списку книг: {exc}")
                print("Спробуйте змінити переклад або перезапустити програму.")

        print("\n[N] Новий вірш   [S] Зберегти   [F] Обране   [T] Переклад   [Q] Вихід")
        command = input("> ").strip().lower()

        if command in {"n", ""}:
            try:
                current_verse = get_random_verse(translation, book_names)
                print_verse(current_verse)
            except RuntimeError as exc:
                print(f"\nПомилка: {exc}")

        elif command == "s":
            if current_verse is None:
                print("Спочатку отримайте випадковий вірш клавішею N.")
            else:
                save_favorite(current_verse, favorites)

        elif command == "f":
            print_favorites(favorites)

        elif command == "t":
            translation = choose_translation()
            book_names = {}
            current_verse = None

        elif command == "q":
            print("Нехай Боже Слово перебуває у вашому серці.")
            break

        else:
            print("Невідома команда. Спробуйте N, S, F, T або Q.")


if __name__ == "__main__":
    try:
        main()
    except (KeyboardInterrupt, EOFError):
        print("\nДо побачення.")
        sys.exit(0)
