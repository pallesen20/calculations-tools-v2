document.addEventListener('DOMContentLoaded', () => {
  const w1El = document.getElementById('mn-w1');
  const n1El = document.getElementById('mn-n1');
  const d1El = document.getElementById('mn-d1');
  const w2El = document.getElementById('mn-w2');
  const n2El = document.getElementById('mn-n2');
  const d2El = document.getElementById('mn-d2');
  const opBtns = document.querySelectorAll('.mn-op-btn');
  let op = 'add';

  opBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      opBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      op = btn.dataset.op;
      document.getElementById('mn-op-symbol').textContent = { add: '+', subtract: '−', multiply: '×', divide: '÷' }[op];
      calculate();
    });
  });

  [w1El, n1El, d1El, w2El, n2El, d2El].forEach(el => el.addEventListener('input', calculate));

  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; }
  function lcm(a, b) { return Math.abs(a * b) / gcd(a, b); }

  function toImproper(w, n, d) {
    const sign = w < 0 ? -1 : 1;
    return [sign * (Math.abs(w) * d + Math.abs(n)), d];
  }

  function simplify(n, d) {
    if (d === 0) return [n, d];
    const g = gcd(Math.abs(n), Math.abs(d));
    const sn = n / g, sd = d / g;
    return sd < 0 ? [-sn, -sd] : [sn, sd];
  }

  function toMixed(n, d) {
    const neg = n < 0;
    const absN = Math.abs(n), absD = Math.abs(d);
    const whole = Math.floor(absN / absD);
    const rem   = absN % absD;
    return { neg, whole, remN: rem, remD: absD };
  }

  function calculate() {
    const w1 = parseInt(w1El.value.replace(',', '.'), 10) || 0;
    const n1 = parseInt(n1El.value.replace(',', '.'), 10) || 0;
    const d1 = parseInt(d1El.value.replace(',', '.'), 10);
    const w2 = parseInt(w2El.value.replace(',', '.'), 10) || 0;
    const n2 = parseInt(n2El.value.replace(',', '.'), 10) || 0;
    const d2 = parseInt(d2El.value.replace(',', '.'), 10);

    if (isNaN(d1) || isNaN(d2) || d1 === 0 || d2 === 0) {
      document.getElementById('mn-result').classList.add('hidden');
      return;
    }

    const [a, b] = toImproper(w1, n1, d1);
    const [c, d] = toImproper(w2, n2, d2);

    let rn, rd;
    if (op === 'add') {
      const l = lcm(b, d);
      rn = a * (l / b) + c * (l / d);
      rd = l;
    } else if (op === 'subtract') {
      const l = lcm(b, d);
      rn = a * (l / b) - c * (l / d);
      rd = l;
    } else if (op === 'multiply') {
      rn = a * c;
      rd = b * d;
    } else {
      if (c === 0) { document.getElementById('mn-result').classList.add('hidden'); return; }
      rn = a * d;
      rd = b * c;
    }

    const [sn, sd] = simplify(rn, rd);
    const mixed = toMixed(sn, sd);
    const decimal = sn / sd;
    const g = gcd(Math.abs(sn), sd);

    let mixedStr = '';
    if (mixed.whole === 0 && mixed.remN === 0) {
      mixedStr = '0';
    } else if (mixed.remN === 0) {
      mixedStr = (mixed.neg ? '-' : '') + mixed.whole;
    } else if (mixed.whole === 0) {
      mixedStr = (mixed.neg ? '-' : '') + `${mixed.remN}/${mixed.remD}`;
    } else {
      mixedStr = (mixed.neg ? '-' : '') + `${mixed.whole} ${mixed.remN}/${mixed.remD}`;
    }

    document.getElementById('mn-res-n').textContent     = sn;
    document.getElementById('mn-res-d').textContent     = sd;
    document.getElementById('mn-mixed').textContent     = mixedStr;
    document.getElementById('mn-decimal').textContent   = parseFloat(decimal.toFixed(6)).toString();
    document.getElementById('mn-step1').textContent     = `Convert: ${a}/${b} ${op === 'add' ? '+' : op === 'subtract' ? '−' : op === 'multiply' ? '×' : '÷'} ${c}/${d}`;
    document.getElementById('mn-step2').textContent     = `Result: ${rn}/${rd} → simplified: ${sn}/${sd}`;
    document.getElementById('mn-result').classList.remove('hidden');
  }
});
