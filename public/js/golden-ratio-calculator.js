document.addEventListener('DOMContentLoaded', () => {
  const PHI = (1 + Math.sqrt(5)) / 2;
  const inputEl  = document.getElementById('gr-input');
  const modeBtns = document.querySelectorAll('.gr-mode-btn');
  let mode = 'longer';

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mode = btn.dataset.mode;
      calculate();
    });
  });

  inputEl.addEventListener('input', calculate);

  function fmt(n) { return parseFloat(n.toFixed(6)).toString(); }

  function calculate() {
    const val = parseFloat(inputEl.value.replace(',', '.'));
    if (isNaN(val) || val <= 0) {
      document.getElementById('gr-result').classList.add('hidden');
      return;
    }

    let longer, shorter, total;
    if (mode === 'longer') {
      longer  = val;
      shorter = val / PHI;
      total   = val * PHI;
    } else if (mode === 'shorter') {
      shorter = val;
      longer  = val * PHI;
      total   = val * PHI * PHI;
    } else {
      total   = val;
      longer  = val / PHI;
      shorter = val / (PHI * PHI);
    }

    document.getElementById('gr-longer').textContent  = fmt(longer);
    document.getElementById('gr-shorter').textContent = fmt(shorter);
    document.getElementById('gr-total').textContent   = fmt(total);
    document.getElementById('gr-ratio').textContent   = fmt(longer / shorter);
    document.getElementById('gr-step1').textContent   = `φ = (1 + √5) / 2 = ${fmt(PHI)}`;
    document.getElementById('gr-step2').textContent   = `Longer: ${fmt(longer)}, Shorter: ${fmt(shorter)}, Total: ${fmt(total)}`;
    document.getElementById('gr-result').classList.remove('hidden');
  }
});
