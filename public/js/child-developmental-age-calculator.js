document.addEventListener('DOMContentLoaded', () => {
  const MILESTONES = {
    gross: [
      { age: 2,  label: 'Holds head up briefly during tummy time' },
      { age: 4,  label: 'Pushes up on arms during tummy time' },
      { age: 6,  label: 'Rolls from tummy to back' },
      { age: 9,  label: 'Sits without support for a few seconds' },
      { age: 12, label: 'Pulls up to stand, holding furniture' },
      { age: 15, label: 'Takes a few steps without holding on' },
      { age: 18, label: 'Walks without holding on (may still fall sometimes)' },
      { age: 24, label: 'Runs without falling most of the time' },
      { age: 30, label: 'Kicks a ball' },
      { age: 36, label: 'Jumps with both feet off the floor' },
      { age: 48, label: 'Hops on one foot for at least 2 seconds' },
      { age: 60, label: 'Skips on alternating feet' },
    ],
    fine: [
      { age: 2,  label: 'Opens and closes hands' },
      { age: 4,  label: 'Brings hands to mouth' },
      { age: 6,  label: 'Passes objects from one hand to the other' },
      { age: 9,  label: 'Picks up small objects with thumb and finger (pincer grasp)' },
      { age: 12, label: 'Puts objects in a container and takes them out' },
      { age: 15, label: 'Stacks at least 2 small objects on top of each other' },
      { age: 18, label: 'Tries to use a spoon to scoop food' },
      { age: 24, label: 'Stacks at least 4 blocks' },
      { age: 30, label: 'Turns pages of a book one at a time' },
      { age: 36, label: 'Draws or copies a circle' },
      { age: 48, label: 'Cuts paper with child-safe scissors' },
      { age: 60, label: 'Copies a triangle or other simple shapes' },
    ],
    language: [
      { age: 2,  label: 'Makes cooing or "ooh" and "aah" sounds' },
      { age: 4,  label: 'Makes sounds back when you talk to them' },
      { age: 6,  label: 'Babbles with consonant sounds (ba, da, ma)' },
      { age: 9,  label: 'Makes different sounds for different things' },
      { age: 12, label: 'Says "mama" or "dada" with meaning' },
      { age: 15, label: 'Says 3 or more words besides mama and dada' },
      { age: 18, label: 'Uses at least 10 words' },
      { age: 24, label: 'Uses at least 50 words, starts combining 2 words ("more milk")' },
      { age: 30, label: 'Uses mostly 2-word phrases' },
      { age: 36, label: 'Speaks in 2-3 word sentences most of the time' },
      { age: 48, label: 'Tells a simple story with at least 2 events' },
      { age: 60, label: 'Speaks clearly in full sentences; strangers understand most of what they say' },
    ],
    social: [
      { age: 2,  label: 'Calms when picked up by familiar caregiver' },
      { age: 4,  label: 'Smiles spontaneously at people' },
      { age: 6,  label: 'Knows familiar faces; may be cautious with strangers' },
      { age: 9,  label: 'Is shy or nervous with strangers' },
      { age: 12, label: 'Plays games like peek-a-boo' },
      { age: 15, label: 'Points to show you something interesting' },
      { age: 18, label: 'Shows affection by hugging or kissing familiar people' },
      { age: 24, label: 'Notices and watches other children; plays next to them' },
      { age: 30, label: 'Shows interest in playing with other children' },
      { age: 36, label: 'Takes turns in simple games with other children' },
      { age: 48, label: 'Pretends to be a character (teacher, superhero, animal) in play' },
      { age: 60, label: 'Follows rules in simple games with other children' },
    ],
    cognitive: [
      { age: 2,  label: 'Tracks objects with eyes from side to side' },
      { age: 4,  label: 'Shows boredom if activity does not change' },
      { age: 6,  label: 'Looks around at things nearby; explores with hands and mouth' },
      { age: 9,  label: 'Looks for objects when dropped out of sight (object permanence)' },
      { age: 12, label: 'Explores objects by shaking, banging, throwing' },
      { age: 15, label: 'Tries to use things the right way (phone to ear, cup to mouth)' },
      { age: 18, label: 'Points to 2-3 body parts when asked ("Where is your nose?")' },
      { age: 24, label: 'Sorts objects by shape or color' },
      { age: 30, label: 'Understands "mine" vs. "theirs"' },
      { age: 36, label: 'Draws a person with 2 or more body parts' },
      { age: 48, label: 'Names some colors and counts to 3' },
      { age: 60, label: 'Counts 10 or more objects correctly' },
    ],
  };

  const DOMAIN_META = {
    gross:    { label: 'Gross Motor',       emoji: '🏃' },
    fine:     { label: 'Fine Motor',        emoji: '✋' },
    language: { label: 'Language',          emoji: '💬' },
    social:   { label: 'Social/Emotional',  emoji: '🤝' },
    cognitive:{ label: 'Cognitive',         emoji: '🧩' },
  };

  const yearsInput  = document.getElementById('cda-years');
  const monthsInput = document.getElementById('cda-months');
  const checklist   = document.getElementById('cda-checklist');
  const result      = document.getElementById('cda-result');

  function getTotalMonths() {
    return (parseInt(yearsInput.value) || 0) * 12 + (parseInt(monthsInput.value) || 0);
  }

  function formatAge(months) {
    if (months <= 0) return '< 2 months';
    if (months < 12) return months + ' month' + (months !== 1 ? 's' : '');
    const y = Math.floor(months / 12);
    const m = months % 12;
    if (m === 0) return y + ' year' + (y !== 1 ? 's' : '');
    return y + 'y ' + m + 'm';
  }

  function renderChecklist() {
    const chronAge = getTotalMonths();
    if (chronAge === 0) { checklist.innerHTML = '<p style="color:rgba(255,255,255,0.4);font-size:0.85rem;padding:0.5rem 0;">Enter your child\'s age above to see milestones.</p>'; result.innerHTML = ''; return; }

    const maxShow = Math.min(chronAge + 6, 60);

    checklist.innerHTML = Object.keys(MILESTONES).map(domain => {
      const items = MILESTONES[domain].filter(m => m.age <= maxShow);
      if (!items.length) return '';
      const { label, emoji } = DOMAIN_META[domain];
      return `<div class="cda-domain-section">
        <div class="cda-domain-header">${emoji} ${label}</div>
        ${items.map(m => `<label class="cda-milestone-item">
          <input type="checkbox" class="cda-check" data-domain="${domain}" data-age="${m.age}" />
          <span class="cda-milestone-text">${m.label}</span>
          <span class="cda-milestone-age-tag">${formatAge(m.age)}</span>
        </label>`).join('')}
      </div>`;
    }).join('');

    checklist.querySelectorAll('.cda-check').forEach(cb => cb.addEventListener('change', calculate));
    calculate();
  }

  function calculate() {
    const chronAge = getTotalMonths();
    if (chronAge === 0) { result.innerHTML = ''; return; }

    const domainScores = {};
    Object.keys(MILESTONES).forEach(domain => {
      const checked = [...checklist.querySelectorAll(`.cda-check[data-domain="${domain}"]:checked`)];
      domainScores[domain] = checked.length ? Math.max(...checked.map(cb => parseInt(cb.dataset.age))) : null;
    });

    const scored = Object.values(domainScores).filter(v => v !== null);
    if (!scored.length) { result.innerHTML = ''; return; }

    const overallDevAge = Math.round(scored.reduce((a, b) => a + b, 0) / scored.length);
    const gap = chronAge - overallDevAge;
    const pctDelay = Math.round((gap / chronAge) * 100);

    let statusLabel, statusClass;
    if (pctDelay <= 0)       { statusLabel = 'On track or ahead';                              statusClass = 'dtt-mastery-met'; }
    else if (pctDelay <= 15) { statusLabel = 'Slight delay - monitor at next well visit';       statusClass = 'igp-status-progress'; }
    else if (pctDelay <= 33) { statusLabel = 'Moderate delay - discuss with pediatrician';      statusClass = 'cda-status-moderate'; }
    else                     { statusLabel = 'Significant delay - seek evaluation promptly';    statusClass = 'dtt-mastery-not-met'; }

    const domainCards = Object.keys(MILESTONES).map(domain => {
      const devAge = domainScores[domain];
      if (devAge === null) return '';
      const domGap = chronAge - devAge;
      const color = domGap <= 0 ? 'rgba(134,239,172,0.9)' : domGap <= Math.round(chronAge * 0.15) ? 'rgba(251,191,36,0.9)' : 'rgba(252,165,165,0.9)';
      const { label, emoji } = DOMAIN_META[domain];
      return `<div class="cda-domain-card">
        <div class="cda-domain-card-emoji">${emoji}</div>
        <div class="cda-domain-card-label">${label}</div>
        <div class="cda-domain-card-value" style="color:${color}">${formatAge(devAge)}</div>
      </div>`;
    }).join('');

    result.innerHTML = `<div class="abr-result-card">
      <div class="abr-result-primary">
        <div class="abr-result-label">Overall developmental age</div>
        <div class="abr-result-value">${formatAge(overallDevAge)}<span class="abr-result-unit"> of ${formatAge(chronAge)}</span></div>
        <div class="dtt-mastery-badge ${statusClass}">${statusLabel}</div>
      </div>
      <div class="abr-result-secondary">
        <div class="abr-result-row"><span>Chronological age</span><span class="abr-result-num">${formatAge(chronAge)}</span></div>
        <div class="abr-result-row"><span>Developmental age</span><span class="abr-result-num">${formatAge(overallDevAge)}</span></div>
        <div class="abr-result-row"><span>Gap</span><span class="abr-result-num">${gap <= 0 ? 'None (on track)' : formatAge(gap) + ' behind'}</span></div>
        <div class="abr-result-row"><span>Domains assessed</span><span class="abr-result-num">${scored.length} of 5</span></div>
      </div>
    </div>
    ${domainCards ? '<div class="cda-domain-grid">' + domainCards + '</div>' : ''}`;
  }

  [yearsInput, monthsInput].forEach(el => el.addEventListener('input', renderChecklist));
  renderChecklist();
});
