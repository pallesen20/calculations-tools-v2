(function () {
  var index = null;
  var debounceTimer = null;
  var activeIdx = -1;

  var input = document.getElementById('headerSearchInput');
  var results = document.getElementById('headerSearchResults');
  var searchWrap = document.getElementById('headerSearchWrap');
  var mobileSearchBtn = document.getElementById('mobileSearchBtn');
  var searchBackBtn = document.getElementById('searchBackBtn');
  var burgerBtn = document.getElementById('mobileMenuBtn');
  var logo = document.querySelector('.site-logo');
  var mobilePanel = document.getElementById('mobileNavPanel');

  if (!input) return;

  function score(item, q) {
    var t = item.t.toLowerCase();
    var k = item.k.toLowerCase();
    if (t === q) return 100;
    if (t.startsWith(q)) return 80;
    var wordBoundary = ' ' + q;
    if (t.includes(wordBoundary)) return 70;
    if (t.includes(q)) return 60;
    if (k.includes(q)) return 40;
    var words = t.split(/[\s\-\/\(\)]+/).filter(Boolean);
    var initials = words.map(function (w) { return w[0] || ''; }).join('').toLowerCase();
    if (initials === q) return 35;
    if (initials.startsWith(q)) return 32;
    if (initials.includes(q)) return 25;
    return 0;
  }

  function highlight(text, q) {
    var idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return escHtml(text);
    return escHtml(text.slice(0, idx)) +
      '<mark>' + escHtml(text.slice(idx, idx + q.length)) + '</mark>' +
      escHtml(text.slice(idx + q.length));
  }

  function escHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderResults(items, q) {
    if (!items.length) {
      results.innerHTML = '<div class="search-no-results">No results for &ldquo;' + escHtml(q) + '&rdquo;</div>';
      results.hidden = false;
      activeIdx = -1;
      return;
    }
    results.innerHTML = items.map(function (item, i) {
      return '<a href="' + item.p + '" class="search-result-item" data-idx="' + i + '">' +
        '<span class="sri-icon">' + item.i + '</span>' +
        '<span class="sri-body">' +
          '<span class="sri-title">' + highlight(item.t, q) + '</span>' +
          '<span class="sri-cat">' + escHtml(item.c) + '</span>' +
        '</span>' +
        '<span class="sri-type sri-type--' + item.y + '">' + (item.y === 'term' ? 'Term' : 'Tool') + '</span>' +
      '</a>';
    }).join('');
    results.hidden = false;
    activeIdx = -1;
  }

  function search(q) {
    q = q.trim().toLowerCase();
    if (q.length < 2) { closeResults(); return; }
    var scored = [];
    for (var i = 0; i < index.length; i++) {
      var s = score(index[i], q);
      if (s > 0) scored.push({ item: index[i], s: s });
    }
    scored.sort(function (a, b) {
      if (a.item.y !== b.item.y) return a.item.y === 'tool' ? -1 : 1;
      return b.s - a.s;
    });
    renderResults(scored.slice(0, 8).map(function (x) { return x.item; }), q);
  }

  function closeResults() {
    results.hidden = true;
    activeIdx = -1;
  }

  function loadIndex(cb) {
    if (index) { cb(); return; }
    fetch('/search-index.json')
      .then(function (r) { return r.json(); })
      .then(function (data) { index = data; cb(); })
      .catch(function () { index = []; cb(); });
  }

  input.addEventListener('focus', function () {
    loadIndex(function () {
      if (input.value.trim().length >= 2) search(input.value);
    });
  });

  input.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      loadIndex(function () { search(input.value); });
    }, 150);
  });

  input.addEventListener('keydown', function (e) {
    var items = results.querySelectorAll('.search-result-item');
    if (!items.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIdx = Math.min(activeIdx + 1, items.length - 1);
      updateActive(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIdx = Math.max(activeIdx - 1, -1);
      updateActive(items);
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault();
      items[activeIdx].click();
    } else if (e.key === 'Escape') {
      closeResults();
      input.blur();
    }
  });

  function updateActive(items) {
    items.forEach(function (el, i) {
      el.classList.toggle('search-result-item--active', i === activeIdx);
    });
    if (activeIdx >= 0) items[activeIdx].scrollIntoView({ block: 'nearest' });
  }

  document.addEventListener('click', function (e) {
    if (!searchWrap.contains(e.target)) closeResults();
  });

  if (mobileSearchBtn) {
    mobileSearchBtn.addEventListener('click', function () {
      activateMobileSearch();
    });
  }

  if (searchBackBtn) {
    searchBackBtn.addEventListener('click', function () {
      deactivateMobileSearch();
    });
  }

  function activateMobileSearch() {
    document.body.classList.add('search-active');
    input.focus();
    loadIndex(function () {});
    if (mobilePanel) {
      mobilePanel.classList.remove('active');
    }
  }

  function deactivateMobileSearch() {
    document.body.classList.remove('search-active');
    closeResults();
    input.value = '';
  }

  if (burgerBtn && mobilePanel) {
    burgerBtn.addEventListener('click', function () {
      mobilePanel.classList.toggle('active');
      deactivateMobileSearch();
    });
  }

  document.addEventListener('click', function (e) {
    if (
      mobilePanel &&
      mobilePanel.classList.contains('active') &&
      !mobilePanel.contains(e.target) &&
      !burgerBtn.contains(e.target)
    ) {
      mobilePanel.classList.remove('active');
    }
  });
})();
