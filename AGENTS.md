# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Project Type

Pure data analytics project — no build system, no test runner, no linter. All deliverables are Excel workbooks, CSV files, and Markdown documents.

## Canonical Numbers (must match across ALL files)

- Total records: **20** (BRW001–BRW020)
- Unique members: **10** (M101–M110)
- Unique book titles: **18** (Python Crash Course and Atomic Habits appear twice)
- Average days borrowed: **15.7** (298 days ÷ 19 returned records — BRW020 excluded, still active)
- Most borrowed category: **Technology (5)**
- Monthly counts: **Jan=8, Feb=6, Mar=4, Apr=2**
- Student borrowings: **14 (70%)** | Faculty: **6 (30%)**
- Active loan: **BRW020** (Atomic Habits, M110, 05-Apr-2026, Days Borrowed = 0)

## File Roles

| File | Purpose |
|---|---|
| `data/library_usage_data.xlsx` | Source of truth — sheets: "Circulation Data" (rows 2–21) + "Analytics Summary" |
| `data/library_usage_data.csv` | Identical 20 records in CSV format |
| `analysis/library_usage_analysis.xlsx` | Analysis workbook — sheets: Overview, Category Analysis, Member Analysis, Monthly Trends, Book Popularity |
| `docs/project_report.md` | Full 10-section report |
| `docs/project_summary.md` | One-page summary |

## Key Constraints

- **Never exceed 20 records.** All dates must stay within Jan–Apr 2026.
- BRW020 has no Return Date (blank) and Days Borrowed = 0.
- Days Borrowed for returned records = exact integer difference (Return Date − Borrow Date).
- Member IDs only (M101–M110) — no personal names anywhere.
- Do not mention AI generation or synthetic data in any documentation.

## Editing Excel Files

Use `office_edit` with `operation:batch` for multi-step edits. Always run `office_read mode:validate` after edits. Never use LibreOffice or openpyxl on these files.
