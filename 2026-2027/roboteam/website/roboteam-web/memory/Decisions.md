---
title: Decisions
tags: [roboteam-web, decisions]
updated: 2026-10-29
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
- **It only lives on the planet** (Ethan, 2026-10-29). It appears when the story hands over, and once the stage scrolls away (bottom edge above 80% of the screen) it drives back to the story rover, fades, and the story rover reappears. Scroll back up and it comes out again. **No pet on other pages** (no planet there). Ethan wanted it to belong to the Mars scene instead of wandering the whole site.
- **A "Skip to about ↓" button on the story stage** (Ethan, 2026-10-29), bottom right above the sol counter (above the log on phones). Hidden during the intro, which already has "Learn more". So nobody has to scroll through the whole story to reach the facts. Text and target in `data/story.js` (`skipStory`).

## Admin (planned, on hold)
- **Login only via Google** (team domain is Google Workspace); **no password login at all**.
- **Invite-only access list.** Starts with **only `e.bastian@roboteamtwente.nl`** as owner; Ethan adds others. Roles: owner / editor.
- **Runs on a small office server** with HTTPS (`roboteamtwente.nl` will point there). The **team manager** creates the Google OAuth client.
- **Sub-pages were built before the admin** (Ethan's call).

## Admin phase 2 (spec `docs/superpowers/specs/2026-10-24-admin-phase-2-design.md`)
- **Members split out of subteams into their own flat content type**, each person carrying a subteam slug. People join and leave roughly every three months, so the team list is the most-edited thing on the site; a flat list means moving someone is one dropdown instead of deleting and retyping them.
- **A leaver's uploaded photo file is kept, never deleted** (Ethan, 2026-10-24). Safer: two entries can point at the same file and a mistaken removal is undoable. Unused files get tidied later, if ever.
- **Past-team members stay plain text** (Ethan, 2026-10-24), one line of names per generation. They are history; no reason to make them real entries.
- **People with no photo get a small flag in the Members list**, not a warning banner (Ethan, 2026-10-24). Makes the gaps visible during a changeover without nagging or blocking a save.
- **Image upload happens in phase 2, not later**, with the file type decided by sniffing the first bytes (no SVG). Adding a member without their photo would be the most annoying half-feature.
- **`navigation` and `story` stay in code**, being tied to which sections exist and how the scroll story is animated.
- **Nested lists are one field type (`items`), not a special case per page.** The ways in and
  waiting lists on the join page, and the activities inside an education tab, are the same
  machinery one level down. Nested errors carry their path in the field name (`steps[1].title`)
  so the shape on the wire stays flat.
- **`join.applyEmail` became three plain fields** rather than earning a field type for one
  nested object. Three boxes are also clearer to whoever edits them.
- **Every built-in default must pass its own description**, enforced by a test. A default an
  editor cannot re-save without changing anything is a trap, and it caught two real cases.
