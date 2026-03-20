document.addEventListener('DOMContentLoaded', () => {
  const aEl = document.getElementById('rc-a');
  const bEl = document.getElementById('rc-b');
  const scaleEl = document.getElementById('rc-scale');
  [aEl, bEl, scaleEl].forEach(el => el.addEventListener('input', calculate));

  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; }

  function calculate() {
    const a = parseFloat(aEl.value.replace(',', '.'));
    const b = parseFloat(bEl.value.replace(',', '.'));
    const scale = parseFloat(scaleEl.value.replace(',', '.'));

    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
      document.getElementById('rc-result').classList.add('hidden');
      return;
    }

    const g = gcd(Math.round(a * 1e6), Math.round(b * 1e6)) / 1e6;
    const sA = a / g;
    const sB = b / g;

    document.getElementById('rc-simplified').textContent = `${+sA.toFixed(6)} : ${+sB.toFixed(6)}`;
    document.getElementById('rc-fraction').textContent   = `${a}/${b}`;
    document.getElementById('rc-decimal').textContent    = parseFloat((a / b).toFixed(6)).toString();
    document.getElementById('rc-step1').textContent      = `GCD(${a}, ${b}) = ${+g.toFixed(6)}`;
    document.getElementById('rc-step2').textContent      = `${a} ÷ ${+g.toFixed(6)} = ${+sA.toFixed(6)}, ${b} ÷ ${+g.toFixed(6)} = ${+sB.toFixed(6)}`;

    if (!isNaN(scale) && scale > 0) {
      document.getElementById('rc-scaled-a').textContent = parseFloat((sA * scale).toFixed(6)).toString();
      document.getElementById('rc-scaled-b').textContent = parseFloat((sB * scale).toFixed(6)).toString();
      document.getElementById('rc-scale-row').classList.remove('hidden');
    } else {
      document.getElementById('rc-scale-row').classList.add('hidden');
    }

    document.getElementById('rc-result').classList.remove('hidden');
  }
});
