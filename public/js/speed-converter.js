const UNITS = {
  kilometer_per_hour:   { label: 'Kilometer per hour',  abbr: 'km/h',   factor: 1 / 3.6 },
  mile_per_hour:        { label: 'Mile per hour',        abbr: 'mph',    factor: 0.44704 },
  meter_per_second:     { label: 'Meter per second',     abbr: 'm/s',    factor: 1 },
  knot:                 { label: 'Knot',                 abbr: 'kn',     factor: 1852 / 3600 },
  foot_per_second:      { label: 'Foot per second',      abbr: 'ft/s',   factor: 0.3048 },
  foot_per_minute:      { label: 'Foot per minute',      abbr: 'ft/min', factor: 0.3048 / 60 },
  meter_per_minute:     { label: 'Meter per minute',     abbr: 'm/min',  factor: 1 / 60 },
  kilometer_per_second: { label: 'Kilometer per second', abbr: 'km/s',   factor: 1000 },
  mile_per_second:      { label: 'Mile per second',      abbr: 'mi/s',   factor: 1609.344 },
  speed_of_light:       { label: 'Speed of light',       abbr: 'c',      factor: 299792458 },
};

const QUICK = [
  { from: 'kilometer_per_hour', to: 'mile_per_hour',        label: 'km/h to mph' },
  { from: 'mile_per_hour',      to: 'kilometer_per_hour',   label: 'mph to km/h' },
  { from: 'meter_per_second',   to: 'kilometer_per_hour',   label: 'm/s to km/h' },
  { from: 'kilometer_per_hour', to: 'meter_per_second',     label: 'km/h to m/s' },
  { from: 'knot',               to: 'mile_per_hour',        label: 'Knots to mph' },
  { from: 'mile_per_hour',      to: 'knot',                 label: 'mph to Knots' },
  { from: 'foot_per_second',    to: 'meter_per_second',     label: 'ft/s to m/s' },
  { from: 'meter_per_second',   to: 'foot_per_second',      label: 'm/s to ft/s' },
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
  document.getElementById('spd-quick').innerHTML = QUICK.map(q =>
    `<button class="spd-quick-btn" data-from="${q.from}" data-to="${q.to}">${q.label}</button>`
  ).join('');
}

function renderCommon(value, fromKey) {
  const val = value || 1;
  const rows = Object.entries(UNITS)
    .filter(([k]) => k !== fromKey)
    .slice(0, 8)
    .map(([k, u]) => {
      const result = convert(val, fromKey, k);
      return `<div class="spd-common-row">
        <span>${u.label} (${u.abbr})</span>
        <span class="spd-common-val">${fmt(result)}</span>
      </div>`;
    }).join('');
  document.getElementById('spd-common-title').textContent =
    `Common ${UNITS[fromKey].label} conversions`;
  document.getElementById('spd-common').innerHTML = rows;
}

function update() {
  const value    = parseFloat(document.getElementById('spd-value').value) || 0;
  const fromKey  = document.getElementById('spd-from').value;
  const toKey    = document.getElementById('spd-to').value;
  const result   = convert(value, fromKey, toKey);
  const fromAbbr = UNITS[fromKey].abbr;
  const toAbbr   = UNITS[toKey].abbr;

  document.getElementById('spd-result').textContent      = `${fmt(result)} ${toAbbr}`;
  document.getElementById('spd-result-desc').textContent = `${value} ${fromAbbr} = ${fmt(result)} ${toAbbr}`;
  renderCommon(value, fromKey);
}

document.addEventListener('DOMContentLoaded', () => {
  const fromEl  = document.getElementById('spd-from');
  const toEl    = document.getElementById('spd-to');
  const valueEl = document.getElementById('spd-value');

  populate(fromEl, 'kilometer_per_hour');
  populate(toEl, 'mile_per_hour');
  renderQuick();

  valueEl.addEventListener('input', update);
  fromEl.addEventListener('change', update);
  toEl.addEventListener('change', update);

  document.getElementById('spd-swap').addEventListener('click', () => {
    const tmp = fromEl.value;
    fromEl.value = toEl.value;
    toEl.value = tmp;
    update();
  });

  document.getElementById('spd-quick').addEventListener('click', e => {
    const btn = e.target.closest('.spd-quick-btn');
    if (!btn) return;
    fromEl.value = btn.dataset.from;
    toEl.value   = btn.dataset.to;
    update();
    document.getElementById('spd-calculator').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  update();
});
