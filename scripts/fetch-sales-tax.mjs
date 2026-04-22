import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve } from 'path';
import { createRequire } from 'module';

const cjsRequire = createRequire(import.meta.url);
const zipcodes = cjsRequire('zipcodes');

const CSV_DIR = resolve('us_sales_tax_rates_april_2026');
const DATA_DIR = resolve('public/data/zip-tax');
const zipCountyMap = JSON.parse(readFileSync(resolve('scripts/zip-county.json'), 'utf-8'));

const stateFilter = process.argv.slice(2).map(s => s.toUpperCase());

function titleCase(str) {
  return str
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/\bOf\b/g, 'of')
    .replace(/\bThe\b/g, 'the')
    .trim();
}

function toCountyName(raw) {
  const titled = titleCase(raw);
  if (/\b(county|borough|parish|municipality|census area|city and borough)\b/i.test(titled)) return titled;
  if (/\s+brg$/i.test(titled)) return titled.replace(/\s+brg$/i, ' Borough');
  if (/\s+co$/i.test(titled)) return titled.replace(/\s+co$/i, ' County');
  return titled + ' County';
}

function median(arr) {
  const s = [...arr].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
}

function parseCSV(stateAbbr) {
  const file = resolve(CSV_DIR, `TAXRATES_ZIP5_${stateAbbr}202604.csv`);
  const text = readFileSync(file, 'utf-8');
  const lines = text.trim().split('\n');
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    if (cols.length < 8) continue;
    rows.push({
      zip: cols[1].trim().padStart(5, '0'),
      combinedRate: parseFloat(cols[3]) || 0,
    });
  }
  return rows;
}

function processState(stateAbbr) {
  const outFile = resolve(DATA_DIR, `${stateAbbr.toLowerCase()}.json`);

  let existingData = {};
  try { existingData = JSON.parse(readFileSync(outFile, 'utf-8')); } catch {}

  const rows = parseCSV(stateAbbr);
  if (rows.length === 0) { console.log(`${stateAbbr}: no CSV data`); return; }

  const countyBuckets = {};
  const cityBuckets = {};
  const updatedZips = {};

  for (const row of rows) {
    const combinedPct = Math.round(row.combinedRate * 10000) / 100;

    const rawCounty = zipCountyMap[row.zip];
    const countyName = rawCounty ? toCountyName(rawCounty) : null;
    const zipInfo = zipcodes.lookup(row.zip);
    const cityName = zipInfo?.city ?? null;

    updatedZips[row.zip] = {
      ...(cityName ? { city: cityName } : {}),
      ...(countyName ? { county: countyName } : {}),
      rate: combinedPct,
    };

    if (countyName) (countyBuckets[countyName] ??= []).push(combinedPct);
    if (cityName) (cityBuckets[cityName] ??= []).push(combinedPct);
  }

  const counties = Object.entries(countyBuckets)
    .map(([name, rates]) => ({ name, rate: median(rates) }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const cities = Object.entries(cityBuckets)
    .map(([name, rates]) => ({ name, rate: median(rates), count: rates.length }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .map(({ name, rate }) => ({ name, rate }));

  const output = {
    uniform: existingData.uniform ?? false,
    default: existingData.default ?? 0,
    ...(existingData.example_zip ? { example_zip: existingData.example_zip } : {}),
    lastUpdated: '2026-04',
    counties,
    cities,
    zips: updatedZips,
  };

  writeFileSync(outFile, JSON.stringify(output));
  console.log(`${stateAbbr}: ${rows.length} ZIPs — ${cities.length} cities, ${counties.length} counties`);
}

const csvFiles = readdirSync(CSV_DIR).filter(f => /^TAXRATES_ZIP5_[A-Z]{2}202604\.csv$/.test(f));
const states = csvFiles
  .map(f => f.replace('TAXRATES_ZIP5_', '').replace('202604.csv', ''))
  .filter(s => stateFilter.length === 0 || stateFilter.includes(s));

console.log(`Processing ${states.length} state(s) from CSV files...`);
for (const abbr of states) {
  processState(abbr);
}
console.log('Done.');
