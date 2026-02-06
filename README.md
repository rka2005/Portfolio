Portfolio
# Portfolio

This repository contains a personal developer portfolio with a React + Vite frontend and a minimal Node.js backend for simple data handling (e.g. achievements). The site showcases projects, achievements, skills, contact info and includes small admin features (login + upload form).

---

## Quick overview
- Frontend: Vite + React, Tailwind (optional) + custom CSS, Framer Motion animations
- Backend: Node.js (Express) with a lightweight DB file (`db.js`) used for storing or serving achievement records

## Live features
- Hero section with navigation and animated underline (light-beam effect)
- About, Skills, Projects, Achievements, Contact sections
- New Analytics section with animated stat counters
- Admin login page and upload form for adding new projects/achievements

## Project structure

Top-level layout:

```
Portfolio
├─ backend
│  ├─ .env                 # environment variables (not committed)
│  ├─ db.js                # lightweight data access / mock DB
│  ├─ models
│  │  └─ Achievement.js    # Achievement model / schema
│  ├─ package.json
│  ├─ README.md            # backend README / instructions
│  └─ server.js            # Express server
├─ frontend
│  ├─ index.html
│  ├─ package.json
│  ├─ postcss.config.js
│  ├─ tailwind.config.js
│  ├─ vite.config.js
│  ├─ public
│  │  └─ logos
│  └─ src
│     ├─ App.jsx
│     ├─ index.css
│     ├─ main.jsx
│     ├─ firebase.js        # (if present) firebase config
│     ├─ assets
│     │  └─ projects       # images/assets for project cards
│     └─ components
│        ├─ About.jsx
│        ├─ Analytics.jsx       # new analytics/statistics section
│        ├─ Achivements.jsx
│        ├─ Achivements.css
│        ├─ AchievementsPage.jsx
│        ├─ AchievementsPage.css
│        ├─ Background.jsx
│        ├─ Background.css
│        ├─ Contact.jsx
│        ├─ Contact.css
│        ├─ Footer.jsx
│        ├─ Footer.css
│        ├─ HamburgerButton.jsx
│        ├─ HeroSection.jsx
│        ├─ Loader.jsx
│        ├─ Loader.css
│        ├─ LogoLoop.jsx
│        ├─ LogoLoop.css
│        ├─ Navbar.jsx
│        ├─ Projects.jsx
│        ├─ ScrollFloat.jsx
│        ├─ ScrollFloat.css
│        ├─ Skills.jsx
│        ├─ UploadForm.jsx
│        └─ ...other helper components
└─ README.md
```

## New Analytics section
Located at `frontend/src/components/Analytics.jsx` with styles in `Analytics.css`.

Displays four animated stats:
- Projects: `8+`
- GitHub repositories: `20+`
- Badges & certificates: `50+`
- Contributions: `250+`

The design uses your project's cyan/teal palette (`#00ffbf`, `#00ffff`, `#00f3ff`) and includes a creative in/out animation via Framer Motion (cards stagger in on-scroll, number counters animate when in view).

## Development

Frontend (from `frontend/`):

```bash
cd frontend
npm install
npm run dev
```

Backend (from `backend/`):

```bash
cd backend
npm install
node server.js
```

Notes:
- Ensure `.env` exists in `backend/` for any environment variables referenced by `server.js`.
- If using Firebase or cloud services, add credentials to `frontend/src/firebase.js` or env files.

## Style & Design
- Colors: cyan/teal palette anchored at `#00ffbf` and `#00ffff`.
- Typography: `Poppins` for body and `Montserrat` for headings.
- UI patterns: glassmorphism cards, neon glows, and subtle motion via Framer Motion.

## Contributing
- Open an issue or submit a pull request. For UI changes, follow the existing style and prefer small incremental commits.

## License
- Add your preferred license here (e.g., MIT). If none, state "All rights reserved."

---

If you'd like, I can:
- add badges (build, license, deploy) to the top of this README
- add a short developer setup script or `make`/`npm` task for convenience
- generate a live demo deploy config (Vercel / Netlify)

