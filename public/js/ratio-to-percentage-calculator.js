document.addEventListener('DOMContentLoaded', () => {
  const aEl = document.getElementById('rp-a');
  const bEl = document.getElementById('rp-b');
  [aEl, bEl].forEach(el => el.addEventListener('input', calculate));

  function fmt(n) {
    return parseFloat(n.toFixed(6)).toString();
  }

  function calculate() {
    const a = parseFloat(aEl.value.replace(',', '.'));
    const b = parseFloat(bEl.value.replace(',', '.'));

    if (isNaN(a) || isNaN(b) || a < 0 || b < 0 || (a === 0 && b === 0)) {
      document.getElementById('rp-result').classList.add('hidden');
      return;
    }

    const total  = a + b;
    const pctA   = (a / total) * 100;
    const pctB   = (b / total) * 100;
    const decA   = a / total;
    const decB   = b / total;

    document.getElementById('rp-pct-a').textContent   = fmt(pctA) + '%';
    document.getElementById('rp-pct-b').textContent   = fmt(pctB) + '%';
    document.getElementById('rp-dec-a').textContent   = fmt(decA);
    document.getElementById('rp-dec-b').textContent   = fmt(decB);
    document.getElementById('rp-total').textContent   = fmt(total);
    document.getElementById('rp-step1').textContent   = `Total parts = ${fmt(a)} + ${fmt(b)} = ${fmt(total)}`;
    document.getElementById('rp-step2').textContent   = `A: ${fmt(a)} ÷ ${fmt(total)} × 100 = ${fmt(pctA)}%`;
    document.getElementById('rp-step3').textContent   = `B: ${fmt(b)} ÷ ${fmt(total)} × 100 = ${fmt(pctB)}%`;

    document.getElementById('rp-result').classList.remove('hidden');
  }
});
