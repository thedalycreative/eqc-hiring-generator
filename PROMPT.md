# MISSION BRIEF

You are building a single-page classroom experience called **Bootstrap Hiring Ceremony**.

This is not a normal dashboard. It should feel like a polished indie game disguised as a teaching tool.

## Objective

Help a teacher assign students to bootstrap projects in a way that feels theatrical, memorable, and fair.

The page must:

- create excitement before coding begins
- assign exactly one developer per company
- prevent duplicate winners
- preserve a visible history of the ceremony
- support teacher-controlled chaos
- export the session at the end

## Tone

- Dramatic, funny, and confident
- Cinematic, not corporate
- High energy, but still readable
- Slightly absurd on purpose

## Required phases

### 1. Roll Call

- Show students as animated employee cards.
- Each card includes a name and emoji.
- Cards bounce into place.
- Cards can be dragged around.
- Clicking a card changes its emoji.
- Add subtle sound feedback for interactions.

### 2. The Ceremony Button

- Show one huge glowing button:
  - `BEGIN THE BOOTSTRAP HIRING CEREMONY`
- On activation:
  - fade the roll call down
  - start music or a music-like cue
  - transition to the reveal sequence

### 3. Company Reveal

- Reveal one random company at a time.
- The reveal should feel like a movie trailer.
- Include:
  - large title treatment
  - dramatic tagline
  - effects such as smoke, fire, camera shake, or confetti

### 4. Select Developer

Use a different picker style each round. Randomize the picker mode.

Approved picker modes:

- Claw Machine
- Magic 8 Ball
- Slot Machine
- Wheel of Fortune
- Dartboard
- UFO Abduction
- Mystery Gift
- Mad Scientist
- Pirate Treasure Map
- Cinema Popcorn

Rules:

- Each picker must feel distinct.
- Each picker must resolve to exactly one winner.
- Winners must be removed from the remaining pool immediately.
- No duplicates allowed.

### 5. Floating History

- Every company assignment becomes a small draggable window.
- Windows stack across the screen over time.
- They should resemble old desktop UI elements.
- The history should make the ceremony feel cumulative and alive.

### 6. Finale

- End with a red alarm-style state.
- Show a countdown.
- Use a strong "mission critical" vibe.
- Invite the teacher to proceed with the generated instructions.

### 7. Export

- Add an `Export Today's Ceremony` action.
- Export a single HTML report containing:
  - all students
  - each student emoji
  - assigned company
  - date
  - screenshots or visual placeholders
  - leaderboard or summary

## Teacher controls

Add hidden keyboard shortcuts:

- `F` = fireworks
- `C` = confetti
- `B` = boss music
- `R` = random explosion
- `S` = spin the wheel again
- `SPACE` = skip animation

These should be discoverable only if the teacher knows them.

## Timer behavior

- Start a large countdown when the work session begins.
- At minute intervals, show humorous announcements.
- Suggested announcements:
  - `13 minutes remaining. Coffee has gone cold.`
  - `8 minutes remaining. Management is becoming nervous.`
  - `5 minutes remaining. Your dragon is asking where the website is.`
  - `2 minutes remaining. Someone just pushed directly to production.`
  - `30 seconds. Pretend confidence.`
  - `TIME! Deploy what you've got!`

## Visual direction

- Dark cinematic backdrop
- Neon highlights
- Old-school desktop windows
- Rich motion and layered depth
- Avoid generic classroom UI
- Avoid sterile enterprise dashboards

## Interaction rules

- State must be deterministic and easy to reason about.
- Keep one source of truth for the student list.
- Eliminate selected students from future picker pools.
- Randomization must be visible and satisfying.
- Motion should support comprehension, not obscure it.

## Accessibility

- Buttons must be keyboard reachable.
- Announcements should have text equivalents.
- High contrast must remain readable.
- Reduced-motion users should get a calmer version.

## Implementation hints

- Use a single-page architecture.
- Structure the app into clear states:
  - roll call
  - reveal
  - picker
  - history
  - finale
- Make pickers pluggable so new modes can be added later.
- Keep the export format self-contained.

## Deliverables

Create or update:

- `index.html`
- `styles.css`
- `script.js`
- `README.md`
- `PROMPT.md`

## Definition of done

The experience should feel like an event, not a form.

Failure is not an option.
