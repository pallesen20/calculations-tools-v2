document.addEventListener('DOMContentLoaded', () => {
  const LIMIT = 10;

  function initTable(wrapId, filterId) {
    const wrap = document.getElementById(wrapId);
    const input = document.getElementById(filterId);
    if (!wrap || !input) return;

    const rows = Array.from(wrap.querySelectorAll('tbody tr'));
    const label = wrap.dataset.label || 'rows';
    let expanded = false;

    const noResults = document.createElement('p');
    noResults.className = 'stax-no-results';
    noResults.style.display = 'none';
    wrap.insertAdjacentElement('afterend', noResults);

    const btn = document.createElement('button');
    btn.className = 'stax-show-all-btn';
    noResults.insertAdjacentElement('afterend', btn);

    function applyState() {
      const q = input.value.toLowerCase().trim();
      let visible = 0;

      rows.forEach((row, i) => {
        const matches = !q || row.textContent.toLowerCase().includes(q);
        const inLimit = !q && !expanded ? i < LIMIT : true;
        const show = matches && inLimit;
        row.style.display = show ? '' : 'none';
        if (show) visible++;
      });

      if (q) {
        noResults.style.display = visible === 0 ? '' : 'none';
        noResults.textContent = `No ${label} match "${input.value}"`;
        btn.style.display = 'none';
      } else {
        noResults.style.display = 'none';
        if (rows.length <= LIMIT) {
          btn.style.display = 'none';
        } else {
          btn.style.display = '';
          btn.textContent = expanded ? 'Show fewer' : `Show all ${rows.length} ${label}`;
        }
      }
    }

    btn.addEventListener('click', () => {
      expanded = !expanded;
      applyState();
    });

    input.addEventListener('input', () => {
      if (!input.value) expanded = false;
      applyState();
    });

    applyState();
  }

  initTable('stax-city-table-wrap', 'stax-city-filter');
  initTable('stax-county-table-wrap', 'stax-county-filter');
});
