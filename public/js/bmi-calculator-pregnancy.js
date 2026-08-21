document.addEventListener('DOMContentLoaded', () => {
  let unit = 'metric';

  const CATEGORIES = [
    { label: 'Underweight',       min: 0,    max: 18.5,    cls: 'underweight', gwg: 'underweight' },
    { label: 'Normal weight',     min: 18.5, max: 25.0,    cls: 'normal',      gwg: 'normal'      },
    { label: 'Overweight',        min: 25.0, max: 30.0,    cls: 'overweight',  gwg: 'overweight'  },
    { label: 'Obese (Class I)',   min: 30.0, max: 35.0,    cls: 'obese',       gwg: 'obese'       },
    { label: 'Obese (Class II)',  min: 35.0, max: 40.0,    cls: 'obese',       gwg: 'obese'       },
    { label: 'Obese (Class III)', min: 40.0, max: Infinity, cls: 'obese',      gwg: 'obese'       },
  ];

  const GWG = {
    underweight: { kgRange: '12.5-18 kg', lbRange: '28-40 lbs', wkKg: '0.44-0.58 kg/wk', wkLb: '1.0-1.3 lbs/wk' },
    normal:      { kgRange: '11.5-16 kg', lbRange: '25-35 lbs', wkKg: '0.35-0.50 kg/wk', wkLb: '0.8-1.0 lbs/wk' },
    overweight:  { kgRange: '7-11.5 kg',  lbRange: '15-25 lbs', wkKg: '0.23-0.33 kg/wk', wkLb: '0.5-0.7 lbs/wk' },
    obese:       { kgRange: '5-9 kg',     lbRange: '11-20 lbs', wkKg: '0.17-0.27 kg/wk', wkLb: '0.4-0.6 lbs/wk' },
  };

  document.querySelectorAll('.bmi-unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.bmi-unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      unit = btn.dataset.unit;
      document.getElementById('bmi-metric').classList.toggle('active', unit === 'metric');
      document.getElementById('bmi-imperial').classList.toggle('active', unit === 'imperial');
      calculate();
    });
  });

  document.querySelectorAll('.bmi-input').forEach(el => el.addEventListener('input', calculate));

  function calculate() {
    let bmi, weightKg, heightCm;

    if (unit === 'metric') {
      weightKg = parseFloat(document.getElementById('bmi-weight-kg').value);
      heightCm = parseFloat(document.getElementById('bmi-height-cm').value);
      if (!weightKg || !heightCm || weightKg <= 0 || heightCm <= 0) return hide();
      const h = heightCm / 100;
      bmi = weightKg / (h * h);
    } else {
      const weightLb = parseFloat(document.getElementById('bmi-weight-lb').value);
      const ft = parseFloat(document.getElementById('bmi-height-ft').value) || 0;
      const inp = parseFloat(document.getElementById('bmi-height-in').value) || 0;
      const totalIn = ft * 12 + inp;
      if (!weightLb || weightLb <= 0 || totalIn <= 0) return hide();
      bmi = (703 * weightLb) / (totalIn * totalIn);
      weightKg = weightLb * 0.453592;
      heightCm = totalIn * 2.54;
    }

    if (bmi < 5 || bmi > 150) return hide();

    const cat = CATEGORIES.find(c => bmi >= c.min && bmi < c.max) || CATEGORIES[CATEGORIES.length - 1];
    const h = heightCm / 100;
    const gwg = GWG[cat.gwg];

    document.getElementById('bmi-value').textContent = bmi.toFixed(1);
    const badge = document.getElementById('bmi-category-badge');
    badge.textContent = cat.label;
    badge.className = `bmi-category-badge bmi-badge-${cat.cls}`;

    const pct = Math.min(Math.max(((bmi - 10) / 30) * 100, 0), 100);
    document.getElementById('bmi-indicator').style.left = pct + '%';

    const minKg = 18.5 * h * h;
    const maxKg = 24.9 * h * h;
    document.getElementById('bmi-healthy-range').textContent = unit === 'metric'
      ? `Healthy weight range: ${minKg.toFixed(1)}-${maxKg.toFixed(1)} kg`
      : `Healthy weight range: ${(minKg / 0.453592).toFixed(1)}-${(maxKg / 0.453592).toFixed(1)} lbs`;

    const nextEl = document.getElementById('bmi-next-category');
    if (bmi < 18.5) {
      const need = (18.5 * h * h) - weightKg;
      nextEl.textContent = unit === 'metric'
        ? `Pre-conception: gain ${need.toFixed(1)} kg to reach Normal weight`
        : `Pre-conception: gain ${(need / 0.453592).toFixed(1)} lbs to reach Normal weight`;
    } else if (bmi >= 25) {
      const need = weightKg - (24.9 * h * h);
      nextEl.textContent = unit === 'metric'
        ? `Pre-conception: lose ${need.toFixed(1)} kg to reduce gestational risk`
        : `Pre-conception: lose ${(need / 0.453592).toFixed(1)} lbs to reduce gestational risk`;
    } else {
      nextEl.textContent = 'Normal weight - lowest gestational complication risk';
    }

    document.getElementById('preg-total').textContent = unit === 'metric' ? gwg.kgRange : gwg.lbRange;
    document.getElementById('preg-weekly').textContent = unit === 'metric' ? gwg.wkKg : gwg.wkLb;

    document.getElementById('bmi-result').classList.remove('hidden');
  }

  function hide() {
    document.getElementById('bmi-result').classList.add('hidden');
  }
});
