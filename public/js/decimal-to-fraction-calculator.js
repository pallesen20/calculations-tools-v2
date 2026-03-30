document.addEventListener('DOMContentLoaded', () => {
  const inputEl = document.getElementById('dtf-input');
  inputEl.addEventListener('input', calculate);

  function gcd(a, b) { a = Math.abs(Math.round(a)); b = Math.abs(Math.round(b)); while (b) { [a, b] = [b, a % b]; } return a || 1; }

  function detectRepeating(decStr) {
    const dotIdx = decStr.indexOf('.');
    if (dotIdx === -1) return null;
    const dec = decStr.slice(dotIdx + 1);
    for (let len = 1; len <= Math.floor(dec.length / 2); len++) {
      const pat = dec.slice(0, len);
      let rep = true;
      for (let i = len; i < dec.length; i++) {
        if (dec[i] !== pat[i % len]) { rep = false; break; }
      }
      if (rep && dec.length >= len * 2) return pat;
    }
    return null;
  }

  function calculate() {
    const raw = inputEl.value.replace(',', '.');
    const val = parseFloat(raw);
    if (isNaN(val)) { document.getElementById('dtf-result').classList.add('hidden'); return; }

    const dotIdx = raw.indexOf('.');
    const decPlaces = dotIdx === -1 ? 0 : raw.length - dotIdx - 1;

    let num, den, method, note = '';
    const repeating = detectRepeating(raw);

    if (repeating) {
      const nonRep = dotIdx === -1 ? '' : raw.slice(dotIdx + 1, dotIdx + 1 + (raw.slice(dotIdx + 1).length - repeating.length));
      const whole  = dotIdx === -1 ? parseInt(raw, 10) : parseInt(raw.slice(0, dotIdx), 10);
      const x      = parseFloat(raw);
      const repLen = repeating.length;
      const nonLen = nonRep.length;
      const mult1  = Math.pow(10, repLen + nonLen);
      const mult2  = Math.pow(10, nonLen);
      num = Math.round(x * mult1) - Math.round(x * mult2);
      den = mult1 - mult2;
      method = `Repeating decimal detected (${repeating}). Multiply by ${mult1} then ${mult2}, subtract.`;
      note   = `Repeating: 0.${'0'.repeat(nonLen)}${repeating}…`;
    } else {
      den = Math.pow(10, decPlaces);
      num = Math.round(val * den);
      method = decPlaces === 0 ? 'Whole number - denominator is 1.' : `${decPlaces} decimal place${decPlaces > 1 ? 's' : ''} → multiply by ${den}.`;
    }

    const negative = num < 0;
    if (negative) num = Math.abs(num);
    const g   = gcd(num, den);
    const sNum = (negative ? -1 : 1) * (num / g);
    const sDen = den / g;

    const whole = sDen !== 0 && Math.abs(sNum) >= sDen ? Math.floor(Math.abs(sNum) / sDen) : 0;
    const remN  = Math.abs(sNum) - whole * sDen;
    const mixed = whole > 0 ? `${negative ? '-' : ''}${whole} ${remN}/${sDen}` : null;

    document.getElementById('dtf-num').textContent    = sNum;
    document.getElementById('dtf-den').textContent    = sDen;
    document.getElementById('dtf-mixed').textContent  = mixed ?? '-';
    document.getElementById('dtf-mixed-card').classList.toggle('hidden', !mixed);
    document.getElementById('dtf-step1').textContent  = method;
    document.getElementById('dtf-step2').textContent  = `${negative ? '-' : ''}${num / g} / ${sDen} (GCD = ${g})`;
    if (note) {
      document.getElementById('dtf-note').textContent = note;
      document.getElementById('dtf-note-row').classList.remove('hidden');
    } else {
      document.getElementById('dtf-note-row').classList.add('hidden');
    }
    document.getElementById('dtf-result').classList.remove('hidden');
  }
});
