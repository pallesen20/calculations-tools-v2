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

const LOCALE_MAP = {
  AE:'AED',AR:'ARS',AU:'AUD',BH:'BHD',BD:'BDT',BR:'BRL',CA:'CAD',
  CL:'CLP',CN:'CNY',CO:'COP',CR:'USD',CZ:'CZK',DK:'DKK',EG:'EGP',
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

const CT_DEFAULTS = ['USD','EUR','GBP','DKK','NOK','SEK'];
const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

let rates = {};
let lastUpdate = null;
let ctCurrencies = [...CT_DEFAULTS];
let ctBaseCode = 'USD';
let ctBaseAmount = 1;

// --- Cookie helpers ---
function setCookie(k, v, days = 30) {
  const d = new Date();
  d.setTime(d.getTime() + days * 864e5);
  document.cookie = `${k}=${encodeURIComponent(v)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}
function getCookie(k) {
  const m = document.cookie.match(new RegExp('(^| )' + k + '=([^;]+)'));
  return m ? decodeURIComponent(m[2]) : null;
}

// --- Locale detection ---
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

// --- Conversion ---
function convertRate(from, to) {
  if (from === to) return 1;
  return (rates[to] || 1) / (rates[from] || 1);
}

function fmt(num, decimals = 2) {
  if (Math.abs(num) < 0.01 && num !== 0) return num.toPrecision(4);
  return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function parseLocaleNumber(str) {
  str = String(str).trim();
  const hasDot   = str.includes('.');
  const hasComma = str.includes(',');
  if (hasDot && hasComma) {
    // Whichever separator comes last is the decimal
    if (str.lastIndexOf(',') > str.lastIndexOf('.')) {
      str = str.replace(/\./g, '').replace(',', '.');  // European: 1.234,56
    } else {
      str = str.replace(/,/g, '');                      // US: 1,234.56
    }
  } else if (hasComma) {
    const parts = str.split(',');
    // Single comma with exactly 3 trailing digits = thousands separator (1,234)
    // Otherwise treat as decimal separator (25,99 → 25.99)
    if (parts.length === 2 && parts[1].length === 3) {
      str = str.replace(',', '');
    } else {
      str = str.replace(',', '.');
    }
  }
  return parseFloat(str);
}

// --- Main converter ---
function updateConversion() {
  const amount   = parseLocaleNumber(document.getElementById('cc-amount').value) || 0;
  const from     = document.getElementById('cc-from').value;
  const to       = document.getElementById('cc-to').value;
  const rate     = convertRate(from, to);

  document.getElementById('cc-result').value = fmt(amount * rate);
  document.getElementById('cc-rate').textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
  document.getElementById('cc-wise-msg').innerHTML = `Sending <strong>${from} to ${to}</strong>? Your bank is likely charging more than it shows. But not Wise!`;
  setCookie('cc_from', from);
  setCookie('cc_to', to);
  setCookie('cc_amount', amount);
}

function swapCurrencies() {
  const fromEl = document.getElementById('cc-from');
  const toEl   = document.getElementById('cc-to');
  const resultEl = document.getElementById('cc-result');
  const amountEl = document.getElementById('cc-amount');
  const tmp = fromEl.value;
  fromEl.value = toEl.value;
  toEl.value = tmp;
  amountEl.value = resultEl.value;
  updateConversion();
}

function updateTimeDisplay() {
  if (!lastUpdate) return;
  const diffH = Math.floor((Date.now() - lastUpdate) / 36e5);
  document.getElementById('cc-updated').textContent =
    diffH < 1 ? 'Updated less than an hour ago'
    : diffH < 24 ? `Updated ${diffH} hours ago`
    : `Last updated: ${new Date(lastUpdate).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })}`;
}

// --- Multi-currency table ---
function ctRender() {
  const container = document.getElementById('cc-table-body');
  container.innerHTML = '';
  ctCurrencies.forEach(code => {
    const amount = ctBaseAmount * convertRate(ctBaseCode, code);
    const row = document.createElement('div');
    row.className = 'ct-row';
    row.innerHTML = `
      <div class="ct-code">${code}</div>
      <div class="ct-amount-cell">
        <input class="ct-input" type="text" inputmode="decimal" value="${fmt(amount)}" data-code="${code}" />
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
        other.value = fmt(val * convertRate(ctBaseCode, other.dataset.code));
      });
      setCookie('ct_base', ctBaseCode);
      setCookie('ct_amount', val);
    });
    row.querySelector('.ct-input').addEventListener('blur', function() {
      const val = parseLocaleNumber(this.value);
      if (!isNaN(val)) this.value = fmt(val);
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
  const sel = document.getElementById('cc-table-add');
  sel.innerHTML = '<option value="">Add a currency…</option>';
  Object.keys(CURRENCIES).sort().forEach(code => {
    if (!ctCurrencies.includes(code)) sel.add(new Option(`${code} – ${CURRENCIES[code]}`, code));
  });
}

function populateSelects() {
  const fromEl = document.getElementById('cc-from');
  const toEl   = document.getElementById('cc-to');
  Object.keys(CURRENCIES).sort().forEach(code => {
    fromEl.add(new Option(`${code} – ${CURRENCIES[code]}`, code));
    toEl.add(new Option(`${code} – ${CURRENCIES[code]}`, code));
  });
  fromEl.value = getCookie('cc_from') || detectCurrency();
  toEl.value   = getCookie('cc_to')   || (fromEl.value === 'EUR' ? 'USD' : 'EUR');
  const savedAmount = getCookie('cc_amount');
  if (savedAmount) document.getElementById('cc-amount').value = savedAmount;
}

async function fetchRates() {
  document.getElementById('cc-updated').textContent = 'Loading rates…';
  try {
    const res  = await fetch(API_URL);
    const data = await res.json();
    rates      = data.rates;
    lastUpdate = data.time_last_updated * 1000;
    updateConversion();
    updateTimeDisplay();
    setInterval(updateTimeDisplay, 60000);

    // Init comparison table
    const saved = getCookie('ct_currencies');
    if (saved) { try { ctCurrencies = JSON.parse(saved).filter(c => CURRENCIES[c]); } catch(e) {} }
    const savedBase   = getCookie('ct_base');
    const savedAmount = getCookie('ct_amount');
    if (savedBase && CURRENCIES[savedBase]) ctBaseCode   = savedBase;
    if (savedAmount)                        ctBaseAmount = parseFloat(savedAmount) || 1;
    ctRender();
    ctPopulateAdd();
  } catch(e) {
    document.getElementById('cc-updated').textContent = 'Error loading rates — please refresh.';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  populateSelects();
  fetchRates();

  document.getElementById('cc-amount').addEventListener('input', updateConversion);
  document.getElementById('cc-from').addEventListener('change', updateConversion);
  document.getElementById('cc-to').addEventListener('change', updateConversion);
  document.getElementById('cc-swap').addEventListener('click', swapCurrencies);
  document.getElementById('cc-table-add').addEventListener('change', function() {
    if (!this.value) return;
    ctCurrencies.push(this.value);
    setCookie('ct_currencies', JSON.stringify(ctCurrencies));
    ctRender();
    ctPopulateAdd();
    this.value = '';
  });
});