document.addEventListener('DOMContentLoaded', () => {
  const wEl = document.getElementById('mti-w');
  const nEl = document.getElementById('mti-n');
  const dEl = document.getElementById('mti-d');
  [wEl, nEl, dEl].forEach(el => el.addEventListener('input', calculate));

  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; }

  function calculate() {
    const w = parseInt(wEl.value.replace(',', '.'), 10) || 0;
    const n = parseInt(nEl.value.replace(',', '.'), 10);
    const d = parseInt(dEl.value.replace(',', '.'), 10);
    if (isNaN(n) || isNaN(d) || d === 0) {
      document.getElementById('mti-result').classList.add('hidden');
      return;
    }
    const negative = w < 0;
    const absW = Math.abs(w);
    const absN = Math.abs(n);
    const impNum = absW * d + absN;
    const sign = negative ? -1 : 1;
    const finalNum = sign * impNum;

    document.getElementById('mti-res-n').textContent  = finalNum;
    document.getElementById('mti-res-d').textContent  = d;
    document.getElementById('mti-decimal').textContent = parseFloat((finalNum / d).toFixed(6)).toString();
    document.getElementById('mti-step1').textContent  = `${absW} × ${d} = ${absW * d}`;
    document.getElementById('mti-step2').textContent  = `${absW * d} + ${absN} = ${impNum} → ${finalNum}/${d}`;
    document.getElementById('mti-result').classList.remove('hidden');
  }
});
