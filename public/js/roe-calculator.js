document.addEventListener('DOMContentLoaded', () => {
  ['roe-net-income', 'roe-equity', 'roe-net-margin', 'roe-asset-turnover', 'roe-equity-multiplier', 'roe-total-assets', 'roe-payout-ratio'].forEach(id => {
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

  function setCard(cardId, show) {
    document.getElementById(cardId).classList.toggle('hidden', !show);
  }

  function calculate() {
    const netIncome = parseVal('roe-net-income');
    const equity    = parseVal('roe-equity');

    if (isNaN(netIncome) || isNaN(equity) || equity === 0) {
      document.getElementById('roe-result').classList.add('hidden');
      return;
    }

    const roe = (netIncome / equity) * 100;
    document.getElementById('roe-val').textContent   = roe.toFixed(2) + '%';
    document.getElementById('roe-step1').textContent = `(${fmtFull(netIncome)} / ${fmtFull(equity)}) × 100 = ${roe.toFixed(2)}%`;
    document.getElementById('roe-result').classList.remove('hidden');

    const totalAssets  = parseVal('roe-total-assets');
    const hasRoa = !isNaN(totalAssets) && totalAssets > 0;
    if (hasRoa) {
      const roa = (netIncome / totalAssets) * 100;
      document.getElementById('roe-roa-val').textContent    = roa.toFixed(2) + '%';
      document.getElementById('roe-step-roa').textContent   = `(${fmtFull(netIncome)} / ${fmtFull(totalAssets)}) × 100 = ${roa.toFixed(2)}%`;
    }
    setCard('roe-card-roa', hasRoa);
    document.getElementById('roe-step-roa-wrap').classList.toggle('hidden', !hasRoa);

    const payoutRatio = parseVal('roe-payout-ratio');
    const hasSgr = !isNaN(payoutRatio) && payoutRatio >= 0 && payoutRatio <= 100;
    if (hasSgr) {
      const sgr = roe * (1 - payoutRatio / 100);
      document.getElementById('roe-sgr-val').textContent  = sgr.toFixed(2) + '%';
      document.getElementById('roe-step-sgr').textContent = `${roe.toFixed(2)}% × (1 - ${payoutRatio.toFixed(1)}%) = ${sgr.toFixed(2)}%`;
    }
    setCard('roe-card-sgr', hasSgr);
    document.getElementById('roe-step-sgr-wrap').classList.toggle('hidden', !hasSgr);

    const netMargin     = parseVal('roe-net-margin');
    const assetTurnover = parseVal('roe-asset-turnover');
    const equityMult    = parseVal('roe-equity-multiplier');
    const hasDupont = !isNaN(netMargin) && !isNaN(assetTurnover) && !isNaN(equityMult);
    if (hasDupont) {
      const dupont = netMargin * assetTurnover * equityMult;
      document.getElementById('roe-dupont-val').textContent = dupont.toFixed(2) + '%';
      document.getElementById('roe-step2').textContent      = `${netMargin.toFixed(2)}% × ${assetTurnover.toFixed(2)} × ${equityMult.toFixed(2)} = ${dupont.toFixed(2)}%`;
    }
    setCard('roe-card-dupont', hasDupont);
    document.getElementById('roe-step2-wrap').classList.toggle('hidden', !hasDupont);
  }
});
