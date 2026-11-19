document.addEventListener('DOMContentLoaded', () => {
  let mode = 'single';

  const modeBtns = document.querySelectorAll('.dtt-mode-btn');
  const singleSection = document.getElementById('dtt-single-section');
  const multiSection = document.getElementById('dtt-multi-section');
  const result = document.getElementById('dtt-result');

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mode = btn.dataset.mode;
      singleSection.style.display = mode === 'single' ? '' : 'none';
      multiSection.style.display = mode === 'multi' ? '' : 'none';
      result.innerHTML = '';
      if (mode === 'multi') renderSessions();
    });
  });

  const masteryInput = document.getElementById('dtt-mastery');
  const masteryDisplay = document.getElementById('dtt-mastery-display');
  masteryInput.addEventListener('input', () => {
    masteryDisplay.textContent = masteryInput.value + '%';
    if (mode === 'single') calculateSingle();
    if (mode === 'multi') calculateMulti();
  });

  const singleInputs = ['dtt-correct', 'dtt-prompted', 'dtt-incorrect', 'dtt-no-response'];
  singleInputs.forEach(id => {
    document.getElementById(id).addEventListener('input', calculateSingle);
  });

  function calculateSingle() {
    const correct = parseFloat(document.getElementById('dtt-correct').value) || 0;
    const prompted = parseFloat(document.getElementById('dtt-prompted').value) || 0;
    const incorrect = parseFloat(document.getElementById('dtt-incorrect').value) || 0;
    const noResponse = parseFloat(document.getElementById('dtt-no-response').value) || 0;
    const mastery = parseFloat(masteryInput.value) || 80;

    const total = correct + prompted + incorrect + noResponse;
    if (total <= 0) { result.innerHTML = ''; return; }

    const pctIndependent = (correct / total) * 100;
    const pctWithPrompts = ((correct + prompted) / total) * 100;
    const pctError = ((incorrect + noResponse) / total) * 100;
    const masteryMet = pctIndependent >= mastery;

    result.innerHTML = `
      <div class="abr-result-card">
        <div class="abr-result-primary">
          <div class="abr-result-label">Independent correct</div>
          <div class="abr-result-value">${pctIndependent.toFixed(1)}<span class="abr-result-unit">%</span></div>
          <div class="dtt-mastery-badge ${masteryMet ? 'dtt-mastery-met' : 'dtt-mastery-not-met'}">
            ${masteryMet ? '✓ Mastery criterion met' : '✗ Below mastery criterion'}
          </div>
        </div>
        <div class="abr-result-secondary">
          <div class="abr-result-row"><span>Total trials</span><span class="abr-result-num">${total}</span></div>
          <div class="abr-result-row"><span>Correct (independent)</span><span class="abr-result-num">${correct} (${pctIndependent.toFixed(1)}%)</span></div>
          <div class="abr-result-row"><span>Prompted</span><span class="abr-result-num">${prompted} (${((prompted / total) * 100).toFixed(1)}%)</span></div>
          <div class="abr-result-row"><span>% with prompts counted</span><span class="abr-result-num">${pctWithPrompts.toFixed(1)}%</span></div>
          <div class="abr-result-row"><span>Incorrect + NR</span><span class="abr-result-num">${(incorrect + noResponse)} (${pctError.toFixed(1)}%)</span></div>
          <div class="abr-result-row"><span>Mastery criterion</span><span class="abr-result-num">${mastery}%</span></div>
        </div>
      </div>`;
  }

  let sessions = [{ c: '', p: '', i: '', n: '' }, { c: '', p: '', i: '', n: '' }, { c: '', p: '', i: '', n: '' }];

  function renderSessions() {
    const container = document.getElementById('dtt-sessions-container');
    container.innerHTML = sessions.map((s, idx) => `
      <div class="dtt-session-row">
        <span class="dtt-session-label">Session ${idx + 1}</span>
        <input type="text" inputmode="decimal" class="bmi-input dtt-session-input" data-idx="${idx}" data-field="c" value="${s.c}" placeholder="C" title="Correct" />
        <input type="text" inputmode="decimal" class="bmi-input dtt-session-input" data-idx="${idx}" data-field="p" value="${s.p}" placeholder="P" title="Prompted" />
        <input type="text" inputmode="decimal" class="bmi-input dtt-session-input" data-idx="${idx}" data-field="i" value="${s.i}" placeholder="I" title="Incorrect" />
        <input type="text" inputmode="decimal" class="bmi-input dtt-session-input" data-idx="${idx}" data-field="n" value="${s.n}" placeholder="NR" title="No response" />
        ${sessions.length > 2 ? `<button class="abr-remove-trial dtt-remove-session" data-idx="${idx}">×</button>` : '<span style="width:32px"></span>'}
      </div>`).join('');

    container.querySelectorAll('.dtt-session-input').forEach(input => {
      input.addEventListener('input', e => {
        const idx = parseInt(e.target.dataset.idx);
        const field = e.target.dataset.field;
        sessions[idx][field] = e.target.value;
        calculateMulti();
      });
    });

    container.querySelectorAll('.dtt-remove-session').forEach(btn => {
      btn.addEventListener('click', e => {
        const idx = parseInt(e.target.dataset.idx);
        sessions.splice(idx, 1);
        renderSessions();
        calculateMulti();
      });
    });

    calculateMulti();
  }

  document.getElementById('dtt-add-session').addEventListener('click', () => {
    if (sessions.length >= 10) return;
    sessions.push({ c: '', p: '', i: '', n: '' });
    renderSessions();
  });

  function calculateMulti() {
    const mastery = parseFloat(masteryInput.value) || 80;
    const consec = parseInt(document.getElementById('dtt-consecutive').value) || 3;

    const rows = sessions.map((s, idx) => {
      const c = parseFloat(s.c) || 0;
      const p = parseFloat(s.p) || 0;
      const i = parseFloat(s.i) || 0;
      const n = parseFloat(s.n) || 0;
      const total = c + p + i + n;
      if (total === 0) return { idx, total: 0, pct: null, met: false };
      const pct = (c / total) * 100;
      return { idx, total, pct, met: pct >= mastery };
    });

    const filled = rows.filter(r => r.total > 0);
    if (filled.length === 0) { result.innerHTML = ''; return; }

    let maxStreak = 0, currentStreak = 0, masteryAchieved = false, masteryAtSession = null;
    rows.forEach((r, pos) => {
      if (r.pct !== null && r.met) {
        currentStreak++;
        if (currentStreak > maxStreak) maxStreak = currentStreak;
        if (!masteryAchieved && currentStreak >= consec) {
          masteryAchieved = true;
          masteryAtSession = pos + 1;
        }
      } else {
        currentStreak = 0;
      }
    });

    const tableRows = rows.map(r => {
      if (r.pct === null) return `<tr><td>Session ${r.idx + 1}</td><td>-</td><td>-</td><td>-</td></tr>`;
      return `<tr class="${r.met ? 'dtt-row-met' : ''}">
        <td>Session ${r.idx + 1}</td>
        <td>${r.total}</td>
        <td>${r.pct.toFixed(1)}%</td>
        <td>${r.met ? '✓' : '✗'}</td>
      </tr>`;
    }).join('');

    result.innerHTML = `
      <div class="abr-result-card">
        <div class="abr-result-primary">
          <div class="abr-result-label">${masteryAchieved ? 'Mastery achieved' : 'Mastery not yet achieved'}</div>
          <div class="abr-result-value ${masteryAchieved ? '' : 'dtt-not-achieved'}">${masteryAchieved ? `Session ${masteryAtSession}` : `${maxStreak}/${consec}`}</div>
          <div class="abr-result-unit">${masteryAchieved ? 'mastery reached' : 'consecutive sessions'}</div>
        </div>
        <div class="abr-result-secondary" style="margin-top:0.75rem;">
          <div class="responsive-table" style="margin:0;width:100%;">
            <table style="width:100%;font-size:0.8rem;">
              <thead><tr><th>Session</th><th>Trials</th><th>% Correct</th><th>≥${mastery}%</th></tr></thead>
              <tbody>${tableRows}</tbody>
            </table>
          </div>
        </div>
      </div>`;
  }
});
