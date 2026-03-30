document.addEventListener('DOMContentLoaded', () => {
  ['be-fixed', 'be-price', 'be-variable'].forEach(id => {
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
    const fixed    = parseVal('be-fixed');
    const price    = parseVal('be-price');
    const variable = parseVal('be-variable');

    if (isNaN(fixed) || isNaN(price) || isNaN(variable)) {
      document.getElementById('be-result').classList.add('hidden');
      return;
    }

    const cm = price - variable;
    if (cm <= 0) {
      document.getElementById('be-result').classList.add('hidden');
      return;
    }

    const cmRatio   = (cm / price) * 100;
    const beUnits   = fixed / cm;
    const beRevenue = fixed / (cmRatio / 100);

    document.getElementById('be-units').textContent    = Math.ceil(beUnits).toLocaleString('en-US');
    document.getElementById('be-revenue').textContent  = fmtCard(beRevenue);
    document.getElementById('be-cm').textContent       = fmtCard(cm);
    document.getElementById('be-cm-ratio').textContent = cmRatio.toFixed(1) + '%';

    document.getElementById('be-step1').textContent = `${fmtFull(price)} − ${fmtFull(variable)} = ${fmtFull(cm)} per unit`;
    document.getElementById('be-step2').textContent = `CM ratio: ${fmtFull(cm)} / ${fmtFull(price)} × 100 = ${cmRatio.toFixed(1)}%`;
    document.getElementById('be-step3').textContent = `Break-even units: ${fmtFull(fixed)} / ${fmtFull(cm)} = ${beUnits.toFixed(1)} → ${Math.ceil(beUnits)} units`;
    document.getElementById('be-step4').textContent = `Break-even revenue: ${fmtFull(fixed)} / ${(cmRatio / 100).toFixed(4)} = ${fmtFull(beRevenue)}`;

    document.getElementById('be-result').classList.remove('hidden');
  }
});
