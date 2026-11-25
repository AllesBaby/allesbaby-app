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

## Einmalig einrichten

1. **GitHub:** Ein neues, privates Repository anlegen, zum Beispiel `alles-baby-app`. Den Inhalt dieses Ordners hochladen (im Repository auf „Add file“, dann „Upload files“ und die Ordner hineinziehen).
2. **Netlify mit GitHub verbinden:** Bei der bestehenden App-Site in den Einstellungen das Repository verknüpfen (oder eine neue Site über „Import from Git“ anlegen). Die Einstellungen kommen aus `netlify.toml`: veröffentlicht wird der Ordner `public`, einen Build-Befehl gibt es nicht.
3. **Passwort für die Statistik:** In Netlify unter den Umgebungsvariablen (Environment variables) eine Variable `STATS_PASSWORT` anlegen und ein sicheres Passwort eintragen. Danach einmal neu veröffentlichen.
4. **Domain:** `app.allesbabyapp.de` in Netlify als eigene Domain eintragen und bei netcup einen CNAME-Eintrag `app` auf die netlify.app-Adresse der Site anlegen. Netlify richtet HTTPS automatisch ein. Danach `app.allesbabyapp.de` als Hauptdomain festlegen.

## Statistik ansehen

**https://app.allesbabyapp.de/statistik** öffnen. Der Browser fragt nach Benutzername und Passwort: Der Benutzername ist egal, das Passwort ist `STATS_PASSWORT`.

Gezählt wird pro Tag: Starts (als App oder im Browser), Nutzung am Stück in vier Stufen und Installationen auf Android. Keine IP-Adressen, keine Kennungen, keine Inhalte. Es werden Starts gezählt, nicht Personen. Auf anderen Adressen (zum Beispiel beim Testen) sendet die App nichts.

## Änderungen veröffentlichen

1. Dateien in `public/` auf GitHub ändern oder neu hochladen.
2. **Immer** in `public/sw.js` die Zeile `const CACHE = 'babyapp-v28';` um eins hochzählen. Sonst bekommen installierte Apps die Änderung nicht.
3. Speichern („Commit“). Netlify veröffentlicht nach etwa einer Minute automatisch.

Rezepte und Lebensmittel liegen in `public/rezepte.json` und `public/prep_guide.json`. Für Texte gelten die Regeln aus dem Styleguide: keine Abkürzungen, keine Gedankenstriche, Pronomen über Platzhalter.

## Kosten

Alles läuft in den kostenlosen Tarifen von GitHub und Netlify (Server-Funktionen und Blob-Speicher). Die genauen Freigrenzen stehen bei Netlify; für eine kleine App reichen sie voraussichtlich.
