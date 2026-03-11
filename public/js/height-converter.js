const UNITS = {
  cm:    { label: 'Centimeter',      abbr: 'cm',     factor: 0.01 },
  m:     { label: 'Meter',           abbr: 'm',      factor: 1 },
  in:    { label: 'Inch',            abbr: 'in',     factor: 0.0254 },
  ft:    { label: 'Foot (decimal)',  abbr: 'ft',     factor: 0.3048 },
  ft_in: { label: 'Feet & Inches',   abbr: 'ft+in',  factor: null },
};

const QUICK = [
  { from: 'cm',    to: 'ft_in', label: 'cm to ft+in' },
  { from: 'ft_in', to: 'cm',   label: 'ft+in to cm' },
  { from: 'cm',    to: 'in',   label: 'cm to inches' },
  { from: 'in',    to: 'cm',   label: 'inches to cm' },
  { from: 'm',     to: 'ft',   label: 'm to feet' },
  { from: 'ft',    to: 'm',    label: 'feet to m' },
];

function toMeters(value, inPart, unitKey) {
  if (unitKey === 'ft_in') {
    const totalInches = (value * 12) + (inPart || 0);
    return totalInches * 0.0254;
  }
  return value * UNITS[unitKey].factor;
}

function fromMeters(meters, unitKey) {
  if (unitKey === 'ft_in') {
    const totalIn = meters / 0.0254;
    const feet = Math.floor(totalIn / 12);
    const inches = Math.round((totalIn - feet * 12) * 10) / 10;
    return { feet, inches };
  }
  return meters / UNITS[unitKey].factor;
}

function fmt(n) {
  if (n === 0) return '0';
  return parseFloat(n.toPrecision(6)).toLocaleString(undefined, { maximumFractionDigits: 4 });
}

function populateSelects(fromEl, toEl) {
  const options = Object.entries(UNITS)
    .map(([k, u]) => `<option value="${k}">${u.label} (${u.abbr})</option>`)
    .join('');
  fromEl.innerHTML = options;
  toEl.innerHTML = options;
  fromEl.value = 'cm';
  toEl.value = 'ft_in';
}

function renderQuick() {
  document.getElementById('hc-quick').innerHTML = QUICK.map(q =>
    `<button class="lc-quick-btn" data-from="${q.from}" data-to="${q.to}">${q.label}</button>`
  ).join('');
}

function renderCommon(meters) {
  const rows = Object.entries(UNITS).map(([k, u]) => {
    let valStr;
    if (k === 'ft_in') {
      const { feet, inches } = fromMeters(meters, 'ft_in');
      valStr = `${feet} ft ${inches} in`;
    } else {
      valStr = `${fmt(meters / u.factor)} ${u.abbr}`;
    }
    return `
      <div class="lc-common-row">
        <span>${u.label}</span>
        <span class="lc-common-val">${valStr}</span>
      </div>`;
  }).join('');
  document.getElementById('hc-common-title').textContent = 'This height in all units';
  document.getElementById('hc-common').innerHTML = rows;
}

function updateInPartVisibility(fromKey) {
  const inPart = document.getElementById('hc-in-part');
  const valueLabel = document.querySelector('label[for="hc-value"]');
  const valueInput = document.getElementById('hc-value');
  if (fromKey === 'ft_in') {
    inPart.style.display = '';
    if (valueLabel) valueLabel.textContent = 'Feet';
    valueInput.placeholder = 'ft';
  } else {
    inPart.style.display = 'none';
    if (valueLabel) valueLabel.textContent = 'Value';
    valueInput.placeholder = 'Enter value';
  }
}

function update() {
  const valueEl  = document.getElementById('hc-value');
  const inPartEl = document.getElementById('hc-in-part');
  const fromEl   = document.getElementById('hc-from');
  const toEl     = document.getElementById('hc-to');
  const resultEl = document.getElementById('hc-result');
  const descEl   = document.getElementById('hc-result-desc');

  const value   = parseFloat(valueEl.value) || 0;
  const inPart  = parseFloat(inPartEl.value) || 0;
  const fromKey = fromEl.value;
  const toKey   = toEl.value;

  const meters = toMeters(value, inPart, fromKey);

  let resultStr, descStr;

  if (toKey === 'ft_in') {
    const { feet, inches } = fromMeters(meters, 'ft_in');
    resultStr = `${feet} ft ${inches} in`;
  } else {
    const result = fromMeters(meters, toKey);
    resultStr = `${fmt(result)} ${UNITS[toKey].abbr}`;
  }

  const fromLabel = fromKey === 'ft_in'
    ? `${value} ft ${inPart} in`
    : `${value} ${UNITS[fromKey].abbr}`;

  descStr = `${fromLabel} = ${resultStr}`;

  resultEl.textContent = resultStr;
  descEl.textContent   = descStr;

  renderCommon(meters);
}

document.addEventListener('DOMContentLoaded', () => {
  const fromEl   = document.getElementById('hc-from');
  const toEl     = document.getElementById('hc-to');
  const valueEl  = document.getElementById('hc-value');
  const inPartEl = document.getElementById('hc-in-part');

  populateSelects(fromEl, toEl);
  renderQuick();

  // Hide inches part input initially (to=ft_in, from=cm)
  inPartEl.style.display = 'none';

  valueEl.addEventListener('input', update);
  inPartEl.addEventListener('input', update);

  fromEl.addEventListener('change', () => {
    updateInPartVisibility(fromEl.value);
    update();
  });

  toEl.addEventListener('change', update);

  document.getElementById('hc-swap').addEventListener('click', () => {
    const tmp = fromEl.value;
    fromEl.value = toEl.value;
    toEl.value = tmp;

    // If swapping in the inches value too
    if (fromEl.value === 'ft_in') {
      // try to parse current result as ft+in back into inputs
      const resultText = document.getElementById('hc-result').textContent;
      const match = resultText.match(/^(\d+)\s*ft\s*([\d.]+)\s*in/);
      if (match) {
        valueEl.value  = match[1];
        inPartEl.value = match[2];
      }
    } else if (toEl.value === 'ft_in') {
      inPartEl.value = '';
    }

    updateInPartVisibility(fromEl.value);
    update();
  });

  document.getElementById('hc-quick').addEventListener('click', e => {
    const btn = e.target.closest('.lc-quick-btn');
    if (!btn) return;
    fromEl.value = btn.dataset.from;
    toEl.value   = btn.dataset.to;
    updateInPartVisibility(fromEl.value);
    update();
    document.getElementById('hc-calculator').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  update();
});
