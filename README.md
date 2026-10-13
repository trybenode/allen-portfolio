# Allen Douglas — Portfolio

Personal portfolio landing page for **Allen Douglas** (@ttdotdev), full-stack
software engineer & startup founder.

Built with **React + TypeScript + Vite**, **Tailwind CSS**, **Framer Motion**,
and **Lucide React**. Dark theme (`#0C0C0C`) with the **Kanit** typeface.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build
```

## Structure

```
src/
  components/
    FadeIn.tsx           scroll-triggered fade + slide-in wrapper
    Magnet.tsx           mouse-following magnetic hover effect
    AnimatedText.tsx     word-by-word scroll reveal
    ContactButton.tsx    gradient pill CTA  ("Contact Me")
    LiveProjectButton.tsx ghost/outline pill ("Live Project")
  sections/
    HeroSection.tsx      navbar + big heading + magnetic portrait
    TerminalSection.tsx  typed terminal session with real project stats
    AboutSection.tsx     corner accents + animated paragraph
    ServicesSection.tsx  white section, 5 numbered services
    ProjectsSection.tsx  sticky-stacking, scaling project cards
    SkillsSection.tsx    tabbed skills + animated proficiency bars
    ExperienceSection.tsx work history + Download CV
    CertificatesSection.tsx credentials
    Footer.tsx           name, nav, socials
```

The CV served by the Download button lives at `public/allen-douglas-cv.pdf`.

## Swapping in your real assets

Everything marked `PLACEHOLDER` in the code uses `placeholder('label')` from
`src/assets/placeholder.ts`. To replace one:

1. Drop your image into `src/assets/` (e.g. `hero.jpg`, `cribnconnect-1.png`).
2. `import heroImg from '../assets/hero.jpg';`
3. Replace the `placeholder('...')` call with `heroImg`.

What to gather:

- **Hero portrait** — a clean headshot (`HeroSection.tsx`).
- **About accents** — four corner icons (currently React / Node.js / MongoDB /
  Figma placeholders) in `AboutSection.tsx`.
- **Projects** — 3 screenshots each for CribNConnect, TrybeMarket, and Network
  Analyser (`ProjectsSection.tsx`). Uncomment each project's `liveUrl` once it's
  deployed and the "Live Project" button appears automatically.

### Adding a 4th / 5th project card

Append to the `projects` array in `ProjectsSection.tsx` (e.g. TrybeTickets, X
Creator Copilot). The scale/offset stacking math generalizes to any count — no
other changes needed.
