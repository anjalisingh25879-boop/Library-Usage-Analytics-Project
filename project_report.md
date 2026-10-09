# Library Usage Analytics — Project Report

**Project:** Library Usage Analytics  
**Program:** IBM SkillsBuild — Data Analytics  
**Dataset Period:** January 2026 – April 2026  

---

## 1. Project Introduction

Libraries are central to academic life, and understanding how their resources are used helps in making better decisions about collection management, member services, and resource planning. This project analyses the borrowing patterns of a college library over a four-month period from January to April 2026.

The analysis focuses on book circulation, category preferences, member activity, and borrowing trends. The goal is to present findings in a clear and structured manner that supports data-driven decision-making in a library setting.

---

## 2. Dataset

The dataset consists of **20 borrowing records** collected between January 2026 and April 2026. Each record represents a single borrowing event and includes the following fields:

| Column | Description |
|---|---|
| Borrowing ID | Unique identifier for each borrowing event (BRW001–BRW020) |
| Book Title | Title of the borrowed book |
| Category | Genre or subject area of the book |
| Member ID | Unique member identifier (M101–M110) |
| Member Type | Student or Faculty |
| Borrow Date | Date the book was borrowed |
| Return Date | Date the book was returned (blank if still active) |
| Days Borrowed | Number of days the book was kept |
| Status | Returned or Borrowed (active) |

**Categories covered:** Technology, Fiction, Self Help, Biography, Finance, History  
**Member types:** Student and Faculty  
**Source file:** `data/library_usage_data.xlsx` and `data/library_usage_data.csv`

---

## 3. Objectives

The project aims to answer the following analytical questions:

1. What is the overall book circulation rate over the period?
2. Which books are borrowed most frequently?
3. Which book categories are most popular among library members?
4. How active is each member in terms of borrowing?
5. Is there a difference in borrowing behaviour between students and faculty?
6. How does borrowing activity change month by month?
7. What is the average duration for which books are borrowed?
8. What are the key findings and actionable insights from the data?

---

## 4. Book Circulation Analysis

Over the four-month period, a total of **20 borrowing events** were recorded across **18 unique book titles** and **10 members**.

| Metric | Value |
|---|---|
| Total Borrowing Records | 20 |
| Total Returned | 19 |
| Currently Active (Borrowed) | 1 |
| Circulation Rate (Returned) | 95% |

Of the 20 records, 19 have been successfully returned. One record (BRW020 — *Atomic Habits*, borrowed by M110 on 05 April 2026) remains active at the time of reporting. This gives a **return rate of 95%**, indicating healthy circulation and timely returns among library members.

---

## 5. Category Analysis

The dataset covers six book categories. The following table summarises borrowing by category:

| Category | Borrowings | % of Total |
|---|---|---|
| Technology | 5 | 25% |
| Self Help | 4 | 20% |
| Fiction | 3 | 15% |
| Finance | 3 | 15% |
| Biography | 3 | 15% |
| History | 2 | 10% |
| **Total** | **20** | **100%** |

**Technology** is the most borrowed category, accounting for 25% of all borrowings. This reflects the interest of college students in computing, programming, and data-related subjects. Self Help books come second at 20%, suggesting members also seek personal development resources.

Fiction, Finance, and Biography each account for 15% of borrowings, showing a balanced interest across these categories. History has the lowest borrowing count at 10%.

---

## 6. Member Analysis

The library has **10 active members** (M101–M110), with a balanced split of Student and Faculty members.

**Per-member borrowing count:**

| Member ID | Member Type | Borrowings |
|---|---|---|
| M101 | Student | 2 |
| M102 | Faculty | 2 |
| M103 | Student | 2 |
| M104 | Student | 2 |
| M105 | Faculty | 2 |
| M106 | Student | 2 |
| M107 | Faculty | 2 |
| M108 | Student | 2 |
| M109 | Student | 2 |
| M110 | Student | 2 |

All 10 members borrowed exactly 2 books each during the period, demonstrating consistent engagement across the membership base.

**Student vs Faculty Split:**

| Member Type | Borrowings | % of Total |
|---|---|---|
| Student | 14 | 70% |
| Faculty | 6 | 30% |

Students account for the majority of borrowing activity at 70%, which is expected given that students form the larger portion of the membership. Faculty members (M102, M105, M107) collectively contributed 6 borrowings (30%).

---

## 7. Borrowing Trends

**Monthly Breakdown:**

| Month | Borrowings | % of Total |
|---|---|---|
| January 2026 | 8 | 40% |
| February 2026 | 6 | 30% |
| March 2026 | 4 | 20% |
| April 2026 | 2 | 10% |

Borrowing activity was **highest in January** with 8 records (40% of total), which typically coincides with the start of a new academic semester when students and faculty are most actively engaging with course material.

A clear **declining trend** is observed from January through April. This pattern is consistent with typical academic library usage, where borrowing is heaviest at the start of the term and gradually decreases as the semester progresses.

**Average Days Borrowed:**

- Total days borrowed across 19 returned records: **298 days**
- Average days borrowed per record: **15.7 days**

The average borrowing duration of approximately 16 days suggests that most members keep books for roughly two weeks. This is a standard borrowing window and indicates that members are using the library's resources without exceeding typical loan periods.

---

## 8. Key Findings

Based on the analysis of the 20-record dataset, the following key findings are highlighted:

1. **Technology is the most borrowed category** (25%), reflecting strong interest in programming, data science, and computer-related topics among college members.

2. **Borrowing peaked in January 2026** (8 records, 40%) and declined steadily each month, suggesting that library usage is highest at the start of the academic semester.

3. **All 10 members borrowed equally** (2 books each), indicating a well-distributed engagement with the library's collection.

4. **Students drive 70% of borrowing activity**, which is proportional to their representation in the membership base.

5. **Two books were borrowed more than once** — *Python Crash Course* and *Atomic Habits* — making them the most popular titles in the dataset.

6. **The average borrowing duration is 15.7 days**, suggesting members are making effective use of the loan period without over-extending it.

7. **The return rate is 95%** (19 out of 20 records returned), indicating responsible borrowing behaviour across all members.

---

## 9. Conclusion

This project analysed the borrowing patterns of a college library over a four-month period using a structured dataset of 20 records. The analysis covered book circulation, category preferences, member activity, and monthly borrowing trends.

The findings show that Technology and Self Help books are the most popular categories, borrowing activity peaks at the start of the academic year, and library engagement is consistent across all members. The high return rate of 95% reflects responsible borrowing behaviour.

The project demonstrates how even a small dataset can yield meaningful insights when analysed systematically. These findings can assist library administrators in making informed decisions about collection development, loan period policies, and member communication strategies.

---

## 10. Future Improvements

If this project were to be extended or scaled up, the following improvements could be considered:

1. **Expand the dataset** to cover a full academic year (12 months) to capture seasonal trends more accurately.
2. **Add overdue tracking** — include a column for overdue status and late return patterns.
3. **Include department-level data** — categorise members by academic department to identify department-specific reading preferences.
4. **Integrate recommendation analysis** — identify which categories are under-borrowed relative to collection size, suggesting areas for promotion.
