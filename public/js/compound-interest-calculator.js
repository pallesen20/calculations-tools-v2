document.addEventListener('DOMContentLoaded', () => {
  let compareActive = false;

  const A_IDS = ['ci-principal', 'ci-rate', 'ci-years', 'ci-n'];
  const B_IDS = ['ci-principal-b', 'ci-rate-b', 'ci-years-b', 'ci-n-b'];

  [...A_IDS, ...B_IDS].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calculate);
  });

  const compareBtn = document.getElementById('ci-compare-btn');
  if (compareBtn) {
    compareBtn.addEventListener('click', () => {
      compareActive = !compareActive;
      compareBtn.classList.toggle('active', compareActive);
      compareBtn.textContent = compareActive ? '✕ Hide comparison' : '⇄ Compare two scenarios';

      const bWrap = document.getElementById('ci-scenario-b-wrap');
      if (bWrap) bWrap.classList.toggle('hidden', !compareActive);

      if (compareActive) {
        A_IDS.forEach((aId, i) => {
          const aEl = document.getElementById(aId);
          const bEl = document.getElementById(B_IDS[i]);
          if (!aEl || !bEl) return;
          bEl.value = aEl.value;
          if (aId === 'ci-years') {
            const yr = parseFloat(bEl.value);
            if (!isNaN(yr) && yr > 10) bEl.value = String(yr - 10);
            else if (!isNaN(yr) && yr > 5) bEl.value = String(yr - 5);
          }
        });
      }

      calculate();
    });
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

  function computeScenario(pId, rId, tId, nId) {
    const P = parseVal(pId);
    const r = parseVal(rId);
    const t = parseVal(tId);
    if (isNaN(P) || isNaN(r) || isNaN(t) || P <= 0 || t <= 0) return null;
    const rDec = r / 100;
    const n = parseVal(nId, 12);
    const A = P * Math.pow(1 + rDec / n, n * t);
    const interest = A - P;
    const simpleInt = P * rDec * t;
    const compEffect = interest - simpleInt;
    return { P, r, t, n, rDec, A, interest, simpleInt, compEffect };
  }

  function calculate() {
    const s = computeScenario('ci-principal', 'ci-rate', 'ci-years', 'ci-n');

    if (!s) {
      document.getElementById('ci-result').classList.add('hidden');
      document.getElementById('ci-compare-result').classList.add('hidden');
      return;
    }

    if (compareActive) {
      document.getElementById('ci-result').classList.add('hidden');

      const sB = computeScenario('ci-principal-b', 'ci-rate-b', 'ci-years-b', 'ci-n-b');

      document.getElementById('cca-fv').textContent = fmtCard(s.A);
      document.getElementById('cca-int').textContent = fmtCard(s.interest);

      if (sB) {
        document.getElementById('ccb-fv').textContent = fmtCard(sB.A);
        document.getElementById('ccb-int').textContent = fmtCard(sB.interest);

        const diff = s.A - sB.A;
        const absDiff = Math.abs(diff);
        const base = Math.min(s.A, sB.A);
        const pct = (absDiff / base * 100).toFixed(1);
        let diffText;
        if (absDiff < 1) {
          diffText = 'Both scenarios produce the same future value';
        } else if (diff > 0) {
          diffText = 'Scenario A ends with ' + fmtFull(absDiff) + ' more (' + pct + '% higher future value)';
        } else {
          diffText = 'Scenario B ends with ' + fmtFull(absDiff) + ' more (' + pct + '% higher future value)';
        }
        document.getElementById('ci-diff-text').textContent = diffText;
      } else {
        document.getElementById('ccb-fv').textContent = '-';
        document.getElementById('ccb-int').textContent = '-';
        document.getElementById('ci-diff-text').textContent = 'Enter Scenario B values above to compare';
      }

      document.getElementById('ci-compare-result').classList.remove('hidden');
    } else {
      document.getElementById('ci-compare-result').classList.add('hidden');

      document.getElementById('ci-future-val').textContent    = fmtCard(s.A);
      document.getElementById('ci-interest').textContent      = fmtCard(s.interest);
      document.getElementById('ci-principal-out').textContent = fmtCard(s.P);
      document.getElementById('ci-rule72').textContent        = s.r > 0 ? '~' + (72 / s.r).toFixed(1) + ' yrs' : '-';

      document.getElementById('ci-step1').textContent = `${fmtFull(s.P)} × (1 + ${(s.rDec/s.n).toFixed(6)})^(${s.n}×${s.t})`;
      document.getElementById('ci-step2').textContent = `= ${fmtFull(s.A)}`;
      document.getElementById('ci-step3').textContent = `Interest earned: ${fmtFull(s.A)} − ${fmtFull(s.P)} = ${fmtFull(s.interest)}`;
      document.getElementById('ci-step4').textContent = `Compounding bonus vs simple interest: +${fmtFull(s.compEffect)}`;

      const tbody = document.getElementById('ci-table-body');
      if (tbody) {
        tbody.innerHTML = '';
        const steps = Math.min(s.t, 20);
        for (let i = 1; i <= steps; i++) {
          const val = s.P * Math.pow(1 + s.rDec / s.n, s.n * i);
          const int = val - s.P;
          const tr = document.createElement('tr');
          tr.innerHTML = `<td>Year ${i}</td><td>${fmtFull(val)}</td><td>${fmtFull(int)}</td>`;
          tbody.appendChild(tr);
        }
      }

      document.getElementById('ci-result').classList.remove('hidden');
    }
  }
});
