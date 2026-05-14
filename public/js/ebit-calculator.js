document.addEventListener('DOMContentLoaded', () => {
  let method = 'bottomup';

  const bottomupFields = document.getElementById('ebit-bottomup-fields');
  const topdownFields  = document.getElementById('ebit-topdown-fields');
  const subtitleEl     = document.getElementById('ebit-subtitle');
  const intermediateLbl = document.getElementById('ebit-intermediate-lbl');
  const stepLabel1     = document.getElementById('ebit-step-label1');
  const stepLabel2     = document.getElementById('ebit-step-label2');
  const btnBottomup    = document.getElementById('ebit-method-bottomup');
  const btnTopdown     = document.getElementById('ebit-method-topdown');

  const allInputIds = [
    'ebit-net-income', 'ebit-tax', 'ebit-interest', 'ebit-bu-revenue',
    'ebit-td-revenue', 'ebit-cogs', 'ebit-opex',
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
      ? 'Add back Interest and Tax to Net Income'
      : 'Subtract COGS and Operating Expenses from Revenue';
    document.getElementById('ebit-result').classList.add('hidden');
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

  function getMarginRating(margin) {
    if (margin < 0)  return 'Operating loss';
    if (margin < 3)  return 'Break-even';
    if (margin < 10) return 'Thin margins';
    if (margin < 20) return 'Healthy';
    if (margin < 35) return 'Strong';
    return 'Exceptional';
  }

  function calculate() {
    let intermediate, ebit, revenue = NaN;

    if (method === 'bottomup') {
      const netIncome = parseVal('ebit-net-income');
      if (isNaN(netIncome)) { document.getElementById('ebit-result').classList.add('hidden'); return; }
      const tax      = parseVal('ebit-tax', 0);
      const interest = parseVal('ebit-interest', 0);
      revenue        = parseVal('ebit-bu-revenue');
      intermediate   = netIncome + tax;
      ebit           = intermediate + interest;
      intermediateLbl.textContent = 'EBT';
      stepLabel1.textContent = 'Net Income + Tax = EBT';
      stepLabel2.textContent = 'EBT + Interest = EBIT';
      document.getElementById('ebit-step1').textContent = `${fmtFull(netIncome)} + ${fmtFull(tax)} = ${fmtFull(intermediate)}`;
      document.getElementById('ebit-step2').textContent = `${fmtFull(intermediate)} + ${fmtFull(interest)} = ${fmtFull(ebit)}`;
    } else {
      revenue = parseVal('ebit-td-revenue');
      if (isNaN(revenue)) { document.getElementById('ebit-result').classList.add('hidden'); return; }
      const cogs   = parseVal('ebit-cogs', 0);
      const opex   = parseVal('ebit-opex', 0);
      intermediate = revenue - cogs;
      ebit         = intermediate - opex;
      intermediateLbl.textContent = 'Gross Profit';
      stepLabel1.textContent = 'Revenue - COGS = Gross Profit';
      stepLabel2.textContent = 'Gross Profit - OpEx = EBIT';
      document.getElementById('ebit-step1').textContent = `${fmtFull(revenue)} - ${fmtFull(cogs)} = ${fmtFull(intermediate)}`;
      document.getElementById('ebit-step2').textContent = `${fmtFull(intermediate)} - ${fmtFull(opex)} = ${fmtFull(ebit)}`;
    }

    document.getElementById('ebit-intermediate-val').textContent = fmtCard(intermediate);
    document.getElementById('ebit-ebit-val').textContent         = fmtCard(ebit);

    const marginRow = document.getElementById('ebit-margin-row');
    if (!isNaN(revenue) && revenue !== 0) {
      const margin = (ebit / revenue) * 100;
      document.getElementById('ebit-margin-val').textContent = margin.toFixed(1) + '%';
      document.getElementById('ebit-rating-val').textContent = getMarginRating(margin);
      marginRow.classList.remove('hidden');
    } else {
      marginRow.classList.add('hidden');
    }

    document.getElementById('ebit-result').classList.remove('hidden');
  }
});
