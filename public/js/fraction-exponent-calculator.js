document.addEventListener('DOMContentLoaded', () => {
  const baseNEl  = document.getElementById('fe-base-n');
  const baseDEl  = document.getElementById('fe-base-d');
  const expNEl   = document.getElementById('fe-exp-n');
  const expDEl   = document.getElementById('fe-exp-d');
  [baseNEl, baseDEl, expNEl, expDEl].forEach(el => el.addEventListener('input', calculate));

  function gcd(a, b) { a = Math.abs(Math.round(a)); b = Math.abs(Math.round(b)); while (b) { [a, b] = [b, a % b]; } return a || 1; }

  function fmtFrac(n, d) {
    const g = gcd(Math.abs(n), Math.abs(d));
    const sn = Math.round(n / g);
    const sd = Math.round(d / g);
    if (sd === 1) return `${sn}`;
    return `${sn}/${sd}`;
  }

  function calculate() {
    const bn = parseFloat(baseNEl.value.replace(',', '.'));
    const bd = parseFloat(baseDEl.value.replace(',', '.'));
    const en = parseFloat(expNEl.value.replace(',', '.'));
    const ed = parseFloat(expDEl.value.replace(',', '.'));

    if ([bn, bd, en, ed].some(isNaN) || bd === 0 || ed === 0) {
      document.getElementById('fe-result').classList.add('hidden');
      return;
    }

    const base  = bn / bd;
    const exp   = en / ed;
    const value = Math.pow(base, exp);

    if (!isFinite(value) || isNaN(value)) {
      document.getElementById('fe-result').classList.add('hidden');
      return;
    }

    const isWholeExp = Number.isInteger(en) && ed === 1;
    let stepText = '';

    if (isWholeExp) {
      const absE = Math.abs(en);
      if (en >= 0) {
        const rn = Math.round(Math.pow(bn, absE));
        const rd = Math.round(Math.pow(bd, absE));
        const g  = gcd(Math.abs(rn), Math.abs(rd));
        stepText = `(${bn}/${bd})^${absE} = ${rn}/${rd} = ${fmtFrac(rn, rd)}`;
        document.getElementById('fe-res-n').textContent = Math.round(rn / g);
        document.getElementById('fe-res-d').textContent = Math.round(rd / g);
        document.getElementById('fe-res-bar').style.display = rd / g !== 1 ? '' : 'none';
      } else {
        const rn = Math.round(Math.pow(bd, absE));
        const rd = Math.round(Math.pow(bn, absE));
        const g  = gcd(Math.abs(rn), Math.abs(rd));
        stepText = `Negative exponent → reciprocal: (${bd}/${bn})^${absE} = ${rn}/${rd} = ${fmtFrac(rn, rd)}`;
        document.getElementById('fe-res-n').textContent = Math.round(rn / g);
        document.getElementById('fe-res-d').textContent = Math.round(rd / g);
        document.getElementById('fe-res-bar').style.display = rd / g !== 1 ? '' : 'none';
      }
    } else {
      stepText = `Fractional exponent: (${bn}/${bd})^(${en}/${ed}) = ${en}th power then ${ed}th root (or ${ed}th root then ${en}th power).`;
      const dec = parseFloat(value.toFixed(8));
      document.getElementById('fe-res-n').textContent  = dec;
      document.getElementById('fe-res-d').textContent  = '';
      document.getElementById('fe-res-bar').style.display = 'none';
    }

    document.getElementById('fe-decimal').textContent = parseFloat(value.toFixed(8)).toString();
    document.getElementById('fe-step1').textContent   = stepText;
    document.getElementById('fe-step2').textContent   = `Decimal: ${parseFloat(value.toFixed(8))}`;
    document.getElementById('fe-result').classList.remove('hidden');
  }
});
