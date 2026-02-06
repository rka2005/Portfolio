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
├─ README.md
├─ render.yaml
├─ backend
│  ├─ .env
│  ├─ .gitignore
│  ├─ db.js
│  ├─ package.json
│  ├─ package-lock.json
│  ├─ README.md
│  └─ server.js
└─ frontend
   ├─ index.html
   ├─ package.json
   ├─ package-lock.json
   ├─ postcss.config.js
   ├─ README.md
   ├─ tailwind.config.js
   ├─ vercel.json
   ├─ vite.config.js
   ├─ .vite
   ├─ public
   │  └─ logos
   └─ src
      ├─ App.css
      ├─ App.jsx
      ├─ index.css
      ├─ main.jsx
      ├─ assets
      │  └─ projects
      └─ components
         ├─ About.jsx
         ├─ AchievementLoader.css
         ├─ AchievementLoader.jsx
         ├─ AchievementsPage.css
         ├─ AchievementsPage.jsx
         ├─ Achivements.css
         ├─ Achivements.jsx
         ├─ AllProjects.css
         ├─ AllProjects.jsx
         ├─ Analytics.css
         ├─ Analytics.jsx
         ├─ Background.css
         ├─ Background.jsx
         ├─ Contact.css
         ├─ Contact.jsx
         ├─ Footer.css
         ├─ Footer.jsx
         ├─ HackerLoginPage.css
         ├─ HamburgerButton.jsx
         ├─ HeroSection.css
         ├─ HeroSection.jsx
         ├─ Loader.css
         ├─ Loader.jsx
         ├─ LogoLoop.css
         ├─ LogoLoop.jsx
         ├─ Projects.jsx
         ├─ ScrollFloat.css
         ├─ ScrollFloat.jsx
         ├─ Sign.css
         ├─ Sign.jsx
         ├─ Skills.jsx
         ├─ UploadForm.css
         └─ UploadForm.jsx
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

