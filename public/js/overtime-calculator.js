document.addEventListener('DOMContentLoaded', () => {
  const TOP_CURRENCIES = ['USD','EUR','GBP','DKK','NOK','SEK','CHF','JPY','AUD','CAD','NZD','CNY','INR','HKD','SGD','BRL','MXN','KRW','MYR','THB','IDR','ZAR','TRY','PLN','CZK','HUF','ILS','PHP','RON','ISK'];
  const CURRENCY_SYMBOLS = { USD:'$',EUR:'€',GBP:'£',DKK:'kr',NOK:'kr',SEK:'kr',CHF:'Fr',JPY:'¥',AUD:'A$',CAD:'C$',NZD:'NZ$',CNY:'¥',INR:'₹',HKD:'HK$',SGD:'S$',BRL:'R$',MXN:'$',KRW:'₩',MYR:'RM',THB:'฿',IDR:'Rp',ZAR:'R',TRY:'₺',PLN:'zł',CZK:'Kč',HUF:'Ft',ILS:'₪',PHP:'₱',RON:'lei',ISK:'kr' };
  const TZ_CURRENCY = { 'America/New_York':'USD','America/Chicago':'USD','America/Denver':'USD','America/Los_Angeles':'USD','America/Toronto':'CAD','America/Vancouver':'CAD','Europe/London':'GBP','Europe/Paris':'EUR','Europe/Berlin':'EUR','Europe/Amsterdam':'EUR','Europe/Madrid':'EUR','Europe/Rome':'EUR','Europe/Copenhagen':'DKK','Europe/Stockholm':'SEK','Europe/Oslo':'NOK','Europe/Zurich':'CHF','Asia/Tokyo':'JPY','Asia/Shanghai':'CNY','Asia/Kolkata':'INR','Asia/Hong_Kong':'HKD','Asia/Singapore':'SGD','Australia/Sydney':'AUD','Pacific/Auckland':'NZD','America/Sao_Paulo':'BRL','America/Mexico_City':'MXN','Asia/Seoul':'KRW' };

  function detectCurrency() {
    try { const tz = Intl.DateTimeFormat().resolvedOptions().timeZone; return TZ_CURRENCY[tz] || 'USD'; } catch(e) { return 'USD'; }
  }

  const currencySelect = document.getElementById('ot-currency');
  if (currencySelect) {
    const detected = detectCurrency();
    TOP_CURRENCIES.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c; opt.textContent = c;
      if (c === detected) opt.selected = true;
      currencySelect.appendChild(opt);
    });
  }

  const multiplierSelect = document.getElementById('ot-multiplier');
  const customWrap = document.getElementById('ot-custom-wrap');
  multiplierSelect.addEventListener('change', () => {
    const isCustom = multiplierSelect.value === 'custom';
    customWrap.style.display = isCustom ? '' : 'none';
    calculate();
  });

  function fmt(num, currency) {
    const sym = CURRENCY_SYMBOLS[currency] || currency + ' ';
    return sym + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function calculate() {
    const currency = currencySelect ? currencySelect.value : 'USD';
    const rate = parseFloat(document.getElementById('ot-rate').value);
    const regularHours = parseFloat(document.getElementById('ot-regular').value);
    const otHours = parseFloat(document.getElementById('ot-hours').value);

    let multiplier;
    if (multiplierSelect.value === 'custom') {
      multiplier = parseFloat(document.getElementById('ot-custom').value);
    } else {
      multiplier = parseFloat(multiplierSelect.value);
    }

    const result = document.getElementById('ot-result');

    if (!rate || rate <= 0 || !regularHours || regularHours < 0 || !otHours || otHours < 0 || !multiplier || multiplier <= 0) {
      result.classList.add('hidden');
      return;
    }

    const regularPay = rate * regularHours;
    const otPay = rate * multiplier * otHours;
    const otPremium = rate * (multiplier - 1) * otHours;
    const totalPay = regularPay + otPay;
    const totalHours = regularHours + otHours;
    const effectiveRate = totalHours > 0 ? totalPay / totalHours : 0;

    document.getElementById('ot-res-regular').textContent = fmt(regularPay, currency);
    document.getElementById('ot-res-ot-pay').textContent = fmt(otPay, currency);
    document.getElementById('ot-res-premium').textContent = fmt(otPremium, currency);
    document.getElementById('ot-res-total').textContent = fmt(totalPay, currency);
    document.getElementById('ot-res-total-hours').textContent = totalHours.toLocaleString('en-US', { maximumFractionDigits: 1 });
    document.getElementById('ot-res-effective').textContent = fmt(effectiveRate, currency) + '/hr';
    document.getElementById('ot-res-multiplier').textContent = multiplier.toFixed(2) + 'x';

    result.classList.remove('hidden');
  }

  ['ot-rate','ot-regular','ot-hours','ot-custom'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calculate);
  });
  if (currencySelect) currencySelect.addEventListener('change', calculate);
  multiplierSelect.addEventListener('change', calculate);
});
