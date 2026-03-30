document.addEventListener('DOMContentLoaded', () => {
  ['pe-price', 'pe-eps', 'pe-forward-eps', 'pe-target-pe'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calculate);
  });

  function parseVal(id, fallback) {
    const el = document.getElementById(id);
    if (!el || el.value.trim() === '') return fallback !== undefined ? fallback : NaN;
    const v = parseFloat(el.value.replace(/,/g, '').replace(/\s/g, ''));
    return isNaN(v) ? (fallback !== undefined ? fallback : NaN) : v;
  }

  function fmtCard(n, decimals) {
    if (!isFinite(n)) return '-';
    const d = decimals !== undefined ? decimals : 2;
    return n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
  }

  function calculate() {
    const price = parseVal('pe-price');
    const eps   = parseVal('pe-eps');
    if (isNaN(price) || isNaN(eps) || eps === 0) {
      document.getElementById('pe-result').classList.add('hidden');
      return;
    }

    const pe           = price / eps;
    const earningsYield = (eps / price) * 100;

    document.getElementById('pe-val').textContent            = pe.toFixed(1) + 'x';
    document.getElementById('pe-earnings-yield').textContent = earningsYield.toFixed(2) + '%';
    document.getElementById('pe-step1').textContent = `${fmtCard(price)} / ${fmtCard(eps)} = ${pe.toFixed(2)}x`;
    document.getElementById('pe-step2').textContent = `(${fmtCard(eps)} / ${fmtCard(price)}) × 100 = ${earningsYield.toFixed(2)}%`;

    const forwardRow = document.getElementById('pe-forward-row');
    const forwardEps = parseVal('pe-forward-eps');
    if (!isNaN(forwardEps) && forwardEps > 0) {
      const forwardPe = price / forwardEps;
      document.getElementById('pe-forward-val').textContent = forwardPe.toFixed(1) + 'x';
      document.getElementById('pe-step3').textContent = `${fmtCard(price)} / ${fmtCard(forwardEps)} = ${forwardPe.toFixed(2)}x`;
      forwardRow.classList.remove('hidden');
    } else {
      forwardRow.classList.add('hidden');
    }

    const impliedRow = document.getElementById('pe-implied-row');
    const targetPe = parseVal('pe-target-pe');
    if (!isNaN(targetPe) && targetPe > 0) {
      const impliedPrice = eps * targetPe;
      const upDownside   = ((impliedPrice - price) / price) * 100;
      document.getElementById('pe-implied-price').textContent = '$' + fmtCard(impliedPrice);
      document.getElementById('pe-updownside').textContent    = (upDownside >= 0 ? '+' : '') + upDownside.toFixed(1) + '%';
      document.getElementById('pe-step4').textContent = `${fmtCard(eps)} × ${fmtCard(targetPe, 1)} = $${fmtCard(impliedPrice)}`;
      impliedRow.classList.remove('hidden');
    } else {
      impliedRow.classList.add('hidden');
    }

    document.getElementById('pe-result').classList.remove('hidden');
  }
});
