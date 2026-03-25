document.addEventListener('DOMContentLoaded', function () {
  var input = document.getElementById('glossary-search');
  var filterBtns = document.querySelectorAll('.glossary-filter-btn');
  var rows = document.querySelectorAll('.gl-term-block');
  var alphaBtns = document.querySelectorAll('.glossary-alpha-btn');

  var activeFilter = 'all';

  function applyFilter() {
    var query = input ? input.value.trim().toLowerCase() : '';
    rows.forEach(function (row) {
      var term = (row.getAttribute('data-term') || '').toLowerCase();
      var cat = (row.getAttribute('data-category') || '').toLowerCase();
      var matchesSearch = !query || term.includes(query);
      var matchesFilter = activeFilter === 'all' || cat === activeFilter.toLowerCase();
      row.classList.toggle('hidden', !(matchesSearch && matchesFilter));
    });
    updateAlphaHighlight();
    updateLetterSections();
  }

  function updateLetterSections() {
    document.querySelectorAll('.glossary-letter-section').forEach(function (section) {
      var visible = section.querySelectorAll('.gl-term-block:not(.hidden)').length > 0;
      section.style.display = visible ? '' : 'none';
    });
  }

  function updateAlphaHighlight() {
    var visibleLetters = new Set();
    rows.forEach(function (row) {
      if (!row.classList.contains('hidden')) {
        visibleLetters.add((row.getAttribute('data-letter') || '').toUpperCase());
      }
    });
    alphaBtns.forEach(function (btn) {
      btn.classList.toggle('highlight', visibleLetters.has(btn.textContent.trim().toUpperCase()));
    });
  }

  if (input) {
    input.addEventListener('input', applyFilter);
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter') || 'all';
      applyFilter();
    });
  });

  alphaBtns.forEach(function (btn) {
    if (!btn.classList.contains('empty')) {
      btn.addEventListener('click', function () {
        var letter = btn.textContent.trim();
        var section = document.getElementById('letter-' + letter);
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  });

  updateAlphaHighlight();
});
