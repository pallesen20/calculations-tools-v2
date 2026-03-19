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

function getContextNote(bmi, age, sex, cat) {
  if (!age) return null;
  if (sex === 'male' && bmi >= 25 && bmi < 30) {
    return 'Muscular men often fall in the Overweight range at healthy body fat levels. Check waist circumference: risk rises above 94\u00a0cm (37\u00a0in).';
  }
  if (sex === 'female' && cat.cls === 'normal') {
    return 'Women naturally carry 3\u20135% more body fat than men at the same BMI \u2014 this is physiologically normal.';
  }
  return null;
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
  const noteEl     = document.getElementById('bmi-context-note');

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

    if (redirectEl && age && age < 20) {
      redirectEl.innerHTML = age < 13
        ? 'For children aged 2\u201312, use our <a href="/health/bmi-calculator/kids">BMI Calculator for Kids</a> \u2014 it uses CDC growth charts and BMI-for-age percentiles.'
        : 'For teenagers aged 13\u201319, use our <a href="/health/bmi-calculator/teens">BMI Calculator for Teens</a> \u2014 it uses CDC growth charts and BMI-for-age percentiles.';
      redirectEl.classList.remove('hidden');
      document.getElementById('bmi-result').classList.add('hidden');
      return;
    }

    const cat = getCategory(bmi);
    const h   = heightCm / 100;

    document.getElementById('bmi-value').textContent = bmi.toFixed(1);

    const badge = document.getElementById('bmi-category-badge');
    badge.textContent = cat.label;
    badge.className   = `bmi-category-badge bmi-badge-${cat.cls}`;

    const pct = Math.min(Math.max(((bmi - 10) / 30) * 100, 0), 100);
    document.getElementById('bmi-indicator').style.left = pct + '%';

    const minKg = 18.5 * h * h;
    const maxKg = 24.9 * h * h;
    if (unit === 'metric') {
      document.getElementById('bmi-healthy-range').textContent =
        `Healthy weight range: ${minKg.toFixed(1)} \u2013 ${maxKg.toFixed(1)} kg`;
    } else {
      document.getElementById('bmi-healthy-range').textContent =
        `Healthy weight range: ${(minKg / 0.453592).toFixed(1)} \u2013 ${(maxKg / 0.453592).toFixed(1)} lbs`;
    }

    let nextText;
    if (bmi < 18.5) {
      const need = (18.5 * h * h) - weightKg;
      nextText = unit === 'metric'
        ? `Gain ${need.toFixed(1)} kg to reach Normal weight`
        : `Gain ${(need / 0.453592).toFixed(1)} lbs to reach Normal weight`;
    } else if (bmi >= 25) {
      const need = weightKg - (24.9 * h * h);
      nextText = unit === 'metric'
        ? `Lose ${need.toFixed(1)} kg to reach Normal weight`
        : `Lose ${(need / 0.453592).toFixed(1)} lbs to reach Normal weight`;
    } else {
      nextText = 'You are within the Normal weight range';
    }
    document.getElementById('bmi-next-category').textContent = nextText;

    if (bfRowEl && age && age >= 18 && age <= 100) {
      const sexFactor = sex === 'male' ? 1 : 0;
      const bf = (1.20 * bmi) + (0.23 * age) - (10.8 * sexFactor) - 5.4;
      if (bf > 3 && bf < 65) {
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

    if (noteEl) {
      const note = getContextNote(bmi, age, sex, cat);
      if (note) {
        noteEl.textContent = note;
        noteEl.classList.remove('hidden');
      } else {
        noteEl.classList.add('hidden');
      }
    }

    if (redirectEl) {
      if (age && age >= 65) {
        redirectEl.innerHTML = 'Age 65+? Our <a href="/health/bmi-calculator/seniors">BMI Calculator for Seniors</a> uses the 23\u201327.5 optimal range, frailty risk assessment, and senior-specific guidance.';
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
