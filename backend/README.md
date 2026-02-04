# Backend (Portfolio) — Render deployment guide

This folder contains the Node/Express backend used by the portfolio.

## What I changed
- Added `start` script in `package.json` so Render can run the service: `node server.js`.
- Added an `engines.node` entry recommending Node `18.x`.

## Required environment variables (set these in Render Dashboard -> Environment)
- `MONGO_URI` — your MongoDB connection string (use Atlas standard or SRV depending on network).
- `MONGO_DB_NAME` (optional) — defaults to `portfolioDB`.
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `PORT` (Render will provide this automatically via `PORT` env; no need to set unless overriding)

> Important: Do NOT commit your `.env` with secrets. Remove it from the repo and use Render's Environment settings.

## How to deploy on Render (quick)
1. Commit and push your code to GitHub (or your git provider).
2. Open https://dashboard.render.com and create a new **Web Service**.
3. Connect your repository and choose the `backend` folder as the root (set the "Root Directory" to `backend`).
4. Build Command: leave empty (no build needed) or `npm install`.
5. Start Command: `npm start` (or `node server.js`).
6. Under Environment, add the variables listed above.
7. Create the service — Render will install dependencies and start the app.

## Useful tips
- If you want persistent caching or higher throughput, consider adding Redis and configuring Redis as an add-on.
- Remove `.env` from the repo and add it to `.gitignore` if not already ignored.

***
If you want, I can also add a `render.yaml` manifest to automate the Render service configuration — tell me if you'd like that created.
