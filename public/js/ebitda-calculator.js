document.addEventListener('DOMContentLoaded', () => {
  ['ebitda-net-income', 'ebitda-interest', 'ebitda-tax', 'ebitda-da', 'ebitda-revenue'].forEach(id => {
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
    const netIncome = parseVal('ebitda-net-income');
    if (isNaN(netIncome)) {
      document.getElementById('ebitda-result').classList.add('hidden');
      return;
    }
    const interest = parseVal('ebitda-interest', 0);
    const tax      = parseVal('ebitda-tax', 0);
    const da       = parseVal('ebitda-da', 0);
    const revenue  = parseVal('ebitda-revenue');

    const ebt    = netIncome + tax;
    const ebit   = ebt + interest;
    const ebitda = ebit + da;

    document.getElementById('ebitda-ebt-val').textContent    = fmtCard(ebt);
    document.getElementById('ebitda-ebit-val').textContent   = fmtCard(ebit);
    document.getElementById('ebitda-ebitda-val').textContent = fmtCard(ebitda);

    document.getElementById('ebitda-step1').textContent = `${fmtFull(netIncome)} + ${fmtFull(tax)} = ${fmtFull(ebt)}`;
    document.getElementById('ebitda-step2').textContent = `${fmtFull(ebt)} + ${fmtFull(interest)} = ${fmtFull(ebit)}`;
    document.getElementById('ebitda-step3').textContent = `${fmtFull(ebit)} + ${fmtFull(da)} = ${fmtFull(ebitda)}`;

    const marginRow = document.getElementById('ebitda-margin-row');
    if (!isNaN(revenue) && revenue !== 0) {
      const margin = (ebitda / revenue) * 100;
      document.getElementById('ebitda-margin-val').textContent = margin.toFixed(1) + '%';
      marginRow.classList.remove('hidden');
    } else {
      marginRow.classList.add('hidden');
    }

    document.getElementById('ebitda-result').classList.remove('hidden');
  }
});
