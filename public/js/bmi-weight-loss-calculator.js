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

const PACE_LABELS = {
  metric:   ['0.25\u00a0kg/wk', '0.5\u00a0kg/wk', '0.75\u00a0kg/wk', '1\u00a0kg/wk'],
  imperial: ['0.5\u00a0lbs/wk', '1\u00a0lb/wk',   '1.5\u00a0lbs/wk', '2\u00a0lbs/wk'],
};
const PACE_VALS = ['0.25', '0.5', '0.75', '1'];

function getCategory(bmi) {
  return CATEGORIES.find(c => bmi >= c.min && bmi < c.max) || CATEGORIES[CATEGORIES.length - 1];
}

function getBFCategory(bf, sex) {
  return BF_NORMS[sex].find(c => bf < c.max);
}

document.addEventListener('DOMContentLoaded', () => {
  let unit = 'metric';
  let sex  = 'male';

  const paceEl       = document.getElementById('bmi-pace');
  const ageEl        = document.getElementById('bmi-age');
  const redirectEl   = document.getElementById('bmi-age-redirect');
  const bfRowEl      = document.getElementById('bmi-bf-row');
  const goalBfRowEl  = document.getElementById('bmi-goal-bf-row');
  const targetBmiEl  = document.getElementById('bmi-target-bmi');

  function rebuildPace() {
    if (!paceEl) return;
    const cur = paceEl.value;
    const labels = PACE_LABELS[unit];
    paceEl.innerHTML = PACE_VALS.map((v, i) =>
      `<option value="${v}"${v === cur ? ' selected' : ''}>${labels[i]}</option>`
    ).join('');
  }

  document.querySelectorAll('.bmi-unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.bmi-unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      unit = btn.dataset.unit;
      document.getElementById('bmi-metric').classList.toggle('active', unit === 'metric');
      document.getElementById('bmi-imperial').classList.toggle('active', unit === 'imperial');
      rebuildPace();
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
  if (paceEl)      paceEl.addEventListener('change', calculate);
  if (targetBmiEl) targetBmiEl.addEventListener('input', calculate);

  rebuildPace();

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
      const ft       = parseFloat(document.getElementById('bmi-height-ft').value) || 0;
      const inp      = parseFloat(document.getElementById('bmi-height-in').value) || 0;
      const totalIn  = ft * 12 + inp;
      if (!weightLb || weightLb <= 0 || totalIn <= 0) return hide();
      bmi      = (703 * weightLb) / (totalIn * totalIn);
      weightKg = weightLb * 0.453592;
      heightCm = totalIn * 2.54;
    }

    if (bmi < 5 || bmi > 150) return hide();

    const age = ageEl ? parseInt(ageEl.value, 10) : null;

    if (redirectEl && age && age < 20) {
      redirectEl.innerHTML = age < 13
        ? 'For children aged 2\u201312, use our <a href="/health/bmi-calculator/kids">BMI Calculator for Kids</a> \u2014 it uses CDC growth charts and BMI-for-age percentiles.'
        : 'For teenagers aged 13\u201319, use our <a href="/health/bmi-calculator/teens">BMI Calculator for Teens</a> \u2014 it uses CDC growth charts and BMI-for-age percentiles.';
      redirectEl.classList.remove('hidden');
      document.getElementById('bmi-result').classList.add('hidden');
      return;
    }

    const h   = heightCm / 100;
    const cat = getCategory(bmi);

    document.getElementById('bmi-value').textContent = bmi.toFixed(1);
    const badge = document.getElementById('bmi-category-badge');
    badge.textContent = cat.label;
    badge.className   = `bmi-category-badge bmi-badge-${cat.cls}`;

    const pct = Math.min(Math.max(((bmi - 10) / 30) * 100, 0), 100);
    document.getElementById('bmi-indicator').style.left = pct + '%';

    const rawTarget    = parseFloat(targetBmiEl ? targetBmiEl.value : '24.9');
    const targetBmi    = isNaN(rawTarget) ? 24.9 : Math.max(18.5, Math.min(40, rawTarget));
    const targetWeightKg = targetBmi * h * h;
    const diffKg       = weightKg - targetWeightKg;

    const wdEl = document.getElementById('bmi-weight-diff');
    const twEl = document.getElementById('bmi-target-weight');
    const teEl = document.getElementById('bmi-time-estimate');

    if (twEl) {
      twEl.textContent = unit === 'metric'
        ? `Target weight (BMI\u00a0${targetBmi.toFixed(1)}): ${targetWeightKg.toFixed(1)}\u00a0kg`
        : `Target weight (BMI\u00a0${targetBmi.toFixed(1)}): ${(targetWeightKg / 0.453592).toFixed(1)}\u00a0lbs`;
    }

    if (wdEl) {
      if (Math.abs(diffKg) < 0.5) {
        wdEl.textContent = 'You are already at your target BMI';
        wdEl.className   = 'bmi-detail bmi-wl-ok';
      } else if (diffKg > 0) {
        const disp = unit === 'metric'
          ? `${diffKg.toFixed(1)}\u00a0kg`
          : `${(diffKg / 0.453592).toFixed(1)}\u00a0lbs`;
        wdEl.textContent = `Lose ${disp} to reach BMI\u00a0${targetBmi.toFixed(1)}`;
        wdEl.className   = 'bmi-detail bmi-wl-lose';
      } else {
        const disp = unit === 'metric'
          ? `${Math.abs(diffKg).toFixed(1)}\u00a0kg`
          : `${(Math.abs(diffKg) / 0.453592).toFixed(1)}\u00a0lbs`;
        wdEl.textContent = `Gain ${disp} to reach BMI\u00a0${targetBmi.toFixed(1)}`;
        wdEl.className   = 'bmi-detail bmi-wl-gain';
      }
    }

    if (teEl) {
      if (Math.abs(diffKg) >= 0.5) {
        const pace  = parseFloat(paceEl ? paceEl.value : '0.5') || 0.5;
        const weeks = Math.abs(diffKg) / pace;
        let timeStr;
        if (weeks < 2) {
          timeStr = `~${Math.ceil(weeks)} week${Math.ceil(weeks) === 1 ? '' : 's'}`;
        } else if (weeks < 13) {
          timeStr = `~${Math.round(weeks)} weeks`;
        } else {
          timeStr = `~${(weeks / 4.33).toFixed(1)} months`;
        }
        teEl.textContent = `At chosen pace \u2192 ${timeStr}`;
        teEl.classList.remove('hidden');
      } else {
        teEl.classList.add('hidden');
      }
    }

    if (bfRowEl && goalBfRowEl && age && age >= 18 && age <= 100) {
      const sexFactor = sex === 'male' ? 1 : 0;
      const bf     = (1.20 * bmi)       + (0.23 * age) - (10.8 * sexFactor) - 5.4;
      const goalBf = (1.20 * targetBmi) + (0.23 * age) - (10.8 * sexFactor) - 5.4;
      if (bf > 3 && bf < 65) {
        const bfCat = getBFCategory(bf, sex);
        document.getElementById('bmi-bf-value').textContent =
          `~${bf.toFixed(1)}% body fat now \u00b7 ${bfCat.label}`;
        bfRowEl.className = `bmi-detail bmi-bf-${bfCat.cls}`;
        bfRowEl.classList.remove('hidden');
      } else {
        bfRowEl.classList.add('hidden');
      }
      if (goalBf > 3 && goalBf < 65 && Math.abs(diffKg) >= 0.5) {
        const goalBfCat = getBFCategory(goalBf, sex);
        document.getElementById('bmi-goal-bf-value').textContent =
          `~${goalBf.toFixed(1)}% body fat at goal \u00b7 ${goalBfCat.label}`;
        goalBfRowEl.className = `bmi-detail bmi-bf-${goalBfCat.cls}`;
        goalBfRowEl.classList.remove('hidden');
      } else {
        goalBfRowEl.classList.add('hidden');
      }
    } else {
      if (bfRowEl)     bfRowEl.classList.add('hidden');
      if (goalBfRowEl) goalBfRowEl.classList.add('hidden');
    }

    if (redirectEl) {
      if (age && age >= 65) {
        redirectEl.innerHTML = 'Age 65+? Our <a href="/health/bmi-calculator/seniors">BMI Calculator for Seniors</a> uses the 23\u201327.5 optimal range and frailty risk guidance.';
        redirectEl.classList.remove('hidden');
      } else {
        redirectEl.classList.add('hidden');
      }
    }

    document.getElementById('bmi-result').classList.remove('hidden');
  }

  function hide() {
    document.getElementById('bmi-result').classList.add('hidden');
    if (redirectEl) redirectEl.classList.add('hidden');
  }
});
