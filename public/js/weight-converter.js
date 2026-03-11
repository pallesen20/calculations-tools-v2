const UNITS = {
  mg:     { label: 'Milligram',   abbr: 'mg',       factor: 1000000 },
  g:      { label: 'Gram',        abbr: 'g',         factor: 1000 },
  kg:     { label: 'Kilogram',    abbr: 'kg',        factor: 1 },
  t:      { label: 'Metric Ton',  abbr: 't',         factor: 0.001 },
  oz:     { label: 'Ounce',       abbr: 'oz',        factor: 35.274 },
  lb:     { label: 'Pound',       abbr: 'lbs',       factor: 2.20462 },
  st:     { label: 'Stone',       abbr: 'st',        factor: 0.157473 },
  ton_us: { label: 'US Ton',      abbr: 'US tons',   factor: 0.00110231 },
  ton_uk: { label: 'Long Ton',    abbr: 'long tons', factor: 0.000984207 },
};

const QUICK = [
  { from: 'kg', to: 'lb',  label: 'KG → LBS' },
  { from: 'lb', to: 'kg',  label: 'LBS → KG' },
  { from: 'g',  to: 'oz',  label: 'G → OZ' },
  { from: 'oz', to: 'g',   label: 'OZ → G' },
];

function convert(value, from, to) {
  const inKg = value / UNITS[from].factor;
  return inKg * UNITS[to].factor;
}

function fmt(num) {
  if (num === 0) return '0';
  if (Math.abs(num) < 0.01) return num.toExponential(3);
  if (Math.abs(num) < 1) return parseFloat(num.toFixed(4)).toString();
  if (Math.abs(num) < 1000) return parseFloat(num.toFixed(2)).toString();
  return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function populate(selectEl, defaultVal) {
  selectEl.innerHTML = Object.entries(UNITS)
    .map(([k, u]) => `<option value="${k}"${k === defaultVal ? ' selected' : ''}>${u.label} (${u.abbr})</option>`)
    .join('');
}

function renderQuick() {
  document.getElementById('wt-quick').innerHTML = QUICK.map(q => `
    <button class="lc-quick-btn" data-from="${q.from}" data-to="${q.to}">${q.label}</button>
  `).join('');
}

function renderCommon(fromKey) {
  const value = parseFloat(document.getElementById('wt-value').value) || 1; // ← was hardcoded 1
  const rows = Object.entries(UNITS)
    .filter(([k]) => k !== fromKey)
    .slice(0, 8)
    .map(([k, u]) => {
      const result = convert(value, fromKey, k);
      return `
        <div class="lc-common-row">
          <span>${u.label} (${u.abbr})</span>
          <span class="lc-common-val">${fmt(result)}</span>
        </div>`;
    }).join('');
  document.getElementById('wt-common-title').textContent =
    `Common ${UNITS[fromKey].label} conversions`;
  document.getElementById('wt-common').innerHTML = rows;
}

function update() {
  const value   = parseFloat(document.getElementById('wt-value').value) || 0;
  const fromKey = document.getElementById('wt-from').value;
  const toKey   = document.getElementById('wt-to').value;
  const result  = convert(value, fromKey, toKey);

  document.getElementById('wt-result').textContent      = `${fmt(result)} ${UNITS[toKey].abbr}`;
  document.getElementById('wt-result-desc').textContent = `${value} ${UNITS[fromKey].abbr} = ${fmt(result)} ${UNITS[toKey].abbr}`;
  renderCommon(fromKey);
}

document.addEventListener('DOMContentLoaded', () => {
  const fromEl  = document.getElementById('wt-from');
  const toEl    = document.getElementById('wt-to');
  const valueEl = document.getElementById('wt-value');

  populate(fromEl, 'kg');
  populate(toEl, 'lb');
  renderQuick();

  valueEl.addEventListener('input', update);
  fromEl.addEventListener('change', update);
  toEl.addEventListener('change', update);

  document.getElementById('wt-swap').addEventListener('click', () => {
    const tmp = fromEl.value;
    fromEl.value = toEl.value;
    toEl.value = tmp;
    update();
  });

  document.getElementById('wt-quick').addEventListener('click', e => {
    const btn = e.target.closest('.lc-quick-btn');
    if (!btn) return;
    fromEl.value = btn.dataset.from;
    toEl.value   = btn.dataset.to;
    update();
    document.getElementById('wt-calculator').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  update();
});