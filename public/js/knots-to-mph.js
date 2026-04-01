document.addEventListener('DOMContentLoaded', () => {
  const FACTOR = 1852 / 1609.344;

  const aInput = document.getElementById('km-a');
  const bInput = document.getElementById('km-b');

  function fmt(n) {
    if (n === 0) return '0';
    if (Math.abs(n) >= 1000) return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
    return parseFloat(n.toPrecision(6)).toString();
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
