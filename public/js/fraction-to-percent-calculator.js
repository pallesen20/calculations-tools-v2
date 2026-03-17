document.addEventListener('DOMContentLoaded', () => {
  const numEl = document.getElementById('ftp-num');
  const denEl = document.getElementById('ftp-den');
  [numEl, denEl].forEach(el => el.addEventListener('input', calculate));

  function calculate() {
    const num = parseFloat(numEl.value);
    const den = parseFloat(denEl.value);

    if (isNaN(num) || isNaN(den) || den === 0) {
      document.getElementById('ftp-result').classList.add('hidden');
      return;
    }

    const decimal = num / den;
    const pct     = decimal * 100;
    const fmt     = n => parseFloat(n.toFixed(6)).toString();
    const fmtPct  = n => parseFloat(n.toFixed(4)).toString();

    document.getElementById('ftp-pct').textContent = fmtPct(pct) + '%';
    document.getElementById('ftp-dec').textContent = fmt(decimal);

    const badge = document.getElementById('ftp-badge');
    if (Math.abs(pct - 100) < 0.00001) {
      badge.textContent = 'Unit fraction';
      badge.className   = 'lbm-card-badge lbm-ffmi-average';
    } else if (pct > 100) {
      badge.textContent = 'Improper fraction';
      badge.className   = 'lbm-card-badge lbm-ffmi-excel';
    } else if (pct > 0) {
      badge.textContent = 'Proper fraction';
      badge.className   = 'lbm-card-badge lbm-ffmi-average';
    } else {
      badge.textContent = 'Negative';
      badge.className   = 'lbm-card-badge lbm-ffmi-below';
    }

    document.getElementById('ftp-step1').textContent = `${fmt(num)} ÷ ${fmt(den)} = ${fmt(decimal)}`;
    document.getElementById('ftp-step2').textContent = `${fmt(decimal)} × 100 = ${fmtPct(pct)}%`;

    document.getElementById('ftp-result').classList.remove('hidden');
  }
});
