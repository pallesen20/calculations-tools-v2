document.addEventListener('DOMContentLoaded', () => {
  const TOP_CURRENCIES = ['USD','EUR','GBP','DKK','NOK','SEK','CHF','JPY','AUD','CAD','NZD','CNY','INR','HKD','SGD','BRL','MXN','KRW','MYR','THB','IDR','ZAR','TRY','PLN','CZK','HUF','ILS','PHP','RON','ISK'];
  const CURRENCY_SYMBOLS = { USD:'$', EUR:'€', GBP:'£', JPY:'¥', AUD:'A$', CAD:'C$', CHF:'Fr', DKK:'DKK', NOK:'NOK', SEK:'SEK', NZD:'NZ$', CNY:'¥', INR:'₹', HKD:'HK$', SGD:'S$', BRL:'R$', MXN:'$', KRW:'₩', MYR:'RM', THB:'฿', IDR:'Rp', ZAR:'R', TRY:'₺', PLN:'zł', CZK:'Kč', HUF:'Ft', ILS:'₪', PHP:'₱', RON:'lei', ISK:'kr' };

  function detectCurrency() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz.startsWith('America/')) return 'USD';
      if (tz === 'Europe/London') return 'GBP';
      if (tz === 'Europe/Copenhagen') return 'DKK';
      if (tz === 'Europe/Oslo') return 'NOK';
      if (tz === 'Europe/Stockholm') return 'SEK';
      if (tz === 'Europe/Zurich' || tz === 'Europe/Bern') return 'CHF';
      if (tz.startsWith('Europe/')) return 'EUR';
      if (tz === 'Asia/Tokyo') return 'JPY';
      if (tz.startsWith('Australia/')) return 'AUD';
      if (tz.startsWith('Pacific/Auckland') || tz === 'Pacific/Chatham') return 'NZD';
      if (tz === 'Asia/Singapore') return 'SGD';
      if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta') return 'INR';
      if (tz === 'Asia/Shanghai' || tz === 'Asia/Hong_Kong') return 'CNY';
      if (tz === 'Asia/Seoul') return 'KRW';
      if (tz.startsWith('America/Sao_Paulo') || tz === 'America/Fortaleza') return 'BRL';
      if (tz === 'America/Mexico_City') return 'MXN';
    } catch (e) {}
    return 'USD';
  }

  const currencySelect = document.getElementById('pr-currency');
  const detected = detectCurrency();
  TOP_CURRENCIES.forEach(c => {
    const o = document.createElement('option');
    o.value = c;
    o.textContent = c;
    if (c === detected) o.selected = true;
    currencySelect.appendChild(o);
  });

  const btnPct = document.getElementById('pr-type-pct');
  const btnFlat = document.getElementById('pr-type-flat');
  const raiseLabel = document.getElementById('pr-raise-label');
  const raiseSuffix = document.getElementById('pr-raise-suffix');
  let raiseType = 'pct';

  function setType(type) {
    raiseType = type;
    if (type === 'pct') {
      btnPct.classList.add('pr-type-active');
      btnFlat.classList.remove('pr-type-active');
      raiseLabel.textContent = 'Raise percentage';
      raiseSuffix.textContent = '%';
    } else {
      btnFlat.classList.add('pr-type-active');
      btnPct.classList.remove('pr-type-active');
      raiseLabel.textContent = 'Raise amount';
      raiseSuffix.textContent = currencySelect.value;
    }
    calculate();
  }

  btnPct.addEventListener('click', () => setType('pct'));
  btnFlat.addEventListener('click', () => setType('flat'));

  const TO_ANNUAL = { annual: 1, monthly: 12, biweekly: 26, weekly: 52, hourly: 2080 };

  function parseVal(id) {
    return parseFloat(document.getElementById(id).value.replace(',', '.')) || 0;
  }

  function fmt(val, sym) {
    if (!isFinite(val) || val <= 0) return '-';
    return sym + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function fmtPos(val, sym) {
    if (!isFinite(val) || val <= 0) return '-';
    return '+' + sym + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function set(id, text) {
    document.getElementById(id).textContent = text;
  }

  function calculate() {
    const sym = CURRENCY_SYMBOLS[currencySelect.value + ' '] || (currencySelect.value + ' ');
    const current = parseVal('pr-current');
    const period = document.getElementById('pr-period').value;
    const raiseInput = parseVal('pr-raise');
    const taxRate = parseVal('pr-tax-rate');

    if (current <= 0 || raiseInput <= 0) {
      document.getElementById('pr-result').classList.add('hidden');
      return;
    }

    const currentAnnual = current * TO_ANNUAL[period];
    const raiseAnnual = raiseType === 'pct'
      ? currentAnnual * (raiseInput / 100)
      : raiseInput * TO_ANNUAL[period];

    const newAnnual = currentAnnual + raiseAnnual;
    const pct = (raiseAnnual / currentAnnual) * 100;

    set('pr-res-pct', pct.toFixed(2) + '%');
    set('pr-res-annual', fmt(newAnnual, sym));
    set('pr-res-monthly', fmt(newAnnual / 12, sym));
    set('pr-res-biweekly', fmt(newAnnual / 26, sym));
    set('pr-res-weekly', fmt(newAnnual / 52, sym));
    set('pr-res-hourly', fmt(newAnnual / 2080, sym));

    set('pr-raise-annual', fmtPos(raiseAnnual, sym));
    set('pr-raise-monthly', fmtPos(raiseAnnual / 12, sym));
    set('pr-raise-weekly', fmtPos(raiseAnnual / 52, sym));

    if (taxRate > 0 && taxRate < 100) {
      const factor = 1 - taxRate / 100;
      set('pr-raise-after-annual', fmtPos(raiseAnnual * factor, sym));
      set('pr-raise-after-monthly', fmtPos((raiseAnnual / 12) * factor, sym));
      document.getElementById('pr-tax-section').classList.remove('hidden');
    } else {
      document.getElementById('pr-tax-section').classList.add('hidden');
    }

    document.getElementById('pr-result').classList.remove('hidden');
  }

  ['pr-current', 'pr-raise', 'pr-tax-rate'].forEach(id => {
    document.getElementById(id).addEventListener('input', calculate);
  });
  document.getElementById('pr-period').addEventListener('change', calculate);
  currencySelect.addEventListener('change', () => {
    if (raiseType === 'flat') raiseSuffix.textContent = currencySelect.value;
    calculate();
  });
});
