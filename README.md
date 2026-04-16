# BH/VT Sachkunde Quiz

Interaktives Lerntool zur Vorbereitung auf die FCI-BH/VT-Sachkundeprüfung des Verein für Deutsche Schäferhunde (SV) e.V.

**Inoffizielles Lerntool für den internen Gebrauch.** Fragen © Verein für Deutsche Schäferhunde (SV) e.V., Stand 2025. Quelle: [schaeferhunde.de](https://www.schaeferhunde.de)

## Features

- **Prüfungssimulation**: 20 Fragen aus allen Bereichen, Auswertung mit 70%-Schwelle (offizielle Prüfungsbedingungen)
- **Übungsmodus**: Sofortiges Feedback nach jeder Antwort
- **Themenfilter**: Gezielt nach Teil 1–4 üben (Recht, Gesundheit, Verhalten, Prüfungsordnung)
- **Multi-Select**: Mehrere richtige Antworten pro Frage werden korrekt gewertet
- **Offizielle Wertung**: +2 / −2 Punkte pro Antwort

---

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Dann http://localhost:5173 öffnen.

## Build

```bash
npm run build
npm run preview   # zum Testen des Builds
```

---

## Deployment auf GitHub Pages

### 1. Repository erstellen

Lege auf GitHub ein neues Repository an, z.B. `bhvt-quiz`.

### 2. Code pushen

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/DEIN-USERNAME/bhvt-quiz.git
git push -u origin main
```

### 3. ⚠️ Base-Pfad anpassen (falls Repo anders heißt)

In `vite.config.js` muss der `base`-Wert exakt zum Repo-Namen passen:

```js
base: '/bhvt-quiz/',  // bei Repo "bhvt-quiz"
// oder z.B.:
base: '/sachkunde-quiz/',  // bei Repo "sachkunde-quiz"
```

Sonst werden CSS und JS auf der gehosteten Seite nicht geladen (404).

### 4. GitHub Pages aktivieren

Im Repository:
1. **Settings** → **Pages**
2. Bei **Source** auswählen: **GitHub Actions**

Das war's — beim nächsten Push (oder einmal manuell unter **Actions** → **Deploy to GitHub Pages** → **Run workflow**) baut und deployed der Workflow automatisch. Die URL erscheint nach ~1 Minute unter Settings → Pages.

Die App ist dann erreichbar unter:
```
https://DEIN-USERNAME.github.io/bhvt-quiz/
```

### Hinweis zur Sichtbarkeit

GitHub Pages auf **kostenlosen Repos ist immer öffentlich** — jeder, der die URL kennt, kann zugreifen. Da der Fragenkatalog für den internen Vereinsgebrauch gedacht ist:

- Repo-Name nicht zu offensichtlich wählen (z.B. nicht "sv-bhvt-fragen-leak")
- URL nur intern teilen (WhatsApp-Vereinsgruppe, persönlich)
- Nirgendwo öffentlich verlinken/posten (sonst landet's irgendwann bei Google)

Wer echte Zugriffskontrolle braucht: **Cloudflare Pages** (kostenlos) bietet Access-Gating mit Login auch im Free-Tier — der Build-Prozess ist quasi identisch.

---

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- lucide-react (Icons)
