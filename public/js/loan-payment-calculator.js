document.addEventListener('DOMContentLoaded', () => {
  ['loan-amount', 'loan-rate', 'loan-years'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calculate);
  });

  function parseVal(id, fallback) {
    const el = document.getElementById(id);
    if (!el || el.value.trim() === '') return fallback !== undefined ? fallback : NaN;
    const v = parseFloat(el.value.replace(/,/g, '').replace(/\s/g, ''));
    return isNaN(v) ? (fallback !== undefined ? fallback : NaN) : v;
  }

  function fmtCard(n) {
    if (!isFinite(n)) return '-';
    const abs = Math.abs(n), sign = n < 0 ? '-' : '';
    if (abs >= 1e9) return sign + '$' + (abs / 1e9).toFixed(2) + 'B';
    if (abs >= 1e6) return sign + '$' + (abs / 1e6).toFixed(2) + 'M';
    if (abs >= 1e3) return sign + '$' + (abs / 1e3).toFixed(1) + 'K';
    return sign + '$' + abs.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function fmtFull(n) {
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function calculate() {
    const P = parseVal('loan-amount');
    const r = parseVal('loan-rate');
    const y = parseVal('loan-years');
    if (isNaN(P) || isNaN(r) || isNaN(y) || P <= 0 || y <= 0) {
      document.getElementById('loan-result').classList.add('hidden');
      return;
    }

    const n    = y * 12;
    const rMon = r / 100 / 12;

    let monthly;
    if (rMon === 0) {
      monthly = P / n;
    } else {
      monthly = P * (rMon * Math.pow(1 + rMon, n)) / (Math.pow(1 + rMon, n) - 1);
    }

    const totalPaid     = monthly * n;
    const totalInterest = totalPaid - P;

    document.getElementById('loan-monthly').textContent      = fmtCard(monthly);
    document.getElementById('loan-total-paid').textContent   = fmtCard(totalPaid);
    document.getElementById('loan-total-interest').textContent = fmtCard(totalInterest);

    document.getElementById('loan-step1').textContent = `Monthly rate: ${r} / 12 = ${(rMon * 100).toFixed(4)}%`;
    document.getElementById('loan-step2').textContent = `Payments: ${y} years × 12 = ${n} months`;
    document.getElementById('loan-step3').textContent = `Monthly payment: ${fmtFull(monthly)}`;
    document.getElementById('loan-step4').textContent = `Total paid: ${n} × ${fmtFull(monthly)} = ${fmtFull(totalPaid)}`;
    document.getElementById('loan-step5').textContent = `Total interest: ${fmtFull(totalPaid)} − ${fmtFull(P)} = ${fmtFull(totalInterest)}`;

    const tbody = document.getElementById('loan-table-body');
    if (tbody) {
      tbody.innerHTML = '';
      let balance = P;
      for (let i = 1; i <= n; i++) {
        const intPart  = balance * rMon;
        const prinPart = monthly - intPart;
        balance -= prinPart;
        if (balance < 0.005) balance = 0;
        if (i % 12 === 0 || i === n) {
          const yr = Math.ceil(i / 12);
          const tr = document.createElement('tr');
          tr.innerHTML = `<td>Year ${yr}</td><td>${fmtFull(monthly)}</td><td>${fmtFull(intPart)}</td><td>${fmtFull(Math.max(balance, 0))}</td>`;
          tbody.appendChild(tr);
        }
      }
    }

    document.getElementById('loan-result').classList.remove('hidden');
  }
});
