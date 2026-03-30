var docState = {
  original: { ab: null, fileName: '' },
  changed:  { ab: null, fileName: '' },
};
var mammothLoaded = false;

function showToast(msg) {
  var t = document.querySelector('.diff-toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 2200);
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function loadMammoth(cb) {
  if (mammothLoaded) { cb(); return; }
  var s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js';
  s.onload = function() { mammothLoaded = true; cb(); };
  s.onerror = function() { showToast('Failed to load document library'); };
  document.body.appendChild(s);
}

function extractDocText(ab, onDone) {
  mammoth.extractRawText({ arrayBuffer: ab }).then(function(result) {
    onDone(result.value);
  }).catch(function(err) {
    showToast('Error reading document: ' + err.message);
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

function triggerDocUpload(side) {
  document.getElementById('cd-file-' + side).click();
}

function handleDocFile(side, file) {
  var reader = new FileReader();
  reader.onload = function(e) {
    docState[side].ab = e.target.result;
    docState[side].fileName = file.name;
    document.getElementById('cd-drop-' + side).classList.add('has-file');
    document.getElementById('cd-info-' + side).textContent = file.name;
    showToast('Loaded: ' + file.name);
  };
  reader.readAsArrayBuffer(file);
}

function clearDocFile(side) {
  docState[side].ab = null;
  docState[side].fileName = '';
  document.getElementById('cd-drop-' + side).classList.remove('has-file');
  document.getElementById('cd-info-' + side).textContent = '';
  document.getElementById('diff-output').classList.remove('visible');
}

function compareDocuments() {
  if (!docState.original.ab || !docState.changed.ab) {
    showToast('Please upload both document files first');
    return;
  }
  var btn = document.getElementById('cd-btn-compare');
  btn.textContent = 'Extracting text…';
  btn.disabled = true;

  loadMammoth(function() {
    extractDocText(docState.original.ab, function(textA) {
      extractDocText(docState.changed.ab, function(textB) {
        btn.textContent = 'Find Differences';
        btn.disabled = false;

        var linesA = textA.split('\n').filter(function(l) { return l.trim(); });
        var linesB = textB.split('\n').filter(function(l) { return l.trim(); });
        var diff = computeDiff(linesA, linesB);

        var added = 0, removed = 0, unchanged = 0;
        diff.forEach(function(d) {
          if (d.type === 'added') added++;
          else if (d.type === 'removed') removed++;
          else unchanged++;
        });

        document.getElementById('ct-stat-added').textContent    = '+' + added + ' added';
        document.getElementById('ct-stat-removed').textContent  = '−' + removed + ' removed';
        document.getElementById('ct-stat-unchanged').textContent = unchanged + ' unchanged';

        renderDocDiff(diff);
        var out = document.getElementById('diff-output');
        out.classList.add('visible');
        out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });
  });
}

function renderDocDiff(diff) {
  var html = '';
  for (var i = 0; i < diff.length; i++) {
    var d = diff[i];
    var prefix = d.type === 'added' ? '+' : d.type === 'removed' ? '−' : ' ';
    html += '<div class="ct-diff-line ' + d.type + '">' +
      '<span class="ct-line-num">' + (i + 1) + '</span>' +
      '<span class="ct-line-content">' + prefix + ' ' + escapeHtml(d.text) + '</span>' +
      '</div>';
  }
  if (!html) html = '<div class="diff-no-diff">✓ Documents have identical text - no differences found</div>';
  document.getElementById('cd-diff-container').innerHTML = html;
}

function copyDocDiff() {
  var el = document.getElementById('cd-diff-container');
  if (!el.innerHTML) return;
  var lines = Array.from(el.querySelectorAll('.ct-diff-line')).map(function(l) {
    return l.querySelector('.ct-line-content').textContent;
  });
  navigator.clipboard.writeText(lines.join('\n')).then(function() { showToast('Diff copied'); });
}

document.addEventListener('DOMContentLoaded', function() {
  ['original', 'changed'].forEach(function(side) {
    var fi = document.getElementById('cd-file-' + side);
    fi.addEventListener('change', function() {
      if (this.files[0]) handleDocFile(side, this.files[0]);
      this.value = '';
    });
    var drop = document.getElementById('cd-drop-' + side);
    drop.addEventListener('click', function() { if (!drop.classList.contains('has-file')) triggerDocUpload(side); });
    drop.addEventListener('dragover', function(e) { e.preventDefault(); drop.classList.add('dragover'); });
    drop.addEventListener('dragleave', function() { drop.classList.remove('dragover'); });
    drop.addEventListener('drop', function(e) {
      e.preventDefault();
      drop.classList.remove('dragover');
      var f = e.dataTransfer.files[0];
      if (f) handleDocFile(side, f);
    });
  });
});
