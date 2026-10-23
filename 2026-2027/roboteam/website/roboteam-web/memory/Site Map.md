---
title: Site Map
tags: [roboteam-web, structure]
updated: 2026-10-23
---

# Site map: pages, sections and their data

Back to [[00 Index]]

| Address | Page folder | Content from |
|---|---|---|
| `/` | `pages/Home` → sections below | see section list |
| `/join` | `pages/Join` | `data/join.js` (join + positions) |
| `/events` | `pages/Events` | `data/events.js` |
| `/news`, `/news/:id` | `pages/News`, `pages/NewsArticle` | `data/news.js` |
| `/education` | `pages/Education` | `data/education.js`, `data/contact.js` |
| `/contact` | `pages/Contact` | `data/contact.js`, `data/socials.js` |
| `/past-teams` | `pages/PastTeams` | `data/pastTeams.js`, `data/alumni.js` |
| `/team/:slug` | `pages/Subteam` | `data/subteams.js` |
| anything else | `pages/NotFound` | (none) |

## Front page sections, in order (`pages/Home/HomePage.jsx`)
ScrollStory (`data/story.js`) → Statement → Stats (`stats.js`) → About → Achievements (`achievements.js`) → Team (`subteams.js`) → Events (`events.js`) → Alumni (`alumni.js`) → Partners (`partners.js`) → News (`news.js`) → Join → Contact (`contact.js`)

Shared on every page: Navbar (`data/navigation.js`), Footer (`navigation.js`, `socials.js`), RoverPet, ScrollManager.
