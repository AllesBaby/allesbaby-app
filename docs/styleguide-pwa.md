# PWA Styleguide

Basis: neues Farb-, Typo- und Formensystem. Ergänzt um praktische PWA-Bausteine (8px-Grid, Safe-Area, Touch-Targets) aus dem alten Guide.

---

## 0. Behobene Umsetzungsfehler (Historie – als Prüfliste nutzen, nicht als offene Aufgabe)

> **Stand:** Alle Punkte dieses Abschnitts sind im Code behoben und gegen den aktuellen Stand geprüft. Die Tabellen zeigen den **damaligen Fehlzustand** („Aktuell (falsch)“) – sie dienen als Prüfliste, welche Fehler nicht wiederkommen sollen, nicht als Arbeitsauftrag.

Diese 5 Punkte wichen damals vom Guide ab. Unten stehen jeweils der Fehlzustand und der verbindliche Sollzustand – der Sollzustand gilt weiterhin.

### 0.1 KRITISCH: Es gibt zwei "Primary"-Farben – es darf nur eine geben

**Problem:** Aktuell wird für Primär-Aktionen mal Violett/Indigo, mal Mauve/Rose verwendet. Das sind zwei verschiedene Farben, die beide wie "die App-Hauptfarbe" aussehen.

**Die einzig richtige Primary-Farbe ist:**
```css
--primary: oklch(0.6 0.12 300); /* ≈ #9b72cf, Lavendel */
```

**Verboten:** Jeder Mauve-/Rosé-Ton (z. B. `#d68a9d` oder ähnliche Werte) als Primär-Farbe. Das ist ein Rest aus der **alten** Palette und darf nirgends mehr als `--primary` oder hartkodierter Hex-Wert auftauchen.

**Konkret zu korrigieren (alles auf `var(--primary)` umstellen):**

| Element | Screen | Aktuell (falsch) | Soll |
|---|---|---|---|
| „Bereits probiert"-Badge | Lebensmittel-Detail | Mauve/Rose | `var(--primary)` |
| „Reaktion"-Button | Lebensmittel-Detail | Mauve/Rose | `var(--primary)` |
| „Als gekocht markieren"-Button | Home | Mauve/Rose | `var(--primary)` |
| „UV 0"-Badge | Home (Outfit-Karte) | Mauve/Rose | `var(--primary)` |
| „2 probiert"-Badge | Beikost-Übersicht | Mauve/Rose | `var(--primary)` |
| „+"-Button (Eigenes Lebensmittel) | Beikost-Übersicht | Mauve/Rose | `var(--primary)` |
| „Zurück"-Button | Profil | Violett/Indigo, voll gefüllt | Umbauen auf `.btn-back` (Ghost-Stil, siehe Abschnitt 8) – volle Füllung war zu präsent für Navigation |
| „Speichern"-Buttons | Profil | Violett/Indigo | `var(--primary)` (schon fast richtig – exakten Wert angleichen) |
| Aktiver Bottom-Nav-Tab | überall | Violett/Indigo | `var(--primary)` (schon fast richtig – exakten Wert angleichen) |

**Faustregel für die Umsetzung:** Jede Primär-Aktion (wichtigster Button, aktiver Zustand, Haupt-Badge) bekommt denselben `var(--primary)`-Wert – ausnahmslos. Kein zweiter „Marken-Ton" daneben.

### 0.2 Legende ist textlich veraltet

Screen „Legende" zeigt aktuell:
> Grau = noch gesperrt · Weiß = freigegeben · **Salbeigrün** = probiert · **Soft-Rot** = Reaktion

„Salbeigrün" und „Soft-Rot" sind Begriffe aus der **alten** Palette und kommen in der aktuellen UI nirgends mehr vor (siehe 0.1 – es ist jetzt Mauve/Rose bzw. `var(--primary)`). Text ist damit sachlich falsch.

**Ersetzen durch** (passend zum in Abschnitt 6 dokumentierten Status-Badge-System, kein Vollflächen-Farbcode mehr nötig):
> Grau = noch gesperrt · Weiß = freigegeben · **Häkchen** = probiert · **Rot** = Reaktion

### 0.3 Baby-Led-Weaning-Icon falsch übernommen

Guide sagt: `Broccoli`. Aktuell umgesetzt ist ein Wolken-/Kritzel-Icon. Bitte 1:1 aus der Tabelle in Abschnitt 4 („Globale Navigations- & Sektions-Icons") übernehmen, nicht neu interpretieren.

### 0.4 Gemüse-Icon: Regel wurde korrigiert, nicht mehr pro Item nötig

Ursprünglich stand hier, jedes Gemüse-Item müsse `Carrot` bekommen. Diese Regel ist überholt (siehe Abschnitt 4, „Lebensmittel-Icons: nur auf Sektions-Ebene"): Einzelne Lebensmittel-Karten bekommen **gar kein Icon** mehr, auch Blumenkohl/Brokkoli/Zwiebel nicht – das Icon gehört ausschließlich in den Sektions-Header „🥕 Gemüse". Bei der Korrektur also nicht das fehlende Icon bei Aubergine/Basilikum/Spinat ergänzen, sondern die vorhandenen Icons bei den anderen Items entfernen.

### 0.5 Outfit- & Szenario-Icons: vereinheitlicht (keine Ausnahme mehr)

War zwischenzeitlich als bewusste Ausnahme dokumentiert (buntes Handzeichnungs-Set). Nach Praxis-Review zurückgenommen: alle 27 Kleidungs-Icons (`OI`-Objekt) und alle 7 Szenario-Icons (`SCENARIOS`-Array, inkl. neu ergänztem „Kinderwagen") sind jetzt auf den einheitlichen Custom-Icon-Stil umgestellt – siehe Abschnitt 4, „Outfit- & Szenario-Icon-Set (Custom, im Lucide-Stil)". Keine hartkodierten Hex-Farben mehr, durchgängig `currentColor` + `var(--color-primary)`, 24×24-Grid, `stroke-width: 1.75`.

---

## 1. Farben (OKLCH)

| Token | OKLCH | Verwendung |
|-------|-------|------------|
| `--background` | `oklch(0.985 0.008 60)` | Seitenhintergrund, sehr helles Cremeweiß |
| `--foreground` | `oklch(0.32 0.05 320)` | Haupttext, warmes Dunkelgrau |
| `--primary` | `oklch(0.6 0.12 300)` | Buttons, Links, Icons, Akzente – sanftes Lavendel |
| `--primary-foreground` | `oklch(0.99 0.004 330)` | Text auf Primary-Flächen |
| `--primary-glow` | `oklch(0.78 0.08 315)` | Verläufe, Hover-Leuchten |
| `--secondary` | `oklch(0.96 0.02 330)` | Subtile Hintergründe, Tags, Kartenhintergründe |
| `--secondary-foreground` | `oklch(0.36 0.055 320)` | Text auf Secondary-Flächen |
| `--muted` | `oklch(0.96 0.015 330)` | Muted-Backgrounds |
| `--muted-foreground` | `oklch(0.52 0.035 320)` | Beschreibungen, Platzhalter |
| `--accent` | `oklch(0.93 0.04 60)` | Sehr dezenter Sand-Akzent |
| `--blossom` | `oklch(0.95 0.035 350)` | Blush, weiche Highlights |
| `--blossom-foreground` | `oklch(0.36 0.06 350)` | Text auf Blush-Flächen |
| `--warm` | `oklch(0.92 0.05 70)` | Warme Section-Hintergründe |
| `--warm-foreground` | `oklch(0.38 0.06 30)` | Text auf Warm-Flächen |
| `--border` | `oklch(0.9 0.02 60)` | Ränder, Trennlinien |
| `--destructive` | `oklch(0.577 0.245 27.325)` | Fehler, Löschen |

### Näherungsweise HEX-Werte (für externe Tools)

- Background: `#faf8f5`
- Foreground: `#4a3f4a`
- Primary: `#9b72cf`
- Primary glow: `#c9a0dc`
- Secondary: `#f3eff5`
- Muted foreground: `#7d6f7d`
- Blossom: `#f5e8ec`
- Warm: `#f0e8df`
- Border: `#e6e1da`

---

## 2. Typografie

- **Display / Headings:** `Outfit`, Gewichte 600/700, leichtes negatives Letter-Spacing
- **Body:** `Figtree`, Gewichte 400/500
- Beide Schriften werden in `src/routes/__root.tsx` über Google Fonts geladen.

```css
:root {
  --font-display: "Outfit", system-ui, sans-serif;
  --font-body: "Figtree", system-ui, sans-serif;
}

h1, h2, .headline {
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--foreground);
}

body, button, input, .ui-text {
  font-family: var(--font-body);
  color: var(--foreground);
}
```

---

## 3. Formen & Schatten

- **Border Radius:** sehr rund, Basis `--radius: 1.25rem`
  - `rounded-md`: `calc(--radius - 2px)`
  - `rounded-lg`: `--radius`
  - `rounded-xl`: `calc(--radius + 4px)`
  - `rounded-3xl`: `calc(--radius + 12px)`
- **Schatten:** weich und diffus, leicht violett getönt
  - `--shadow-soft`
  - `--shadow-lift`
- **Transition:** `--transition-soft: 320ms cubic-bezier(0.22, 1, 0.36, 1)`

```css
:root {
  --radius: 1.25rem;
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-3xl: calc(var(--radius) + 12px);

  --shadow-soft: 0 8px 30px oklch(0.6 0.12 300 / 0.12);
  --shadow-lift: 0 12px 40px oklch(0.6 0.12 300 / 0.16);

  --transition-soft: 320ms cubic-bezier(0.22, 1, 0.36, 1);
}
```

---

## 4. Icons

**Empfehlung: [Lucide](https://lucide.dev)** (kostenlos, ISC-Lizenz, als `lucide-react` / `lucide` npm-Paket verfügbar).

Das Icon-Set im Screenshot (T-Shirt, Sparkles, Schüssel) passt bereits sehr genau zu Lucides Stil: einheitliche Strichstärke, abgerundete Linienenden, reine Outline-Icons ohne Füllung. Andere gute Alternative mit ähnlichem Charakter: [Phosphor Icons](https://phosphoricons.com) (Regular-Weight).

Warum Lucide hier gut passt:
- Reines Outline-Icon-Set, keine gefüllten Flächen – wirkt leicht und passt zum Soft-Look
- Konsistente Strichstärke über das ganze Set hinweg (kein Mix aus dünnen/dicken Icons)
- Abgerundete Linienenden (`stroke-linecap: round`) statt eckiger Kanten – passt zum runden Formsystem (Abschnitt 3)
- Sehr großes, aktives Set, gut gepflegt, tree-shakeable

### Was dafür noch definiert werden muss

| Eigenschaft | Wert | Hinweis |
|---|---|---|
| Icon-Größe | `24px` | Standardgröße für Icons in Kacheln/Cards |
| Strichstärke (`stroke-width`) | `1.75` | Etwas feiner als der Lucide-Default (2), wirkt zurückhaltender |
| Icon-Farbe | `var(--primary)` | Durchgängig, für Wiedererkennbarkeit |
| Container („Badge“) | Kreis, `56px` Durchmesser | Wie im Screenshot |
| Container-Hintergrund | `var(--secondary)` oder `var(--blossom)` | Je nach Kategorie/Kontext variierbar |
| Container-Innenabstand | `var(--space-2)` (16px) | Icon zentriert |

```css
:root {
  --icon-size: 24px;
  --icon-stroke-width: 1.75;
  --icon-badge-size: 56px;
}

.icon-badge {
  width: var(--icon-badge-size);
  height: var(--icon-badge-size);
  border-radius: 50%;
  background: var(--secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-badge svg {
  width: var(--icon-size);
  height: var(--icon-size);
  color: var(--primary);
  stroke-width: var(--icon-stroke-width);
}
```

```jsx
// Beispiel mit lucide-react
import { Shirt } from "lucide-react";

<div className="icon-badge">
  <Shirt />
</div>
```

**Konsistenzregel:** Innerhalb der App nur Icons aus einem Set verwenden (nicht mischen mit z. B. Font Awesome oder Material Icons) – sonst fallen unterschiedliche Strichstärken/Proportionen sofort auf.

### Lebensmittel-Icons: nur auf Sektions-Ebene, nicht pro Item

**Wichtige Korrektur (nach Praxistest):** Ursprünglich war geplant, jedes einzelne Lebensmittel mit dem Kategorie-Icon zu versehen. In der Umsetzung zeigte sich: Das wiederholt bei 20–90 Items pro Sektion dasselbe Icon x-fach, ohne neue Information zu liefern (die Zugehörigkeit steht ja schon im Sektions-Header). Wirkt unruhig statt aufgeräumt.

**Richtig:**
- **Sektions-Header** (z. B. „🥕 Gemüse", „🍎 Obst", „🥩 Proteine & Allergene") → bekommt **einmalig** das Kategorie-Icon.
- **Einzelne Lebensmittel-Karten in der Liste** (Aubergine, Avocado, Käse, Forelle...) → **kein Icon**. Nur Name + bestehende Status-Elemente (Häkchen-Badge bei „probiert", rotes „!"-Badge bei Altersbeschränkung wie „Ab 12 Mon."). Emojis werden trotzdem vollständig entfernt – hier einfach ersatzlos, nicht durch ein Icon ersetzt.
- **Detail-Ansicht eines geöffneten Lebensmittels** (z. B. „Avocado"-Sheet) → **behält** das Kategorie-Icon oben links, bewusste Ausnahme. Grund: Hier ist es nicht wiederholt (nur 1× beim Öffnen sichtbar, nicht 29× in einer Liste) und dient als visueller Anker für den Screen – dasselbe Prinzip wie das Icon in Rezept- oder Sektions-Headern.

| Sektion | Lucide-Icon (nur im Header) |
|---|---|
| Lebensmittel (übergeordnet) | `LeafyGreen` |
| Gemüse | `Carrot` |
| Obst | `Apple` |
| Getreide/Gluten | `Wheat` |
| Proteine & Allergene | `Fish` |

```jsx
// Sektions-Header – EINZIGE Stelle mit Icon
function FoodSectionHeader({ label, icon: Icon, triedCount, total }) {
  return (
    <div className="food-section-header">
      <Icon size={20} />
      <div>
        <strong>{label}</strong>
        <span>{triedCount}/{total} probiert</span>
      </div>
    </div>
  );
}

// Einzelne Lebensmittel-Karte – KEIN Icon
// Höhe: min-height 64px (nicht 50px!) – deckt die zweizeilige Variante
// (Name + „Ab X Mon."/Reaktions-Notiz) ab. Bei nur einer Zeile zentriert
// align-items:center den Inhalt automatisch, keine separate Höhen-Logik nötig.
// Bug-Fund: 50px war nur die einzeilige Höhe, zweizeilige Karten wuchsen
// darüber hinaus → Karten in derselben Liste wirkten ungleich hoch.
function FoodCard({ name, tried, availableFrom }) {
  return (
    <div className={`food-item-card ${tried ? "tried" : ""}`}>
      <span>{name}</span>
      {availableFrom && <span className="food-warning">Ab {availableFrom} Mon.</span>}
      {tried && <Check size={16} className="food-tried-badge" />}
    </div>
  );
}
```

**Innerhalb von "Proteine & Allergene" bleiben Unterkategorien nur als Ordnungsprinzip bestehen** (Getreide/Gluten, Fleisch, Fisch, Milchprodukte, Ei, Nüsse, Hülsenfrüchte, Süßungsmittel), aber ohne eigenes Icon pro Unterkategorie oder Item – aus demselben Grund wie oben.

### Custom Icon (Ausnahme): Zahn

Lucide hat kein Zahn-Icon (offen als Feature-Request im Lucide-Repo, bislang nicht umgesetzt). Für die **Zahnungskarte** ist ein generisches Ersatz-Icon (`Smile`, `Baby`) zu unspezifisch, deshalb hier die einzige bewusste Ausnahme von der „nur Lucide"-Regel: ein selbst gebautes Icon im identischen Stil (24×24-Grid, `stroke-width: 1.75`, runde Linienenden, `currentColor`), das sich nahtlos einfügt.

```jsx
// components/icons/Tooth.jsx
export function Tooth(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2c-2.2 0-4.1.9-5.3 2.6C5.6 6.2 5.3 8.3 5.7 10.6c.5 2.9 1.4 6.4 2.4 8.9.4 1 1.3 1.7 2.3 1.5.9-.2 1.4-1.1 1.6-2.4l.4-2.6c.1-.7.5-1 .9-1s.8.3.9 1l.4 2.6c.2 1.3.7 2.2 1.6 2.4 1 .2 1.9-.5 2.3-1.5 1-2.5 1.9-6 2.4-8.9.4-2.3.1-4.4-1-6C16.1 2.9 14.2 2 12 2Z" />
    </svg>
  );
}
```

```jsx
// Verwendung wie jedes Lucide-Icon:
import { Tooth } from "@/components/icons/Tooth";

<div className="icon-badge">
  <Tooth />
</div>
```

**Wichtig:** Sollte Lucide künftig ein offizielles `Tooth`-Icon ergänzen, dieses custom SVG durch den Lucide-Import ersetzen und die Ausnahme hier streichen.

### Outfit- & Szenario-Icon-Set (Custom, im Lucide-Stil)

Der "Outfit des Tages"-Bereich und die Szenario-Auswahl (Drinnen/Auto/Trage/Kinderwagen/Boden/Spielplatz/Schlafen) nutzen **eigene, handgezeichnete SVGs** statt echter Lucide-Imports – weil Lucide für die meisten dieser Motive (Windel, Body, Strampler, Fußsack, Tragehilfe, Kinderwagen etc.) schlicht keine Icons hat. **Wichtig:** Das ist keine Ausnahme mehr von der Farb-/Stil-Regel, sondern folgt ihr vollständig – nur eben mit selbst gezeichneten statt importierten Pfaden.

**Verbindliche Parameter (identisch zu allen Lucide-Icons im Guide):**
- `viewBox="0 0 24 24"`
- `stroke="currentColor"`, `fill="none"` (Ausnahme: winzige Punkte/Kreise für Knöpfe o. Ä. dürfen `fill="currentColor"` nutzen)
- `stroke-width="1.75"`, `stroke-linecap="round"`, `stroke-linejoin="round"`
- Farbe wird ausschließlich über den umgebenden Container gesetzt (`color: var(--color-primary)` auf `.outfit-tile` / `.scenario-btn`), nicht im SVG selbst
- **Keine** hartkodierten Hex-Werte, keine Fill-Farben pro Icon mehr

**Betroffene Objekte im Code:**
- `OI` (27 Kleidungs-/Zubehör-Icons): `diaper`, `bodyShort`, `bodyLong`, `pants`, `romper`, `shirt`, `pullover`, `cardigan`, `jacket`, `overall`, `socks`, `shoes`, `hat`, `sunhat`, `mittens`, `bunting`, `lambskin`, `blanket`, `footmuff`, `carrier`, `rainpants`, `umbrella`, `sleepsuit`, `sleepbag`, `sunscreen`, `scarf`, `legwarmers`
- `SCENARIOS` (7 Szenario-Icons): `drinnen`, `auto`, `trage`, `kinderwagen`, `boden`, `spielplatz`, `schlafen`

**Regel für neue Icons in diesem Set:** Kein Emoji, kein Font-Icon, kein Fremd-Stil ergänzen – neue Motive nach denselben Parametern oben von Hand nachzeichnen, damit das Set in sich konsistent bleibt. Falls Lucide später eines der fehlenden Motive nachliefert, kann das custom SVG 1:1 durch den echten Import ersetzt werden (gleiche Größe/Farbe, da beide dieselben Parameter nutzen).

### Rezept-Icons: Kategorie nach Zubereitungsart

Gleiches Prinzip wie bei den Lebensmitteln, andere Achse: Rezepte werden nicht nach Zutat, sondern nach **Zubereitungsart** gruppiert – auch hier ersetzt der Kategorie-Icon die bisherigen Emojis (🍎🥣🥞🍞).

| Kategorie | Beispiele | Lucide-Icon |
|---|---|---|
| Backen | Bällchen, Riegel, Ofen-Nuggets | `Croissant` |
| Pfanne/Herd | Pancakes, Waffeln, Puffer, Nudeln, Brei (im Topf) | `UtensilsCrossed` |
| Kein Kochen | Salat, Dips, Rohkost | `Salad` |

**Korrektur:** War ursprünglich `Flame`. Es gibt in Lucide kein eigenes Pfannen-/Herd-Icon; `Flame` war inhaltlich naheliegend ("Hitze"), passte aber mit seiner kantigen Form nicht zur runden Formensprache des restlichen Guides. `UtensilsCrossed` fügt sich optisch besser ein – dafür etwas weniger spezifisch "Herd", eher "Kochen/Essen" allgemein. Bewusster Trade-off, keine Fehlkorrektur.

```jsx
import { Croissant, UtensilsCrossed, Salad } from "lucide-react";

const recipeCategoryIcons = {
  baking: Croissant,
  stovetop: UtensilsCrossed,
  noCook: Salad,
};

function RecipeCard({ title, duration, category }) {
  const Icon = recipeCategoryIcons[category];
  return (
    <div className="section-card recipe-card">
      <div className="icon-badge">
        <Icon />
      </div>
      <div>
        <strong>{title}</strong>
        <span className="recipe-meta">{duration}</span>
      </div>
    </div>
  );
}
```

### Globale Navigations- & Sektions-Icons

Vollständiges, gegen die Lucide-Bibliothek geprüftes Mapping für die gesamte App (ersetzt alle verbleibenden Emojis in Bottom-Nav, Beikost-Kategorien und globaler Navigation). Eine Korrektur gegenüber der ursprünglichen Liste: `balloon` existiert nicht in Lucide, dafür `Clover`.

| Bereich | Emoji (alt) | Lucide-Icon |
|---|---|---|
| Home (Bottom-Nav) | 🏠 | `HouseHeart` |
| Schlaf (Bottom-Nav) | 🌙 | `Moon` |
| Beikost (Bottom-Nav) | 🥄 | `CookingPot` |
| Entwicklung (Bottom-Nav) | – | `Leaf` |
| Mehr (Bottom-Nav) | ☰ | `Menu` |
| Events (Mehr-Liste) | ✨ | `Sparkles` |
| Lebensmittel-Übersicht | 🧺 | `LeafyGreen` |
| Gemüse | 🥦 | `Carrot` |
| Obst | 🍎 | `Apple` |
| Getreide | 🌾 | `Wheat` |
| Proteine & Allergene | 🥩 | `Fish` |
| Brei-Ansatz | 🥣 | `Soup` |
| Baby-Led-Weaning | ✋ | `Broccoli` |
| Rezepte | 🍽️ | `ChefHat` |
| Suchen | 🔎 | `Search` |
| Outfit Guide | 👗 | `Shirt` |
| Sprünge (Entwicklungssprünge) | 🌊 | `Clover` |
| Meilensteine | ✅ | `Sprout` |
| Aktivitäten & Lieder | 🎵 | `Music` |
| Zahnungskarte | 🦷 | Custom `Tooth` (siehe Ausnahme oben) |
| Notizen | 📝 | `BookHeart` |
| Profil | 👤 | `Baby` |
| Einstellungen | ⚙️ | `Settings` |

**Emojis, die keine feste Zuordnung haben** (z. B. 😬, 💡 bei Brei-Ansatz/Baby-Led-Weaning-Hinweistexten): ersatzlos entfernen, kein Icon-Ersatz nötig – reiner Fließtext an diesen Stellen.

Dasselbe Icon-Mapping gilt auch für Sektions-Header mit Icon-Präfix – dort in Fließtext-Icongröße (`.icon-inline`, ~19px statt der 24px-Badge-Größe).

**Labels unter den Bottom-Nav-Icons bleiben bestehen** (bewusste Entscheidung, kein Icon-only-Design). Einige Icons sind eher assoziativ als selbsterklärend (`Clover` für die Entwicklungssprünge, `Soup` vs. `CookingPot` für Brei-Ansatz vs. Beikost) – ohne Text wären diese nicht zuverlässig erkennbar, gerade für Eltern in Schnellnutzung/Müdigkeit.

Aktiver Tab: Icon + Label in `var(--primary)`, inaktiv in `var(--muted-foreground)`. Label des aktiven Tabs ist **fett** (`font-weight: 600`), inaktive bleiben bei `400`. Zusätzlich bekommt das aktive Icon eine **Active-Indicator-Pille** (siehe unten) – Farbe *und* eigener Hintergrund ändern sich gemeinsam.

### Bottom-Nav: finale Maße (nach mehreren Korrekturrunden)

**Wichtig:** Diese Werte sind das Ergebnis mehrfacher Fehlkorrekturen (zu klein, zu groß, zu viel Weißraum) – nicht mehr verändern, ohne den Grund zu kennen:

| Wert | Finale Größe | Hinweis |
|---|---|---|
| `--nav-h` | `50px` | War zwischenzeitlich fälschlich `46px` (zu klein) und `72px` (zu groß/viel Weißraum) |
| Icon-Größe | `22px` | App-Standard sonst 24px – hier bewusst 1 Stufe kleiner für die kompakte Pille |
| Icon-Stroke | `var(--icon-stroke-width)` (1.75) | **Kein** Sonderwert für die Nav – war zwischenzeitlich testweise auf 2.1/2.6 erhöht, das war der falsche Hebel (Problem war Weißraum, nicht Strichstärke) |
| Nav-Hintergrund | `oklch(0.985 0.008 60 / .96)` | Warmes Creme (wie Header), **nicht** reines Weiß – reines Weiß wirkte als Fremdkörper gegen den Rest der App |
| `padding-bottom` | `max(calc(env(safe-area-inset-bottom) - 16px), 6px)` | Per Debug-Rahmen bestätigt: Die Leerfläche unter den Labels liegt *innerhalb* der Nav-Box und ist die komplette Safe-Area (~34pt auf Face-ID-iPhones). Der Home-Indikator selbst belegt aber nur die untersten ~13pt, deshalb 16px Abzug; 6px Untergrenze für Geräte/Modi ohne Safe-Area. **Stellschraube:** löst ein Wisch von unten versehentlich einen Tab aus, den Abzug verkleinern. Kein zusätzliches `var(--space-2)` obendrauf (war doppelt gemoppelt) |

### Active-Indicator-Pille

Jedes Nav-Icon sitzt in derselben Pillen-Box (Padding, Radius) – **nur der Hintergrund wechselt** zwischen transparent (inaktiv) und `var(--secondary)` (aktiv). Nie unterschiedliche Padding-Werte zwischen aktiv/inaktiv verwenden, sonst verschiebt sich Icon und Label beim Tab-Wechsel (derselbe Bug wie beim Szenario-Chip-Rahmen in Abschnitt 6).

**Farb-Token bewusst identisch zu den Mehr-Listen-Icons** (`.mehr-icon` nutzt ebenfalls `var(--secondary)`, dort als abgerundetes Quadrat statt Pille) – unterschiedliche Form ist ok (unterschiedliche Rolle: Tab-Indikator vs. Listen-Icon-Avatar), aber derselbe Farb-Token, keine eigene Alpha-Berechnung.

```css
.nb {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  flex: 1;
  padding: 4px 0;
  color: var(--muted-foreground);
}

.nb.on { color: var(--primary); }
.nb.on .nl { font-weight: 600; }

/* Pille: identische Box bei jedem Icon, nur background wechselt */
.nb .ni {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 999px;
  background: transparent;
  box-sizing: border-box;
  transition: background var(--transition-soft);
}

.nb.on .ni { background: var(--secondary); }
.nb .ni .icon { width: 22px; height: 22px; }
.nb .nl { font-size: 10px; font-weight: 400; }
```

---

## 5. Verläufe

- `--gradient-hero`: Hintergrund-Gradient der Hero-Section (Blush + Warm + Lavendel-Leuchten)
- `--gradient-primary`: Primärer Text-Gradient (Lavendel → Glow)
- `--gradient-soft`: Weiche Karten/Section-Hintergründe
- `--gradient-warm`: Warme Section-Hintergründe

```css
:root {
  --gradient-hero: linear-gradient(135deg, var(--blossom), var(--warm), var(--primary-glow));
  --gradient-primary: linear-gradient(90deg, var(--primary), var(--primary-glow));
  --gradient-soft: linear-gradient(180deg, var(--secondary), var(--background));
  --gradient-warm: linear-gradient(180deg, var(--warm), var(--background));
}
```

---

## 6. Layout & Abstände (8px-Grid)

Alle Außen- und Innenabstände auf **8, 16, 24 oder 32px** normieren (Viertelungen nur bei bewusster Ausnahme).

| Token | Wert |
|-------|------|
| `space-1` | 8px |
| `space-2` | 16px |
| `space-3` | 24px |
| `space-4` | 32px |

```css
:root {
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
}
```

### Symmetrisches Padding (bisher nicht definiert – Nachtrag)

**Bug-Fund:** `.prep-sheet-inner` (Rezept-/Lebensmittel-Detail-Sheet) hatte oben `--space-2` (16px), an Seiten/unten aber `--space-3` (24px) – reines Versehen, da die Grid-Werte selbst zwar definiert waren, aber nie die Regel, dass sie **innerhalb eines Containers einheitlich** sein müssen. Behoben auf `padding: var(--space-3)` rundum.

**Regel:** Innenabstand einer Card/eines Sheets/eines Containers ist auf allen vier Seiten **derselbe Space-Wert**, nie gemischt (z. B. nicht `var(--space-2) var(--space-3) var(--space-3)`). Eine Ausnahme braucht einen expliziten Grund (z. B. ein Drag-Handle, das eigenen Abstand braucht) und wird dann als eigener, benannter Wert dokumentiert – nicht als stillschweigende Abweichung.

**Zweiter Fund derselben Art:** `.modal-box` (allgemeines Bottom-Sheet-Modal) hatte oben `--space-3` (24px), Seiten `--space-2` (16px), unten hartkodiert `40px` ohne Safe-Area-Bezug. Behoben auf einheitlich `var(--space-3)` für oben/Seiten, unten bewusst großzügiger mit `calc(var(--space-4) + env(safe-area-inset-bottom, 0px))` – das ist eine begründete Ausnahme (Daumen-Erreichbarkeit + Home-Indicator auf iPhones ohne Safe-Area), deshalb als Sonderwert mit `--space-4`-Basis statt als Magic Number.

### Abstand Header → erster Content-Block (bisher nicht definiert – Nachtrag)

Der sticky Header (`#hdr`) hat eigenes `padding-bottom`, das ist aber der Innenabstand *im* Header, nicht der Abstand *zum* nachfolgenden Content. Der tatsächliche Abstand zur ersten Card entsteht ausschließlich durch `#cnt-inner`'s `padding-top`. Bisher war nie festgelegt, ob das reicht.

**Regel:** Abstand von der Unterkante des Headers bis zur ersten Card = `var(--space-2)` (16px), identisch zum Abstand zwischen zwei Cards untereinander (`.card { margin-bottom: var(--space-2) }`) – bewusst **kein** größerer Sonderwert für den ersten Abstand, damit der Rhythmus durchgängig gleich bleibt. Falls sich das nach diesem Fix immer noch zu eng anfühlt, ist der nächste Schritt, `#cnt-inner`'s `padding-top` gezielt auf `var(--space-3)` zu erhöhen – dann aber explizit als bewusste Ausnahme vom sonstigen `var(--space-2)`-Rhythmus dokumentieren, nicht standardmäßig setzen.

### Feste Höhe für bedingt sichtbare Zeilen (bisher nicht definiert – Nachtrag)

**Bug-Fund:** Die Regen-Zeile in den Wetter-Timeline-Chips (`.wtl-rain`) wird nur gerendert, wenn `rain >= 10`. Reserviertes `min-height` war mit 13px knapp kleiner als das enthaltene Icon (14px) – das Icon hat die Zeile über ihr Minimum hinausgedrückt, sobald Regen angezeigt wurde. Ergebnis: Chip-Höhe sprang zwischen Slots mit/ohne Regenanzeige.

**Regel:** Zeilen/Bereiche, die je nach Daten leer oder gefüllt sein können (z. B. „nur bei Regen", „nur bei Warnung"), bekommen eine **feste `height`** (nicht `min-height`), die groß genug für den größten enthaltenen Inhalt (meist ein Icon) ist, plus `display: flex; align-items: center` zur Zentrierung. So bleibt die Zeile immer exakt gleich hoch, unabhängig vom Inhalt.

### Kein Layout-Sprung durch Border-Toggle (bisher nicht definiert – Nachtrag)

**Bug-Fund:** `.scenario-btn` hatte im Ruhezustand `border: none`, im aktiven Zustand `border: 1.5px solid`. Das Umschalten von "kein Rahmen" auf "Rahmen" verändert die Box beim Klick sichtbar, selbst mit `box-sizing: border-box` – die Chip-Breite "sprang".

**Regel:** Elemente, die einen Rahmen nur in einem bestimmten Zustand (aktiv/ausgewählt/Fehler) zeigen, bekommen **immer** einen Rahmen derselben Breite – im Ruhezustand `border: [Breite] solid transparent`, im aktiven Zustand ändert sich nur `border-color`. Nie `border: none` → `border: Xpx solid` als Zustandswechsel verwenden.

### Einheitliche Breite bei Chip-Reihen mit unterschiedlich langen Labels (bisher nicht definiert – Nachtrag)

**Bug-Fund:** Die Szenario-Chips (Drinnen, Auto, Trage, Kinderwagen, Boden, Spielplatz, Schlafen) hatten `min-width`, keine feste `width` – dadurch ist jeder Chip nur so breit wie sein eigenes Label plus Icon. „Kinderwagen" (11 Zeichen) ist entsprechend deutlich breiter als „Auto" (4 Zeichen), die Reihe wirkt uneinheitlich/zackig.

**Regel:** Chips in derselben horizontalen Reihe mit unterschiedlich langen Labels bekommen eine **einheitliche feste `width`**, bemessen am längsten vorkommenden Label (nicht `min-width`, das lässt kürzere Labels schrumpfen). Als Sicherheitsnetz gegen künftig noch längere Labels: `white-space: nowrap; overflow: hidden; text-overflow: ellipsis` auf dem Label-Text, damit ein zu langes Label sauber abschneidet statt den Chip zu sprengen oder umzubrechen.

```css
.scenario-btn { width: 88px; /* statt min-width */ }
.scenario-btn span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
```

### Horizontales Scrollen: Scroll-Snap (bisher nicht definiert – Nachtrag)

**Bug-Fund:** Horizontal scrollbare Chip-Leisten (Szenario-Auswahl, Wetter-Timeline) hatten `overflow-x: auto`, aber kein Scroll-Snapping. Dadurch konnte die Leiste an jeder beliebigen Zwischenposition stehen bleiben – einzelne Chips wirkten beim Scrollen "reingeschoben" statt sauber einzurasten. Zusätzlich fehlte durchgängig `padding-right` (nur `padding-left` gesetzt), wodurch der letzte Chip bündig am Rand klebte.

**Regel für jede horizontal scrollbare Chip-/Kartenleiste:**
```css
.scroll-strip-outer {
  overflow-x: auto;
  scroll-snap-type: x proximity;
  padding-left: var(--space-2);
  padding-right: var(--space-2); /* symmetrisch, nicht vergessen */
  /* PFLICHT bei Scroll-Snap: sonst rastet das erste Element bündig am Rand ein und
     das Padding links ist optisch weg (Bug-Fund Outfit Guide: Chips klebten am Kartenrand) */
  scroll-padding-left: var(--space-2);
  scroll-padding-right: var(--space-2);
  scrollbar-width: none; /* Scrollbar ausblenden, wirkt sonst unruhig */
}
.scroll-strip-outer::-webkit-scrollbar { display: none; }

.scroll-strip-item {
  scroll-snap-align: start;
  flex-shrink: 0;
}
```
Betrifft aktuell: `.scenario-strip-outer`/`.scenario-btn` und `.weather-tl-outer`/`.wtl-slot`. Bei neuen horizontal scrollbaren Leisten dasselbe Muster übernehmen.

### Cards (Sektionen)

Jede Sektion liegt in einer Card mit `rounded-xl` (`calc(--radius + 4px)`) und `--shadow-soft`.

```css
.section-card {
  background: var(--secondary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-soft);
  padding: var(--space-3);
}
```

### Eingabe + Icon-Button (z. B. „Eigenes Lebensmittel hinzufügen")

**Korrektur:** War vorhin fälschlich auf 50px gesetzt – das ist die Mindesthöhe für **CTA-Buttons** (Abschnitt 8), nicht für kompakte Inline-Controls neben einem Textfeld. Ein 50×50px-Kreis-Button neben einem einzeiligen Input wirkt dadurch zu wuchtig. Richtig proportioniert: Input und Icon-Button teilen sich **44px** – das ist die kleinste sinnvolle Touch-Target-Größe (Apple-HIG-Minimum), passt optisch zu einem einzeiligen Textfeld und bleibt trotzdem gut antippbar.

```css
.input-with-action {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.input-with-action input {
  flex: 1;
  height: 44px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 0 var(--space-2);
  font-family: var(--font-body);
  font-size: 15px;
  background: #fff;
}

.icon-button-round {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--primary);
  color: var(--primary-foreground);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  flex-shrink: 0;
}

.icon-button-round svg {
  width: 20px;
  height: 20px;
}
```

**Faustregel zur Abgrenzung:** 50px+ = eigenständiger CTA-Button (etwas, das man bewusst als Haupt-Aktion drückt, z. B. „Speichern", „Als gekocht markieren"). 44px = Begleit-Control neben einem anderen Element (Icon-Button neben Input, Icon-Button in einer Toolbar). Nie einen 50px-Button direkt neben ein Standard-Textfeld setzen – das Größenverhältnis kippt sonst ins Unproportionierte.

### Content-Karten mit linkem Farbrand (Notizen, Events)

Der linke Farbrand + getönter Hintergrund bleibt das Muster für **dauerhafte Inhalte** – signalisiert „das hier ist ein Datensatz, der bleibt". Toast-Meldungen bekommen dagegen ein eigenes, bewusst leichteres Bauteil (siehe unten).

### Toast/Bestätigung – überarbeitet: schwebend statt Vollbreite-Banner

**Warum die bisherige Version trotz korrigierter Farben nicht überzeugt hat:** Sie war als **Vollbreite-Block im normalen Seitenfluss** gerendert – nimmt also Platz weg wie ein echter Inhalt und schiebt alles darunter nach unten. Das macht sie automatisch „schwer", ganz unabhängig von Rand oder Farbe. Ein Toast sollte **schweben**, kompakt sein und **von selbst wieder verschwinden**, ohne das Layout zu verschieben.

```css
.toast-success {
  position: fixed;
  left: 50%;
  bottom: calc(84px + env(safe-area-inset-bottom, 0px)); /* über der Bottom-Nav */
  transform: translateX(-50%) translateY(0);
  display: flex;
  align-items: center;
  gap: 10px;
  width: calc(100vw - 48px); /* breiter statt nur content-breit */
  max-width: 420px;
  background: #fff;
  color: var(--foreground);
  border-radius: 999px; /* Pill, nicht Card */
  padding: 14px 20px;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: var(--shadow-lift);
  z-index: 700;
  animation: toastIn var(--transition-soft), toastOut 240ms ease 2.4s forwards;
}

.toast-success .icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary);
  color: var(--primary-foreground);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.toast-success .icon svg { width: 13px; height: 13px; }

@keyframes toastIn {
  from { opacity: 0; transform: translateX(-50%) translateY(10px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}
@keyframes toastOut {
  to { opacity: 0; transform: translateX(-50%) translateY(10px); }
}
```

```jsx
import { Check } from "lucide-react";

function ToastSuccess({ message }) {
  return (
    <div className="toast-success" role="status">
      <span className="icon"><Check /></span>
      <span>{message}</span>
    </div>
  );
}
```

Wichtig: Nach **2,6 Sekunden automatisch ausblenden** (in der Animation oben eingebaut, `toastOut` startet bei 2.4s) und per JS nach Ablauf aus dem DOM entfernen – kein Klick zum Wegklicken nötig, kein Platz, der dauerhaft belegt bleibt.

### Event-Kacheln – überarbeitet

Bisher: dünner Rahmen + Verlaufs-Hintergrund + linker Balken – wirkt zusammen unruhig und etwas altbacken (Rahmen *und* Verlauf *und* Balken ist eine Ebene zu viel). Reduziert auf das, was der Rest des Guides an anderer Stelle schon konsequent nutzt: **Icon-Badge + Schatten statt Rahmen**. *(Seit 2.1: kein linker Balken mehr, siehe „Karten ohne Akzentlinie“. Events sind entfernt.)*

```css
.event-tile {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: var(--secondary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft); /* ersetzt den dünnen Rahmen */
  padding: var(--space-2);
}

.event-tile-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--primary);
}

.event-tile-title {
  font-weight: 600;
  color: var(--foreground);
  font-size: 0.9375rem;
}

.event-tile-meta {
  font-size: 0.8125rem;
  color: var(--muted-foreground);
}
```

```jsx
function EventTile({ icon: Icon, title, meta }) {
  return (
    <div className="event-tile">
      <div className="event-tile-icon"><Icon size={18} /></div>
      <div>
        <div className="event-tile-title">{title}</div>
        <div className="event-tile-meta">{meta}</div>
      </div>
    </div>
  );
}
```

**Faustregel:** linker Farbrand + Schatten = bleibt (Notiz, Event) · schwebende Pill mit Check-Icon = geht nach 2,6s wieder weg (Toast, Bestätigung). Bestehende Erfolgsmeldung („Apfel wurde hinzugefügt") auf `.toast-success` umstellen, Event-Kacheln auf `.event-tile`.

### Rezeptkarten: Detail-Ansicht & Status

**Status ("probiert") nicht mehr über Card-weite Farbtönung signalisieren.** Bei vielen Rezepten in einer Liste wirkt das schnell bunt/unruhig, weil jede Karte potenziell anders eingefärbt ist. Stattdessen: neutrale Card für alle Zustände, Status nur über ein kleines Checkmark-Badge neben der Dauer.

```css
.recipe-status {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--muted-foreground);
  font-size: 0.875rem;
}

.recipe-status.tried {
  color: var(--primary);
}
```

```jsx
import { Check } from "lucide-react";

function RecipeMeta({ duration, tried }) {
  return (
    <span className={`recipe-status ${tried ? "tried" : ""}`}>
      {duration}
      {tried && <><Check size={14} /> probiert</>}
    </span>
  );
}
```

**Zutaten-Liste: ein einheitlicher Punkt-Ton, unabhängig vom Rezept.** Kein Grün in einem Rezept, Rosa im nächsten – ein fester, neutraler Farbwert für alle Aufzählungspunkte in Zutaten-Listen.

```css
.ingredient-list {
  list-style: none;
  padding: 0;
}

.ingredient-list li {
  display: flex;
  align-items: baseline;
  gap: var(--space-1);
  padding: 4px 0; /* Mikro-Abstand; keine Bruchteile von Tokens (war calc(space-1*0.75)) */
}

.ingredient-list li::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--muted-foreground);
  flex-shrink: 0;
  transform: translateY(-2px);
}
```

**Abschnitts-Label ("ZUTATEN", "ZUBEREITUNG", "TIPPS & VARIANTEN"):** kleine Caps, `var(--muted-foreground)`, statt der bisherigen grünen Label-Farbe – konsistent mit der restlichen Palette.

```css
.recipe-section-label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--muted-foreground);
  margin-top: var(--space-3);   /* trennt klar vom vorigen Abschnitt */
  margin-bottom: var(--space-1); /* Label gehört enger zu SEINEM Inhalt */
}
.recipe-section-label:first-child { margin-top: 0; }
```

**Tipps & Varianten:** kompakte Tipp-Fläche (Verlauf Lila→Rosé, seit 2.1 ohne Rand links) statt Vollflächen-Blossom, und **nie größere Schrift als der Fließtext** (13px wie Zutaten/Zubereitung). Hintergrund: Die erste Fassung (Blossom-Fläche, 15px) wirkte prominenter als der eigentliche Rezepttext.

```css
.recipe-tip {
  background: linear-gradient(135deg, oklch(0.95 0.025 300), oklch(0.965 0.02 355));
  color: var(--color-text-body);
  border-radius: var(--radius-md);
  padding: var(--space-1) var(--space-2);
  font-size: 13px;                        /* identisch zu Zutaten/Zubereitung */
  line-height: 1.45;
  margin-bottom: var(--space-1);
}
```

---

## 7. Safe Area (PWA / Standalone Mode)

Bottom-Nav braucht ausreichend Abstand zum unteren Displayrand (Notch/Home Indicator, moderne iPhones) – besonders wichtig im PWA-Standalone-Modus.

```css
#nav {
  /* Safe-Area für den Home-Indikator, aber nicht die vollen ~34pt – Begründung in Abschnitt 4 */
  padding-bottom: max(calc(env(safe-area-inset-bottom, 0px) - 16px), 6px);
}
```

Zusätzlich im `<head>` nicht vergessen:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
```

---

## 8. Interaktive Elemente

### Buttons

- **Mindesthöhe:** `50px` (Daumen-tauglich, Touch-Target-Standard)
- **Border Radius:** konsistent mit dem Soft-Look, `rounded-xl`

```css
.btn {
  min-height: 50px;
  border-radius: var(--radius-xl);
  background: var(--primary);
  color: var(--primary-foreground);
  transition: var(--transition-soft);
}

.btn:hover {
  background: var(--primary-glow);
  box-shadow: var(--shadow-lift);
}
```

### Zurück-Button (Navigation) — eigener, zurückhaltender Stil

**Korrektur:** Aktuell als voll gefüllte violette Pill umgesetzt – zu präsent. Eine reine Zurück-Navigation ist die am wenigsten wichtige Aktion auf dem Screen und sollte entsprechend leicht wirken, nicht wie ein CTA (`.btn`) mit vollflächigem Primary-Hintergrund. Ghost-Stil statt Fill: nur Icon + Text in `var(--primary)`, kein Hintergrund im Ruhezustand.

```css
.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 36px;
  padding: 0 var(--space-1);
  background: transparent;
  color: var(--primary);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.9375rem;
}

.btn-back:active {
  background: var(--secondary); /* nur beim Antippen ein dezenter Hintergrund */
}

.btn-back svg {
  width: 18px;
  height: 18px;
}
```

```jsx
import { ChevronLeft } from "lucide-react";

function BackButton({ label = "Zurück", onClick }) {
  return (
    <button className="btn-back" onClick={onClick}>
      <ChevronLeft />
      {label}
    </button>
  );
}
```

Zum Vergleich: `.btn` (CTA, 50px, gefüllt) vs. `.btn-back` (Navigation, 36px, ohne Füllung) – unterschiedliche Bauteile für unterschiedliches Gewicht, nicht dieselbe Komponente in Klein.

### Mobile Regeln: Button-Textlänge & Abstände

- Primäre Buttons: **max. 22 Zeichen** sichtbar.
- Sekundäre/kleine Buttons: **max. 18 Zeichen** sichtbar.
- Button-Zeilen auf Mobile mit **8px Abstand** und `wrap`, damit nichts überläuft.

```css
:root {
  --btn-text-max-primary: 22ch;
  --btn-text-max-secondary: 18ch;
  --btn-gap-mobile: var(--space-1);
}

@media (max-width: 640px) {
  .btn,
  .btn-sm {
    max-inline-size: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .btn { max-width: var(--btn-text-max-primary); }
  .btn-sm { max-width: var(--btn-text-max-secondary); }

  .button-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--btn-gap-mobile);
  }
}
```

### Klick-Feedback

1. **Visuell:** kurzer **Scale-Down um 2%** (aktiver Zustand).
2. **Haptik:** `navigator.vibrate(10)` — nur wenn verfügbar und sinnvoll (Mobile; Feature-Detection).

```css
.btn:active {
  transform: scale(0.98);
  transition: transform var(--transition-soft);
}
```

```javascript
function onTapFeedback() {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(10);
  }
}
```

### Transitions

Einheitlich `var(--transition-soft)` (320ms, siehe Abschnitt 3) für Tab-Wechsel, Header-Animationen und überall dort, wo sich Bewegung/Opacity/Größe ändert.

```css
.tab-panel,
.app-header {
  transition: opacity var(--transition-soft), transform var(--transition-soft);
}
```

---

## 9. Header — „The Control Center“

### Glassmorphism

- `backdrop-filter: blur(10px)`
- Leicht transparenter Hintergrund auf Basis von `--background` (`#faf8f5`).

```css
.app-header {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background: oklch(0.985 0.008 60 / 0.72);
}
```

### Dynamisches Verhalten beim Scrollen

- Header **schrumpft flüssig** (Transition `var(--transition-soft)`).
- **Profilbild:** von **60px** auf **0px** (oder nahezu unsichtbar / ausgeblendet).
- **Name:** bewegt sich **nach links oben** in die kompakte Kopfzeile (Layout mit `transform` / Flex oder fester kompakter Zeile).

Orientierungswerte (Implementierung frameworkabhängig):

| Zustand | Profil (Breite/Höhe) | Name-Position |
|---------|----------------------|---------------|
| Expanded | 60px | zentriert / unter Bild |
| Collapsed | 0 (hidden) | links oben, kleinere Schrift |

### Zustände & Atmosphäre

- Header-Hintergrund (oder darunterliegender Gradient) spiegelt **Tageszeit** oder **Status** wider — **sanfter Gradient**, keine harten Farbwechsel.
- Beispiel-Idee: morgens `--gradient-warm`, abends gedämpfterer Lavendel-Anteil (`--primary-glow`) — immer im Einklang mit der Primary/Background-Palette aus Abschnitt 1.

## 10. Screens & Komponenten (Stand: abgeglichen mit dem Code)

### Header
- **Avatar + Name sind ein gemeinsames Tap-Ziel** und führen zu „Profil & Messungen“. Einstellungen stehen **nicht** im Header (erreichbar über Mehr → Einstellungen); die rechte Seite bleibt bewusst leer.
- **Foto ändern** lebt auf der Profil-Seite: `.profile-avatar` (84px Kreis, Foto oder Platzhalter) mit Kamera-Badge (28px, `var(--color-primary)`, unten rechts). `applyAvatar()` aktualisiert alle `.av-img`/`.av-em`, Header und Profil bleiben synchron.
- **Scroll-Kollaps ohne Ruckeln:** Prüfung per `requestAnimationFrame` gedrosselt, mit **Hysterese** – einklappen ab > 44px, erst bei < 24px wieder ausklappen. Ein einzelner Schwellwert ließ die Klasse bei Pendelbewegungen flattern und unterbrach die Transition.

### Outfit Guide
- **Aufbau:** Die Wetter-Karte (Ort, UV-Badge, Suche, Timeline) bleibt eigenständig. **Szenario und Outfit sind eine gemeinsame Karte** (`.outfit-combo`): Szenario-Chips → Trennlinie mit Pfeil (`.outfit-combo-divider`) → „Outfit · {Szenario}“ → Hinweise → Kleidungsraster. Grund: Beides bedingt sich gegenseitig, zwei getrennte Karten wirkten unabhängig.
- **Live-Update:** Beim Szenario-Wechsel aktualisieren sich Titel (`#outfit-title`), Hinweise (`#outfit-tips-wrap`) und Raster – ohne die Chip-Reihe neu zu rendern, damit deren Scroll-Position bleibt. Alles, was vom Szenario abhängt, muss in diesem Update mitlaufen (Bug-Fund: Titel stand immer auf „Drinnen“).
- **Wichtiges prominent:** Informationen, die man nicht übersehen darf, bekommen `.outfit-alert` (Amber-Fläche, 36px Icon-Kreis, Titel 15px/700) **und** eine Kachel mit `warn: true` – nie nur ein Zusatz im Label einer Kachel (Beispiel: Regenschutz am Kinderwagen ab > 40 % Regenwahrscheinlichkeit, Hinweis auf Luftzufuhr).
- **UV-Regeln:** Sonnenhut ab UV 3; **zusätzlich UV-Shirt (LSF 50+) ab UV 6** bei Trage, Kinderwagen, Boden und Spielplatz (ein Hut schützt nur den Kopf).
- **Standort:** Der Pin-Button ruft `resetOutfitLocation()` auf (löscht Standort- und Wetter-Cache, fragt neu ab). Der Ortsname kommt per Reverse-Geocoding über Nominatim/OpenStreetMap (Open-Meteo bietet das nicht): zuerst Platzhalter „Aktueller Standort“, danach der echte Name; bei Fehler/Timeout bleibt der Platzhalter.
- **Chip-Reihen:** erster Chip auf derselben Kante wie Überschrift und Eingabefeld (16px) – setzt `scroll-padding` voraus (Abschnitt 6).

### Zahnungskarte
- **Segmented Control** (`.tooth-segmented`): „Zahnt gerade“ (aktiv: `--warm`) und „Zahn ist da“ (aktiv: `--primary`). Jedes Segment hat **auch inaktiv eine eigene helle Fläche** (`var(--card)` + `--shadow-soft`), sonst verschmelzen beide und die Zweiteilung ist nicht erkennbar.
- Das **Datumsfeld erscheint nur bei „Zahn ist da“**; Speichern als 44px-Icon-Button mit Häkchen neben dem Feld (Muster aus Abschnitt 6).
- **Zurücksetzen** ist ein kleiner roter Text-Link unten rechts (`.tooth-reset-link`) und nur sichtbar, wenn etwas gesetzt ist – seltene Aktion, geringes Gewicht.
- Native Datumsfelder: `-webkit-appearance: none; max-width: 100%` (iOS ignoriert sonst `width: 100%`).

### Lebensmittel-Detail-Sheet
- Mindesthöhe `62vh` gilt **nur für Einträge mit Zubereitungs-Guide**. Ohne Guide-Daten (selbst hinzugefügte Lebensmittel) bekommt das Sheet `.compact` (`min-height: 0`), sonst entsteht viel Leerraum unter dem kurzen Hinweis.
- **Stabilität:** Zustandsabhängige Elemente dürfen die Sheet-Höhe nicht springen lassen. Das Status-Badge liegt neben dem 56px-Icon (Textspalte bleibt niedriger als das Icon), „Reaktion“ öffnet ein eigenes Modal statt inline aufzuklappen.
- Lebensmittel-Karten in der Liste: einheitlich `min-height: 64px` (deckt die zweizeilige Variante mit Hinweis ab).

### Navigation (Tab-Struktur)
- **Bottom-Nav:** Home · Schlaf · Beikost · Entwicklung · Mehr. **Events/Termine/Kalender sind seit 1.8 entfernt** (fest eingebaute Regionaltermine waren für eine breite Nutzerbasis ungeeignet). Die Spielideen (`IDEAS`, Bewertung über `rankEv`) stehen als Karte „Ideen für heute“ auf der Unterseite „Spielideen & Lieder“ (`activities`). Neu im Mehr-Menü: **Datensicherung** (`backup`).
- Aktionen innerhalb der Events-Unterseite zeichnen diese per `refreshEvents()` neu – **nicht** per `go(<Tab>)`, das würde auf einen anderen Tab springen. Beim Umbau war genau das der Stolperstein: Events hatten vier `go(3)`-Aufrufe aus der Zeit, als Events noch Tab 4 waren.

### Entwicklung (Entwicklungssprünge & Meilensteine)
- **„Entwicklung“ ist ein Haupt-Tab** der Bottom-Nav (Position 4, Icon `Leaf`); darin ein Umschalter im Muster des Beikost-Umschalters mit „Sprünge“ (`Clover`; Seitentitel „Alle 10 Entwicklungssprünge“) und „Meilensteine“ (`Sprout`). Als Tab hat die Seite keinen Zurück-Button.
- **Datenmodell:** `MILESTONES[woche] = { context, items: [{ text, cat, tip }] }` mit `cat` ∈ `motorik | sprache | sozial | kognitiv`. Pillen-Farben: Motorik `--secondary`/Primary-Text, Sprache `--blossom`, Sozial-emotional `--warm`, Kognitiv `--accent`.
- **Der Index ist die Identität.** Häkchen werden als `"{woche}-{index}"` gespeichert. Bestehende Einträge **nie umsortieren, ersetzen oder löschen**; neue Einträge immer hinten anhängen – sonst hängen gespeicherte Häkchen plötzlich an anderen Meilensteinen.
- **Abdeckung:** Woche 4 bis 104 (ca. 24 Monate) in 25 Stufen, danach endet die Liste. Neue Stufen kommen immer hinten dran (aufsteigende Wochen). Ab etwa 12 Monaten sprechen Kontext und Tipps von „deinem Kind“ statt „deinem Baby“.
- **Kartenüberschrift:** „Woche N · ca. X Monate“ – beide Einheiten, wie im App-Header („46 Wochen · 10.6 Monate“). Monate = Woche ÷ 4,345, gerundet, mindestens 1.
- **Quellenbasis:** Inhalte orientieren sich an gängigen Entwicklungs-Checklisten (Beobachtbares, kein Leistungsmaßstab). Bei Meilensteinen mit großer Spannbreite (Gehen, Sprechen) im Tipp entlasten und, wo sinnvoll, auf die nächste Vorsorgeuntersuchung verweisen – nie diagnostisch formulieren.
- **Reise-Übersicht** (Karte „Eure Reise“ ganz oben in der Ansicht „Meilensteine“, über der Liste):
  - **Phasen:** Ankommen (0–3 Monate), Greifen & Drehen (3–6), Sitzen & Krabbeln (6–9), Stehen & erste Schritte (9–12), Laufen & Entdecken (12–18), Sprechen & Selbermachen (18–24). Sie sind aus den Meilenstein-Wochen abgeleitet (`JOURNEY_PHASES`, Wochenbereiche). **Jede Meilenstein-Woche muss in genau einer Phase liegen** – bei neuen Stufen prüfen.
  - **Zwei getrennte Signale:** Das Kind-Symbol markiert die Phase nach **Alter** (Monate = Wochen ÷ 4,345). Der **Ring** an jeder Station zeigt den **Anteil abgehakter Meilensteine** der freigeschalteten Stufen. Der Pfad ist bis zur aktuellen Phase durchgezogen, danach gepunktet. So bleibt „wo steht das Kind“ altersbasiert (Nicht-Abhaken wirkt nie wie ein Rückstand), und Abhaken bewegt trotzdem sichtbar etwas.
  - **Kind-Symbol:** Ist ein Foto hinterlegt (`S.avatarUrl || S.avatar`), zeigt der Marker der aktuellen Phase das Foto (rund, 35px, innerhalb des Rings), sonst das Baby-Icon. Das Foto steckt **nicht** im HTML-String, sondern wird von `applyAvatar()` gesetzt – so liegt keine große Bilddatei bei jedem Rendern im Markup, und ein Fotowechsel aktualisiert die Grafik sofort.
  - **Alles abgehakt** = Station gefüllt mit Haken; die aktuelle Station behält ihr Kind-Symbol und zeigt einen vollen Ring.
  - **Bewegung nach dem Abhaken:** Die Ringe starten mit dem zuletzt **gesehenen** Stand und laufen erst auf den echten Wert, wenn die Karte im Sichtbereich ist (`IntersectionObserver`). Grund: Die Karte liegt oben, abgehakt wird weiter unten – sonst fände die Bewegung unbemerkt außerhalb des Bildschirms statt. Bei „Bewegung reduzieren“ entfällt die Animation.
  - **Antippen** einer Station zeigt Phase, Zähler („5 von 12 Meilensteinen abgehakt“) und Kurzbeschreibung. „Zu den Meilensteinen“ springt zur neuesten Karte der Phase (`id="ms-w{Woche}"`); Phasen ohne freigeschaltete Meilensteine haben keinen Sprung-Button.
  - **Technik:** Die Zustandsvariablen (`_journeySeen`, `_journeySel`, `_journeyObs`) sind `var`, weil `render()` sie erreichen kann, bevor ihre Deklarationszeile ausgeführt wurde (bei `let` wäre das ein Fehler). Aufgerufen wird `initJourney()` per Hook in `render()` nur im Meilensteine-Tab.
- **Hinweis zur Orientierung** steht **unten** am Ende der Liste als kleiner, gedämpfter Text (11px, zentriert) statt als eigener Kasten oben; ohne Gedankenstrich und ohne Verweis aufs Konfetti (das sieht man beim Abhaken).
- **Darstellung:** Kontext-Text (12.5px) unter der Wochen-Überschrift; je Eintrag Text (14px) + Kategorie-Pille, darunter Tipp-Zeile (12px) mit `Sprout`-Icon.
- **Inhaltliche Leitlinie:** Tipps ordnen ein statt zu bewerten. Bei Meilensteinen mit großer Spannbreite (Sprechen, Laufen) im Tipp ausdrücklich entlasten („manche Kinder …“).
- Abhaken rendert mit `preserveScroll`, damit die lange Liste nicht nach oben springt. Der Leerzustand erscheint erst bei korrigiertem Alter unter Woche 2 (Regel: Woche ≤ Alter + 2).

---

## 11. Technische Regeln (Code-Konventionen)

- **Modul-Skript:** Die App läuft als `type="module"`. Jede Funktion, die per `onclick`/`onchange` im HTML aufgerufen wird, muss in der zentralen `Object.assign(window, {...})`-Liste am Dateiende stehen – sonst passiert beim Tippen **gar nichts**, ohne sichtbaren Fehler (Bug-Funde: `setDevTab`, `resetOutfitLocation`).
- **Jeder `onclick`-Name braucht eine Definition.** Vor einer Auslieferung alle per Attribut aufgerufenen Funktionsnamen gegen Definitionen und Export-Liste abgleichen. Stand der letzten Prüfung: 63 Funktionen, keine undefinierten, keine nicht erreichbaren.
- **Tab-Umbauten:** Wird ein Tab zur Unterseite (oder umgekehrt), alle `go(<Index>)`-Aufrufe, `goTab(<Index>)` und `curTab === <Index>`-Bedingungen suchen und anpassen – sie zeigen sonst still auf den falschen Tab.
- **Gespeicherte Schlüssel sind ein Datenvertrag** (z. B. Meilenstein-Index, siehe Abschnitt 10). Strukturen, deren Reihenfolge Identität trägt, nur erweitern, nie umbauen.
- **`render()` springt standardmäßig nach oben** (außer im Beikost-Tab). Bei Interaktionen innerhalb langer Listen `render({ preserveScroll: true })`.
- **Namensregel „Wonder Weeks“:** Den Begriff **nicht** in der Oberfläche verwenden. „THE WONDER WEEKS“ ist beim US-Markenamt als Wortmarke eingetragen (Reg.-Nr. 5383008, unter anderem für mobile Anwendungen zur Entwicklung von Babys). Der Status in der EU/Deutschland ist **nicht geprüft**. Neutral: „Entwicklungssprünge“, in engen Stellen („Umschalter“) kurz „Sprünge“. Offen und **nicht** durch die Umbenennung gelöst: Herkunft der zehn Sprung-Namen, des Wochen-Schemas und der Beschreibungstexte – vor einem öffentlichen Rollout klären (Quelle der Inhalte, ggf. eigene Formulierungen, rechtliche Einschätzung).
- **Zeitangaben ausschreiben:** „Min.“ nie abkürzen. Jede Anzeige von `prepTime` läuft über `formatPrepTime()` – an *jeder* Anzeigestelle (der Fix fehlte einmal im „Heute auf dem Löffel“-Widget).
- **Externe Dienste** (Wetter, Geocoding) immer mit Timeout und Fallback; die UI zeigt zuerst einen Platzhalter und aktualisiert nach.
- **Keine Debug-Hilfen ausliefern** (z. B. farbige `outline`); vor Release entfernen.
- **Escaping (verbindlich):** Alles, was aus einer Nutzereingabe, dem Speicher oder einem externen Dienst stammt (Babyname, Notizen, Lebensmittelnamen, Ortsnamen, Messwerte), geht in HTML-Templates nur durch `escHtml()` (escaped auch `'`). Babyname: im Template `getBabyName()`/`babyGen()` (bereits escaped), für `textContent`, Titel, Canvas und Dateinamen `getBabyNameRaw()`/`babyGenRaw()` – nie doppelt escapen. IDs in `onclick`-Attributen per `escHtml(JSON.stringify(id))`.
- **Zahlen & Datum deutsch:** Dezimalzahlen nur über `fmtDec()`/`fmtNumFlex()` (8,3 Monate · 6,2 kg), Datum über `fmt()` (TT.MM.JJJJ). Kein `toFixed()` direkt in der UI.
- **Datensicherung:** Export/Import über `buildBackup()`/`parseBackup()` (Format `baby-app-backup`, v2: Profil, Zustand, Foto, Ort). Neue gespeicherte Schlüssel müssen in die Sicherung aufgenommen werden. Bewusst keine automatische Erinnerung (Entscheidung Produkt, 1.8).
- **Projektstruktur und Auslieferung (2.5):** Code liegt auf GitHub, Netlify veröffentlicht jede Änderung automatisch. Die App liegt in `public/` (kein Build-Schritt), Server-Funktionen in `netlify/functions/`, gemeinsame Logik in `netlify/lib/`. Adresse: `app.allesbabyapp.de`. Bei jeder Änderung an `public/` die `CACHE`-Version in `public/sw.js` hochzählen.
- **Anonyme Statistik (2.5):** Eigene, schmale Zählung (`/api/hit`, Netlify Blobs, Tageszähler). Erlaubte Meldungen nur `start` (app/browser), `dauer` (4 Stufen), `install`. Nie Inhalte, Namen, Alter, Kennungen oder IP-Adressen speichern. Neue Meldungen nur nach Anpassung der Datenschutzerklärung. Gesendet wird nur auf `app.allesbabyapp.de`; Abschalten über den Schalter im Datenschutz. Auswertung unter `/statistik` (Passwort `STATS_PASSWORT`).
- **Schriftgrößen (2.4):** Untergrenze 11px, nur für Etiketten und Badges. Lesetext mindestens 13px, im Lebensmittel-Sheet 15px (Kacheln: Name 15px, Hinweis 12px).
- **Geschlecht in Texten (2.4):** Texte über das Kind nie mit festem „er/ihm/ihn/sein“. Entweder ohne Pronomen formulieren oder Platzhalter `__ER__`, `__IHM__`, `__IHN__`, `__SEIN__` nutzen; `resolveBaby()` setzt sie nach der Angabe aus dem Onboarding ein. „Dein Baby … es/sein“ ist grammatisch neutral und bleibt erlaubt.
- **Beikostreife (2.4):** „Heute auf dem Löffel“ und „Rezept-Vorschläge“ erscheinen erst, wenn die Beikost begonnen hat (Startdatum erreicht oder Reifezeichen bestätigt). Ab 17 Wochen (korrigiert) zeigt Home vorher die Karte „Bereit für den ersten Brei?“ mit vier Reifezeichen.
- **Rezepte immer alphabetisch** (Liste, Vorschläge im Lebensmittel-Sheet).
- **App-Name (2.3):** Die App heißt „Alles Baby“ (Titel, Manifest, Installation vor dem Onboarding, Texte). Nach dem Onboarding steht unter dem Icon bewusst der Name des Babys (persönlicher), gesetzt in `applyBabyProfile` und im Laufzeit-Manifest. Nie „Baby-App“.
- **App-Icon (2.2):** Marken-Icon „Baby-Body“ vom Website-Team: Linienzeichnung in #fdfcfd (Lucide-Stil, Strich 1,75) auf Verlauf #9b72cf → #c9a0dc. Dateien: `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` (randlos, Motiv in der sicheren Mitte), `apple-touch-icon.png` (180), Favicons `favicon.svg`, `favicon-32.png`, `favicon-16.png` (abgerundete Variante). Das Icon ist für alle gleich, kein Name oder Initial darauf.
- **Karten ohne Akzentlinie (2.1):** Keine farbigen Balken links an Karten oder Boxen (wirkte altbacken und bog sich an den runden Ecken zur Sichel). Stattdessen:
  - *Normale Karte:* weiß, Icon nur klein am Titel. Hervorgehobene Karten (Outfit des Tages, Heute auf dem Löffel) bekommen einen sanften Verlauf.
  - *Warnung* (`.al-amb`, `.al-red`, „Beachte heute“): getönte Fläche, links ein weißer Kreis mit Warn-Icon. Nur für sicherheitsrelevante Hinweise.
  - *Tipp groß* (`renderTipCard`, z. B. Home „Gut zu wissen“): Verlauf Lila→Rosé, zwei angeschnittene Deko-Kreise, Überschrift (Outfit, 16px) + Text (13px). Kein Etikett „Tipp“ sichtbar, nur für Screenreader (`.sr-only`).
  - *Tipp kompakt* (`.recipe-tip`, `.tip-compact`): gleicher Verlauf, Text in normaler Größe (13px), keine Deko, keine Überschrift nötig.
  - *Icon-Regel:* höchstens ein Icon pro Kartentitel, im Inhalt nur bei Warnungen.
- **Keine Gedankenstriche (– / —) in Texten (Regel von Paul, gilt für App und Website):** stattdessen Komma, Punkt oder Doppelpunkt. Zahlenbereiche werden ausgeschrieben („850 bis 900 ml“), nur kompakte Bereiche wie „0–3 Monate“ in Grafiken bleiben. Kein „—“ als Platzhalter.
- **Einzahl/Mehrzahl:** Zahlen mit Einheit immer über `fmtCount(n,'Monat','Monate')`, nie „1 Monate“.
- **Systemleisten:** `theme-color` und `theme_color` im Manifest = App-Hintergrund `#faf7f2` (kein lila Band über der Statusleiste oder unter der Navigation). Navigation unten: Android volle `safe-area-inset-bottom`, iOS 16px weniger.
- **UV-Badge:** niedriger UV-Index in `var(--primary)` (Styleguide 0.1), mittel und hoch weiter in Warn- und Gefahrfarbe.
- **Keine Abkürzungen in der Oberfläche (Produktentscheidung 1.9):** „Monate“, „Wochen“, „Tage“, „Minuten“, „Stunden“, „etwa“, „zum Beispiel“ usw. immer ausschreiben, auch in Daten (`rezepte.json`, `prep_guide.json`). Erlaubt bleiben Maßeinheiten (g, kg, ml, cm, EL, TL) und Gesetzesangaben in den Rechtstexten (Art., Abs.). Kein „Ø“-Zeichen, sondern „im Schnitt“.
- **Buttons mit längerem Text:** Klasse `btn-wrap`, damit nichts mit „…“ abgeschnitten wird.
- **Entwicklung (1.9):** Sprünge entfernt. Tab „Eure Phase“ (`renderPhaseView`, sechs Phasen in `JOURNEY_PHASES` mit Texten und je vier Spielideen) und „Meilensteine“. Bereiche heißen Bewegung, Sprache, Miteinander, Entdecken (`DEV_AREAS`; Speicher-Schlüssel unverändert). Neue Meilensteine nur über `MILESTONE_ADDITIONS` hinten anhängen. Spielideen verknüpfen sich über `ms` (Meilenstein-Text) mit der Liste.
- **Beikost-Kacheln:** Ein einheitliches „!“ für alles mit Sicherheitshinweis (inklusive nitrathaltig), darunter höchstens eine Zeile: „Ab 12 Monaten“ oder „Ab TT.MM.JJJJ“.
- **Plausibilität:** Baby-Daten laufen über `validateBabyDates()` (Geburt nicht in der Zukunft/max. 3 Jahre alt, ET −3 bis +20 Wochen zur Geburt, Beikost nicht vor Geburt). Unmögliches blockiert mit Fehler am Feld (`.field-err`, `aria-invalid`), Ungewöhnliches braucht eine Bestätigung. Messwerte über `readMeasure()` (Komma erlaubt).
- **Datums-/Zeitfelder:** globale Regel für `input[type=date|time|datetime-local|month]` (`-webkit-appearance:none; max-width:100%; min-width:0`) – keine Einzelfixes mehr nötig. Auf iOS haben alle Eingabefelder 16px, sonst zoomt Safari beim Fokus.
- **Zoom bleibt erlaubt:** kein `maximum-scale`/`user-scalable=no` im Viewport (WCAG 1.4.4).
- **Klickbare Nicht-Buttons:** `enhanceClickables()` setzt `role="button"` + `tabindex="0"`, Enter/Leertaste lösen aus. Neue Overlays/Backdrops in `A11Y_SKIP_IDS` eintragen. Neue Bedienelemente wenn möglich gleich als `<button>`.
- **Nutzerdaten nie nur in `sessionStorage`:** alles, was der Nutzer „speichert“, gehört in `S` (Bug-Fund: Lebensmittel-Notizen waren nach dem Schließen weg; jetzt `S.prepNotes`).
- **Externe Daten kennzeichnen:** Wetter nur mit Quelle (Open-Meteo, CC BY 4.0; Ortsnamen © OpenStreetMap); simulierte Daten immer als solche ausweisen, nie echte Daten eines anderen Ortes unter falschem Namen zeigen.
- **Auslieferung:** Die Quell-`index.html` läuft ohne Build. Bei jeder Auslieferung `CACHE` in `sw.js` hochzählen. Ordner: Icons, `manifest.json`, `sw.js`, `_redirects`, JSON-Daten im Hauptverzeichnis, Schriften samt OFL-Lizenztexten in `/fonts/`. Keine `.DS_Store`, keine Source-Maps.
- **Testen ohne Deploy:** temporäre Test-URL (z. B. Netlify Drop) und im Standalone-Modus öffnen („Zum Home-Bildschirm“) – nur dort greift die Safe-Area wie im echten Betrieb. Die Dateien-App-Vorschau führt kein JavaScript aus.

---

## Kurz-Checkliste für Reviews

- [ ] Kein reines Weiß (`#ffffff`) als Vollflächenhintergrund der App (nur Cards).
- [ ] Alle Abstände auf 8/16/24/32px.
- [ ] Cards: `rounded-xl` + `--shadow-soft`.
- [ ] Icons: einheitlich aus Lucide, `stroke-width: 1.75`, `var(--primary)`, in 56px-Badge mit `var(--secondary)`.
- [ ] Lebensmittel-Icons nur im Sektions-Header (Gemüse/Obst/Getreide/Proteine & Allergene) – einzelne Lebensmittel-Karten haben kein Icon, nur Name + Status-Badges.
- [ ] Zahnungskarte: Custom `Tooth`-Icon (einzige Ausnahme von „nur Lucide"), gleicher Stroke-Stil.
- [ ] Outfit- & Szenario-Icons (`OI`, `SCENARIOS`): einheitlich `currentColor`, 24×24, `stroke-width: 1.75` – keine hartkodierten Hex-Farben mehr.
- [ ] Keine Emojis mehr bei Rezepten – Kategorie-Icon nach Zubereitungsart (`Croissant`/`UtensilsCrossed`/`Salad`).
- [ ] Globale Navigation & Sektionen: alle Emojis durch geprüftes Lucide-Mapping ersetzt (siehe Tabelle „Globale Navigations- & Sektions-Icons").
- [ ] Rezeptkarten: "probiert"-Status nur als Checkmark-Badge, keine Card-weite Farbtönung.
- [ ] Zutaten-Listenpunkte: einheitliche neutrale Farbe (`var(--muted-foreground)`) in allen Rezepten, nicht pro Rezept unterschiedlich.
- [ ] Icon-Button neben Input-Feldern: 44px, nicht 50px (50px ist für eigenständige CTAs reserviert).
- [ ] Toasts/Erfolgsmeldungen nutzen `.toast-success` (schwebende Pill, Check-Icon-Badge, blendet nach 2,6s automatisch aus), kein Vollbreite-Block im Seitenfluss.
- [ ] Event-Kacheln nutzen `.event-tile` (Icon-Badge + Schatten statt Rahmen+Verlauf).
- [ ] Zurück-Button nutzt `.btn-back` (Ghost-Stil, 36px, kein gefüllter Hintergrund) – nicht `.btn`.
- [ ] Buttons ≥ 50px hoch, abgerundet.
- [ ] Button-Text: primär ≤ 22 Zeichen, sekundär ≤ 18 Zeichen.
- [ ] Tap: Scale 0.98 + optional `vibrate(10)`.
- [ ] Bewegungen: `var(--transition-soft)`.
- [ ] Bottom-Nav: unterer Abstand = Safe-Area minus 16px (min. 6px), kein zusätzlicher Aufschlag obendrauf.
- [ ] Bottom-Nav: `--nav-h: 50px`, Icon 22px, Stroke app-weiter Standard (1.75), Hintergrund warmes Creme (kein reines Weiß).
- [ ] Bottom-Nav Active-Pille: identische Box bei allen Icons, nur `background` wechselt (transparent ↔ `var(--secondary)`).
- [ ] Innenabstände (Cards, Sheets, Modals) sind auf allen vier Seiten derselbe Space-Wert, keine stillschweigend gemischten Werte.
- [ ] Abstand Header → erste Card = `var(--space-2)`, identisch zum Card-zu-Card-Abstand.
- [ ] Bedingt sichtbare Zeilen (z. B. „nur bei Regen") haben feste `height`, nicht `min-height` kleiner als ihr Icon.
- [ ] Zustandswechsel (aktiv/ausgewählt) ändern nie `border: none → Xpx solid` – immer `border-color` auf bereits vorhandenem Rahmen.
- [ ] Chips derselben Reihe mit unterschiedlich langen Labels haben feste, einheitliche `width`, nicht `min-width`.
- [ ] Horizontal scrollbare Leisten haben `scroll-snap-type` + `scroll-snap-align` + symmetrisches `padding-left`/`padding-right`.
- [ ] Header: Blur + scrollbasierte Verkleinerung + Gradient nach Kontext.
- [ ] Szenario und Outfit sind eine Karte; Titel und Hinweise aktualisieren sich beim Szenario-Wechsel mit.
- [ ] Wichtige Hinweise (z. B. Regenschutz) als `.outfit-alert` + `warn`-Kachel, nicht nur im Kachel-Label.
- [ ] Scroll-Snap-Reihen haben `scroll-padding` – erster Chip sitzt auf der Textkante (16px).
- [ ] Zahnungskarte: Segmente auch inaktiv mit eigener Fläche; Datum nur bei „Zahn ist da“.
- [ ] Lebensmittel-Sheet ohne Guide-Daten nutzt `.compact`; Sheet-Höhe springt bei Zustandswechseln nicht.
- [ ] Meilensteine: Einträge nur hinten anhängen (Index = Identität); Abhaken mit `preserveScroll`.
- [ ] Jede `onclick`-Funktion existiert und steht in der `Object.assign(window, …)`-Liste.
- [ ] Zeitangaben über `formatPrepTime()`, kein „Min.“ in der UI.
- [ ] Kein Debug-Rahmen/-Code mehr im Build.
- [ ] Nach Tab-Umbauten: alle `go(Index)`/`curTab`-Bezüge geprüft; Events laufen als Mehr-Unterseite über `refreshEvents()`.
- [ ] Nutzer- und externe Daten in Templates nur über `escHtml()` / `getBabyName()`; Raw-Varianten nur für Text-Kontexte.
- [ ] Neue Datums-/Messwert-Eingaben haben Plausibilitätsprüfung mit Fehler am Feld.
- [ ] Viewport erlaubt Zoom; klickbare Elemente per Tastatur bedienbar, Fokus sichtbar.
- [ ] `sw.js`-Cache-Version hochgezählt.
- [ ] Neue Meilenstein-Stufen liegen in genau einer Reise-Phase (`JOURNEY_PHASES`); Phasen-Wochenbereiche decken alle Stufen ab.

---

*Dokumentversion: 2.5 — GitHub und Netlify, eigene anonyme Statistik. 2.4 — Beikostreife, Geschlecht in Texten, Schriftgrößen, alphabetische Rezepte. 2.3 — App-Name „Alles Baby“. 2.2 — Neues App-Icon, Rezeptbestand 143. 2.1 — Karten ohne Akzentlinie, Tipp-Kacheln, Icon-Regel. 2.0 — Gedankenstriche entfernt, Einzahl/Mehrzahl, Systemleisten-Farbe, Navigationsabstand Android, UV-Badge. 1.9 — Phasen statt Sprünge, Spielideen-Katalog, Profil bearbeiten mit Messwert-Verlauf, keine Abkürzungen. 1.8 — Datensicherung (Export/Import), Events entfernt, deutsches Zahlenformat. 1.7 — Release-Vorbereitung: Escaping-, Plausibilitäts- und Barrierefreiheitsregeln, globale Datumsfeld-Regel, Auslieferungsstruktur. (1.6: neutrale Benennung der Entwicklungssprünge, Reise-Übersicht mit Foto-Marker, Meilensteine bis 24 Monate.)*
