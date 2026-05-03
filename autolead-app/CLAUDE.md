# AutoLead — Claude Code Context

## Project
AutoLead is a B2B lead generation / marketing automation web app.

**Stack:** Vanilla JS · Firebase (Firestore + Auth) · PWA · Netlify hosting

## Files
| File | Purpose |
|------|---------|
| `index.html` | Main entry |
| `app.js` | Core app logic |
| `styles.css` | Styles |
| `firebase-config.js` | Firebase init (contains secrets — never log or store) |
| `firestore.rules` | Security rules |
| `sw.js` | Service worker / PWA caching |
| `manifest.webmanifest` | PWA manifest |

## Rules
- **Never** store Firebase API keys, tokens, or secrets in memory or output
- **Ask before** deploying to Netlify or Firebase
- **Ask before** any destructive command (delete, drop, reset)
- **Ask before** sending any message or notification
- Tests: run `npx serve .` or open `index.html` in browser via Playwright MCP

## Available MCP Tools
- `filesystem` — read/write project files
- `playwright` — open browser, screenshot, check console
- `sequential-thinking` — plan features step by step
- `fetch` — fetch external URLs / research
- `github` — GitHub operations (needs GITHUB_PERSONAL_ACCESS_TOKEN in env)
- `claude-mem` — persistent memory across sessions
