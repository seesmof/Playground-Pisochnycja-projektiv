import re
import spotipy
from spotipy.oauth2 import SpotifyOAuth

markdown_table = """
| "17" (In the Air Dub)                                                | MK                                     |
| "2 Much" (feat. 24hrs)                                               | Flosstradamus                          |
| "36"                                                                 | Redlight feat. Lotti                   |
| "Aeropolis"                                                          | BeatauCue                              |
| "Are We Still Young" (feat. Jessi Mason)                             | Grant                                  |
| "Ashes of Love" (feat. Caroline Polachek)                            | Danny L Harle                          |
| "Astral"                                                             | Pyramid                                |
| "Baile Funk"                                                         | GAJATE                                 |
| "Bass 4"                                                             | The Hacker                             |
| "Be Right There"                                                     | Diplo & Sleepy Tom                     |
| "Beardo"                                                             | Benny Benassi                          |
| "Blackwater" (feat. Ann Saunderson (full strings vocal mix))         | Octave One                             |
| "Blind Faith" (feat. Liam Bailey)                                    | Chase & Status                         |
| "Blue Monday"                                                        | New Order                              |
| "Changes"                                                            | FAUL & Wad Ad vs. Pnau                 |
| "Channel 43" (Radio Edit)                                            | deadmau5, Wolfgang Gartner             |
| "Cheat Codes"                                                        | Nitro Fun                              |
| "Ching Ching"                                                        | Wolfgang Gartner                       |
| "Cinema" (Skrillex Remix)                                            | Benny Benassi                          |
| "Closing Shot"                                                       | Lindstrom                              |
| "Color"                                                              | Grant & Juneau                         |
| "Colours" (feat. Olan)                                               | Mat Zo                                 |
| "Delorean Dynamite"                                                  | Todd Terje                             |
| "Do You Don't You"                                                   | Haywyre                                |
| "Dreamcatcher" (feat. MIKO) (Night Mix/Nightfall)                    | Robotaki                               |
| "Encore"                                                             | Digitalism                             |
| "Everyday" (Netsky VIP Remix)                                        | Rusko                                  |
| "Everything You Are"                                                 | Midnight Kids                          |
| "F.A.T"                                                              | Pryda                                  |
| "Fade"                                                               | Rome in Silver                         |
| "Fall For You"                                                       | Just Kiddin                            |
| "Find Yourself" (Ashworth Remix)                                     | Great Good Fine Ok & Before You Exit   |
| "Fly"                                                                | Marshmello                             |
| "Foolish Of Me" (feat. Jonathan Mendelsohn)                          | Seven Lions, Jason Ross, Crystal Skies |
| "Gecko (Overdrive)"                                                  | Oliver Heldens X Becky Hill            |
| "Get To Know You"                                                    | Dexter King                            |
| "Good Morning" (Just Kiddin Remix)                                   | Max Frost                              |
| "Here For You" (Extended Mix)                                        | Gorgon City feat. Laura Welsh          |
| "Hey Now" (Arty Remix)                                               | London Grammar                         |
| "Higher"                                                             | NVOY                                   |
| "Hot Mess" (feat. Elly Jackson) (Duck Sauce Mix)                     | Chromeo                                |
| "HyperParadise" (Flume Remix (Ganz Flip))                            | Hermitude                              |
| "I Got You"                                                          | Duke Dumont feat. Jax Jones            |
| "I Want U" (GANZ Flip)                                               | Alison Wonderland                      |
| "Icarus"                                                             | Madeon                                 |
| "Illmerica" (Extended Version)                                       | Wolfgang Gartner                       |
| "In The Summer" (feat. Jaymes Young)                                 | Whethan                                |
| "Ingrid Is A Hybrid"                                                 | Dusky                                  |
| "Into The Light"                                                     | Notaker                                |
| "Joypunks"                                                           | Big Wild                               |
| "Jungle Fury"                                                        | RIOT                                   |
| "Just Let Me Dance" (Maxxi Soundsystem Remix)                        | Scandal                                |
| "Kids" (Soulwax Remix)                                               | MGMT                                   |
| "Killer"                                                             | Adamski feat. Seal                     |
| "Language"                                                           | Porter Robinson                        |
| "Levels" (Skrillex Mix)                                              | Avicii                                 |
| "Liberate"                                                           | Eric Prydz                             |
| "Lick The Rainbow"                                                   | Mord Fustang                           |
| "Lies" (Alex Metric Remix)                                           | Fenech-Soler                           |
| "Me & You"                                                           | Nero                                   |
| "Midnight City" (Eric Prydz private remix)                           | M83                                    |
| "Momento"                                                            | MamboBros                              |
| "Mrita" (Margarita)                                                  | CloudNone & Direct                     |
| "NRG"                                                                | Duck Sauce                             |
| "One More" (feat. Nile Rodgers – Mark Knight Remix)                  | SG Lewis, Nile Rodgers, Mark Knight    |
| "Only For You"                                                       | Mat Zo feat. Rachel Collier            |
| "Ottomatic"                                                          | Oliver                                 |
| "Pushing On"                                                         | Oliver $ & Jimi Jules                  |
| "Reaching Out" (Fred Falke Remix)                                    | Nero                                   |
| "Reckless" (With Your Love)                                          | Azari & III                            |
| "Remanence" (Junior Remix)                                           | Mr Magnetik                            |
| "Rinse & Repeat" (feat. Kah-Lo)                                      | Riton                                  |
| "Rock You" (Lenno Remix)                                             | Dirty Loops, Lenno                     |
| "Roses" (Imanbek Remix)                                              | SAINt JHN, Imanbek                     |
| "Runaway" (U & I)                                                    | Galantis                               |
| "Running" (Disclosure Remix)                                         | Jessie Ware                            |
| "Satisfy"                                                            | Nero                                   |
| "Show Me A Sign"                                                     | Modestep                               |
| "Silence" (Blonde Remix)                                             | Marshmello & Khalid                    |
| "Silicone Lube"                                                      | Feed Me                                |
| "Somebody to Love" (Sigma Remix)                                     | Rusko                                  |
| "State of Confusion" (feat. Joi Cardwell) (The Maurice Fulton remix) | Honey Dijon                            |
| "Still" (Richy Ahmed Remix)                                          | Katy B                                 |
| "Survive"                                                            | Kidnap Kid                             |
| "Techtonic"                                                          | Metrik                                 |
| "Tell Me" (Ellis Remix)                                              | Haywyre                                |
| "The Hope"                                                           | Scuba                                  |
| "The Man" (Jacques Lu Cont Remix)                                    | The Killers                            |
| "The Power" (feat. Dizzee Rascal)                                    | DJ Fresh                               |
| "The Storm"                                                          | Notaker                                |
| "Thinking About It"                                                  | Just Kiddin                            |
| "To Ü" (feat. AlunaGeorge)                                           | Skrillex & Diplo                       |
| "TopBrazil" (Benny Benassi vs. Constantin & Mazzz Dub Mix)           | Fischerspooner                         |
| "Touch" (Grum Remix)                                                 | Shift K3Y                              |
| "Tunnel Vision"                                                      | Subtact                                |
| "Turn The Music Louder (Rumble)" (feat. Tinie Tempah & Katy B)       | KDA                                    |
| "Two Minds"                                                          | Nero                                   |
| "Waiting"                                                            | Oliver Heldens & Throttle              |
| "Win or Lose"                                                        | iLL BLU feat. Ann Saunderson           |
| "Zodiac"                                                             | Sung                                   |
| "aNYway"                                                             | Duck Sauce                             |
"""

pattern = r"\| (.+?)\s*\| (.+?)\s*\|"
matches = re.findall(pattern, markdown_table)

extracted_data = []
for match in matches:
    song_name = match[0]
    artist = match[1]
    extracted_data.append(
        {
            "song": song_name,
            "artist": artist
        }
    )

for song in extracted_data:
    print(f"{song['song']} by {song['artist']}")