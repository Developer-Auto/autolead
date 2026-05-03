# AutoLead App

AutoLead App is a mobile-first PWA for lead management.

Current build:
- Local demo mode with browser storage
- Admin account simulation
- Pending/active subscription flow
- Lead dashboard
- Add lead bottom sheet
- Lead list and search
- Follow-up screen
- Status update sheet
- Admin panel with activate/deactivate and support view
- PWA manifest and service worker

Admin email:
`tokerdanny53@gmail.com`

## Run locally

Open `index.html` in a browser, or serve the folder with any static server.

For PWA install testing, use a local server or deploy to Netlify/Vercel. Browser install prompts usually do not work from `file://`.

## Firebase connection

When ready, fill `firebase-config.js` with your Firebase config and switch `enabled` to `true`.

The current app is intentionally built so the storage layer can be replaced with Firebase Auth + Firestore.

Recommended Firestore collections:
- `users/{uid}`
- `leads/{leadId}`
- `adminLogs/{logId}`

Security rules starter is in `firestore.rules`.
