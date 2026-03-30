document.addEventListener('DOMContentLoaded', () => {
  ['ev-market-cap', 'ev-debt', 'ev-cash', 'ev-ebitda', 'ev-revenue'].forEach(id => {
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
    const marketCap = parseVal('ev-market-cap');
    const debt      = parseVal('ev-debt', 0);
    const cash      = parseVal('ev-cash', 0);
    if (isNaN(marketCap)) {
      document.getElementById('ev-result').classList.add('hidden');
      return;
    }

    const ev = marketCap + debt - cash;

    document.getElementById('ev-val').textContent         = fmtCard(ev);
    document.getElementById('ev-mktcap-out').textContent  = fmtCard(marketCap);
    document.getElementById('ev-debt-out').textContent    = fmtCard(debt);
    document.getElementById('ev-cash-out').textContent    = fmtCard(cash);

    document.getElementById('ev-step1').textContent = `${fmtFull(marketCap)} + ${fmtFull(debt)} − ${fmtFull(cash)} = ${fmtFull(ev)}`;

    const multiplesRow = document.getElementById('ev-multiples-row');
    const ebitda  = parseVal('ev-ebitda');
    const revenue = parseVal('ev-revenue');
    let showMultiples = false;

    if (!isNaN(ebitda) && ebitda > 0) {
      const evEbitda = ev / ebitda;
      document.getElementById('ev-ebitda-multiple').textContent = evEbitda.toFixed(1) + 'x';
      document.getElementById('ev-step2').textContent = `EV/EBITDA = ${fmtFull(ev)} / ${fmtFull(ebitda)} = ${evEbitda.toFixed(1)}x`;
      showMultiples = true;
    } else {
      document.getElementById('ev-ebitda-multiple').textContent = '-';
      document.getElementById('ev-step2').textContent = '-';
    }

    if (!isNaN(revenue) && revenue > 0) {
      const evRev = ev / revenue;
      document.getElementById('ev-rev-multiple').textContent = evRev.toFixed(1) + 'x';
      document.getElementById('ev-step3').textContent = `EV/Revenue = ${fmtFull(ev)} / ${fmtFull(revenue)} = ${evRev.toFixed(1)}x`;
      showMultiples = true;
    } else {
      document.getElementById('ev-rev-multiple').textContent = '-';
      document.getElementById('ev-step3').textContent = '-';
    }

    multiplesRow.style.display = showMultiples ? '' : 'none';
    document.getElementById('ev-result').classList.remove('hidden');
  }
});
