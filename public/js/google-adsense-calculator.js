document.addEventListener('DOMContentLoaded', () => {
  function parseVal(id, fallback) {
    const el = document.getElementById(id);
    if (!el || el.value.trim() === '') return fallback !== undefined ? fallback : NaN;
    const v = parseFloat(el.value.replace(/,/g, '').replace(/\s/g, ''));
    return isNaN(v) ? (fallback !== undefined ? fallback : NaN) : v;
  }

  function fmt(n) {
    if (!isFinite(n) || n < 0) return '-';
    if (n >= 1e6) return '$' + (n / 1e6).toFixed(2) + 'M';
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function fmtNum(n) {
    if (!isFinite(n) || n < 0) return '-';
    return Math.round(n).toLocaleString('en-US');
  }

  function calculate() {
    const pageViews = parseVal('gac-pageviews');
    const ctr = parseVal('gac-ctr', 2);
    const cpc = parseVal('gac-cpc', 0.25);

    if (isNaN(pageViews) || pageViews <= 0 || ctr <= 0 || ctr > 100 || cpc <= 0) {
      document.getElementById('gac-result')?.classList.add('hidden');
      return;
    }

    const dailyClicks = pageViews * (ctr / 100);
    const dailyEarnings = dailyClicks * cpc;
    const monthlyEarnings = dailyEarnings * 30.44;
    const annualEarnings = dailyEarnings * 365;
    const rpm = (dailyEarnings / pageViews) * 1000;

    document.getElementById('gac-res-clicks').textContent = fmtNum(dailyClicks);
    document.getElementById('gac-res-daily').textContent = fmt(dailyEarnings);
    document.getElementById('gac-res-monthly').textContent = fmt(monthlyEarnings);
    document.getElementById('gac-res-annual').textContent = fmt(annualEarnings);
    document.getElementById('gac-res-rpm').textContent = fmt(rpm);

    document.getElementById('gac-result')?.classList.remove('hidden');
  }

  ['gac-pageviews', 'gac-ctr', 'gac-cpc'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calculate);
  });
});
