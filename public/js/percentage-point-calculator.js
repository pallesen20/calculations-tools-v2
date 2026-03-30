document.addEventListener('DOMContentLoaded', () => {
  const aEl = document.getElementById('pp-a');
  const bEl = document.getElementById('pp-b');
  [aEl, bEl].forEach(el => el.addEventListener('input', calculate));

  function calculate() {
    const a = parseFloat(aEl.value.replace(",","."));
    const b = parseFloat(bEl.value.replace(",","."));

    if (isNaN(a) || isNaN(b)) {
      document.getElementById('pp-result').classList.add('hidden');
      return;
    }

    const ppDiff    = a - b;
    const pctChange = b !== 0 ? (ppDiff / Math.abs(b)) * 100 : null;
    const fmt       = n => parseFloat(n.toFixed(4)).toString();
    const sign      = n => n > 0 ? '+' : '';

    document.getElementById('pp-diff').textContent       = sign(ppDiff) + fmt(ppDiff) + ' pp';
    document.getElementById('pp-pct-change').textContent = pctChange !== null
      ? sign(pctChange) + fmt(pctChange) + '%'
      : '-';
    document.getElementById('pp-step1').textContent = `${fmt(a)}% − ${fmt(b)}% = ${sign(ppDiff)}${fmt(ppDiff)} pp`;
    document.getElementById('pp-step2').textContent = pctChange !== null
      ? `${sign(ppDiff)}${fmt(ppDiff)} ÷ |${fmt(b)}| × 100 = ${sign(pctChange)}${fmt(pctChange)}%`
      : '-';

    document.getElementById('pp-result').classList.remove('hidden');
  }
});
