export const SITE = 'https://calculations.tools';

export interface PageMeta {
  title: string;
  description: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  url: string;
}

// Card fields used by index/listing pages
export interface CardMeta {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: string;
  units?: string;
}

// Lightweight record used by RelatedTools component
export interface RelatedToolMeta {
  path: string;
  icon: string;
  title: string;
  description: string;
}

export interface HealthToolMeta {
  path: string;
  title: string;
  short: string;
  description: string;
  icon: string;
  group: string;
}

// ─── Add new pages here — sitemap.xml and llms.txt update automatically ───────

const registry: Omit<PageMeta, 'url'>[] = []; // populated below

type Entry = Omit<PageMeta, 'url'> & { path: string; icon?: string; short?: string; units?: string };

const entries: Entry[] = [
  {
    path: '/',
    title: 'Calculations.tools — Free Online Calculators & Converters',
    description: 'Free online calculators and converters for percentages, unit conversion, text analysis, currency, and more. No registration, no ads, instant results.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '🏠',
  },
  {
    path: '/about-us',
    title: 'About Us — calculations.tools',
    description: 'Learn about calculations.tools — free, accurate calculation tools for everyone, built by Jesper Pallesen.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: 'ℹ️',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy — calculations.tools',
    description: 'Privacy policy explaining how calculations.tools collects, uses, and handles visitor data, including Google Analytics and advertising.',
    changefreq: 'yearly',
    priority: 0.3,
    icon: '🔒',
  },
  {
    path: '/math',
    title: 'Math Calculators — Free Online Tools',
    description: 'Free online math calculators: percentage calculators, doubling time, and more. Fast, accurate, no registration needed.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '∑',
  },
  {
    path: '/math/percentage-calculator',
    title: 'Percentage Calculator — Free Online Tool',
    description: 'Calculate percentages, percentage increases, decreases, and differences instantly. Free online percentage calculator with multiple modes.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '%',
    short: 'Percentages, increases & differences',
  },
  {
    path: '/math/percentage-calculator/increase',
    title: 'Percentage Increase Calculator — Formula & Examples',
    description: 'Calculate the percentage increase between two values instantly. See the formula, step-by-step workings, and a reference table for common percentage increases.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '↗',
    short: 'From old value to new value',
  },
  {
    path: '/math/percentage-calculator/decrease',
    title: 'Percentage Decrease Calculator — Formula & Examples',
    description: 'Calculate the percentage decrease between two values instantly. See the formula, step-by-step workings, and a reference table for common percentage decreases.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '↘',
    short: 'From old value to new (lower) value',
  },
  {
    path: '/math/percentage-calculator/change',
    title: 'Percentage Change Calculator — Formula & Examples',
    description: 'Calculate the percentage change between two values. Shows whether the result is an increase or decrease, the absolute difference, and step-by-step workings.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '↕',
    short: 'Increase or decrease, signed result',
  },
  {
    path: '/math/percentage-calculator/difference',
    title: 'Percentage Difference Calculator — Formula & Examples',
    description: 'Calculate the percentage difference between two values. Uses the average of both as the base — ideal for comparing two independent values with no defined starting point.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '⇔',
    short: 'Compare two values, unsigned result',
  },
  {
    path: '/math/percentage-calculator/average',
    title: 'Average Percentage Calculator — Formula & Examples',
    description: 'Calculate the average of multiple percentages instantly. Covers the arithmetic mean, weighted average, and when each method gives the correct result.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: 'x̄',
    short: 'Average of multiple percentages',
  },
  {
    path: '/math/percentage-calculator/fraction-to-percent',
    title: 'Fraction to Percent Calculator — Convert & Examples',
    description: 'Convert any fraction to a percentage instantly. Enter a numerator and denominator to get the percentage, decimal equivalent, and step-by-step workings.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '½',
    short: 'Numerator ÷ denominator × 100',
  },
  {
    path: '/math/percentage-calculator/decimal-to-percent',
    title: 'Decimal to Percent Calculator — Convert & Examples',
    description: 'Convert any decimal to a percentage instantly. Multiply by 100 — see the step-by-step working, a reference table for common decimals, and the reverse conversion.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '0.x',
    short: 'Decimal × 100 = percentage',
  },
  {
    path: '/math/percentage-calculator/percentage-of-percentage',
    title: 'Percentage of a Percentage Calculator — Formula & Examples',
    description: 'Calculate what P% of Q% equals. Covers the formula, successive discounts, commission tiers, and why stacking percentages is not the same as adding them.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '٪',
    short: 'P% of Q% = P×Q÷100',
  },
  {
    path: '/word-counter',
    title: 'Word Counter — Free Online Word Count Tool',
    description: 'Count words, characters, sentences, and paragraphs instantly. Free online word counter with reading time estimate.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '📝',
    short: 'Words, characters & reading time',
  },
  {
    path: '/week-number',
    title: 'What Week Number Is It? — Current Week Number 2026',
    description: 'Instantly see the current ISO 8601 week number. View all week numbers for the year with start and end dates. Plus code snippets for 20+ languages.',
    changefreq: 'daily',
    priority: 1.0,
    icon: '📅',
    short: 'ISO 8601 week number & year calendar',
  },
  {
    path: '/date-calculator',
    title: 'Date Calculator — Days Between Dates & Add Subtract Days',
    description: 'Calculate the number of days between two dates, or add and subtract days from any date. Shows total days, workdays, weeks, and years-months-days. Free date difference calculator.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '📆',
    short: 'Days between dates & date arithmetic',
  },
  {
    path: '/health',
    title: 'Health Calculators — Free BMI & Body Composition Tools',
    description: 'Free health calculators: BMI by age and sex, specialist BMI tools for men, women, kids, teens, seniors, and pregnancy, BMI weight loss planner, and lean body mass with FFMI for athletes.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '🏥',
  },
  {
    path: '/health/bmi-calculator',
    title: 'BMI Calculator by Age & Sex — Body Fat Estimate & Chart',
    description: 'Calculate BMI by age and sex. Get your BMI category, estimated body fat %, healthy weight range, and personalised age-specific interpretation — metric or imperial.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '⚤',
    short: 'Body Mass Index by age & sex',
  },
  {
    path: '/health/bmi-calculator/men',
    title: 'BMI Calculator for Men — Normal BMI Range by Age & Chart',
    description: 'Free BMI calculator for men. See the normal BMI range for men, BMI by age, waist circumference thresholds, the testosterone-obesity connection, and why BMI reads differently for muscular men.',
    changefreq: 'weekly',
    icon: '♂️',
    priority: 1.0,
    short: 'Men-specific thresholds & waist',
  },
  {
    path: '/health/bmi-calculator/women',
    title: 'BMI Calculator for Women — Healthy BMI Range, Chart & Age Guide',
    description: 'Free BMI calculator for women. See the healthy BMI range, BMI chart by age, how menopause affects body composition, normal weight obesity, and the best complementary health metrics.',
    changefreq: 'weekly',
    icon: '♀️',
    priority: 1.0,
    short: 'Menopause, NWO & female context',
  },
  {
    path: '/health/bmi-calculator/pregnancy',
    title: 'BMI Calculator During Pregnancy — Gestational Weight Gain by BMI',
    description: 'Calculate your pre-pregnancy BMI and get recommended gestational weight gain targets based on IOM 2009 guidelines. Covers weight gain by trimester, complications by BMI, and pre-conception guidance.',
    changefreq: 'weekly',
    icon: '🤰',
    priority: 1.0,
    short: 'Gestational weight gain (IOM)',
  },
  {
    path: '/health/bmi-calculator/kids',
    title: 'BMI Calculator for Kids — BMI-for-Age Percentile (Ages 2–12)',
    description: 'Free BMI calculator for children aged 2–12. Uses CDC 2000 growth charts to show BMI-for-age percentile and weight category. Healthy weight is the 5th to 85th percentile for your child\'s age and sex.',
    changefreq: 'weekly',
    icon: '🧒',
    priority: 1.0,
    short: 'BMI-for-age percentile, ages 2–12',
  },
  {
    path: '/health/bmi-calculator/seniors',
    title: 'BMI Calculator for Seniors — Adjusted Thresholds & Frailty Risk',
    description: 'BMI calculator for adults 65 and over. Shows the 23–27.5 senior optimal range, estimated body fat %, frailty risk, and sarcopenia guidance based on ESPEN and geriatric guidelines.',
    changefreq: 'weekly',
    icon: '👴',
    priority: 1.0,
    short: 'Adjusted thresholds for 65+',
  },
  {
    path: '/health/bmi-calculator/teens',
    title: 'BMI Calculator for Teens — BMI-for-Age Percentile (Ages 13–19)',
    description: 'Free BMI calculator for teenagers aged 13–19. Uses CDC 2000 growth charts to show BMI-for-age percentile and weight category. Covers puberty\'s effect on BMI, athletic teens, and the transition to adult categories at 20.',
    changefreq: 'weekly',
    icon: '🧑',
    priority: 1.0,
    short: 'BMI-for-age percentile, ages 13–19',
  },
  {
    path: '/health/bmi-calculator/weight-loss',
    title: 'BMI Weight Loss Calculator — Target BMI & Weight to Lose',
    description: 'Calculate how much weight you need to lose to reach your target BMI. Get your target weight, estimated time at your chosen weekly pace, and estimated body fat at current and goal weight.',
    changefreq: 'weekly',
    icon: '⚖️',
    priority: 1.0,
    short: 'Target BMI & time estimate',
  },
  {
    path: '/health/lean-body-mass-calculator',
    title: 'Lean Body Mass Calculator — LBM, FFMI & Body Fat %',
    description: 'Calculate lean body mass using Boer, Hume, and James formulas. Get fat mass, body fat %, and FFMI (Fat-Free Mass Index) with category — for athletes and fitness tracking.',
    changefreq: 'weekly',
    icon: '💪',
    priority: 1.0,
    short: 'Boer / Hume / James + FFMI',
  },
  {
    path: '/health/ffmi-calculator',
    title: 'FFMI Calculator — Fat-Free Mass Index & Natural Muscle Limit',
    description: 'Calculate your FFMI (Fat-Free Mass Index) from weight, height, and body fat %. See your muscle category, normalised FFMI, and how you compare to the Kouri 1995 natural limit — for athletes and strength trainers.',
    changefreq: 'weekly',
    icon: '🏋️',
    priority: 1.0,
    short: 'FFMI, category & natural limit',
  },
  {
    path: '/health/body-fat-calculator',
    title: 'Body Fat Calculator — Navy Tape Method & BMI Estimate',
    description: 'Calculate body fat percentage using the US Navy tape method (waist, neck, hip measurements). Compares with the Deurenberg BMI-based estimate. Shows fat mass, lean body mass, and body fat category.',
    changefreq: 'weekly',
    icon: '📏',
    priority: 1.0,
    short: 'Navy tape method + Deurenberg',
  },
  {
    path: '/health/ideal-weight-calculator',
    title: 'Ideal Weight Calculator — IBW by Height & Sex',
    description: 'Calculate your ideal body weight using the Devine, Robinson, Miller, and Hamwi formulas. Compare with the WHO healthy BMI weight range for your height — metric or imperial.',
    changefreq: 'weekly',
    icon: '🎯',
    priority: 1.0,
    short: 'Devine, Robinson, Miller & Hamwi',
  },
  {
    path: '/conversion',
    title: 'Online Conversion Tools — Free Unit Converters',
    description: 'Free online unit converters for length, weight, temperature, currency, text case, and more. Fast, accurate, no registration needed.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '🔄',
  },
  {
    path: '/conversion/length-converter',
    title: 'Length Converter — Convert km, miles, feet, inches & more',
    description: 'Convert between metres, kilometres, miles, yards, feet, inches, nautical miles, and more.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '📏',
    short: 'Distance & dimensions',
    units: 'km, m, cm, mm, miles, yards, feet, inches',
  },
  {
    path: '/conversion/weight-converter',
    title: 'Weight Converter — Convert kg, lbs, oz, stone & more',
    description: 'Convert kilograms, grams, pounds, ounces, stone, tonnes, and other weight units instantly.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '⚖️',
    short: 'Mass & weight',
    units: 'kg, g, lb, oz, stone, tonne',
  },
  {
    path: '/conversion/height-converter',
    title: 'Height Converter — cm to Feet and Inches',
    description: 'Convert height between centimetres, feet and inches, metres, and inches. Instant results with a full reference table.',
    changefreq: 'weekly' as const,
    priority: 1.0,
    icon: '📐',
    short: 'Height & body measurements',
    units: 'cm, m, ft, in, ft+in',
  },
  {
    path: '/conversion/temperature-converter',
    title: 'Temperature Converter — °C, °F, Kelvin & more',
    description: 'Convert between Celsius, Fahrenheit, Kelvin, Rankine, and Réaumur with instant results.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '🌡️',
    short: 'Heat & temperature scales',
    units: '°C, °F, K, °R, °Ré',
  },
  {
    path: '/conversion/currency-converter',
    title: 'Currency Converter — Live Exchange Rates for 150+ Currencies',
    description: 'Convert between 150+ currencies using live mid-market rates. Includes a multi-currency comparison table.',
    changefreq: 'daily',
    priority: 1.0,
    icon: '💱',
    short: 'Live exchange rates',
    units: 'USD, EUR, GBP, DKK, NOK, SEK + 145 more',
  },
  {
    path: '/conversion/case-converter',
    title: 'Case Converter — Convert Text to Any Case Online Free',
    description: 'Convert text between sentence case, UPPER CASE, lower case, Title Case, camelCase, and more.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: 'Aa',
    short: 'Text case transformation',
    units: 'Sentence, lower, UPPER, Title, camelCase, alternating',
  },
  {
    path: '/compare-text',
    title: 'Text & Code Difference Checker — Compare Text Online Free',
    description: 'Compare two texts or code files side by side. Find additions, removals, and changes instantly with color-coded unified and side-by-side diff views.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '📊',
    short: 'Side-by-side diff with color highlights',
  },
  {
    path: '/compare-text/compare-excel',
    title: 'Compare Excel Files Online Free — Spreadsheet Diff Checker',
    description: 'Compare two Excel, CSV, or ODS files online. Find changed cells, added rows, and removed rows instantly. Free, private, no upload to server.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '📊',
    short: 'Cell-by-cell Excel & CSV comparison',
  },
];

export function getPages(): PageMeta[] {
  return entries
    .map(({ path, icon, short, units, ...meta }) => ({
      ...meta,
      url: SITE + path,
    }))
    .sort((a, b) => b.priority - a.priority);
}

export function getConversionTools(): CardMeta[] {
  return entries
    .filter(e => e.path.startsWith('/conversion/') && e.path !== '/conversion')
    .map(e => ({
      slug: e.path.replace('/conversion/', ''),
      title: e.title.split(' — ')[0],
      short: e.short ?? '',
      description: e.description,
      icon: e.icon ?? '',
      units: e.units,
    }));
}

const MATH_GROUPS: Record<string, string> = {
  'percentage-calculator': 'Percentage Calculators',
};

export function getMathTools(): HealthToolMeta[] {
  return entries
    .filter(e => e.path.startsWith('/math/') && e.path !== '/math')
    .map(e => {
      const seg = e.path.replace('/math/', '').split('/')[0];
      return {
        path:        e.path,
        title:       e.title.split(' — ')[0],
        short:       e.short ?? '',
        description: e.description,
        icon:        e.icon ?? '',
        group:       MATH_GROUPS[seg] ?? 'Other',
      };
    });
}

const HEALTH_GROUPS: Record<string, string> = {
  'bmi-calculator':            'BMI Calculators',
  'lean-body-mass-calculator': 'Body Composition',
  'ffmi-calculator':           'Body Composition',
  'body-fat-calculator':       'Body Composition',
  'ideal-weight-calculator':   'Body Composition',
};

export function getHealthTools(): HealthToolMeta[] {
  return entries
    .filter(e => e.path.startsWith('/health/'))
    .map(e => {
      const seg = e.path.replace('/health/', '').split('/')[0];
      return {
        path:        e.path,
        title:       e.title.split(' — ')[0],
        short:       e.short ?? '',
        description: e.description,
        icon:        e.icon ?? '',
        group:       HEALTH_GROUPS[seg] ?? 'Other',
      };
    });
}

export interface FrontPageGroup {
  category:  string;
  indexPath: string | null;
  tools:     HealthToolMeta[];
}

const FRONT_TOOL_CATEGORIES: Record<string, string> = {
  '/math/percentage-calculator': 'Math',
  '/word-counter':               'Text & Writing',
  '/compare-text':               'Text & Writing',
  '/compare-text/compare-excel': 'Text & Writing',
  '/week-number':                'Date & Time',
  '/date-calculator':            'Date & Time',
};

const CATEGORY_INDEX: Record<string, string> = {
  'Health Calculators': '/health',
  'Conversion Tools':   '/conversion',
  'Math':               '/math',
};

const CATEGORY_ORDER = ['Health Calculators', 'Conversion Tools', 'Math', 'Text & Writing', 'Date & Time'];

export function getFrontPageGroups(): FrontPageGroup[] {
  const groupMap: Record<string, HealthToolMeta[]> = {};
  for (const e of entries) {
    let cat: string | null = null;
    if (e.path.startsWith('/health/') && e.path !== '/health') {
      cat = 'Health Calculators';
    } else if (e.path.startsWith('/conversion/')) {
      cat = 'Conversion Tools';
    } else {
      cat = FRONT_TOOL_CATEGORIES[e.path] ?? null;
    }
    if (!cat) continue;
    (groupMap[cat] ??= []).push({
      path:        e.path,
      title:       e.title.split(' — ')[0],
      short:       e.short ?? '',
      description: e.description,
      icon:        e.icon ?? '',
      group:       cat,
    });
  }
  return CATEGORY_ORDER
    .filter(cat => groupMap[cat])
    .map(cat => ({
      category:  cat,
      indexPath: CATEGORY_INDEX[cat] ?? null,
      tools:     groupMap[cat],
    }));
}

/** Returns icon, display title, and description for a given path — used by RelatedTools component. */
export function getRelatedTool(path: string): RelatedToolMeta {
  const entry = entries.find(e => e.path === path);
  return {
    path,
    icon: entry?.icon ?? '',
    title: entry?.title.split(' — ')[0] ?? path,
    description: entry?.description ?? '',
  };
}
