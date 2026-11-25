document.addEventListener('DOMContentLoaded', () => {
  const T = {
    mdl: {
      mc: [[150,340],[150,350],[150,350],[140,350],[140,350],[140,350],[140,340],[140,330],[140,250],[140,230]],
      f:  [[120,220],[120,230],[120,240],[120,230],[120,220],[120,210],[120,200],[120,190],[120,170],[120,170]],
    },
    hrp: {
      mc: [[15,58],[14,61],[14,62],[13,60],[12,59],[11,57],[11,55],[10,51],[10,46],[10,43]],
      f:  [[11,53],[11,50],[11,48],[11,47],[10,43],[10,40],[10,38],[10,36],[10,24],[10,24]],
    },
    sdc: {
      mc: [[148,89],[151,90],[152,90],[156,93],[161,96],[165,100],[173,105],[180,112],[192,118],[196,129]],
      f:  [[195,115],[195,115],[195,115],[202,119],[207,122],[222,129],[231,131],[243,138],[288,146],[288,146]],
    },
    plk: {
      all: [[90,220],[85,215],[80,210],[75,205],[70,200],[70,200],[70,200],[70,200],[70,200],[70,200]],
    },
    mr2: {
      mc: [[1197,802],[1185,805],[1185,805],[1244,822],[1244,822],[1324,845],[1324,870],[1370,909],[1416,928],[1416,928]],
      f:  [[1375,960],[1365,930],[1365,930],[1370,948],[1379,951],[1395,960],[1410,990],[1440,1019],[1488,1038],[1500,1038]],
    },
  };

  function scoreHigh(val, min60, max100) {
    if (!val || val <= 0) return null;
    if (val >= max100) return 100;
    if (val < min60) return Math.max(0, Math.round(60 * val / min60));
    return Math.round(60 + (val - min60) / (max100 - min60) * 40);
  }

  function scoreLow(secs, max60s, min100s) {
    if (!secs || secs <= 0) return null;
    if (secs <= min100s) return 100;
    if (secs > max60s) return Math.max(0, Math.round(60 * max60s / secs));
    return Math.round(60 + (max60s - secs) / (max60s - min100s) * 40);
  }

  function timeToSecs(mId, sId) {
    const m = parseInt(document.getElementById(mId).value) || 0;
    const s = parseInt(document.getElementById(sId).value) || 0;
    return (m === 0 && s === 0) ? null : m * 60 + s;
  }

  function getAgeIdx() {
    return parseInt(document.getElementById('aft-age').value) || 0;
  }

  function getSex() {
    return document.querySelector('.aft-sex-btn.active')?.dataset.sex || 'male';
  }

  function getMos() {
    return document.querySelector('.aft-mos-btn.active')?.dataset.mos || 'combat';
  }

  function getCol(sex, mos) {
    return (sex === 'f' && mos === 'general') ? 'f' : 'mc';
  }

  function calculate() {
    const idx = getAgeIdx();
    const sex = getSex();
    const mos = getMos();
    const col = getCol(sex, mos);
    const minTotal = mos === 'combat' ? 350 : 300;

    const mdlLbs = parseFloat(document.getElementById('aft-mdl').value.replace(',', '.')) || 0;
    const hrpReps = parseInt(document.getElementById('aft-hrp').value) || 0;
    const sdcSecs = timeToSecs('aft-sdc-min', 'aft-sdc-sec');
    const plkSecs = timeToSecs('aft-plk-min', 'aft-plk-sec');
    const mr2Secs = timeToSecs('aft-mr2-min', 'aft-mr2-sec');

    const anyEntered = mdlLbs || hrpReps || sdcSecs || plkSecs || mr2Secs;
    if (!anyEntered) {
      document.getElementById('aft-result').classList.add('hidden');
      return;
    }

    const scores = {
      mdl: mdlLbs > 0 ? scoreHigh(mdlLbs, ...T.mdl[col][idx]) : null,
      hrp: hrpReps > 0 ? scoreHigh(hrpReps, ...T.hrp[col][idx]) : null,
      sdc: sdcSecs ? scoreLow(sdcSecs, ...T.sdc[col][idx]) : null,
      plk: plkSecs ? scoreHigh(plkSecs, ...T.plk.all[idx]) : null,
      mr2: mr2Secs ? scoreLow(mr2Secs, ...T.mr2[col][idx]) : null,
    };

    document.getElementById('aft-result').classList.remove('hidden');

    let totalScore = 0;
    let enteredCount = 0;
    let anyFailed = false;

    ['mdl', 'hrp', 'sdc', 'plk', 'mr2'].forEach(evt => {
      const sc = scores[evt];
      const scoreEl = document.getElementById('aft-score-' + evt);
      const badgeEl = document.getElementById('aft-badge-' + evt);

      if (sc === null) {
        if (scoreEl) scoreEl.textContent = '-';
        if (badgeEl) { badgeEl.textContent = '-'; badgeEl.className = 'aft-event-badge'; }
        return;
      }

      enteredCount++;
      totalScore += sc;

      if (scoreEl) scoreEl.textContent = sc;
      if (badgeEl) {
        if (sc >= 100) {
          badgeEl.textContent = 'MAX'; badgeEl.className = 'aft-event-badge aft-badge-max';
        } else if (sc >= 60) {
          badgeEl.textContent = 'PASS'; badgeEl.className = 'aft-event-badge aft-badge-pass';
        } else {
          badgeEl.textContent = 'FAIL'; badgeEl.className = 'aft-event-badge aft-badge-fail';
          anyFailed = true;
        }
      }
    });

    const totalEl = document.getElementById('aft-total-score');
    const overallEl = document.getElementById('aft-overall');
    const noteEl = document.getElementById('aft-result-note');
    const minEl = document.getElementById('aft-min-total');

    if (minEl) minEl.textContent = minTotal;

    if (enteredCount === 5) {
      if (totalEl) totalEl.textContent = totalScore;
      if (anyFailed) {
        if (overallEl) { overallEl.textContent = 'FAIL'; overallEl.className = 'aft-overall-badge aft-overall-fail'; }
        if (noteEl) noteEl.textContent = 'One or more events scored below the 60-point minimum. All five events must pass individually.';
      } else if (totalScore < minTotal) {
        if (overallEl) { overallEl.textContent = 'FAIL'; overallEl.className = 'aft-overall-badge aft-overall-fail'; }
        if (noteEl) noteEl.textContent = 'Total score of ' + totalScore + ' is below the ' + minTotal + '-point minimum for your MOS category.';
      } else {
        if (overallEl) { overallEl.textContent = 'PASS'; overallEl.className = 'aft-overall-badge aft-overall-pass'; }
        if (noteEl) noteEl.textContent = 'Passing with ' + (totalScore - minTotal) + ' points above the ' + minTotal + '-point minimum.';
      }
    } else {
      if (totalEl) totalEl.textContent = enteredCount > 0 ? totalScore + ' (' + enteredCount + '/5 events)' : '-';
      if (overallEl) { overallEl.textContent = '-'; overallEl.className = 'aft-overall-badge'; }
      if (noteEl) noteEl.textContent = 'Enter all 5 events for your overall result.';
    }
  }

  document.querySelectorAll('.aft-sex-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.aft-sex-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calculate();
    });
  });

  document.querySelectorAll('.aft-mos-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.aft-mos-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calculate();
    });
  });

  document.getElementById('aft-age').addEventListener('change', calculate);

  ['aft-mdl', 'aft-hrp', 'aft-sdc-min', 'aft-sdc-sec',
   'aft-plk-min', 'aft-plk-sec', 'aft-mr2-min', 'aft-mr2-sec'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calculate);
  });
});
