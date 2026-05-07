import os


def open_url(url: str):
    os.system(f'start "" {url}')


def copy_to_clipboard(text: str):
    os.system(f"echo {text.strip()}| clip")


url: str = "https://us02web.zoom.us/j/86437456930"
open_url(url=url)

code: str = "330748"
copy_to_clipboard(code)
