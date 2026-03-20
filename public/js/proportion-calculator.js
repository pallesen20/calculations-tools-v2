document.addEventListener('DOMContentLoaded', () => {
  const aEl = document.getElementById('prop-a');
  const bEl = document.getElementById('prop-b');
  const cEl = document.getElementById('prop-c');
  const dEl = document.getElementById('prop-d');
  const missingBtns = document.querySelectorAll('.prop-miss-btn');
  let missing = 'd';

  missingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      missingBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      missing = btn.dataset.miss;
      [aEl, bEl, cEl, dEl].forEach(el => el.removeAttribute('disabled'));
      document.getElementById('prop-' + missing).setAttribute('disabled', '');
      document.getElementById('prop-' + missing).value = '';
      document.getElementById('prop-missing-lbl').textContent = missing.toUpperCase();
      calculate();
    });
  });

  [aEl, bEl, cEl, dEl].forEach(el => el.addEventListener('input', calculate));

  function calculate() {
    const vals = {
      a: parseFloat(aEl.value.replace(',', '.')),
      b: parseFloat(bEl.value.replace(',', '.')),
      c: parseFloat(cEl.value.replace(',', '.')),
      d: parseFloat(dEl.value.replace(',', '.')),
    };

    const known = Object.keys(vals).filter(k => k !== missing && !isNaN(vals[k]) && vals[k] !== 0);
    if (known.length < 3) { document.getElementById('prop-result').classList.add('hidden'); return; }

    let result;
    if (missing === 'a') result = vals.b * vals.c / vals.d;
    if (missing === 'b') result = vals.a * vals.d / vals.c;
    if (missing === 'c') result = vals.a * vals.d / vals.b;
    if (missing === 'd') result = vals.b * vals.c / vals.a;

    if (!isFinite(result) || isNaN(result)) { document.getElementById('prop-result').classList.add('hidden'); return; }

    const r = parseFloat(result.toFixed(6));
    vals[missing] = r;

    document.getElementById('prop-result-val').textContent = r;
    document.getElementById('prop-verify').textContent = `${vals.a} × ${vals.d} = ${parseFloat((vals.a * vals.d).toFixed(6))} and ${vals.b} × ${vals.c} = ${parseFloat((vals.b * vals.c).toFixed(6))}`;
    document.getElementById('prop-step1').textContent = `Cross-multiply: ${missing === 'd' ? `${vals.a}d = ${vals.b} × ${vals.c}` : missing === 'a' ? `a × ${vals.d} = ${vals.b} × ${vals.c}` : missing === 'b' ? `${vals.a} × ${vals.d} = b × ${vals.c}` : `${vals.a} × ${vals.d} = ${vals.b} × c`}`;
    document.getElementById('prop-step2').textContent = `${missing.toUpperCase()} = ${r}`;
    document.getElementById('prop-result').classList.remove('hidden');
  }
});
