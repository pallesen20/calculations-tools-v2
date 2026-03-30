document.addEventListener('DOMContentLoaded', () => {
  ['npm-net-income', 'npm-revenue'].forEach(id => {
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
    if (margin < 2)  return 'Very low';
    if (margin < 5)  return 'Below average';
    if (margin < 10) return 'Average';
    if (margin < 15) return 'Good';
    if (margin < 25) return 'Strong';
    return 'Excellent';
  }

  function calculate() {
    const netIncome = parseVal('npm-net-income');
    const revenue   = parseVal('npm-revenue');

    if (isNaN(netIncome) || isNaN(revenue) || revenue === 0) {
      document.getElementById('npm-result').classList.add('hidden');
      return;
    }

    const ratio  = netIncome / revenue;
    const margin = ratio * 100;

    document.getElementById('npm-margin-val').textContent = margin.toFixed(2) + '%';
    document.getElementById('npm-interp-val').textContent = interpret(margin);
    document.getElementById('npm-step1').textContent = `${fmtFull(netIncome)} / ${fmtFull(revenue)} = ${ratio.toFixed(6)}`;
    document.getElementById('npm-step2').textContent = `${ratio.toFixed(6)} × 100 = ${margin.toFixed(4)}%`;

    document.getElementById('npm-result').classList.remove('hidden');
  }
});
