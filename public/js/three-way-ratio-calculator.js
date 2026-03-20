document.addEventListener('DOMContentLoaded', () => {
  const aEl      = document.getElementById('tw-a');
  const bEl      = document.getElementById('tw-b');
  const cEl      = document.getElementById('tw-c');
  const totalEl  = document.getElementById('tw-total');

  [aEl, bEl, cEl, totalEl].forEach(el => el.addEventListener('input', calculate));

  function fmt(n) {
    return parseFloat(n.toFixed(6)).toString();
  }

  function calculate() {
    const a     = parseFloat(aEl.value.replace(',', '.'));
    const b     = parseFloat(bEl.value.replace(',', '.'));
    const c     = parseFloat(cEl.value.replace(',', '.'));
    const total = parseFloat(totalEl.value.replace(',', '.'));

    if (isNaN(a) || isNaN(b) || isNaN(c) || a < 0 || b < 0 || c < 0 || (a === 0 && b === 0 && c === 0)) {
      document.getElementById('tw-result').classList.add('hidden');
      return;
    }

    const parts   = a + b + c;
    const pctA    = (a / parts) * 100;
    const pctB    = (b / parts) * 100;
    const pctC    = (c / parts) * 100;

    document.getElementById('tw-pct-a').textContent = fmt(pctA) + '%';
    document.getElementById('tw-pct-b').textContent = fmt(pctB) + '%';
    document.getElementById('tw-pct-c').textContent = fmt(pctC) + '%';
    document.getElementById('tw-step1').textContent = `Total parts = ${fmt(a)} + ${fmt(b)} + ${fmt(c)} = ${fmt(parts)}`;
    document.getElementById('tw-step2').textContent = `A: ${fmt(a)}/${fmt(parts)} = ${fmt(pctA)}%  |  B: ${fmt(b)}/${fmt(parts)} = ${fmt(pctB)}%  |  C: ${fmt(c)}/${fmt(parts)} = ${fmt(pctC)}%`;

    const splitRow   = document.getElementById('tw-split-row');
    const splitCards = document.getElementById('tw-split-cards');

    if (!isNaN(total) && total > 0) {
      const shareA = (a / parts) * total;
      const shareB = (b / parts) * total;
      const shareC = (c / parts) * total;
      document.getElementById('tw-share-a').textContent = fmt(shareA);
      document.getElementById('tw-share-b').textContent = fmt(shareB);
      document.getElementById('tw-share-c').textContent = fmt(shareC);
      document.getElementById('tw-step3').textContent   = `A: ${fmt(total)} × ${fmt(a/parts)} = ${fmt(shareA)}  |  B: ${fmt(total)} × ${fmt(b/parts)} = ${fmt(shareB)}  |  C: ${fmt(total)} × ${fmt(c/parts)} = ${fmt(shareC)}`;
      splitRow.classList.remove('hidden');
      splitCards.classList.remove('hidden');
    } else {
      splitRow.classList.add('hidden');
      splitCards.classList.add('hidden');
    }

    document.getElementById('tw-result').classList.remove('hidden');
  }
});
