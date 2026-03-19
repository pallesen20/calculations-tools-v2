const IBW_OTHER = [
  { id: 'iw-robinson', label: 'Robinson (1983)', male: [52.0, 1.9],  female: [49.0, 1.7]  },
  { id: 'iw-miller',   label: 'Miller (1983)',   male: [56.2, 1.41], female: [53.1, 1.36] },
  { id: 'iw-hamwi',    label: 'Hamwi (1964)',    male: [48.0, 2.7],  female: [45.5, 2.2]  },
];

function ibw(heightCm, sex, [base, coef]) {
  return base + coef * ((heightCm / 2.54) - 60);
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

  function calculate() {
    let heightCm, weightKg;

    if (unit === 'metric') {
      heightCm = parseFloat(document.getElementById('bmi-height-cm').value.replace(",","."));
      const w  = parseFloat(document.getElementById('iw-weight-kg').value.replace(",","."));
      weightKg = w > 0 ? w : null;
    } else {
      const ft     = parseFloat(document.getElementById('bmi-height-ft').value.replace(",",".")) || 0;
      const inp    = parseFloat(document.getElementById('bmi-height-in').value.replace(",",".")) || 0;
      const totalIn = ft * 12 + inp;
      if (totalIn <= 0) return hide();
      heightCm = totalIn * 2.54;
      const wLb = parseFloat(document.getElementById('iw-weight-lb').value.replace(",","."));
      weightKg  = wLb > 0 ? wLb * 0.453592 : null;
    }

    if (!heightCm || heightCm < 100 || heightCm > 250) return hide();

    const devineCoefs = sex === 'male' ? [50.0, 2.3] : [45.5, 2.3];
    const devineKg    = ibw(heightCm, sex, devineCoefs);
    if (devineKg < 20 || devineKg > 200) return hide();

    const h      = heightCm / 100;
    const bmiMin = 18.5 * h * h;
    const bmiMax = 24.9 * h * h;

    const kg   = v => v.toFixed(1) + '\u00a0kg';
    const lb   = v => (v / 0.453592).toFixed(1) + '\u00a0lbs';
    const disp = v => unit === 'metric' ? kg(v) : lb(v);

    document.getElementById('iw-devine').textContent  = disp(devineKg);
    document.getElementById('iw-bmi-min').textContent = disp(bmiMin);
    document.getElementById('iw-bmi-max').textContent = disp(bmiMax);

    const diffCard  = document.getElementById('iw-diff-card');
    const diffVal   = document.getElementById('iw-diff');
    const diffBadge = document.getElementById('iw-diff-badge');

    if (weightKg && weightKg > 10 && weightKg < 500) {
      const diff = weightKg - devineKg;
      const sign = diff > 0 ? '+' : '';
      diffVal.textContent = sign + disp(Math.abs(diff));
      if (Math.abs(diff) < 1) {
        diffBadge.textContent = 'At ideal weight';
        diffBadge.className   = 'lbm-card-badge lbm-ffmi-average';
      } else if (diff > 0) {
        diffBadge.textContent = 'Above ideal';
        diffBadge.className   = 'lbm-card-badge lbm-ffmi-excel';
      } else {
        diffBadge.textContent = 'Below ideal';
        diffBadge.className   = 'lbm-card-badge lbm-ffmi-below';
      }
      diffCard.classList.remove('hidden');
    } else {
      diffCard.classList.add('hidden');
    }

    IBW_OTHER.forEach(f => {
      const coefs = sex === 'male' ? f.male : f.female;
      const val   = ibw(heightCm, sex, coefs);
      document.getElementById(f.id).textContent = disp(val);
    });

    document.getElementById('iw-result').classList.remove('hidden');
  }

  function hide() {
    document.getElementById('iw-result').classList.add('hidden');
  }
});
