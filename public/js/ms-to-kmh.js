document.addEventListener('DOMContentLoaded', () => {
  const msInput  = document.getElementById('sk-ms');
  const kmhInput = document.getElementById('sk-kmh');
  const mphInput = document.getElementById('sk-mph');
  const ftsInput = document.getElementById('sk-fts');
  const knInput  = document.getElementById('sk-kn');

  const KMH = 3.6;
  const MPH = 2.23694;
  const FTS = 3.28084;
  const KN  = 1.94384;

  function fmt(n) {
    if (n === 0) return '0';
    if (Math.abs(n) >= 1000) return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
    return parseFloat(n.toPrecision(6)).toString();
  }

  function updateFrom(ms, skip) {
    if (skip !== msInput)  msInput.value  = isNaN(ms) ? '' : fmt(ms);
    if (skip !== kmhInput) kmhInput.value = isNaN(ms) ? '' : fmt(ms * KMH);
    if (skip !== mphInput) mphInput.value = isNaN(ms) ? '' : fmt(ms * MPH);
    if (skip !== ftsInput) ftsInput.value = isNaN(ms) ? '' : fmt(ms * FTS);
    if (skip !== knInput)  knInput.value  = isNaN(ms) ? '' : fmt(ms * KN);
  }

  msInput.addEventListener('input',  () => updateFrom(parseFloat(msInput.value), msInput));
  kmhInput.addEventListener('input', () => updateFrom(parseFloat(kmhInput.value) / KMH, kmhInput));
  mphInput.addEventListener('input', () => updateFrom(parseFloat(mphInput.value) / MPH, mphInput));
  ftsInput.addEventListener('input', () => updateFrom(parseFloat(ftsInput.value) / FTS, ftsInput));
  knInput.addEventListener('input',  () => updateFrom(parseFloat(knInput.value)  / KN,  knInput));

  msInput.value = '10';
  updateFrom(10, msInput);
});
