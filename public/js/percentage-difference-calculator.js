document.addEventListener('DOMContentLoaded', () => {
  const v1El = document.getElementById('pdi-v1');
  const v2El = document.getElementById('pdi-v2');
  [v1El, v2El].forEach(el => el.addEventListener('input', calculate));

  function calculate() {
    const v1 = parseFloat(v1El.value.replace(",","."));
    const v2 = parseFloat(v2El.value.replace(",","."));

    if (isNaN(v1) || isNaN(v2)) {
      document.getElementById('pdi-result').classList.add('hidden');
      return;
    }

    const avg = (v1 + v2) / 2;

    if (avg === 0) {
      document.getElementById('pdi-result').classList.add('hidden');
      return;
    }

    const absDiff = Math.abs(v1 - v2);
    const pct     = (absDiff / avg) * 100;
    const fmt      = n => parseFloat(n.toFixed(4)).toString();

    document.getElementById('pdi-pct').textContent = fmt(pct) + '%';
    document.getElementById('pdi-abs').textContent = fmt(absDiff);

    const badge = document.getElementById('pdi-badge');
    if (absDiff < 0.00001) {
      badge.textContent = 'No difference';
      badge.className   = 'lbm-card-badge lbm-ffmi-average';
    } else {
      badge.textContent = 'Difference';
      badge.className   = 'lbm-card-badge lbm-ffmi-below';
    }

    document.getElementById('pdi-step1').textContent = `|${fmt(v1)} − ${fmt(v2)}| = ${fmt(absDiff)}`;
    document.getElementById('pdi-step2').textContent = `(${fmt(v1)} + ${fmt(v2)}) ÷ 2 = ${fmt(avg)}`;
    document.getElementById('pdi-step3').textContent = `${fmt(absDiff)} ÷ ${fmt(avg)} × 100 = ${fmt(pct)}%`;

    document.getElementById('pdi-result').classList.remove('hidden');
  }
});
