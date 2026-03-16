const BF_NORMS = {
  male: [
    { max: 6,        label: 'Essential fat only', cls: 'underweight' },
    { max: 14,       label: 'Athletic',           cls: 'normal'      },
    { max: 18,       label: 'Fitness',            cls: 'normal'      },
    { max: 25,       label: 'Acceptable',         cls: 'overweight'  },
    { max: Infinity, label: 'High',               cls: 'obese'       },
  ],
  female: [
    { max: 14,       label: 'Essential fat only', cls: 'underweight' },
    { max: 21,       label: 'Athletic',           cls: 'normal'      },
    { max: 25,       label: 'Fitness',            cls: 'normal'      },
    { max: 32,       label: 'Acceptable',         cls: 'overweight'  },
    { max: Infinity, label: 'High',               cls: 'obese'       },
  ],
};

const FFMI_NORMS = {
  male: [
    { max: 18, label: 'Below average',       cls: 'lbm-ffmi-below'   },
    { max: 20, label: 'Average',             cls: 'lbm-ffmi-average' },
    { max: 22, label: 'Above average',       cls: 'lbm-ffmi-above'   },
    { max: 24, label: 'Excellent',           cls: 'lbm-ffmi-excel'   },
    { max: 26, label: 'Superior',            cls: 'lbm-ffmi-super'   },
    { max: Infinity, label: 'Near natural limit', cls: 'lbm-ffmi-super' },
  ],
  female: [
    { max: 13, label: 'Below average',  cls: 'lbm-ffmi-below'   },
    { max: 15, label: 'Average',        cls: 'lbm-ffmi-average' },
    { max: 17, label: 'Above average',  cls: 'lbm-ffmi-above'   },
    { max: 20, label: 'Excellent',      cls: 'lbm-ffmi-excel'   },
    { max: Infinity, label: 'Superior', cls: 'lbm-ffmi-super'   },
  ],
};

function lbmBoer(w, h, sex) {
  return sex === 'male'
    ? 0.407 * w + 0.267 * h - 19.2
    : 0.252 * w + 0.473 * h - 48.3;
}

function lbmHume(w, h, sex) {
  return sex === 'male'
    ? 0.3281 * w + 0.33929 * h - 29.5336
    : 0.29569 * w + 0.41813 * h - 43.2933;
}

function lbmJames(w, h, sex) {
  const r = w / h;
  return sex === 'male'
    ? 1.1 * w - 128 * r * r
    : 1.07 * w - 148 * r * r;
}

function getBFCat(bf, sex)   { return BF_NORMS[sex].find(c => bf < c.max); }
function getFFMICat(f, sex)  { return FFMI_NORMS[sex].find(c => f < c.max); }

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

    const h   = heightCm / 100;
    const bmi = weightKg / (h * h);
    if (bmi < 10 || bmi > 100) return hide();

    const lbm  = lbmBoer(weightKg, heightCm, sex);
    const lbmH = lbmHume(weightKg, heightCm, sex);
    const lbmJ = lbmJames(weightKg, heightCm, sex);

    if (lbm < 5 || lbm >= weightKg) return hide();

    const fatKg = weightKg - lbm;
    const bfPct = (fatKg / weightKg) * 100;
    const ffmi  = lbm / (h * h);
    const ffmiN = ffmi + 6.1 * (1.8 - h);

    const bfCat   = getBFCat(bfPct, sex);
    const ffmiCat = getFFMICat(ffmiN, sex);

    const kg = v => v.toFixed(1) + '\u00a0kg';
    const lb = v => (v / 0.453592).toFixed(1) + '\u00a0lbs';
    const disp = v => unit === 'metric' ? kg(v) : lb(v);

    document.getElementById('lbm-val').textContent  = unit === 'metric' ? lbm.toFixed(1) : (lbm / 0.453592).toFixed(1);
    document.getElementById('lbm-unit').textContent = unit === 'metric' ? 'kg' : 'lbs';
    document.getElementById('lbm-fat-mass').textContent = disp(fatKg);
    document.getElementById('lbm-bf-pct').textContent   = bfPct.toFixed(1) + '%';

    const bfBadge = document.getElementById('lbm-bf-badge');
    bfBadge.textContent = bfCat.label;
    bfBadge.className   = `lbm-card-badge bmi-bf-${bfCat.cls}`;

    document.getElementById('lbm-ffmi-val').textContent = ffmiN.toFixed(1);
    const ffmiBadge = document.getElementById('lbm-ffmi-badge');
    ffmiBadge.textContent = ffmiCat.label;
    ffmiBadge.className   = `lbm-card-badge ${ffmiCat.cls}`;

    document.getElementById('lbm-bmi').textContent = bmi.toFixed(1);

    const jOk = lbmJ > 0.3 * weightKg && lbmJ < weightKg;
    document.getElementById('lbm-formula-note').textContent =
      `Boer:\u00a0${disp(lbm)} \u00b7 Hume:\u00a0${disp(lbmH)} \u00b7 James:\u00a0${jOk ? disp(lbmJ) : 'N/A'}`;

    document.getElementById('lbm-result').classList.remove('hidden');
  }

  function hide() {
    document.getElementById('lbm-result').classList.add('hidden');
  }
});
