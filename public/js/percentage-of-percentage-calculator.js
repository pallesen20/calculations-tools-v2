document.addEventListener('DOMContentLoaded', () => {
  const p1El = document.getElementById('pop-p1');
  const p2El = document.getElementById('pop-p2');
  [p1El, p2El].forEach(el => el.addEventListener('input', calculate));

  function calculate() {
    const p1 = parseFloat(p1El.value.replace(",","."));
    const p2 = parseFloat(p2El.value.replace(",","."));

    if (isNaN(p1) || isNaN(p2)) {
      document.getElementById('pop-result').classList.add('hidden');
      return;
    }

    const result  = (p1 / 100) * p2;
    const decimal = p1 / 100;
    const fmt     = n => parseFloat(n.toFixed(6)).toString();
    const fmtPct  = n => parseFloat(n.toFixed(4)).toString();

    document.getElementById('pop-pct').textContent = fmtPct(result) + '%';
    document.getElementById('pop-eq').textContent  =
      fmtPct(p1) + '% of ' + fmtPct(p2) + '% = ' + fmtPct(result) + '%';

    document.getElementById('pop-step1').textContent =
      `${fmtPct(p1)}% ÷ 100 = ${fmt(decimal)}`;
    document.getElementById('pop-step2').textContent =
      `${fmt(decimal)} × ${fmtPct(p2)}% = ${fmtPct(result)}%`;

    document.getElementById('pop-result').classList.remove('hidden');
  }
});
