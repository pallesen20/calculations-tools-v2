document.addEventListener('DOMContentLoaded', () => {
  const aEl = document.getElementById('er-a');
  const bEl = document.getElementById('er-b');
  [aEl, bEl].forEach(el => el.addEventListener('input', calculate));

  function gcd(x, y) {
    x = Math.abs(Math.round(x));
    y = Math.abs(Math.round(y));
    while (y) { let t = y; y = x % y; x = t; }
    return x;
  }

  function fmt(n) {
    return parseFloat(n.toFixed(6)).toString();
  }

  function calculate() {
    const a = parseFloat(aEl.value.replace(',', '.'));
    const b = parseFloat(bEl.value.replace(',', '.'));

    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
      document.getElementById('er-result').classList.add('hidden');
      return;
    }

    const g      = gcd(a, b);
    const simpA  = a / g;
    const simpB  = b / g;
    const decimal = a / b;

    document.getElementById('er-simplified').textContent = fmt(simpA) + ':' + fmt(simpB);
    document.getElementById('er-gcd').textContent        = fmt(g);
    document.getElementById('er-decimal').textContent    = fmt(decimal);
    document.getElementById('er-step1').textContent      = `GCD(${fmt(a)}, ${fmt(b)}) = ${fmt(g)}`;
    document.getElementById('er-step2').textContent      = `${fmt(a)} ÷ ${fmt(g)} : ${fmt(b)} ÷ ${fmt(g)} = ${fmt(simpA)}:${fmt(simpB)}`;

    const tbody = document.getElementById('er-table-body');
    tbody.innerHTML = '';
    for (let n = 1; n <= 12; n++) {
      const ra = simpA * n;
      const rb = simpB * n;
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>×${n}</td><td>${fmt(ra)}:${fmt(rb)}</td><td>${fmt(ra)}</td><td>${fmt(rb)}</td>`;
      tbody.appendChild(tr);
    }

    document.getElementById('er-result').classList.remove('hidden');
  }
});
