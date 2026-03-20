document.addEventListener('DOMContentLoaded', () => {
  const quantEl = document.getElementById('ur-quantity');
  const unitEl  = document.getElementById('ur-units');
  const scaleEl = document.getElementById('ur-scale');
  [quantEl, unitEl, scaleEl].forEach(el => el.addEventListener('input', calculate));

  function calculate() {
    const quantity = parseFloat(quantEl.value.replace(',', '.'));
    const units    = parseFloat(unitEl.value.replace(',', '.'));
    if (isNaN(quantity) || isNaN(units) || units === 0) {
      document.getElementById('ur-result').classList.add('hidden');
      return;
    }

    const rate = quantity / units;
    document.getElementById('ur-rate').textContent  = parseFloat(rate.toFixed(6)).toString();
    document.getElementById('ur-step1').textContent = `${quantity} ÷ ${units} = ${parseFloat(rate.toFixed(6))}`;
    document.getElementById('ur-step2').textContent = `Rate per 1 unit: ${parseFloat(rate.toFixed(6))}`;

    const scale = parseFloat(scaleEl.value.replace(',', '.'));
    if (!isNaN(scale) && scale > 0) {
      const total = rate * scale;
      document.getElementById('ur-scaled').textContent = parseFloat(total.toFixed(6)).toString();
      document.getElementById('ur-scale-lbl').textContent = `Total for ${scale} units`;
      document.getElementById('ur-scale-row').classList.remove('hidden');
    } else {
      document.getElementById('ur-scale-row').classList.add('hidden');
    }

    document.getElementById('ur-result').classList.remove('hidden');
  }
});
