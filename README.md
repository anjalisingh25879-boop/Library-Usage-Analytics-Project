# Library Usage Analytics — Frontend Dashboard

A fully functional, browser-based analytics dashboard built with HTML, CSS, and Chart.js. It reads directly from `data.json` and requires no backend server to run.

---

## Files

| File | Purpose |
|---|---|
| `index.html` | Dashboard layout — header, cards, charts, table, findings |
| `style.css` | Blue-and-white responsive theme |
| `script.js` | Data loading, Chart.js charts, sortable/searchable table |
| `data.json` | 20-record canonical dataset (mirrors `../data/library_usage_data.csv`) |

---

## Dashboard Features

- **Summary cards** — Total Borrowings, Unique Members, Unique Books, Avg. Days Borrowed, Return Rate
- **Borrowings by Category** — Colour-coded bar chart (Technology, Self Help, Fiction, Finance, Biography, History)
- **Monthly Borrowing Trend** — Line chart, January–April 2026
- **Student vs Faculty** — Doughnut chart showing the 70/30 split
- **Borrowings per Member** — Bar chart (blue = Student, orange = Faculty)
- **Searchable records table** — Search by title/category/member/status; filter dropdowns; sortable columns
- **Key Findings** — Seven annotated findings derived from the dataset

---

## How to Open the Dashboard

### Option 1 — VS Code Live Server (recommended)

1. Open the `frontend/` folder in VS Code.
2. Install the **Live Server** extension (if not already installed).
3. Right-click `index.html` → **Open with Live Server**.
4. The dashboard opens at `http://127.0.0.1:5500/index.html`.

### Option 2 — Python HTTP server

Open a terminal in the `frontend/` folder and run:

```bash
# Python 3
python -m http.server 8000
```

Then open your browser at: **http://localhost:8000**

### Option 3 — Node.js `http-server`

```bash
# Install once (if not already installed)
npm install -g http-server

# Run from the frontend/ folder
http-server -p 8000
```

Then open: **http://localhost:8000**

> **Why a server is needed:**  
> Browsers block `fetch()` requests to local files (`file://` protocol) for security reasons.  
> Any local HTTP server — VS Code Live Server, Python, or Node — resolves this instantly.

---

## Technology

| Component | Tool |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (CSS custom properties, CSS Grid, Flexbox) |
| Charts | [Chart.js 4.4.3](https://www.chartjs.org/) via CDN |
| Data | `data.json` (local JSON file) |
| Runtime | Any modern browser (Chrome, Edge, Firefox, Safari) |

No build step, no npm install, no dependencies beyond Chart.js (loaded via CDN).

---

## Data

All dashboard figures are computed at runtime directly from `data.json`:

| Metric | Value |
|---|---|
| Total records | 20 |
| Unique members | 10 |
| Unique book titles | 18 |
| Avg. days borrowed | 15.7 |
| Return rate | 95% |
| Most borrowed category | Technology (5) |
| Monthly counts | Jan 8 / Feb 6 / Mar 4 / Apr 2 |
