# EQC Hiring Generator

> The Bootstrap Hiring Ceremony: a theatrical classroom tool that turns assigning students to Bootstrap projects into a live event. 🚧 Flagged for an update.

**Live demo:** [eqc-hiring-generator.vercel.app](https://eqc-hiring-generator.vercel.app)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square)

## Features

- Roll call: students arrive as animated employee cards (add as they walk in, or Quick Add a sample class)
- Movie-trailer style company reveal and a random picker that never repeats a student
- Winners leave the pool and their history stacks up as small draggable windows
- Hidden teacher hotkeys for extra spectacle, sound cues and a closing countdown
- Export the day's ceremony as a report; start a fresh class with one click
- `PROMPT.md` holds the full build brief

## Tech stack

- Plain HTML, CSS and vanilla JavaScript, no build step
- Space Grotesk + JetBrains Mono
- Hosted on Vercel

## Run it locally

```bash
git clone https://github.com/thedalycreative/eqc-hiring-generator.git
cd eqc-hiring-generator
npx serve .        # or open index.html
```

## Deployment (Vercel)

Static site, repo root is the output. The Vercel project **eqc-hiring-generator** deploys `main` to **https://eqc-hiring-generator.vercel.app**. (Previously deployed by CLI as the `webdev-bootstrap` project; source recovered from that deployment.)

## Screenshots

![EQC Hiring Generator demo](docs/screenshots/demo.gif)

<p align="center">
  <img src="docs/screenshots/desktop.jpg" alt="Hiring ceremony home" width="560">
  <img src="docs/screenshots/mobile.jpg" alt="On a phone" width="260">
</p>

_Captured from the live site (https://eqc-hiring-generator.vercel.app). Regenerate with any headless browser; files live in `docs/screenshots/`._

> **To do:** flagged for an update.

---

Built by [The Daly Creative](https://www.thedalycreative.com) · Perth, WA
