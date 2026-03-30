document.addEventListener('DOMContentLoaded', () => {
  ['ebit-net-income', 'ebit-interest', 'ebit-tax', 'ebit-revenue'].forEach(id => {
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
    const netIncome = parseVal('ebit-net-income');
    if (isNaN(netIncome)) {
      document.getElementById('ebit-result').classList.add('hidden');
      return;
    }
    const interest = parseVal('ebit-interest', 0);
    const tax      = parseVal('ebit-tax', 0);
    const revenue  = parseVal('ebit-revenue');

    const ebt  = netIncome + tax;
    const ebit = ebt + interest;

    document.getElementById('ebit-ebt-val').textContent  = fmtCard(ebt);
    document.getElementById('ebit-ebit-val').textContent = fmtCard(ebit);

    document.getElementById('ebit-step1').textContent = `${fmtFull(netIncome)} + ${fmtFull(tax)} = ${fmtFull(ebt)}`;
    document.getElementById('ebit-step2').textContent = `${fmtFull(ebt)} + ${fmtFull(interest)} = ${fmtFull(ebit)}`;

    const marginRow = document.getElementById('ebit-margin-row');
    if (!isNaN(revenue) && revenue !== 0) {
      const margin = (ebit / revenue) * 100;
      document.getElementById('ebit-margin-val').textContent = margin.toFixed(1) + '%';
      marginRow.classList.remove('hidden');
    } else {
      marginRow.classList.add('hidden');
    }

    document.getElementById('ebit-result').classList.remove('hidden');
  }
});
