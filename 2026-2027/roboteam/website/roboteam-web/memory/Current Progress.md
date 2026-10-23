---
title: Current Progress
tags: [roboteam-web, progress]
updated: 2026-10-23
last_device: "NW1728s-MacBook-Air"
---

# 📍 Current Progress: continue from here

Back to [[00 Index]] · History: [[Session Log]]

> [!important] For Claude on any device
> Read this **first**. At the end of each session, **overwrite** it (history goes in [[Session Log]]).

## State on 2026-10-23
The site works locally (`npm run dev`), on desktop and phone, in dark and light mode. **Nothing is deployed yet.**

**Done:**
- Front page: scroll story (rover drives over a tiny planet, mission log, sol counter, hands over to the rover pet), statement, stats, about, results table, subteams, events, alumni, partners, news, join, contact.
- Sub-pages at the **same addresses as the old site**: `/join`, `/events`, `/news`, `/news/3`, `/education`, `/contact`, `/past-teams`, `/team/<slug>` (9 subteams with members + photos), and a 404.
- Rover pet cursor (car-like driving, route planning around text, moods), light/dark mode, phone menu, favicons, fonts (Aldrich / Saira / JetBrains Mono).
- `README.md` for humans, `CLAUDE.md` + this `memory/` for Claude.

**On hold (Ethan's call):**
- **Admin backend**: fully planned in `docs/superpowers/specs/2026-10-23-admin-design.md` (Google login for `@roboteamtwente.nl`, invite-only, Ethan = first owner, JSON-file storage, Express server in the office). Ethan said to do the sub-pages first.

## ▶️ Continue with
1. Ask Ethan what's next: more polish, the admin backend, or deployment.
2. Things the team should check before launch → [[Open Questions]].
3. If starting the admin: re-read the admin design doc, then follow its "Build order". The Google OAuth client will be created by the **team manager**.
