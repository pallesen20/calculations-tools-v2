document.addEventListener('DOMContentLoaded', () => {
  const origEl = document.getElementById('pi-original');
  const newEl  = document.getElementById('pi-new');
  [origEl, newEl].forEach(el => el.addEventListener('input', calculate));

  function calculate() {
    const orig = parseFloat(origEl.value.replace(",","."));
    const newV = parseFloat(newEl.value.replace(",","."));

    if (isNaN(orig) || isNaN(newV) || orig === 0) {
      document.getElementById('pi-result').classList.add('hidden');
      return;
    }

    const diff = newV - orig;
    const pct  = (diff / orig) * 100;
    const fmt  = n => parseFloat(n.toFixed(4)).toString();
    const sign = n => n > 0 ? '+' : '';

    document.getElementById('pi-pct').textContent = sign(pct) + fmt(pct) + '%';
    document.getElementById('pi-abs').textContent = sign(diff) + fmt(diff);

    const badge = document.getElementById('pi-badge');
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

    document.getElementById('pi-step1').textContent = `${fmt(newV)} − ${fmt(orig)} = ${fmt(diff)}`;
    document.getElementById('pi-step2').textContent = `${fmt(diff)} ÷ ${fmt(orig)} = ${fmt(diff / orig)}`;
    document.getElementById('pi-step3').textContent = `${fmt(diff / orig)} × 100 = ${fmt(pct)}%`;

    document.getElementById('pi-result').classList.remove('hidden');
  }
});
