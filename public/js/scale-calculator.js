document.addEventListener('DOMContentLoaded', () => {
  const modeButtons = document.querySelectorAll('.sc-mode-btn');
  const realEl   = document.getElementById('sc-real');
  const scaledEl = document.getElementById('sc-scaled');
  const scaleNEl = document.getElementById('sc-scale-n');
  const scaleDEl = document.getElementById('sc-scale-d');

  let mode = 'to-scaled';

  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mode = btn.dataset.mode;
      updateLabels();
      calculate();
    });
  });

  [realEl, scaledEl, scaleNEl, scaleDEl].forEach(el => el.addEventListener('input', calculate));

  function updateLabels() {
    const lbl1 = document.getElementById('sc-lbl1');
    const lbl2 = document.getElementById('sc-lbl2');
    if (mode === 'to-scaled') {
      lbl1.textContent = 'Real-world size';
      lbl2.textContent = 'Scaled size (calculated)';
    } else if (mode === 'to-real') {
      lbl1.textContent = 'Scaled size';
      lbl2.textContent = 'Real-world size (calculated)';
    }
  }

  function fmt(n) {
    if (Math.abs(n) >= 1000000) return parseFloat(n.toFixed(2)).toString();
    if (Math.abs(n) >= 1000)    return parseFloat(n.toFixed(3)).toString();
    return parseFloat(n.toFixed(6)).toString();
  }

  function calculate() {
    const sn = parseFloat(scaleNEl.value.replace(',', '.'));
    const sd = parseFloat(scaleDEl.value.replace(',', '.'));

    if (isNaN(sn) || isNaN(sd) || sn <= 0 || sd <= 0) {
      document.getElementById('sc-result').classList.add('hidden');
      return;
    }

    const scaleFactor = sn / sd;

    if (mode === 'to-scaled') {
      const real = parseFloat(realEl.value.replace(',', '.'));
      if (isNaN(real) || real < 0) {
        document.getElementById('sc-result').classList.add('hidden');
        return;
      }
      const scaled = real * scaleFactor;
      document.getElementById('sc-output').textContent = fmt(scaled);
      document.getElementById('sc-output-lbl').textContent = 'Scaled size';
      document.getElementById('sc-step1').textContent = `Scale factor = ${sn} ÷ ${sd} = ${fmt(scaleFactor)}`;
      document.getElementById('sc-step2').textContent = `${fmt(real)} × ${fmt(scaleFactor)} = ${fmt(scaled)}`;

    } else {
      const scaled = parseFloat(scaledEl.value.replace(',', '.'));
      if (isNaN(scaled) || scaled < 0) {
        document.getElementById('sc-result').classList.add('hidden');
        return;
      }
      const real = scaled / scaleFactor;
      document.getElementById('sc-output').textContent = fmt(real);
      document.getElementById('sc-output-lbl').textContent = 'Real-world size';
      document.getElementById('sc-step1').textContent = `Scale factor = ${sn} ÷ ${sd} = ${fmt(scaleFactor)}`;
      document.getElementById('sc-step2').textContent = `${fmt(scaled)} ÷ ${fmt(scaleFactor)} = ${fmt(real)}`;
    }

    document.getElementById('sc-result').classList.remove('hidden');
  }

  updateLabels();
});
