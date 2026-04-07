import { GLOSSARY_TERMS } from '../data/glossary';

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

// ─── Add new pages here - sitemap.xml and llms.txt update automatically ───────

const registry: Omit<PageMeta, 'url'>[] = []; // populated below

type Entry = Omit<PageMeta, 'url'> & { path: string; icon?: string; short?: string; units?: string; featured?: boolean };

export const TOP_CURRENCIES = ['USD','EUR','GBP','DKK','NOK','SEK','CHF','JPY','AUD','CAD','NZD','CNY','INR','HKD','SGD','BRL','MXN','KRW','MYR','THB','IDR','ZAR','TRY','PLN','CZK','HUF','ILS','PHP','RON','ISK'];

export const CURRENCY_NAMES: Record<string, string> = {
  USD: 'US Dollar', EUR: 'Euro', GBP: 'British Pound', DKK: 'Danish Krone',
  NOK: 'Norwegian Krone', SEK: 'Swedish Krona', CHF: 'Swiss Franc', JPY: 'Japanese Yen',
  AUD: 'Australian Dollar', CAD: 'Canadian Dollar', NZD: 'New Zealand Dollar',
  CNY: 'Chinese Yuan', INR: 'Indian Rupee', HKD: 'Hong Kong Dollar', SGD: 'Singapore Dollar', BRL: 'Brazilian Real',
  MXN: 'Mexican Peso', KRW: 'South Korean Won', MYR: 'Malaysian Ringgit', THB: 'Thai Baht',
  IDR: 'Indonesian Rupiah', ZAR: 'South African Rand', TRY: 'Turkish Lira', PLN: 'Polish Zloty',
  CZK: 'Czech Koruna', HUF: 'Hungarian Forint', ILS: 'Israeli Shekel', PHP: 'Philippine Peso',
  RON: 'Romanian Leu', ISK: 'Icelandic Krona',
};

export const CURRENCY_PLURALS: Record<string, string> = {
  USD: 'US Dollars', EUR: 'Euros', GBP: 'British Pounds', DKK: 'Danish Kroner',
  NOK: 'Norwegian Kroner', SEK: 'Swedish Kronor', CHF: 'Swiss Francs', JPY: 'Japanese Yen',
  AUD: 'Australian Dollars', CAD: 'Canadian Dollars', NZD: 'New Zealand Dollars',
  CNY: 'Chinese Yuan', INR: 'Indian Rupees', HKD: 'Hong Kong Dollars', SGD: 'Singapore Dollars', BRL: 'Brazilian Real',
  MXN: 'Mexican Pesos', KRW: 'South Korean Won', MYR: 'Malaysian Ringgit', THB: 'Thai Baht',
  IDR: 'Indonesian Rupiah', ZAR: 'South African Rand', TRY: 'Turkish Lira', PLN: 'Polish Zlotych',
  CZK: 'Czech Koruny', HUF: 'Hungarian Forints', ILS: 'Israeli Shekels', PHP: 'Philippine Pesos',
  RON: 'Romanian Lei', ISK: 'Icelandic Kronur',
};

export const TOP_PAIRINGS: Record<string, string[]> = {
  USD: ['EUR','GBP','JPY','CAD','AUD','CHF','CNY','INR'],
  EUR: ['USD','GBP','CHF','JPY','DKK','SEK','NOK','AUD'],
  GBP: ['USD','EUR','CHF','JPY','AUD','CAD','DKK','SEK'],
  DKK: ['EUR','USD','NOK','SEK','GBP','CHF','JPY','AUD'],
  NOK: ['EUR','USD','DKK','SEK','GBP','CHF','JPY','AUD'],
  SEK: ['EUR','USD','DKK','NOK','GBP','CHF','JPY','AUD'],
  CHF: ['EUR','USD','GBP','JPY','SEK','DKK','NOK','AUD'],
  JPY: ['USD','EUR','GBP','AUD','CHF','CAD','CNY','HKD'],
  AUD: ['USD','EUR','GBP','JPY','CAD','NZD','CHF','SGD'],
  CAD: ['USD','EUR','GBP','JPY','AUD','CHF','NZD','CNY'],
  NZD: ['USD','AUD','EUR','GBP','JPY','CAD','CHF','SGD'],
  CNY: ['USD','JPY','EUR','GBP','HKD','AUD','CAD','SGD'],
  INR: ['USD','EUR','GBP','SGD','JPY','AUD','CAD','CHF'],
  HKD: ['USD','CNY','EUR','GBP','JPY','AUD','SGD','CAD'],
  SGD: ['USD','MYR','EUR','GBP','JPY','AUD','HKD','CNY'],
  BRL: ['USD','EUR','GBP','CAD','JPY','AUD','CHF','CNY'],
  MXN: ['USD','EUR','GBP','CAD','JPY','AUD','CHF','CNY'],
  KRW: ['USD','JPY','EUR','CNY','AUD','GBP','HKD','SGD'],
  MYR: ['SGD','USD','EUR','GBP','JPY','AUD','CNY','HKD'],
  THB: ['USD','SGD','EUR','JPY','AUD','GBP','CNY','HKD'],
  IDR: ['USD','SGD','EUR','AUD','JPY','MYR','GBP','CNY'],
  ZAR: ['USD','EUR','GBP','JPY','AUD','CHF','CNY','INR'],
  TRY: ['USD','EUR','GBP','CHF','JPY','AUD','CAD','CNY'],
  PLN: ['EUR','USD','GBP','CHF','CZK','HUF','NOK','SEK'],
  CZK: ['EUR','USD','GBP','CHF','PLN','HUF','NOK','SEK'],
  HUF: ['EUR','USD','GBP','CHF','CZK','PLN','NOK','SEK'],
  ILS: ['USD','EUR','GBP','CHF','JPY','AUD','CAD','CNY'],
  PHP: ['USD','EUR','SGD','JPY','AUD','GBP','HKD','CNY'],
  RON: ['EUR','USD','GBP','CHF','HUF','CZK','PLN','NOK'],
  ISK: ['EUR','GBP','USD','DKK','NOK','SEK','CHF','CAD'],
};

const entries: Entry[] = [
  {
    path: '/',
    title: 'Calculations.tools - Free Online Calculators & Converters',
    description: 'Free online calculators and converters for percentages, unit conversion, text analysis, currency, and more. No registration, no ads, instant results.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '🏠',
  },
  {
    path: '/about-us',
    title: 'About Us - calculations.tools',
    description: 'Learn about calculations.tools - free, accurate calculation tools for everyone, built by Jesper Pallesen.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: 'ℹ️',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy - calculations.tools',
    description: 'Privacy policy explaining how calculations.tools collects, uses, and handles visitor data, including Google Analytics and advertising.',
    changefreq: 'yearly',
    priority: 0.3,
    icon: '🔒',
  },
  {
    path: '/math',
    title: 'Math Calculators - Free Online Tools',
    description: 'Free online math calculators: percentage calculators, doubling time, and more. Fast, accurate, no registration needed.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '∑',
  },
  {
    path: '/math/percentage-calculator',
    title: 'Percentage Calculator - Free Online Tool',
    description: 'Calculate percentages, percentage increases, decreases, and differences instantly. Free online percentage calculator with multiple modes.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '%',
    short: 'Percentages, increases & differences',
    featured: true,
  },
  {
    path: '/math/percentage-calculator/increase',
    title: 'Percentage Increase Calculator - Formula & Examples',
    description: 'Calculate the percentage increase between two values instantly. See the formula, step-by-step workings, and a reference table for common percentage increases.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '↗',
    short: 'From old value to new value',
  },
  {
    path: '/math/percentage-calculator/decrease',
    title: 'Percentage Decrease Calculator - Formula & Examples',
    description: 'Calculate the percentage decrease between two values instantly. See the formula, step-by-step workings, and a reference table for common percentage decreases.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '↘',
    short: 'From old value to new (lower) value',
  },
  {
    path: '/math/percentage-calculator/change',
    title: 'Percentage Change Calculator - Formula & Examples',
    description: 'Calculate the percentage change between two values. Shows whether the result is an increase or decrease, the absolute difference, and step-by-step workings.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '↕',
    short: 'Increase or decrease, signed result',
  },
  {
    path: '/math/percentage-calculator/difference',
    title: 'Percentage Difference Calculator - Formula & Examples',
    description: 'Calculate the percentage difference between two values. Uses the average of both as the base - ideal for comparing two independent values with no defined starting point.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '⇔',
    short: 'Compare two values, unsigned result',
  },
  {
    path: '/math/percentage-calculator/average',
    title: 'Average Percentage Calculator - Formula & Examples',
    description: 'Calculate the average of multiple percentages instantly. Covers the arithmetic mean, weighted average, and when each method gives the correct result.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: 'x̄',
    short: 'Average of multiple percentages',
  },
  {
    path: '/math/percentage-calculator/fraction-to-percent',
    title: 'Fraction to Percent Calculator - Convert & Examples',
    description: 'Convert any fraction to a percentage instantly. Enter a numerator and denominator to get the percentage, decimal equivalent, and step-by-step workings.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '½',
    short: 'Numerator ÷ denominator × 100',
  },
  {
    path: '/math/percentage-calculator/decimal-to-percent',
    title: 'Decimal to Percent Calculator - Convert & Examples',
    description: 'Convert any decimal to a percentage instantly. Multiply by 100 - see the step-by-step working, a reference table for common decimals, and the reverse conversion.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '0.x',
    short: 'Decimal × 100 = percentage',
  },
  {
    path: '/math/percentage-calculator/percentage-of-percentage',
    title: 'Percentage of a Percentage Calculator - Formula & Examples',
    description: 'Calculate what P% of Q% equals. Covers the formula, successive discounts, commission tiers, and why stacking percentages is not the same as adding them.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '٪',
    short: 'P% of Q% = P×Q÷100',
  },
  {
    path: '/math/percentage-calculator/percent-error',
    title: 'Percent Error Calculator',
    description: 'Calculate percent error between an experimental and theoretical value. Shows absolute error, signed error, and step-by-step workings.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '٪',
    short: 'Experimental vs theoretical value error',
  },
  {
    path: '/math/percentage-calculator/percentage-point',
    title: 'Percentage Point Calculator',
    description: 'Calculate the percentage point difference between two percentages. Shows the pp difference, equivalent percent change, and step-by-step workings.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '٪',
    short: 'Arithmetic gap between two percentages',
  },
  {
    path: '/math/percentage-calculator/percent-to-goal',
    title: 'Percent to Goal Calculator',
    description: 'Calculate what percentage of your goal you have reached. Enter a current value and target to see percent complete and remaining amount.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '٪',
    short: '(Current ÷ Goal) × 100',
  },
  {
    path: '/math/percentage-calculator/progress-tracker',
    title: 'Progress Tracker Calculator',
    description: 'Track progress toward any goal with a visual progress bar. Enter current value, goal, and optional deadline to see percentage complete and required daily/weekly rate.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '٪',
    short: 'Visualize goal progress with % bar',
  },
  {
    path: '/math/fraction-calculator',
    title: 'Fraction Calculator',
    description: 'Add, subtract, multiply, or divide any two fractions instantly. Also simplifies fractions and converts to decimal and percentage. Shows step-by-step workings.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '½',
    short: 'Add, subtract, multiply, divide & simplify',
  },
  {
    path: '/math/fraction-calculator/add',
    title: 'Add Fractions Calculator',
    description: 'Add any two fractions instantly. Finds the LCD automatically, converts both fractions, adds numerators, and simplifies - with full step-by-step workings.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '½',
    short: 'Add two fractions with LCD step-by-step',
  },
  {
    path: '/math/fraction-calculator/subtract',
    title: 'Subtract Fractions Calculator',
    description: 'Subtract any two fractions instantly. Finds the LCD, converts both fractions, subtracts numerators, and simplifies - with step-by-step workings and mixed number output.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '½',
    short: 'Subtract fractions with LCD step-by-step',
  },
  {
    path: '/math/fraction-calculator/multiply',
    title: 'Multiply Fractions Calculator',
    description: 'Multiply any two fractions instantly. Multiplies numerators and denominators, simplifies the result, and shows step-by-step workings with mixed number and decimal output.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '½',
    short: 'Multiply fractions step-by-step',
  },
  {
    path: '/math/fraction-calculator/divide',
    title: 'Divide Fractions Calculator',
    description: 'Divide any two fractions instantly using the keep-change-flip method. Shows the reciprocal step, multiplies across, and simplifies with full step-by-step workings.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '½',
    short: 'Divide fractions with keep-change-flip',
  },
  {
    path: '/math/fraction-calculator/simplify',
    title: 'Simplify Fractions Calculator',
    description: 'Simplify any fraction to its lowest terms instantly. Finds the GCD using the Euclidean algorithm, divides both numerator and denominator, and shows every step.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '½',
    short: 'Reduce any fraction to lowest terms',
  },
  {
    path: '/math/fraction-calculator/compare',
    title: 'Compare Fractions Calculator',
    description: 'Compare two fractions instantly. Shows which fraction is larger using cross-multiplication and the LCD method, with decimal equivalents and step-by-step workings.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '½',
    short: 'Which fraction is bigger?',
  },
  {
    path: '/math/fraction-calculator/decimal-to-fraction',
    title: 'Decimal to Fraction Calculator',
    description: 'Convert any decimal to a fraction instantly. Handles terminating and repeating decimals, simplifies to lowest terms, and shows step-by-step workings.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '½',
    short: 'Decimal → simplified fraction',
  },
  {
    path: '/math/fraction-calculator/equivalent',
    title: 'Equivalent Fractions Calculator',
    description: 'Find equivalent fractions for any fraction instantly. Generates a table of equivalent fractions by multiplying numerator and denominator by the same factor.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '½',
    short: 'Generate equivalent fractions',
  },
  {
    path: '/math/fraction-calculator/exponent',
    title: 'Fraction Exponent Calculator',
    description: 'Raise any fraction to a whole number or fractional exponent. Shows step-by-step workings, the simplified result, and decimal equivalent.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '½',
    short: 'Raise a fraction to a power',
  },
  {
    path: '/math/fraction-calculator/fraction-to-decimal',
    title: 'Fraction to Decimal Calculator',
    description: 'Convert any fraction to its decimal equivalent instantly. Identifies terminating and repeating decimals, shows the long division steps, and converts to percentage.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '½',
    short: 'Fraction → decimal (with repeating)',
  },
  {
    path: '/math/fraction-calculator/improper-to-mixed',
    title: 'Improper Fraction to Mixed Number Calculator',
    description: 'Convert any improper fraction to a mixed number instantly. Divides numerator by denominator, shows the whole number and remainder, and simplifies the fractional part.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '½',
    short: 'Improper fraction → mixed number',
  },
  {
    path: '/math/fraction-calculator/lcd',
    title: 'LCD Calculator - Least Common Denominator',
    description: 'Find the Least Common Denominator (LCD) of two or more fractions instantly. Uses the LCM method, shows prime factorisation, and converts each fraction to the LCD.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '½',
    short: 'Least common denominator of fractions',
  },
  {
    path: '/math/fraction-calculator/mixed-number',
    title: 'Mixed Number Calculator',
    description: 'Add, subtract, multiply, or divide mixed numbers instantly. Converts to improper fractions, performs the operation, and converts the result back to a mixed number.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '½',
    short: 'Add, subtract, multiply, divide mixed numbers',
  },
  {
    path: '/math/fraction-calculator/mixed-to-improper',
    title: 'Mixed Number to Improper Fraction Calculator',
    description: 'Convert any mixed number to an improper fraction instantly. Multiplies the whole number by the denominator, adds the numerator, and shows the step-by-step conversion.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '½',
    short: 'Mixed number → improper fraction',
  },
  {
    path: '/math/ratio-calculator',
    title: 'Ratio Calculator',
    description: 'Simplify ratios, find equivalent ratios, and solve proportions. Free online ratio calculator with step-by-step workings for ratio simplification and scaling.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '∶',
    short: 'Simplify, scale & compare ratios',
  },
  {
    path: '/math/ratio-calculator/proportion',
    title: 'Proportion Calculator',
    description: 'Solve any proportion (a:b = c:d) for the missing value. Shows cross-multiplication steps and verifies the proportion. Free online proportion solver.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '∶',
    short: 'Solve a:b = c:d for the missing value',
  },
  {
    path: '/math/ratio-calculator/unit-rate',
    title: 'Unit Rate Calculator',
    description: 'Calculate the unit rate (rate per one unit) from any two quantities. Shows the rate per unit, total cost or quantity at any scale, and step-by-step workings.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '∶',
    short: 'Rate per one unit',
  },
  {
    path: '/math/ratio-calculator/golden-ratio',
    title: 'Golden Ratio Calculator',
    description: 'Calculate the golden ratio (φ ≈ 1.618) dimensions from any input. Find the longer side, shorter side, or total length, with applications in design and architecture.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: 'φ',
    short: 'φ ≈ 1.618 dimension calculator',
  },
  {
    path: '/math/ratio-calculator/aspect-ratio',
    title: 'Aspect Ratio Calculator',
    description: 'Calculate the aspect ratio of any width and height. Simplifies to the lowest whole-number ratio (1920×1080 → 16:9) and resizes dimensions while preserving the ratio.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '⬜',
    short: 'Find and preserve W:H ratio',
  },
  {
    path: '/math/ratio-calculator/scale',
    title: 'Scale Calculator',
    description: 'Convert between real-world sizes and scaled drawing dimensions. Enter a scale ratio (1:50, 1:100) and either the real or scaled size to calculate the other.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '📐',
    short: 'Real size ↔ scaled drawing size',
  },
  {
    path: '/math/ratio-calculator/ratio-to-percentage',
    title: 'Ratio to Percentage Calculator',
    description: 'Convert any ratio (a:b) to percentages. Enter both parts to get the percentage each represents of the whole, with step-by-step workings.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '%',
    short: 'Convert a:b to percentages',
  },
  {
    path: '/math/ratio-calculator/three-way',
    title: '3-Part Ratio Calculator',
    description: 'Split any quantity in a three-part ratio (a:b:c). Enter ratio parts and an optional total to find each share and percentage, with step-by-step workings.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '∶',
    short: 'Split a total in an a:b:c ratio',
  },
  {
    path: '/math/ratio-calculator/equivalent',
    title: 'Equivalent Ratios Calculator',
    description: 'Generate equivalent ratios for any input. Simplifies to lowest terms with GCD and produces a table of 12 equivalent ratios scaled ×1 through ×12.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '∶',
    short: 'Generate & verify equivalent ratios',
  },
  {
    path: '/word-counter',
    title: 'Word Counter - Free Online Word Count Tool',
    description: 'Count words, characters, sentences, and paragraphs instantly. Free online word counter with reading time estimate.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '📝',
    short: 'Words, characters & reading time',
  },
  {
    path: '/week-number',
    title: 'What Week Number Is It? - Current Week Number 2026',
    description: 'Instantly see the current ISO 8601 week number. View all week numbers for the year with start and end dates. Plus code snippets for 20+ languages.',
    changefreq: 'daily',
    priority: 1.0,
    icon: '📅',
    short: 'ISO 8601 week number & year calendar',
  },
  {
    path: '/date-calculator',
    title: 'Date Calculator - Days Between Dates & Add Subtract Days',
    description: 'Calculate the number of days between two dates, or add and subtract days from any date. Shows total days, workdays, weeks, and years-months-days. Free date difference calculator.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '📆',
    short: 'Days between dates & date arithmetic',
  },
  {
    path: '/health',
    title: 'Health Calculators - Free BMI & Body Composition Tools',
    description: 'Free health calculators: BMI by age and sex, specialist BMI tools for men, women, kids, teens, seniors, and pregnancy, BMI weight loss planner, and lean body mass with FFMI for athletes.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '🏥',
  },
  {
    path: '/health/bmi-calculator',
    title: 'BMI Calculator by Age & Sex - Body Fat Estimate & Chart',
    description: 'Calculate BMI by age and sex. Get your BMI category, estimated body fat %, healthy weight range, and personalised age-specific interpretation - metric or imperial.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '⚤',
    short: 'Body Mass Index by age & sex',
    featured: true,
  },
  {
    path: '/health/bmi-calculator/men',
    title: 'BMI Calculator for Men - Normal BMI Range by Age & Chart',
    description: 'Free BMI calculator for men. See the normal BMI range for men, BMI by age, waist circumference thresholds, the testosterone-obesity connection, and why BMI reads differently for muscular men.',
    changefreq: 'weekly',
    icon: '♂️',
    priority: 1.0,
    short: 'Men-specific thresholds & waist',
  },
  {
    path: '/health/bmi-calculator/women',
    title: 'BMI Calculator for Women - Healthy BMI Range, Chart & Age Guide',
    description: 'Free BMI calculator for women. See the healthy BMI range, BMI chart by age, how menopause affects body composition, normal weight obesity, and the best complementary health metrics.',
    changefreq: 'weekly',
    icon: '♀️',
    priority: 1.0,
    short: 'Menopause, NWO & female context',
  },
  {
    path: '/health/bmi-calculator/pregnancy',
    title: 'BMI Calculator During Pregnancy - Gestational Weight Gain by BMI',
    description: 'Calculate your pre-pregnancy BMI and get recommended gestational weight gain targets based on IOM 2009 guidelines. Covers weight gain by trimester, complications by BMI, and pre-conception guidance.',
    changefreq: 'weekly',
    icon: '🤰',
    priority: 1.0,
    short: 'Gestational weight gain (IOM)',
  },
  {
    path: '/health/bmi-calculator/kids',
    title: 'BMI Calculator for Kids - BMI-for-Age Percentile (Ages 2–12)',
    description: 'Free BMI calculator for children aged 2–12. Uses CDC 2000 growth charts to show BMI-for-age percentile and weight category. Healthy weight is the 5th to 85th percentile for your child\'s age and sex.',
    changefreq: 'weekly',
    icon: '🧒',
    priority: 1.0,
    short: 'BMI-for-age percentile, ages 2–12',
  },
  {
    path: '/health/bmi-calculator/seniors',
    title: 'BMI Calculator for Seniors - Adjusted Thresholds & Frailty Risk',
    description: 'BMI calculator for adults 65 and over. Shows the 23–27.5 senior optimal range, estimated body fat %, frailty risk, and sarcopenia guidance based on ESPEN and geriatric guidelines.',
    changefreq: 'weekly',
    icon: '👴',
    priority: 1.0,
    short: 'Adjusted thresholds for 65+',
  },
  {
    path: '/health/bmi-calculator/teens',
    title: 'BMI Calculator for Teens - BMI-for-Age Percentile (Ages 13–19)',
    description: 'Free BMI calculator for teenagers aged 13–19. Uses CDC 2000 growth charts to show BMI-for-age percentile and weight category. Covers puberty\'s effect on BMI, athletic teens, and the transition to adult categories at 20.',
    changefreq: 'weekly',
    icon: '🧑',
    priority: 1.0,
    short: 'BMI-for-age percentile, ages 13–19',
  },
  {
    path: '/health/bmi-calculator/weight-loss',
    title: 'BMI Weight Loss Calculator - Target BMI & Weight to Lose',
    description: 'Calculate how much weight you need to lose to reach your target BMI. Get your target weight, estimated time at your chosen weekly pace, and estimated body fat at current and goal weight.',
    changefreq: 'weekly',
    icon: '⚖️',
    priority: 1.0,
    short: 'Target BMI & time estimate',
  },
  {
    path: '/health/lean-body-mass-calculator',
    title: 'Lean Body Mass Calculator - LBM, FFMI & Body Fat %',
    description: 'Calculate lean body mass using Boer, Hume, and James formulas. Get fat mass, body fat %, and FFMI (Fat-Free Mass Index) with category - for athletes and fitness tracking.',
    changefreq: 'weekly',
    icon: '💪',
    priority: 1.0,
    short: 'Boer / Hume / James + FFMI',
  },
  {
    path: '/health/ffmi-calculator',
    title: 'FFMI Calculator - Fat-Free Mass Index & Natural Muscle Limit',
    description: 'Calculate your FFMI (Fat-Free Mass Index) from weight, height, and body fat %. See your muscle category, normalised FFMI, and how you compare to the Kouri 1995 natural limit - for athletes and strength trainers.',
    changefreq: 'weekly',
    icon: '🏋️',
    priority: 1.0,
    short: 'FFMI, category & natural limit',
  },
  {
    path: '/health/body-fat-calculator',
    title: 'Body Fat Calculator - Navy Tape Method & BMI Estimate',
    description: 'Calculate body fat percentage using the US Navy tape method (waist, neck, hip measurements). Compares with the Deurenberg BMI-based estimate. Shows fat mass, lean body mass, and body fat category.',
    changefreq: 'weekly',
    icon: '📏',
    priority: 1.0,
    short: 'Navy tape method + Deurenberg',
  },
  {
    path: '/health/ideal-weight-calculator',
    title: 'Ideal Weight Calculator - IBW by Height & Sex',
    description: 'Calculate your ideal body weight using the Devine, Robinson, Miller, and Hamwi formulas. Compare with the WHO healthy BMI weight range for your height - metric or imperial.',
    changefreq: 'weekly',
    icon: '🎯',
    priority: 1.0,
    short: 'Devine, Robinson, Miller & Hamwi',
    featured: true,
  },
  {
    path: '/conversion',
    title: 'Online Conversion Tools - Free Unit Converters',
    description: 'Free online unit converters for length, weight, temperature, currency, text case, and more. Fast, accurate, no registration needed.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '🔄',
  },
  {
    path: '/conversion/length-converter',
    title: 'Length Converter - Convert km, miles, feet, inches & more',
    description: 'Convert between metres, kilometres, miles, yards, feet, inches, nautical miles, and more.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '📏',
    short: 'Distance & dimensions',
    units: 'km, m, cm, mm, miles, yards, feet, inches',
  },
  {
    path: '/conversion/weight-converter',
    title: 'Weight Converter - Convert kg, lbs, oz, stone & more',
    description: 'Convert kilograms, grams, pounds, ounces, stone, tonnes, and other weight units instantly.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '⚖️',
    short: 'Mass & weight',
    units: 'kg, g, lb, oz, stone, tonne',
  },
  {
    path: '/conversion/height-converter',
    title: 'Height Converter - cm to Feet and Inches',
    description: 'Convert height between centimetres, feet and inches, metres, and inches. Instant results with a full reference table.',
    changefreq: 'weekly' as const,
    priority: 1.0,
    icon: '📐',
    short: 'Height & body measurements',
    units: 'cm, m, ft, in, ft+in',
  },
  {
    path: '/conversion/temperature-converter',
    title: 'Temperature Converter - °C, °F, Kelvin & more',
    description: 'Convert between Celsius, Fahrenheit, Kelvin, Rankine, and Réaumur with instant results.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '🌡️',
    short: 'Celsius, Fahrenheit, Kelvin',
    units: '°C, °F, K, °R, °Ré',
  },
  {
    path: '/conversion/currency-converter',
    title: 'Currency Converter - Live Exchange Rates for 150+ Currencies',
    description: 'Convert between 150+ currencies using live mid-market rates. Includes a multi-currency comparison table.',
    changefreq: 'daily',
    priority: 1.0,
    icon: '💱',
    short: 'Live exchange rates',
    units: 'USD, EUR, GBP, DKK, NOK, SEK + 145 more',
    featured: true,
  },
  {
    path: '/conversion/case-converter',
    title: 'Case Converter - Convert Text to Any Case Online Free',
    description: 'Convert text between sentence case, UPPER CASE, lower case, Title Case, camelCase, and more.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: 'Aa',
    short: 'Text case transformation',
    units: 'Sentence, lower, UPPER, Title, camelCase, alternating',
  },
  {
    path: '/conversion/image-to-text',
    title: 'Image to Text (OCR) - Extract Text from Images & PDFs',
    description: 'Extract text from images and scanned PDFs online. Free browser-based OCR using Tesseract - supports PNG, JPG, WEBP, TIFF, and PDF. No upload to server.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '🔍',
    short: 'Extract text from any image or scanned PDF',
  },
  {
    path: '/conversion/speed-converter',
    title: 'Speed Converter - mph, km/h, knots, m/s & more',
    description: 'Convert between mph, km/h, m/s, knots, and ft/s instantly. Free speed converter with quick-select conversions and a full real-world reference table.',
    changefreq: 'monthly',
    priority: 0.9,
    lastmod: '2026-04-01',
    icon: '⚡',
    short: 'mph, km/h, knots, m/s & more',
    featured: true,
    units: 'km/h, mph, m/s, kn, ft/s, ft/min, m/min, km/s, mi/s, c',
  },
  {
    path: '/conversion/speed-converter/mph-to-kmh',
    title: 'mph to km/h Converter',
    description: 'Convert miles per hour to kilometers per hour instantly. Formula: km/h = mph × 1.609344. Includes reverse km/h to mph conversion and a reference table.',
    changefreq: 'monthly',
    priority: 0.9,
    lastmod: '2026-04-01',
    icon: '⚡',
    short: 'Miles per hour to kilometers per hour',
  },
  {
    path: '/conversion/speed-converter/knots-to-mph',
    title: 'Knots to mph Converter',
    description: 'Convert knots to miles per hour and mph to knots. 1 knot = 1.15078 mph. Essential for aviation, maritime navigation, and weather forecasts.',
    changefreq: 'monthly',
    priority: 0.9,
    lastmod: '2026-04-01',
    icon: '⚡',
    short: 'Knots to miles per hour',
  },
  {
    path: '/conversion/speed-converter/ms-to-kmh',
    title: 'm/s to km/h Converter',
    description: 'Convert meters per second to kilometers per hour and back. Formula: km/h = m/s × 3.6. Used in physics, meteorology, and sports science.',
    changefreq: 'monthly',
    priority: 0.9,
    lastmod: '2026-04-01',
    icon: '⚡',
    short: 'Meters per second to kilometers per hour',
  },
  {
    path: '/conversion/speed-converter/ms-to-mph',
    title: 'm/s to mph Converter',
    description: 'Convert meters per second to miles per hour and back. Formula: mph = m/s × 2.23694. Bridges SI physics units and imperial road speeds.',
    changefreq: 'monthly',
    priority: 0.9,
    lastmod: '2026-04-01',
    icon: '⚡',
    short: 'Meters per second to miles per hour',
  },
  {
    path: '/conversion/speed-converter/fps-to-mph',
    title: 'ft/s to mph Converter',
    description: 'Convert feet per second to miles per hour and back. Formula: mph = ft/s × 15/22. Used in US engineering, ballistics, and athletics.',
    changefreq: 'monthly',
    priority: 0.9,
    lastmod: '2026-04-01',
    icon: '⚡',
    short: 'Feet per second to miles per hour',
  },
  {
    path: '/conversion/speed-converter/knots-to-kmh',
    title: 'Knots to km/h Converter',
    description: 'Convert knots to kilometers per hour and km/h to knots instantly. 1 knot = 1.852 km/h exactly. Includes the full Beaufort wind scale in both units.',
    changefreq: 'monthly',
    priority: 0.9,
    lastmod: '2026-04-02',
    icon: '⚡',
    short: 'Knots to kilometers per hour',
  },
  {
    path: '/conversion/length-converter/m-to-ft',
    title: 'Meters to Feet Converter',
    description: 'Convert meters to feet instantly. Formula: ft = m ÷ 0.3048. Includes reverse feet to meters conversion and a reference table.',
    changefreq: 'monthly' as const,
    priority: 0.9,
    icon: '📏',
    short: 'Meters to feet · m to ft',
    units: 'm, ft, feet, meters',
  },
  {
    path: '/conversion/length-converter/ft-to-m',
    title: 'Feet to Meters Converter',
    description: 'Convert feet to meters instantly. Formula: m = ft × 0.3048. Includes reverse meters to feet conversion and a reference table.',
    changefreq: 'monthly' as const,
    priority: 0.9,
    icon: '📏',
    short: 'Feet to meters · ft to m',
    units: 'ft, m, feet, meters',
  },
  {
    path: '/conversion/length-converter/in-to-cm',
    title: 'Inches to Centimeters Converter',
    description: 'Convert inches to centimeters instantly. Formula: cm = in × 2.54. Includes reverse cm to inches conversion and a reference table.',
    changefreq: 'monthly' as const,
    priority: 0.9,
    icon: '📏',
    short: 'Inches to centimeters · in to cm',
    units: 'in, cm, inches, centimeters',
  },
  {
    path: '/conversion/length-converter/cm-to-in',
    title: 'Centimeters to Inches Converter',
    description: 'Convert centimeters to inches instantly. Formula: in = cm ÷ 2.54. Includes reverse inches to cm conversion and a reference table.',
    changefreq: 'monthly' as const,
    priority: 0.9,
    icon: '📏',
    short: 'Centimeters to inches · cm to in',
    units: 'cm, in, centimeters, inches',
  },
  {
    path: '/conversion/length-converter/km-to-mi',
    title: 'Kilometers to Miles Converter',
    description: 'Convert kilometers to miles instantly. Formula: mi = km ÷ 1.609344. Includes reverse miles to km conversion and a reference table.',
    changefreq: 'monthly' as const,
    priority: 0.9,
    icon: '📏',
    short: 'Kilometers to miles · km to mi',
    units: 'km, mi, kilometers, miles',
  },
  {
    path: '/conversion/length-converter/mi-to-km',
    title: 'Miles to Kilometers Converter',
    description: 'Convert miles to kilometers instantly. Formula: km = mi × 1.609344. Includes reverse km to miles conversion and a reference table.',
    changefreq: 'monthly' as const,
    priority: 0.9,
    icon: '📏',
    short: 'Miles to kilometers · mi to km',
    units: 'mi, km, miles, kilometers',
  },
  {
    path: '/conversion/length-converter/yd-to-m',
    title: 'Yards to Meters Converter',
    description: 'Convert yards to meters instantly. Formula: m = yd × 0.9144. Includes reverse meters to yards conversion and a reference table.',
    changefreq: 'monthly' as const,
    priority: 0.9,
    icon: '📏',
    short: 'Yards to meters · yd to m',
    units: 'yd, m, yards, meters',
  },
  {
    path: '/conversion/length-converter/m-to-yd',
    title: 'Meters to Yards Converter',
    description: 'Convert meters to yards instantly. Formula: yd = m ÷ 0.9144. Includes reverse yards to meters conversion and a reference table.',
    changefreq: 'monthly' as const,
    priority: 0.9,
    icon: '📏',
    short: 'Meters to yards · m to yd',
    units: 'm, yd, meters, yards',
  },
  {
    path: '/conversion/length-converter/cm-to-ft',
    title: 'Centimeters to Feet Converter',
    description: 'Convert centimeters to feet instantly. Formula: ft = cm ÷ 30.48. Height reference table included — 170 cm, 175 cm, 180 cm in feet and more.',
    changefreq: 'monthly' as const,
    priority: 0.9,
    icon: '📏',
    short: 'Centimeters to feet · cm to ft',
    units: 'cm, ft, centimeters, feet, height',
  },
  {
    path: '/conversion/length-converter/ft-to-cm',
    title: 'Feet to Centimeters Converter',
    description: 'Convert feet to centimeters instantly. Formula: cm = ft × 30.48. Height reference table included — 5 ft, 5\'10", 6 ft in cm and more.',
    changefreq: 'monthly' as const,
    priority: 0.9,
    icon: '📏',
    short: 'Feet to centimeters · ft to cm',
    units: 'ft, cm, feet, centimeters, height',
  },
  {
    path: '/conversion/length-converter/mm-to-in',
    title: 'Millimeters to Inches Converter',
    description: 'Convert millimeters to inches instantly. Formula: in = mm ÷ 25.4. Reference table for engineering, 3D printing, and woodworking.',
    changefreq: 'monthly' as const,
    priority: 0.9,
    icon: '📏',
    short: 'Millimeters to inches · mm to in',
    units: 'mm, in, millimeters, inches',
  },
  {
    path: '/conversion/length-converter/in-to-mm',
    title: 'Inches to Millimeters Converter',
    description: 'Convert inches to millimeters instantly. Formula: mm = in × 25.4. Reference table for engineering, 3D printing, and hardware.',
    changefreq: 'monthly' as const,
    priority: 0.9,
    icon: '📏',
    short: 'Inches to millimeters · in to mm',
    units: 'in, mm, inches, millimeters',
  },
  {
    path: '/conversion/length-converter/ft-to-in',
    title: 'Feet to Inches Converter',
    description: 'Convert feet to inches instantly. Formula: in = ft × 12. Includes reverse inches to feet conversion and a reference table.',
    changefreq: 'monthly' as const,
    priority: 0.9,
    icon: '📏',
    short: 'Feet to inches · ft to in',
    units: 'ft, in, feet, inches',
  },
  {
    path: '/conversion/length-converter/in-to-ft',
    title: 'Inches to Feet Converter',
    description: 'Convert inches to feet instantly. Formula: ft = in ÷ 12. Includes reverse feet to inches conversion and a reference table.',
    changefreq: 'monthly' as const,
    priority: 0.9,
    icon: '📏',
    short: 'Inches to feet · in to ft',
    units: 'in, ft, inches, feet',
  },
  {
    path: '/conversion/length-converter/mm-to-cm',
    title: 'Millimeters to Centimeters Converter',
    description: 'Convert millimeters to centimeters instantly. Formula: cm = mm ÷ 10. Includes reverse cm to mm conversion and a reference table.',
    changefreq: 'monthly' as const,
    priority: 0.9,
    icon: '📏',
    short: 'Millimeters to centimeters · mm to cm',
    units: 'mm, cm, millimeters, centimeters',
  },
  {
    path: '/conversion/length-converter/cm-to-mm',
    title: 'Centimeters to Millimeters Converter',
    description: 'Convert centimeters to millimeters instantly. Formula: mm = cm × 10. Includes reverse mm to cm conversion and a reference table.',
    changefreq: 'monthly' as const,
    priority: 0.9,
    icon: '📏',
    short: 'Centimeters to millimeters · cm to mm',
    units: 'cm, mm, centimeters, millimeters',
  },
  {
    path: '/compare',
    title: 'Compare Files & Text Online - Free Diff Tools',
    description: 'Free online comparison tools: compare text, code, Excel, CSV, PDF, and Word documents. Find differences instantly, color-coded, private, no sign-up.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '⇄',
  },
  {
    path: '/compare/text',
    title: 'Text & Code Diff Checker - Compare Two Texts Online',
    description: 'Compare two texts or code files and find every addition, removal, and change instantly. Color-coded unified and side-by-side diff views. Free, private, no sign-up.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '⇄',
    short: 'Side-by-side diff with color highlights',
  },
  {
    path: '/compare/excel',
    title: 'Compare Excel Files Online - Spreadsheet Diff Checker',
    description: 'Compare two Excel, CSV, or ODS files online. Find changed cells, added rows, and removed rows instantly. Free, private, no upload to server.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '📊',
    short: 'Cell-by-cell Excel & CSV comparison',
  },
  {
    path: '/compare/csv',
    title: 'Compare CSV Files Online - Free CSV Diff Tool',
    description: 'Compare two CSV files online and find every changed cell, added row, and removed row. Lightweight CSV diff with no dependencies. Free, private, runs in browser.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '📋',
    short: 'Lightweight CSV comparison, no upload needed',
  },
  {
    path: '/compare/google-sheets',
    title: 'Compare Google Sheets - Export & Find Differences',
    description: 'Compare two Google Sheets exports side by side. Upload CSV or Excel exports and find every changed cell, added row, and removed row instantly.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '📊',
    short: 'Compare Google Sheets CSV or Excel exports',
  },
  {
    path: '/compare/pdf',
    title: 'Compare PDF Files Online - PDF Text Diff Tool',
    description: 'Compare two PDF files and find every text difference. Extracts text from both PDFs and shows additions, removals, and changes line by line. Free, private, runs in browser.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '📄',
    short: 'PDF text extraction and line-by-line diff',
  },
  {
    path: '/compare/documents',
    title: 'Compare Word Documents Online - DOCX Diff Tool',
    description: 'Compare two Word documents (.docx) online and find every text difference. Extracts text and shows additions and removals line by line. Free, private, no upload to server.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '📝',
    short: 'DOCX text extraction and diff',
  },
  {
    path: '/compare/code',
    title: 'Compare Code Online - Code Diff Checker',
    description: 'Compare two code files online and find every difference line by line. Supports Python, JavaScript, CSS, HTML, and all text-based languages. Free, private, no sign-up.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '</>',
    short: 'Code diff with language selector',
  },
  {
    path: '/compare/python',
    title: 'Compare Python Code Online - Python Diff Tool',
    description: 'Compare two Python files online and find every addition, removal, and change. Color-coded diff for .py files. Free, private, runs entirely in your browser.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '🐍',
    short: 'Python .py file diff checker',
  },
  {
    path: '/compare/javascript',
    title: 'Compare JavaScript Code Online - JS Diff Tool',
    description: 'Compare two JavaScript or TypeScript files online and find every difference. Color-coded line-by-line diff. Free, private, runs entirely in your browser.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: 'JS',
    short: 'JavaScript & TypeScript diff checker',
  },
  {
    path: '/compare/css',
    title: 'Compare CSS Files Online - CSS Diff Checker',
    description: 'Compare two CSS or SCSS files online and find every changed selector, property, and value. Line-by-line diff. Free, private, runs entirely in your browser.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '🎨',
    short: 'CSS & SCSS diff checker',
  },
  {
    path: '/compare/html',
    title: 'Compare HTML Files Online - HTML Diff Tool',
    description: 'Compare two HTML files online and find every changed element, attribute, and text. Line-by-line color-coded diff. Free, private, runs entirely in your browser.',
    changefreq: 'weekly',
    priority: 0.9,
    icon: '</>',
    short: 'HTML file diff checker',
  },
  {
    path: '/finance',
    title: 'Finance Calculators - Free Online Financial Tools',
    description: 'Free finance calculators: EBITDA, EBIT, EBT, EBITDA Margin, and more. Fast, accurate, no registration needed.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '💰',
  },
  {
    path: '/finance/ebitda-calculator',
    title: 'EBITDA Calculator - Formula, Examples & Step-by-Step',
    description: 'Calculate EBITDA from Net Income, Interest, Tax, and D&A. Shows EBT, EBIT, and EBITDA with step-by-step workings. Optionally calculates EBITDA Margin.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '📊',
    short: 'Net Income + Interest + Tax + D&A',
  },
  {
    path: '/finance/ebit-calculator',
    title: 'EBIT Calculator - Earnings Before Interest & Tax',
    description: 'Calculate EBIT (Operating Income) from Net Income, Interest Expense, and Tax Expense. Shows EBT and EBIT with step-by-step workings and optional EBIT Margin.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '📈',
    short: 'Net Income + Interest + Tax',
  },
  {
    path: '/finance/ebt-calculator',
    title: 'EBT Calculator - Earnings Before Tax',
    description: 'Calculate EBT (Earnings Before Tax) from Net Income and Tax Expense. Shows EBT, effective tax rate, and step-by-step workings.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '💹',
    short: 'Net Income + Tax Expense',
  },
  {
    path: '/finance/ebitda-margin-calculator',
    title: 'EBITDA Margin Calculator - Formula & Industry Benchmarks',
    description: 'Calculate EBITDA Margin as a percentage of revenue. Shows the margin, interpretation, and step-by-step workings. Compare against industry benchmarks.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '%',
    short: 'EBITDA / Revenue × 100',
  },
  {
    path: '/finance/gross-profit-margin-calculator',
    title: 'Gross Profit Margin Calculator - Formula & Benchmarks',
    description: 'Calculate gross profit margin from revenue and cost of goods sold. Shows gross profit, margin %, and step-by-step workings. Compare against industry benchmarks.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '📊',
    short: '(Revenue − COGS) / Revenue × 100',
  },
  {
    path: '/finance/net-profit-margin-calculator',
    title: 'Net Profit Margin Calculator - Formula & Benchmarks',
    description: 'Calculate net profit margin from net income and revenue. Shows margin %, interpretation, and step-by-step workings. Compare against industry benchmarks.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '💵',
    short: 'Net Income / Revenue × 100',
  },
  {
    path: '/finance/operating-profit-margin-calculator',
    title: 'Operating Profit Margin Calculator - Formula & Benchmarks',
    description: 'Calculate operating profit margin (EBIT margin) from operating profit and revenue. Shows margin %, interpretation, and step-by-step workings.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '⚙️',
    short: 'Operating Profit / Revenue × 100',
  },
  {
    path: '/finance/roi-calculator',
    title: 'ROI Calculator - Return on Investment Formula',
    description: 'Calculate ROI (Return on Investment) from initial investment and final value. Shows net return, ROI %, investment multiple, and annualized ROI (CAGR).',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '📈',
    short: '(Final Value − Initial) / Initial × 100',
    featured: true,
  },
  {
    path: '/finance/compound-interest-calculator',
    title: 'Compound Interest Calculator - Formula & Growth Table',
    description: 'Calculate compound interest for any principal, rate, compounding frequency, and time. Shows future value, total interest earned, and a year-by-year growth table.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '📊',
    short: 'A = P(1 + r/n)^(nt)',
    featured: true,
  },
  {
    path: '/finance/loan-payment-calculator',
    title: 'Loan Payment Calculator - Monthly Payment & Interest',
    description: 'Calculate monthly loan payments, total interest paid, and see a year-by-year amortisation schedule for any loan amount, rate, and term.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '🏦',
    short: 'M = P × r(1+r)^n / [(1+r)^n − 1]',
    featured: true,
  },
  {
    path: '/finance/free-cash-flow-calculator',
    title: 'Free Cash Flow Calculator - FCF Formula & FCF Yield',
    description: 'Calculate Free Cash Flow (FCF) from Operating Cash Flow and CapEx. Optionally calculate FCF Yield. Includes FCF vs. EBITDA comparison and benchmarks.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '💵',
    short: 'FCF = Operating Cash Flow − CapEx',
  },
  {
    path: '/finance/working-capital-calculator',
    title: 'Working Capital Calculator - Current Ratio & Analysis',
    description: 'Calculate Working Capital and Current Ratio from current assets and liabilities. Includes liquidity interpretation, industry benchmarks, and quick ratio explanation.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '⚖️',
    short: 'Current Assets − Current Liabilities',
  },
  {
    path: '/finance/enterprise-value-calculator',
    title: 'Enterprise Value Calculator - EV/EBITDA & EV/Revenue',
    description: 'Calculate Enterprise Value (EV) from market cap, total debt, and cash. Instantly see EV/EBITDA and EV/Revenue multiples with industry benchmarks.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '🏢',
    short: 'Market Cap + Debt − Cash',
  },
  {
    path: '/finance/break-even-calculator',
    title: 'Break-Even Calculator - Units, Revenue & Margin of Safety',
    description: 'Calculate break-even point in units and revenue from fixed costs, selling price, and variable cost. Shows contribution margin, CM ratio, and worked examples.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '⚖️',
    short: 'Fixed Costs / Contribution Margin',
  },
  {
    path: '/finance/contribution-margin-calculator',
    title: 'Contribution Margin Calculator - CM Ratio & Profit',
    description: 'Calculate contribution margin and CM ratio from revenue and variable costs. Add units and fixed costs to see per-unit CM and operating profit.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '📊',
    short: 'Revenue − Variable Costs',
  },
  {
    path: '/finance/pe-ratio-calculator',
    title: 'P/E Ratio Calculator - Earnings Yield & Fair Value',
    description: 'Calculate P/E ratio from stock price and EPS. See trailing and forward P/E, earnings yield, and implied fair value at any target multiple.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '📉',
    short: 'Stock Price / Earnings Per Share',
  },
  {
    path: '/finance/roe-calculator',
    title: 'ROE Calculator - Return on Equity & DuPont Analysis',
    description: 'Calculate Return on Equity (ROE) from net income and shareholders\' equity. Includes DuPont decomposition, industry benchmarks, and ROE vs. ROA comparison.',
    changefreq: 'weekly',
    priority: 1.0,
    icon: '💰',
    short: 'Net Income / Shareholders\' Equity × 100',
  },
];

GLOSSARY_TERMS.forEach(t => {
  entries.push({
    path: `/glossary/${t.slug}`,
    title: `${t.term} - Glossary`,
    description: t.shortDef,
    changefreq: 'monthly' as const,
    priority: 0.8,
    icon: '📖',
  });
});

entries.push({
  path: '/glossary',
  title: 'Finance & Math Glossary - Key Terms Explained',
  description: 'Plain-English definitions for finance, math, and health terms used across our calculators. Each term includes a formula, examples, and links to related tools.',
  changefreq: 'weekly' as const,
  priority: 1.0,
  icon: '📖',
});

TOP_CURRENCIES.forEach(from => {
  TOP_CURRENCIES.filter(to => to !== from).forEach(to => {
    entries.push({
      path: `/conversion/currency-converter/${from.toLowerCase()}-to-${to.toLowerCase()}`,
      title: `Convert ${from} to ${to} | ${CURRENCY_NAMES[from]} to ${CURRENCY_NAMES[to]}`,
      description: `Convert ${CURRENCY_NAMES[from]} to ${CURRENCY_NAMES[to]} with live mid-market rates. Includes reference amounts and top ${from} currency pairings.`,
      changefreq: 'daily' as const,
      priority: 0.7,
      icon: '💱',
      short: `${from} to ${to} · ${CURRENCY_NAMES[from]} to ${CURRENCY_NAMES[to]}`,
    });
  });
});

export const siteToolCount = entries.length;

export function getPages(): PageMeta[] {
  return entries
    .map(({ path, icon, short, units, featured, ...meta }) => ({
      ...meta,
      url: SITE + path,
    }))
    .sort((a, b) => b.priority - a.priority);
}

const CONVERSION_GROUPS: Record<string, string> = {
  'length-converter':      'Unit Converters',
  'weight-converter':      'Unit Converters',
  'height-converter':      'Unit Converters',
  'temperature-converter': 'Unit Converters',
  'speed-converter':       'Speed Converters',
  'currency-converter':    'Currency',
  'case-converter':        'Text Tools',
  'image-to-text':         'Text Tools',
};

export function getConversionTools(): HealthToolMeta[] {
  return entries
    .filter(e => {
      if (!e.path.startsWith('/conversion/') || e.path === '/conversion') return false;
      return e.path.replace('/conversion/', '').split('/').length === 1;
    })
    .map(e => {
      const seg = e.path.replace('/conversion/', '').split('/')[0];
      return {
        path:        e.path,
        title:       e.title.split(' - ')[0],
        short:       e.short ?? '',
        description: e.description,
        icon:        e.icon ?? '',
        group:       CONVERSION_GROUPS[seg] ?? 'Other',
      };
    });
}

const MATH_GROUPS: Record<string, string> = {
  'percentage-calculator': 'Percentage Calculators',
  'fraction-calculator':   'Fraction Calculators',
  'ratio-calculator':      'Ratio Calculators',
};

export function getMathTools(): HealthToolMeta[] {
  return entries
    .filter(e => e.path.startsWith('/math/') && e.path !== '/math')
    .map(e => {
      const seg = e.path.replace('/math/', '').split('/')[0];
      return {
        path:        e.path,
        title:       e.title.split(' - ')[0],
        short:       e.short ?? '',
        description: e.description,
        icon:        e.icon ?? '',
        group:       MATH_GROUPS[seg] ?? 'Other',
      };
    });
}

const FINANCE_GROUPS: Record<string, string> = {
  'ebitda-calculator':                  'Earnings Metrics',
  'ebit-calculator':                    'Earnings Metrics',
  'ebt-calculator':                     'Earnings Metrics',
  'free-cash-flow-calculator':          'Earnings Metrics',
  'ebitda-margin-calculator':           'Margin & Profitability',
  'gross-profit-margin-calculator':     'Margin & Profitability',
  'net-profit-margin-calculator':       'Margin & Profitability',
  'operating-profit-margin-calculator': 'Margin & Profitability',
  'contribution-margin-calculator':     'Margin & Profitability',
  'break-even-calculator':              'Margin & Profitability',
  'roi-calculator':                     'Valuation & Returns',
  'roe-calculator':                     'Valuation & Returns',
  'pe-ratio-calculator':                'Valuation & Returns',
  'enterprise-value-calculator':        'Valuation & Returns',
  'compound-interest-calculator':       'Loans & Capital',
  'loan-payment-calculator':            'Loans & Capital',
  'working-capital-calculator':         'Loans & Capital',
};

export function getFinanceTools(): HealthToolMeta[] {
  return entries
    .filter(e => e.path.startsWith('/finance/') && e.path !== '/finance')
    .map(e => {
      const seg = e.path.replace('/finance/', '').split('/')[0];
      return {
        path:        e.path,
        title:       e.title.split(' - ')[0],
        short:       e.short ?? '',
        description: e.description,
        icon:        e.icon ?? '',
        group:       FINANCE_GROUPS[seg] ?? 'Finance',
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
        title:       e.title.split(' - ')[0],
        short:       e.short ?? '',
        description: e.description,
        icon:        e.icon ?? '',
        group:       HEALTH_GROUPS[seg] ?? 'Other',
      };
    });
}

const COMPARE_GROUPS: Record<string, string> = {
  'text':          'Text & Code',
  'code':          'Code Comparison',
  'python':        'Code Comparison',
  'javascript':    'Code Comparison',
  'css':           'Code Comparison',
  'html':          'Code Comparison',
  'excel':         'File Comparison',
  'csv':           'File Comparison',
  'pdf':           'File Comparison',
  'documents':     'File Comparison',
  'google-sheets': 'File Comparison',
};

export function getCompareTools(): HealthToolMeta[] {
  return entries
    .filter(e => e.path.startsWith('/compare/') && e.path !== '/compare')
    .map(e => {
      const seg = e.path.replace('/compare/', '').split('/')[0];
      return {
        path:        e.path,
        title:       e.title.split(' - ')[0].split(' | ')[0].trim(),
        short:       e.short ?? '',
        description: e.description,
        icon:        e.icon ?? '',
        group:       COMPARE_GROUPS[seg] ?? 'Other',
      };
    });
}

export interface FrontPageGroup {
  category:   string;
  indexPath:  string | null;
  tools:      HealthToolMeta[];
  totalCount: number;
}

const FRONT_TOOL_CATEGORIES: Record<string, string> = {
  '/word-counter':        'Text & Writing',
  '/compare/text':        'Compare Tools',
  '/compare/excel':       'Compare Tools',
  '/compare/code':        'Compare Tools',
  '/week-number':         'Date & Time',
  '/date-calculator':     'Date & Time',
};

const CATEGORY_INDEX: Record<string, string> = {
  'Health Calculators':  '/health',
  'Finance Calculators': '/finance',
  'Conversion Tools':    '/conversion',
  'Math':                '/math',
  'Compare Tools':       '/compare',
};

const CATEGORY_ORDER = ['Health Calculators', 'Finance Calculators', 'Conversion Tools', 'Math', 'Compare Tools', 'Text & Writing', 'Date & Time'];

const CATEGORY_PREFIX: Record<string, string> = {
  'Health Calculators':  '/health/',
  'Finance Calculators': '/finance/',
  'Conversion Tools':    '/conversion/',
  'Math':                '/math/',
  'Compare Tools':       '/compare/',
};

export function getFrontPageGroups(): FrontPageGroup[] {
  const groupMap: Record<string, HealthToolMeta[]> = {};
  for (const e of entries) {
    let cat: string | null = null;
    if (e.path.startsWith('/health/') && e.path !== '/health' && !e.path.replace('/health/', '').includes('/')) {
      cat = 'Health Calculators';
    } else if (e.path.startsWith('/finance/') && e.path !== '/finance' && !e.path.replace('/finance/', '').includes('/')) {
      cat = 'Finance Calculators';
    } else if (e.path.startsWith('/conversion/') && e.path !== '/conversion' && !e.path.replace('/conversion/', '').includes('/')) {
      cat = 'Conversion Tools';
    } else if (e.path.startsWith('/math/') && e.path !== '/math' && !e.path.replace('/math/', '').includes('/')) {
      cat = 'Math';
    } else {
      cat = FRONT_TOOL_CATEGORIES[e.path] ?? null;
    }
    if (!cat) continue;
    (groupMap[cat] ??= []).push({
      path:        e.path,
      title:       e.title.split(' - ')[0],
      short:       e.short ?? '',
      description: e.description,
      icon:        e.icon ?? '',
      group:       cat,
    });
  }
  return CATEGORY_ORDER
    .filter(cat => groupMap[cat])
    .map(cat => {
      const prefix = CATEGORY_PREFIX[cat];
      const totalCount = prefix
        ? entries.filter(e => e.path.startsWith(prefix)).length
        : groupMap[cat].length;
      return {
        category:   cat,
        indexPath:  CATEGORY_INDEX[cat] ?? null,
        tools:      groupMap[cat],
        totalCount,
      };
    });
}

export interface CategoryCard {
  name:       string;
  icon:       string;
  hubPath:    string;
  toolCount:  number;
}

const CATEGORY_CARDS_DEF: Array<{ name: string; icon: string; hubPath: string; prefix?: string; paths?: string[] }> = [
  { name: 'Health',         icon: '❤️',  hubPath: '/health',       prefix: '/health/'      },
  { name: 'Finance',        icon: '💰',  hubPath: '/finance',      prefix: '/finance/'     },
  { name: 'Conversion',     icon: '↔️',  hubPath: '/conversion',   prefix: '/conversion/'  },
  { name: 'Math',           icon: '∑',   hubPath: '/math',         prefix: '/math/'        },
  { name: 'Compare',        icon: '⚖️',  hubPath: '/compare',      prefix: '/compare/'     },
  { name: 'Text & Writing', icon: '📝',  hubPath: '/word-counter', paths: ['/word-counter']                    },
  { name: 'Date & Time',    icon: '📅',  hubPath: '/week-number',  paths: ['/week-number', '/date-calculator'] },
];

export function getCategoryCards(): CategoryCard[] {
  return CATEGORY_CARDS_DEF.map(def => ({
    name:      def.name,
    icon:      def.icon,
    hubPath:   def.hubPath,
    toolCount: def.prefix ? entries.filter(e => e.path.startsWith(def.prefix!)).length : def.paths!.length,
  }));
}

export function getFeaturedTools(): HealthToolMeta[] {
  return entries
    .filter(e => e.featured)
    .map(e => ({
      path:        e.path,
      title:       e.title.split(' - ')[0],
      short:       e.short ?? '',
      description: e.description,
      icon:        e.icon ?? '',
      group:       '',
    }));
}

export function glossaryTermsForPage(toolPath: string) {
  return GLOSSARY_TERMS.filter(t => t.relatedTools?.includes(toolPath));
}

/** Returns icon, display title, and description for a given path - used by RelatedTools component. */
export function getRelatedTool(path: string): RelatedToolMeta {
  const entry = entries.find(e => e.path === path);
  return {
    path,
    icon: entry?.icon ?? '',
    title: entry?.title.split(' - ')[0] ?? path,
    description: entry?.description ?? '',
  };
}

export interface SearchEntry {
  t: string;
  p: string;
  k: string;
  c: string;
  i: string;
  y: 'tool' | 'term';
}

function _catLabel(path: string): string {
  if (path.startsWith('/finance')) return 'Finance';
  if (path.startsWith('/health')) return 'Health';
  if (path.startsWith('/math')) return 'Math';
  if (path.startsWith('/conversion')) return 'Conversion';
  if (path.startsWith('/compare')) return 'Compare';
  if (path.startsWith('/glossary')) return 'Glossary';
  return 'Tools';
}

export function getSearchIndex(): SearchEntry[] {
  const EXCLUDED = new Set(['/', '/about-us', '/privacy-policy']);
  const toolEntries = entries
    .filter(e =>
      !EXCLUDED.has(e.path) &&
      !e.path.startsWith('/embed/') &&
      !e.path.startsWith('/glossary/') &&
      !e.path.includes('sitemap') &&
      !e.path.includes('llms')
    )
    .map(e => ({
      t: e.title.split(' - ')[0].split(' | ')[0].trim(),
      p: e.path,
      k: [e.short || e.description.slice(0, 120), e.units].filter(Boolean).join(' '),
      c: _catLabel(e.path),
      i: e.icon || '',
      y: 'tool' as const,
    }));

  const glossaryEntries = GLOSSARY_TERMS.map(t => ({
    t: t.term,
    p: `/glossary/${t.slug}`,
    k: t.shortDef.slice(0, 120),
    c: t.siteCategory,
    i: '📖',
    y: 'term' as const,
  }));

  return [...toolEntries, ...glossaryEntries];
}
