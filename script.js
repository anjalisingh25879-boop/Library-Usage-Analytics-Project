/* ──────────────────────────────────────────────────────────────
   Library Usage Analytics — script.js
   Loads data.json, renders summary cards, four Chart.js charts,
   a sortable/searchable/filterable records table.
────────────────────────────────────────────────────────────── */

'use strict';

// ── Chart.js global defaults ─────────────────────────────────
Chart.defaults.font.family = "'Segoe UI', system-ui, -apple-system, sans-serif";
Chart.defaults.font.size   = 13;
Chart.defaults.color       = '#475569';

// ── Palette ──────────────────────────────────────────────────
const PALETTE = {
  blue:     '#2563a8',
  blueMid:  '#3b82f6',
  blueLight:'#93c5fd',
  navy:     '#1a3a6b',
  green:    '#16a34a',
  amber:    '#d97706',
  teal:     '#0d9488',
  purple:   '#7c3aed',
  rose:     '#e11d48',
  orange:   '#ea580c',
};

const CATEGORY_COLORS = {
  'Technology': PALETTE.blue,
  'Self Help':  PALETTE.teal,
  'Fiction':    PALETTE.purple,
  'Finance':    PALETTE.green,
  'Biography':  PALETTE.orange,
  'History':    PALETTE.rose,
};

// ── State ────────────────────────────────────────────────────
let allRecords  = [];
let sortState   = { col: 'id', dir: 'asc' };
let charts      = {};

// ── Helpers ──────────────────────────────────────────────────
const $ = id => document.getElementById(id);

function fmt(dateStr) {
  if (!dateStr) return '—';
  const [y, m, d] = dateStr.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
}

function escHtml(s) {
  return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

// ── Data loading ─────────────────────────────────────────────
async function loadData() {
  try {
    const res = await fetch('data.json');
    if (!res.ok) throw new Error(`HTTP ${res.status} — ${res.statusText}`);
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error('data.json is empty or malformed.');
    return data;
  } catch (err) {
    throw new Error(`Could not load data.json: ${err.message}`);
  }
}

// ── Summary cards ────────────────────────────────────────────
function renderCards(records) {
  const total       = records.length;
  const members     = new Set(records.map(r => r.memberId)).size;
  const books       = new Set(records.map(r => r.title)).size;
  const returned    = records.filter(r => r.status === 'Returned');
  const sumDays     = returned.reduce((a, r) => a + r.daysBorrowed, 0);
  const avgDays     = returned.length ? (sumDays / returned.length).toFixed(1) : '—';
  const returnRate  = ((returned.length / total) * 100).toFixed(0) + '%';

  $('stat-total').textContent   = total;
  $('stat-members').textContent = members;
  $('stat-books').textContent   = books;
  $('stat-avg').textContent     = avgDays;
  $('stat-return').textContent  = returnRate;
}

// ── Chart helpers ────────────────────────────────────────────
function destroyChart(key) {
  if (charts[key]) { charts[key].destroy(); delete charts[key]; }
}

// ── Chart 1: Borrowings by Category ─────────────────────────
function renderCategoryChart(records) {
  destroyChart('category');
  const counts = {};
  records.forEach(r => { counts[r.category] = (counts[r.category] || 0) + 1; });
  const sorted  = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const labels  = sorted.map(e => e[0]);
  const values  = sorted.map(e => e[1]);
  const colors  = labels.map(l => CATEGORY_COLORS[l] || PALETTE.blue);

  charts.category = new Chart($('chart-category'), {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Borrowings',
        data: values,
        backgroundColor: colors,
        borderRadius: 5,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.parsed.y} borrowing${ctx.parsed.y !== 1 ? 's' : ''}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 },
          grid: { color: '#e2e8f0' },
        },
        x: { grid: { display: false } }
      }
    }
  });
}

// ── Chart 2: Monthly Borrowing Trend ─────────────────────────
function renderMonthlyChart(records) {
  destroyChart('monthly');
  const monthOrder = ['2026-01','2026-02','2026-03','2026-04'];
  const monthLabels= ['January 2026','February 2026','March 2026','April 2026'];
  const counts = {};
  monthOrder.forEach(m => { counts[m] = 0; });
  records.forEach(r => {
    const key = r.borrowDate.slice(0, 7);
    if (key in counts) counts[key]++;
  });

  charts.monthly = new Chart($('chart-monthly'), {
    type: 'line',
    data: {
      labels: monthLabels,
      datasets: [{
        label: 'Borrowings',
        data: monthOrder.map(m => counts[m]),
        borderColor: PALETTE.blue,
        backgroundColor: 'rgba(37,99,168,.10)',
        pointBackgroundColor: PALETTE.blue,
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 2.5,
        fill: true,
        tension: 0.3,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.parsed.y} borrowing${ctx.parsed.y !== 1 ? 's' : ''}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 },
          grid: { color: '#e2e8f0' },
        },
        x: { grid: { display: false } }
      }
    }
  });
}

// ── Chart 3: Student vs Faculty (doughnut) ───────────────────
function renderMemberTypeChart(records) {
  destroyChart('member');
  let students = 0, faculty = 0;
  records.forEach(r => {
    if (r.memberType === 'Student') students++;
    else faculty++;
  });

  charts.member = new Chart($('chart-member'), {
    type: 'doughnut',
    data: {
      labels: ['Student', 'Faculty'],
      datasets: [{
        data: [students, faculty],
        backgroundColor: [PALETTE.blue, PALETTE.orange],
        borderWidth: 2,
        borderColor: '#fff',
        hoverOffset: 6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '62%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 16, usePointStyle: true, pointStyleWidth: 10 }
        },
        tooltip: {
          callbacks: {
            label: ctx => {
              const pct = ((ctx.parsed / records.length) * 100).toFixed(0);
              return ` ${ctx.label}: ${ctx.parsed} (${pct}%)`;
            }
          }
        }
      }
    }
  });
}

// ── Chart 4: Borrowings per Member ───────────────────────────
function renderPerMemberChart(records) {
  destroyChart('perMember');
  const counts = {};
  records.forEach(r => { counts[r.memberId] = (counts[r.memberId] || 0) + 1; });
  const labels = Object.keys(counts).sort();
  const values = labels.map(l => counts[l]);
  // Colour by member type
  const typeMap = {};
  records.forEach(r => { typeMap[r.memberId] = r.memberType; });
  const colors = labels.map(l => typeMap[l] === 'Faculty' ? PALETTE.orange : PALETTE.blue);

  charts.perMember = new Chart($('chart-per-member'), {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Borrowings',
        data: values,
        backgroundColor: colors,
        borderRadius: 4,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: ctx => `${ctx[0].label} (${typeMap[ctx[0].label]})`,
            label: ctx => ` ${ctx.parsed.y} borrowing${ctx.parsed.y !== 1 ? 's' : ''}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 },
          grid: { color: '#e2e8f0' },
        },
        x: { grid: { display: false } }
      }
    }
  });
}

// ── Table: filter + search ────────────────────────────────────
function getFilteredRecords() {
  const q        = $('table-search').value.trim().toLowerCase();
  const category = $('filter-category').value;
  const type     = $('filter-type').value;
  const status   = $('filter-status').value;

  return allRecords.filter(r => {
    if (category && r.category   !== category)  return false;
    if (type     && r.memberType !== type)       return false;
    if (status   && r.status     !== status)     return false;
    if (q) {
      const haystack = [r.title, r.category, r.memberId, r.memberType, r.status]
        .join(' ').toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

function sortRecords(records) {
  const { col, dir } = sortState;
  return [...records].sort((a, b) => {
    let va = a[col], vb = b[col];
    if (typeof va === 'number') return dir === 'asc' ? va - vb : vb - va;
    va = String(va).toLowerCase();
    vb = String(vb).toLowerCase();
    if (va < vb) return dir === 'asc' ? -1 : 1;
    if (va > vb) return dir === 'asc' ?  1 : -1;
    return 0;
  });
}

function renderTable() {
  const filtered = getFilteredRecords();
  const sorted   = sortRecords(filtered);
  const tbody    = $('table-body');

  if (sorted.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="no-results">No records match your search.</td></tr>`;
    $('table-count').textContent = 'No records found.';
    return;
  }

  tbody.innerHTML = sorted.map(r => `
    <tr>
      <td>${escHtml(r.id)}</td>
      <td>${escHtml(r.title)}</td>
      <td><span class="cat-pill">${escHtml(r.category)}</span></td>
      <td>${escHtml(r.memberType)}</td>
      <td>${fmt(r.borrowDate)}</td>
      <td>${fmt(r.returnDate)}</td>
      <td>${r.status === 'Borrowed' ? '—' : r.daysBorrowed}</td>
      <td><span class="badge badge-${r.status.toLowerCase()}">${escHtml(r.status)}</span></td>
    </tr>
  `).join('');

  const shown = sorted.length;
  const total = allRecords.length;
  $('table-count').textContent = shown === total
    ? `Showing all ${total} records.`
    : `Showing ${shown} of ${total} records.`;
}

// ── Sortable column headers ───────────────────────────────────
function initSortHeaders() {
  document.querySelectorAll('.records-table th.sortable').forEach(th => {
    // Add sort icon span
    th.innerHTML = `${th.textContent}<span class="sort-icon"></span>`;
    th.addEventListener('click', () => handleSort(th));
    th.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSort(th); } });
  });
}

function handleSort(th) {
  const col = th.dataset.col;
  if (sortState.col === col) {
    sortState.dir = sortState.dir === 'asc' ? 'desc' : 'asc';
  } else {
    sortState.col = col;
    sortState.dir = 'asc';
  }
  document.querySelectorAll('.records-table th').forEach(h => h.removeAttribute('aria-sort'));
  th.setAttribute('aria-sort', sortState.dir === 'asc' ? 'ascending' : 'descending');
  renderTable();
}

// ── Init ─────────────────────────────────────────────────────
async function init() {
  try {
    allRecords = await loadData();

    // Hide loading banner
    const loadingBanner = $('loading-banner');
    loadingBanner.hidden = true;

    // Render everything
    renderCards(allRecords);
    renderCategoryChart(allRecords);
    renderMonthlyChart(allRecords);
    renderMemberTypeChart(allRecords);
    renderPerMemberChart(allRecords);

    initSortHeaders();
    renderTable();

    // Wire up live filters
    $('table-search').addEventListener('input', renderTable);
    $('filter-category').addEventListener('change', renderTable);
    $('filter-type').addEventListener('change', renderTable);
    $('filter-status').addEventListener('change', renderTable);

  } catch (err) {
    $('loading-banner').hidden = true;
    const errBanner = $('error-banner');
    errBanner.hidden = false;
    errBanner.textContent = `⚠ ${err.message}`;
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', init);
