document.addEventListener('DOMContentLoaded', () => {
  let buyPeriod = 'annual';

  const periodBtns = document.querySelectorAll('.bvb-period-btn');
  periodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      periodBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      buyPeriod = btn.dataset.period;
      calculate();
    });
  });

  ['bvb-build-cost', 'bvb-build-maintenance', 'bvb-build-hosting', 'bvb-build-growth',
   'bvb-buy-setup', 'bvb-buy-annual', 'bvb-buy-growth'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calculate);
  });

  const yearsEl = document.getElementById('bvb-years');
  if (yearsEl) yearsEl.addEventListener('change', calculate);

  const currEl = document.getElementById('bvb-currency');
  if (currEl) currEl.addEventListener('change', calculate);

  function sym() {
    const el = document.getElementById('bvb-currency');
    return el ? el.value : '$';
  }

  function parseVal(id) {
    const el = document.getElementById(id);
    if (!el || el.value.trim() === '') return NaN;
    return parseFloat(el.value.replace(/,/g, ''));
  }

  function fmt(n) {
    if (!isFinite(n)) return '-';
    const abs = Math.abs(n);
    const sign = n < 0 ? '-' : '';
    if (abs >= 1e9) return sign + (abs / 1e9).toFixed(2) + 'B';
    if (abs >= 1e6) return sign + (abs / 1e6).toFixed(2) + 'M';
    if (abs >= 1e3) return sign + (abs / 1e3).toFixed(1) + 'K';
    return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }

  function fmtFull(n) {
    return Math.round(n).toLocaleString('en-US');
  }

  function buildCum(y, buildInitial, buildMaintenance, hostingAnnual, g) {
    let maintSum;
    if (g === 0) {
      maintSum = buildMaintenance * y;
    } else {
      maintSum = buildMaintenance * ((Math.pow(1 + g, y) - 1) / g);
    }
    return buildInitial + hostingAnnual * y + maintSum;
  }

  function buyCum(y, buySetup, buyAnnual, r) {
    let subSum;
    if (r === 0) {
      subSum = buyAnnual * y;
    } else {
      subSum = buyAnnual * ((Math.pow(1 + r, y) - 1) / r);
    }
    return buySetup + subSum;
  }

  function calculate() {
    const s = sym();
    const years = parseInt(document.getElementById('bvb-years')?.value || '5');

    const buildInitial = parseVal('bvb-build-cost');
    const buildMaintenance = parseVal('bvb-build-maintenance');
    const hostingRaw = parseVal('bvb-build-hosting');
    const hostingAnnual = isNaN(hostingRaw) ? 0 : hostingRaw * 12;
    const buildGrowthRaw = parseVal('bvb-build-growth');
    const g = isNaN(buildGrowthRaw) ? 0 : buildGrowthRaw / 100;

    let buyAnnualRaw = parseVal('bvb-buy-annual');
    if (buyPeriod === 'monthly' && !isNaN(buyAnnualRaw)) buyAnnualRaw = buyAnnualRaw * 12;
    const buySetupRaw = parseVal('bvb-buy-setup');
    const buySetup = isNaN(buySetupRaw) ? 0 : buySetupRaw;
    const buyGrowthRaw = parseVal('bvb-buy-growth');
    const r = isNaN(buyGrowthRaw) ? 0 : buyGrowthRaw / 100;

    if (isNaN(buildInitial) || isNaN(buildMaintenance) || isNaN(buyAnnualRaw)) {
      document.getElementById('bvb-result').classList.add('hidden');
      document.getElementById('bvb-table-section').classList.add('hidden');
      return;
    }

    const buildTotal = buildCum(years, buildInitial, buildMaintenance, hostingAnnual, g);
    const buyTotal = buyCum(years, buySetup, buyAnnualRaw, r);

    let breakEvenMonths = null;
    const maxSearch = Math.max(years, 20);
    for (let y = 1; y <= maxSearch; y++) {
      const bc = buildCum(y, buildInitial, buildMaintenance, hostingAnnual, g);
      const buyc = buyCum(y, buySetup, buyAnnualRaw, r);
      if (bc <= buyc) {
        const bcPrev = buildCum(y - 1, buildInitial, buildMaintenance, hostingAnnual, g);
        const buycPrev = buyCum(y - 1, buySetup, buyAnnualRaw, r);
        const diffPrev = bcPrev - buycPrev;
        const diff = bc - buyc;
        const denom = diffPrev - diff;
        const fraction = denom !== 0 ? diffPrev / denom : 0;
        breakEvenMonths = Math.round((y - 1 + fraction) * 12);
        break;
      }
    }

    const diff = buyTotal - buildTotal;

    let recText, recClass;
    if (breakEvenMonths === null) {
      recText = `Buy wins over ${years} years - saves ${s}${fmt(Math.abs(diff))} vs. building`;
      recClass = 'bvb-rec bvb-rec-buy';
    } else if (breakEvenMonths <= 12) {
      recText = `Build wins from year 1 - saves ${s}${fmt(Math.abs(diff))} over ${years} years`;
      recClass = 'bvb-rec bvb-rec-build';
    } else {
      const beYears = Math.floor(breakEvenMonths / 12);
      const beMonths = breakEvenMonths % 12;
      let beStr = beYears > 0 ? `${beYears} year${beYears > 1 ? 's' : ''}` : '';
      if (beMonths > 0) beStr += (beStr ? ', ' : '') + `${beMonths} month${beMonths > 1 ? 's' : ''}`;
      if (breakEvenMonths <= years * 12) {
        recText = `Build wins after ${beStr} - saves ${s}${fmt(Math.abs(diff))} over ${years} years`;
        recClass = 'bvb-rec bvb-rec-build';
      } else {
        recText = `Buy wins over ${years} years - build breaks even in ${beStr}`;
        recClass = 'bvb-rec bvb-rec-buy';
      }
    }

    document.getElementById('bvb-build-total').textContent = s + fmt(buildTotal);
    document.getElementById('bvb-buy-total').textContent = s + fmt(buyTotal);

    const diffEl = document.getElementById('bvb-diff');
    const diffCard = document.getElementById('bvb-diff-card');
    const diffLbl = document.getElementById('bvb-diff-lbl');
    diffEl.textContent = s + fmt(Math.abs(diff));
    diffLbl.textContent = diff >= 0 ? `Build saves over ${years} yrs` : `Buy saves over ${years} yrs`;
    diffCard.className = 'lbm-card ' + (diff >= 0 ? 'bvb-win' : 'bvb-lose');

    const recEl = document.getElementById('bvb-recommendation');
    recEl.textContent = recText;
    recEl.className = recClass;

    document.getElementById('bvb-step-build-initial').textContent = s + fmtFull(buildInitial);
    document.getElementById('bvb-step-build-hosting').textContent = s + fmtFull(hostingAnnual) + '/yr';
    document.getElementById('bvb-step-build-maint').textContent = s + fmtFull(buildMaintenance) + '/yr' + (g > 0 ? ` (+${(g * 100).toFixed(0)}%/yr growth)` : '');
    document.getElementById('bvb-step-build-total').textContent = s + fmtFull(buildTotal);
    document.getElementById('bvb-step-buy-setup').textContent = s + fmtFull(buySetup);
    document.getElementById('bvb-step-buy-annual').textContent = s + fmtFull(buyAnnualRaw) + '/yr' + (r > 0 ? ` (+${(r * 100).toFixed(0)}%/yr growth)` : '');
    document.getElementById('bvb-step-buy-total').textContent = s + fmtFull(buyTotal);

    const tbody = document.getElementById('bvb-table-body');
    tbody.innerHTML = '';
    for (let y = 1; y <= years; y++) {
      const bc = Math.round(buildCum(y, buildInitial, buildMaintenance, hostingAnnual, g));
      const buyc = Math.round(buyCum(y, buySetup, buyAnnualRaw, r));
      const d = buyc - bc;
      const beYear = breakEvenMonths !== null ? Math.ceil(breakEvenMonths / 12) : null;
      const isBreakEven = beYear === y;
      const tr = document.createElement('tr');
      if (isBreakEven) tr.className = 'bvb-breakeven-row';
      tr.innerHTML =
        `<td>Year ${y}${isBreakEven ? ' &#10003;' : ''}</td>` +
        `<td>${s}${fmtFull(bc)}</td>` +
        `<td>${s}${fmtFull(buyc)}</td>` +
        `<td class="${d >= 0 ? 'bvb-pos' : 'bvb-neg'}">${d >= 0 ? 'Build +' : 'Buy +'}${s}${fmt(Math.abs(d))}</td>`;
      tbody.appendChild(tr);
    }

    document.getElementById('bvb-result').classList.remove('hidden');
    document.getElementById('bvb-table-section').classList.remove('hidden');
  }
});
