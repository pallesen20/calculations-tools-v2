export interface GermanZones {
  gf: number;
  z2t: number;
  z3t: number;
  z4t: number;
  a2: number;
  b2: number;
  a3: number;
  b3: number;
}

export interface EUTaxClassOption {
  value: string;
  label: string;
  description: string;
}

export interface EUStateOption {
  value: string;
  label: string;
  ks?: number;
  pfSn?: boolean;
}

export interface EUHealthOption {
  value: string;
  label: string;
}

export interface EUCountryTax {
  name: string;
  slug: string;
  abbr: string;
  currency: string;
  currencySymbol: string;
  locale: string;
  topRate: number;
  exampleIncome: number;
  notes: string;

  formula: 'german' | 'brackets';
  germanZones?: GermanZones;

  werbungskosten: number;

  hasSoli: boolean;
  soliThreshSingle?: number;
  soliThreshMarried?: number;

  hasChurchTax: boolean;

  hasTaxClass: boolean;
  taxClasses?: EUTaxClassOption[];
  taxClass2Deduction?: number;

  hasStateSelection: boolean;
  states?: EUStateOption[];

  hasHealthSelection: boolean;
  healthOptions?: EUHealthOption[];

  flag: string;

  hasChildlessField: boolean;

  rvRate: number;
  rvCeiling: number;
  kvPublicRate: number;
  kvCeiling: number;
  pvRateWith: number;
  pvRateChildless: number;
  pvRateSnWith?: number;
  pvRateSnChildless?: number;
  avRate: number;
  avCeiling: number;
}

export const GERMANY: EUCountryTax = {
  name: 'Germany',
  slug: 'germany',
  abbr: 'DE',
  flag: '🇩🇪',
  currency: 'EUR',
  currencySymbol: '\u20ac',
  locale: 'de-DE',
  topRate: 45,
  exampleIncome: 60000,
  notes: 'Germany uses the \u00a732a EStG progressive formula - marginal rates rise continuously from 14% to 42%, with a 45% Reichensteuer above \u20ac277,825.',

  formula: 'german',
  germanZones: {
    gf: 12348,
    z2t: 17799,
    z3t: 69878,
    z4t: 277825,
    a2: 917.26,
    b2: 1400,
    a3: 172.82,
    b3: 2400,
  },

  werbungskosten: 1230,

  hasSoli: true,
  soliThreshSingle: 20350,
  soliThreshMarried: 40700,

  hasChurchTax: true,

  hasTaxClass: true,
  taxClasses: [
    { value: '1', label: 'Class I', description: 'Single, divorced, widowed, or separated' },
    { value: '2', label: 'Class II', description: 'Single parent eligible for lone-parent allowance (\u20ac4,260)' },
    { value: '3', label: 'Class III', description: 'Higher-earning married spouse - splitting method applied' },
    { value: '4', label: 'Class IV', description: 'Married couples with similar income - same rates as Class I' },
    { value: '5', label: 'Class V', description: 'Lower-earning married spouse (paired with Class III) - no personal allowance' },
    { value: '6', label: 'Class VI', description: 'Second/additional employment - no allowances, highest withholding' },
  ],
  taxClass2Deduction: 4260,

  hasStateSelection: true,
  states: [
    { value: 'BW', label: 'Baden-Wurttemberg', ks: 0.08 },
    { value: 'BY', label: 'Bayern (Bavaria)', ks: 0.08 },
    { value: 'BE', label: 'Berlin', ks: 0.09 },
    { value: 'BB', label: 'Brandenburg', ks: 0.09 },
    { value: 'HB', label: 'Bremen', ks: 0.09 },
    { value: 'HH', label: 'Hamburg', ks: 0.09 },
    { value: 'HE', label: 'Hessen', ks: 0.09 },
    { value: 'MV', label: 'Mecklenburg-Vorpommern', ks: 0.09 },
    { value: 'NI', label: 'Niedersachsen', ks: 0.09 },
    { value: 'NW', label: 'Nordrhein-Westfalen', ks: 0.09 },
    { value: 'RP', label: 'Rheinland-Pfalz', ks: 0.09 },
    { value: 'SL', label: 'Saarland', ks: 0.09 },
    { value: 'SN', label: 'Sachsen (Saxony)', ks: 0.09, pfSn: true },
    { value: 'ST', label: 'Sachsen-Anhalt', ks: 0.09 },
    { value: 'SH', label: 'Schleswig-Holstein', ks: 0.09 },
    { value: 'TH', label: 'Thuringen', ks: 0.09 },
  ],

  hasHealthSelection: true,
  healthOptions: [
    { value: 'public', label: 'Public (gesetzlich versichert)' },
    { value: 'private-employer', label: 'Private (with employer contribution)' },
    { value: 'private-self', label: 'Private (self-pay, no employer contribution)' },
  ],

  hasChildlessField: true,

  rvRate: 0.093,
  rvCeiling: 101400,
  kvPublicRate: 0.0875,
  kvCeiling: 69750,
  pvRateWith: 0.018,
  pvRateChildless: 0.024,
  pvRateSnWith: 0.023,
  pvRateSnChildless: 0.029,
  avRate: 0.013,
  avCeiling: 101400,
};

export const EU_INCOME_TAX: EUCountryTax[] = [GERMANY];

export const EU_INCOME_TAX_MAP: Record<string, EUCountryTax> = Object.fromEntries(
  EU_INCOME_TAX.map(c => [c.slug, c])
);
