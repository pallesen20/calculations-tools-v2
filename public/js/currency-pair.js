const CURRENCIES = {
  USD:'US Dollar',EUR:'Euro',GBP:'British Pound',JPY:'Japanese Yen',
  AUD:'Australian Dollar',CAD:'Canadian Dollar',CHF:'Swiss Franc',CNY:'Chinese Yuan',
  SEK:'Swedish Krona',NZD:'New Zealand Dollar',MXN:'Mexican Peso',SGD:'Singapore Dollar',
  HKD:'Hong Kong Dollar',NOK:'Norwegian Krone',KRW:'South Korean Won',TRY:'Turkish Lira',
  INR:'Indian Rupee',RUB:'Russian Ruble',BRL:'Brazilian Real',ZAR:'South African Rand',
  DKK:'Danish Krone',PLN:'Polish Zloty',THB:'Thai Baht',IDR:'Indonesian Rupiah',
  HUF:'Hungarian Forint',CZK:'Czech Koruna',ILS:'Israeli Shekel',CLP:'Chilean Peso',
  PHP:'Philippine Peso',AED:'UAE Dirham',COP:'Colombian Peso',SAR:'Saudi Riyal',
  MYR:'Malaysian Ringgit',RON:'Romanian Leu',ARS:'Argentine Peso',VND:'Vietnamese Dong',
  BGN:'Bulgarian Lev',ISK:'Icelandic Krona',PKR:'Pakistani Rupee',BDT:'Bangladeshi Taka',
  EGP:'Egyptian Pound',KES:'Kenyan Shilling',NGN:'Nigerian Naira',UAH:'Ukrainian Hryvnia',
  QAR:'Qatari Riyal',KWD:'Kuwaiti Dinar',OMR:'Omani Rial',JOD:'Jordanian Dinar',
  BHD:'Bahraini Dinar',LKR:'Sri Lankan Rupee',MAD:'Moroccan Dirham',TND:'Tunisian Dinar',
  UYU:'Uruguayan Peso',PEN:'Peruvian Sol',TWD:'Taiwan Dollar',
};

const FRANKFURTER = new Set([
  'AUD','BGN','BRL','CAD','CHF','CNY','CZK','DKK','EUR','GBP',
  'HKD','HUF','IDR','ILS','INR','ISK','JPY','KRW','MXN','MYR',
  'NOK','NZD','PHP','PLN','RON','SEK','SGD','THB','TRY','USD','ZAR',
]);

const REF_AMOUNTS = [1, 5, 10, 20, 50, 100, 250, 500, 1000, 2000, 5000, 10000];
const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

let rates = {};
let cpFrom = '';
let cpTo = '';
let cpSwapPath = '';
let lastHistData = null;

function fmt(num, decimals) {
  if (decimals === undefined) {
    if (Math.abs(num) >= 1000) decimals = 2;
    else if (Math.abs(num) >= 1) decimals = 4;
    else decimals = 6;
  }
  if (Math.abs(num) < 0.0001 && num !== 0) return num.toPrecision(4);
  return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function fmtRef(num) {
  if (Math.abs(num) >= 100) return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (Math.abs(num) >= 1) return num.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 });
  return num.toPrecision(4);
}

function convertRate(from, to) {
  if (from === to) return 1;
  return (rates[to] || 1) / (rates[from] || 1);
}

function parseLocaleNumber(str) {
  str = String(str).trim();
  const hasDot = str.includes('.');
  const hasComma = str.includes(',');
  if (hasDot && hasComma) {
    if (str.lastIndexOf(',') > str.lastIndexOf('.')) {
      str = str.replace(/\./g, '').replace(',', '.');
    } else {
      str = str.replace(/,/g, '');
    }
  } else if (hasComma) {
    const parts = str.split(',');
    if (parts.length === 2 && parts[1].length === 3) {
      str = str.replace(',', '');
    } else {
      str = str.replace(',', '.');
    }
  }
  return parseFloat(str);
}

function updateConversion() {
  const amount = parseLocaleNumber(document.getElementById('cp-amount').value) || 0;
  const rate = convertRate(cpFrom, cpTo);
  document.getElementById('cp-result').value = fmt(amount * rate, 2);
  document.getElementById('cp-rate').textContent = `1 ${cpFrom} = ${fmt(rate)} ${cpTo}`;
  document.getElementById('cp-rate-rev').textContent = `1 ${cpTo} = ${fmt(convertRate(cpTo, cpFrom))} ${cpFrom}`;
  const updatedEl = document.getElementById('cp-updated');
  if (updatedEl && updatedEl.dataset.ts) {
    const diffH = Math.floor((Date.now() - parseInt(updatedEl.dataset.ts)) / 36e5);
    updatedEl.textContent = diffH < 1 ? 'Updated less than an hour ago'
      : diffH < 24 ? `Updated ${diffH} hour${diffH > 1 ? 's' : ''} ago`
      : `Updated ${new Date(parseInt(updatedEl.dataset.ts)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  }
}

function renderRefTable() {
  const rate = convertRate(cpFrom, cpTo);
  const rateRev = convertRate(cpTo, cpFrom);
  const fwd = document.getElementById('cp-ref-fwd');
  const rev = document.getElementById('cp-ref-rev');
  if (!fwd || !rev) return;

  fwd.innerHTML = `<div class="cc-ref-header">${cpFrom} → ${cpTo}</div>`
    + REF_AMOUNTS.map(a => `<div class="cc-ref-row"><span class="cc-ref-from">${a.toLocaleString()} ${cpFrom}</span><span class="cc-ref-to">${fmtRef(a * rate)} ${cpTo}</span></div>`).join('');

  rev.innerHTML = `<div class="cc-ref-header">${cpTo} → ${cpFrom}</div>`
    + REF_AMOUNTS.map(a => `<div class="cc-ref-row"><span class="cc-ref-from">${a.toLocaleString()} ${cpTo}</span><span class="cc-ref-to">${fmtRef(a * rateRev)} ${cpFrom}</span></div>`).join('');
}

function renderCompTable(presets) {
  const container = document.getElementById('cp-table-body');
  if (!container) return;
  const amount = parseLocaleNumber(document.getElementById('cp-amount').value) || 1000;
  container.innerHTML = '';
  presets.forEach(code => {
    const val = amount * convertRate(cpFrom, code);
    const row = document.createElement('div');
    row.className = 'ct-row';
    row.innerHTML = `
      <div class="ct-code">${code}</div>
      <div class="ct-amount-cell">
        <input class="ct-input" type="text" inputmode="decimal" value="${fmt(val, 2)}" data-code="${code}" />
        <span class="ct-name">${CURRENCIES[code] || code}</span>
      </div>`;
    row.querySelector('.ct-input').addEventListener('input', function() {
      const v = parseLocaleNumber(this.value);
      if (isNaN(v)) return;
      const base = convertRate(code, cpFrom);
      container.querySelectorAll('.ct-input').forEach(other => {
        if (other === this) return;
        other.value = fmt(v * convertRate(code, other.dataset.code), 2);
      });
      document.getElementById('cp-amount').value = fmt(v * base, 2);
      document.getElementById('cp-result').value = fmt(v * convertRate(code, cpTo), 2);
    });
    container.appendChild(row);
  });
}

function downsample(points, mode) {
  const groups = {};
  points.forEach(p => {
    let key;
    if (mode === 'monthly') {
      key = p.date.slice(0, 7);
    } else {
      const d = new Date(p.date);
      const offset = d.getDay() === 0 ? 6 : d.getDay() - 1;
      const mon = new Date(d);
      mon.setDate(d.getDate() - offset);
      key = mon.toISOString().slice(0, 10);
    }
    if (!groups[key]) groups[key] = [];
    groups[key].push(p);
  });
  return Object.keys(groups).sort().map(key => {
    const pts = groups[key];
    const avg = pts.reduce((s, p) => s + p.value, 0) / pts.length;
    return { date: pts[Math.floor(pts.length / 2)].date, value: avg };
  });
}

function renderChart(points, from, to, days = 30) {
  const canvas = document.getElementById('cp-chart-canvas');
  const footer = document.getElementById('cp-chart-footer');
  if (!canvas || !points.length) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const noteEl = document.querySelector('.cc-chart-note');
  const W = noteEl ? noteEl.getBoundingClientRect().width : (rect.width || canvas.offsetWidth || 600);
  const H = Math.max(160, Math.min(280, Math.round(W / 4)));
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const vals = points.map(p => p.value);
  const minV = Math.min(...vals);
  const maxV = Math.max(...vals);
  const range = maxV - minV || maxV * 0.01;
  const pad = { top: 16, right: 16, bottom: 28, left: 52 };
  const cW = W - pad.left - pad.right;
  const cH = H - pad.top - pad.bottom;

  const xPos = i => pad.left + (i / (points.length - 1)) * cW;
  const yPos = v => pad.top + cH - ((v - minV) / range) * cH;

  ctx.clearRect(0, 0, W, H);

  const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + cH);
  grad.addColorStop(0, 'rgba(99,179,237,0.25)');
  grad.addColorStop(1, 'rgba(99,179,237,0)');
  ctx.beginPath();
  ctx.moveTo(xPos(0), yPos(points[0].value));
  for (let i = 1; i < points.length; i++) ctx.lineTo(xPos(i), yPos(points[i].value));
  ctx.lineTo(xPos(points.length - 1), H - pad.bottom);
  ctx.lineTo(xPos(0), H - pad.bottom);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(xPos(0), yPos(points[0].value));
  for (let i = 1; i < points.length; i++) ctx.lineTo(xPos(i), yPos(points[i].value));
  ctx.strokeStyle = '#63b3ed';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.font = '11px system-ui, sans-serif';
  ctx.textAlign = 'right';
  const ticks = 4;
  for (let t = 0; t <= ticks; t++) {
    const v = minV + (range * t) / ticks;
    const y = yPos(v);
    ctx.fillText(fmtRef(v), pad.left - 6, y + 4);
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(W - pad.right, y);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  const labelStep = Math.max(1, Math.floor(points.length / 5));
  const labelFmt = days >= 3650
    ? { year: 'numeric', month: 'short' }
    : days >= 730
      ? { month: 'short', year: '2-digit' }
      : { month: 'short', day: 'numeric' };
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  for (let i = 0; i < points.length; i += labelStep) {
    const d = new Date(points[i].date + 'T12:00:00');
    ctx.fillText(d.toLocaleDateString('en-US', labelFmt), xPos(i), H - pad.bottom + 16);
  }

  if (footer) {
    const first = fmtRef(points[0].value);
    const last = fmtRef(points[points.length - 1].value);
    const pct = (((points[points.length - 1].value - points[0].value) / points[0].value) * 100).toFixed(2);
    const sign = pct >= 0 ? '+' : '';
    footer.textContent = `${from}/${to}: ${first} → ${last} (${sign}${pct}%) · ECB via Frankfurter`;
  }

  let tooltipEl = canvas.parentElement.querySelector('.cc-chart-tooltip');
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'cc-chart-tooltip';
    tooltipEl.style.display = 'none';
    canvas.parentElement.style.position = 'relative';
    canvas.parentElement.appendChild(tooltipEl);
  }

  canvas.onmousemove = function(e) {
    const r = canvas.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const idx = Math.min(points.length - 1, Math.max(0, Math.round(((mx - pad.left) / cW) * (points.length - 1))));
    if (mx < pad.left || mx > W - pad.right) { tooltipEl.style.display = 'none'; return; }
    const p = points[idx];
    const d = new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    tooltipEl.textContent = `${d}: 1 ${from} = ${fmtRef(p.value)} ${to}`;
    tooltipEl.style.display = 'block';
    tooltipEl.style.left = (xPos(idx) + 8) + 'px';
    tooltipEl.style.top = (yPos(p.value) - 28) + 'px';
  };
  canvas.onmouseleave = () => { tooltipEl.style.display = 'none'; };
}

function renderHistResult(amount, rate, actualDate) {
  const result = amount * rate;
  const dateLabel = new Date(actualDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  document.getElementById('cp-hist-date-label').textContent = dateLabel;
  document.getElementById('cp-hist-converted').textContent = `${fmt(amount, 2)} ${cpFrom} = ${fmt(result, 2)} ${cpTo}`;
  document.getElementById('cp-hist-rate').textContent = `Rate: 1 ${cpFrom} = ${fmt(rate)} ${cpTo}`;
  const vsEl = document.getElementById('cp-hist-vs-today');
  if (vsEl && Object.keys(rates).length) {
    const liveRate = convertRate(cpFrom, cpTo);
    const pct = ((rate - liveRate) / liveRate * 100).toFixed(2);
    const sign = pct >= 0 ? '+' : '';
    vsEl.textContent = `${sign}${pct}% vs today's mid-market rate of ${fmt(liveRate)} ${cpTo}`;
  }
  const resultBox = document.getElementById('cp-hist-result');
  const loadingEl = document.getElementById('cp-hist-loading');
  if (loadingEl) loadingEl.style.display = 'none';
  if (resultBox) resultBox.style.display = '';
}

async function loadHistStats(from, to) {
  if (!FRANKFURTER.has(from) || !FRANKFURTER.has(to)) return;
  const highEl = document.getElementById('hist-high');
  const lowEl = document.getElementById('hist-low');
  const avgEl = document.getElementById('hist-avg');
  const changeEl = document.getElementById('hist-change');
  const tbody = document.getElementById('hist-monthly-tbody');
  if (!highEl || !tbody) return;

  try {
    const end = new Date().toISOString().slice(0, 10);
    const start = new Date(Date.now() - 365 * 86400000).toISOString().slice(0, 10);
    const base = from === 'EUR' ? from : to === 'EUR' ? to : from;
    const quote = base === from ? to : from;
    const res = await fetch(`https://api.frankfurter.dev/v1/${start}..${end}?from=${base}&to=${quote}`);
    if (!res.ok) throw new Error();
    const data = await res.json();

    let points = Object.entries(data.rates).map(([date, r]) => ({ date, value: r[quote] }));
    if (base !== from) points = points.map(p => ({ date: p.date, value: 1 / p.value }));

    const vals = points.map(p => p.value);
    const high = Math.max(...vals);
    const low = Math.min(...vals);
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    const firstVal = points[0].value;
    const lastVal = points[points.length - 1].value;
    const changePct = ((lastVal - firstVal) / firstVal * 100).toFixed(2);
    const changeSign = changePct >= 0 ? '+' : '';

    highEl.textContent = fmtRef(high);
    lowEl.textContent = fmtRef(low);
    avgEl.textContent = fmtRef(avg);
    changeEl.textContent = `${changeSign}${changePct}%`;
    changeEl.style.color = changePct >= 0 ? '#22c55e' : '#ef4444';

    const months = {};
    points.forEach(p => {
      const key = p.date.slice(0, 7);
      if (!months[key]) months[key] = [];
      months[key].push(p.value);
    });

    const monthKeys = Object.keys(months).sort().reverse();
    let prevAvg = null;
    const rows = monthKeys.map(key => {
      const mv = months[key];
      const mAvg = mv.reduce((a, b) => a + b, 0) / mv.length;
      const mHigh = Math.max(...mv);
      const mLow = Math.min(...mv);
      const mChange = prevAvg !== null ? ((mAvg - prevAvg) / prevAvg * 100).toFixed(2) : null;
      const changeCell = mChange !== null
        ? `<span style="color:${mChange >= 0 ? '#22c55e' : '#ef4444'}">${mChange >= 0 ? '+' : ''}${mChange}%</span>`
        : '-';
      prevAvg = mAvg;
      const label = new Date(key + '-15').toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      return `<tr><td>${label}</td><td>${fmtRef(mAvg)}</td><td>${fmtRef(mHigh)}</td><td>${fmtRef(mLow)}</td><td>${changeCell}</td></tr>`;
    });
    tbody.innerHTML = rows.join('');
  } catch {
    const statsGrid = document.getElementById('hist-stats-grid');
    if (statsGrid) statsGrid.style.display = 'none';
    if (tbody) tbody.innerHTML = '<tr><td colspan="5" class="hist-loading-row">Historical data unavailable for this pair.</td></tr>';
  }
}

async function loadChart(from, to, days) {
  if (!FRANKFURTER.has(from) || !FRANKFURTER.has(to)) return;
  const section = document.getElementById('cp-chart-section');
  if (section) section.style.display = '';
  const end = new Date().toISOString().slice(0, 10);
  const start = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
  const base = from === 'EUR' ? from : to === 'EUR' ? to : from;
  const quote = base === from ? to : from;
  try {
    const res = await fetch(`https://api.frankfurter.dev/v1/${start}..${end}?from=${base}&to=${quote}`);
    const data = await res.json();
    let points = Object.entries(data.rates).map(([date, r]) => ({ date, value: r[quote] }));
    if (base !== from) points = points.map(p => ({ date: p.date, value: 1 / p.value }));
    if (days >= 3650) points = downsample(points, 'monthly');
    else if (days >= 730) points = downsample(points, 'weekly');
    renderChart(points, from, to, days);
  } catch(e) {
    const section = document.getElementById('cp-chart-section');
    if (section) section.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('cp-card');
  const params = new URLSearchParams(window.location.search);

  if (card && card.dataset.from) {
    cpFrom = card.dataset.from;
    cpTo = card.dataset.to;
  } else {
    cpFrom = params.get('from') || 'USD';
    cpTo = params.get('to') || 'EUR';
  }

  cpSwapPath = `/conversion/currency-converter/${cpTo.toLowerCase()}-to-${cpFrom.toLowerCase()}`;

  const fromSel = document.getElementById('cp-from');
  const toSel = document.getElementById('cp-to');
  if (fromSel && toSel) {
    Object.keys(CURRENCIES).sort().forEach(code => {
      fromSel.add(new Option(`${code} – ${CURRENCIES[code]}`, code));
      toSel.add(new Option(`${code} – ${CURRENCIES[code]}`, code));
    });
    fromSel.value = cpFrom;
    toSel.value = cpTo;

    fromSel.addEventListener('change', () => {
      cpFrom = fromSel.value;
      updateConversion();
      renderRefTable();
    });
    toSel.addEventListener('change', () => {
      cpTo = toSel.value;
      updateConversion();
      renderRefTable();
    });
  }

  const swapBtn = document.getElementById('cp-swap');
  if (swapBtn) {
    if (card && card.dataset.from) {
      swapBtn.addEventListener('click', () => { window.location.href = cpSwapPath; });
    } else {
      swapBtn.addEventListener('click', () => {
        const tmp = cpFrom;
        cpFrom = cpTo;
        cpTo = tmp;
        if (fromSel) fromSel.value = cpFrom;
        if (toSel) toSel.value = cpTo;
        updateConversion();
        renderRefTable();
      });
    }
  }

  document.getElementById('cp-amount')?.addEventListener('input', updateConversion);

  const presets = card?.dataset.presets ? card.dataset.presets.split(',') : [cpFrom, cpTo, 'EUR', 'USD', 'GBP'].filter((c, i, a) => a.indexOf(c) === i).slice(0, 5);

  fetch(API_URL)
    .then(r => r.json())
    .then(data => {
      rates = data.rates;
      const ts = data.time_last_updated * 1000;
      const updatedEl = document.getElementById('cp-updated');
      if (updatedEl) updatedEl.dataset.ts = ts;
      updateConversion();
      renderRefTable();
      renderCompTable(presets);
      const addSel = document.getElementById('cp-table-add');
      if (addSel) {
        addSel.innerHTML = '<option value="">Add a currency…</option>';
        Object.keys(CURRENCIES).sort().forEach(code => {
          if (!presets.includes(code)) addSel.add(new Option(`${code} – ${CURRENCIES[code]}`, code));
        });
        addSel.addEventListener('change', function() {
          if (!this.value) return;
          presets.push(this.value);
          renderCompTable(presets);
          this.value = '';
        });
      }
      loadChart(cpFrom, cpTo, 30);
      if (FRANKFURTER.has(cpFrom) && FRANKFURTER.has(cpTo)) {
        const histSection = document.getElementById('cp-history-section');
        if (histSection) histSection.style.display = '';
        const mainAmount = document.getElementById('cp-amount');
        const histAmount = document.getElementById('cp-hist-amount');
        if (mainAmount && histAmount) histAmount.value = mainAmount.value;
        const dateInput = document.getElementById('cp-hist-date');
        if (histAmount && dateInput) {
          const r = histAmount.getBoundingClientRect();
          dateInput.style.width = r.width + 'px';
          dateInput.style.height = r.height + 'px';
          dateInput.style.boxSizing = 'border-box';
        }
        loadHistStats(cpFrom, cpTo);
      }
    })
    .catch(() => {
      const el = document.getElementById('cp-updated');
      if (el) el.textContent = 'Error loading rates - please refresh.';
    });

  document.querySelectorAll('.cc-chart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.cc-chart-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      loadChart(cpFrom, cpTo, parseInt(this.dataset.days));
    });
  });

  const histDateInput = document.getElementById('cp-hist-date');
  const histAmountInput = document.getElementById('cp-hist-amount');
  if (histDateInput) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    histDateInput.max = yesterday.toISOString().split('T')[0];

    histDateInput.addEventListener('change', async () => {
      const date = histDateInput.value;
      if (!date) return;
      const resultBox = document.getElementById('cp-hist-result');
      const loadingEl = document.getElementById('cp-hist-loading');
      const errorEl = document.getElementById('cp-hist-error');
      if (resultBox) resultBox.style.display = 'none';
      if (errorEl) errorEl.style.display = 'none';
      if (loadingEl) loadingEl.style.display = '';

      try {
        const base = cpFrom === 'EUR' ? cpFrom : cpTo === 'EUR' ? cpTo : cpFrom;
        const quote = base === cpFrom ? cpTo : cpFrom;
        const res = await fetch(`https://api.frankfurter.dev/v1/${date}?from=${base}&to=${quote}`);
        if (!res.ok) throw new Error();
        const data = await res.json();

        let histRate = data.rates[quote];
        if (base !== cpFrom) histRate = 1 / histRate;
        lastHistData = { rate: histRate, actualDate: data.date };

        const amount = parseLocaleNumber(histAmountInput ? histAmountInput.value : '1') || 1;
        renderHistResult(amount, histRate, data.date);
      } catch {
        lastHistData = null;
        if (document.getElementById('cp-hist-loading')) document.getElementById('cp-hist-loading').style.display = 'none';
        if (document.getElementById('cp-hist-error')) document.getElementById('cp-hist-error').style.display = '';
      }
    });
  }

  if (histAmountInput) {
    histAmountInput.addEventListener('input', () => {
      if (!lastHistData) return;
      const amount = parseLocaleNumber(histAmountInput.value) || 1;
      renderHistResult(amount, lastHistData.rate, lastHistData.actualDate);
    });
  }
});
