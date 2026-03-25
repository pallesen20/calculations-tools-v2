document.addEventListener('DOMContentLoaded', () => {
  ['roe-net-income', 'roe-equity', 'roe-net-margin', 'roe-asset-turnover', 'roe-equity-multiplier'].forEach(id => {
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
    if (!isFinite(n)) return '—';
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
    const netIncome = parseVal('roe-net-income');
    const equity    = parseVal('roe-equity');

    if (!isNaN(netIncome) && !isNaN(equity) && equity !== 0) {
      const roe = (netIncome / equity) * 100;
      document.getElementById('roe-val').textContent  = roe.toFixed(2) + '%';
      document.getElementById('roe-step1').textContent = `(${fmtFull(netIncome)} / ${fmtFull(equity)}) × 100 = ${roe.toFixed(2)}%`;
      document.getElementById('roe-result').classList.remove('hidden');
    } else {
      document.getElementById('roe-result').classList.add('hidden');
    }

    const netMargin     = parseVal('roe-net-margin');
    const assetTurnover = parseVal('roe-asset-turnover');
    const equityMult    = parseVal('roe-equity-multiplier');
    const dupontRow     = document.getElementById('roe-dupont-row');

    if (!isNaN(netMargin) && !isNaN(assetTurnover) && !isNaN(equityMult)) {
      const dupont = netMargin * assetTurnover * equityMult;
      document.getElementById('roe-dupont-val').textContent = dupont.toFixed(2) + '%';
      document.getElementById('roe-step2').textContent = `${netMargin.toFixed(2)}% × ${assetTurnover.toFixed(2)} × ${equityMult.toFixed(2)} = ${dupont.toFixed(2)}%`;
      dupontRow.classList.remove('hidden');
    } else {
      dupontRow.classList.add('hidden');
    }
  }
});
