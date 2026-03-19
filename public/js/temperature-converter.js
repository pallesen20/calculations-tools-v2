const UNITS = {
  celsius:    { label: 'Celsius',    symbol: '°C'  },
  fahrenheit: { label: 'Fahrenheit', symbol: '°F'  },
  kelvin:     { label: 'Kelvin',     symbol: 'K'   },
  rankine:    { label: 'Rankine',    symbol: '°R'  },
  reaumur:    { label: 'Réaumur',    symbol: '°Ré' },
};

const QUICK = [
  { from: 'celsius',    to: 'fahrenheit', label: '°C → °F' },
  { from: 'fahrenheit', to: 'celsius',    label: '°F → °C' },
  { from: 'celsius',    to: 'kelvin',     label: '°C → K'  },
  { from: 'kelvin',     to: 'celsius',    label: 'K → °C'  },
];

const COMMON_VALUES = {
  celsius:    [-40, -20, 0, 20, 25, 37, 100, 200],
  fahrenheit: [-40, 0, 32, 68, 77, 98.6, 212, 392],
  kelvin:     [0, 233.15, 273.15, 293.15, 298.15, 310.15, 373.15, 473.15],
  rankine:    [0, 419.67, 491.67, 527.67, 536.67, 558.27, 671.67, 851.67],
  reaumur:    [-32, -16, 0, 16, 20, 29.6, 80, 160],
};

function toCelsius(value, from) {
  switch (from) {
    case 'celsius':    return value;
    case 'fahrenheit': return (value - 32) * 5 / 9;
    case 'kelvin':     return value - 273.15;
    case 'rankine':    return (value - 491.67) * 5 / 9;
    case 'reaumur':    return value * 5 / 4;
  }
}

function fromCelsius(c, to) {
  switch (to) {
    case 'celsius':    return c;
    case 'fahrenheit': return (c * 9 / 5) + 32;
    case 'kelvin':     return c + 273.15;
    case 'rankine':    return (c + 273.15) * 9 / 5;
    case 'reaumur':    return c * 4 / 5;
  }
}

function convert(value, from, to) {
  if (from === to) return value;
  return fromCelsius(toCelsius(value, from), to);
}

function fmt(num) {
  if (Math.abs(num) < 0.01 && num !== 0) return num.toExponential(2);
  if (Math.abs(num) < 1) return num.toFixed(4);
  if (Math.abs(num) < 1000) return num.toFixed(2);
  return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function populate(selectEl, defaultVal) {
  selectEl.innerHTML = Object.entries(UNITS)
    .map(([k, u]) => `<option value="${k}"${k === defaultVal ? ' selected' : ''}>${u.label} (${u.symbol})</option>`)
    .join('');
}

function renderQuick() {
  document.getElementById('tc-quick').innerHTML = QUICK.map(q => `
    <button class="lc-quick-btn" data-from="${q.from}" data-to="${q.to}">${q.label}</button>
  `).join('');
}

function renderCommon(fromKey) {
  const values = COMMON_VALUES[fromKey];
  const targets = Object.keys(UNITS).filter(k => k !== fromKey).slice(0, 4);
  const rows = [];

  for (const val of values) {
    for (const target of targets) {
      if (rows.length >= 8) break;
      const result = convert(val, fromKey, target);
      rows.push(`
        <div class="tc-common-card">
          <div class="tc-common-from">${fmt(val)} ${UNITS[fromKey].symbol}</div>
          <div class="tc-common-eq">=</div>
          <div class="tc-common-to">${fmt(result)} ${UNITS[target].symbol}</div>
        </div>
      `);
    }
    if (rows.length >= 8) break;
  }

  document.getElementById('tc-common-title').textContent = `Common ${UNITS[fromKey].label} conversions`;
  document.getElementById('tc-common').innerHTML = rows.join('');
}

function update() {
  const value   = parseFloat(document.getElementById('tc-value').value.replace(",",".")) || 0;
  const fromKey = document.getElementById('tc-from').value;
  const toKey   = document.getElementById('tc-to').value;
  const result  = convert(value, fromKey, toKey);

  document.getElementById('tc-result').textContent      = `${fmt(result)} ${UNITS[toKey].symbol}`;
  document.getElementById('tc-result-desc').textContent = `${fmt(value)} ${UNITS[fromKey].symbol} = ${fmt(result)} ${UNITS[toKey].symbol}`;
  renderCommon(fromKey);
}

document.addEventListener('DOMContentLoaded', () => {
  const fromEl  = document.getElementById('tc-from');
  const toEl    = document.getElementById('tc-to');
  const valueEl = document.getElementById('tc-value');

  populate(fromEl, 'celsius');
  populate(toEl, 'fahrenheit');
  renderQuick();

  valueEl.addEventListener('input', update);
  fromEl.addEventListener('change', update);
  toEl.addEventListener('change', update);

  document.getElementById('tc-swap').addEventListener('click', () => {
    const tmp = fromEl.value;
    fromEl.value = toEl.value;
    toEl.value = tmp;
    update();
  });

  document.getElementById('tc-quick').addEventListener('click', e => {
    const btn = e.target.closest('.lc-quick-btn');
    if (!btn) return;
    fromEl.value = btn.dataset.from;
    toEl.value   = btn.dataset.to;
    update();
    document.getElementById('tc-calculator').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  update();
});