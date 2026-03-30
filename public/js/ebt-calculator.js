document.addEventListener('DOMContentLoaded', () => {
  ['ebt-net-income', 'ebt-tax', 'ebt-revenue'].forEach(id => {
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

  function calculate() {
    const netIncome = parseVal('ebt-net-income');
    if (isNaN(netIncome)) {
      document.getElementById('ebt-result').classList.add('hidden');
      return;
    }
    const tax     = parseVal('ebt-tax', 0);
    const revenue = parseVal('ebt-revenue');

    const ebt = netIncome + tax;

    document.getElementById('ebt-ebt-val').textContent = fmtCard(ebt);
    document.getElementById('ebt-step1').textContent   = `${fmtFull(netIncome)} + ${fmtFull(tax)} = ${fmtFull(ebt)}`;

    const taxRateRow = document.getElementById('ebt-taxrate-row');
    if (tax !== 0 && ebt !== 0) {
      const rate = (tax / ebt) * 100;
      document.getElementById('ebt-taxrate-val').textContent = rate.toFixed(1) + '%';
      document.getElementById('ebt-step2').textContent = `${fmtFull(tax)} / ${fmtFull(ebt)} x 100 = ${rate.toFixed(2)}%`;
      taxRateRow.classList.remove('hidden');
    } else {
      taxRateRow.classList.add('hidden');
    }

    const marginRow = document.getElementById('ebt-margin-row');
    if (!isNaN(revenue) && revenue !== 0) {
      const margin = (ebt / revenue) * 100;
      document.getElementById('ebt-margin-val').textContent = margin.toFixed(1) + '%';
      marginRow.classList.remove('hidden');
    } else {
      marginRow.classList.add('hidden');
    }

    document.getElementById('ebt-result').classList.remove('hidden');
  }
});
