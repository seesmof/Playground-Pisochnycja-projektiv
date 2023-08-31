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

# STEP 3: Create a playlist on Spotify

playlistName = username + " Playlist"
playlistDescription = "Created by " + username

playlist = sp.user_playlist_create(
    user=userID, name=playlistName, description=playlistDescription)
playlistID = playlist['id']

playlistContents = sp.playlist_items(playlistID)
if len(playlistContents['items']) == 0:
    print("Playlist is empty")
else:
    for item in playlistContents['items']:
        track = item['track']
        print(track['artists'][0]['name'] + " - " + track['name'])
