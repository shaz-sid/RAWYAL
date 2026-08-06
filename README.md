# The Rawyal

A Vite + React + Tailwind landing page for The Rawyal — a Jaipur-to-USA
e-commerce logistics brand. Deep navy / champagne gold luxury identity.

## Stack & animation layers

- **React 18 + Vite** — app shell and component structure.
- **Tailwind CSS** — design tokens for color, type, and spacing.
- **GSAP + `@gsap/react` + `SplitText`** — the hero headline and the
  "Aurora AI" headline animate in character-by-character / word-by-word.
- **GSAP `ScrollTrigger`** (`src/components/Reveal.jsx`) — every section
  fades/rises into place once scrolled into view; card grids stagger.
- **three.js** — two ambient WebGL layers:
  - `StarfieldBackground.jsx`: drifting gold particle field behind the hero.
  - `RotatingGlobe.jsx`: a wireframe globe with a point-cloud data layer,
    used in the logistics/infrastructure panel, tilts toward the cursor.
- **Raw WebGL shader** (`ShaderBackground.jsx`) — a subtle animated
  navy/gold noise wash behind the logistics section.
- **Framer Motion** — the mobile nav dropdown and the FAQ accordion
  (`Accordion.jsx`) use spring-based height/opacity/rotation transitions
  instead of instant show/hide, so drop-downs feel smooth rather than snappy.
- A slim gold scroll-progress bar (`ScrollProgress.jsx`) tracks page position.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to /dist
npm run preview  # preview the production build
```

## Structure

```
src/
  components/
    SplitText.jsx           # character/word reveal (React Bits component)
    Reveal.jsx               # scroll-triggered fade/rise wrapper
    StarfieldBackground.jsx  # three.js ambient particles
    RotatingGlobe.jsx        # three.js globe with data points
    ShaderBackground.jsx     # raw WebGL noise shader
    Accordion.jsx            # animated FAQ drop-downs (framer-motion)
    Header.jsx                # nav + animated mobile menu drop-down
    Hero.jsx / Services.jsx / Infrastructure.jsx / Aurora.jsx / FAQ.jsx
    Contact.jsx / Footer.jsx / ScrollProgress.jsx
  App.jsx
  main.jsx
  index.css
```

## Notes

- Respects `prefers-reduced-motion` globally (see `index.css`).
- All interactive elements have visible keyboard focus states.
- WebGL/three.js contexts are properly disposed on unmount to avoid
  leaking canvases when navigating in a larger app.
