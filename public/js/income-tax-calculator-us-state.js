document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('itax-calculator');
  if (!el) return;

  const stateSlug = el.dataset.slug || '';
  const hasLocalTax = el.dataset.hasLocalTax === 'true';

  const FEDERAL_BRACKETS = {
    single: [[0,11925,10],[11925,48475,12],[48475,103350,22],[103350,197300,24],[197300,250525,32],[250525,626350,35],[626350,null,37]],
    mfj:    [[0,23850,10],[23850,96950,12],[96950,206700,22],[206700,394600,24],[394600,501050,32],[501050,751600,35],[751600,null,37]],
    hoh:    [[0,17000,10],[17000,64850,12],[64850,103350,22],[103350,197300,24],[197300,250500,32],[250500,626350,35],[626350,null,37]],
    mfs:    [[0,11925,10],[11925,48475,12],[48475,103350,22],[103350,197300,24],[197300,250525,32],[250525,375800,35],[375800,null,37]],
  };
  const FED_STD = { single: 15000, mfj: 30000, hoh: 22500, mfs: 15000 };
  const FICA = { ssRate: 6.2, ssWageBase: 176100, medRate: 1.45, addMedRate: 0.9 };
  const ADD_MED_THRESH = { single: 200000, mfj: 250000, hoh: 200000, mfs: 125000 };

  function parseBrackets(attr) {
    try { return JSON.parse(attr || '[]'); } catch { return []; }
  }

  const stateBrackets = {
    single: parseBrackets(el.dataset.bracketsSingle),
    mfj:    parseBrackets(el.dataset.bracketsMfj),
    hoh:    parseBrackets(el.dataset.bracketsHoh),
    mfs:    parseBrackets(el.dataset.bracketsMfs),
  };
  const stateStd = {
    single: parseFloat(el.dataset.stdSingle || '0'),
    mfj:    parseFloat(el.dataset.stdMfj || '0'),
    hoh:    parseFloat(el.dataset.stdHoh || '0'),
    mfs:    parseFloat(el.dataset.stdMfs || '0'),
  };
  const stateExempt = {
    single: parseFloat(el.dataset.exemptSingle || '0'),
    mfj:    parseFloat(el.dataset.exemptMfj || '0'),
    hoh:    parseFloat(el.dataset.exemptHoh || '0'),
    mfs:    parseFloat(el.dataset.exemptMfs || '0'),
  };
  const noTax = el.dataset.noTax === 'true';

  function applyBrackets(taxableIncome, brackets) {
    if (taxableIncome <= 0 || !brackets || brackets.length === 0) return 0;
    let tax = 0;
    for (const [min, max, rate] of brackets) {
      if (taxableIncome <= min) break;
      const top = max === null ? taxableIncome : Math.min(taxableIncome, max);
      tax += (top - min) * (rate / 100);
    }
    return Math.max(0, tax);
  }

  function getMarginalRate(taxableIncome, brackets) {
    if (taxableIncome <= 0 || !brackets || brackets.length === 0) return 0;
    for (let i = brackets.length - 1; i >= 0; i--) {
      const [min,,rate] = brackets[i];
      if (taxableIncome > min) return rate;
    }
    return 0;
  }

  function calcFICA(agi, filingStatus) {
    const ss = Math.min(agi, FICA.ssWageBase) * FICA.ssRate / 100;
    const med = agi * FICA.medRate / 100;
    const addMedThresh = ADD_MED_THRESH[filingStatus] || 200000;
    const addMed = Math.max(0, agi - addMedThresh) * FICA.addMedRate / 100;
    return { ss, med: med + addMed };
  }

  function fmt(n, symbol) {
    if (!isFinite(n)) return '-';
    const s = symbol !== undefined ? symbol : '$';
    return s + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function fmtRate(n) {
    if (!isFinite(n) || n < 0) return '-';
    return n.toFixed(2) + '%';
  }

  function setHTML(id, html) {
    const node = document.getElementById(id);
    if (node) node.innerHTML = html;
  }
  function setText(id, txt) {
    const node = document.getElementById(id);
    if (node) node.textContent = txt;
  }
  function setClass(id, cls) {
    const node = document.getElementById(id);
    if (node) node.className = cls;
  }

  function parseInput(id) {
    const el = document.getElementById(id);
    if (!el || el.value.trim() === '') return 0;
    const v = parseFloat(el.value.replace(/,/g, '.').replace(/\s/g,''));
    return isNaN(v) || v < 0 ? 0 : v;
  }

  function getFilingStatus() {
    const sel = document.getElementById('itax-filing');
    return sel ? sel.value : 'single';
  }

  function getLocalRate() {
    if (!hasLocalTax) return 0;
    const sel = document.getElementById('itax-local');
    if (sel) return parseFloat(sel.value || '0');
    const custom = document.getElementById('itax-local-custom');
    if (custom && custom.value.trim() !== '') {
      const v = parseFloat(custom.value.replace(',','.'));
      return isNaN(v) ? 0 : v;
    }
    return 0;
  }

  function calculate() {
    const gross = parseInput('itax-gross');
    const preTax = parseInput('itax-pretax-deductions');
    const itemized = parseInput('itax-itemized');
    const postTax = parseInput('itax-posttax-deductions');
    const fs = getFilingStatus();

    if (gross <= 0) {
      document.getElementById('itax-results')?.classList.add('hidden');
      return;
    }

    const agi = Math.max(0, gross - preTax);

    const fedStdDed = FED_STD[fs] || 15000;
    const fedDed = itemized > 0 ? Math.max(itemized, fedStdDed) : fedStdDed;
    const fedTaxable = Math.max(0, agi - fedDed);
    const fedBrackets = FEDERAL_BRACKETS[fs] || FEDERAL_BRACKETS.single;
    const fedTax = applyBrackets(fedTaxable, fedBrackets);
    const fedMarginal = getMarginalRate(fedTaxable, fedBrackets);

    const { ss, med } = calcFICA(agi, fs);
    const ficaTotal = ss + med;

    let stateTax = 0;
    let stateMarginal = 0;
    let stateEffective = 0;
    let localTax = 0;

    if (!noTax) {
      const sStd = stateStd[fs] || 0;
      const sExempt = stateExempt[fs] || 0;
      const sItemized = itemized > 0 ? Math.max(itemized, sStd) : sStd;
      const sTaxable = Math.max(0, agi - sItemized - sExempt);
      const sBrackets = stateBrackets[fs] || stateBrackets.single || [];
      stateTax = applyBrackets(sTaxable, sBrackets);
      stateMarginal = getMarginalRate(sTaxable, sBrackets);
      stateEffective = gross > 0 ? (stateTax / gross) * 100 : 0;

      const localRate = getLocalRate();
      if (localRate > 0) {
        localTax = aTaxable_local(agi) * localRate / 100;
      }
    }

    function aTaxable_local(agi) {
      return Math.max(0, agi);
    }

    const totalTax = fedTax + ficaTotal + stateTax + localTax;
    const afterTax = gross - totalTax - preTax - postTax;
    const effectiveTotal = gross > 0 ? (totalTax / gross) * 100 : 0;
    const fedEffective = gross > 0 ? (fedTax / gross) * 100 : 0;

    setText('itax-res-gross', fmt(gross));
    setText('itax-res-pretax', preTax > 0 ? '-' + fmt(preTax) : '-');
    setText('itax-res-agi', fmt(agi));
    setText('itax-res-fed', fmt(fedTax));
    setText('itax-res-ss', fmt(ss));
    setText('itax-res-med', fmt(med));
    setText('itax-res-fica', fmt(ficaTotal));
    setText('itax-res-state', noTax ? '$0.00' : fmt(stateTax));
    setText('itax-res-local', localTax > 0 ? fmt(localTax) : '-');
    setText('itax-res-total-tax', fmt(totalTax));
    setText('itax-res-posttax', postTax > 0 ? '-' + fmt(postTax) : '-');
    setText('itax-res-takehome', fmt(afterTax));
    setText('itax-res-takehome-mo', fmt(afterTax / 12));
    setText('itax-res-takehome-bw', fmt(afterTax / 26));
    setText('itax-res-effective', fmtRate(effectiveTotal));
    setText('itax-res-fed-eff', fmtRate(fedEffective));
    setText('itax-res-fed-marginal', fmtRate(fedMarginal));
    setText('itax-res-state-marginal', noTax ? '0.00%' : fmtRate(stateMarginal));
    setText('itax-res-state-eff', noTax ? '0.00%' : fmtRate(stateEffective));

    renderBracketBreakdown(fedTaxable, fedBrackets, 'itax-fed-breakdown');
    if (!noTax) {
      const sStd = stateStd[fs] || 0;
      const sExempt = stateExempt[fs] || 0;
      const sItemized = itemized > 0 ? Math.max(itemized, sStd) : sStd;
      const sTaxable = Math.max(0, agi - sItemized - sExempt);
      renderBracketBreakdown(sTaxable, stateBrackets[fs] || stateBrackets.single || [], 'itax-state-breakdown');
    }

    document.getElementById('itax-results')?.classList.remove('hidden');
  }

  function renderBracketBreakdown(taxable, brackets, containerId) {
    const container = document.getElementById(containerId);
    if (!container || !brackets.length) return;
    let rows = '';
    for (const [min, max, rate] of brackets) {
      if (taxable <= min) break;
      const top = max === null ? taxable : Math.min(taxable, max);
      const income = top - min;
      const tax = income * rate / 100;
      const rangeLabel = max === null ? `over $${min.toLocaleString()}` : `$${min.toLocaleString()} - $${max.toLocaleString()}`;
      rows += `<tr><td>${rangeLabel}</td><td>${rate}%</td><td>$${income.toLocaleString('en-US',{maximumFractionDigits:0})}</td><td>$${tax.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</td></tr>`;
    }
    container.innerHTML = rows || '<tr><td colspan="4" style="color:rgba(255,255,255,0.4);font-size:0.82rem">No tax at this income level</td></tr>';
  }

  document.querySelectorAll('.itax-input').forEach(input => {
    input.addEventListener('input', calculate);
  });

  const filingSelect = document.getElementById('itax-filing');
  if (filingSelect) filingSelect.addEventListener('change', calculate);

  const localSelect = document.getElementById('itax-local');
  if (localSelect) localSelect.addEventListener('change', calculate);

  const localCustom = document.getElementById('itax-local-custom');
  if (localCustom) localCustom.addEventListener('input', calculate);

  calculate();
});
