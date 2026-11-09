document.addEventListener('DOMContentLoaded', () => {
  const LOCALE_CURRENCY = {
    'en-US': 'USD', 'en-CA': 'CAD', 'en-GB': 'GBP', 'en-AU': 'AUD',
    'en-NZ': 'NZD', 'da-DK': 'DKK', 'sv-SE': 'SEK', 'nb-NO': 'NOK',
    'fi-FI': 'EUR', 'de-DE': 'EUR', 'fr-FR': 'EUR', 'it-IT': 'EUR',
    'es-ES': 'EUR', 'nl-NL': 'EUR', 'pt-PT': 'EUR', 'ja-JP': 'JPY',
    'zh-CN': 'CNY', 'ko-KR': 'KRW', 'pt-BR': 'BRL', 'hi-IN': 'INR',
    'pl-PL': 'PLN', 'cs-CZ': 'CZK', 'hu-HU': 'HUF', 'tr-TR': 'TRY',
    'ru-RU': 'RUB', 'ar-SA': 'SAR', 'zh-TW': 'TWD', 'id-ID': 'IDR',
  };
  const CURRENCIES = {
    USD: { symbol: '$',   name: '$ USD' },
    EUR: { symbol: '€',   name: '€ EUR' },
    GBP: { symbol: '£',   name: '£ GBP' },
    CAD: { symbol: '$',   name: '$ CAD' },
    AUD: { symbol: '$',   name: '$ AUD' },
    NZD: { symbol: '$',   name: '$ NZD' },
    SEK: { symbol: 'kr',  name: 'kr SEK' },
    DKK: { symbol: 'kr',  name: 'kr DKK' },
    NOK: { symbol: 'kr',  name: 'kr NOK' },
    CHF: { symbol: 'CHF', name: 'CHF CHF' },
    JPY: { symbol: '¥',   name: '¥ JPY' },
    CNY: { symbol: '¥',   name: '¥ CNY' },
    KRW: { symbol: '₩',   name: '₩ KRW' },
    INR: { symbol: '₹',   name: '₹ INR' },
    BRL: { symbol: 'R$',  name: 'R$ BRL' },
    MXN: { symbol: '$',   name: '$ MXN' },
    PLN: { symbol: 'zł',  name: 'zł PLN' },
  };

  const currencySelect = document.getElementById('bs-currency');
  if (!currencySelect) return;

  const locale = navigator.language || 'en-US';
  const detectedCode = LOCALE_CURRENCY[locale] || LOCALE_CURRENCY[locale.slice(0, 2)] || 'USD';
  Object.entries(CURRENCIES).forEach(([code, { name }]) => {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = name;
    if (code === detectedCode) opt.selected = true;
    currencySelect.appendChild(opt);
  });

  function sym() { return CURRENCIES[currencySelect.value]?.symbol || '$'; }
  function fmt(n) { return sym() + n.toFixed(2); }

  let mode = 'equal';
  let people = [
    { id: 1, name: 'Person 1', amount: '' },
    { id: 2, name: 'Person 2', amount: '' },
  ];
  let nextId = 3;

  const totalInput    = document.getElementById('bs-total');
  const tipInput      = document.getElementById('bs-tip');
  const taxInput      = document.getElementById('bs-tax');
  const countInput    = document.getElementById('bs-count');
  const minusBtn      = document.getElementById('bs-count-minus');
  const plusBtn       = document.getElementById('bs-count-plus');
  const modeEqualBtn  = document.getElementById('bs-mode-equal');
  const modeCustomBtn = document.getElementById('bs-mode-custom');
  const equalSection  = document.getElementById('bs-equal-section');
  const customSection = document.getElementById('bs-custom-section');
  const addPersonBtn  = document.getElementById('bs-add-person');
  const peopleList    = document.getElementById('bs-people-list');
  const resultEl      = document.getElementById('bs-result');

  document.querySelectorAll('.bs-tip-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      tipInput.value = btn.dataset.tip;
      document.querySelectorAll('.bs-tip-preset').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calculate();
    });
  });

  tipInput.addEventListener('input', () => {
    document.querySelectorAll('.bs-tip-preset').forEach(b => b.classList.remove('active'));
    calculate();
  });

  modeEqualBtn.addEventListener('click', () => {
    mode = 'equal';
    modeEqualBtn.classList.add('active');
    modeCustomBtn.classList.remove('active');
    equalSection.style.display = '';
    customSection.style.display = 'none';
    calculate();
  });

  modeCustomBtn.addEventListener('click', () => {
    mode = 'custom';
    modeCustomBtn.classList.add('active');
    modeEqualBtn.classList.remove('active');
    equalSection.style.display = 'none';
    customSection.style.display = '';
    renderPeople();
    calculate();
  });

  minusBtn.addEventListener('click', () => {
    const v = parseInt(countInput.value) || 2;
    if (v > 2) { countInput.value = v - 1; calculate(); }
  });

  plusBtn.addEventListener('click', () => {
    const v = parseInt(countInput.value) || 2;
    if (v < 20) { countInput.value = v + 1; calculate(); }
  });

  addPersonBtn.addEventListener('click', () => {
    if (people.length >= 20) return;
    people.push({ id: nextId++, name: `Person ${people.length + 1}`, amount: '' });
    renderPeople();
    calculate();
  });

  [totalInput, taxInput, countInput].forEach(el => {
    el.addEventListener('input', calculate);
  });

  currencySelect.addEventListener('change', calculate);

  function renderPeople() {
    peopleList.innerHTML = '';
    people.forEach(person => {
      const row = document.createElement('div');
      row.className = 'bs-person-row';
      row.innerHTML = `
        <div class="bmi-input-wrap bs-name-wrap">
          <input type="text" class="bmi-input bs-name-input" placeholder="Name" value="${person.name}" />
        </div>
        <div class="bmi-input-wrap bs-amt-wrap">
          <input type="text" inputmode="decimal" class="bmi-input bs-amt-input" placeholder="Amount" value="${person.amount}" />
        </div>
        ${people.length > 2 ? `<button class="bs-remove-btn" aria-label="Remove person">×</button>` : ''}
      `;
      row.querySelector('.bs-name-input').addEventListener('input', e => {
        person.name = e.target.value;
        calculate();
      });
      row.querySelector('.bs-amt-input').addEventListener('input', e => {
        person.amount = e.target.value;
        calculate();
      });
      const removeBtn = row.querySelector('.bs-remove-btn');
      if (removeBtn) {
        removeBtn.addEventListener('click', () => {
          people = people.filter(p => p.id !== person.id);
          renderPeople();
          calculate();
        });
      }
      peopleList.appendChild(row);
    });
  }

  function calculate() {
    const total  = parseFloat(totalInput.value) || 0;
    const tipPct = parseFloat(tipInput.value) || 0;
    const taxPct = parseFloat(taxInput.value) || 0;

    if (total <= 0) { resultEl.innerHTML = ''; return; }

    const tipAmt = total * tipPct / 100;
    const taxAmt = total * taxPct / 100;
    const grand  = total + tipAmt + taxAmt;

    if (mode === 'equal') {
      const count = Math.max(2, Math.min(20, parseInt(countInput.value) || 2));
      const each  = grand / count;
      const tipEa = tipAmt / count;
      const taxEa = taxAmt / count;

      resultEl.innerHTML = `
        <div class="bs-result-card">
          <div class="bs-per-person-label">Each person pays</div>
          <div class="bs-per-person-amount">${fmt(each)}</div>
          <div class="bs-per-person-meta">${count} people · ${fmt(grand)} total</div>
        </div>
        <div class="bs-breakdown">
          <div class="bs-breakdown-row"><span>Subtotal</span><span>${fmt(total)}</span></div>
          ${tipAmt > 0 ? `<div class="bs-breakdown-row"><span>Tip (${tipPct}%)</span><span>${fmt(tipAmt)}</span></div>` : ''}
          ${taxAmt > 0 ? `<div class="bs-breakdown-row"><span>Tax (${taxPct}%)</span><span>${fmt(taxAmt)}</span></div>` : ''}
          <div class="bs-breakdown-row bs-breakdown-total"><span>Grand total</span><span>${fmt(grand)}</span></div>
          ${tipAmt > 0 ? `<div class="bs-breakdown-row bs-breakdown-muted"><span>Tip per person</span><span>${fmt(tipEa)}</span></div>` : ''}
          ${taxAmt > 0 ? `<div class="bs-breakdown-row bs-breakdown-muted"><span>Tax per person</span><span>${fmt(taxEa)}</span></div>` : ''}
        </div>
      `;
    } else {
      const allocated = people.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
      const remaining = total - allocated;
      const balanced  = Math.abs(remaining) < 0.005;

      let cards = '';
      people.forEach(p => {
        const pAmt   = parseFloat(p.amount) || 0;
        const ratio  = total > 0 ? pAmt / total : 0;
        const pTip   = tipAmt * ratio;
        const pTax   = taxAmt * ratio;
        const pTotal = pAmt + pTip + pTax;
        const name   = p.name || 'Person';
        cards += `
          <div class="bs-person-result">
            <div class="bs-person-result-name">${name}</div>
            <div class="bs-person-result-amount">${pAmt > 0 ? fmt(pTotal) : '-'}</div>
            ${(tipAmt > 0 || taxAmt > 0) && pAmt > 0
              ? `<div class="bs-person-result-meta">food: ${fmt(pAmt)} + tip/tax: ${fmt(pTip + pTax)}</div>`
              : ''
            }
          </div>
        `;
      });

      const statusClass = balanced ? 'bs-status-ok' : 'bs-status-warn';
      const statusText  = balanced
        ? `All ${fmt(total)} allocated`
        : remaining > 0
          ? `${fmt(Math.abs(remaining))} left to allocate`
          : `${fmt(Math.abs(remaining))} over-allocated`;

      resultEl.innerHTML = `
        <div class="bs-custom-cards">${cards}</div>
        <div class="bs-status ${statusClass}">${statusText}</div>
        <div class="bs-breakdown">
          <div class="bs-breakdown-row"><span>Subtotal</span><span>${fmt(total)}</span></div>
          ${tipAmt > 0 ? `<div class="bs-breakdown-row"><span>Tip (${tipPct}%)</span><span>${fmt(tipAmt)}</span></div>` : ''}
          ${taxAmt > 0 ? `<div class="bs-breakdown-row"><span>Tax (${taxPct}%)</span><span>${fmt(taxAmt)}</span></div>` : ''}
          <div class="bs-breakdown-row bs-breakdown-total"><span>Grand total</span><span>${fmt(grand)}</span></div>
        </div>
      `;
    }
  }

  renderPeople();
});
