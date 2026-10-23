---
title: Open Questions
tags: [roboteam-web, todo]
updated: 2026-10-23
---

# Open questions

Back to [[00 Index]]. Remove items once answered (and note the answer in [[Decisions]] if it's a choice).

## Content to check with the team
- [ ] **Placeholder text** in `src/data/story.js` (scroll story headlines and mission log). Is "rocker-bogie" right for our rover?
- [ ] 2022–2023 past team lists **"Thijs Bink Brunon Bojków"**: probably two people merged on the old site.
- [ ] **Nathalie Kamp** had no role on the old site; we show "Education".
- [ ] Members without photos (initials shown): Zodi Minetti, Adriana Gea Gonzalez, Sasha Vyrovets, Nicholas Bajada, Demir Koksal.
- [ ] The Science Day event text is in Dutch (copied as-is).
- [ ] Results table rows can expand if they get a `note` in `data/achievements.js`; none have one yet.
- [ ] No individual "core team" row on the front page. Subteam pages now show members; is that enough?

## Before going live
- [ ] Office server setup: HTTPS via Caddy, SPA fallback (every path → `index.html`).
- [ ] Google OAuth client (team manager) for the admin.
- [ ] Remove or keep the old site's `/admin` and API (replaced by the new admin plan).
