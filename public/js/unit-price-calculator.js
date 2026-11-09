document.addEventListener('DOMContentLoaded', () => {
  const CURRENCIES = [
    { code: 'USD', symbol: '$',    label: '$ USD' },
    { code: 'EUR', symbol: '€',    label: '€ EUR' },
    { code: 'GBP', symbol: '£',    label: '£ GBP' },
    { code: 'DKK', symbol: 'kr',   label: 'kr DKK' },
    { code: 'NOK', symbol: 'kr',   label: 'kr NOK' },
    { code: 'SEK', symbol: 'kr',   label: 'kr SEK' },
    { code: 'CHF', symbol: 'CHF',  label: 'CHF' },
    { code: 'JPY', symbol: '¥',    label: '¥ JPY' },
    { code: 'AUD', symbol: 'A$',   label: 'A$ AUD' },
    { code: 'CAD', symbol: 'C$',   label: 'C$ CAD' },
    { code: 'NZD', symbol: 'NZ$',  label: 'NZ$ NZD' },
    { code: 'CNY', symbol: '¥',    label: '¥ CNY' },
    { code: 'INR', symbol: '₹',    label: '₹ INR' },
    { code: 'BRL', symbol: 'R$',   label: 'R$ BRL' },
    { code: 'MXN', symbol: '$',    label: '$ MXN' },
    { code: 'KRW', symbol: '₩',    label: '₩ KRW' },
    { code: 'SGD', symbol: 'S$',   label: 'S$ SGD' },
    { code: 'HKD', symbol: 'HK$',  label: 'HK$ HKD' },
  ];

  const LOCALE_CURRENCY = {
    'en-US': 'USD', 'en-GB': 'GBP', 'de': 'EUR', 'fr': 'EUR',
    'it': 'EUR', 'es': 'EUR', 'da': 'DKK', 'nb': 'NOK', 'sv': 'SEK',
    'ja': 'JPY', 'zh': 'CNY', 'ko': 'KRW', 'hi': 'INR',
    'pt-BR': 'BRL', 'en-AU': 'AUD', 'en-CA': 'CAD',
    'en-NZ': 'NZD', 'en-SG': 'SGD', 'en-HK': 'HKD',
  };

  function detectCurrency() {
    const lang = navigator.language || 'en-US';
    return LOCALE_CURRENCY[lang] || LOCALE_CURRENCY[lang.split('-')[0]] || 'USD';
  }

  const currencyEl = document.getElementById('up-currency');
  CURRENCIES.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.symbol;
    opt.textContent = c.label;
    opt.dataset.code = c.code;
    currencyEl.appendChild(opt);
  });
  const detectedCode = detectCurrency();
  const detectedOption = Array.from(currencyEl.options).find(o => o.dataset.code === detectedCode);
  if (detectedOption) currencyEl.value = detectedOption.value;

  const WEIGHT_UNITS = { g: 1, '100g': 100, kg: 1000, oz: 28.3495, lb: 453.592 };
  const VOLUME_UNITS = { ml: 1, '100ml': 100, L: 1000, 'fl oz': 29.5735, pint: 473.176, gallon: 3785.41 };

  let mode = 'metric';

  document.getElementById('up-metric').addEventListener('click', () => {
    mode = 'metric';
    document.getElementById('up-metric').classList.add('active');
    document.getElementById('up-imperial').classList.remove('active');
    calculate();
  });
  document.getElementById('up-imperial').addEventListener('click', () => {
    mode = 'imperial';
    document.getElementById('up-imperial').classList.add('active');
    document.getElementById('up-metric').classList.remove('active');
    calculate();
  });

  ['up-price-1','up-qty-1','up-unit-1','up-price-2','up-qty-2','up-unit-2','up-currency'].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', calculate);
    el.addEventListener('change', calculate);
  });

  function fmt(val, symbol) {
    if (isNaN(val) || !isFinite(val)) return '-';
    if (Math.abs(val) < 0.0001) return symbol + val.toFixed(6);
    if (Math.abs(val) < 0.01)   return symbol + val.toFixed(4);
    return symbol + val.toFixed(2);
  }

  function calcItem(price, qty, unit) {
    if (isNaN(price) || isNaN(qty) || qty <= 0 || price < 0) return null;
    if (unit in WEIGHT_UNITS) {
      const perG = price / (qty * WEIGHT_UNITS[unit]);
      return {
        type: 'weight', perBase: perG,
        per100g: perG * 100, perKg: perG * 1000,
        perLb: perG * 453.592, perOz: perG * 28.3495,
      };
    }
    if (unit in VOLUME_UNITS) {
      const perMl = price / (qty * VOLUME_UNITS[unit]);
      return {
        type: 'volume', perBase: perMl,
        per100ml: perMl * 100, perL: perMl * 1000, perFlOz: perMl * 29.5735,
      };
    }
    if (unit === 'count') {
      const perUnit = price / qty;
      return { type: 'count', perBase: perUnit, perUnit };
    }
    return null;
  }

  function renderResult(el, result, symbol, m) {
    if (!result) { el.innerHTML = ''; return; }
    let lines = [];
    if (result.type === 'weight') {
      if (m === 'metric') {
        lines.push(`<span class="up-price-primary">${fmt(result.per100g, symbol)}</span> per 100 g`);
        lines.push(`${fmt(result.perKg, symbol)} per kg`);
        lines.push(`${fmt(result.perLb, symbol)} per lb`);
        lines.push(`${fmt(result.perOz, symbol)} per oz`);
      } else {
        lines.push(`<span class="up-price-primary">${fmt(result.perLb, symbol)}</span> per lb`);
        lines.push(`${fmt(result.perOz, symbol)} per oz`);
        lines.push(`${fmt(result.per100g, symbol)} per 100 g`);
        lines.push(`${fmt(result.perKg, symbol)} per kg`);
      }
    } else if (result.type === 'volume') {
      if (m === 'metric') {
        lines.push(`<span class="up-price-primary">${fmt(result.per100ml, symbol)}</span> per 100 ml`);
        lines.push(`${fmt(result.perL, symbol)} per L`);
        lines.push(`${fmt(result.perFlOz, symbol)} per fl oz`);
      } else {
        lines.push(`<span class="up-price-primary">${fmt(result.perFlOz, symbol)}</span> per fl oz`);
        lines.push(`${fmt(result.perL, symbol)} per L`);
        lines.push(`${fmt(result.per100ml, symbol)} per 100 ml`);
      }
    } else {
      lines.push(`<span class="up-price-primary">${fmt(result.perUnit, symbol)}</span> per unit`);
    }
    el.innerHTML = lines.map(l => `<div class="up-price-line">${l}</div>`).join('');
  }

  function calculate() {
    const symbol = currencyEl.value;
    const m = mode;

    const price1 = parseFloat(document.getElementById('up-price-1').value.replace(',', '.'));
    const qty1   = parseFloat(document.getElementById('up-qty-1').value.replace(',', '.'));
    const unit1  = document.getElementById('up-unit-1').value;

    const price2 = parseFloat(document.getElementById('up-price-2').value.replace(',', '.'));
    const qty2   = parseFloat(document.getElementById('up-qty-2').value.replace(',', '.'));
    const unit2  = document.getElementById('up-unit-2').value;

    const r1 = calcItem(price1, qty1, unit1);
    const r2 = calcItem(price2, qty2, unit2);

    renderResult(document.getElementById('up-result-1'), r1, symbol, m);
    renderResult(document.getElementById('up-result-2'), r2, symbol, m);

    const compareEl = document.getElementById('up-compare');
    document.getElementById('up-card-1').classList.remove('up-winner-card', 'up-loser-card');
    document.getElementById('up-card-2').classList.remove('up-winner-card', 'up-loser-card');

    if (r1 && r2 && r1.type === r2.type) {
      const diff = Math.abs(r1.perBase - r2.perBase);
      const pct  = (diff / Math.min(r1.perBase, r2.perBase)) * 100;
      let msg;
      if (pct < 0.01) {
        msg = 'Both items have the same unit price.';
      } else if (r1.perBase < r2.perBase) {
        msg = `<strong>Item 1</strong> is cheaper by ${pct.toFixed(1)}% per unit.`;
        document.getElementById('up-card-1').classList.add('up-winner-card');
        document.getElementById('up-card-2').classList.add('up-loser-card');
      } else {
        msg = `<strong>Item 2</strong> is cheaper by ${pct.toFixed(1)}% per unit.`;
        document.getElementById('up-card-2').classList.add('up-winner-card');
        document.getElementById('up-card-1').classList.add('up-loser-card');
      }
      compareEl.innerHTML = `<div class="up-winner">${msg}</div>`;
      compareEl.style.display = 'block';
    } else {
      compareEl.style.display = 'none';
      compareEl.innerHTML = '';
    }
  }
});
