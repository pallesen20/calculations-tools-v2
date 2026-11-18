document.addEventListener('DOMContentLoaded', () => {
  const G_PER_OZ = 28.3495;
  let unit = 'metric';
  let inputMode = 'flour';

  function cToF(c) { return c * 9 / 5 + 32; }
  function fToC(f) { return (f - 32) * 5 / 9; }

  function fmtW(grams) {
    if (unit === 'imperial') {
      const oz = grams / G_PER_OZ;
      return oz < 1 ? oz.toFixed(2) : oz.toFixed(1);
    }
    return grams < 10 ? grams.toFixed(1) : Math.round(grams).toString();
  }

  function fmtT(celsius) {
    const val = unit === 'imperial' ? cToF(celsius) : celsius;
    return (Math.round(val * 10) / 10).toString();
  }

  function wUnit() { return unit === 'imperial' ? 'oz' : 'g'; }
  function tUnit() { return unit === 'imperial' ? '°F' : '°C'; }

  function updateUnitLabels() {
    document.querySelectorAll('.sd-wunit').forEach(el => { el.textContent = wUnit(); });
    document.querySelectorAll('.sd-tunit').forEach(el => { el.textContent = tUnit(); });
  }

  document.querySelectorAll('.sd-unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.unit === unit) return;
      document.querySelectorAll('.sd-unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const prev = unit;
      unit = btn.dataset.unit;

      const flourEl    = document.getElementById('sd-flour');
      const totalEl    = document.getElementById('sd-total');
      const ddtEl      = document.getElementById('sd-ddt');
      const flourTempEl = document.getElementById('sd-flour-temp');
      const roomTempEl  = document.getElementById('sd-room-temp');

      if (unit === 'imperial') {
        const fv = parseFloat(flourEl.value) || 0;
        if (fv) flourEl.value = (fv / G_PER_OZ).toFixed(1);
        const tv = parseFloat(totalEl.value) || 0;
        if (tv) totalEl.value = (tv / G_PER_OZ).toFixed(1);
        const dv = parseFloat(ddtEl.value);
        if (!isNaN(dv)) ddtEl.value = cToF(dv).toFixed(1);
        const fTv = parseFloat(flourTempEl.value);
        if (!isNaN(fTv)) flourTempEl.value = cToF(fTv).toFixed(1);
        const rTv = parseFloat(roomTempEl.value);
        if (!isNaN(rTv)) roomTempEl.value = cToF(rTv).toFixed(1);
      } else {
        const fv = parseFloat(flourEl.value) || 0;
        if (fv) flourEl.value = Math.round(fv * G_PER_OZ).toString();
        const tv = parseFloat(totalEl.value) || 0;
        if (tv) totalEl.value = Math.round(tv * G_PER_OZ).toString();
        const dv = parseFloat(ddtEl.value);
        if (!isNaN(dv)) ddtEl.value = fToC(dv).toFixed(1);
        const fTv = parseFloat(flourTempEl.value);
        if (!isNaN(fTv)) flourTempEl.value = fToC(fTv).toFixed(1);
        const rTv = parseFloat(roomTempEl.value);
        if (!isNaN(rTv)) roomTempEl.value = fToC(rTv).toFixed(1);
      }

      updateUnitLabels();
      calculate();
      calcDDT();
    });
  });

  document.querySelectorAll('.sd-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sd-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      inputMode = btn.dataset.mode;
      document.getElementById('sd-flour-row').classList.toggle('hidden', inputMode !== 'flour');
      document.getElementById('sd-total-row').classList.toggle('hidden', inputMode !== 'total');
      calculate();
    });
  });

  function syncSlider(sliderId, inputId) {
    const slider = document.getElementById(sliderId);
    const input  = document.getElementById(inputId);
    slider.addEventListener('input', () => { input.value = slider.value; calculate(); });
    input.addEventListener('input', () => {
      const v = parseFloat(input.value);
      if (!isNaN(v)) slider.value = Math.min(parseFloat(slider.max), Math.max(parseFloat(slider.min), v));
      calculate();
    });
  }

  syncSlider('sd-hydration-slider', 'sd-hydration');
  syncSlider('sd-starter-slider',   'sd-starter-pct');
  syncSlider('sd-salt-slider',      'sd-salt-pct');

  document.querySelectorAll('.sd-mix-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sd-mix-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calcDDT();
    });
  });

  document.getElementById('sd-flour').addEventListener('input', calculate);
  document.getElementById('sd-total').addEventListener('input', calculate);
  document.getElementById('sd-ddt').addEventListener('input', calcDDT);
  document.getElementById('sd-flour-temp').addEventListener('input', calcDDT);
  document.getElementById('sd-room-temp').addEventListener('input', calcDDT);

  function calculate() {
    const h = (parseFloat(document.getElementById('sd-hydration').value)   || 72)  / 100;
    const s = (parseFloat(document.getElementById('sd-starter-pct').value) || 15)  / 100;
    const p = (parseFloat(document.getElementById('sd-salt-pct').value)    || 1.8) / 100;

    let flourG;
    if (inputMode === 'flour') {
      const raw = parseFloat(document.getElementById('sd-flour').value) || 0;
      flourG = unit === 'imperial' ? raw * G_PER_OZ : raw;
    } else {
      const raw = parseFloat(document.getElementById('sd-total').value) || 0;
      const tG  = unit === 'imperial' ? raw * G_PER_OZ : raw;
      flourG = tG / (1 + h + s + p);
    }

    if (flourG <= 0) {
      ['sd-out-flour','sd-out-water','sd-out-starter','sd-out-salt','sd-out-total']
        .forEach(id => { document.getElementById(id).textContent = '-'; });
      calcFermentation();
      return;
    }

    const waterG   = flourG * h;
    const starterG = flourG * s;
    const saltG    = flourG * p;
    const totalG   = flourG + waterG + starterG + saltG;
    const wu       = wUnit();

    document.getElementById('sd-out-flour').textContent   = fmtW(flourG)   + ' ' + wu;
    document.getElementById('sd-out-water').textContent   = fmtW(waterG)   + ' ' + wu;
    document.getElementById('sd-out-starter').textContent = fmtW(starterG) + ' ' + wu;
    document.getElementById('sd-out-salt').textContent    = fmtW(saltG)    + ' ' + wu;
    document.getElementById('sd-out-total').textContent   = fmtW(totalG)   + ' ' + wu;

    document.getElementById('sd-hydration-display').textContent = Math.round(h * 100) + '%';
    document.getElementById('sd-starter-display').textContent   = Math.round(s * 100) + '%';
    document.getElementById('sd-salt-display').textContent      = (p * 100).toFixed(1) + '%';

    const sfG = starterG / 2;
    const wu2 = wUnit();
    document.getElementById('sd-starter-breakdown').textContent =
      fmtW(sfG) + ' ' + wu2 + ' flour + ' + fmtW(sfG) + ' ' + wu2 + ' water';
    calcFermentation();
  }

  function calcDDT() {
    const ddt    = parseFloat(document.getElementById('sd-ddt').value);
    const flourT = parseFloat(document.getElementById('sd-flour-temp').value);
    const roomT  = parseFloat(document.getElementById('sd-room-temp').value);
    const isStand = document.querySelector('.sd-mix-btn.active')?.dataset.mix === 'stand';
    const frictionC = isStand ? 13 : 4;
    const friction  = unit === 'imperial' ? frictionC * 9 / 5 : frictionC;

    if (isNaN(ddt) || isNaN(flourT) || isNaN(roomT)) {
      document.getElementById('sd-water-temp-result').textContent = '-';
      document.getElementById('sd-water-temp-unit').textContent   = '';
      calcFermentation();
      return;
    }

    const waterT  = (ddt * 3) - flourT - roomT - friction;
    const resEl   = document.getElementById('sd-water-temp-result');
    const waterTC = unit === 'imperial' ? fToC(waterT) : waterT;

    resEl.textContent = fmtT(waterT);
    document.getElementById('sd-water-temp-unit').textContent = tUnit();
    resEl.style.color = (waterTC < 5 || waterTC > 42) ? '#f87171' : '#93c5fd';
    calcFermentation();
  }

  function calcFermentation() {
    const bulkTimeEl = document.getElementById('sd-bulk-time');
    if (!bulkTimeEl) return;
    const starterPct = parseFloat(document.getElementById('sd-starter-pct').value) || 15;

    const ddtRaw  = parseFloat(document.getElementById('sd-ddt').value);
    const roomRaw = parseFloat(document.getElementById('sd-room-temp').value);
    let ddtC;
    if (!isNaN(ddtRaw)) {
      ddtC = unit === 'imperial' ? fToC(ddtRaw) : ddtRaw;
    } else if (!isNaN(roomRaw)) {
      ddtC = unit === 'imperial' ? fToC(roomRaw) : roomRaw;
    } else {
      ddtC = 24;
    }

    const tempFactor    = Math.pow(0.82, ddtC - 24);
    const starterFactor = Math.pow(15 / starterPct, 0.8);
    const bulkH         = Math.max(1.5, Math.min(18, 6.5 * tempFactor * starterFactor));

    const lo = Math.floor(bulkH);
    const hi = lo + 1;
    document.getElementById('sd-bulk-time').textContent = lo + '-' + hi + ' hrs';

    const tempDisplay = unit === 'imperial'
      ? Math.round(cToF(ddtC)) + ' °F'
      : Math.round(ddtC) + ' °C';
    document.getElementById('sd-tl-context').textContent =
      'Estimated for ' + Math.round(starterPct) + '% starter at ' + tempDisplay;
  }

  updateUnitLabels();
  calculate();
  calcDDT();
});
