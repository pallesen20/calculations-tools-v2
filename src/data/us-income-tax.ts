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

const FEDERAL_STD = { single: 15000, mfj: 30000, hoh: 22500, mfs: 15000 };

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
    ...flat(2.5, FEDERAL_STD),
    hasLocalTax: false,
    notes: 'Arizona enacted a flat 2.5% income tax rate in 2023, making it one of the lowest flat-rate states in the country. The flat rate replaced a graduated structure with rates up to 4.5%.',
    mapCol: 1, mapRow: 4,
  },
  {
    name: 'Arkansas', abbr: 'AR', slug: 'arkansas', noTax: false, topRate: 3.9,
    single: {
      brackets: [{ min: 0, max: 4599, rate: 2 }, { min: 4599, max: null, rate: 3.9 }],
      standardDeduction: 2340, personalExemption: 29,
    },
    mfj: {
      brackets: [{ min: 0, max: 4599, rate: 2 }, { min: 4599, max: null, rate: 3.9 }],
      standardDeduction: 4680, personalExemption: 58,
    },
    hoh: {
      brackets: [{ min: 0, max: 4599, rate: 2 }, { min: 4599, max: null, rate: 3.9 }],
      standardDeduction: 2340, personalExemption: 29,
    },
    mfs: {
      brackets: [{ min: 0, max: 4599, rate: 2 }, { min: 4599, max: null, rate: 3.9 }],
      standardDeduction: 2340, personalExemption: 29,
    },
    hasLocalTax: false,
    notes: 'Arkansas reduced its top income tax rate to 3.9% in 2026, down from 5.9% in 2021. The state simplified to two brackets: 2% on the first $4,599 and 3.9% on income above that.',
    mapCol: 4, mapRow: 4,
  },
  {
    name: 'California', abbr: 'CA', slug: 'california', noTax: false, topRate: 13.3,
    single: {
      brackets: [
        { min: 0, max: 10756, rate: 1 }, { min: 10756, max: 25499, rate: 2 },
        { min: 25499, max: 40245, rate: 4 }, { min: 40245, max: 55866, rate: 6 },
        { min: 55866, max: 70606, rate: 8 }, { min: 70606, max: 360659, rate: 9.3 },
        { min: 360659, max: 432787, rate: 10.3 }, { min: 432787, max: 721314, rate: 11.3 },
        { min: 721314, max: 1000000, rate: 12.3 }, { min: 1000000, max: null, rate: 13.3 },
      ],
      standardDeduction: 5202,
    },
    mfj: {
      brackets: [
        { min: 0, max: 21512, rate: 1 }, { min: 21512, max: 50998, rate: 2 },
        { min: 50998, max: 80490, rate: 4 }, { min: 80490, max: 111732, rate: 6 },
        { min: 111732, max: 141212, rate: 8 }, { min: 141212, max: 721318, rate: 9.3 },
        { min: 721318, max: 865574, rate: 10.3 }, { min: 865574, max: 1442628, rate: 11.3 },
        { min: 1442628, max: 1000000000, rate: 12.3 }, { min: 1000000000, max: null, rate: 13.3 },
      ],
      standardDeduction: 10404,
    },
    hoh: {
      brackets: [
        { min: 0, max: 21527, rate: 1 }, { min: 21527, max: 51025, rate: 2 },
        { min: 51025, max: 65744, rate: 4 }, { min: 65744, max: 81364, rate: 6 },
        { min: 81364, max: 95105, rate: 8 }, { min: 95105, max: 491314, rate: 9.3 },
        { min: 491314, max: 590746, rate: 10.3 }, { min: 590746, max: 1000000, rate: 11.3 },
        { min: 1000000, max: null, rate: 13.3 },
      ],
      standardDeduction: 10404,
    },
    mfs: {
      brackets: [
        { min: 0, max: 10756, rate: 1 }, { min: 10756, max: 25499, rate: 2 },
        { min: 25499, max: 40245, rate: 4 }, { min: 40245, max: 55866, rate: 6 },
        { min: 55866, max: 70606, rate: 8 }, { min: 70606, max: 360659, rate: 9.3 },
        { min: 360659, max: 432787, rate: 10.3 }, { min: 432787, max: 721314, rate: 11.3 },
        { min: 721314, max: null, rate: 12.3 },
      ],
      standardDeduction: 5202,
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
        { min: 0, max: 2400, rate: 1.4 }, { min: 2400, max: 4800, rate: 3.2 },
        { min: 4800, max: 9600, rate: 5.5 }, { min: 9600, max: 14400, rate: 6.4 },
        { min: 14400, max: 19200, rate: 6.8 }, { min: 19200, max: 24000, rate: 7.2 },
        { min: 24000, max: 36000, rate: 7.6 }, { min: 36000, max: 48000, rate: 7.9 },
        { min: 48000, max: 150000, rate: 8.25 }, { min: 150000, max: 175000, rate: 9 },
        { min: 175000, max: 200000, rate: 10 }, { min: 200000, max: null, rate: 11 },
      ],
      standardDeduction: 2200, personalExemption: 1144,
    },
    mfj: {
      brackets: [
        { min: 0, max: 4800, rate: 1.4 }, { min: 4800, max: 9600, rate: 3.2 },
        { min: 9600, max: 19200, rate: 5.5 }, { min: 19200, max: 28800, rate: 6.4 },
        { min: 28800, max: 38400, rate: 6.8 }, { min: 38400, max: 48000, rate: 7.2 },
        { min: 48000, max: 72000, rate: 7.6 }, { min: 72000, max: 96000, rate: 7.9 },
        { min: 96000, max: 300000, rate: 8.25 }, { min: 300000, max: 350000, rate: 9 },
        { min: 350000, max: 400000, rate: 10 }, { min: 400000, max: null, rate: 11 },
      ],
      standardDeduction: 4400, personalExemption: 2288,
    },
    hoh: {
      brackets: [
        { min: 0, max: 3600, rate: 1.4 }, { min: 3600, max: 7200, rate: 3.2 },
        { min: 7200, max: 14400, rate: 5.5 }, { min: 14400, max: 21600, rate: 6.4 },
        { min: 21600, max: 28800, rate: 6.8 }, { min: 28800, max: 36000, rate: 7.2 },
        { min: 36000, max: 54000, rate: 7.6 }, { min: 54000, max: 72000, rate: 7.9 },
        { min: 72000, max: 225000, rate: 8.25 }, { min: 225000, max: 262500, rate: 9 },
        { min: 262500, max: 300000, rate: 10 }, { min: 300000, max: null, rate: 11 },
      ],
      standardDeduction: 3212, personalExemption: 1144,
    },
    mfs: {
      brackets: [
        { min: 0, max: 2400, rate: 1.4 }, { min: 2400, max: 4800, rate: 3.2 },
        { min: 4800, max: 9600, rate: 5.5 }, { min: 9600, max: 14400, rate: 6.4 },
        { min: 14400, max: 19200, rate: 6.8 }, { min: 19200, max: 24000, rate: 7.2 },
        { min: 24000, max: 36000, rate: 7.6 }, { min: 36000, max: 48000, rate: 7.9 },
        { min: 48000, max: 150000, rate: 8.25 }, { min: 150000, max: 175000, rate: 9 },
        { min: 175000, max: 200000, rate: 10 }, { min: 200000, max: null, rate: 11 },
      ],
      standardDeduction: 2200, personalExemption: 1144,
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
    ...flat(4.95, { single: 0, mfj: 0, hoh: 0, mfs: 0 }, { single: 2425, mfj: 4850, hoh: 2425, mfs: 2425 }),
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
    name: 'Iowa', abbr: 'IA', slug: 'iowa', noTax: false, topRate: 3.9,
    ...flat(3.9, FEDERAL_STD),
    hasLocalTax: false,
    notes: 'Iowa transitioned to a flat 3.9% income tax rate in 2025, down from a complex 9-bracket system with rates up to 8.53%. The dramatic simplification and rate cut were triggered by Iowa exceeding revenue targets.',
    mapCol: 4, mapRow: 2,
  },
  {
    name: 'Kansas', abbr: 'KS', slug: 'kansas', noTax: false, topRate: 5.58,
    single: {
      brackets: [{ min: 0, max: 23000, rate: 5.2 }, { min: 23000, max: null, rate: 5.58 }],
      standardDeduction: 3500, personalExemption: 2250,
    },
    mfj: {
      brackets: [{ min: 0, max: 46000, rate: 5.2 }, { min: 46000, max: null, rate: 5.58 }],
      standardDeduction: 8000, personalExemption: 4500,
    },
    hoh: {
      brackets: [{ min: 0, max: 34500, rate: 5.2 }, { min: 34500, max: null, rate: 5.58 }],
      standardDeduction: 6000, personalExemption: 2250,
    },
    mfs: {
      brackets: [{ min: 0, max: 23000, rate: 5.2 }, { min: 23000, max: null, rate: 5.58 }],
      standardDeduction: 3500, personalExemption: 2250,
    },
    hasLocalTax: false,
    notes: 'Kansas restructured its income tax to two brackets for 2026: 5.2% on the first $23,000 (single) and 5.58% above that. Social Security income is exempt for all filers regardless of income.',
    mapCol: 3, mapRow: 4,
  },
  {
    name: 'Kentucky', abbr: 'KY', slug: 'kentucky', noTax: false, topRate: 3.5,
    ...flat(3.5, { single: 3160, mfj: 6320, hoh: 3160, mfs: 3160 }),
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
    ...flat(3.0, { single: 12500, mfj: 25000, hoh: 12500, mfs: 12500 }),
    hasLocalTax: false,
    notes: "Louisiana enacted a flat 3% income tax rate effective January 1, 2025 - a dramatic simplification from the previous graduated structure. The reform was paired with a $12,500 income exemption for single filers and elimination of several deductions.",
    mapCol: 4, mapRow: 5,
  },
  {
    name: 'Maine', abbr: 'ME', slug: 'maine', noTax: false, topRate: 7.15,
    single: {
      brackets: [{ min: 0, max: 24500, rate: 5.8 }, { min: 24500, max: 58050, rate: 6.75 }, { min: 58050, max: null, rate: 7.15 }],
      standardDeduction: 15000,
    },
    mfj: {
      brackets: [{ min: 0, max: 49050, rate: 5.8 }, { min: 49050, max: 116100, rate: 6.75 }, { min: 116100, max: null, rate: 7.15 }],
      standardDeduction: 30000,
    },
    hoh: {
      brackets: [{ min: 0, max: 36750, rate: 5.8 }, { min: 36750, max: 87075, rate: 6.75 }, { min: 87075, max: null, rate: 7.15 }],
      standardDeduction: 22500,
    },
    mfs: {
      brackets: [{ min: 0, max: 24500, rate: 5.8 }, { min: 24500, max: 58050, rate: 6.75 }, { min: 58050, max: null, rate: 7.15 }],
      standardDeduction: 15000,
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
      standardDeduction: 2500, personalExemption: 3200,
    },
    mfj: {
      brackets: [
        { min: 0, max: 1000, rate: 2 }, { min: 1000, max: 2000, rate: 3 },
        { min: 2000, max: 3000, rate: 4 }, { min: 3000, max: 150000, rate: 4.75 },
        { min: 150000, max: 175000, rate: 5 }, { min: 175000, max: 225000, rate: 5.25 },
        { min: 225000, max: 300000, rate: 5.5 }, { min: 300000, max: null, rate: 5.75 },
      ],
      standardDeduction: 5000, personalExemption: 6400,
    },
    hoh: {
      brackets: [
        { min: 0, max: 1000, rate: 2 }, { min: 1000, max: 2000, rate: 3 },
        { min: 2000, max: 3000, rate: 4 }, { min: 3000, max: 150000, rate: 4.75 },
        { min: 150000, max: 175000, rate: 5 }, { min: 175000, max: 225000, rate: 5.25 },
        { min: 225000, max: 300000, rate: 5.5 }, { min: 300000, max: null, rate: 5.75 },
      ],
      standardDeduction: 2500, personalExemption: 3200,
    },
    mfs: {
      brackets: [
        { min: 0, max: 1000, rate: 2 }, { min: 1000, max: 2000, rate: 3 },
        { min: 2000, max: 3000, rate: 4 }, { min: 3000, max: 100000, rate: 4.75 },
        { min: 100000, max: 125000, rate: 5 }, { min: 125000, max: 150000, rate: 5.25 },
        { min: 150000, max: 250000, rate: 5.5 }, { min: 250000, max: null, rate: 5.75 },
      ],
      standardDeduction: 2500, personalExemption: 3200,
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
    ...flat(4.25, { single: 0, mfj: 0, hoh: 0, mfs: 0 }, { single: 5400, mfj: 10800, hoh: 5400, mfs: 5400 }),
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
      brackets: [{ min: 0, max: 30070, rate: 5.35 }, { min: 30070, max: 98760, rate: 6.8 }, { min: 98760, max: 183340, rate: 7.85 }, { min: 183340, max: null, rate: 9.85 }],
      standardDeduction: 15000,
    },
    mfj: {
      brackets: [{ min: 0, max: 43950, rate: 5.35 }, { min: 43950, max: 174610, rate: 6.8 }, { min: 174610, max: 304970, rate: 7.85 }, { min: 304970, max: null, rate: 9.85 }],
      standardDeduction: 30000,
    },
    hoh: {
      brackets: [{ min: 0, max: 37010, rate: 5.35 }, { min: 37010, max: 148730, rate: 6.8 }, { min: 148730, max: 244040, rate: 7.85 }, { min: 244040, max: null, rate: 9.85 }],
      standardDeduction: 22500,
    },
    mfs: {
      brackets: [{ min: 0, max: 21975, rate: 5.35 }, { min: 21975, max: 87305, rate: 6.8 }, { min: 87305, max: 152485, rate: 7.85 }, { min: 152485, max: null, rate: 9.85 }],
      standardDeduction: 15000,
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
        { min: 0, max: 1207, rate: 1.5 }, { min: 1207, max: 2414, rate: 2.0 },
        { min: 2414, max: 3621, rate: 2.5 }, { min: 3621, max: 4828, rate: 3.0 },
        { min: 4828, max: 6035, rate: 3.5 }, { min: 6035, max: 7242, rate: 4.0 },
        { min: 7242, max: 8449, rate: 4.5 }, { min: 8449, max: null, rate: 4.7 },
      ],
      standardDeduction: 15000,
    },
    mfj: {
      brackets: [
        { min: 0, max: 1207, rate: 1.5 }, { min: 1207, max: 2414, rate: 2.0 },
        { min: 2414, max: 3621, rate: 2.5 }, { min: 3621, max: 4828, rate: 3.0 },
        { min: 4828, max: 6035, rate: 3.5 }, { min: 6035, max: 7242, rate: 4.0 },
        { min: 7242, max: 8449, rate: 4.5 }, { min: 8449, max: null, rate: 4.7 },
      ],
      standardDeduction: 30000,
    },
    hoh: {
      brackets: [
        { min: 0, max: 1207, rate: 1.5 }, { min: 1207, max: 2414, rate: 2.0 },
        { min: 2414, max: 3621, rate: 2.5 }, { min: 3621, max: 4828, rate: 3.0 },
        { min: 4828, max: 6035, rate: 3.5 }, { min: 6035, max: 7242, rate: 4.0 },
        { min: 7242, max: 8449, rate: 4.5 }, { min: 8449, max: null, rate: 4.7 },
      ],
      standardDeduction: 22500,
    },
    mfs: {
      brackets: [
        { min: 0, max: 1207, rate: 1.5 }, { min: 1207, max: 2414, rate: 2.0 },
        { min: 2414, max: 3621, rate: 2.5 }, { min: 3621, max: 4828, rate: 3.0 },
        { min: 4828, max: 6035, rate: 3.5 }, { min: 6035, max: 7242, rate: 4.0 },
        { min: 7242, max: 8449, rate: 4.5 }, { min: 8449, max: null, rate: 4.7 },
      ],
      standardDeduction: 15000,
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
    name: 'Montana', abbr: 'MT', slug: 'montana', noTax: false, topRate: 5.9,
    single: {
      brackets: [{ min: 0, max: 20500, rate: 4.7 }, { min: 20500, max: null, rate: 5.9 }],
      standardDeduction: 15000,
    },
    mfj: {
      brackets: [{ min: 0, max: 41000, rate: 4.7 }, { min: 41000, max: null, rate: 5.9 }],
      standardDeduction: 30000,
    },
    hoh: {
      brackets: [{ min: 0, max: 30750, rate: 4.7 }, { min: 30750, max: null, rate: 5.9 }],
      standardDeduction: 22500,
    },
    mfs: {
      brackets: [{ min: 0, max: 20500, rate: 4.7 }, { min: 20500, max: null, rate: 5.9 }],
      standardDeduction: 15000,
    },
    hasLocalTax: false,
    notes: 'Montana simplified its income tax to two brackets - 4.7% and 5.9% - effective 2024. The previous 7-bracket system had rates from 1% to 6.9%. Montana has no sales tax, so income tax is a primary revenue source.',
    mapCol: 2, mapRow: 1,
  },
  {
    name: 'Nebraska', abbr: 'NE', slug: 'nebraska', noTax: false, topRate: 5.2,
    single: {
      brackets: [{ min: 0, max: 3700, rate: 2.46 }, { min: 3700, max: 22170, rate: 3.51 }, { min: 22170, max: 35730, rate: 5.01 }, { min: 35730, max: null, rate: 5.2 }],
      standardDeduction: 15000,
    },
    mfj: {
      brackets: [{ min: 0, max: 7390, rate: 2.46 }, { min: 7390, max: 44350, rate: 3.51 }, { min: 44350, max: 71470, rate: 5.01 }, { min: 71470, max: null, rate: 5.2 }],
      standardDeduction: 30000,
    },
    hoh: {
      brackets: [{ min: 0, max: 5550, rate: 2.46 }, { min: 5550, max: 33260, rate: 3.51 }, { min: 33260, max: 53600, rate: 5.01 }, { min: 53600, max: null, rate: 5.2 }],
      standardDeduction: 22500,
    },
    mfs: {
      brackets: [{ min: 0, max: 3700, rate: 2.46 }, { min: 3700, max: 22170, rate: 3.51 }, { min: 22170, max: 35730, rate: 5.01 }, { min: 35730, max: null, rate: 5.2 }],
      standardDeduction: 15000,
    },
    hasLocalTax: false,
    notes: 'Nebraska is on a legislated path to reduce its top income tax rate to 3.99% by 2027. The top rate was 6.84% before LB 873 (2022) began the phase-down.',
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
        { min: 50000, max: 70000, rate: 3.5 }, { min: 70000, max: 80000, rate: 5.525 },
        { min: 80000, max: 500000, rate: 6.37 }, { min: 500000, max: 1000000, rate: 8.97 },
        { min: 1000000, max: null, rate: 10.75 },
      ],
      standardDeduction: 0, personalExemption: 2000,
    },
    hoh: {
      brackets: [
        { min: 0, max: 20000, rate: 1.4 }, { min: 20000, max: 50000, rate: 1.75 },
        { min: 50000, max: 70000, rate: 3.5 }, { min: 70000, max: 80000, rate: 5.525 },
        { min: 80000, max: 500000, rate: 6.37 }, { min: 500000, max: 1000000, rate: 8.97 },
        { min: 1000000, max: null, rate: 10.75 },
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
        { min: 0, max: 5500, rate: 1.7 }, { min: 5500, max: 11000, rate: 3.2 },
        { min: 11000, max: 16000, rate: 4.7 }, { min: 16000, max: 210000, rate: 4.9 },
        { min: 210000, max: null, rate: 5.9 },
      ],
      standardDeduction: 15000,
    },
    mfj: {
      brackets: [
        { min: 0, max: 8000, rate: 1.7 }, { min: 8000, max: 16000, rate: 3.2 },
        { min: 16000, max: 24000, rate: 4.7 }, { min: 24000, max: 315000, rate: 4.9 },
        { min: 315000, max: null, rate: 5.9 },
      ],
      standardDeduction: 30000,
    },
    hoh: {
      brackets: [
        { min: 0, max: 8000, rate: 1.7 }, { min: 8000, max: 16000, rate: 3.2 },
        { min: 16000, max: 24000, rate: 4.7 }, { min: 24000, max: 315000, rate: 4.9 },
        { min: 315000, max: null, rate: 5.9 },
      ],
      standardDeduction: 22500,
    },
    mfs: {
      brackets: [
        { min: 0, max: 5500, rate: 1.7 }, { min: 5500, max: 11000, rate: 3.2 },
        { min: 11000, max: 16000, rate: 4.7 }, { min: 16000, max: 210000, rate: 4.9 },
        { min: 210000, max: null, rate: 5.9 },
      ],
      standardDeduction: 15000,
    },
    hasLocalTax: false,
    notes: 'New Mexico added a top bracket of 5.9% on income over $210,000 (single) in 2021. The state provides a low-income comprehensive tax rebate and military retirement income is fully exempt.',
    mapCol: 2, mapRow: 4,
  },
  {
    name: 'New York', abbr: 'NY', slug: 'new-york', noTax: false, topRate: 10.9,
    single: {
      brackets: [
        { min: 0, max: 17150, rate: 4 }, { min: 17150, max: 23600, rate: 4.5 },
        { min: 23600, max: 27900, rate: 5.25 }, { min: 27900, max: 161550, rate: 5.85 },
        { min: 161550, max: 323200, rate: 6.25 }, { min: 323200, max: 2155350, rate: 6.85 },
        { min: 2155350, max: 5000000, rate: 9.65 }, { min: 5000000, max: 25000000, rate: 10.3 },
        { min: 25000000, max: null, rate: 10.9 },
      ],
      standardDeduction: 8000,
    },
    mfj: {
      brackets: [
        { min: 0, max: 27900, rate: 4 }, { min: 27900, max: 43000, rate: 4.5 },
        { min: 43000, max: 161550, rate: 5.25 }, { min: 161550, max: 323200, rate: 5.85 },
        { min: 323200, max: 2155350, rate: 6.25 }, { min: 2155350, max: 5000000, rate: 6.85 },
        { min: 5000000, max: 25000000, rate: 9.65 }, { min: 25000000, max: null, rate: 10.9 },
      ],
      standardDeduction: 16050,
    },
    hoh: {
      brackets: [
        { min: 0, max: 17650, rate: 4 }, { min: 17650, max: 23600, rate: 4.5 },
        { min: 23600, max: 27900, rate: 5.25 }, { min: 27900, max: 161550, rate: 5.85 },
        { min: 161550, max: 323200, rate: 6.25 }, { min: 323200, max: 2155350, rate: 6.85 },
        { min: 2155350, max: 5000000, rate: 9.65 }, { min: 5000000, max: 25000000, rate: 10.3 },
        { min: 25000000, max: null, rate: 10.9 },
      ],
      standardDeduction: 11200,
    },
    mfs: {
      brackets: [
        { min: 0, max: 17150, rate: 4 }, { min: 17150, max: 23600, rate: 4.5 },
        { min: 23600, max: 27900, rate: 5.25 }, { min: 27900, max: 161550, rate: 5.85 },
        { min: 161550, max: 323200, rate: 6.25 }, { min: 323200, max: 2155350, rate: 6.85 },
        { min: 2155350, max: 5000000, rate: 9.65 }, { min: 5000000, max: 25000000, rate: 10.3 },
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
      standardDeduction: 15000,
    },
    mfj: {
      brackets: [{ min: 0, max: 80975, rate: 0 }, { min: 80975, max: 298075, rate: 1.95 }, { min: 298075, max: null, rate: 2.5 }],
      standardDeduction: 30000,
    },
    hoh: {
      brackets: [{ min: 0, max: 64700, rate: 0 }, { min: 64700, max: 238150, rate: 1.95 }, { min: 238150, max: null, rate: 2.5 }],
      standardDeduction: 22500,
    },
    mfs: {
      brackets: [{ min: 0, max: 48475, rate: 0 }, { min: 48475, max: 244825, rate: 1.95 }, { min: 244825, max: null, rate: 2.5 }],
      standardDeduction: 15000,
    },
    hasLocalTax: false,
    notes: 'North Dakota restructured its income tax for 2026: income below $48,475 (single) is taxed at 0%, income from $48,475 to $244,824 at 1.95%, and income above $244,825 at 2.5%. The reform effectively eliminates taxes for lower and middle-income earners.',
    mapCol: 3, mapRow: 1,
  },
  {
    name: 'Ohio', abbr: 'OH', slug: 'ohio', noTax: false, topRate: 3.5,
    single: {
      brackets: [{ min: 0, max: 26050, rate: 0 }, { min: 26050, max: 100000, rate: 2.75 }, { min: 100000, max: null, rate: 3.5 }],
      standardDeduction: 0, personalExemption: 2400,
    },
    mfj: {
      brackets: [{ min: 0, max: 26050, rate: 0 }, { min: 26050, max: 100000, rate: 2.75 }, { min: 100000, max: null, rate: 3.5 }],
      standardDeduction: 0, personalExemption: 4800,
    },
    hoh: {
      brackets: [{ min: 0, max: 26050, rate: 0 }, { min: 26050, max: 100000, rate: 2.75 }, { min: 100000, max: null, rate: 3.5 }],
      standardDeduction: 0, personalExemption: 2400,
    },
    mfs: {
      brackets: [{ min: 0, max: 26050, rate: 0 }, { min: 26050, max: 100000, rate: 2.75 }, { min: 100000, max: null, rate: 3.5 }],
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
    notes: 'Ohio exempts the first $26,050 of income from tax. The 3-bracket system was simplified from a previous 9-bracket structure. Most Ohio residents also pay a city income tax of 1.5-3%, which can exceed the state tax for many filers.',
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
      brackets: [{ min: 0, max: 18400, rate: 4.75 }, { min: 18400, max: 46200, rate: 6.75 }, { min: 46200, max: 250000, rate: 8.75 }, { min: 250000, max: null, rate: 9.9 }],
      standardDeduction: 2420,
    },
    mfj: {
      brackets: [{ min: 0, max: 36800, rate: 4.75 }, { min: 36800, max: 92400, rate: 6.75 }, { min: 92400, max: 400000, rate: 8.75 }, { min: 400000, max: null, rate: 9.9 }],
      standardDeduction: 4840,
    },
    hoh: {
      brackets: [{ min: 0, max: 27600, rate: 4.75 }, { min: 27600, max: 69300, rate: 6.75 }, { min: 69300, max: 250000, rate: 8.75 }, { min: 250000, max: null, rate: 9.9 }],
      standardDeduction: 3630,
    },
    mfs: {
      brackets: [{ min: 0, max: 18400, rate: 4.75 }, { min: 18400, max: 46200, rate: 6.75 }, { min: 46200, max: 250000, rate: 8.75 }, { min: 250000, max: null, rate: 9.9 }],
      standardDeduction: 2420,
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
      brackets: [{ min: 0, max: 73450, rate: 3.75 }, { min: 73450, max: 166950, rate: 4.75 }, { min: 166950, max: null, rate: 5.99 }],
      standardDeduction: 10550, personalExemption: 4550,
    },
    mfj: {
      brackets: [{ min: 0, max: 146950, rate: 3.75 }, { min: 146950, max: 333750, rate: 4.75 }, { min: 333750, max: null, rate: 5.99 }],
      standardDeduction: 21100, personalExemption: 9100,
    },
    hoh: {
      brackets: [{ min: 0, max: 110200, rate: 3.75 }, { min: 110200, max: 250360, rate: 4.75 }, { min: 250360, max: null, rate: 5.99 }],
      standardDeduction: 15825, personalExemption: 4550,
    },
    mfs: {
      brackets: [{ min: 0, max: 73450, rate: 3.75 }, { min: 73450, max: 166950, rate: 4.75 }, { min: 166950, max: null, rate: 5.99 }],
      standardDeduction: 10550, personalExemption: 4550,
    },
    hasLocalTax: false,
    notes: 'Rhode Island has a 3-bracket income tax structure. The state conforms to federal definitions of income but has its own standard deduction amounts that differ from federal levels.',
    mapCol: 10, mapRow: 3,
  },
  {
    name: 'South Carolina', abbr: 'SC', slug: 'south-carolina', noTax: false, topRate: 6.0,
    single: {
      brackets: [{ min: 0, max: 3640, rate: 0 }, { min: 3640, max: 18230, rate: 3 }, { min: 18230, max: null, rate: 6.0 }],
      standardDeduction: 15000,
    },
    mfj: {
      brackets: [{ min: 0, max: 7280, rate: 0 }, { min: 7280, max: 36460, rate: 3 }, { min: 36460, max: null, rate: 6.0 }],
      standardDeduction: 30000,
    },
    hoh: {
      brackets: [{ min: 0, max: 5460, rate: 0 }, { min: 5460, max: 27345, rate: 3 }, { min: 27345, max: null, rate: 6.0 }],
      standardDeduction: 22500,
    },
    mfs: {
      brackets: [{ min: 0, max: 3640, rate: 0 }, { min: 3640, max: 18230, rate: 3 }, { min: 18230, max: null, rate: 6.0 }],
      standardDeduction: 15000,
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
    ...flat(4.5, FEDERAL_STD, { single: 1803, mfj: 3607, hoh: 1803, mfs: 1803 }),
    hasLocalTax: false,
    notes: 'Utah has a flat 4.5% income tax for 2026, reduced from 4.65%. The state provides a personal exemption credit and conforms to federal standard deduction amounts.',
    mapCol: 1, mapRow: 3,
  },
  {
    name: 'Vermont', abbr: 'VT', slug: 'vermont', noTax: false, topRate: 8.75,
    single: {
      brackets: [{ min: 0, max: 45400, rate: 3.35 }, { min: 45400, max: 110050, rate: 6.6 }, { min: 110050, max: 229550, rate: 7.6 }, { min: 229550, max: null, rate: 8.75 }],
      standardDeduction: 15000,
    },
    mfj: {
      brackets: [{ min: 0, max: 75850, rate: 3.35 }, { min: 75850, max: 183400, rate: 6.6 }, { min: 183400, max: 279450, rate: 7.6 }, { min: 279450, max: null, rate: 8.75 }],
      standardDeduction: 30000,
    },
    hoh: {
      brackets: [{ min: 0, max: 60625, rate: 3.35 }, { min: 60625, max: 146725, rate: 6.6 }, { min: 146725, max: 254500, rate: 7.6 }, { min: 254500, max: null, rate: 8.75 }],
      standardDeduction: 22500,
    },
    mfs: {
      brackets: [{ min: 0, max: 37925, rate: 3.35 }, { min: 37925, max: 91700, rate: 6.6 }, { min: 91700, max: 139725, rate: 7.6 }, { min: 139725, max: null, rate: 8.75 }],
      standardDeduction: 15000,
    },
    hasLocalTax: false,
    notes: 'Vermont has a progressive income tax with a top rate of 8.75%. The state conforms to federal standard deduction amounts. Social Security income for lower-income filers is exempt.',
    mapCol: 10, mapRow: 1,
  },
  {
    name: 'Virginia', abbr: 'VA', slug: 'virginia', noTax: false, topRate: 5.75,
    single: {
      brackets: [{ min: 0, max: 3000, rate: 2 }, { min: 3000, max: 5000, rate: 3 }, { min: 5000, max: 17000, rate: 5 }, { min: 17000, max: null, rate: 5.75 }],
      standardDeduction: 8000, personalExemption: 930,
    },
    mfj: {
      brackets: [{ min: 0, max: 3000, rate: 2 }, { min: 3000, max: 5000, rate: 3 }, { min: 5000, max: 17000, rate: 5 }, { min: 17000, max: null, rate: 5.75 }],
      standardDeduction: 16000, personalExemption: 1860,
    },
    hoh: {
      brackets: [{ min: 0, max: 3000, rate: 2 }, { min: 3000, max: 5000, rate: 3 }, { min: 5000, max: 17000, rate: 5 }, { min: 17000, max: null, rate: 5.75 }],
      standardDeduction: 8000, personalExemption: 930,
    },
    mfs: {
      brackets: [{ min: 0, max: 3000, rate: 2 }, { min: 3000, max: 5000, rate: 3 }, { min: 5000, max: 17000, rate: 5 }, { min: 17000, max: null, rate: 5.75 }],
      standardDeduction: 8000, personalExemption: 930,
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
      standardDeduction: 11050,
    },
    mfj: {
      brackets: [{ min: 0, max: 20150, rate: 3.5 }, { min: 20150, max: 69260, rate: 4.4 }, { min: 69260, max: 443630, rate: 5.3 }, { min: 443630, max: null, rate: 7.65 }],
      standardDeduction: 20470,
    },
    hoh: {
      brackets: [{ min: 0, max: 17630, rate: 3.5 }, { min: 17630, max: 60605, rate: 4.4 }, { min: 60605, max: 388175, rate: 5.3 }, { min: 388175, max: null, rate: 7.65 }],
      standardDeduction: 15600,
    },
    mfs: {
      brackets: [{ min: 0, max: 10075, rate: 3.5 }, { min: 10075, max: 34630, rate: 4.4 }, { min: 34630, max: 221815, rate: 5.3 }, { min: 221815, max: null, rate: 7.65 }],
      standardDeduction: 10235,
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
  single: 15000, mfj: 30000, hoh: 22500, mfs: 15000,
};

export const FICA_2025 = {
  socialSecurityRate: 6.2,
  socialSecurityWageBase: 176100,
  medicareRate: 1.45,
  additionalMedicareRate: 0.9,
  additionalMedicareThreshold: { single: 200000, mfj: 250000, hoh: 200000, mfs: 125000 },
};
