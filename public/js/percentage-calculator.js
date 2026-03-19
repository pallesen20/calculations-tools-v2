const CONFIGS = {
  basic: {
    title: 'Basic Percentage',
    description: 'Calculate what X% of a number is',
    inputs: [
      { field: 'percentage', label: 'Percentage (%)', placeholder: 'e.g. 25' },
      { field: 'number1', label: 'Of number', placeholder: 'e.g. 200' },
    ],
    resultLabel: 'Result',
    resultSuffix: '',
    calculate: ({ percentage, number1 }) => {
      const p = parseFloat(percentage), n = parseFloat(number1);
      return isNaN(p) || isNaN(n) ? null : (n * p) / 100;
    },
    formula: ({ percentage, number1 }) => `${percentage}% × ${number1} ÷ 100`,
  },
  increase: {
    title: 'Percentage Increase',
    description: 'Calculate the percentage increase between two numbers',
    inputs: [
      { field: 'number1', label: 'Original value', placeholder: 'e.g. 50' },
      { field: 'number2', label: 'New value', placeholder: 'e.g. 65' },
    ],
    resultLabel: 'Percentage increase',
    resultSuffix: '%',
    calculate: ({ number1, number2 }) => {
      const a = parseFloat(number1), b = parseFloat(number2);
      return isNaN(a) || isNaN(b) || a === 0 ? null : ((b - a) / a) * 100;
    },
    formula: ({ number1, number2 }) => `(${number2} − ${number1}) ÷ ${number1} × 100`,
  },
  decrease: {
    title: 'Percentage Decrease',
    description: 'Calculate the percentage decrease between two numbers',
    inputs: [
      { field: 'number1', label: 'Original value', placeholder: 'e.g. 80' },
      { field: 'number2', label: 'New value', placeholder: 'e.g. 60' },
    ],
    resultLabel: 'Percentage decrease',
    resultSuffix: '%',
    calculate: ({ number1, number2 }) => {
      const a = parseFloat(number1), b = parseFloat(number2);
      return isNaN(a) || isNaN(b) || a === 0 ? null : ((a - b) / a) * 100;
    },
    formula: ({ number1, number2 }) => `(${number1} − ${number2}) ÷ ${number1} × 100`,
  },
  whatPercent: {
    title: 'What Percentage Is X of Y?',
    description: 'Find what percentage one number is of another',
    inputs: [
      { field: 'number1', label: 'First number (X)', placeholder: 'e.g. 30' },
      { field: 'number2', label: 'Second number (Y)', placeholder: 'e.g. 200' },
    ],
    resultLabel: 'Percentage',
    resultSuffix: '%',
    calculate: ({ number1, number2 }) => {
      const a = parseFloat(number1), b = parseFloat(number2);
      return isNaN(a) || isNaN(b) || b === 0 ? null : (a / b) * 100;
    },
    formula: ({ number1, number2 }) => `${number1} ÷ ${number2} × 100`,
  },
};

let activeType = 'basic';
let values = { number1: '', number2: '', percentage: '' };

const $ = (id) => document.getElementById(id);

function renderInputs() {
  const config = CONFIGS[activeType];
  const container = $('inputsContainer');
  container.innerHTML = '';

  config.inputs.forEach(({ field, label, placeholder }) => {
    const group = document.createElement('div');
    group.className = 'input-group';
    group.innerHTML = `
      <label for="${field}">${label}</label>
      <input type="text" inputmode="decimal" id="${field}" name="${field}"
        placeholder="${placeholder}" value="${values[field] || ''}" autocomplete="off" />
    `;
    group.querySelector('input').addEventListener('input', (e) => {
      values[field] = e.target.value;
      updateResult();
    });
    container.appendChild(group);
  });
}

function updateResult() {
  const config = CONFIGS[activeType];
  const hasAny = Object.values(values).some(v => v !== '');
  const result = config.calculate(values);
  const formulaEl = $('formulaDisplay');
  const resultEl = $('resultDisplay');

  if (hasAny) {
    $('formulaText').textContent = config.formula(values);
    formulaEl.classList.remove('hidden');
  } else {
    formulaEl.classList.add('hidden');
  }

  if (result !== null && !isNaN(result)) {
    $('resultLabel').textContent = config.resultLabel;
    $('resultValue').textContent = `${parseFloat(result.toFixed(4))}${config.resultSuffix}`;
    resultEl.classList.remove('hidden');
  } else {
    resultEl.classList.add('hidden');
  }
}

function switchType(type) {
  activeType = type;
  values = { number1: '', number2: '', percentage: '' };

  document.querySelectorAll('.calculator-card[data-type]').forEach(card => {
    card.classList.toggle('active', card.dataset.type === type);
  });

  $('calculator-title').textContent = CONFIGS[type].title;
  $('calculator-description').textContent = CONFIGS[type].description;
  renderInputs();
  $('formulaDisplay').classList.add('hidden');
  $('resultDisplay').classList.add('hidden');
}

async function copyResult() {
  const text = $('resultValue').textContent;
  await navigator.clipboard.writeText(text);
  const btn = $('copyButton');
  btn.textContent = '✓';
  setTimeout(() => btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>', 2000);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.calculator-card[data-type]').forEach(card => {
    card.addEventListener('click', () => {
      switchType(card.dataset.type);
      if (window.innerWidth < 768) {
        document.querySelector('.calculator-interface').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  $('resetButton')?.addEventListener('click', () => switchType(activeType));
  $('copyButton')?.addEventListener('click', copyResult);

  switchType('basic');
});