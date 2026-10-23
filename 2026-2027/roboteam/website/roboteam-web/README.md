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
├── App.jsx             The page, top to bottom. Reorder or remove sections here.
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
│   ├── Hero/  Statement/  Stats/  About/  Achievements/  Team/
│   └── Events/  Alumni/  Partners/  News/  Join/  Contact/
├── components/         Reusable building blocks used by the sections
│   ├── Reveal/         The fade-in-on-scroll effect
│   ├── Button/  SectionHeader/  SubteamCard/  EventCard/
│   └── Navbar/  Footer/
├── hooks/              Small bits of shared behaviour (scroll detection, count-up)
├── styles/
│   ├── tokens.css      Colour palette and font. Change a colour here, it changes everywhere.
│   └── global.css      Base styles for the whole page
└── assets/images/      Photos used on the page
```

## Common tasks

| I want to…                        | Edit                                                  |
| --------------------------------- | ----------------------------------------------------- |
| Add or remove an event            | `src/data/events.js`                                  |
| Change a subteam description      | `src/data/subteams.js`                                |
| Add a partner                     | `src/data/partners.js`                                |
| Change contact details            | `src/data/contact.js`                                 |
| Swap the hero photo               | replace `src/assets/images/hero.jpg`                  |
| Change a section's text or layout | `src/sections/<Section>/<Section>.jsx` and its `.css` |
| Change a colour                   | `src/styles/tokens.css`                               |

## Colours

Every colour is derived from the logo purple `#5A1C74`. Use the variables in `tokens.css` (e.g. `var(--text-muted)`), never raw hex codes.
The logo purple is too dark for text on the dark background. For purple text, use `--lavender`.

## The fade-in effect

Wrap anything in `<Reveal>` to make it fade up when it scrolls into view. Give siblings `order={0}`, `order={1}`, … so they appear one after another:

```jsx
<Reveal as="h2">Title</Reveal>
<Reveal as="p" order={1}>Appears just after the title</Reveal>
```
