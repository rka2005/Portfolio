# RK05 — Personal Portfolio for Rohit Adak
Typing Animation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC.svg)](https://tailwindcss.com/)

   

## 🚀 Overview
A cutting-edge, production-ready personal portfolio website built with modern web technologies:

React 18 • JavaScript • Vite • Tailwind CSS • Framer Motion • Custom Components • NodeJS • Express JS

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
| 🛠️ Dev Tools | ESLint 9.32.0 |
| 📦 Package Manager | npm with lock file versioning |

---


## 📂 Project Directory Structure
Well-organized, scalable full-stack architecture with React frontend and Node.js backend:

```
Portfolio/
│
├── 📁 backend/                         # Node.js Express backend
│   ├── .env                            # Environment variables
│   ├── .gitignore                      # Git ignore rules
│   ├── db.js                           # Lightweight data access / mock DB
│   ├── package.json                    # Backend dependencies
│   ├── package-lock.json               # Lock file for reproducible installs
│   ├── README.md                       # Backend documentation
│   └── server.js                       # Express server
│
├── 📁 frontend/                        # React + Vite frontend
│   ├── eslint.config.js                # ESLint configuration
│   ├── index.html                      # HTML entry point
│   ├── package.json                    # Frontend dependencies
│   ├── package-lock.json               # Lock file for reproducible installs
│   ├── postcss.config.js               # PostCSS plugins
│   ├── README.md                       # Frontend documentation
│   ├── tailwind.config.js              # Tailwind CSS configuration
│   ├── vercel.json                     # Vercel deployment config
│   ├── vite.config.js                  # Vite build configuration
│   ├── public/                         # Static assets
│   │   └── logos/                      # Logo images
│   └── src/                            # Source code
│       ├── App.css                     # App-level styles
│       ├── App.jsx                     # Root React component
│       ├── firebase.js                 # Firebase configuration
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
│           ├── Contact.jsx             # Contact component
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
├── 📄 render.yaml                       # Render deployment config
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
| 📧 Contact.jsx | Get in touch | Contact form and info cards |
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

📦 Install backend dependencies

```bash
cd backend
npm install
```

📦 Install frontend dependencies

```bash
cd ../frontend
npm install
```

🔥 Start development servers

**Terminal 1: Backend**
```bash
cd backend
node server.js
```

**Terminal 2: Frontend**
```bash
cd frontend
npm run dev
```

Open browser to http://localhost:5173 ✨


## 💻 NPM Scripts

**Frontend (from frontend/ directory)**
```bash
npm run dev          # Start dev server with hot reload
npm run build        # Create optimized production build
npm run preview      # Preview production build locally
```

**Backend (from backend/ directory)**
```bash
node server.js       # Start the Express server
```
## 🚀 Build & Deployment
### Frontend Build
```bash
cd frontend
npm run build
```
Output: frontend/dist/ folder ready for deployment

---


### Backend Deployment
Deploy backend to services like Render, Railway, or Heroku
Use the render.yaml for Render deployment

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
Add environment variables in backend/.env for contact API.

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

### 📋 Contribution Guidelines
📝 Follow existing code style and TypeScript conventions
🏷️ Add proper TypeScript types to all new code
📱 Test changes on multiple devices (desktop, tablet, mobile)
📚 Update README if adding new features
💬 Keep commits focused and descriptive

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

**Backend Connection Issues**
Ensure backend server is running on correct port
Check CORS settings in backend/server.js

## 📝 Environment Variables
Create backend/.env for backend configuration:

# Server port
PORT=5000

# Database or other configs
# Add your environment variables here

For frontend, if needed, create frontend/.env.local:

# API endpoints
VITE_API_URL=http://localhost:5000

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
4. **Environment Variables** (if needed):
   - Add any required env vars like `VITE_API_URL`
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
- **Frontend on Vercel**: Handles static site hosting with fast global CDN.
- **Backend on Render**: Provides free tier for Node.js apps with automatic scaling.
- **Database**: Currently uses a lightweight file-based DB (db.js). For production, consider MongoDB Atlas or other databases.
- **Domain**: Point your domain to Vercel for frontend, and configure CORS in backend for cross-origin requests.