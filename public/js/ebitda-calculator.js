document.addEventListener('DOMContentLoaded', () => {
  let method = 'bottomup';

  const bottomupFields = document.getElementById('ebitda-bottomup-fields');
  const topdownFields  = document.getElementById('ebitda-topdown-fields');
  const subtitleEl     = document.getElementById('ebitda-subtitle');
  const card1Lbl       = document.getElementById('ebitda-card1-lbl');
  const card2Wrap      = document.getElementById('ebitda-card2-wrap');
  const stepLabel1     = document.getElementById('ebitda-step-label1');
  const stepLabel3     = document.getElementById('ebitda-step-label3');
  const step2Row       = document.getElementById('ebitda-step2-row');
  const btnBottomup    = document.getElementById('ebitda-method-bottomup');
  const btnTopdown     = document.getElementById('ebitda-method-topdown');

  const allInputIds = [
    'ebitda-net-income', 'ebitda-tax', 'ebitda-interest', 'ebitda-da', 'ebitda-bu-revenue',
    'ebitda-td-revenue', 'ebitda-cogs', 'ebitda-opex',
  ];
  allInputIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calculate);
  });

  btnBottomup.addEventListener('click', () => setMethod('bottomup'));
  btnTopdown.addEventListener('click',  () => setMethod('topdown'));

  function setMethod(m) {
    method = m;
    btnBottomup.classList.toggle('active', m === 'bottomup');
    btnTopdown.classList.toggle('active',  m === 'topdown');
    bottomupFields.classList.toggle('hidden', m !== 'bottomup');
    topdownFields.classList.toggle('hidden',  m !== 'topdown');
    subtitleEl.textContent = m === 'bottomup'
      ? 'Add back non-operating and non-cash items to Net Income'
      : 'Subtract COGS and Operating Expenses (excl. D&A) from Revenue';
    document.getElementById('ebitda-result').classList.add('hidden');
    calculate();
  }

  function parseVal(id, fallback) {
    const el = document.getElementById(id);
    if (!el || el.value.trim() === '') return fallback !== undefined ? fallback : NaN;
    const v = parseFloat(el.value.replace(/,/g, '').replace(/\s/g, ''));
    return isNaN(v) ? (fallback !== undefined ? fallback : NaN) : v;
  }

  function fmtCard(n) {
    if (!isFinite(n)) return '-';
    const abs = Math.abs(n), sign = n < 0 ? '-' : '';
    if (abs >= 1e9) return sign + (abs / 1e9).toFixed(2) + 'B';
    if (abs >= 1e6) return sign + (abs / 1e6).toFixed(2) + 'M';
    if (abs >= 1e3) return sign + (abs / 1e3).toFixed(1) + 'K';
    return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }

  function fmtFull(n) {
    return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }

  function calculate() {
    let card1Val, ebitda, revenue = NaN;

    if (method === 'bottomup') {
      const netIncome = parseVal('ebitda-net-income');
      if (isNaN(netIncome)) { document.getElementById('ebitda-result').classList.add('hidden'); return; }
      const tax      = parseVal('ebitda-tax', 0);
      const interest = parseVal('ebitda-interest', 0);
      const da       = parseVal('ebitda-da', 0);
      revenue        = parseVal('ebitda-bu-revenue');

      const ebt  = netIncome + tax;
      const ebit = ebt + interest;
      ebitda     = ebit + da;
      card1Val   = ebt;

      card1Lbl.textContent  = 'EBT';
      card2Wrap.style.display = '';
      step2Row.style.display  = '';
      stepLabel1.textContent = 'Net Income + Tax = EBT';
      stepLabel3.textContent = 'EBIT + D&A = EBITDA';

      document.getElementById('ebitda-ebit-val').textContent = fmtCard(ebit);
      document.getElementById('ebitda-step1').textContent = `${fmtFull(netIncome)} + ${fmtFull(tax)} = ${fmtFull(ebt)}`;
      document.getElementById('ebitda-step2').textContent = `${fmtFull(ebt)} + ${fmtFull(interest)} = ${fmtFull(ebit)}`;
      document.getElementById('ebitda-step3').textContent = `${fmtFull(ebit)} + ${fmtFull(da)} = ${fmtFull(ebitda)}`;
    } else {
      revenue = parseVal('ebitda-td-revenue');
      if (isNaN(revenue)) { document.getElementById('ebitda-result').classList.add('hidden'); return; }
      const cogs = parseVal('ebitda-cogs', 0);
      const opex = parseVal('ebitda-opex', 0);

      const grossProfit = revenue - cogs;
      ebitda   = grossProfit - opex;
      card1Val = grossProfit;

      card1Lbl.textContent    = 'Gross Profit';
      card2Wrap.style.display = 'none';
      step2Row.style.display  = 'none';
      stepLabel1.textContent  = 'Revenue − COGS = Gross Profit';
      stepLabel3.textContent  = 'Gross Profit − OpEx (excl. D&A) = EBITDA';

      document.getElementById('ebitda-step1').textContent = `${fmtFull(revenue)} - ${fmtFull(cogs)} = ${fmtFull(grossProfit)}`;
      document.getElementById('ebitda-step3').textContent = `${fmtFull(grossProfit)} - ${fmtFull(opex)} = ${fmtFull(ebitda)}`;
    }

    document.getElementById('ebitda-card1-val').textContent  = fmtCard(card1Val);
    document.getElementById('ebitda-ebitda-val').textContent = fmtCard(ebitda);

    const marginRow = document.getElementById('ebitda-margin-row');
    if (!isNaN(revenue) && revenue !== 0) {
      document.getElementById('ebitda-margin-val').textContent = ((ebitda / revenue) * 100).toFixed(1) + '%';
      marginRow.classList.remove('hidden');
    } else {
      marginRow.classList.add('hidden');
    }

    document.getElementById('ebitda-result').classList.remove('hidden');
  }
});
