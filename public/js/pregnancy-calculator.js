document.addEventListener('DOMContentLoaded', () => {
  const MILESTONES = [
    { week: 4,  label: 'Positive pregnancy test possible' },
    { week: 6,  label: 'Heartbeat detectable by ultrasound' },
    { week: 8,  label: 'First prenatal visit recommended' },
    { week: 10, label: 'First trimester screening window opens' },
    { week: 12, label: 'Nuchal translucency scan; end of highest-risk period' },
    { week: 13, label: 'End of first trimester' },
    { week: 14, label: 'Second trimester begins' },
    { week: 16, label: 'Gender may be visible on ultrasound' },
    { week: 18, label: 'Anatomy scan window opens (18-22 weeks)' },
    { week: 20, label: 'Halfway point' },
    { week: 24, label: 'Viability milestone; glucose screening' },
    { week: 28, label: 'Third trimester begins; Tdap vaccine window' },
    { week: 32, label: "Baby's position usually established" },
    { week: 36, label: 'Group B strep test (35-37 weeks)' },
    { week: 37, label: 'Full term begins' },
    { week: 39, label: 'Optimal birth window (39-40 weeks)' },
    { week: 40, label: 'Estimated due date' },
    { week: 42, label: 'Post-term: induction typically offered' },
  ];

  const FETAL_SIZES = {
    4:  { name: 'poppy seed',       emoji: '🌱', length: '~2 mm',   weight: '<1 g' },
    5:  { name: 'sesame seed',      emoji: '🌿', length: '~4 mm',   weight: '<1 g' },
    6:  { name: 'lentil',           emoji: '🟤', length: '~6 mm',   weight: '<1 g' },
    7:  { name: 'blueberry',        emoji: '🫐', length: '~10 mm',  weight: '<1 g' },
    8:  { name: 'raspberry',        emoji: '🍓', length: '~16 mm',  weight: '~1 g' },
    9:  { name: 'grape',            emoji: '🍇', length: '~22 mm',  weight: '~2 g' },
    10: { name: 'kumquat',          emoji: '🍊', length: '~31 mm',  weight: '~4 g' },
    11: { name: 'fig',              emoji: '🟣', length: '~41 mm',  weight: '~7 g' },
    12: { name: 'lime',             emoji: '💚', length: '~54 mm',  weight: '~14 g' },
    13: { name: 'peach',            emoji: '🍑', length: '~73 mm',  weight: '~23 g' },
    14: { name: 'lemon',            emoji: '🍋', length: '~87 mm',  weight: '~43 g' },
    15: { name: 'apple',            emoji: '🍎', length: '~104 mm', weight: '~70 g' },
    16: { name: 'avocado',          emoji: '🥑', length: '~116 mm', weight: '~100 g' },
    17: { name: 'turnip',           emoji: '🌰', length: '~130 mm', weight: '~140 g' },
    18: { name: 'bell pepper',      emoji: '🫑', length: '~143 mm', weight: '~190 g' },
    19: { name: 'mango',            emoji: '🥭', length: '~152 mm', weight: '~240 g' },
    20: { name: 'banana',           emoji: '🍌', length: '~161 mm', weight: '~300 g' },
    21: { name: 'carrot',           emoji: '🥕', length: '~267 mm', weight: '~360 g' },
    22: { name: 'papaya',           emoji: '🍐', length: '~280 mm', weight: '~430 g' },
    23: { name: 'grapefruit',       emoji: '🍊', length: '~295 mm', weight: '~500 g' },
    24: { name: 'ear of corn',      emoji: '🌽', length: '~300 mm', weight: '~600 g' },
    25: { name: 'rutabaga',         emoji: '🟡', length: '~340 mm', weight: '~660 g' },
    26: { name: 'head of lettuce',  emoji: '🥬', length: '~350 mm', weight: '~760 g' },
    27: { name: 'cauliflower',      emoji: '🥦', length: '~360 mm', weight: '~875 g' },
    28: { name: 'eggplant',         emoji: '🍆', length: '~370 mm', weight: '~1.0 kg' },
    29: { name: 'butternut squash', emoji: '🎃', length: '~390 mm', weight: '~1.2 kg' },
    30: { name: 'cabbage',          emoji: '🥬', length: '~400 mm', weight: '~1.3 kg' },
    31: { name: 'coconut',          emoji: '🥥', length: '~410 mm', weight: '~1.5 kg' },
    32: { name: 'sweet potato',     emoji: '🍠', length: '~430 mm', weight: '~1.7 kg' },
    33: { name: 'pineapple',        emoji: '🍍', length: '~440 mm', weight: '~1.9 kg' },
    34: { name: 'cantaloupe',       emoji: '🍈', length: '~450 mm', weight: '~2.1 kg' },
    35: { name: 'honeydew melon',   emoji: '🍈', length: '~460 mm', weight: '~2.4 kg' },
    36: { name: 'romaine head',     emoji: '🥬', length: '~470 mm', weight: '~2.6 kg' },
    37: { name: 'winter melon',     emoji: '🍈', length: '~480 mm', weight: '~2.9 kg' },
    38: { name: 'leek',             emoji: '🌿', length: '~490 mm', weight: '~3.1 kg' },
    39: { name: 'mini watermelon',  emoji: '🍉', length: '~500 mm', weight: '~3.3 kg' },
    40: { name: 'watermelon',       emoji: '🍉', length: '~510 mm', weight: '~3.5 kg' },
  };

  function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  }

  function today() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function daysBetween(earlier, later) {
    return Math.round((later.getTime() - earlier.getTime()) / 86400000);
  }

  function formatDate(date) {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  function parseDate(str) {
    if (!str) return null;
    const parts = str.split('-');
    if (parts.length !== 3) return null;
    const y = parseInt(parts[0]);
    const m = parseInt(parts[1]);
    const d = parseInt(parts[2]);
    if (!y || !m || !d) return null;
    const date = new Date(y, m - 1, d);
    if (isNaN(date.getTime())) return null;
    return date;
  }

  function getTrimester(gaWeeks) {
    if (gaWeeks <= 13) return { num: '1st', label: 'First Trimester', weeks: 'Weeks 1-13' };
    if (gaWeeks <= 27) return { num: '2nd', label: 'Second Trimester', weeks: 'Weeks 14-27' };
    return { num: '3rd', label: 'Third Trimester', weeks: 'Weeks 28-40+' };
  }

  function getFetalSize(gaWeeks) {
    const week = Math.min(Math.max(Math.floor(gaWeeks), 4), 40);
    return FETAL_SIZES[week] || null;
  }

  function article(name) {
    return /^[aeiou]/i.test(name) ? 'an' : 'a';
  }

  function convertLength(metricStr) {
    var match = metricStr.match(/[\d.]+/);
    if (!match) return '';
    var mm = parseFloat(match[0]);
    var inches = mm / 25.4;
    return '~' + (inches < 1 ? inches.toFixed(2) : inches.toFixed(1)) + ' in';
  }

  function convertWeight(metricStr) {
    if (metricStr.indexOf('<') !== -1) return '<0.1 oz';
    if (metricStr.indexOf('kg') !== -1) {
      var kg = parseFloat(metricStr.match(/[\d.]+/)[0]);
      return '~' + (kg * 2.205).toFixed(1) + ' lb';
    }
    var g = parseFloat(metricStr.match(/[\d.]+/)[0]);
    var oz = g * 0.03527;
    if (g >= 454) return '~' + (g / 453.6).toFixed(1) + ' lb';
    if (oz < 0.1) return '<0.1 oz';
    return '~' + (oz < 1 ? oz.toFixed(2) : oz.toFixed(1)) + ' oz';
  }

  function renderResults(edd, lmp, conceptionDate) {
    const now = today();
    const gaDays = daysBetween(lmp, now);
    const gaWeeks = Math.floor(gaDays / 7);
    const gaDaysRem = gaDays % 7;
    const daysLeft = daysBetween(now, edd);
    const totalDays = daysBetween(lmp, edd);
    const progressPct = Math.min(100, Math.max(0, Math.round((gaDays / totalDays) * 100)));
    const trimester = getTrimester(gaWeeks);
    const fetalSize = getFetalSize(gaWeeks);

    document.getElementById('preg-result').classList.remove('hidden');

    document.getElementById('preg-edd').textContent = formatDate(edd);
    document.getElementById('preg-ga').textContent =
      gaWeeks + ' weeks' + (gaDaysRem > 0 ? ', ' + gaDaysRem + ' day' + (gaDaysRem !== 1 ? 's' : '') : '');
    document.getElementById('preg-trimester').textContent = trimester.num;
    document.getElementById('preg-trimester-sub').textContent = trimester.weeks;

    const daysLeftEl = document.getElementById('preg-days-left');
    const daysLeftLabelEl = document.getElementById('preg-days-left-label');
    if (daysLeft < 0) {
      daysLeftEl.textContent = Math.abs(daysLeft);
      daysLeftLabelEl.textContent = 'days past due';
    } else if (daysLeft === 0) {
      daysLeftEl.textContent = 'Today!';
      daysLeftLabelEl.textContent = 'is your due date';
    } else {
      daysLeftEl.textContent = daysLeft;
      daysLeftLabelEl.textContent = 'days remaining';
    }

    const progressFill = document.getElementById('preg-progress-fill');
    const progressLabel = document.getElementById('preg-progress-label');
    if (progressFill) {
      progressFill.style.width = progressPct + '%';
      progressLabel.textContent = progressPct + '% through your pregnancy';
    }

    var halfwayDate = addDays(lmp, 140);
    var daysToHalfway = daysBetween(now, halfwayDate);
    var halfwayEl = document.getElementById('preg-halfway');
    var halfwaySubEl = document.getElementById('preg-halfway-sub');
    if (halfwayEl) {
      halfwayEl.textContent = formatDate(halfwayDate);
      halfwaySubEl.textContent = daysToHalfway < 0
        ? Math.abs(daysToHalfway) + ' days ago'
        : daysToHalfway === 0
          ? 'Today!'
          : 'in ' + daysToHalfway + ' days';
    }

    const fetalSizeCard = document.getElementById('preg-size-card');
    if (fetalSize && gaWeeks >= 4) {
      fetalSizeCard.classList.remove('hidden');
      document.getElementById('preg-size-emoji').textContent = fetalSize.emoji;
      var artEl = document.getElementById('preg-size-article');
      if (artEl) artEl.textContent = article(fetalSize.name);
      document.getElementById('preg-size-name').textContent = fetalSize.name;
      document.getElementById('preg-size-week').textContent = 'at week ' + gaWeeks;
      document.getElementById('preg-size-detail').innerHTML =
        fetalSize.length + ' · ' + fetalSize.weight +
        ' <span class="preg-size-imperial">(' + convertLength(fetalSize.length) + ' · ' + convertWeight(fetalSize.weight) + ')</span>';
    } else {
      fetalSizeCard.classList.add('hidden');
    }

    const keyDates = [
      { label: 'Last menstrual period', date: lmp },
      { label: 'Estimated conception', date: conceptionDate },
      { label: 'End of 1st trimester', date: addDays(lmp, 91) },
      { label: '2nd trimester begins', date: addDays(lmp, 98) },
      { label: 'Anatomy scan window', date: addDays(lmp, 126) },
      { label: 'Halfway point (week 20)', date: addDays(lmp, 140) },
      { label: '3rd trimester begins', date: addDays(lmp, 196) },
      { label: 'Full term (week 37)', date: addDays(lmp, 259) },
      { label: 'Estimated due date', date: edd },
    ];
    const datesGrid = document.getElementById('preg-dates-grid');
    datesGrid.innerHTML = keyDates.map(function(kd) {
      var isPast = kd.date < now;
      return '<div class="preg-date-row' + (isPast ? ' preg-date-past' : '') + '">' +
        '<span class="preg-date-label">' + kd.label + '</span>' +
        '<span class="preg-date-val">' + formatDate(kd.date) + '</span>' +
        '</div>';
    }).join('');

    var nearby = MILESTONES.filter(function(m) {
      return m.week >= Math.max(0, gaWeeks - 1) && m.week <= gaWeeks + 10;
    }).slice(0, 6);
    var timelineEl = document.getElementById('preg-timeline');
    timelineEl.innerHTML = nearby.map(function(m) {
      var mDate = addDays(lmp, m.week * 7);
      var isPast = mDate < now;
      var isNow = m.week === gaWeeks || m.week === gaWeeks + 1;
      return '<div class="preg-milestone' + (isPast ? ' preg-milestone-past' : '') + (isNow ? ' preg-milestone-now' : '') + '">' +
        '<div class="preg-milestone-week">Wk ' + m.week + '</div>' +
        '<div class="preg-milestone-info">' +
          '<div class="preg-milestone-label">' + m.label + '</div>' +
          '<div class="preg-milestone-date">' + formatDate(mDate) + '</div>' +
        '</div>' +
        '</div>';
    }).join('');
  }

  var currentMode = 'lmp';
  var ivfAge = 5;
  var currentLMP = null;
  var currentEDD = null;

  var tabs = document.querySelectorAll('.preg-tab');
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      currentMode = tab.dataset.mode;
      document.querySelectorAll('.preg-mode').forEach(function(m) { m.classList.remove('active'); });
      var modeEl = document.getElementById('preg-mode-' + currentMode);
      if (modeEl) modeEl.classList.add('active');
      document.getElementById('preg-result').classList.add('hidden');
      calculate();
    });
  });

  document.querySelectorAll('.preg-age-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.preg-age-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      ivfAge = parseInt(btn.dataset.age);
      calculate();
    });
  });

  function calculate() {
    var lmp = null;
    var edd = null;
    var conceptionDate = null;
    var now = today();

    if (currentMode === 'lmp') {
      var lmpStr = document.getElementById('preg-lmp-date').value;
      var cycleVal = parseInt(document.getElementById('preg-cycle').value) || 28;
      lmp = parseDate(lmpStr);
      if (!lmp) return;
      var adj = cycleVal - 28;
      edd = addDays(lmp, 280 + adj);
      conceptionDate = addDays(lmp, 14 + adj);

    } else if (currentMode === 'conception') {
      var concStr = document.getElementById('preg-conception-date').value;
      conceptionDate = parseDate(concStr);
      if (!conceptionDate) return;
      edd = addDays(conceptionDate, 266);
      lmp = addDays(conceptionDate, -14);

    } else if (currentMode === 'due-date') {
      var ddStr = document.getElementById('preg-known-due').value;
      edd = parseDate(ddStr);
      if (!edd) return;
      lmp = addDays(edd, -280);
      conceptionDate = addDays(edd, -266);

    } else if (currentMode === 'ultrasound') {
      var usDateStr = document.getElementById('preg-us-date').value;
      var usDate = parseDate(usDateStr);
      var usWeeks = parseInt(document.getElementById('preg-us-weeks').value) || 0;
      var usDays = parseInt(document.getElementById('preg-us-days').value) || 0;
      if (!usDate || (usWeeks === 0 && usDays === 0)) return;
      var gaTotalDays = usWeeks * 7 + usDays;
      lmp = addDays(usDate, -gaTotalDays);
      edd = addDays(lmp, 280);
      conceptionDate = addDays(lmp, 14);

    } else if (currentMode === 'ivf') {
      var ivfDateStr = document.getElementById('preg-ivf-date').value;
      var ivfDate = parseDate(ivfDateStr);
      if (!ivfDate) return;
      var gaAtTransfer = 14 + ivfAge;
      lmp = addDays(ivfDate, -gaAtTransfer);
      edd = addDays(lmp, 280);
      conceptionDate = addDays(ivfDate, -ivfAge);
    }

    if (!lmp || !edd || !conceptionDate) return;
    currentLMP = lmp;
    currentEDD = edd;
    renderResults(edd, lmp, conceptionDate);
  }

  var inputIds = [
    'preg-lmp-date', 'preg-cycle',
    'preg-conception-date',
    'preg-known-due',
    'preg-us-date', 'preg-us-weeks', 'preg-us-days',
    'preg-ivf-date'
  ];
  inputIds.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', calculate);
      el.addEventListener('input', calculate);
    }
  });

  var lookupInput = document.getElementById('preg-lookup-date');
  var lookupResult = document.getElementById('preg-lookup-result');
  if (lookupInput && lookupResult) {
    lookupInput.addEventListener('change', function() {
      if (!currentLMP) return;
      var targetDate = parseDate(lookupInput.value);
      if (!targetDate) { lookupResult.innerHTML = ''; return; }
      var gaDays = daysBetween(currentLMP, targetDate);
      if (gaDays < 0) {
        lookupResult.innerHTML = '<span class="preg-lookup-note">This date is before the pregnancy begins.</span>';
        return;
      }
      var gaWeeks = Math.floor(gaDays / 7);
      var gaDaysRem = gaDays % 7;
      var trimester = getTrimester(gaWeeks);
      var fetalSize = getFetalSize(gaWeeks);
      var gaStr = gaWeeks + ' weeks' + (gaDaysRem > 0 ? ', ' + gaDaysRem + ' day' + (gaDaysRem !== 1 ? 's' : '') : '');
      var lookupTotalDays = currentEDD ? daysBetween(currentLMP, currentEDD) : 280;
      var lookupPct = Math.min(100, Math.max(0, Math.round((gaDays / lookupTotalDays) * 100)));
      var html = '<div class="preg-lookup-answer">' +
        '<div class="preg-lookup-ga">' + gaStr + '</div>' +
        '<div class="preg-lookup-tri">' + trimester.label + '</div>' +
        '<div class="preg-progress-bar" style="margin-top:0.6rem;">' +
          '<div class="preg-progress-fill" style="width:' + lookupPct + '%"></div>' +
        '</div>' +
        '<div class="preg-progress-label">' + lookupPct + '% through your pregnancy</div>';
      if (fetalSize && gaWeeks >= 4) {
        html += '<div class="preg-lookup-size">' + fetalSize.emoji + ' Size of ' + article(fetalSize.name) + ' ' + fetalSize.name +
          ' &mdash; ' + fetalSize.length + ' · ' + fetalSize.weight +
          ' <span class="preg-size-imperial">(' + convertLength(fetalSize.length) + ' · ' + convertWeight(fetalSize.weight) + ')</span>' +
          '</div>';
      }
      html += '</div>';
      lookupResult.innerHTML = html;
    });
  }

  var defaultLMP = addDays(today(), -70);
  var lmpInput = document.getElementById('preg-lmp-date');
  if (lmpInput) {
    lmpInput.value = defaultLMP.getFullYear() + '-' +
      String(defaultLMP.getMonth() + 1).padStart(2, '0') + '-' +
      String(defaultLMP.getDate()).padStart(2, '0');
  }
  calculate();
});
