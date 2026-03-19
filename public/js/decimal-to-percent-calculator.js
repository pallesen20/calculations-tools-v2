document.addEventListener('DOMContentLoaded', () => {
  const inputEl = document.getElementById('dtp-input');
  inputEl.addEventListener('input', calculate);

  function calculate() {
    const val = parseFloat(inputEl.value.replace(",","."));

    if (isNaN(val)) {
      document.getElementById('dtp-result').classList.add('hidden');
      return;
    }

    const pct = val * 100;
    const fmt = n => parseFloat(n.toFixed(8)).toString();
    const fmtPct = n => parseFloat(n.toFixed(4)).toString();

    document.getElementById('dtp-pct').textContent = fmtPct(pct) + '%';
    document.getElementById('dtp-rev').textContent = fmt(val);

    const badge = document.getElementById('dtp-badge');
    if (pct === 0) {
      badge.textContent = 'Zero';
      badge.className   = 'lbm-card-badge lbm-ffmi-average';
    } else if (pct < 0) {
      badge.textContent = 'Negative';
      badge.className   = 'lbm-card-badge lbm-ffmi-below';
    } else if (pct > 100) {
      badge.textContent = 'Greater than 100%';
      badge.className   = 'lbm-card-badge lbm-ffmi-excel';
    } else {
      badge.textContent = 'Between 0% and 100%';
      badge.className   = 'lbm-card-badge lbm-ffmi-average';
    }

    document.getElementById('dtp-step1').textContent = `${fmt(val)} × 100 = ${fmtPct(pct)}%`;

    document.getElementById('dtp-result').classList.remove('hidden');
  }
});
