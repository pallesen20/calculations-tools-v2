document.addEventListener('DOMContentLoaded', () => {
  const origEl = document.getElementById('pc-original');
  const newEl  = document.getElementById('pc-new');
  [origEl, newEl].forEach(el => el.addEventListener('input', calculate));

  function calculate() {
    const orig = parseFloat(origEl.value.replace(",","."));
    const newV = parseFloat(newEl.value.replace(",","."));

    if (isNaN(orig) || isNaN(newV) || orig === 0) {
      document.getElementById('pc-result').classList.add('hidden');
      return;
    }

    const diff = newV - orig;
    const pct  = (diff / orig) * 100;
    const fmt  = n => parseFloat(n.toFixed(4)).toString();
    const sign = n => n > 0 ? '+' : '';

    document.getElementById('pc-pct').textContent = sign(pct) + fmt(pct) + '%';
    document.getElementById('pc-abs').textContent = sign(diff) + fmt(diff);

    const badge = document.getElementById('pc-badge');
    if (Math.abs(pct) < 0.00001) {
      badge.textContent = 'No change';
      badge.className   = 'lbm-card-badge lbm-ffmi-average';
    } else if (pct > 0) {
      badge.textContent = 'Increase';
      badge.className   = 'lbm-card-badge lbm-ffmi-excel';
    } else {
      badge.textContent = 'Decrease';
      badge.className   = 'lbm-card-badge lbm-ffmi-below';
    }

    document.getElementById('pc-step1').textContent = `${fmt(newV)} − ${fmt(orig)} = ${fmt(diff)}`;
    document.getElementById('pc-step2').textContent = `${fmt(diff)} ÷ ${fmt(orig)} = ${fmt(diff / orig)}`;
    document.getElementById('pc-step3').textContent = `${fmt(diff / orig)} × 100 = ${fmt(pct)}%`;

    document.getElementById('pc-result').classList.remove('hidden');
  }
});
