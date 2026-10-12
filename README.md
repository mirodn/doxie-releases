<div align="center">

# doxie (beta)

**Quick notes, fetched by a dachshund.**

A tiny, local-first note-taking app that lives in your Mac's menu bar.<br>
Press <kbd>⌥</kbd> <kbd>Space</kbd>, type, press <kbd>⌘</kbd> <kbd>S</kbd>. Done.

[![Latest release](https://img.shields.io/github/v/release/mirodn/doxie-releases?include_prereleases&label=release&color=8B5A2B)](https://github.com/mirodn/doxie-releases/releases/latest)
[![Downloads](https://img.shields.io/github/downloads/mirodn/doxie-releases/total?color=8B5A2B)](https://github.com/mirodn/doxie-releases/releases)
![macOS 14+](https://img.shields.io/badge/macOS-14%2B-000000?logo=apple&logoColor=white)
![Apple silicon & Intel](https://img.shields.io/badge/Apple%20silicon%20%26%20Intel-universal-555555)

[**Download for Mac**](https://github.com/mirodn/doxie-releases/releases/latest/download/doxie.dmg) · [Website](https://mirodn.github.io/doxie-releases/) · [Documentation](https://mirodn.github.io/doxie-releases/docs.html) · [Changelog](https://github.com/mirodn/doxie-releases/releases)

<img src="https://mirodn.github.io/doxie-releases/assets/img/capture.png" alt="The doxie capture window: a dachshund that stretches to fit your note" width="640">

</div>

---

## Why doxie?

Most ideas are lost in the few seconds it takes to open a notes app. doxie removes that gap: one shortcut from any app, a small dachshund that stretches to fit what you type, and your note is saved locally on your Mac. No account, no cloud, no tracking.

- **Instant:** a global shortcut opens capture from anywhere. Drafts survive <kbd>Esc</kbd>, clicking away and even quitting.
- **Private by design:** everything is stored in a local SQLite database. There are no doxie servers.
- **Plays well with your tools:** notes export as plain Markdown to your Obsidian vault, or sync to Notion.
- **Delightful:** your ten newest notes roam a pixel park as little dogs.

## Features

| | Feature | Description |
|---|---|---|
| ⌨️ | **Global shortcut** | Open capture from any app with <kbd>⌥</kbd> <kbd>Space</kbd>. |
| 🔎 | **Tags & quick search** | Write `#tags` inline, filter by tag, search everything with <kbd>⌥</kbd> <kbd>⇧</kbd> <kbd>Space</kbd>. |
| 📋 | **Clipboard to inbox** | Save whatever you just copied as a note with its own shortcut. |
| 📝 | **Markdown & Obsidian** | Notes are written as plain `.md` files with front matter. Your edits are never overwritten. |
| ⏰ | **Reminders** | `/remind tomorrow 9:00 call the vet` and the dog rings a bell when it's time. English and German. |
| 🌳 | **Park view** | Your newest notes appear as dachshunds in a pixel park. Hover to preview, click to open. |
| 🗂️ | **Notes list** | Filter by Pinned, Archive or any tag; click a note to edit it. |
| 🔒 | **Local-first** | SQLite on your Mac. Capture, search and export all work offline. |

<div align="center">
<img src="https://mirodn.github.io/doxie-releases/assets/img/dashboard-light.png" alt="The doxie home page with the notes list and pixel park" width="720">
</div>

## doxie Pro

doxie is **free** to use with unlimited local notes. **doxie Pro** is a one-time purchase (no subscription), valid on up to three Macs, and includes all 1.x updates.

| | Free | Pro |
|---|:---:|:---:|
| Unlimited local notes, global shortcut, tags & search | ✅ | ✅ |
| Reminders | ✅ | ✅ |
| Markdown / Obsidian export | 1 folder | Unlimited folders with tag filters |
| Repeating reminders (`every monday 8:00`) | - | ✅ |
| Capture actions: `/todo`, `/pin`, `/append` | - | ✅ |
| Tag completion with <kbd>Tab</kbd> | - | ✅ |
| Notion sync | - | ✅ |
| Sync between Macs via iCloud Drive | - | ✅ |
| Wardrobe (coats, hats, glasses, scarves…) & park themes (Autumn, Snow, Night) | - | ✅ |

Pro is sold through Lemon Squeezy. Paste your license key in **Settings → doxie Pro → Activate**.

<div align="center">
<img src="https://mirodn.github.io/doxie-releases/assets/img/park-autumn.png" alt="Autumn park theme" width="32%">
<img src="https://mirodn.github.io/doxie-releases/assets/img/park-snow.png" alt="Snow park theme" width="32%">
<img src="https://mirodn.github.io/doxie-releases/assets/img/park-night.png" alt="Night park theme" width="32%">
</div>

## Installation

**Requirements:** macOS 14 Sonoma or later · Apple silicon or Intel

1. [Download **doxie.dmg**](https://github.com/mirodn/doxie-releases/releases/latest/download/doxie.dmg) from the latest release.
2. Open the disk image and drag **doxie** into **Applications**.
3. Launch doxie from Applications. A paw 🐾 appears in the menu bar (doxie has no Dock icon).

> [!NOTE]
> If macOS says doxie can't be verified, click **Done**, then open **System Settings → Privacy & Security**, scroll down and click **Open Anyway**. On macOS 14 you can also right-click doxie and choose **Open**. This is only needed once.

### Updates

doxie checks for updates once a day and always asks before installing. You can turn this off in **Settings → Updates**, or check manually via **🐾 → Check for Updates…**.

## Quick start

### Keyboard shortcuts

| Shortcut | Action |
|---|---|
| <kbd>⌥</kbd> <kbd>Space</kbd> | New note (from any app) |
| <kbd>⌥</kbd> <kbd>⇧</kbd> <kbd>Space</kbd> | Quick search |
| <kbd>⌘</kbd> <kbd>S</kbd> | Save and close |
| <kbd>Esc</kbd> | Close and keep draft |
| <kbd>⌘</kbd> <kbd>N</kbd> | New note (home page) |
| <kbd>⇧</kbd> <kbd>⌘</kbd> <kbd>P</kbd> | Pin / unpin |
| <kbd>⌃</kbd> <kbd>⌘</kbd> <kbd>A</kbd> | Archive / unarchive |
| <kbd>⇧</kbd> <kbd>⌘</kbd> <kbd>R</kbd> | Set or change reminder |

The clipboard-to-inbox shortcut is off by default. Assign one in **Settings → Capture**.

### Capture commands

Type these at the start of a note. They can be combined, e.g. `/pin /todo call the vet`.

| Command | Short | What it does |
|---|---|---|
| `/remind` | `/r` | Sets a reminder: `in 30 min`, `tonight`, `friday at 17:00`, `tomorrow at 3pm` |
| `/todo` | `/t` | Turns each line into a task *(Pro)* |
| `/pin` | `/p` | Saves the note pinned *(Pro)* |
| `/append` | `/a` | Adds the text to your latest note *(Pro)* |

See the [full documentation](https://mirodn.github.io/doxie-releases/docs.html) for Obsidian and Notion setup, reminder syntax and all settings.

## Privacy

doxie has no servers, no accounts and no analytics. Your notes are stored at:

```
~/Library/Application Support/doxie/doxie.sqlite
```

Notes only leave your Mac when you choose to export them to a folder or a Notion workspace you configured. Notion secrets are kept in the macOS Keychain. Read the full [privacy policy](https://mirodn.github.io/doxie-releases/privacy.html).

## FAQ

<details>
<summary><b>Does doxie work offline?</b></summary>

Yes. Capture, search and folder export work fully offline. Notion sync catches up as soon as you're back online.
</details>

<details>
<summary><b>Is doxie Pro a subscription?</b></summary>

No. Pro is a single payment and includes all 1.x updates.
</details>

<details>
<summary><b>How do I move my Pro license to another Mac?</b></summary>

A license works on up to three Macs. Use **Settings → doxie Pro → Deactivate on This Mac** to free up a seat.
</details>

<details>
<summary><b>Will doxie overwrite my edits in Obsidian or Notion?</b></summary>

No. doxie writes only to the top level of your export folder, never deletes files, and doesn't overwrite pages you've edited or deleted in Notion.
</details>

## Support & feedback

- In the app: **🐾 → Send Feedback…**
- Email: [dumanmiro@gmail.com](mailto:dumanmiro@gmail.com)
- Bug reports and feature requests: [open an issue](https://github.com/mirodn/doxie-releases/issues)

## About this repository

This repository hosts the **release builds**, the update feed (`appcast.xml`) and the [website](https://mirodn.github.io/doxie-releases/) (on the `gh-pages` branch). The app's source code is not published here.

---

<div align="center">
<sub>© 2026 doxie · <a href="https://mirodn.github.io/doxie-releases/privacy.html">Privacy</a> · <a href="https://mirodn.github.io/doxie-releases/imprint.html">Imprint</a></sub>
</div>
