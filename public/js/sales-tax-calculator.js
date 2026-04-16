document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('stax-calculator');
  if (!el) return;

  const defaultRate = parseFloat(el.dataset.rate) || 0;
  const stateSlug = el.dataset.slug || '';
  let mode = 'add';
  let zipRate = null;

  const STATE_INFO = {
    ak: ['Alaska', 'alaska'], al: ['Alabama', 'alabama'],
    ar: ['Arkansas', 'arkansas'], az: ['Arizona', 'arizona'],
    ca: ['California', 'california'], co: ['Colorado', 'colorado'],
    ct: ['Connecticut', 'connecticut'], de: ['Delaware', 'delaware'],
    fl: ['Florida', 'florida'], ga: ['Georgia', 'georgia'],
    hi: ['Hawaii', 'hawaii'], ia: ['Iowa', 'iowa'],
    id: ['Idaho', 'idaho'], il: ['Illinois', 'illinois'],
    in: ['Indiana', 'indiana'], ks: ['Kansas', 'kansas'],
    ky: ['Kentucky', 'kentucky'], la: ['Louisiana', 'louisiana'],
    ma: ['Massachusetts', 'massachusetts'], md: ['Maryland', 'maryland'],
    me: ['Maine', 'maine'], mi: ['Michigan', 'michigan'],
    mn: ['Minnesota', 'minnesota'], mo: ['Missouri', 'missouri'],
    ms: ['Mississippi', 'mississippi'], mt: ['Montana', 'montana'],
    nc: ['North Carolina', 'north-carolina'], nd: ['North Dakota', 'north-dakota'],
    ne: ['Nebraska', 'nebraska'], nh: ['New Hampshire', 'new-hampshire'],
    nj: ['New Jersey', 'new-jersey'], nm: ['New Mexico', 'new-mexico'],
    nv: ['Nevada', 'nevada'], ny: ['New York', 'new-york'],
    oh: ['Ohio', 'ohio'], ok: ['Oklahoma', 'oklahoma'],
    or: ['Oregon', 'oregon'], pa: ['Pennsylvania', 'pennsylvania'],
    ri: ['Rhode Island', 'rhode-island'], sc: ['South Carolina', 'south-carolina'],
    sd: ['South Dakota', 'south-dakota'], tn: ['Tennessee', 'tennessee'],
    tx: ['Texas', 'texas'], ut: ['Utah', 'utah'],
    va: ['Virginia', 'virginia'], vt: ['Vermont', 'vermont'],
    wa: ['Washington', 'washington'], wi: ['Wisconsin', 'wisconsin'],
    wv: ['West Virginia', 'west-virginia'], wy: ['Wyoming', 'wyoming']
  };

  function getRate() {
    if (zipRate !== null) return zipRate;
    const override = document.getElementById('stax-rate-override');
    if (override && override.value.trim() !== '') {
      const v = parseFloat(override.value.replace(',', '.'));
      if (!isNaN(v) && v >= 0 && v <= 25) return v;
    }
    return defaultRate;
  }

  function fmt(n) {
    return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function setText(id, val) {
    const node = document.getElementById(id);
    if (node) node.textContent = val;
  }

  function clearAdd() {
    setText('stax-tax-amount', '-');
    setText('stax-total-price', '-');
    setText('stax-rate-used', '-');
  }

  function clearReverse() {
    setText('stax-pretax-result', '-');
    setText('stax-tax-result', '-');
    setText('stax-rate-used-rev', '-');
  }

  function calculateAdd() {
    const price = parseFloat(document.getElementById('stax-pretax').value.replace(',', '.'));
    if (isNaN(price) || price < 0) { clearAdd(); return; }
    const rate = getRate() / 100;
    const tax = price * rate;
    const total = price + tax;
    setText('stax-tax-amount', '$' + fmt(tax));
    setText('stax-total-price', '$' + fmt(total));
    setText('stax-rate-used', getRate().toFixed(3) + '%');
  }

  function calculateReverse() {
    const total = parseFloat(document.getElementById('stax-total-input').value.replace(',', '.'));
    if (isNaN(total) || total < 0) { clearReverse(); return; }
    const rate = getRate() / 100;
    const pretax = total / (1 + rate);
    const tax = total - pretax;
    setText('stax-pretax-result', '$' + fmt(pretax));
    setText('stax-tax-result', '$' + fmt(tax));
    setText('stax-rate-used-rev', getRate().toFixed(3) + '%');
  }

  function calculate() {
    if (mode === 'add') { calculateAdd(); } else { calculateReverse(); }
  }

  document.querySelectorAll('.stax-mode-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      mode = this.dataset.mode;
      document.querySelectorAll('.stax-mode-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const addPanel = document.getElementById('stax-add-panel');
      const revPanel = document.getElementById('stax-reverse-panel');
      if (addPanel) addPanel.style.display = mode === 'add' ? '' : 'none';
      if (revPanel) revPanel.style.display = mode === 'reverse' ? '' : 'none';
      calculate();
    });
  });

  ['stax-pretax', 'stax-total-input', 'stax-rate-override'].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.addEventListener('input', calculate);
  });

  const zipInput = document.getElementById('stax-zip');
  const zipStatus = document.getElementById('stax-zip-status');

  function setZipStatus(msg, type) {
    if (!zipStatus) return;
    zipStatus.textContent = msg;
    zipStatus.className = 'stax-zip-status' + (type ? ' stax-zip-' + type : '');
  }

  function showZipRedirect(abbr) {
    const info = STATE_INFO[abbr];
    if (!info) return;
    const link = document.getElementById('stax-zip-redirect');
    if (!link) return;
    link.href = '/tax/sales-tax-calculator/us/' + info[1];
    link.textContent = 'Calculate ' + info[0] + ' sales tax \u2192';
    link.style.display = '';
  }

  function hideZipRedirect() {
    const link = document.getElementById('stax-zip-redirect');
    if (link) link.style.display = 'none';
  }

  let zipCache = null;
  let zipFetchPending = false;
  let prefixData = null;
  let prefixFetchPromise = null;

  function fetchPrefixData() {
    if (prefixData) return Promise.resolve(prefixData);
    if (prefixFetchPromise) return prefixFetchPromise;
    prefixFetchPromise = fetch('/data/zip-prefixes.json')
      .then(r => r.ok ? r.json() : {})
      .then(data => { prefixData = data; return data; })
      .catch(() => { prefixData = {}; return {}; });
    return prefixFetchPromise;
  }

  function applyZipData(zip, data) {
    if (!data) {
      setZipStatus('ZIP data unavailable. Using state average.', 'warn');
      zipRate = null;
      calculate();
      return;
    }

    if (data.uniform) {
      zipRate = data.default;
      const overrideWrap = document.getElementById('stax-override-wrap');
      if (overrideWrap) overrideWrap.style.display = 'none';
      setZipStatus('Uniform statewide rate: ' + zipRate.toFixed(3) + '%', 'ok');
      calculate();
      return;
    }

    const entry = data.zips && data.zips[zip];
    const overrideWrap = document.getElementById('stax-override-wrap');

    if (entry) {
      zipRate = entry.rate;
      if (overrideWrap) overrideWrap.style.display = 'none';
      setZipStatus(entry.city + ': ' + zipRate.toFixed(3) + '%', 'ok');
    } else {
      zipRate = null;
      if (overrideWrap) overrideWrap.style.display = '';
      setZipStatus('No exact match - using the state average of ' + defaultRate + '%. Enter your exact rate below if you know it.', 'warn');
    }
    calculate();
  }

  function lookupZip(zip) {
    if (zipCache) {
      applyZipData(zip, zipCache);
      return;
    }

    if (zipFetchPending) return;
    zipFetchPending = true;
    setZipStatus('Looking up ZIP code...', 'loading');

    fetch('/data/zip-tax/' + stateSlug + '.json')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        zipCache = data;
        zipFetchPending = false;
        applyZipData(zip, data);
      })
      .catch(() => {
        zipFetchPending = false;
        setZipStatus('Could not load ZIP data. Using state average.', 'warn');
        zipRate = null;
        calculate();
      });
  }

  function handleZipInput(val) {
    hideZipRedirect();

    if (val.length !== 5) {
      zipRate = null;
      setZipStatus('', '');
      const overrideWrap = document.getElementById('stax-override-wrap');
      if (overrideWrap) overrideWrap.style.display = '';
      calculate();
      return;
    }

    fetchPrefixData().then(prefixes => {
      const zipState = prefixes[val.substring(0, 3)];
      if (zipState && zipState !== stateSlug) {
        const stateName = STATE_INFO[zipState] ? STATE_INFO[zipState][0] : zipState.toUpperCase();
        setZipStatus('That ZIP is in ' + stateName + '.', 'warn');
        showZipRedirect(zipState);
        zipRate = null;
        const overrideWrap = document.getElementById('stax-override-wrap');
        if (overrideWrap) overrideWrap.style.display = '';
        calculate();
        return;
      }
      lookupZip(val);
    });
  }

  if (zipInput) {
    zipInput.addEventListener('input', function () {
      const val = this.value.replace(/\D/g, '').slice(0, 5);
      this.value = val;
      handleZipInput(val);
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const urlAmount = urlParams.get('amount');
  if (urlAmount && !isNaN(parseFloat(urlAmount))) {
    const pretaxEl = document.getElementById('stax-pretax');
    if (pretaxEl) pretaxEl.value = urlAmount;
  }

  calculate();
  hideZipRedirect();
});
