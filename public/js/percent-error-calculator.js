document.addEventListener('DOMContentLoaded', () => {
  const expEl  = document.getElementById('pe-experimental');
  const theoEl = document.getElementById('pe-theoretical');
  [expEl, theoEl].forEach(el => el.addEventListener('input', calculate));

  function calculate() {
    const exp  = parseFloat(expEl.value.replace(",","."));
    const theo = parseFloat(theoEl.value.replace(",","."));

    if (isNaN(exp) || isNaN(theo) || theo === 0) {
      document.getElementById('pe-result').classList.add('hidden');
      return;
    }

    const diff     = exp - theo;
    const absDiff  = Math.abs(diff);
    const pctError = (absDiff / Math.abs(theo)) * 100;
    const signed   = (diff / Math.abs(theo)) * 100;
    const fmt      = n => parseFloat(n.toFixed(4)).toString();
    const sign     = n => n > 0 ? '+' : '';

    document.getElementById('pe-pct').textContent    = fmt(pctError) + '%';
    document.getElementById('pe-signed').textContent = sign(signed) + fmt(signed) + '%';
    document.getElementById('pe-abs').textContent    = sign(diff) + fmt(diff);

    document.getElementById('pe-step1').textContent = `|${fmt(exp)} − ${fmt(theo)}| = ${fmt(absDiff)}`;
    document.getElementById('pe-step2').textContent = `${fmt(absDiff)} ÷ |${fmt(theo)}| = ${fmt(absDiff / Math.abs(theo))}`;
    document.getElementById('pe-step3').textContent = `${fmt(absDiff / Math.abs(theo))} × 100 = ${fmt(pctError)}%`;

    document.getElementById('pe-result').classList.remove('hidden');
  }
});
