document.addEventListener('DOMContentLoaded', () => {
  let unit = 'metric';
  let hrt = 'no';

  const $ = id => document.getElementById(id);

  document.querySelectorAll('.bmi-unit-btn[data-unit]').forEach(btn => {
    btn.addEventListener('click', () => {
      unit = btn.dataset.unit;
      document.querySelectorAll('.bmi-unit-btn[data-unit]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      $('meno-metric').classList.toggle('active', unit === 'metric');
      $('meno-imperial').classList.toggle('active', unit === 'imperial');
      document.querySelectorAll('[data-unit-show]').forEach(el => {
        el.style.display = el.dataset.unitShow === unit ? '' : 'none';
      });
      calculate();
    });
  });

  document.querySelectorAll('.meno-hrt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      hrt = btn.dataset.hrt;
      document.querySelectorAll('.meno-hrt-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calculate();
    });
  });

  ['meno-weight-kg', 'meno-height-cm', 'meno-waist-cm',
   'meno-weight-lb', 'meno-height-ft', 'meno-height-in', 'meno-waist-in',
   'meno-years'].forEach(id => {
    const el = $(id);
    if (el) el.addEventListener('input', calculate);
  });

  function calculate() {
    let weightKg, heightM, waistCm;

    if (unit === 'metric') {
      weightKg = parseFloat($('meno-weight-kg').value);
      const hcm = parseFloat($('meno-height-cm').value);
      heightM = hcm / 100;
      waistCm = parseFloat($('meno-waist-cm').value);
    } else {
      const lb = parseFloat($('meno-weight-lb').value);
      weightKg = lb * 0.453592;
      const ft = parseFloat($('meno-height-ft').value) || 0;
      const ins = parseFloat($('meno-height-in').value) || 0;
      heightM = (ft * 12 + ins) * 0.0254;
      const win = parseFloat($('meno-waist-in').value);
      waistCm = win * 2.54;
    }

    const years = parseFloat($('meno-years').value);

    if (!weightKg || !heightM || heightM < 0.5 || !waistCm || isNaN(years) || years < 0) {
      $('meno-result').classList.add('hidden');
      return;
    }

    const bmi = weightKg / (heightM * heightM);

    let bmiLabel, bmiClass, bmiScore;
    if (bmi < 18.5)      { bmiLabel = 'Underweight';     bmiClass = 'meno-waist-moderate'; bmiScore = 1; }
    else if (bmi < 25)   { bmiLabel = 'Normal weight';   bmiClass = 'meno-waist-low';      bmiScore = 0; }
    else if (bmi < 30)   { bmiLabel = 'Overweight';      bmiClass = 'meno-waist-moderate'; bmiScore = 1; }
    else if (bmi < 35)   { bmiLabel = 'Obese (Class I)'; bmiClass = 'meno-waist-high';     bmiScore = 2; }
    else                 { bmiLabel = 'Obese (II+)';     bmiClass = 'meno-waist-high';     bmiScore = 3; }

    let waistLabel, waistClass, waistScore;
    if (waistCm < 80)      { waistLabel = 'Low risk';       waistClass = 'meno-waist-low';      waistScore = 0; }
    else if (waistCm < 88) { waistLabel = 'Increased risk'; waistClass = 'meno-waist-moderate'; waistScore = 1; }
    else                   { waistLabel = 'High risk';      waistClass = 'meno-waist-high';     waistScore = 2; }

    let yearScore;
    if (years < 5)       yearScore = 0;
    else if (years < 10) yearScore = 0.5;
    else if (years < 15) yearScore = 1;
    else                 yearScore = 1.5;

    const hrtAdj = hrt === 'yes' ? -1 : 0;
    const total = bmiScore + waistScore + yearScore + hrtAdj;

    let riskLabel, riskClass, guidance;
    if (total < 1) {
      riskLabel = 'Low';
      riskClass = 'meno-risk-low';
      guidance = 'Low cardiometabolic risk. Continue current habits and monitor waist circumference annually.';
    } else if (total < 2) {
      riskLabel = 'Moderate';
      riskClass = 'meno-risk-moderate';
      guidance = 'Moderate risk. Resistance training 2-3x per week and reducing refined carbohydrates are the most effective interventions for visceral fat at this stage.';
    } else if (total < 3) {
      riskLabel = 'Elevated';
      riskClass = 'meno-risk-elevated';
      guidance = 'Elevated risk. Consider discussing cardiometabolic screening - blood pressure, fasting glucose, and lipid panel - with your clinician at your next visit.';
    } else {
      riskLabel = 'High';
      riskClass = 'meno-risk-high';
      guidance = 'High risk. A clinical assessment covering blood pressure, blood glucose, and lipid panel is recommended. Discuss these results with your doctor.';
    }

    const waistDisplay = unit === 'metric'
      ? waistCm.toFixed(0) + ' cm'
      : (waistCm / 2.54).toFixed(1) + ' in';

    $('meno-bmi-value').textContent = bmi.toFixed(1);
    const catBadge = $('meno-bmi-category');
    catBadge.textContent = bmiLabel;
    catBadge.className = 'lbm-card-badge ' + bmiClass;
    // catBadge.className = 'bmi-category-badge ' + bmiClass;

    $('meno-waist-reading').textContent = waistDisplay;
    const waistBadge = $('meno-waist-risk');
    waistBadge.textContent = waistLabel;
    waistBadge.className = 'lbm-card-badge ' + waistClass;

    const compEl = $('meno-composite-risk');
    compEl.textContent = riskLabel + ' Risk';
    compEl.className = 'meno-risk-label ' + riskClass;

    $('meno-guidance').textContent = guidance;
    $('meno-result').classList.remove('hidden');
  }
});
