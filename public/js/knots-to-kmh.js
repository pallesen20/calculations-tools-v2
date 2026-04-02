document.addEventListener('DOMContentLoaded', () => {
  const FACTOR = 1.852;

  const aInput = document.getElementById('kk-a');
  const bInput = document.getElementById('kk-b');

  function fmt(n) {
    return n >= 1000
      ? n.toLocaleString('en-US', { maximumFractionDigits: 2 })
      : parseFloat(n.toPrecision(6)).toString();
  }

  aInput.addEventListener('input', () => {
    const v = parseFloat(aInput.value);
    bInput.value = isNaN(v) ? '' : fmt(v * FACTOR);
  });

  bInput.addEventListener('input', () => {
    const v = parseFloat(bInput.value);
    aInput.value = isNaN(v) ? '' : fmt(v / FACTOR);
  });

  aInput.value = '20';
  aInput.dispatchEvent(new Event('input'));
});
