function parseCSVLine(line) {
  var fields = [], i = 0, field = '', inQuote = false;
  while (i < line.length) {
    var c = line[i];
    if (inQuote) {
      if (c === '"' && line[i + 1] === '"') { field += '"'; i += 2; }
      else if (c === '"') { inQuote = false; i++; }
      else { field += c; i++; }
    } else {
      if (c === '"') { inQuote = true; i++; }
      else if (c === ',') { fields.push(field); field = ''; i++; }
      else { field += c; i++; }
    }
  }
  fields.push(field);
  return fields;
}

function parseCSV(text) {
  var lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  var rows = [];
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].trim() !== '') rows.push(parseCSVLine(lines[i]));
  }
  return rows;
}

var csvState = {
  original: { data: null, fileName: '' },
  changed:  { data: null, fileName: '' },
};

function showToast(msg) {
  var t = document.querySelector('.diff-toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 2200);
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function colLetter(i) {
  var s = ''; i++;
  while (i > 0) { i--; s = String.fromCharCode(65 + (i % 26)) + s; i = Math.floor(i / 26); }
  return s;
}

function triggerUpload(side) {
  document.getElementById('cc-file-' + side).click();
}

function handleCSVFile(side, file) {
  var reader = new FileReader();
  reader.onload = function(e) {
    var data = parseCSV(e.target.result);
    csvState[side].data = data;
    csvState[side].fileName = file.name;
    updateCSVPreview(side);
    showToast('Loaded: ' + file.name);
  };
  reader.readAsText(file);
}

function updateCSVPreview(side) {
  var data = csvState[side].data;
  var drop = document.getElementById('cc-drop-' + side);
  var info = document.getElementById('cc-info-' + side);
  var tableEl = document.getElementById('cc-table-' + side);

  if (!data || !data.length) return;
  drop.classList.add('has-file');
  info.textContent = csvState[side].fileName + ' - ' + data.length + ' rows';

  var maxCols = 0;
  for (var r = 0; r < data.length; r++) if (data[r].length > maxCols) maxCols = data[r].length;

  var html = '<thead><tr><th></th>';
  for (var c = 0; c < maxCols; c++) html += '<th>' + colLetter(c) + '</th>';
  html += '</tr></thead><tbody>';
  var limit = Math.min(data.length, 50);
  for (var r = 0; r < limit; r++) {
    html += '<tr><td class="ce-row-num">' + (r + 1) + '</td>';
    for (var c = 0; c < maxCols; c++) {
      html += '<td>' + escapeHtml(data[r][c] || '') + '</td>';
    }
    html += '</tr>';
  }
  if (data.length > 50) html += '<tr><td colspan="' + (maxCols + 1) + '" class="ce-more">… ' + (data.length - 50) + ' more rows</td></tr>';
  html += '</tbody>';
  tableEl.innerHTML = html;
}

function clearCSVFile(side) {
  csvState[side].data = null;
  csvState[side].fileName = '';
  var drop = document.getElementById('cc-drop-' + side);
  drop.classList.remove('has-file');
  document.getElementById('cc-info-' + side).textContent = '';
  document.getElementById('cc-table-' + side).innerHTML = '';
  document.getElementById('diff-output').classList.remove('visible');
}

function swapCSVFiles() {
  var tmp = csvState.original;
  csvState.original = csvState.changed;
  csvState.changed = tmp;
  updateCSVPreview('original');
  updateCSVPreview('changed');
  showToast('Files swapped');
}

function loadCSVSample() {
  var sampleA = 'Name,Age,Department,Salary\nAlice,30,Engineering,85000\nBob,25,Marketing,65000\nCarol,35,Engineering,95000\nDave,28,HR,60000';
  var sampleB = 'Name,Age,Department,Salary\nAlice,31,Engineering,90000\nBob,25,Marketing,65000\nCarol,35,Product,95000\nDave,28,HR,62000\nEve,27,Engineering,80000';
  csvState.original.data = parseCSV(sampleA);
  csvState.original.fileName = 'original.csv';
  csvState.changed.data = parseCSV(sampleB);
  csvState.changed.fileName = 'changed.csv';
  updateCSVPreview('original');
  updateCSVPreview('changed');
  showToast('Sample loaded');
}

function compareCSVFiles() {
  var a = csvState.original.data;
  var b = csvState.changed.data;
  if (!a || !b) { showToast('Please upload both CSV files first'); return; }

  var maxRows = Math.max(a.length, b.length);
  var maxCols = 0;
  for (var i = 0; i < a.length; i++) if (a[i].length > maxCols) maxCols = a[i].length;
  for (var i = 0; i < b.length; i++) if (b[i].length > maxCols) maxCols = b[i].length;

  var changed = 0, added = 0, removed = 0, unchanged = 0;
  var rows = [];

  for (var r = 0; r < maxRows; r++) {
    var rowA = a[r] || null;
    var rowB = b[r] || null;

    if (!rowA) { added++; rows.push({ status: 'added', a: null, b: rowB }); continue; }
    if (!rowB) { removed++; rows.push({ status: 'removed', a: rowA, b: null }); continue; }

    var cells = [];
    var hasChange = false;
    for (var c = 0; c < maxCols; c++) {
      var va = rowA[c] !== undefined ? String(rowA[c]) : '';
      var vb = rowB[c] !== undefined ? String(rowB[c]) : '';
      if (va !== vb) { hasChange = true; cells.push({ status: 'changed', old: va, new: vb }); }
      else cells.push({ status: 'same', val: va });
    }

    if (hasChange) { changed++; rows.push({ status: 'changed', cells: cells }); }
    else { unchanged++; rows.push({ status: 'unchanged', cells: cells }); }
  }

  document.getElementById('ce-stat-changed').textContent = changed + ' changed';
  document.getElementById('ce-stat-added').textContent = '+' + added + ' added';
  document.getElementById('ce-stat-removed').textContent = '-' + removed + ' removed';
  document.getElementById('ce-stat-unchanged').textContent = unchanged + ' unchanged';

  var html = '<table class="ce-diff-table"><thead><tr><th>Row</th><th>Status</th>';
  for (var c = 0; c < maxCols; c++) html += '<th>' + colLetter(c) + '</th>';
  html += '</tr></thead><tbody>';

  for (var r = 0; r < rows.length; r++) {
    var row = rows[r];
    var tr = '';
    if (row.status === 'added') {
      tr = 'ce-row-added';
      html += '<tr class="' + tr + '"><td class="ce-row-num">' + (r + 1) + '</td>';
      html += '<td class="ce-status ce-status-added">added</td>';
      for (var c = 0; c < maxCols; c++) html += '<td class="ce-cell-added">' + escapeHtml(row.b[c] || '') + '</td>';
      html += '</tr>';
    } else if (row.status === 'removed') {
      tr = 'ce-row-removed';
      html += '<tr class="' + tr + '"><td class="ce-row-num">' + (r + 1) + '</td>';
      html += '<td class="ce-status ce-status-removed">removed</td>';
      for (var c = 0; c < maxCols; c++) html += '<td class="ce-cell-removed">' + escapeHtml(row.a[c] || '') + '</td>';
      html += '</tr>';
    } else {
      var statusClass = row.status === 'changed' ? 'ce-status-changed' : 'ce-status-unchanged';
      html += '<tr><td class="ce-row-num">' + (r + 1) + '</td>';
      html += '<td class="ce-status ' + statusClass + '">' + row.status + '</td>';
      for (var c = 0; c < row.cells.length; c++) {
        var cell = row.cells[c];
        if (cell.status === 'changed') {
          html += '<td class="ce-cell-changed">' + escapeHtml(cell.new) + ' <span class="ce-was">(' + escapeHtml(cell.old) + ')</span></td>';
        } else {
          html += '<td>' + escapeHtml(cell.val) + '</td>';
        }
      }
      html += '</tr>';
    }
  }
  html += '</tbody></table>';

  document.getElementById('cc-diff-container').innerHTML = html;
  var out = document.getElementById('diff-output');
  out.classList.add('visible');
  out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function copyCSVDiff() {
  var el = document.getElementById('cc-diff-container');
  if (!el.innerHTML) return;
  var rows = el.querySelectorAll('tr');
  var lines = [];
  rows.forEach(function(tr) {
    var cells = tr.querySelectorAll('th, td');
    lines.push(Array.from(cells).map(function(c) { return c.textContent.trim(); }).join('\t'));
  });
  navigator.clipboard.writeText(lines.join('\n')).then(function() { showToast('Diff copied'); });
}

document.addEventListener('DOMContentLoaded', function() {
  ['original', 'changed'].forEach(function(side) {
    var fileInput = document.getElementById('cc-file-' + side);
    fileInput.addEventListener('change', function() {
      if (this.files[0]) handleCSVFile(side, this.files[0]);
      this.value = '';
    });

    var drop = document.getElementById('cc-drop-' + side);
    drop.addEventListener('click', function(e) {
      if (!drop.classList.contains('has-file')) triggerUpload(side);
    });
    drop.addEventListener('dragover', function(e) { e.preventDefault(); drop.classList.add('dragover'); });
    drop.addEventListener('dragleave', function() { drop.classList.remove('dragover'); });
    drop.addEventListener('drop', function(e) {
      e.preventDefault();
      drop.classList.remove('dragover');
      var f = e.dataTransfer.files[0];
      if (f) handleCSVFile(side, f);
    });
  });
});
