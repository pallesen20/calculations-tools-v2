document.addEventListener('DOMContentLoaded', () => {
  let mode = 'bottom';

  const bottomBtn    = document.getElementById('ebt-mode-bottom');
  const topBtn       = document.getElementById('ebt-mode-top');
  const bottomFields = document.getElementById('ebt-bottom-fields');
  const topFields    = document.getElementById('ebt-top-fields');
  const resultEl     = document.getElementById('ebt-result');

  bottomBtn.addEventListener('click', () => {
    if (mode === 'bottom') return;
    mode = 'bottom';
    bottomBtn.classList.add('active');
    topBtn.classList.remove('active');
    bottomFields.classList.remove('hidden');
    topFields.classList.add('hidden');
    resultEl.classList.add('hidden');
  });

  topBtn.addEventListener('click', () => {
    if (mode === 'top') return;
    mode = 'top';
    topBtn.classList.add('active');
    bottomBtn.classList.remove('active');
    topFields.classList.remove('hidden');
    bottomFields.classList.add('hidden');
    resultEl.classList.add('hidden');
  });

  ['ebt-net-income', 'ebt-tax', 'ebt-ebit', 'ebt-interest', 'ebt-tax-td', 'ebt-revenue'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calculate);
  });

  function parseVal(id, fallback) {
    const el = document.getElementById(id);
    if (!el || el.value.trim() === '') return fallback !== undefined ? fallback : NaN;
    const v = parseFloat(el.value.replace(/,/g, '').replace(/\s/g, ''));
    return isNaN(v) ? (fallback !== undefined ? fallback : NaN) : v;
  }

  function fmtCard(n) {
    if (!isFinite(n)) return '-';
    const abs = Math.abs(n), sign = n < 0 ? '-' : '';
    if (abs >= 1e9) return sign + (abs / 1e9).toFixed(2) + 'B';
    if (abs >= 1e6) return sign + (abs / 1e6).toFixed(2) + 'M';
    if (abs >= 1e3) return sign + (abs / 1e3).toFixed(1) + 'K';
    return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }

  function fmtFull(n) {
    return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }

  function getMarginRating(margin) {
    if (margin < 0)  return 'Pre-tax loss';
    if (margin < 2)  return 'Break-even';
    if (margin < 8)  return 'Thin margins';
    if (margin < 18) return 'Healthy';
    if (margin < 30) return 'Strong';
    return 'Exceptional';
  }

  function calculate() {
    let ebt, tax;
    const revenue = parseVal('ebt-revenue');

    if (mode === 'bottom') {
      const netIncome = parseVal('ebt-net-income');
      if (isNaN(netIncome)) { resultEl.classList.add('hidden'); return; }
      tax = parseVal('ebt-tax', 0);
      ebt = netIncome + tax;
      document.getElementById('ebt-step1-label').textContent = 'Net Income + Tax = EBT';
      document.getElementById('ebt-step1').textContent = `${fmtFull(netIncome)} + ${fmtFull(tax)} = ${fmtFull(ebt)}`;
    } else {
      const ebit     = parseVal('ebt-ebit');
      const interest = parseVal('ebt-interest');
      if (isNaN(ebit) || isNaN(interest)) { resultEl.classList.add('hidden'); return; }
      tax = parseVal('ebt-tax-td');
      ebt = ebit - interest;
      document.getElementById('ebt-step1-label').textContent = 'EBIT - Interest = EBT';
      document.getElementById('ebt-step1').textContent = `${fmtFull(ebit)} - ${fmtFull(interest)} = ${fmtFull(ebt)}`;
    }

    document.getElementById('ebt-ebt-val').textContent = fmtCard(ebt);

    const taxRateRow = document.getElementById('ebt-taxrate-row');
    if (!isNaN(tax) && tax !== 0 && ebt !== 0) {
      const rate = (tax / ebt) * 100;
      document.getElementById('ebt-taxrate-val').textContent = rate.toFixed(1) + '%';
      document.getElementById('ebt-step2').textContent = `${fmtFull(tax)} / ${fmtFull(ebt)} x 100 = ${rate.toFixed(2)}%`;
      taxRateRow.classList.remove('hidden');
    } else {
      taxRateRow.classList.add('hidden');
    }

    const marginRow = document.getElementById('ebt-margin-row');
    const ratingRow = document.getElementById('ebt-rating-row');
    if (!isNaN(revenue) && revenue !== 0) {
      const margin = (ebt / revenue) * 100;
      document.getElementById('ebt-margin-val').textContent = margin.toFixed(1) + '%';
      document.getElementById('ebt-rating-val').textContent = getMarginRating(margin);
      marginRow.classList.remove('hidden');
      ratingRow.classList.remove('hidden');
    } else {
      marginRow.classList.add('hidden');
      ratingRow.classList.add('hidden');
    }

    resultEl.classList.remove('hidden');
  }
});
