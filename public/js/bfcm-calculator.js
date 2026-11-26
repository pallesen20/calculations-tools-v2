document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id);
  const getNum = (id, fallback = 0) => {
    const v = parseFloat(($(id)?.value || '').replace(',', '.'));
    return isFinite(v) ? v : fallback;
  };
  const fmtN = (n, d = 0) => isFinite(n) ? n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }) : '-';
  let currency = '$';
  const fmtM = n => {
    if (!isFinite(n)) return '-';
    return (n < 0 ? '-' + currency : currency) + fmtN(Math.abs(n));
  };
  const setText = (id, v) => { const el = $(id); if (el) el.textContent = v; };
  const setHTML = (id, v) => { const el = $(id); if (el) el.innerHTML = v; };
  const show = id => { const el = $(id); if (el) el.classList.remove('hidden'); };
  const hide = id => { const el = $(id); if (el) el.classList.add('hidden'); };
  const setCls = (id, cls) => { const el = $(id); if (el) el.className = cls; };

  function margins(price, marginPct, discountPct) {
    const margin = marginPct / 100;
    const discount = discountPct / 100;
    const cogs = price * (1 - margin);
    const gpFull = price * margin;
    const discPrice = price * (1 - discount);
    const gpDisc = discPrice - cogs;
    const beePct = gpDisc > 0 ? (gpFull / gpDisc - 1) * 100 : Infinity;
    return { cogs, gpFull, gpDisc, discPrice, beePct };
  }

  function runQuick() {
    const price = getNum('bfcm-price');
    const marginPct = getNum('bfcm-margin');
    const discountPct = getNum('bfcm-discount');
    const normalUnits = getNum('bfcm-normal-units');
    const saleUnits = getNum('bfcm-sale-units');

    if (!price || !marginPct || !discountPct) {
      hide('bfcm-q-result');
      hide('bfcm-scenario-wrap');
      return;
    }

    const { cogs, gpFull, gpDisc, discPrice, beePct } = margins(price, marginPct, discountPct);
    const impossible = gpDisc <= 0;

    setText('bfcm-q-discprice', fmtM(discPrice));
    setText('bfcm-q-cogs', fmtM(cogs));
    setText('bfcm-q-gpfull', fmtM(gpFull));
    setText('bfcm-q-gpdisc', impossible ? currency + '0 or below' : fmtM(gpDisc));
    setText('bfcm-q-bee', impossible ? 'Never profitable' : '+' + fmtN(beePct, 0) + '% more orders');

    if (!impossible && normalUnits > 0) {
      const normalProfit = normalUnits * gpFull;
      const beeUnits = Math.ceil(normalProfit / gpDisc);
      setText('bfcm-q-normal-profit', fmtM(normalProfit));
      setText('bfcm-q-bee-units', fmtN(beeUnits) + ' orders');
      show('bfcm-q-volume-wrap');

      if (saleUnits > 0) {
        const saleProfit = saleUnits * gpDisc;
        const delta = saleProfit - normalProfit;
        setText('bfcm-q-sale-profit', fmtM(saleProfit));
        setText('bfcm-q-delta', (delta >= 0 ? '+' : '') + fmtM(delta) + ' vs. regular weekend');
        const v = saleProfit > normalProfit
          ? ['Profitable vs. regular weekend', 'bfcm-verdict-badge bfcm-verdict-pass']
          : saleProfit > 0
          ? ['Below regular weekend profit', 'bfcm-verdict-badge bfcm-verdict-warn']
          : ['Loss-making', 'bfcm-verdict-badge bfcm-verdict-fail'];
        setHTML('bfcm-q-verdict', v[0]);
        setCls('bfcm-q-verdict', v[1]);
        show('bfcm-q-verdict');
      } else {
        hide('bfcm-q-verdict');
      }
    } else {
      hide('bfcm-q-volume-wrap');
      hide('bfcm-q-verdict');
      if (impossible) {
        setHTML('bfcm-q-verdict', 'Never profitable at this discount');
        setCls('bfcm-q-verdict', 'bfcm-verdict-badge bfcm-verdict-fail');
        show('bfcm-q-verdict');
      }
    }

    show('bfcm-q-result');
    runScenario(price, marginPct, discountPct, normalUnits, saleUnits);
    runFull();
  }

  function runScenario(price, marginPct, discountPct, normalUnits, saleUnits) {
    if (!price || !marginPct) { hide('bfcm-scenario-wrap'); return; }

    const depths = [5, 10, 15, 20, 25, 30, 40, 50];
    const gpFull = price * (marginPct / 100);
    const normalProfit = normalUnits > 0 ? normalUnits * gpFull : null;
    const hasProfit = saleUnits > 0;

    let headerExtra = hasProfit ? `<th>Profit at ${fmtN(saleUnits)} orders</th>` : '';

    let rows = '';
    for (const d of depths) {
      const { gpDisc, discPrice, beePct } = margins(price, marginPct, d);
      const impossible = gpDisc <= 0;
      const isCurrent = Math.abs(d - discountPct) < 0.5;
      const cls = isCurrent ? ' class="bfcm-row-current"' : '';

      const beeUnitsText = impossible ? '∞'
        : normalProfit !== null ? fmtN(Math.ceil(normalProfit / gpDisc))
        : '-';

      let profitCell = '';
      let verdictText = '';
      let verdictCls = '';

      if (hasProfit) {
        const sp = impossible ? null : saleUnits * gpDisc;
        profitCell = `<td>${impossible ? '-' : fmtM(sp)}</td>`;
        if (impossible) { verdictText = 'Impossible'; verdictCls = 'bfcm-tbl-fail'; }
        else if (normalProfit !== null) {
          verdictText = sp >= normalProfit ? 'Profitable' : 'Below target';
          verdictCls = sp >= normalProfit ? 'bfcm-tbl-pass' : 'bfcm-tbl-warn';
        } else {
          verdictText = sp > 0 ? 'Positive' : 'Loss';
          verdictCls = sp > 0 ? 'bfcm-tbl-pass' : 'bfcm-tbl-fail';
        }
      } else {
        verdictText = impossible ? 'Impossible' : '-';
        verdictCls = impossible ? 'bfcm-tbl-fail' : '';
      }

      rows += `<tr${cls}>
        <td>${d}%${isCurrent ? ' ★' : ''}</td>
        <td>${fmtM(discPrice)}</td>
        <td>${impossible ? currency + '0 or below' : fmtM(gpDisc)}</td>
        <td>${impossible ? '∞' : '+' + fmtN(beePct, 0) + '%'}</td>
        <td>${beeUnitsText}</td>
        ${profitCell}
        <td class="${verdictCls}">${verdictText}</td>
      </tr>`;
    }

    const container = $('bfcm-scenario-container');
    if (!container) return;
    container.innerHTML = `<div class="responsive-table"><table>
      <thead>
        <tr>
          <th>Discount</th>
          <th>Price</th>
          <th>GP/order</th>
          <th>Break-even lift</th>
          <th>${normalUnits > 0 ? 'Break-even orders' : 'Break-even orders'}</th>
          ${headerExtra}
          <th>Verdict</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table></div>`;

    show('bfcm-scenario-wrap');
  }

  function runFull() {
    const price = getNum('bfcm-price');
    const marginPct = getNum('bfcm-margin');
    const discountPct = getNum('bfcm-discount');
    const saleUnits = getNum('bfcm-sale-units');

    if (!price || !marginPct || !discountPct || !saleUnits) {
      hide('bfcm-f-result');
      return;
    }

    const { cogs, gpFull, gpDisc, discPrice } = margins(price, marginPct, discountPct);

    const fulfillment = getNum('bfcm-fulfillment');
    const paymentFee = getNum('bfcm-payment-fee', 3) / 100;
    const returnRate = getNum('bfcm-return-rate', 10) / 100;
    const reverseCost = getNum('bfcm-reverse-cost', 8);
    const cannibalization = getNum('bfcm-cannibalization', 25) / 100;
    const adSpend = getNum('bfcm-ad-spend');
    const newCustomerPct = getNum('bfcm-new-customer-pct', 57) / 100;
    const repeatRate = getNum('bfcm-repeat-rate', 14) / 100;
    const ltvOrder = getNum('bfcm-ltv-order');

    const totalRevenue = saleUnits * discPrice;
    const totalCOGS = saleUnits * cogs;
    const totalGP = saleUnits * gpDisc;

    const paymentFeePerOrder = discPrice * paymentFee;
    const returnCostPerOrder = returnRate * (cogs + reverseCost);

    const totalFulfillment = saleUnits * fulfillment;
    const totalPaymentFees = saleUnits * paymentFeePerOrder;
    const totalReturnCost = saleUnits * returnCostPerOrder;

    const contribBeforeCanni = totalGP - totalFulfillment - totalPaymentFees - totalReturnCost - adSpend;

    const cannibalizedOrders = saleUnits * cannibalization;
    const cannibalizationCost = cannibalizedOrders * gpFull;

    const campaignProfit = contribBeforeCanni - cannibalizationCost;

    const newCustomers = saleUnits * newCustomerPct;
    const ltvContribution = ltvOrder > 0 ? newCustomers * repeatRate * ltvOrder * (marginPct / 100) : 0;

    const totalValue = campaignProfit + ltvContribution;

    setText('bfcm-f-revenue', fmtM(totalRevenue));
    setText('bfcm-f-cogs', fmtM(-totalCOGS));
    setText('bfcm-f-gp', fmtM(totalGP));
    setText('bfcm-f-fulfillment', totalFulfillment > 0 ? fmtM(-totalFulfillment) : '-');
    setText('bfcm-f-fees', fmtM(-totalPaymentFees));
    setText('bfcm-f-returns', fmtM(-totalReturnCost));
    setText('bfcm-f-adspend', adSpend > 0 ? fmtM(-adSpend) : '-');
    setText('bfcm-f-precan', fmtM(contribBeforeCanni));
    setText('bfcm-f-canncost', fmtM(-cannibalizationCost));
    setText('bfcm-f-day0', fmtM(campaignProfit));

    const day0El = $('bfcm-f-day0');
    if (day0El) day0El.className = 'bfcm-pl-val ' + (campaignProfit >= 0 ? 'bfcm-pl-pos' : 'bfcm-pl-neg');

    if (ltvOrder > 0) {
      setText('bfcm-f-ltv', '+' + fmtM(ltvContribution));
      show('bfcm-f-ltv-row');
    } else {
      hide('bfcm-f-ltv-row');
    }

    setText('bfcm-f-total', fmtM(totalValue));
    const totalEl = $('bfcm-f-total');
    if (totalEl) totalEl.className = 'bfcm-pl-total-val ' + (totalValue >= 0 ? 'bfcm-pl-pos' : 'bfcm-pl-neg');

    const ltvSaves = campaignProfit < 0 && totalValue > 0;
    const v = campaignProfit >= 0
      ? ['Profitable on day 0', 'bfcm-verdict-badge bfcm-verdict-pass']
      : ltvSaves
      ? ['Profitable only with LTV', 'bfcm-verdict-badge bfcm-verdict-warn']
      : ['Loss-making', 'bfcm-verdict-badge bfcm-verdict-fail'];
    setHTML('bfcm-f-verdict', v[0]);
    setCls('bfcm-f-verdict', v[1]);

    if (campaignProfit < 0) {
      const effectivePerOrder = gpDisc - fulfillment - paymentFeePerOrder - returnCostPerOrder - gpFull * cannibalization;

      if (effectivePerOrder > 0) {
        const beeUnits = Math.ceil(adSpend / effectivePerOrder);
        setText('bfcm-fix-units', fmtN(beeUnits) + ' orders');
        const delta = beeUnits - saleUnits;
        setText('bfcm-fix-units-note', delta > 0
          ? '+' + fmtN(delta) + ' more than your expected ' + fmtN(saleUnits)
          : 'You already exceed break-even volume');
      } else {
        setText('bfcm-fix-units', 'Not achievable');
        setText('bfcm-fix-units-note', 'Variable costs exceed revenue per order at this discount');
      }

      let maxDisc = null;
      for (let d = discountPct - 0.5; d >= 1; d -= 0.5) {
        const { gpDisc: gd, discPrice: dp } = margins(price, marginPct, d);
        const pf = dp * paymentFee;
        const rc = returnRate * (cogs + reverseCost);
        const ec = gd - fulfillment - pf - rc - gpFull * cannibalization;
        if (saleUnits * ec - adSpend >= 0) { maxDisc = d; break; }
      }

      if (maxDisc !== null) {
        setText('bfcm-fix-discount', fmtN(maxDisc, 1) + '% or less');
        setText('bfcm-fix-discount-note', 'Cut from ' + fmtN(discountPct, 0) + '% - reduces revenue by ' + fmtM((discountPct - maxDisc) / 100 * price * saleUnits));
      } else {
        setText('bfcm-fix-discount', 'No discount depth works');
        setText('bfcm-fix-discount-note', 'Reduce fixed costs or COGS before running a sale');
      }

      show('bfcm-fixit-wrap');
    } else {
      hide('bfcm-fixit-wrap');
    }

    show('bfcm-f-result');
  }

  ['bfcm-price', 'bfcm-margin', 'bfcm-discount', 'bfcm-normal-units', 'bfcm-sale-units'].forEach(id => {
    $(id)?.addEventListener('input', runQuick);
  });

  ['bfcm-fulfillment', 'bfcm-payment-fee', 'bfcm-return-rate', 'bfcm-reverse-cost',
   'bfcm-cannibalization', 'bfcm-ad-spend', 'bfcm-new-customer-pct', 'bfcm-repeat-rate', 'bfcm-ltv-order'
  ].forEach(id => {
    $(id)?.addEventListener('input', runFull);
  });

  document.querySelectorAll('.bfcm-currency-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.bfcm-currency-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currency = btn.dataset.currency;
      document.querySelectorAll('.bfcm-currency-symbol').forEach(el => {
        el.textContent = currency + (el.dataset.suffix || '');
      });
      runQuick();
    });
  });
});
