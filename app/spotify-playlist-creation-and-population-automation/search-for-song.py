from spotipy.oauth2 import SpotifyOAuth
import spotipy
from env import *
import re

# STEP 1: Parse markdown table with song names and authors


def parseSpotifyTable(markdownTable):
    extractedData = []
    pattern = r"\| (.+?)\s*\| (.+?)\s*\|"
    matches = re.findall(pattern, markdownTable)
    for match in matches:
        song_name = match[0]
        artist = match[1]
        extractedData.append(
            {
                "song": song_name,
                "artist": artist
            }
        )
    return extractedData


spotifyPlaylistData = parseSpotifyTable(markdownTable)

# STEP 2: Authenticate with Spotify with my credentials

sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=clientID,
                                               client_secret=clientSecret,
                                               redirect_uri=redirectURL, scope="playlist-modify-public"))
user = sp.current_user()
username = user['display_name']
userID = user['id']

# LOOK FOR SONGS

for song in spotifyPlaylistData:
    track = song['song']
    artist = song['artist']
    print(track)

    results = sp.search(q=f"track:{track}", type='track')

    if results["tracks"]["total"] > 0:
        songUrl = results["tracks"]["items"][0]["uri"]
        songName = results["tracks"]["items"][0]["name"]
        print(songUrl)
    else:
        print("No results")
