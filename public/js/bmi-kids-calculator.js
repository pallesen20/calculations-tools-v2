// BMI Calculator for Children (ages 2–12) and Teens (ages 13–19)
// Percentile calculation uses CDC 2000 Growth Charts LMS parameters
// Source: NCHS Vital and Health Statistics, Series 11, No. 246 (2002)

(function () {
  'use strict';

  // LMS data: [ageYears, L, M, S] at 0.5-year intervals
  // L = Box-Cox power, M = median BMI, S = coefficient of variation
  const LMS_BOYS = [
    [2.0,  -1.68, 16.36, 0.103],
    [2.5,  -1.73, 16.14, 0.101],
    [3.0,  -1.89, 15.95, 0.099],
    [3.5,  -2.09, 15.81, 0.097],
    [4.0,  -2.27, 15.70, 0.096],
    [4.5,  -2.44, 15.60, 0.095],
    [5.0,  -2.58, 15.51, 0.093],
    [5.5,  -2.65, 15.44, 0.093],
    [6.0,  -2.72, 15.39, 0.092],
    [6.5,  -2.79, 15.37, 0.093],
    [7.0,  -2.86, 15.38, 0.094],
    [7.5,  -2.88, 15.44, 0.095],
    [8.0,  -2.90, 15.57, 0.096],
    [8.5,  -2.87, 15.75, 0.097],
    [9.0,  -2.82, 15.98, 0.099],
    [9.5,  -2.75, 16.24, 0.101],
    [10.0, -2.64, 16.55, 0.103],
    [10.5, -2.54, 16.89, 0.105],
    [11.0, -2.46, 17.26, 0.107],
    [11.5, -2.38, 17.65, 0.109],
    [12.0, -2.31, 18.04, 0.111],
    [12.5, -2.24, 18.44, 0.112],
    [13.0, -2.16, 18.84, 0.113],
    [13.5, -2.07, 19.22, 0.114],
    [14.0, -1.98, 19.58, 0.114],
    [14.5, -1.89, 19.92, 0.115],
    [15.0, -1.79, 20.23, 0.115],
    [15.5, -1.68, 20.53, 0.116],
    [16.0, -1.58, 20.79, 0.116],
    [16.5, -1.48, 21.04, 0.116],
    [17.0, -1.38, 21.28, 0.117],
    [17.5, -1.28, 21.51, 0.117],
    [18.0, -1.18, 21.74, 0.117],
    [18.5, -1.08, 21.97, 0.118],
    [19.0, -0.98, 22.20, 0.118],
    [19.5, -0.88, 22.43, 0.119],
    [20.0, -0.78, 22.59, 0.119],
  ];

  const LMS_GIRLS = [
    [2.0,  -1.33, 16.09, 0.106],
    [2.5,  -1.38, 15.90, 0.104],
    [3.0,  -1.55, 15.73, 0.102],
    [3.5,  -1.75, 15.59, 0.100],
    [4.0,  -1.93, 15.46, 0.098],
    [4.5,  -2.09, 15.34, 0.096],
    [5.0,  -2.22, 15.24, 0.095],
    [5.5,  -2.26, 15.16, 0.094],
    [6.0,  -2.31, 15.13, 0.093],
    [6.5,  -2.36, 15.14, 0.094],
    [7.0,  -2.40, 15.19, 0.094],
    [7.5,  -2.44, 15.29, 0.095],
    [8.0,  -2.45, 15.44, 0.096],
    [8.5,  -2.45, 15.63, 0.098],
    [9.0,  -2.41, 15.87, 0.100],
    [9.5,  -2.36, 16.14, 0.102],
    [10.0, -2.30, 16.46, 0.104],
    [10.5, -2.23, 16.82, 0.106],
    [11.0, -2.15, 17.21, 0.108],
    [11.5, -2.05, 17.61, 0.110],
    [12.0, -1.94, 18.02, 0.112],
    [12.5, -1.83, 18.43, 0.113],
    [13.0, -1.72, 18.83, 0.115],
    [13.5, -1.62, 19.20, 0.116],
    [14.0, -1.52, 19.55, 0.117],
    [14.5, -1.43, 19.87, 0.118],
    [15.0, -1.34, 20.16, 0.119],
    [15.5, -1.26, 20.43, 0.120],
    [16.0, -1.18, 20.68, 0.120],
    [16.5, -1.10, 20.92, 0.121],
    [17.0, -1.03, 21.14, 0.122],
    [17.5, -0.96, 21.36, 0.122],
    [18.0, -0.90, 21.57, 0.122],
    [18.5, -0.83, 21.78, 0.123],
    [19.0, -0.77, 21.99, 0.123],
    [19.5, -0.71, 22.20, 0.124],
    [20.0, -0.65, 22.36, 0.124],
  ];

  // Redirect messages shown when age is outside the current page's range
  const REDIRECT = {
    kids: {
      tooHigh: 'Age 13–19? Our <a href="/health/bmi-calculator/teens">BMI Calculator for Teens</a> gives more accurate results for adolescents.',
      tooLow:  'For children under 2, use a WHO infant growth chart. This calculator covers ages 2–12.',
    },
    teens: {
      tooHigh: 'Age 20 or older? Switch to our <a href="/health/bmi-calculator">adult BMI Calculator</a> — adults use fixed category thresholds, not percentiles.',
      tooLow:  'Age 2–12? Our <a href="/health/bmi-calculator/kids">BMI Calculator for Kids</a> gives more accurate results for younger children.',
    },
  };

  function getLMS(sex, ageYears) {
    const data = sex === 'M' ? LMS_BOYS : LMS_GIRLS;
    if (ageYears <= data[0][0]) return data[0].slice(1);
    if (ageYears >= data[data.length - 1][0]) return data[data.length - 1].slice(1);
    for (let i = 0; i < data.length - 1; i++) {
      if (ageYears >= data[i][0] && ageYears <= data[i + 1][0]) {
        const t = (ageYears - data[i][0]) / (data[i + 1][0] - data[i][0]);
        return [
          data[i][1] + t * (data[i + 1][1] - data[i][1]),
          data[i][2] + t * (data[i + 1][2] - data[i][2]),
          data[i][3] + t * (data[i + 1][3] - data[i][3]),
        ];
      }
    }
  }

  // Standard normal CDF — Abramowitz & Stegun approximation
  function normalCDF(z) {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const poly = t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
    const p = 1 - 0.398942280 * Math.exp(-0.5 * z * z) * poly;
    return z >= 0 ? p : 1 - p;
  }

  // Inverse normal CDF (probit)
  function normalInvCDF(p) {
    const pp = p < 0.5 ? p : 1 - p;
    const tt = Math.sqrt(-2 * Math.log(pp));
    const num = 2.515517 + 0.802853 * tt + 0.010328 * tt * tt;
    const den = 1 + 1.432788 * tt + 0.189269 * tt * tt + 0.001308 * tt * tt * tt;
    const z = tt - num / den;
    return p < 0.5 ? -z : z;
  }

  function bmiToPercentile(bmi, sex, ageYears) {
    const [L, M, S] = getLMS(sex, ageYears);
    const Z = Math.abs(L) < 1e-6
      ? Math.log(bmi / M) / S
      : (Math.pow(bmi / M, L) - 1) / (L * S);
    return normalCDF(Math.max(-8, Math.min(8, Z))) * 100;
  }

  function percentileToBMI(percentile, sex, ageYears) {
    const [L, M, S] = getLMS(sex, ageYears);
    const Z = normalInvCDF(percentile / 100);
    return Math.abs(L) < 1e-6
      ? M * Math.exp(S * Z)
      : M * Math.pow(1 + L * S * Z, 1 / L);
  }

  function getCategory(pct) {
    if (pct < 5)  return { label: 'Underweight',   cls: 'underweight' };
    if (pct < 85) return { label: 'Healthy weight', cls: 'normal'      };
    if (pct < 95) return { label: 'Overweight',     cls: 'overweight'  };
    return         { label: 'Obese',                cls: 'obese'       };
  }

  function ordinal(n) {
    const v = n % 100;
    const sfx = [,'st','nd','rd'];
    return n + (sfx[(v - 20) % 10] || sfx[v] || 'th');
  }

  document.addEventListener('DOMContentLoaded', () => {
    let sex  = 'M';
    let unit = 'metric';

    const container  = document.getElementById('bmi-k-container');
    const mode       = container?.dataset.bmiMode || null; // 'kids' | 'teens' | null

    const sexBtns     = document.querySelectorAll('.bmi-k-sex-btn');
    const unitBtns    = document.querySelectorAll('.bmi-k-unit-btn');
    const metricDiv   = document.getElementById('bmi-k-metric');
    const imperialDiv = document.getElementById('bmi-k-imperial');
    const ageYrEl     = document.getElementById('bmi-k-age-yr');
    const ageMoEl     = document.getElementById('bmi-k-age-mo');
    const weightKgEl  = document.getElementById('bmi-k-weight-kg');
    const heightCmEl  = document.getElementById('bmi-k-height-cm');
    const weightLbEl  = document.getElementById('bmi-k-weight-lb');
    const heightFtEl  = document.getElementById('bmi-k-height-ft');
    const heightInEl  = document.getElementById('bmi-k-height-in');
    const resultEl    = document.getElementById('bmi-k-result');
    const redirectEl  = document.getElementById('bmi-k-redirect');
    const valueEl     = document.getElementById('bmi-k-value');
    const pctEl       = document.getElementById('bmi-k-percentile');
    const badgeEl     = document.getElementById('bmi-k-category-badge');
    const indicatorEl = document.getElementById('bmi-k-indicator');
    const rangeEl     = document.getElementById('bmi-k-healthy-range');
    const hintEl      = document.getElementById('bmi-k-next-category');

    sexBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sex = btn.dataset.sex;
        sexBtns.forEach(b => b.classList.toggle('active', b.dataset.sex === sex));
        calculate();
      });
    });

    unitBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        unit = btn.dataset.unit;
        unitBtns.forEach(b => b.classList.toggle('active', b.dataset.unit === unit));
        metricDiv.classList.toggle('active', unit === 'metric');
        imperialDiv.classList.toggle('active', unit === 'imperial');
        calculate();
      });
    });

    [ageYrEl, ageMoEl, weightKgEl, heightCmEl, weightLbEl, heightFtEl, heightInEl]
      .forEach(el => el && el.addEventListener('input', calculate));

    function showRedirect(message) {
      resultEl.classList.add('hidden');
      if (redirectEl) {
        redirectEl.innerHTML = message;
        redirectEl.classList.remove('hidden');
      }
    }

    function hideAll() {
      resultEl.classList.add('hidden');
      redirectEl?.classList.add('hidden');
    }

    function calculate() {
      const ageYrs   = parseFloat(ageYrEl.value.replace(",","."))  || 0;
      const ageMos   = parseFloat(ageMoEl.value.replace(",","."))  || 0;
      const ageTotal = ageYrs + ageMos / 12;

      // Age too young for CDC charts
      if (ageYrs > 0 && ageTotal < 2) {
        if (mode && REDIRECT[mode]) showRedirect(REDIRECT[mode].tooLow);
        else hideAll();
        return;
      }

      // Age outside this page's mode range — show redirect
      if (mode === 'kids' && ageTotal >= 13) {
        showRedirect(REDIRECT.kids.tooHigh);
        return;
      }
      if (mode === 'teens' && ageTotal > 0 && ageTotal < 13) {
        showRedirect(REDIRECT.teens.tooLow);
        return;
      }
      if (mode === 'teens' && ageTotal >= 20) {
        showRedirect(REDIRECT.teens.tooHigh);
        return;
      }

      // Age not yet entered or out of overall CDC range
      if (ageTotal < 2 || ageTotal > 20) return hideAll();

      redirectEl?.classList.add('hidden');

      let weightKg, heightM;
      if (unit === 'metric') {
        weightKg = parseFloat(weightKgEl.value.replace(",","."));
        const hcm = parseFloat(heightCmEl.value.replace(",","."));
        if (!weightKg || !hcm || weightKg <= 0 || hcm <= 0) return hideAll();
        heightM = hcm / 100;
      } else {
        const lb  = parseFloat(weightLbEl.value.replace(",","."));
        const ft  = parseFloat(heightFtEl.value.replace(",",".")) || 0;
        const inp = parseFloat(heightInEl.value.replace(",",".")) || 0;
        const totalIn = ft * 12 + inp;
        if (!lb || lb <= 0 || totalIn <= 0) return hideAll();
        weightKg = lb / 2.20462;
        heightM  = totalIn * 0.0254;
      }

      const bmi = weightKg / (heightM * heightM);
      if (bmi < 8 || bmi > 60) return hideAll();

      const pct   = bmiToPercentile(bmi, sex, ageTotal);
      const cat   = getCategory(pct);
      const bmi5  = percentileToBMI(5,  sex, ageTotal);
      const bmi85 = percentileToBMI(85, sex, ageTotal);
      const bmi95 = percentileToBMI(95, sex, ageTotal);

      valueEl.textContent = bmi.toFixed(1);
      pctEl.textContent   = ordinal(Math.round(pct)) + ' percentile';
      badgeEl.textContent = cat.label;
      badgeEl.className   = 'bmi-category-badge bmi-badge-' + cat.cls;

      indicatorEl.style.left = Math.max(0, Math.min(100, pct)) + '%';

      const sexLabel = sex === 'M' ? 'boy' : 'girl';
      const yrLabel  = Math.floor(ageTotal);
      const moLabel  = Math.round((ageTotal - yrLabel) * 12);
      const ageLabel = moLabel > 0 ? `${yrLabel} yr ${moLabel} mo` : `${yrLabel} yr`;
      const w5  = bmi5  * heightM * heightM;
      const w85 = bmi85 * heightM * heightM;
      if (unit === 'metric') {
        rangeEl.textContent = `Healthy weight for a ${ageLabel} ${sexLabel}: ${w5.toFixed(1)}\u2013${w85.toFixed(1)} kg`;
      } else {
        rangeEl.textContent = `Healthy weight for a ${ageLabel} ${sexLabel}: ${(w5 / 0.453592).toFixed(1)}\u2013${(w85 / 0.453592).toFixed(1)} lbs`;
      }

      if (cat.cls === 'underweight') {
        const need = (bmi5 - bmi) * heightM * heightM;
        hintEl.textContent = unit === 'metric'
          ? `Gain ${need.toFixed(1)} kg to reach Healthy weight (5th percentile)`
          : `Gain ${(need / 0.453592).toFixed(1)} lbs to reach Healthy weight`;
      } else if (cat.cls === 'overweight') {
        const over = (bmi - bmi85) * heightM * heightM;
        hintEl.textContent = unit === 'metric'
          ? `${over.toFixed(1)} kg above Healthy weight range (85th percentile)`
          : `${(over / 0.453592).toFixed(1)} lbs above Healthy weight range`;
      } else if (cat.cls === 'obese') {
        const over = (bmi - bmi95) * heightM * heightM;
        hintEl.textContent = unit === 'metric'
          ? `${over.toFixed(1)} kg above Overweight threshold (95th percentile)`
          : `${(over / 0.453592).toFixed(1)} lbs above Overweight threshold`;
      } else {
        const dist85 = (bmi85 - bmi) * heightM * heightM;
        hintEl.textContent = unit === 'metric'
          ? `${dist85.toFixed(1)} kg below Overweight threshold`
          : `${(dist85 / 0.453592).toFixed(1)} lbs below Overweight threshold`;
      }

      resultEl.classList.remove('hidden');
      resultEl.style.animation = 'none';
      requestAnimationFrame(() => { resultEl.style.animation = 'bmi-fadein 0.3s ease'; });
    }
  });
})();
