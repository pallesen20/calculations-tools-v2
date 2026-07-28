document.addEventListener('DOMContentLoaded', () => {
  const fmt2 = n => parseFloat(n.toFixed(2)).toString();
  const fmt4 = n => parseFloat(n.toFixed(4)).toString();
  const toNum = s => parseFloat(s.replace(',', '.'));

  // ── Single goal mode ──────────────────────────────────────────────────────
  const currentEl = document.getElementById('ptg-current');
  const goalEl    = document.getElementById('ptg-goal');
  const resultEl  = document.getElementById('ptg-result');

  [currentEl, goalEl].forEach(el => el.addEventListener('input', calcSingle));

  function calcSingle() {
    const current = toNum(currentEl.value);
    const goal    = toNum(goalEl.value);
    if (isNaN(current) || isNaN(goal) || goal === 0) { resultEl.classList.add('hidden'); return; }

    const pct       = (current / goal) * 100;
    const remaining = goal - current;

    document.getElementById('ptg-pct').textContent = fmt4(pct) + '%';
    document.getElementById('ptg-remaining').textContent =
      remaining > 0   ? fmt4(remaining) + ' remaining' :
      remaining === 0 ? 'Goal reached' :
                        fmt4(Math.abs(remaining)) + ' over goal';
    document.getElementById('ptg-step1').textContent =
      fmt4(current) + ' ÷ ' + fmt4(goal) + ' = ' + fmt4(current / goal);
    document.getElementById('ptg-step2').textContent =
      fmt4(current / goal) + ' × 100 = ' + fmt4(pct) + '%';
    resultEl.classList.remove('hidden');
  }

  // ── Mode tabs ─────────────────────────────────────────────────────────────
  const singleMode = document.getElementById('ptg-single-mode');
  const multiMode  = document.getElementById('ptg-multi-mode');

  document.getElementById('ptg-tab-single').addEventListener('click', function () {
    this.classList.add('active');
    document.getElementById('ptg-tab-multi').classList.remove('active');
    singleMode.classList.remove('hidden');
    multiMode.classList.add('hidden');
  });

  document.getElementById('ptg-tab-multi').addEventListener('click', function () {
    this.classList.add('active');
    document.getElementById('ptg-tab-single').classList.remove('active');
    multiMode.classList.remove('hidden');
    singleMode.classList.add('hidden');
    if (!rowsContainer.hasChildNodes()) { addRow(); addRow(); }
  });

  // ── Multiple goals mode ───────────────────────────────────────────────────
  const rowsContainer = document.getElementById('ptg-rows');

  document.getElementById('ptg-add-row').addEventListener('click', addRow);

  function addRow() {
    const row = document.createElement('div');
    row.className = 'ptg-row';
    row.innerHTML =
      '<input type="text" class="bmi-input ptg-row-name" placeholder="Name (optional)">' +
      '<input type="text" inputmode="decimal" class="bmi-input ptg-row-current" placeholder="Current">' +
      '<input type="text" inputmode="decimal" class="bmi-input ptg-row-goal" placeholder="Goal">' +
      '<input type="text" inputmode="decimal" class="bmi-input ptg-row-weight" placeholder="Weight %">' +
      '<span class="ptg-row-pct ptg-pct-empty">—</span>' +
      '<button class="ptg-row-remove" aria-label="Remove">×</button>';

    row.querySelector('.ptg-row-remove').addEventListener('click', () => { row.remove(); calcMulti(); });
    row.querySelectorAll('.ptg-row-current, .ptg-row-goal, .ptg-row-weight').forEach(
      el => el.addEventListener('input', calcMulti)
    );
    rowsContainer.appendChild(row);
    calcMulti();
  }

  function calcMulti() {
    const multiResult = document.getElementById('ptg-multi-result');
    const rows = rowsContainer.querySelectorAll('.ptg-row');
    if (!rows.length) { multiResult.classList.add('hidden'); return; }

    let validCount = 0, sumPct = 0, weightedSum = 0, totalWeight = 0;

    rows.forEach(row => {
      const c = toNum(row.querySelector('.ptg-row-current').value);
      const g = toNum(row.querySelector('.ptg-row-goal').value);
      const w = toNum(row.querySelector('.ptg-row-weight').value);
      const pctEl = row.querySelector('.ptg-row-pct');

      if (!isNaN(c) && !isNaN(g) && g !== 0) {
        const pct = (c / g) * 100;
        pctEl.textContent = fmt2(pct) + '%';
        pctEl.classList.remove('ptg-pct-empty');
        sumPct += pct;
        validCount++;
        if (!isNaN(w) && w > 0) { weightedSum += pct * w; totalWeight += w; }
      } else {
        pctEl.textContent = '—';
        pctEl.classList.add('ptg-pct-empty');
      }
    });

    if (!validCount) { multiResult.classList.add('hidden'); return; }

    document.getElementById('ptg-simple-avg').textContent = fmt2(sumPct / validCount) + '%';

    const weightedRow = document.getElementById('ptg-weighted-row');
    if (totalWeight > 0) {
      document.getElementById('ptg-weighted-avg').textContent = fmt2(weightedSum / totalWeight) + '%';
      document.getElementById('ptg-weight-note').textContent =
        Math.abs(totalWeight - 100) < 0.01
          ? 'Weights sum to 100%'
          : 'Weights sum to ' + fmt2(totalWeight) + '% (normalised)';
      weightedRow.classList.remove('hidden');
    } else {
      weightedRow.classList.add('hidden');
    }

    multiResult.classList.remove('hidden');
  }
});
