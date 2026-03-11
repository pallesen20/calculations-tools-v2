// ── ISO 8601 utilities ──────────────────────────────────────────

function getISOWeekNumber(date) {
  const t = new Date(date.valueOf());
  const day = (t.getDay() + 6) % 7;
  t.setDate(t.getDate() - day + 3);
  const firstThursday = t.valueOf();
  t.setMonth(0, 1);
  if (t.getDay() !== 4) t.setMonth(0, 1 + ((4 - t.getDay()) + 7) % 7);
  return 1 + Math.ceil((firstThursday - t) / 604800000);
}

function getISOWeekYear(date) {
  const t = new Date(date.valueOf());
  t.setDate(t.getDate() + 3 - ((t.getDay() + 6) % 7));
  return t.getFullYear();
}

function getMondayOfISOWeek(week, year) {
  const jan4 = new Date(year, 0, 4);
  const dow  = jan4.getDay() || 7;
  const mon  = new Date(jan4);
  mon.setDate(jan4.getDate() - dow + 1 + (week - 1) * 7);
  return mon;
}

function formatDate(d) {
  const M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${M[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function getDayOfYear(d) {
  return Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);
}

function isLeapYear(y) {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

function getTotalISOWeeks(y) {
  const jan1  = new Date(y, 0, 1);
  const dec31 = new Date(y, 11, 31);
  return (jan1.getDay() === 4 || dec31.getDay() === 4) ? 53 : 52;
}

// ── Update hero ─────────────────────────────────────────────────

function updateCurrentWeek() {
  const now     = new Date();
  const weekNum = getISOWeekNumber(now);
  const year    = now.getFullYear();

  document.getElementById('wn-number').textContent = weekNum;

  const monday = getMondayOfISOWeek(weekNum, getISOWeekYear(now));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  document.getElementById('wn-range').textContent = `${formatDate(monday)} – ${formatDate(sunday)}`;

  const dayOfYear = getDayOfYear(now);
  const totalDays = isLeapYear(year) ? 366 : 365;
  const progress  = ((dayOfYear / totalDays) * 100).toFixed(1);

  document.getElementById('wn-day').textContent          = dayOfYear;
  document.getElementById('wn-remaining').textContent    = totalDays - dayOfYear;
  document.getElementById('wn-quarter').textContent      = 'Q' + Math.ceil((now.getMonth() + 1) / 3);
  document.getElementById('wn-leap').textContent         = isLeapYear(year) ? 'Yes' : 'No';
  document.getElementById('wn-progress').style.width     = progress + '%';
  document.getElementById('wn-progress-label').textContent = `${progress}% of ${year} complete`;
}

// ── Build week table ────────────────────────────────────────────

function buildWeekTable() {
  const now          = new Date();
  const currentWeek  = getISOWeekNumber(now);
  const currentISOY  = getISOWeekYear(now);
  const displayYear  = now.getFullYear();
  const totalWeeks   = getTotalISOWeeks(displayYear);

  document.getElementById('wn-table-year').textContent = displayYear;

  const tbody = document.getElementById('wn-table-body');
  tbody.innerHTML = '';

  for (let w = 1; w <= totalWeeks; w++) {
    const monday = getMondayOfISOWeek(w, displayYear);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    const isCurrent = w === currentWeek && displayYear === currentISOY;

    const tr = document.createElement('tr');
    if (isCurrent) tr.classList.add('wn-current-row');

    tr.innerHTML = `
      <td>Week ${w}${isCurrent ? '<span class="wn-badge">Now</span>' : ''}</td>
      <td>${formatDate(monday)}</td>
      <td>${formatDate(sunday)}</td>`;

    tbody.appendChild(tr);
  }
}

// ── Copy code buttons ───────────────────────────────────────────

function copyCode(btn) {
  const code = btn.parentElement.querySelector('code').textContent;
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = code;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
  });
}

// ── Init ────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  updateCurrentWeek();
  buildWeekTable();
});