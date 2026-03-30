var LANG_CONFIG = {
  any:        { accept: '.txt,.js,.ts,.jsx,.tsx,.py,.html,.css,.json,.xml,.md,.php,.rb,.go,.java,.c,.cpp,.h,.sql,.yaml,.yml,.sh,.rs', label: 'Code' },
  python:     { accept: '.py,.pyw,.pyx,.ipynb', label: 'Python' },
  javascript: { accept: '.js,.ts,.jsx,.tsx,.mjs,.cjs', label: 'JavaScript' },
  css:        { accept: '.css,.scss,.sass,.less', label: 'CSS' },
  html:       { accept: '.html,.htm,.xhtml,.svg', label: 'HTML' },
};

var CODE_SAMPLES = {
  any: [
    'function greet(name) {\n    console.log("Hello, " + name);\n    return true;\n}\n\nconst users = ["Alice", "Bob", "Charlie"];\nusers.forEach(user => {\n    greet(user);\n});',
    'function greet(name, greeting = "Hello") {\n    console.log(greeting + ", " + name + "!");\n    return true;\n}\n\nconst users = ["Alice", "Bob", "Charlie", "Diana"];\nusers.forEach(user => {\n    greet(user, "Hi");\n});\n\nconsole.log("Done!");'
  ],
  python: [
    'def calculate_average(numbers):\n    total = sum(numbers)\n    return total / len(numbers)\n\ndata = [1, 2, 3, 4, 5]\nprint(calculate_average(data))',
    'def calculate_average(numbers):\n    if not numbers:\n        return 0\n    total = sum(numbers)\n    return round(total / len(numbers), 2)\n\ndata = [1, 2, 3, 4, 5, 6]\nprint(f"Average: {calculate_average(data)}")'
  ],
  javascript: [
    'function greet(name) {\n    console.log("Hello, " + name);\n    return true;\n}\n\nconst users = ["Alice", "Bob", "Charlie"];\nusers.forEach(user => {\n    greet(user);\n});',
    'function greet(name, greeting = "Hello") {\n    console.log(greeting + ", " + name + "!");\n    return true;\n}\n\nconst users = ["Alice", "Bob", "Charlie", "Diana"];\nusers.forEach(user => {\n    greet(user, "Hi");\n});\n\nconsole.log("Done!");'
  ],
  css: [
    '.button {\n    background: #3b82f6;\n    color: white;\n    padding: 8px 16px;\n    border: none;\n    cursor: pointer;\n}',
    '.button {\n    background: #3b82f6;\n    color: white;\n    padding: 10px 20px;\n    border: none;\n    border-radius: 6px;\n    cursor: pointer;\n    font-size: 1rem;\n    transition: background 0.2s;\n}\n\n.button:hover {\n    background: #2563eb;\n}'
  ],
  html: [
    '<div class="card">\n    <h2>Title</h2>\n    <p>Some text here.</p>\n    <a href="/link">Click here</a>\n</div>',
    '<div class="card">\n    <h2>Updated Title</h2>\n    <p>Updated text with more details.</p>\n    <p>Additional paragraph added.</p>\n    <a href="/new-link" class="btn">Click here</a>\n</div>'
  ],
};

function showToast(msg) {
  var t = document.querySelector('.diff-toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 2200);
}

function updateStats(id) {
  var val = document.getElementById(id).value;
  var lines = val ? val.split('\n').length : 0;
  document.getElementById(id + '-lines').textContent = 'Lines: ' + lines;
  document.getElementById(id + '-chars').textContent = 'Characters: ' + val.length;
}

function updateLineNumbers(id) {
  var ta = document.getElementById(id);
  var count = ta.value === '' ? 1 : ta.value.split('\n').length;
  var gutter = document.getElementById(id + '-gutter');
  var html = '';
  for (var i = 1; i <= count; i++) html += '<div>' + i + '</div>';
  gutter.innerHTML = html;
}

function updateActiveLine(id) {
  var ta = document.getElementById(id);
  var lineIndex = ta.value.substring(0, ta.selectionStart).split('\n').length - 1;
  var lineHeight = parseFloat(getComputedStyle(ta).lineHeight);
  var padTop = parseFloat(getComputedStyle(ta).paddingTop);
  var hl = document.getElementById(id + '-hl');
  hl.style.top = (padTop + lineIndex * lineHeight - ta.scrollTop) + 'px';
  hl.style.height = lineHeight + 'px';
  var divs = document.getElementById(id + '-gutter').children;
  for (var i = 0; i < divs.length; i++) divs[i].classList.toggle('active-ln', i === lineIndex);
}

function syncScroll(id) {
  document.getElementById(id + '-gutter').scrollTop = document.getElementById(id).scrollTop;
  updateActiveLine(id);
}

function updateEditor(id) {
  updateStats(id);
  updateLineNumbers(id);
  updateActiveLine(id);
}

var uploadTarget = null;

function uploadFile(id) {
  uploadTarget = id;
  document.getElementById('ct-file-input').click();
}

function downloadText(id) {
  var text = document.getElementById(id).value;
  if (!text) { showToast('Nothing to download'); return; }
  var a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
  a.download = id + '-code.txt';
  a.click();
  URL.revokeObjectURL(a.href);
}

function copyText(id) {
  var text = document.getElementById(id).value;
  if (!text) { showToast('Nothing to copy'); return; }
  navigator.clipboard.writeText(text).then(function() { showToast('Copied to clipboard'); });
}

function clearText(id) {
  document.getElementById(id).value = '';
  updateEditor(id);
}

function swapTexts() {
  var o = document.getElementById('ct-original');
  var c = document.getElementById('ct-changed');
  var tmp = o.value; o.value = c.value; c.value = tmp;
  updateEditor('ct-original');
  updateEditor('ct-changed');
  showToast('Texts swapped');
}

function loadSample() {
  var langEl = document.getElementById('cc-lang');
  var lang = langEl ? langEl.value : 'any';
  var samples = CODE_SAMPLES[lang] || CODE_SAMPLES.any;
  document.getElementById('ct-original').value = samples[0];
  document.getElementById('ct-changed').value = samples[1];
  updateEditor('ct-original');
  updateEditor('ct-changed');
  showToast('Sample loaded');
}

function updateLanguage() {
  var langEl = document.getElementById('cc-lang');
  if (!langEl) return;
  var lang = langEl.value;
  var config = LANG_CONFIG[lang] || LANG_CONFIG.any;
  var fi = document.getElementById('ct-file-input');
  if (fi) fi.accept = config.accept;
}

function computeDiff(a, b) {
  var m = a.length, n = b.length;
  var dp = Array.from({ length: m + 1 }, function() { return new Array(n + 1).fill(0); });
  for (var i = 1; i <= m; i++)
    for (var j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] + 1 : Math.max(dp[i-1][j], dp[i][j-1]);
  var result = [], i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i-1] === b[j-1]) { result.push({ type: 'unchanged', lineOld: i, lineNew: j, text: a[i-1] }); i--; j--; }
    else if (j > 0 && (i === 0 || dp[i][j-1] >= dp[i-1][j])) { result.push({ type: 'added', lineNew: j, text: b[j-1] }); j--; }
    else { result.push({ type: 'removed', lineOld: i, text: a[i-1] }); i--; }
  }
  return result.reverse();
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

var lastDiff = [];
var currentView = 'sbs';

function findDifferences() {
  var a = document.getElementById('ct-original').value.split('\n');
  var b = document.getElementById('ct-changed').value.split('\n');
  lastDiff = computeDiff(a, b);
  var added = lastDiff.filter(function(d) { return d.type === 'added'; }).length;
  var removed = lastDiff.filter(function(d) { return d.type === 'removed'; }).length;
  var unchanged = lastDiff.filter(function(d) { return d.type === 'unchanged'; }).length;
  document.getElementById('ct-stat-added').textContent   = '+' + added + ' added';
  document.getElementById('ct-stat-removed').textContent = '−' + removed + ' removed';
  document.getElementById('ct-stat-unchanged').textContent = unchanged + ' unchanged';
  renderDiff();
  var out = document.getElementById('diff-output');
  out.classList.add('visible');
  out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function setView(view) {
  currentView = view;
  document.getElementById('ct-btn-unified').classList.toggle('active', view === 'unified');
  document.getElementById('ct-btn-sbs').classList.toggle('active', view === 'sbs');
  renderDiff();
}

function renderDiff() {
  var container = document.getElementById('ct-diff-container');
  if (!lastDiff.length || lastDiff.every(function(d) { return d.type === 'unchanged'; })) {
    container.innerHTML = '<div class="diff-no-diff">✓ Code is identical - no differences found</div>';
    return;
  }
  currentView === 'unified' ? renderUnified(container) : renderSideBySide(container);
}

function renderUnified(container) {
  var html = '';
  for (var i = 0; i < lastDiff.length; i++) {
    var d = lastDiff[i];
    var prefix = d.type === 'added' ? '+' : d.type === 'removed' ? '−' : ' ';
    var num = d.type === 'removed' ? (d.lineOld || '') : (d.lineNew || '');
    html += '<div class="ct-diff-line ' + d.type + '"><span class="ct-line-num">' + num + '</span><span class="ct-line-content">' + prefix + ' ' + escapeHtml(d.text) + '</span></div>';
  }
  container.innerHTML = html;
}

function renderSideBySide(container) {
  var left = '', right = '';
  for (var i = 0; i < lastDiff.length; i++) {
    var d = lastDiff[i];
    if (d.type === 'unchanged') {
      left  += '<div class="ct-diff-line unchanged"><span class="ct-line-num">' + d.lineOld + '</span><span class="ct-line-content">' + escapeHtml(d.text) + '</span></div>';
      right += '<div class="ct-diff-line unchanged"><span class="ct-line-num">' + d.lineNew + '</span><span class="ct-line-content">' + escapeHtml(d.text) + '</span></div>';
    } else if (d.type === 'removed') {
      left  += '<div class="ct-diff-line removed"><span class="ct-line-num">' + d.lineOld + '</span><span class="ct-line-content">− ' + escapeHtml(d.text) + '</span></div>';
      right += '<div class="ct-diff-line empty"><span class="ct-line-num"></span><span class="ct-line-content"></span></div>';
    } else {
      left  += '<div class="ct-diff-line empty"><span class="ct-line-num"></span><span class="ct-line-content"></span></div>';
      right += '<div class="ct-diff-line added"><span class="ct-line-num">' + d.lineNew + '</span><span class="ct-line-content">+ ' + escapeHtml(d.text) + '</span></div>';
    }
  }
  container.innerHTML = '<div class="ct-sbs"><div class="ct-sbs-panel">' + left + '</div><div class="ct-sbs-panel">' + right + '</div></div>';
}

function copyDiff() {
  if (!lastDiff.length) return;
  var text = lastDiff.map(function(d) {
    var p = d.type === 'added' ? '+ ' : d.type === 'removed' ? '- ' : '  ';
    return p + d.text;
  }).join('\n');
  navigator.clipboard.writeText(text).then(function() { showToast('Diff copied to clipboard'); });
}

document.addEventListener('DOMContentLoaded', function() {
  var fileInput = document.getElementById('ct-file-input');
  fileInput.addEventListener('change', function() {
    if (!this.files[0] || !uploadTarget) return;
    var reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById(uploadTarget).value = e.target.result;
      updateEditor(uploadTarget);
      showToast('File loaded');
    };
    reader.readAsText(this.files[0]);
    this.value = '';
  });

  var langEl = document.getElementById('cc-lang');
  if (langEl) langEl.addEventListener('change', updateLanguage);

  document.getElementById('ct-btn-sbs').classList.add('active');
  ['ct-original', 'ct-changed'].forEach(function(id) { updateEditor(id); });
});
