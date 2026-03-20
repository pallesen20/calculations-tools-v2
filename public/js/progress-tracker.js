document.addEventListener('DOMContentLoaded', () => {
  const currentEl  = document.getElementById('pt-current');
  const goalEl     = document.getElementById('pt-goal');
  const deadlineEl = document.getElementById('pt-deadline');

  [currentEl, goalEl, deadlineEl].forEach(el => el.addEventListener('input', calculate));

  function fmt(n, decimals) {
    return parseFloat(n.toFixed(decimals ?? 2)).toString();
  }

  function fmtNum(n) {
    if (Math.abs(n) >= 1000000) return fmt(n / 1000000, 2) + 'M';
    if (Math.abs(n) >= 1000)    return fmt(n / 1000, 2) + 'k';
    return fmt(n, 2);
  }

  function calculate() {
    const current = parseFloat(currentEl.value.replace(',', '.'));
    const goal    = parseFloat(goalEl.value.replace(',', '.'));

    if (isNaN(current) || isNaN(goal) || goal === 0) {
      document.getElementById('pt-result').classList.add('hidden');
      return;
    }

    const pct       = (current / goal) * 100;
    const remaining = goal - current;
    const exceeded  = current >= goal;

    document.getElementById('pt-pct-val').textContent    = fmt(pct, 1) + '%';
    document.getElementById('pt-remaining').textContent  = exceeded
      ? fmtNum(Math.abs(remaining)) + ' over goal'
      : fmtNum(remaining) + ' remaining';

    const barFill  = document.getElementById('pt-bar-fill');
    const barClamp = Math.min(pct, 100);
    barFill.style.width = barClamp + '%';
    barFill.classList.toggle('pt-bar-exceeded', exceeded);

    document.getElementById('pt-step1').textContent = `${fmt(current, 4)} ÷ ${fmt(goal, 4)} = ${fmt(current / goal, 6)}`;
    document.getElementById('pt-step2').textContent = `${fmt(current / goal, 6)} × 100 = ${fmt(pct, 4)}%`;

    const deadlineVal = deadlineEl.value;
    const deadlineRow = document.getElementById('pt-deadline-rows');

    if (deadlineVal) {
      const today    = new Date();
      today.setHours(0, 0, 0, 0);
      const deadline = new Date(deadlineVal);
      deadline.setHours(0, 0, 0, 0);
      const daysLeft = Math.round((deadline - today) / 86400000);

      if (daysLeft >= 0 && !exceeded) {
        const dailyNeeded  = remaining / Math.max(daysLeft, 1);
        const weeklyNeeded = dailyNeeded * 7;
        document.getElementById('pt-days-left').textContent   = daysLeft + ' day' + (daysLeft !== 1 ? 's' : '');
        document.getElementById('pt-daily').textContent       = fmtNum(dailyNeeded) + ' / day';
        document.getElementById('pt-weekly').textContent      = fmtNum(weeklyNeeded) + ' / week';
        deadlineRow.classList.remove('hidden');
      } else if (exceeded) {
        deadlineRow.classList.add('hidden');
      } else {
        document.getElementById('pt-days-left').textContent   = Math.abs(daysLeft) + ' day' + (Math.abs(daysLeft) !== 1 ? 's' : '') + ' overdue';
        document.getElementById('pt-daily').textContent       = '—';
        document.getElementById('pt-weekly').textContent      = '—';
        deadlineRow.classList.remove('hidden');
      }
    } else {
      deadlineRow.classList.add('hidden');
    }

    document.getElementById('pt-result').classList.remove('hidden');
  }
});
