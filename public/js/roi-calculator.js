document.addEventListener('DOMContentLoaded', () => {
  ['roi-initial', 'roi-final', 'roi-years'].forEach(id => {
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
    const initial = parseVal('roi-initial');
    const final   = parseVal('roi-final');
    if (isNaN(initial) || isNaN(final) || initial === 0) {
      document.getElementById('roi-result').classList.add('hidden');
      return;
    }

    const netReturn = final - initial;
    const roi       = (netReturn / initial) * 100;
    const multiple  = final / initial;
    const years     = parseVal('roi-years');

    document.getElementById('roi-net-return').textContent = fmtCard(netReturn);
    document.getElementById('roi-pct').textContent        = roi.toFixed(2) + '%';
    document.getElementById('roi-multiple').textContent   = multiple.toFixed(2) + 'x';

    document.getElementById('roi-step1').textContent = `${fmtFull(final)} − ${fmtFull(initial)} = ${fmtFull(netReturn)}`;
    document.getElementById('roi-step2').textContent = `(${fmtFull(netReturn)} / ${fmtFull(initial)}) × 100 = ${roi.toFixed(2)}%`;

    const annRow = document.getElementById('roi-ann-row');
    if (!isNaN(years) && years > 0 && multiple > 0) {
      const ann = (Math.pow(multiple, 1 / years) - 1) * 100;
      document.getElementById('roi-ann-val').textContent = ann.toFixed(2) + '%';
      document.getElementById('roi-step3').textContent   = `(${multiple.toFixed(4)}^(1/${years}) − 1) × 100 = ${ann.toFixed(2)}%`;
      annRow.classList.remove('hidden');
    } else {
      annRow.classList.add('hidden');
    }

    document.getElementById('roi-result').classList.remove('hidden');
  }
});
