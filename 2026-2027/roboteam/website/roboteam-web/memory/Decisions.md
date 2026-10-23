---
title: Decisions
tags: [roboteam-web, decisions]
updated: 2026-10-23
---

# Decisions (and why)

Back to [[00 Index]]. Newest at the bottom of each section. Don't reverse these without asking Ethan.

## Code structure
- **One object per file, small folders, `.module.css` next to each `.jsx`.** Ethan wants code people can read without wading through huge files. Logic-heavy parts are plain JS classes (`RoverBrain`, `StoryDirector`, `TextObstacles`).
- **All content in `src/data/`.** So non-coders (and later the admin page) can change content without touching layout.
- **Plain JS + React + Vite + CSS Modules, no UI or animation libraries.** It was already the Vite template, and keeps the bundle small.
- **React Router with the old site's addresses**, so old links (Instagram, Google, newsletters) keep working.
- **Photos in `public/images/` as plain paths,** so the future admin can swap images by path.

## Look & feel
- **"Minimalist fancy", dark by default, palette derived from the logo purple `#5A1C74`.** About 90% quiet, 10% purple. Purple text uses `--lavender`, because `--brand` is unreadable on dark.
- **Light/dark toggle;** a first visit follows the device setting.
- **Fonts:** Aldrich for headlines (Ethan's pick), Saira for body text (Ethan's pick), JetBrains Mono for labels. Aldrich has one weight, so contrast comes from **colour** (e.g. lavender "Twente"), not thickness.
- **Ethan likes:** big short statement lines with **one** word in purple ("Built at *Future Factory*."), Apple-style fade-ins, slides from left/right, rising words.

## The scroll story (top of the front page)
- **First version copied droneteamtwente.nl's layout** (pinned text left, drawing right, numbered chapter bar, fact chips, flat ground). **Ethan said it felt like a copycat.**
- **Current version (approved):** a 2D line-drawn rover on a **tiny rotating planet**, a **mission log** (commands + rover replies, "SOL 014 > drive crater_rim") instead of chapters, a **sol counter**, rover moods (!, ?, ♥) shared with the pet, a zoom-out to show the whole planet, and the **story rover becoming the rover pet**. That handover is the signature moment.
- **2D line drawing, not 3D** (Ethan's choice; no CAD model needed, light bundle).

## Rover pet (cursor companion)
- **It does not follow the cursor tightly.** **Click** and it drives there; otherwise it wanders to stay near the cursor. It has moods (happy, sad, dance, curious, sleepy, lonely) like a pet.
- **It drives like a car** (heading, steering, braking, tilts with direction). **Text is solid:** it plans a route around words (grid + A*) and gets **sad when stuck** or when you click on text.
- **Mouse devices only;** off for reduced motion.

## Admin (planned, on hold)
- **Login only via Google** (team domain is Google Workspace); **no password login at all**.
- **Invite-only access list.** Starts with **only `e.bastian@roboteamtwente.nl`** as owner; Ethan adds others. Roles: owner / editor.
- **Runs on a small office server** with HTTPS (`roboteamtwente.nl` will point there). The **team manager** creates the Google OAuth client.
- **Sub-pages were built before the admin** (Ethan's call).
