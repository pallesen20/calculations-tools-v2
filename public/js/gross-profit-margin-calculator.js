document.addEventListener('DOMContentLoaded', () => {
  ['gpm-revenue', 'gpm-cogs'].forEach(id => {
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

  function fmtCard(n) {
    const abs = Math.abs(n);
    const sign = n < 0 ? '−' : '';
    if (abs >= 1e9) return sign + (abs / 1e9).toFixed(2) + 'B';
    if (abs >= 1e6) return sign + (abs / 1e6).toFixed(2) + 'M';
    if (abs >= 1e3) return sign + (abs / 1e3).toFixed(2) + 'K';
    return sign + abs.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }

  function interpret(margin) {
    if (margin < 0)  return 'Negative — selling below cost';
    if (margin < 10) return 'Very low';
    if (margin < 20) return 'Below average';
    if (margin < 35) return 'Average';
    if (margin < 50) return 'Good';
    if (margin < 70) return 'Strong';
    return 'Excellent';
  }

  function calculate() {
    const revenue = parseVal('gpm-revenue');
    const cogs    = parseVal('gpm-cogs');

    if (isNaN(revenue) || isNaN(cogs) || revenue === 0) {
      document.getElementById('gpm-result').classList.add('hidden');
      return;
    }

    const grossProfit = revenue - cogs;
    const ratio       = grossProfit / revenue;
    const margin      = ratio * 100;

    document.getElementById('gpm-gross-profit-val').textContent = fmtCard(grossProfit);
    document.getElementById('gpm-margin-val').textContent       = margin.toFixed(2) + '%';
    document.getElementById('gpm-interp-val').textContent       = interpret(margin);
    document.getElementById('gpm-step1').textContent = `${fmtFull(revenue)} − ${fmtFull(cogs)} = ${fmtFull(grossProfit)}`;
    document.getElementById('gpm-step2').textContent = `${fmtFull(grossProfit)} / ${fmtFull(revenue)} = ${ratio.toFixed(6)}`;
    document.getElementById('gpm-step3').textContent = `${ratio.toFixed(6)} × 100 = ${margin.toFixed(4)}%`;

    document.getElementById('gpm-result').classList.remove('hidden');
  }
});
