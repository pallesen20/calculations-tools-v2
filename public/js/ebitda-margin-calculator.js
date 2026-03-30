document.addEventListener('DOMContentLoaded', () => {
  ['ebitdam-ebitda', 'ebitdam-revenue'].forEach(id => {
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
    if (margin < 25) return 'Good';
    if (margin < 35) return 'Strong';
    return 'Excellent';
  }

  function calculate() {
    const ebitda  = parseVal('ebitdam-ebitda');
    const revenue = parseVal('ebitdam-revenue');

    if (isNaN(ebitda) || isNaN(revenue) || revenue === 0) {
      document.getElementById('ebitdam-result').classList.add('hidden');
      return;
    }

    const ratio  = ebitda / revenue;
    const margin = ratio * 100;

    document.getElementById('ebitdam-margin-val').textContent = margin.toFixed(2) + '%';
    document.getElementById('ebitdam-interp-val').textContent = interpret(margin);
    document.getElementById('ebitdam-step1').textContent = `${fmtFull(ebitda)} / ${fmtFull(revenue)} = ${ratio.toFixed(6)}`;
    document.getElementById('ebitdam-step2').textContent = `${ratio.toFixed(6)} x 100 = ${margin.toFixed(4)}%`;

    document.getElementById('ebitdam-result').classList.remove('hidden');
  }
});
