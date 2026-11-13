# RiseUpp – Image Search (React + Vite, frontend only)

Search Unsplash photos, browse Mountains / Flowers / Beaches / Cities, hover for details, open a modal, and Load More.

## Setup
1. Register at https://unsplash.com/developers → **Your apps → New Application** (accept the terms).
2. Open the app and copy the **Access Key** (not the Secret Key).
3. In the project root: `cp .env.example .env` and set `VITE_UNSPLASH_ACCESS_KEY=your_real_key`.
4. `npm install` then `npm run dev` and open http://localhost:5173.

Restart the dev server whenever `.env` changes.

## Notes
- Demo apps are limited to 50 requests/hour. Every `VITE_` variable is bundled into the browser, so the Access Key is public by design; never use the Secret Key here. Production use requires applying for higher limits.
- Photographer and Unsplash links include `utm_source=riseupp&utm_medium=referral` per Unsplash guidelines.
