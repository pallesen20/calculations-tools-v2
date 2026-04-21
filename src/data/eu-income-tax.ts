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

export interface NLBrackets {
  b1Top: number;
  b1Rate: number;
  b2Top: number;
  b2Rate: number;
  b3Rate: number;
  b1RateAow: number;
}

export interface NLHeffingskorting {
  max: number;
  phaseFrom: number;
  phaseRate: number;
  phaseTo: number;
  maxAow: number;
  phaseRateAow: number;
}

export interface NLArbeidskorting {
  s1Top: number;
  s1Rate: number;
  s2Top: number;
  s2Base: number;
  s2Rate: number;
  s3Top: number;
  s3Base: number;
  s3Rate: number;
  s4Top: number;
  s4Base: number;
  s4Rate: number;
  s1RateAow: number;
  s2BaseAow: number;
  s2RateAow: number;
  s3BaseAow: number;
  s3RateAow: number;
  s4BaseAow: number;
  s4RateAow: number;
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
  hasAowToggle: boolean;

  nlBrackets?: NLBrackets;
  nlHeffingskorting?: NLHeffingskorting;
  nlArbeidskorting?: NLArbeidskorting;

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
  currencySymbol: '€',
  locale: 'de-DE',
  topRate: 45,
  exampleIncome: 60000,
  notes: 'Germany uses the §32a EStG progressive formula - marginal rates rise continuously from 14% to 42%, with a 45% Reichensteuer above €277,825.',

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
    { value: '2', label: 'Class II', description: 'Single parent eligible for lone-parent allowance (€4,260)' },
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
  hasAowToggle: false,

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

export const NETHERLANDS: EUCountryTax = {
  name: 'Netherlands',
  slug: 'netherlands',
  abbr: 'NL',
  flag: '🇳🇱',
  currency: 'EUR',
  currencySymbol: '€',
  locale: 'nl-NL',
  topRate: 49.5,
  exampleIncome: 60000,
  notes: 'Netherlands uses Box 1 income tax with volksverzekeringen (social insurance) embedded in the first bracket rate. Tax credits (heffingskortingen) directly reduce the final tax owed.',

  formula: 'brackets',

  werbungskosten: 0,

  hasSoli: false,
  hasChurchTax: false,
  hasTaxClass: false,
  hasStateSelection: false,
  hasHealthSelection: false,
  hasChildlessField: false,
  hasAowToggle: true,

  nlBrackets: {
    b1Top: 38883,
    b1Rate: 0.3575,
    b2Top: 78426,
    b2Rate: 0.3756,
    b3Rate: 0.4950,
    b1RateAow: 0.1785,
  },

  nlHeffingskorting: {
    max: 3115,
    phaseFrom: 29736,
    phaseRate: 0.06398,
    phaseTo: 78426,
    maxAow: 1556,
    phaseRateAow: 0.03195,
  },

  nlArbeidskorting: {
    s1Top: 11965,
    s1Rate: 0.08324,
    s2Top: 25845,
    s2Base: 996,
    s2Rate: 0.31009,
    s3Top: 45592,
    s3Base: 5300,
    s3Rate: 0.01950,
    s4Top: 132920,
    s4Base: 5685,
    s4Rate: 0.06510,
    s1RateAow: 0.04156,
    s2BaseAow: 498,
    s2RateAow: 0.15483,
    s3BaseAow: 2647,
    s3RateAow: 0.00974,
    s4BaseAow: 2840,
    s4RateAow: 0.03250,
  },

  rvRate: 0,
  rvCeiling: 0,
  kvPublicRate: 0,
  kvCeiling: 0,
  pvRateWith: 0,
  pvRateChildless: 0,
  avRate: 0,
  avCeiling: 0,
};

export const EU_INCOME_TAX: EUCountryTax[] = [GERMANY, NETHERLANDS];

export const EU_INCOME_TAX_MAP: Record<string, EUCountryTax> = Object.fromEntries(
  EU_INCOME_TAX.map(c => [c.slug, c])
);
