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
  },
  {
    path: '/about-us',
    title: 'About Us — calculations.tools',
    description: 'Learn about calculations.tools — free, accurate calculation tools for everyone, built by Jesper Pallesen.',
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy — calculations.tools',
    description: 'Privacy policy explaining how calculations.tools collects, uses, and handles visitor data, including Google Analytics and advertising.',
    changefreq: 'yearly',
    priority: 0.3,
  },
  {
    path: '/percentage-calculator',
    title: 'Percentage Calculator — Free Online Tool',
    description: 'Calculate percentages, percentage increases, decreases, and differences instantly. Free online percentage calculator with multiple modes.',
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    path: '/word-counter',
    title: 'Word Counter — Free Online Word Count Tool',
    description: 'Count words, characters, sentences, and paragraphs instantly. Free online word counter with reading time estimate.',
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    path: '/week-number',
    title: 'What Week Number Is It? — Current Week Number 2026',
    description: 'Instantly see the current ISO 8601 week number. View all week numbers for the year with start and end dates. Plus code snippets for 20+ languages.',
    changefreq: 'daily',
    priority: 1.0,
  },
  {
    path: '/conversion',
    title: 'Online Conversion Tools — Free Unit Converters',
    description: 'Free online unit converters for length, weight, temperature, currency, text case, and more. Fast, accurate, no registration needed.',
    changefreq: 'weekly',
    priority: 1.0,
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
  },
  {
    path: '/compare-text/compare-excel',
    title: 'Compare Excel Files Online Free — Spreadsheet Diff Checker',
    description: 'Compare two Excel, CSV, or ODS files online. Find changed cells, added rows, and removed rows instantly. Free, private, no upload to server.',
    changefreq: 'weekly',
    priority: 1.0,
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