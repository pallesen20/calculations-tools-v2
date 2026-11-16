const UNITS = {
  second: { label: 'Second', abbr: 's',   factor: 1 },
  minute: { label: 'Minute', abbr: 'min', factor: 60 },
  hour:   { label: 'Hour',   abbr: 'hr',  factor: 3600 },
  day:    { label: 'Day',    abbr: 'd',   factor: 86400 },
  week:   { label: 'Week',   abbr: 'wk',  factor: 604800 },
};

const QUICK = [
  { from: 'hour',   to: 'day',    label: 'Hours to days' },
  { from: 'day',    to: 'hour',   label: 'Days to hours' },
  { from: 'minute', to: 'hour',   label: 'Minutes to hours' },
  { from: 'hour',   to: 'minute', label: 'Hours to minutes' },
  { from: 'day',    to: 'minute', label: 'Days to minutes' },
  { from: 'week',   to: 'day',    label: 'Weeks to days' },
];

function convert(value, from, to) {
  return (value * UNITS[from].factor) / UNITS[to].factor;
}

function fmt(num) {
  if (num === 0) return '0';
  if (!isFinite(num)) return '-';
  if (Math.abs(num) >= 1e9) return num.toExponential(3);
  const abs = Math.abs(num);
  const decimals = abs >= 1000 ? 2 : abs >= 100 ? 3 : abs >= 10 ? 4 : abs >= 1 ? 5 : 6;
  return parseFloat(num.toFixed(decimals)).toLocaleString(undefined, { maximumFractionDigits: decimals });
}

function populate(selectEl, defaultVal) {
  selectEl.innerHTML = Object.entries(UNITS)
    .map(([k, u]) => `<option value="${k}"${k === defaultVal ? ' selected' : ''}>${u.label}</option>`)
    .join('');
}

function renderQuick() {
  document.getElementById('htd-quick').innerHTML = QUICK.map(q =>
    `<button class="htd-quick-btn" data-from="${q.from}" data-to="${q.to}">${q.label}</button>`
  ).join('');
}

function renderCommon(value, fromKey) {
  const val = value || 1;
  const rows = Object.entries(UNITS)
    .filter(([k]) => k !== fromKey)
    .map(([k, u]) => {
      const result = convert(val, fromKey, k);
      return `<div class="htd-common-row">
        <span>${u.label} (${u.abbr})</span>
        <span class="htd-common-val">${fmt(result)}</span>
      </div>`;
    }).join('');
  document.getElementById('htd-common-title').textContent =
    `${val} ${UNITS[fromKey].label}${val !== 1 ? 's' : ''} in other units`;
  document.getElementById('htd-common').innerHTML = rows;
}

function update() {
  const value   = parseFloat(document.getElementById('htd-value').value) || 0;
  const fromKey = document.getElementById('htd-from').value;
  const toKey   = document.getElementById('htd-to').value;
  const result  = convert(value, fromKey, toKey);
  const fromAbbr = UNITS[fromKey].abbr;
  const toAbbr   = UNITS[toKey].abbr;

  document.getElementById('htd-result').textContent      = `${fmt(result)} ${toAbbr}`;
  document.getElementById('htd-result-desc').textContent = `${value} ${fromAbbr} = ${fmt(result)} ${toAbbr}`;
  renderCommon(value, fromKey);
}

document.addEventListener('DOMContentLoaded', () => {
  const fromEl  = document.getElementById('htd-from');
  const toEl    = document.getElementById('htd-to');
  const valueEl = document.getElementById('htd-value');

  populate(fromEl, 'hour');
  populate(toEl, 'day');
  renderQuick();

  valueEl.addEventListener('input', update);
  fromEl.addEventListener('change', update);
  toEl.addEventListener('change', update);

  document.getElementById('htd-swap').addEventListener('click', () => {
    const tmp = fromEl.value;
    fromEl.value = toEl.value;
    toEl.value = tmp;
    update();
  });

  document.getElementById('htd-quick').addEventListener('click', e => {
    const btn = e.target.closest('.htd-quick-btn');
    if (!btn) return;
    fromEl.value = btn.dataset.from;
    toEl.value   = btn.dataset.to;
    update();
    document.getElementById('htd-calculator').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  update();
});
