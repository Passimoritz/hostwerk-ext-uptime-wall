![Uptime wall](banner.svg)

# Uptime wall

**English** · [Deutsch](README.de.md)

All uptime checks big and colourful – with the history of the last hours, availability, response time and outages. For a second screen, as a tile or as a public status page for your visitors.

An official [Hostwerk](https://github.com/Passimoritz/hostwerk-public) extension – page in the “Monitoring” area of the sidebar (shortcut Ctrl+Alt+U) and a dashboard tile, in Hostwerk's own design, German and English.

## Features

- **Where:** Go live → Operate → Uptime wall and the dashboard tile – no own sidebar entry since 1.4.0; the full page stays under Extensions → Open
- **Wall:** every check as a tile with state, availability over 24 hours, average response time, number of outages and a history line (with a text alternative for screen readers)
- **Public status page:** a secret link (via remote access) or `index.html` + `status.json` written into a website folder every minute. You choose which checks appear and under which name; addresses stay hidden unless you want to show them. You confirm every change.
- No checks yet? A button leads straight to *Live → Monitoring*.
- Error state with “Try again”; refreshes only while the page or the dashboard is visible.

## Permissions

| Permission | Why |
|---|---|
| `read:live` | Read uptime checks and their history |
| `share:status` | Set up the public status page – **Hostwerk asks every time** |

## Develop

Logic in `page/lib.js` (no DOM), tests: `node --test tests/*.test.js`. Check: `node check.js . --strict` (Hostwerk SDK).

License: MIT
