document.addEventListener('DOMContentLoaded', () => {
  ['wc-assets', 'wc-liabilities'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calculate);
  });

  function parseVal(id) {
    const el = document.getElementById(id);
    if (!el || el.value.trim() === '') return NaN;
    const v = parseFloat(el.value.replace(/,/g, '').replace(/\s/g, ''));
    return isNaN(v) ? NaN : v;
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
    const assets      = parseVal('wc-assets');
    const liabilities = parseVal('wc-liabilities');
    if (isNaN(assets) || isNaN(liabilities)) {
      document.getElementById('wc-result').classList.add('hidden');
      return;
    }

    const wc    = assets - liabilities;
    const ratio = liabilities !== 0 ? assets / liabilities : Infinity;

    document.getElementById('wc-val').textContent    = fmtCard(wc);
    document.getElementById('wc-ratio-val').textContent = isFinite(ratio) ? ratio.toFixed(2) + 'x' : '∞';
    document.getElementById('wc-assets-out').textContent      = fmtCard(assets);
    document.getElementById('wc-liabilities-out').textContent = fmtCard(liabilities);

    document.getElementById('wc-step1').textContent = `${fmtFull(assets)} − ${fmtFull(liabilities)} = ${fmtFull(wc)}`;
    document.getElementById('wc-step2').textContent = `${fmtFull(assets)} / ${fmtFull(liabilities)} = ${isFinite(ratio) ? ratio.toFixed(2) : '∞'}`;

    const statusEl = document.getElementById('wc-status');
    if (wc > 0 && ratio >= 2) {
      statusEl.textContent = 'Strong liquidity';
      statusEl.className   = 'wc-status wc-status--good';
    } else if (wc > 0 && ratio >= 1) {
      statusEl.textContent = 'Adequate - monitor closely';
      statusEl.className   = 'wc-status wc-status--ok';
    } else {
      statusEl.textContent = 'Negative - short-term risk';
      statusEl.className   = 'wc-status wc-status--bad';
    }

    document.getElementById('wc-result').classList.remove('hidden');
  }
});
