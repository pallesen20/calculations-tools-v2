import type { APIRoute } from 'astro';
import { getPages } from '../utils/getPages';

export const GET: APIRoute = async () => {
  const pages = await getPages();

  const pageLines = pages
    .map(p => `- [${p.title}](${p.url}): ${p.description}`)
    .join('\n');

  return new Response(
    `This is an llms.txt file, meant for consumption by LLMs.

The XML sitemap of this website can by found by following [this link](https://calculations.tools/sitemap.xml).

#Calculations.tools

> Calculations.tools is an online platform that offers a wide range of real-time calculators and conversion tools. Its purpose is to help users quickly solve everyday calculations without manual formulas or complex math.

## About this site
The site includes tools for:

- Math calculations - e.g., percentage calculators, margin calculators, proportion calculators.
- Unit conversions - e.g., length, weight, volume, temperature, time, and currency conversions.
- Text tools - e.g., word and character counters, case converters.
- Financial tools - e.g., profit margin calculators, tax calculators, and savings growth calculators.
- Comparison tools - e.g., text diff checker, Excel/spreadsheet comparison.

In short, calculations.tools functions as a multi-purpose, all-in-one calculator and converter hub where users can:

- Calculate percentages, differences, margins, and proportions.
- Convert between metric and imperial units in real time.
- Quickly process common tasks like word counts or unit translations.
- Compare text, code, Excel files, and spreadsheets to find differences.

Every tool focuses on simplicity, accuracy, and speed, giving both formulas and instant results.

## Pages
${pageLines}
`,
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
      },
    }
  );
};