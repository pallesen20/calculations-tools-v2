document.addEventListener('DOMContentLoaded', () => {
  const ebitInput = document.getElementById('roc-ebit');
  const assetsInput = document.getElementById('roc-assets');
  const liabInput = document.getElementById('roc-liabilities');
  const resultEl = document.getElementById('roc-result');

  function fmt(n) {
    const abs = Math.abs(n);
    if (abs >= 1e9) return (n / 1e9).toFixed(2) + 'B';
    if (abs >= 1e6) return (n / 1e6).toFixed(2) + 'M';
    if (abs >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return n.toFixed(0);
  }

  function calculate() {
    const ebit = parseFloat(ebitInput.value);
    const assets = parseFloat(assetsInput.value);
    const liab = parseFloat(liabInput.value);

    if (isNaN(ebit) || isNaN(assets) || isNaN(liab)) {
      resultEl.classList.add('hidden');
      return;
    }

    const ce = assets - liab;
    if (ce <= 0) {
      resultEl.classList.add('hidden');
      return;
    }

    const roce = (ebit / ce) * 100;

    document.getElementById('roc-card-ce').textContent = fmt(ce);
    document.getElementById('roc-card-roce').textContent = roce.toFixed(1) + '%';
    document.getElementById('roc-step1').textContent = fmt(assets) + ' - ' + fmt(liab) + ' = ' + fmt(ce);
    document.getElementById('roc-step2').textContent = fmt(ebit) + ' / ' + fmt(ce) + ' × 100 = ' + roce.toFixed(2) + '%';

    let label = '';
    let cls = '';
    if (roce >= 20) { label = 'Strong (above 20%)'; cls = 'roc-badge--good'; }
    else if (roce >= 12) { label = 'Moderate (12-20%)'; cls = 'roc-badge--moderate'; }
    else if (roce >= 0) { label = 'Low (below 12%) - compare to WACC'; cls = 'roc-badge--low'; }
    else { label = 'Negative ROCE - operating loss'; cls = 'roc-badge--negative'; }

    const badge = document.getElementById('roc-badge');
    badge.textContent = label;
    badge.className = 'roc-badge ' + cls;

    resultEl.classList.remove('hidden');
  }

  [ebitInput, assetsInput, liabInput].forEach(el => {
    el.addEventListener('input', calculate);
    el.addEventListener('change', calculate);
  });
});
