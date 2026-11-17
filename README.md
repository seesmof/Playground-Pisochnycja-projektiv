# Bible verse video studio

Україномовний застосунок: вставляєш текст біблійного вірша → отримуєш вертикальне відео 9:16 (1080×1920) з українською озвучкою та можливістю завантажити MP4.

## Як це працює

```text
Текст вірша
   │
   ├─ tts.py     → speech.mp3     (Microsoft Edge TTS, голос uk-UA-OstapNeural / uk-UA-PolinaNeural)
   ├─ frame.py   → frame.png      (білий кадр 1080×1920, текст по центру, шрифт підбирається під довжину)
   └─ video.py   → video.mp4      ( нерухома картинка + озвучка, H.264 + AAC, тривалість = довжина аудіо )
```

## Структура коду

| Файл | Відповідальність |
|---|---|
| `config.py` | усі налаштування: розміри кадру, FPS, кольори, шрифти, голоси |
| `tts.py` | текст → MP3 (edge-tts) |
| `frame.py` | текст → PNG-кадр (Pillow) |
| `video.py` | PNG + MP3 → MP4 (MoviePy/FFmpeg) |
| `app.py` | інтерфейс Streamlit: поле вводу, вибір голосу, кнопка, прев'ю, завантаження |
| `.streamlit/config.toml` | світла тема |
| `pyproject.toml` + `uv.lock` | Python-залежності через uv |

Кожен файл має одну задачу і читається згори вниз.

## Запуск локально (uv)

1. Встанови [uv](https://docs.astral.sh/uv/getting-started/installation/).
2. Створи lockfile і середовище:

```bash
uv sync
```

3. Запусти застосунок:

```bash
uv run streamlit run app.py
```

Потрібен **FFmpeg** у `PATH` (його викликає MoviePy):
`winget install Gyan.FFmpeg`

## Хостинг

Безкоштовно: Streamlit Community Cloud (GitHub → Deploy → public URL, працює на телефоні).
Врахувати при деплої:
- шрифт шукається серед Windows/Linux/macOS шляхів у `config.py` (`FONT_CANDIDATES`);
- FFmpeg має бути встановлений на хостингу;
- тимчасові файли (`/tmp`) не зберігаються між деплоями — відео не є постійним сховищем.

Повний розбор варіантів хостингу надав раніше: Community Cloud — найпростіший free-варіант, VPS — найстабільніший.