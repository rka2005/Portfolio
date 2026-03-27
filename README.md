# RK05 — Personal Portfolio for Rohit Adak

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC.svg)](https://tailwindcss.com/)

   

## 🚀 Overview
A cutting-edge, production-ready personal portfolio website built with modern web technologies:

React 18 • JavaScript • Vite • Tailwind CSS • Framer Motion • Custom Components • Firebase Firestore • Vercel Serverless Functions

## Table of Contents
- [Overview](#overview)
- [Core Features](#core-features)
- [Complete Tech Stack](#complete-tech-stack)
- [Project Directory Structure](#project-directory-structure)
- [Component Breakdown](#component-breakdown)
- [Installation & Setup](#installation--setup)
- [NPM Scripts](#npm-scripts)
- [Build & Deployment](#build--deployment)
- [Customization Guide](#customization-guide)
- [Project Metrics](#project-metrics)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [Environment Variables](#environment-variables)
- [Contact Information](#contact-information)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Live Demo Deploy Config](#live-demo-deploy-config)

---

## ✨ Core Features
### ⚡ Performance & Experience

| Feature | Description |
|---------|-------------|
| 🚀 Lightning-Fast Builds | Vite in <15 seconds with ~666KB minified bundle |
| 📱 100% Responsive Design | Mobile-first, pixel-perfect on all devices |
| ✨ Optimized Animations | 0.8s smooth transitions with cubic-bezier easing for premium feel |
| 🎯 Reduced Motion Support | Respects user's prefers-reduced-motion setting |

### 🎨 Visual Design

| Feature | Description |
|---------|-------------|
| 🎨 Modern UI System | 50+ Shadcn/UI & Radix components for consistency |
| 🎪 Interactive Effects | Glowing hover animations on project showcase for immersive UX |
| ✨ Particle Animations | tsParticles background with custom configuration |
| 🌊 Wave Text Animations | Character-level animations on section titles that replay on scroll |
| 🎆 Gradient Hover Effects | Multi-color gradients on skill badges and buttons |

### 🔌 Serverless & Backend

| Feature | Description |
|---------|-------------|
| ☁️ Serverless Functions | Vercel serverless API for contact form email delivery (Nodemailer + Gmail SMTP) |
| 🔥 Firebase Firestore | Contact form submissions stored in real-time cloud database |
| 🚫 No Traditional Backend | Eliminates the need for a separate Express server in production |

### ♿ Accessibility & UX

| Feature | Description |
|---------|-------------|
| 📝 Form Validation | React Hook Form with Zod schema validation |
| 🔔 Toast Notifications | Sonner for user feedback and confirmation |
| 📄 Resume Integration | One-click PDF preview and download |

### 🔒 Code Quality

| Feature | Description |
|---------|-------------|
| ✅ 100% Type-Safe | JavaScript strict mode across entire codebase |
| 🔍 ESLint Configured | Enforces best practices and code consistency |
| 🏭 Production Ready | Minification, tree-shaking, asset optimization |

---
## 🧰 Complete Tech Stack
A carefully curated selection of industry-standard tools for maximum performance and developer experience:

| 📋 Category | 🔧 Technologies |
|-------------|-----------------|
| ✨ Frontend | React 18.3.1, JavaScript (JSX), Vite |
| ⚡ Build Tools | Vite 5.4.19, esbuild |
| 🎨 Styling | Tailwind CSS 3.4.17, PostCSS 8.5.6, Autoprefixer 10.4.21 |
| 🎨 UI Framework | Custom Components with Radix UI primitives |
| 🎬 Animations | Framer Motion 12.23.24, CSS3 Keyframes |
| 🎨 Icons | Lucide React 0.462.0 (462+ icons) |
| 📝 Forms | React Hook Form 7.61.1, Zod 3.25.76 schema validation |
| 🗺️ Routing | React Router DOM 6.30.1 with nested routes |
| 📊 State & Data | TanStack Query 5.83.0, React Context |
| 🌈 Theme | next-themes 0.3.0 with system preference detection |
| 🔔 Notifications | Sonner 1.7.4 toast system |
| 📈 Data Viz | Recharts 2.15.4, React Day Picker 8.10.1 |
| 🎠 Carousel | Embla Carousel 8.6.0 with custom controls |
| 🔧 Utilities | clsx 2.1.1, class-variance-authority 0.7.1, tailwind-merge 2.6.0 |
| � Backend-as-a-Service | Firebase 12.8.0 (Firestore for contact storage) |
| ☁️ Serverless | Vercel Serverless Functions, Nodemailer 8.0.1 (Gmail SMTP) |
| 🛠️ Dev Tools | ESLint 9.36.0 |
| 📦 Package Manager | npm with lock file versioning |

---


## 📂 Project Directory Structure
Well-organized, scalable architecture with React frontend, Vercel serverless API, and Firebase Firestore:

```
Portfolio/
│
├── 📁 backend/                         # Node.js Express backend (legacy / local dev)
│   ├── .env                            # Environment variables
│   ├── .gitignore                      # Git ignore rules
│   ├── db.js                           # Lightweight data access / mock DB
│   ├── package.json                    # Backend dependencies
│   ├── package-lock.json               # Lock file for reproducible installs
│   ├── README.md                       # Backend documentation
│   └── server.js                       # Express server
│
├── 📁 frontend/                        # React + Vite frontend
│   ├── .env                            # Environment variables (Firebase, Gmail SMTP)
│   ├── .npmrc                          # npm configuration
│   ├── eslint.config.js                # ESLint configuration
│   ├── index.html                      # HTML entry point
│   ├── package.json                    # Frontend dependencies
│   ├── package-lock.json               # Lock file for reproducible installs
│   ├── postcss.config.js               # PostCSS plugins
│   ├── README.md                       # Frontend documentation
│   ├── tailwind.config.js              # Tailwind CSS configuration
│   ├── vercel.json                     # Vercel deployment & serverless routing config
│   ├── vite.config.js                  # Vite build configuration
│   ├── api/                            # ☁️ Vercel Serverless Functions
│   │   └── contact.js                  # Serverless contact form handler (Nodemailer + Gmail SMTP)
│   ├── public/                         # Static assets
│   │   └── logos/                      # Logo images
│   └── src/                            # Source code
│       ├── App.css                     # App-level styles
│       ├── App.jsx                     # Root React component
│       ├── firebase.js                 # 🔥 Firebase config & Firestore initialization
│       ├── index.css                   # Global styles
│       ├── main.jsx                    # React entry point
│       ├── assets/                     # Asset files
│       │   └── projects/               # Project images
│       └── components/                 # React components
│           ├── About.jsx               # About section
│           ├── AchievementLoader.css   # Achievement loader styles
│           ├── AchievementLoader.jsx   # Achievement loader component
│           ├── AchievementsPage.css    # Achievements page styles
│           ├── AchievementsPage.jsx    # Achievements page component
│           ├── Achivements.css         # Achievements styles
│           ├── Achivements.jsx         # Achievements component
│           ├── AllProjects.css         # All projects styles
│           ├── AllProjects.jsx         # All projects component
│           ├── Analytics.css           # Analytics styles
│           ├── Analytics.jsx           # Analytics component
│           ├── Background.css          # Background styles
│           ├── Background.jsx          # Background component
│           ├── Contact.css             # Contact styles
│           ├── Contact.jsx             # Contact form (Firebase + serverless email)
│           ├── Footer.css              # Footer styles
│           ├── Footer.jsx              # Footer component
│           ├── HackerLoginPage.css     # Login page styles
│           ├── HamburgerButton.jsx     # Hamburger menu button
│           ├── HeroSection.css         # Hero section styles
│           ├── HeroSection.jsx         # Hero section component
│           ├── Loader.css              # Loader styles
│           ├── Loader.jsx              # Loader component
│           ├── LogoLoop.css            # Logo loop styles
│           ├── LogoLoop.jsx            # Logo loop component
│           ├── Projects.jsx            # Projects component
│           ├── ScrollFloat.css         # Scroll float styles
│           ├── ScrollFloat.jsx         # Scroll float component
│           ├── Sign.css                # Sign styles
│           ├── Sign.jsx                # Sign component
│           ├── Skills.jsx              # Skills component
│           ├── UploadForm.css          # Upload form styles
│           └── UploadForm.jsx          # Upload form component
│
├── 📄 README.md                        # This file
├── 📄 render.yaml                       # Render deployment config (backend)
└── 📁 node_modules/                    # Installed dependencies

```

---


## 🎨 Component Breakdown
### 📑 Main Page Components

| 🎭 Component | 📋 Purpose | ⭐ Features |
|--------------|------------|-------------|
| 🎨 HeroSection.jsx | Landing section | Typing animation, resume download, social icons |
| 👤 About.jsx | Professional intro | Avatar, skills, interactive sections |
| 💼 Projects.jsx | Showcase gallery | Project cards with hover effects and demos |
| 🔧 Skills.jsx | Skill matrix | Categorized skills with filtering |
| 🏆 Achivements.jsx | Certification hub | Achievements with filtering and display |
| 📊 Analytics.jsx | Statistics section | Animated counters for metrics |
| 📧 Contact.jsx | Get in touch | Contact form with Firebase Firestore storage & serverless email |
### 🎭 Supporting Components

| 🎭 Component | 📋 Purpose |
|--------------|------------|
| 🔗 HamburgerButton.jsx | Mobile navigation toggle |
| 📄 Footer.jsx | Footer with links and social media |
| ⏳ Loader.jsx | Loading spinner component |
| 🖼️ Background.jsx | Background effects |
| 📤 UploadForm.jsx | Admin upload functionality |
| 🔐 Sign.jsx | Authentication component |
📄 Footer.jsx	Footer grid with Quick Links, social icons, quote
✨ ParticlesBackground.jsx	jsParticles animated background

---

## ⚙️ Installation & Setup

### 📋 Prerequisites
⬜ Node.js 18+ (Download)
📦 npm (comes with Node.js)
🐙 Git for version control


### 🚀 Installation Steps
📥 Clone the repository

```bash
git clone https://github.com/rka2005/Portfolio.git
cd Portfolio
```

📦 Install frontend dependencies

```bash
cd frontend
npm install
```

🚀 Start development server

```bash
cd frontend
npm run dev
```

Open browser to http://localhost:5173 ✨

> **Note:** The contact form uses Vercel Serverless Functions (`frontend/api/contact.js`) for sending emails. In local development, email sending via the serverless endpoint is only available when running through `vercel dev`. Firebase Firestore storage works in all environments.

📦 (Optional) Install backend dependencies for legacy local development

```bash
cd backend
npm install
node server.js
```


## 💻 NPM Scripts

**Frontend (from frontend/ directory)**
```bash
npm run dev          # Start dev server with hot reload
npm run build        # Create optimized production build
npm run preview      # Preview production build locally
```

**Serverless Development (from frontend/ directory)**
```bash
npx vercel dev       # Start Vercel dev server with serverless functions
```

**Backend — Legacy (from backend/ directory)**
```bash
node server.js       # Start the Express server (optional, for local dev)
```
## 🚀 Build & Deployment
### Frontend Build
```bash
cd frontend
npm run build
```
Output: frontend/dist/ folder ready for deployment

---


### Serverless Backend (Vercel)
The contact form backend runs as a Vercel Serverless Function (`frontend/api/contact.js`). It is automatically deployed alongside the frontend when you deploy to Vercel — no separate backend deployment is needed for the contact form.

### Legacy Backend Deployment (Optional)
If you still use the Express backend for other features, deploy it to services like Render, Railway, or Heroku.
Use the render.yaml for Render deployment.

### Deploy to Vercel (Frontend)
Push code to GitHub
Go to vercel.com
Click "New Project" → Select repository
Configure root directory as frontend/
Vercel auto-detects Vite config
Click "Deploy" 🚀

### Other Platforms
Netlify: Drag-drop frontend/dist folder
Firebase Hosting: Deploy frontend/dist folder
GitHub Pages: Configure for static hosting

## 🎨 Customization Guide

### 1️⃣ Personal Information
Profile Image: Replace frontend/public/logos/ with your images

Resume: Update links in components if needed

### 2️⃣ Update Skills
Edit frontend/src/components/Skills.jsx to add your skills.

### 3️⃣ Customize Theme Colors
Edit frontend/src/index.css for color schemes.

### 4️⃣ Setup Contact Form
- Add Firebase config variables (`VITE_FIREBASE_*`) in `frontend/.env` for Firestore storage.
- Add `GMAIL_USER` and `GMAIL_APP_PASSWORD` in Vercel environment variables (or `frontend/.env` for local dev) for serverless email delivery.
- The serverless function lives at `frontend/api/contact.js` and is auto-routed by `vercel.json`.

### 5️⃣ Update Social Links
Edit frontend/src/components/Footer.jsx and other components for links.

## 📊 Project Metrics

| Metric | Value | Notes |
|--------|-------|-------|
| Code Volume | 2000+ lines | React JSX + CSS + backend JS |
| Components | 25+ main + supporting | Custom React components |
| Type Coverage | JavaScript (JSX) | Dynamic and flexible |
| Production Deps | 30+ | Carefully curated packages |
| Bundle Size | ~500 KB | Minified, optimized |
| Build Time | <20 seconds | Vite with esbuild |
| Animations | 10+ keyframes | CSS + Framer Motion |
| Accessibility | WCAG compliant | Keyboard navigation, semantic HTML |
| Responsive Points | 4+ breakpoints | Mobile-first design |

## 🤝 Contributing
🎉 Contributions are welcome! Please follow these steps:

🍴 Fork the repository

```bash
git clone https://github.com/rka2005/Portfolio.git
cd Portfolio
```

🌿 Create a feature branch

```bash
git checkout -b feature/amazing-feature
```

🔨 Make your changes and test locally

```bash
npm run dev
```

✅ Run linting

```bash
npm run lint
```

💾 Commit your changes

```bash
git commit -m 'Add amazing feature'
```

📤 Push to your branch

```bash
git push origin feature/amazing-feature
```

🔄 Open a Pull Request on the main repository

## 🐛 Troubleshooting

**Port Already in Use**
Change ports in frontend/vite.config.js or backend/server.js

**Module Not Found**
```bash
# For frontend
cd frontend && rm -rf node_modules package-lock.json && npm install

# For backend
cd backend && rm -rf node_modules package-lock.json && npm install
```

**Build Failures**
Check for syntax errors in JSX files
Ensure all dependencies are installed

**Animations Not Smooth**
Verify Framer Motion is properly imported
Check CSS transitions in component styles

**Backend / Serverless Issues**
Ensure environment variables (`GMAIL_USER`, `GMAIL_APP_PASSWORD`) are set in Vercel project settings.
For local serverless testing, run `npx vercel dev` from the `frontend/` directory.
Check CORS headers in `frontend/api/contact.js` if cross-origin requests fail.

## 📝 Environment Variables

### Frontend (`frontend/.env`)
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Gmail SMTP (used by Vercel serverless function)
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_app_password
```

> **Tip:** On Vercel, add the `GMAIL_USER` and `GMAIL_APP_PASSWORD` variables in **Project Settings → Environment Variables** so the serverless function can access them in production.

### Backend — Legacy (`backend/.env`, optional)
```env
# Server port
PORT=5000

# MongoDB connect
MONGO_URI=your_mongodb_URI

# Cloudinary Setup
CLOUDINARY_CLOUD_NAME=your_cloudinary_NAME
CLOUDINARY_API_KEY=your_cloudinary_API_KEY
CLOUDINARY_API_SECRET=your_API_SECRET
```

## 📬 Contact Information
👨‍💻 Rohit Adak
📧 Email: rohitadak0@gmail.com
💼 LinkedIn: Rohit Adak
🐙 GitHub: rka2005
🌐 Portfolio: rohitadak.vercel.app

## 📜 License
✅ This project is open source and available under the MIT License. Feel free to use it as a template for your own portfolio! 🎉

## �️ Acknowledgments
Strategic Credits:

✨ React & JavaScript communities for amazing tools
⚡ Vite for blazing-fast build performance
🎨 Tailwind CSS for utility-first CSS framework
🎨 Shadcn/UI & Radix UI for accessible components
🎬 Framer Motion for smooth animations
✨ JsParticles for particle effects
🔥 Firebase for real-time Firestore database
☁️ Vercel for serverless functions and hosting
📧 Nodemailer for serverless email delivery
⭐ All contributors and open-source libraries
⭐ If you found this portfolio helpful, please give it a star! ⭐

Crafted with Logic & Dedication by Rohit Adak

Deploy with confidence • Code with passion • Build with pride

## Live Demo Deploy Config

### Vercel Deployment
1. **Connect Repository**: Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.
2. **New Project**: Click "New Project" and select your portfolio repository.
3. **Configure Settings**:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. **Environment Variables**:
   - `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`, `VITE_FIREBASE_MEASUREMENT_ID` — Firebase config
   - `GMAIL_USER` — Gmail address for serverless contact form
   - `GMAIL_APP_PASSWORD` — Gmail app password for SMTP
5. **Deploy**: Click "Deploy" and wait for the build to complete.
6. **Custom Domain** (optional): Add your custom domain in the project settings.

### Render Deployment (Backend)
1. **Connect Repository**: Go to [render.com](https://render.com) and sign in.
2. **New Web Service**: Click "New +" and select "Web Service".
3. **Connect GitHub**: Choose your repository and branch.
4. **Configure Service**:
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Root Directory**: `backend`
5. **Environment Variables**:
   - `PORT`: `10000` (or Render's default)
   - Add other env vars as needed
6. **Deploy**: Click "Create Web Service" and wait for deployment.
7. **Update Frontend**: Update `VITE_API_URL` in frontend with the Render backend URL.

### Full-Stack Deployment Notes
- **Frontend + Serverless API on Vercel**: Handles static site hosting with fast global CDN and serverless functions for the contact form (`/api/contact`).
- **Firebase Firestore**: Contact form submissions are stored in Firebase Firestore in real-time — no additional database setup needed.
- **Backend on Render (Optional)**: The legacy Express backend can still be deployed if needed for other features.
- **Domain**: Point your domain to Vercel for frontend, serverless API is automatically available at `/api/*`.
