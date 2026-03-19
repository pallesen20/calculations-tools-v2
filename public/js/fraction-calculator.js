document.addEventListener('DOMContentLoaded', () => {
  let op = 'add';

  const n1El = document.getElementById('fc-n1');
  const d1El = document.getElementById('fc-d1');
  const n2El = document.getElementById('fc-n2');
  const d2El = document.getElementById('fc-d2');
  const fraction2 = document.getElementById('fc-fraction2');
  const opSymbol  = document.getElementById('fc-op-symbol');

  document.querySelectorAll('.fc-op-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.fc-op-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      op = btn.dataset.op;
      if (op === 'simplify') {
        fraction2.classList.add('hidden');
        opSymbol.classList.add('hidden');
      } else {
        fraction2.classList.remove('hidden');
        opSymbol.classList.remove('hidden');
        const symbols = { add: '+', subtract: '−', multiply: '×', divide: '÷' };
        opSymbol.textContent = symbols[op];
      }
      calculate();
    });
  });

  [n1El, d1El, n2El, d2El].forEach(el => el.addEventListener('input', calculate));

  function gcd(a, b) { return b === 0 ? Math.abs(a) : gcd(b, a % b); }

  function simplifyFrac(n, d) {
    if (d === 0) return null;
    if (n === 0) return { n: 0, d: 1 };
    const g = gcd(Math.abs(n), Math.abs(d));
    const sign = d < 0 ? -1 : 1;
    return { n: sign * n / g, d: sign * d / g };
  }

  function fmtFrac(n, d) { return `${n}/${d}`; }
  function fmt(x) { return parseFloat(x.toFixed(6)).toString(); }

  function showResult(res, steps) {
    if (!res) { document.getElementById('fc-result').classList.add('hidden'); return; }

    const { n, d } = res;
    document.getElementById('fc-res-n').textContent = n;
    document.getElementById('fc-res-d').textContent = d;
    document.getElementById('fc-res-d').style.display = d === 1 ? 'none' : '';
    document.getElementById('fc-res-bar').style.display   = d === 1 ? 'none' : '';

    const decimal = n / d;
    document.getElementById('fc-decimal').textContent = fmt(decimal);
    document.getElementById('fc-percent').textContent = fmt(decimal * 100) + '%';

    const mixedCard = document.getElementById('fc-mixed-card');
    if (Math.abs(n) >= d && d !== 1) {
      const whole = Math.trunc(n / d);
      const rem   = Math.abs(n) % d;
      document.getElementById('fc-mixed').textContent = rem === 0 ? `${whole}` : `${whole} ${Math.abs(rem)}/${d}`;
      mixedCard.classList.remove('hidden');
    } else {
      mixedCard.classList.add('hidden');
    }

    const s1 = document.getElementById('fc-step1-row');
    const s2 = document.getElementById('fc-step2-row');
    const s3 = document.getElementById('fc-step3-row');
    [s1, s2, s3].forEach(r => r.classList.add('hidden'));

    steps.forEach((step, i) => {
      const row = [s1, s2, s3][i];
      row.querySelector('.pi-step-label').textContent = step.label;
      row.querySelector('.pi-step-val').textContent   = step.val;
      row.classList.remove('hidden');
    });

    document.getElementById('fc-result').classList.remove('hidden');
  }

  function calculate() {
    const n1 = parseInt(n1El.value.replace(",","."), 10);
    const d1 = parseInt(d1El.value.replace(",","."), 10);

    if (op === 'simplify') {
      if (isNaN(n1) || isNaN(d1) || d1 === 0) {
        document.getElementById('fc-result').classList.add('hidden'); return;
      }
      const g = gcd(Math.abs(n1), Math.abs(d1));
      const res = simplifyFrac(n1, d1);
      showResult(res, [
        { label: 'Find GCD', val: `GCD(${Math.abs(n1)}, ${Math.abs(d1)}) = ${g}` },
        { label: 'Divide both by GCD', val: `${n1} ÷ ${g} = ${res.n},  ${d1} ÷ ${g} = ${res.d}` },
        { label: 'Simplified', val: fmtFrac(res.n, res.d) },
      ]);
      return;
    }

    const n2 = parseInt(n2El.value.replace(",","."), 10);
    const d2 = parseInt(d2El.value.replace(",","."), 10);
    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0) {
      document.getElementById('fc-result').classList.add('hidden'); return;
    }

    let rawN, rawD, steps;

    if (op === 'add' || op === 'subtract') {
      const lcd = (d1 * d2) / gcd(Math.abs(d1), Math.abs(d2));
      const f1  = lcd / d1;
      const f2  = lcd / d2;
      const an  = op === 'add' ? n1 * f1 + n2 * f2 : n1 * f1 - n2 * f2;
      rawN = an; rawD = lcd;
      const sym = op === 'add' ? '+' : '−';
      steps = [
        { label: 'Common denominator (LCM)', val: `LCM(${d1}, ${d2}) = ${lcd}` },
        { label: 'Convert & ' + (op === 'add' ? 'add' : 'subtract'), val: `${n1 * f1}/${lcd} ${sym} ${n2 * f2}/${lcd} = ${an}/${lcd}` },
        { label: 'Simplified', val: '' },
      ];
    } else if (op === 'multiply') {
      rawN = n1 * n2; rawD = d1 * d2;
      steps = [
        { label: 'Multiply numerators', val: `${n1} × ${n2} = ${rawN}` },
        { label: 'Multiply denominators', val: `${d1} × ${d2} = ${rawD}` },
        { label: 'Simplified', val: '' },
      ];
    } else {
      if (n2 === 0) { document.getElementById('fc-result').classList.add('hidden'); return; }
      rawN = n1 * d2; rawD = d1 * n2;
      steps = [
        { label: 'Reciprocal of second fraction', val: `${d2}/${n2}` },
        { label: 'Multiply', val: `${fmtFrac(n1, d1)} × ${fmtFrac(d2, n2)} = ${fmtFrac(rawN, rawD)}` },
        { label: 'Simplified', val: '' },
      ];
    }

    const res = simplifyFrac(rawN, rawD);
    if (!res) { document.getElementById('fc-result').classList.add('hidden'); return; }
    steps[steps.length - 1].val = fmtFrac(res.n, res.d);
    showResult(res, steps);
  }
});
