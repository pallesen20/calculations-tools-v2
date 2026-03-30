document.addEventListener('DOMContentLoaded', () => {
  ['cm-revenue', 'cm-variable', 'cm-units', 'cm-fixed'].forEach(id => {
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
    const revenue  = parseVal('cm-revenue');
    const variable = parseVal('cm-variable');
    if (isNaN(revenue) || isNaN(variable)) {
      document.getElementById('cm-result').classList.add('hidden');
      return;
    }

    const cm      = revenue - variable;
    const cmRatio = revenue !== 0 ? (cm / revenue) * 100 : 0;

    document.getElementById('cm-val').textContent       = fmtCard(cm);
    document.getElementById('cm-ratio-val').textContent = cmRatio.toFixed(1) + '%';

    document.getElementById('cm-step1').textContent = `${fmtFull(revenue)} − ${fmtFull(variable)} = ${fmtFull(cm)}`;
    document.getElementById('cm-step2').textContent = `${fmtFull(cm)} / ${fmtFull(revenue)} × 100 = ${cmRatio.toFixed(2)}%`;

    const profitRow = document.getElementById('cm-profit-row');
    const fixed = parseVal('cm-fixed');
    if (!isNaN(fixed)) {
      const profit    = cm - fixed;
      const profitPct = revenue !== 0 ? (profit / revenue) * 100 : 0;
      document.getElementById('cm-profit-val').textContent   = fmtCard(profit);
      document.getElementById('cm-profitpct-val').textContent = profitPct.toFixed(1) + '%';
      document.getElementById('cm-step3').textContent = `${fmtFull(cm)} − ${fmtFull(fixed)} = ${fmtFull(profit)}`;
      profitRow.classList.remove('hidden');
    } else {
      profitRow.classList.add('hidden');
    }

    const perUnitRow = document.getElementById('cm-perunit-row');
    const units = parseVal('cm-units');
    if (!isNaN(units) && units > 0) {
      const cmPerUnit = cm / units;
      const revPerUnit = revenue / units;
      const varPerUnit = variable / units;
      document.getElementById('cm-perunit-val').textContent = fmtCard(cmPerUnit);
      document.getElementById('cm-step4').textContent = `Per unit: ${fmtFull(revPerUnit)} − ${fmtFull(varPerUnit)} = ${fmtFull(cmPerUnit)}`;
      perUnitRow.classList.remove('hidden');
    } else {
      perUnitRow.classList.add('hidden');
    }

    document.getElementById('cm-result').classList.remove('hidden');
  }
});
