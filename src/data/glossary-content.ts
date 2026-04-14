export interface GlossaryExample {
  headers: string[];
  rows: string[][];
}

export interface GlossaryContent {
  definition: string[];
  whenToUse: string;
  examples?: GlossaryExample;
  pitfalls?: string;
  faqs: { q: string; a: string }[];
}

export const GLOSSARY_CONTENT: Record<string, GlossaryContent> = {

  'adjusted-ebitda': {
    definition: [
      'Adjusted EBITDA starts with reported EBITDA and adds back (or removes) items that management and analysts consider non-recurring, non-cash, or unrepresentative of the ongoing business. Common adjustments include restructuring charges, litigation settlements, stock-based compensation, one-time bonuses, gains or losses on asset sales, and the costs of a completed acquisition.',
      'The purpose is to show what normalised, repeatable EBITDA looks like - the number that will recur year after year under steady-state operations. This is what private equity buyers, lenders, and strategic acquirers use to set valuations and determine debt capacity.',
      'Adjusted EBITDA is not defined by GAAP or IFRS, which means companies have significant discretion over what they add back. Two companies with identical reported EBITDA can present very different Adjusted EBITDA figures depending on their adjustment policies.',
    ],
    whenToUse: 'Use Adjusted EBITDA when valuing a business for acquisition, setting leverage ratios in a debt covenant, or benchmarking against peers - provided all parties agree on the definition of adjustments. Always request a full reconciliation from reported EBITDA to Adjusted EBITDA and scrutinise each add-back.',
    examples: {
      headers: ['Adjustment item', 'Amount', 'Direction'],
      rows: [
        ['Reported EBITDA', '$4,200,000', '-'],
        ['+ Restructuring charges (one-time)', '$300,000', 'Add back'],
        ['+ Stock-based compensation', '$150,000', 'Add back'],
        ['− Gain on asset sale (non-recurring)', '$200,000', 'Remove'],
        ['Adjusted EBITDA', '$4,450,000', '-'],
      ],
    },
    pitfalls: 'Adjusted EBITDA is one of the most abused metrics in corporate finance. Companies under acquisition pressure often classify ordinary recurring costs as "non-recurring." Always stress-test each adjustment: if the cost will realistically recur next year, it should stay in EBITDA. An Adjusted EBITDA that is materially higher than reported EBITDA over multiple years is a red flag.',
    faqs: [
      { q: 'Is Adjusted EBITDA always higher than EBITDA?', a: 'Usually, but not always. Most adjustments add items back (increasing the figure), but some adjustments remove non-recurring gains, which can lower it. The net direction depends on the specific adjustments in a given period.' },
      { q: 'Is stock-based compensation always added back in Adjusted EBITDA?', a: 'Often, but it is controversial. SBC is a real economic cost to shareholders (dilution) even though it is non-cash. Many sophisticated investors adjust EBITDA to exclude SBC add-backs to get a more conservative view of profitability.' },
      { q: 'What is the difference between Adjusted EBITDA and Run-Rate EBITDA?', a: 'Run-Rate EBITDA annualises a partial-year EBITDA figure - for example, multiplying Q1 EBITDA by four. Adjusted EBITDA removes non-recurring items from the historical figure. Both are adjustments to reported EBITDA but for different purposes.' },
    ],
  },

  'capex': {
    definition: [
      'Capital Expenditure (CapEx) is money spent to acquire, upgrade, or maintain physical assets - property, buildings, machinery, equipment, and technology infrastructure - that will be used for more than one year. Unlike operating expenses, which flow through the income statement immediately, CapEx is capitalised on the balance sheet and expensed gradually as depreciation over the asset\'s useful life.',
      'CapEx is categorised as maintenance CapEx (spending to keep existing assets operational) or growth CapEx (spending to expand capacity or enter new markets). Growth CapEx is an investment in future revenue; maintenance CapEx is essentially a cash cost of running the current business.',
      'Because EBITDA excludes depreciation, it effectively excludes CapEx as well - making EBITDA a poor proxy for free cash flow in capital-intensive businesses. A telecom company or manufacturer with high EBITDA but equally high maintenance CapEx may generate very little actual free cash.',
    ],
    whenToUse: 'Use CapEx analysis when assessing whether a business\'s EBITDA is truly convertible to cash (low CapEx = high conversion; high CapEx = lower conversion). Maintenance CapEx should be roughly equal to annual D&A in a mature business. If CapEx consistently exceeds D&A, the business is growing its asset base.',
    examples: {
      headers: ['Company type', 'Annual EBITDA', 'CapEx', 'Free Cash Flow', 'FCF Conversion'],
      rows: [
        ['SaaS company', '$5,000,000', '$200,000', '$4,800,000', '96%'],
        ['Manufacturer', '$5,000,000', '$2,000,000', '$3,000,000', '60%'],
        ['Telecom operator', '$5,000,000', '$3,500,000', '$1,500,000', '30%'],
      ],
    },
    pitfalls: 'CapEx can be deferred in the short term, making free cash flow appear temporarily strong. A business that delays maintenance CapEx will eventually need to spend more to repair degraded assets. Always review multi-year CapEx trends rather than a single year\'s figure.',
    faqs: [
      { q: 'What is the difference between CapEx and OpEx?', a: 'CapEx is spending on long-lived assets (>1 year useful life) that appears on the balance sheet and is expensed via depreciation. OpEx is spending on day-to-day operations that flows through the income statement immediately. The distinction affects reported profit: CapEx has no immediate income statement impact; OpEx reduces profit in the period incurred.' },
      { q: 'Is software CapEx or OpEx?', a: 'It depends. Purchased software licences are typically CapEx. Cloud/SaaS subscriptions are typically OpEx. Internally developed software can be either, depending on the development stage and accounting policy (US GAAP ASC 350-40 governs this).' },
      { q: 'How does CapEx relate to Free Cash Flow?', a: 'Free Cash Flow = Operating Cash Flow − CapEx. CapEx is the primary deduction from operating cash flow to arrive at FCF. A business that generates strong operating cash flow but has heavy CapEx requirements will have thin FCF despite healthy earnings.' },
    ],
  },

  'cdn': {
    definition: [
      'A Content Delivery Network (CDN) is a geographically distributed network of servers designed to serve files to end users from the location closest to them. Instead of every request travelling to a single origin server, a CDN caches and serves copies of files from dozens or hundreds of edge locations worldwide. This reduces the physical distance data must travel, lowering latency and improving load speed.',
      'CDNs are most commonly used to deliver static assets: JavaScript libraries, CSS files, fonts, images, and video. Large open-source libraries such as Tesseract.js (OCR), SheetJS (Excel processing), and PDF.js (PDF rendering) are routinely served from public CDNs because distributing multi-megabyte bundles with every page load would be slow and expensive for small sites.',
      'When this site mentions that a tool "loads from CDN," it means the browser fetches a third-party library file from an external CDN provider (such as jsDelivr or unpkg) the first time you use that tool. Only the library code is fetched - none of your files or data are sent anywhere. After the first load, the browser caches the file, so repeat visits in the same session skip the download entirely.',
    ],
    whenToUse: 'Understanding CDN loading matters when you are on a slow or metered connection, or using a browser with strict content-security policies. If a tool states it "requires no CDN," it means all code is already bundled with the page - nothing external is fetched, and the tool works offline.',
    examples: {
      headers: ['Library', 'Used for', 'CDN size (approx.)'],
      rows: [
        ['Tesseract.js', 'OCR - image to text', '~25 MB (includes language model)'],
        ['SheetJS (xlsx)', 'Excel / spreadsheet parsing', '~1 MB'],
        ['PDF.js', 'PDF rendering and text extraction', '~2 MB'],
        ['mammoth.js', 'Word (.docx) document parsing', '~0.5 MB'],
        ['KaTeX', 'Math formula rendering', '~0.3 MB'],
      ],
    },
    pitfalls: 'The main trade-off with CDN loading is a dependency on a third-party service. If the CDN is unreachable (rare, but possible), the tool will fail to load its library and will not function. Tools that bundle all code locally avoid this dependency but increase the initial page weight. This site uses CDN loading only for large, infrequently-used libraries where the trade-off favours CDN delivery.',
    faqs: [
      { q: 'Does loading from a CDN mean my files are uploaded somewhere?', a: 'No. CDN loading only fetches library code - the JavaScript that powers a tool. Your files, text, and input data never leave your browser. The distinction is: the library comes down to your browser from the CDN; your data stays entirely on your device.' },
      { q: 'Why do some tools on this site require a CDN and others do not?', a: 'Tools that need large specialised libraries (OCR, Excel parsing, PDF rendering) load those libraries from a CDN to avoid bloating the initial page load for all visitors. Simpler tools - such as the text and code comparison tools - run on pure JavaScript that is bundled directly into the page, requiring no external CDN fetch.' },
      { q: 'Will the CDN library be re-downloaded every time I use the tool?', a: 'No. Your browser caches CDN files after the first download. Subsequent uses in the same browser session (and often across sessions, depending on cache expiry headers) will serve the file from your local browser cache rather than fetching it again.' },
    ],
  },

  'cogs': {
    definition: [
      'Cost of Goods Sold (COGS) is the aggregate of all direct costs incurred to produce the goods or deliver the services a company sells during a period. For a product business, this typically includes raw materials, direct labour (workers on the production line), and manufacturing overhead (factory rent, utilities, equipment depreciation). For a service business, it includes direct labour hours billed to clients and any direct project costs.',
      'COGS is the first deduction from Revenue on an income statement: Revenue − COGS = Gross Profit. The lower the COGS relative to revenue, the higher the gross margin - and the more resources available to fund operations, R&D, and profit.',
      'What counts as COGS varies by industry and accounting policy. Software companies often count only hosting costs and customer support as COGS. Professional service firms count only billable hours. Retailers count the wholesale cost of goods sold. Understanding what a company includes in COGS is essential for cross-company margin comparisons.',
    ],
    whenToUse: 'Use COGS to calculate Gross Profit and Gross Profit Margin - the first indicators of unit economics and pricing power. Analyse COGS trends over time to identify whether input costs (materials, labour) are rising relative to revenue, which squeezes margins. In due diligence, verify the composition of COGS to ensure no operating costs are being hidden below the gross profit line.',
    examples: {
      headers: ['Business type', 'Revenue', 'COGS components', 'COGS', 'Gross Profit'],
      rows: [
        ['Manufacturer', '$10,000,000', 'Materials + Labour + Factory OH', '$6,500,000', '$3,500,000'],
        ['Retailer', '$5,000,000', 'Wholesale cost of goods', '$3,250,000', '$1,750,000'],
        ['SaaS company', '$8,000,000', 'Hosting + Support staff', '$1,600,000', '$6,400,000'],
      ],
    },
    pitfalls: 'Companies can improve reported gross margins by reclassifying costs from COGS to operating expenses. A sudden improvement in gross margin without a corresponding operational change may indicate reclassification. Always compare gross margin trends against peers using consistent COGS definitions.',
    faqs: [
      { q: 'What is the difference between COGS and operating expenses?', a: 'COGS covers only direct production costs - the costs that vary directly with units produced or services delivered. Operating expenses (SG&A, R&D) are the overhead costs of running the business. COGS appears above Gross Profit; OpEx appears below it.' },
      { q: 'Does COGS include salaries?', a: 'Only direct labour salaries - wages paid to workers directly involved in production or service delivery. Salaries of sales, marketing, HR, and executive staff are OpEx (SG&A), not COGS.' },
      { q: 'How is COGS calculated for a retailer vs a manufacturer?', a: 'For a retailer: COGS = Beginning Inventory + Purchases − Ending Inventory. For a manufacturer: COGS = Beginning Finished Goods + Cost of Goods Manufactured − Ending Finished Goods, where cost of goods manufactured includes materials, direct labour, and factory overhead.' },
    ],
  },

  'depreciation-amortization': {
    definition: [
      'Depreciation is the systematic allocation of a tangible asset\'s cost over its useful life. When a company buys a machine for $500,000 with a 10-year useful life, it records $50,000 of depreciation expense each year rather than expensing the full cost immediately. Amortization is the same concept applied to intangible assets: patents, customer lists, trademarks, and software.',
      'D&A is a non-cash charge: it reduces reported profit on the income statement without any cash leaving the business in that period. The cash left when the asset was purchased. This is why analysts add D&A back to Net Income when calculating EBITDA - to reveal cash-generative ability without the distortion of accounting depreciation schedules.',
      'The choice of depreciation method (straight-line vs. accelerated) affects how quickly an asset\'s cost is expensed. Straight-line spreads the cost evenly. Accelerated methods (like double-declining balance) front-load depreciation, which reduces reported profit in early years and increases it later. Two companies with identical assets can report very different profits depending on their depreciation method.',
    ],
    whenToUse: 'Pay close attention to D&A when comparing EBITDA vs EBIT: the gap between them equals D&A. Asset-heavy businesses (telecom, manufacturing, oil & gas) have large D&A charges, making EBITDA much higher than EBIT - and therefore making EBITDA-based valuation look cheaper than EBIT-based valuation. Also track whether annual D&A approximates CapEx - if CapEx consistently exceeds D&A, the company is growing its asset base.',
    examples: {
      headers: ['Asset', 'Cost', 'Useful life', 'Annual depreciation (straight-line)', 'Method'],
      rows: [
        ['Manufacturing machine', '$500,000', '10 years', '$50,000', 'Straight-line'],
        ['Office building', '$2,000,000', '40 years', '$50,000', 'Straight-line'],
        ['Customer list (intangible)', '$300,000', '5 years', '$60,000', 'Amortization'],
        ['Software licence', '$120,000', '3 years', '$40,000', 'Amortization'],
      ],
    },
    pitfalls: 'D&A is a real economic cost even though it is non-cash. An asset that depreciates to zero must eventually be replaced - often at a higher cost. Treating EBITDA as a synonym for free cash flow ignores this CapEx requirement. This is especially relevant in capital-intensive industries where D&A understates replacement cost.',
    faqs: [
      { q: 'Why is D&A added back to calculate EBITDA?', a: 'Because D&A is a non-cash charge - it reduces accounting profit without reducing cash. Adding it back to Net Income gives a closer approximation of the cash profit generated by operations before interest and tax.' },
      { q: 'What is the difference between depreciation and amortization?', a: 'Depreciation applies to tangible assets (equipment, buildings, vehicles). Amortization applies to intangible assets (patents, customer relationships, software). The mechanics are the same - both allocate an asset\'s cost over its useful life.' },
      { q: 'Can depreciation be accelerated for tax purposes?', a: 'Yes. Most tax authorities allow accelerated depreciation for tax reporting, meaning a company can deduct more depreciation in early years for tax purposes than it records in its financial statements. This creates a deferred tax liability on the balance sheet.' },
    ],
  },

  'ebit': {
    definition: [
      'EBIT (Earnings Before Interest and Tax) is Operating Profit - the income generated from a company\'s core business activities after deducting COGS and all operating expenses (including depreciation and amortization), but before accounting for how the business is financed (interest) or taxed.',
      'EBIT is used interchangeably with "Operating Profit" and "Operating Income" in most contexts. It sits between Gross Profit (which only deducts COGS) and EBT (which further deducts interest) on the income statement. The difference between EBIT and EBITDA is depreciation and amortization - adding D&A to Net Income stops at EBIT before reaching EBITDA.',
      'EBIT is the cleanest measure of operational performance when comparing companies with similar asset bases. Unlike EBITDA, it does not ignore the cost of using long-lived assets. Unlike Net Income, it removes the distortion of different capital structures and tax environments.',
    ],
    whenToUse: 'Use EBIT to compare the operational efficiency of companies with similar capital intensity but different financing structures. It is particularly useful when a company has recently refinanced its debt (changing interest expense) or when comparing companies across different countries with different tax rates.',
    examples: {
      headers: ['Item', 'Company A', 'Company B'],
      rows: [
        ['Revenue', '$20,000,000', '$20,000,000'],
        ['COGS', '$8,000,000', '$8,000,000'],
        ['Gross Profit', '$12,000,000', '$12,000,000'],
        ['Operating Expenses', '$7,000,000', '$7,000,000'],
        ['EBIT', '$5,000,000', '$5,000,000'],
        ['Interest Expense', '$500,000', '$2,000,000'],
        ['EBT', '$4,500,000', '$3,000,000'],
        ['Net Income (30% tax)', '$3,150,000', '$2,100,000'],
      ],
    },
    pitfalls: 'EBIT includes depreciation, which means it can understate cash generation for asset-heavy businesses with high D&A. On the other hand, EBIT is more conservative than EBITDA - it penalises businesses that require heavy capital investment. For M&A purposes, acquirers typically use EBITDA; for lending and operating comparisons, EBIT is often more useful.',
    faqs: [
      { q: 'Is EBIT the same as Operating Profit?', a: 'Yes. EBIT, Operating Profit, and Operating Income are the same metric. All three measure profit from core operations before interest and tax.' },
      { q: 'What is the difference between EBIT and EBITDA?', a: 'EBITDA = EBIT + Depreciation + Amortization. EBITDA adds back the non-cash D&A charge to show a closer approximation of cash profit. EBIT reflects the true cost of using assets (via depreciation) while EBITDA ignores it.' },
      { q: 'When is EBIT margin more useful than EBITDA margin?', a: 'EBIT margin is more useful when comparing companies with similar capital intensity, because it includes depreciation as a cost. EBITDA margin is preferred when comparing companies with very different depreciation policies or when assessing cash generation potential.' },
    ],
  },

  'ebitda': {
    definition: [
      'EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) measures the cash profit generated by a company\'s core operations, stripped of financing decisions, accounting depreciation methods, and tax policies. By removing these four items from Net Income, EBITDA reveals how much operating cash flow the business generates on a comparable, policy-neutral basis.',
      'The metric was popularised in the 1980s by leveraged buyout analysts who needed to assess how much debt a target company could service. Today it is the universal language of business valuation: investment bankers quote deals as multiples of EBITDA (e.g. "acquired at 8× EBITDA"), private equity firms measure portfolio company performance in EBITDA, and lenders set debt covenants relative to EBITDA (e.g. "net debt may not exceed 4× EBITDA").',
      'EBITDA is calculated using the bottom-up method: start with Net Income and add back Interest Expense, Tax Expense, Depreciation, and Amortization. The top-down method starts with Revenue and subtracts only cash operating costs, arriving at the same figure.',
    ],
    whenToUse: 'Use EBITDA when comparing the operating performance of companies with different capital structures, depreciation policies, or tax jurisdictions - or when estimating the debt capacity of a business. It is the standard metric for M&A valuation (EV/EBITDA multiple), leveraged buyout modelling, and bank covenant testing.',
    examples: {
      headers: ['Company', 'Net Income', '+ Interest', '+ Tax', '+ D&A', '= EBITDA'],
      rows: [
        ['SaaS startup', '$1,200,000', '$50,000', '$400,000', '$150,000', '$1,800,000'],
        ['Manufacturer', '$3,000,000', '$400,000', '$900,000', '$800,000', '$5,100,000'],
        ['Retailer', '$500,000', '$100,000', '$170,000', '$230,000', '$1,000,000'],
        ['Restaurant group', '$800,000', '$200,000', '$280,000', '$420,000', '$1,700,000'],
      ],
    },
    pitfalls: 'EBITDA is not cash flow. It ignores CapEx requirements (a capital-intensive business that needs heavy reinvestment is worth less than its EBITDA implies), changes in working capital (which can consume or release cash), and the quality of earnings. Always review free cash flow conversion (FCF / EBITDA) alongside EBITDA. EBITDA is also not a GAAP metric - companies can define it differently, so always compare like-for-like.',
    faqs: [
      { q: 'Is EBITDA the same as operating cash flow?', a: 'No. EBITDA ignores changes in working capital and capital expenditures. A business with high EBITDA but rising accounts receivable and heavy CapEx may generate very little actual cash. Free cash flow (FCF = Operating Cash Flow − CapEx) is a more complete measure.' },
      { q: 'Why do acquirers use EBITDA for valuation?', a: 'Because it allows comparison across companies with different debt loads, tax rates, and depreciation policies. The EV/EBITDA multiple tells an acquirer how many years of current EBITDA they are paying for the entire business, on a capital-structure-neutral basis.' },
      { q: 'What is a normal EBITDA multiple?', a: 'It varies by industry and growth profile. SaaS companies trade at 10–25× EBITDA; traditional manufacturers at 5–8×; retail at 4–7×. High growth and high margins command premium multiples. Always use sector-specific comparable transactions.' },
    ],
  },

  'ebitda-margin': {
    definition: [
      'EBITDA Margin is EBITDA divided by Revenue, expressed as a percentage. While absolute EBITDA tells you how much operating profit a business generates, the EBITDA Margin tells you how efficiently it generates that profit - what percentage of each revenue dollar becomes EBITDA.',
      'The margin is scale-independent: a $1M EBITDA on $3M revenue (33% margin) represents a more profitable business than $10M EBITDA on $200M revenue (5% margin), even though the absolute EBITDA is ten times larger. This makes EBITDA Margin the preferred metric for cross-company comparisons within an industry.',
      'Investors and acquirers use EBITDA Margin to benchmark a target company against sector peers. A significantly lower margin than peers signals a cost problem or a pricing problem. A significantly higher margin may indicate a competitive moat or superior operating leverage.',
    ],
    whenToUse: 'Use EBITDA Margin when comparing the operational efficiency of companies within the same sector - particularly in M&A, private equity portfolio management, or competitive benchmarking. It is less useful for cross-industry comparisons because margin norms differ dramatically (5–10% for grocery, 20–35% for SaaS).',
    examples: {
      headers: ['Company', 'EBITDA', 'Revenue', 'EBITDA Margin', 'Sector assessment'],
      rows: [
        ['SaaS startup', '$1,500,000', '$10,000,000', '15.0%', 'Average for SaaS'],
        ['Established SaaS', '$7,500,000', '$25,000,000', '30.0%', 'Strong for SaaS'],
        ['Retail chain', '$4,000,000', '$80,000,000', '5.0%', 'Average for retail'],
        ['Telecom operator', '$400,000,000', '$1,200,000,000', '33.3%', 'Typical for telecom'],
      ],
    },
    pitfalls: 'A high EBITDA Margin does not always mean a good business. Some high-margin businesses underinvest in growth or maintenance CapEx. A company with a 40% EBITDA Margin but zero growth and heavy deferred maintenance is less valuable than its margin suggests. Always read EBITDA Margin alongside growth rate and CapEx requirements.',
    faqs: [
      { q: 'What is a good EBITDA Margin?', a: 'It depends heavily on the industry. SaaS: 15–30%. Telecom: 30–40%. Manufacturing: 10–20%. Retail: 5–10%. Grocery: 3–8%. Always benchmark against direct industry peers, not a universal threshold.' },
      { q: 'How is EBITDA Margin different from Net Profit Margin?', a: 'Net Profit Margin = Net Income / Revenue. It includes interest, taxes, and D&A - making it always lower than EBITDA Margin for a profitable company. EBITDA Margin isolates operational efficiency; Net Profit Margin shows bottom-line shareholder return.' },
      { q: 'Can EBITDA Margin exceed 100%?', a: 'No. EBITDA cannot exceed Revenue because Revenue is the starting point from which costs are subtracted. An EBITDA Margin of 100% would mean zero operating costs, which is not possible in practice.' },
    ],
  },

  'ebt': {
    definition: [
      'EBT (Earnings Before Tax), also called Pre-Tax Income or Pre-Tax Profit, is the profit a company earns after all operating costs and interest expenses, but before income tax is applied. It sits one line above Net Income on the income statement: EBT × (1 − Tax Rate) = Net Income.',
      'The primary use of EBT is cross-jurisdictional comparison. Because corporate tax rates vary significantly between countries (and even between states within a country), Net Income is influenced by geography as much as operations. EBT strips out this variable, revealing how profitable the business is on a pre-tax basis regardless of where it is domiciled.',
      'EBT is also the base for calculating a company\'s Effective Tax Rate: Tax Expense / EBT × 100. This ratio shows the actual percentage of pre-tax income paid in taxes - which often differs from the statutory rate due to deductions, credits, and deferred tax items.',
    ],
    whenToUse: 'Use EBT when comparing companies across different tax jurisdictions - multinational corporations, cross-border M&A targets, or sector peers domiciled in different countries. EBT eliminates the tax rate variable, leaving only the operational and financing differences between companies.',
    examples: {
      headers: ['Company', 'Country', 'EBT', 'Statutory rate', 'Tax paid', 'Effective rate', 'Net Income'],
      rows: [
        ['Company A', 'Ireland', '$1,000,000', '12.5%', '$110,000', '11.0%', '$890,000'],
        ['Company B', 'Germany', '$1,000,000', '29.9%', '$285,000', '28.5%', '$715,000'],
        ['Company C', 'USA', '$1,000,000', '21.0%', '$195,000', '19.5%', '$805,000'],
        ['Company D', 'UK', '$1,000,000', '25.0%', '$230,000', '23.0%', '$770,000'],
      ],
    },
    pitfalls: 'EBT is affected by interest expense - companies with heavy debt loads will show lower EBT than less-leveraged peers with identical operating performance. If the goal is pure operational comparison, use EBIT (which also excludes interest) rather than EBT.',
    faqs: [
      { q: 'What is the difference between EBT and EBIT?', a: 'EBIT excludes both interest and tax. EBT excludes only tax - it still includes interest expense. EBIT is better for comparing operational efficiency across companies with different capital structures. EBT is better for comparing profitability across different tax environments.' },
      { q: 'How is EBT calculated?', a: 'EBT = Net Income + Tax Expense. Alternatively, EBT = EBIT − Interest Expense. Both methods produce the same result.' },
      { q: 'Can EBT be negative?', a: 'Yes. A negative EBT means the company made a pre-tax loss. This happens when interest expenses exceed operating profit, or when operating losses are large enough to persist after financing costs. A negative EBT typically results in zero tax or a deferred tax asset.' },
    ],
  },

  'effective-tax-rate': {
    definition: [
      'The Effective Tax Rate is the actual percentage of a company\'s pre-tax income (EBT) paid as income tax in a given period. It is calculated as Tax Expense / EBT × 100. This contrasts with the Statutory Tax Rate - the legal rate set by the government - which is rarely what companies actually pay.',
      'The gap between statutory and effective rates arises from tax deductions, credits, loss carry-forwards, tax-exempt income, accelerated depreciation allowances, R&D credits, and the mix of income across different tax jurisdictions. Large multinationals often have effective rates significantly below statutory rates by routing income through lower-tax jurisdictions.',
      'The effective tax rate fluctuates year to year based on the profit mix across jurisdictions, the availability of deferred tax assets, one-time tax credits, and changes in tax law. A sudden change in effective tax rate - up or down - often requires explanation in a company\'s financial statements.',
    ],
    whenToUse: 'Use the Effective Tax Rate when reconciling EBT to Net Income, or when assessing the sustainability of a company\'s after-tax profitability. An unusually low effective rate should prompt investigation into whether it is sustainable (e.g. from permanent credits) or temporary (e.g. from a one-time deferred tax release).',
    examples: {
      headers: ['Company', 'EBT', 'Tax Expense', 'Effective Tax Rate', 'Statutory Rate'],
      rows: [
        ['Tech multinational', '$5,000,000', '$400,000', '8.0%', '21.0%'],
        ['Domestic manufacturer', '$3,000,000', '$660,000', '22.0%', '21.0%'],
        ['Loss carry-forward user', '$2,000,000', '$0', '0.0%', '25.0%'],
        ['High-tax jurisdiction', '$1,500,000', '$450,000', '30.0%', '29.9%'],
      ],
    },
    pitfalls: 'An effective tax rate well below the statutory rate may not be sustainable. If it relies on deferred tax assets, international tax arrangements under regulatory scrutiny, or one-time credits, normalise the effective rate to a more conservative level when projecting future Net Income.',
    faqs: [
      { q: 'Why is the effective tax rate different from the statutory rate?', a: 'Because tax is calculated on taxable income (not accounting profit), and these differ due to: accelerated depreciation, R&D credits, loss carry-forwards, tax-exempt income, and profit allocation across jurisdictions with different rates.' },
      { q: 'Can the effective tax rate be negative?', a: 'Yes, in rare cases. This happens when tax credits or deferred tax benefits exceed the gross tax liability, resulting in the company receiving a net tax benefit rather than paying tax. It is uncommon and typically temporary.' },
      { q: 'How does the effective tax rate affect valuation?', a: 'A lower effective tax rate increases Net Income relative to EBT, boosting earnings-based valuation metrics. When building DCF models, analysts often normalise the effective tax rate to a long-run sustainable level rather than using a single year\'s rate.' },
    ],
  },

  'enterprise-value': {
    definition: [
      'Enterprise Value (EV) is the total economic value of a company - what it would theoretically cost an acquirer to buy the entire business, including taking on its debt and receiving its cash. It is calculated as Market Capitalisation plus Total Debt minus Cash and Cash Equivalents.',
      'EV provides a capital-structure-neutral view of value: it does not matter whether a company has financed itself with debt or equity - the EV represents the value of the underlying business regardless. This makes EV the correct numerator when calculating valuation multiples like EV/EBITDA, EV/EBIT, and EV/Revenue, which are used in M&A and investment analysis.',
      'Market cap alone (Equity Value) is insufficient for comparing companies with different capital structures. A company with $100M market cap and $50M debt is actually worth $150M to an acquirer (who must assume the debt). Another company with $100M market cap and $50M in cash is worth only $50M net (the buyer gets $50M cash back). EV captures both of these correctly.',
    ],
    whenToUse: 'Use EV when computing valuation multiples for M&A, comparable company analysis (comps), or precedent transaction analysis. EV is always paired with an income metric that is also capital-structure-neutral - EBITDA, EBIT, or Revenue. Never divide EV by Net Income (that is the P/E ratio, which uses Equity Value).',
    examples: {
      headers: ['Component', 'Company A', 'Company B'],
      rows: [
        ['Market Capitalisation', '$50,000,000', '$50,000,000'],
        ['+ Total Debt', '$30,000,000', '$5,000,000'],
        ['− Cash', '$5,000,000', '$15,000,000'],
        ['= Enterprise Value', '$75,000,000', '$40,000,000'],
        ['EBITDA', '$10,000,000', '$10,000,000'],
        ['EV/EBITDA Multiple', '7.5×', '4.0×'],
      ],
    },
    pitfalls: 'EV calculations can vary depending on what is included in "debt." Analysts sometimes include lease obligations, pension deficits, and minority interests as debt-like items. For a clean comparison, always use the same EV definition across all companies in a peer set.',
    faqs: [
      { q: 'Why is cash subtracted in the EV formula?', a: 'Because an acquirer receives the company\'s cash as part of the deal. If you pay $100M for a company that holds $20M cash, the net cost of the business is $80M. Subtracting cash adjusts for this.' },
      { q: 'What is the difference between Enterprise Value and Market Cap?', a: 'Market Cap = Share Price × Shares Outstanding - it is the equity value only. EV adds debt and subtracts cash to capture the full value of the business regardless of how it is financed. EV is almost always used in M&A; Market Cap is used in equity-only contexts like P/E ratios.' },
      { q: 'What is a "bridge" from Enterprise Value to Equity Value?', a: 'Equity Value = EV − Net Debt (Debt − Cash). This bridge is used in M&A to calculate the actual offer price per share after accounting for what the acquirer must pay debt-holders.' },
    ],
  },

  'ev-ebitda': {
    definition: [
      'EV/EBITDA is a valuation multiple that divides a company\'s Enterprise Value (EV) by its EBITDA. It answers the question: how many years of current EBITDA would it take to pay the full price of the business? A multiple of 8× means the buyer is paying eight years\' worth of current EBITDA.',
      'EV/EBITDA is the most widely used valuation multiple in M&A and private equity. Unlike the Price-to-Earnings (P/E) ratio, EV/EBITDA is capital-structure-neutral - both EV and EBITDA remove the effects of interest and tax, making it valid for comparing companies regardless of their debt levels or tax rates.',
      'The multiple varies significantly by industry, growth rate, and margin profile. High-growth, high-margin businesses (SaaS, pharma) trade at premium multiples. Mature, lower-margin businesses (manufacturing, retail) trade at lower multiples. The appropriate multiple for any business reflects the market\'s expectation of future EBITDA growth and margin sustainability.',
    ],
    whenToUse: 'Use EV/EBITDA when valuing a business for acquisition, benchmarking against public market comparables, or assessing exit values in a leveraged buyout model. Always use forward EBITDA (the next twelve months\'  estimate) for an acquisition context, and trailing EBITDA for historical comparisons.',
    examples: {
      headers: ['Industry', 'Typical EV/EBITDA range', 'Key driver of multiple'],
      rows: [
        ['SaaS / Cloud Software', '10× – 25×', 'High growth, high margins, recurring revenue'],
        ['Healthcare services', '10× – 18×', 'Defensive demand, margin expansion potential'],
        ['Consumer goods', '8× – 14×', 'Brand value, pricing power'],
        ['Industrial manufacturing', '5× – 9×', 'Cyclicality, CapEx intensity'],
        ['Grocery / Food retail', '4× – 7×', 'Thin margins, low growth'],
      ],
    },
    pitfalls: 'EV/EBITDA can be misleading for capital-intensive businesses that require heavy CapEx. Two companies with identical EV/EBITDA ratios but different CapEx requirements are not equally valued - the one with higher CapEx generates less free cash from the same EBITDA. Always also calculate EV/EBIT and EV/FCF to triangulate.',
    faqs: [
      { q: 'What is a good EV/EBITDA multiple?', a: 'It is entirely industry-dependent. 8–12× is considered normal for many mid-market businesses. SaaS and tech can trade at 15–30× in strong markets. There is no universal "good" multiple - always compare against recent transactions and public comparables in the same sector.' },
      { q: 'Should I use LTM or NTM EBITDA for EV/EBITDA?', a: 'In M&A, NTM (Next Twelve Months, i.e. forward) EBITDA is typically used because buyers are paying for future performance. LTM (Last Twelve Months, i.e. trailing) EBITDA is used for historical benchmarking and when forward estimates are unreliable.' },
      { q: 'How is EV/EBITDA different from P/E?', a: 'P/E = Share Price / EPS, using Equity Value and Net Income - both affected by capital structure and taxes. EV/EBITDA is capital-structure-neutral and pre-tax. EV/EBITDA is preferred in M&A; P/E is more common in equity market contexts.' },
    ],
  },

  'gross-profit': {
    definition: [
      'Gross Profit is the first profitability figure on an income statement. It is calculated as Revenue minus Cost of Goods Sold (COGS) - what remains after paying the direct costs of producing goods or delivering services, before any overhead, R&D, SG&A, interest, or tax.',
      'In absolute dollar terms, Gross Profit represents the pool of money available to cover all other business expenses and ultimately generate net profit. A business with $10M revenue and $7M COGS has $3M Gross Profit - $3M to cover SG&A, R&D, and debt service before generating net income.',
      'Gross Profit alone is useful but incomplete - it must be read alongside Gross Profit Margin (the percentage) to understand efficiency. A high absolute Gross Profit on a large revenue base may still represent a thin margin if COGS is proportionally high.',
    ],
    whenToUse: 'Use Gross Profit as the starting point for income statement analysis. Track it over time to see whether the absolute dollar amount is growing (a revenue growth driver) or shrinking (a pricing or cost problem). Use Gross Profit Margin for cross-company efficiency comparisons.',
    examples: {
      headers: ['Company', 'Revenue', 'COGS', 'Gross Profit', 'Gross Margin'],
      rows: [
        ['SaaS company', '$8,000,000', '$1,600,000', '$6,400,000', '80.0%'],
        ['Consumer goods', '$20,000,000', '$12,000,000', '$8,000,000', '40.0%'],
        ['Grocery retailer', '$50,000,000', '$37,500,000', '$12,500,000', '25.0%'],
        ['Manufacturer', '$30,000,000', '$21,000,000', '$9,000,000', '30.0%'],
      ],
    },
    pitfalls: 'Gross Profit can increase in absolute terms while Gross Margin shrinks - if revenue grows but COGS grows faster. Always track both. A business that acquires customers with heavy discounts may show strong revenue growth but deteriorating Gross Profit and Gross Margin.',
    faqs: [
      { q: 'What is the difference between Gross Profit and Net Profit?', a: 'Gross Profit = Revenue − COGS. Net Profit = Revenue − COGS − OpEx − Interest − Tax. Net Profit deducts every business cost; Gross Profit only deducts direct production costs. Net Profit is always lower than or equal to Gross Profit.' },
      { q: 'Can Gross Profit be negative?', a: 'Yes. If COGS exceeds Revenue, the company is selling products for less than they cost to produce - a fundamental unit economics problem. This is a critical warning sign and is rarely sustainable.' },
      { q: 'What does a high Gross Profit mean?', a: 'A high Gross Profit (both in dollars and as a margin) indicates strong pricing power, low production costs, or both. It signals that the business has resources to invest in growth, R&D, or other operating costs while still generating operating profit.' },
    ],
  },

  'gross-profit-margin': {
    definition: [
      'Gross Profit Margin is Gross Profit expressed as a percentage of Revenue. It measures what proportion of each revenue dollar remains after paying the direct costs of producing goods or services. A 40% Gross Profit Margin means 40 cents of every dollar of revenue is available to cover operating expenses and generate profit.',
      'Gross Profit Margin is the first and most fundamental test of a business\'s unit economics. It reflects pricing power (can the company charge a premium?), production efficiency (can it make things cheaply?), and input cost exposure (how vulnerable is it to raw material price increases?).',
      'Gross Profit Margin varies enormously by industry and business model. Software companies with near-zero marginal delivery costs can achieve 70–80%+ margins. Grocery retailers with thin mark-ups on commodity goods often achieve only 20–25%. Cross-industry comparison is therefore less meaningful than benchmarking within a sector.',
    ],
    whenToUse: 'Use Gross Profit Margin to assess pricing power and production efficiency relative to industry peers. Track it over time to detect margin compression (rising input costs or pricing pressure) or expansion (cost reduction or pricing power gains). In due diligence, drill into what a company includes in COGS to ensure consistent definitions.',
    examples: {
      headers: ['Industry', 'Typical gross margin', 'Primary driver'],
      rows: [
        ['SaaS / Cloud Software', '65% – 80%', 'Near-zero marginal cost of software delivery'],
        ['Pharmaceuticals', '60% – 75%', 'IP pricing power; low incremental manufacturing cost'],
        ['Consumer electronics', '30% – 45%', 'Component and assembly costs'],
        ['Retail (specialty)', '35% – 55%', 'Mark-up on branded products'],
        ['Grocery', '20% – 30%', 'High volume, thin mark-up'],
        ['Construction', '15% – 25%', 'Material and subcontractor costs'],
      ],
    },
    pitfalls: 'Gross Profit Margin improvements can sometimes result from COGS reclassification rather than genuine efficiency gains - costs moved from COGS to SG&A improve gross margin without any real change. When gross margin improves suddenly, always check whether the improvement is operational or definitional.',
    faqs: [
      { q: 'What is a good Gross Profit Margin?', a: 'It depends on the industry. Software: 65–80%. Pharma: 60–75%. Consumer goods: 30–50%. Manufacturing: 20–40%. Grocery: 20–30%. A margin well below the sector average usually signals a pricing or cost disadvantage.' },
      { q: 'How is Gross Profit Margin different from Net Profit Margin?', a: 'Gross Profit Margin only deducts COGS. Net Profit Margin deducts all costs including SG&A, R&D, interest, and tax. Net Profit Margin is always lower. The gap between them represents the weight of overhead and financing costs.' },
      { q: 'Can Gross Profit Margin be improved?', a: 'Yes. The main levers are: raising prices (increases revenue without increasing COGS), reducing input costs (renegotiating supplier contracts, improving manufacturing efficiency), and changing product mix (selling more high-margin products). Scale can also improve margins if fixed production costs are spread over higher volume.' },
    ],
  },

  'net-income': {
    definition: [
      'Net Income (also called Net Profit, Net Earnings, or "the bottom line") is a company\'s profit after deducting every cost: COGS, operating expenses (SG&A, R&D), interest expense, and income tax. It is the final line of the income statement and represents what is left for shareholders after all obligations are met.',
      'Net Income flows into the balance sheet through Retained Earnings (if not distributed as dividends). For public companies, Net Income divided by shares outstanding gives Earnings Per Share (EPS) - the most widely followed profitability metric in equity markets.',
      'Net Income can be positive (profitable) or negative (a net loss). Sustained negative Net Income requires external financing (new debt or equity) to fund ongoing operations. Growth companies often run at a net loss deliberately, investing in future revenue at the expense of near-term profitability.',
    ],
    whenToUse: 'Use Net Income to calculate Net Profit Margin, EPS, and return on equity (ROE). It is the most comprehensive measure of what shareholders actually earn from the business. For operational comparisons (stripping out financing and tax), use EBIT or EBITDA instead.',
    examples: {
      headers: ['Income statement item', 'Amount'],
      rows: [
        ['Revenue', '$10,000,000'],
        ['− COGS', '$4,000,000'],
        ['= Gross Profit', '$6,000,000'],
        ['− Operating Expenses', '$3,500,000'],
        ['= EBIT', '$2,500,000'],
        ['− Interest Expense', '$300,000'],
        ['= EBT', '$2,200,000'],
        ['− Tax (25%)', '$550,000'],
        ['= Net Income', '$1,650,000'],
      ],
    },
    pitfalls: 'Net Income is the most susceptible earnings metric to accounting manipulation - through revenue recognition timing, expense deferral, and impairment reversals. It also includes non-cash items (depreciation, amortisation) that do not represent cash outflows. Always cross-check Net Income against operating cash flow from the cash flow statement.',
    faqs: [
      { q: 'Is Net Income the same as profit?', a: 'Net Income is the most complete measure of profit - it deducts all costs. But "profit" can refer to Gross Profit, Operating Profit, or Net Income depending on context. In everyday business usage, "profit" usually means Net Income (bottom-line profit).' },
      { q: 'Can a company have high revenue but negative Net Income?', a: 'Yes, this is common in growth-stage companies that invest heavily in sales, marketing, and R&D. Revenue growth does not guarantee profitability. Amazon ran at or near breakeven net income for many years while growing revenue rapidly.' },
      { q: 'What happens to Net Income if it is not paid as a dividend?', a: 'It is retained in the business and added to Retained Earnings on the balance sheet. Retained Earnings accumulate over time and fund reinvestment in the business, debt repayment, or share buybacks.' },
    ],
  },

  'net-profit-margin': {
    definition: [
      'Net Profit Margin is Net Income expressed as a percentage of Revenue. It is the most comprehensive profitability ratio - measuring what percentage of each revenue dollar ultimately becomes profit for shareholders after every cost has been deducted: COGS, operating expenses, interest, and tax.',
      'Unlike Gross Profit Margin (which only deducts COGS) or EBITDA Margin (which strips out interest, tax, and D&A), Net Profit Margin hides nothing. A business that looks profitable at the gross margin level may be unprofitable at the net margin level if it carries excessive overhead or debt.',
      'Net Profit Margin is most meaningful within an industry, not across industries. Grocery retailers operating at 1–3% net margins are not necessarily worse businesses than software companies at 20–30% - they have different unit economics, capital requirements, and growth profiles. The margin must be evaluated in the context of return on equity and asset turnover.',
    ],
    whenToUse: 'Use Net Profit Margin to assess overall bottom-line efficiency, calculate EPS sensitivities in financial models, and compare profitability across peers within the same sector. It is the most relevant metric for shareholders focused on reported earnings rather than operational cash flow.',
    examples: {
      headers: ['Company type', 'Net Income', 'Revenue', 'Net Margin', 'Context'],
      rows: [
        ['SaaS company', '$3,000,000', '$15,000,000', '20.0%', 'Strong for SaaS'],
        ['Consumer goods brand', '$1,500,000', '$20,000,000', '7.5%', 'Average for consumer goods'],
        ['Grocery chain', '$1,000,000', '$50,000,000', '2.0%', 'Normal for grocery'],
        ['Pre-profitability startup', '−$2,000,000', '$8,000,000', '−25.0%', 'Growth investment phase'],
      ],
    },
    pitfalls: 'Net Profit Margin fluctuates based on non-recurring items - asset sales, impairments, tax adjustments, and restructuring charges. A single year\'s net margin can be highly misleading. Use normalised (adjusted) net margin over a 3–5 year period for a reliable picture of profitability.',
    faqs: [
      { q: 'What is a good Net Profit Margin?', a: 'Above 10% is healthy for most industries. SaaS: 15–30%. Financial services: 20–35%. Manufacturing: 5–15%. Retail: 2–8%. Grocery: 1–4%. Always benchmark against direct sector peers.' },
      { q: 'Why do some industries have inherently low net margins?', a: 'Industries with high asset intensity, thin pricing power, or intense competition - like grocery, construction, and low-end manufacturing - have structurally thin margins. They compensate with high asset turnover: generating large revenues from their asset base. Return on assets or return on equity is often more useful than net margin for these sectors.' },
      { q: 'How does leverage affect Net Profit Margin?', a: 'Debt increases interest expense, which reduces EBT and therefore Net Income. Two companies with identical operations but different debt levels will have different Net Profit Margins. EBIT Margin is a better comparison for operational efficiency in this case.' },
    ],
  },

  'operating-expenses': {
    definition: [
      'Operating Expenses (OpEx) are the ongoing costs of running the business that are not directly tied to producing goods or services (those are COGS). OpEx typically includes SG&A (Selling, General & Administrative expenses), R&D (Research & Development), and depreciation of operating assets. These costs appear on the income statement between Gross Profit and Operating Profit (EBIT).',
      'OpEx is distinct from CapEx: CapEx is spending on long-lived assets (recorded on the balance sheet, expensed via depreciation), while OpEx is immediately expensed in the period incurred. This distinction matters for tax and for understanding the true cash cost of operating the business.',
      'The relationship between revenue growth and OpEx growth is critical to understanding operating leverage. If revenue grows faster than OpEx, operating leverage is positive - margins expand. If OpEx grows faster than revenue (as in aggressive growth investments), margins compress. Most growth company financial models include explicit assumptions about when OpEx will scale more slowly than revenue.',
    ],
    whenToUse: 'Analyse OpEx to understand cost structure and operating leverage. Break it into its components (SG&A, R&D) to understand where the business is investing. Track the OpEx-to-revenue ratio over time - declining ratios indicate improving efficiency; rising ratios require explanation (growth investment vs. cost inflation).',
    examples: {
      headers: ['OpEx component', 'Typical percentage of revenue', 'Nature'],
      rows: [
        ['Sales & Marketing', '10% – 30%', 'Variable - scales with growth ambition'],
        ['General & Administrative', '5% – 15%', 'Semi-fixed - scales slowly with size'],
        ['Research & Development', '5% – 25%', 'Investment - varies by strategy'],
        ['Depreciation (operating)', '1% – 8%', 'Fixed - tied to asset base'],
      ],
    },
    pitfalls: 'Companies can temporarily suppress OpEx to boost short-term profitability - by reducing marketing spend, delaying R&D, or cutting headcount. This may improve margins in the short term but damage future growth. When analysing a company\'s track record, always assess whether margin improvement came from genuine efficiency or from deferred investment.',
    faqs: [
      { q: 'What is the difference between OpEx and COGS?', a: 'COGS covers direct production costs that vary with output (materials, direct labour). OpEx covers overhead and period costs that do not directly scale with units produced (SG&A, R&D). COGS is deducted to arrive at Gross Profit; OpEx is deducted to arrive at Operating Profit.' },
      { q: 'Is depreciation an operating expense?', a: 'Yes, depreciation of operating assets (office equipment, leasehold improvements) is classified as an operating expense. Manufacturing equipment depreciation is often included in COGS. The classification depends on whether the asset is used in production or in overhead functions.' },
      { q: 'Why is OpEx versus CapEx an important distinction?', a: 'OpEx reduces profit immediately in the current period. CapEx does not - it creates an asset that is depreciated gradually. A company can shift spending between OpEx and CapEx to influence reported profit. Cloud computing has shifted many IT costs from CapEx (servers) to OpEx (subscriptions), affecting reported margins.' },
    ],
  },

  'operating-profit': {
    definition: [
      'Operating Profit (also called EBIT - Earnings Before Interest and Tax, or Operating Income) is the profit generated from a company\'s core business operations after deducting COGS and all operating expenses, but before accounting for how the business is financed (interest) or taxed. It is the third major profit figure on an income statement, below Gross Profit and above EBT.',
      'Operating Profit is the clearest signal of how well management runs the core business, independent of the financing and tax decisions made at the corporate level. Two identical businesses - one debt-free and one heavily leveraged - will show the same Operating Profit but very different EBT and Net Income.',
      'Operating Profit is closely related to EBITDA, differing only by the inclusion of depreciation and amortization: EBITDA = Operating Profit + D&A. Operating Profit is a more conservative measure of performance because it treats depreciation as a real cost of using assets, which it is.',
    ],
    whenToUse: 'Use Operating Profit when comparing the operational efficiency of businesses with similar capital intensity but different financing structures. It is preferred over EBITDA when asset intensity is similar across the peer group, and over Net Income when the goal is to isolate management\'s operational performance from financing and tax decisions.',
    examples: {
      headers: ['Item', 'Amount'],
      rows: [
        ['Revenue', '$15,000,000'],
        ['− COGS', '$6,000,000'],
        ['= Gross Profit', '$9,000,000'],
        ['− SG&A', '$4,500,000'],
        ['− R&D', '$1,000,000'],
        ['− D&A', '$500,000'],
        ['= Operating Profit (EBIT)', '$3,000,000'],
        ['Operating Profit Margin', '20.0%'],
      ],
    },
    pitfalls: 'For highly capital-intensive businesses, Operating Profit (which includes D&A) may significantly understate cash generation relative to EBITDA (which excludes D&A). In those cases, the gap between Operating Profit and EBITDA should be explicitly acknowledged and CapEx requirements evaluated separately.',
    faqs: [
      { q: 'Is Operating Profit the same as EBIT?', a: 'Yes. Operating Profit, EBIT, and Operating Income are the same metric: profit from operations before interest and tax.' },
      { q: 'What is the difference between Operating Profit and Gross Profit?', a: 'Gross Profit deducts only COGS. Operating Profit also deducts SG&A, R&D, and D&A. Operating Profit is always lower than or equal to Gross Profit.' },
      { q: 'Why does a company focus on Operating Profit in earnings reporting?', a: 'Because it isolates what management directly controls: revenue generation and cost management. Interest expense is a financing decision; tax is a government levy. Operating Profit shows the pure operational result.' },
    ],
  },

  'operating-profit-margin': {
    definition: [
      'Operating Profit Margin (also called EBIT Margin) is Operating Profit (EBIT) expressed as a percentage of Revenue. It measures how efficiently a company converts revenue into operating profit - the percentage of each revenue dollar that remains after paying COGS and all operating expenses, but before interest and tax.',
      'Operating Profit Margin sits between Gross Profit Margin (which only deducts COGS) and Net Profit Margin (which deducts everything). The gap between Gross Margin and Operating Margin reflects the weight of SG&A and R&D. The gap between Operating Margin and Net Margin reflects the cost of debt (interest) and the tax burden.',
      'The margin is capital-structure-neutral: a highly leveraged company and a debt-free company with identical operations will show the same Operating Profit Margin but different Net Profit Margins. This makes it a fair basis for operational benchmarking across peers with different financing histories.',
    ],
    whenToUse: 'Use Operating Profit Margin to benchmark operational efficiency across companies with different capital structures or in cross-border M&A where tax rates differ. It is more conservative than EBITDA Margin (includes depreciation) and more comparable than Net Profit Margin (excludes financing and tax effects).',
    examples: {
      headers: ['Industry', 'Typical operating margin', 'Key driver'],
      rows: [
        ['SaaS / Cloud Software', '20% – 35%', 'Scalable cost base; high gross margins'],
        ['Financial Services', '30% – 45%', 'Low COGS; fee and interest income'],
        ['Pharmaceuticals', '20% – 30%', 'IP pricing power after R&D expense'],
        ['Manufacturing', '8% – 15%', 'Material, labour, and D&A compress margin'],
        ['Retail', '5% – 12%', 'Overhead after thin gross margins'],
      ],
    },
    pitfalls: 'Operating Profit Margin can look weak in high-D&A businesses (telecom, manufacturing) compared to EBITDA Margin. Before concluding that a business has a poor operating margin, always check how much of the gap to EBITDA Margin is attributable to D&A, and whether that D&A is backed by CapEx at similar levels.',
    faqs: [
      { q: 'Is Operating Profit Margin the same as EBIT Margin?', a: 'Yes. Operating Profit = EBIT, so Operating Profit Margin = EBIT Margin. The terms are used interchangeably.' },
      { q: 'What is the difference between Operating Margin and EBITDA Margin?', a: 'EBITDA Margin adds back D&A, so it is always higher than or equal to Operating Margin. The gap equals D&A as a percentage of revenue. Capital-intensive businesses have a larger gap; asset-light businesses have a smaller one.' },
      { q: 'What is a good Operating Profit Margin?', a: 'Above 15% signals strong operational efficiency for most businesses. SaaS often achieves 20–35%; retail 5–12%; manufacturing 8–15%. Always benchmark against direct peers - the number is meaningless without context.' },
    ],
  },

  'revenue': {
    definition: [
      'Revenue (also called "the top line," "sales," or "turnover") is the total income a company earns from its primary business activities - selling goods, delivering services, charging subscriptions, or collecting fees - before any costs are deducted. It is literally the first line of an income statement, above all profit metrics.',
      'Every profitability ratio - Gross Margin, EBITDA Margin, Net Profit Margin - divides a profit figure by Revenue. Revenue is therefore the common denominator of business performance measurement. Growing revenue while maintaining or improving margins is the primary value creation path for most businesses.',
      'Revenue recognition rules (GAAP ASC 606, IFRS 15) determine when revenue is recorded. The principle is that revenue is recognised when a performance obligation is satisfied - not necessarily when cash is received. This creates the possibility of revenue being booked before cash is collected (accounts receivable) or after cash is received (deferred revenue).',
    ],
    whenToUse: 'Use Revenue as the starting point for every income statement analysis. Track its growth rate (year-over-year % change) as the primary measure of commercial momentum. Break it into components - by product, geography, customer segment, or channel - to understand quality, sustainability, and concentration risk.',
    examples: {
      headers: ['Revenue type', 'Example', 'Characteristics'],
      rows: [
        ['Recurring subscription', 'SaaS monthly fees', 'Predictable; valued at premium multiples'],
        ['Transactional', 'E-commerce sales', 'Variable; depends on repeat purchase rate'],
        ['Project / milestone', 'Consulting or construction', 'Lumpy; recognised on completion'],
        ['Licence', 'Software perpetual licence', 'One-time; declining in most tech sectors'],
        ['Advertising', 'Media/social platform', 'Cyclical; highly correlated to economic activity'],
      ],
    },
    pitfalls: 'Revenue growth without margin expansion or cash generation is not inherently valuable. "Buying" revenue through aggressive discounting, high customer acquisition costs, or unsustainable terms inflates the top line while destroying value. Always pair revenue analysis with gross margin trends and customer unit economics.',
    faqs: [
      { q: 'What is the difference between Revenue and Profit?', a: 'Revenue is the total income from sales before any costs are deducted. Profit is what remains after costs. A company can have high revenue and zero or negative profit if costs exceed revenue.' },
      { q: 'What is ARR and how does it relate to Revenue?', a: 'ARR (Annual Recurring Revenue) is a metric used in SaaS businesses to represent the annualised value of active subscription contracts. It is a forward-looking measure of contracted revenue, not a GAAP accounting metric. Reported Revenue may differ from ARR due to contract timing, discounts, and usage-based components.' },
      { q: 'Can revenue be negative?', a: 'No. Revenue represents income earned and cannot be negative. If returns, refunds, or discounts exceed gross sales in a period, revenue is reported as zero. Negative adjustments are typically recorded as contra-revenue or as COGS.' },
    ],
  },

  'sga': {
    definition: [
      'SG&A (Selling, General & Administrative expenses) is the collective label for all operating costs that are not directly related to producing goods or services. Selling expenses include the sales force, sales commissions, marketing, and customer acquisition costs. General & Administrative (G&A) expenses cover executive salaries, finance and legal functions, HR, IT infrastructure, office rent, and insurance.',
      'SG&A sits below Gross Profit on the income statement and is the primary driver of the gap between Gross Profit Margin and Operating Profit Margin. A business with 60% Gross Margin and 25% SG&A-to-revenue ratio will have a 35% Operating Margin. One with the same Gross Margin but 45% SG&A will have only 15% Operating Margin.',
      'SG&A is often the largest lever for margin improvement in mature businesses. Cost reduction programmes, shared service centres, and automation all target SG&A. In growth-stage companies, however, elevated SG&A is intentional - heavy sales and marketing investment to acquire customers and grow revenue faster than costs.',
    ],
    whenToUse: 'Analyse SG&A as a percentage of revenue to assess overhead efficiency. A declining SG&A-to-revenue ratio (as revenue grows) indicates positive operating leverage. Track the split between Selling (growth investment) and G&A (overhead) to understand whether SG&A is productive investment or administrative bloat.',
    examples: {
      headers: ['SG&A component', 'What is included', 'Typical driver'],
      rows: [
        ['Sales force & commissions', 'Account executives, SDRs, commissions', 'Headcount and OTE plans'],
        ['Marketing', 'Digital ads, events, brand, PR', 'CAC strategy and growth ambition'],
        ['G&A - Finance & Legal', 'CFO, controllers, legal, audit', 'Compliance and company scale'],
        ['G&A - HR & IT', 'People ops, office IT, systems', 'Headcount growth and tooling'],
        ['G&A - Rent & Facilities', 'Office leases, utilities', 'Footprint decisions'],
      ],
    },
    pitfalls: 'SG&A cuts can be a short-term profit lever that damages long-term growth - particularly cuts to sales and marketing. When comparing SG&A across companies, always separate Selling expenses (tied to growth) from G&A (overhead). A company with lower G&A but higher Selling costs may actually be more efficiently structured if it is converting that spend into revenue.',
    faqs: [
      { q: 'Is SG&A the same as operating expenses?', a: 'SG&A is a major component of operating expenses, but not all of them. R&D is usually reported separately (especially for tech and pharma companies). Depreciation of operating assets is also an operating expense, often reported separately from SG&A.' },
      { q: 'Why do SaaS companies have high SG&A?', a: 'SaaS businesses invest heavily in sales and marketing to acquire subscribers and grow ARR. Customer acquisition costs (CAC) are typically expensed immediately as SG&A even though the customer will generate recurring revenue for multiple years. This front-loading of cost is why SaaS businesses often run at operating losses in growth phases despite strong gross margins.' },
      { q: 'What is a normal SG&A-to-revenue ratio?', a: 'It varies significantly. Mature, efficient businesses aim for SG&A below 20% of revenue. Growth-stage SaaS companies may run at 50–80% during rapid expansion. Industrial companies often target below 15%. There is no universal benchmark - compare against direct peers.' },
    ],
  },

  'working-capital': {
    definition: [
      'Working Capital is the difference between a company\'s current assets (cash, accounts receivable, inventory) and current liabilities (accounts payable, accrued expenses, short-term debt). It measures a company\'s short-term liquidity - the net financial resources available to fund the next 12 months of operations.',
      'Positive Working Capital means a company has more short-term assets than short-term obligations - generally a sign of financial health. Negative Working Capital (more liabilities than current assets) can signal liquidity stress, but it is actually the norm in some business models: retailers like supermarkets collect cash from customers immediately while paying suppliers on 30–60 day terms, generating negative Working Capital as a structural feature.',
      'Changes in Working Capital affect operating cash flow. If accounts receivable grows faster than revenue (customers paying more slowly), Working Capital consumes cash. If accounts payable grows (suppliers extending terms), Working Capital releases cash. This is why a company can have positive net income but negative operating cash flow if Working Capital is building up.',
    ],
    whenToUse: 'Monitor Working Capital trends to assess liquidity and cash conversion efficiency. Use the Cash Conversion Cycle (Days Sales Outstanding + Days Inventory Outstanding − Days Payables Outstanding) for a more granular view. In M&A, analyse Working Capital normalisation - the target Working Capital level that a buyer would expect at closing.',
    examples: {
      headers: ['Current Asset / Liability', 'Typical range (% of revenue)', 'What it signals'],
      rows: [
        ['Cash & equivalents', '5% – 20%', 'Liquidity buffer'],
        ['Accounts receivable (DSO)', '30 – 60 days', 'Billing and collection efficiency'],
        ['Inventory (DIO)', '30 – 90 days', 'Supply chain and demand forecasting'],
        ['Accounts payable (DPO)', '30 – 60 days', 'Supplier payment terms'],
      ],
    },
    pitfalls: 'Working Capital requirements can change rapidly as a business grows. A company that doubles revenue without equivalent Working Capital financing may face a cash crisis even if it is profitable. Always model Working Capital needs as part of a growth plan and ensure adequate facilities (e.g. revolving credit facilities) to fund peak requirements.',
    faqs: [
      { q: 'Can a company be profitable and still run out of cash?', a: 'Yes. If a company collects revenue slowly (long DSO) but grows rapidly, Working Capital investment will consume cash even if the income statement shows a profit. This is called a Working Capital trap and is a common cause of cash crises in fast-growing businesses.' },
      { q: 'Is negative Working Capital always bad?', a: 'No. Negative Working Capital can be structurally positive in businesses that collect cash before paying suppliers - subscription businesses, retailers, and fast-food chains. Amazon, for example, runs negative Working Capital as a feature of its model, not a flaw.' },
      { q: 'What is the difference between Working Capital and Cash?', a: 'Cash is a component of Working Capital (a current asset). Working Capital is the broader concept: Current Assets − Current Liabilities, including receivables, inventory, payables, and accruals, not just cash. A company can have positive Working Capital but very little cash if most of the current assets are tied up in slow-moving inventory.' },
    ],
  },

  // ─── Finance (additional) ────────────────────────────────────────────────────

  'free-cash-flow': {
    definition: [
      'Free cash flow (FCF) is the cash a business generates from its operations after funding the capital expenditure required to maintain and grow its asset base. The standard formula is: $$\\text{FCF} = \\text{Operating Cash Flow} - \\text{Capital Expenditure}$$ A more granular derivation starts from EBITDA: $$\\text{FCF} \\approx \\text{EBITDA} - \\text{CapEx} - \\Delta\\text{Working Capital} - \\text{Cash Taxes}$$ This version makes explicit the four principal claims on operating earnings before any capital is available to providers of finance.',
      'The gap between EBITDA and FCF can be vast in capital-intensive or fast-growing businesses. A manufacturer with strong EBITDA that is simultaneously expanding capacity can have negative FCF for years. A software company with minimal CapEx and stable working capital converts nearly all of its EBITDA into cash.',
      'FCF represents the discretionary cash available to the firm after it has paid all operating costs and reinvested in its business. This cash can be returned to equity holders via dividends or buybacks, used to repay debt, or deployed into acquisitions. It is the purest measure of economic value generation available from public financial statements.',
    ],
    whenToUse: 'Use FCF - rather than net income or EBITDA - when you want to assess how much economic value a business is actually creating for its owners after accounting for reinvestment requirements. Use FCF yield (FCF / Market Cap) as a valuation metric comparable to earnings yield but more resistant to accounting manipulation. Use FCF when stress-testing a leveraged company\'s ability to service debt, since interest and principal must be paid in cash, not accounting profit.',
    examples: {
      headers: ['Company type', 'EBITDA', 'CapEx', 'ΔWorking Capital', 'Cash taxes', 'FCF', 'FCF / EBITDA'],
      rows: [
        ['Software (SaaS)', '$50M', '$5M', '−$2M', '$8M', '$39M', '78%'],
        ['Manufacturer', '$50M', '$25M', '$5M', '$6M', '$14M', '28%'],
        ['Utility', '$50M', '$35M', '$1M', '$4M', '$10M', '20%'],
        ['Fast-growth retailer', '$50M', '$10M', '$15M', '$7M', '$18M', '36%'],
      ],
    },
    pitfalls: 'FCF can be temporarily inflated by under-investing in the business - a company that defers maintenance CapEx will report high FCF in the short term while its asset base deteriorates. Always assess CapEx relative to depreciation: if CapEx is persistently below depreciation, question whether the business is under-investing. FCF can also be distorted by working capital manipulation (stretching payables, accelerating collections) that is unsustainable over multiple periods.',
    faqs: [
      { q: 'How is FCF different from EBITDA?', a: 'EBITDA measures earnings before capital allocation decisions; FCF measures what remains after the business has funded its reinvestment needs. The difference is driven by three factors: CapEx (often larger than D&A in growing businesses), changes in working capital (which can consume substantial cash in fast-growing companies), and cash taxes (which EBITDA ignores entirely).' },
      { q: 'What is a good FCF margin?', a: 'FCF margin (FCF / Revenue) varies enormously by industry. Asset-light software and professional services businesses routinely achieve 20–40%. Capital-intensive industries such as utilities, telecoms, and industrials may generate 5–15% despite healthy EBITDA margins. The most useful comparison is FCF margin relative to industry peers and to the same company\'s historical performance.' },
      { q: 'Why is FCF harder to manipulate than earnings?', a: 'Net income is subject to numerous accrual accounting choices - revenue recognition timing, depreciation methods, impairment decisions, and provisions - that can significantly affect reported profit without any corresponding cash movement. FCF is anchored to actual cash receipts and payments, making it far more difficult to inflate sustainably.' },
    ],
  },

  // ─── Math ────────────────────────────────────────────────────────────────────

  'fraction': {
    definition: [
      'A fraction represents a part of a whole as a ratio of two integers: a numerator (top) and a denominator (bottom), written $$\\frac{a}{b}$$ where $$b \\neq 0$$. The denominator defines the size of each equal part; the numerator counts how many of those parts are taken. Fractions are exact - unlike decimals, which may require infinite digits to express a value like $$\\frac{1}{3}$$, a fraction represents the quantity precisely without rounding.',
      'Fractions are classified by the relationship between numerator and denominator. A proper fraction has a numerator smaller than the denominator ($$\\frac{3}{4}$$) and represents a value less than 1. An improper fraction has a numerator equal to or greater than the denominator ($$\\frac{7}{4}$$) and represents 1 or more. A mixed number combines a whole-number part with a proper fraction ($$1\\frac{3}{4}$$) and is the human-readable form of an improper fraction.',
      'Arithmetic with fractions requires attention to the denominator. Multiplication and division operate directly on numerators and denominators. Addition and subtraction require a common denominator first - the least common denominator (LCD) is the smallest integer divisible by all denominators in the expression.',
    ],
    whenToUse: 'Use fractions when exact rational representation is required and rounding is unacceptable - engineering tolerances, probability calculations, and algebraic manipulation all benefit from fractions over decimals. Use decimals when inputting values into digital systems or when communicating measurements where decimal notation is the convention.',
    examples: {
      headers: ['Type', 'Example', 'Decimal', 'Notes'],
      rows: [
        ['Proper fraction', '3/4', '0.75', 'Numerator < denominator; value < 1'],
        ['Improper fraction', '9/4', '2.25', 'Numerator ≥ denominator; value ≥ 1'],
        ['Mixed number', '2 1/4', '2.25', 'Equivalent to 9/4'],
        ['Unit fraction', '1/7', '0.142857…', 'Numerator = 1; repeating decimal'],
        ['Equivalent fractions', '2/3 = 4/6 = 8/12', '0.6666…', 'Same value, different form'],
      ],
    },
    pitfalls: 'Fractions with different denominators cannot be added or subtracted directly. Adding $$\\frac{1}{3} + \\frac{1}{4}$$ is not $$\\frac{2}{7}$$ - the correct answer is $$\\frac{7}{12}$$. The LCD of 3 and 4 is 12, giving $$\\frac{4}{12} + \\frac{3}{12} = \\frac{7}{12}$$. This error is especially common when students apply the addition-of-numerators intuition to denominators as well.',
    faqs: [
      { q: 'How do I add fractions with different denominators?', a: 'Find the least common denominator (LCD) of all fractions. Convert each fraction to an equivalent with the LCD as denominator by multiplying numerator and denominator by the appropriate factor. Then add the numerators and keep the LCD. For 1/4 + 1/6: LCD = 12, so 3/12 + 2/12 = 5/12.' },
      { q: 'How do I divide two fractions?', a: 'Multiply the first fraction by the reciprocal of the second: a/b ÷ c/d = a/b × d/c = (a×d)/(b×c). For example, 3/4 ÷ 2/5 = 3/4 × 5/2 = 15/8.' },
      { q: 'What is the difference between a fraction and a ratio?', a: 'A fraction expresses a part of a whole - the denominator is the total number of equal parts. A ratio compares two separate quantities - the denominator is not the total. A fraction 3/5 says "3 out of 5 equal parts of the whole"; a ratio 3:2 says "3 of one type for every 2 of another."' },
    ],
  },

  'percentage': {
    definition: [
      'A percentage is a dimensionless ratio expressed as a fraction of 100. The word derives from the Latin "per centum," meaning "by the hundred." It is the universal language for expressing proportions because it places all comparisons on a common scale - 40 out of 80 and 50 out of 100 are both immediately legible as 50% without further calculation.',
      'Percentages, decimals, and fractions are three representations of the same underlying ratio. A percentage divides the numerator by the denominator and multiplies by 100; a decimal divides without the multiplication; a fraction leaves the division unexpressed. Converting between them is routine, but context determines which form is most communicable: financial reports favour percentages, engineering calculations favour decimals, and exact computation favours fractions.',
      'A critical property of percentages is their asymmetry under reversal. A 50% increase followed by a 50% decrease does not return to the original value - it leaves you at 75% of the start, because each percentage is applied to a different base. Understanding base effects is essential for interpreting compounding, discounts, and sequential changes correctly.',
    ],
    whenToUse: 'Use percentages when communicating proportions to a general audience or when comparing parts of different-sized wholes on a common scale. Use decimals when inputting values into formulas or calculations. Use fractions when exact rational representation is required without rounding error.',
    examples: {
      headers: ['Value', 'As fraction', 'As decimal', 'As percentage'],
      rows: [
        ['1 in 4', '1/4', '0.25', '25%'],
        ['3 in 8', '3/8', '0.375', '37.5%'],
        ['1 in 3', '1/3', '0.3333…', '33.33…%'],
        ['7 in 10', '7/10', '0.70', '70%'],
        ['1 in 1', '1/1', '1.00', '100%'],
      ],
    },
    pitfalls: 'The base matters every time. "20% off, then an additional 10% off" is not a 30% discount - it is a 28% discount because the second 10% is applied to the already-reduced price. Always identify what the 100% base is before performing or interpreting a percentage calculation.',
    faqs: [
      { q: 'What is the formula for calculating a percentage?', a: 'The standard formula is: Percentage = (Part / Whole) × 100. For example, if 30 students out of 120 passed an exam, the pass rate is (30 / 120) × 100 = 25%. Identify the "whole" carefully - it is the reference value against which the part is being measured.' },
      { q: 'Can a percentage exceed 100%?', a: 'Yes. A percentage exceeds 100% whenever the part is larger than the whole - for example, a value that has more than doubled is above 200% of its original. Percentages below 0% are also valid in contexts like negative returns or temperature changes below a reference point.' },
      { q: 'What is the difference between a percentage and a percentage point?', a: 'A percentage expresses a proportion. A percentage point is the arithmetic difference between two percentages. If a tax rate rises from 20% to 25%, it increased by 5 percentage points but by 25% relative to its original value. Confusing the two is one of the most common errors in financial and statistical reporting.' },
    ],
  },

  'percentage-change': {
    definition: [
      'Percentage change measures how much a quantity has changed relative to its original (starting) value, expressed as a percentage. It is signed: a positive result is an increase; a negative result is a decrease. The formula anchors the comparison to the starting point: $$\\text{Percentage Change} = \\frac{\\text{New} - \\text{Old}}{|\\text{Old}|} \\times 100$$',
      'This directionality is what distinguishes percentage change from percentage difference. Percentage change has a clear temporal or causal order - there is a "before" and an "after." When that order does not exist (two independent measurements, two simultaneous observations), percentage difference using the average as the base is the appropriate metric.',
      'Sequential percentage changes do not add linearly. A 30% increase followed by a 20% decrease yields a net change of 4% - not 10% - because the second change is applied to the already-modified value. Percentage changes must be multiplied as growth factors (1.30 × 0.80 = 1.04) rather than summed.',
    ],
    whenToUse: 'Use percentage change when there is a clear reference point - a prior period, a baseline measurement, or an original value - and you want to express how much it has grown or shrunk. Use percentage difference instead when comparing two values with no defined starting point. Use percentage points when comparing two percentage figures directly.',
    examples: {
      headers: ['Scenario', 'Old value', 'New value', 'Calculation', 'Result'],
      rows: [
        ['Stock price', '$80', '$100', '(100 − 80) / 80 × 100', '+25.00%'],
        ['Monthly sales', '$50,000', '$42,000', '(42,000 − 50,000) / 50,000 × 100', '−16.00%'],
        ['Temperature', '20 °C', '25 °C', '(25 − 20) / 20 × 100', '+25.00%'],
        ['Website traffic', '1,200', '900', '(900 − 1,200) / 1,200 × 100', '−25.00%'],
      ],
    },
    pitfalls: 'When the original value is zero, percentage change is mathematically undefined - division by zero. When the original value is negative (e.g., a loss turning into a profit), the sign of the result can be counterintuitive. In both cases, report the absolute change alongside the percentage change, or note that the percentage is not meaningful.',
    faqs: [
      { q: 'Why is a 50% increase followed by a 50% decrease not zero?', a: 'Because each percentage uses a different base. Starting at 100, a 50% increase gives 150. A 50% decrease on 150 gives 75 - a net loss of 25%. The net multiplier is 1.50 × 0.50 = 0.75, confirming a 25% net decline.' },
      { q: 'What is the difference between percentage change and percentage difference?', a: 'Percentage change uses the original value as the denominator and implies a before-and-after relationship. Percentage difference uses the average of both values and is symmetric - it does not matter which value is "first." Use percentage difference when there is no temporal order between the two values.' },
      { q: 'How do I calculate percentage change when the old value is negative?', a: 'The formula still applies mathematically, but the result can be misleading. If revenue was −$200k and improved to −$50k, the formula gives (−50 − (−200)) / 200 × 100 = +75%. This correctly shows improvement, but readers may interpret it as moving from a loss to a profit. Always state the absolute values alongside the percentage.' },
    ],
  },

  'percentage-decrease': {
    definition: [
      'A percentage decrease is a special case of percentage change where the new value is strictly less than the original. It expresses how much a quantity has fallen relative to its starting point: $$\\text{Percentage Decrease} = \\frac{\\text{Old} - \\text{New}}{\\text{Old}} \\times 100$$ The result is always a positive number representing the magnitude of the decline.',
      'The original value always anchors the denominator. This means the largest possible percentage decrease is 100% - when a value falls to zero. A value cannot decrease by more than 100% of itself, because there is nothing left to remove. Statements like "profits fell 150%" are mathematically incoherent unless the starting value was already negative.',
      'Because the base shifts after each change, percentage decreases do not undo percentage increases of the same magnitude. A 33.3% decrease exactly reverses a 50% increase, not a 33.3% increase. Reversing a percentage increase always requires a smaller percentage decrease.',
    ],
    whenToUse: 'Use percentage decrease when quantifying losses, declines, or reductions where the original (higher) value is the reference point. Pairing the percentage decrease with the absolute change prevents misreading - a 50% decrease on a small number is not the same impact as a 10% decrease on a large number.',
    examples: {
      headers: ['Original value', 'New value', 'Absolute decrease', 'Percentage decrease'],
      rows: [
        ['$1,000', '$750', '$250', '25.00%'],
        ['80,000 units', '60,000 units', '20,000 units', '25.00%'],
        ['5.0% rate', '3.5% rate', '1.5 pp', '30.00%'],
        ['200 calories', '150 calories', '50 calories', '25.00%'],
        ['€4,800', '€0', '€4,800', '100.00%'],
      ],
    },
    pitfalls: 'A 100% decrease means the value has reached exactly zero - not below zero. If a quantity turns negative (a profit becomes a loss), the percentage decrease calculation breaks down conceptually. In such cases, report the absolute change and note the sign reversal explicitly.',
    faqs: [
      { q: 'How do I find the original value after a percentage decrease?', a: 'If you know the new value and the percentage decrease, the original is: Original = New / (1 − Decrease% / 100). For example, if a price is $80 after a 20% decrease, the original was $80 / (1 − 0.20) = $80 / 0.80 = $100.' },
      { q: 'What percentage decrease reverses a 25% increase?', a: 'Use the reversal formula: Decrease% = P / (100 + P) × 100 = 25 / 125 × 100 = 20%. After a 25% increase from $100 to $125, a 20% decrease on $125 returns to $100. The reversal percentage is always smaller than the original increase.' },
      { q: 'Can you have a percentage decrease greater than 100%?', a: 'No, not when the original value is positive. A 100% decrease reduces the value to zero. Decreases beyond 100% imply a negative result, which requires a different framing - for example, a value crossing from positive to negative territory.' },
    ],
  },

  'percentage-difference': {
    definition: [
      'Percentage difference measures the relative gap between two values when neither has a privileged role as the "original" or "reference." Instead of anchoring to one value, it uses the arithmetic mean of both as the denominator: $$\\text{Percentage Difference} = \\frac{|V_1 - V_2|}{(V_1 + V_2)/2} \\times 100$$ This produces a symmetric result - swapping V1 and V2 gives the same answer.',
      'The symmetry property is what distinguishes percentage difference from percentage change. Percentage change is asymmetric: the change from 80 to 100 is +25%, but the change from 100 to 80 is −20%. Percentage difference between 80 and 100 is 22.2% regardless of order. Use this when symmetry is analytically correct - comparing two lab measurements, two regional prices, or two competing products.',
      'Percentage difference does not convey direction. It is always expressed as a positive number representing the magnitude of the gap. If direction (which is larger) matters, state it separately as an observation alongside the percentage difference figure.',
    ],
    whenToUse: 'Use percentage difference when comparing two values with no defined temporal or causal order - two prices from different suppliers, two sensor readings, two survey results from independent groups. Use percentage change instead when one value is clearly the starting point and the other is an outcome or later measurement.',
    examples: {
      headers: ['Value 1', 'Value 2', 'Absolute difference', 'Mean', 'Percentage difference'],
      rows: [
        ['$90', '$110', '$20', '$100', '20.00%'],
        ['48 kg', '52 kg', '4 kg', '50 kg', '8.00%'],
        ['1,800 rpm', '2,200 rpm', '400 rpm', '2,000 rpm', '20.00%'],
        ['€3.20/L', '€3.60/L', '€0.40/L', '€3.40/L', '11.76%'],
      ],
    },
    pitfalls: 'Do not use percentage difference when one value is a baseline, standard, or prior period - in those cases, percentage change is the correct metric. Using the mean as a denominator when there is a natural reference point artificially inflates or deflates the reported magnitude.',
    faqs: [
      { q: 'When should I use percentage difference instead of percentage change?', a: 'Use percentage difference when the two values are collected simultaneously with no before-and-after relationship - comparing the price of the same item at two different stores, or comparing test scores from two independent groups. If one value is earlier in time or is the accepted reference, use percentage change.' },
      { q: 'Why does percentage difference use the average as the denominator?', a: 'Using the average eliminates directional bias. If you used V1 as the base, you would get a different result depending on which value you called V1. The average splits the difference, ensuring the metric is symmetric and does not imply that either measurement is more authoritative.' },
      { q: 'Is percentage difference the same as relative difference?', a: 'They are closely related but not identical. Relative difference typically refers to |V1 − V2| / V_reference, where V_reference is a chosen base (often the larger or the expected value). Percentage difference specifically uses the mean as the reference. Always state your denominator when communicating either metric.' },
    ],
  },

  'percentage-increase': {
    definition: [
      'A percentage increase is a special case of percentage change where the new value is strictly greater than the original value. It quantifies growth relative to the starting point: $$\\text{Percentage Increase} = \\frac{\\text{New} - \\text{Old}}{\\text{Old}} \\times 100$$ The result is always positive. It tells you not just that something grew, but how large that growth was relative to where it started.',
      'The choice of base - the original value - is what makes percentage increase a relative measure rather than an absolute one. A $10 increase on a $20 item (50% increase) communicates something very different from a $10 increase on a $1,000 item (1% increase), even though the absolute gain is identical.',
      'Percentage increases compound multiplicatively. If a value increases by 20% and then by 30%, the combined effect is not 50% but 56%, because the second increase applies to the already-enlarged base: 1.20 × 1.30 = 1.56. For small percentages the difference is negligible, but for large percentages or long time horizons the compounding effect becomes significant.',
    ],
    whenToUse: 'Use percentage increase when reporting growth, gains, or improvements where the original (lower) value is the natural reference point. Use it when communicating with a non-technical audience who needs context for absolute changes. When comparing growth across different-sized bases, percentage increase is the fair metric.',
    examples: {
      headers: ['Original value', 'New value', 'Absolute increase', 'Percentage increase'],
      rows: [
        ['$500', '$600', '$100', '20.00%'],
        ['2,000 users', '2,700 users', '700 users', '35.00%'],
        ['€1,200 salary', '€1,500 salary', '€300', '25.00%'],
        ['15 kg', '18 kg', '3 kg', '20.00%'],
      ],
    },
    pitfalls: 'A 50% increase followed by a 50% decrease does not return to the original value - it leaves you at 75% of the starting point. Reversing a percentage increase always requires a larger percentage decrease: to reverse a 25% increase you need a 20% decrease (not 25%), because the base has changed.',
    faqs: [
      { q: 'How do I reverse a percentage increase?', a: 'To find the percentage decrease needed to return to the original value after a P% increase, use: Decrease% = P / (100 + P) × 100. After a 25% increase, you need a 20% decrease. After a 100% increase (doubling), you need a 50% decrease. The reversal percentage is always smaller than the original increase.' },
      { q: 'What does a 100% increase mean?', a: 'A 100% increase means the value has doubled. The new value equals the original plus 100% of it: New = Old + Old = 2 × Old. A 200% increase means the value has tripled. Note that "increase by 200%" and "increase to 200%" mean different things - the latter means the value doubled.' },
      { q: 'Is percentage increase the same as a growth rate?', a: 'Yes, when calculated over a single period. A period-over-period percentage increase is a simple growth rate. When growth compounds over multiple periods, a compound annual growth rate (CAGR) is more appropriate, as it accounts for the multiplicative nature of sequential percentage increases.' },
    ],
  },

  'percentage-point': {
    definition: [
      'A percentage point (pp) is the arithmetic difference between two percentage values. If a central bank raises its benchmark rate from 3% to 5%, the increase is 2 percentage points. This is a unit of measurement, not a relative change. It is distinct from saying the rate increased "by 2%" - that phrasing would mean 2% of the original 3%, which equals 0.06 percentage points, a fundamentally different magnitude.',
      'The confusion between percentage points and percentage change is pervasive in journalism, politics, and business reporting, and it materially changes the meaning of a statement. An interest rate rising from 1% to 2% is a 1 percentage point increase but a 100% relative increase. Whether you use percentage points or percentage change can make the same event appear trivially small or dramatically large.',
      'Percentage points are dimensionless and absolute - they represent the raw difference on the percentage scale. They are most useful when the underlying percentages are of the same type and are being compared directly, such as comparing rates across time or groups.',
    ],
    whenToUse: 'Use percentage points when you want to express the arithmetic gap between two percentage values without implying a relative magnitude. Use percentage change when expressing how much one percentage has grown or shrunk relative to its own original level. Ideally, report both for full context.',
    examples: {
      headers: ['Metric', 'Before', 'After', 'Change (pp)', 'Relative change'],
      rows: [
        ['Unemployment rate', '4.0%', '6.5%', '+2.5 pp', '+62.5%'],
        ['Approval rating', '58%', '51%', '−7 pp', '−12.1%'],
        ['Market share', '22%', '28%', '+6 pp', '+27.3%'],
        ['Mortgage rate', '2.5%', '5.0%', '+2.5 pp', '+100.0%'],
        ['Exam pass rate', '71%', '68%', '−3 pp', '−4.2%'],
      ],
    },
    pitfalls: 'The most dangerous misuse is in media and political communication. Saying an interest rate "increased by 2%" when it rose from 3% to 5% is ambiguous at best. Almost all readers interpret it as a 2 percentage point increase. Use "percentage points" explicitly whenever you mean an absolute difference between two percentages.',
    faqs: [
      { q: 'Is "basis point" the same as "percentage point"?', a: 'No. One basis point equals 0.01 percentage points, or one-hundredth of a percent. A 25 basis point rate increase equals a 0.25 percentage point increase. Basis points are the standard unit in fixed income and monetary policy precisely because they avoid percentage-vs-percentage-point ambiguity.' },
      { q: 'How do I convert a percentage point change to a relative percentage change?', a: 'Divide the percentage point change by the original percentage and multiply by 100. If unemployment rises 2.5 pp from 4.0%, the relative change is (2.5 / 4.0) × 100 = 62.5%.' },
      { q: 'When should I report percentage points vs. percentage change?', a: 'For policy rates, exam pass rates, and survey percentages - where absolute shifts matter - percentage points are clearer. For revenue growth, population growth, or any metric where scale matters - percentage change is more informative. Ideally, report both: "the pass rate fell 3 percentage points (−4.2%)."' },
    ],
  },

  'proportion': {
    definition: [
      'A proportion is a statement of equality between two ratios: $$\\frac{a}{b} = \\frac{c}{d}$$ It asserts that two quantities scale together at the same rate. If 4 workers can complete a task in 6 hours, a proportion allows you to find how long 10 workers would take under the same conditions. Proportions are the algebraic backbone of scaling, unit conversion, and similarity in geometry.',
      'The fundamental property of a proportion is the cross-multiplication rule: if $$\\frac{a}{b} = \\frac{c}{d}$$, then $$a \\times d = b \\times c$$. This allows any one unknown to be solved as long as the other three values are known. Direct proportion (as x increases, y increases proportionally) is distinguished from inverse proportion (as x increases, y decreases proportionally, so that x × y = k).',
      'Proportional reasoning is one of the most broadly applicable mathematical skills across disciplines. It underlies dosage calculation in medicine, stress-load analysis in engineering, scaling in architecture, and price normalisation in economics.',
    ],
    whenToUse: 'Use direct proportion when two quantities grow or shrink together at a constant rate. Use inverse proportion when one quantity increases as the other decreases at a constant product. When scaling a quantity by a known ratio - recipe scaling, map reading, currency conversion - set up a proportion and solve for the unknown term via cross-multiplication.',
    examples: {
      headers: ['Application', 'Known ratio', 'Scaled ratio', 'Answer'],
      rows: [
        ['Recipe scaling', '2 cups / 4 servings', '? cups / 10 servings', '5 cups'],
        ['Map distance', '1 cm / 50 km', '3.5 cm / ? km', '175 km'],
        ['Unit conversion', '1 kg / 2.205 lb', '5 kg / ? lb', '11.025 lb'],
        ['Similar triangles', '6 cm / 9 cm', '8 cm / ? cm', '12 cm'],
        ['Medication dose', '250 mg / 5 mL', '? mg / 8 mL', '400 mg'],
      ],
    },
    pitfalls: 'Applying a direct proportion to an inverse relationship is a common error. If 4 pumps drain a tank in 6 hours, doubling the pumps to 8 does not double the time - it halves it to 3 hours. Recognise inverse proportions by asking: "does more of one quantity require more or less of the other?" If less, use an inverse proportion (constant product rather than constant ratio).',
    faqs: [
      { q: 'How do I solve a proportion for an unknown?', a: 'Write the proportion as a/b = c/d, then cross-multiply to get a × d = b × c. Isolate the unknown by dividing both sides by its coefficient. For example, 3/x = 5/20 gives 3 × 20 = 5 × x, so x = 60 / 5 = 12.' },
      { q: 'What is the difference between a proportion and a ratio?', a: 'A ratio is a comparison of two quantities expressed as a:b or a/b. A proportion is a statement that two ratios are equal: a/b = c/d. A ratio is a single expression; a proportion is an equation relating two ratios. You use a ratio to express a relationship, and a proportion to scale that relationship to a new context.' },
      { q: 'How are proportions used in real life?', a: 'Proportions appear wherever scaling is needed: a pharmacist calculates drug dosages by proportion, a cartographer scales map distances, a chef multiplies a recipe, a contractor estimates material quantities for a larger floor plan. Any time you apply a known rate to a new quantity, you are solving a proportion.' },
    ],
  },

  'ratio': {
    definition: [
      'A ratio expresses the relative sizes of two or more quantities of the same kind. Written as a:b or $$\\frac{a}{b}$$, it answers the question "how many times larger is one quantity than another?" A ratio of 3:1 means the first quantity is three times the second. The two quantities must share the same unit for the ratio to be dimensionless - mixing kilograms and metres produces a rate, not a ratio.',
      'A ratio does not carry information about absolute magnitudes - only proportions. A 3:1 ratio describes a recipe with 3 cups flour to 1 cup sugar, a business with 3 assets for every 1 unit of liability, or a sample with 3 red marbles to 1 blue marble. The underlying scale is irrelevant to the ratio itself.',
      'Ratios are expressed in simplest form by dividing both terms by their greatest common divisor. The ratio 12:8 simplifies to 3:2. When more than two quantities are compared, extended ratios (a:b:c) are used - a concrete mix of 1:2:4 (cement:sand:gravel) retains the same interpretation: proportional relationships among all listed quantities.',
    ],
    whenToUse: 'Use ratios when comparing the relative sizes of two or more same-unit quantities and the proportion is what matters, not the absolute values. Use a fraction when expressing a part-to-whole relationship. Use a rate when the quantities have different units (e.g., distance per time). Use a percentage when communicating a proportion to a general audience.',
    examples: {
      headers: ['Context', 'Ratio', 'Interpretation'],
      rows: [
        ['Debt-to-equity', '2:1', 'Two dollars of debt for every dollar of equity'],
        ['Map scale', '1:50,000', '1 cm on map = 50,000 cm (500 m) in reality'],
        ['Recipe (flour:sugar)', '3:1', 'Three parts flour to one part sugar'],
        ['Screen aspect ratio', '16:9', 'Width is 16/9 times the height'],
        ['Gear ratio', '4:1', 'Input shaft rotates 4 times per output rotation'],
      ],
    },
    pitfalls: 'Order is not interchangeable. A debt-to-equity ratio of 3:1 is not the same as 1:3. Always state which quantity comes first, and be consistent. When a ratio is written as a single fraction (e.g., 0.75 for a 3:4 ratio), the implied denominator is 1, making it a unit rate - a different concept from the original two-part ratio.',
    faqs: [
      { q: 'How is a ratio different from a fraction?', a: 'A fraction represents a part of a whole: the denominator is the total. A ratio compares two separate quantities: neither term is necessarily the total. In a class with 12 boys and 8 girls, the boy-to-girl ratio is 12:8 (simplified to 3:2), while the fraction of boys in the class is 12/20 = 3/5.' },
      { q: 'How do I simplify a ratio?', a: 'Divide both terms by their greatest common divisor (GCD). For 18:24, the GCD is 6, giving a simplified ratio of 3:4. For multi-term ratios, divide all terms by the GCD of the entire set. The ratio 6:9:15 has a GCD of 3, simplifying to 2:3:5.' },
      { q: 'Can a ratio have more than two terms?', a: 'Yes. An extended ratio compares three or more quantities simultaneously - for example, a paint formula expressed as red:blue:yellow = 2:3:1. The same proportion rules apply: all terms scale together, and simplification uses the GCD of all terms.' },
    ],
  },

  'unit-rate': {
    definition: [
      'A unit rate is a ratio in which the denominator is exactly 1, expressing how much of one quantity corresponds to a single unit of another. The formula is: $$\\text{Unit Rate} = \\frac{\\text{Quantity A}}{1 \\text{ unit of Quantity B}}$$ Common examples include speed (kilometres per 1 hour), price (euros per 1 kilogram), fuel efficiency (litres per 1 kilometre), and productivity (units per 1 worker per hour). The "per one" structure makes unit rates the most intuitive form for direct comparison.',
      'Unit rates are produced by dividing both terms of any ratio by the denominator. A ratio of 240 km driven on 8 litres of fuel becomes a unit rate of 30 km per litre (240 ÷ 8 = 30). This simplification converts a context-specific ratio into a normalised metric that can be compared across different totals.',
      'Unit rates bridge the concepts of ratio and proportion. A unit rate is a simplified ratio; a proportion uses a unit rate to scale to a new quantity. If a machine produces 45 widgets per hour (unit rate), you find how many it produces in 7 hours by multiplying: 45 × 7 = 315.',
    ],
    whenToUse: 'Use unit rates when comparing quantities measured over different totals - comparing prices of different package sizes, speeds over different distances, or productivity of different team sizes. Unit rates are the correct tool whenever you need a normalised, per-one metric.',
    examples: {
      headers: ['Context', 'Raw ratio', 'Unit rate', 'Meaning'],
      rows: [
        ['Speed', '300 km in 4 h', '75 km/h', 'Kilometres per 1 hour'],
        ['Price comparison', '$5.40 for 1.5 kg', '$3.60/kg', 'Cost per 1 kilogram'],
        ['Fuel efficiency', '48 L for 600 km', '0.08 L/km', 'Litres per 1 kilometre'],
        ['Typing speed', '450 words in 6 min', '75 wpm', 'Words per 1 minute'],
        ['Nutrition label', '820 kJ per 200 g', '4.1 kJ/g', 'Kilojoules per 1 gram'],
      ],
    },
    pitfalls: 'Choosing the wrong "unit" for the denominator leads to rates that cannot be compared. If one supermarket advertises price per 100 g and another per kg, they appear incomparable until both are converted to the same unit rate. Always verify that unit rates use identical denominator units before comparing them.',
    faqs: [
      { q: 'What is the difference between a unit rate and a ratio?', a: 'A ratio compares any two quantities - the denominator does not need to be 1. A unit rate is a ratio that has been simplified so the denominator equals 1, expressing the quantity per single unit. Every unit rate is a ratio, but not every ratio is a unit rate.' },
      { q: 'How do I find a unit rate from a ratio?', a: 'Divide both terms of the ratio by the denominator. If a car travels 360 km in 4 hours, divide both by 4: 360 ÷ 4 = 90 km per 1 hour. If a price is $7.50 for 3 kg, divide both by 3: $7.50 ÷ 3 = $2.50 per kg.' },
      { q: 'How are unit rates used to solve proportions?', a: 'Once you have a unit rate, multiply by any desired quantity to scale it. If a printer produces 12 pages per minute (unit rate), it produces 12 × 35 = 420 pages in 35 minutes - equivalent to solving the proportion 12/1 = x/35.' },
    ],
  },

  // ─── Health ──────────────────────────────────────────────────────────────────

  'bmi': {
    definition: [
      'Body Mass Index (BMI) is a screening metric that estimates whether a person\'s weight is appropriate for their height. It is calculated by dividing body weight in kilograms by the square of height in metres: $$\\text{BMI} = \\frac{\\text{weight (kg)}}{\\text{height (m)}^2}$$',
      'The World Health Organization classifies BMI into four primary categories: below 18.5 is underweight, 18.5–24.9 is normal weight, 25.0–29.9 is overweight, and 30.0 or above is obese. Obesity is further subdivided into Class I (30–34.9), Class II (35–39.9), and Class III (≥40).',
      'For adults aged 65 and over, research consistently shows that the optimal BMI range shifts upward to approximately 23–27.5. A slightly higher BMI in older adults is associated with better survival outcomes, greater bone density, and improved resilience during illness - the standard thresholds do not apply directly to this population.',
    ],
    whenToUse: 'Use BMI as a rapid, population-level screening tool to flag individuals who may warrant further metabolic risk assessment. It is appropriate for tracking weight trends in clinical and epidemiological settings. Do not use BMI alone to diagnose obesity or assess cardiovascular risk - pair it with waist circumference, body fat percentage, or DEXA for a complete picture.',
    examples: {
      headers: ['Category', 'BMI range', 'Clinical interpretation'],
      rows: [
        ['Underweight', '< 18.5', 'Risk of malnutrition, osteoporosis, immune suppression'],
        ['Normal weight', '18.5 – 24.9', 'Lowest all-cause mortality risk in general adults'],
        ['Overweight', '25.0 – 29.9', 'Increased risk of metabolic syndrome, type 2 diabetes'],
        ['Obese Class I', '30.0 – 34.9', 'Substantially elevated cardiometabolic risk'],
        ['Obese Class II', '35.0 – 39.9', 'High risk; weight-related comorbidities likely'],
        ['Obese Class III', '≥ 40.0', 'Very high risk; severe functional impairment possible'],
      ],
    },
    pitfalls: 'BMI cannot distinguish fat mass from muscle mass, so a heavily muscled athlete may be classified as overweight or obese despite very low body fat. It also ignores fat distribution - two individuals with identical BMIs but different waist measurements can have vastly different cardiometabolic risk profiles. BMI is less accurate at the individual level than it is as a population-level statistic.',
    faqs: [
      { q: 'Is BMI an accurate measure of health?', a: 'BMI is a useful screening tool at the population level but has well-documented limitations at the individual level. It does not measure body fat directly, does not account for fat distribution, and does not reflect metabolic health markers such as blood pressure, blood glucose, or lipid profiles. It is best used as one input alongside other metrics.' },
      { q: 'What is a healthy BMI for adults?', a: 'For most adults aged 18–65, the WHO-defined healthy range is 18.5–24.9. For adults over 65, evidence supports a slightly higher range of 23–27.5 as optimal for survival and functional health. Ethnic-specific thresholds also exist - South Asian and East Asian populations have higher cardiometabolic risk at lower BMI values, and some guidelines recommend a lower overweight threshold of 23 for these groups.' },
      { q: 'Does BMI apply to athletes?', a: 'Standard BMI thresholds are unreliable for athletes with high muscle mass. A competitive bodybuilder or rugby player may have a BMI of 28–32 with body fat below 12%, which would be misclassified as overweight or obese. For athletic populations, body fat percentage and FFMI provide far more meaningful assessment.' },
    ],
  },

  'body-composition': {
    definition: [
      'Body composition refers to the proportional breakdown of the body into its component tissues. The simplest clinical model is the two-compartment model, which divides body weight into fat mass and fat-free mass (FFM). Fat-free mass encompasses muscle, bone mineral, total body water, and the mass of organs and other non-fat tissues.',
      'The four-compartment (4C) model is the research gold standard. It measures fat mass, bone mineral content, total body water, and residual protein mass independently, rather than lumping them into a single fat-free compartment. This matters because methods that assume a fixed density for fat-free mass introduce errors when an individual\'s bone density or hydration deviates from population averages.',
      'DEXA (dual-energy X-ray absorptiometry) scanning is the most practical clinical gold standard, providing a close approximation of the 4C model with ±1–2% accuracy, segmental data (arms, legs, trunk), and a measure of bone mineral density - all in a single 10-minute scan.',
    ],
    whenToUse: 'Use body composition assessment rather than weight or BMI alone whenever the goal is to distinguish changes in fat mass from changes in lean mass - during a recomposition programme, rehabilitation after injury, or clinical management of sarcopenic obesity (high fat, low muscle in a normal-weight individual). Body composition is the appropriate metric for evaluating whether an intervention is achieving its intended physiological effect.',
    examples: {
      headers: ['Method', 'Accuracy', 'Cost', 'Practicality', 'Notes'],
      rows: [
        ['DEXA scan', '±1–2%', 'Medium', 'Clinic/hospital', 'Clinical gold standard; also measures bone density'],
        ['Hydrostatic weighing', '±1.5–2.5%', 'Medium', 'Specialist facility', 'Accurate but requires full submersion'],
        ['Air displacement (Bod Pod)', '±2–3%', 'Medium', 'Specialist facility', 'Good alternative to hydrostatic; quick'],
        ['Skinfold calipers', '±3–4%', 'Low', 'Field-portable', 'Requires trained technician'],
        ['Navy tape method', '±3–4%', 'None', 'Any setting', 'Practical field estimate'],
        ['BIA (bioimpedance)', '±3–8%', 'Low', 'Consumer device', 'Sensitive to hydration; convenient but imprecise'],
      ],
    },
    pitfalls: 'Body composition methods are not interchangeable - switching methods mid-programme makes progress tracking unreliable. Even within a single method, BIA results can shift by 3–5 percentage points based on the time of day, recent food and water intake, and exercise. Always measure under standardised conditions (morning, fasted, post-void, no prior exercise) and use the same method and device throughout a tracking period.',
    faqs: [
      { q: 'Is body composition a better health indicator than BMI?', a: 'For individuals, yes. Body composition directly quantifies adiposity and lean mass, which are the physiologically meaningful variables underlying metabolic risk. BMI fails to detect normal-weight obesity (adequate BMI, high fat, low muscle) and misclassifies muscular individuals. When resources permit, a DEXA scan or validated tape-measure method provides far more actionable information.' },
      { q: 'How do I improve body composition?', a: 'Improving body composition means decreasing fat mass and/or increasing lean mass. Progressive resistance training is the most evidence-based intervention for increasing lean mass. Moderate caloric restriction combined with adequate protein intake (≥1.6g/kg body weight) drives fat loss while preserving muscle. The combination produces the best simultaneous recomposition outcomes, particularly in individuals new to training.' },
    ],
  },

  'body-fat-percentage': {
    definition: [
      'Body fat percentage is the proportion of total body weight that consists of adipose (fat) tissue, expressed as a percentage: $$\\text{Body Fat \\%} = \\frac{\\text{Fat Mass (kg)}}{\\text{Total Body Weight (kg)}} \\times 100$$',
      'Fat tissue serves essential physiological roles: hormone regulation (leptin, oestrogen), organ protection, thermal insulation, and energy storage. The body requires a minimum level of fat - termed essential fat - to maintain these functions: approximately 2–5% in men and 10–13% in women. Below these thresholds, hormonal and organ function are compromised.',
      'Healthy body fat ranges vary by sex and age. General reference ranges for adults are: men 8–19% (fit to acceptable), women 21–33% (fit to acceptable). Athletes typically fall below these ranges, and body fat naturally increases with age even when weight remains stable, due to the gradual replacement of lean tissue with fat.',
    ],
    whenToUse: 'Use body fat percentage when you need a direct assessment of adiposity that is independent of muscle mass. It is the preferred metric for tracking body composition changes during training, dieting, or clinical weight management programmes - particularly where BMI would be misleading, such as with muscular individuals, post-menopausal women, and the elderly.',
    examples: {
      headers: ['Category', 'Men', 'Women', 'Notes'],
      rows: [
        ['Essential fat', '2–5%', '10–13%', 'Minimum required for physiological function'],
        ['Athletic', '6–13%', '14–20%', 'Competitive athletes, visible muscle definition'],
        ['Fit', '14–17%', '21–24%', 'Active individuals, good metabolic health'],
        ['Acceptable', '18–24%', '25–31%', 'Average range, low-to-moderate health risk'],
        ['Obese', '≥ 25%', '≥ 32%', 'Elevated cardiometabolic risk'],
      ],
    },
    pitfalls: 'No single measurement method is perfectly accurate. BIA devices - including most consumer smart scales - are highly sensitive to hydration status and can vary by 3–5 percentage points on the same person on the same day. Even DEXA, the clinical gold standard, carries ±1–2% measurement error. Always compare results from the same method to track changes meaningfully.',
    faqs: [
      { q: 'What is a healthy body fat percentage?', a: 'For men aged 20–39, a healthy range is approximately 8–19%; for women aged 20–39, 21–32%. These ranges shift upward with age as lean mass naturally declines. "Healthy" is also context-dependent - an endurance athlete at 7% body fat may be healthy; a sedentary person at the same level may be experiencing hormonal suppression.' },
      { q: 'Is body fat percentage a better measure than BMI?', a: 'For individuals, yes - body fat percentage directly measures adiposity and is not confounded by muscle mass. However, it requires specialised equipment or estimation methods, whereas BMI requires only a scale and tape measure. The two metrics are complementary: BMI is practical for population screening, body fat percentage is superior for individual assessment.' },
      { q: 'How is body fat percentage measured?', a: 'Methods range in accuracy. DEXA and hydrostatic weighing are the most accurate clinical methods. The US Navy tape method uses waist, neck, and (for women) hip circumferences in a validated formula and is a practical field approximation. BIA devices are convenient but less reliable. Skinfold calipers in trained hands can achieve accuracy comparable to DEXA.' },
    ],
  },

  'ffmi': {
    definition: [
      'Fat-Free Mass Index (FFMI) is a measure of muscularity that expresses lean body mass relative to height, analogous to BMI but using fat-free mass instead of total weight: $$\\text{FFMI} = \\frac{\\text{LBM (kg)}}{\\text{height (m)}^2}$$',
      'Because FFMI varies slightly with height, a normalised version corrects for this: $$\\text{Normalised FFMI} = \\text{FFMI} + 6.1 \\times (1.8 - \\text{height in metres})$$ This adjustment standardises FFMI to a reference height of 1.80m, making comparisons across individuals of different heights more meaningful.',
      'FFMI gained research prominence from a landmark 1995 study by Kouri et al., which found that among a large sample of male athletes, natural (drug-free) competitors almost never exceeded an FFMI of 25. This led to the informal use of 25 as a threshold above which performance-enhancing drug use is considered plausible, though it is not a definitive marker.',
    ],
    whenToUse: 'Use FFMI to assess the degree of muscularity relative to frame size, independent of body fat levels - something BMI cannot do. It is particularly useful for evaluating physique development over time in athletes and for providing context when BMI would be misleading due to high muscle mass. Use normalised FFMI when comparing individuals of substantially different heights.',
    examples: {
      headers: ['FFMI range', 'Category', 'Typical profile'],
      rows: [
        ['< 18', 'Below average', 'Untrained, low muscle mass'],
        ['18 – 20', 'Average', 'Recreationally active, limited training history'],
        ['20 – 22', 'Above average', 'Consistent training, visible muscle development'],
        ['22 – 23', 'Excellent', 'Serious amateur athlete, advanced training'],
        ['23 – 25', 'Superior', 'Elite natural athlete, years of progressive training'],
        ['> 25', 'Suspicious', 'Rarely achieved naturally; PED use plausible'],
      ],
    },
    pitfalls: 'The FFMI >25 threshold for suspected PED use is a statistical observation from one study population, not a diagnostic criterion. Some natural athletes with exceptional genetics and long training histories may exceed 25. Conversely, PED users below 25 are common. FFMI also depends on accurate body fat measurement - errors in body fat estimation directly distort FFMI.',
    faqs: [
      { q: 'What is a good FFMI?', a: 'For men, an FFMI of 20–22 reflects above-average muscular development achievable with consistent training. Reaching 23–25 typically requires years of progressive resistance training, optimal nutrition, and favourable genetics. For women, average FFMI values are roughly 3–4 points lower than men due to physiological differences in muscle mass potential.' },
      { q: 'What is the natural FFMI limit?', a: 'The Kouri 1995 study found that drug-free male bodybuilders rarely exceeded an FFMI of 25. Subsequent research and natural bodybuilding competition data generally support this as an approximate upper boundary for most natural male athletes. For women, the equivalent ceiling is estimated at approximately 21–22.' },
      { q: 'How does FFMI differ from BMI?', a: 'BMI uses total body weight, so it cannot distinguish a 90kg bodybuilder at 8% body fat from a 90kg sedentary person at 30% body fat - both would have the same BMI. FFMI uses only the lean (fat-free) component of weight, making it a direct measure of muscularity rather than overall body size.' },
    ],
  },

  'ideal-body-weight': {
    definition: [
      'Ideal body weight (IBW) is a clinically estimated target weight derived from height and sex, originally developed to guide drug dosing rather than to define an aesthetic or fitness goal. The most widely used formula is the Devine formula (1974): For men: $$\\text{IBW} = 50 + 2.3 \\times (\\text{height in inches} - 60)$$ For women: $$\\text{IBW} = 45.5 + 2.3 \\times (\\text{height in inches} - 60)$$',
      'Several alternative formulas exist. The Robinson formula (1983) uses slightly different coefficients. The Miller formula (1983) produces lower estimates. The Hamwi formula (1964) is an older rule-of-thumb. All four formulas were empirically derived from population data and produce meaningfully different results, particularly at the extremes of height.',
      'IBW was created for pharmacokinetic applications - specifically for calculating doses of renally-cleared and volume-of-distribution-sensitive drugs in patients where total body weight would lead to overdosing. Its use as a general weight target is a secondary application that has outgrown its original clinical purpose.',
    ],
    whenToUse: 'Use IBW as a reference baseline when calculating adjusted body weight for drug dosing in obese patients, or as a starting point for nutritional assessment in clinical settings. For general weight management, use IBW alongside BMI, body fat percentage, and waist circumference rather than as a precise personal target.',
    examples: {
      headers: ['Height', 'Devine IBW (men)', 'Devine IBW (women)', 'Robinson IBW (men)', 'Robinson IBW (women)'],
      rows: [
        ['160 cm (5\'3")', '54.9 kg', '50.4 kg', '56.4 kg', '53.1 kg'],
        ['170 cm (5\'7")', '64.1 kg', '59.6 kg', '65.8 kg', '59.9 kg'],
        ['175 cm (5\'9")', '68.6 kg', '64.1 kg', '70.5 kg', '63.3 kg'],
        ['183 cm (6\'0")', '75.5 kg', '70.9 kg', '77.6 kg', '69.4 kg'],
      ],
    },
    pitfalls: 'IBW formulas do not account for body composition, frame size, age, ethnicity, or fitness level. A muscular man at 175cm weighing 80kg is well above the Devine IBW of approximately 68kg but may be in excellent health. Conversely, someone meeting their IBW with low muscle mass and high fat may have significant metabolic risk despite being at their "ideal" weight.',
    faqs: [
      { q: 'How accurate is ideal body weight?', a: 'IBW formulas are empirical estimates with wide confidence intervals. Studies comparing the four major formulas find they can differ by 5–10kg for the same individual. IBW is most useful as a clinical dosing reference; it is a poor tool for individual weight goal-setting.' },
      { q: 'Which ideal body weight formula is best?', a: 'No formula is universally superior - the choice depends on the clinical context. The Devine formula remains the most widely used in clinical pharmacokinetics. For non-clinical purposes, BMI combined with body fat percentage provides more individually meaningful targets.' },
      { q: 'Why do different IBW formulas give different answers?', a: 'Each formula was developed from a different dataset using different reference populations. Devine (1974) was based on lung function research; Hamwi (1964) was a simple rule-of-thumb for diabetes management; Robinson and Miller (1983) re-analysed Metropolitan Life Insurance tables. Because they used different statistical methods and populations, they produce meaningfully different results.' },
    ],
  },

  'lean-body-mass': {
    definition: [
      'Lean body mass (LBM) is everything in the body that is not fat - including skeletal muscle, bone mineral, organs, blood, skin, and total body water. It is calculated as: $$\\text{LBM} = \\text{Total Body Weight} - \\text{Fat Mass}$$',
      'LBM is the primary determinant of basal metabolic rate (BMR): more lean mass means a higher resting energy expenditure. It is also the basis for drug dosing in pharmacokinetics, as many medications distribute through lean tissue rather than fat - using total body weight for dosing in obese patients would result in dangerous over-dosing of these agents.',
      'The Boer formula is the most widely cited clinical estimation method. For men: $$\\text{LBM} = 0.407W + 0.267H - 19.2$$ For women: $$\\text{LBM} = 0.252W + 0.473H - 48.3$$ where W is weight in kg and H is height in cm. The James and Hume formulas are alternatives used in specific clinical contexts.',
    ],
    whenToUse: 'Use LBM when calculating drug doses for antibiotics, anaesthetic agents, or chemotherapy drugs that distribute in lean tissue. Use it to set protein intake targets in athletic or clinical nutrition (typically 1.6–2.2g protein per kg LBM for resistance-trained individuals). Use it as an input to FFMI to assess muscularity relative to height independently of body fat level.',
    examples: {
      headers: ['Individual', 'Total weight', 'Body fat %', 'Fat mass', 'Lean body mass'],
      rows: [
        ['75 kg man, 15% fat', '75 kg', '15%', '11.3 kg', '63.7 kg'],
        ['75 kg man, 25% fat', '75 kg', '25%', '18.8 kg', '56.3 kg'],
        ['65 kg woman, 25% fat', '65 kg', '25%', '16.3 kg', '48.8 kg'],
        ['65 kg woman, 35% fat', '65 kg', '35%', '22.8 kg', '42.3 kg'],
      ],
    },
    pitfalls: 'LBM is often conflated with muscle mass, but the two are not the same - lean body mass includes bone, organs, blood, and water, which together account for a large fraction of LBM. A person can gain or lose several kilograms of LBM through hydration changes alone without any change in actual muscle tissue.',
    faqs: [
      { q: 'What is the difference between lean body mass and muscle mass?', a: 'Lean body mass is the total weight of all non-fat tissue - muscle, bone, organs, blood, skin, and water. Muscle mass refers specifically to skeletal muscle tissue. In a typical adult, skeletal muscle accounts for roughly 40–50% of LBM in men and 35–40% in women. The remainder is bone, organs, blood, and water.' },
      { q: 'How do I increase lean body mass?', a: 'Progressive resistance training is the most evidence-based method for increasing skeletal muscle. Adequate protein intake (1.6–2.2g per kg of body weight per day) is required to support muscle protein synthesis. LBM decreases with age (sarcopenia) at approximately 3–8% per decade after age 30 without deliberate training.' },
    ],
  },

  'waist-circumference': {
    definition: [
      'Waist circumference is a direct measure of abdominal adiposity - the accumulation of fat in the trunk region. It is measured at the narrowest point of the torso, typically at or just above the navel, and is a strong independent predictor of metabolic disease risk beyond what BMI captures.',
      'The WHO defines two risk thresholds for each sex. For men: ≥94 cm indicates increased risk; ≥102 cm indicates high risk. For women: ≥80 cm indicates increased risk; ≥88 cm indicates high risk. These thresholds were derived from European populations; some guidelines recommend lower cut-points for South Asian, East Asian, and other ethnic groups where cardiometabolic risk increases at smaller waist sizes.',
      'The clinical significance of waist circumference lies in what it captures that BMI cannot: visceral adipose tissue (VAT). Visceral fat surrounds the abdominal organs and is metabolically active in ways that subcutaneous fat is not - it drives insulin resistance, systemic inflammation, dyslipidaemia, and hypertension at higher rates than the same quantity of subcutaneous fat.',
    ],
    whenToUse: 'Use waist circumference alongside BMI to stratify cardiometabolic risk, particularly in individuals with BMI in the overweight range (25–29.9) where clinical significance is ambiguous. It is especially valuable for identifying normal-weight individuals with central adiposity - those with a healthy BMI but an elevated waist measurement - who carry metabolic risk that BMI alone would miss.',
    examples: {
      headers: ['Risk category', 'Men (waist)', 'Women (waist)', 'Associated health risk'],
      rows: [
        ['Low', '< 94 cm', '< 80 cm', 'Baseline population risk'],
        ['Increased', '94 – 101 cm', '80 – 87 cm', 'Elevated risk of T2DM, CVD, hypertension'],
        ['High', '≥ 102 cm', '≥ 88 cm', 'Substantially elevated cardiometabolic risk'],
      ],
    },
    pitfalls: 'Waist circumference measurement is highly sensitive to technique. Measuring at the wrong anatomical landmark (e.g., at the iliac crest or at the umbilicus on an obese individual where the navel is not at the natural waist) introduces significant variability. The tape must be horizontal, snug but not compressing skin, and the measurement taken at the end of a normal exhale.',
    faqs: [
      { q: 'What is a healthy waist circumference?', a: 'Based on WHO thresholds for European-descent populations, below 94 cm for men and below 80 cm for women is considered low risk. Many clinicians also use the waist-to-height ratio (WHtR), with a value below 0.5 (waist less than half of height) associated with lower cardiometabolic risk across a broad range of ethnic groups and ages.' },
      { q: 'Why is waist circumference important beyond BMI?', a: 'Waist circumference specifically reflects visceral fat, which is far more metabolically harmful than subcutaneous fat stored in the hips and thighs. Studies consistently show that waist circumference predicts type 2 diabetes, cardiovascular disease, and all-cause mortality independently of BMI. Adding waist circumference to BMI reclassifies a meaningful proportion of individuals into higher or lower risk categories compared to BMI alone.' },
      { q: 'How do I measure waist circumference correctly?', a: 'Stand upright with feet together. Locate the natural waist - the narrowest part of the torso, just above the top of the hip bones and just above the navel. Wrap a flexible, non-elastic tape measure horizontally around this point, touching the skin but not compressing it. Take the measurement at the end of a normal exhale. Take two readings and average them; if they differ by more than 1 cm, take a third.' },
    ],
  },

  'roi': {
    definition: [
      'Return on Investment (ROI) measures how much an investment gains or loses relative to its cost. It is calculated by subtracting the initial cost from the final value, dividing by the initial cost, and multiplying by 100 to express the result as a percentage. A positive ROI means the investment was profitable; a negative ROI means it lost money.',
      'ROI\'s power lies in its universality: it reduces any investment - a stock purchase, a marketing campaign, a factory machine, or a new hire - to a single comparable percentage. A marketing campaign that cost $10,000 and generated $40,000 in attributable revenue has an ROI of 300%, making it directly comparable to a $50,000 equipment upgrade that saves $15,000 per year (30% annual ROI).',
      'The main limitation of simple ROI is that it ignores time. An ROI of 50% is excellent in one year but mediocre over a decade. For multi-year investments, CAGR (Compound Annual Growth Rate) is the more useful companion metric, as it converts total ROI into an annualised rate that accounts for the time value of money.',
    ],
    whenToUse: 'Use ROI as a first-pass filter to compare mutually exclusive investments or marketing channels. Pair it with CAGR for any investment spanning more than one year. Do not use standalone ROI to compare investments with very different time horizons without also computing the annualised rate.',
    examples: {
      headers: ['Investment', 'Initial Cost', 'Final Value', 'Net Return', 'ROI'],
      rows: [
        ['Stock purchase', '$10,000', '$14,500', '$4,500', '45%'],
        ['Marketing campaign', '$5,000', '$18,000', '$13,000', '260%'],
        ['Equipment upgrade', '$80,000', '$95,000', '$15,000', '18.75%'],
        ['Failed product launch', '$25,000', '$12,000', '−$13,000', '−52%'],
      ],
    },
    pitfalls: 'ROI is easily manipulated by choosing what counts as "cost" or "return." A marketing ROI calculation that includes only ad spend but ignores agency fees, creative production, and staff time will be significantly inflated. Always use fully-loaded costs. For capital investments, also compare ROI against the company\'s weighted average cost of capital (WACC) - a 10% ROI is not attractive if the company\'s cost of capital is 12%.',
    faqs: [
      { q: 'What is a good ROI?', a: 'There is no universal benchmark - it depends on the investment type, risk level, and time horizon. Stock market investors historically target 7–10% annualised (inflation-adjusted). Marketing campaigns are often evaluated against a minimum 3:1 return ($3 return per $1 spent, i.e., 200% ROI). The only valid comparison is against the opportunity cost: what else could the capital have earned?' },
      { q: 'What is the difference between ROI and CAGR?', a: 'ROI measures total return over the full investment period regardless of length. CAGR converts that total return into an equivalent annual rate, enabling fair comparison across investments held for different periods. A 100% ROI over 2 years equals a CAGR of approximately 41.4%; the same 100% ROI over 5 years equals a CAGR of 14.9%.' },
      { q: 'How does ROI differ from ROE?', a: 'ROI is a general-purpose investment return metric that applies to any asset. ROE (Return on Equity) is a specific corporate finance metric comparing net income to shareholders\' equity - it measures management\'s efficiency in using owner capital. A company\'s overall ROE informs investors; project-level ROI informs internal capital allocation decisions.' },
    ],
  },

  'cagr': {
    definition: [
      'CAGR (Compound Annual Growth Rate) is the annualised growth rate that would take an investment from its starting value to its ending value if it grew at a constant rate each year with compounding. Because most investments do not grow at a perfectly steady rate, CAGR is a mathematical smoothing of actual year-to-year performance into a single representative annual figure.',
      'The formula uses exponents: the ratio of End Value to Start Value is raised to the power of 1/n (where n is the number of years), and 1 is subtracted. This is the inverse of the compound interest formula - instead of calculating future value from a known rate, CAGR derives the implied rate from known values.',
      'CAGR is the standard language of investment performance. When a fund says it has "returned 12% annually over 10 years," that is a CAGR. It is equally applicable to revenue growth ("our revenues CAGR\'d at 25% over 5 years"), user growth, or any time-series metric where you want to describe the average annual pace of change.',
    ],
    whenToUse: 'Use CAGR whenever you need to compare growth rates across different time periods or different investments. It is the right tool when evaluating fund performance, revenue growth trajectories, or multi-year ROI on capital projects. Do not use CAGR to represent volatile investments where interim drawdowns are important - CAGR ignores path, showing only start and end.',
    examples: {
      headers: ['Scenario', 'Start Value', 'End Value', 'Years', 'CAGR'],
      rows: [
        ['Stock portfolio', '$50,000', '$92,500', '5', '13.1%'],
        ['Company revenue', '$2,000,000', '$6,200,000', '8', '15.2%'],
        ['Real estate', '$300,000', '$480,000', '10', '4.8%'],
        ['Savings account', '$10,000', '$13,400', '6', '5.0%'],
      ],
    },
    pitfalls: 'CAGR\'s biggest weakness is that it ignores volatility. An investment that doubles then halves has a CAGR of 0%, yet no investor who lived through the experience would describe it as a stable 0% return. For volatile assets, always present CAGR alongside standard deviation or maximum drawdown to give a complete picture of the risk taken to achieve the return.',
    faqs: [
      { q: 'What is the difference between CAGR and average annual return?', a: 'Simple average return sums year-by-year percentages and divides by the number of years. CAGR derives the geometric mean - the single constant rate that produces the actual end value from the actual start value. For volatile investments, CAGR will always be lower than the arithmetic average return, and the gap widens with volatility. CAGR is the more accurate representation of investor experience.' },
      { q: 'What is a good CAGR for a business?', a: 'Context determines the benchmark. A high-growth startup might target 40–100%+ CAGR in early years. Established companies are often valued on 10–20% revenue CAGR. The S&P 500 has historically produced roughly 10% nominal CAGR (7% inflation-adjusted) over long periods. Always compare against industry peers and factor in the stage of the business.' },
      { q: 'Can CAGR be negative?', a: 'Yes. If the end value is lower than the start value, CAGR will be negative, indicating compound annual decline. This is common for distressed assets, declining industries, or portfolios measured over bear market periods.' },
    ],
  },

  'compound-interest': {
    definition: [
      'Compound interest is interest calculated on the accumulated balance, not just the original principal. Each period, the interest earned is added to the principal, and the next period\'s interest is then earned on this larger combined balance. This creates a compounding feedback loop: the more you have, the more you earn, the more you have.',
      'The standard formula is A = P(1 + r/n)^(nt), where A is the final amount, P is the principal, r is the annual interest rate (as a decimal), n is the number of compounding periods per year, and t is the number of years. Monthly compounding (n = 12) produces a slightly higher return than annual compounding (n = 1) for the same stated annual rate.',
      'Compounding frequency matters significantly over long time horizons. $100,000 invested at 8% per year for 30 years grows to $1,006,266 with annual compounding, but to $1,020,808 with daily compounding - a difference of $14,542 simply from the compounding schedule. At higher rates and longer periods, this gap widens substantially.',
    ],
    whenToUse: 'Use compound interest calculations for any long-term savings, investment, or debt scenario. For investments, use it to project what a lump sum grows to, or reverse-engineer the rate required to reach a target. For debt (mortgages, credit cards, student loans), compound interest explains why carrying balances is so costly - interest accrues on interest.',
    examples: {
      headers: ['Principal', 'Rate', 'Compounding', 'Years', 'Final Balance', 'Total Interest'],
      rows: [
        ['$10,000', '6%', 'Annual', '20', '$32,071', '$22,071'],
        ['$10,000', '6%', 'Monthly', '20', '$33,102', '$23,102'],
        ['$50,000', '8%', 'Monthly', '30', '$544,572', '$494,572'],
        ['$1,000', '20% (credit card)', 'Monthly', '5', '$2,653', '$1,653'],
      ],
    },
    pitfalls: 'Do not confuse nominal and effective interest rates. A 12% annual rate compounding monthly has an effective annual rate (EAR) of 12.68% - this is the true annual cost of borrowing. Lenders are typically required to disclose APR (Annual Percentage Rate), which may or may not reflect compounding depending on jurisdiction. Always check whether a quoted rate is nominal or effective.',
    faqs: [
      { q: 'What is the difference between compound and simple interest?', a: 'Simple interest is calculated only on the original principal: Interest = P × r × t. Compound interest is calculated on the principal plus all previously accumulated interest. For short periods and low rates, the difference is minimal. Over decades, the gap becomes enormous - simple interest grows linearly, compound interest grows exponentially.' },
      { q: 'How does the Rule of 72 relate to compound interest?', a: 'The Rule of 72 is a mental shortcut for compound interest: divide 72 by the annual interest rate to estimate how many years it takes to double your money. At 6%, money doubles in approximately 12 years (72 ÷ 6). At 9%, it doubles in roughly 8 years. This works because of the mathematical properties of the compound interest exponential.' },
      { q: 'Does compound interest apply to stocks?', a: 'Not directly - stocks do not pay a fixed interest rate. But the concept of compounding applies to investment returns through reinvested dividends and retained earnings that generate future earnings. The term "compounding" in equity investing refers to the same exponential growth principle, applied to variable returns.' },
    ],
  },

  'current-ratio': {
    definition: [
      'The current ratio divides a company\'s current assets (cash, receivables, inventory - anything convertible to cash within 12 months) by its current liabilities (accounts payable, short-term debt, accrued expenses - obligations due within 12 months). The result shows how many dollars of liquid assets cover each dollar of short-term obligations.',
      'A current ratio above 1.0 means the company can theoretically meet all short-term obligations using its liquid assets. A ratio below 1.0 - sometimes called a working capital deficit - means current liabilities exceed current assets, which signals reliance on future cash generation or credit facilities to meet near-term payments.',
      'The current ratio is one of three core liquidity ratios. The quick ratio (or acid test) excludes inventory, which may not be quickly liquidable. The cash ratio is the most stringent, counting only cash and cash equivalents. Each gives a progressively more conservative view of short-term solvency.',
    ],
    whenToUse: 'Use the current ratio for a quick liquidity health check when reviewing a company\'s balance sheet. A ratio of 1.5–2.5 is generally considered healthy for most industrial companies. For retail businesses with fast inventory turnover, 1.2 may be adequate. SaaS and service businesses with minimal inventory often maintain ratios above 3. Lenders and credit analysts use it to set short-term debt covenants.',
    examples: {
      headers: ['Current Assets', 'Current Liabilities', 'Current Ratio', 'Liquidity Signal'],
      rows: [
        ['$5,000,000', '$2,000,000', '2.50', 'Strong - ample buffer'],
        ['$3,000,000', '$2,500,000', '1.20', 'Adequate - monitor closely'],
        ['$1,800,000', '$2,200,000', '0.82', 'Weak - working capital deficit'],
        ['$500,000', '$500,000', '1.00', 'Break-even - zero buffer'],
      ],
    },
    pitfalls: 'A high current ratio is not always positive. A ratio of 5.0 may indicate the company is holding excessive cash or has slow-moving inventory - signs of poor capital efficiency. A falling ratio over time can indicate improving efficiency (moving faster) or deteriorating liquidity (taking on more short-term debt). Always analyse trend, not just the point-in-time ratio.',
    faqs: [
      { q: 'What is a good current ratio?', a: 'The common benchmark is 1.5 to 2.0 for manufacturing and industrial companies. Retailers and grocery chains often operate efficiently below 1.0 because they collect cash from customers before paying suppliers (negative working capital cycle). Technology and SaaS companies often run above 3.0. The meaningful comparison is always against industry peers, not an absolute number.' },
      { q: 'What is the difference between current ratio and quick ratio?', a: 'The quick ratio (acid test) subtracts inventory from current assets before dividing by current liabilities. This removes the least liquid current asset - inventory that may take months to sell. A company with $5M in current assets, $2M of which is slow-moving inventory, has a current ratio of 2.5 but a quick ratio of only 1.5. The quick ratio is a more conservative test of immediate liquidity.' },
      { q: 'Can the current ratio be negative?', a: 'No - both current assets and current liabilities are always positive numbers, so the ratio itself is always positive. A current ratio below 1.0 means current liabilities exceed current assets (negative working capital), but the ratio is still a positive number.' },
    ],
  },

  'break-even-point': {
    definition: [
      'The break-even point (BEP) is the exact level of sales volume at which total revenue equals total costs - the business earns no profit and incurs no loss. Below the break-even point, the business runs at a loss. Above it, every additional unit sold generates pure profit equal to the contribution margin per unit.',
      'Break-even analysis separates costs into two types: fixed costs (rent, salaries, insurance - unchanged regardless of volume) and variable costs (materials, commissions - rising proportionally with volume). The key derived metric is the contribution margin: Price minus Variable Cost Per Unit. This is the amount each sold unit contributes toward covering fixed costs before generating profit.',
      'Break-even can be expressed in units (how many to sell) or in revenue (what sales volume to achieve). The revenue break-even is useful when the business sells a mix of products at different price points. Both rely on the same underlying logic: fixed costs divided by contribution margin in the relevant units.',
    ],
    whenToUse: 'Use break-even analysis before launching a new product, service, or business to determine the minimum viable volume. It is equally useful for pricing decisions (what happens to BEP if price increases by 10%?), capacity planning, and evaluating the impact of a cost structure change. The margin of safety - actual sales minus break-even sales - shows how much revenue can decline before the business enters a loss.',
    examples: {
      headers: ['Fixed Costs', 'Price/Unit', 'Variable Cost/Unit', 'CM/Unit', 'Break-Even Units', 'Break-Even Revenue'],
      rows: [
        ['$50,000', '$25', '$10', '$15', '3,333', '$83,333'],
        ['$200,000', '$100', '$40', '$60', '3,333', '$333,333'],
        ['$500,000', '$50', '$20', '$30', '16,667', '$833,333'],
        ['$30,000', '$15', '$9', '$6', '5,000', '$75,000'],
      ],
    },
    pitfalls: 'Break-even analysis assumes a constant price and constant variable cost per unit - conditions that rarely hold in practice. Price discounts for bulk orders, volume-driven input cost reductions, and step-fixed-cost increases all invalidate a simple linear model. For multi-product businesses, the mixed break-even requires sales-mix assumptions that may not hold. Always treat break-even as a directional tool, not a precise forecast.',
    faqs: [
      { q: 'What is the margin of safety?', a: 'Margin of safety is the gap between actual (or projected) revenue and break-even revenue, expressed as a percentage: (Actual Revenue − Break-Even Revenue) / Actual Revenue × 100. It shows how much revenue can fall before the business becomes unprofitable. A 30% margin of safety means revenue can drop 30% before losses begin. Higher is safer; below 10% is considered precarious.' },
      { q: 'How does a price increase affect the break-even point?', a: 'A price increase raises the contribution margin (Price − Variable Cost), which lowers the break-even point. Raising price from $25 to $28 on a product with $10 variable cost increases CM from $15 to $18 - reducing break-even units by 17%. This is why pricing power is one of the most important drivers of business economics.' },
      { q: 'Can break-even analysis be used for services?', a: 'Yes. For service businesses, variable cost is typically the direct labour cost per service delivered, and price is the fee charged per service. A consulting firm with $200,000 in monthly overhead, charging $5,000 per engagement at $1,500 in direct costs per engagement, has a break-even of 57 engagements per month.' },
    ],
  },

  'contribution-margin': {
    definition: [
      'Contribution Margin (CM) is the revenue remaining after all variable costs are deducted. It represents the amount each unit sold contributes toward covering fixed costs and, once fixed costs are fully covered, to operating profit. It is calculated at the total level (CM = Revenue − Variable Costs) or at the per-unit level (CM per unit = Price − Variable Cost per Unit).',
      'Contribution Margin Ratio (CM Ratio) expresses CM as a percentage of revenue, showing how many cents out of every revenue dollar are available to cover fixed costs and profit. A 60% CM Ratio means for every $100 in sales, $60 is available for fixed costs and profit - the other $40 is consumed by variable costs.',
      'CM differs from Gross Profit in an important way: COGS typically includes some fixed manufacturing overhead, while CM\'s variable cost definition includes only truly variable expenses. For decision-making - whether to accept a specific order, which product to prioritise, what happens if volume changes - CM is more decision-relevant than gross profit.',
    ],
    whenToUse: 'Use Contribution Margin for product mix decisions (which products to prioritise with limited capacity), pricing analysis (is a discounted order still worth accepting?), break-even calculations, and evaluating the profit impact of volume changes. The rule: accept any incremental order priced above variable cost - it contributes something toward fixed costs even if it is below full cost.',
    examples: {
      headers: ['Product', 'Price', 'Variable Cost', 'CM / Unit', 'CM Ratio', 'Fixed Allocation', 'Full-Cost Profit'],
      rows: [
        ['Product A', '$80', '$32', '$48', '60%', '$30', '$18'],
        ['Product B', '$50', '$35', '$15', '30%', '$20', '−$5'],
        ['Product C', '$120', '$50', '$70', '58%', '$60', '$10'],
      ],
    },
    pitfalls: 'Focusing solely on CM can lead to decisions that look good in the short term but are strategically harmful. Product B in the example above has negative full-cost profit but positive CM - so it contributes toward fixed costs in the short run. But relying on low-CM products long-term prevents the business from covering its fixed cost base. Always evaluate CM in context of the overall product mix and strategic capacity constraints.',
    faqs: [
      { q: 'What is the difference between contribution margin and gross profit?', a: 'Gross Profit = Revenue − COGS, where COGS typically includes both variable costs (materials, direct labour) and fixed manufacturing overhead (factory rent, production staff salaries). Contribution Margin = Revenue − Variable Costs only. For a manufacturer with $500,000 in fixed factory overhead spread across 100,000 units, each unit carries $5 of fixed cost in COGS but nothing in its variable cost. In that case, CM per unit will be $5 higher than gross profit per unit.' },
      { q: 'How does contribution margin relate to break-even?', a: 'Break-even is directly derived from CM: Break-Even Units = Fixed Costs ÷ CM per Unit. Increasing CM (by raising prices or cutting variable costs) directly reduces the break-even volume. This makes CM improvement one of the most powerful levers for business model health.' },
      { q: 'What is a good contribution margin ratio?', a: 'It varies significantly by industry. SaaS and software companies typically have CM Ratios of 60–80% because variable costs (hosting, payment processing) are very low. Service businesses range from 30–60%. Manufacturing 30–50%. Retail and distribution 20–40%. There is no universal benchmark - compare against industry peers and evaluate trend over time.' },
    ],
  },

  'pe-ratio': {
    definition: [
      'The P/E Ratio (Price-to-Earnings) is calculated by dividing a company\'s current stock price by its Earnings Per Share (EPS). It is the most widely cited equity valuation multiple because it directly answers the investor\'s most fundamental question: how much am I paying for each dollar of annual profit?',
      'The trailing P/E uses the most recent 12 months of reported EPS (also called LTM - last twelve months). The forward P/E uses consensus analyst estimates for the next 12 months of expected EPS. Forward P/E is typically lower than trailing P/E for growing companies (because earnings are expected to rise) and is the more decision-relevant figure for forward-looking investors.',
      'The inverse of the P/E - EPS divided by Price - is the earnings yield, expressed as a percentage. It makes P/E directly comparable to bond yields. A P/E of 20 implies a 5% earnings yield. If a 10-year government bond yields 4.5%, the equity risk premium is modest. If bonds yield 2%, the equity risk premium is more comfortable.',
    ],
    whenToUse: 'Use P/E as a first-pass relative valuation: compare a company\'s P/E to its own historical range, to sector peers, and to the broader market index. A company trading at a P/E of 35 when peers average 18 is either higher quality, higher growth - or overvalued. Use forward P/E for growth companies where trailing earnings understate future profit potential.',
    examples: {
      headers: ['Company', 'Stock Price', 'EPS (TTM)', 'Trailing P/E', 'Earnings Yield', 'Sector Avg P/E', 'Relative Premium'],
      rows: [
        ['Growth Tech', '$180', '$4.50', '40x', '2.5%', '28x', '+43%'],
        ['Mature Retail', '$45', '$4.50', '10x', '10%', '12x', '−17%'],
        ['Utility', '$60', '$4.00', '15x', '6.7%', '16x', '−6%'],
        ['Pharma', '$120', '$8.00', '15x', '6.7%', '18x', '−17%'],
      ],
    },
    pitfalls: 'P/E is meaningless for companies with negative earnings and misleading during earnings distortions (one-off charges, litigation settlements). A very low P/E can signal value or a value trap - a business in terminal decline. A high P/E requires high future earnings growth to justify; if growth disappoints, multiple compression can cause significant stock price declines even if the business remains fundamentally sound.',
    faqs: [
      { q: 'What is a fair P/E ratio?', a: 'There is no universal fair P/E. The Shiller CAPE (cyclically adjusted P/E, averaging 10 years of real earnings) has historically averaged around 16–17 for the S&P 500, though this has risen significantly since 2010. Growth companies with 20–30% earnings growth can warrant P/Es of 30–50 if the growth materialises. The relevant comparison is always the company\'s earnings growth rate relative to the P/E - the PEG ratio (P/E divided by growth rate) adjusts for this.' },
      { q: 'Can P/E be negative?', a: 'P/E is undefined - not negative - when EPS is negative because the company has negative earnings. Some systems display a negative P/E in this case, but it is not analytically meaningful. For loss-making companies, analysts typically use Price/Sales, EV/Revenue, or a DCF model instead.' },
      { q: 'What is the difference between P/E and EV/EBITDA?', a: 'P/E is an equity-level metric using share price and per-share earnings - affected by capital structure (leverage) and tax. EV/EBITDA is a firm-level metric using Enterprise Value (equity + debt − cash) and pre-tax, pre-depreciation earnings - making it capital-structure neutral. EV/EBITDA is preferred for comparing companies with different leverage or tax profiles and is the dominant metric in M&A. P/E is easier to understand and more widely reported in public equity markets.' },
    ],
  },

  'eps': {
    definition: [
      'Earnings Per Share (EPS) translates a company\'s total net income into a per-share figure, enabling investors to compare profitability across companies of vastly different sizes. A $10B company and a $500M company both reporting $1.00 EPS can be compared directly on the P/E ratio - something impossible when comparing total net income alone.',
      'Basic EPS uses the weighted average shares outstanding during the period. Diluted EPS - the figure that typically receives more analytical attention - adjusts for all dilutive instruments: stock options, restricted stock units, convertible bonds, and warrants. Diluted EPS is always equal to or lower than basic EPS and represents a fully converted worst-case scenario for existing shareholders.',
      'EPS is the direct input to the P/E ratio (P/E = Price / EPS) and the earnings yield (Earnings Yield = EPS / Price). It is also used to calculate EPS growth rates - one of the most watched metrics in equity analysis. Consensus analyst EPS estimates for future quarters are a central driver of short-term share price movements, as beats and misses against these estimates cause significant price reactions.',
    ],
    whenToUse: 'Use diluted EPS (not basic) for P/E ratio calculations and equity analysis - it reflects the economic reality of full share dilution. Track EPS growth over multiple years to identify companies compounding earnings consistently. Compare EPS growth against revenue growth: EPS growing faster than revenue implies margin expansion or share buybacks; slower implies dilution or margin compression.',
    examples: {
      headers: ['Metric', 'Company A', 'Company B'],
      rows: [
        ['Net Income', '$500,000,000', '$500,000,000'],
        ['Basic Shares', '200,000,000', '500,000,000'],
        ['Diluted Shares', '220,000,000', '510,000,000'],
        ['Basic EPS', '$2.50', '$1.00'],
        ['Diluted EPS', '$2.27', '$0.98'],
        ['Stock Price', '$45', '$12'],
        ['P/E (Diluted)', '19.8x', '12.2x'],
      ],
    },
    pitfalls: 'EPS can be boosted through share buybacks even when net income is flat - fewer shares outstanding means higher EPS per share. A company spending $500M on buybacks can show EPS growth of 10% with zero improvement in actual profitability. Always track EPS in context of the share count trend and compare EPS growth to net income growth. Stock-based compensation also dilutes EPS over time.',
    faqs: [
      { q: 'What is the difference between basic and diluted EPS?', a: 'Basic EPS uses the actual weighted average shares outstanding during the period. Diluted EPS assumes all potential shares - from options, RSUs, convertible notes - are converted into common stock, increasing the denominator and therefore reducing EPS. For companies with significant equity compensation programs, the dilution can be material: a tech company with heavy option grants might show 15% dilution from basic to diluted EPS.' },
      { q: 'What is a consensus EPS estimate and why does it matter?', a: 'Wall Street analysts publish quarterly EPS forecasts for public companies. The average of these estimates is the consensus. When a company reports actual EPS above consensus, it has beaten - usually driving the stock up. A miss drives it down. The magnitude of the beat or miss relative to expectations, and management\'s forward guidance, are typically more important to stock price reaction than the absolute EPS number itself.' },
      { q: 'How does EPS relate to dividends?', a: 'EPS and dividends are linked through the payout ratio: Payout Ratio = Dividends Per Share / EPS. A company paying $2.00 annually per share with EPS of $4.00 has a 50% payout ratio. The remaining 50% is retained earnings, reinvested in the business. A payout ratio consistently above 100% means the company is paying more in dividends than it earns - unsustainable without borrowing or asset sales.' },
    ],
  },

  'roe': {
    definition: [
      'Return on Equity (ROE) measures how many dollars of net income a company generates for each dollar of shareholders\' equity. Shareholders\' equity - also called book value - is the accounting value of assets minus liabilities: what would be left for equity holders if all assets were liquidated at book value and all debts paid. ROE converts this ownership stake into an efficiency ratio.',
      'ROE is best understood through the DuPont decomposition, which breaks it into three multiplicative components: Net Profit Margin × Asset Turnover × Equity Multiplier. Net Profit Margin (Net Income / Revenue) shows profitability efficiency. Asset Turnover (Revenue / Total Assets) shows how productively assets generate revenue. The Equity Multiplier (Total Assets / Equity) reflects financial leverage - how much of the asset base is funded by debt.',
      'This decomposition is analytically powerful because two companies can have identical ROE for very different reasons. A luxury goods company might achieve 20% ROE through high margins (40%) and low leverage. A bank might achieve the same 20% ROE through thin margins (5%) and extreme leverage (multiplier of 10x). The DuPont framework diagnoses the source of ROE and enables meaningful peer comparison.',
    ],
    whenToUse: 'Use ROE to evaluate management\'s efficiency in deploying shareholder capital. A sustained ROE above 15–20% is generally considered excellent. For a more complete picture, always apply the DuPont decomposition to understand whether ROE is driven by profitability, operational efficiency, or financial leverage. Compare ROE to the company\'s cost of equity - an ROE below the cost of equity means the company is destroying value for shareholders.',
    examples: {
      headers: ['Company', 'Net Margin', 'Asset Turnover', 'Equity Multiplier', 'ROE (DuPont)', 'Primary Driver'],
      rows: [
        ['Consumer brand', '18%', '1.2x', '2.0x', '43.2%', 'Margin'],
        ['Retailer', '3%', '2.5x', '3.0x', '22.5%', 'Turnover + Leverage'],
        ['Bank', '15%', '0.08x', '10x', '12%', 'Leverage'],
        ['Industrial co.', '8%', '1.5x', '2.5x', '30%', 'Balanced'],
      ],
    },
    pitfalls: 'High ROE driven by high leverage (large equity multiplier) can be misleading - the company is amplifying returns through debt, which also amplifies losses in downturns. A company with a $5M equity base and $100M in debt will show extreme ROE on any net income, but this capital structure carries significant bankruptcy risk. Always look at both ROE and the debt-to-equity ratio together.',
    faqs: [
      { q: 'What is a good ROE?', a: 'A commonly cited benchmark is 15–20% as strong for established companies. Warren Buffett has noted a preference for businesses consistently achieving ROE above 20% without excessive leverage. The meaningful comparison is always industry-specific: banks operate with high leverage and thin margins, so 10–12% ROE is competitive. Capital-light software businesses should achieve 30%+ ROE.' },
      { q: 'What is the DuPont formula for ROE?', a: 'ROE = Net Profit Margin × Asset Turnover × Equity Multiplier, or equivalently: (Net Income / Revenue) × (Revenue / Total Assets) × (Total Assets / Equity). The extended 5-factor DuPont further decomposes Net Profit Margin into Tax Burden × Interest Burden × EBIT Margin, enabling even more granular analysis of what drives the difference in ROE between two companies.' },
      { q: 'Why can ROE be misleadingly high?', a: 'Three common distortions: (1) High leverage inflates ROE by shrinking the equity denominator - a company that borrows heavily will show high ROE even with mediocre profitability. (2) Share buybacks funded by debt reduce equity, which mechanically raises ROE without improving the underlying business. (3) Goodwill write-downs or large losses reduce equity permanently, which paradoxically raises future ROE calculations on the remaining smaller equity base.' },
    ],
  },


  'knot': {
    definition: [
      'A knot is a unit of speed equal to one nautical mile per hour. It is defined as exactly 1.852 km/h (approximately 1.15078 mph or 0.51444 m/s). Despite not being part of the SI metric system, the knot is the universally accepted speed unit in aviation and maritime navigation.',
      'The word "knot" originates from a 17th-century navigation technique called the chip log. Sailors cast a knotted rope attached to a wooden float overboard and counted how many knots passed through their hands in a set time interval (typically 28 seconds). The count gave the ship\'s speed directly in nautical miles per hour.',
    ],
    whenToUse: 'Use knots when reading or reporting aviation airspeed, wind speeds in meteorological reports, ship speeds, and any speed displayed on nautical charts or flight instruments. All aviation weather (TAFs, METARs) and ATC communications worldwide use knots. For everyday driving contexts, convert to km/h or mph.',
    examples: {
      headers: ['Speed in knots', 'km/h', 'mph', 'Context'],
      rows: [
        ['1 kn', '1.852 km/h', '1.151 mph', 'Definition'],
        ['15 kn', '27.8 km/h', '17.3 mph', 'Average cargo ship'],
        ['150 kn', '277.8 km/h', '172.6 mph', 'Small aircraft approach'],
        ['490 kn', '907.5 km/h', '564 mph', 'Commercial airliner cruise'],
      ],
    },
    pitfalls: 'Do not confuse knots with km/h - they are off by nearly double (1 kn = 1.852 km/h). A wind report of "35 knots" means 64.8 km/h, not 35 km/h. Also note that "knots per hour" is incorrect - a knot already includes "per hour," so the unit is simply "knots," not "knots per hour."',
    faqs: [
      { q: 'Why do planes use knots instead of km/h or mph?', a: 'Aviation adopted knots because nautical miles are directly tied to Earth\'s latitude grid - one degree of latitude = 60 nautical miles. This makes navigation calculations, distance estimates on charts, and fuel planning simpler. The convention was established when the US dominated early commercial aviation and has remained the global standard ever since.' },
      { q: 'Is 1 knot the same in all countries?', a: 'Yes. The International Hydrographic Organization defines the nautical mile as exactly 1,852 meters, making 1 knot exactly 1.852 km/h worldwide. There is no US or UK variant - unlike the statute mile, which differs from the nautical mile.' },
    ],
  },

  'mach-number': {
    definition: [
      'A Mach number is the ratio of an object\'s speed to the local speed of sound in the surrounding medium. Mach 1 means the object is travelling at the speed of sound. Mach 0.5 is half the speed of sound; Mach 2 is twice the speed of sound.',
      'The speed of sound varies with temperature and the medium it travels through. At sea level and 15°C in air, Mach 1 is approximately 340.3 m/s (1,225 km/h or 761 mph). At cruising altitude (~10,000 m), where temperatures reach around -50°C, Mach 1 drops to about 295 m/s (1,062 km/h). This is why airliner cruise speeds are quoted in Mach - the aircraft\'s aerodynamic behaviour depends on Mach number, not absolute speed.',
    ],
    whenToUse: 'Use Mach numbers when describing aircraft performance, particularly for jet aircraft, supersonic vehicles, and anything where compressibility effects in air matter (above approximately Mach 0.3). For subsonic vehicles like cars, trains, and ships, use km/h, mph, or knots instead.',
    examples: {
      headers: ['Mach', 'km/h (sea level, 15°C)', 'mph', 'Category'],
      rows: [
        ['Mach 0.5', '612.5 km/h', '380.5 mph', 'Subsonic'],
        ['Mach 0.85', '1,041 km/h', '647 mph', 'Commercial airliner cruise'],
        ['Mach 1', '1,225 km/h', '761 mph', 'Speed of sound'],
        ['Mach 2', '2,450 km/h', '1,522 mph', 'Supersonic (Concorde cruise)'],
        ['Mach 5', '6,125 km/h', '3,806 mph', 'Hypersonic (X-51A)'],
      ],
    },
    pitfalls: 'Mach 1 is not a fixed speed - it changes with air temperature. At 10,000 m altitude, Mach 1 is about 295 m/s (1,062 km/h), significantly slower than the 340 m/s at sea level. Never convert a Mach number to km/h without specifying the altitude and temperature conditions.',
    faqs: [
      { q: 'What is the difference between subsonic, transonic, supersonic, and hypersonic?', a: 'Subsonic: Mach below 0.8. Transonic: Mach 0.8–1.2 (shock waves begin forming). Supersonic: Mach 1.2–5. Hypersonic: Mach 5 and above. The Concorde cruised at Mach 2; the Space Shuttle re-entered at around Mach 25.' },
      { q: 'Who is Mach named after?', a: 'Ernst Mach, an Austrian physicist (1838–1916) who studied the shock waves formed by projectiles moving faster than sound. The unit was named in his honour by the aeronautical engineer Jakob Ackeret in 1929.' },
    ],
  },

  'nautical-mile': {
    definition: [
      'A nautical mile is a unit of distance equal to exactly 1,852 meters (1.852 km or approximately 1.151 statute miles). It is defined as one arcminute (1/60 of a degree) of latitude along any meridian of Earth\'s surface. This geometric relationship to Earth\'s coordinate system is what makes it essential for navigation.',
      'Because one degree of latitude = 60 nautical miles, navigators can read distances directly off the latitude scale on a chart using a compass or dividers - no conversion required. A ship travelling 1 nautical mile has moved exactly 1 arcminute of latitude toward the equator or poles.',
    ],
    whenToUse: 'Use nautical miles for any oceanic or aviation navigation - measuring distances on charts, filing flight plans, calculating fuel range, and setting waypoints. Combine with knots to express speed: a ship travelling at 20 knots covers 20 nautical miles per hour. For road or land distances, use kilometres or statute miles instead.',
    examples: {
      headers: ['Nautical miles', 'Kilometres', 'Statute miles', 'Context'],
      rows: [
        ['1 nmi', '1.852 km', '1.151 mi', 'Definition'],
        ['60 nmi', '111.12 km', '69.05 mi', '1 degree of latitude'],
        ['3,600 nmi', '6,667.2 km', '4,143 mi', 'Paris to New York (approx.)'],
        ['21,600 nmi', '40,003.2 km', '24,860 mi', 'Earth\'s circumference (approx.)'],
      ],
    },
    pitfalls: 'Do not confuse nautical miles with statute miles. A statute mile is 1,609.344 m; a nautical mile is 1,852 m - about 15% longer. A voyage of "100 miles" could mean very different distances depending on which unit is used. GPS devices typically allow switching between nmi and statute miles - always verify the setting before navigation.',
    faqs: [
      { q: 'Why is it called a "nautical" mile?', a: 'The term distinguishes it from the statute mile (used on land). "Nautical" simply means relating to the sea or navigation. Before GPS, sailors needed a distance unit directly readable from latitude lines on a chart - the nautical mile, defined as one arcminute of latitude, fulfilled this exactly.' },
      { q: 'Is the nautical mile metric?', a: 'Not officially - it is not part of the SI system. However, its definition (1,852 m exactly) was fixed by international agreement in 1929, making it a precisely defined unit with an exact metric equivalent. The International System of Units allows its continued use alongside SI units for maritime and aviation purposes.' },
    ],
  },

  'gross-pay': {
    definition: [
      'Gross pay is the total compensation earned during a pay period before any deductions are applied. It includes base salary or hourly wages, overtime, bonuses, commissions, and other taxable compensation. When an employer quotes a salary of $60,000 per year, that is a gross pay figure.',
      'Gross pay is distinct from net pay (take-home pay). Federal income tax, state income tax, Social Security (6.2%), Medicare (1.45%), health insurance premiums, and retirement contributions (e.g. 401k) are all deducted from gross pay to arrive at the amount actually deposited into your account.',
    ],
    whenToUse: 'Use gross pay when comparing job offers, calculating your hourly equivalent salary, or filing tax returns. Use net pay when planning your monthly budget or cash flow, since that is the actual amount available to spend.',
    examples: {
      headers: ['Component', 'Amount'],
      rows: [
        ['Base salary (annual)', '$60,000'],
        ['Gross pay per bi-weekly period', '$2,307.69'],
        ['Federal income tax (est. 22%)', '-$507.69'],
        ['Social Security (6.2%)', '-$143.08'],
        ['Medicare (1.45%)', '-$33.46'],
        ['Health insurance premium', '-$150.00'],
        ['Net pay (take-home)', '~$1,473.46'],
      ],
    },
    pitfalls: 'Never budget using gross pay figures. A $60,000 salary sounds like $5,000 per month, but after taxes and deductions, most workers in the US take home $3,200-$3,800 per month. Use net pay for all monthly expense planning.',
    faqs: [
      { q: 'Is gross pay the same as salary?', a: 'Gross pay and salary are related but not identical. Salary is the agreed annual or periodic rate. Gross pay is the actual amount earned in a specific pay period, which may differ from base salary if bonuses, overtime, or commissions are included.' },
      { q: 'What percentage of gross pay do most people take home?', a: 'For most US workers earning $40,000-$100,000, net pay is roughly 65-75% of gross pay. The exact figure depends on filing status, state taxes, retirement contributions, and benefit elections. Higher earners in high-tax states may keep as little as 55-60%.' },
    ],
  },

  'rpm': {
    definition: [
      'RPM (Revenue Per Mille, from the Latin for "thousand") is the estimated earnings a publisher receives for every 1,000 page views on an ad-supported website. It is calculated by dividing total earnings by page views, then multiplying by 1,000. A site earning $50 from 10,000 page views has an RPM of $5.00.',
      'RPM is the most practical metric for comparing ad monetisation performance because it combines both click-through rate (CTR) and cost per click (CPC) into a single number. A publisher with a high CPC but low CTR may have the same RPM as one with a lower CPC but higher CTR. Finance sites typically earn $15-40 RPM; general content sites average $2-8 RPM.',
    ],
    whenToUse: 'Use RPM to benchmark your monetisation performance across different content types, traffic sources, or time periods. Compare your RPM against niche averages to identify whether your CTR, CPC, or ad placement is the limiting factor.',
    examples: {
      headers: ['Niche', 'Typical RPM'],
      rows: [
        ['Finance / Insurance', '$15 - $40'],
        ['Technology / Software', '$10 - $25'],
        ['Health / Medical', '$8 - $20'],
        ['Lifestyle / Food / Travel', '$3 - $8'],
        ['Entertainment / Gaming', '$1 - $5'],
      ],
    },
    pitfalls: 'RPM is an estimate, not a guarantee. It averages across all sessions in a period, so a single day with unusually high or low traffic can distort the figure. Always analyse RPM over 30+ days to get a reliable baseline. Also note that RPM in AdSense is your net share - not the gross advertiser spend.',
    faqs: [
      { q: 'What is the difference between RPM and CPM?', a: 'RPM (Revenue Per Mille) is a publisher metric - your earnings per 1,000 page views. CPM (Cost Per Mille) is an advertiser metric - what advertisers pay per 1,000 ad impressions. They measure the same thing from different perspectives. Your RPM will always be lower than the advertiser\'s CPM because Google keeps a revenue share.' },
      { q: 'How do I increase my AdSense RPM?', a: 'The three main levers are: target higher-CPC niches (finance and tech content earns 5-10x more per click than entertainment), optimise ad placement (in-content ads above the fold outperform sidebar ads), and build US/UK/CA/AU traffic (tier-1 countries deliver the highest advertiser CPCs by a large margin).' },
    ],
  },

  'cpc': {
    definition: [
      'CPC (Cost Per Click) is the amount a publisher earns each time a visitor clicks an ad on their page. In Google AdSense, the CPC shown in your reports is the net figure - your share after Google\'s revenue split. Google keeps approximately 32% and pays publishers approximately 68% of what advertisers spend on content ads.',
      'CPC varies enormously by niche and geography. Finance, insurance, and legal keywords can produce CPCs of $5-50+, while entertainment and lifestyle keywords typically yield $0.05-$0.50. A single click from a US-based visitor on a finance keyword can be worth more than 100 clicks from a low-income-country visitor on a general content page.',
    ],
    whenToUse: 'Use CPC alongside CTR to calculate your Page RPM and forecast AdSense earnings. When optimising for revenue, improving CPC (by targeting higher-value content) is often more impactful than improving CTR, since a 2x CPC increase doubles earnings without needing any more traffic.',
    examples: {
      headers: ['Niche', 'Average CPC Range'],
      rows: [
        ['Finance / Insurance / Legal', '$1.00 - $50+'],
        ['Technology / Software', '$0.50 - $8.00'],
        ['Health / Medical', '$0.50 - $5.00'],
        ['Lifestyle / Food / Travel', '$0.10 - $1.50'],
        ['Entertainment / Gaming', '$0.05 - $0.50'],
      ],
    },
    pitfalls: 'The CPC in your AdSense reports is an average across all clicks in a period. Individual clicks vary widely - one click might earn $0.02 and the next $4.50 depending on which ad was served. Do not base strategy on a single click\'s value. Also note that CPC is not the same as CPM: CPC is per click, CPM is per 1,000 impressions.',
    faqs: [
      { q: 'How do I see my CPC in Google AdSense?', a: 'Log into AdSense, go to Reports, set your date range, and add CPC as a column via the columns icon. You can filter by ad unit or country to see which placements and geographic markets earn the most per click. The figure shown is your net share - approximately 68% of what the advertiser paid.' },
      { q: 'Why is my CPC so low?', a: 'Low CPC usually means your content targets low-value keywords, your audience is from low-advertiser-spend geographies, or your ad placements attract low-competition ad inventory. The most impactful fix is to create content in higher-CPC niches (finance, tech, health) targeting US, UK, Canadian, or Australian audiences.' },
    ],
  },

  'ctr': {
    definition: [
      'CTR (Click-Through Rate) is the percentage of ad impressions that result in a click. It is calculated by dividing total clicks by total impressions and multiplying by 100. If 10,000 ads are displayed and 200 are clicked, the CTR is 2%. For Google AdSense, CTR is typically measured at the page level: clicks divided by page views.',
      'A typical AdSense CTR for banner ads on content sites is 1-3%. CTR depends heavily on ad placement, ad format, and how relevant the ads are to the content. Ads placed within the content body near the top of the page consistently outperform sidebar and footer ads. Responsive ad units that adapt to device size typically achieve higher CTR than fixed-size units.',
    ],
    whenToUse: 'Use CTR with CPC to calculate your Page RPM and forecast AdSense earnings. When optimising for revenue, focus on CTR if your CPC is already strong - in that case, improving ad placement and format can significantly increase earnings without changing your content strategy.',
    pitfalls: 'A very high CTR (above 10%) can trigger a Google AdSense review for invalid traffic. Google monitors CTR patterns and may suspend accounts where clicks appear to be artificially inflated. Always aim for natural CTR from genuinely interested visitors rather than trying to maximise clicks through misleading placement. CTR above 3% through good placement is excellent; above 10% raises flags.',
    faqs: [
      { q: 'What is a good CTR for AdSense?', a: 'A good AdSense CTR is 1-3% for most content sites. Below 0.5% usually means ads are poorly placed or mismatched with the audience. Above 3% is strong and achievable with well-placed in-content ads. Google may review accounts with CTR above 10%, as unusually high rates can indicate invalid traffic or deceptive ad placement.' },
      { q: 'How do I increase my AdSense CTR?', a: 'Place ads within the content body rather than only in sidebars or footers. Ads after the first paragraph and within long-form content perform best. Use responsive ad formats that fit any screen size. Match ad colour schemes loosely to your site design so they feel native rather than intrusive. Avoid excessive ad density, which trains visitors to ignore ads entirely.' },
    ],
  },

  'pay-period': {
    definition: [
      'A pay period is the recurring cycle of time for which an employer calculates and pays wages or salary. The most common types in the US are weekly (52 pay cheques/year), bi-weekly (26 pay cheques/year), semi-monthly (24 pay cheques/year), and monthly (12 pay cheques/year). Bi-weekly and semi-monthly are often confused: bi-weekly means every two weeks; semi-monthly means twice a calendar month (e.g., the 1st and 15th).',
      'Pay period choice does not affect total annual income - only how and when that income is distributed. A $62,400 annual salary pays out as $1,200/week, $2,400 bi-weekly, $2,600 semi-monthly, or $5,200/month. Bi-weekly workers receive two "extra" pay cheques per year compared to semi-monthly workers, which can help with budgeting for irregular expenses.',
    ],
    whenToUse: 'Use pay period when converting between hourly and annual income, calculating payroll costs, or comparing job offers that quote salary on different schedules. Always confirm which type a new employer uses - bi-weekly and semi-monthly pay produce different per-cheque amounts even at the same annual salary.',
    examples: {
      headers: ['Pay Period', 'Cheques/Year', '$62,400 annual salary'],
      rows: [
        ['Weekly', '52', '$1,200 per week'],
        ['Bi-weekly', '26', '$2,400 every 2 weeks'],
        ['Semi-monthly', '24', '$2,600 twice a month'],
        ['Monthly', '12', '$5,200 per month'],
      ],
    },
    pitfalls: 'The most common mistake is treating bi-weekly and semi-monthly as the same. Multiplying a bi-weekly pay cheque by 24 (instead of 26) underestimates annual income by 7.7%. Always multiply bi-weekly pay by 26 and semi-monthly pay by 24 to get an accurate annual figure.',
    faqs: [
      { q: 'What is the difference between bi-weekly and semi-monthly pay?', a: 'Bi-weekly means you are paid every two weeks, resulting in 26 pay cheques per year. Semi-monthly means you are paid twice a month on fixed dates (typically the 1st and 15th), giving 24 pay cheques per year. At the same annual salary, bi-weekly pay cheques are slightly smaller but you receive two extra per year.' },
      { q: 'How many pay periods are in a year?', a: 'It depends on your pay schedule. Weekly: 52 pay periods. Bi-weekly: 26 pay periods. Semi-monthly: 24 pay periods. Monthly: 12 pay periods. Most US private-sector employees are paid bi-weekly (26 pay periods), which is the most common schedule according to the Bureau of Labor Statistics.' },
    ],
  },

  'sales-tax': {
    definition: [
      'Sales tax is a consumption tax imposed at the point of sale on retail goods and services. The seller adds the tax to the purchase price, collects it from the buyer, and remits it to the state or local government. Rates are set by state legislatures, and most states allow counties and cities to layer additional local rates on top of the state base rate. The Tax Foundation reports that 45 US states plus Washington D.C. levy a statewide sales tax, with rates ranging from 2.9% (Colorado) to 7.25% (California).',
      'Unlike income tax (which taxes earnings) or property tax (which taxes assets), sales tax taxes spending at the moment of purchase. It is often described as regressive because lower-income households spend a larger proportion of their income on taxable goods, so the effective burden falls more heavily on them as a share of income.',
    ],
    whenToUse: 'Use the sales tax formula when pricing products for sale, checking a receipt, estimating the total cost of a large purchase, or reverse-calculating the original price from a tax-inclusive total. Always use the combined state plus local rate for your specific location, not just the state-level rate.',
    examples: {
      headers: ['Pre-tax price', 'Tax rate', 'Tax amount', 'Total price'],
      rows: [
        ['$50.00', '8.00%', '$4.00', '$54.00'],
        ['$200.00', '7.25%', '$14.50', '$214.50'],
        ['$1,000.00', '9.55%', '$95.50', '$1,095.50'],
        ['$25.99', '6.25%', '$1.62', '$27.61'],
      ],
    },
    pitfalls: 'The most common error is the reverse calculation: subtracting the tax percentage directly from the total gives the wrong pre-tax price. For a $108 total at 8%, subtracting $8.64 (108 x 0.08) gives $99.36 - incorrect. The correct method is $108 / 1.08 = $100.00. Always divide by (1 + rate) to reverse out sales tax.',
    faqs: [
      { q: 'How do I calculate sales tax on a purchase?', a: 'Multiply the pre-tax price by the tax rate divided by 100. For a $50 item at 8%: $50 x 0.08 = $4.00 tax. Add the tax to the price to get the total: $54.00. Use the combined state and local rate for your location, not just the state rate alone.' },
      { q: 'How do I remove sales tax from a total price?', a: 'Divide the tax-inclusive total by (1 + Tax Rate / 100). For a $108.00 total at 8%: $108 / 1.08 = $100.00 pre-tax. The tax was $8.00. Never subtract the percentage directly from the total - that method overstates the tax amount and gives the wrong original price.' },
      { q: 'Which US states have no sales tax?', a: 'Five states have no statewide sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. Delaware, Montana, New Hampshire, and Oregon also have no local sales taxes. Alaska allows local municipalities to levy their own sales taxes, so many Alaskan cities do charge rates above 0%.' },
    ],
  },

  'value-added-tax': {
    definition: [
      'Value Added Tax (VAT) is a multi-stage consumption tax. Unlike sales tax, which is collected only at the final retail sale, VAT is collected at every stage of production and distribution. A manufacturer pays VAT when buying raw materials, a wholesaler pays VAT when buying finished goods, and a retailer pays VAT when buying stock - but each claims back the VAT it paid on its inputs from the government. Only the net value added at each stage is actually taxed.',
      'The end consumer bears the full VAT cost because they cannot reclaim it. For a business, VAT is broadly neutral - they collect it on sales and reclaim it on purchases. Over 175 of 193 UN member countries use VAT as their primary consumption tax, with standard rates ranging from 4.5% (Andorra) to 27% (Hungary). The EU average standard rate is 21.9% (Tax Foundation, 2026). The United States is the only major economy that does not have a federal VAT.',
    ],
    whenToUse: 'Use the VAT formula when creating invoices (add VAT to a net price), pricing products for sale in a VAT country, or reverse-calculating the net price from a tax-inclusive total. Businesses registered for VAT must always show the net price, VAT amount, and gross price separately on invoices.',
    examples: {
      headers: ['Net price', 'VAT rate', 'VAT amount', 'Gross price'],
      rows: [
        ['£100.00', '20% (UK)', '£20.00', '£120.00'],
        ['€500.00', '19% (Germany)', '€95.00', '€595.00'],
        ['€200.00', '25% (Sweden)', '€50.00', '€250.00'],
        ['AU$300.00', '10% (Australia GST)', 'AU$30.00', 'AU$330.00'],
      ],
    },
    pitfalls: 'The most common reverse-calculation mistake is subtracting the VAT percentage directly from the gross price. For a £120 gross at 20% VAT, subtracting £120 x 0.20 = £24 gives £96 net - which is wrong. The correct method is £120 / 1.20 = £100.00. Always divide by (1 + rate) to extract VAT from a gross price.',
    faqs: [
      { q: 'How do I calculate VAT on a price?', a: 'Multiply the net price by the VAT rate divided by 100 to get the VAT amount, then add it to the net price. At 20% VAT on £100: £100 x 0.20 = £20 VAT; gross = £120. Use the VAT calculator at calculations.tools/tax/vat-calculator to do this instantly.' },
      { q: 'How do I remove VAT from a gross price?', a: 'Divide the gross price by (1 + VAT Rate / 100). For £120 gross at 20% VAT: £120 / 1.20 = £100 net. The VAT was £20. Never subtract the percentage directly from the gross - that method overstates the tax and gives the wrong net price every time.' },
      { q: 'What is the difference between VAT and GST?', a: 'VAT and GST are the same type of tax with different names. Both are multi-stage consumption taxes where businesses reclaim input tax. Europe, the UK, and most of Africa and Asia call it VAT; Australia, Canada, India, New Zealand, and Singapore call it GST. The calculation formula is identical.' },
    ],
  },

  'gst': {
    definition: [
      'GST (Goods and Services Tax) is the name used in Australia, Canada, India, New Zealand, and Singapore for a tax that works identically to VAT. It is a multi-stage consumption tax collected at each step of production and distribution. Each business in the supply chain pays GST on its purchases and collects GST on its sales, remitting only the difference to the government. End consumers bear the full cost because they cannot reclaim it.',
      "The key rates vary by country: Australia applies a flat 10% GST, New Zealand 15%, Singapore 9% (raised from 8% in January 2024), Canada's federal GST is 5% (combined with provincial taxes up to 15%), and India uses a multi-rate structure of 5%, 12%, 18%, and 28%. Despite the different name, any VAT calculator works for GST calculations, since the formula is identical.",
    ],
    whenToUse: 'Use GST calculations when invoicing in Australia, Canada, India, New Zealand, or Singapore; when pricing goods for sale in those markets; or when checking whether a quoted price includes or excludes GST. In Australia and New Zealand, consumer prices are usually shown GST-inclusive; in India, prices are often shown net (excluding GST).',
    examples: {
      headers: ['Country', 'GST rate', 'Net price', 'GST amount', 'Gross price'],
      rows: [
        ['Australia', '10%', 'AU$100', 'AU$10', 'AU$110'],
        ['New Zealand', '15%', 'NZ$100', 'NZ$15', 'NZ$115'],
        ['Singapore', '9%', 'S$100', 'S$9', 'S$109'],
        ['Canada (federal)', '5%', 'CA$100', 'CA$5', 'CA$105'],
      ],
    },
    pitfalls: "Canada's tax system is especially complex because the federal GST is often combined with a provincial sales tax (PST) or replaced by a Harmonised Sales Tax (HST) that merges both. The combined rate ranges from 5% (Alberta, which has no provincial sales tax) to 15% (New Brunswick, Newfoundland, Nova Scotia, PEI). Always use the combined rate for Canadian calculations.",
    faqs: [
      { q: 'Is GST the same as VAT?', a: 'Yes. GST and VAT are the same type of tax with different names. Both are multi-stage consumption taxes where businesses collect tax on sales and reclaim it on purchases. Europe calls it VAT; Australia, Canada, India, New Zealand, and Singapore call it GST. The formula for calculating both is identical.' },
      { q: 'What is the GST rate in Australia?', a: 'Australia applies a flat 10% GST on most goods and services. Some supplies are GST-free (fresh food, certain medical services, and exports) and some are input-taxed (financial services, residential rent). The Australian GST has been in force since 1 July 2000.' },
      { q: 'How do I reverse GST from a price?', a: 'Divide the GST-inclusive price by (1 + GST Rate / 100). For an AU$110 price including 10% GST: AU$110 / 1.10 = AU$100 net; the GST was AU$10. This is the same reverse formula used for VAT. Never subtract the percentage directly from the gross price.' },
    ],
  },

  'net-pay': {
    definition: [
      'Net pay, also called take-home pay, is the amount deposited into your bank account after all deductions are removed from gross pay. Mandatory deductions include federal income tax, state income tax (where applicable), Social Security (6.2% up to the wage base), and Medicare (1.45%). Voluntary deductions include health insurance premiums, dental, vision, 401k contributions, and HSA contributions.',
      'Net pay is the figure that matters for day-to-day budgeting. It is always lower than gross pay - sometimes significantly so. For a $60,000 annual salary, net pay for a single filer in a median-tax US state is typically $42,000-$46,000 per year, or $1,600-$1,770 bi-weekly.',
    ],
    whenToUse: 'Use net pay for monthly budgeting, rent-to-income calculations, and savings planning. Use gross pay for comparing job offers and calculating your market hourly rate.',
    pitfalls: 'Do not confuse net pay with disposable income. Net pay is after tax and statutory deductions, but you may still have fixed expenses (rent, car payment, loan repayments) that reduce what is truly discretionary.',
    faqs: [
      { q: 'How do I calculate my net pay from gross pay?', a: 'Start with gross pay, subtract federal income tax (based on your bracket and W-4 allowances), Social Security (6.2%), Medicare (1.45%), state income tax, and any voluntary deductions (health insurance, 401k). The remainder is your net pay. A paycheck stub shows each deduction line by line.' },
      { q: 'Does a higher 401k contribution reduce my net pay?', a: 'Yes - traditional 401k contributions reduce your taxable income, which lowers your federal and state income tax. The net effect on take-home pay is less than the contribution amount. Contributing $200 bi-weekly may only reduce net pay by $140-$160 depending on your marginal tax rate.' },
    ],
  },

  'merit-increase': {
    definition: [
      'A merit increase is a salary raise tied directly to an individual employee\'s job performance, distinct from automatic cost-of-living adjustments or across-the-board increases. Employers budget a merit pool - typically 3-5% of total payroll - and allocate larger raises to high performers, smaller ones to average performers, and nothing to below-average performers.',
      'Merit increases are usually applied during annual performance review cycles. A typical distribution gives the top 10-20% of performers 5-8% raises, middle performers 3-4%, and bottom performers 0-2%. The dollar impact scales with base salary, meaning the same percentage raise delivers more money to higher earners.',
    ],
    whenToUse: 'Compare your merit increase against the company\'s stated merit pool percentage. If the pool is 3.5% and you receive 3%, you are slightly below average. If you receive 5-6% from a 3.5% pool, your manager is allocating more than your share - a strong signal of above-average performance standing.',
    examples: {
      headers: ['Performance tier', 'Typical merit %', '$60,000 salary raise', '$100,000 salary raise'],
      rows: [
        ['Below expectations', '0%', '$0', '$0'],
        ['Meets expectations', '2.5 - 3.5%', '+$1,500 - $2,100', '+$2,500 - $3,500'],
        ['Exceeds expectations', '4 - 6%', '+$2,400 - $3,600', '+$4,000 - $6,000'],
        ['Top performer', '6 - 10%', '+$3,600 - $6,000', '+$6,000 - $10,000'],
      ],
    },
    pitfalls: 'Merit increases compound over time. A 5% raise versus a 3% raise on a $60,000 salary is only $1,200 in year one, but over 10 years the higher raise trajectory produces a significantly larger base. Negotiate each raise as if it is permanent, because it is - your future raises are percentages of the new, higher figure.',
    faqs: [
      { q: 'Is a merit increase the same as a cost-of-living raise?', a: 'No. A merit increase rewards individual performance; a cost-of-living adjustment (COLA) simply offsets inflation for all employees. Many companies issue a COLA to everyone and a separate merit increase to strong performers. A raise of only 2-3% when inflation is 3% is effectively a COLA with no merit component.' },
      { q: 'How do I negotiate a higher merit increase?', a: 'Document specific, quantifiable contributions before your review: revenue generated, costs saved, projects delivered ahead of schedule. Frame your ask around market data - know the median salary for your role and location. A raise 1-2% above the stated merit pool is achievable with strong evidence.' },
    ],
  },

  'cost-of-living-adjustment': {
    definition: [
      'A cost-of-living adjustment (COLA) is an automatic increase to wages, salaries, or benefits designed to offset inflation - keeping purchasing power stable as the general price level rises. The adjustment is typically tied to a price index, most commonly the Consumer Price Index for All Urban Consumers (CPI-U) in the United States.',
      'Social Security benefits receive an official COLA each year determined by the SSA. For 2026, the COLA was 2.8%, based on Q3 2025 CPI data. Many private employers also issue a COLA - sometimes bundled into a single annual increase with a merit component, sometimes paid as a separate flat adjustment for all employees.',
    ],
    whenToUse: 'Use COLA as a baseline when evaluating any annual salary increase. A raise that exactly matches COLA preserves your current standard of living but provides no real income growth. A raise below COLA is a real-terms pay cut even if the dollar amount is higher.',
    examples: {
      headers: ['Year', 'US CPI change', 'SSA COLA applied', 'Real gain from a 3.5% raise'],
      rows: [
        ['2022', '+8.0%', '+8.7%', '-4.5% (real loss)'],
        ['2023', '+3.4%', '+3.2%', '+0.1% (near break-even)'],
        ['2024', '+2.9%', '+2.5%', '+0.6% (slight real gain)'],
        ['2025', '+2.8%', '+2.8%', '+0.7% (modest real gain)'],
      ],
    },
    pitfalls: 'COLA and merit increases serve different purposes. Bundling them into a single percentage makes it hard to know whether you received real performance recognition or just an inflation offset. When negotiating, ask your employer to separate the COLA component from the merit component so you can evaluate each independently.',
    faqs: [
      { q: 'How is the Social Security COLA calculated?', a: 'The SSA compares the average CPI-W (Consumer Price Index for Urban Wage Earners) in Q3 of the current year against Q3 of the previous year. If the index rose, all Social Security benefits increase by the same percentage the following January. For 2026, the COLA was 2.8%.' },
      { q: 'Does every employer give a COLA?', a: 'No. COLA is mandatory for Social Security and some government pension plans, but private employers are not required to give inflation-linked raises. Many employers issue a single combined increase that blends COLA and merit, making it difficult to separate the two components.' },
    ],
  },

  'overtime-pay': {
    definition: [
      'Overtime pay is the additional compensation employees earn for hours worked beyond a standard threshold - most commonly 40 hours per workweek in the United States. Under the Fair Labor Standards Act (FLSA), non-exempt employees must receive at least 1.5 times their regular rate of pay for every overtime hour.',
      'The overtime premium - the extra amount above base pay - is the key financial benefit of working overtime. At 1.5x, a $20/hr worker earns an extra $10 for each overtime hour on top of their normal $20, making the total overtime rate $30/hr.',
    ],
    whenToUse: 'Calculate overtime pay whenever you work beyond the standard threshold for your country or employment contract. Use the overtime rate to verify your paycheck, compare the value of overtime versus time-off-in-lieu, or plan your earnings for a high-hours week.',
    examples: {
      headers: ['Scenario', 'Regular pay', 'Overtime pay', 'Total'],
      rows: [
        ['$20/hr, 40 reg + 10 OT at 1.5x', '$800', '$300', '$1,100'],
        ['$25/hr, 40 reg + 8 OT at 1.5x', '$1,000', '$300', '$1,300'],
        ['$30/hr, 40 reg + 5 OT at 2.0x', '$1,200', '$300', '$1,500'],
      ],
    },
    pitfalls: 'Overtime pay is taxed as ordinary income - there is no special higher rate. However, your paycheck withholding may look larger during overtime weeks because payroll systems annualise your earnings. This is a timing difference, not a permanent tax increase. Also note that not all employees qualify: exempt salaried workers above the FLSA threshold may not receive overtime.',
    faqs: [
      { q: 'What is the overtime rate in the US?', a: 'The US FLSA requires at least 1.5 times the regular hourly rate for hours over 40 per workweek for non-exempt employees. California also has a daily rule: 1.5x after 8 hours in one day, and 2x after 12 hours in one day or on the seventh consecutive day of work.' },
      { q: 'Is overtime pay mandatory for salaried workers?', a: 'Salaried workers earning below $684 per week ($35,568 annually) are entitled to FLSA overtime regardless of title. Above that threshold, exemption depends on job duties - executive, administrative, and professional roles may qualify as exempt. Job title alone does not determine overtime eligibility.' },
    ],
  },

  'time-and-a-half': {
    definition: [
      'Time and a half is an overtime pay rate equal to 1.5 times an employee\'s regular hourly wage. It is the minimum overtime rate required by the US Fair Labor Standards Act for non-exempt employees working more than 40 hours in a workweek.',
      'The name refers to the structure of the payment: you receive your normal time (1x) plus an additional half (0.5x), totalling 1.5x. At $20/hr, time and a half is $30/hr for each overtime hour.',
    ],
    whenToUse: 'Use time and a half as your default overtime multiplier when calculating US overtime pay unless your employer, state law, or employment contract specifies a higher rate. California requires double time (2x) in certain daily overtime situations.',
    examples: {
      headers: ['Regular rate', 'Time-and-a-half rate', 'Extra earned per hour'],
      rows: [
        ['$15/hr', '$22.50/hr', '+$7.50'],
        ['$20/hr', '$30.00/hr', '+$10.00'],
        ['$30/hr', '$45.00/hr', '+$15.00'],
        ['$50/hr', '$75.00/hr', '+$25.00'],
      ],
    },
    pitfalls: 'Some employers describe overtime pay informally as "time and a half" when they actually pay a different rate. Always check your employment contract or collective agreement for the exact multiplier. Outside the US, 1.5x is not universal - France starts at 1.25x, Japan at 1.25x, and India requires 2x.',
    faqs: [
      { q: 'Is time and a half the same everywhere?', a: 'No. The 1.5x rate is the US federal standard under the FLSA, but other countries use different multipliers. France pays 1.25x for hours 36-43 and 1.5x beyond 43. Japan uses 1.25x for standard overtime and 1.35x on weekends. Australia starts at 1.5x but moves to 2x after the first two overtime hours.' },
      { q: 'Does time and a half apply to bonuses?', a: 'Non-discretionary bonuses (e.g. attendance or production bonuses) must be included in the regular rate of pay before calculating overtime, which can raise the effective overtime rate above the simple 1.5x of base wages. Discretionary bonuses paid at the employer\'s sole discretion are excluded from the regular rate.' },
    ],
  },

  'regular-rate-of-pay': {
    definition: [
      'The regular rate of pay is the baseline hourly rate used to calculate overtime compensation under the FLSA. For hourly workers it equals the standard hourly wage. For salaried workers it is calculated by dividing the weekly salary by the number of hours the salary is intended to cover.',
      'The regular rate must include most forms of compensation - base wages, shift differentials, and non-discretionary bonuses - but excludes purely discretionary bonuses, overtime premiums already paid, and certain benefit payments.',
    ],
    whenToUse: 'Use the regular rate of pay when computing overtime for any worker whose compensation includes more than a simple hourly wage. If a worker earns a bonus, commission, or shift premium, these amounts are added to base wages before dividing by hours to determine the correct regular rate.',
    examples: {
      headers: ['Worker type', 'Weekly earnings', 'Hours', 'Regular rate'],
      rows: [
        ['Hourly worker', '$800 (40 hrs x $20)', '40', '$20.00/hr'],
        ['Salaried non-exempt', '$1,200 salary for 40 hrs', '40', '$30.00/hr'],
        ['Hourly + $100 bonus', '$900 total ($800 + $100)', '40', '$22.50/hr'],
      ],
    },
    pitfalls: 'Many employers mistakenly calculate overtime using base wage only, ignoring bonuses or shift differentials. This understates the regular rate and results in underpayment of overtime. The FLSA requires that most non-discretionary extra pay be factored in before the 1.5x multiplier is applied.',
    faqs: [
      { q: 'How do you calculate the regular rate for a salaried worker?', a: 'Divide the weekly salary by the number of hours the salary covers. A $1,200 weekly salary for a 40-hour week gives a $30/hr regular rate. Overtime hours beyond 40 must then be paid at $45/hr (1.5x). The salary itself covers the first 40 hours; only the 0.5x premium is additional.' },
      { q: 'Does the regular rate include overtime premiums already paid?', a: 'No. Overtime premiums already paid (the extra 0.5x above base rate) are excluded when computing the regular rate. This prevents double-counting. Also excluded: discretionary bonuses, vacation or sick pay, and reimbursements for expenses.' },
    ],
  },

};
