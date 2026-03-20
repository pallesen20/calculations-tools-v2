document.addEventListener('DOMContentLoaded', () => {
  const modeButtons = document.querySelectorAll('.ar-mode-btn');
  const wEl  = document.getElementById('ar-w');
  const hEl  = document.getElementById('ar-h');
  const t1El = document.getElementById('ar-target1');
  const t2El = document.getElementById('ar-target2');
  const t1LblEl = document.getElementById('ar-target1-lbl');
  const t2LblEl = document.getElementById('ar-target2-lbl');

  let mode = 'find';

  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mode = btn.dataset.mode;
      updateLabels();
      calculate();
    });
  });

  [wEl, hEl, t1El, t2El].forEach(el => el.addEventListener('input', calculate));

  function gcd(a, b) {
    a = Math.abs(Math.round(a));
    b = Math.abs(Math.round(b));
    while (b) { let t = b; b = a % b; a = t; }
    return a;
  }

  function updateLabels() {
    if (mode === 'find') {
      t1LblEl.textContent = 'New width';
      t2LblEl.textContent = 'New height (calculated)';
    } else {
      t1LblEl.textContent = 'New height';
      t2LblEl.textContent = 'New width (calculated)';
    }
  }

  function fmt(n) {
    return parseFloat(n.toFixed(4)).toString();
  }

  function calculate() {
    const w = parseFloat(wEl.value.replace(',', '.'));
    const h = parseFloat(hEl.value.replace(',', '.'));

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      document.getElementById('ar-result').classList.add('hidden');
      return;
    }

    const g     = gcd(w, h);
    const ratioW = w / g;
    const ratioH = h / g;
    const decimal = w / h;

    document.getElementById('ar-ratio').textContent    = ratioW + ':' + ratioH;
    document.getElementById('ar-decimal').textContent  = fmt(decimal);
    document.getElementById('ar-percent').textContent  = fmt((h / w) * 100) + '%';
    document.getElementById('ar-step1').textContent    = `GCD(${fmt(w)}, ${fmt(h)}) = ${g}`;
    document.getElementById('ar-step2').textContent    = `${fmt(w)} ÷ ${g} : ${fmt(h)} ÷ ${g} = ${ratioW}:${ratioH}`;

    const t1 = parseFloat(t1El.value.replace(',', '.'));
    const resizeRow = document.getElementById('ar-resize-row');
    const resizeVal = document.getElementById('ar-resize-val');

    if (!isNaN(t1) && t1 > 0) {
      let result;
      if (mode === 'find') {
        result = (t1 / w) * h;
        resizeVal.textContent = `${fmt(t1)} × ${fmt(h / w)} = ${fmt(result)} (height)`;
      } else {
        result = (t1 / h) * w;
        resizeVal.textContent = `${fmt(t1)} × ${fmt(w / h)} = ${fmt(result)} (width)`;
      }
      document.getElementById('ar-target2').value = fmt(result);
      resizeRow.classList.remove('hidden');
    } else {
      document.getElementById('ar-target2').value = '';
      resizeRow.classList.add('hidden');
    }

    document.getElementById('ar-result').classList.remove('hidden');
  }

  updateLabels();
});
