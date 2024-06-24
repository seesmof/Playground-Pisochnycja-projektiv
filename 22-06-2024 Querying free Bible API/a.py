import requests
from rich.console import Console
from rich.traceback import install

install()
console = Console()


base_url: str = "https://bible.helloao.org/api/"


def get_available_translations() -> requests.Response:
    return requests.get(base_url + "available_translations.json").json()["translations"]


def filter_versions(available_translations: list[dict]) -> list[dict]:
    return [
        version
        for version in available_translations
        if version["language"] == "eng" or version["language"] == "ukr"
    ]


available_translations: list[dict] = get_available_translations()
appropriate_translations: list[dict] = filter_versions(available_translations)

console.print(requests.get(base_url + "BSB/Genesis/1.json").json())
console.print(requests.get(base_url + "BSB/Matthew/28.json").json())
