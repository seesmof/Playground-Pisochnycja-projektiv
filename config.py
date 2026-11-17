"""
All settings in one place.

Nothing here does any work - these are just values that the other files read.
Change a number here and the whole app (frame, video, speech) follows.
"""

# ---------------------------------------------------------------------------
# Video format
# ---------------------------------------------------------------------------
# 1080x1920 is the standard vertical (9:16) size for Reels/TikTok/Shorts.
VIDEO_WIDTH = 1080
VIDEO_HEIGHT = 1920

# Frames per second. 30 is smooth enough for a still image and keeps files small.
FPS = 30

# Codecs = how video and audio are compressed.
# H.264 video + AAC audio is the combination every browser and phone can play.
VIDEO_CODEC = "libx264"
AUDIO_CODEC = "aac"

# ---------------------------------------------------------------------------
# Look of the frame
# ---------------------------------------------------------------------------
FRAME_BACKGROUND = "#FFFFFF"  # white canvas
TEXT_COLOR = "#111827"        # almost-black text

# The verse text is drawn at this size, and shrunk step by step (by 4 px) until
# the whole verse fits on screen. So long verses stay readable instead of
# overflowing the picture.
VERSE_FONT_MAX = 84
VERSE_FONT_MIN = 36

# Empty space kept on the left and right of the text.
VERSE_SIDE_MARGIN = 110

# ---------------------------------------------------------------------------
# Fonts
# ---------------------------------------------------------------------------
# The first file in this list that exists on the machine is used.
# Windows, Linux and macOS all store fonts in different places, and the app may
# be hosted on a Linux server, so we try several paths.
FONT_CANDIDATES = (
    # Windows
    "C:/Windows/Fonts/DejaVuSans.ttf",
    "C:/Windows/Fonts/arial.ttf",
    # Linux (typical for Debian/Ubuntu hosting)
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    # macOS
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "/Library/Fonts/Arial.ttf",
)

# DejaVu Sans and Arial both contain Ukrainian (Cyrillic) letters.

# ---------------------------------------------------------------------------
# Text to speech
# ---------------------------------------------------------------------------
# Edge TTS reads the text aloud and returns an MP3.
# These two neural voices speak Ukrainian.
VOICE_OSTAP = "uk-UA-OstapNeural"    # male
VOICE_POLINA = "uk-UA-PolinaNeural"  # female

# What the user sees in the dropdown:  label -> voice name
VOICES = {
    "Ostap (чоловічий)": VOICE_OSTAP,
    "Polina (жіночий)": VOICE_POLINA,
}

# Default selected voice and speaking speed ("+0%" = normal, "-10%" = slower).
DEFAULT_VOICE = VOICE_OSTAP
DEFAULT_RATE = "+0%"
SPEECH_RATES = ["-10%", "+0%", "+10%"]