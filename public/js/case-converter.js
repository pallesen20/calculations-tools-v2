const SMALL_WORDS = /^(a|an|and|as|at|but|by|for|if|in|nor|of|on|or|so|the|to|up|yet)$/i;

const CASES = {
  sentence:    text => text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()),
  lower:       text => text.toLowerCase(),
  upper:       text => text.toUpperCase(),
  capitalized: text => text.replace(/\b\w/g, c => c.toUpperCase()),
  title:       text => text.toLowerCase().replace(/\w+/g, (word, index) =>
                 index === 0 || !SMALL_WORDS.test(word)
                   ? word.charAt(0).toUpperCase() + word.slice(1)
                   : word),
  alternating: text => {
    let upper = false;
    return [...text].map(c => {
      if (!c.match(/[a-zA-Z]/)) return c;
      const out = upper ? c.toUpperCase() : c.toLowerCase();
      upper = !upper;
      return out;
    }).join('');
  },
  inverse:     text => [...text].map(c => {
                 const u = c.toUpperCase(), l = c.toLowerCase();
                 if (u === l) return c;   // no case distinction (numbers, punctuation)
                 return c === u ? l : u;  // flip
               }).join(''),
};

function stats(text) {
  return {
    chars:     text.length,
    words:     text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0,
    spaces:    (text.match(/\s/g) || []).length,
  };
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
  const input     = document.getElementById('cc-input');
  const copyBtn   = document.getElementById('cc-copy');
  const resetBtn  = document.getElementById('cc-reset');
  const statsGrid = document.getElementById('cc-stats');

  function refresh() {
    const hasText = input.value.length > 0;
    document.querySelectorAll('.cc-case-btn, #cc-copy, #cc-reset')
      .forEach(el => el.disabled = !hasText);

    if (hasText) {
      const s = stats(input.value);
      document.getElementById('cc-chars').textContent     = s.chars;
      document.getElementById('cc-words').textContent     = s.words;
      document.getElementById('cc-sentences').textContent = s.sentences;
      document.getElementById('cc-spaces').textContent    = s.spaces;
      statsGrid.classList.remove('hidden');
    } else {
      statsGrid.classList.add('hidden');
    }
  }

  input.addEventListener('input', refresh);

  document.getElementById('cc-btns').addEventListener('click', e => {
    const btn = e.target.closest('.cc-case-btn');
    if (!btn || btn.disabled) return;
    const type = btn.dataset.case;
    input.value = CASES[type](input.value);
    refresh();
    showToast(btn.dataset.toast);
  });

  copyBtn.addEventListener('click', async () => {
    await navigator.clipboard.writeText(input.value);
    showToast('Copied to clipboard');
  });

  resetBtn.addEventListener('click', () => {
    input.value = '';
    refresh();
    showToast('Text cleared');
  });

  refresh();
});