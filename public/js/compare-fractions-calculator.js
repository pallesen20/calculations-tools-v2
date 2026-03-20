document.addEventListener('DOMContentLoaded', () => {
  const n1El = document.getElementById('cf-n1');
  const d1El = document.getElementById('cf-d1');
  const n2El = document.getElementById('cf-n2');
  const d2El = document.getElementById('cf-d2');
  [n1El, d1El, n2El, d2El].forEach(el => el.addEventListener('input', calculate));

  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; }
  function lcm(a, b) { return Math.abs(a * b) / gcd(a, b); }

  function fmt(n) { return parseFloat(n.toFixed(8)).toString(); }

  function calculate() {
    const n1 = parseFloat(n1El.value.replace(',', '.'));
    const d1 = parseFloat(d1El.value.replace(',', '.'));
    const n2 = parseFloat(n2El.value.replace(',', '.'));
    const d2 = parseFloat(d2El.value.replace(',', '.'));

    if ([n1, d1, n2, d2].some(isNaN) || d1 === 0 || d2 === 0) {
      document.getElementById('cf-result').classList.add('hidden');
      return;
    }

    const cross1 = n1 * d2;
    const cross2 = n2 * d1;

    let symbol, label;
    if (cross1 > cross2)      { symbol = '>'; label = 'First fraction is greater'; }
    else if (cross1 < cross2) { symbol = '<'; label = 'Second fraction is greater'; }
    else                      { symbol = '='; label = 'The fractions are equal'; }

    const dec1 = n1 / d1;
    const dec2 = n2 / d2;

    const lcd = lcm(Math.abs(d1), Math.abs(d2));
    const eq1n = n1 * (lcd / d1);
    const eq2n = n2 * (lcd / d2);

    document.getElementById('cf-symbol').textContent = symbol;
    document.getElementById('cf-label').textContent  = label;
    document.getElementById('cf-dec1').textContent   = parseFloat(dec1.toFixed(6)).toString();
    document.getElementById('cf-dec2').textContent   = parseFloat(dec2.toFixed(6)).toString();
    document.getElementById('cf-lcd').textContent    = lcd;
    document.getElementById('cf-equiv1').textContent = `${fmt(eq1n)}/${lcd}`;
    document.getElementById('cf-equiv2').textContent = `${fmt(eq2n)}/${lcd}`;
    document.getElementById('cf-step1').textContent  = `${n1} × ${d2} = ${cross1}`;
    document.getElementById('cf-step2').textContent  = `${n2} × ${d1} = ${cross2}`;
    document.getElementById('cf-result').classList.remove('hidden');
  }
});
