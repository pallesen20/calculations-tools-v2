document.addEventListener('DOMContentLoaded', () => {
  const focusInput = document.getElementById('adb-focus-time');
  const taskBtns = document.querySelectorAll('.adb-task-btn');
  const medCheckbox = document.getElementById('adb-medication');
  const sessionInput = document.getElementById('adb-session-hours');
  const resultEl = document.getElementById('adb-result');

  let taskType = 'moderate';

  taskBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      taskBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      taskType = btn.dataset.task;
      calculate();
    });
  });

  [focusInput, sessionInput].forEach(el => {
    if (el) el.addEventListener('input', calculate);
  });
  if (medCheckbox) medCheckbox.addEventListener('change', calculate);

  function calculate() {
    const rawFocus = parseFloat(focusInput.value);
    if (!rawFocus || rawFocus < 1) {
      resultEl.innerHTML = '';
      return;
    }

    const focus = Math.max(5, Math.min(45, rawFocus));
    const taskMult = { routine: 0.75, moderate: 1.0, deep: 1.25 }[taskType] || 1.0;
    const medMult = medCheckbox && medCheckbox.checked ? 1.3 : 1.0;

    let adjusted = Math.round(focus * taskMult * medMult / 5) * 5;
    adjusted = Math.max(10, Math.min(50, adjusted));

    const shortBreak = Math.max(5, Math.min(15, Math.round(adjusted / 4 / 5) * 5));
    const longBreak = adjusted >= 40 ? 25 : 20;

    const rawSession = parseFloat(sessionInput.value);
    let blocksHtml = '';
    if (rawSession && rawSession > 0) {
      const sessionMin = Math.min(rawSession, 10) * 60;
      const cycleMin = adjusted + shortBreak;
      const blocks = Math.floor(sessionMin / cycleMin);
      const totalFocusMin = blocks * adjusted;
      if (blocks > 0) {
        blocksHtml = `
        <div class="adb-detail-row">
          <span class="adb-detail-label">Focus blocks in session</span>
          <span class="adb-detail-value">${blocks} blocks · ${totalFocusMin} min focused</span>
        </div>`;
      }
    }

    const taskLabel = { routine: 'Routine task', moderate: 'Moderate task', deep: 'Deep work' }[taskType];
    const diff = adjusted - 25;
    const pomComparison = diff === 0
      ? 'Same as standard Pomodoro (25 min)'
      : diff < 0
        ? `${Math.abs(diff)} min shorter than standard Pomodoro`
        : `${diff} min longer than standard Pomodoro`;

    resultEl.innerHTML = `
      <div class="adb-result-grid">
        <div class="adb-result-block adb-result-block--main">
          <div class="adb-result-label">Focus block</div>
          <div class="adb-result-value">${adjusted} min</div>
          <div class="adb-result-sub">${taskLabel}${medCheckbox && medCheckbox.checked ? ' · medicated' : ''}</div>
        </div>
        <div class="adb-result-block">
          <div class="adb-result-label">Short break</div>
          <div class="adb-result-value">${shortBreak} min</div>
          <div class="adb-result-sub">After each block</div>
        </div>
        <div class="adb-result-block">
          <div class="adb-result-label">Long break</div>
          <div class="adb-result-value">${longBreak} min</div>
          <div class="adb-result-sub">Every 4 blocks</div>
        </div>
      </div>
      <div class="adb-result-details">
        <div class="adb-detail-row">
          <span class="adb-detail-label">vs standard Pomodoro</span>
          <span class="adb-detail-value">${pomComparison}</span>
        </div>
        ${blocksHtml}
      </div>
      <p class="adb-result-note">These are starting points. Track what actually works for you and adjust from there.</p>
    `;
  }

  calculate();
});
