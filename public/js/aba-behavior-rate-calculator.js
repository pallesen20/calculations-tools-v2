document.addEventListener('DOMContentLoaded', () => {
  let mode = 'rate';
  let latencyTrials = ['', '', ''];

  document.querySelectorAll('.abr-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.mode === mode) return;
      document.querySelectorAll('.abr-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mode = btn.dataset.mode;
      document.getElementById('abr-rate-section').style.display = mode === 'rate' ? '' : 'none';
      document.getElementById('abr-duration-section').style.display = mode === 'duration' ? '' : 'none';
      document.getElementById('abr-latency-section').style.display = mode === 'latency' ? '' : 'none';
      document.getElementById('abr-result').innerHTML = '';
      calculate();
    });
  });

  document.getElementById('abr-count').addEventListener('input', calculate);
  document.getElementById('abr-obs-time').addEventListener('input', calculate);
  document.getElementById('abr-session').addEventListener('input', calculate);
  document.getElementById('abr-behavior').addEventListener('input', calculate);

  function renderLatencyInputs() {
    const container = document.getElementById('abr-latency-trials');
    container.innerHTML = '';
    latencyTrials.forEach((val, i) => {
      const row = document.createElement('div');
      row.className = 'abr-trial-row';
      row.innerHTML =
        '<span class="abr-trial-label">Trial ' + (i + 1) + '</span>' +
        '<div class="bmi-input-wrap abr-trial-wrap">' +
          '<input type="text" inputmode="decimal" class="bmi-input abr-latency-input" placeholder="e.g. 8" value="' + val + '" />' +
          '<span class="bmi-unit-tag">sec</span>' +
        '</div>' +
        (latencyTrials.length > 1 ? '<button class="abr-remove-trial" aria-label="Remove trial">&#215;</button>' : '');
      const input = row.querySelector('.abr-latency-input');
      input.addEventListener('input', (function(idx) {
        return function(e) { latencyTrials[idx] = e.target.value; calculate(); };
      })(i));
      const removeBtn = row.querySelector('.abr-remove-trial');
      if (removeBtn) {
        removeBtn.addEventListener('click', (function(idx) {
          return function() { latencyTrials.splice(idx, 1); renderLatencyInputs(); calculate(); };
        })(i));
      }
      container.appendChild(row);
    });
  }

  document.getElementById('abr-add-trial').addEventListener('click', () => {
    if (latencyTrials.length < 10) {
      latencyTrials.push('');
      renderLatencyInputs();
    }
  });

  renderLatencyInputs();

  function calculate() {
    if (mode === 'rate') calculateRate();
    else if (mode === 'duration') calculateDuration();
    else calculateLatency();
  }

  function calculateRate() {
    const count = parseFloat(document.getElementById('abr-count').value);
    const time = parseFloat(document.getElementById('abr-obs-time').value);
    const resultEl = document.getElementById('abr-result');
    if (isNaN(count) || isNaN(time) || time <= 0 || count < 0) {
      resultEl.innerHTML = '';
      return;
    }
    const ratePerMin = count / time;
    const ratePerHour = ratePerMin * 60;
    resultEl.innerHTML =
      '<div class="abr-result-card">' +
        '<div class="abr-result-primary">' +
          '<div class="abr-result-label">Frequency rate</div>' +
          '<div class="abr-result-value">' + ratePerMin.toFixed(2) + '</div>' +
          '<div class="abr-result-unit">responses / min</div>' +
        '</div>' +
        '<div class="abr-result-secondary">' +
          '<div class="abr-result-row"><span>Per hour</span><span class="abr-result-num">' + ratePerHour.toFixed(1) + ' RPH</span></div>' +
          '<div class="abr-result-row"><span>Observation time</span><span class="abr-result-num">' + time + ' min</span></div>' +
          '<div class="abr-result-row"><span>Total responses</span><span class="abr-result-num">' + count + '</span></div>' +
        '</div>' +
      '</div>';
  }

  function calculateDuration() {
    const session = parseFloat(document.getElementById('abr-session').value);
    const behavior = parseFloat(document.getElementById('abr-behavior').value);
    const resultEl = document.getElementById('abr-result');
    if (isNaN(session) || isNaN(behavior) || session <= 0) {
      resultEl.innerHTML = '';
      return;
    }
    if (behavior > session) {
      resultEl.innerHTML = '<div class="abr-error">Behavior duration cannot exceed session length.</div>';
      return;
    }
    const pct = (behavior / session) * 100;
    resultEl.innerHTML =
      '<div class="abr-result-card">' +
        '<div class="abr-result-primary">' +
          '<div class="abr-result-label">% Duration</div>' +
          '<div class="abr-result-value">' + pct.toFixed(1) + '%</div>' +
          '<div class="abr-result-unit">of session time</div>' +
        '</div>' +
        '<div class="abr-result-secondary">' +
          '<div class="abr-result-row"><span>Behavior time</span><span class="abr-result-num">' + behavior + ' min</span></div>' +
          '<div class="abr-result-row"><span>Session length</span><span class="abr-result-num">' + session + ' min</span></div>' +
          '<div class="abr-result-row"><span>Non-behavior time</span><span class="abr-result-num">' + (session - behavior).toFixed(1) + ' min</span></div>' +
        '</div>' +
      '</div>';
  }

  function calculateLatency() {
    const values = latencyTrials.map(v => parseFloat(v)).filter(v => !isNaN(v) && v >= 0);
    const resultEl = document.getElementById('abr-result');
    if (values.length === 0) {
      resultEl.innerHTML = '';
      return;
    }
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const min = Math.min.apply(null, values);
    const max = Math.max.apply(null, values);
    const meanMin = mean / 60;
    resultEl.innerHTML =
      '<div class="abr-result-card">' +
        '<div class="abr-result-primary">' +
          '<div class="abr-result-label">Mean latency</div>' +
          '<div class="abr-result-value">' + mean.toFixed(1) + '</div>' +
          '<div class="abr-result-unit">seconds (' + values.length + ' trial' + (values.length !== 1 ? 's' : '') + ')</div>' +
        '</div>' +
        '<div class="abr-result-secondary">' +
          '<div class="abr-result-row"><span>In minutes</span><span class="abr-result-num">' + meanMin.toFixed(2) + ' min</span></div>' +
          '<div class="abr-result-row"><span>Minimum</span><span class="abr-result-num">' + min + ' sec</span></div>' +
          '<div class="abr-result-row"><span>Maximum</span><span class="abr-result-num">' + max + ' sec</span></div>' +
          '<div class="abr-result-row"><span>Range</span><span class="abr-result-num">' + (max - min).toFixed(1) + ' sec</span></div>' +
        '</div>' +
      '</div>';
  }

  calculate();
});
