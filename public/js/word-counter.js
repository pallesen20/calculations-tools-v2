const READING_WPM = 200;
const SPEAKING_WPM = 150;

const STOP_WORDS = new Set([
  'the','a','an','and','or','but','in','on','at','to','for','of','with','by',
  'is','are','was','were','be','been','have','has','had','do','does','did',
  'will','would','could','should','may','might','must','can','this','that',
  'these','those','i','you','he','she','it','we','they','me','him','her','us','them'
]);

function formatTime(seconds) {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60), s = seconds % 60;
  return s === 0 ? `${m}m` : `${m}m ${s}s`;
}

function analyze(text) {
  if (!text.trim()) return null;

  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;

  const doubleBreaks = text.split(/\n\s*\n/).filter(p => p.trim());
  const paragraphs = doubleBreaks.length > 1
    ? doubleBreaks.length
    : Math.max(text.split(/\n/).filter(l => l.trim()).length, 1);

  const readingTime = Math.round((wordCount / READING_WPM) * 60);
  const speakingTime = Math.round((wordCount / SPEAKING_WPM) * 60);

  const freq = {};
  words.forEach(w => {
    const clean = w.toLowerCase().replace(/[^\w]/g, '');
    if (clean.length > 2 && !STOP_WORDS.has(clean)) {
      freq[clean] = (freq[clean] || 0) + 1;
    }
  });

  const keywords = Object.entries(freq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([word, count]) => ({
      word,
      count,
      pct: Math.round((count / wordCount) * 1000) / 10,
    }));

  return { wordCount, chars, charsNoSpaces, spaces: chars - charsNoSpaces, sentences, paragraphs, readingTime, speakingTime, keywords };
}

function updateStats(stats) {
  document.getElementById('wc-words').textContent        = stats.wordCount;
  document.getElementById('wc-chars').textContent        = stats.chars;
  document.getElementById('wc-chars-ns').textContent     = stats.charsNoSpaces;
  document.getElementById('wc-spaces').textContent       = stats.spaces;
  document.getElementById('wc-sentences').textContent    = stats.sentences;
  document.getElementById('wc-paragraphs').textContent   = stats.paragraphs;
  document.getElementById('wc-reading').textContent      = formatTime(stats.readingTime);
  document.getElementById('wc-speaking').textContent     = formatTime(stats.speakingTime);

  const keywordGrid = document.getElementById('wc-keywords');
  const keywordCard = document.getElementById('wc-keyword-card');

  if (stats.keywords.length) {
    keywordGrid.innerHTML = stats.keywords.map(({ word, count, pct }) => `
      <div class="keyword-item">
        <div class="keyword-word">${word}</div>
        <div class="keyword-pct">${pct}%</div>
        <div class="keyword-count">${count}×</div>
      </div>
    `).join('');
    keywordCard.classList.remove('hidden');
  } else {
    keywordCard.classList.add('hidden');
  }
}

function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'wc-toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('wc-toast-show'), 10);
  setTimeout(() => {
    t.classList.remove('wc-toast-show');
    setTimeout(() => t.remove(), 300);
  }, 2500);
}

document.addEventListener('DOMContentLoaded', () => {
  const input      = document.getElementById('wc-input');
  const statsGrid  = document.getElementById('wc-stats-grid');
  const emptyState = document.getElementById('wc-empty');
  const copyBtn    = document.getElementById('wc-copy-stats');
  const resetBtn   = document.getElementById('wc-reset');

  function refresh() {
    const stats = analyze(input.value);
    const hasText = !!stats;
    statsGrid.classList.toggle('hidden', !hasText);
    emptyState.classList.toggle('hidden', hasText);
    copyBtn.disabled = !hasText;
    resetBtn.disabled = !hasText;
    if (hasText) updateStats(stats);
  }

  input.addEventListener('input',  refresh);
  input.addEventListener('change', refresh);
  input.addEventListener('keyup',  refresh);

  resetBtn.addEventListener('click', () => {
    input.value = '';
    refresh();
    showToast('Counter reset');
  });

  copyBtn.addEventListener('click', async () => {
    const stats = analyze(input.value);
    if (!stats) return;
    const text = [
      `Words: ${stats.wordCount}`,
      `Characters: ${stats.chars}`,
      `Characters (no spaces): ${stats.charsNoSpaces}`,
      `Sentences: ${stats.sentences}`,
      `Paragraphs: ${stats.paragraphs}`,
      `Reading time: ${formatTime(stats.readingTime)}`,
      `Speaking time: ${formatTime(stats.speakingTime)}`,
    ].join('\n');
    await navigator.clipboard.writeText(text);
    showToast('Stats copied to clipboard');
  });

  refresh();
});