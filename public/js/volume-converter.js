const UNITS = {
  ml:     { label: 'Milliliter',    abbr: 'ml',      factor: 1 },
  L:      { label: 'Liter',         abbr: 'L',        factor: 0.001 },
  fl_oz:  { label: 'Fluid Ounce',   abbr: 'fl oz',    factor: 0.033814 },
  cup:    { label: 'Cup',           abbr: 'cups',     factor: 0.00422675 },
  tbsp:   { label: 'Tablespoon',    abbr: 'tbsp',     factor: 0.067628 },
  tsp:    { label: 'Teaspoon',      abbr: 'tsp',      factor: 0.202884 },
  pint:   { label: 'Pint',          abbr: 'pt',       factor: 0.0021134 },
  gallon: { label: 'Gallon',        abbr: 'gal',      factor: 0.000264172 },
};

const QUICK = [
  { from: 'ml',    to: 'L',      label: 'ML → L' },
  { from: 'fl_oz', to: 'ml',     label: 'FL OZ → ML' },
  { from: 'cup',   to: 'ml',     label: 'CUPS → ML' },
  { from: 'L',     to: 'gallon', label: 'L → GAL' },
];

function convert(value, from, to) {
  const inMl = value / UNITS[from].factor;
  return inMl * UNITS[to].factor;
}

function fmt(num) {
  if (num === 0) return '0';
  if (Math.abs(num) < 0.001) return num.toExponential(3);
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
  document.getElementById('vc-quick').innerHTML = QUICK.map(q => `
    <button class="lc-quick-btn" data-from="${q.from}" data-to="${q.to}">${q.label}</button>
  `).join('');
}

function renderCommon(fromKey) {
  const value = parseFloat(document.getElementById('vc-value').value.replace(',', '.')) || 1;
  const rows = Object.entries(UNITS)
    .filter(([k]) => k !== fromKey)
    .slice(0, 7)
    .map(([k, u]) => {
      const result = convert(value, fromKey, k);
      return `
        <div class="lc-common-row">
          <span>${u.label} (${u.abbr})</span>
          <span class="lc-common-val">${fmt(result)}</span>
        </div>`;
    }).join('');
  document.getElementById('vc-common-title').textContent =
    `Common ${UNITS[fromKey].label} conversions`;
  document.getElementById('vc-common').innerHTML = rows;
}

function update() {
  const value   = parseFloat(document.getElementById('vc-value').value.replace(',', '.')) || 0;
  const fromKey = document.getElementById('vc-from').value;
  const toKey   = document.getElementById('vc-to').value;
  const result  = convert(value, fromKey, toKey);

  document.getElementById('vc-result').textContent      = `${fmt(result)} ${UNITS[toKey].abbr}`;
  document.getElementById('vc-result-desc').textContent = `${value} ${UNITS[fromKey].abbr} = ${fmt(result)} ${UNITS[toKey].abbr}`;
  renderCommon(fromKey);
}

document.addEventListener('DOMContentLoaded', () => {
  const fromEl  = document.getElementById('vc-from');
  const toEl    = document.getElementById('vc-to');
  const valueEl = document.getElementById('vc-value');

  populate(fromEl, 'ml');
  populate(toEl, 'L');
  renderQuick();

  valueEl.addEventListener('input', update);
  fromEl.addEventListener('change', update);
  toEl.addEventListener('change', update);

  document.getElementById('vc-swap').addEventListener('click', () => {
    const tmp = fromEl.value;
    fromEl.value = toEl.value;
    toEl.value = tmp;
    update();
  });

  document.getElementById('vc-quick').addEventListener('click', e => {
    const btn = e.target.closest('.lc-quick-btn');
    if (!btn) return;
    fromEl.value = btn.dataset.from;
    toEl.value   = btn.dataset.to;
    update();
    document.getElementById('vc-calculator').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  update();
});
