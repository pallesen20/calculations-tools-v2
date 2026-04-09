document.addEventListener('DOMContentLoaded', () => {
  const aInput = document.getElementById('lp-a');
  const bInput = document.getElementById('lp-b');
  function fmt(n) {
    if (n === 0) return '0';
    if (Math.abs(n) >= 10000) return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
    return parseFloat(n.toPrecision(6)).toString();
  }
  aInput.addEventListener('input', () => {
    const v = parseFloat(aInput.value);
    bInput.value = isNaN(v) ? '' : fmt((v - 32) * 5 / 9);
  });
  bInput.addEventListener('input', () => {
    const v = parseFloat(bInput.value);
    aInput.value = isNaN(v) ? '' : fmt(v * 9 / 5 + 32);
  });
  aInput.value = '98.6';
  aInput.dispatchEvent(new Event('input'));
});
