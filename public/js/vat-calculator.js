document.addEventListener('DOMContentLoaded', () => {
  const TOP_CURRENCIES = ['USD','EUR','GBP','DKK','NOK','SEK','CHF','JPY','AUD','CAD','NZD','CNY','INR','HKD','SGD','BRL','MXN','KRW','MYR','THB','IDR','ZAR','TRY','PLN','CZK','HUF','ILS','PHP','RON','ISK'];
  const SYMBOLS = {
    USD:'$', EUR:'€', GBP:'£', DKK:'DKK', NOK:'NOK', SEK:'SEK', CHF:'Fr', JPY:'¥',
    AUD:'A$', CAD:'C$', NZD:'NZ$', CNY:'¥', INR:'₹', HKD:'HK$', SGD:'S$', BRL:'R$',
    MXN:'MX$', KRW:'₩', MYR:'RM', THB:'฿', IDR:'Rp', ZAR:'R', TRY:'₺', PLN:'zł',
    CZK:'Kč', HUF:'Ft', ILS:'₪', PHP:'₱', RON:'lei', ISK:'kr'
  };

  function detectCurrency() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const map = {
        'Europe/London':'GBP','Europe/Dublin':'EUR','Europe/Paris':'EUR','Europe/Berlin':'EUR',
        'Europe/Rome':'EUR','Europe/Madrid':'EUR','Europe/Amsterdam':'EUR','Europe/Brussels':'EUR',
        'Europe/Vienna':'EUR','Europe/Athens':'EUR','Europe/Helsinki':'EUR','Europe/Lisbon':'EUR',
        'Europe/Luxembourg':'EUR','Europe/Malta':'EUR','Europe/Nicosia':'EUR','Europe/Riga':'EUR',
        'Europe/Tallinn':'EUR','Europe/Vilnius':'EUR','Europe/Bratislava':'EUR','Europe/Ljubljana':'EUR',
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
        'Atlantic/Reykjavik':'ISK'
      };
      if (map[tz]) return map[tz];
      if (tz.startsWith('America/')) return 'USD';
    } catch(e) {}
    return 'EUR';
  }

  const currencySelect = document.getElementById('vat-currency');
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

  let mode = 'add';

  const modeAddBtn = document.getElementById('vat-mode-add');
  const modeRemoveBtn = document.getElementById('vat-mode-remove');
  const priceLabel = document.getElementById('vat-price-label');

  function setMode(newMode) {
    mode = newMode;
    if (newMode === 'add') {
      modeAddBtn?.classList.add('vat-mode-active');
      modeRemoveBtn?.classList.remove('vat-mode-active');
      if (priceLabel) priceLabel.textContent = 'Net price (excl. VAT)';
    } else {
      modeRemoveBtn?.classList.add('vat-mode-active');
      modeAddBtn?.classList.remove('vat-mode-active');
      if (priceLabel) priceLabel.textContent = 'Gross price (incl. VAT)';
    }
    const totalRow = document.getElementById('vat-row-gross');
    const netRow = document.getElementById('vat-row-net');
    if (mode === 'add') {
      totalRow?.classList.add('vat-row-highlight');
      netRow?.classList.remove('vat-row-highlight');
    } else {
      netRow?.classList.add('vat-row-highlight');
      totalRow?.classList.remove('vat-row-highlight');
    }
    calculate();
  }

  modeAddBtn?.addEventListener('click', () => setMode('add'));
  modeRemoveBtn?.addEventListener('click', () => setMode('remove'));

  function parseVal(id) {
    const el = document.getElementById(id);
    if (!el || el.value.trim() === '') return NaN;
    const v = parseFloat(el.value.replace(/,/g, '').replace(/\s/g, ''));
    return isNaN(v) ? NaN : v;
  }

  function fmt(n, symbol) {
    if (!isFinite(n) || n < 0) return '-';
    return symbol + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function calculate() {
    const price = parseVal('vat-price');
    const rate = parseVal('vat-rate');
    const currency = document.getElementById('vat-currency')?.value || 'EUR';
    const symbol = (SYMBOLS[currency] || currency) + ' ';

    if (isNaN(price) || price < 0 || isNaN(rate) || rate < 0) {
      document.getElementById('vat-result')?.classList.add('hidden');
      return;
    }

    let net, vatAmount, gross;
    if (mode === 'add') {
      net = price;
      vatAmount = price * (rate / 100);
      gross = price + vatAmount;
    } else {
      gross = price;
      net = price / (1 + rate / 100);
      vatAmount = gross - net;
    }

    document.getElementById('vat-res-net').textContent = fmt(net, symbol);
    document.getElementById('vat-res-vat').textContent = fmt(vatAmount, symbol);
    document.getElementById('vat-res-gross').textContent = fmt(gross, symbol);

    document.getElementById('vat-result')?.classList.remove('hidden');
  }

  ['vat-price', 'vat-rate'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calculate);
  });
  document.getElementById('vat-currency')?.addEventListener('change', calculate);
});
