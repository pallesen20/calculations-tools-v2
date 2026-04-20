document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('eutax-calculator');
  if (!el) return;
  const country = el.dataset.country;
  if (country === 'de') initGermany(el);
});

function initGermany(el) {
  const z = JSON.parse(el.dataset.zones || '{}');
  const soc = JSON.parse(el.dataset.social || '{}');
  const soliCfg = JSON.parse(el.dataset.soli || '{}');
  const WERKPAUSCH = parseFloat(el.dataset.werbungskosten || '1230');
  const ENTLAST = parseFloat(el.dataset.entlastungsbetrag || '4260');
  const CUR = el.dataset.currencySymbol || '\u20ac';

  const y_top = (z.z2t - z.gf) / 10000;
  const C3 = (z.a2 * y_top + z.b2) * y_top;
  const z_top = (z.z3t - z.z2t) / 10000;
  const C4 = 0.42 * z.z3t - ((z.a3 * z_top + z.b3) * z_top + C3);
  const C5 = C4 + 0.03 * z.z4t;

  function estCalc(zvE) {
    zvE = Math.floor(zvE);
    if (zvE <= z.gf) return 0;
    if (zvE <= z.z2t) {
      const y = (zvE - z.gf) / 10000;
      return Math.floor((z.a2 * y + z.b2) * y);
    }
    if (zvE <= z.z3t) {
      const zz = (zvE - z.z2t) / 10000;
      return Math.floor((z.a3 * zz + z.b3) * zz + C3);
    }
    if (zvE <= z.z4t) return Math.floor(0.42 * zvE - C4);
    return Math.floor(0.45 * zvE - C5);
  }

  function marginal(zvE) {
    if (zvE <= z.gf) return 0;
    if (zvE <= z.z2t) {
      const y = (zvE - z.gf) / 10000;
      return (2 * z.a2 * y + z.b2) / 10000 * 100;
    }
    if (zvE <= z.z3t) {
      const zz = (zvE - z.z2t) / 10000;
      return (2 * z.a3 * zz + z.b3) / 10000 * 100;
    }
    if (zvE <= z.z4t) return 42;
    return 45;
  }

  function calcSoli(est, taxClass) {
    const thresh = taxClass === '3' ? soliCfg.threshMarried : soliCfg.threshSingle;
    if (est <= thresh) return 0;
    return Math.min((est - thresh) * 0.20, est * 0.055);
  }

  function kirchenRate() {
    const sel = document.getElementById('eutax-state');
    if (!sel) return 0.09;
    const opt = sel.options[sel.selectedIndex];
    return parseFloat(opt.dataset.ks || '0.09');
  }

  function isSaxony() {
    const sel = document.getElementById('eutax-state');
    return sel ? sel.value === 'SN' : false;
  }

  function pvRate(childless) {
    if (isSaxony()) return childless ? soc.pvRateSnChildless : soc.pvRateSnWith;
    return childless ? soc.pvRateChildless : soc.pvRateWith;
  }

  function parseNum(id) {
    const node = document.getElementById(id);
    if (!node || node.value.trim() === '') return 0;
    const v = parseFloat(node.value.replace(/,/g, '.').replace(/\s/g, ''));
    return isNaN(v) || v < 0 ? 0 : v;
  }

  function fmt(n) {
    if (!isFinite(n)) return '-';
    return CUR + Math.abs(n).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function fmtRate(n) {
    if (!isFinite(n) || n < 0) return '-';
    return n.toFixed(2) + '%';
  }

  function setText(id, txt) {
    const node = document.getElementById(id);
    if (node) node.textContent = txt;
  }

  function setDisplay(id, show) {
    const node = document.getElementById(id);
    if (node) node.style.display = show ? '' : 'none';
  }

  function calculate() {
    const period = document.querySelector('input[name="eutax-period"]:checked');
    const periodVal = period ? period.value : 'annual';
    const grossRaw = parseNum('eutax-gross');
    const gross = periodVal === 'monthly' ? grossRaw * 12 : grossRaw;

    if (gross <= 0) {
      document.getElementById('eutax-results')?.classList.add('hidden');
      return;
    }

    const healthType = document.getElementById('eutax-health')?.value || 'public';
    const privateMonthly = parseNum('eutax-private-contrib');
    const privateAnnual = periodVal === 'monthly' ? privateMonthly * 12 : privateMonthly;
    const taxClass = document.getElementById('eutax-tax-class')?.value || '1';
    const hasChurch = document.getElementById('eutax-church')?.checked || false;
    const isChildless = document.getElementById('eutax-childless')?.checked || false;

    let deduction = 0;
    switch (taxClass) {
      case '1': case '4': deduction = WERKPAUSCH; break;
      case '2': deduction = WERKPAUSCH + ENTLAST; break;
      case '3': deduction = WERKPAUSCH; break;
      case '5': case '6': deduction = 0; break;
    }

    let est, zvE;
    if (taxClass === '5' || taxClass === '6') {
      zvE = gross;
      est = estCalc(gross + z.gf);
    } else if (taxClass === '3') {
      zvE = Math.max(0, gross - deduction);
      est = estCalc(zvE / 2) * 2;
    } else {
      zvE = Math.max(0, gross - deduction);
      est = estCalc(zvE);
    }

    const soli = calcSoli(est, taxClass);
    const ks = hasChurch ? kirchenRate() : 0;
    const kirchensteuer = hasChurch ? Math.floor(ks * est) : 0;

    const rv = soc.rvRate * Math.min(gross, soc.rvCeiling);
    const av = soc.avRate * Math.min(gross, soc.avCeiling);

    let kv;
    if (healthType === 'public') {
      kv = soc.kvPublicRate * Math.min(gross, soc.kvCeiling);
    } else if (healthType === 'private-self') {
      kv = privateAnnual;
    } else {
      const maxEmployer = 0.073 * Math.min(gross, soc.kvCeiling);
      kv = Math.max(0, privateAnnual - Math.min(privateAnnual / 2, maxEmployer));
    }

    const pv = pvRate(isChildless) * Math.min(gross, soc.kvCeiling);

    const totalTaxes = est + soli + kirchensteuer;
    const totalSocial = rv + kv + pv + av;
    const totalDeductions = totalTaxes + totalSocial;
    const annualNet = gross - totalDeductions;

    const effIncomeTax = gross > 0 ? (est / gross) * 100 : 0;
    const marginalIncomeTax = taxClass === '5' || taxClass === '6'
      ? marginal(gross + z.gf)
      : taxClass === '3'
        ? marginal(zvE / 2)
        : marginal(zvE);
    const effTotal = gross > 0 ? (totalDeductions / gross) * 100 : 0;

    const pvLabel = isSaxony()
      ? `Long-term care (PV ${(pvRate(isChildless) * 100).toFixed(1)}% - Saxony)`
      : `Long-term care (PV ${(pvRate(isChildless) * 100).toFixed(1)}%)`;
    setText('eutax-pv-label', pvLabel);

    setText('eutax-res-gross', fmt(gross));
    setText('eutax-res-zve', fmt(zvE > 0 ? zvE : gross));
    setText('eutax-res-est', fmt(est));
    setText('eutax-res-est-rates', fmtRate(effIncomeTax) + ' / ' + fmtRate(marginalIncomeTax));
    setText('eutax-res-soli', soli > 0 ? fmt(soli) : '\u2014');
    setText('eutax-res-kirche', kirchensteuer > 0 ? fmt(kirchensteuer) : '\u2014');
    setText('eutax-res-total-taxes', fmt(totalTaxes));
    setText('eutax-res-rv', fmt(rv));
    setText('eutax-res-kv', fmt(kv));
    setText('eutax-res-pv', fmt(pv));
    setText('eutax-res-av', fmt(av));
    setText('eutax-res-total-social', fmt(totalSocial));
    setText('eutax-res-total', fmt(totalDeductions));
    setText('eutax-res-eff', fmtRate(effTotal));
    setText('eutax-res-net-annual', fmt(annualNet));
    setText('eutax-res-net-monthly', fmt(annualNet / 12));

    setDisplay('eutax-row-soli', soli > 0);
    setDisplay('eutax-row-kirche', hasChurch);

    document.getElementById('eutax-results')?.classList.remove('hidden');
  }

  document.querySelectorAll('.eutax-input').forEach(inp => inp.addEventListener('input', calculate));
  document.querySelectorAll('select[id^="eutax-"]').forEach(s => s.addEventListener('change', calculate));
  document.querySelectorAll('input[name="eutax-period"]').forEach(r => r.addEventListener('change', calculate));

  const churchCheck = document.getElementById('eutax-church');
  if (churchCheck) churchCheck.addEventListener('change', calculate);

  const childlessCheck = document.getElementById('eutax-childless');
  if (childlessCheck) childlessCheck.addEventListener('change', calculate);

  const healthSel = document.getElementById('eutax-health');
  const privateField = document.getElementById('eutax-private-field');
  if (healthSel && privateField) {
    function togglePrivate() {
      const isPrivate = healthSel.value !== 'public';
      privateField.style.display = isPrivate ? '' : 'none';
    }
    healthSel.addEventListener('change', () => { togglePrivate(); calculate(); });
    togglePrivate();
  }

  const stateSelect = document.getElementById('eutax-state');
  if (stateSelect) stateSelect.addEventListener('change', calculate);

  calculate();
}
