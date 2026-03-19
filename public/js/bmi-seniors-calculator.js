const CATEGORIES = [
  { label: 'Underweight',       min: 0,    max: 18.5, cls: 'underweight' },
  { label: 'Normal weight',     min: 18.5, max: 25.0, cls: 'normal'      },
  { label: 'Overweight',        min: 25.0, max: 30.0, cls: 'overweight'  },
  { label: 'Obese (Class I)',   min: 30.0, max: 35.0, cls: 'obese'       },
  { label: 'Obese (Class II)',  min: 35.0, max: 40.0, cls: 'obese'       },
  { label: 'Obese (Class III)', min: 40.0, max: Infinity, cls: 'obese'   },
];

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

function getCategory(bmi) {
  return CATEGORIES.find(c => bmi >= c.min && bmi < c.max) || CATEGORIES[CATEGORIES.length - 1];
}

function getBFCategory(bf, sex) {
  return BF_NORMS[sex].find(c => bf < c.max);
}

function getSeniorRange(bmi) {
  if (bmi < 23)    return { text: 'Below the 23\u201327.5 senior range \u00b7 frailty risk \u2014 discuss with your doctor', cls: 'bmi-senior-low' };
  if (bmi <= 27.5) return { text: 'Within the 23\u201327.5 senior optimal range', cls: 'bmi-senior-ok' };
  if (bmi < 30)    return { text: 'Slightly above the 23\u201327.5 senior range \u00b7 monitor for metabolic risk', cls: 'bmi-senior-high' };
  return                  { text: 'Well above the senior range \u00b7 cardiometabolic risk is elevated', cls: 'bmi-senior-obese' };
}

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

  const ageEl      = document.getElementById('bmi-age');
  const redirectEl = document.getElementById('bmi-age-redirect');
  const bfRowEl    = document.getElementById('bmi-bf-row');
  const srEl       = document.getElementById('bmi-senior-range');

  function calculate() {
    let bmi, weightKg, heightCm;

    if (unit === 'metric') {
      weightKg = parseFloat(document.getElementById('bmi-weight-kg').value.replace(",","."));
      heightCm = parseFloat(document.getElementById('bmi-height-cm').value.replace(",","."));
      if (!weightKg || !heightCm || weightKg <= 0 || heightCm <= 0) return hide();
      const h = heightCm / 100;
      bmi = weightKg / (h * h);
    } else {
      const weightLb = parseFloat(document.getElementById('bmi-weight-lb').value.replace(",","."));
      const ft       = parseFloat(document.getElementById('bmi-height-ft').value.replace(",",".")) || 0;
      const inp      = parseFloat(document.getElementById('bmi-height-in').value.replace(",",".")) || 0;
      const totalIn  = ft * 12 + inp;
      if (!weightLb || weightLb <= 0 || totalIn <= 0) return hide();
      bmi      = (703 * weightLb) / (totalIn * totalIn);
      weightKg = weightLb * 0.453592;
      heightCm = totalIn * 2.54;
    }

    if (bmi < 5 || bmi > 150) return hide();

    const age = ageEl ? parseInt(ageEl.value.replace(",","."), 10) : null;

    if (redirectEl && age && age > 0 && age < 65) {
      redirectEl.innerHTML = 'This calculator is for adults 65 and over. Use our <a href="/health/bmi-calculator">standard BMI Calculator</a> for adults aged 18\u201364.';
      redirectEl.classList.remove('hidden');
      document.getElementById('bmi-result').classList.add('hidden');
      return;
    }
    if (redirectEl) redirectEl.classList.add('hidden');

    const cat = getCategory(bmi);
    const h   = heightCm / 100;

    document.getElementById('bmi-value').textContent = bmi.toFixed(1);

    const badge = document.getElementById('bmi-category-badge');
    badge.textContent = cat.label;
    badge.className   = `bmi-category-badge bmi-badge-${cat.cls}`;

    const pct = Math.min(Math.max(((bmi - 10) / 30) * 100, 0), 100);
    document.getElementById('bmi-indicator').style.left = pct + '%';

    const optMinKg = 23 * h * h;
    const optMaxKg = 27.5 * h * h;
    if (unit === 'metric') {
      document.getElementById('bmi-healthy-range').textContent =
        `Senior optimal weight: ${optMinKg.toFixed(1)} \u2013 ${optMaxKg.toFixed(1)} kg`;
    } else {
      document.getElementById('bmi-healthy-range').textContent =
        `Senior optimal weight: ${(optMinKg / 0.453592).toFixed(1)} \u2013 ${(optMaxKg / 0.453592).toFixed(1)} lbs`;
    }

    let nextText;
    if (bmi < 23) {
      const need = optMinKg - weightKg;
      nextText = unit === 'metric'
        ? `Gain ${need.toFixed(1)} kg to reach the senior optimal range`
        : `Gain ${(need / 0.453592).toFixed(1)} lbs to reach the senior optimal range`;
    } else if (bmi > 27.5) {
      const need = weightKg - optMaxKg;
      nextText = unit === 'metric'
        ? `Lose ${need.toFixed(1)} kg to reach the senior optimal range`
        : `Lose ${(need / 0.453592).toFixed(1)} lbs to reach the senior optimal range`;
    } else {
      nextText = 'Within the senior optimal weight range';
    }
    document.getElementById('bmi-next-category').textContent = nextText;

    if (srEl) {
      const sr = getSeniorRange(bmi);
      srEl.textContent = sr.text;
      srEl.className = `bmi-detail ${sr.cls}`;
      srEl.classList.remove('hidden');
    }

    if (bfRowEl && age && age >= 65 && age <= 110) {
      const sexFactor = sex === 'male' ? 1 : 0;
      const bf = (1.20 * bmi) + (0.23 * age) - (10.8 * sexFactor) - 5.4;
      if (bf > 3 && bf < 70) {
        const bfCat = getBFCategory(bf, sex);
        document.getElementById('bmi-bf-value').textContent =
          `~${bf.toFixed(1)}% body fat (est.) \u00b7 ${bfCat.label}`;
        bfRowEl.className = `bmi-detail bmi-bf-${bfCat.cls}`;
        bfRowEl.classList.remove('hidden');
      } else {
        bfRowEl.classList.add('hidden');
      }
    } else if (bfRowEl) {
      bfRowEl.classList.add('hidden');
    }

    document.getElementById('bmi-result').classList.remove('hidden');
  }

  function hide() {
    document.getElementById('bmi-result').classList.add('hidden');
    if (redirectEl) redirectEl.classList.add('hidden');
  }
});
