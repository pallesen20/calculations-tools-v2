const FFMI_NORMS = {
  male: [
    { max: 18,       label: 'Below average',      cls: 'lbm-ffmi-below'   },
    { max: 20,       label: 'Average',            cls: 'lbm-ffmi-average' },
    { max: 22,       label: 'Above average',      cls: 'lbm-ffmi-above'   },
    { max: 24,       label: 'Excellent',          cls: 'lbm-ffmi-excel'   },
    { max: 26,       label: 'Superior',           cls: 'lbm-ffmi-super'   },
    { max: Infinity, label: 'Near natural limit', cls: 'lbm-ffmi-super'   },
  ],
  female: [
    { max: 13,       label: 'Below average', cls: 'lbm-ffmi-below'   },
    { max: 15,       label: 'Average',       cls: 'lbm-ffmi-average' },
    { max: 17,       label: 'Above average', cls: 'lbm-ffmi-above'   },
    { max: 20,       label: 'Excellent',     cls: 'lbm-ffmi-excel'   },
    { max: Infinity, label: 'Superior',      cls: 'lbm-ffmi-super'   },
  ],
};

function getFFMICat(f, sex) { return FFMI_NORMS[sex].find(c => f < c.max); }

document.addEventListener('DOMContentLoaded', () => {
  let unit = 'metric';
  let sex  = 'male';

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

  document.querySelectorAll('.bmi-sex-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.bmi-sex-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      sex = btn.dataset.sex;
      calculate();
    });
  });

  document.querySelectorAll('.bmi-input').forEach(el => el.addEventListener('input', calculate));

  function calculate() {
    let weightKg, heightCm;

    if (unit === 'metric') {
      weightKg = parseFloat(document.getElementById('bmi-weight-kg').value);
      heightCm = parseFloat(document.getElementById('bmi-height-cm').value);
      if (!weightKg || !heightCm || weightKg <= 0 || heightCm <= 0) return hide();
    } else {
      const weightLb = parseFloat(document.getElementById('bmi-weight-lb').value);
      const ft       = parseFloat(document.getElementById('bmi-height-ft').value) || 0;
      const inp      = parseFloat(document.getElementById('bmi-height-in').value) || 0;
      const totalIn  = ft * 12 + inp;
      if (!weightLb || weightLb <= 0 || totalIn <= 0) return hide();
      weightKg = weightLb * 0.453592;
      heightCm = totalIn * 2.54;
    }

    const bfPct = parseFloat(document.getElementById('ffmi-bf-pct').value);
    if (isNaN(bfPct) || bfPct <= 0 || bfPct >= 100) return hide();

    const h      = heightCm / 100;
    const lbm    = weightKg * (1 - bfPct / 100);
    const fatKg  = weightKg - lbm;

    if (lbm <= 0 || lbm >= weightKg) return hide();

    const ffmi  = lbm / (h * h);
    const ffmiN = ffmi + 6.1 * (1.8 - h);
    const bmi   = weightKg / (h * h);

    if (ffmiN < 5 || ffmiN > 40) return hide();

    const cat = getFFMICat(ffmiN, sex);

    const kg   = v => v.toFixed(1) + '\u00a0kg';
    const lb   = v => (v / 0.453592).toFixed(1) + '\u00a0lbs';
    const disp = v => unit === 'metric' ? kg(v) : lb(v);

    document.getElementById('ffmi-val').textContent     = ffmiN.toFixed(1);
    document.getElementById('ffmi-raw-val').textContent = ffmi.toFixed(1);
    document.getElementById('ffmi-lbm').textContent     = disp(lbm);
    document.getElementById('ffmi-fat').textContent     = disp(fatKg);
    document.getElementById('ffmi-bmi').textContent     = bmi.toFixed(1);

    const badge = document.getElementById('ffmi-badge');
    badge.textContent = cat.label;
    badge.className   = `lbm-card-badge ${cat.cls}`;

    const limitEl = document.getElementById('ffmi-limit-note');
    if (sex === 'male' && ffmiN >= 25) {
      limitEl.textContent = ffmiN >= 26
        ? `FFMI\u00a0${ffmiN.toFixed(1)} exceeds the Kouri\u00a01995 natural limit of\u00a025. All drug-free athletes in that study scored \u226425.`
        : `FFMI\u00a0${ffmiN.toFixed(1)} is approaching the Kouri\u00a01995 natural limit of\u00a025 for men.`;
      limitEl.classList.remove('hidden');
    } else {
      limitEl.classList.add('hidden');
    }

    document.getElementById('ffmi-result').classList.remove('hidden');
  }

  function hide() {
    document.getElementById('ffmi-result').classList.add('hidden');
  }
});
