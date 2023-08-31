from env import *
import re

def parseSpotifyTable(markdown_table):
    extracted_data = []
    pattern = r"\| (.+?)\s*\| (.+?)\s*\|"
    matches = re.findall(pattern, markdown_table)
    for match in matches:
        song_name = match[0]
        artist = match[1]
        extracted_data.append(
            {
                "song": song_name,
                "artist": artist
            }
        )
    return extracted_data

spotifyPlaylistData = parseSpotifyTable(markdown_table)
for song in spotifyPlaylistData:
    print(f"{song['song']} by {song['artist']}")