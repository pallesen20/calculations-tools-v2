document.addEventListener('DOMContentLoaded', () => {
  ['opm-ebit', 'opm-revenue'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calculate);
  });

  function parseVal(id) {
    const el = document.getElementById(id);
    if (!el || el.value.trim() === '') return NaN;
    const v = parseFloat(el.value.replace(/,/g, '').replace(/\s/g, ''));
    return isNaN(v) ? NaN : v;
  }

  function fmtFull(n) {
    return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }

  function interpret(margin) {
    if (margin < 0)  return 'Negative - operating at a loss';
    if (margin < 5)  return 'Very low';
    if (margin < 10) return 'Below average';
    if (margin < 15) return 'Average';
    if (margin < 20) return 'Good';
    if (margin < 30) return 'Strong';
    return 'Excellent';
  }

  function calculate() {
    const ebit    = parseVal('opm-ebit');
    const revenue = parseVal('opm-revenue');

    if (isNaN(ebit) || isNaN(revenue) || revenue === 0) {
      document.getElementById('opm-result').classList.add('hidden');
      return;
    }

    const ratio  = ebit / revenue;
    const margin = ratio * 100;

    document.getElementById('opm-margin-val').textContent = margin.toFixed(2) + '%';
    document.getElementById('opm-interp-val').textContent = interpret(margin);
    document.getElementById('opm-step1').textContent = `${fmtFull(ebit)} / ${fmtFull(revenue)} = ${ratio.toFixed(6)}`;
    document.getElementById('opm-step2').textContent = `${ratio.toFixed(6)} × 100 = ${margin.toFixed(4)}%`;

    document.getElementById('opm-result').classList.remove('hidden');
  }
});
