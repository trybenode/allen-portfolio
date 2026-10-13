# Asset drop-in guide

Drop files in with **these exact names** and tell me "assets are in" — the
filenames alone tell me which slot each one belongs to, so I can wire them up
without asking you anything else.

Anything you don't have yet, just skip; that slot keeps its placeholder.

---

## 1. Hero portrait → `src/assets/hero/`

| Filename | Notes |
|---|---|
| `hero-portrait.png` | **Cutout PNG with a transparent background** if at all possible |

This is the single highest-impact one. The hero "floating box" look is mostly
because the placeholder is a solid rectangle — a transparent-background cutout
plus the new radial glow behind it is what actually makes it sit in the page.
A rectangular JPG will still read as a pasted box. Roughly 4:5 portrait,
≥1000px tall.

## 2. Marquee tiles → `src/assets/marquee/`

| Filename | Notes |
|---|---|
| `marquee-01.png` … `marquee-18.png` | Numbered = display order. Row 1 gets 01–09, row 2 gets 10–18. |

**Landscape, 14:9-ish (e.g. 840×540).** They render at 160×100 on phones, so
crop to the interesting part — full desktop screenshots turn to mush at that
size. 15–21 total; repeat some if you're short. GIFs work.

## 3. About corner accents → `src/assets/about/`

| Filename | Position |
|---|---|
| `accent-top-left.svg` | top-left |
| `accent-bottom-left.svg` | bottom-left |
| `accent-top-right.svg` | top-right |
| `accent-bottom-right.svg` | bottom-right |

Square, transparent background. SVG or PNG both fine.

## 4. Project cards → `src/assets/projects/`

Three images per project, and **the suffix matters** — the three slots have
different shapes:

| Filename pattern | Slot | Shape |
|---|---|---|
| `<project>-1-left-top.png` | left column, upper | wide landscape ~16:9 |
| `<project>-2-left-bottom.png` | left column, lower | landscape ~4:3 |
| `<project>-3-right-tall.png` | right column, full height | **tall / portrait ~7:8** — a mobile screen or a long scroll shot works great here |

Where `<project>` is one of: `cribnconnect`, `trybemarket`, `network-analyser`.

So, nine files, e.g. `cribnconnect-1-left-top.png`,
`cribnconnect-2-left-bottom.png`, `cribnconnect-3-right-tall.png`, and the same
for the other two.

---

## Links I still need

Paste these in chat, no file needed. Anything not deployed → say "not live" and
I'll leave that card's "Live Project" button off (it's conditional already).

- [ ] CribNConnect live URL
- [ ] TrybeMarket live URL
- [ ] Network Analyser live URL
- [ ] GitHub — currently guessed as `github.com/ttdotdev`
- [ ] LinkedIn — currently guessed as `linkedin.com/in/ttdotdev`
- [ ] Instagram — currently guessed as `instagram.com/ttdotdev`
- [ ] Contact email — currently `douglasallendev@gmail.com`
- [ ] `trybenode.online` — confirm that's right

## Optional 4th/5th project cards

If you want TrybeTickets and/or X Creator Copilot added, use the same pattern
(`trybetickets-1-left-top.png`, `x-creator-copilot-1-left-top.png`, …) and say
so — the stacking math already generalizes to any number of cards.
