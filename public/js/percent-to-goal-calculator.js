document.addEventListener('DOMContentLoaded', () => {
  const currentEl = document.getElementById('ptg-current');
  const goalEl    = document.getElementById('ptg-goal');
  [currentEl, goalEl].forEach(el => el.addEventListener('input', calculate));

  function calculate() {
    const current = parseFloat(currentEl.value.replace(",","."));
    const goal    = parseFloat(goalEl.value.replace(",","."));

    if (isNaN(current) || isNaN(goal) || goal === 0) {
      document.getElementById('ptg-result').classList.add('hidden');
      return;
    }

    const pct       = (current / goal) * 100;
    const remaining = goal - current;
    const fmt       = n => parseFloat(n.toFixed(4)).toString();

    document.getElementById('ptg-pct').textContent = fmt(pct) + '%';

    let remainingText;
    if (remaining > 0) {
      remainingText = fmt(remaining) + ' remaining';
    } else if (remaining === 0) {
      remainingText = 'Goal reached';
    } else {
      remainingText = fmt(Math.abs(remaining)) + ' over goal';
    }
    document.getElementById('ptg-remaining').textContent = remainingText;

    document.getElementById('ptg-step1').textContent = `${fmt(current)} ÷ ${fmt(goal)} = ${fmt(current / goal)}`;
    document.getElementById('ptg-step2').textContent = `${fmt(current / goal)} × 100 = ${fmt(pct)}%`;

    document.getElementById('ptg-result').classList.remove('hidden');
  }
});
