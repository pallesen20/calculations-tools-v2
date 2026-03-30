/* global XLSX */

const state = {
  original: { workbook: null, sheetIndex: 0, fileName: '' },
  changed:  { workbook: null, sheetIndex: 0, fileName: '' },
};

// --- Utils ---
function showToast(msg) {
  const t = document.querySelector('.diff-toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

function escapeHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function colLetter(i) {
  let s = ''; i++;
  while (i > 0) { i--; s = String.fromCharCode(65 + (i % 26)) + s; i = Math.floor(i / 26); }
  return s;
}

function getSheetData(side) {
  const wb = state[side].workbook;
  if (!wb) return [];
  const name = wb.SheetNames[state[side].sheetIndex];
  return XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, defval: '' });
}

function getMaxCols(data) {
  let max = 0;
  for (const row of data) if (row.length > max) max = row.length;
  return max;
}

// --- File handling ---
function triggerUpload(side) {
  document.getElementById('ce-file-' + side).click();
}

function handleFile(side, file) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const wb = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
      state[side].workbook   = wb;
      state[side].sheetIndex = 0;
      state[side].fileName   = file.name;
      renderPreview(side);
      showToast(file.name + ' loaded');
    } catch (err) {
      showToast('Error reading file: ' + err.message);
    }
  };
  reader.readAsArrayBuffer(file);
}

function renderPreview(side) {
  const zone = document.getElementById('ce-drop-' + side);
  const wb   = state[side].workbook;
  if (!wb) return;

  zone.classList.add('has-file');
  zone.onclick = null;

  const data = getSheetData(side);
  document.getElementById('ce-info-' + side).innerHTML =
    '<strong>' + escapeHtml(state[side].fileName) + '</strong> - ' +
    data.length + ' rows × ' + getMaxCols(data) + ' cols';

  // Sheet tabs
  const tabsEl = document.getElementById('ce-tabs-' + side);
  tabsEl.innerHTML = wb.SheetNames.length > 1
    ? wb.SheetNames.map((name, i) =>
        `<button class="ce-tab${i === state[side].sheetIndex ? ' active' : ''}"
          onclick="switchSheet('${side}',${i})">${escapeHtml(name)}</button>`
      ).join('')
    : '';

  renderTable(side, data);
}

function renderTable(side, data) {
  const cols    = getMaxCols(data);
  const maxRows = Math.min(data.length, 500);
  let html = '<thead><tr><th>#</th>';
  for (let c = 0; c < cols; c++) html += `<th>${colLetter(c)}</th>`;
  html += '</tr></thead><tbody>';
  for (let r = 0; r < maxRows; r++) {
    html += `<tr><td class="ce-row-num">${r + 1}</td>`;
    for (let c = 0; c < cols; c++) {
      const val = data[r]?.[c] ?? '';
      html += `<td title="${escapeHtml(String(val))}">${escapeHtml(String(val))}</td>`;
    }
    html += '</tr>';
  }
  if (data.length > 500)
    html += `<tr><td colspan="${cols + 1}" class="ce-more">… ${data.length - 500} more rows</td></tr>`;
  html += '</tbody>';
  document.getElementById('ce-table-' + side).innerHTML = html;
}

function switchSheet(side, index) {
  state[side].sheetIndex = index;
  renderPreview(side);
}

function clearFile(side) {
  state[side] = { workbook: null, sheetIndex: 0, fileName: '' };
  const zone = document.getElementById('ce-drop-' + side);
  zone.classList.remove('has-file');
  zone.onclick = () => triggerUpload(side);
  document.getElementById('ce-info-' + side).innerHTML  = '';
  document.getElementById('ce-tabs-' + side).innerHTML  = '';
  document.getElementById('ce-table-' + side).innerHTML = '';
  showToast('Cleared');
}

function downloadSheet(side) {
  const data = getSheetData(side);
  if (!data.length) { showToast('No data to download'); return; }
  const csv = data.map(row =>
    row.map(cell => {
      const s = String(cell);
      return /[,"\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    }).join(',')
  ).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  a.download = (state[side].fileName || side) + '.csv';
  a.click();
  URL.revokeObjectURL(a.href);
}

function copySheet(side) {
  const data = getSheetData(side);
  if (!data.length) { showToast('No data to copy'); return; }
  navigator.clipboard.writeText(data.map(r => r.join('\t')).join('\n'))
    .then(() => showToast('Copied to clipboard'));
}

function swapFiles() {
  const tmp      = { ...state.original };
  state.original = { ...state.changed };
  state.changed  = { ...tmp };
  state.original.workbook ? renderPreview('original') : clearFile('original');
  state.changed.workbook  ? renderPreview('changed')  : clearFile('changed');
  showToast('Files swapped');
}

function loadSample() {
  const orig = [
    ['Product','Price','Quantity','Total'],
    ['Widget A',19.99,100,1999.00],
    ['Widget B',24.50,75,1837.50],
    ['Widget C',12.00,200,2400.00],
    ['Widget D',8.99,150,1348.50],
    ['Widget E',35.00,50,1750.00],
  ];
  const chgd = [
    ['Product','Price','Quantity','Total'],
    ['Widget A',21.99,100,2199.00],
    ['Widget B',24.50,75,1837.50],
    ['Widget C',12.00,180,2160.00],
    ['Widget D',8.99,150,1348.50],
    ['Widget E',35.00,60,2100.00],
    ['Widget F',15.00,90,1350.00],
  ];

  const make = (aoa, name) => {
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'Sheet1');
    return wb;
  };

  state.original = { workbook: make(orig), sheetIndex: 0, fileName: 'inventory_v1.xlsx' };
  state.changed  = { workbook: make(chgd), sheetIndex: 0, fileName: 'inventory_v2.xlsx' };
  renderPreview('original');
  renderPreview('changed');
  showToast('Sample loaded');
}

// --- Compare ---
function compareFiles() {
  const origData   = getSheetData('original');
  const changedData = getSheetData('changed');
  if (!origData.length && !changedData.length) { showToast('Upload files first'); return; }

  const maxRows = Math.max(origData.length, changedData.length);
  const maxCols = Math.max(getMaxCols(origData), getMaxCols(changedData));
  let added = 0, removed = 0, changed = 0, unchanged = 0;
  const diffRows = [];

  for (let r = 0; r < maxRows; r++) {
    const oRow = origData[r]   ?? null;
    const cRow = changedData[r] ?? null;

    if (!oRow && cRow) {
      diffRows.push({ type: 'added',   row: r, cells: cRow,  maxCols }); added++;
    } else if (oRow && !cRow) {
      diffRows.push({ type: 'removed', row: r, cells: oRow,  maxCols }); removed++;
    } else {
      const diffs = [];
      for (let c = 0; c < maxCols; c++) {
        if (String(oRow[c] ?? '') !== String(cRow[c] ?? '')) diffs.push(c);
      }
      if (diffs.length) {
        diffRows.push({ type: 'changed', row: r, origCells: oRow, changedCells: cRow, diffs, maxCols }); changed++;
      } else {
        diffRows.push({ type: 'unchanged', row: r, cells: oRow, maxCols }); unchanged++;
      }
    }
  }

  document.getElementById('ce-stat-changed').textContent   = changed + ' changed';
  document.getElementById('ce-stat-added').textContent     = '+' + added + ' added';
  document.getElementById('ce-stat-removed').textContent   = '−' + removed + ' removed';
  document.getElementById('ce-stat-unchanged').textContent = unchanged + ' unchanged';

  renderDiffTable(diffRows, maxCols);
  const out = document.getElementById('diff-output');
  out.classList.add('visible');
  out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderDiffTable(diffRows, maxCols) {
  const container = document.getElementById('ce-diff-container');
  if (diffRows.every(d => d.type === 'unchanged')) {
    container.innerHTML = '<div class="diff-no-diff">✓ Spreadsheets are identical - no differences found</div>';
    return;
  }

  let html = '<table class="ce-diff-table"><thead><tr><th>Row</th><th>Status</th>';
  for (let c = 0; c < maxCols; c++) html += `<th>${colLetter(c)}</th>`;
  html += '</tr></thead><tbody>';

  for (const d of diffRows) {
    const rn = d.row + 1;
    if (d.type === 'unchanged') {
      html += `<tr><td class="ce-row-num">${rn}</td><td class="ce-status ce-status-unchanged">-</td>`;
      for (let c = 0; c < maxCols; c++)
        html += `<td>${escapeHtml(String(d.cells[c] ?? ''))}</td>`;
    } else if (d.type === 'added') {
      html += `<tr class="ce-row-added"><td class="ce-row-num">${rn}</td><td class="ce-status ce-status-added">Added</td>`;
      for (let c = 0; c < maxCols; c++)
        html += `<td class="ce-cell-added">${escapeHtml(String(d.cells[c] ?? ''))}</td>`;
    } else if (d.type === 'removed') {
      html += `<tr class="ce-row-removed"><td class="ce-row-num">${rn}</td><td class="ce-status ce-status-removed">Removed</td>`;
      for (let c = 0; c < maxCols; c++)
        html += `<td class="ce-cell-removed">${escapeHtml(String(d.cells[c] ?? ''))}</td>`;
    } else {
      html += `<tr><td class="ce-row-num">${rn}</td><td class="ce-status ce-status-changed">Changed</td>`;
      for (let c = 0; c < maxCols; c++) {
        const oVal = String(d.origCells[c] ?? '');
        const cVal = String(d.changedCells[c] ?? '');
        if (d.diffs.includes(c)) {
          html += `<td class="ce-cell-changed" title="Was: ${escapeHtml(oVal)}">${escapeHtml(cVal)} <span class="ce-was">(was ${escapeHtml(oVal)})</span></td>`;
        } else {
          html += `<td>${escapeHtml(cVal)}</td>`;
        }
      }
    }
    html += '</tr>';
  }
  html += '</tbody></table>';
  container.innerHTML = html;
}

function copyDiffResult() {
  const table = document.querySelector('#ce-diff-container .ce-diff-table');
  if (!table) { showToast('No diff to copy'); return; }
  const lines = [...table.querySelectorAll('tr')]
    .map(row => [...row.querySelectorAll('th,td')].map(c => c.textContent.trim()).join('\t'));
  navigator.clipboard.writeText(lines.join('\n')).then(() => showToast('Copied to clipboard'));
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  ['original', 'changed'].forEach(side => {
    const zone = document.getElementById('ce-drop-' + side);

    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
    zone.addEventListener('dragleave', ()  => zone.classList.remove('dragover'));
    zone.addEventListener('drop', e => {
      e.preventDefault(); zone.classList.remove('dragover');
      if (e.dataTransfer.files[0]) handleFile(side, e.dataTransfer.files[0]);
    });

    document.getElementById('ce-file-' + side).addEventListener('change', function() {
      if (this.files[0]) handleFile(side, this.files[0]);
      this.value = '';
    });
  });
});