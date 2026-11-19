document.addEventListener('DOMContentLoaded', () => {
  const dobInput = document.getElementById('ca-dob');
  const gaInput = document.getElementById('ca-ga');
  const targetInput = document.getElementById('ca-target');
  const resultEl = document.getElementById('ca-result');

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  targetInput.value = `${yyyy}-${mm}-${dd}`;

  function formatAge(totalDays) {
    if (totalDays <= 0) return null;
    const months = Math.floor(totalDays / 30.4375);
    const remDays = Math.round(totalDays - months * 30.4375);
    const weeks = Math.floor(remDays / 7);
    const parts = [];
    if (months > 0) parts.push(`${months} month${months !== 1 ? 's' : ''}`);
    if (weeks > 0) parts.push(`${weeks} week${weeks !== 1 ? 's' : ''}`);
    if (parts.length === 0) parts.push(`${totalDays} day${totalDays !== 1 ? 's' : ''}`);
    return { months, weeks, label: parts.join(', ') };
  }

  function premCategory(ga) {
    if (ga >= 34) return 'Late preterm (34-36 weeks)';
    if (ga >= 32) return 'Moderate preterm (32-33 weeks)';
    if (ga >= 28) return 'Very preterm (28-31 weeks)';
    return 'Extremely preterm (under 28 weeks)';
  }

  function calculate() {
    if (!dobInput.value || !gaInput.value) { resultEl.innerHTML = ''; return; }

    const dob = new Date(dobInput.value);
    const ga = parseInt(gaInput.value, 10);
    const targetDate = targetInput.value ? new Date(targetInput.value) : new Date();

    if (isNaN(dob.getTime()) || isNaN(ga) || ga < 22 || ga > 43) { resultEl.innerHTML = ''; return; }
    if (isNaN(targetDate.getTime()) || targetDate < dob) { resultEl.innerHTML = ''; return; }

    const weeksPremature = 40 - ga;
    const chronDays = Math.round((targetDate - dob) / 86400000);
    const chron = formatAge(chronDays) || { months: 0, label: `${chronDays} days` };

    if (weeksPremature <= 0) {
      resultEl.innerHTML = `
        <div class="ca-result-block">
          <div class="ca-result-label">Chronological age</div>
          <div class="ca-result-value">${chron.label}</div>
        </div>
        <p class="ca-result-note">Born at ${ga} weeks (at term). No age correction needed.</p>
      `;
      return;
    }

    const correctedDays = chronDays - weeksPremature * 7;
    let correctedLabel = '';
    let correctedMonths = 0;

    if (correctedDays <= 0) {
      const daysToEDD = Math.abs(correctedDays);
      correctedLabel = `${daysToEDD} day${daysToEDD !== 1 ? 's' : ''} before expected due date`;
    } else {
      const corrected = formatAge(correctedDays);
      correctedLabel = corrected ? corrected.label : `${correctedDays} days`;
      correctedMonths = corrected ? corrected.months : 0;
    }

    const stillUse = correctedMonths < 24;
    const category = premCategory(ga);

    resultEl.innerHTML = `
      <div class="ca-result-grid">
        <div class="ca-result-block">
          <div class="ca-result-label">Chronological age</div>
          <div class="ca-result-value">${chron.label}</div>
          <div class="ca-result-sub">Actual age since birth</div>
        </div>
        <div class="ca-result-block ca-result-block--main">
          <div class="ca-result-label">Corrected age</div>
          <div class="ca-result-value">${correctedLabel}</div>
          <div class="ca-result-sub">Use this for milestones</div>
        </div>
      </div>
      <div class="ca-result-details">
        <div class="ca-detail-row">
          <span class="ca-detail-label">Weeks premature</span>
          <span class="ca-detail-value">${weeksPremature} week${weeksPremature !== 1 ? 's' : ''} early</span>
        </div>
        <div class="ca-detail-row">
          <span class="ca-detail-label">Prematurity category</span>
          <span class="ca-detail-value">${category}</span>
        </div>
        <div class="ca-detail-row">
          <span class="ca-detail-label">Still use corrected age?</span>
          <span class="ca-detail-value ${stillUse ? 'ca-detail-yes' : 'ca-detail-no'}">${stillUse ? 'Yes - corrected age under 24 months' : 'No - switch to chronological age'}</span>
        </div>
      </div>
    `;
  }

  [dobInput, gaInput, targetInput].forEach(el => {
    el.addEventListener('input', calculate);
    el.addEventListener('change', calculate);
  });
});
