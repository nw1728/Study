# RoboTeam Twente website: handover for Claude Code

> Claude Code loads this file automatically when started in this folder, on **any** device.
> This folder syncs between Ethan's laptops through GitHub (repo root is `~/Study`, remote `SnakeXrnt/Study`). Claude's personal memory (`~/.claude/...`) does **not** sync, so everything a new session needs is here or in `memory/`.

## Your role
You help **Ethan** build the new website for **RoboTeam Twente**, a student team at Future Factory (University of Twente + Saxion) building a **Mars rover** for the **European Rover Challenge (ERC)**. Before that, the team built RoboCup soccer robots. The new site replaces the current `roboteamtwente.nl`, and will run on a small server in the team office.

## Start of every session
1. Remind Ethan to `git pull` if not done yet (the other laptop may have pushed changes).
2. **Read `memory/Current Progress.md` first**: where the last session stopped and what's next. Tell Ethan in one or two lines where you're picking up.
3. Skim `memory/Decisions.md` before proposing anything visual or structural, so you don't undo a choice Ethan already made.
4. Check `memory/Open Questions.md` for things waiting on Ethan or the team.
5. If `node_modules/` is missing (fresh laptop): `npm install`.

## End of every session
- **Overwrite** `memory/Current Progress.md` with the latest state. Don't append; history goes in `memory/Session Log.md` (newest first, a few lines per session).
- New decisions go in `memory/Decisions.md`, with the **why**.
- Run `npm run lint` and `npm run build` before saying something is done.

## How Ethan likes to work
- **Human-understandable, "OOP-like" code: one object per file.** Small folders with one `.jsx` + its own `.module.css`. No big files. Plain-JS classes for logic (`RoverBrain.js`, `StoryDirector.js`).
- **Content lives in `src/data/*.js`**, never hard-coded in layout code, so non-coders can edit it (and the future admin can too).
- He likes to **see it in action**. Build, then check it in a browser (Playwright screenshots) before reporting. Verify on desktop **and** phone width (390px).
- **Plain text in chat, no LaTeX.** Explain in plain words. Name tricky traps up front.
- He wants the site to be **unique, not a copy**. An earlier version copied droneteamtwente.nl's layout too closely and he called it out (see Decisions).
- **Don't invent facts** about the team (names, results, specs). Use what's on the old site or ask. Mark placeholders as placeholders.
- Commit or push only when he asks. The `~/Study` repo also auto-commits "sync" commits.

## Commands
```bash
npm run dev      # http://localhost:5173 (Ethan usually has this running already)
npm run build    # production build → dist/
npm run lint     # oxlint
npm run dev -- --host   # test on a real phone on the same wifi
```

## Stack
React 19 + Vite 8, plain JavaScript, CSS Modules, React Router 7, oxlint. No UI library, no animation library.
Fonts (Google Fonts, in `index.html`): **Aldrich** = headlines (`--font-display`, one weight only), **Saira** = body (`--font`), **JetBrains Mono** = labels/log (`--font-mono`).

## Folder map
```
roboteam-web/
├── CLAUDE.md                 ← this file
├── README.md                 ← for humans: where things live, common tasks
├── memory/                   ← Claude's notes (Obsidian-style). Start at Current Progress.md
├── docs/superpowers/specs/   ← design docs (scroll story, admin plan)
├── index.html                ← fonts, favicons, theme-before-paint script
├── public/
│   ├── images/               ← all photos, plain paths (/images/team/control.jpg)
│   └── favicon/              ← icons + site.webmanifest (must stay in public/)
└── src/
    ├── App.jsx               ← every page by address (React Router)
    ├── pages/<Name>/         ← one folder per page: Home, Join, Events, News, NewsArticle,
    │                            Education, Contact, PastTeams, Subteam, NotFound
    ├── sections/<Name>/      ← front-page sections; ScrollStory/ is the big rover story
    ├── components/<Name>/    ← reusable pieces (Reveal, WordRise, Button, SmartLink, PageHero,
    │                            Navbar, Footer, RoverPet, ThemeToggle, MemberCard, …)
    ├── data/                 ← ALL content (subteams, events, join, education, pastTeams, story, …)
    ├── hooks/                ← useInView, useScrollProgress, useCountUp, useTheme, usePageTitle
    ├── lib/                  ← timeline.js (scroll helpers), petAvailable.js
    └── styles/               ← tokens.css (colours + fonts), global.css
```

## Rules that keep the code consistent
- **Colours:** only the variables in `src/styles/tokens.css`. Everything derives from the logo purple `#5A1C74`. **Trap:** `--brand` is too dark for text on the dark background (contrast 1.7). For purple *text*, use `--lavender`. Light mode redefines the same variables (`[data-theme='light']`).
- **Animations:** `<Reveal from="below|left|right" order={n}>` fades things in on scroll; `<WordRise text="…">` makes headline words rise. Both respect `prefers-reduced-motion`. Side slide-ins are shortened on phones (to avoid sideways scroll).
- **Links:** use `SmartLink` / `Button`. Internal paths (`/join`, `/#team`) switch pages without a reload; `ScrollManager` handles `/#section` scrolling.
- **New page:** a folder in `src/pages/`, then a `<Route>` in `App.jsx`. Open with `PageHero`, and call `usePageTitle('…')`.
- **Images:** resize before adding (members ~480px, big photos ~1600px, JPEG). `sips` works on macOS.

## Gotchas (learned the hard way)
- **The scroll story and the rover pet are one character.** `StoryDirector.js` sends a `rover-handoff` window event; `RoverPet.jsx` listens. The pet hides while the story plays, then appears where the story rover drives off. Leaving the home page mid-story calls `director.release()`. Phones have no pet (`lib/petAvailable.js`), so there the story rover stays and the log text changes (`commandWithoutPet` / `replyWithoutPet` in `data/story.js`).
- **Phones get a different crop of the story scene** (`NARROW_SCREEN` in `rover/geometry.js`, plus the zoom constants in `StoryDirector.js`).
- **Favicons must stay in `public/favicon/`.** In `src/assets` Vite renames them and the manifest breaks. Browsers cache favicons hard: test in a private window.
- **SPA fallback:** the production server must answer every address with `index.html`, or `/join` breaks on refresh.
- **`.title span` style trap:** WordRise wraps every word in a `<span>`. Style accent spans as `.title > span:not([class])`, or the whole title turns lavender.
- **Playwright quirk:** the Playwright browser tab can get throttled (1–3 fps, screenshots time out). That's the tab, not the site: close and reopen the browser before measuring speed.
- **Old-site content** came from roboteamtwente.nl (a JS-rendered site, so scrape it with Playwright, not WebFetch).
