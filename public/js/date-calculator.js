const MS_PER_DAY = 86400000;

function parseLocalDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function pad(n) { return String(n).padStart(2, '0'); }

function toInputVal(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function formatDateLong(d) {
  const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function isoWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / MS_PER_DAY) + 1) / 7);
}

// Count Mon-Fri days in [start, end) — end is exclusive.
// Jan 1 (Mon) to Jan 8 (Mon) = 5 workdays.
function countWorkdays(start, end) {
  const totalDays = Math.round((end - start) / MS_PER_DAY);
  if (totalDays <= 0) return 0;
  const startDay  = (start.getDay() + 6) % 7; // Mon=0 … Sun=6
  const fullWeeks = Math.floor(totalDays / 7);
  const rem       = totalDays % 7;
  let remWork = 0;
  for (let i = 0; i < rem; i++) {
    if ((startDay + i) % 7 < 5) remWork++;
  }
  return fullWeeks * 5 + remWork;
}

// Exact years / months / days between two dates (start <= end).
function dateComponents(start, end) {
  let y = end.getFullYear() - start.getFullYear();
  let m = end.getMonth()    - start.getMonth();
  let d = end.getDate()     - start.getDate();
  if (d < 0) {
    m--;
    const daysInStartMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
    d += daysInStartMonth;
  }
  if (m < 0) { y--; m += 12; }
  return { y, m, d };
}

document.addEventListener('DOMContentLoaded', () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const future = new Date(today);
  future.setDate(today.getDate() + 30);

  // ── Tab switching ────────────────────────────────────────────
  document.querySelectorAll('.dc-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.dc-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.dc-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.panel).classList.add('active');
    });
  });

  // ── Panel 1: Date Difference ─────────────────────────────────
  const date1In = document.getElementById('dc-date1');
  const date2In = document.getElementById('dc-date2');
  date1In.value = toInputVal(today);
  date2In.value = toInputVal(future);

  function updateDiff() {
    if (!date1In.value || !date2In.value) return;
    const d1 = parseLocalDate(date1In.value);
    const d2 = parseLocalDate(date2In.value);
    const [start, end] = d1 <= d2 ? [d1, d2] : [d2, d1];

    const totalDays = Math.round((end - start) / MS_PER_DAY);
    const weeks     = Math.floor(totalDays / 7);
    const remD      = totalDays % 7;
    const wkStr     = remD ? `${weeks} wk ${remD} d` : `${weeks} wk`;
    const workdays  = countWorkdays(start, end);
    const comp      = dateComponents(start, end);

    const ymdParts = [];
    if (comp.y) ymdParts.push(`${comp.y}y`);
    if (comp.m) ymdParts.push(`${comp.m}m`);
    ymdParts.push(`${comp.d}d`);

    document.getElementById('dc-stat-days').textContent     = totalDays.toLocaleString();
    document.getElementById('dc-stat-weeks').textContent    = wkStr;
    document.getElementById('dc-stat-workdays').textContent = workdays.toLocaleString();
    document.getElementById('dc-stat-ymd').textContent      = ymdParts.join(' ');
    document.getElementById('dc-stat-hours').textContent    = (totalDays * 24).toLocaleString();
    document.getElementById('dc-stat-minutes').textContent  = (totalDays * 1440).toLocaleString();
    document.getElementById('dc-diff-dir').textContent      =
      `${formatDateLong(start)} \u2192 ${formatDateLong(end)}`;
    document.getElementById('dc-diff-result').classList.remove('hidden');
  }

  date1In.addEventListener('change', updateDiff);
  date2In.addEventListener('change', updateDiff);

  document.getElementById('dc-swap').addEventListener('click', () => {
    [date1In.value, date2In.value] = [date2In.value, date1In.value];
    updateDiff();
  });
  document.getElementById('dc-today1').addEventListener('click', () => {
    date1In.value = toInputVal(today); updateDiff();
  });
  document.getElementById('dc-today2').addEventListener('click', () => {
    date2In.value = toInputVal(today); updateDiff();
  });

  updateDiff();

  // ── Panel 2: Add / Subtract ──────────────────────────────────
  const addDateIn = document.getElementById('dc-add-date');
  const addDaysIn = document.getElementById('dc-add-days');
  const addModeIn = document.getElementById('dc-add-mode');
  addDateIn.value = toInputVal(today);
  addDaysIn.value = '30';

  function updateAdd() {
    if (!addDateIn.value) return;
    const n = parseInt(addDaysIn.value.replace(",","."), 10);
    if (isNaN(n) || n < 0) return;

    const base  = parseLocalDate(addDateIn.value);
    const delta = addModeIn.value === 'sub' ? -n : n;
    const result = new Date(base);
    result.setDate(result.getDate() + delta);

    const wk = isoWeek(result);
    const daysFromToday = Math.round((result - today) / MS_PER_DAY);

    let fromTodayStr;
    if (daysFromToday === 0) {
      fromTodayStr = 'Today';
    } else if (daysFromToday > 0) {
      fromTodayStr = `In ${daysFromToday.toLocaleString()} day${daysFromToday === 1 ? '' : 's'}`;
    } else {
      const abs = Math.abs(daysFromToday);
      fromTodayStr = `${abs.toLocaleString()} day${abs === 1 ? '' : 's'} ago`;
    }

    document.getElementById('dc-add-result-date').textContent       = formatDateLong(result);
    document.getElementById('dc-add-result-week').textContent       = `ISO week ${wk}, ${result.getFullYear()}`;
    document.getElementById('dc-add-result-from-today').textContent = fromTodayStr;
    document.getElementById('dc-add-result').classList.remove('hidden');
  }

  addDateIn.addEventListener('change', updateAdd);
  addDaysIn.addEventListener('input',  updateAdd);
  addModeIn.addEventListener('change', updateAdd);
  document.getElementById('dc-add-today').addEventListener('click', () => {
    addDateIn.value = toInputVal(today); updateAdd();
  });

  updateAdd();
});
