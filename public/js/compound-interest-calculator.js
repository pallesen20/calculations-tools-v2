document.addEventListener('DOMContentLoaded', () => {
  ['ci-principal', 'ci-rate', 'ci-years', 'ci-n'].forEach(id => {
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
    if (!isFinite(n)) return '—';
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
    const P = parseVal('ci-principal');
    const r = parseVal('ci-rate');
    const t = parseVal('ci-years');
    if (isNaN(P) || isNaN(r) || isNaN(t) || P <= 0 || t <= 0) {
      document.getElementById('ci-result').classList.add('hidden');
      return;
    }

    const rDec = r / 100;
    const n    = parseVal('ci-n', 12);

    const A          = P * Math.pow(1 + rDec / n, n * t);
    const interest   = A - P;
    const simpleInt  = P * rDec * t;
    const compEffect = interest - simpleInt;

    document.getElementById('ci-future-val').textContent  = fmtCard(A);
    document.getElementById('ci-interest').textContent    = fmtCard(interest);
    document.getElementById('ci-principal-out').textContent = fmtCard(P);

    document.getElementById('ci-step1').textContent = `${fmtFull(P)} × (1 + ${(rDec/n).toFixed(6)})^(${n}×${t})`;
    document.getElementById('ci-step2').textContent = `= ${fmtFull(A)}`;
    document.getElementById('ci-step3').textContent = `Interest earned: ${fmtFull(A)} − ${fmtFull(P)} = ${fmtFull(interest)}`;
    document.getElementById('ci-step4').textContent = `Compounding bonus vs simple interest: +${fmtFull(compEffect)}`;

    const tbody = document.getElementById('ci-table-body');
    if (tbody) {
      tbody.innerHTML = '';
      const steps = Math.min(t, 20);
      for (let i = 1; i <= steps; i++) {
        const val = P * Math.pow(1 + rDec / n, n * i);
        const int = val - P;
        const tr  = document.createElement('tr');
        tr.innerHTML = `<td>Year ${i}</td><td>${fmtFull(val)}</td><td>${fmtFull(int)}</td>`;
        tbody.appendChild(tr);
      }
    }

    document.getElementById('ci-result').classList.remove('hidden');
  }
});
