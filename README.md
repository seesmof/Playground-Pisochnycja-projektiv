# Bible verse video studio

Україномовний MVP для створення вертикального відео 9:16 зі введеним текстом Біблійного вірша та синтезованою озвучкою.

## Запуск

```bash
python -m pip install -r requirements.txt
streamlit run app.py
```

Потрібен FFmpeg у `PATH`. Windows: `winget install Gyan.FFmpeg`.

Озвучка працює через Edge TTS (`uk-UA-OstapNeural` або `uk-UA-PolinaNeural`), бібліотеки: Streamlit, MoviePy, Pillow.