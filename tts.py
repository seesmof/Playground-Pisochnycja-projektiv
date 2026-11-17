"""
Text to speech.

Turns a Ukrainian verse into an MP3 file using edge-tts (Microsoft's free
neural voices - no API key needed).

edge-tts is written with async/await, but Streamlit code is normal
(top-to-bottom) code. The `_speak` coroutine below is therefore started with
`asyncio.run()`, which simply means: "run this async function and wait for it".
"""

from __future__ import annotations

import asyncio
import tempfile
from pathlib import Path

import edge_tts

from config import DEFAULT_RATE, DEFAULT_VOICE


async def _speak(text: str, voice: str, rate: str, destination: Path) -> None:
    """Say `text` with `voice` and write the audio to `destination`."""
    speaker = edge_tts.Communicate(text, voice, rate=rate)
    await speaker.save(str(destination))


def make_speech(text: str, voice: str = DEFAULT_VOICE, rate: str = DEFAULT_RATE) -> Path:
    """Create an MP3 for `text` in a new temporary folder and return its path.

    The caller is responsible for the file - it is intentionally NOT deleted
    here, because the video step still needs it.
    """
    folder = Path(tempfile.mkdtemp(prefix="bible_verse_"))
    audio_path = folder / "speech.mp3"

    asyncio.run(_speak(text, voice, rate, audio_path))

    # A silent/failed request produces an empty file - report it clearly
    # instead of failing later inside the video encoder.
    if not audio_path.exists() or audio_path.stat().st_size == 0:
        raise RuntimeError("Озвучка не повернула аудіо. Спробуй ще раз або інший голос.")

    return audio_path