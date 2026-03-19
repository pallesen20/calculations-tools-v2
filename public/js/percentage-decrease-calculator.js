document.addEventListener('DOMContentLoaded', () => {
  const origEl = document.getElementById('pd-original');
  const newEl  = document.getElementById('pd-new');
  [origEl, newEl].forEach(el => el.addEventListener('input', calculate));

  function calculate() {
    const orig = parseFloat(origEl.value.replace(",","."));
    const newV = parseFloat(newEl.value.replace(",","."));

    if (isNaN(orig) || isNaN(newV) || orig === 0) {
      document.getElementById('pd-result').classList.add('hidden');
      return;
    }

    const diff = orig - newV;
    const pct  = (diff / orig) * 100;
    const fmt  = n => parseFloat(n.toFixed(4)).toString();
    const sign = n => n > 0 ? '+' : '';

    document.getElementById('pd-pct').textContent = fmt(pct) + '%';
    document.getElementById('pd-abs').textContent = sign(-diff) + fmt(diff);

    const badge = document.getElementById('pd-badge');
    if (Math.abs(pct) < 0.00001) {
      badge.textContent = 'No change';
      badge.className   = 'lbm-card-badge lbm-ffmi-average';
    } else if (pct > 0) {
      badge.textContent = 'Decrease';
      badge.className   = 'lbm-card-badge lbm-ffmi-below';
    } else {
      badge.textContent = 'Increase';
      badge.className   = 'lbm-card-badge lbm-ffmi-excel';
    }

    document.getElementById('pd-step1').textContent = `${fmt(orig)} − ${fmt(newV)} = ${fmt(diff)}`;
    document.getElementById('pd-step2').textContent = `${fmt(diff)} ÷ ${fmt(orig)} = ${fmt(diff / orig)}`;
    document.getElementById('pd-step3').textContent = `${fmt(diff / orig)} × 100 = ${fmt(pct)}%`;

    document.getElementById('pd-result').classList.remove('hidden');
  }
});
