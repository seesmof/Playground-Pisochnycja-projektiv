# Verse Feed (Python)

A TikTok-style desktop app for random Bible verses, built with **PySide6** and
managed by **uv**. One full-window verse per page, swipe/wheel/keyboard to move.

## Run

```bash
cd app
uv sync
uv run main.py
```

`bible.json` is read from the repo root automatically. Override it with
`--bible PATH`.

## Install on Windows

Build once:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\build_windows.ps1
```

This produces `dist\VerseFeed\VerseFeed.exe` (a standalone folder, ~96 MB) with
`bible.json` bundled inside.

Install it for the current user:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\install_windows.ps1
```

The installer:

- copies the app to `%LOCALAPPDATA%\Programs\VerseFeed`
- creates **Verse Feed** shortcuts on the desktop and in the Start Menu
- registers an entry in Windows **Settings → Apps** with a working uninstaller

No admin rights are needed.

Uninstall with either:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\uninstall_windows.ps1
```

or **Settings → Apps → Verse Feed → Uninstall**.

## Controls

| Input | Action |
|---|---|
| Mouse wheel / trackpad | Next / previous verse |
| Drag up / down | Swipe to the next / previous verse |
| `↓`, `PageDown`, `Space` | Next verse |
| `↑`, `PageUp` | Previous verse |
| `F11` | Toggle fullscreen |
| `Esc` | Leave fullscreen |

## Screenshot mode

Render the first page to a PNG without keeping the window open:

```bash
uv run main.py --screenshot preview.png --width 430 --height 860 --seed 7
```

The packaged executable supports it too:

```powershell
dist\VerseFeed\VerseFeed.exe --screenshot preview.png
```

## How it works

- `main.py` parses `bible.json` (31,082 verses, ~47 ms), builds a `RandomFeed`
  and opens the window.
- `verse_feed/deck.py` is the custom-painted feed. It keeps a page offset,
  renders the current and adjacent pages, and animates between them with an
  `OutCubic` curve. Wheel, keyboard and drag all drive the same paging logic.
- `verse_feed/render.py` renders a page once into a cached `QPixmap` at the
  current size and DPR, so dragging never re-lays-out text. Font size starts
  large and shrinks until the verse, reference and hint zone fit — the longest
  verse (365 chars) fits without internal scrolling.
- `verse_feed/bible.py` keeps an append-only random feed buffered 8+ pages
  ahead. Verses are generated locally, so page turns never wait on I/O.
- Pure random sampling: repeats are allowed, matching the web version.
- `verse_feed/books.py` maps the 66 book codes to Ukrainian names.
- `scripts/build_windows.ps1` freezes the app with PyInstaller (windowed, custom
  icon, bundled Bible). `scripts/install_windows.ps1` copies it into the user
  profile, writes the shortcuts and the uninstall registry entry.

## Relationship to the web app

`client/` still contains the Next.js version. The Python app is standalone and
shares the same `bible.json`; it does not depend on the web app.
