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

const TOP_PAIRINGS = {
  USD:['EUR','GBP','JPY','CAD','AUD','CHF','CNY','INR'],
  EUR:['USD','GBP','CHF','JPY','DKK','SEK','NOK','AUD'],
  GBP:['USD','EUR','CHF','JPY','AUD','CAD','DKK','SEK'],
  DKK:['EUR','USD','NOK','SEK','GBP','CHF','JPY','AUD'],
  NOK:['EUR','USD','DKK','SEK','GBP','CHF','JPY','AUD'],
  SEK:['EUR','USD','DKK','NOK','GBP','CHF','JPY','AUD'],
  CHF:['EUR','USD','GBP','JPY','SEK','DKK','NOK','AUD'],
  JPY:['USD','EUR','GBP','AUD','CHF','CAD','CNY','HKD'],
  AUD:['USD','EUR','GBP','JPY','CAD','NZD','CHF','SGD'],
  CAD:['USD','EUR','GBP','JPY','AUD','CHF','NZD','CNY'],
  NZD:['USD','AUD','EUR','GBP','JPY','CAD','CHF','SGD'],
  CNY:['USD','JPY','EUR','GBP','HKD','AUD','CAD','SGD'],
  INR:['USD','EUR','GBP','AED','SGD','JPY','AUD','CAD'],
  HKD:['USD','CNY','EUR','GBP','JPY','AUD','SGD','CAD'],
  SGD:['USD','MYR','EUR','GBP','JPY','AUD','HKD','CNY'],
};

const FRANKFURTER = new Set([
  'AUD','BGN','BRL','CAD','CHF','CNY','CZK','DKK','EUR','GBP',
  'HKD','HUF','IDR','ILS','INR','ISK','JPY','KRW','MXN','MYR',
  'NOK','NZD','PHP','PLN','RON','SEK','SGD','THB','TRY','USD','ZAR',
]);

const REF_AMOUNTS = [1, 5, 10, 20, 50, 100, 250, 500, 1000, 2000, 5000, 10000];
const CT_DEFAULTS = ['USD','EUR','GBP','DKK','NOK','SEK'];
const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';
const LOCALE_MAP = {
  AE:'AED',AR:'ARS',AU:'AUD',BH:'BHD',BD:'BDT',BR:'BRL',CA:'CAD',
  CL:'CLP',CN:'CNY',CO:'COP',CZ:'CZK',DK:'DKK',EG:'EGP',
  GB:'GBP',HK:'HKD',HU:'HUF',ID:'IDR',IL:'ILS',IN:'INR',IS:'ISK',
  JO:'JOD',JP:'JPY',KE:'KES',KR:'KRW',KW:'KWD',LK:'LKR',MA:'MAD',
  MX:'MXN',MY:'MYR',NG:'NGN',NO:'NOK',NZ:'NZD',OM:'OMR',PH:'PHP',
  PK:'PKR',PL:'PLN',QA:'QAR',RO:'RON',RU:'RUB',SA:'SAR',SE:'SEK',
  SG:'SGD',TH:'THB',TN:'TND',TR:'TRY',TW:'TWD',UA:'UAH',US:'USD',
  UY:'UYU',VN:'VND',ZA:'ZAR',
  en:'USD',de:'EUR',fr:'EUR',es:'EUR',it:'EUR',pt:'EUR',nl:'EUR',
  pl:'PLN',ru:'RUB',tr:'TRY',ar:'AED',hi:'INR',zh:'CNY',ja:'JPY',
  ko:'KRW',th:'THB',vi:'VND',id:'IDR',ms:'MYR',sv:'SEK',da:'DKK',
  nb:'NOK',no:'NOK',cs:'CZK',hu:'HUF',ro:'RON',bg:'BGN',he:'ILS',
};

let rates = {};
let lastUpdate = null;
let ctCurrencies = [...CT_DEFAULTS];
let ctBaseCode = 'USD';
let ctBaseAmount = 1;

function setCookie(k, v, days = 30) {
  const d = new Date();
  d.setTime(d.getTime() + days * 864e5);
  document.cookie = `${k}=${encodeURIComponent(v)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}
function getCookie(k) {
  const m = document.cookie.match(new RegExp('(^| )' + k + '=([^;]+)'));
  return m ? decodeURIComponent(m[2]) : null;
}

function detectCurrency() {
  const locales = navigator.languages?.length ? navigator.languages : [navigator.language || 'en-US'];
  for (const locale of locales) {
    const parts = locale.split('-');
    if (parts.length >= 2) {
      const region = parts[parts.length - 1].toUpperCase();
      if (LOCALE_MAP[region] && CURRENCIES[LOCALE_MAP[region]]) return LOCALE_MAP[region];
    }
    const lang = parts[0].toLowerCase();
    if (LOCALE_MAP[lang] && CURRENCIES[LOCALE_MAP[lang]]) return LOCALE_MAP[lang];
  }
  return 'USD';
}

function convertRate(from, to) {
  if (from === to) return 1;
  return (rates[to] || 1) / (rates[from] || 1);
}

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

function getFrom() { return document.getElementById('cp-from').value; }
function getTo()   { return document.getElementById('cp-to').value; }

function updateConversion() {
  const amount = parseLocaleNumber(document.getElementById('cp-amount').value) || 0;
  const from = getFrom();
  const to = getTo();
  const rate = convertRate(from, to);
  document.getElementById('cp-result').value = fmt(amount * rate, 2);
  document.getElementById('cp-rate').textContent = `1 ${from} = ${fmt(rate)} ${to}`;
  document.getElementById('cp-rate-rev').textContent = `1 ${to} = ${fmt(convertRate(to, from))} ${from}`;
  const msg = document.getElementById('cp-wise-msg');
  if (msg) msg.innerHTML = `Sending <strong>${from} to ${to}</strong>? Your bank is likely charging more than it shows. But not Wise!`;
  setCookie('cc_from', from);
  setCookie('cc_to', to);
  setCookie('cc_amount', amount);
  const TOP = new Set(['USD','EUR','GBP','DKK','NOK','SEK','CHF','JPY','AUD','CAD','NZD','CNY','INR','HKD','SGD']);
  const pairLink = document.getElementById('cc-pair-link');
  const pairAnchor = document.getElementById('cc-pair-link-anchor');
  if (pairLink && pairAnchor) {
    if (TOP.has(from) && TOP.has(to) && from !== to) {
      pairAnchor.href = `/conversion/currency-converter/${from.toLowerCase()}-to-${to.toLowerCase()}`;
      pairAnchor.textContent = `See dedicated ${from} to ${to} converter →`;
      pairLink.style.display = '';
    } else {
      pairLink.style.display = 'none';
    }
  }
}

function updateTimeDisplay() {
  if (!lastUpdate) return;
  const diffH = Math.floor((Date.now() - lastUpdate) / 36e5);
  document.getElementById('cp-updated').textContent =
    diffH < 1 ? 'Updated less than an hour ago'
    : diffH < 24 ? `Updated ${diffH} hour${diffH > 1 ? 's' : ''} ago`
    : `Last updated: ${new Date(lastUpdate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
}

function renderRefTable() {
  const from = getFrom();
  const to = getTo();
  const rate = convertRate(from, to);
  const rateRev = convertRate(to, from);
  const titleEl = document.getElementById('cp-ref-title');
  if (titleEl) titleEl.textContent = `${from} to ${to} exchange rates today`;
  const fwd = document.getElementById('cp-ref-fwd');
  const rev = document.getElementById('cp-ref-rev');
  if (!fwd || !rev) return;
  fwd.innerHTML = `<div class="cc-ref-header">${from} → ${to}</div>`
    + REF_AMOUNTS.map(a => `<div class="cc-ref-row"><span class="cc-ref-from">${a.toLocaleString()} ${from}</span><span class="cc-ref-to">${fmtRef(a * rate)} ${to}</span></div>`).join('');
  rev.innerHTML = `<div class="cc-ref-header">${to} → ${from}</div>`
    + REF_AMOUNTS.map(a => `<div class="cc-ref-row"><span class="cc-ref-from">${a.toLocaleString()} ${to}</span><span class="cc-ref-to">${fmtRef(a * rateRev)} ${from}</span></div>`).join('');
}

function renderPairingsGrid() {
  const from = getFrom();
  const grid = document.getElementById('cp-pairings-grid');
  if (!grid) return;
  const pairings = (TOP_PAIRINGS[from] || []).slice(0, 8);
  grid.innerHTML = pairings.map(pair => `
    <a href="/conversion/currency-converter/${from.toLowerCase()}-to-${pair.toLowerCase()}" class="cc-pairing-card">
      <span class="cc-pairing-code">${from} → ${pair}</span>
      <span class="cc-pairing-name">${CURRENCIES[pair] || pair}</span>
    </a>`).join('');
}

function renderChart(points, from, to) {
  const canvas = document.getElementById('cp-chart-canvas');
  const footer = document.getElementById('cp-chart-footer');
  if (!canvas || !points.length) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const W = rect.width || canvas.offsetWidth || 600;
  const H = 200;
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
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  for (let i = 0; i < points.length; i += labelStep) {
    const d = new Date(points[i].date);
    ctx.fillText(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), xPos(i), H - pad.bottom + 16);
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
    tooltipEl.style.cssText = 'display:none;position:absolute;background:rgba(20,20,30,0.92);border:1px solid rgba(255,255,255,0.15);border-radius:8px;padding:0.4rem 0.7rem;font-size:0.78rem;color:white;pointer-events:none;white-space:nowrap;';
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

async function loadChart(from, to, days) {
  if (!FRANKFURTER.has(from) || !FRANKFURTER.has(to)) {
    const section = document.getElementById('cp-chart-section');
    if (section) section.style.display = 'none';
    return;
  }
  const section = document.getElementById('cp-chart-section');
  if (section) section.style.display = '';
  const titleEl = document.getElementById('cp-chart-title');
  if (titleEl) titleEl.textContent = `${from} to ${to} exchange rate history`;
  const end = new Date().toISOString().slice(0, 10);
  const start = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
  const base = from === 'EUR' ? from : to === 'EUR' ? to : from;
  const quote = base === from ? to : from;
  try {
    const res = await fetch(`https://api.frankfurter.dev/v1/${start}..${end}?from=${base}&to=${quote}`);
    const data = await res.json();
    let points = Object.entries(data.rates).map(([date, r]) => ({ date, value: r[quote] }));
    if (base !== from) points = points.map(p => ({ date: p.date, value: 1 / p.value }));
    renderChart(points, from, to);
  } catch(e) {
    const section = document.getElementById('cp-chart-section');
    if (section) section.style.display = 'none';
  }
}

function ctRender() {
  const container = document.getElementById('cp-table-body');
  container.innerHTML = '';
  ctCurrencies.forEach(code => {
    const amount = ctBaseAmount * convertRate(ctBaseCode, code);
    const row = document.createElement('div');
    row.className = 'ct-row';
    row.innerHTML = `
      <div class="ct-code">${code}</div>
      <div class="ct-amount-cell">
        <input class="ct-input" type="text" inputmode="decimal" value="${fmt(amount, 2)}" data-code="${code}" />
        <span class="ct-name">${CURRENCIES[code]}</span>
      </div>
      <button class="ct-remove" data-code="${code}" title="Remove ${code}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>`;
    row.querySelector('.ct-input').addEventListener('focus', function() {
      const raw = parseLocaleNumber(this.value);
      if (!isNaN(raw)) this.value = raw;
      this.select();
    });
    row.querySelector('.ct-input').addEventListener('input', function() {
      const val = parseLocaleNumber(this.value);
      if (isNaN(val)) return;
      ctBaseCode = this.dataset.code;
      ctBaseAmount = val;
      container.querySelectorAll('.ct-input').forEach(other => {
        if (other === this) return;
        other.value = fmt(val * convertRate(ctBaseCode, other.dataset.code), 2);
      });
      setCookie('ct_base', ctBaseCode);
      setCookie('ct_amount', val);
    });
    row.querySelector('.ct-input').addEventListener('blur', function() {
      const val = parseLocaleNumber(this.value);
      if (!isNaN(val)) this.value = fmt(val, 2);
    });
    row.querySelector('.ct-remove').addEventListener('click', e => {
      e.stopPropagation();
      ctCurrencies = ctCurrencies.filter(c => c !== code);
      if (ctBaseCode === code) ctBaseCode = ctCurrencies[0] || 'USD';
      setCookie('ct_currencies', JSON.stringify(ctCurrencies));
      ctRender();
      ctPopulateAdd();
    });
    container.appendChild(row);
  });
}

function ctPopulateAdd() {
  const sel = document.getElementById('cp-table-add');
  sel.innerHTML = '<option value="">Add a currency…</option>';
  Object.keys(CURRENCIES).sort().forEach(code => {
    if (!ctCurrencies.includes(code)) sel.add(new Option(`${code} – ${CURRENCIES[code]}`, code));
  });
}

function populateSelects() {
  const fromEl = document.getElementById('cp-from');
  const toEl = document.getElementById('cp-to');
  Object.keys(CURRENCIES).sort().forEach(code => {
    fromEl.add(new Option(`${code} – ${CURRENCIES[code]}`, code));
    toEl.add(new Option(`${code} – ${CURRENCIES[code]}`, code));
  });
  const card = document.getElementById('cp-card');
  const pairFrom = card?.dataset.from;
  const pairTo = card?.dataset.to;
  fromEl.value = pairFrom || getCookie('cc_from') || detectCurrency();
  toEl.value = pairTo || getCookie('cc_to') || (fromEl.value === 'EUR' ? 'USD' : 'EUR');
  const params = new URLSearchParams(window.location.search);
  const urlAmount = params.get('amount');
  const savedAmount = getCookie('cc_amount');
  if (urlAmount && !isNaN(parseFloat(urlAmount))) {
    document.getElementById('cp-amount').value = urlAmount;
  } else if (savedAmount) {
    document.getElementById('cp-amount').value = savedAmount;
  }
}

async function fetchRates() {
  document.getElementById('cp-updated').textContent = 'Loading rates…';
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    rates = data.rates;
    lastUpdate = data.time_last_updated * 1000;
    updateConversion();
    updateTimeDisplay();
    setInterval(updateTimeDisplay, 60000);
    renderRefTable();
    renderPairingsGrid();
    loadChart(getFrom(), getTo(), 30);
    const saved = getCookie('ct_currencies');
    if (saved) { try { ctCurrencies = JSON.parse(saved).filter(c => CURRENCIES[c]); } catch(e) {} }
    const savedBase = getCookie('ct_base');
    const savedAmount = getCookie('ct_amount');
    if (savedBase && CURRENCIES[savedBase]) ctBaseCode = savedBase;
    if (savedAmount) ctBaseAmount = parseFloat(savedAmount) || 1;
    ctRender();
    ctPopulateAdd();
  } catch(e) {
    document.getElementById('cp-updated').textContent = 'Error loading rates - please refresh.';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  populateSelects();
  fetchRates();

  document.getElementById('cp-amount').addEventListener('input', () => { updateConversion(); renderRefTable(); });
  document.getElementById('cp-from').addEventListener('change', () => {
    updateConversion();
    renderRefTable();
    renderPairingsGrid();
    loadChart(getFrom(), getTo(), parseInt(document.querySelector('.cc-chart-btn.active')?.dataset.days || '30'));
  });
  document.getElementById('cp-to').addEventListener('change', () => {
    updateConversion();
    renderRefTable();
    loadChart(getFrom(), getTo(), parseInt(document.querySelector('.cc-chart-btn.active')?.dataset.days || '30'));
  });
  document.getElementById('cp-swap').addEventListener('click', () => {
    const fromEl = document.getElementById('cp-from');
    const toEl = document.getElementById('cp-to');
    const resultEl = document.getElementById('cp-result');
    const amountEl = document.getElementById('cp-amount');
    const tmp = fromEl.value;
    fromEl.value = toEl.value;
    toEl.value = tmp;
    amountEl.value = resultEl.value;
    updateConversion();
    renderRefTable();
    renderPairingsGrid();
    loadChart(getFrom(), getTo(), parseInt(document.querySelector('.cc-chart-btn.active')?.dataset.days || '30'));
  });
  document.getElementById('cp-table-add').addEventListener('change', function() {
    if (!this.value) return;
    ctCurrencies.push(this.value);
    setCookie('ct_currencies', JSON.stringify(ctCurrencies));
    ctRender();
    ctPopulateAdd();
    this.value = '';
  });
  document.querySelectorAll('.cc-chart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.cc-chart-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      loadChart(getFrom(), getTo(), parseInt(this.dataset.days));
    });
  });
});
