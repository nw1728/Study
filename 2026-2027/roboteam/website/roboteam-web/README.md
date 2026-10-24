# RoboTeam Twente website

Front page for RoboTeam Twente, built with React + Vite.

```bash
npm install
npm run dev     # local preview at http://localhost:5173
npm run build   # production build in dist/
npm run lint
```

## Where things live

Every piece of the page is its own small folder: a `.jsx` file for the content and a `.module.css` file for its look.

```
src/
├── App.jsx             Every page of the site, by address (/join, /events, /team/:slug …)
├── pages/              One folder per page; each page uses sections and components
│   ├── Home/           The front page: the list of sections, top to bottom
│   ├── Join/  Events/  News/  NewsArticle/  Education/  Contact/
│   └── PastTeams/  Subteam/  NotFound/
├── data/               ← Most edits happen here: text lists, names, dates, links
│   ├── achievements.js
│   ├── alumni.js
│   ├── contact.js
│   ├── events.js
│   ├── navigation.js
│   ├── news.js
│   ├── partners.js
│   ├── socials.js
│   ├── stats.js
│   └── subteams.js
├── sections/           One folder per section of the front page
│   ├── ScrollStory/    The pinned rover story at the top (see below)
│   ├── Statement/  Stats/  About/  Achievements/  Team/
│   └── Events/  Alumni/  Partners/  News/  Join/  Contact/
├── components/         Reusable building blocks used by the sections
│   ├── Reveal/         The fade-in-on-scroll effect
│   ├── RoverPet/       The mini Mars rover pet (brain, drawing, mood animations)
│   ├── ThemeToggle/    Light/dark mode button
│   ├── PageHero/       The opening of every sub-page (label, title, intro)
│   ├── SmartLink/      One link for everything: page switches, #sections, external links
│   ├── ScrollManager/  Start new pages at the top; scroll to /#section links
│   ├── Button/  SectionHeader/  SubteamCard/  EventCard/  MemberCard/  Stars/
│   └── Navbar/  Footer/
├── hooks/              Small bits of shared behaviour (scroll detection, count-up)
├── styles/
│   ├── tokens.css      Colour palette (dark + light) and font. Change a colour here, it changes everywhere.
│   └── global.css      Base styles for the whole page
└── assets/images/      Logos used in the code

public/
├── images/             Photos (team, members, past teams, news, events), plain paths like /images/team/control.jpg
└── favicon/            Browser-tab and home-screen icons
```

The addresses match the previous roboteamtwente.nl, so old links keep working. Unknown addresses show the 404 page.

## Common tasks

| I want to…                        | Edit                                                  |
| --------------------------------- | ----------------------------------------------------- |
| Change the story chapter text     | `src/data/story.js`                                   |
| Add or remove an event            | `src/data/events.js`                                  |
| Change a subteam description      | `src/data/subteams.js`                                |
| Add a partner                     | `src/data/partners.js`                                |
| Add or change a subteam member    | `src/data/subteams.js` (photo in `public/images/members/`) |
| Change an open position           | `src/data/join.js`                                    |
| Change a workshop                 | `src/data/education.js`                               |
| Add a past team                   | `src/data/pastTeams.js` (photo in `public/images/past-teams/`) |
| Add a news article                | `src/data/news.js` (images in `public/images/news/`)  |
| Add a page                        | new folder in `src/pages/`, then a `<Route>` in `src/App.jsx` |
| Change contact details            | `src/data/contact.js`                                 |
| Swap the hero photo               | replace `src/assets/images/hero.jpg`                  |
| Change a section's text or layout | `src/sections/<Section>/<Section>.jsx` and its `.css` |
| Change a colour                   | `src/styles/tokens.css`                               |
| Change the browser-tab icon       | replace the files in `public/favicon/` (same names)  |

## Colours

Every colour is derived from the logo purple `#5A1C74`. Use the variables in `tokens.css` (e.g. `var(--text-muted)`), never raw hex codes.
The logo purple is too dark for text on the dark background. For purple text, use `--lavender`.

Light mode reuses the same variable names with lighter values (bottom of `tokens.css`). The visitor's choice is saved in their browser; on a first visit the page follows their device setting.

## The scroll story

The top of the page is a tall section with a pinned stage. As you scroll, a line drawing of the rover draws itself, drives over a small planet (the planet turns underneath it), climbs a rock, takes a soil sample from a crater, and then the view zooms out to show the whole planet. At the end the rover drives off and **becomes the rover pet** that follows your cursor for the rest of the page.

- `src/data/story.js`: the headlines and the mission log lines, with when each appears.
- `sections/ScrollStory/StoryDirector.js`: all the timing and movement. Each effect is a progress range `[start, end]` at the top of the file.
- `sections/ScrollStory/rover/`: the drawing, one file per part. `geometry.js` holds the measurements (joints, planet size, where rocks and the crater are).
- `hooks/useScrollProgress.js`: turns scrolling through a section into a smooth number from 0 to 1.
- The handoff to the pet is a `rover-handoff` browser event sent by `StoryDirector.js` and received by `RoverPet.jsx`.

With "reduce motion" turned on, nothing is pinned: the rover shows fully drawn and the headlines are listed as plain text.

## The rover pet

Click anywhere and the rover drives there like a little car: it steers, speeds up, brakes, and tilts with the road. Text on the page is solid, so it plans a route around it. If you click on text it can't reach, it gets as close as it can and gets sad. Otherwise it stays near the cursor and switches moods on its own (happy, sad, dance, curious, sleepy).

- `RoverBrain.js`: how it drives and how it feels. Tweak speeds and timings with the constants at the top.
- `planRoute.js`: finds a path around text (grid + A* search).
- `TextObstacles.js`: finds where the words are on screen.
- `Rover.jsx`: the drawing.
- `RoverPet.module.css`: what each mood looks like.

## The fade-in effect

Wrap anything in `<Reveal>` to make it fade in when it scrolls into view. `from="left"` or `from="right"` makes it slide in sideways. Give siblings `order={0}`, `order={1}`, … so they appear one after another:

```jsx
<Reveal as="h2">Title</Reveal>
<Reveal as="p" order={1}>Appears just after the title</Reveal>
```

## Hosting note

The site uses real page addresses (`/join`, `/team/mechanical`). The web server must answer **every** address with `index.html` (a "single-page app fallback"), so that opening `/join` directly, or refreshing on it, works. `npm run dev` already does this.

## Editing the site without a developer (`/admin`)

Everything a visitor reads is editable at `/admin`: events, subteams, members, news, results,
the numbers on the front page, partners, alumni, past teams, social links, the education page
and its activity tabs, the join page and its open positions, and the contact details.

A save takes effect on the live site immediately. **Nothing has to be rebuilt or redeployed.**

- Each kind of content is described by one file in `shared/contentTypes/`. The server checks
  saves against that description and the admin builds its form from it, so the two can never
  drift apart. Adding a new kind of content means adding a description there and its starting
  content in `src/data/`, and nothing else.
- `src/data/*.js` stays in the repo as the content the site ships with. It is what you see if
  the content server is not running — which is how `npm run dev` works on its own — and what a
  page falls back to if a stored file goes missing or is hand-edited into the wrong shape.
- Pictures are uploaded in the admin, not committed. The ones already in the repo live at
  `/images/…` and keep working; uploaded ones land in `/uploads/…`.

### Backing it up

**`server/storage/` holds the content *and* the uploaded pictures, and it is not in git.**

```
server/storage/
├── content/     what every page says, as JSON, one file per kind
├── history/     the last 30 versions of each, so a bad edit can be undone
├── uploads/     every picture added through the admin
└── users.json   who may sign in
```

The repo is no longer the whole site. A backup means copying that folder as well — if the
office machine dies and only git survives, the site comes back as it was on the day it was
deployed, with every edit and every uploaded photo since then gone.

### Before it goes on a real domain

The admin currently uses a **development login** that lets any address on the access list in
without a password. It only runs locally: the server refuses to start if `AUTH_MODE=dev` is
combined with `NODE_ENV=production` **or** with a `PUBLIC_URL` that is not localhost. Switching
to `AUTH_MODE=google` (the team manager creates the OAuth client) is what makes it real.
