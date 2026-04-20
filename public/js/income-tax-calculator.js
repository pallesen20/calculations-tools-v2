document.addEventListener('DOMContentLoaded', () => {
  const TOP_CURRENCIES = ['USD','EUR','GBP','DKK','NOK','SEK','CHF','JPY','AUD','CAD','NZD','CNY','INR','HKD','SGD','BRL','MXN','KRW','MYR','THB','IDR','ZAR','TRY','PLN','CZK','HUF','ILS','PHP','RON','ISK'];
  const SYMBOLS = {
    USD:'$',EUR:'€',GBP:'£',DKK:'DKK ',NOK:'NOK ',SEK:'SEK ',CHF:'Fr ',JPY:'¥',
    AUD:'A$',CAD:'C$',NZD:'NZ$',CNY:'¥',INR:'₹',HKD:'HK$',SGD:'S$',BRL:'R$',
    MXN:'MX$',KRW:'₩',MYR:'RM ',THB:'฿',IDR:'Rp ',ZAR:'R ',TRY:'₺',PLN:'zł ',
    CZK:'Kč ',HUF:'Ft ',ILS:'₪',PHP:'₱',RON:'lei ',ISK:'kr '
  };

  function detectCurrency() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const map = {
        'Europe/London':'GBP','Europe/Dublin':'EUR','Europe/Paris':'EUR','Europe/Berlin':'EUR',
        'Europe/Rome':'EUR','Europe/Madrid':'EUR','Europe/Amsterdam':'EUR','Europe/Brussels':'EUR',
        'Europe/Vienna':'EUR','Europe/Athens':'EUR','Europe/Helsinki':'EUR','Europe/Lisbon':'EUR',
        'Europe/Copenhagen':'DKK','Europe/Oslo':'NOK','Europe/Stockholm':'SEK','Europe/Zurich':'CHF',
        'Europe/Warsaw':'PLN','Europe/Prague':'CZK','Europe/Budapest':'HUF','Europe/Bucharest':'RON',
        'Europe/Istanbul':'TRY','Asia/Tokyo':'JPY','Asia/Shanghai':'CNY','Asia/Hong_Kong':'HKD',
        'Asia/Singapore':'SGD','Asia/Seoul':'KRW','Asia/Kolkata':'INR','Asia/Kuala_Lumpur':'MYR',
        'Asia/Bangkok':'THB','Asia/Jakarta':'IDR','Asia/Jerusalem':'ILS','Asia/Manila':'PHP',
        'Australia/Sydney':'AUD','Australia/Melbourne':'AUD','Australia/Brisbane':'AUD',
        'Australia/Perth':'AUD','Australia/Adelaide':'AUD','Pacific/Auckland':'NZD',
        'America/Sao_Paulo':'BRL','America/Manaus':'BRL','America/Recife':'BRL',
        'America/Mexico_City':'MXN','America/Monterrey':'MXN','America/Tijuana':'MXN',
        'America/Toronto':'CAD','America/Vancouver':'CAD','America/Winnipeg':'CAD',
        'America/Edmonton':'CAD','America/Halifax':'CAD','Africa/Johannesburg':'ZAR',
        'Atlantic/Reykjavik':'ISK',
      };
      if (map[tz]) return map[tz];
      if (tz.startsWith('America/')) return 'USD';
    } catch (e) {}
    return 'USD';
  }

  const currencySelect = document.getElementById('itc-currency');
  if (currencySelect) {
    const detected = detectCurrency();
    TOP_CURRENCIES.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      if (c === detected) opt.selected = true;
      currencySelect.appendChild(opt);
    });
  }

  function parseVal(id) {
    const el = document.getElementById(id);
    if (!el || el.value.trim() === '') return NaN;
    const v = parseFloat(el.value.replace(/,/g, '.').replace(/\s/g,''));
    return isNaN(v) ? NaN : v;
  }

  function fmt(n, symbol) {
    if (!isFinite(n) || n < 0) return '-';
    return symbol + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function calculate() {
    const income = parseVal('itc-income');
    const rate = parseVal('itc-rate');
    const currency = document.getElementById('itc-currency')?.value || 'USD';
    const sym = SYMBOLS[currency] || currency + ' ';

    if (isNaN(income) || income < 0 || isNaN(rate) || rate < 0) {
      document.getElementById('itc-result')?.classList.add('hidden');
      return;
    }

    const tax = income * (rate / 100);
    const afterTax = income - tax;

    document.getElementById('itc-res-income').textContent = fmt(income, sym);
    document.getElementById('itc-res-tax').textContent = fmt(tax, sym);
    document.getElementById('itc-res-aftertax').textContent = fmt(afterTax, sym);
    document.getElementById('itc-res-monthly').textContent = fmt(afterTax / 12, sym);
    document.getElementById('itc-res-weekly').textContent = fmt(afterTax / 52, sym);
    document.getElementById('itc-res-rate-used').textContent = rate.toFixed(3) + '%';

    document.getElementById('itc-result')?.classList.remove('hidden');
  }

  ['itc-income','itc-rate'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calculate);
  });
  document.getElementById('itc-currency')?.addEventListener('change', calculate);

  calculate();
});
