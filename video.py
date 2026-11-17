"""
Video assembly.

Goal: join the still frame (frame.py) and the speech file (tts.py) into one MP4
that lasts exactly as long as the audio.

MoviePy does the work and calls FFmpeg under the hood, so FFmpeg must be
installed and available in PATH.
"""

from __future__ import annotations

from pathlib import Path

from moviepy import AudioFileClip, ImageClip

from config import AUDIO_CODEC, FPS, VIDEO_CODEC
from frame import make_frame


def build_video(verse: str, audio_path: Path, folder: Path) -> tuple[Path, Path, float]:
    """Build the MP4 for `verse` + `audio_path` inside `folder`.

    Returns (video_path, frame_path, duration_in_seconds).
    """
    # 1. The still picture of the verse.
    frame_path = make_frame(verse, folder)

    # 2. Open the audio only to read its length. The video must be exactly
    #    as long as the voice-over, otherwise we get a frozen tail or a cut-off.
    audio = AudioFileClip(str(audio_path))
    try:
        duration = float(audio.duration)

        # 3. A one-picture video that lasts `duration` seconds.
        picture = ImageClip(str(frame_path)).with_duration(duration)

        # 4. Render the MP4 with sound.
        video_path = folder / "video.mp4"
        picture.write_videofile(
            str(video_path),
            fps=FPS,
            codec=VIDEO_CODEC,
            audio_codec=AUDIO_CODEC,
            audio=str(audio_path),                       # the voice-over
            temp_audiofile=str(folder / "audio.m4a"),    # scratch file, removed after
            remove_temp=True,
            logger=None,                                 # no progress spam in the UI
        )
        picture.close()
    finally:
        # Always release the audio file handle (Windows keeps files locked).
        audio.close()

    return video_path, frame_path, duration