# Alles Baby

Die App für das erste Babyjahr. Läuft unter **https://app.allesbabyapp.de**.

## Was liegt wo

| Ordner oder Datei | Inhalt |
|---|---|
| `public/` | Die fertige App: `index.html`, Rezepte, Lebensmittel, Icons, Schriften, Service Worker. Kein Build-Schritt nötig. |
| `netlify/functions/hit.mjs` | Nimmt die anonymen Zählmeldungen der App entgegen (`/api/hit`). |
| `netlify/functions/stats.mjs` | Statistikseite mit Passwort (`/statistik`). |
| `netlify/lib/stats.mjs` | Gemeinsame Zähl-Logik. |
| `netlify.toml` | Einstellungen für Netlify. Netlify liest sie automatisch. |
| `docs/styleguide-pwa.md` | Styleguide und alle Regeln für Gestaltung und Texte. |
| `tests/` | Test der Zähl-Logik (`npm test`). |

## Änderungen veröffentlichen

1. Dateien in `public/` auf GitHub ändern oder neu hochladen.
2. **Immer** in `public/sw.js` die Zeile `const CACHE = 'babyapp-v18';` um eins hochzählen. Sonst bekommen installierte Apps die Änderung nicht.
3. Speichern („Commit“). Netlify veröffentlicht nach etwa einer Minute automatisch.

Rezepte und Lebensmittel liegen in `public/rezepte.json` und `public/prep_guide.json`. Für Texte gelten die Regeln aus dem Styleguide: keine Abkürzungen, keine Gedankenstriche, Pronomen über Platzhalter.

## Kosten

Alles läuft in den kostenlosen Tarifen von GitHub und Netlify (Server-Funktionen und Blob-Speicher). Die genauen Freigrenzen stehen bei Netlify; für eine kleine App reichen sie voraussichtlich.
