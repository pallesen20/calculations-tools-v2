document.addEventListener('DOMContentLoaded', () => {
  const nEl = document.getElementById('ftd-n');
  const dEl = document.getElementById('ftd-d');
  [nEl, dEl].forEach(el => el.addEventListener('input', calculate));

  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; }

  function longDivision(num, den) {
    const maxDigits = 20;
    const negative  = (num < 0) !== (den < 0);
    num = Math.abs(num);
    den = Math.abs(den);
    let integer = Math.floor(num / den);
    let remainder = num % den;
    if (remainder === 0) return { decimal: (negative ? '-' : '') + integer, type: 'terminating', repeating: '' };

    const digits = [];
    const seen   = {};
    let pos = 0;
    let repStart = -1;

    while (remainder !== 0 && pos < maxDigits) {
      if (seen[remainder] !== undefined) { repStart = seen[remainder]; break; }
      seen[remainder] = pos;
      remainder *= 10;
      digits.push(Math.floor(remainder / den));
      remainder = remainder % den;
      pos++;
    }

    const prefix = (negative ? '-' : '') + integer + '.';
    if (repStart === -1) {
      return { decimal: prefix + digits.join(''), type: 'terminating', repeating: '' };
    }
    const nonRep = digits.slice(0, repStart).join('');
    const rep    = digits.slice(repStart).join('');
    return { decimal: prefix + nonRep + rep + '…', type: 'repeating', repeating: rep, nonRepeating: nonRep, integer: (negative ? '-' : '') + integer };
  }

  function calculate() {
    const n = parseInt(nEl.value.replace(',', '.'), 10);
    const d = parseInt(dEl.value.replace(',', '.'), 10);
    if (isNaN(n) || isNaN(d) || d === 0) {
      document.getElementById('ftd-result').classList.add('hidden');
      return;
    }

    const result  = longDivision(n, d);
    const decimal = n / d;
    const pct     = (decimal * 100).toFixed(6).replace(/\.?0+$/, '') + '%';

    const g  = gcd(Math.abs(n), Math.abs(d));
    const sn = n / g;
    const sd = d / g;

    document.getElementById('ftd-decimal').textContent  = result.decimal;
    document.getElementById('ftd-type').textContent     = result.type === 'repeating' ? `Repeating (block: ${result.repeating})` : 'Terminating';
    document.getElementById('ftd-percent').textContent  = pct;
    document.getElementById('ftd-simplified').textContent = `${sn}/${sd}`;
    document.getElementById('ftd-step1').textContent    = `${n} ÷ ${d} = ${decimal}`;
    document.getElementById('ftd-step2').textContent    = result.type === 'repeating'
      ? `${result.integer}.${result.nonRepeating}${result.repeating}${result.repeating}… (repeating block "${result.repeating}")`
      : `Exact: ${result.decimal}`;
    document.getElementById('ftd-result').classList.remove('hidden');
  }
});
