const BF_NORMS = {
  male: [
    { max: 6,        label: 'Essential fat only', cls: 'bmi-bf-underweight' },
    { max: 14,       label: 'Athletic',           cls: 'bmi-bf-normal'      },
    { max: 18,       label: 'Fitness',            cls: 'bmi-bf-normal'      },
    { max: 25,       label: 'Acceptable',         cls: 'bmi-bf-overweight'  },
    { max: Infinity, label: 'High',               cls: 'bmi-bf-obese'       },
  ],
  female: [
    { max: 14,       label: 'Essential fat only', cls: 'bmi-bf-underweight' },
    { max: 21,       label: 'Athletic',           cls: 'bmi-bf-normal'      },
    { max: 25,       label: 'Fitness',            cls: 'bmi-bf-normal'      },
    { max: 32,       label: 'Acceptable',         cls: 'bmi-bf-overweight'  },
    { max: Infinity, label: 'High',               cls: 'bmi-bf-obese'       },
  ],
};

function getBFCat(bf, sex) { return BF_NORMS[sex].find(c => bf < c.max); }

function navyBF(heightCm, waistCm, neckCm, hipCm, sex) {
  if (sex === 'male') {
    const diff = waistCm - neckCm;
    if (diff <= 0) return null;
    return 495 / (1.0324 - 0.19077 * Math.log10(diff) + 0.15456 * Math.log10(heightCm)) - 450;
  }
  const sum = waistCm + hipCm - neckCm;
  if (sum <= 0) return null;
  return 495 / (1.29579 - 0.35004 * Math.log10(sum) + 0.22100 * Math.log10(heightCm)) - 450;
}

document.addEventListener('DOMContentLoaded', () => {
  let unit = 'metric';
  let sex  = 'male';

  function updateHipVisibility() {
    document.querySelectorAll('.bf-female-only').forEach(el => {
      el.classList.toggle('hidden', sex !== 'female');
    });
  }

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
      updateHipVisibility();
      calculate();
    });
  });

  document.querySelectorAll('.bmi-input').forEach(el => el.addEventListener('input', calculate));

  updateHipVisibility();

  function calculate() {
    let weightKg, heightCm, waistCm, neckCm, hipCm;

    if (unit === 'metric') {
      weightKg = parseFloat(document.getElementById('bmi-weight-kg').value);
      heightCm = parseFloat(document.getElementById('bmi-height-cm').value);
      waistCm  = parseFloat(document.getElementById('bf-waist-cm').value);
      neckCm   = parseFloat(document.getElementById('bf-neck-cm').value);
      hipCm    = sex === 'female' ? parseFloat(document.getElementById('bf-hip-cm').value) : 0;
    } else {
      const weightLb = parseFloat(document.getElementById('bmi-weight-lb').value);
      const ft       = parseFloat(document.getElementById('bmi-height-ft').value) || 0;
      const inp      = parseFloat(document.getElementById('bmi-height-in').value) || 0;
      const totalIn  = ft * 12 + inp;
      if (!weightLb || weightLb <= 0 || totalIn <= 0) return hide();
      weightKg = weightLb * 0.453592;
      heightCm = totalIn * 2.54;
      waistCm  = (parseFloat(document.getElementById('bf-waist-in').value) || 0) * 2.54;
      neckCm   = (parseFloat(document.getElementById('bf-neck-in').value)  || 0) * 2.54;
      hipCm    = sex === 'female' ? (parseFloat(document.getElementById('bf-hip-in').value) || 0) * 2.54 : 0;
    }

    if (!weightKg || !heightCm || weightKg <= 0 || heightCm <= 0) return hide();
    if (!waistCm || !neckCm || waistCm <= 0 || neckCm <= 0) return hide();
    if (sex === 'female' && hipCm <= 0) return hide();

    const bf = navyBF(heightCm, waistCm, neckCm, hipCm, sex);
    if (bf === null || bf < 2 || bf > 70) return hide();

    const bmi   = weightKg / ((heightCm / 100) ** 2);
    const fatKg = weightKg * (bf / 100);
    const lbm   = weightKg - fatKg;
    const cat   = getBFCat(bf, sex);

    const kg   = v => v.toFixed(1) + '\u00a0kg';
    const lb   = v => (v / 0.453592).toFixed(1) + '\u00a0lbs';
    const disp = v => unit === 'metric' ? kg(v) : lb(v);

    document.getElementById('bf-val').textContent      = bf.toFixed(1);
    document.getElementById('bf-fat-mass').textContent = disp(fatKg);
    document.getElementById('bf-lbm').textContent      = disp(lbm);
    document.getElementById('bf-bmi').textContent      = bmi.toFixed(1);

    const badge = document.getElementById('bf-badge');
    badge.textContent = cat.label;
    badge.className   = `lbm-card-badge ${cat.cls}`;

    const age  = parseFloat(document.getElementById('bf-age').value);
    const deEl = document.getElementById('bf-deurenberg-row');
    if (age >= 18 && age <= 100) {
      const sexFactor = sex === 'male' ? 1 : 0;
      const deBf = 1.20 * bmi + 0.23 * age - 10.8 * sexFactor - 5.4;
      if (deBf > 2 && deBf < 70) {
        document.getElementById('bf-deurenberg-val').textContent = deBf.toFixed(1) + '%';
        deEl.classList.remove('hidden');
      } else {
        deEl.classList.add('hidden');
      }
    } else {
      deEl.classList.add('hidden');
    }

    document.getElementById('bf-result').classList.remove('hidden');
  }

  function hide() {
    document.getElementById('bf-result').classList.add('hidden');
  }
});
