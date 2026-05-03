# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

AutoLead is two things in one repo:

| Part | Location | Purpose |
|------|----------|---------|
| Marketing website | root (`index.html`, `styles.css`, `script.js`) | Lead-gen landing page (Hebrew/English/Russian) |
| PWA app | `autolead-app/` | Mobile-first lead management app (Vanilla JS + Firebase) |

Hosting: both parts deploy to Netlify. The app is live at `https://autolead-app.netlify.app/`.

## Running locally

```bash
# Marketing site
npx serve .

# PWA app (must use a server — file:// breaks PWA install and Firebase)
npx serve autolead-app/
```

For PWA install testing (Android `beforeinstallprompt`), use `localhost` or an HTTPS URL — the install prompt does not fire on `file://`.

## App architecture (`autolead-app/`)

**Stack:** Vanilla JS (no bundler) · Firebase 10 (Auth + Firestore) · PWA · Netlify

### Dual storage mode

The app runs in two modes controlled by `window.AUTOLEAD_FIREBASE_CONFIG.enabled` in `firebase-config.js`:

- **Demo/localStorage mode** (`enabled: false` or no config): all state lives in `localStorage` under `autolead_v1_state`. The `cloud` variable stays `null`. Useful for offline dev.
- **Firebase mode** (`enabled: true`): `initCloud()` lazily imports the Firebase SDK from CDN and sets up `cloud = { auth, db, authSdk, dbSdk }`. Firestore listeners are stored in `cloudUnsubscribers[]` and torn down on logout via `stopCloudSync()`.

Both modes use the same `state` object shape and `saveState()` writes through.

### State and auth flow

`state` in `app.js` is the single source of truth for local mode. `loadState()` seeds it with a demo admin and a demo business user on first run. `currentUserId` tracks the active session.

Admin role is determined by email match against `ADMIN_EMAIL` (hardcoded to `tokerdanny53@gmail.com` in both `app.js` and `firestore.rules`). There are two separate session TTL keys:
- `autolead_remember_until` — regular "remember me" session
- `autolead_admin_auth_until` — extra admin session (shorter TTL)

### Firestore data model

```
users/{uid}         — user profile + subscriptionStatus
leads/{leadId}      — lead data, ownerUid = user who created it
requests/{requestId} — admin support/activation requests
```

Firestore rules (`firestore.rules`) enforce that users can only read/write their own leads. Admin email has full access.

### PWA install

`deferredInstallPrompt` captures the `beforeinstallprompt` event. The install button in Settings calls `deferredInstallPrompt.prompt()`. iOS install requires manual Share → Add to Home Screen (no API).

## Marketing site architecture (root)

**Stack:** Vanilla HTML/CSS/JS · No framework · RTL-first

### i18n system

All content for Hebrew, English, and Russian lives in the `translations` object in `script.js`. `applyLanguage(lang)` does a full DOM text replacement pass and sets `document.documentElement.dir` to `rtl` (Hebrew) or `ltr` (English/Russian). Language and dark/light theme are persisted to `localStorage`.

When adding content to the site, add strings to all three language keys in `translations` — never hardcode text in the HTML.

### WhatsApp integration

All `[data-whatsapp]` links are populated dynamically by `updateWhatsappLinks()`. The contact form submits by opening `https://wa.me/{number}?text=...` in a new tab — there is no backend form handler.

## Security notes

- `ADMIN_PASSWORD` is hardcoded in `app.js:2` — this is for local/demo mode only; Firebase mode uses Google Sign-In.
- `firebase-config.js` contains the Firebase API key — this is expected and safe for Firebase web apps (security is enforced by Firestore rules, not key secrecy).
- The admin email is hardcoded in both `app.js` and `firestore.rules` — changing the admin requires updating both files and redeploying rules.
- Ask before deploying to Netlify or Firebase, and before any destructive operation.
