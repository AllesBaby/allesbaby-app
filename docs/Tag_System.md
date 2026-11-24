# Tag-System Rezepte „Alles Baby“ (Stand 23.11.2026)

Alle 159 Rezepte haben jetzt Tags aus einem festen Katalog (`tag_katalog.json`: id, Anzeigename, Gruppe, Anzahl). Alle Rezepte haben außerdem `categories` (gemuese/obst/getreide). Bei den 83 Rezepten aus der Ursprungsdatei fehlten diese bisher.

## Katalog

| Gruppe | Tag-ID | Anzeigename | Rezepte |
|---|---|---|---|
| Mahlzeit | `fruehstueck` | Frühstück | 71 |
| Mahlzeit | `mittagessen` | Mittagessen | 47 |
| Mahlzeit | `abendessen` | Abendessen | 61 |
| Mahlzeit | `snack` | Snack | 98 |
| Essform | `brei` | Brei | 26 |
| Essform | `fingerfood` | Fingerfood | 96 |
| Gerichtsart | `waffeln` | Waffeln | 17 |
| Gerichtsart | `pancakes` | Pancakes & Pfannkuchen | 14 |
| Gerichtsart | `muffins` | Muffins | 11 |
| Gerichtsart | `kuchen` | Kuchen | 10 |
| Gerichtsart | `brot-broetchen` | Brot & Brötchen | 10 |
| Gerichtsart | `riegel-baellchen` | Riegel & Bällchen | 5 |
| Gerichtsart | `puffer` | Puffer & Taler | 13 |
| Gerichtsart | `pasta` | Pasta | 11 |
| Gerichtsart | `suppe` | Suppe | 1 |
| Gerichtsart | `aufstrich-dip` | Aufstrich & Dip | 5 |
| Gerichtsart | `getraenk` | Getränk | 3 |
| Ernährung | `vegetarisch` | Vegetarisch | 141 |
| Ernährung | `vegan` | Vegan | 32 |
| Ernährung | `fleisch` | Mit Fleisch | 9 |
| Ernährung | `fisch` | Mit Fisch | 9 |
| Frei von | `ohne-ei` | Ohne Ei | 97 |
| Frei von | `ohne-milch` | Ohne Milch | 62 |
| Frei von | `glutenfrei` | Glutenfrei | 41 |
| Frei von | `ohne-nuesse` | Ohne Nüsse | 126 |
| Praktisch | `einfrierbar` | Einfrierbar | 68 |
| Praktisch | `unterwegs` | Für unterwegs | 36 |
| Praktisch | `schnell` | Schnell (bis 15 Minuten) | 57 |
| Praktisch | `one-pot` | One-Pot | 4 |
| Praktisch | `reste-verwertung` | Resteverwertung | 6 |
| Praktisch | `vorkochen` | Zum Vorkochen | 17 |
| Anlass | `familienessen` | Familienessen | 26 |
| Anlass | `fest` | Geburtstag & Fest | 11 |
| Zubereitung | `ofen` | Ofen | 50 |
| Zubereitung | `pfanne` | Pfanne | 31 |
| Zubereitung | `waffeleisen` | Waffeleisen | 18 |
| Zubereitung | `ohne-kochen` | Ohne Kochen | 13 |

## Regeln

- **Essform:** nur `brei` (püriert, zum Füttern) und `fingerfood` (zum Selberessen). Gerichte dazwischen (z. B. Orzo, Joghurt-Schälchen) haben keinen Essform-Tag.
- **Alter:** kein Tag. Das Alter steht im Feld `ageRecommendation` und sollte als eigener Filter genutzt werden.
- **Frei von:** aus den Zutatenlisten abgeleitet, eher streng: Wenn eine Zutat als Alternative genannt ist („Milch oder Haferdrink“), gilt das Rezept nicht als frei davon. Hafer zählt als glutenhaltig, außer die Haferflocken sind ausdrücklich als glutenfrei angegeben. Blätterteig zählt als nicht milchfrei. Kokos zählt nicht als Nuss.
- **Vegan:** Rezepte mit Gläschen oder Breiresten, die Fleisch enthalten können, sind nur `vegetarisch`, nicht `vegan`.
- **Familienessen:** Rezepte, bei denen die Familie mitisst und Erwachsene ihre Portion selbst würzen.
- **Hinweis:** Die Allergen-Tags sind eine Filterhilfe und ersetzen nicht den Blick auf die Zutatenliste. Am besten steht in der App ein kurzer Hinweis dazu.

## Entfernte alte Tags

`obst`, `gemuese`, `getreide` (stehen schon in `categories`), `hauptgericht` (→ `mittagessen`), `herzhaft`, `meal-prep` (→ `vorkochen`), `bliss-balls`/`baellchen`/`riegel` (→ `riegel-baellchen`), `broetchen` (→ `brot-broetchen`).
