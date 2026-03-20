document.addEventListener('DOMContentLoaded', () => {
  const d1El = document.getElementById('lcd-d1');
  const d2El = document.getElementById('lcd-d2');
  const d3El = document.getElementById('lcd-d3');
  [d1El, d2El, d3El].forEach(el => el.addEventListener('input', calculate));

  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; }
  function lcm(a, b) { return Math.abs(a * b) / gcd(a, b); }

  function primeFactors(n) {
    n = Math.abs(n);
    const factors = {};
    for (let p = 2; p * p <= n; p++) {
      while (n % p === 0) { factors[p] = (factors[p] || 0) + 1; n /= p; }
    }
    if (n > 1) factors[n] = (factors[n] || 0) + 1;
    return factors;
  }

  function formatFactors(f) {
    return Object.entries(f).map(([p, e]) => e > 1 ? `${p}^${e}` : p).join(' × ') || '1';
  }

  function calculate() {
    const d1 = parseInt(d1El.value.replace(',', '.'), 10);
    const d2 = parseInt(d2El.value.replace(',', '.'), 10);
    const d3raw = d3El.value.trim();
    const d3 = d3raw ? parseInt(d3raw.replace(',', '.'), 10) : null;

    if (isNaN(d1) || isNaN(d2) || d1 === 0 || d2 === 0 || (d3 !== null && (isNaN(d3) || d3 === 0))) {
      document.getElementById('lcd-result').classList.add('hidden');
      return;
    }

    let lcd = lcm(d1, d2);
    if (d3 !== null) lcd = lcm(lcd, d3);

    const f1 = primeFactors(d1);
    const f2 = primeFactors(d2);
    const f3 = d3 !== null ? primeFactors(d3) : null;

    const eq1 = `${lcd / d1}/${lcd}`;
    const eq2 = `${lcd / d2}/${lcd}`;
    const eq3 = d3 !== null ? `${lcd / d3}/${lcd}` : null;

    document.getElementById('lcd-value').textContent   = lcd;
    document.getElementById('lcd-f1').textContent      = formatFactors(f1);
    document.getElementById('lcd-f2').textContent      = formatFactors(f2);
    document.getElementById('lcd-eq1').textContent     = eq1;
    document.getElementById('lcd-eq2').textContent     = eq2;

    const thirdRow = document.getElementById('lcd-third-row');
    if (d3 !== null) {
      document.getElementById('lcd-f3').textContent  = formatFactors(f3);
      document.getElementById('lcd-eq3').textContent = eq3;
      thirdRow.classList.remove('hidden');
    } else {
      thirdRow.classList.add('hidden');
    }

    document.getElementById('lcd-result').classList.remove('hidden');
  }
});
