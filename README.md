# ⟨ DHILIPAN BALASUBRAMANIAN ⟩ — Developer Portfolio v2.0

> A deep-ocean cyberpunk portfolio built with **React 18 + Vite 5**. Features a matrix rain splash screen, one-shot scan beam reveal, animated honeycomb transition, live project previews, and a custom RAF-driven cursor.

---

## 🚀 Live Demo

**Portfolio** → Deploy on [Vercel](https://vercel.com) (see deployment guide below)

**Featured Projects:**
- **PythonLearn** → [pyplatform.vercel.app](https://pyplatform.vercel.app/)
- **DjangoLearn** → [djangolearn.vercel.app](https://djangolearn.vercel.app/)

---

## ✨ Features

### Visual Effects
| Effect | Description |
|--------|-------------|
| **Matrix Rain** | Canvas-based falling character rain (JP + Django/Python chars) on both splash and hero |
| **Honeycomb Transition** | Canvas-drawn hex cells fill in a diagonal wave sweep on splash exit |
| **Scan Beam** | One-shot cyan→violet gradient beam sweeps the viewport once on load |
| **Scan Reveal** | Every text block materialises with a flicker animation as the beam crosses it |
| **Glitch Effect** | Name clips into cyan/violet split layers on a 5s RAF loop |
| **Hex Grid BG** | Animated drifting honeycomb pattern across the entire page |
| **Custom Cursor** | Lagging ring + dot with click shrink, hover expand, `cursor: none` site-wide |
| **Orb Glows** | Floating radial gradient orbs with `filter: blur` — never clipped at section edges |

### Architecture Highlights
- **`scanEngine.js`** — Single RAF loop driving all text reveals via `querySelectorAll('[data-scan]')`. No hooks, no listeners, no race conditions
- **`useTyping`** — `useRef`-based typer (not cascading `useState`) prevents word-switch flash glitch
- **`ScanBeam.jsx`** — Isolated component, fires once after 800ms delay, unmounts cleanly
- **`Splash.jsx`** — Boot sequence + canvas honeycomb exit; unmounts completely after transition

### Sections
- **Splash** — Boot terminal, progress bar, matrix rain, honeycomb exit animation
- **Hero** — Glitch name, typewriter roles, matrix canvas, live terminal code block, tech badges
- **About** — Profile JSON card, experience timeline, language proficiency bars, certifications
- **Skills** — Animated progress bars (violet→cyan gradient) triggered by IntersectionObserver
- **Projects** — Live browser mockups with static screenshots, 3D hover tilt, visit overlay
- **Contact** — Email template generator → opens pre-filled Gmail compose or system mail app
- **Footer** — Animated scan line, ghost text, nav/stack links

---

## 🗂 Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── preview-pyplatform.png      ← PythonLearn homepage screenshot
│   └── preview-djangolearn.png     ← DjangoLearn homepage screenshot
│
├── src/
│   ├── App.jsx                     ← Root: Splash gate + main site fade-in
│   ├── App.css                     ← Site fade-in transition after splash
│   ├── index.css                   ← Global CSS variables, cursor, hex grid, scan system
│   ├── main.jsx                    ← React 18 entry point
│   ├── scanEngine.js               ← RAF scan engine (pure DOM, zero React state)
│   │
│   └── components/
│       ├── Splash.jsx / .css       ← Boot screen + honeycomb canvas exit
│       ├── Cursor.jsx / .css       ← Custom cursor (dot + lagging ring)
│       ├── ScanBeam.jsx / .css     ← One-shot viewport scan beam
│       ├── Navbar.jsx / .css       ← Sticky nav, scroll detection, mobile burger
│       ├── Hero.jsx / .css         ← Glitch name, typewriter, matrix rain canvas
│       ├── About.jsx / .css        ← Bio card, timeline, language bars, certs
│       ├── Skills.jsx / .css       ← Animated skill bars + tech tag cloud
│       ├── Projects.jsx / .css     ← Browser mockups with live screenshots
│       ├── Contact.jsx / .css      ← Gmail/mailto email template generator
│       └── Footer.jsx / .css       ← Footer with animated scan line
│
├── index.html                      ← Google Fonts: Orbitron + Outfit + JetBrains Mono
├── vite.config.js
├── vercel.json                     ← Vercel deployment config (pre-configured)
├── .gitignore
└── package.json
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Plain CSS with custom properties (zero CSS frameworks) |
| Fonts | Orbitron · Outfit · JetBrains Mono (Google Fonts) |
| Animations | CSS keyframes + native `requestAnimationFrame` |
| Deployment | Vercel |
| Dependencies | React + React DOM only — no animation libraries |

---

## ⚙️ Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **npm** v9 or higher

### Install & Run

```bash
# 1. Clone or unzip the project
cd portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
# → Opens at http://localhost:5173
```

### Build for Production

```bash
npm run build        # Compiles and bundles → /dist
npm run preview      # Serves the production build locally
```

---

## ☁️ Deployment

### Vercel (Recommended)

**Option A — Vercel CLI**
```bash
npm install -g vercel
vercel
# Follow the prompts — Vite is auto-detected
```

**Option B — GitHub Integration**
1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. Vercel detects Vite automatically → click **Deploy**

Every push to `main` triggers an automatic redeploy. The `vercel.json` is already configured.

### Other Platforms

| Platform | Steps |
|----------|-------|
| **Netlify** | `npm run build` → drag `dist/` folder into Netlify UI, or connect via GitHub |
| **GitHub Pages** | `npm run build` → deploy `dist/` using the `gh-pages` package |
| **Render** | Static site → build command: `npm run build`, publish dir: `dist` |

---

## 🎨 Customisation Guide

### Update Personal Info

| File | What to edit |
|------|-------------|
| `src/components/Hero.jsx` | Name, bio paragraph, stats (years / % boost / apps), terminal code |
| `src/components/About.jsx` | `TIMELINE` array, meta panel rows, `CERTS` array, `LANGS` array |
| `src/components/Skills.jsx` | `GROUPS` skill bars with percentages, `TAGS` cloud array |
| `src/components/Projects.jsx` | `PROJECTS` array — titles, descriptions, URLs, tags, stats |
| `src/components/Contact.jsx` | `MY_EMAIL` constant (line 4), terminal code snippet |
| `src/components/Footer.jsx` | Tagline text, stack list items, copyright line |
| `src/components/Navbar.jsx` | Logo text if desired |
| `src/components/Splash.jsx` | `BOOT_LINES` array — terminal messages and their timing |

### Replace Project Screenshots

Drop your own screenshots into `public/`:
```
public/preview-pyplatform.png       → Project 1 screenshot
public/preview-djangolearn.png      → Project 2 screenshot
```
> **Recommended size:** 1280×720px (16:9) — fills the browser mockup at the correct aspect ratio.

### Change the Colour Scheme

All colours are CSS custom properties in `src/index.css`:

```css
:root {
  /* Backgrounds */
  --bg:            #020817;   /* Page background         */
  --bg-card:       #060f20;   /* Card background         */

  /* Primary accent — Electric Cyan */
  --cyan:          #00d4ff;
  --cyan-dim:      #0099bb;

  /* Secondary accent — Violet */
  --violet-bright: #a855f7;

  /* Project-specific */
  --emerald-bright:#34d399;   /* PythonLearn (emerald)   */

  /* Text */
  --text:          #d8eeff;   /* Primary text            */
  --text-muted:    #4a6fa0;   /* Secondary text          */
}
```

Change `--cyan` and `--violet-bright` to retheme the entire site instantly.

### Adjust Scan Beam Timing

`src/scanEngine.js`:
```js
const DELAY    = 800;   // ms before sweep starts (give page time to paint)
const DURATION = 3500;  // ms for one full-page sweep
```

### Adjust Splash Duration

`src/components/Splash.jsx`:
```js
const exitTimer = setTimeout(() => {
  setHexActive(true); // start honeycomb
}, 2600); // change this to make splash longer/shorter
```

---

## 📧 Contact Form — Email Flow

The contact form doesn't use a backend. Instead it generates a formatted email and opens it in Gmail or the system mail app:

**Flow:**
1. Visitor fills **Name**, **Email**, **Message** and clicks Send
2. `buildEmailTemplate()` creates a structured plain-text email body with a formatted header block
3. A **Gmail compose URL** (`mail.google.com/mail/?view=cm&fs=1&to=...`) opens in a new tab with To, Subject, and Body pre-filled
4. If the popup is blocked by the browser, falls back to `mailto:` (opens Outlook, Apple Mail, etc.)
5. Success state confirms which app opened with **Open Again** and **New Message** options

**To change the recipient:**
```js
// src/components/Contact.jsx — top of file
const MY_EMAIL = 'dhilipanvb.414@proton.me';  // ← change this
```

---

## 🎯 Key Design Decisions

**Why no animation library?**
Everything is native `requestAnimationFrame` and CSS keyframes — zero bundle overhead, full control over timing, and no version conflicts.

**Why `useRef` for the typewriter?**
The old `useState`-based typer caused a one-frame flash when switching words because React batched `setDel(false)` + `setWi(next)` across two render cycles. A single `useRef` state object ticks synchronously inside one closure — no batching, no glitch.

**Why `data-scan` attributes instead of a React hook?**
Hook-based scan reveals created race conditions — `getBoundingClientRect()` was called before elements had final layout positions. The `scanEngine.js` runs `document.querySelectorAll('[data-scan]:not(.scan-in)')` every RAF frame, getting live accurate positions, and adds `.scan-in` directly to the DOM — no React re-renders involved.

**Why static screenshots instead of iframes?**
Iframes caused noticeable lag (JS loading, CORS, CSP headers). Static PNG screenshots in a styled browser chrome look identical and load in milliseconds.

---

## 📄 License

MIT — free to fork, customise, and deploy as your own portfolio.

---

<div align="center">

**Built with ♥ in Chennai, India**

`Python · Django · React · Vite · Vercel`

</div>
