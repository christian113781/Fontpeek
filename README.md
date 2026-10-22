<p align="center">
  <img src="assets/logo.png" alt="FontPeek logo" width="120">
</p>

<h1 align="center">FontPeek</h1>

<p align="center">
  A lightweight Chrome extension that shows the font size of any text on a web page. Just hover.
</p>

---

## What is FontPeek?

FontPeek lets you instantly check how big text is on any website, without opening DevTools. Turn it on, hover over any text, and a small tooltip shows its font size and related details.

It is built for designers, developers, and anyone who has ever wondered "what size is that text?"

## Features

- **Hover to inspect**: see the font size of any element under your cursor
- **Multiple units**: shows `px`, `pt`, and `rem` at once
- **Extra details**: font weight, line height, font family, and the HTML tag
- **Click to lock**: freeze the tooltip so you can read it or move your mouse away
- **Element highlight**: the hovered element gets a clear outline
- **Easy to stop**: click the Stop button (top right) or press `Esc`
- **No tracking, no data collection**: everything runs locally in your browser

## Installation

FontPeek is not on the Chrome Web Store yet, so install it manually:

1. Download or clone this repository.
2. Open `chrome://extensions` in Chrome.
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and select the project folder.
5. (Optional) Pin FontPeek from the puzzle-piece menu in the toolbar.

Works in Chrome and other Chromium-based browsers (Edge, Brave, Opera).

## Usage

1. Open any web page.
2. Click the **FontPeek** icon in the toolbar.
3. Hover over any text to see its font size.
4. Click to lock the tooltip, and click again to unlock.
5. Press `Esc` or click the **Stop** button to turn it off.

> FontPeek cannot run on Chrome's internal pages (`chrome://...`) or the Chrome Web Store. This is a browser restriction.

## Permissions

| Permission  | Why it is needed                                              |
| ----------- | ------------------------------------------------------------- |
| `activeTab` | Access the current tab only when you click the toolbar icon   |
| `scripting` | Inject the inspector into that tab                            |

FontPeek does not read, store, or send any page content.

## Project structure

```
fontpeek/
├── manifest.json     # Extension config (Manifest V3)
├── background.js     # Handles the toolbar icon click
├── content.js        # The inspector: tooltip, highlight, and stop button
├── icon16.png
├── icon32.png
├── icon48.png
├── icon128.png
└── assets/
    └── logo.png      # Full-size logo
```

## Contributing

Ideas and pull requests are welcome. Some things you could add:

- Copy the font size to the clipboard on click
- Show text color and letter spacing
- A light theme for the tooltip

## License

Add a license of your choice (for example, MIT) before publishing.
