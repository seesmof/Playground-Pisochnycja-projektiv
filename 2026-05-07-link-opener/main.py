import os
import time
import schedule


def open_url(url: str):
    os.system(f'start "" {url}')


def copy_to_clipboard(text: str):
    os.system(f"echo {text.strip()}| clip")


def open_am():
    url: str = "https://us02web.zoom.us/j/86437456930"
    open_url(url=url)

    code: str = "330748"
    copy_to_clipboard(code)


schedule.every().thursday.at("14:55").do(open_am)

while True:
    schedule.run_pending()
    time.sleep(5)
