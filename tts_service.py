from __future__ import annotations

import asyncio
import tempfile
from pathlib import Path

import edge_tts

VOICES = {
    "Ostap (український, чоловічий)": "uk-UA-OstapNeural",
    "Polina (український, жіночий)": "uk-UA-PolinaNeural",
}


def voice_label(voice: str) -> str:
    for label, value in VOICES.items():
        if value == voice:
            return label
    return voice


async def synthesize(text: str, voice: str, output: Path, rate: str = "+0%") -> None:
    communicate = edge_tts.Communicate(text, voice, rate=rate)
    await communicate.save(str(output))


def generate_audio(text: str, voice: str, rate: str = "+0%") -> Path:
    output = Path(tempfile.mkstemp(prefix="bible_verse_", suffix=".mp3")[1])
    asyncio.run(synthesize(text, voice, output, rate))
    if output.stat().st_size == 0:
        raise RuntimeError("TTS повернув порожній аудіофайл.")
    return output