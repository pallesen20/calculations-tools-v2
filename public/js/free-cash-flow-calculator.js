document.addEventListener('DOMContentLoaded', () => {
  ['fcf-ocf', 'fcf-capex', 'fcf-market-cap'].forEach(id => {
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
    const ocf   = parseVal('fcf-ocf');
    const capex = parseVal('fcf-capex');
    if (isNaN(ocf) || isNaN(capex)) {
      document.getElementById('fcf-result').classList.add('hidden');
      return;
    }

    const fcf = ocf - capex;

    document.getElementById('fcf-val').textContent  = fmtCard(fcf);
    document.getElementById('fcf-ocf-out').textContent   = fmtCard(ocf);
    document.getElementById('fcf-capex-out').textContent = fmtCard(capex);

    document.getElementById('fcf-step1').textContent = `${fmtFull(ocf)} − ${fmtFull(capex)} = ${fmtFull(fcf)}`;

    const yieldRow = document.getElementById('fcf-yield-row');
    const marketCap = parseVal('fcf-market-cap');
    if (!isNaN(marketCap) && marketCap > 0) {
      const fcfYield = (fcf / marketCap) * 100;
      document.getElementById('fcf-yield-val').textContent = fcfYield.toFixed(2) + '%';
      document.getElementById('fcf-step2').textContent = `(${fmtFull(fcf)} / ${fmtFull(marketCap)}) × 100 = ${fcfYield.toFixed(2)}%`;
      yieldRow.classList.remove('hidden');
    } else {
      yieldRow.classList.add('hidden');
    }

    document.getElementById('fcf-result').classList.remove('hidden');
  }
});
