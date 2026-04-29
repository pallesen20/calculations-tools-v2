import type { ToolVideoData } from './video-data.js';
import { VIDEO_DATA } from './video-data.js';

interface ToolMeta {
  slug: string;
  name: string;
  path: string;
  category: string;
  priority: number;
}

const TOOLS: ToolMeta[] = [
  { slug: 'bmi-calculator',            name: 'BMI Calculator',                   path: '/health/bmi-calculator',                    category: 'Health',      priority: 1 },
  { slug: 'body-fat-calculator',       name: 'Body Fat Calculator',              path: '/health/body-fat-calculator',               category: 'Health',      priority: 1 },
  { slug: 'ffmi-calculator',           name: 'FFMI Calculator',                  path: '/health/ffmi-calculator',                   category: 'Health',      priority: 1 },
  { slug: 'ideal-weight-calculator',   name: 'Ideal Weight Calculator',          path: '/health/ideal-weight-calculator',           category: 'Health',      priority: 1 },
  { slug: 'lean-body-mass-calculator', name: 'Lean Body Mass Calculator',        path: '/health/lean-body-mass-calculator',         category: 'Health',      priority: 1 },
  { slug: 'loan-payment-calculator',      name: 'Loan Payment Calculator',       path: '/finance/loan-payment-calculator',          category: 'Finance',     priority: 2 },
  { slug: 'compound-interest-calculator', name: 'Compound Interest Calculator',  path: '/finance/compound-interest-calculator',     category: 'Finance',     priority: 2 },
  { slug: 'roi-calculator',               name: 'ROI Calculator',                path: '/finance/roi-calculator',                   category: 'Finance',     priority: 2 },
  { slug: 'salary-to-hourly-calculator',  name: 'Salary to Hourly Calculator',   path: '/finance/salary-to-hourly-calculator',      category: 'Finance',     priority: 2 },
  { slug: 'pay-raise-calculator',         name: 'Pay Raise Calculator',          path: '/finance/pay-raise-calculator',             category: 'Finance',     priority: 2 },
  { slug: 'annual-income-calculator',           name: 'Annual Income Calculator',           path: '/finance/annual-income-calculator',           category: 'Finance', priority: 3 },
  { slug: 'break-even-calculator',              name: 'Break-Even Calculator',              path: '/finance/break-even-calculator',              category: 'Finance', priority: 3 },
  { slug: 'contribution-margin-calculator',     name: 'Contribution Margin Calculator',     path: '/finance/contribution-margin-calculator',     category: 'Finance', priority: 3 },
  { slug: 'ebit-calculator',                    name: 'EBIT Calculator',                    path: '/finance/ebit-calculator',                    category: 'Finance', priority: 3 },
  { slug: 'ebitda-calculator',                  name: 'EBITDA Calculator',                  path: '/finance/ebitda-calculator',                  category: 'Finance', priority: 3 },
  { slug: 'ebitda-margin-calculator',           name: 'EBITDA Margin Calculator',           path: '/finance/ebitda-margin-calculator',           category: 'Finance', priority: 3 },
  { slug: 'ebt-calculator',                     name: 'EBT Calculator',                     path: '/finance/ebt-calculator',                     category: 'Finance', priority: 3 },
  { slug: 'enterprise-value-calculator',        name: 'Enterprise Value Calculator',        path: '/finance/enterprise-value-calculator',        category: 'Finance', priority: 3 },
  { slug: 'free-cash-flow-calculator',          name: 'Free Cash Flow Calculator',          path: '/finance/free-cash-flow-calculator',          category: 'Finance', priority: 3 },
  { slug: 'google-adsense-calculator',          name: 'Google AdSense Calculator',          path: '/finance/google-adsense-calculator',          category: 'Finance', priority: 3 },
  { slug: 'gross-profit-margin-calculator',     name: 'Gross Profit Margin Calculator',     path: '/finance/gross-profit-margin-calculator',     category: 'Finance', priority: 3 },
  { slug: 'net-profit-margin-calculator',       name: 'Net Profit Margin Calculator',       path: '/finance/net-profit-margin-calculator',       category: 'Finance', priority: 3 },
  { slug: 'operating-profit-margin-calculator', name: 'Operating Profit Margin Calculator', path: '/finance/operating-profit-margin-calculator', category: 'Finance', priority: 3 },
  { slug: 'overtime-calculator',                name: 'Overtime Calculator',                path: '/finance/overtime-calculator',                category: 'Finance', priority: 3 },
  { slug: 'pe-ratio-calculator',                name: 'P/E Ratio Calculator',               path: '/finance/pe-ratio-calculator',                category: 'Finance', priority: 3 },
  { slug: 'roe-calculator',                     name: 'ROE Calculator',                     path: '/finance/roe-calculator',                     category: 'Finance', priority: 3 },
  { slug: 'working-capital-calculator',         name: 'Working Capital Calculator',         path: '/finance/working-capital-calculator',         category: 'Finance', priority: 3 },
  { slug: 'case-converter',        name: 'Case Converter',        path: '/conversion/case-converter',        category: 'Conversion', priority: 4 },
  { slug: 'currency-converter',    name: 'Currency Converter',    path: '/conversion/currency-converter',    category: 'Conversion', priority: 4 },
  { slug: 'height-converter',      name: 'Height Converter',      path: '/conversion/height-converter',      category: 'Conversion', priority: 4 },
  { slug: 'image-to-text',         name: 'Image to Text',         path: '/conversion/image-to-text',         category: 'Conversion', priority: 4 },
  { slug: 'length-converter',      name: 'Length Converter',      path: '/conversion/length-converter',      category: 'Conversion', priority: 4 },
  { slug: 'speed-converter',       name: 'Speed Converter',       path: '/conversion/speed-converter',       category: 'Conversion', priority: 4 },
  { slug: 'temperature-converter', name: 'Temperature Converter', path: '/conversion/temperature-converter', category: 'Conversion', priority: 4 },
  { slug: 'weight-converter',      name: 'Weight Converter',      path: '/conversion/weight-converter',      category: 'Conversion', priority: 4 },
  { slug: 'percentage-calculator', name: 'Percentage Calculator', path: '/math/percentage-calculator', category: 'Math', priority: 5 },
  { slug: 'fraction-calculator',   name: 'Fraction Calculator',   path: '/math/fraction-calculator',   category: 'Math', priority: 5 },
  { slug: 'ratio-calculator',      name: 'Ratio Calculator',      path: '/math/ratio-calculator',      category: 'Math', priority: 5 },
  { slug: 'diff-checker', name: 'Diff Checker', path: '/compare/text', category: 'Tools', priority: 6 },
];

const VIDEO_TITLES: Record<string, string> = {
  'bmi-calculator':                    'How to Calculate BMI: BMI Calculator Tutorial',
  'body-fat-calculator':               'How to Calculate Body Fat %: Tutorial',
  'ffmi-calculator':                   'How to Calculate FFMI: FFMI Calculator Tutorial',
  'ideal-weight-calculator':           'How to Find Your Ideal Weight: Tutorial',
  'lean-body-mass-calculator':         'How to Calculate Lean Body Mass: Tutorial',
  'loan-payment-calculator':           'How to Calculate Loan Payments: Tutorial',
  'compound-interest-calculator':      'How to Calculate Compound Interest: Tutorial',
  'roi-calculator':                    'How to Calculate ROI: ROI Calculator Tutorial',
  'salary-to-hourly-calculator':       'How to Convert Salary to Hourly Rate: Tutorial',
  'pay-raise-calculator':              'How to Calculate a Pay Raise: Tutorial',
  'annual-income-calculator':          'How to Calculate Annual Income: Tutorial',
  'break-even-calculator':             'How to Calculate Break-Even Point: Tutorial',
  'contribution-margin-calculator':    'How to Calculate Contribution Margin: Tutorial',
  'ebit-calculator':                   'How to Calculate EBIT: EBIT Calculator Tutorial',
  'ebitda-calculator':                 'How to Calculate EBITDA: Tutorial',
  'ebitda-margin-calculator':          'How to Calculate EBITDA Margin: Tutorial',
  'ebt-calculator':                    'How to Calculate EBT: EBT Calculator Tutorial',
  'enterprise-value-calculator':       'How to Calculate Enterprise Value: Tutorial',
  'free-cash-flow-calculator':         'How to Calculate Free Cash Flow: Tutorial',
  'google-adsense-calculator':         'How to Estimate AdSense Earnings: Tutorial',
  'gross-profit-margin-calculator':    'How to Calculate Gross Profit Margin: Tutorial',
  'net-profit-margin-calculator':      'How to Calculate Net Profit Margin: Tutorial',
  'operating-profit-margin-calculator':'How to Calculate Operating Profit Margin: Tutorial',
  'overtime-calculator':               'How to Calculate Overtime Pay: Tutorial',
  'pe-ratio-calculator':               'How to Calculate P/E Ratio: Tutorial',
  'roe-calculator':                    'How to Calculate Return on Equity: Tutorial',
  'working-capital-calculator':        'How to Calculate Working Capital: Tutorial',
  'case-converter':                    'How to Convert Text Case: Case Converter Tutorial',
  'currency-converter':                'How to Convert Currency: Currency Converter Tutorial',
  'height-converter':                  'How to Convert Height Units: Tutorial',
  'image-to-text':                     'How to Extract Text from Images: OCR Tutorial',
  'length-converter':                  'How to Convert Length Units: Tutorial',
  'speed-converter':                   'How to Convert Speed Units: Tutorial',
  'temperature-converter':             'How to Convert Temperature: Tutorial',
  'weight-converter':                  'How to Convert Weight Units: Tutorial',
  'percentage-calculator':             'How to Calculate Percentages: Tutorial',
  'fraction-calculator':               'How to Calculate Fractions: Tutorial',
  'ratio-calculator':                  'How to Calculate Ratios: Tutorial',
  'diff-checker':                      'How to Compare Text & Code: Diff Checker Tutorial',
};

const CATEGORY_TAGS: Record<string, string> = {
  'Health':     'calculations.tools, free calculator, health calculator, fitness tool, body measurements',
  'Finance':    'calculations.tools, free calculator, finance calculator, money tool, business math',
  'Conversion': 'calculations.tools, free calculator, unit converter, conversion tool, online converter',
  'Math':       'calculations.tools, free calculator, math calculator, percentage, arithmetic',
  'Tools':      'calculations.tools, free tool, text comparison, diff checker, code compare',
};

function fillTemplate(tool: ToolMeta, data: ToolVideoData): string {
  const isDiff = tool.slug === 'diff-checker';
  const firstName = data.character.split(',')[0];

  const hook =
`[HOOK]
If you've ever needed to ${data.hookProblem}, you know how important getting it right is. Getting the wrong number here doesn't just mean a bit of confusion — it can lead to real mistakes in how you plan, budget, or track your health. In this video, I'll show you exactly how to use the ${tool.name} on calculations.tools, and I'll walk you through a complete real-world example so you can see exactly how it works.`;

  const formula =
`[FORMULA]
So what exactly are we calculating here? The ${tool.name} uses ${data.formulaPlain}. Each input you enter plays a specific role in the final figure. Breaking it down: the numbers combine to give you a single result that's standardised and comparable — meaning you can look up what your result means against established benchmarks. That's what makes this more useful than a rough estimate. The formula itself has been validated by researchers and is used by professionals worldwide, so when the tool gives you a number, you can trust it.`;

  const example =
`[EXAMPLE]
Let's make this concrete with a real example. ${data.character}. ${data.exampleSetup}. Now let's run the numbers. ${data.exampleWalkthrough}. So ${firstName}'s result comes out at ${data.exampleResult}. Let's put that in context: ${data.exampleImplication}. That's a meaningful, actionable insight — and it came from just a few numbers entered into a form.`;

  const demoSuffix = isDiff
    ? ' And this works exactly the same for code, CSS, JavaScript, Python, and HTML — just pick the right tool from the compare menu.'
    : '';

  const unitNoteSuffix = data.unitNote ? ` ${data.unitNote}` : '';

  const demo =
`[DEMO]
You don't need to do any of that math by hand. On calculations.tools, go to ${tool.path}. I'll enter the values from our example and hit Calculate. You get the result instantly — ${data.exampleResult} — and you'll also see ${data.notableFeature} right there on the same page. No spreadsheet, no formula lookup, no manual steps.${demoSuffix}${unitNoteSuffix}`;

  const proTip =
`[PRO TIP]
One thing most people get wrong when using this tool: ${data.proTipMistake}. When you make that mistake, the result looks plausible but it's actually off — and that can mean acting on bad information. The correct approach is: ${data.proTipFix}. Take an extra ten seconds to get the input right and the output will be spot on.`;

  const cta =
`[CTA]
The ${tool.name} is completely free at calculations.tools — no account, no sign-up, no paywalled results. If this video helped, subscribe for more tutorials like this one, and drop a comment below if you have any questions or want to see a specific tool covered next.`;

  return [hook, formula, example, demo, proTip, cta].join('\n\n');
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).length;
}

function buildDescription(hook: string, fullUrl: string): string {
  const body = hook.replace('[HOOK]\n', '').replace(/\n/g, ' ');
  return `${body}\n\nFull tool: ${fullUrl}`;
}

type SheetRow = [number, string, string, string, string, string, string, number, string];

async function postToSheet(url: string, rows: SheetRow[]): Promise<void> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rows }),
  });
  if (!res.ok) {
    throw new Error(`Sheet POST failed: ${res.status} ${await res.text()}`);
  }
  const json = await res.json() as { status: string; count: number };
  console.log(`Sheet response: ${json.status}, ${json.count} rows written`);
}

const DEFAULT_SHEET_URL = 'https://script.google.com/macros/s/AKfycby6Js-pOAR1Wm2G1eXGgVKACif7afocztYcQjB_eYE-3uXj77QbHvS94kVmDeBfphNu/exec';

async function main(): Promise<void> {
  const sheetIdx = process.argv.indexOf('--sheet');
  const sheetUrl = sheetIdx !== -1 ? process.argv[sheetIdx + 1] : DEFAULT_SHEET_URL;

  const rows: SheetRow[] = [];

  for (const tool of TOOLS) {
    const data = VIDEO_DATA[tool.slug];
    const fullUrl = `https://calculations.tools${tool.path}`;

    if (!data) {
      console.warn(`  TODO  ${tool.name} — no VIDEO_DATA entry`);
      rows.push([tool.priority, tool.category, tool.name, fullUrl,
        `TODO: ${tool.name} Tutorial`, 'TODO', CATEGORY_TAGS[tool.category] ?? '', 0,
        'TODO — add entry to scripts/video-data.ts']);
      continue;
    }

    const transcript  = fillTemplate(tool, data);
    const wc          = wordCount(transcript);
    const title       = VIDEO_TITLES[tool.slug] ?? `How to Use the ${tool.name}: Tutorial`;
    const hookSection = transcript.split('\n\n')[0];
    const description = buildDescription(hookSection, fullUrl);
    const tags        = CATEGORY_TAGS[tool.category] ?? '';

    rows.push([tool.priority, tool.category, tool.name, fullUrl, title, description, tags, wc, transcript]);
    console.log(`  ok   ${tool.name} — ${wc} words`);
  }

  console.log(`\nTotal rows: ${rows.length}`);

  if (sheetUrl) {
    console.log('\nPosting to Google Sheet...');
    await postToSheet(sheetUrl, rows);
    console.log('Done.');
  } else {
    console.log('\nNo sheet URL configured.');
    const sample = rows[0];
    if (sample) {
      console.log('\nSample row:');
      console.log(`  Priority   : ${sample[0]}`);
      console.log(`  Category   : ${sample[1]}`);
      console.log(`  Tool       : ${sample[2]}`);
      console.log(`  Video title: ${sample[4]}`);
      console.log(`  Word count : ${sample[7]}`);
      console.log(`\nTranscript preview:\n${(sample[8] as string).slice(0, 400)}...`);
    }
  }
}

main().catch(err => { console.error(err); process.exit(1); });
