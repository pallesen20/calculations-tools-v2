// --- Toast ---
function showToast(msg) {
  const t = document.querySelector('.diff-toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

// --- Editor helpers ---
function updateStats(id) {
  const val = document.getElementById(id).value;
  const lines = val ? val.split('\n').length : 0;
  document.getElementById(id + '-lines').textContent = 'Lines: ' + lines;
  document.getElementById(id + '-chars').textContent = 'Characters: ' + val.length;
}

function updateLineNumbers(id) {
  const ta    = document.getElementById(id);
  const count = ta.value === '' ? 1 : ta.value.split('\n').length;
  const gutter = document.getElementById(id + '-gutter');
  let html = '';
  for (let i = 1; i <= count; i++) html += '<div>' + i + '</div>';
  gutter.innerHTML = html;
}

function updateActiveLine(id) {
  const ta         = document.getElementById(id);
  const lineIndex  = ta.value.substring(0, ta.selectionStart).split('\n').length - 1;
  const lineHeight = parseFloat(getComputedStyle(ta).lineHeight);
  const padTop     = parseFloat(getComputedStyle(ta).paddingTop);
  const hl         = document.getElementById(id + '-hl');
  hl.style.top     = (padTop + lineIndex * lineHeight - ta.scrollTop) + 'px';
  hl.style.height  = lineHeight + 'px';
  const divs = document.getElementById(id + '-gutter').children;
  for (let i = 0; i < divs.length; i++)
    divs[i].classList.toggle('active-ln', i === lineIndex);
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

// --- Toolbar actions ---
let uploadTarget = null;

function uploadFile(id) {
  uploadTarget = id;
  document.getElementById('ct-file-input').click();
}

function downloadText(id) {
  const text = document.getElementById(id).value;
  if (!text) { showToast('Nothing to download'); return; }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
  a.download = id + '-text.txt';
  a.click();
  URL.revokeObjectURL(a.href);
}

function copyText(id) {
  const text = document.getElementById(id).value;
  if (!text) { showToast('Nothing to copy'); return; }
  navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard'));
}

function clearText(id) {
  document.getElementById(id).value = '';
  updateEditor(id);
}

function swapTexts() {
  const o = document.getElementById('ct-original');
  const c = document.getElementById('ct-changed');
  const tmp = o.value; o.value = c.value; c.value = tmp;
  updateEditor('ct-original');
  updateEditor('ct-changed');
  showToast('Texts swapped');
}

function loadSample() {
  document.getElementById('ct-original').value =
`function greet(name) {
    console.log("Hello, " + name);
    return true;
}

const users = ["Alice", "Bob", "Charlie"];
users.forEach(user => {
    greet(user);
});`;
  document.getElementById('ct-changed').value =
`function greet(name, greeting = "Hello") {
    console.log(greeting + ", " + name + "!");
    return true;
}

const users = ["Alice", "Bob", "Charlie", "Diana"];
users.forEach(user => {
    greet(user, "Hi");
});

console.log("Done!");`;
  updateEditor('ct-original');
  updateEditor('ct-changed');
  showToast('Sample loaded');
}

// --- LCS diff ---
function computeDiff(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] + 1 : Math.max(dp[i-1][j], dp[i][j-1]);

  const result = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i-1] === b[j-1]) {
      result.push({ type: 'unchanged', lineOld: i, lineNew: j, text: a[i-1] }); i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j-1] >= dp[i-1][j])) {
      result.push({ type: 'added', lineNew: j, text: b[j-1] }); j--;
    } else {
      result.push({ type: 'removed', lineOld: i, text: a[i-1] }); i--;
    }
  }
  return result.reverse();
}

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

let lastDiff = [];
let currentView = 'sbs';

function findDifferences() {
  const a = document.getElementById('ct-original').value.split('\n');
  const b = document.getElementById('ct-changed').value.split('\n');
  lastDiff = computeDiff(a, b);

  const added     = lastDiff.filter(d => d.type === 'added').length;
  const removed   = lastDiff.filter(d => d.type === 'removed').length;
  const unchanged = lastDiff.filter(d => d.type === 'unchanged').length;

  document.getElementById('ct-stat-added').textContent     = '+' + added + ' added';
  document.getElementById('ct-stat-removed').textContent   = '−' + removed + ' removed';
  document.getElementById('ct-stat-unchanged').textContent = unchanged + ' unchanged';

  renderDiff();
  const out = document.getElementById('diff-output');
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
  const container = document.getElementById('ct-diff-container');
  if (!lastDiff.length || lastDiff.every(d => d.type === 'unchanged')) {
    container.innerHTML = '<div class="diff-no-diff">✓ Texts are identical — no differences found</div>';
    return;
  }
  currentView === 'unified' ? renderUnified(container) : renderSideBySide(container);
}

function renderUnified(container) {
  let html = '';
  for (const d of lastDiff) {
    const prefix = d.type === 'added' ? '+' : d.type === 'removed' ? '−' : ' ';
    const num    = d.type === 'removed' ? (d.lineOld || '') : (d.lineNew || '');
    html += `<div class="ct-diff-line ${d.type}">
      <span class="ct-line-num">${num}</span>
      <span class="ct-line-content">${prefix} ${escapeHtml(d.text)}</span>
    </div>`;
  }
  container.innerHTML = html;
}

function renderSideBySide(container) {
  let left = '', right = '';
  for (const d of lastDiff) {
    if (d.type === 'unchanged') {
      left  += `<div class="ct-diff-line unchanged"><span class="ct-line-num">${d.lineOld}</span><span class="ct-line-content">${escapeHtml(d.text)}</span></div>`;
      right += `<div class="ct-diff-line unchanged"><span class="ct-line-num">${d.lineNew}</span><span class="ct-line-content">${escapeHtml(d.text)}</span></div>`;
    } else if (d.type === 'removed') {
      left  += `<div class="ct-diff-line removed"><span class="ct-line-num">${d.lineOld}</span><span class="ct-line-content">− ${escapeHtml(d.text)}</span></div>`;
      right += `<div class="ct-diff-line empty"><span class="ct-line-num"></span><span class="ct-line-content"></span></div>`;
    } else {
      left  += `<div class="ct-diff-line empty"><span class="ct-line-num"></span><span class="ct-line-content"></span></div>`;
      right += `<div class="ct-diff-line added"><span class="ct-line-num">${d.lineNew}</span><span class="ct-line-content">+ ${escapeHtml(d.text)}</span></div>`;
    }
  }
  container.innerHTML = `<div class="ct-sbs"><div class="ct-sbs-panel">${left}</div><div class="ct-sbs-panel">${right}</div></div>`;
}

function copyDiff() {
  if (!lastDiff.length) return;
  const text = lastDiff.map(d => {
    const p = d.type === 'added' ? '+ ' : d.type === 'removed' ? '- ' : '  ';
    return p + d.text;
  }).join('\n');
  navigator.clipboard.writeText(text).then(() => showToast('Diff copied to clipboard'));
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('ct-file-input');
  fileInput.addEventListener('change', function() {
    if (!this.files[0] || !uploadTarget) return;
    const reader = new FileReader();
    reader.onload = e => {
      document.getElementById(uploadTarget).value = e.target.result;
      updateEditor(uploadTarget);
      showToast('File loaded');
    };
    reader.readAsText(this.files[0]);
    this.value = '';
  });

  // Wire up view toggle buttons
  document.getElementById('ct-btn-sbs').classList.add('active');

  ['ct-original', 'ct-changed'].forEach(id => updateEditor(id));
});