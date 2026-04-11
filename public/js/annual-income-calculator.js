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
    return 'USD';
  }

  const currencySelect = document.getElementById('aic-currency');
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

  const periodEl = document.getElementById('aic-period');
  const hoursField = document.getElementById('aic-hours-field');

  function updateHoursVisibility() {
    if (!hoursField || !periodEl) return;
    hoursField.style.display = periodEl.value === 'hourly' ? 'block' : 'none';
  }

  if (periodEl) {
    periodEl.addEventListener('change', updateHoursVisibility);
    updateHoursVisibility();
  }

  const bonusToggle = document.getElementById('aic-bonus-toggle');
  const bonusField = document.getElementById('aic-bonus-field');
  if (bonusToggle && bonusField) {
    bonusToggle.addEventListener('change', () => {
      bonusField.style.display = bonusToggle.checked ? 'block' : 'none';
      calculate();
    });
  }

  function parseVal(id, fallback) {
    const el = document.getElementById(id);
    if (!el || el.value.trim() === '') return fallback !== undefined ? fallback : NaN;
    const v = parseFloat(el.value.replace(/,/g, '').replace(/\s/g, ''));
    return isNaN(v) ? (fallback !== undefined ? fallback : NaN) : v;
  }

  function fmt(n, symbol) {
    if (!isFinite(n) || n < 0) return '-';
    const abs = Math.abs(n);
    if (abs >= 1e6) return symbol + (abs / 1e6).toFixed(2) + 'M';
    return symbol + abs.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function calculate() {
    const amount = parseVal('aic-amount');
    const period = periodEl?.value || 'hourly';
    const hours = parseVal('aic-hours', 40);
    const weeks = parseVal('aic-weeks', 52);
    const currency = document.getElementById('aic-currency')?.value || 'USD';
    const symbol = SYMBOLS[currency] + ' ' || (currency + ' ');
    const bonusChecked = bonusToggle?.checked;
    const bonus = bonusChecked ? parseVal('aic-bonus', 0) : 0;

    if (isNaN(amount) || amount <= 0 || hours <= 0 || weeks <= 0) {
      document.getElementById('aic-result')?.classList.add('hidden');
      return;
    }

    const totalHours = hours * weeks;
    let annual;
    switch (period) {
      case 'hourly':   annual = amount * totalHours; break;
      case 'daily':    annual = amount * 5 * weeks; break;
      case 'weekly':   annual = amount * weeks; break;
      case 'biweekly': annual = amount * (weeks / 2); break;
      case 'monthly':  annual = amount * 12; break;
      default:         annual = amount;
    }
    annual += (isNaN(bonus) ? 0 : bonus);

    const hourlyRate   = annual / totalHours;
    const dailyRate    = annual / (weeks * 5);
    const weeklyRate   = annual / weeks;
    const biweeklyRate = annual / (weeks / 2);
    const monthlyRate  = annual / 12;

    document.getElementById('aic-res-annual').textContent    = fmt(annual, symbol);
    document.getElementById('aic-res-monthly').textContent   = fmt(monthlyRate, symbol);
    document.getElementById('aic-res-biweekly').textContent  = fmt(biweeklyRate, symbol);
    document.getElementById('aic-res-weekly').textContent    = fmt(weeklyRate, symbol);
    document.getElementById('aic-res-daily').textContent     = fmt(dailyRate, symbol);
    document.getElementById('aic-res-hourly').textContent    = fmt(hourlyRate, symbol);

    document.getElementById('aic-result')?.classList.remove('hidden');
  }

  ['aic-amount', 'aic-hours', 'aic-weeks', 'aic-bonus'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calculate);
  });
  ['aic-period', 'aic-currency'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', calculate);
  });
});
