var pdfState = {
  original: { ab: null, fileName: '', numPages: 0 },
  changed:  { ab: null, fileName: '', numPages: 0 },
};
var pdfJsLoaded = false;

function showToast(msg) {
  var t = document.querySelector('.diff-toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 2200);
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function loadPdfJs(cb) {
  if (pdfJsLoaded) { cb(); return; }
  var s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js';
  s.onload = function() {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
    pdfJsLoaded = true;
    cb();
  };
  s.onerror = function() { showToast('Failed to load PDF library'); };
  document.body.appendChild(s);
}

function extractPdfText(ab, onDone) {
  var lib = window.pdfjsLib;
  var copy = ab.slice(0);
  lib.getDocument({ data: new Uint8Array(copy) }).promise.then(function(pdf) {
    var pages = pdf.numPages;
    var parts = [];
    var done = 0;
    for (var i = 1; i <= pages; i++) {
      (function(pageNum) {
        pdf.getPage(pageNum).then(function(page) {
          page.getTextContent().then(function(content) {
            var text = content.items.map(function(it) { return it.str; }).join(' ');
            parts[pageNum - 1] = text;
            done++;
            if (done === pages) onDone(parts.join('\n'));
          });
        });
      })(i);
    }
    if (pages === 0) onDone('');
  }).catch(function(err) {
    showToast('Error reading PDF: ' + err.message);
    onDone('');
  });
}

function computeDiff(a, b) {
  var m = a.length, n = b.length;
  var dp = [];
  for (var i = 0; i <= m; i++) { dp[i] = []; for (var j = 0; j <= n; j++) dp[i][j] = 0; }
  for (var i = 1; i <= m; i++)
    for (var j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] + 1 : Math.max(dp[i-1][j], dp[i][j-1]);
  var result = [], i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i-1] === b[j-1]) { result.push({ type: 'unchanged', text: a[i-1] }); i--; j--; }
    else if (j > 0 && (i === 0 || dp[i][j-1] >= dp[i-1][j])) { result.push({ type: 'added', text: b[j-1] }); j--; }
    else { result.push({ type: 'removed', text: a[i-1] }); i--; }
  }
  return result.reverse();
}

function triggerPDFUpload(side) {
  document.getElementById('cp-file-' + side).click();
}

function handlePDFFile(side, file) {
  var reader = new FileReader();
  reader.onload = function(e) {
    pdfState[side].ab = e.target.result;
    pdfState[side].fileName = file.name;
    var drop = document.getElementById('cp-drop-' + side);
    drop.classList.add('has-file');
    document.getElementById('cp-info-' + side).textContent = file.name;
    showToast('Loaded: ' + file.name);
  };
  reader.readAsArrayBuffer(file);
}

function clearPDFFile(side) {
  pdfState[side].ab = null;
  pdfState[side].fileName = '';
  document.getElementById('cp-drop-' + side).classList.remove('has-file');
  document.getElementById('cp-info-' + side).textContent = '';
  document.getElementById('diff-output').classList.remove('visible');
}

function comparePDFs() {
  if (!pdfState.original.ab || !pdfState.changed.ab) {
    showToast('Please upload both PDF files first');
    return;
  }
  var btn = document.getElementById('cp-btn-compare');
  btn.textContent = 'Extracting text…';
  btn.disabled = true;

  loadPdfJs(function() {
    extractPdfText(pdfState.original.ab, function(textA) {
      extractPdfText(pdfState.changed.ab, function(textB) {
        btn.textContent = 'Find Differences';
        btn.disabled = false;

        var linesA = textA.split('\n');
        var linesB = textB.split('\n');
        var diff = computeDiff(linesA, linesB);

        var added = 0, removed = 0, unchanged = 0;
        diff.forEach(function(d) {
          if (d.type === 'added') added++;
          else if (d.type === 'removed') removed++;
          else unchanged++;
        });

        document.getElementById('ct-stat-added').textContent   = '+' + added + ' added';
        document.getElementById('ct-stat-removed').textContent = '−' + removed + ' removed';
        document.getElementById('ct-stat-unchanged').textContent = unchanged + ' unchanged';

        renderPDFDiff(diff);
        var out = document.getElementById('diff-output');
        out.classList.add('visible');
        out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });
  });
}

function renderPDFDiff(diff) {
  var html = '';
  for (var i = 0; i < diff.length; i++) {
    var d = diff[i];
    var prefix = d.type === 'added' ? '+' : d.type === 'removed' ? '−' : ' ';
    html += '<div class="ct-diff-line ' + d.type + '">' +
      '<span class="ct-line-num">' + (i + 1) + '</span>' +
      '<span class="ct-line-content">' + prefix + ' ' + escapeHtml(d.text) + '</span>' +
      '</div>';
  }
  if (!html) html = '<div class="diff-no-diff">✓ PDFs have identical text - no differences found</div>';
  document.getElementById('cp-diff-container').innerHTML = html;
}

function copyPDFDiff() {
  var el = document.getElementById('cp-diff-container');
  if (!el.innerHTML) return;
  var lines = Array.from(el.querySelectorAll('.ct-diff-line')).map(function(l) {
    return l.querySelector('.ct-line-content').textContent;
  });
  navigator.clipboard.writeText(lines.join('\n')).then(function() { showToast('Diff copied'); });
}

document.addEventListener('DOMContentLoaded', function() {
  ['original', 'changed'].forEach(function(side) {
    var fi = document.getElementById('cp-file-' + side);
    fi.addEventListener('change', function() {
      if (this.files[0]) handlePDFFile(side, this.files[0]);
      this.value = '';
    });
    var drop = document.getElementById('cp-drop-' + side);
    drop.addEventListener('click', function() { if (!drop.classList.contains('has-file')) triggerPDFUpload(side); });
    drop.addEventListener('dragover', function(e) { e.preventDefault(); drop.classList.add('dragover'); });
    drop.addEventListener('dragleave', function() { drop.classList.remove('dragover'); });
    drop.addEventListener('drop', function(e) {
      e.preventDefault();
      drop.classList.remove('dragover');
      var f = e.dataTransfer.files[0];
      if (f) handlePDFFile(side, f);
    });
  });
});
