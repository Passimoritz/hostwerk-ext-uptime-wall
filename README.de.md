![Uptime-Wand](banner.svg)

# Uptime-Wand

[English](README.md) · **Deutsch**

Alle Erreichbarkeits-Prüfungen groß und farbig – mit Verlauf der letzten Stunden, Verfügbarkeit, Antwortzeit und Ausfällen. Für einen zweiten Bildschirm, als Kachel oder als öffentliche Statusseite für deine Besucher.

Eine offizielle [Hostwerk](https://github.com/Passimoritz/hostwerk-public)-Erweiterung – Seite im Bereich „Überwachung“ der Seitenleiste (Kürzel Strg+Alt+U) und Kachel für die Übersicht, im Design von Hostwerk, auf Deutsch und Englisch.

## Funktionen

- **Wand:** jede Prüfung als Kachel mit Zustand, Verfügbarkeit in 24 Stunden, Ø-Antwortzeit, Zahl der Ausfälle und Verlaufslinie (mit Textalternative für Bildschirmleser)
- **Öffentliche Statusseite:** ein geheimer Link (über den Fernzugriff) oder `index.html` + `status.json` jede Minute in einen Website-Ordner. Du wählst, welche Prüfungen erscheinen und unter welchem Namen; Adressen bleiben verborgen, außer du willst sie zeigen. Jede Änderung bestätigst du.
- Noch keine Prüfung? Ein Knopf führt direkt zu *Livebetrieb → Überwachung*.
- Fehlerzustand mit „Erneut versuchen“; nachgeladen wird nur, solange Seite oder Übersicht sichtbar sind.

## Rechte

| Recht | Wofür |
|---|---|
| `read:live` | Erreichbarkeit und Verlauf der Prüfungen lesen |
| `share:status` | Öffentliche Statusseite einrichten – **Hostwerk fragt jedes Mal** |

## Entwickeln

Logik in `page/lib.js` (ohne DOM), Tests: `node --test tests/*.test.js`. Prüfung: `node check.js . --strict` (Hostwerk-SDK).

Lizenz: MIT
