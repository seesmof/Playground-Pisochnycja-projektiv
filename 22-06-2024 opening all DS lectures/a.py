import webbrowser
from rich.console import Console
from rich.traceback import install

install()
console = Console()


# define an initial string with all the video links
initial_string: str = """
лекція 7: https://youtu.be/i2aG7ujqPSs

лекція 6: https://youtu.be/TsZrLNZDPHo

лекція 5 https://youtu.be/Gxqkutxt7wM

лекція 4 https://youtu.be/K61D09ER_zY

лекція 3 https://youtu.be/V313v9Oezgo

лекція 2 https://youtu.be/wltFgCrP5ls

лекція 1 https://youtu.be/cUqL9isajZ8
"""

# remove all the empty lines from the string and replace multiple spaces with a single space
bare_string: str = initial_string.replace("\n", " ").strip().replace("  ", " ")

# find all the video urls in the string
video_urls: list[str] = [
    url for url in bare_string.split(" ") if url.startswith("https")
]

for url in video_urls:
    # open the link in the default browser
    webbrowser.open(url)
