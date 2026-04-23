export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

export interface FilingStatus {
  brackets: TaxBracket[];
  standardDeduction: number;
  personalExemption?: number;
}

export interface LocalTaxRate {
  name: string;
  rate: number;
}

export interface StateIncomeTax {
  name: string;
  abbr: string;
  slug: string;
  noTax: boolean;
  topRate: number;
  single: FilingStatus;
  mfj: FilingStatus;
  hoh: FilingStatus;
  mfs: FilingStatus;
  hasLocalTax: boolean;
  localTaxLabel?: string;
  localRates?: LocalTaxRate[];
  localTaxNote?: string;
  notes: string;
  mapCol: number;
  mapRow: number;
}

const FEDERAL_STD = { single: 16100, mfj: 32200, hoh: 24200, mfs: 16100 };

function flat(rate: number, std: { single: number; mfj: number; hoh: number; mfs: number }, exempt?: { single: number; mfj: number; hoh: number; mfs: number }): Pick<StateIncomeTax, 'single' | 'mfj' | 'hoh' | 'mfs'> {
  const b = (r: number): TaxBracket[] => r === 0 ? [] : [{ min: 0, max: null, rate: r }];
  return {
    single: { brackets: b(rate), standardDeduction: std.single, personalExemption: exempt?.single },
    mfj:    { brackets: b(rate), standardDeduction: std.mfj,    personalExemption: exempt?.mfj },
    hoh:    { brackets: b(rate), standardDeduction: std.hoh,    personalExemption: exempt?.hoh },
    mfs:    { brackets: b(rate), standardDeduction: std.mfs,    personalExemption: exempt?.mfs },
  };
}

function noTaxFilings(): Pick<StateIncomeTax, 'single' | 'mfj' | 'hoh' | 'mfs'> {
  const empty: FilingStatus = { brackets: [], standardDeduction: 0 };
  return { single: empty, mfj: empty, hoh: empty, mfs: empty };
}

export const US_INCOME_TAX: StateIncomeTax[] = [
  {
    name: 'Alabama', abbr: 'AL', slug: 'alabama', noTax: false, topRate: 5,
    single: {
      brackets: [{ min: 0, max: 500, rate: 2 }, { min: 500, max: 3000, rate: 4 }, { min: 3000, max: null, rate: 5 }],
      standardDeduction: 3000, personalExemption: 1500,
    },
    mfj: {
      brackets: [{ min: 0, max: 1000, rate: 2 }, { min: 1000, max: 6000, rate: 4 }, { min: 6000, max: null, rate: 5 }],
      standardDeduction: 8500, personalExemption: 3000,
    },
    hoh: {
      brackets: [{ min: 0, max: 1000, rate: 2 }, { min: 1000, max: 6000, rate: 4 }, { min: 6000, max: null, rate: 5 }],
      standardDeduction: 4700, personalExemption: 1500,
    },
    mfs: {
      brackets: [{ min: 0, max: 500, rate: 2 }, { min: 500, max: 3000, rate: 4 }, { min: 3000, max: null, rate: 5 }],
      standardDeduction: 3000, personalExemption: 1500,
    },
    hasLocalTax: false,
    notes: 'Alabama has one of the lowest top income tax rates in the South at 5%. The state exempts Social Security income and has a generous deduction for federal income taxes paid.',
    mapCol: 6, mapRow: 5,
  },
  {
    name: 'Alaska', abbr: 'AK', slug: 'alaska', noTax: true, topRate: 0,
    ...noTaxFilings(),
    hasLocalTax: false,
    notes: 'Alaska has no state income tax and pays residents an annual Permanent Fund Dividend from oil revenues - typically $1,000 to $2,000 per person.',
    mapCol: 0, mapRow: 0,
  },
  {
    name: 'Arizona', abbr: 'AZ', slug: 'arizona', noTax: false, topRate: 2.5,
    ...flat(2.5, { single: 8350, mfj: 16700, hoh: 12525, mfs: 8350 }),
    hasLocalTax: false,
    notes: 'Arizona enacted a flat 2.5% income tax rate in 2023, making it one of the lowest flat-rate states in the country. The flat rate replaced a graduated structure with rates up to 4.5%.',
    mapCol: 1, mapRow: 4,
  },
  {
    name: 'Arkansas', abbr: 'AR', slug: 'arkansas', noTax: false, topRate: 3.9,
    single: {
      brackets: [{ min: 0, max: 4600, rate: 2 }, { min: 4600, max: null, rate: 3.9 }],
      standardDeduction: 2470, personalExemption: 29,
    },
    mfj: {
      brackets: [{ min: 0, max: 4600, rate: 2 }, { min: 4600, max: null, rate: 3.9 }],
      standardDeduction: 4940, personalExemption: 58,
    },
    hoh: {
      brackets: [{ min: 0, max: 4600, rate: 2 }, { min: 4600, max: null, rate: 3.9 }],
      standardDeduction: 2470, personalExemption: 29,
    },
    mfs: {
      brackets: [{ min: 0, max: 4600, rate: 2 }, { min: 4600, max: null, rate: 3.9 }],
      standardDeduction: 2470, personalExemption: 29,
    },
    hasLocalTax: false,
    notes: 'Arkansas reduced its top income tax rate to 3.9% in 2026, down from 5.9% in 2021. The state simplified to two brackets: 2% on the first $4,599 and 3.9% on income above that.',
    mapCol: 4, mapRow: 4,
  },
  {
    name: 'California', abbr: 'CA', slug: 'california', noTax: false, topRate: 13.3,
    single: {
      brackets: [
        { min: 0, max: 11079, rate: 1 }, { min: 11079, max: 26264, rate: 2 },
        { min: 26264, max: 41452, rate: 4 }, { min: 41452, max: 57542, rate: 6 },
        { min: 57542, max: 72724, rate: 8 }, { min: 72724, max: 371479, rate: 9.3 },
        { min: 371479, max: 445771, rate: 10.3 }, { min: 445771, max: 742953, rate: 11.3 },
        { min: 742953, max: 1000000, rate: 12.3 }, { min: 1000000, max: null, rate: 13.3 },
      ],
      standardDeduction: 5540,
    },
    mfj: {
      brackets: [
        { min: 0, max: 22158, rate: 1 }, { min: 22158, max: 52528, rate: 2 },
        { min: 52528, max: 82904, rate: 4 }, { min: 82904, max: 115084, rate: 6 },
        { min: 115084, max: 145448, rate: 8 }, { min: 145448, max: 742958, rate: 9.3 },
        { min: 742958, max: 891542, rate: 10.3 }, { min: 891542, max: 1000000, rate: 11.3 },
        { min: 1000000, max: 1485906, rate: 12.3 }, { min: 1485906, max: null, rate: 13.3 },
      ],
      standardDeduction: 11080,
    },
    hoh: {
      brackets: [
        { min: 0, max: 22158, rate: 1 }, { min: 22158, max: 52528, rate: 2 },
        { min: 52528, max: 67626, rate: 4 }, { min: 67626, max: 83737, rate: 6 },
        { min: 83737, max: 97796, rate: 8 }, { min: 97796, max: 505219, rate: 9.3 },
        { min: 505219, max: 607271, rate: 10.3 }, { min: 607271, max: 1000000, rate: 11.3 },
        { min: 1000000, max: null, rate: 13.3 },
      ],
      standardDeduction: 11080,
    },
    mfs: {
      brackets: [
        { min: 0, max: 11079, rate: 1 }, { min: 11079, max: 26264, rate: 2 },
        { min: 26264, max: 41452, rate: 4 }, { min: 41452, max: 57542, rate: 6 },
        { min: 57542, max: 72724, rate: 8 }, { min: 72724, max: 371479, rate: 9.3 },
        { min: 371479, max: 445771, rate: 10.3 }, { min: 445771, max: 742953, rate: 11.3 },
        { min: 742953, max: null, rate: 12.3 },
      ],
      standardDeduction: 5540,
    },
    hasLocalTax: false,
    notes: "California has the highest top income tax rate of any US state at 13.3% (including the 1% Mental Health Services Tax on income over $1 million). The 9-bracket structure phases rates from 1% to 12.3% before the millionaire surcharge.",
    mapCol: 0, mapRow: 3,
  },
  {
    name: 'Colorado', abbr: 'CO', slug: 'colorado', noTax: false, topRate: 4.4,
    ...flat(4.4, FEDERAL_STD),
    hasLocalTax: false,
    notes: 'Colorado taxes all income at a flat 4.4% rate. The state constitution (TABOR) limits tax increases, and Colorado has periodically returned surplus revenues to taxpayers.',
    mapCol: 2, mapRow: 3,
  },
  {
    name: 'Connecticut', abbr: 'CT', slug: 'connecticut', noTax: false, topRate: 6.99,
    single: {
      brackets: [
        { min: 0, max: 10000, rate: 2 }, { min: 10000, max: 50000, rate: 4.5 },
        { min: 50000, max: 100000, rate: 5.5 }, { min: 100000, max: 200000, rate: 6 },
        { min: 200000, max: 250000, rate: 6.5 }, { min: 250000, max: 500000, rate: 6.9 },
        { min: 500000, max: null, rate: 6.99 },
      ],
      standardDeduction: 0, personalExemption: 15000,
    },
    mfj: {
      brackets: [
        { min: 0, max: 20000, rate: 2 }, { min: 20000, max: 100000, rate: 4.5 },
        { min: 100000, max: 200000, rate: 5.5 }, { min: 200000, max: 400000, rate: 6 },
        { min: 400000, max: 500000, rate: 6.5 }, { min: 500000, max: 1000000, rate: 6.9 },
        { min: 1000000, max: null, rate: 6.99 },
      ],
      standardDeduction: 0, personalExemption: 24000,
    },
    hoh: {
      brackets: [
        { min: 0, max: 16000, rate: 2 }, { min: 16000, max: 80000, rate: 4.5 },
        { min: 80000, max: 160000, rate: 5.5 }, { min: 160000, max: 320000, rate: 6 },
        { min: 320000, max: 400000, rate: 6.5 }, { min: 400000, max: 800000, rate: 6.9 },
        { min: 800000, max: null, rate: 6.99 },
      ],
      standardDeduction: 0, personalExemption: 19000,
    },
    mfs: {
      brackets: [
        { min: 0, max: 10000, rate: 2 }, { min: 10000, max: 50000, rate: 4.5 },
        { min: 50000, max: 100000, rate: 5.5 }, { min: 100000, max: 200000, rate: 6 },
        { min: 200000, max: 250000, rate: 6.5 }, { min: 250000, max: 500000, rate: 6.9 },
        { min: 500000, max: null, rate: 6.99 },
      ],
      standardDeduction: 0, personalExemption: 12000,
    },
    hasLocalTax: false,
    notes: "Connecticut reduced its bottom two bracket rates to 2% and 4.5% effective 2026 (down from 3% and 5%). The top rate of 6.99% applies only above $500,000 (single). The state has no standard deduction but provides a personal exemption.",
    mapCol: 10, mapRow: 2,
  },
  {
    name: 'Delaware', abbr: 'DE', slug: 'delaware', noTax: false, topRate: 6.6,
    single: {
      brackets: [
        { min: 0, max: 2000, rate: 0 }, { min: 2000, max: 5000, rate: 2.2 },
        { min: 5000, max: 10000, rate: 3.9 }, { min: 10000, max: 20000, rate: 4.8 },
        { min: 20000, max: 25000, rate: 5.2 }, { min: 25000, max: 60000, rate: 5.55 },
        { min: 60000, max: null, rate: 6.6 },
      ],
      standardDeduction: 3250, personalExemption: 110,
    },
    mfj: {
      brackets: [
        { min: 0, max: 2000, rate: 0 }, { min: 2000, max: 5000, rate: 2.2 },
        { min: 5000, max: 10000, rate: 3.9 }, { min: 10000, max: 20000, rate: 4.8 },
        { min: 20000, max: 25000, rate: 5.2 }, { min: 25000, max: 60000, rate: 5.55 },
        { min: 60000, max: null, rate: 6.6 },
      ],
      standardDeduction: 6500, personalExemption: 220,
    },
    hoh: {
      brackets: [
        { min: 0, max: 2000, rate: 0 }, { min: 2000, max: 5000, rate: 2.2 },
        { min: 5000, max: 10000, rate: 3.9 }, { min: 10000, max: 20000, rate: 4.8 },
        { min: 20000, max: 25000, rate: 5.2 }, { min: 25000, max: 60000, rate: 5.55 },
        { min: 60000, max: null, rate: 6.6 },
      ],
      standardDeduction: 3250, personalExemption: 110,
    },
    mfs: {
      brackets: [
        { min: 0, max: 2000, rate: 0 }, { min: 2000, max: 5000, rate: 2.2 },
        { min: 5000, max: 10000, rate: 3.9 }, { min: 10000, max: 20000, rate: 4.8 },
        { min: 20000, max: 25000, rate: 5.2 }, { min: 25000, max: 60000, rate: 5.55 },
        { min: 60000, max: null, rate: 6.6 },
      ],
      standardDeduction: 3250, personalExemption: 110,
    },
    hasLocalTax: false,
    notes: 'Delaware has no state sales tax but does have a graduated income tax up to 6.6%. The first $2,000 of income is exempt from state tax.',
    mapCol: 9, mapRow: 3,
  },
  {
    name: 'Florida', abbr: 'FL', slug: 'florida', noTax: true, topRate: 0,
    ...noTaxFilings(),
    hasLocalTax: false,
    notes: 'Florida has no state income tax, making it a popular destination for high-income earners and retirees. The state funds itself primarily through sales tax and property tax.',
    mapCol: 7, mapRow: 6,
  },
  {
    name: 'Georgia', abbr: 'GA', slug: 'georgia', noTax: false, topRate: 5.19,
    ...flat(5.19, { single: 12000, mfj: 24000, hoh: 18000, mfs: 12000 }),
    hasLocalTax: false,
    notes: 'Georgia converted to a flat income tax that has been stepping down annually: 5.49% (2024), 5.39% (2025), 5.19% (2026). The rate is scheduled to continue declining toward 4.99% by 2029 contingent on revenue triggers.',
    mapCol: 7, mapRow: 5,
  },
  {
    name: 'Hawaii', abbr: 'HI', slug: 'hawaii', noTax: false, topRate: 11,
    single: {
      brackets: [
        { min: 0, max: 9600, rate: 1.4 }, { min: 9600, max: 14400, rate: 3.2 },
        { min: 14400, max: 19200, rate: 5.5 }, { min: 19200, max: 24000, rate: 6.4 },
        { min: 24000, max: 36000, rate: 6.8 }, { min: 36000, max: 48000, rate: 7.2 },
        { min: 48000, max: 125000, rate: 7.6 }, { min: 125000, max: 175000, rate: 7.9 },
        { min: 175000, max: 225000, rate: 8.25 }, { min: 225000, max: 275000, rate: 9 },
        { min: 275000, max: 325000, rate: 10 }, { min: 325000, max: null, rate: 11 },
      ],
      standardDeduction: 4400, personalExemption: 1144,
    },
    mfj: {
      brackets: [
        { min: 0, max: 19200, rate: 1.4 }, { min: 19200, max: 28800, rate: 3.2 },
        { min: 28800, max: 38400, rate: 5.5 }, { min: 38400, max: 48000, rate: 6.4 },
        { min: 48000, max: 72000, rate: 6.8 }, { min: 72000, max: 96000, rate: 7.2 },
        { min: 96000, max: 250000, rate: 7.6 }, { min: 250000, max: 350000, rate: 7.9 },
        { min: 350000, max: 450000, rate: 8.25 }, { min: 450000, max: 550000, rate: 9 },
        { min: 550000, max: 650000, rate: 10 }, { min: 650000, max: null, rate: 11 },
      ],
      standardDeduction: 8800, personalExemption: 2288,
    },
    hoh: {
      brackets: [
        { min: 0, max: 14400, rate: 1.4 }, { min: 14400, max: 21600, rate: 3.2 },
        { min: 21600, max: 28800, rate: 5.5 }, { min: 28800, max: 36000, rate: 6.4 },
        { min: 36000, max: 54000, rate: 6.8 }, { min: 54000, max: 72000, rate: 7.2 },
        { min: 72000, max: 187500, rate: 7.6 }, { min: 187500, max: 262500, rate: 7.9 },
        { min: 262500, max: 337500, rate: 8.25 }, { min: 337500, max: 412500, rate: 9 },
        { min: 412500, max: 487500, rate: 10 }, { min: 487500, max: null, rate: 11 },
      ],
      standardDeduction: 6600, personalExemption: 1144,
    },
    mfs: {
      brackets: [
        { min: 0, max: 9600, rate: 1.4 }, { min: 9600, max: 14400, rate: 3.2 },
        { min: 14400, max: 19200, rate: 5.5 }, { min: 19200, max: 24000, rate: 6.4 },
        { min: 24000, max: 36000, rate: 6.8 }, { min: 36000, max: 48000, rate: 7.2 },
        { min: 48000, max: 125000, rate: 7.6 }, { min: 125000, max: 175000, rate: 7.9 },
        { min: 175000, max: 225000, rate: 8.25 }, { min: 225000, max: 275000, rate: 9 },
        { min: 275000, max: 325000, rate: 10 }, { min: 325000, max: null, rate: 11 },
      ],
      standardDeduction: 4400, personalExemption: 1144,
    },
    hasLocalTax: false,
    notes: "Hawaii has the most income tax brackets of any US state (12) and the second-highest top rate at 11%. The state fully taxes pension income and has a relatively low standard deduction of $2,200 for single filers.",
    mapCol: 1, mapRow: 7,
  },
  {
    name: 'Idaho', abbr: 'ID', slug: 'idaho', noTax: false, topRate: 5.3,
    single: {
      brackets: [{ min: 0, max: 4811, rate: 0 }, { min: 4811, max: null, rate: 5.3 }],
      standardDeduction: 15000,
    },
    mfj: {
      brackets: [{ min: 0, max: 9622, rate: 0 }, { min: 9622, max: null, rate: 5.3 }],
      standardDeduction: 30000,
    },
    hoh: {
      brackets: [{ min: 0, max: 7216, rate: 0 }, { min: 7216, max: null, rate: 5.3 }],
      standardDeduction: 22500,
    },
    mfs: {
      brackets: [{ min: 0, max: 4811, rate: 0 }, { min: 4811, max: null, rate: 5.3 }],
      standardDeduction: 15000,
    },
    hasLocalTax: false,
    notes: 'Idaho reduced its income tax rate to 5.3% for 2026, down from 5.8%. The first $4,811 of income (single) is exempt; income above that is taxed at the flat 5.3% rate.',
    mapCol: 1, mapRow: 1,
  },
  {
    name: 'Illinois', abbr: 'IL', slug: 'illinois', noTax: false, topRate: 4.95,
    ...flat(4.95, { single: 0, mfj: 0, hoh: 0, mfs: 0 }, { single: 2925, mfj: 5850, hoh: 2925, mfs: 2925 }),
    hasLocalTax: false,
    notes: "Illinois has a flat 4.95% income tax rate enshrined in the state constitution, which prohibits graduated rates. A 2020 referendum to allow graduated rates was rejected by voters. The state provides a $2,425 personal exemption per filer.",
    mapCol: 5, mapRow: 2,
  },
  {
    name: 'Indiana', abbr: 'IN', slug: 'indiana', noTax: false, topRate: 2.95,
    ...flat(2.95, { single: 0, mfj: 0, hoh: 0, mfs: 0 }, { single: 1000, mfj: 2000, hoh: 1000, mfs: 1000 }),
    hasLocalTax: true,
    localTaxLabel: 'County',
    localRates: [
      { name: 'Adams', rate: 1.624 }, { name: 'Allen', rate: 1.48 }, { name: 'Bartholomew', rate: 1.75 },
      { name: 'Benton', rate: 1.79 }, { name: 'Blackford', rate: 1.65 }, { name: 'Boone', rate: 1.5 },
      { name: 'Brown', rate: 2.523 }, { name: 'Carroll', rate: 2.27 }, { name: 'Cass', rate: 2.7 },
      { name: 'Clark', rate: 2.0 }, { name: 'Clay', rate: 2.35 }, { name: 'Clinton', rate: 2.45 },
      { name: 'Crawford', rate: 1.0 }, { name: 'Daviess', rate: 1.5 }, { name: 'Dearborn', rate: 1.5 },
      { name: 'Decatur', rate: 2.6 }, { name: 'DeKalb', rate: 2.143 }, { name: 'Delaware', rate: 1.5 },
      { name: 'Dubois', rate: 1.0 }, { name: 'Elkhart', rate: 2.0 }, { name: 'Fayette', rate: 2.57 },
      { name: 'Floyd', rate: 1.35 }, { name: 'Fountain', rate: 1.9 }, { name: 'Franklin', rate: 1.4 },
      { name: 'Fulton', rate: 2.68 }, { name: 'Gibson', rate: 0.93 }, { name: 'Grant', rate: 2.55 },
      { name: 'Greene', rate: 1.95 }, { name: 'Hamilton', rate: 1.1 }, { name: 'Hancock', rate: 1.94 },
      { name: 'Harrison', rate: 1.0 }, { name: 'Hendricks', rate: 1.5 }, { name: 'Henry', rate: 1.65 },
      { name: 'Howard', rate: 1.75 }, { name: 'Huntington', rate: 1.92 }, { name: 'Jackson', rate: 2.1 },
      { name: 'Jasper', rate: 2.84 }, { name: 'Jay', rate: 2.24 }, { name: 'Jefferson', rate: 1.8 },
      { name: 'Jennings', rate: 2.1 }, { name: 'Johnson', rate: 1.2 }, { name: 'Knox', rate: 1.5 },
      { name: 'Kosciusko', rate: 1.0 }, { name: 'LaGrange', rate: 1.65 }, { name: 'Lake', rate: 1.5 },
      { name: 'LaPorte', rate: 1.0 }, { name: 'Lawrence', rate: 1.75 }, { name: 'Madison', rate: 1.75 },
      { name: 'Marion', rate: 2.02 }, { name: 'Marshall', rate: 1.25 }, { name: 'Martin', rate: 1.75 },
      { name: 'Miami', rate: 2.254 }, { name: 'Monroe', rate: 1.345 }, { name: 'Montgomery', rate: 2.3 },
      { name: 'Morgan', rate: 2.72 }, { name: 'Newton', rate: 1.55 }, { name: 'Noble', rate: 1.75 },
      { name: 'Ohio', rate: 1.0 }, { name: 'Orange', rate: 1.75 }, { name: 'Owen', rate: 1.6 },
      { name: 'Parke', rate: 2.85 }, { name: 'Perry', rate: 1.75 }, { name: 'Pike', rate: 1.9 },
      { name: 'Porter', rate: 0.5 }, { name: 'Posey', rate: 1.25 }, { name: 'Pulaski', rate: 3.38 },
      { name: 'Putnam', rate: 2.1 }, { name: 'Randolph', rate: 2.5 }, { name: 'Ripley', rate: 1.3 },
      { name: 'Rush', rate: 2.1 }, { name: 'St. Joseph', rate: 1.75 }, { name: 'Scott', rate: 1.5 },
      { name: 'Shelby', rate: 1.5 }, { name: 'Spencer', rate: 1.0 }, { name: 'Starke', rate: 1.75 },
      { name: 'Steuben', rate: 1.79 }, { name: 'Sullivan', rate: 1.7 }, { name: 'Switzerland', rate: 1.0 },
      { name: 'Tippecanoe', rate: 1.28 }, { name: 'Tipton', rate: 2.62 }, { name: 'Union', rate: 1.75 },
      { name: 'Vanderburgh', rate: 1.2 }, { name: 'Vermillion', rate: 1.5 }, { name: 'Vigo', rate: 1.5 },
      { name: 'Wabash', rate: 2.9 }, { name: 'Warren', rate: 1.5 }, { name: 'Warrick', rate: 0.5 },
      { name: 'Washington', rate: 1.8 }, { name: 'Wayne', rate: 1.5 }, { name: 'Wells', rate: 2.1 },
      { name: 'White', rate: 2.44 }, { name: 'Whitley', rate: 1.61 },
    ],
    notes: 'Indiana has a flat 2.95% state income tax for 2026, reduced from 3.05% as part of a scheduled phase-down. All 92 counties add their own income tax ranging from 0.5% (Porter, Warrick) to 3.38% (Pulaski). The combined rate typically falls between 4% and 6%.',
    mapCol: 6, mapRow: 2,
  },
  {
    name: 'Iowa', abbr: 'IA', slug: 'iowa', noTax: false, topRate: 3.8,
    ...flat(3.8, FEDERAL_STD, { single: 40, mfj: 80, hoh: 40, mfs: 40 }),
    hasLocalTax: false,
    notes: 'Iowa reduced its flat income tax rate to 3.8% for 2026, down from 3.9% in 2025 and a complex 9-bracket system previously. The rate is scheduled to decline further toward 3.5% contingent on revenue performance.',
    mapCol: 4, mapRow: 2,
  },
  {
    name: 'Kansas', abbr: 'KS', slug: 'kansas', noTax: false, topRate: 5.58,
    single: {
      brackets: [{ min: 0, max: 23000, rate: 5.2 }, { min: 23000, max: null, rate: 5.58 }],
      standardDeduction: 3605, personalExemption: 9160,
    },
    mfj: {
      brackets: [{ min: 0, max: 46000, rate: 5.2 }, { min: 46000, max: null, rate: 5.58 }],
      standardDeduction: 8240, personalExemption: 18320,
    },
    hoh: {
      brackets: [{ min: 0, max: 34500, rate: 5.2 }, { min: 34500, max: null, rate: 5.58 }],
      standardDeduction: 6000, personalExemption: 9160,
    },
    mfs: {
      brackets: [{ min: 0, max: 23000, rate: 5.2 }, { min: 23000, max: null, rate: 5.58 }],
      standardDeduction: 3605, personalExemption: 9160,
    },
    hasLocalTax: false,
    notes: 'Kansas restructured its income tax to two brackets for 2026: 5.2% on the first $23,000 (single) and 5.58% above that. Social Security income is exempt for all filers regardless of income.',
    mapCol: 3, mapRow: 4,
  },
  {
    name: 'Kentucky', abbr: 'KY', slug: 'kentucky', noTax: false, topRate: 3.5,
    ...flat(3.5, { single: 3360, mfj: 3360, hoh: 3360, mfs: 3360 }),
    hasLocalTax: true,
    localTaxLabel: 'City/County',
    localRates: [
      { name: 'Louisville/Jefferson Co.', rate: 2.2 }, { name: 'Lexington-Fayette', rate: 2.25 },
      { name: 'Bowling Green', rate: 1.85 }, { name: 'Covington', rate: 2.45 },
      { name: 'Owensboro', rate: 1.33 }, { name: 'Richmond', rate: 2.0 },
      { name: 'Florence', rate: 2.0 }, { name: 'Georgetown', rate: 1.5 },
    ],
    localTaxNote: 'Many Kentucky cities and counties levy their own income (occupational) taxes. Louisville charges 2.2%, Lexington 2.25%. Check with your local government for your exact rate.',
    notes: 'Kentucky has a flat 3.5% income tax for 2026, reduced from 4.0% as part of a scheduled phase-down (5%→4.5%→4.0%→3.5%). Many cities and counties add local occupational taxes - Louisville and Lexington both charge around 2.2-2.25%.',
    mapCol: 5, mapRow: 3,
  },
  {
    name: 'Louisiana', abbr: 'LA', slug: 'louisiana', noTax: false, topRate: 3.0,
    ...flat(3.0, { single: 12875, mfj: 25750, hoh: 12875, mfs: 12875 }),
    hasLocalTax: false,
    notes: "Louisiana enacted a flat 3% income tax rate effective January 1, 2025 - a dramatic simplification from the previous graduated structure. The reform was paired with a $12,500 income exemption for single filers and elimination of several deductions.",
    mapCol: 4, mapRow: 5,
  },
  {
    name: 'Maine', abbr: 'ME', slug: 'maine', noTax: false, topRate: 7.15,
    single: {
      brackets: [{ min: 0, max: 27399, rate: 5.8 }, { min: 27399, max: 64849, rate: 6.75 }, { min: 64849, max: null, rate: 7.15 }],
      standardDeduction: 8350, personalExemption: 5300,
    },
    mfj: {
      brackets: [{ min: 0, max: 54849, rate: 5.8 }, { min: 54849, max: 129749, rate: 6.75 }, { min: 129749, max: null, rate: 7.15 }],
      standardDeduction: 16700, personalExemption: 10600,
    },
    hoh: {
      brackets: [{ min: 0, max: 41124, rate: 5.8 }, { min: 41124, max: 97299, rate: 6.75 }, { min: 97299, max: null, rate: 7.15 }],
      standardDeduction: 12525, personalExemption: 5300,
    },
    mfs: {
      brackets: [{ min: 0, max: 27399, rate: 5.8 }, { min: 27399, max: 64849, rate: 6.75 }, { min: 64849, max: null, rate: 7.15 }],
      standardDeduction: 8350, personalExemption: 5300,
    },
    hasLocalTax: false,
    notes: 'Maine has a 3-bracket income tax structure with a top rate of 7.15%. The state conforms to most federal deductions and exemptions. Social Security benefits are fully exempt from Maine income tax.',
    mapCol: 11, mapRow: 0,
  },
  {
    name: 'Maryland', abbr: 'MD', slug: 'maryland', noTax: false, topRate: 5.75,
    single: {
      brackets: [
        { min: 0, max: 1000, rate: 2 }, { min: 1000, max: 2000, rate: 3 },
        { min: 2000, max: 3000, rate: 4 }, { min: 3000, max: 100000, rate: 4.75 },
        { min: 100000, max: 125000, rate: 5 }, { min: 125000, max: 150000, rate: 5.25 },
        { min: 150000, max: 250000, rate: 5.5 }, { min: 250000, max: null, rate: 5.75 },
      ],
      standardDeduction: 3350, personalExemption: 3200,
    },
    mfj: {
      brackets: [
        { min: 0, max: 1000, rate: 2 }, { min: 1000, max: 2000, rate: 3 },
        { min: 2000, max: 3000, rate: 4 }, { min: 3000, max: 150000, rate: 4.75 },
        { min: 150000, max: 175000, rate: 5 }, { min: 175000, max: 225000, rate: 5.25 },
        { min: 225000, max: 300000, rate: 5.5 }, { min: 300000, max: null, rate: 5.75 },
      ],
      standardDeduction: 6700, personalExemption: 6400,
    },
    hoh: {
      brackets: [
        { min: 0, max: 1000, rate: 2 }, { min: 1000, max: 2000, rate: 3 },
        { min: 2000, max: 3000, rate: 4 }, { min: 3000, max: 150000, rate: 4.75 },
        { min: 150000, max: 175000, rate: 5 }, { min: 175000, max: 225000, rate: 5.25 },
        { min: 225000, max: 300000, rate: 5.5 }, { min: 300000, max: null, rate: 5.75 },
      ],
      standardDeduction: 3350, personalExemption: 3200,
    },
    mfs: {
      brackets: [
        { min: 0, max: 1000, rate: 2 }, { min: 1000, max: 2000, rate: 3 },
        { min: 2000, max: 3000, rate: 4 }, { min: 3000, max: 100000, rate: 4.75 },
        { min: 100000, max: 125000, rate: 5 }, { min: 125000, max: 150000, rate: 5.25 },
        { min: 150000, max: 250000, rate: 5.5 }, { min: 250000, max: null, rate: 5.75 },
      ],
      standardDeduction: 3350, personalExemption: 3200,
    },
    hasLocalTax: true,
    localTaxLabel: 'County',
    localRates: [
      { name: 'Allegany', rate: 3.05 }, { name: 'Anne Arundel', rate: 2.81 },
      { name: 'Baltimore City', rate: 3.2 }, { name: 'Baltimore County', rate: 3.2 },
      { name: 'Calvert', rate: 3.0 }, { name: 'Caroline', rate: 3.2 },
      { name: 'Carroll', rate: 3.03 }, { name: 'Cecil', rate: 3.0 },
      { name: 'Charles', rate: 3.03 }, { name: 'Dorchester', rate: 3.2 },
      { name: 'Frederick', rate: 2.96 }, { name: 'Garrett', rate: 2.65 },
      { name: 'Harford', rate: 3.06 }, { name: 'Howard', rate: 3.2 },
      { name: 'Kent', rate: 3.2 }, { name: 'Montgomery', rate: 3.2 },
      { name: 'Prince George\'s', rate: 3.2 }, { name: 'Queen Anne\'s', rate: 3.2 },
      { name: 'St. Mary\'s', rate: 3.0 }, { name: 'Somerset', rate: 3.2 },
      { name: 'Talbot', rate: 2.25 }, { name: 'Washington', rate: 3.0 },
      { name: 'Wicomico', rate: 3.2 }, { name: 'Worcester', rate: 2.25 },
    ],
    notes: "Maryland's state income tax (up to 5.75%) is added to a mandatory county income tax ranging from 2.25% to 3.2%, making combined rates typically 6-9%. Every resident pays both state and county tax, making Maryland one of the more complex income tax states.",
    mapCol: 8, mapRow: 3,
  },
  {
    name: 'Massachusetts', abbr: 'MA', slug: 'massachusetts', noTax: false, topRate: 9.0,
    ...flat(5.0, { single: 0, mfj: 0, hoh: 0, mfs: 0 }, { single: 4400, mfj: 8800, hoh: 6800, mfs: 4400 }),
    hasLocalTax: false,
    notes: "Massachusetts has a flat 5% income tax plus a 4% surtax on income over $1 million (the 'Millionaire's Tax' approved in 2022). The effective top rate is 9%. The state provides a $4,400 personal exemption for single filers.",
    mapCol: 11, mapRow: 2,
  },
  {
    name: 'Michigan', abbr: 'MI', slug: 'michigan', noTax: false, topRate: 4.25,
    ...flat(4.25, { single: 0, mfj: 0, hoh: 0, mfs: 0 }, { single: 5900, mfj: 11800, hoh: 5900, mfs: 5900 }),
    hasLocalTax: true,
    localTaxLabel: 'City',
    localRates: [
      { name: 'Detroit', rate: 2.4 }, { name: 'Grand Rapids', rate: 1.5 },
      { name: 'Highland Park', rate: 2.0 }, { name: 'Saginaw', rate: 1.5 },
      { name: 'Flint', rate: 1.0 }, { name: 'Lansing', rate: 1.0 },
      { name: 'Pontiac', rate: 1.0 }, { name: 'Port Huron', rate: 1.0 },
    ],
    localTaxNote: 'Some Michigan cities levy an income tax: Detroit at 2.4%, Grand Rapids and Saginaw at 1.5%, others at 1.0%. Non-residents working in these cities pay half the resident rate.',
    notes: 'Michigan has a flat 4.25% state income tax rate with a $5,400 personal exemption per filer. Several cities including Detroit (2.4%) add local income taxes. The rate may temporarily decrease if revenue growth triggers a rollback provision.',
    mapCol: 7, mapRow: 1,
  },
  {
    name: 'Minnesota', abbr: 'MN', slug: 'minnesota', noTax: false, topRate: 9.85,
    single: {
      brackets: [{ min: 0, max: 33310, rate: 5.35 }, { min: 33310, max: 109430, rate: 6.8 }, { min: 109430, max: 203150, rate: 7.85 }, { min: 203150, max: null, rate: 9.85 }],
      standardDeduction: 15300,
    },
    mfj: {
      brackets: [{ min: 0, max: 48700, rate: 5.35 }, { min: 48700, max: 193480, rate: 6.8 }, { min: 193480, max: 337930, rate: 7.85 }, { min: 337930, max: null, rate: 9.85 }],
      standardDeduction: 30600,
    },
    hoh: {
      brackets: [{ min: 0, max: 41005, rate: 5.35 }, { min: 41005, max: 163280, rate: 6.8 }, { min: 163280, max: 270540, rate: 7.85 }, { min: 270540, max: null, rate: 9.85 }],
      standardDeduction: 22950,
    },
    mfs: {
      brackets: [{ min: 0, max: 24350, rate: 5.35 }, { min: 24350, max: 96740, rate: 6.8 }, { min: 96740, max: 168965, rate: 7.85 }, { min: 168965, max: null, rate: 9.85 }],
      standardDeduction: 15300,
    },
    hasLocalTax: false,
    notes: 'Minnesota has a top income tax rate of 9.85%, one of the highest in the nation. The state provides full Social Security income deductions for lower-income retirees. It conforms to federal standard deduction amounts.',
    mapCol: 4, mapRow: 1,
  },
  {
    name: 'Mississippi', abbr: 'MS', slug: 'mississippi', noTax: false, topRate: 4.0,
    single: {
      brackets: [{ min: 0, max: 10000, rate: 0 }, { min: 10000, max: null, rate: 4.0 }],
      standardDeduction: 2300, personalExemption: 6000,
    },
    mfj: {
      brackets: [{ min: 0, max: 10000, rate: 0 }, { min: 10000, max: null, rate: 4.0 }],
      standardDeduction: 4600, personalExemption: 12000,
    },
    hoh: {
      brackets: [{ min: 0, max: 10000, rate: 0 }, { min: 10000, max: null, rate: 4.0 }],
      standardDeduction: 2300, personalExemption: 9500,
    },
    mfs: {
      brackets: [{ min: 0, max: 10000, rate: 0 }, { min: 10000, max: null, rate: 4.0 }],
      standardDeduction: 2300, personalExemption: 6000,
    },
    hasLocalTax: false,
    notes: 'Mississippi exempts the first $10,000 of income. The rate on income above $10,000 reached 4.0% in 2026, completing the phase-down from 4.7% (2024) to 4.4% (2025) to 4.0% (2026). Further reductions toward 3.0% are scheduled.',
    mapCol: 5, mapRow: 5,
  },
  {
    name: 'Missouri', abbr: 'MO', slug: 'missouri', noTax: false, topRate: 4.7,
    single: {
      brackets: [
        { min: 0, max: 1348, rate: 0 }, { min: 1348, max: 2696, rate: 2.0 },
        { min: 2696, max: 4044, rate: 2.5 }, { min: 4044, max: 5392, rate: 3.0 },
        { min: 5392, max: 6740, rate: 3.5 }, { min: 6740, max: 8088, rate: 4.0 },
        { min: 8088, max: 9436, rate: 4.5 }, { min: 9436, max: null, rate: 4.7 },
      ],
      standardDeduction: 16100,
    },
    mfj: {
      brackets: [
        { min: 0, max: 1348, rate: 0 }, { min: 1348, max: 2696, rate: 2.0 },
        { min: 2696, max: 4044, rate: 2.5 }, { min: 4044, max: 5392, rate: 3.0 },
        { min: 5392, max: 6740, rate: 3.5 }, { min: 6740, max: 8088, rate: 4.0 },
        { min: 8088, max: 9436, rate: 4.5 }, { min: 9436, max: null, rate: 4.7 },
      ],
      standardDeduction: 32200,
    },
    hoh: {
      brackets: [
        { min: 0, max: 1348, rate: 0 }, { min: 1348, max: 2696, rate: 2.0 },
        { min: 2696, max: 4044, rate: 2.5 }, { min: 4044, max: 5392, rate: 3.0 },
        { min: 5392, max: 6740, rate: 3.5 }, { min: 6740, max: 8088, rate: 4.0 },
        { min: 8088, max: 9436, rate: 4.5 }, { min: 9436, max: null, rate: 4.7 },
      ],
      standardDeduction: 24200,
    },
    mfs: {
      brackets: [
        { min: 0, max: 1348, rate: 0 }, { min: 1348, max: 2696, rate: 2.0 },
        { min: 2696, max: 4044, rate: 2.5 }, { min: 4044, max: 5392, rate: 3.0 },
        { min: 5392, max: 6740, rate: 3.5 }, { min: 6740, max: 8088, rate: 4.0 },
        { min: 8088, max: 9436, rate: 4.5 }, { min: 9436, max: null, rate: 4.7 },
      ],
      standardDeduction: 16100,
    },
    hasLocalTax: true,
    localTaxLabel: 'City',
    localRates: [
      { name: 'Kansas City', rate: 1.0 }, { name: 'St. Louis', rate: 1.0 },
    ],
    localTaxNote: 'Kansas City and St. Louis each levy a 1% earnings tax on residents and non-residents who work in those cities.',
    notes: 'Missouri has been steadily reducing its top income tax rate. The rate dropped to 4.7% in 2024 and is scheduled to reduce further to 4.5% contingent on revenue performance. Kansas City and St. Louis add 1% earnings taxes.',
    mapCol: 4, mapRow: 3,
  },
  {
    name: 'Montana', abbr: 'MT', slug: 'montana', noTax: false, topRate: 5.65,
    single: {
      brackets: [{ min: 0, max: 47500, rate: 4.7 }, { min: 47500, max: null, rate: 5.65 }],
      standardDeduction: 16100,
    },
    mfj: {
      brackets: [{ min: 0, max: 95000, rate: 4.7 }, { min: 95000, max: null, rate: 5.65 }],
      standardDeduction: 32200,
    },
    hoh: {
      brackets: [{ min: 0, max: 71250, rate: 4.7 }, { min: 71250, max: null, rate: 5.65 }],
      standardDeduction: 24200,
    },
    mfs: {
      brackets: [{ min: 0, max: 47500, rate: 4.7 }, { min: 47500, max: null, rate: 5.65 }],
      standardDeduction: 16100,
    },
    hasLocalTax: false,
    notes: 'Montana reduced its top income tax rate to 5.65% for 2026 (from 5.9%) and increased the bracket threshold to $47,500 (single). The state has no sales tax, so income tax is a primary revenue source.',
    mapCol: 2, mapRow: 1,
  },
  {
    name: 'Nebraska', abbr: 'NE', slug: 'nebraska', noTax: false, topRate: 4.55,
    single: {
      brackets: [{ min: 0, max: 4130, rate: 2.46 }, { min: 4130, max: 24760, rate: 3.51 }, { min: 24760, max: null, rate: 4.55 }],
      standardDeduction: 8850, personalExemption: 176,
    },
    mfj: {
      brackets: [{ min: 0, max: 8250, rate: 2.46 }, { min: 8250, max: 49530, rate: 3.51 }, { min: 49530, max: null, rate: 4.55 }],
      standardDeduction: 17700, personalExemption: 352,
    },
    hoh: {
      brackets: [{ min: 0, max: 6190, rate: 2.46 }, { min: 6190, max: 37145, rate: 3.51 }, { min: 37145, max: null, rate: 4.55 }],
      standardDeduction: 13275, personalExemption: 176,
    },
    mfs: {
      brackets: [{ min: 0, max: 4130, rate: 2.46 }, { min: 4130, max: 24760, rate: 3.51 }, { min: 24760, max: null, rate: 4.55 }],
      standardDeduction: 8850, personalExemption: 176,
    },
    hasLocalTax: false,
    notes: 'Nebraska reduced its top income tax rate to 4.55% for 2026, down from 5.2% in 2025. The state also simplified from 4 brackets to 3 as part of its legislated phase-down toward 3.99% by 2027.',
    mapCol: 3, mapRow: 3,
  },
  {
    name: 'Nevada', abbr: 'NV', slug: 'nevada', noTax: true, topRate: 0,
    ...noTaxFilings(),
    hasLocalTax: false,
    notes: "Nevada has no state income tax. Las Vegas and the broader gaming industry generate substantial revenue through gaming taxes, which help fund state services alongside sales taxes.",
    mapCol: 1, mapRow: 2,
  },
  {
    name: 'New Hampshire', abbr: 'NH', slug: 'new-hampshire', noTax: true, topRate: 0,
    ...noTaxFilings(),
    hasLocalTax: false,
    notes: "New Hampshire eliminated its Interest and Dividends Tax effective January 1, 2025, making it fully income-tax-free. Wages have never been taxed. The state's motto 'Live Free or Die' reflects its low-tax philosophy.",
    mapCol: 11, mapRow: 1,
  },
  {
    name: 'New Jersey', abbr: 'NJ', slug: 'new-jersey', noTax: false, topRate: 10.75,
    single: {
      brackets: [
        { min: 0, max: 20000, rate: 1.4 }, { min: 20000, max: 35000, rate: 1.75 },
        { min: 35000, max: 40000, rate: 3.5 }, { min: 40000, max: 75000, rate: 5.525 },
        { min: 75000, max: 500000, rate: 6.37 }, { min: 500000, max: 1000000, rate: 8.97 },
        { min: 1000000, max: null, rate: 10.75 },
      ],
      standardDeduction: 0, personalExemption: 1000,
    },
    mfj: {
      brackets: [
        { min: 0, max: 20000, rate: 1.4 }, { min: 20000, max: 50000, rate: 1.75 },
        { min: 50000, max: 70000, rate: 2.45 }, { min: 70000, max: 80000, rate: 3.5 },
        { min: 80000, max: 150000, rate: 5.525 }, { min: 150000, max: 500000, rate: 6.37 },
        { min: 500000, max: 1000000, rate: 8.97 }, { min: 1000000, max: null, rate: 10.75 },
      ],
      standardDeduction: 0, personalExemption: 2000,
    },
    hoh: {
      brackets: [
        { min: 0, max: 20000, rate: 1.4 }, { min: 20000, max: 50000, rate: 1.75 },
        { min: 50000, max: 70000, rate: 2.45 }, { min: 70000, max: 80000, rate: 3.5 },
        { min: 80000, max: 150000, rate: 5.525 }, { min: 150000, max: 500000, rate: 6.37 },
        { min: 500000, max: 1000000, rate: 8.97 }, { min: 1000000, max: null, rate: 10.75 },
      ],
      standardDeduction: 0, personalExemption: 1500,
    },
    mfs: {
      brackets: [
        { min: 0, max: 20000, rate: 1.4 }, { min: 20000, max: 35000, rate: 1.75 },
        { min: 35000, max: 40000, rate: 3.5 }, { min: 40000, max: 75000, rate: 5.525 },
        { min: 75000, max: 500000, rate: 6.37 }, { min: 500000, max: 1000000, rate: 8.97 },
        { min: 1000000, max: null, rate: 10.75 },
      ],
      standardDeduction: 0, personalExemption: 1000,
    },
    hasLocalTax: false,
    notes: 'New Jersey has a top income tax rate of 10.75% on income over $1 million. It has no standard deduction but provides small personal exemptions. The combination of high income and property taxes makes NJ one of the highest-tax states.',
    mapCol: 9, mapRow: 2,
  },
  {
    name: 'New Mexico', abbr: 'NM', slug: 'new-mexico', noTax: false, topRate: 5.9,
    single: {
      brackets: [
        { min: 0, max: 5500, rate: 1.5 }, { min: 5500, max: 16500, rate: 3.2 },
        { min: 16500, max: 33500, rate: 4.3 }, { min: 33500, max: 66500, rate: 4.7 },
        { min: 66500, max: 210000, rate: 4.9 }, { min: 210000, max: null, rate: 5.9 },
      ],
      standardDeduction: 16100,
    },
    mfj: {
      brackets: [
        { min: 0, max: 8000, rate: 1.5 }, { min: 8000, max: 25000, rate: 3.2 },
        { min: 25000, max: 50000, rate: 4.3 }, { min: 50000, max: 100000, rate: 4.7 },
        { min: 100000, max: 315000, rate: 4.9 }, { min: 315000, max: null, rate: 5.9 },
      ],
      standardDeduction: 32200,
    },
    hoh: {
      brackets: [
        { min: 0, max: 8000, rate: 1.5 }, { min: 8000, max: 25000, rate: 3.2 },
        { min: 25000, max: 50000, rate: 4.3 }, { min: 50000, max: 100000, rate: 4.7 },
        { min: 100000, max: 315000, rate: 4.9 }, { min: 315000, max: null, rate: 5.9 },
      ],
      standardDeduction: 24200,
    },
    mfs: {
      brackets: [
        { min: 0, max: 5500, rate: 1.5 }, { min: 5500, max: 16500, rate: 3.2 },
        { min: 16500, max: 33500, rate: 4.3 }, { min: 33500, max: 66500, rate: 4.7 },
        { min: 66500, max: 210000, rate: 4.9 }, { min: 210000, max: null, rate: 5.9 },
      ],
      standardDeduction: 16100,
    },
    hasLocalTax: false,
    notes: 'New Mexico added a top bracket of 5.9% on income over $210,000 (single) in 2021. The state provides a low-income comprehensive tax rebate and military retirement income is fully exempt.',
    mapCol: 2, mapRow: 4,
  },
  {
    name: 'New York', abbr: 'NY', slug: 'new-york', noTax: false, topRate: 10.9,
    single: {
      brackets: [
        { min: 0, max: 8500, rate: 3.9 }, { min: 8500, max: 11700, rate: 4.4 },
        { min: 11700, max: 13900, rate: 5.15 }, { min: 13900, max: 80650, rate: 5.4 },
        { min: 80650, max: 215400, rate: 5.9 }, { min: 215400, max: 1077550, rate: 6.85 },
        { min: 1077550, max: 5000000, rate: 9.65 }, { min: 5000000, max: 25000000, rate: 10.3 },
        { min: 25000000, max: null, rate: 10.9 },
      ],
      standardDeduction: 8000,
    },
    mfj: {
      brackets: [
        { min: 0, max: 17150, rate: 3.9 }, { min: 17150, max: 23600, rate: 4.4 },
        { min: 23600, max: 27900, rate: 5.15 }, { min: 27900, max: 161550, rate: 5.4 },
        { min: 161550, max: 323200, rate: 5.9 }, { min: 323200, max: 2155350, rate: 6.85 },
        { min: 2155350, max: 5000000, rate: 9.65 }, { min: 5000000, max: 25000000, rate: 10.3 },
        { min: 25000000, max: null, rate: 10.9 },
      ],
      standardDeduction: 16050,
    },
    hoh: {
      brackets: [
        { min: 0, max: 12800, rate: 3.9 }, { min: 12800, max: 17650, rate: 4.4 },
        { min: 17650, max: 20900, rate: 5.15 }, { min: 20900, max: 161550, rate: 5.4 },
        { min: 161550, max: 323200, rate: 5.9 }, { min: 323200, max: 2155350, rate: 6.85 },
        { min: 2155350, max: 5000000, rate: 9.65 }, { min: 5000000, max: 25000000, rate: 10.3 },
        { min: 25000000, max: null, rate: 10.9 },
      ],
      standardDeduction: 11200,
    },
    mfs: {
      brackets: [
        { min: 0, max: 8500, rate: 3.9 }, { min: 8500, max: 11700, rate: 4.4 },
        { min: 11700, max: 13900, rate: 5.15 }, { min: 13900, max: 80650, rate: 5.4 },
        { min: 80650, max: 215400, rate: 5.9 }, { min: 215400, max: 1077550, rate: 6.85 },
        { min: 1077550, max: 5000000, rate: 9.65 }, { min: 5000000, max: 25000000, rate: 10.3 },
        { min: 25000000, max: null, rate: 10.9 },
      ],
      standardDeduction: 8000,
    },
    hasLocalTax: true,
    localTaxLabel: 'City',
    localRates: [
      { name: 'New York City', rate: 3.5 }, { name: 'Yonkers (resident)', rate: 1.477 },
    ],
    localTaxNote: "New York City residents pay an additional 3.078-3.876% NYC income tax (shown as avg 3.5%). Yonkers residents pay 16.75% of their New York State tax liability as a city surcharge (shown as ~1.477% of income).",
    notes: "New York state has a top rate of 10.9% on income over $25 million. NYC residents add up to 3.876% city tax, making combined rates potentially over 14%. The state provides a standard deduction of $8,000 for single filers.",
    mapCol: 9, mapRow: 1,
  },
  {
    name: 'North Carolina', abbr: 'NC', slug: 'north-carolina', noTax: false, topRate: 3.99,
    ...flat(3.99, { single: 12750, mfj: 25500, hoh: 19125, mfs: 12750 }),
    hasLocalTax: false,
    notes: 'North Carolina reduced its flat income tax rate to 3.99% for 2026, down from 4.5% in 2024. Further scheduled reductions will eventually bring the rate to 2.49% by 2030. Social Security income is fully exempt.',
    mapCol: 6, mapRow: 4,
  },
  {
    name: 'North Dakota', abbr: 'ND', slug: 'north-dakota', noTax: false, topRate: 2.5,
    single: {
      brackets: [{ min: 0, max: 48475, rate: 0 }, { min: 48475, max: 244825, rate: 1.95 }, { min: 244825, max: null, rate: 2.5 }],
      standardDeduction: 16100,
    },
    mfj: {
      brackets: [{ min: 0, max: 80975, rate: 0 }, { min: 80975, max: 298075, rate: 1.95 }, { min: 298075, max: null, rate: 2.5 }],
      standardDeduction: 32200,
    },
    hoh: {
      brackets: [{ min: 0, max: 64700, rate: 0 }, { min: 64700, max: 238150, rate: 1.95 }, { min: 238150, max: null, rate: 2.5 }],
      standardDeduction: 24200,
    },
    mfs: {
      brackets: [{ min: 0, max: 48475, rate: 0 }, { min: 48475, max: 244825, rate: 1.95 }, { min: 244825, max: null, rate: 2.5 }],
      standardDeduction: 16100,
    },
    hasLocalTax: false,
    notes: 'North Dakota restructured its income tax for 2026: income below $48,475 (single) is taxed at 0%, income from $48,475 to $244,824 at 1.95%, and income above $244,825 at 2.5%. The reform effectively eliminates taxes for lower and middle-income earners.',
    mapCol: 3, mapRow: 1,
  },
  {
    name: 'Ohio', abbr: 'OH', slug: 'ohio', noTax: false, topRate: 2.75,
    single: {
      brackets: [{ min: 0, max: 26050, rate: 0 }, { min: 26050, max: null, rate: 2.75 }],
      standardDeduction: 0, personalExemption: 2400,
    },
    mfj: {
      brackets: [{ min: 0, max: 26050, rate: 0 }, { min: 26050, max: null, rate: 2.75 }],
      standardDeduction: 0, personalExemption: 4800,
    },
    hoh: {
      brackets: [{ min: 0, max: 26050, rate: 0 }, { min: 26050, max: null, rate: 2.75 }],
      standardDeduction: 0, personalExemption: 2400,
    },
    mfs: {
      brackets: [{ min: 0, max: 26050, rate: 0 }, { min: 26050, max: null, rate: 2.75 }],
      standardDeduction: 0, personalExemption: 2400,
    },
    hasLocalTax: true,
    localTaxLabel: 'City/Municipality',
    localRates: [
      { name: 'Columbus', rate: 2.5 }, { name: 'Cleveland', rate: 2.5 },
      { name: 'Cincinnati', rate: 1.8 }, { name: 'Toledo', rate: 2.5 },
      { name: 'Akron', rate: 2.5 }, { name: 'Dayton', rate: 2.5 },
    ],
    localTaxNote: 'Ohio municipalities levy their own income taxes, typically 1.5-3%. Columbus, Cleveland, Akron, and Toledo charge 2.5%. Over 600 Ohio cities have local income taxes.',
    notes: 'Ohio eliminated its top income tax bracket for 2026, simplifying to two tiers: 0% on the first $26,050 and a flat 2.75% on income above that. Most Ohio residents also pay a city income tax of 1.5-3%.',
    mapCol: 7, mapRow: 2,
  },
  {
    name: 'Oklahoma', abbr: 'OK', slug: 'oklahoma', noTax: false, topRate: 4.5,
    single: {
      brackets: [
        { min: 0, max: 3750, rate: 0 }, { min: 3750, max: 4900, rate: 2.5 },
        { min: 4900, max: 7200, rate: 3.5 }, { min: 7200, max: null, rate: 4.5 },
      ],
      standardDeduction: 6350, personalExemption: 1000,
    },
    mfj: {
      brackets: [
        { min: 0, max: 7500, rate: 0 }, { min: 7500, max: 9800, rate: 2.5 },
        { min: 9800, max: 14400, rate: 3.5 }, { min: 14400, max: null, rate: 4.5 },
      ],
      standardDeduction: 12700, personalExemption: 2000,
    },
    hoh: {
      brackets: [
        { min: 0, max: 3750, rate: 0 }, { min: 3750, max: 4900, rate: 2.5 },
        { min: 4900, max: 7200, rate: 3.5 }, { min: 7200, max: null, rate: 4.5 },
      ],
      standardDeduction: 9350, personalExemption: 1000,
    },
    mfs: {
      brackets: [
        { min: 0, max: 3750, rate: 0 }, { min: 3750, max: 4900, rate: 2.5 },
        { min: 4900, max: 7200, rate: 3.5 }, { min: 7200, max: null, rate: 4.5 },
      ],
      standardDeduction: 6350, personalExemption: 1000,
    },
    hasLocalTax: false,
    notes: 'Oklahoma simplified its income tax to 4 brackets for 2026: the first $3,750 is tax-free, then 2.5%, 3.5%, and 4.5% top rate. The top rate was reduced from 4.75% and the three lowest brackets were eliminated. Social Security income is fully exempt.',
    mapCol: 3, mapRow: 5,
  },
  {
    name: 'Oregon', abbr: 'OR', slug: 'oregon', noTax: false, topRate: 9.9,
    single: {
      brackets: [{ min: 0, max: 4550, rate: 4.75 }, { min: 4550, max: 11400, rate: 6.75 }, { min: 11400, max: 125000, rate: 8.75 }, { min: 125000, max: null, rate: 9.9 }],
      standardDeduction: 2910,
    },
    mfj: {
      brackets: [{ min: 0, max: 9100, rate: 4.75 }, { min: 9100, max: 22800, rate: 6.75 }, { min: 22800, max: 250000, rate: 8.75 }, { min: 250000, max: null, rate: 9.9 }],
      standardDeduction: 5820,
    },
    hoh: {
      brackets: [{ min: 0, max: 6825, rate: 4.75 }, { min: 6825, max: 17100, rate: 6.75 }, { min: 17100, max: 125000, rate: 8.75 }, { min: 125000, max: null, rate: 9.9 }],
      standardDeduction: 4365,
    },
    mfs: {
      brackets: [{ min: 0, max: 4550, rate: 4.75 }, { min: 4550, max: 11400, rate: 6.75 }, { min: 11400, max: 125000, rate: 8.75 }, { min: 125000, max: null, rate: 9.9 }],
      standardDeduction: 2910,
    },
    hasLocalTax: true,
    localTaxLabel: 'City/District',
    localRates: [
      { name: 'Portland Metro (SHS)', rate: 1.0 },
      { name: 'Multnomah County (PFA)', rate: 1.5 },
    ],
    localTaxNote: "Portland Metro area residents pay a 1% Supportive Housing Services (SHS) tax on income over $125,000 (single). Multnomah County adds a 1.5% Preschool for All (PFA) tax on income over $125,000. These are in addition to state income tax.",
    notes: "Oregon has a high top income tax rate of 9.9% and no sales tax. The state's standard deduction is relatively low ($2,420 for single filers). Portland metro area residents face additional local taxes that can push combined marginal rates past 12%.",
    mapCol: 0, mapRow: 2,
  },
  {
    name: 'Pennsylvania', abbr: 'PA', slug: 'pennsylvania', noTax: false, topRate: 3.07,
    ...flat(3.07, { single: 0, mfj: 0, hoh: 0, mfs: 0 }),
    hasLocalTax: true,
    localTaxLabel: 'Municipality',
    localRates: [
      { name: 'Philadelphia', rate: 3.75 }, { name: 'Pittsburgh', rate: 3.0 },
      { name: 'Allentown', rate: 1.975 }, { name: 'Erie', rate: 1.18 },
      { name: 'Reading', rate: 3.6 }, { name: 'Scranton', rate: 3.4 },
    ],
    localTaxNote: 'Pennsylvania municipalities levy Earned Income Taxes (EIT). Philadelphia residents pay 3.75% city wage tax. Most other PA municipalities charge 1-2%. Check your local school district and municipality for exact rates.',
    notes: 'Pennsylvania has the lowest flat income tax rate of any state with an income tax at 3.07%. However, municipalities add their own Earned Income Taxes that can be substantial - Philadelphia charges 3.75%, making the combined rate 6.82% for Philadelphia residents.',
    mapCol: 8, mapRow: 2,
  },
  {
    name: 'Rhode Island', abbr: 'RI', slug: 'rhode-island', noTax: false, topRate: 5.99,
    single: {
      brackets: [{ min: 0, max: 82050, rate: 3.75 }, { min: 82050, max: 186450, rate: 4.75 }, { min: 186450, max: null, rate: 5.99 }],
      standardDeduction: 11200, personalExemption: 5250,
    },
    mfj: {
      brackets: [{ min: 0, max: 164100, rate: 3.75 }, { min: 164100, max: 372900, rate: 4.75 }, { min: 372900, max: null, rate: 5.99 }],
      standardDeduction: 22400, personalExemption: 10500,
    },
    hoh: {
      brackets: [{ min: 0, max: 123075, rate: 3.75 }, { min: 123075, max: 279675, rate: 4.75 }, { min: 279675, max: null, rate: 5.99 }],
      standardDeduction: 16800, personalExemption: 5250,
    },
    mfs: {
      brackets: [{ min: 0, max: 82050, rate: 3.75 }, { min: 82050, max: 186450, rate: 4.75 }, { min: 186450, max: null, rate: 5.99 }],
      standardDeduction: 11200, personalExemption: 5250,
    },
    hasLocalTax: false,
    notes: 'Rhode Island has a 3-bracket income tax structure. The state conforms to federal definitions of income but has its own standard deduction amounts that differ from federal levels.',
    mapCol: 10, mapRow: 3,
  },
  {
    name: 'South Carolina', abbr: 'SC', slug: 'south-carolina', noTax: false, topRate: 6.0,
    single: {
      brackets: [{ min: 0, max: 3640, rate: 0 }, { min: 3640, max: 18230, rate: 3 }, { min: 18230, max: null, rate: 6.0 }],
      standardDeduction: 8350,
    },
    mfj: {
      brackets: [{ min: 0, max: 7280, rate: 0 }, { min: 7280, max: 36460, rate: 3 }, { min: 36460, max: null, rate: 6.0 }],
      standardDeduction: 16700,
    },
    hoh: {
      brackets: [{ min: 0, max: 5460, rate: 0 }, { min: 5460, max: 27345, rate: 3 }, { min: 27345, max: null, rate: 6.0 }],
      standardDeduction: 12525,
    },
    mfs: {
      brackets: [{ min: 0, max: 3640, rate: 0 }, { min: 3640, max: 18230, rate: 3 }, { min: 18230, max: null, rate: 6.0 }],
      standardDeduction: 8350,
    },
    hasLocalTax: false,
    notes: 'South Carolina reached its 6.0% target top rate for 2026, completing the phase-down from 7% (begun 2022). The first $3,640 of income is exempt. Social Security and military retirement income are exempt.',
    mapCol: 7, mapRow: 4,
  },
  {
    name: 'South Dakota', abbr: 'SD', slug: 'south-dakota', noTax: true, topRate: 0,
    ...noTaxFilings(),
    hasLocalTax: false,
    notes: 'South Dakota has no state income tax. The state is popular for trusts and financial services due to its favorable tax laws. Sales tax is the primary revenue source.',
    mapCol: 3, mapRow: 2,
  },
  {
    name: 'Tennessee', abbr: 'TN', slug: 'tennessee', noTax: true, topRate: 0,
    ...noTaxFilings(),
    hasLocalTax: false,
    notes: "Tennessee eliminated its Hall Tax on investment income effective January 1, 2021. Wages, salaries, and most income have never been taxed in Tennessee. The state relies heavily on the 7% sales tax for revenue.",
    mapCol: 5, mapRow: 4,
  },
  {
    name: 'Texas', abbr: 'TX', slug: 'texas', noTax: true, topRate: 0,
    ...noTaxFilings(),
    hasLocalTax: false,
    notes: 'Texas has no state income tax, enshrined in the state constitution. The state funds itself through property taxes (some of the highest in the nation) and sales taxes.',
    mapCol: 3, mapRow: 6,
  },
  {
    name: 'Utah', abbr: 'UT', slug: 'utah', noTax: false, topRate: 4.5,
    ...flat(4.5, FEDERAL_STD, { single: 966, mfj: 1932, hoh: 966, mfs: 966 }),
    hasLocalTax: false,
    notes: 'Utah has a flat 4.5% income tax for 2026, reduced from 4.65%. The state provides a personal exemption credit and conforms to federal standard deduction amounts.',
    mapCol: 1, mapRow: 3,
  },
  {
    name: 'Vermont', abbr: 'VT', slug: 'vermont', noTax: false, topRate: 8.75,
    single: {
      brackets: [{ min: 0, max: 49400, rate: 3.35 }, { min: 49400, max: 119700, rate: 6.6 }, { min: 119700, max: 249700, rate: 7.6 }, { min: 249700, max: null, rate: 8.75 }],
      standardDeduction: 7650, personalExemption: 5300,
    },
    mfj: {
      brackets: [{ min: 0, max: 82500, rate: 3.35 }, { min: 82500, max: 199450, rate: 6.6 }, { min: 199450, max: 304000, rate: 7.6 }, { min: 304000, max: null, rate: 8.75 }],
      standardDeduction: 15300, personalExemption: 10600,
    },
    hoh: {
      brackets: [{ min: 0, max: 65950, rate: 3.35 }, { min: 65950, max: 159575, rate: 6.6 }, { min: 159575, max: 276850, rate: 7.6 }, { min: 276850, max: null, rate: 8.75 }],
      standardDeduction: 11475, personalExemption: 5300,
    },
    mfs: {
      brackets: [{ min: 0, max: 41250, rate: 3.35 }, { min: 41250, max: 99725, rate: 6.6 }, { min: 99725, max: 152000, rate: 7.6 }, { min: 152000, max: null, rate: 8.75 }],
      standardDeduction: 7650, personalExemption: 5300,
    },
    hasLocalTax: false,
    notes: 'Vermont has a progressive income tax with a top rate of 8.75%. The state conforms to federal standard deduction amounts. Social Security income for lower-income filers is exempt.',
    mapCol: 10, mapRow: 1,
  },
  {
    name: 'Virginia', abbr: 'VA', slug: 'virginia', noTax: false, topRate: 5.75,
    single: {
      brackets: [{ min: 0, max: 3000, rate: 2 }, { min: 3000, max: 5000, rate: 3 }, { min: 5000, max: 17000, rate: 5 }, { min: 17000, max: null, rate: 5.75 }],
      standardDeduction: 8750, personalExemption: 930,
    },
    mfj: {
      brackets: [{ min: 0, max: 3000, rate: 2 }, { min: 3000, max: 5000, rate: 3 }, { min: 5000, max: 17000, rate: 5 }, { min: 17000, max: null, rate: 5.75 }],
      standardDeduction: 17500, personalExemption: 1860,
    },
    hoh: {
      brackets: [{ min: 0, max: 3000, rate: 2 }, { min: 3000, max: 5000, rate: 3 }, { min: 5000, max: 17000, rate: 5 }, { min: 17000, max: null, rate: 5.75 }],
      standardDeduction: 8750, personalExemption: 930,
    },
    mfs: {
      brackets: [{ min: 0, max: 3000, rate: 2 }, { min: 3000, max: 5000, rate: 3 }, { min: 5000, max: 17000, rate: 5 }, { min: 17000, max: null, rate: 5.75 }],
      standardDeduction: 8750, personalExemption: 930,
    },
    hasLocalTax: false,
    notes: "Virginia's income tax has an unusual structure: the 5.75% top rate kicks in at just $17,000 of taxable income. The state raised its standard deduction substantially in recent years from $4,500 to $8,000 for single filers.",
    mapCol: 7, mapRow: 3,
  },
  {
    name: 'Washington', abbr: 'WA', slug: 'washington', noTax: true, topRate: 0,
    ...noTaxFilings(),
    hasLocalTax: false,
    notes: "Washington has no income tax on wages or salaries. The state has a 7% capital gains tax on gains over $250,000 (enacted 2022) but this does not apply to W-2 income, retirement accounts, or real estate.",
    mapCol: 0, mapRow: 1,
  },
  {
    name: 'West Virginia', abbr: 'WV', slug: 'west-virginia', noTax: false, topRate: 4.82,
    single: {
      brackets: [{ min: 0, max: 10000, rate: 2.22 }, { min: 10000, max: 25000, rate: 2.96 }, { min: 25000, max: 40000, rate: 3.33 }, { min: 40000, max: 60000, rate: 4.44 }, { min: 60000, max: null, rate: 4.82 }],
      standardDeduction: 0, personalExemption: 2000,
    },
    mfj: {
      brackets: [{ min: 0, max: 10000, rate: 2.22 }, { min: 10000, max: 25000, rate: 2.96 }, { min: 25000, max: 40000, rate: 3.33 }, { min: 40000, max: 60000, rate: 4.44 }, { min: 60000, max: null, rate: 4.82 }],
      standardDeduction: 0, personalExemption: 4000,
    },
    hoh: {
      brackets: [{ min: 0, max: 10000, rate: 2.22 }, { min: 10000, max: 25000, rate: 2.96 }, { min: 25000, max: 40000, rate: 3.33 }, { min: 40000, max: 60000, rate: 4.44 }, { min: 60000, max: null, rate: 4.82 }],
      standardDeduction: 0, personalExemption: 2000,
    },
    mfs: {
      brackets: [{ min: 0, max: 10000, rate: 2.22 }, { min: 10000, max: 25000, rate: 2.96 }, { min: 25000, max: 40000, rate: 3.33 }, { min: 40000, max: 60000, rate: 4.44 }, { min: 60000, max: null, rate: 4.82 }],
      standardDeduction: 0, personalExemption: 2000,
    },
    hasLocalTax: false,
    notes: 'West Virginia has been cutting income taxes via automatic revenue-triggered reductions. The 2026 top rate is 4.82%, down from 5.12% (2024) and 6.5% (pre-2023). All five bracket rates were reduced.',
    mapCol: 6, mapRow: 3,
  },
  {
    name: 'Wisconsin', abbr: 'WI', slug: 'wisconsin', noTax: false, topRate: 7.65,
    single: {
      brackets: [{ min: 0, max: 15110, rate: 3.5 }, { min: 15110, max: 51950, rate: 4.4 }, { min: 51950, max: 332720, rate: 5.3 }, { min: 332720, max: null, rate: 7.65 }],
      standardDeduction: 13960,
    },
    mfj: {
      brackets: [{ min: 0, max: 20150, rate: 3.5 }, { min: 20150, max: 69260, rate: 4.4 }, { min: 69260, max: 443630, rate: 5.3 }, { min: 443630, max: null, rate: 7.65 }],
      standardDeduction: 25840,
    },
    hoh: {
      brackets: [{ min: 0, max: 17630, rate: 3.5 }, { min: 17630, max: 60605, rate: 4.4 }, { min: 60605, max: 388175, rate: 5.3 }, { min: 388175, max: null, rate: 7.65 }],
      standardDeduction: 19880,
    },
    mfs: {
      brackets: [{ min: 0, max: 10075, rate: 3.5 }, { min: 10075, max: 34630, rate: 4.4 }, { min: 34630, max: 221815, rate: 5.3 }, { min: 221815, max: null, rate: 7.65 }],
      standardDeduction: 12920,
    },
    hasLocalTax: false,
    notes: "Wisconsin reduced its bottom two bracket rates to 3.5% and 4.4% for 2026 (from 3.54% and 4.65%), and raised the bracket thresholds. The top rate of 7.65% still applies only above $332,720 (single). Wisconsin exempts most Social Security income.",
    mapCol: 5, mapRow: 1,
  },
  {
    name: 'Wyoming', abbr: 'WY', slug: 'wyoming', noTax: true, topRate: 0,
    ...noTaxFilings(),
    hasLocalTax: false,
    notes: 'Wyoming has no income tax and very low tax burden overall. The state relies on mineral extraction taxes and federal mineral royalties for a significant portion of its revenue.',
    mapCol: 2, mapRow: 2,
  },
];

export const US_INCOME_TAX_MAP: Record<string, StateIncomeTax> = Object.fromEntries(
  US_INCOME_TAX.map(s => [s.slug, s])
);

export const FEDERAL_BRACKETS = {
  single: [
    { min: 0, max: 11925, rate: 10 }, { min: 11925, max: 48475, rate: 12 },
    { min: 48475, max: 103350, rate: 22 }, { min: 103350, max: 197300, rate: 24 },
    { min: 197300, max: 250525, rate: 32 }, { min: 250525, max: 626350, rate: 35 },
    { min: 626350, max: null, rate: 37 },
  ],
  mfj: [
    { min: 0, max: 23850, rate: 10 }, { min: 23850, max: 96950, rate: 12 },
    { min: 96950, max: 206700, rate: 22 }, { min: 206700, max: 394600, rate: 24 },
    { min: 394600, max: 501050, rate: 32 }, { min: 501050, max: 751600, rate: 35 },
    { min: 751600, max: null, rate: 37 },
  ],
  hoh: [
    { min: 0, max: 17000, rate: 10 }, { min: 17000, max: 64850, rate: 12 },
    { min: 64850, max: 103350, rate: 22 }, { min: 103350, max: 197300, rate: 24 },
    { min: 197300, max: 250500, rate: 32 }, { min: 250500, max: 626350, rate: 35 },
    { min: 626350, max: null, rate: 37 },
  ],
  mfs: [
    { min: 0, max: 11925, rate: 10 }, { min: 11925, max: 48475, rate: 12 },
    { min: 48475, max: 103350, rate: 22 }, { min: 103350, max: 197300, rate: 24 },
    { min: 197300, max: 250525, rate: 32 }, { min: 250525, max: 375800, rate: 35 },
    { min: 375800, max: null, rate: 37 },
  ],
};

export const FEDERAL_STANDARD_DEDUCTIONS = {
  single: 16100, mfj: 32200, hoh: 24150, mfs: 16100,
};

export const FICA_2025 = {
  socialSecurityRate: 6.2,
  socialSecurityWageBase: 176100,
  medicareRate: 1.45,
  additionalMedicareRate: 0.9,
  additionalMedicareThreshold: { single: 200000, mfj: 250000, hoh: 200000, mfs: 125000 },
};
