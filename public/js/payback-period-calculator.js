document.addEventListener('DOMContentLoaded', () => {
  let period = 'monthly';

  function sym() {
    const el = document.getElementById('pp-currency');
    return el ? el.value : '$';
  }

  const periodBtns = document.querySelectorAll('.pp-period-btn');
  periodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      periodBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      period = btn.dataset.period;
      calculate();
    });
  });

  ['pp-initial', 'pp-savings', 'pp-lifespan'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calculate);
  });

  const currEl = document.getElementById('pp-currency');
  if (currEl) currEl.addEventListener('change', calculate);

  function parseVal(id) {
    const el = document.getElementById(id);
    if (!el || el.value.trim() === '') return NaN;
    return parseFloat(el.value.replace(/,/g, ''));
  }

  function fmtNum(n, dec) {
    const d = dec !== undefined ? dec : (Math.abs(n) < 100 ? 2 : 0);
    return n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
  }

  function fmtCard(n) {
    if (!isFinite(n)) return '-';
    const abs = Math.abs(n);
    if (abs >= 1e9) return (abs / 1e9).toFixed(2) + 'B';
    if (abs >= 1e6) return (abs / 1e6).toFixed(2) + 'M';
    if (abs >= 1e3) return (abs / 1e3).toFixed(1) + 'K';
    return abs.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }

  function formatPeriod(years) {
    const totalMonths = years * 12;
    let y = Math.floor(totalMonths / 12);
    let m = Math.round(totalMonths % 12);
    if (m === 12) { y += 1; m = 0; }

    if (y === 0 && m < 1) {
      const days = Math.round(years * 365.25);
      return days + (days === 1 ? ' day' : ' days');
    }
    if (y === 0) return m + (m === 1 ? ' month' : ' months');
    if (m === 0) return y + (y === 1 ? ' year' : ' years');
    return y + (y === 1 ? ' yr, ' : ' yrs, ') + m + (m === 1 ? ' month' : ' months');
  }

  function calculate() {
    const s = sym();
    const initial = parseVal('pp-initial');
    const savings = parseVal('pp-savings');

    if (isNaN(initial) || isNaN(savings) || initial <= 0 || savings <= 0) {
      document.getElementById('pp-result').classList.add('hidden');
      document.getElementById('pp-table-section').classList.add('hidden');
      return;
    }

    let annualSavings;
    if (period === 'daily') annualSavings = savings * 365.25;
    else if (period === 'monthly') annualSavings = savings * 12;
    else annualSavings = savings;

    const paybackYears = initial / annualSavings;
    document.getElementById('pp-payback').textContent = formatPeriod(paybackYears);

    document.getElementById('pp-step1').textContent =
      period === 'annually'
        ? `${s}${fmtNum(savings)}/year (no conversion needed)`
        : period === 'monthly'
          ? `${s}${fmtNum(savings)}/month × 12 = ${s}${fmtNum(annualSavings)}/year`
          : `${s}${fmtNum(savings)}/day × 365.25 = ${s}${fmtNum(annualSavings)}/year`;

    document.getElementById('pp-step2').textContent =
      `${s}${fmtNum(initial, 0)} ÷ ${s}${fmtNum(annualSavings, 0)}/year = ${paybackYears.toFixed(2)} years`;

    const lifespan = parseVal('pp-lifespan');
    const lifespanRow = document.getElementById('pp-lifespan-row');
    const tableSection = document.getElementById('pp-table-section');

    if (!isNaN(lifespan) && lifespan > 0) {
      const totalSavings = annualSavings * lifespan;
      const netProfit = totalSavings - initial;
      const totalROI = (netProfit / initial) * 100;
      const annROI = lifespan >= 1 ? (Math.pow(totalSavings / initial, 1 / lifespan) - 1) * 100 : NaN;

      document.getElementById('pp-total-savings').textContent = s + fmtCard(totalSavings);
      document.getElementById('pp-net-profit').textContent =
        (netProfit >= 0 ? '+' : '-') + s + fmtCard(Math.abs(netProfit));
      document.getElementById('pp-roi').textContent = totalROI.toFixed(1) + '%';
      document.getElementById('pp-ann-roi').textContent = isFinite(annROI) ? annROI.toFixed(2) + '%' : '-';
      lifespanRow.classList.remove('hidden');

      const paybackYear = Math.ceil(paybackYears);
      const tbody = document.getElementById('pp-table-body');
      tbody.innerHTML = '';
      const maxYears = Math.min(Math.round(lifespan), 30);

      for (let y = 1; y <= maxYears; y++) {
        const cumSavings = annualSavings * y;
        const netPos = cumSavings - initial;
        const isBreakEven = y === paybackYear && paybackYears <= lifespan;
        const tr = document.createElement('tr');
        if (isBreakEven) tr.className = 'pp-breakeven-row';
        tr.innerHTML =
          `<td>Year ${y}</td>` +
          `<td>${s}${fmtNum(cumSavings, 0)}</td>` +
          `<td class="${netPos >= 0 ? 'pp-pos' : 'pp-neg'}">${netPos >= 0 ? '+' : '-'}${s}${fmtNum(Math.abs(netPos), 0)}</td>` +
          `<td>${isBreakEven ? '&#10003; Break-even' : ''}</td>`;
        tbody.appendChild(tr);
      }

      tableSection.classList.remove('hidden');
    } else {
      lifespanRow.classList.add('hidden');
      tableSection.classList.add('hidden');
    }

    document.getElementById('pp-result').classList.remove('hidden');
  }
});
