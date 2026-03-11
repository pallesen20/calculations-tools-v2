const UNITS = {
  meter:        { label: 'Meter',         abbr: 'm',   factor: 1 },
  kilometer:    { label: 'Kilometer',     abbr: 'km',  factor: 1000 },
  centimeter:   { label: 'Centimeter',    abbr: 'cm',  factor: 0.01 },
  millimeter:   { label: 'Millimeter',    abbr: 'mm',  factor: 0.001 },
  micrometer:   { label: 'Micrometer',    abbr: 'μm',  factor: 0.000001 },
  nanometer:    { label: 'Nanometer',     abbr: 'nm',  factor: 0.000000001 },
  foot:         { label: 'Foot',          abbr: 'ft',  factor: 0.3048 },
  inch:         { label: 'Inch',          abbr: 'in',  factor: 0.0254 },
  yard:         { label: 'Yard',          abbr: 'yd',  factor: 0.9144 },
  mile:         { label: 'Mile',          abbr: 'mi',  factor: 1609.344 },
  nautical_mile:{ label: 'Nautical Mile', abbr: 'nmi', factor: 1852 },
  furlong:      { label: 'Furlong',       abbr: 'fur', factor: 201.168 },
  fathom:       { label: 'Fathom',        abbr: 'ftm', factor: 1.8288 },
};

const QUICK = [
  { from: 'meter',      to: 'foot',       label: 'Meters to Feet' },
  { from: 'foot',       to: 'meter',      label: 'Feet to Meters' },
  { from: 'inch',       to: 'centimeter', label: 'Inches to Centimeters' },
  { from: 'centimeter', to: 'inch',       label: 'Centimeters to Inches' },
  { from: 'kilometer',  to: 'mile',       label: 'Kilometers to Miles' },
  { from: 'mile',       to: 'kilometer',  label: 'Miles to Kilometers' },
  { from: 'yard',       to: 'meter',      label: 'Yards to Meters' },
  { from: 'meter',      to: 'yard',       label: 'Meters to Yards' },
];

function convert(value, from, to) {
  return (value * UNITS[from].factor) / UNITS[to].factor;
}

function fmt(num) {
  if (num === 0) return '0';
  if (Math.abs(num) < 0.000001) return num.toExponential(4);
  return parseFloat(num.toPrecision(8)).toLocaleString(undefined, { maximumFractionDigits: 8 });
}

function populate(selectEl, defaultVal) {
  selectEl.innerHTML = Object.entries(UNITS)
    .map(([k, u]) => `<option value="${k}"${k === defaultVal ? ' selected' : ''}>${u.label} (${u.abbr})</option>`)
    .join('');
}

function renderQuick() {
  document.getElementById('lc-quick').innerHTML = QUICK.map(q => `
    <button class="lc-quick-btn" data-from="${q.from}" data-to="${q.to}">${q.label}</button>
  `).join('');
}

function renderCommon(value, fromKey) {
  const val = value || 1;
  const rows = Object.entries(UNITS)
    .filter(([k]) => k !== fromKey)
    .slice(0, 8)
    .map(([k, u]) => {
      const result = convert(val, fromKey, k);
      return `
        <div class="lc-common-row">
          <span>${u.label} (${u.abbr})</span>
          <span class="lc-common-val">${fmt(result)}</span>
        </div>`;
    }).join('');
  document.getElementById('lc-common-title').textContent =
    `Common ${UNITS[fromKey].label} conversions`;
  document.getElementById('lc-common').innerHTML = rows;
}

function update() {
  const value    = parseFloat(document.getElementById('lc-value').value) || 0;
  const fromKey  = document.getElementById('lc-from').value;
  const toKey    = document.getElementById('lc-to').value;
  const result   = convert(value, fromKey, toKey);
  const fromAbbr = UNITS[fromKey].abbr;
  const toAbbr   = UNITS[toKey].abbr;

  document.getElementById('lc-result').textContent       = `${fmt(result)} ${toAbbr}`;
  document.getElementById('lc-result-desc').textContent  = `${value} ${fromAbbr} = ${fmt(result)} ${toAbbr}`;
  renderCommon(value, fromKey);
}

document.addEventListener('DOMContentLoaded', () => {
  const fromEl  = document.getElementById('lc-from');
  const toEl    = document.getElementById('lc-to');
  const valueEl = document.getElementById('lc-value');

  populate(fromEl, 'meter');
  populate(toEl, 'foot');
  renderQuick();

  valueEl.addEventListener('input', update);
  fromEl.addEventListener('change', update);
  toEl.addEventListener('change', update);

  document.getElementById('lc-swap').addEventListener('click', () => {
    const tmp = fromEl.value;
    fromEl.value = toEl.value;
    toEl.value = tmp;
    update();
  });

  document.getElementById('lc-quick').addEventListener('click', e => {
    const btn = e.target.closest('.lc-quick-btn');
    if (!btn) return;
    fromEl.value = btn.dataset.from;
    toEl.value   = btn.dataset.to;
    update();
    document.getElementById('lc-calculator').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  update();
});