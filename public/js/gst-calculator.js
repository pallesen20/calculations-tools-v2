document.addEventListener('DOMContentLoaded', () => {
  const TOP_CURRENCIES = ['USD','EUR','GBP','DKK','NOK','SEK','CHF','JPY','AUD','CAD','NZD','CNY','INR','HKD','SGD','BRL','MXN','KRW','MYR','THB','IDR','ZAR','TRY','PLN','CZK','HUF','ILS','PHP','RON','ISK'];
  const SYMBOLS = {
    USD:'$', EUR:'€', GBP:'£', DKK:'DKK', NOK:'NOK', SEK:'SEK', CHF:'Fr', JPY:'¥',
    AUD:'A$', CAD:'C$', NZD:'NZ$', CNY:'¥', INR:'₹', HKD:'HK$', SGD:'S$', BRL:'R$',
    MXN:'MX$', KRW:'₩', MYR:'RM', THB:'฿', IDR:'Rp', ZAR:'R', TRY:'₺', PLN:'zł',
    CZK:'Kč', HUF:'Ft', ILS:'₪', PHP:'₱', RON:'lei', ISK:'kr'
  };

  const GST_PRESETS = {
    'au':     { currency: 'AUD', rate: '10',     label: 'Australia (GST 10%)' },
    'nz':     { currency: 'NZD', rate: '15',     label: 'New Zealand (GST 15%)' },
    'sg':     { currency: 'SGD', rate: '9',      label: 'Singapore (GST 9%)' },
    'ca-fed': { currency: 'CAD', rate: '5',      label: 'Canada – Federal (GST 5%)' },
    'ca-on':  { currency: 'CAD', rate: '13',     label: 'Canada – Ontario (HST 13%)' },
    'ca-bc':  { currency: 'CAD', rate: '12',     label: 'Canada – BC (GST+PST 12%)' },
    'ca-qc':  { currency: 'CAD', rate: '14.975', label: 'Canada – Quebec (14.975%)' },
    'ca-mar': { currency: 'CAD', rate: '15',     label: 'Canada – Maritimes (HST 15%)' },
    'ca-ab':  { currency: 'CAD', rate: '5',      label: 'Canada – Alberta (GST 5%)' },
    'in-5':   { currency: 'INR', rate: '5',      label: 'India (GST 5%)' },
    'in-12':  { currency: 'INR', rate: '12',     label: 'India (GST 12%)' },
    'in-18':  { currency: 'INR', rate: '18',     label: 'India (GST 18%)' },
    'in-28':  { currency: 'INR', rate: '28',     label: 'India (GST 28%)' },
  };

  function detectCurrency() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const map = {
        'Australia/Sydney':'AUD','Australia/Melbourne':'AUD','Australia/Brisbane':'AUD',
        'Australia/Perth':'AUD','Australia/Adelaide':'AUD','Australia/Darwin':'AUD',
        'Australia/Hobart':'AUD','Australia/Lord_Howe':'AUD',
        'Pacific/Auckland':'NZD','Pacific/Chatham':'NZD',
        'Asia/Singapore':'SGD',
        'Asia/Kolkata':'INR','Asia/Calcutta':'INR',
        'America/Toronto':'CAD','America/Vancouver':'CAD','America/Winnipeg':'CAD',
        'America/Edmonton':'CAD','America/Halifax':'CAD','America/St_Johns':'CAD',
        'America/Regina':'CAD','America/Moncton':'CAD',
        'Europe/London':'GBP','Europe/Dublin':'EUR','Europe/Paris':'EUR','Europe/Berlin':'EUR',
        'Europe/Rome':'EUR','Europe/Madrid':'EUR','Europe/Amsterdam':'EUR',
        'Europe/Copenhagen':'DKK','Europe/Oslo':'NOK','Europe/Stockholm':'SEK','Europe/Zurich':'CHF',
        'Asia/Tokyo':'JPY','Asia/Shanghai':'CNY','Asia/Hong_Kong':'HKD',
        'Asia/Seoul':'KRW','Asia/Kuala_Lumpur':'MYR','Asia/Bangkok':'THB','Asia/Manila':'PHP',
        'America/Sao_Paulo':'BRL','America/Mexico_City':'MXN',
        'Africa/Johannesburg':'ZAR','Atlantic/Reykjavik':'ISK'
      };
      if (map[tz]) return map[tz];
      if (tz.startsWith('America/')) return 'USD';
    } catch(e) {}
    return 'AUD';
  }

  const currencySelect = document.getElementById('gst-currency');
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

  const countrySelect = document.getElementById('gst-country');
  if (countrySelect) {
    const blank = document.createElement('option');
    blank.value = '';
    blank.textContent = 'Select country (optional)';
    countrySelect.appendChild(blank);
    Object.entries(GST_PRESETS).forEach(([key, p]) => {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = p.label;
      countrySelect.appendChild(opt);
    });
  }

  let mode = 'add';

  const modeAddBtn = document.getElementById('gst-mode-add');
  const modeRemoveBtn = document.getElementById('gst-mode-remove');
  const priceLabel = document.getElementById('gst-price-label');

  function setMode(newMode) {
    mode = newMode;
    if (newMode === 'add') {
      modeAddBtn?.classList.add('gst-mode-active');
      modeRemoveBtn?.classList.remove('gst-mode-active');
      if (priceLabel) priceLabel.textContent = 'Net price (excl. GST)';
    } else {
      modeRemoveBtn?.classList.add('gst-mode-active');
      modeAddBtn?.classList.remove('gst-mode-active');
      if (priceLabel) priceLabel.textContent = 'Gross price (incl. GST)';
    }
    const totalRow = document.getElementById('gst-row-gross');
    const netRow = document.getElementById('gst-row-net');
    if (mode === 'add') {
      totalRow?.classList.add('gst-row-highlight');
      netRow?.classList.remove('gst-row-highlight');
    } else {
      netRow?.classList.add('gst-row-highlight');
      totalRow?.classList.remove('gst-row-highlight');
    }
    calculate();
  }

  modeAddBtn?.addEventListener('click', () => setMode('add'));
  modeRemoveBtn?.addEventListener('click', () => setMode('remove'));

  countrySelect?.addEventListener('change', () => {
    const preset = GST_PRESETS[countrySelect.value];
    if (!preset) return;
    const rateInput = document.getElementById('gst-rate');
    if (rateInput) rateInput.value = preset.rate;
    if (currencySelect && preset.currency) {
      const opts = currencySelect.options;
      for (let i = 0; i < opts.length; i++) {
        if (opts[i].value === preset.currency) { currencySelect.selectedIndex = i; break; }
      }
    }
    calculate();
  });

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
    const price = parseVal('gst-price');
    const rate = parseVal('gst-rate');
    const currency = document.getElementById('gst-currency')?.value || 'AUD';
    const symbol = (SYMBOLS[currency] || currency) + ' ';

    if (isNaN(price) || price < 0 || isNaN(rate) || rate < 0) {
      document.getElementById('gst-result')?.classList.add('hidden');
      return;
    }

    let net, gstAmount, gross;
    if (mode === 'add') {
      net = price;
      gstAmount = price * (rate / 100);
      gross = price + gstAmount;
    } else {
      gross = price;
      net = price / (1 + rate / 100);
      gstAmount = gross - net;
    }

    document.getElementById('gst-res-net').textContent = fmt(net, symbol);
    document.getElementById('gst-res-gst').textContent = fmt(gstAmount, symbol);
    document.getElementById('gst-res-gross').textContent = fmt(gross, symbol);

    document.getElementById('gst-result')?.classList.remove('hidden');
  }

  ['gst-price', 'gst-rate'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calculate);
  });
  document.getElementById('gst-currency')?.addEventListener('change', calculate);
});
