document.addEventListener('DOMContentLoaded', () => {
  const rowsContainer = document.getElementById('wa-rows');
  const addBtn = document.getElementById('wa-add');
  const resultDiv = document.getElementById('wa-result');

  let rowIndex = 0;

  function createRow() {
    rowIndex++;
    const idx = rowIndex;
    const canRemove = idx > 2;
    const row = document.createElement('div');
    row.className = 'wa-row';
    row.innerHTML = `
      <div class="wa-row-group">
        <div class="bmi-field wa-field-pct">
          <label class="bmi-label" for="wa-pct-${idx}">Percentage</label>
          <div class="bmi-input-wrap">
            <input type="text" inputmode="decimal" id="wa-pct-${idx}" class="bmi-input wa-pct" placeholder="e.g. 60" />
            <span class="bmi-unit-tag">%</span>
          </div>
        </div>
        <div class="bmi-field wa-field-wt">
          <label class="bmi-label" for="wa-wt-${idx}">Weight</label>
          <div class="bmi-input-wrap">
            <input type="text" inputmode="decimal" id="wa-wt-${idx}" class="bmi-input wa-wt" placeholder="e.g. 200" />
          </div>
        </div>
        <div class="wa-row-action">${canRemove ? '<button type="button" class="wa-remove-btn" aria-label="Remove row">✕</button>' : ''}</div>
      </div>
    `;
    rowsContainer.appendChild(row);
    if (canRemove) {
      row.querySelector('.wa-remove-btn').addEventListener('click', () => {
        row.remove();
        calculate();
      });
    }
    row.querySelectorAll('.bmi-input').forEach(inp => inp.addEventListener('input', calculate));
  }

  function calculate() {
    const pctInputs = rowsContainer.querySelectorAll('.wa-pct');
    const wtInputs = rowsContainer.querySelectorAll('.wa-wt');
    let numerator = 0;
    let denominator = 0;
    const parts = [];

    pctInputs.forEach((pctInput, i) => {
      const p = parseFloat(pctInput.value);
      const w = parseFloat(wtInputs[i].value);
      if (!isNaN(p) && !isNaN(w) && w > 0) {
        numerator += p * w;
        denominator += w;
        parts.push({ p, w, product: p * w });
      }
    });

    if (parts.length < 1 || denominator === 0) {
      resultDiv.classList.add('hidden');
      return;
    }

    const result = numerator / denominator;
    const fmt = n => Number.isInteger(n) ? n.toString() : parseFloat(n.toFixed(4)).toString();

    document.getElementById('wa-result-val').textContent = result.toFixed(2) + '%';
    document.getElementById('wa-count').textContent = parts.length.toString();
    document.getElementById('wa-total-weight').textContent = fmt(denominator);

    const numStr = parts.map(p => `(${p.p}% \xd7 ${p.w})`).join(' + ');
    document.getElementById('wa-step1').textContent = `${numStr} = ${fmt(numerator)}`;
    document.getElementById('wa-step2').textContent = `${parts.map(p => p.w).join(' + ')} = ${fmt(denominator)}`;
    document.getElementById('wa-step3').textContent = `${fmt(numerator)} \xf7 ${fmt(denominator)} = ${result.toFixed(2)}%`;

    resultDiv.classList.remove('hidden');
  }

  addBtn.addEventListener('click', createRow);
  createRow();
  createRow();
});
