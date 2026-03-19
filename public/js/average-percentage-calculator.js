document.addEventListener('DOMContentLoaded', () => {
  const rowsEl = document.getElementById('pav-rows');
  const addBtn  = document.getElementById('pav-add');

  addBtn.addEventListener('click', () => { addRow(); });

  function addRow(value) {
    const row = document.createElement('div');
    row.className = 'pav-row';

    const wrap = document.createElement('div');
    wrap.className = 'bmi-input-wrap';

    const input = document.createElement('input');
    input.type        = 'number';
    input.className   = 'bmi-input pav-input';
    input.step        = 'any';
    input.placeholder = 'e.g. 85';
    if (value !== undefined) input.value = value;
    input.addEventListener('input', calculate);

    const unit = document.createElement('span');
    unit.className   = 'bmi-unit-tag';
    unit.textContent = '%';

    wrap.appendChild(input);
    wrap.appendChild(unit);

    const removeBtn = document.createElement('button');
    removeBtn.type        = 'button';
    removeBtn.className   = 'pav-remove';
    removeBtn.setAttribute('aria-label', 'Remove');
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', () => {
      row.remove();
      syncRemoveButtons();
      calculate();
    });

    row.appendChild(wrap);
    row.appendChild(removeBtn);
    rowsEl.appendChild(row);
    syncRemoveButtons();
    input.focus();
  }

  function syncRemoveButtons() {
    const removes = rowsEl.querySelectorAll('.pav-remove');
    removes.forEach(btn => { btn.disabled = removes.length <= 2; });
  }

  function calculate() {
    const vals = Array.from(rowsEl.querySelectorAll('.pav-input'))
      .map(i => parseFloat(i.value.replace(",",".")))
      .filter(v => !isNaN(v));

    if (vals.length < 2) {
      document.getElementById('pav-result').classList.add('hidden');
      return;
    }

    const sum = vals.reduce((a, b) => a + b, 0);
    const avg = sum / vals.length;
    const fmt = n => parseFloat(n.toFixed(4)).toString();

    document.getElementById('pav-avg').textContent   = fmt(avg) + '%';
    document.getElementById('pav-count').textContent = vals.length;
    document.getElementById('pav-sum').textContent   = fmt(sum) + '%';

    const sumStr = vals.length <= 5
      ? vals.map(fmt).join(' + ')
      : vals.slice(0, 3).map(fmt).join(' + ') + ' + \u2026 + ' + fmt(vals[vals.length - 1]);

    document.getElementById('pav-step1').textContent = `${sumStr} = ${fmt(sum)}`;
    document.getElementById('pav-step2').textContent = `${fmt(sum)} ÷ ${vals.length} = ${fmt(avg)}%`;

    document.getElementById('pav-result').classList.remove('hidden');
  }

  addRow();
  addRow();
  addRow();
  syncRemoveButtons();
});
