document.addEventListener('DOMContentLoaded', () => {
  const nEl = document.getElementById('ef-n');
  const dEl = document.getElementById('ef-d');
  [nEl, dEl].forEach(el => el.addEventListener('input', calculate));

  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; }

  function calculate() {
    const n = parseInt(nEl.value.replace(',', '.'), 10);
    const d = parseInt(dEl.value.replace(',', '.'), 10);
    if (isNaN(n) || isNaN(d) || d === 0) {
      document.getElementById('ef-result').classList.add('hidden');
      return;
    }

    const g = gcd(Math.abs(n), Math.abs(d));
    const sn = n / g;
    const sd = d / g;

    document.getElementById('ef-lowest-n').textContent = sn;
    document.getElementById('ef-lowest-d').textContent = sd;
    document.getElementById('ef-gcd').textContent = g;

    const tbody = document.getElementById('ef-table-body');
    tbody.innerHTML = '';
    for (let m = 1; m <= 12; m++) {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${m}</td><td>${n * m}/${d * m}</td><td>${sn * m}/${sd * m}</td>`;
      tbody.appendChild(tr);
    }

    document.getElementById('ef-result').classList.remove('hidden');
  }
});
