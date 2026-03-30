document.addEventListener('DOMContentLoaded', () => {
  const nEl = document.getElementById('itm-n');
  const dEl = document.getElementById('itm-d');
  [nEl, dEl].forEach(el => el.addEventListener('input', calculate));

  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; }

  function calculate() {
    const n = parseInt(nEl.value.replace(',', '.'), 10);
    const d = parseInt(dEl.value.replace(',', '.'), 10);
    if (isNaN(n) || isNaN(d) || d === 0) {
      document.getElementById('itm-result').classList.add('hidden');
      return;
    }
    const negative = (n < 0) !== (d < 0);
    const absN = Math.abs(n), absD = Math.abs(d);
    const whole = Math.floor(absN / absD);
    const rem   = absN % absD;
    const g     = gcd(rem, absD);
    const sn    = rem / g;
    const sd    = absD / g;
    const decimal = n / d;

    document.getElementById('itm-whole').textContent   = (negative && whole > 0 ? '-' : '') + whole;
    document.getElementById('itm-rem-n').textContent   = sn;
    document.getElementById('itm-rem-d').textContent   = sd;
    document.getElementById('itm-decimal').textContent = parseFloat(decimal.toFixed(6)).toString();
    document.getElementById('itm-step1').textContent   = `${absN} ÷ ${absD} = ${whole} remainder ${rem}`;
    document.getElementById('itm-step2').textContent   = rem === 0 ? 'No remainder - result is a whole number' : `Remainder ${rem}/${absD} → simplify with GCD(${rem},${absD}) = ${g} → ${sn}/${sd}`;
    document.getElementById('itm-rem-row').classList.toggle('hidden', rem === 0);
    document.getElementById('itm-result').classList.remove('hidden');
  }
});
