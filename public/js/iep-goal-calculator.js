document.addEventListener('DOMContentLoaded', () => {
  let sessions = [{ c: '', t: '' }, { c: '', t: '' }, { c: '', t: '' }];

  const masteryInput = document.getElementById('igp-mastery');
  const consecInput = document.getElementById('igp-consecutive');
  const startInput = document.getElementById('igp-goal-start');
  const endInput = document.getElementById('igp-goal-end');
  const result = document.getElementById('igp-result');

  [masteryInput, consecInput].forEach(el => {
    if (el) el.addEventListener('input', calculate);
  });
  [startInput, endInput].forEach(el => {
    if (el) el.addEventListener('change', calculate);
  });

  function renderSessions() {
    const container = document.getElementById('igp-sessions-container');
    container.innerHTML = sessions.map((s, idx) => `
      <div class="dtt-session-row">
        <span class="dtt-session-label">Session ${idx + 1}</span>
        <input type="text" inputmode="decimal" class="bmi-input dtt-session-input" data-idx="${idx}" data-field="c" value="${s.c}" placeholder="Correct" />
        <input type="text" inputmode="decimal" class="bmi-input dtt-session-input" data-idx="${idx}" data-field="t" value="${s.t}" placeholder="Total" />
        ${sessions.length > 2 ? `<button class="abr-remove-trial igp-remove-session" data-idx="${idx}">×</button>` : '<span style="width:32px"></span>'}
      </div>`).join('');

    container.querySelectorAll('.dtt-session-input').forEach(input => {
      input.addEventListener('input', e => {
        const idx = parseInt(e.target.dataset.idx);
        const field = e.target.dataset.field;
        sessions[idx][field] = e.target.value;
        calculate();
      });
    });

    container.querySelectorAll('.igp-remove-session').forEach(btn => {
      btn.addEventListener('click', e => {
        const idx = parseInt(e.target.dataset.idx);
        sessions.splice(idx, 1);
        renderSessions();
      });
    });

    calculate();
  }

  document.getElementById('igp-add-session').addEventListener('click', () => {
    if (sessions.length >= 10) return;
    sessions.push({ c: '', t: '' });
    renderSessions();
  });

  function calculate() {
    const mastery = parseFloat(masteryInput.value) || 80;
    const consec = parseInt(consecInput.value) || 3;

    const rows = sessions.map((s, idx) => {
      const c = parseFloat(s.c);
      const t = parseFloat(s.t);
      if (!t || t <= 0 || isNaN(c)) return { idx, hasData: false };
      const pct = (c / t) * 100;
      return { idx, hasData: true, c, t, pct, met: pct >= mastery };
    });

    const dataRows = rows.filter(r => r.hasData);
    if (dataRows.length === 0) { result.innerHTML = ''; return; }

    let streak = 0;
    for (let i = dataRows.length - 1; i >= 0; i--) {
      if (dataRows[i].met) streak++;
      else break;
    }
    const masteryAchieved = streak >= consec;

    const avgPct = dataRows.reduce((sum, r) => sum + r.pct, 0) / dataRows.length;

    let timelineHtml = '';
    const start = startInput && startInput.value ? new Date(startInput.value + 'T00:00:00') : null;
    const end = endInput && endInput.value ? new Date(endInput.value + 'T00:00:00') : null;
    if (start && end && end > start) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const totalDays = (end - start) / 86400000;
      const elapsedDays = Math.max(0, (today - start) / 86400000);
      const pctPeriod = Math.min(100, (elapsedDays / totalDays) * 100);

      let projectedHtml = '';
      if (dataRows.length >= 2 && !masteryAchieved) {
        const firstPct = dataRows[0].pct;
        const lastPct = dataRows[dataRows.length - 1].pct;
        const ratePerSession = (lastPct - firstPct) / (dataRows.length - 1);
        if (ratePerSession > 0) {
          const sessionsLeft = Math.ceil((mastery - lastPct) / ratePerSession);
          const daysLeft = sessionsLeft * 7;
          const projDate = new Date(today.getTime() + daysLeft * 86400000);
          const dateStr = projDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          const onTrack = projDate <= end;
          const color = onTrack ? 'rgba(134,239,172,0.9)' : 'rgba(252,165,165,0.9)';
          projectedHtml = `<div class="abr-result-row"><span>Projected mastery</span><span class="abr-result-num" style="color:${color}">~${dateStr} ${onTrack ? '(on track)' : '(at risk)'}</span></div>`;
        }
      }

      timelineHtml = `
        <div class="abr-result-row"><span>Goal period elapsed</span><span class="abr-result-num">${pctPeriod.toFixed(0)}%</span></div>
        ${projectedHtml}`;
    }

    const tableRows = dataRows.map(r => `
      <tr>
        <td>Session ${r.idx + 1}</td>
        <td>${r.c} / ${r.t}</td>
        <td>${r.pct.toFixed(1)}%</td>
        <td class="${r.met ? 'igp-met-cell' : 'igp-not-met-cell'}">${r.met ? '✓' : '✗'}</td>
      </tr>`).join('');

    const statusClass = masteryAchieved ? 'dtt-mastery-met' : streak > 0 ? 'igp-status-progress' : 'dtt-mastery-not-met';
    const statusLabel = masteryAchieved
      ? `✓ Goal mastery achieved (${streak}/${consec} consecutive)`
      : streak > 0
        ? `In progress - ${streak}/${consec} consecutive sessions met`
        : `Not yet met - 0/${consec} consecutive sessions`;

    result.innerHTML = `
      <div class="abr-result-card">
        <div class="abr-result-primary">
          <div class="abr-result-label">Average accuracy</div>
          <div class="abr-result-value">${avgPct.toFixed(1)}<span class="abr-result-unit">%</span></div>
          <div class="dtt-mastery-badge ${statusClass}">${statusLabel}</div>
        </div>
        <div class="abr-result-secondary">
          <div class="abr-result-row"><span>Mastery criterion</span><span class="abr-result-num">${mastery}% / ${consec} consecutive</span></div>
          <div class="abr-result-row"><span>Sessions recorded</span><span class="abr-result-num">${dataRows.length}</span></div>
          <div class="abr-result-row"><span>Current streak</span><span class="abr-result-num">${streak} session${streak !== 1 ? 's' : ''}</span></div>
          ${timelineHtml}
        </div>
      </div>
      <div class="responsive-table" style="margin-top:0.75rem;">
        <table>
          <thead><tr><th>Session</th><th>Correct / Total</th><th>Accuracy %</th><th>Criterion met</th></tr></thead>
          <tbody>${tableRows}</tbody>
        </table>
      </div>`;
  }

  renderSessions();
});
