export interface GlossaryExample {
  headers: string[];
  rows: string[][];
}

export interface QuizQuestion {
  q: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  explanation: string;
}

export interface GlossaryContent {
  definition: string[];
  beginnerExplain?: string[];
  whenToUse: string;
  examples?: GlossaryExample;
  pitfalls?: string;
  faqs: { q: string; a: string }[];
  quiz?: { topic: string; questions: QuizQuestion[] };
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
    quiz: {
      topic: 'Adjusted EBITDA',
      questions: [
        {
          q: 'What is the primary purpose of Adjusted EBITDA?',
          options: ['To report EBITDA under GAAP standards for public filings', 'To show normalised, repeatable EBITDA under steady-state operations by removing non-recurring items', 'To calculate the tax liability owed on operating profits', 'To measure total revenue after deducting all costs including interest'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'Adjusted EBITDA starts with reported EBITDA and adds back or removes items management considers non-recurring, non-cash, or unrepresentative. The goal is to reveal what EBITDA will look like year after year - the normalised figure buyers, lenders, and acquirers use for valuation and debt capacity analysis.',
        },
        {
          q: 'Using the worked example (Reported EBITDA $4,200,000 + $300,000 restructuring + $150,000 SBC - $200,000 asset sale gain), what is Adjusted EBITDA?',
          options: ['$4,200,000', '$4,650,000', '$4,850,000', '$4,450,000'] as [string, string, string, string],
          correct: 3 as const,
          explanation: '$4,200,000 + $300,000 + $150,000 - $200,000 = $4,450,000. Add-backs increase the figure; removing the non-recurring asset sale gain reduces it. The net result is a $250,000 increase over reported EBITDA.',
        },
        {
          q: 'Which parties primarily use Adjusted EBITDA to set valuations and determine debt capacity?',
          options: ['Private equity buyers, lenders, and strategic acquirers', 'Government tax authorities and external auditors', 'Central banks and regulatory bodies', 'Human resources departments setting executive pay'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition states that private equity buyers, lenders, and strategic acquirers use Adjusted EBITDA to set valuations and determine how much debt a business can service. It is the normalised profitability figure that represents the business under steady-state operations.',
        },
        {
          q: 'What does the pitfalls section identify as a red flag in Adjusted EBITDA reporting?',
          options: ['When Adjusted EBITDA equals reported EBITDA with no add-backs', 'When the reconciliation table has fewer than three adjustment line items', 'When Adjusted EBITDA is materially higher than reported EBITDA across multiple consecutive years', 'When restructuring charges are the largest single add-back item'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'An Adjusted EBITDA that is materially higher than reported EBITDA over multiple years suggests recurring costs are being classified as non-recurring. If a cost will realistically recur next year, it should remain in reported EBITDA rather than being added back.',
        },
        {
          q: 'Why is stock-based compensation (SBC) a controversial add-back in Adjusted EBITDA?',
          options: ['SBC is defined by GAAP as a mandatory exclusion from all adjusted metrics', 'SBC is non-cash but represents real economic dilution to shareholders, so many sophisticated investors do not add it back', 'Adding back SBC is prohibited under IFRS reporting standards', 'SBC only qualifies as an add-back for companies with fewer than 500 employees'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'SBC is non-cash, which is the standard justification for adding it back. However, it dilutes shareholders and is therefore a real economic cost. As the FAQ notes, many sophisticated investors exclude SBC add-backs to get a more conservative view of profitability.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'arithmetic': {
    definition: [
      'Arithmetic is the branch of mathematics concerned with numbers and the four fundamental operations: addition (+), subtraction (-), multiplication (×), and division (÷). Every more advanced mathematical concept - percentages, fractions, algebra, and statistics - is built on top of these four operations and the rules that govern them.',
      'Each operation has an inverse that undoes it: subtraction reverses addition; division reverses multiplication. This pairing is the foundation of equation solving - to isolate an unknown, you apply the inverse operation to both sides until the unknown stands alone.',
      'When an expression contains multiple operations, the order in which they are evaluated matters. The standard convention - called PEMDAS in the US and BODMAS in the UK - specifies: Parentheses first, then Exponents, then Multiplication and Division (left to right), then Addition and Subtraction (left to right). The expression 3 + 4 × 2 evaluates to 11, not 14, because multiplication is applied before addition.',
    ],
    beginnerExplain: [
      'Think of a grocery store. When you add prices in your head at checkout, that\'s addition. Figuring out your change is subtraction. Calculating the cost of six identical items is multiplication. Splitting the total equally with three friends is division. Those four actions - add, subtract, multiply, divide - are arithmetic.',
      'Every formula you see on a calculator site is just these four operations combined in a specific order. Once you know how to do each one and when they apply, you can follow any calculation step by step.',
    ],
    whenToUse: 'Arithmetic applies any time you are combining, comparing, or scaling quantities. Use addition and subtraction to find totals and differences; use multiplication and division to scale, partition, or convert. Every formula on this site - from percentage change to compound interest - is built from these four operations applied in a defined sequence.',
    examples: {
      headers: ['Operation', 'Symbol', 'Example', 'Result', 'Inverse operation'],
      rows: [
        ['Addition', '+', '350 + 125', '475', 'Subtraction'],
        ['Subtraction', '-', '475 - 125', '350', 'Addition'],
        ['Multiplication', '×', '12 × 8', '96', 'Division'],
        ['Division', '÷', '96 ÷ 12', '8', 'Multiplication'],
      ],
    },
    pitfalls: 'The most common arithmetic error is applying operations in the wrong order. In 2 + 3 × 4, multiplication takes priority: 3 × 4 = 12, then 2 + 12 = 14. Reading left-to-right without operator precedence gives the wrong answer of 20. The fix: add parentheses to force the intended order, writing (2 + 3) × 4 = 20 if multiplication of the sum is what you want. Division by zero is the other fundamental error - no number multiplied by zero produces a non-zero result, so the operation is undefined and calculators return an error.',
    faqs: [
      { q: 'What are the four basic arithmetic operations?', a: 'Addition, subtraction, multiplication, and division. Addition finds the total of two or more numbers; subtraction finds the difference. Multiplication is repeated addition; division splits a quantity into equal parts. Every calculation on this site - percentages, fractions, compound interest - combines these four operations.' },
      { q: 'What is the order of operations (PEMDAS / BODMAS)?', a: 'PEMDAS (US) and BODMAS (UK) are mnemonics for the same rule: evaluate Parentheses/Brackets first, then Exponents/Orders, then Multiplication and Division left to right, then Addition and Subtraction left to right. In 3 + 4 × 2, multiplication is applied first: 4 × 2 = 8, then 3 + 8 = 11 - not 14.' },
      { q: 'What is the difference between arithmetic and mathematics?', a: 'Arithmetic is a subset of mathematics that deals specifically with numbers and the four basic operations. Mathematics also includes algebra, geometry, statistics, and calculus. All of these branches rely on arithmetic as their foundation - algebra manipulates arithmetic expressions using letters; statistics summarises arithmetic across many values.' },
      { q: 'Why is division by zero undefined?', a: 'Division asks how many times the divisor fits into the dividend. No number of times can zero be added to itself to reach a non-zero number, so the question has no valid answer. In formal mathematics the result is described as undefined; in calculators it returns an error.' },
    ],
    quiz: {
      topic: 'arithmetic',
      questions: [
        {
          q: 'What are the four basic arithmetic operations?',
          options: ['Addition, subtraction, multiplication, and division', 'Addition, subtraction, multiplication, and modulo', 'Addition, multiplication, exponentiation, and division', 'Addition, subtraction, multiplication, and integration'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition states arithmetic is concerned with four fundamental operations: addition, subtraction, multiplication, and division. Every more advanced mathematical concept is built on these four operations.',
        },
        {
          q: 'Using PEMDAS, what does 3 + 4 × 2 equal?',
          options: ['14 - addition is performed first, giving 7, then multiplied by 2', '11 - multiplication is performed first (4 × 2 = 8), then 3 + 8', '24 - all numbers are multiplied together', '10 - an incorrect application of left-to-right order'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition gives this exact example: 3 + 4 × 2 = 11, not 14, because PEMDAS requires multiplication before addition. 4 × 2 = 8, then 3 + 8 = 11.',
        },
        {
          q: 'From the examples table, what is the inverse operation of multiplication?',
          options: ['Addition', 'Subtraction', 'Exponentiation', 'Division'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The examples table shows that division is the inverse of multiplication: 12 × 8 = 96, and 96 ÷ 12 = 8. Inverse operations undo each other.',
        },
        {
          q: 'What does the pitfalls section identify as the most common arithmetic error?',
          options: ['Rounding intermediate results before reaching the final answer', 'Confusing percentages with fractions when performing calculations', 'Applying operations in the wrong order by ignoring operator precedence', 'Using the wrong units when multiplying or dividing measurement quantities'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section states the most common arithmetic error is applying operations in the wrong order. In 2 + 3 × 4, multiplication takes priority: 3 × 4 = 12, then 2 + 12 = 14. Reading left-to-right gives the wrong answer of 20.',
        },
        {
          q: 'Why is division by zero undefined?',
          options: ['Zero is a placeholder digit, so using it as a divisor violates positional notation rules', 'Division requires both operands to be positive, and zero is neither positive nor negative', 'No real number multiplied by zero can produce a non-zero result, so the question has no valid answer', 'A historical convention established before zero was accepted as a number in European mathematics'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ explains: division asks how many times the divisor fits into the dividend. No number of times can zero be added to itself to reach a non-zero number, so the operation is undefined. Calculators return an error for this reason.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'CapEx',
      questions: [
        {
          q: 'How does CapEx differ from operating expenses (OpEx) on the financial statements?',
          options: ['CapEx covers only technology investments; OpEx covers all other business costs', 'CapEx reduces EBITDA directly, while OpEx reduces only net income', 'CapEx is capitalised on the balance sheet and expensed as depreciation over the asset\'s life, while OpEx flows through the income statement immediately', 'CapEx requires government disclosure; OpEx does not require formal reporting'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'Unlike OpEx which hits the income statement immediately, CapEx is capitalised on the balance sheet and expensed gradually as depreciation over the asset\'s useful life. This is why CapEx does not directly reduce EBITDA but still represents real cash outflow.',
        },
        {
          q: 'From the examples table, which company type achieves the highest FCF conversion on $5,000,000 EBITDA?',
          options: ['SaaS company - 96% conversion with $200,000 CapEx', 'Manufacturer - 60% conversion with $2,000,000 CapEx', 'Telecom operator - 30% conversion with $3,500,000 CapEx', 'Retailer - 45% conversion with $2,750,000 CapEx'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The SaaS company converts 96% of EBITDA to FCF because it requires only $200,000 in CapEx, generating $4,800,000 in free cash flow. The telecom operator, with $3,500,000 in CapEx, converts only 30% - illustrating why CapEx intensity is critical to evaluating EBITDA quality.',
        },
        {
          q: 'What does the whenToUse section say maintenance CapEx should roughly equal in a mature business?',
          options: ['Annual revenue multiplied by the industry CapEx intensity ratio', 'Annual operating profit after adjusting for working capital changes', 'Annual EBITDA divided by a standard industry valuation multiple', 'Annual D&A (depreciation and amortization)'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The whenToUse section states that maintenance CapEx should be roughly equal to annual D&A in a mature business. If CapEx consistently exceeds D&A, the business is growing its asset base. The relationship between CapEx and D&A is a key indicator of whether a business is investing for growth or just maintaining existing capacity.',
        },
        {
          q: 'What does the pitfalls section warn about deferring maintenance CapEx in the short term?',
          options: ['Deferred CapEx triggers an immediate EBITDA restatement under GAAP', 'It makes FCF appear temporarily strong, but eventually leads to higher spending when degraded assets need repair', 'Deferred CapEx must be disclosed as a contingent liability on the balance sheet', 'Deferred CapEx reduces depreciation charges, which overstates EBIT in subsequent periods'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section warns that deferring CapEx makes free cash flow appear temporarily strong. Eventually the business must spend more to repair or replace degraded assets. This is why multi-year CapEx trends must be reviewed rather than a single year\'s figure.',
        },
        {
          q: 'According to the FAQ, what standard governs whether internally developed software is treated as CapEx or OpEx?',
          options: ['US GAAP ASC 350-40, which classifies software based on development stage and accounting policy', 'IFRS 16, which requires all internally developed software to be expensed immediately as OpEx', 'GAAP ASC 606, based on revenue recognition timing for the software product', 'There are no formal standards - the classification is left entirely to company discretion'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The FAQ states that internally developed software can be either CapEx or OpEx depending on the development stage and accounting policy, with US GAAP ASC 350-40 governing this. Purchased software licences are typically CapEx; cloud and SaaS subscriptions are typically OpEx.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'CDN',
      questions: [
        {
          q: 'What is the primary purpose of a Content Delivery Network (CDN)?',
          options: ['To store and back up user files in multiple cloud data centers', 'To compress and minify JavaScript files before sending them to the browser', 'To serve files from the server location geographically closest to the user, reducing latency', 'To encrypt data transfers between a user\'s browser and the origin server'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'A CDN is a geographically distributed network of servers that caches and serves files from edge locations worldwide. Serving files from the nearest edge location reduces the physical distance data must travel, lowering latency and improving load speed.',
        },
        {
          q: 'When this site says a tool "loads from CDN," what is being fetched from the external CDN provider?',
          options: ['Only the library code (such as Tesseract.js or SheetJS) - your files and data never leave the browser', 'Your input data, which is processed on the CDN server and returned as output', 'The HTML and CSS for the tool page, which are not bundled locally', 'A secure token that authenticates your session before the tool processes your files'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition clarifies that only library code is fetched from the CDN. Your files, text, and input data stay entirely on your device. The library comes down to the browser; your data stays put.',
        },
        {
          q: 'According to the examples table, which CDN library is the largest at approximately 25 MB?',
          options: ['SheetJS, because Excel files can contain complex formatting', 'PDF.js, because PDF rendering requires many font definitions', 'KaTeX, because mathematical notation requires extensive symbol tables', 'Tesseract.js, because it includes the language model for OCR'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The examples table lists Tesseract.js at approximately 25 MB - the largest entry - because it includes the language model needed to recognize text in images. SheetJS (~1 MB), PDF.js (~2 MB), mammoth.js (~0.5 MB), and KaTeX (~0.3 MB) are all significantly smaller.',
        },
        {
          q: 'What does the pitfalls section identify as the main trade-off of CDN loading?',
          options: ['CDN delivery always increases page load time compared to bundled code', 'If the CDN is unreachable, the tool will fail to load its library and will not function', 'CDN loading requires a paid subscription to an external service provider', 'CDN files are not cached by the browser, so every visit re-downloads the library'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section states the main trade-off is dependency on a third-party service. If the CDN is unreachable (rare, but possible), the tool will fail to load its library. CDN loading on this site is limited to large, infrequently-used libraries where the trade-off favors CDN delivery.',
        },
        {
          q: 'According to the FAQ, which types of tools on this site do NOT require CDN loading?',
          options: ['Tools that process images, such as OCR and PDF converters', 'Tools built with React or other JavaScript frameworks', 'Simpler tools such as text and code comparison, which run on pure JavaScript bundled into the page', 'Tools available only on desktop browsers, not mobile'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ explains that tools needing large specialised libraries (OCR, Excel parsing, PDF rendering) use CDN loading. Simpler tools like text and code comparison run on pure JavaScript bundled directly into the page, requiring no external CDN fetch.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'COGS',
      questions: [
        {
          q: 'What does Cost of Goods Sold (COGS) measure?',
          options: ['All costs a company incurs during a period, including sales, marketing, and administrative expenses', 'The aggregate of all direct costs incurred to produce the goods or deliver the services a company sells', 'The overhead costs of running the business, such as rent and management salaries', 'The total expenses deducted from revenue to arrive at net income'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'COGS covers only direct production costs - the costs that vary directly with units produced or services delivered. Sales, marketing, HR, and executive costs are operating expenses, not COGS.',
        },
        {
          q: 'Which of the following salaries would be classified as COGS rather than operating expenses?',
          options: ['Marketing manager salary', 'HR director salary', 'CEO salary', 'Factory production line worker salary'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'Only direct labour salaries - wages paid to workers directly involved in production or service delivery - count as COGS. Salaries of sales, marketing, HR, and executive staff are operating expenses (SG&A), not COGS.',
        },
        {
          q: 'According to the examples table, what are the COGS components for the SaaS company?',
          options: ['Hosting and support staff', 'Wholesale cost of goods', 'Materials, labour, and factory overhead', 'Direct labour hours and client project costs'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The examples table shows the SaaS company\'s COGS is made up of hosting and support staff, totalling $1,600,000 on $8,000,000 revenue - a gross profit of $6,400,000. This reflects the definition that software companies often count only hosting costs and customer support as COGS.',
        },
        {
          q: 'What does the pitfalls section warn is a red flag when reviewing a company\'s gross margin trend?',
          options: ['A gross margin that is higher than the industry average by more than 10 percentage points', 'A business that reports identical gross margins in two consecutive years', 'A sudden gross margin improvement with no corresponding operational change, which may signal cost reclassification', 'A gross margin that tracks closely with changes in EBITDA margin over time'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section warns that companies can improve reported gross margins by reclassifying costs from COGS to operating expenses. A sudden improvement without an operational reason may indicate reclassification rather than genuine margin improvement.',
        },
        {
          q: 'According to the FAQ, what is the formula for calculating COGS for a retailer?',
          options: ['Beginning Inventory + Purchases - Ending Inventory', 'Revenue - Gross Profit - Operating Expenses', 'Beginning Finished Goods + Cost of Goods Manufactured - Ending Finished Goods', 'Total direct labour costs + total raw material costs'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The FAQ states that for a retailer, COGS = Beginning Inventory + Purchases - Ending Inventory. For a manufacturer, the formula is more complex: Beginning Finished Goods + Cost of Goods Manufactured - Ending Finished Goods.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'depreciation and amortization',
      questions: [
        {
          q: 'What does depreciation represent in accounting?',
          options: ['The systematic allocation of a tangible asset\'s cost over its useful life', 'The cash paid out when a long-term asset is purchased', 'The reduction in an asset\'s market value due to wear and tear', 'A tax deduction applied to all operating expenses in the year of purchase'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'Depreciation allocates a tangible asset\'s cost over its useful life. A $500,000 machine with a 10-year life generates $50,000 of depreciation expense each year rather than being expensed in full at the time of purchase.',
        },
        {
          q: 'What distinguishes amortization from depreciation?',
          options: ['Amortization is always calculated using an accelerated method; depreciation always uses straight-line', 'Amortization applies only to assets held for more than 20 years; depreciation applies to shorter-lived assets', 'Amortization reduces a company\'s cash balance directly; depreciation does not', 'Amortization applies to intangible assets such as patents and customer lists; depreciation applies to tangible assets such as equipment and buildings'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The definition explains that depreciation applies to tangible assets (machines, buildings) while amortization is the same concept applied to intangible assets (patents, customer lists, trademarks, software). The mechanics are identical - both allocate an asset\'s cost over its useful life.',
        },
        {
          q: 'According to the examples table, what is the annual straight-line depreciation on an office building costing $2,000,000 with a 40-year useful life?',
          options: ['$40,000 per year', '$60,000 per year', '$50,000 per year', '$80,000 per year'] as [string, string, string, string],
          correct: 2 as const,
          explanation: '$2,000,000 / 40 years = $50,000 per year. The table shows this is the same annual charge as the manufacturing machine ($500,000 / 10 years), illustrating how cost and useful life together determine the depreciation amount.',
        },
        {
          q: 'What does the pitfalls section warn about treating EBITDA as equivalent to free cash flow?',
          options: ['EBITDA overstates cash generation because it does not add back non-cash interest expense', 'EBITDA ignores the CapEx requirement to replace depreciating assets, which is a real economic cost even though D&A is non-cash', 'EBITDA understates cash generation because it still includes amortization of intangibles', 'EBITDA is a GAAP metric, so comparing it to non-GAAP free cash flow is methodologically invalid'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section states that D&A is a real economic cost even though it is non-cash - an asset that depreciates to zero must eventually be replaced, often at higher cost. Treating EBITDA as free cash flow ignores this CapEx requirement, especially in capital-intensive industries.',
        },
        {
          q: 'What accounting consequence does the FAQ identify from using accelerated depreciation for tax purposes?',
          options: ['The company must restate prior-year financial statements to reflect the accelerated method', 'Operating profit (EBIT) becomes permanently higher than it would be under straight-line depreciation', 'The difference between tax and book depreciation is disclosed as a contingent asset on the balance sheet', 'A deferred tax liability is created on the balance sheet, because more depreciation is deducted for tax than is recorded in the financial statements'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The FAQ states that accelerated depreciation allows a company to deduct more in early years for tax than it records in its financial statements. This timing difference creates a deferred tax liability on the balance sheet.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'EBIT',
      questions: [
        {
          q: 'What does EBIT stand for, and what does it measure?',
          options: ['Earnings Before Income Tax - profit after deducting interest but before deducting tax', 'Earnings Before Investment and Taxes - profit after excluding all non-operating items', 'Earnings Before Interest and Tax - operating profit from core business activities before financing costs or taxes', 'Earnings Between Investments and Taxes - the midpoint between gross profit and net income'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'EBIT stands for Earnings Before Interest and Tax, also called Operating Profit. It measures income from core business activities after deducting COGS and all operating expenses including D&A, but before accounting for how the business is financed or taxed.',
        },
        {
          q: 'What is the mathematical relationship between EBIT and EBITDA?',
          options: ['EBIT = EBITDA + Interest Expense + Tax Expense', 'EBITDA = EBIT + Depreciation + Amortization', 'EBIT = EBITDA - Net Income + Tax Expense', 'EBITDA = EBIT - CapEx + Working Capital Changes'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'EBITDA = EBIT + Depreciation + Amortization. EBITDA adds back the non-cash D&A charge to show a closer approximation of cash profit, while EBIT retains D&A as a cost and reflects the economic impact of using long-lived assets.',
        },
        {
          q: 'In the examples table, Company A and Company B both report $5,000,000 EBIT. Company A pays $500,000 in interest; Company B pays $2,000,000. At a 30% tax rate, what is Company B\'s net income?',
          options: ['$3,150,000', '$2,450,000', '$2,800,000', '$2,100,000'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'Company B: EBT = $5,000,000 - $2,000,000 = $3,000,000. Net Income = $3,000,000 x (1 - 0.30) = $2,100,000. Despite identical EBIT, Company B\'s higher debt load reduces net income by $1,050,000 vs Company A - illustrating why EBIT strips out capital structure differences.',
        },
        {
          q: 'The pitfalls section notes that EBIT includes depreciation. What consequence does this have for asset-heavy businesses?',
          options: ['EBIT can understate cash generation for asset-heavy businesses, because depreciation is a non-cash charge that reduces EBIT without any cash outflow', 'EBIT overstates cash generation for asset-heavy businesses because it includes all operating cash outflows', 'EBIT cannot be used to compare asset-heavy businesses because each company defines depreciation differently', 'EBIT penalises asset-light businesses more than asset-heavy businesses by excluding financing costs'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The pitfalls section states that EBIT includes depreciation, which can understate cash generation for high-D&A businesses because D&A is non-cash. This is why EBITDA is preferred for M&A valuation while EBIT is more useful for operational comparisons.',
        },
        {
          q: 'According to the FAQ, when is EBIT margin more useful than EBITDA margin?',
          options: ['When comparing companies operating in different countries with different corporate tax rates', 'When assessing the debt capacity of a business for a leveraged buyout', 'When comparing companies with similar capital intensity, because EBIT includes depreciation as a cost', 'When a company has recently changed its revenue recognition policy, distorting prior-year EBITDA comparisons'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ states that EBIT margin is more useful when comparing companies with similar capital intensity, because it includes depreciation as a cost. EBITDA margin is preferred when companies have very different depreciation policies or when assessing cash generation potential.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'EBITDA',
      questions: [
        {
          q: 'What does EBITDA stand for?',
          options: ['Earnings Before Interest, Taxes, Dividends, and Adjustments', 'Earnings Before Income Tax, Depreciation, and Amortization', 'Earnings Before Interest, Taxes, Depreciation, and Accruals', 'Earnings Before Interest, Taxes, Depreciation, and Amortization'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'EBITDA stands for Earnings Before Interest, Taxes, Depreciation, and Amortization. It strips out financing decisions, depreciation methods, and tax policies from net income to reveal how much operating cash profit the business generates on a comparable basis.',
        },
        {
          q: 'According to the FAQ, what does EBITDA ignore that makes it different from operating cash flow?',
          options: ['Changes in working capital and capital expenditures', 'Revenue from discontinued operations and one-time gains', 'Foreign exchange gains and losses on overseas subsidiaries', 'Differences between cash and accrual accounting for revenue recognition'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The FAQ states that EBITDA ignores changes in working capital and capital expenditures. A business with high EBITDA but rising receivables and heavy CapEx may generate very little actual cash - which is why FCF (Operating Cash Flow minus CapEx) is a more complete measure.',
        },
        {
          q: 'From the examples table, what is the EBITDA for the manufacturer with Net Income $3,000,000, Interest $400,000, Tax $900,000, and D&A $800,000?',
          options: ['$4,300,000', '$4,700,000', '$5,100,000', '$5,500,000'] as [string, string, string, string],
          correct: 2 as const,
          explanation: '$3,000,000 + $400,000 + $900,000 + $800,000 = $5,100,000. The bottom-up method starts with Net Income and adds back Interest, Tax, Depreciation, and Amortization to reach EBITDA.',
        },
        {
          q: 'What does the pitfalls section warn about using EBITDA to value a capital-intensive business?',
          options: ['CapEx should be added back to EBITDA along with D&A to get a more accurate cash profit figure', 'A capital-intensive business that needs heavy reinvestment is worth less than its EBITDA implies, because EBITDA ignores CapEx requirements', 'EBITDA overstates profitability for capital-intensive businesses more than for asset-light businesses in the same sector', 'EBITDA multiple comparisons are only valid between companies with identical depreciation policies'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section states that EBITDA ignores CapEx requirements, so a capital-intensive business needing heavy reinvestment is worth less than its EBITDA multiple suggests. Always review free cash flow conversion (FCF / EBITDA) alongside EBITDA.',
        },
        {
          q: 'According to the FAQ, what is a typical EV/EBITDA multiple range for SaaS companies?',
          options: ['10-25x EBITDA', '5-8x EBITDA', '4-7x EBITDA', '2-4x EBITDA'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The FAQ states that SaaS companies trade at 10-25x EBITDA, reflecting their high growth rates and strong margins. Traditional manufacturers trade at 5-8x and retail at 4-7x. High growth and high margins command premium multiples.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'EBITDA margin',
      questions: [
        {
          q: 'What is the formula for EBITDA Margin?',
          options: ['EBITDA divided by Net Income, expressed as a percentage', 'EBITDA divided by Revenue, expressed as a percentage', 'Gross Profit divided by Revenue, expressed as a percentage', 'EBITDA divided by Total Operating Expenses, expressed as a percentage'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'EBITDA Margin = EBITDA / Revenue x 100. It measures what percentage of each revenue dollar becomes EBITDA, making it scale-independent and suitable for comparing companies of very different sizes within the same sector.',
        },
        {
          q: 'How does EBITDA Margin differ from Net Profit Margin?',
          options: ['EBITDA Margin uses EBIT instead of EBITDA as the numerator; Net Profit Margin uses net income after all adjustments', 'EBITDA Margin is typically calculated quarterly; Net Profit Margin is typically calculated annually', 'EBITDA Margin excludes revenue from one-time transactions; Net Profit Margin includes all revenue', 'Net Profit Margin = Net Income / Revenue, making it always lower than EBITDA Margin because it includes interest, taxes, and D&A'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The FAQ explains that Net Profit Margin = Net Income / Revenue, and includes interest, taxes, and D&A - making it always lower than EBITDA Margin for a profitable company. EBITDA Margin isolates operational efficiency; Net Profit Margin shows bottom-line shareholder return.',
        },
        {
          q: 'From the examples table, which company has the highest EBITDA Margin?',
          options: ['Telecom operator at 33.3%', 'Established SaaS at 30.0%', 'SaaS startup at 15.0%', 'Retail chain at 5.0%'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The telecom operator has the highest EBITDA Margin at 33.3% ($400M EBITDA on $1.2B revenue), just ahead of the established SaaS company at 30.0%. The retail chain is lowest at 5.0%, illustrating how dramatically margin norms differ across industries.',
        },
        {
          q: 'What does the pitfalls section warn about a company with a very high EBITDA Margin?',
          options: ['A high EBITDA Margin always indicates the company is overcharging customers relative to peers', 'A high EBITDA Margin in isolation guarantees the company will outperform peers over the long term', 'A high EBITDA Margin can be misleading if the business is underinvesting in growth or maintenance CapEx', 'A very high EBITDA Margin triggers mandatory disclosure of CapEx plans under GAAP reporting rules'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section warns that a high EBITDA Margin does not always mean a good business - some high-margin companies underinvest in growth or maintenance CapEx. A company with 40% EBITDA Margin but zero growth and heavy deferred maintenance is less valuable than its margin suggests.',
        },
        {
          q: 'According to the FAQ, what is the typical EBITDA Margin range for grocery companies?',
          options: ['10-20%', '3-8%', '15-30%', '30-40%'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ states grocery companies typically have EBITDA Margins of 3-8%, among the lowest of any sector. This compares to SaaS at 15-30% and telecom at 30-40%, which is why the whenToUse section warns that cross-industry margin comparisons are not meaningful.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'EBT',
      questions: [
        {
          q: 'What does EBT stand for, and what does it measure?',
          options: ['Earnings Before Tax - profit after all operating costs and interest expenses, but before income tax is applied', 'Earnings Before Transfers - profit before any cash is distributed to shareholders or debtholders', 'Earnings Between Taxes - the midpoint between gross profit and net income on the income statement', 'Estimated Base Tax - the minimum tax a company must pay regardless of reported income'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'EBT (Earnings Before Tax), also called Pre-Tax Income, is profit after all operating costs and interest expenses but before income tax. The relationship is: EBT x (1 - Tax Rate) = Net Income.',
        },
        {
          q: 'What is the key difference between EBT and EBIT?',
          options: ['EBT excludes both interest and tax; EBIT excludes only tax', 'EBT is calculated annually; EBIT can only be calculated quarterly', 'EBIT excludes both interest and tax; EBT excludes only tax and still includes interest expense', 'EBT is a GAAP metric; EBIT is non-GAAP and can be defined differently by each company'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ clarifies that EBIT excludes both interest and tax, while EBT excludes only tax and still includes interest expense. EBIT is better for comparing operational efficiency across different capital structures; EBT is better for comparing profitability across different tax environments.',
        },
        {
          q: 'From the examples table, all four companies have the same $1,000,000 EBT. Which country results in the lowest Net Income?',
          options: ['USA - $805,000', 'Germany - $715,000', 'UK - $770,000', 'Ireland - $890,000'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'Germany has the highest effective tax rate at 28.5%, resulting in $285,000 of tax paid and Net Income of $715,000 - the lowest of the four. This illustrates why EBT is used for cross-jurisdictional comparisons: identical EBT produces very different Net Income depending on the tax environment.',
        },
        {
          q: 'What does the pitfalls section warn about using EBT to compare companies with different debt levels?',
          options: ['EBT overstates profitability for highly-leveraged companies because interest expense is treated as a tax deduction', 'EBT comparisons are invalid when interest rates differ between the countries where companies are domiciled', 'EBT understates the profitability of debt-free companies because it does not include interest income', 'Companies with heavy debt loads show lower EBT than less-leveraged peers with identical operating performance, because EBT still includes interest expense'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The pitfalls section states that EBT is affected by interest expense - a heavily-leveraged company will show lower EBT than a debt-free peer with identical EBIT. For pure operational comparison, EBIT (which also excludes interest) is the more appropriate metric.',
        },
        {
          q: 'According to the FAQ, what typically happens when a company reports a negative EBT?',
          options: ['The company typically pays zero tax or records a deferred tax asset', 'The company must restate prior-year earnings to reflect the accumulated loss', 'Lenders are automatically notified that the company has breached its debt covenants', 'The effective tax rate is reset to the statutory rate for the current and following year'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The FAQ states that a negative EBT means the company made a pre-tax loss, typically resulting in zero tax or a deferred tax asset. This happens when interest expenses exceed operating profit or when operating losses are large enough to persist after financing costs.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'effective tax rate',
      questions: [
        {
          q: 'How is the Effective Tax Rate calculated?',
          options: ['Statutory Tax Rate divided by Net Income, multiplied by 100', 'Net Income divided by EBT, multiplied by 100', 'Tax Expense divided by Revenue, multiplied by 100', 'Tax Expense divided by EBT (pre-tax income), multiplied by 100'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The Effective Tax Rate = Tax Expense / EBT x 100. It shows the actual percentage of pre-tax income paid as tax in a given period, which often differs significantly from the Statutory Tax Rate set by the government.',
        },
        {
          q: 'What causes the Effective Tax Rate to differ from the Statutory Tax Rate?',
          options: ['The effective rate is always higher because companies must pay penalties and surcharges on top of the statutory rate', 'Tax deductions, credits, loss carry-forwards, tax-exempt income, and profit allocation across jurisdictions with different rates', 'Companies are legally allowed to apply a flat 5% reduction to the statutory rate under most GAAP frameworks', 'The effective rate is set by a company\'s board of directors and adjusted each year'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition explains the gap arises from tax deductions, credits, loss carry-forwards, tax-exempt income, accelerated depreciation, R&D credits, and the mix of income across different tax jurisdictions. Large multinationals often have effective rates significantly below statutory rates.',
        },
        {
          q: 'From the examples table, the tech multinational has EBT of $5,000,000 and pays $400,000 in tax. What is its Effective Tax Rate?',
          options: ['21.0%', '12.0%', '8.0%', '4.0%'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'Effective Tax Rate = $400,000 / $5,000,000 x 100 = 8.0%. Despite a 21% statutory rate, the tech multinational pays only 8.0% - well below statutory, likely due to international profit allocation and tax credits.',
        },
        {
          q: 'What does the pitfalls section recommend when an Effective Tax Rate is well below the statutory rate?',
          options: ['Normalise the effective tax rate to a more conservative level when projecting future Net Income, because the low rate may not be sustainable', 'Disregard the effective rate and use only the statutory rate for all financial projections', 'Increase the valuation multiple to compensate for the additional tax risk embedded in the low effective rate', 'Report the discrepancy to the relevant tax authority as a potential misclassification'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The pitfalls section warns that an effective rate well below statutory may rely on deferred tax assets, international arrangements under regulatory scrutiny, or one-time credits. Normalising to a more conservative rate gives a more reliable projection of future Net Income.',
        },
        {
          q: 'According to the FAQ, when can the Effective Tax Rate be negative?',
          options: ['When a company operates at a net loss and has no taxable income in any jurisdiction', 'When a company\'s statutory tax rate exceeds 50% and it qualifies for a standard OECD hardship exemption', 'When the company defers more than 12 months of tax payments under an agreed instalment plan', 'In rare cases when tax credits or deferred tax benefits exceed the gross tax liability, resulting in a net tax benefit'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The FAQ states a negative effective tax rate is possible but rare - it occurs when tax credits or deferred tax benefits exceed the gross tax liability, so the company receives a net benefit rather than paying tax. The FAQ notes this is uncommon and typically temporary.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'enterprise value',
      questions: [
        {
          q: 'What does Enterprise Value (EV) represent?',
          options: ['The current stock price multiplied by the number of shares outstanding', 'The total value of a company\'s equity, excluding all debt and financial obligations', 'The total economic value of a business - what it would cost an acquirer to buy the entire company, including taking on its debt and receiving its cash', 'The present value of all future dividends a company is expected to pay to shareholders'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'EV = Market Capitalisation + Total Debt - Cash. It represents the total economic cost of acquiring the entire business, including assuming its debt and netting off its cash. This makes EV capital-structure-neutral.',
        },
        {
          q: 'How does Enterprise Value differ from Market Capitalisation?',
          options: ['Market Cap is equity value only (share price x shares outstanding); EV adds debt and subtracts cash to capture the full business value regardless of financing', 'EV only counts listed equity and excludes private shares; Market Cap includes all outstanding shares whether publicly traded or not', 'Market Cap is used for acquisition pricing; EV is used only in equity markets for P/E ratio calculations', 'EV and Market Cap are the same metric expressed in different currencies'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The FAQ explains that Market Cap = Share Price x Shares Outstanding, representing equity value only. EV adds total debt and subtracts cash to capture the full business value regardless of financing. EV is used in M&A; Market Cap is used in equity-only contexts like P/E ratios.',
        },
        {
          q: 'Company A has Market Cap $50,000,000, Debt $30,000,000, and Cash $5,000,000. What is its Enterprise Value?',
          options: ['$80,000,000', '$75,000,000', '$85,000,000', '$55,000,000'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'EV = Market Cap + Debt - Cash = $50M + $30M - $5M = $75M. The examples table confirms Company A has EV of $75M and an EV/EBITDA multiple of 7.5x on $10M EBITDA.',
        },
        {
          q: 'What does the pitfalls section warn about when comparing EV across companies in a peer set?',
          options: ['EV calculations always overstate the value of companies with large pension obligations by ignoring future liabilities', 'EV should be recalculated daily because market capitalisation changes with the stock price', 'EV is not comparable across companies in different countries because FX translation distorts the metric', 'EV calculations can vary depending on what is included in "debt" - analysts must use the same EV definition across the entire peer set'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The pitfalls section states that "debt" can be defined differently - analysts sometimes include lease obligations, pension deficits, and minority interests as debt-like items. For a clean comparison, always use the same EV definition across all companies in the peer set.',
        },
        {
          q: 'According to the FAQ, what is the formula for bridging from Enterprise Value to Equity Value?',
          options: ['Equity Value = EV + Net Debt (Debt + Cash)', 'Equity Value = EV x (1 - Debt/Capital Ratio)', 'Equity Value = EV - Net Debt (Debt - Cash)', 'Equity Value = EV divided by the EV/EBITDA multiple'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ states Equity Value = EV - Net Debt (Debt - Cash). This bridge is used in M&A to calculate the actual offer price per share after accounting for what the acquirer must pay to debt-holders.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'EV/EBITDA',
      questions: [
        {
          q: 'What does an EV/EBITDA multiple of 8x mean?',
          options: ['The business is worth eight times its annual revenue', 'The buyer is paying eight years\' worth of current EBITDA for the entire business', 'The company\'s equity is valued at eight times its net income', 'The business will pay back its purchase price in eight years at the current operating cash flow rate'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition explains that EV/EBITDA answers the question: how many years of current EBITDA would it take to pay the full price of the business? A multiple of 8x means the buyer is paying eight years\' worth of current EBITDA.',
        },
        {
          q: 'According to the FAQ, why is EV/EBITDA preferred over the P/E ratio in M&A?',
          options: ['P/E ratios are only available for publicly traded companies, while EV/EBITDA can be calculated for private businesses', 'EV/EBITDA is calculated quarterly; P/E is only available annually and therefore less current', 'EV/EBITDA includes the effect of non-recurring items; P/E strips them out for a cleaner comparison', 'EV/EBITDA is capital-structure-neutral and pre-tax; P/E uses equity value and net income, which are affected by debt levels and tax rates'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The FAQ explains that P/E = Share Price / EPS, using Equity Value and Net Income - both affected by capital structure and taxes. EV/EBITDA removes those effects, making it valid for comparing companies regardless of debt levels or tax rates.',
        },
        {
          q: 'According to the examples table, which industry typically trades at the highest EV/EBITDA multiple?',
          options: ['SaaS / Cloud Software at 10x-25x', 'Healthcare services at 10x-18x', 'Consumer goods at 8x-14x', 'Industrial manufacturing at 5x-9x'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The examples table shows SaaS / Cloud Software trades at 10x-25x - the highest range. Key drivers are high growth, high margins, and recurring revenue. Grocery / Food retail is at the bottom at 4x-7x due to thin margins and low growth.',
        },
        {
          q: 'What does the pitfalls section warn about comparing two companies with identical EV/EBITDA ratios?',
          options: ['EV/EBITDA comparisons are only valid if both companies were acquired in the same calendar year', 'EV/EBITDA comparisons are unreliable unless both companies use identical revenue recognition policies', 'A company with higher CapEx requirements generates less free cash from the same EBITDA, so identical multiples can conceal very different valuations', 'The multiple must be adjusted for dividend yield before two companies can be directly compared'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section states that two companies with identical EV/EBITDA but different CapEx requirements are not equally valued - the one with higher CapEx generates less free cash. The recommendation is to also calculate EV/EBIT and EV/FCF to triangulate.',
        },
        {
          q: 'According to the FAQ, which EBITDA figure should be used in an M&A acquisition context?',
          options: ['LTM (Last Twelve Months) EBITDA, because historical performance is the most reliable basis for valuation', 'NTM (Next Twelve Months) EBITDA, because buyers are paying for future performance', 'The average of LTM and NTM EBITDA, to balance historical and forward-looking views', 'Five-year average EBITDA, to smooth out cyclical fluctuations in any single year'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ states that in M&A, NTM (Next Twelve Months, i.e. forward) EBITDA is typically used because buyers are paying for future performance. LTM (Last Twelve Months, i.e. trailing) EBITDA is used for historical benchmarking and when forward estimates are unreliable.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'gross profit',
      questions: [
        {
          q: 'What is the formula for Gross Profit?',
          options: ['Revenue minus Cost of Goods Sold (COGS)', 'Revenue minus all operating expenses including SG&A and R&D', 'Revenue minus COGS minus interest expense', 'Net Income plus tax expense plus depreciation'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'Gross Profit = Revenue - COGS. It is the first profitability figure on the income statement, representing what remains after paying the direct costs of producing goods or delivering services, before any overhead, R&D, SG&A, interest, or tax.',
        },
        {
          q: 'What is the key difference between Gross Profit and Net Profit?',
          options: ['Gross Profit is calculated before revenue is recognised; Net Profit is calculated after revenue recognition', 'Gross Profit includes interest income; Net Profit excludes all non-operating income', 'Gross Profit uses cash accounting; Net Profit uses accrual accounting', 'Gross Profit deducts only COGS; Net Profit also deducts operating expenses, interest, and tax - making it always lower than or equal to Gross Profit'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The FAQ states: Gross Profit = Revenue - COGS; Net Profit = Revenue - COGS - OpEx - Interest - Tax. Net Profit deducts every business cost while Gross Profit only deducts direct production costs, so Net Profit is always lower than or equal to Gross Profit.',
        },
        {
          q: 'From the examples table, the SaaS company has Revenue of $8,000,000 and COGS of $1,600,000. What is its Gross Profit?',
          options: ['$7,200,000', '$5,600,000', '$6,400,000', '$6,800,000'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'Gross Profit = $8,000,000 - $1,600,000 = $6,400,000, representing an 80% Gross Margin. The SaaS company has the highest Gross Margin of the four examples in the table because software has near-zero marginal delivery costs.',
        },
        {
          q: 'What does the pitfalls section warn about a business that acquires customers through heavy discounts?',
          options: ['Heavy discounting reduces the EV/EBITDA multiple and makes the business harder to value in an M&A context', 'Despite strong revenue growth, heavy discounting can lead to deteriorating Gross Profit and Gross Margin simultaneously', 'Discounting inflates COGS because promotional costs must be classified as direct production expenses under GAAP', 'A business offering heavy discounts must disclose this in its revenue recognition policy under ASC 606'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section warns that a business acquiring customers with heavy discounts may show strong revenue growth but deteriorating Gross Profit and Gross Margin. This is why both absolute Gross Profit and the margin percentage must be tracked together.',
        },
        {
          q: 'According to the FAQ, what does a negative Gross Profit indicate?',
          options: ['COGS exceeds Revenue, meaning the company is selling products for less than they cost to produce - a fundamental unit economics problem', 'The company has recorded a one-time write-down that temporarily exceeded the current period\'s revenue', 'The company\'s Revenue is negative, which occurs when product returns exceed new sales in a given period', 'The company has reclassified operating expenses into COGS, distorting the gross profit line'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The FAQ states that a negative Gross Profit occurs when COGS exceeds Revenue - meaning the company is selling products for less than they cost to produce. This is described as a fundamental unit economics problem that is a critical warning sign and rarely sustainable.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'gross profit margin',
      questions: [
        {
          q: 'What does Gross Profit Margin measure?',
          options: ['The percentage of total costs that are fixed versus variable, separating overhead from direct production expenses', 'The difference between revenue and operating expenses expressed as a percentage of total assets', 'What proportion of each revenue dollar remains after paying the direct costs of producing goods or services - gross profit divided by revenue', 'The percentage increase in gross profit from one period to the next, measuring growth in absolute profit terms'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition states that Gross Profit Margin is Gross Profit expressed as a percentage of Revenue, measuring what proportion of each revenue dollar remains after paying direct production costs. A 40% margin means 40 cents of every revenue dollar is available for operating expenses and profit.',
        },
        {
          q: 'According to the FAQ, how does Gross Profit Margin differ from Net Profit Margin?',
          options: ['Gross Profit Margin only deducts COGS; Net Profit Margin deducts all costs including SG&A, R&D, interest, and tax - the gap between them represents the weight of overhead and financing costs', 'Gross Profit Margin deducts all operating expenses; Net Profit Margin adds back non-cash items like depreciation to give a cash-equivalent profitability view', 'The two measures are identical except that Net Profit Margin uses EPS as its numerator rather than total net income', 'Gross Profit Margin is always higher than Net Profit Margin by a fixed percentage exactly equal to the company\'s effective tax rate'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The FAQ states that Gross Profit Margin only deducts COGS, while Net Profit Margin deducts all costs including SG&A, R&D, interest, and tax. Net Profit Margin is always lower, and the gap represents the weight of overhead and financing costs.',
        },
        {
          q: 'From the industry benchmarks table, which sector shows the lowest typical gross margin range?',
          options: ['Grocery (20-30%), driven by high volume and thin mark-ups on commodity goods', 'Consumer electronics (30-45%), driven by component and assembly costs', 'Pharmaceuticals (60-75%), supported by IP pricing power and low incremental manufacturing cost', 'Construction (15-25%), driven by material and subcontractor costs'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The examples table shows Construction at 15-25% as the lowest range, below Grocery at 20-30%. The primary driver is material and subcontractor costs, which consume a large share of each project\'s revenue.',
        },
        {
          q: 'What does the pitfalls section warn about a sudden improvement in Gross Profit Margin?',
          options: ['A sudden improvement always signals a pricing power breakthrough and should be viewed as an unambiguously positive business development', 'Gross margin improvements can result from COGS reclassification - costs moved from COGS to SG&A improve gross margin without any real operational change - so always check whether the improvement is operational or definitional', 'Sudden gross margin improvements trigger mandatory restatement requirements under GAAP before they can be included in published accounts', 'A sudden improvement most likely means the company has eliminated a major supplier contract and is temporarily operating without sufficient raw materials'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section warns that gross margin improvements can result from COGS reclassification rather than genuine efficiency gains. When gross margin improves suddenly, always check whether the improvement is operational or definitional.',
        },
        {
          q: 'According to the FAQ, what are the main levers for improving Gross Profit Margin?',
          options: ['Reducing administrative headcount, which lowers SG&A and flows through to higher gross margins over time', 'Gross margin can only be improved during periods of low inflation; high-inflation environments always erode margins before prices can be adjusted upward', 'Raising prices (increases revenue without raising COGS), reducing input costs (renegotiating suppliers or improving manufacturing efficiency), and changing product mix toward higher-margin products', 'Vertical integration is the only proven lever; owning the full supply chain eliminates all external mark-ups and directly improves gross margin'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ identifies three main levers: raising prices, reducing input costs (through supplier renegotiation or manufacturing efficiency), and changing product mix toward higher-margin products. Scale can also help by spreading fixed production costs over higher volume.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'net income',
      questions: [
        {
          q: 'What does Net Income represent, and where does it sit on the income statement?',
          options: ['Net Income is revenue minus COGS only, representing what the business earns after production costs but before overhead, interest, and tax obligations are deducted', 'Net Income is profit after deducting every cost - COGS, operating expenses, interest, and tax - and is the final line of the income statement representing what is left for shareholders after all obligations are met', 'Net Income equals Operating Profit (EBIT) with tax added back, reflecting what the core operations generate independently of the company\'s financing decisions', 'Net Income is the sum of all cash inflows minus all cash outflows during a period, bridging the income statement with the cash flow statement at the bottom line'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition states Net Income deducts every cost - COGS, operating expenses, interest, and tax - and is the final line of the income statement. It represents what is left for shareholders after all obligations are met.',
        },
        {
          q: 'Using the income statement example in the entry, what is Net Income when EBT is $2,200,000 and the tax rate is 25%?',
          options: ['$2,200,000 - tax is shown separately as a memo item and has not yet been deducted from the pre-tax profit figure', '$1,925,000 - calculated by deducting only the operating expenses and interest from the original $10,000,000 revenue figure', '$1,500,000 - applying a 30% effective tax rate to EBT rather than the 25% rate used in the example', '$1,650,000 - the result of deducting $550,000 tax (25% of $2,200,000 EBT) from EBT, leaving $1,650,000 for shareholders'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The examples table shows the full waterfall: EBT of $2,200,000 minus 25% tax ($550,000) equals Net Income of $1,650,000. This is the final line after all deductions from the original $10,000,000 revenue.',
        },
        {
          q: 'According to the definition, what happens to Net Income on the balance sheet when it is not distributed as dividends?',
          options: ['Net Income is added to Retained Earnings on the balance sheet, accumulating over time to fund reinvestment in the business, debt repayment, or share buybacks', 'Net Income is transferred directly to the cash account on the balance sheet, increasing reported cash by the exact Net Income amount each period', 'Net Income is recognised as an increase in paid-in capital, temporarily inflating the equity section until dividends are declared and paid in the following period', 'Net Income flows to the financing activities section of the cash flow statement, where it is offset by dividend payments and stock issuances during the period'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition states Net Income flows into the balance sheet through Retained Earnings when not distributed as dividends. The FAQ confirms Retained Earnings accumulate over time to fund reinvestment, debt repayment, or share buybacks.',
        },
        {
          q: 'The pitfalls section warns that Net Income is the most susceptible earnings metric to accounting manipulation. Which specific methods are named?',
          options: ['Companies overstate capital expenditures to reduce depreciation and inflate Net Income over future periods without disclosing the reclassification to investors', 'Management inflates Net Income by classifying operating expenses as financing activities on the cash flow statement, reducing the apparent cost base on the income statement', 'Revenue recognition timing, expense deferral, and impairment reversals can all distort Net Income; the section recommends always cross-checking Net Income against operating cash flow from the cash flow statement', 'Companies understate COGS by capitalizing direct labor costs as long-term assets, shifting expenses off the income statement and boosting gross and net profit margins'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section names three manipulation methods: revenue recognition timing, expense deferral, and impairment reversals. It also notes that Net Income includes non-cash items like depreciation, and recommends cross-checking against operating cash flow.',
        },
        {
          q: 'Can a company report high revenue but negative Net Income, and what does the FAQ cite as an example?',
          options: ['No - high revenue always ensures positive Net Income because direct production costs are the only significant deduction, and healthy revenue margins eliminate the risk of a net loss', 'Yes - this is common in growth-stage companies investing heavily in sales, marketing, and R&D. The FAQ cites Amazon running at or near breakeven Net Income for many years while growing revenue rapidly', 'Yes - but only in capital-intensive industries where depreciation exceeds gross profit, making the manufacturing sector structurally prone to net losses regardless of revenue scale', 'No - public companies must achieve Net Income breakeven before listing, so large-revenue companies by definition report positive Net Income after their IPO'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ confirms that high revenue does not guarantee profitability. Growth-stage companies that invest heavily in sales, marketing, and R&D commonly run negative Net Income - Amazon is cited as a company that ran at or near breakeven Net Income for many years while growing revenue rapidly.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'net profit margin',
      questions: [
        {
          q: 'What makes Net Profit Margin more comprehensive than Gross Profit Margin or EBITDA Margin?',
          options: ['Net Profit Margin and Gross Profit Margin are identical metrics; they differ only in the terminology used by different industries and accounting standards', 'Net Profit Margin deducts every cost - COGS, operating expenses, interest, and tax - whereas Gross Profit Margin only deducts COGS and EBITDA Margin strips out interest, tax, and D&A, making Net Profit Margin the measure that "hides nothing"', 'Net Profit Margin is always lower than EBITDA Margin and always higher than Gross Profit Margin, so it sits in the middle of the profitability hierarchy with no unique informational value', 'Net Profit Margin is adjusted for non-recurring items by default, whereas Gross Profit Margin and EBITDA Margin reflect raw reported figures without any normalisation'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition states that unlike Gross Profit Margin (which only deducts COGS) or EBITDA Margin (which strips out interest, tax, and D&A), Net Profit Margin hides nothing - it deducts every cost from revenue to arrive at the final profit figure.',
        },
        {
          q: 'From the examples table, what net profit margin does the SaaS company achieve on $15,000,000 revenue with $3,000,000 net income?',
          options: ['20.0% - described in the table as "strong for SaaS"', '25.0% - the midpoint of the SaaS benchmark range of 15-30% cited in the FAQ', '7.5% - the margin of the consumer goods brand in the table, not the SaaS company', '15.0% - the lower end of the SaaS industry benchmark range listed in the FAQ'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The examples table shows the SaaS company with $3,000,000 net income on $15,000,000 revenue, giving a 20.0% net margin, which the table labels as "strong for SaaS." The FAQ confirms the typical SaaS range is 15-30%.',
        },
        {
          q: 'Why does the definition argue that Net Profit Margin is most meaningful within an industry rather than across industries?',
          options: ['Companies in different industries use different accounting standards (IFRS vs GAAP), making cross-industry comparisons inherently unreliable without restatement', 'Net Profit Margin is primarily a function of revenue scale rather than cost structure, so only companies of similar size produce comparable margin figures', 'Tax rates vary substantially across jurisdictions, meaning Net Profit Margin reflects tax policy as much as operational quality when comparing across sectors', 'Grocery retailers at 1-3% margins are not necessarily worse businesses than software companies at 20-30% - they have different unit economics, capital requirements, and growth profiles; margin must be evaluated alongside ROE and asset turnover'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The definition states grocery retailers at 1-3% net margins are not necessarily worse businesses than software companies at 20-30% because they have different unit economics, capital requirements, and growth profiles. The margin must be evaluated in the context of return on equity and asset turnover.',
        },
        {
          q: 'Why does the pitfalls section recommend using normalised net margin over 3-5 years rather than a single year\'s figure?',
          options: ['Single-year Net Profit Margin is only reliable for companies with fewer than five product lines; multi-year normalisation is required under GAAP for diversified businesses', 'Annual figures are always restated once the audited accounts are published, making in-year figures unreliable until the full audit cycle completes', 'Net Profit Margin fluctuates due to non-recurring items - asset sales, impairments, tax adjustments, and restructuring charges - making a single year\'s figure potentially highly misleading about underlying profitability', 'Capital expenditure cycles cause Net Profit Margin to vary annually, and the 3-5 year average smooths this CapEx-driven volatility across the investment cycle'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section states that non-recurring items such as asset sales, impairments, tax adjustments, and restructuring charges can make a single year\'s net margin highly misleading. Using a normalised (adjusted) net margin over 3-5 years gives a more reliable picture of profitability.',
        },
        {
          q: 'According to the FAQ, how does financial leverage (debt) affect Net Profit Margin, and what alternative metric is recommended?',
          options: ['Higher leverage improves Net Profit Margin because interest payments reduce taxable income, creating a tax shield that flows back as higher net income relative to revenue', 'Debt increases interest expense, which reduces EBT and therefore Net Income - so two companies with identical operations but different debt levels will show different Net Profit Margins. EBIT Margin is a better comparison for operational efficiency', 'Leverage has no effect on Net Profit Margin because interest expense is excluded from the net income calculation under standard accrual accounting', 'Higher debt always results in a higher Net Profit Margin because lenders impose operational discipline that reduces overhead costs as a condition of the credit agreement'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ states that debt increases interest expense, reducing EBT and Net Income. Two operationally identical companies with different debt levels will report different Net Profit Margins. The FAQ recommends EBIT Margin for comparing operational efficiency when capital structures differ.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'operating expenses',
      questions: [
        {
          q: 'What are Operating Expenses (OpEx), and where do they sit on the income statement?',
          options: ['Operating Expenses are all costs on the income statement including COGS, SG&A, R&D, and depreciation - they collectively reduce revenue to arrive at gross profit', 'Operating Expenses are costs directly tied to producing goods or services (materials and direct labor) that scale proportionally with production volume and appear above gross profit', 'Operating Expenses are the cash costs of running the business, excluding all non-cash charges like depreciation and amortization which are reported separately', 'Operating Expenses are the ongoing costs of running the business not directly tied to producing goods or services - including SG&A, R&D, and depreciation of operating assets - and appear between Gross Profit and Operating Profit (EBIT)'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The definition states OpEx are the ongoing costs not directly tied to producing goods or services, including SG&A, R&D, and depreciation of operating assets. They appear on the income statement between Gross Profit and Operating Profit (EBIT) - distinct from COGS which is deducted to arrive at Gross Profit.',
        },
        {
          q: 'According to the examples table, what is the typical R&D expense range as a percentage of revenue?',
          options: ['5%-25% - reflecting wide variation based on strategy; a biotech or early SaaS company may spend at the high end while a mature consumer goods business spends near the low end', '10%-30% - the same range as Sales & Marketing, since both are treated as growth investment expenses that scale with business ambition', '1%-8% - the range for operating depreciation, sometimes misclassified as R&D when it relates to laboratory or technology infrastructure', '5%-15% - the same range as General & Administrative, since many companies bundle back-office technology costs into R&D for reporting purposes'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The examples table shows R&D at 5%-25% of revenue, described as an "investment" expense that "varies by strategy." This wide range reflects how differently companies invest in product development depending on their competitive position and industry.',
        },
        {
          q: 'What is the key distinction between Operating Expenses (OpEx) and COGS, according to the FAQ?',
          options: ['COGS covers all operational costs including SG&A; OpEx covers only financing-related costs like interest on credit lines used to purchase inventory', 'OpEx and COGS cover the same costs but are separated by company size: smaller companies classify all costs as COGS while larger companies split them into COGS and OpEx', 'COGS covers direct production costs that vary with output (materials, direct labor); OpEx covers overhead and period costs that do not directly scale with units produced (SG&A, R&D) - COGS is deducted to get Gross Profit, OpEx to get Operating Profit', 'COGS is recorded on the balance sheet until goods are sold and then transferred to the income statement; OpEx is immediately expensed, creating a timing difference between the two'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ states COGS covers direct production costs that vary with output, while OpEx covers overhead and period costs that do not directly scale with units produced. COGS is deducted to arrive at Gross Profit; OpEx is deducted to arrive at Operating Profit (EBIT).',
        },
        {
          q: 'What does the pitfalls section warn about companies that temporarily reduce OpEx to boost short-term margins?',
          options: ['Reducing OpEx by cutting marketing or R&D can trigger regulatory scrutiny under GAAP\'s matching principle for deferred investment costs and require additional financial disclosures', 'Companies can temporarily suppress OpEx (by cutting marketing spend, delaying R&D, or reducing headcount) to improve margins in the short term, but this damages future growth - always check whether margin improvement came from genuine efficiency or deferred investment', 'Cutting OpEx below 10% of revenue triggers an automatic goodwill impairment test under IFRS, because cost suppression signals potential going-concern risk that must be disclosed', 'Temporarily reducing OpEx inflates EBITDA but has no effect on EBIT or Net Income, so investors should focus only on EBIT margin trends when evaluating whether margin improvement is sustainable'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section warns that companies can temporarily suppress OpEx by reducing marketing spend, delaying R&D, or cutting headcount. This improves margins in the short term but damages future growth. The key analytical question is whether margin improvement came from genuine efficiency or deferred investment.',
        },
        {
          q: 'According to the FAQ, what effect has cloud computing had on how companies classify IT spending?',
          options: ['Cloud computing converted most software costs from OpEx (annual licenses) to CapEx (multi-year perpetual licenses), increasing balance sheet assets and improving near-term earnings for technology companies', 'Cloud computing eliminated the OpEx vs CapEx distinction for IT entirely, since both on-premise servers and cloud subscriptions are now classified as intangible assets under updated accounting guidance', 'Cloud computing shifted data center costs from OpEx (maintenance and power) to CapEx (hardware), allowing companies to capitalize more spending and report higher near-term operating margins', 'Cloud computing shifted many IT costs from CapEx (servers bought and depreciated over several years) to OpEx (subscription fees expensed immediately), which affects reported profit margins depending on the accounting treatment'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The FAQ states that cloud computing has shifted many IT costs from CapEx (servers) to OpEx (subscriptions), affecting reported margins. Because OpEx reduces profit immediately while CapEx creates a depreciating asset, the shift to cloud subscriptions expenses IT costs faster, which can compress operating margins for companies transitioning from on-premise infrastructure.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'operating profit',
      questions: [
        {
          q: 'What is Operating Profit, and what does it include versus exclude?',
          options: ['Operating Profit is profit after deducting COGS only, leaving the gross profit figure before overhead and administrative costs are applied', 'Operating Profit equals Net Income with interest expense and tax added back, representing a theoretical unlevered pre-tax view of the income statement', 'Operating Profit (also called EBIT or Operating Income) is profit from core operations after deducting COGS and all operating expenses, but before accounting for interest and tax - the third major profit figure below Gross Profit and above EBT', 'Operating Profit is calculated by adding D&A back to EBIT, representing the cash-based equivalent of operational profitability before interest and taxes'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition states Operating Profit (also called EBIT or Operating Income) is profit from core operations after deducting COGS and all operating expenses, but before interest and tax. It is the third major profit figure on the income statement, sitting below Gross Profit and above EBT.',
        },
        {
          q: 'From the examples table, what is Operating Profit on $15,000,000 revenue after COGS of $6M, SG&A of $4.5M, R&D of $1M, and D&A of $500K?',
          options: ['$3,000,000 - a 20% operating profit margin after all four deductions from the $9,000,000 gross profit', '$3,500,000 - if only COGS, SG&A, and R&D are deducted but D&A is excluded as a non-cash item', '$4,500,000 - the SG&A expense line, sometimes confused with operating profit in income statement waterfall presentations', '$9,000,000 - the gross profit figure before operating expenses are deducted from revenue'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The examples table shows the waterfall: $15M revenue minus $6M COGS equals $9M gross profit, then minus $4.5M SG&A, $1M R&D, and $500K D&A equals $3,000,000 Operating Profit - a 20% margin.',
        },
        {
          q: 'Why would two identical businesses - one debt-free and one heavily leveraged - show the same Operating Profit but different Net Income?',
          options: ['Operating Profit is calculated before COGS, so financing decisions about inventory purchasing have no effect on the metric regardless of debt level', 'Leverage affects the balance sheet but not the income statement, so debt levels have no bearing on any income statement metric including Operating Profit, EBIT, EBT, or Net Income', 'Operating Profit and EBIT are different metrics; EBIT includes interest while Operating Profit excludes it, so leveraged companies report a lower EBIT but the same Operating Profit', 'Operating Profit is calculated before interest expense, which is where leverage shows up on the income statement; since both companies have identical operations their COGS and OpEx are the same - only EBT and Net Income diverge based on the interest charge'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The definition states that two identical businesses - one debt-free and one heavily leveraged - will show the same Operating Profit but very different EBT and Net Income. This is because Operating Profit is calculated before interest expense, which is the mechanism through which leverage affects reported earnings.',
        },
        {
          q: 'What does the pitfalls section warn about using Operating Profit for capital-intensive businesses?',
          options: ['Capital-intensive businesses overstate Operating Profit because high CapEx is immediately expensed rather than depreciated, making EBITDA the more accurate profitability measure', 'Operating Profit (which includes D&A) may significantly understate cash generation for capital-intensive businesses relative to EBITDA (which excludes D&A); the gap should be explicitly acknowledged and CapEx requirements evaluated separately', 'Capital-intensive businesses report Operating Profit and EBITDA identically because D&A charges are reclassified as financing costs under IFRS for property, plant, and equipment', 'Operating Profit is the more reliable metric for capital-intensive businesses because EBITDA fails to reflect the true replacement cost of assets that will need to be repurchased when fully depreciated'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section states that for capital-intensive businesses, Operating Profit (which includes D&A) may significantly understate cash generation relative to EBITDA (which excludes D&A). In those cases, the gap between the two metrics should be explicitly acknowledged and CapEx requirements evaluated separately.',
        },
        {
          q: 'According to the FAQ, why do companies focus on Operating Profit in earnings reporting rather than Net Income?',
          options: ['Operating Profit is more stable than Net Income because it excludes the most volatile earnings components, making quarterly comparisons look smoother for investor relations purposes', 'Net Income is not a GAAP measure, whereas Operating Profit is standardized under both GAAP and IFRS, making it the preferred metric for regulatory filings and investor presentations', 'Operating Profit isolates what management directly controls - revenue generation and cost management; interest expense is a financing decision and tax is a government levy, so they are excluded to show the pure operational result', 'Operating Profit excludes depreciation charges, which vary based on accounting policy choices, making it more comparable across companies using different asset useful-life assumptions'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ states that Operating Profit isolates what management directly controls: revenue generation and cost management. Interest expense is a financing decision and tax is a government levy - neither reflects the operational capability of the business. Operating Profit shows the pure operational result.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'operating profit margin',
      questions: [
        {
          q: 'What does Operating Profit Margin measure, and why is it described as "capital-structure-neutral"?',
          options: ['Operating Profit Margin is Net Income divided by Revenue, adjusted to remove tax effects but keep interest expense, making it independent of corporate tax rates across jurisdictions', 'Operating Profit Margin is Operating Profit (EBIT) as a percentage of Revenue, measuring what share of each revenue dollar remains after COGS and operating expenses; it is capital-structure-neutral because it is calculated before interest, so leveraged and debt-free companies with identical operations show the same margin', 'Operating Profit Margin is EBITDA divided by Revenue, stripping out D&A to focus on cash-generative efficiency of the business before financing costs are applied', 'Operating Profit Margin equals Gross Profit as a percentage of Revenue, making it a production efficiency measure that is capital-structure-neutral because production costs are identical regardless of how the business is financed'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition states Operating Profit Margin is Operating Profit (EBIT) as a percentage of Revenue. It is capital-structure-neutral because it is calculated before interest expense - so a highly leveraged company and a debt-free company with identical operations will show the same Operating Profit Margin but different Net Profit Margins.',
        },
        {
          q: 'According to the definition, what does the gap between Gross Profit Margin and Operating Profit Margin reveal?',
          options: ['The gap reflects the weight of SG&A and R&D expenses - the larger the gap, the more overhead the business carries relative to its direct production costs', 'The gap reflects the cost of debt (interest expense) and the tax burden, showing how much financing and government obligations reduce the gross profit figure', 'The gap shows the D&A charge as a percentage of revenue, since Operating Profit includes depreciation while Gross Profit does not, producing a fixed spread between the two margins', 'The gap is always zero for asset-light businesses with no physical inventory, since COGS and OpEx are both negligible and the two margin metrics converge'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition states the gap between Gross Margin and Operating Margin reflects the weight of SG&A and R&D. The gap between Operating Margin and Net Margin reflects the cost of debt (interest) and the tax burden - each gap tells a different story about where margin is lost.',
        },
        {
          q: 'According to the examples table, what is the typical operating margin range for Financial Services, and what drives it?',
          options: ['8%-15% - driven by tight margins on interest income and high compliance overhead that compress profitability below most other sectors', '20%-35% - the same range as SaaS businesses, since both sectors have high gross margins and scalable cost structures', '5%-12% - reflecting intense price competition and overhead costs in consumer financial products distribution', '30%-45% - driven by low COGS and fee and interest income that produce high gross margins with relatively contained overhead'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The examples table shows Financial Services at 30%-45%, with "low COGS; fee and interest income" as the key driver. This is the highest range in the table, above SaaS at 20%-35%, because financial services businesses have minimal direct production costs.',
        },
        {
          q: 'What does the pitfalls section recommend checking before concluding that a high-D&A business has a poor operating margin?',
          options: ['High-D&A businesses always have permanently depressed Operating Margins that cannot be improved operationally; investors should immediately switch to EBITDA without further investigation', 'Check whether the company is misclassifying R&D costs as capital expenditures, which would inflate the D&A charge and artificially suppress the reported operating margin figure', 'Check how much of the gap between Operating Margin and EBITDA Margin is attributable to D&A, and whether that D&A is backed by CapEx at similar levels - because a large D&A charge does not indicate poor operations if CapEx supports it', 'High-D&A businesses should be evaluated using Gross Profit Margin instead of Operating Profit Margin, since the gross margin strip removes all distortion from depreciation methods and asset lives'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section states that before concluding a business has a poor operating margin, check how much of the gap between Operating Margin and EBITDA Margin is attributable to D&A, and whether that D&A is backed by CapEx at similar levels. A large D&A-driven gap is not necessarily a sign of operational weakness.',
        },
        {
          q: 'According to the FAQ, what operating margin threshold signals strong performance for most businesses, and what is the typical SaaS range?',
          options: ['Above 10% is strong for most businesses; SaaS typically achieves 15%-25%, while retail achieves 8%-15% - the FAQ notes that SaaS is the only sector where 10% is considered below average', 'Above 15% signals strong operational efficiency for most businesses; SaaS often achieves 20%-35%, while retail achieves 5%-12% and manufacturing 8%-15%; the FAQ notes the margin is meaningless without benchmarking against direct peers', 'Above 20% is the threshold for strong performance across all industries; any margin below 20% signals excessive overhead regardless of sector', 'Above 30% is considered exceptional for any sector; the 15%-20% range is average across most industries, with only financial services and SaaS consistently exceeding this threshold'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ states above 15% signals strong operational efficiency for most businesses. SaaS often achieves 20%-35%; retail 5%-12%; manufacturing 8%-15%. It explicitly notes the number is meaningless without context - always benchmark against direct peers.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'revenue',
      questions: [
        {
          q: 'What is revenue also called, and where does it appear on the income statement?',
          options: ['The top line, sales, or turnover - the first line above all profit metrics', 'The bottom line - net income after all costs have been deducted', 'Operating income - earnings before interest and taxes (EBIT)', 'Gross profit - revenue minus the cost of goods sold'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition states revenue is also called "the top line," "sales," or "turnover." It is literally the first line of an income statement, above all profit metrics including gross profit, EBITDA, and net income.',
        },
        {
          q: 'From the examples table, which revenue type is described as predictable and valued at premium multiples?',
          options: ['Recurring subscription revenue, such as SaaS monthly fees', 'Transactional revenue, such as e-commerce sales', 'Project/milestone revenue, such as consulting or construction', 'Advertising revenue from media or social platforms'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The examples table shows recurring subscription revenue (SaaS monthly fees) is both predictable and valued at premium multiples. Transactional revenue is variable; project revenue is lumpy; advertising revenue is cyclical.',
        },
        {
          q: 'What does the pitfalls section warn about revenue growth without margin expansion or cash generation?',
          options: ['It is not inherently valuable - "buying" revenue through discounting or high acquisition costs inflates the top line while destroying value', 'It is always beneficial in early-stage businesses because revenue scale is required before margin optimization is possible', 'It signals strong commercial momentum and should be rewarded with higher valuation multiples regardless of profitability', 'It is only a problem in mature industries - high-growth sectors routinely prioritize revenue scale over margin quality'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The pitfalls section states that revenue growth without margin expansion or cash generation is not inherently valuable. Buying revenue through aggressive discounting or high customer acquisition costs inflates the top line while destroying value.',
        },
        {
          q: 'Can revenue be negative? What does the FAQ say?',
          options: ['Yes - when customer returns exceed new sales, revenue is reported as a negative figure', 'No - revenue cannot be negative; if returns exceed gross sales it is reported as zero, and negative adjustments are recorded as contra-revenue or COGS', 'Yes - subscription businesses regularly report negative revenue during heavy promotional periods', 'It depends on the accounting standard: GAAP prohibits negative revenue but IFRS 15 permits it in specific circumstances'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ states revenue cannot be negative. If returns, refunds, or discounts exceed gross sales in a period, revenue is reported as zero. Negative adjustments are typically recorded as contra-revenue or as COGS.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'SG&A',
      questions: [
        {
          q: 'What does SG&A include, and where does it sit on the income statement?',
          options: ['Selling, General & Administrative expenses - below Gross Profit and above Operating Profit (EBIT), the primary driver of the gap between Gross Profit Margin and Operating Profit Margin', 'Sales, Growth & Acquisition expenses - above Gross Profit as a direct production cost alongside COGS', 'Selling, Governance & Administrative expenses - below Operating Profit, classified as a non-operating item alongside interest expense', 'Systems, General & Administrative expenses - deducted directly from revenue before calculating Gross Profit'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'SG&A is Selling, General & Administrative expenses. It sits below Gross Profit and above Operating Profit (EBIT) on the income statement, and is the primary driver of the gap between Gross Profit Margin and Operating Profit Margin.',
        },
        {
          q: 'A business has a 60% Gross Margin and SG&A of 25% of revenue. What is its Operating Margin?',
          options: ['25%', '35%', '60%', '45%'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition gives this exact example: 60% Gross Margin minus 25% SG&A-to-revenue = 35% Operating Margin. Operating Margin is Gross Profit Margin minus all operating expense ratios.',
        },
        {
          q: 'According to the whenToUse section, what does a declining SG&A-to-revenue ratio indicate as revenue grows?',
          options: ['The company is reducing its sales force, which may signal slowing customer acquisition', 'The company is shifting spend from marketing to G&A overhead, lowering return on selling investment', 'The company is growing through acquisitions rather than organic revenue, temporarily compressing the ratio', 'Positive operating leverage - the overhead cost base is scaling more slowly than revenue'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The whenToUse section states that a declining SG&A-to-revenue ratio as revenue grows indicates positive operating leverage. This means fixed and semi-fixed overhead costs are being spread over a larger revenue base.',
        },
        {
          q: 'The pitfalls section warns that SG&A cuts can damage long-term growth. Which type of cuts are most dangerous?',
          options: ['Cuts to rent and facilities through consolidating office footprints and remote-work policies', 'Cuts to G&A functions such as finance, legal, and HR that inflate administrative bloat', 'Cuts to sales and marketing expenses that directly fund customer acquisition and revenue growth', 'Cuts to IT infrastructure by migrating to shared-service centres and cloud platforms'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section specifically warns that "SG&A cuts can be a short-term profit lever that damages long-term growth - particularly cuts to sales and marketing." A company with lower G&A but higher selling costs may actually be more efficiently structured if it converts that spend into revenue.',
        },
        {
          q: 'According to the FAQ, why do SaaS companies often run operating losses during growth phases despite strong gross margins?',
          options: ['Customer acquisition costs (CAC) are expensed immediately as SG&A even though the customer generates recurring revenue for multiple years, front-loading costs into the current period', 'SaaS companies must maintain large on-premise data centre teams classified under G&A, inflating the administrative cost base', 'Software license and support renewal costs are classified as SG&A rather than COGS, inflating the ratio for subscription businesses', 'SaaS businesses have no physical COGS, so the entire cost structure is reclassified into SG&A by accounting standards'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The FAQ explains that CAC is expensed immediately as SG&A even though the customer will generate recurring revenue for multiple years. This front-loading of cost causes operating losses in growth phases despite strong underlying gross margins.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'rnd': {
    definition: [
      'R&D expense covers all costs directly associated with research (generating new knowledge) and development (converting that knowledge into products or processes). Under US GAAP (ASC 730), nearly all R&D costs must be expensed as incurred - meaning they reduce profit in the period they occur rather than being capitalised as an asset. This treatment depresses reported earnings in the current period even when R&D spending generates long-lived competitive advantages.',
      'R&D sits as a separate line item below Gross Profit on the income statement, alongside SG&A, and above Operating Profit (EBIT). Unlike COGS (which varies with production volume) and SG&A (which covers overhead and sales), R&D is a discretionary investment in future capability. A company can cut R&D to hit a short-term earnings target - but doing so sacrifices the product pipeline and long-term competitiveness.',
      'R&D intensity (R&D as a percentage of revenue) varies enormously by industry. Pharmaceutical and biotech companies may spend 15-25% of revenue on R&D to advance drug pipelines. Semiconductor companies run at 15-20%. Enterprise software runs at 10-20%. By contrast, consumer staples and retail may spend under 2%. When comparing EBIT margins across companies, always check whether differences in R&D intensity explain part of the gap.',
    ],
    whenToUse: 'Compare R&D-to-revenue ratios across direct peers to assess investment intensity and strategic posture. When analysing EBIT, consider what profitability would look like at a lower R&D level - but recognise this would reduce future innovation. In valuation, some analysts use R&D capitalisation models to estimate the intangible asset value of accumulated R&D investment on the balance sheet.',
    examples: {
      headers: ['Sector', 'Typical R&D / Revenue', 'Primary R&D purpose'],
      rows: [
        ['Large pharma / biotech', '15-25%', 'Drug pipeline, clinical trials'],
        ['Semiconductors', '15-20%', 'New chip architectures'],
        ['Enterprise software (SaaS)', '10-20%', 'Product development'],
        ['Automotive', '4-6%', 'Vehicle platforms, EV transition'],
        ['Consumer staples', '1-3%', 'Formulation, packaging'],
        ['Retail', '<1%', 'Process improvements'],
      ],
    },
    pitfalls: 'The most common pitfall is confusing R&D expensing with software development capitalisation. Under ASC 350-40, internal-use software development costs in the application development stage are capitalised - not expensed. This creates an inconsistency: a company building internal tools capitalises the cost, while one developing a product to sell to customers expenses it immediately. Under IFRS (IAS 38), development costs (but not research costs) may be capitalised if six specific criteria are met, creating a further divergence between GAAP and IFRS-reporting peers.',
    faqs: [
      { q: 'Is R&D a capital expenditure or an operating expense?', a: 'Under US GAAP, nearly all R&D is an operating expense, expensed immediately (ASC 730). One exception is software development: internal-use software development costs are capitalised under ASC 350-40 once the application development stage begins. Under IFRS (IAS 38), development costs - as distinct from research costs - may be capitalised if six criteria are met, creating a divergence between GAAP and IFRS companies.' },
      { q: 'Why do pharmaceutical companies have such high R&D?', a: 'Developing a new drug from discovery to FDA approval typically requires 10-15 years and over $2 billion in investment, with a high failure rate - roughly 90% of compounds that enter clinical trials never receive approval. Pharma companies must sustain continuous investment to replenish their pipeline as existing drugs lose patent protection. Blockbuster drugs can generate returns that justify the investment, but only a small fraction of R&D spending ever recovers its cost.' },
      { q: 'How does R&D affect EBIT versus EBITDA?', a: 'R&D reduces both EBIT and EBITDA equally, since both metrics include R&D as a line-item operating cost. Unlike Depreciation & Amortization - which EBITDA adds back - there is no standard add-back for R&D. The only scenario where R&D has different impacts is if a company capitalises some R&D costs and amortises them; in that case EBITDA adds back the amortisation while EBIT does not.' },
      { q: 'What is R&D capitalisation?', a: 'R&D capitalisation is the practice of treating R&D costs as a long-lived asset rather than an immediate expense - estimating the balance sheet value of accumulated R&D investment (minus amortisation). It is not standard GAAP practice, but is used by valuation researchers (notably Damodaran) to estimate the true intangible asset base of technology and pharma companies. It can significantly change calculated returns on capital (ROIC) for R&D-intensive businesses.' },
    ],
    quiz: {
      topic: 'R&D expense',
      questions: [
        {
          q: 'Under US GAAP (ASC 730), how are nearly all R&D costs treated?',
          options: ['Capitalised as intangible assets and amortised over their useful life', 'Split equally between an operating expense and a capitalised development asset', 'Deducted against retained earnings rather than flowing through the income statement', 'Expensed immediately, reducing profit in the period they occur'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The definition states that under US GAAP, nearly all R&D costs must be expensed as incurred - reducing profit in the current period even when spending generates long-lived competitive advantages.',
        },
        {
          q: 'Where does R&D appear on the income statement?',
          options: ['Below Gross Profit and above Operating Profit (EBIT), alongside SG&A', 'As part of Cost of Goods Sold (COGS), reducing Gross Profit directly', 'Below Operating Profit (EBIT) but above Earnings Before Tax (EBT)', 'As a non-operating expense below EBIT, similar to interest expense'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition places R&D as a separate line item below Gross Profit and above Operating Profit (EBIT), alongside SG&A. Unlike COGS (which varies with production), R&D is a discretionary investment in future capability.',
        },
        {
          q: 'From the sector table, which two industries have the highest typical R&D intensity as a percentage of revenue?',
          options: ['Enterprise software (SaaS) at 10-20% and automotive at 4-6%', 'Semiconductors at 15-20% and consumer staples at 1-3%', 'Large pharma/biotech at 15-25% and semiconductors at 15-20%', 'Retail at under 1% and consumer staples at 1-3%'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The examples table shows large pharma/biotech at 15-25% (drug pipeline and clinical trials) and semiconductors at 15-20% (new chip architectures) as the two highest-intensity sectors.',
        },
        {
          q: 'What accounting inconsistency does the pitfalls section identify between US GAAP and IFRS for R&D costs?',
          options: ['Under GAAP, R&D includes all software development; under IFRS, only external-use software development is expensed', 'Under IFRS (IAS 38), development costs may be capitalised if six criteria are met; under GAAP, capitalisation applies only to internal-use software - not to product R&D', 'GAAP allows pharmaceutical companies to capitalise clinical trial costs; IFRS requires all clinical costs to be expensed immediately', 'Under IFRS, research costs are capitalised while development costs are expensed; under GAAP, both are always expensed'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section explains that under IFRS (IAS 38), development costs may be capitalised if six specific criteria are met, while GAAP (ASC 730) requires nearly all R&D to be expensed - creating a divergence when comparing GAAP and IFRS peers.',
        },
        {
          q: 'According to the FAQ, in what one scenario does R&D have a different impact on EBIT versus EBITDA?',
          options: ['When R&D spending falls year-over-year, creating a positive EBIT variance not captured by EBITDA', 'When a company\'s R&D exceeds 15% of revenue, triggering different bridge treatment in EBITDA analysis', 'When a company capitalises some R&D costs and amortises them - EBITDA adds back the amortisation while EBIT does not', 'When R&D is reclassified as a below-the-line item in a restructuring rather than an operating expense'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ states the only scenario where R&D has different impacts on EBIT vs EBITDA is when a company capitalises some R&D costs and amortises them. EBITDA adds back that amortisation; EBIT does not.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'working capital',
      questions: [
        {
          q: 'What does Working Capital measure?',
          options: ['A company\'s total long-term assets minus its total long-term liabilities', 'The cash balance held in a company\'s bank accounts at the end of the reporting period', 'The difference between current assets (cash, receivables, inventory) and current liabilities, measuring short-term liquidity', 'A company\'s ability to generate earnings before interest and taxes over the next 12 months'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'Working Capital = Current Assets - Current Liabilities. It measures short-term liquidity - the net financial resources available to fund the next 12 months of operations, not long-term solvency or profitability.',
        },
        {
          q: 'When can negative Working Capital be a structural advantage rather than a warning sign?',
          options: ['When a business collects cash from customers immediately but pays suppliers on extended terms - such as supermarkets - giving it interest-free funding from suppliers', 'When a company uses high leverage and tax-deductible interest payments offset the liquidity risk', 'When a company has very high inventory turnover that keeps Days Inventory Outstanding below 10 days', 'When short-term debt is refinanced frequently, effectively converting current liabilities into long-term obligations'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition states that negative Working Capital is the norm in some business models: retailers like supermarkets collect cash from customers immediately while paying suppliers on 30-60 day terms, generating negative Working Capital as a structural feature rather than a liquidity problem.',
        },
        {
          q: 'According to the definition, what effect does growing accounts payable (suppliers extending terms) have on operating cash flow?',
          options: ['Operating cash flow falls because the company has more obligations to settle in the coming period', 'Operating cash flow is unchanged; accounts payable changes affect only the balance sheet', 'Operating cash flow rises and Working Capital rises, because extended supplier terms reduce net liabilities', 'Working Capital releases cash and operating cash flow increases, because the company defers supplier payments and retains cash longer'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The definition explains: if accounts payable grows (suppliers extending terms), Working Capital releases cash. The company pays out less cash in the current period, so operating cash flow increases even though the income statement is unchanged.',
        },
        {
          q: 'What does the pitfalls section warn about growing businesses and Working Capital?',
          options: ['Growing businesses should reduce Working Capital by switching to just-in-time inventory to fund expansion internally', 'A company that doubles revenue without matching Working Capital financing may face a cash crisis even while remaining profitable', 'Working Capital requirements fall as a business grows, because larger companies gain negotiating power over suppliers', 'Fast-growing businesses must prioritize reducing Days Sales Outstanding before expanding, as DSO is the primary driver of Working Capital crises'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section warns that Working Capital requirements can change rapidly as a business grows. A company that doubles revenue without equivalent Working Capital financing may face a cash crisis even if it is profitable, so always model Working Capital needs as part of a growth plan.',
        },
        {
          q: 'According to the FAQ, what is the key distinction between Working Capital and Cash?',
          options: ['Cash is net of Working Capital; positive Working Capital confirms cash is available, while negative Working Capital means cash is depleted', 'Working Capital and Cash are interchangeable terms; the distinction only matters for accounting presentation purposes', 'Cash is a component of Working Capital (a current asset), and a company can have positive Working Capital but very little cash if most current assets are tied up in slow-moving inventory', 'Cash measures inflows and outflows over a period, while Working Capital is a balance sheet snapshot that never reflects actual liquidity'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ clarifies that cash is a component of Working Capital, not the same thing. Working Capital = Current Assets - Current Liabilities, which includes receivables, inventory, payables, and accruals. A company can show positive Working Capital on paper while being cash-poor if its current assets are mostly slow-moving inventory.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'free cash flow',
      questions: [
        {
          q: 'What is the standard formula for Free Cash Flow (FCF)?',
          options: ['FCF = Net Income + Depreciation - Changes in Working Capital', 'FCF = EBITDA - Interest Expense - Taxes', 'FCF = Revenue - Total Operating Costs - Capital Expenditure', 'FCF = Operating Cash Flow - Capital Expenditure'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The definition states the standard formula is FCF = Operating Cash Flow - Capital Expenditure. A more granular derivation starts from EBITDA and also subtracts changes in working capital and cash taxes, but OCF - CapEx is the standard form.',
        },
        {
          q: 'According to the FAQ, what three factors drive the gap between EBITDA and FCF?',
          options: ['CapEx (often larger than D&A in growing businesses), changes in working capital (which can consume substantial cash), and cash taxes (which EBITDA ignores entirely)', 'Interest expense, tax accruals, and non-cash revenue recognition adjustments under different accounting standards', 'Depreciation method choices, stock-based compensation, and the timing of accounts receivable collection', 'Debt repayments, dividend payments, and share buybacks made during the measurement period'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The FAQ states that the gap between EBITDA and FCF is driven by three factors: CapEx (often larger than D&A), changes in working capital (which can consume substantial cash in fast-growing companies), and cash taxes (which EBITDA ignores entirely).',
        },
        {
          q: 'From the worked examples table, what is the FCF/EBITDA conversion ratio for the Software (SaaS) company?',
          options: ['20% (the utility company\'s conversion ratio)', '78% (SaaS: $39M FCF on $50M EBITDA, with only $5M CapEx and minimal working capital drag)', '36% (the fast-growth retailer\'s conversion ratio)', '28% (the manufacturer\'s conversion ratio)'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The examples table shows the SaaS company converting 78% of its $50M EBITDA into $39M FCF, driven by low CapEx ($5M) and a small positive working capital effect (-$2M). This contrasts with the utility at only 20% due to $35M in CapEx.',
        },
        {
          q: 'What does the pitfalls section warn about when a company\'s CapEx is persistently below its depreciation?',
          options: ['This is an optimal sign that the company has reached peak efficiency and no longer needs to replace equipment', 'When CapEx exceeds depreciation permanently, the business is over-investing and FCF will eventually collapse to zero', 'If CapEx is persistently below depreciation, question whether the business is under-investing - near-term FCF may look high while the underlying asset base quietly deteriorates', 'CapEx and depreciation have no meaningful relationship because they are calculated under entirely different accounting standards'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section warns that a company deferring maintenance CapEx will report high FCF in the short term while its asset base deteriorates. If CapEx is persistently below depreciation, question whether the business is under-investing.',
        },
        {
          q: 'According to the FAQ, why is Free Cash Flow harder to manipulate than net income?',
          options: ['FCF uses audited cash flow statements that regulators review more frequently than income statements', 'FCF calculations exclude all non-cash items, making it impossible to use depreciation to obscure earnings quality', 'FCF is directly observable from bank statements, which management cannot alter without criminal liability under SOX', 'Net income can be inflated through accrual accounting choices - revenue recognition timing, depreciation methods, provisions - without any cash movement; FCF is anchored to actual cash receipts and payments, making it far more difficult to inflate sustainably'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The FAQ explains that net income is subject to numerous accrual accounting choices that can significantly affect reported profit without any cash movement. FCF is anchored to actual cash receipts and payments, making it far more difficult to inflate sustainably.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'operating-cash-flow': {
    definition: [
      'Operating Cash Flow (OCF) is the cash generated by a company\'s core business operations in an accounting period - before any capital expenditure or financing activities. It appears as the subtotal of the "Cash from Operating Activities" section of the three-part cash flow statement. The starting point is net income; non-cash charges such as depreciation and amortisation are added back because they reduced reported income but consumed no cash; changes in working capital accounts (receivables, inventory, payables) are then adjusted because cash collection and payment timing differs from when revenue and expenses are recognised under accrual accounting.',
      'The core equation is OCF = Net Income + Depreciation & Amortisation - Increase in Working Capital. Working capital changes are the most variable and often misunderstood component. When receivables grow (more sales on credit, not yet collected), cash is consumed even though revenue is already booked - OCF falls below net income. When a company collects subscriptions in advance, deferred revenue (a liability) rises and OCF exceeds net income. Inventory build, payables stretch, and prepaid expenses all affect OCF without appearing on the income statement.',
      'OCF is the input for Free Cash Flow: FCF = OCF - CapEx. It is also used independently to test quality of earnings. An OCF-to-Net Income ratio consistently above 1.0x indicates cash earnings are exceeding accrual earnings - a mark of financial quality. A ratio persistently below 0.8x in a mature business signals that accrual profits may be overstated relative to actual cash generation.',
    ],
    beginnerExplain: ['Think of OCF as the cash that actually lands in your business bank account from running the business, before you buy any equipment. Your income statement might show a $50,000 profit for the month, but if $30,000 of that is sitting in unpaid customer invoices, only $20,000 arrived as actual cash. OCF captures that difference: it adjusts accounting profit for items that were counted as income or cost but did not yet move as cash.'],
    whenToUse: 'Use OCF to verify that reported net income is backed by real cash generation - the OCF-to-Net Income ratio is the simplest quality-of-earnings check available from public financials. Use it as the starting point for FCF analysis: once you know how much cash operations produce, subtract CapEx to find what is truly free. Compare OCF trends over time against EBITDA trends: if EBITDA grows but OCF does not, working capital is absorbing the earnings growth - often a warning sign in fast-growing businesses.',
    examples: {
      headers: ['Company', 'Net Income', 'D&A add-back', 'Working capital effect', 'OCF', 'OCF / Net Income'],
      rows: [
        ['SaaS (pre-collects subscriptions)', '$500K', '+$30K', '+$200K (deferred rev rises)', '$730K', '1.46x'],
        ['Retailer (building inventory)', '$1,000K', '+$200K', '-$600K (inventory up)', '$600K', '0.60x'],
        ['Manufacturer (slow collections)', '$800K', '+$150K', '-$500K (receivables up)', '$450K', '0.56x'],
        ['Stable mature business', '$1,500K', '+$200K', '$0', '$1,700K', '1.13x'],
      ],
    },
    pitfalls: 'Two common traps. First, accounts payable stretching: a company that delays payments to suppliers temporarily boosts OCF by keeping cash longer. This is legal but unsustainable - if Days Payable Outstanding keeps extending each quarter, the OCF is flattering the underlying cash position and will eventually reverse. Second, confusion between OCF and EBITDA: EBITDA ignores working capital movements entirely and excludes cash taxes paid. For asset-light businesses with stable working capital, OCF and EBITDA track closely. For businesses with volatile receivables, large inventory builds, or significant cash tax payments, the two can diverge by 30-50%.',
    faqs: [
      { q: 'What is the difference between OCF and FCF?', a: 'OCF is cash from operations before capital expenditure. FCF = OCF - CapEx. OCF measures how well the business generates cash from running itself; FCF measures how much is left after maintaining and growing the asset base. For a SaaS company with minimal CapEx, OCF and FCF are nearly identical. For a manufacturer spending heavily on equipment, OCF can be strong while FCF is thin.' },
      { q: 'Where do I find OCF on a financial statement?', a: 'OCF is the subtotal labelled "Net cash provided by (used in) operating activities" on the cash flow statement. For FCF, you also need CapEx, which appears in the "Cash from Investing Activities" section, typically labelled "Purchase of property, plant and equipment" or "Capital expenditures." CapEx is shown as a negative number; use the absolute value.' },
      { q: 'Why does OCF sometimes exceed net income?', a: 'OCF exceeds net income when non-cash charges (depreciation, amortisation, stock-based compensation) add back more than working capital consumes. It also exceeds net income when customers pay in advance - subscriptions, deposits, retainers - creating deferred revenue liabilities that boost cash received above recognised revenue. A ratio above 1.0x is generally a positive quality-of-earnings signal.' },
    ],
    quiz: {
      topic: 'operating cash flow',
      questions: [
        {
          q: 'What is Operating Cash Flow (OCF) and what is its core equation?',
          options: ['OCF equals net income minus capital expenditure and financing costs, representing the true cash return to shareholders after all obligations are settled', 'OCF is EBITDA adjusted for cash taxes paid, showing how much operating profit converts to real cash before the business invests in new assets or repays debt', 'OCF is the cash generated by core business operations before CapEx or financing activities; the core equation is OCF = Net Income + D&A - Increase in Working Capital', 'OCF is identical to Free Cash Flow and represents the cash available to equity holders after all operating and capital spending obligations are met'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition states OCF is cash generated by core operations before CapEx or financing. The core equation is OCF = Net Income + D&A - Increase in Working Capital. D&A is added back because it reduced reported income but consumed no cash; working capital changes adjust for the timing difference between accrual recognition and actual cash movement.',
        },
        {
          q: 'From the examples table, what is the OCF-to-Net Income ratio for the SaaS company that pre-collects subscriptions?',
          options: ['0.60x - reflecting a large inventory build that absorbs cash relative to reported net income', '1.46x - driven by a $200K deferred revenue increase (advance payments) plus a $30K D&A add-back on $500K net income', '1.13x - the ratio for the stable mature business where working capital effects are neutral', '0.56x - the ratio for the manufacturer with slow collections, where receivables growth consumes cash below the net income line'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The examples table shows the SaaS company at 1.46x: $500K net income plus $30K D&A plus $200K from rising deferred revenue (customers paying in advance) equals $730K OCF. This illustrates how advance subscription payments boost OCF above net income.',
        },
        {
          q: 'What does an OCF-to-Net Income ratio persistently below 0.8x signal in a mature business, according to the definition?',
          options: ['Accrual profits may be overstated relative to actual cash generation - a warning sign that earnings quality is poor and that reported income is not fully converting to cash', 'The company is in a high-growth phase deliberately investing in working capital, and below 0.8x is expected and desirable until expansion slows and working capital stabilizes', 'The company has an unusually asset-light model where most expenses are cash-based, causing OCF to fall below net income because D&A add-backs are minimal', 'The business is financially healthy because OCF below net income signals that customers are paying quickly and accounts receivable is declining'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition states that an OCF-to-Net Income ratio persistently below 0.8x in a mature business signals that accrual profits may be overstated relative to actual cash generation. This is a quality-of-earnings warning; a ratio consistently above 1.0x is the positive signal.',
        },
        {
          q: 'The pitfalls section warns about accounts payable stretching. Why is this a trap when evaluating OCF?',
          options: ['AP stretching permanently inflates OCF because suppliers rarely enforce payment terms, making the OCF figure a reliable long-term signal of strong cash management rather than a temporary distortion', 'AP stretching reduces OCF because paying suppliers faster than necessary drains cash, creating an artificially low OCF that understates the business\'s true earning power', 'AP stretching distorts OCF downward by creating a large payables balance that must be repaid all at once, producing a sudden cash outflow spike when supplier payments finally clear', 'AP stretching (delaying payments to suppliers) temporarily boosts OCF by keeping cash longer - it is legal but unsustainable; if Days Payable Outstanding keeps extending each quarter, the inflated OCF will eventually reverse'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The pitfalls section explains that delaying payments to suppliers keeps cash in the business longer, temporarily boosting OCF. However, if Days Payable Outstanding keeps extending quarter after quarter, the OCF is flattering the true cash position and will reverse once payment practices normalize.',
        },
        {
          q: 'According to the FAQ, why might a manufacturer have strong OCF but thin Free Cash Flow (FCF)?',
          options: ['Manufacturers have high working capital that suppresses OCF far below EBITDA, but FCF is boosted by government investment grants that partially offset heavy capital spending', 'Manufacturers have strong FCF because CapEx is capitalized as long-lived assets, but thin OCF because depreciation of those assets flows through operating expenses and reduces net income', 'Manufacturers spend heavily on equipment (CapEx), and since FCF = OCF - CapEx, even strong OCF can become thin FCF when CapEx requirements are large; for a SaaS company with minimal CapEx, OCF and FCF are nearly identical', 'Manufacturer OCF and FCF diverge because manufacturing companies use the indirect OCF calculation method, which systematically understates OCF relative to the direct method used by service companies'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ states that for a manufacturer spending heavily on equipment, OCF can be strong while FCF is thin because FCF = OCF - CapEx. For a SaaS company with minimal CapEx, OCF and FCF are nearly identical. The CapEx deduction is what separates the two metrics.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'fractions',
      questions: [
        {
          q: 'From the examples table, which type of fraction has a numerator greater than or equal to the denominator?',
          options: ['Proper fraction - numerator < denominator, value < 1', 'Improper fraction - numerator >= denominator, value >= 1', 'Unit fraction - numerator = 1, always less than 1', 'Mixed number - combines a whole number with a proper fraction'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The examples table shows an improper fraction (9/4 = 2.25) has a numerator greater than or equal to the denominator and represents a value of 1 or more. A proper fraction (3/4 = 0.75) has a numerator smaller than the denominator.',
        },
        {
          q: 'What is 1/3 + 1/4? The pitfalls section gives the correct answer.',
          options: ['2/7 - add numerators and add denominators', '7/12 - find the LCD of 3 and 4 (which is 12), then add equivalent fractions', '3/12 - convert both to twelfths but only add one of them', '1/12 - find the product of both denominators, then add the numerators'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section explicitly states adding 1/3 + 1/4 is not 2/7. The LCD of 3 and 4 is 12, giving 4/12 + 3/12 = 7/12. Adding numerators and denominators separately is the most common error.',
        },
        {
          q: 'According to the FAQ, how do you divide two fractions?',
          options: ['Multiply the first fraction by the reciprocal of the second: a/b ÷ c/d = a/b × d/c', 'Find the LCD, convert both fractions, then divide the numerators', 'Divide both numerators together and both denominators together directly', 'Subtract the second fraction from the first and simplify by the GCD'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The FAQ states: multiply the first fraction by the reciprocal of the second - a/b ÷ c/d = a/b × d/c = (a×d)/(b×c). For example, 3/4 ÷ 2/5 = 3/4 × 5/2 = 15/8.',
        },
        {
          q: 'When should you use fractions over decimals, according to the whenToUse section?',
          options: ['When communicating measurements to a general audience who prefers decimal notation', 'When inputting values into digital systems or calculators that expect decimal input', 'When exact rational representation is required and rounding is unacceptable - engineering tolerances, probability, algebraic manipulation', 'When the denominator is a power of 10, since those fractions convert to terminating decimals'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The whenToUse section states: use fractions when exact rational representation is required and rounding is unacceptable - engineering tolerances, probability calculations, and algebraic manipulation. Use decimals when inputting values into digital systems.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'percentages',
      questions: [
        {
          q: 'From the examples table, what is 3/8 expressed as a percentage?',
          options: ['33.33%', '37.5%', '30%', '40%'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The examples table shows 3/8 = 0.375 = 37.5%. As a decimal, 3 ÷ 8 = 0.375; multiply by 100 to get the percentage.',
        },
        {
          q: 'A 50% increase followed by a 50% decrease - what is the net result relative to the original?',
          options: ['Back to 100% of the original, because the changes cancel out', 'At 125% of the original, because increases compound faster than decreases', 'At 75% of the original, a net loss of 25%', 'At 50% of the original, because the decrease wipes out the entire gain'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition states this leaves you at 75% of the start because each percentage is applied to a different base. Starting at 100, a 50% increase gives 150. A 50% decrease on 150 gives 75. The net multiplier is 1.50 × 0.50 = 0.75.',
        },
        {
          q: '"20% off, then an additional 10% off." What is the combined discount according to the pitfalls section?',
          options: ['30% - the discounts simply add together', '28% - the second 10% is applied to the already-reduced price', '25% - the average of 20% and 30%', '18% - the second discount partially reverses the first'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section states: "20% off, then an additional 10% off is not a 30% discount - it is a 28% discount because the second 10% is applied to the already-reduced price." Always identify what the 100% base is.',
        },
        {
          q: 'Can a percentage exceed 100%? What does the FAQ say?',
          options: ['No - percentages represent parts of a whole, so 100% is always the maximum', 'Yes - a percentage exceeds 100% whenever the part is larger than the whole, and percentages below 0% are also valid', 'Only in financial contexts; in scientific measurement, 100% is the defined maximum', 'Yes, but only when describing compound growth over multiple periods'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ confirms yes - a percentage exceeds 100% whenever the part is larger than the whole. A value that has more than doubled is above 200% of its original. Percentages below 0% are also valid for negative returns or temperature changes.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'percentage change',
      questions: [
        {
          q: 'From the examples table, what is the percentage change for a stock price rising from $80 to $100?',
          options: ['+25.00%', '+20.00%', '+16.00%', '+10.00%'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The examples table shows (100 - 80) / 80 × 100 = +25.00%. The original value ($80) is the denominator, not the new value.',
        },
        {
          q: 'A 30% increase followed by a 20% decrease - what is the net percentage change?',
          options: ['+10% - the changes simply add together', '+50% - they multiply by a compounding effect', '+4% - because growth factors multiply: 1.30 × 0.80 = 1.04', '-10% - the decrease more than offsets the increase'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition states that sequential percentage changes must be multiplied as growth factors, not summed. 1.30 × 0.80 = 1.04, a net change of +4%, not +10%.',
        },
        {
          q: 'When is percentage change mathematically undefined?',
          options: ['When the new value is negative', 'When the percentage change exceeds 100%', 'When the original value is zero, because division by zero is undefined', 'When the two values have different units'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section states: when the original value is zero, percentage change is mathematically undefined - division by zero. In those cases, report the absolute change and note that the percentage is not meaningful.',
        },
        {
          q: 'Why is a 50% increase followed by a 50% decrease not zero net change?',
          options: ['Because percentages always understate the true change when combined sequentially', 'Because increases are calculated before taxes, while decreases are calculated after', 'Because each percentage uses a different base - starting at 100, a 50% increase gives 150, then a 50% decrease on 150 gives 75, a 25% net decline', 'Because percentage change rounds to the nearest whole number, introducing cumulative error'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ states: starting at 100, a 50% increase gives 150. A 50% decrease on 150 gives 75 - a net loss of 25%. The net multiplier is 1.50 × 0.50 = 0.75. Each change applies to a different base value.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'percentage decrease',
      questions: [
        {
          q: 'What is the maximum possible percentage decrease for a positive original value?',
          options: ['50% - a value can be halved at most in a single period', '100% - when the value falls to exactly zero', '200% - when the value crosses from positive to negative', 'There is no maximum - values can decrease by any percentage'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition states the largest possible percentage decrease is 100% - when a value falls to zero. A value cannot decrease by more than 100% of itself because there is nothing left to remove.',
        },
        {
          q: 'From the examples table, what is the percentage decrease from $1,000 to $750?',
          options: ['25.00%', '33.33%', '20.00%', '30.00%'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The examples table shows: absolute decrease = $250, percentage decrease = (1000 - 750) / 1000 × 100 = 25.00%. The original value ($1,000) is always the denominator.',
        },
        {
          q: 'What percentage decrease exactly reverses a 25% increase? The FAQ provides the formula.',
          options: ['25% decrease', '20% decrease', '30% decrease', '12.5% decrease'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ states the reversal formula is: Decrease% = P / (100 + P) × 100 = 25 / 125 × 100 = 20%. After a 25% increase from $100 to $125, a 20% decrease on $125 returns to $100. The reversal percentage is always smaller than the original increase.',
        },
        {
          q: 'According to the FAQ, if you know the new value and the percentage decrease, how do you find the original?',
          options: ['Multiply the new value by (1 + Decrease% / 100)', 'Divide the new value by (1 - Decrease% / 100)', 'Subtract the percentage from the new value directly', 'Multiply the new value by the percentage decrease, then add the result'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ gives the formula: Original = New / (1 - Decrease% / 100). For example, if a price is $80 after a 20% decrease, the original was $80 / (1 - 0.20) = $80 / 0.80 = $100.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'percentage difference',
      questions: [
        {
          q: 'What denominator does percentage difference use, and why?',
          options: ['The larger of the two values, to express how much the smaller falls short of the maximum', 'The arithmetic mean of both values, which ensures the result is symmetric regardless of which value you call V1', 'The smaller of the two values, to express how much larger the other is relative to the minimum', 'The first value (V1), because it is the reference point in the comparison'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition states percentage difference uses the arithmetic mean of both values as the denominator. This produces a symmetric result - swapping V1 and V2 gives the same answer, unlike percentage change which depends on which value is the "original."',
        },
        {
          q: 'From the examples table, what is the percentage difference between $90 and $110?',
          options: ['10.0%', '11.1%', '20.0%', '22.2%'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The examples table shows: |90 - 110| = $20, mean = $100, percentage difference = (20 / 100) × 100 = 20.00%. The mean of $90 and $110 is $100.',
        },
        {
          q: 'When should you NOT use percentage difference, according to the pitfalls section?',
          options: ['When the two values are measured in the same unit and are within 50% of each other', 'When one value is a baseline, standard, or prior period - in those cases percentage change is correct', 'When the values come from different sources, since source inconsistency makes the mean unreliable', 'When the absolute difference is larger than 25% of either value'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section warns: do not use percentage difference when one value is a baseline, standard, or prior period. In those cases, percentage change (with the reference value as denominator) is the correct metric. Using the mean artificially inflates or deflates the reported magnitude.',
        },
        {
          q: 'According to the FAQ, when should you use percentage difference instead of percentage change?',
          options: ['When both values are very large numbers, to avoid overflow in percentage change calculations', 'When the absolute difference exceeds 10 units, making a relative measure more informative than an absolute one', 'When the two values are collected simultaneously with no before-and-after relationship - such as the price of the same item at two different stores', 'When the percentage change is negative, since percentage difference always returns a positive number'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ states: use percentage difference when the two values have no before-and-after relationship - comparing the price of the same item at two different stores, or test scores from two independent groups. If one value is earlier in time or the accepted reference, use percentage change.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'percentage increase',
      questions: [
        {
          q: 'From the examples table, a salary rises from €1,200 to €1,500. What is the percentage increase?',
          options: ['20.00%', '25.00%', '30.00%', '33.33%'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The examples table shows: absolute increase = €300, percentage increase = (300 / 1200) × 100 = 25.00%. The original value (€1,200) is always the denominator.',
        },
        {
          q: 'What does a 100% increase mean?',
          options: ['The value has tripled: New = 3 × Old', 'The value has doubled: New = 2 × Old', 'The value has increased by half: New = 1.5 × Old', 'The value has increased by 100 units regardless of the original'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ states a 100% increase means the value has doubled. New = Old + 100% of Old = 2 × Old. A 200% increase means the value has tripled (New = 3 × Old).',
        },
        {
          q: 'A 50% increase followed by a 50% decrease. What happens according to the pitfalls section?',
          options: ['The original value is fully restored, since both changes are equal in magnitude', 'The result is 125% of the original, because increases outweigh decreases when compounded', 'The result is 75% of the starting point - a net loss of 25% - because the base changes between the two percentages', 'The result is 50% of the original, since the decrease erases the entire gain and then some'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section states: reversing a percentage increase always requires a larger percentage decrease. 1.50 × 0.50 = 0.75, leaving you at 75% of the starting point - a net decline of 25%, not zero.',
        },
        {
          q: 'What percentage decrease reverses a 25% increase, according to the FAQ?',
          options: ['25% - the same percentage in the opposite direction', '20% - using the formula P / (100 + P) × 100', '33.33% - one-third of the new value must be removed', '12.5% - half the original increase percentage'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ gives the formula: Decrease% = P / (100 + P) × 100. After a 25% increase from $100 to $125, a 20% decrease on $125 returns to $100. The reversal percentage is always smaller than the original increase.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'percentage points',
      questions: [
        {
          q: 'What does a percentage point (pp) measure?',
          options: ['The relative change in a metric expressed as a fraction of its original value', 'The compound growth rate between two percentage values over time', 'The arithmetic difference between two percentage values', 'The ratio of a new percentage value to the old percentage value'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'A percentage point is the arithmetic difference between two percentage values - it is an absolute unit of measurement. It is not a relative change; it is the raw gap on the percentage scale.',
        },
        {
          q: 'An interest rate rises from 1% to 2%. Which pair of statements is correct?',
          options: ['This is a 1 percentage point increase AND a 100% relative increase', 'This is a 1% increase AND a 1 percentage point increase', 'This is a 2 percentage point increase AND a 200% relative increase', 'This is a 1 percentage point increase AND a 50% relative increase'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition explicitly uses this example: a rise from 1% to 2% is a 1 percentage point increase (absolute difference) but a 100% relative increase (1 is 100% of 1). The same event looks trivially small or dramatically large depending on which framing you use.',
        },
        {
          q: 'From the examples table, the unemployment rate rises from 4.0% to 6.5%. What is the relative (percentage) change?',
          options: ['2.5%', '25.0%', '37.5%', '62.5%'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The examples table shows the change as +2.5 pp and +62.5% relative change. The relative change is calculated as (2.5 / 4.0) x 100 = 62.5% - far larger than the 2.5 pp absolute figure.',
        },
        {
          q: 'What does the pitfalls section identify as the most dangerous misuse of percentage language?',
          options: ['Reporting basis points when percentage points are more appropriate for general audiences', 'Saying a rate "increased by 2%" when it rose from 3% to 5% - most readers interpret this as a 2 pp absolute increase, not a 2% relative increase', 'Reporting the relative change without also reporting the percentage point change alongside it', 'Using percentage points for non-rate metrics such as market share or exam pass rates'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section warns that saying an interest rate "increased by 2%" when it rose from 3% to 5% is ambiguous - almost all readers interpret it as a 2 percentage point increase. Always write "percentage points" explicitly when you mean an absolute difference.',
        },
        {
          q: 'How many basis points equal one percentage point?',
          options: ['10 basis points', '1 basis point', '100 basis points', '1,000 basis points'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ states that one basis point equals 0.01 percentage points, so 100 basis points equal 1 percentage point. A 25 basis point rate increase equals a 0.25 percentage point increase.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'proportions',
      questions: [
        {
          q: 'What is the cross-multiplication rule for a proportion a/b = c/d?',
          options: ['a × d = b × c - the two cross-products are equal', 'a + d = b + c - the diagonal sums are equal', 'a / c = b / d - the ratios of corresponding terms are equal', 'a × b = c × d - the products of each ratio\'s terms are equal'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition states the fundamental property of a proportion is the cross-multiplication rule: if a/b = c/d, then a × d = b × c. This allows any one unknown to be solved as long as the other three values are known.',
        },
        {
          q: 'From the examples table, a map uses a scale of 1 cm = 50 km. A distance of 3.5 cm on the map equals how many km?',
          options: ['50 km', '100 km', '150 km', '175 km'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The examples table shows: 1 cm / 50 km = 3.5 cm / ? km. Cross-multiply: 1 × ? = 50 × 3.5 = 175. The distance is 175 km.',
        },
        {
          q: 'If 4 pumps drain a tank in 6 hours, how long do 8 pumps take? What type of proportion applies?',
          options: ['12 hours - direct proportion: doubling the pumps doubles the time', '3 hours - inverse proportion: doubling the pumps halves the time', '6 hours - the number of pumps has no effect on draining time', '9 hours - direct proportion: each additional pump adds 1.5 hours'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section gives this exact example: if 4 pumps drain in 6 hours, doubling to 8 pumps halves the time to 3 hours. More pumps means less time - this is an inverse proportion (constant product: 4 × 6 = 8 × 3 = 24).',
        },
        {
          q: 'Using the FAQ method, solve: 3/x = 5/20. What is x?',
          options: ['x = 15', 'x = 12', 'x = 8', 'x = 6'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ demonstrates: cross-multiply to get 3 × 20 = 5 × x, so 60 = 5x, therefore x = 60 / 5 = 12.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'phi': {
    definition: [
      'Phi (φ), also called the golden ratio, is the unique positive irrational number defined by the proportion $$\\frac{a+b}{a} = \\frac{a}{b} = \\varphi$$. Its exact value is $$\\varphi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.6180339887\\ldots$$ This self-referencing property - a ratio that equals its own reciprocal plus one - produces a number with no exact fractional representation and no repeating decimal digits.',
      'φ satisfies the quadratic identity $$\\varphi^2 = \\varphi + 1$$, the only positive number for which this holds. Two remarkable consequences follow. Its square (φ² ≈ 2.618) equals φ + 1. Its reciprocal (1/φ ≈ 0.618) equals φ - 1. This means 1/φ and φ share the same decimal part (0.6180339887...), a property unique to φ among all real numbers.',
      'φ emerges from the Fibonacci sequence (1, 1, 2, 3, 5, 8, 13, 21, 34, 55...) through consecutive ratios. The ratios 13/8 = 1.625, 21/13 ≈ 1.615, 34/21 ≈ 1.619, 55/34 ≈ 1.6176 oscillate above and below φ, converging exponentially. The error shrinks by a factor of φ² ≈ 2.618 with each step. This connection to additive growth explains why φ appears in plant spirals, pine cone scales, and sunflower seed arrangements.',
    ],
    whenToUse: 'Use φ when you need proportionally balanced dimensions. Given the longer side (a), divide by φ to get the shorter side (b = a/φ ≈ 0.618a). Given the shorter side, multiply by φ to get the longer. In typography, multiplying the body text size by φ yields a heading size with clear visual hierarchy. In web layout, a 38%:62% column split closely approximates φ. In mathematics, φ appears in regular pentagon diagonals, icosahedral geometry, and continued fraction representations.',
    examples: {
      headers: ['Known value', 'Operation', 'Result', 'Use case'],
      rows: [
        ['Longer = 100', '÷ φ (÷ 1.618)', '61.8 (shorter side)', 'Golden rectangle dimensions'],
        ['Shorter = 100', '× φ (× 1.618)', '161.8 (longer side)', 'Golden rectangle dimensions'],
        ['Total = 100', '÷ φ (÷ 1.618)', '61.8 (longer part)', 'Line segment division'],
        ['Body text = 16 px', '× φ', '≈ 25.9 px (heading)', 'Typography size scale'],
        ['Column = 38%', '× φ', '≈ 62% (main column)', 'Web layout sidebar split'],
      ],
    },
    pitfalls: 'The most common mistake is treating φ as a universal design law. Claims that the Parthenon, the Mona Lisa, or the Great Pyramid were deliberately constructed using φ are disputed by modern scholars - the ratios match approximately and the matches are likely coincidental. A precision trap also applies: rounding φ to 1.618 introduces small cumulative errors in iterative calculations. For design work the rounding is harmless, but for mathematical proofs the full irrational value is required.',
    faqs: [
      { q: 'Why is φ called the golden ratio?', a: 'The name traces to Luca Pacioli\'s Divina Proportione (1509), which described the proportion as having divine aesthetic properties. The term "golden ratio" became widespread in 19th-century mathematical literature. The Greek letter φ (phi) was adopted in the 20th century in honour of the sculptor Phidias, who is associated with the Parthenon.' },
      { q: 'Is φ truly irrational?', a: 'Yes. Its exact value is (1 + √5)/2. Since √5 is irrational - it cannot be expressed as a ratio of two integers - neither can φ. Its decimal expansion is infinite and non-repeating, which means no fraction can represent it exactly.' },
      { q: 'How quickly do Fibonacci ratios converge to φ?', a: 'Very quickly. The ratio 55/34 ≈ 1.6176 is accurate to 3 decimal places, and 4,181/2,584 ≈ 1.61803 is accurate to 5 places. The error shrinks by a factor of φ² ≈ 2.618 with each Fibonacci step - exponential convergence from both sides of φ.' },
      { q: 'What is a golden rectangle?', a: 'A rectangle whose length-to-width ratio equals φ. If you remove the largest square from one end of a golden rectangle, the remaining piece is another golden rectangle in the same proportion. This self-similarity repeats infinitely, producing a logarithmic spiral - the shape often associated with nautilus shells.' },
    ],
    quiz: {
      topic: 'phi (φ)',
      questions: [
        {
          q: 'Which equation uniquely defines φ among all positive numbers?',
          options: [
            'φ = 3.14159...',
            'φ + 1 = φ²',
            'φ × 2 = φ + φ',
            'φ = √2',
          ] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition states φ satisfies φ² = φ + 1, the only positive number for which this holds. This identity is the source of φ\'s unique mathematical properties, including its self-referencing ratio and the shared decimal part with its reciprocal.',
        },
        {
          q: 'What is 1/φ approximately equal to?',
          options: [
            '0.618 (= φ - 1)',
            '1.382',
            '0.5',
            '2.618',
          ] as [string, string, string, string],
          correct: 0 as const,
          explanation: '1/φ = φ - 1 ≈ 0.6180339887. This means φ and 1/φ share the same decimal digits (0.6180...) - a property unique to φ among all real numbers.',
        },
        {
          q: 'From the worked examples, if the longer side of a golden rectangle is 100, what is the shorter side?',
          options: [
            '38.2',
            '100',
            '161.8',
            '61.8',
          ] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The shorter side = longer ÷ φ = 100 ÷ 1.618 ≈ 61.8. This gives the 100:61.8 golden proportion, where the ratio of larger to smaller equals φ.',
        },
        {
          q: 'What do modern scholars say about claims that the Parthenon was designed using φ?',
          options: [
            'Confirmed - the Parthenon was built with deliberate golden ratio proportions',
            'Disputed - the ratios match approximately and are likely coincidental',
            'Proven false - the Parthenon uses the ratio 1:2, not φ',
            'Unresolved - archaeologists lack sufficient measurements to judge',
          ] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section states that claims about the Parthenon and similar works are disputed by modern scholars - the matching ratios are approximate and likely coincidental. φ is a useful design guide, not a proven historical construction rule.',
        },
        {
          q: 'The ratio 55/34 from the Fibonacci sequence is accurate to how many decimal places of φ?',
          options: [
            '1 decimal place (1.6)',
            '2 decimal places (1.62)',
            '3 decimal places (1.618)',
            '5 decimal places (1.61803)',
          ] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ states 55/34 ≈ 1.6176 is accurate to 3 decimal places of φ ≈ 1.6180. The error shrinks by a factor of φ² ≈ 2.618 with each Fibonacci step.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'ratio': {
    definition: [
      'A ratio expresses the relative sizes of two or more quantities of the same kind. Written as a:b or $$\\frac{a}{b}$$, it answers the question "how many times larger is one quantity than another?" A ratio of 3:1 means the first quantity is three times the second. The two quantities must share the same unit for the ratio to be dimensionless - mixing kilograms and meters produces a rate, not a ratio.',
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
    quiz: {
      topic: 'ratios',
      questions: [
        {
          q: 'What must the two quantities in a ratio share to produce a dimensionless result?',
          options: ['The same magnitude, so they can be divided without a remainder', 'The same unit - mixing kilograms and meters produces a rate, not a ratio', 'The same sign - mixing positive and negative quantities creates undefined ratios', 'The same scale, expressed in standard international (SI) base units'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition states the two quantities must share the same unit for the ratio to be dimensionless. Mixing kilograms and meters produces a rate (a ratio with different units), not a true ratio.',
        },
        {
          q: 'From the examples table, what does a debt-to-equity ratio of 2:1 mean?',
          options: ['The company has $1 of debt for every $2 of equity', 'The company has 2 dollars of debt for every dollar of equity', 'Equity is twice as large as debt in the company\'s capital structure', 'Debt exceeds total assets by a factor of 2'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The examples table states debt-to-equity 2:1 means "two dollars of debt for every dollar of equity." A 2:1 ratio means the first quantity is twice the second.',
        },
        {
          q: 'Is a debt-to-equity ratio of 3:1 the same as 1:3? What does the pitfalls section say?',
          options: ['Yes - ratios are symmetric and the order can be freely swapped', 'No - order is not interchangeable; 3:1 is a very different capital structure from 1:3', 'Only when both numbers are whole integers - decimals follow different ordering rules', 'They are equivalent because both represent the same relationship from different perspectives'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section warns: order is not interchangeable. A debt-to-equity ratio of 3:1 is not the same as 1:3. Always state which quantity comes first and be consistent.',
        },
        {
          q: 'According to the FAQ, how do you simplify the ratio 18:24?',
          options: ['Divide both by 6 (the GCD), giving 3:4', 'Divide both by 2, giving 9:12 (a partial simplification that is not final)', 'Multiply both by 1/6, giving 3:4', 'Divide the larger by the smaller to get 1.33:1 as a unit ratio'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The FAQ states: divide both terms by their GCD. For 18:24, GCD = 6, giving a simplified ratio of 3:4. For multi-term ratios, divide all terms by the GCD of the entire set.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'reciprocal': {
    definition: [
      'The reciprocal of a fraction a/b is b/a - formed by swapping numerator and denominator. For whole numbers, the reciprocal of n is 1/n. Every non-zero number has exactly one reciprocal, and a number multiplied by its reciprocal always equals 1: $$\\frac{a}{b} \\times \\frac{b}{a} = \\frac{ab}{ab} = 1$$ Zero has no reciprocal because 1/0 is undefined.',
      'Reciprocals are the foundation of fraction division. Dividing by any fraction is identical to multiplying by its reciprocal: $$\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}$$ The keep-change-flip method taught in school is simply a name for this reciprocal substitution - keep the first fraction, change ÷ to ×, flip the second fraction.',
      'For negative fractions, the reciprocal carries the same sign: the reciprocal of -3/4 is -4/3. For mixed numbers, you must convert to an improper fraction first: the reciprocal of 2½ is not ½/2. Convert to 5/2, then flip to get 2/5.',
    ],
    beginnerExplain: [
      'Think of a reciprocal as the "flip" of a fraction. If you have 3/4, flipping it gives 4/3. Multiply them together: 3/4 × 4/3 = 12/12 = 1. That "comes back to 1" property is what makes reciprocals so useful - it\'s how division gets turned into multiplication.',
      'A good way to picture it: if you walk 3 steps forward for every 4 steps sideways (ratio 3/4), the reciprocal 4/3 describes the exact opposite journey. One undoes the other, which is why multiplying gives 1.',
    ],
    whenToUse: 'Use reciprocals when dividing fractions (replace ÷ with × and flip the second fraction), when solving equations of the form (a/b)x = c (multiply both sides by the reciprocal b/a), and when working with rates where you need to invert a ratio - for example, converting km per hour to hours per km.',
    examples: {
      headers: ['Number', 'Reciprocal', 'Product', 'Notes'],
      rows: [
        ['3/4', '4/3', '12/12 = 1', 'Standard fraction'],
        ['5', '1/5', '5/5 = 1', 'Whole number: write as 5/1, then flip'],
        ['-2/7', '-7/2', '14/14 = 1', 'Negative: sign is preserved'],
        ['1', '1', '1/1 = 1', 'Reciprocal of 1 is 1'],
        ['2½ (= 5/2)', '2/5', '10/10 = 1', 'Mixed number: convert to improper first'],
      ],
    },
    pitfalls: 'The most common error with mixed numbers: students take the reciprocal of 2½ as ½/2 = 1/4. You must convert to an improper fraction first (2½ = 5/2), then flip to get 2/5. Also, zero has no reciprocal - 1/0 is undefined. And the reciprocal of a negative fraction is also negative: the reciprocal of -3/4 is -4/3, not 4/3.',
    faqs: [
      { q: 'What is the reciprocal of a fraction?', a: 'The reciprocal of a fraction a/b is b/a - numerator and denominator are swapped. Multiplying a fraction by its reciprocal always gives 1: 3/4 × 4/3 = 12/12 = 1. This is called the multiplicative inverse.' },
      { q: 'How do reciprocals relate to fraction division?', a: 'Dividing by a fraction is identical to multiplying by its reciprocal. Instead of computing a/b ÷ c/d directly, you compute a/b × d/c. The keep-change-flip method is just a name for this substitution: flip the divisor and change the operation to multiplication.' },
      { q: 'What is the reciprocal of a whole number?', a: 'Write the whole number as a fraction over 1, then flip. The reciprocal of 5 is 1/5; the reciprocal of 8 is 1/8. Multiplying any whole number n by its reciprocal 1/n gives 1: n × 1/n = n/n = 1.' },
      { q: 'Does every number have a reciprocal?', a: 'Every non-zero real number has exactly one reciprocal. Zero is the only exception: 1/0 is undefined because no real number multiplied by 0 can equal 1.' },
    ],
    quiz: {
      topic: 'reciprocals',
      questions: [
        {
          q: 'What is the reciprocal of 3/4, and what is their product?',
          options: ['3/4 itself - a fraction is its own reciprocal', '4/3 - swap numerator and denominator; 3/4 × 4/3 = 12/12 = 1', '1/3 - take the reciprocal of only the numerator', '-4/3 - the reciprocal always changes the sign'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition states: the reciprocal of a fraction a/b is b/a. For 3/4, flip to get 4/3. Their product: 3/4 × 4/3 = 12/12 = 1. Every non-zero number multiplied by its reciprocal equals 1.',
        },
        {
          q: 'From the examples table, what is the reciprocal of the whole number 5?',
          options: ['5/1 - write as a fraction over 1', '1/5 - write as 5/1, then flip to get 1/5', '-1/5 - whole number reciprocals are always negative', '0.5 - the reciprocal is half the original'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The examples table shows: the whole number 5 is written as 5/1, then flipped to get 1/5. Product: 5 × 1/5 = 5/5 = 1. The note reads "Whole number: write as 5/1, then flip."',
        },
        {
          q: 'What is the correct reciprocal of the mixed number 2½? The pitfalls section identifies the common error.',
          options: ['2/5 - convert 2½ to the improper fraction 5/2 first, then flip', '1/4 - a common error: taking the reciprocal of ½ without converting to an improper fraction', '2/1 = 2 - the reciprocal of any mixed number is the whole-number part only', '5/4 - divide the denominator by the whole number'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The pitfalls section warns: the common error is taking the reciprocal of 2½ as ½/2 = 1/4. You must convert to an improper fraction first (2½ = 5/2), then flip to get 2/5. Product: 5/2 × 2/5 = 10/10 = 1.',
        },
        {
          q: 'Does every number have a reciprocal?',
          options: ['Yes - every real number, including zero, has a reciprocal', 'Only positive numbers have reciprocals; negative numbers do not', 'Every non-zero real number has exactly one reciprocal; zero is the only exception because 1/0 is undefined', 'Only rational numbers (fractions) have reciprocals; irrational numbers do not'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ states: every non-zero real number has exactly one reciprocal. Zero is the only exception: 1/0 is undefined because no real number multiplied by 0 can equal 1.',
        },
        {
          q: 'How do reciprocals relate to fraction division, according to the FAQ?',
          options: ['Dividing by a fraction first requires finding a common denominator, then the reciprocal cancels it out', 'Dividing by a fraction is identical to multiplying by its reciprocal - keep the first fraction, change ÷ to ×, flip the second fraction', 'Reciprocals are only used in division when both fractions have the same denominator', 'The reciprocal converts the division into a subtraction, which is then easier to compute'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ states: dividing by a fraction is identical to multiplying by its reciprocal. Instead of a/b ÷ c/d, compute a/b × d/c. Keep-change-flip is just a name for this reciprocal substitution.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'unit-rate': {
    definition: [
      'A unit rate is a ratio in which the denominator is exactly 1, expressing how much of one quantity corresponds to a single unit of another. The formula is: $$\\text{Unit Rate} = \\frac{\\text{Quantity A}}{1 \\text{ unit of Quantity B}}$$ Common examples include speed (kilometers per 1 hour), price (euros per 1 kilogram), fuel efficiency (litres per 1 kilometer), and productivity (units per 1 worker per hour). The "per one" structure makes unit rates the most intuitive form for direct comparison.',
      'Unit rates are produced by dividing both terms of any ratio by the denominator. A ratio of 240 km driven on 8 litres of fuel becomes a unit rate of 30 km per litre (240 ÷ 8 = 30). This simplification converts a context-specific ratio into a normalised metric that can be compared across different totals.',
      'Unit rates bridge the concepts of ratio and proportion. A unit rate is a simplified ratio; a proportion uses a unit rate to scale to a new quantity. If a machine produces 45 widgets per hour (unit rate), you find how many it produces in 7 hours by multiplying: 45 × 7 = 315.',
    ],
    whenToUse: 'Use unit rates when comparing quantities measured over different totals - comparing prices of different package sizes, speeds over different distances, or productivity of different team sizes. Unit rates are the correct tool whenever you need a normalised, per-one metric.',
    examples: {
      headers: ['Context', 'Raw ratio', 'Unit rate', 'Meaning'],
      rows: [
        ['Speed', '300 km in 4 h', '75 km/h', 'Kilometers per 1 hour'],
        ['Price comparison', '$5.40 for 1.5 kg', '$3.60/kg', 'Cost per 1 kilogram'],
        ['Fuel efficiency', '48 L for 600 km', '0.08 L/km', 'Litres per 1 kilometer'],
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
    quiz: {
      topic: 'unit rates',
      questions: [
        {
          q: 'What mathematical property defines a unit rate?',
          options: ['A ratio where both numerator and denominator are whole numbers', 'A ratio in which the denominator is exactly 1, expressing a quantity per single unit', 'A fraction where the numerator is larger than the denominator', 'Any comparison of two quantities measured in different units'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'A unit rate is a ratio in which the denominator is exactly 1, expressing how much of one quantity corresponds to a single unit of another. The "per one" structure makes unit rates the most intuitive form for direct comparison.',
        },
        {
          q: 'Which statement correctly describes the relationship between unit rates and ratios?',
          options: ['Only unit rates are ratios; regular ratios are a different mathematical concept', 'Ratios compare quantities in the same unit while unit rates always mix different units', 'Every ratio is automatically a unit rate once it is simplified', 'Every unit rate is a ratio, but a ratio does not need to have a denominator of 1'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'Every unit rate is a ratio, but not every ratio is a unit rate. A ratio compares any two quantities and the denominator does not need to be 1; a unit rate is specifically a ratio that has been simplified so the denominator equals 1.',
        },
        {
          q: 'According to the examples table, what is the unit rate for a price of $5.40 for 1.5 kg?',
          options: ['$3.60 per kg', '$5.40 per kg', '$2.70 per kg', '$4.50 per kg'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'Dividing both terms by the denominator: $5.40 / 1.5 = $3.60 and 1.5 kg / 1.5 = 1 kg, giving a unit rate of $3.60 per kilogram.',
        },
        {
          q: 'What does the pitfalls section warn is the main error when comparing unit rates?',
          options: ['Using different denominator units (e.g. per 100 g vs per kg) makes rates incomparable until converted to the same base', 'Unit rates are only valid when comparing identical product categories', 'Using the wrong formula leads to negative unit rate values', 'Unit rates become inaccurate when the raw numbers are very large or very small'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'Choosing the wrong unit for the denominator leads to rates that cannot be compared. If one supermarket advertises price per 100 g and another per kg, they appear incomparable until both are converted to the same unit rate.',
        },
        {
          q: 'A printer produces 12 pages per minute. According to the FAQ, how many pages does it produce in 35 minutes?',
          options: ['47 pages', '420 pages', '350 pages', '252 pages'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'Once you have a unit rate, multiply by any desired quantity to scale it. 12 pages/minute x 35 minutes = 420 pages - equivalent to solving the proportion 12/1 = x/35.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  // ─── Health ──────────────────────────────────────────────────────────────────

  'bmi': {
    definition: [
      'Body Mass Index (BMI) is a screening metric that estimates whether a person\'s weight is appropriate for their height. It is calculated by dividing body weight in kilograms by the square of height in meters: $$\\text{BMI} = \\frac{\\text{weight (kg)}}{\\text{height (m)}^2}$$',
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
    quiz: {
      topic: 'BMI',
      questions: [
        {
          q: 'How is BMI calculated?',
          options: ['Weight in pounds divided by height in feet squared, multiplied by 703', 'Height in meters divided by weight in kilograms squared', 'Waist circumference divided by height in meters', 'Weight in kilograms divided by height in meters squared'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The BMI formula is weight (kg) divided by height (m) squared. It produces a dimensionless number used to screen whether a person\'s weight is appropriate for their height.',
        },
        {
          q: 'According to the WHO classification table, which BMI range is "Normal weight"?',
          options: ['18.5 - 24.9', 'Below 18.5', '25.0 - 29.9', '30.0 - 34.9'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The WHO defines normal weight as BMI 18.5 to 24.9, which corresponds to the lowest all-cause mortality risk in general adults. Below 18.5 is underweight; 25.0 to 29.9 is overweight.',
        },
        {
          q: 'For adults aged 65 and over, what does the definition section say about the optimal BMI range?',
          options: ['The standard 18.5-24.9 range applies equally to all adults regardless of age', 'The optimal range shifts upward to approximately 23-27.5, associated with better survival and bone density', 'BMI is not applicable above age 65 and should be replaced with waist circumference alone', 'The obesity threshold drops to 25 for older adults due to reduced muscle mass'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'Research consistently shows that a slightly higher BMI of 23-27.5 is associated with better survival outcomes, greater bone density, and improved resilience during illness in adults 65 and over. The standard thresholds do not apply directly to this population.',
        },
        {
          q: 'What key limitation does the pitfalls section identify about BMI?',
          options: ['It is unreliable for adults over 40 due to hormonal changes', 'It requires blood test results to produce an accurate classification', 'It cannot distinguish fat mass from muscle mass, so muscular individuals may be misclassified as overweight', 'It is not recognized by the World Health Organization for clinical use'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'BMI cannot distinguish fat mass from muscle mass. A heavily muscled athlete may be classified as overweight or obese despite very low body fat. It also ignores fat distribution - two people with the same BMI can have very different cardiometabolic risk profiles.',
        },
        {
          q: 'For athletes with high muscle mass, what does the FAQ recommend as a more meaningful alternative to BMI?',
          options: ['Waist-to-height ratio and resting blood pressure', 'Body fat percentage and FFMI', 'The standard BMI thresholds with an upward adjustment of 5 points', 'Hydrostatic weighing as a percentage of lean body mass'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ states that for athletic populations, body fat percentage and FFMI provide far more meaningful assessment than BMI. A competitive bodybuilder or rugby player may have a BMI of 28-32 with body fat below 12%, which standard BMI would misclassify as overweight or obese.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'bmi-percentile': {
    definition: [
      'BMI percentile is the standard method for assessing weight status in children aged 2-19. Rather than applying the fixed adult thresholds (18.5, 25, 30), a child\'s BMI is compared to a reference population of children the same age and gender. The result is expressed as a percentile - a number from 1 to 99 indicating what proportion of same-age, same-gender peers have a lower BMI.',
      'The CDC 2000 growth charts define four categories based on percentile: Underweight (below 5th), Healthy weight (5th to below 85th), Overweight (85th to below 95th), and Obese (95th and above). These thresholds correspond to the percentile ranges associated with the lowest long-term cardiometabolic risk in US follow-up studies. The same formula is used as for adults - weight (kg) divided by height (m) squared - but interpretation is entirely different.',
      'Because children\'s bodies change rapidly, no single BMI number stays in the same percentile category across childhood. A BMI of 17 is near the 30th percentile at age 8 but near the 10th percentile at age 12. This is why pediatricians track percentile over time rather than the raw number - and why a steady upward drift across several visits is often more clinically meaningful than the current percentile alone.',
    ],
    beginnerExplain: ['Think of it as a class rank. Line up 100 children of the same age and gender by BMI from lowest to highest - your child\'s percentile tells you their position in that line. A child at the 60th percentile has a higher BMI than 60 of those 100 peers. The healthy range (5th to 85th) is deliberately wide because individual variation in bone density, muscle mass, and frame size is large in childhood, and the thresholds reflect actual health outcomes, not arbitrary cutoffs.'],
    whenToUse: 'Use BMI percentile at routine pediatric checkups or when interpreting results from a child BMI calculator. The most useful application is tracking the trend across consecutive visits - not the absolute level at any one appointment. A child who has risen from the 45th to the 72nd percentile over two years warrants more attention than one who has been consistently at the 80th percentile since age 3. For children entering puberty, interpret results alongside pubertal development stage, not age alone.',
    examples: {
      headers: ['Category', 'Percentile range', 'Recommended action'],
      rows: [
        ['Underweight', 'Below 5th', 'Refer for nutritional assessment; check linear growth rate'],
        ['Healthy weight', '5th to below 85th', 'Continue routine monitoring; support active lifestyle'],
        ['Overweight', '85th to below 95th', 'Review dietary patterns and activity; set weight maintenance goal'],
        ['Obese', '95th and above', 'Clinical evaluation recommended; screen for insulin resistance, hypertension'],
      ],
    },
    pitfalls: 'The most common mistake is treating a single percentile reading as definitive. A child who jumps from the 50th to the 82nd percentile in one year needs more attention than a child who has been stable at the 85th percentile for four years. The second major pitfall is using adult BMI thresholds for children - a BMI of 22 is healthy for most adults but can be at the 95th percentile for a 7-year-old. Third: BMI percentile cannot distinguish fat mass from muscle - a muscular 10-year-old and a sedentary peer with identical percentiles have very different metabolic risk profiles.',
    faqs: [
      { q: 'What percentile is considered healthy weight for children?', a: 'Healthy weight is defined as the 5th to below 85th percentile for the child\'s age and gender. Below the 5th percentile is underweight; 85th to below 95th is overweight; 95th and above is obese. These thresholds apply to children aged 2-19 using the CDC 2000 growth charts.' },
      { q: 'Does BMI percentile change as a child grows?', a: 'Yes, significantly. A raw BMI that places a child at the 50th percentile at age 5 may be at the 30th percentile at age 10 because the reference distribution shifts as children grow. This is why percentile - not the raw number - is the correct metric to track. A child should generally stay within a roughly consistent percentile band across childhood.' },
      { q: 'Can a child be at a high percentile and still be healthy?', a: 'Yes. A muscular, athletic child may fall above the 85th percentile despite low body fat. BMI percentile cannot distinguish muscle from fat. If a child is active and well-nourished with no other risk indicators, a high percentile alone is not a diagnosis - a pediatrician will consider growth trend, physical fitness, blood pressure, and family history.' },
      { q: 'What is the difference between BMI percentile and z-score?', a: 'Both describe where a child\'s BMI sits relative to the reference population. Percentile (0-99 scale) is more intuitive for parents. Z-score is preferred in research because it can represent values beyond the 99th percentile - important for severely obese children where the standard percentile scale compresses.' },
    ],
    quiz: {
      topic: 'BMI percentile',
      questions: [
        {
          q: 'What percentile range defines healthy weight for children aged 2-19?',
          options: ['10th to 90th percentile', '5th to below 95th percentile', '5th to below 85th percentile', '15th to 75th percentile'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'Healthy weight is the 5th to below 85th percentile on the CDC 2000 growth charts. Below the 5th is underweight; 85th to below 95th is overweight; 95th and above is obese.',
        },
        {
          q: 'A child is at the 88th BMI percentile for their age and gender. Which category does this fall into?',
          options: ['Healthy weight', 'Underweight', 'Obese', 'Overweight'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The 85th to below 95th percentile is classified as Overweight. The 88th percentile falls within this range. A BMI at or above the 95th percentile would be classified as Obese.',
        },
        {
          q: 'Why is tracking BMI percentile over multiple visits more useful than a single reading?',
          options: ['Because the CDC updates the reference charts annually, so older readings are invalid', 'Because weight fluctuates too much day-to-day for a single reading to be accurate', 'Because a steady upward drift in percentile across visits is often more clinically significant than any one measurement', 'Because the formula changes depending on which doctor performs the calculation'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'A child who has risen from the 45th to the 72nd percentile over two years warrants more attention than one consistently at the 80th percentile. Trajectory is more informative than the snapshot.',
        },
        {
          q: 'What is the most common mistake when interpreting a child\'s BMI percentile?',
          options: ['Using metric units instead of imperial for the calculation', 'Treating a single percentile reading as definitive rather than tracking the trend over time', 'Applying percentile thresholds to children under age 5', 'Comparing the percentile to adult BMI thresholds directly'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section identifies treating a single reading as definitive as the most common mistake. A child who jumps from the 50th to the 82nd percentile in one year warrants more concern than one who has been stable at the 85th percentile for four years.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'adiposity-rebound': {
    definition: [
      'Adiposity rebound is the natural rise in BMI that follows the early-childhood BMI dip. From birth, a child\'s BMI rises steeply, then falls through toddlerhood and early childhood as height growth outpaces weight gain. It reaches its lowest point - the adiposity nadir - typically between ages 4 and 6, then begins to rise again. This upswing is adiposity rebound. It happens in every child; the clinically relevant question is not whether it occurs but when.',
      'The timing of rebound is a strong predictor of long-term adiposity. Research by Rolland-Cachera et al. (1984) found that children whose rebound begins before age 5 have a substantially higher risk of adult obesity and metabolic disease compared to those who rebound at age 6 or later - even when their BMI percentile at the time of early rebound looks normal. The mechanism involves earlier and more prolonged proliferation of adipose cells during the sensitive period of fat development.',
      'Because the risk signal lies in the timing rather than the current percentile, tracking BMI trajectory across multiple pediatric visits is more informative than any single measurement. A child at the 50th percentile who has been rising steeply since age 4 carries more long-term risk than a child who has been stable at the 70th percentile since age 3.',
    ],
    beginnerExplain: ['Think of a child\'s BMI like the water level in a bathtub. During toddlerhood, height growth outpaces weight gain so the water drains down. Around age 4-6 it hits the lowest level - the nadir. Then the tub starts filling again. That refilling is adiposity rebound. When it starts early, before age 5, the tub ends up fuller by adulthood than if it had held at the low level for another year or two.'],
    whenToUse: 'Track adiposity rebound when reviewing a child\'s BMI growth chart across consecutive pediatric visits. The rebound is identified by the inflection point when BMI stops falling and begins to rise. If this occurs before age 5 - even from a low or normal percentile - flag the trend for clinical attention. This is more useful than relying on a single current percentile, which may look reassuring while the underlying trajectory points toward long-term excess adiposity.',
    examples: {
      headers: ['Rebound onset age', 'Adult obesity risk', 'Clinical implication'],
      rows: [
        ['Before age 5 (early)', 'Substantially elevated, even at a normal current percentile', 'Track closely; focus on diet quality and active play'],
        ['Ages 5-7 (typical)', 'Average - in line with population norms', 'Continue routine monitoring at each well-child visit'],
        ['After age 7 (late)', 'Lower than average', 'Generally reassuring; standard monitoring appropriate'],
      ],
    },
    pitfalls: 'The most important pitfall is interpreting a normal current percentile as reassuring without reviewing the trend. A child at the 45th percentile who has jumped from the 20th percentile in one year may be entering early rebound - the snapshot looks fine but the trajectory does not. A second pitfall: adiposity rebound is not pathological in itself. Every child undergoes it. The risk signal is in the timing, not the fact of rebound.',
    faqs: [
      { q: 'What is adiposity rebound?', a: 'Adiposity rebound is the natural rise in BMI that occurs after the early-childhood BMI dip. BMI falls from infancy to a minimum (the adiposity nadir) between ages 4 and 6, then rises again. It happens in all children; the clinically significant factor is whether it begins early (before age 5), which is associated with higher adult obesity risk.' },
      { q: 'Why does early adiposity rebound predict adult obesity?', a: 'Earlier rebound means more years of gradual fat accumulation before adulthood. The mechanism involves earlier onset of adipose cell proliferation during a sensitive developmental window. A child whose rebound starts at age 4 has one to three more years of accumulating fat stores before height growth stabilizes, compared to a child who rebounds at age 6 or 7.' },
      { q: 'How is adiposity rebound detected?', a: 'By plotting BMI at each well-child visit on a CDC growth chart and identifying the inflection point when BMI stops falling and begins to rise. It cannot be identified from a single measurement - you need at least two or three readings across 12-24 months to see the trend clearly.' },
      { q: 'What should parents do if their child has early adiposity rebound?', a: 'Early rebound is a risk signal, not a diagnosis. The appropriate response is increased attention to diet quality (reducing ultra-processed foods and sugary drinks), at least 60 minutes of active play daily, and limiting recreational screen time. Caloric restriction is not recommended for growing children and should not be attempted without direct supervision by a pediatrician and dietitian.' },
    ],
    quiz: {
      topic: 'adiposity rebound',
      questions: [
        {
          q: 'What is adiposity rebound?',
          options: ['The natural rise in BMI that follows the early-childhood BMI dip', 'A sudden weight gain triggered by puberty', 'A rapid drop in BMI percentile seen after children begin dieting', 'The period of rapid height growth between ages 10 and 14'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'Adiposity rebound is the natural upswing in BMI that follows the early-childhood dip. BMI falls from infancy to a nadir between ages 4 and 6, then rises again. Every child experiences it; the risk signal lies in how early it begins.',
        },
        {
          q: 'At what age does adiposity rebound typically begin?',
          options: ['Between 1 and 3 years', 'At puberty - around ages 10-12', 'Between 4 and 6 years', 'Between 8 and 10 years'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'Typical adiposity rebound begins between ages 4 and 6, following the adiposity nadir. Children whose rebound begins before age 5 are classified as early rebounders and carry substantially higher adult obesity risk.',
        },
        {
          q: 'What does early adiposity rebound (before age 5) predict, even when the current BMI percentile looks normal?',
          options: ['Faster linear growth (height) during adolescence', 'Lower cardiovascular fitness in early childhood', 'Earlier onset of puberty in both boys and girls', 'A substantially higher risk of adult obesity and metabolic disease'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'Research by Rolland-Cachera et al. (1984) showed that children whose rebound begins before age 5 have substantially higher adult obesity risk, even when their current BMI percentile appears normal. The timing matters more than the current number.',
        },
        {
          q: 'What is the most important pitfall when monitoring a child for adiposity rebound?',
          options: ['Using metric units instead of imperial for BMI calculations', 'Interpreting a normal current percentile as reassuring without reviewing the trend over time', 'Comparing boys and girls on the same growth chart', 'Waiting until the 95th percentile to flag an upward BMI trend'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'A child at the 45th percentile who has jumped from the 20th in one year may be entering early rebound - the snapshot looks fine but the trajectory does not. Trend over time is the key signal, not the current percentile.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'adiposity-nadir': {
    definition: [
      'The adiposity nadir is the lowest point in a child\'s BMI trajectory - the trough of the U-shaped curve that characterizes normal childhood development. From birth, BMI rises steeply, then falls through toddlerhood and early childhood as height growth outpaces weight gain. The nadir is the bottom of this dip, typically occurring between ages 4 and 6.',
      'After the nadir, BMI begins its long rise through childhood and adolescence - the phase known as adiposity rebound. The age at which the nadir occurs is a key prognostic marker: children who reach their nadir early (before age 5) tend to begin rebound earlier and accumulate more adipose tissue over the following years, compared to children whose nadir occurs at age 6 or later.',
    ],
    whenToUse: 'Look for the adiposity nadir when reviewing a child\'s BMI growth chart across consecutive visits. The nadir is the lowest point on that curve - the moment before the upward trend of adiposity rebound begins. Because it can only be identified in retrospect (after the subsequent rise confirms the turning point), tracking BMI at every well-child visit is essential for spotting an early nadir before the trend becomes firmly established.',
    examples: {
      headers: ['Nadir age', 'Rebound onset', 'Long-term implication'],
      rows: [
        ['Before age 5 (early)', 'Before age 5', 'Early rebound; higher adult obesity risk even at a normal current percentile'],
        ['Ages 5-6 (typical)', 'Ages 5-7', 'Average trajectory; standard monitoring appropriate'],
        ['After age 7 (late)', 'After age 7', 'Late rebound; associated with lower adult obesity risk'],
      ],
    },
    pitfalls: 'The adiposity nadir can only be confirmed in retrospect - you cannot know the nadir has been reached until the subsequent upward trend of adiposity rebound makes it clear. A single BMI reading, no matter how low, cannot confirm the nadir. This is why sequential measurement at each well-child visit is essential. A second pitfall: a low nadir BMI value is not inherently protective - what matters clinically is the age of the nadir, not the value.',
    faqs: [
      { q: 'What is the adiposity nadir?', a: 'The adiposity nadir is the lowest point in a child\'s BMI curve, typically occurring between ages 4 and 6. It marks the end of the early-childhood fall in BMI and the beginning of the adiposity rebound. The age at which a child hits their nadir is more clinically important than the BMI value at that point.' },
      { q: 'What is a typical BMI at the adiposity nadir?', a: 'It varies by age and gender. At age 5, the CDC 2000 median (50th percentile) is approximately 15.5 for boys and 15.2 for girls. The nadir is not defined by a specific BMI number but by the inflection point in the child\'s individual growth curve - the value at which BMI stops falling and begins to rise.' },
      { q: 'Is a lower nadir BMI value better for long-term health?', a: 'Not necessarily. The nadir BMI value is less prognostically important than the age at which it occurs. A child with a low nadir BMI who reaches it before age 5 may carry higher long-term obesity risk than a child with a slightly higher nadir BMI who reaches it at age 6 or 7. Timing is the signal, not the value.' },
      { q: 'How does the adiposity nadir relate to adiposity rebound?', a: 'They are two phases of the same developmental process. The nadir is the lowest point; adiposity rebound is the subsequent rise. The nadir ends when rebound begins. Clinically, the nadir\'s significance lies entirely in when it occurs - an early nadir (before age 5) means an early rebound and a longer window of gradual fat accumulation before adulthood.' },
    ],
    quiz: {
      topic: 'adiposity nadir',
      questions: [
        {
          q: 'What is the adiposity nadir?',
          options: ['The highest BMI a child reaches before weight loss begins', 'The lowest point in a child\'s BMI trajectory, typically between ages 4 and 6', 'The percentile at which a child is classified as underweight on the CDC chart', 'The first BMI measurement taken at a newborn checkup'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The adiposity nadir is the lowest point in a child\'s BMI curve. It marks the bottom of the early-childhood BMI dip, typically occurring between ages 4 and 6, before adiposity rebound begins.',
        },
        {
          q: 'After the adiposity nadir, what typically happens to a child\'s BMI?',
          options: ['It stays stable until puberty triggers growth', 'It decreases further until age 10', 'It rises again in the phase known as adiposity rebound', 'It fluctuates unpredictably with each growth spurt'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'After the nadir, BMI begins a long rise through childhood and adolescence - the phase called adiposity rebound. The nadir and the rebound are two phases of the same normal developmental process.',
        },
        {
          q: 'What makes the age of the adiposity nadir clinically significant?',
          options: ['Children whose nadir occurs after age 7 are more likely to develop early puberty', 'A later nadir is associated with higher adult obesity risk than an earlier one', 'The nadir BMI value predicts adult height more reliably than any other childhood metric', 'Children with an earlier nadir experience earlier rebound and accumulate more adipose tissue by adulthood'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'An earlier nadir means earlier rebound onset - and more years of gradual fat accumulation before height growth stabilizes in adulthood. The age of the nadir is the prognostic signal, not the BMI value itself.',
        },
        {
          q: 'Why can the adiposity nadir only be identified in retrospect?',
          options: ['It requires a blood test to confirm the adipose cell count at that point', 'You cannot know the nadir has been reached until the subsequent upward trend of adiposity rebound confirms the turning point', 'The CDC growth charts only display the nadir for children with a BMI above the 50th percentile', 'Parents typically do not weigh children frequently enough to detect it'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The nadir can only be confirmed once the upward trend of adiposity rebound is observed. A single low BMI reading cannot confirm the nadir has been reached. Sequential measurement at each well-child visit is essential.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'body composition',
      questions: [
        {
          q: 'What does the two-compartment model divide body weight into?',
          options: ['Muscle mass and bone mineral content', 'Total body water and dry mass', 'Fat mass and fat-free mass', 'Essential fat and storage fat'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The simplest clinical model divides body weight into fat mass and fat-free mass (FFM). Fat-free mass encompasses muscle, bone mineral, total body water, and the mass of organs and other non-fat tissues.',
        },
        {
          q: 'What does the definition identify as the research gold standard for body composition measurement?',
          options: ['The four-compartment (4C) model, which independently measures fat mass, bone mineral content, total body water, and residual protein mass', 'BIA (bioimpedance analysis), assessed under standardised hydration conditions', 'The two-compartment model, using hydrostatic weighing to distinguish fat from fat-free mass', 'The Navy tape method, validated across diverse athletic populations'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The four-compartment (4C) model is the research gold standard. Unlike two-compartment models that assume a fixed density for fat-free mass, the 4C model independently measures fat mass, bone mineral content, total body water, and residual protein mass.',
        },
        {
          q: 'According to the methods comparison table, what is the accuracy range of DEXA scanning?',
          options: ['±3-4%', '±2-3%', '±3-8%', '±1-2%'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'DEXA scanning carries ±1-2% accuracy, the highest of any method in the table. It is described as the most practical clinical gold standard, also providing segmental data and bone mineral density in a single scan.',
        },
        {
          q: 'What does the pitfalls section warn about when tracking body composition over time?',
          options: ['DEXA scanning is too expensive for regular use and should only be done once per year', 'Body composition methods are not interchangeable - switching methods mid-programme makes progress tracking unreliable', 'BIA devices consistently underestimate body fat by 3-5 percentage points in all users', 'Progressive resistance training raises body fat percentage in the short term before improving it'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section warns that body composition methods are not interchangeable. Switching methods makes progress tracking unreliable. BIA results can also shift by 3-5 percentage points on the same person based on hydration, time of day, and recent exercise - so always use the same method and device throughout a tracking period.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'body-fat-percentage': {
    definition: [
      'Body fat percentage is the proportion of total body weight that consists of adipose (fat) tissue, expressed as a percentage: $$\\text{Body Fat \\%} = \\frac{\\text{Fat Mass (kg)}}{\\text{Total Body Weight (kg)}} \\times 100$$',
      'Fat tissue serves essential physiological roles: hormone regulation (leptin, oestrogen), organ protection, thermal insulation, and energy storage. The body requires a minimum level of fat - termed essential fat - to maintain these functions: approximately 2–5% in men and 10–13% in women. Below these thresholds, hormonal and organ function are compromised.',
      'Healthy body fat ranges vary by gender and age. General reference ranges for adults are: men 8–19% (fit to acceptable), women 21–33% (fit to acceptable). Athletes typically fall below these ranges, and body fat naturally increases with age even when weight remains stable, due to the gradual replacement of lean tissue with fat.',
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
    quiz: {
      topic: 'body fat percentage',
      questions: [
        {
          q: 'What formula defines body fat percentage?',
          options: ['Fat mass divided by lean mass, multiplied by 100', 'Total body weight minus fat-free mass, divided by height squared', 'Fat mass multiplied by 100, divided by BMI', 'Fat mass (kg) divided by total body weight (kg), multiplied by 100'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'Body fat percentage = (Fat Mass / Total Body Weight) x 100. It expresses what proportion of total body weight consists of adipose (fat) tissue.',
        },
        {
          q: 'What are the approximate essential fat minimums stated in the definition?',
          options: ['5-8% in men and 15-18% in women', '0-2% in men and 5-8% in women', '2-5% in men and 10-13% in women', '8-10% in men and 18-20% in women'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'Essential fat is approximately 2-5% in men and 10-13% in women. Below these thresholds, hormonal and organ function are compromised, as essential fat supports hormone regulation, organ protection, and thermal insulation.',
        },
        {
          q: 'According to the category table, which body fat range is classified as "Athletic" for men?',
          options: ['2-5%', '6-13%', '14-17%', '18-24%'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The examples table shows the Athletic category for men as 6-13%, described as competitive athletes with visible muscle definition. The 2-5% range is essential fat; 14-17% is the Fit category.',
        },
        {
          q: 'What does the pitfalls section warn about BIA device accuracy?',
          options: ['BIA cannot detect body fat in individuals with high muscle mass', 'BIA consistently underestimates body fat by 5% compared to DEXA', 'BIA is calibrated only for sedentary adults and cannot be used for athletes', 'BIA results can vary by 3-5 percentage points on the same person in the same day due to hydration sensitivity'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'BIA devices are highly sensitive to hydration status and can shift by 3-5 percentage points on the same person on the same day. Even DEXA carries ±1-2% measurement error. Always compare results using the same method under standardised conditions.',
        },
        {
          q: 'According to the FAQ, what determines whether 7% body fat is healthy or causes problems?',
          options: ['Whether the person is an endurance athlete (may be healthy) or sedentary (may experience hormonal suppression)', 'Whether the person is male or female, since thresholds differ significantly by gender', 'Whether body fat was measured by DEXA or a less accurate estimation method', 'Whether the person is over or under 40 years of age'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The FAQ notes that an endurance athlete at 7% body fat may be healthy, while a sedentary person at the same level may experience hormonal suppression. Healthy body fat is context-dependent, not a fixed universal threshold.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'ffmi': {
    definition: [
      'Fat-Free Mass Index (FFMI) is a measure of muscularity that expresses lean body mass relative to height, analogous to BMI but using fat-free mass instead of total weight: $$\\text{FFMI} = \\frac{\\text{LBM (kg)}}{\\text{height (m)}^2}$$',
      'Because FFMI varies slightly with height, a normalised version corrects for this: $$\\text{Normalised FFMI} = \\text{FFMI} + 6.1 \\times (1.8 - \\text{height in meters})$$ This adjustment standardises FFMI to a reference height of 1.80m, making comparisons across individuals of different heights more meaningful.',
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
    quiz: {
      topic: 'FFMI',
      questions: [
        {
          q: 'What does FFMI measure, and how does its formula differ from BMI?',
          options: ['FFMI measures muscularity relative to height, using lean body mass (kg) divided by height (m) squared - analogous to BMI but using fat-free mass instead of total body weight', 'FFMI measures the ratio of fat mass to lean body mass, expressing what proportion of total body weight is non-fat tissue', 'FFMI uses total body weight divided by height squared (the same formula as BMI) but applies a correction factor for body fat percentage to adjust the result', 'FFMI measures body fat percentage adjusted for height, combining both fatness and frame size into a single composite score'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition states that FFMI = LBM (kg) / height (m)^2, making it analogous to BMI but using fat-free mass instead of total weight. This is what makes it a direct measure of muscularity rather than overall body size.',
        },
        {
          q: 'According to the FAQ, what key limitation of BMI does FFMI address?',
          options: ['BMI cannot be used for people above 30 BMI units; FFMI has no upper limit and is valid across all body sizes', 'BMI requires DEXA scan data for accuracy; FFMI only requires height and total weight measurements', 'FFMI uses the same formula as BMI but applies age-adjusted reference ranges instead of fixed population thresholds', 'BMI uses total body weight and cannot distinguish a 90kg bodybuilder at 8% body fat from a 90kg sedentary person at 30% body fat - FFMI uses only the lean component, making it a direct measure of muscularity rather than overall body size'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The FAQ explicitly states that BMI cannot distinguish a 90kg bodybuilder at 8% body fat from a 90kg sedentary person at 30% body fat - both have the same BMI. FFMI uses only the lean (fat-free) component, solving this limitation.',
        },
        {
          q: 'From the FFMI classification table, which category corresponds to an FFMI range of 23-25?',
          options: ['Excellent - Serious amateur athlete, advanced training (the 22-23 range)', 'Superior - Elite natural athlete, years of progressive training (the 23-25 range)', 'Suspicious - Rarely achieved naturally; PED use plausible (the >25 range)', 'Above average - Consistent training, visible muscle development (the 20-22 range)'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The examples table shows 23-25 as "Superior - Elite natural athlete, years of progressive training." The next category above 25 is "Suspicious," where PED use is considered plausible.',
        },
        {
          q: 'What does the pitfalls section warn about using FFMI > 25 as evidence of PED use?',
          options: ['An FFMI above 25 is a legally recognised anti-doping threshold used by sports federations to trigger mandatory testing', 'The Kouri 1995 study has since been revised, placing the natural male threshold at 27 and the female threshold at 23', 'The FFMI > 25 threshold is a statistical observation from one study, not a diagnostic criterion - some natural athletes may exceed 25 due to exceptional genetics, PED users below 25 are common, and the figure depends on accurate body fat measurement', 'The threshold applies only to competitive bodybuilders; recreational lifters and endurance athletes are exempt from the 25 ceiling under sports medicine guidelines'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section explicitly states that the FFMI > 25 threshold is a statistical observation from one study, not a diagnostic criterion. Some natural athletes with exceptional genetics may exceed 25, while PED users below 25 are common.',
        },
        {
          q: 'According to the FAQ on natural FFMI limits, what is the estimated natural ceiling for women?',
          options: ['Approximately 21-22, compared to approximately 25 for men, consistent with women\'s FFMI values running roughly 3-4 points lower across all categories', 'Approximately 25, because the normalised FFMI formula already accounts for gender differences and produces the same ceiling for both genders', 'Approximately 27-28, because women\'s greater proportion of type 1 muscle fibres allows higher FFMI values than the male reference population', 'Approximately 18-19, which is why the "above average" category for women begins at a lower absolute threshold than the male table'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The FAQ states that for women, the equivalent natural ceiling is estimated at approximately 21-22, compared to approximately 25 for men. The "good FFMI" FAQ confirms that average values for women are roughly 3-4 points lower than men due to physiological differences in muscle mass potential.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'ideal-body-weight': {
    definition: [
      'Ideal body weight (IBW) is a clinically estimated target weight derived from height and gender, originally developed to guide drug dosing rather than to define an aesthetic or fitness goal. The most widely used formula is the Devine formula (1974): For men: $$\\text{IBW} = 50 + 2.3 \\times (\\text{height in inches} - 60)$$ For women: $$\\text{IBW} = 45.5 + 2.3 \\times (\\text{height in inches} - 60)$$',
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
    quiz: {
      topic: 'ideal body weight',
      questions: [
        {
          q: 'What was Ideal Body Weight (IBW) originally developed for?',
          options: ['To define target weight ranges for athletes preparing for competitive events, based on optimal power-to-weight ratios in elite performers', 'To replace BMI as the primary weight classification tool used by life insurance companies and public health authorities in the 1970s', 'To serve as the basis for calorie restriction recommendations in obesity treatment programs, providing a science-backed weight goal for patients', 'To guide drug dosing in pharmacokinetics, specifically for calculating doses of renally-cleared drugs where using total body weight would lead to overdosing'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The definition states IBW was created for pharmacokinetic applications - calculating doses of renally-cleared and volume-of-distribution-sensitive drugs in patients where total body weight would lead to overdosing. Its use as a general weight target is a secondary application that has outgrown its original clinical purpose.',
        },
        {
          q: 'According to the FAQs, which IBW formula is most widely used in clinical pharmacokinetics?',
          options: ['The Devine formula - it remains the most widely used in clinical pharmacokinetics despite being developed in 1974', 'The Robinson formula - it was specifically developed to improve pharmacokinetic accuracy over the older Devine and Hamwi methods', 'The Hamwi formula - as the oldest rule-of-thumb, it is the most ingrained in clinical practice and least likely to be replaced', 'The Miller formula - it produces the lowest estimates, which are preferred when the risk of overdosing outweighs the risk of underdosing'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The FAQ states the Devine formula remains the most widely used in clinical pharmacokinetics. For non-clinical purposes, however, the FAQ recommends using BMI combined with body fat percentage for more individually meaningful targets.',
        },
        {
          q: 'According to the examples table, what is the Devine IBW for a 175cm (5\'9") man?',
          options: ['59.6 kg', '64.1 kg', '68.6 kg', '70.5 kg'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The examples table shows the Devine IBW for a 175cm man is 68.6 kg. The 70.5 kg figure is the Robinson IBW for the same height, illustrating how different formulas produce meaningfully different results for the same person.',
        },
        {
          q: 'What critical limitation do all IBW formulas share, according to the pitfalls section?',
          options: ['The formulas systematically underestimate IBW for tall individuals because they were derived from populations where heights above 6\'0" were rare', 'IBW formulas do not account for body composition, frame size, age, ethnicity, or fitness level - a muscular person above their IBW may be in excellent health, while someone at their IBW with low muscle mass may have significant metabolic risk', 'All four formulas are only validated for adults aged 20-40, and using them for older adults or adolescents produces unvalidated results', 'The formulas only apply to individuals of average frame size and require a correction factor for small or large frame sizes in any clinical context'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section states IBW formulas do not account for body composition, frame size, age, ethnicity, or fitness level. A muscular person above their IBW may be in excellent health, while someone meeting IBW with low muscle mass and high fat may have significant metabolic risk.',
        },
        {
          q: 'Why do the four major IBW formulas (Devine, Robinson, Miller, Hamwi) produce different results for the same person?',
          options: ['The formulas use different base units - some were derived in metric while others used imperial measurements, and conversion introduced rounding errors that compound at extreme heights', 'Later formulas were deliberately designed to produce lower estimates to correct the tendency of earlier formulas to recommend weights that were too high for metabolic health', 'The formulas disagree because they measure different things - Devine estimates fat-free mass while Robinson and Miller estimate total target weight including an assumed fat component', 'Each formula was derived from a different reference population using different statistical methods - Devine (1974) used lung function data, Hamwi (1964) was a diabetes rule-of-thumb, and Robinson and Miller (1983) re-analysed Metropolitan Life Insurance tables'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The FAQ explains that each formula was developed from a different dataset and reference population using different statistical methods. Because they used different populations and methodologies, they produce meaningfully different results, particularly at the extremes of height.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'lean body mass',
      questions: [
        {
          q: 'What does lean body mass (LBM) include?',
          options: ['Only skeletal muscle tissue - LBM is a synonym for muscle mass since muscle is the primary non-fat component worth measuring clinically', 'Everything in the body that is not fat - including skeletal muscle, bone mineral, organs, blood, skin, and total body water; it equals Total Body Weight minus Fat Mass', 'Total body weight minus fat mass and bone mass combined, isolating only soft tissue (muscle, organs, and skin) for clinical measurement', 'The combined weight of skeletal muscle and stored glycogen, which are the primary energy-storing non-fat tissues used in metabolic rate calculations'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition states LBM is everything in the body that is not fat, including skeletal muscle, bone mineral, organs, blood, skin, and total body water. It is calculated as Total Body Weight minus Fat Mass.',
        },
        {
          q: 'What is the difference between lean body mass and muscle mass?',
          options: ['They are the same; LBM and muscle mass are interchangeable terms used in different clinical disciplines to describe the same body composition metric', 'LBM measures only the largest muscle groups while muscle mass refers to all skeletal muscle including the smaller stabilising muscles', 'LBM is calculated from total body water measurements while muscle mass is calculated from creatinine excretion rates, making them independent metrics', 'LBM includes all non-fat tissue (muscle, bone, organs, blood, skin, and water), while muscle mass refers specifically to skeletal muscle - which accounts for only about 40-50% of LBM in men and 35-40% in women'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The FAQ states that LBM is the total weight of all non-fat tissue (muscle, bone, organs, blood, skin, and water), while muscle mass refers specifically to skeletal muscle. In a typical adult, skeletal muscle accounts for roughly 40-50% of LBM in men and 35-40% in women.',
        },
        {
          q: 'According to the examples table, what is the LBM for a 75 kg man at 25% body fat?',
          options: ['56.3 kg - the lean body mass after subtracting 18.8 kg of fat mass from the 75 kg total weight', '63.7 kg - the LBM for the same man at 15% body fat, not at 25%', '48.8 kg - the LBM for a 65 kg woman at 25% body fat, not a 75 kg man', '18.8 kg - the fat mass at 25% body fat, not the lean body mass itself'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The examples table shows that a 75 kg man at 25% body fat has a fat mass of 18.8 kg, leaving an LBM of 56.3 kg (75 - 18.8). The 63.7 kg figure in the same table is for the same man at 15% body fat.',
        },
        {
          q: 'What does the pitfalls section warn about confusing LBM with muscle mass?',
          options: ['LBM calculations from the Boer formula significantly overestimate lean mass in obese patients because the regression equation was derived from lean populations', 'LBM is unreliable as a drug dosing metric because it does not account for organ impairment, which changes drug distribution independently of lean tissue mass', 'LBM is often conflated with muscle mass, but bone, organs, blood, and water together account for a large fraction of LBM - a person can gain or lose several kilograms of LBM through hydration changes alone without any change in actual muscle tissue', 'LBM decreases with age at 3-8% per decade, making it unreliable for tracking training progress in older adults because natural sarcopenia masks the gains from resistance training'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section warns that LBM is often conflated with muscle mass, but bone, organs, blood, and water account for a large fraction of LBM. A person can gain or lose several kilograms of LBM through hydration changes alone without any actual change in muscle tissue.',
        },
        {
          q: 'What is sarcopenia, and at what rate does it progress after age 30?',
          options: ['Sarcopenia begins in the mid-40s and progresses at about 1-2% per year regardless of physical activity level, making resistance training ineffective for maintaining lean mass after age 50', 'LBM decreases with age at approximately 3-8% per decade after age 30 without deliberate training - a process called sarcopenia - making progressive resistance training and adequate protein intake the primary evidence-based methods to slow the decline', 'Sarcopenia accelerates significantly after age 60, transitioning from 1-2% per year in middle age to 3-5% per year in older adults, with protein supplementation alone being sufficient to halt most of the loss', 'Age-related LBM loss averages 5% per year after age 70 and cannot be reversed through training; resistance exercise only slows the rate of loss rather than rebuilding lost lean mass'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ states that LBM decreases with age (sarcopenia) at approximately 3-8% per decade after age 30 without deliberate training. Progressive resistance training is the most evidence-based method for increasing skeletal muscle, with adequate protein intake (1.6-2.2g/kg/day) required to support muscle protein synthesis.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'bioelectrical-impedance-analysis': {
    definition: [
      'Bioelectrical Impedance Analysis (BIA) estimates body composition by passing a low-level alternating electrical current - typically 50 kHz at 0.8 mA, far below the threshold of sensation - through the body. The core physics: fat tissue has high electrical resistance (low water content, poor conductor), while skeletal muscle and organs have low resistance (high water content, good conductors). The device measures the total impedance (Z) of the path the current travels, then applies validated regression equations to estimate total body water (TBW). From TBW, fat-free mass and body fat percentage are derived.',
      'Consumer BIA devices fall into several categories based on electrode placement. Foot-to-foot devices (bathroom scales) pass current only through the lower body; hand-to-hand handhelds pass current through the upper body; hand-to-foot devices or 4-electrode segmental devices pass current through the full body and are considered more accurate. High-end clinical devices such as the InBody 770 use 8 electrodes at multiple frequencies (multi-frequency BIA) to separate intracellular water from extracellular water, achieving accuracy within ±2-3 percentage points of DEXA in controlled conditions.',
      'The most significant limitation of BIA is its sensitivity to hydration. Because the method derives body fat from estimated body water, anything that shifts the body\'s water distribution - dehydration, recent exercise, a large meal, alcohol, or the menstrual cycle - directly alters the reading. On a typical consumer scale, measured body fat can vary by 2-4 percentage points between morning and evening on the same person without any actual change in fat tissue.',
    ],
    beginnerExplain: ['Think of your body as a pipe full of water. Electricity travels easily through water - and muscle is roughly 75% water - but travels slowly through fat, which has almost no water. A BIA device sends a tiny current from one electrode to another (you cannot feel it at all) and measures how much the body resists the flow. High resistance means more fat; low resistance means more muscle. The device then uses a formula to convert that resistance reading into a body fat percentage estimate. The catch: if you are dehydrated, there is less water in your tissues, resistance goes up, and the device will overestimate your body fat - even though nothing about your actual fat tissue has changed.'],
    whenToUse: 'BIA is best used for tracking directional trends over weeks or months, not for accurate one-off measurements. To minimise variability: always measure at the same time of day (ideally morning before eating, after using the toilet), under the same hydration conditions, and use the same device. Do not compare results between different BIA devices - each uses its own proprietary prediction equations and the absolute numbers are not comparable across brands. If you need a single accurate body fat measurement rather than a trend, the Navy tape method or a DEXA scan are more reliable.',
    examples: {
      headers: ['Device type', 'Typical accuracy vs DEXA', 'Electrode placement', 'Hydration sensitivity'],
      rows: [
        ['Consumer foot-to-foot scale', '±3 – 6%', 'Feet only (lower body)', 'High'],
        ['Consumer handheld device', '±3 – 5%', 'Hands only (upper body)', 'High'],
        ['4-electrode hand-to-foot', '±2.5 – 4%', 'Full body', 'Moderate to high'],
        ['InBody / segmental multi-frequency', '±2 – 3%', '8-point full body', 'Moderate'],
        ['Clinical multi-frequency BIA', '±1.5 – 2.5%', 'Controlled 4-electrode', 'Low (controlled conditions)'],
      ],
    },
    pitfalls: 'The most common misuse of BIA is treating day-to-day readings as meaningful data. A 2-point swing from Tuesday to Wednesday almost certainly reflects hydration changes, not fat loss or muscle gain. Compare weekly or biweekly averages rather than individual readings. A second common error is switching between BIA devices mid-tracking - the absolute output numbers are not comparable between brands, even if the underlying physics is the same. A third: consumer BIA devices tend to overestimate body fat in athletes (because athletic muscle has higher water density than the population averages used in the device\'s regression equations).',
    faqs: [
      { q: 'How accurate is BIA for body fat measurement?', a: 'Consumer foot-to-foot bathroom scales typically carry ±3-6% error vs DEXA. Higher-end segmental or multi-frequency devices achieve ±2-3% under standardised conditions. The margin expands significantly outside standardised conditions - particularly with suboptimal hydration, recent exercise, or measurement at different times of day. For clinical accuracy in a single reading, a DEXA scan or the Navy tape method in the morning fasted state is more reliable.' },
      { q: 'What is the best time to use a BIA scale?', a: 'First thing in the morning, before eating or drinking, after using the bathroom. At this point body water has equilibrated overnight, providing the most consistent baseline. Avoid measuring after exercise, after a large meal, after alcohol, or in the evening - all of these can shift BIA readings by 2-4 percentage points without any change in actual body composition.' },
      { q: 'How does BIA compare to the Navy tape method?', a: 'Both methods have similar accuracy (±3-5% vs DEXA) for most people under typical conditions. The Navy tape method is not affected by hydration and produces the same result regardless of when you measure, making it more reliable for one-off readings. BIA is more convenient - no tape measure or measuring technique required - but requires consistent conditions to produce comparable readings over time. For trend tracking, both work well when used consistently; for a reliable single reading, the tape method is generally more stable.' },
    ],
    quiz: {
      topic: 'BIA',
      questions: [
        {
          q: 'What does BIA derive body fat percentage from after measuring electrical impedance?',
          options: ['Bone mineral density estimated from multi-frequency absorption patterns', 'Skin temperature gradients between fat and muscle tissue layers', 'Total body water (TBW), from which fat-free mass and body fat percentage are calculated', 'Direct measurement of adipose tissue volume using current flow mapping'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'BIA measures total electrical impedance, then applies regression equations to estimate total body water (TBW). From TBW it derives fat-free mass, and from that it calculates body fat percentage. The method relies on the fact that fat tissue (low water) resists current more than muscle (high water).',
        },
        {
          q: 'Why does fat tissue resist electrical current more than skeletal muscle?',
          options: ['Fat tissue has low water content, making it a poor electrical conductor, while skeletal muscle has high water content', 'Fat cells are larger and physically block the current pathway more than muscle fibers', 'Fat tissue generates a counter-current that partially cancels the BIA signal', 'Fat tissue has fewer blood vessels to carry conductive electrolyte ions'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition states that fat tissue has high electrical resistance due to low water content (fat is a poor conductor), while skeletal muscle and organs have low resistance because of their high water content. This contrast is the physical basis of the entire BIA method.',
        },
        {
          q: 'According to the examples table, which BIA device type achieves the best typical accuracy versus DEXA?',
          options: ['Consumer foot-to-foot bathroom scale (±3-6%)', '4-electrode hand-to-foot device (±2.5-4%)', 'Consumer handheld device (±3-5%)', 'Clinical multi-frequency BIA (±1.5-2.5%)'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The examples table shows clinical multi-frequency BIA achieves ±1.5-2.5% accuracy versus DEXA under controlled conditions. Consumer foot-to-foot scales have the widest error range at ±3-6% and only measure current through the lower body.',
        },
        {
          q: 'What does the pitfalls section identify as the most common misuse of BIA?',
          options: ['Using BIA on athletic individuals where muscle composition inflates resistance readings', 'Treating day-to-day readings as meaningful data, when a 2-point swing almost certainly reflects hydration changes rather than fat loss or muscle gain', 'Comparing devices from different manufacturers, which use incompatible electrode placements', 'Measuring body fat on individuals below age 18, where BIA equations are not validated'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section states that treating day-to-day readings as meaningful is the most common misuse. A 2-point swing from one day to the next almost certainly reflects hydration changes, not actual body composition change. The recommendation is to compare weekly or biweekly averages.',
        },
        {
          q: 'According to the FAQ, what makes the Navy tape method more reliable than BIA for a single one-off body fat reading?',
          options: ['The Navy tape method is not affected by hydration and produces the same result regardless of when measured', 'The Navy tape method uses validated regression equations developed specifically for athletic populations', 'The Navy tape method measures multiple sites, averaging out individual measurement errors', 'The Navy tape method is faster and easier to administer than attaching BIA electrodes'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The FAQ states the Navy tape method is not affected by hydration and produces the same result regardless of when you measure. BIA readings can shift by 2-4 percentage points without any change in actual body composition, making it less suitable for one-off readings.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'estrogen': {
    definition: [
      'Estrogen is the primary female gender hormone, though it is present and necessary in both genders. In women, estrogen is produced mainly in the ovaries and regulates the menstrual cycle, reproduction, and fat distribution toward the hips, thighs, and breasts. In men, small amounts are produced in the testes and adrenal glands, but the dominant source is peripheral conversion of testosterone to estradiol - the most potent estrogen - by the aromatase enzyme in adipose tissue.',
      'In men, estrogen plays important regulatory roles at normal concentrations: it maintains bone mineral density, supports cognitive function, and modulates libido. Problems arise when the testosterone-to-estrogen ratio falls too far - a pattern called relative estrogen excess - which occurs when aromatase activity in excess body fat converts too much testosterone to estradiol. This suppresses the hypothalamic-pituitary-gonadal (HPG) axis and reduces further testosterone production, worsening the imbalance.',
      'There are three main endogenous estrogens: estradiol (E2, most potent, dominant during reproductive years), estriol (E3, produced during pregnancy), and estrone (E1, dominant after menopause). For body composition and cardiometabolic purposes, estradiol is the clinically relevant marker in both genders.',
    ],
    beginnerExplain: [
      'Think of estrogen and testosterone as two sides of a hormonal balance. In men, the balance normally tilts heavily toward testosterone. When body fat rises, aromatase in fat tissue acts as a conversion factory - turning testosterone into estrogen and pushing the balance the other way. The result is lower testosterone, easier fat gain, and less muscle - all of which drive more fat gain and more aromatase activity.',
      'In women, estrogen is the dominant hormone by design. It directs fat storage toward the hips and thighs (subcutaneous fat), which is metabolically safer than the visceral fat men tend to accumulate. After menopause, when estrogen levels fall sharply, women begin accumulating more visceral fat and their cardiometabolic risk rises toward male levels.',
    ],
    whenToUse: 'Estrogen is relevant in male body composition when BMI is elevated, because aromatase activity in visceral fat is the mechanism linking obesity to low testosterone. In women, estrogen explains the "pear" fat distribution pattern, the higher essential fat requirement (10-13% vs 2-5% in men), and why post-menopausal women see accelerating visceral fat accumulation as estrogen protection is removed.',
    examples: {
      headers: ['Gender', 'Estradiol (E2) range', 'Clinical note'],
      rows: [
        ['Men (adult)', '10 - 40 pg/mL', 'Above 40 pg/mL with low testosterone signals excess aromatase activity'],
        ['Women (follicular)', '12 - 250 pg/mL', 'Rises sharply before ovulation; highly variable across cycle'],
        ['Women (post-menopause)', '< 10 pg/mL', 'Loss of ovarian production; visceral fat risk rises'],
      ],
    },
    pitfalls: 'Isolated estradiol measurements in men mean little without a corresponding free testosterone value. The clinically relevant signal is the testosterone-to-estradiol ratio. Many symptoms attributed to "high estrogen in men" in popular health content - fatigue, low libido, mood changes - overlap entirely with low testosterone symptoms and cannot distinguish between the two without bloodwork. Self-diagnosis based on symptoms alone is unreliable.',
    faqs: [
      { q: 'What is the role of estrogen in men?', a: 'At normal concentrations, estrogen is essential in men: it maintains bone density, supports libido and cognitive function, and plays a role in cardiovascular health. Problems arise from relative excess rather than any absolute amount - when aromatase in fat tissue converts too much testosterone to estradiol, the testosterone-to-estrogen ratio falls, suppressing the HPG axis and degrading body composition.' },
      { q: 'Why does excess body fat raise estrogen in men?', a: 'Adipose tissue, particularly visceral fat, contains the aromatase enzyme, which converts testosterone to estradiol. The more visceral fat a man carries, the more aromatase activity occurs. This lowers circulating testosterone and raises estradiol, suppressing the pituitary\'s signal to produce more testosterone - a self-reinforcing cycle that worsens with increasing adiposity.' },
      { q: 'What is a normal estradiol level for men?', a: 'Normal estradiol (E2) in adult men is approximately 10-40 pg/mL. Above 40 pg/mL alongside low or low-normal testosterone is a clinical signal of excess aromatase activity, commonly driven by high visceral fat mass. Estradiol should always be interpreted alongside total and free testosterone, not in isolation.' },
      { q: 'How does estrogen differ between men and women in terms of fat distribution?', a: 'Estrogen in women directs fat storage toward the hips, thighs, and breasts - subcutaneous depots that are metabolically relatively inert. In men, lower estrogen and higher testosterone favor fat deposition in the abdomen and visceral regions. Post-menopausal women, whose estrogen levels fall sharply, shift toward a more male-like visceral fat distribution pattern and their cardiometabolic risk rises accordingly.' },
    ],
    quiz: {
      topic: 'estrogen',
      questions: [
        {
          q: 'In adult men, what is the primary source of estrogen in the body?',
          options: [
            'The adrenal glands, which produce estradiol as a byproduct of cortisol synthesis',
            'The testes, which produce both testosterone and estrogen in equal proportions',
            'Peripheral conversion of testosterone to estradiol by the aromatase enzyme in adipose tissue',
            'The pituitary gland, which secretes estrogen alongside LH and FSH',
          ] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition states that while small amounts of estrogen are produced in the testes and adrenal glands, the dominant source in adult men is peripheral conversion of testosterone to estradiol by the aromatase enzyme in adipose tissue - which is why higher body fat directly raises estrogen in men.',
        },
        {
          q: 'What happens to the HPG axis when aromatase activity is elevated in men with excess body fat?',
          options: [
            'The HPG axis upregulates LH and FSH production to compensate, raising total testosterone',
            'Excess estradiol from aromatase suppresses the HPG axis, reducing the pituitary signal to produce testosterone',
            'The HPG axis is unaffected by estradiol levels - it only responds to testosterone concentrations',
            'Elevated aromatase raises estradiol and simultaneously stimulates testicular testosterone synthesis',
          ] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition explains that when aromatase in excess body fat converts too much testosterone to estradiol, this suppresses the hypothalamic-pituitary-gonadal (HPG) axis and reduces further testosterone production - worsening the testosterone-estrogen imbalance.',
        },
        {
          q: 'Why does fat distribution change in women after menopause?',
          options: [
            'Post-menopausal women produce more androgens from the adrenal glands, directly shifting fat to the abdomen',
            'Estrogen levels fall sharply after menopause, removing its role in directing fat to the hips and thighs - visceral fat accumulation accelerates and cardiometabolic risk rises toward male levels',
            'Metabolic rate increases after menopause, redistributing existing subcutaneous fat to visceral depots',
            'Higher cortisol levels post-menopause override estrogen-directed fat distribution patterns',
          ] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The whenToUse section and beginnerExplain both state that after menopause, when estrogen levels fall sharply, women begin accumulating more visceral fat and their cardiometabolic risk rises toward male levels - because estrogen\'s protective role in directing fat to safer subcutaneous depots is removed.',
        },
        {
          q: 'According to the examples table, what does an estradiol level above 40 pg/mL alongside low testosterone signal in a man?',
          options: [
            'Normal age-related hormonal changes that do not require clinical attention',
            'Primary hypogonadism - a failure of testicular testosterone production unrelated to body fat',
            'Excess aromatase activity, commonly driven by high visceral fat mass',
            'A measurement error - estradiol above 40 pg/mL cannot occur in healthy adult men',
          ] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The examples table notes that above 40 pg/mL with low testosterone signals excess aromatase activity, commonly driven by high visceral fat mass. The definition explains the mechanism: visceral fat contains aromatase, which converts testosterone to estradiol at a rate proportional to fat mass.',
        },
        {
          q: 'The pitfalls section warns that isolated estradiol measurements are difficult to interpret without what additional value?',
          options: [
            'Cortisol, since HPA-axis activity modulates both testosterone and estrogen simultaneously',
            'Free testosterone - the testosterone-to-estradiol ratio is the clinically relevant signal, not estradiol in isolation',
            'SHBG, since gender hormone-binding globulin directly determines how much estradiol is biologically active',
            'LH and FSH, since pituitary hormone levels are needed to distinguish primary from secondary hypogonadism',
          ] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section states that isolated estradiol measurements in men mean little without a corresponding free testosterone value - the clinically relevant signal is the testosterone-to-estradiol ratio. Many symptoms attributed to high estrogen overlap entirely with low testosterone symptoms and cannot be distinguished without full bloodwork.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'visceral-fat': {
    definition: [
      'Visceral fat is body fat stored inside the abdominal cavity, surrounding the liver, pancreas, kidneys, and intestines. Unlike subcutaneous fat stored beneath the skin, visceral fat sits within the peritoneal cavity and drains directly into the portal circulation - the blood supply that goes to the liver before anywhere else in the body.',
      'This anatomical position makes visceral fat metabolically distinct and more harmful than subcutaneous fat. Visceral fat is biologically active: it releases pro-inflammatory cytokines (TNF-alpha, IL-6), free fatty acids, and hormones (including resistin and leptin) directly into the portal vein. This constant inflammatory signal drives insulin resistance, raises triglycerides, lowers HDL cholesterol, and elevates blood pressure - the cluster known as metabolic syndrome. Higher visceral fat mass is independently associated with type 2 diabetes, cardiovascular disease, non-alcoholic fatty liver disease, and certain cancers regardless of total body weight.',
      'BMI cannot distinguish visceral fat from subcutaneous fat or muscle. Two men with identical BMI and waist circumference may have very different visceral fat volumes depending on genetics, age, gender hormone levels, and lifestyle. CT and MRI imaging are the gold standard for measuring visceral fat; DEXA scanning provides an estimate. In clinical and consumer settings, waist circumference and waist-to-height ratio are the most practical validated proxies.',
    ],
    beginnerExplain: [
      'Think of visceral fat as fat that has VIP access to your liver. Subcutaneous fat - the kind you can pinch - sits quietly under the skin and causes relatively little metabolic harm at moderate levels. Visceral fat, by contrast, is constantly releasing chemicals into the portal vein, which flows straight to the liver. The liver receives these signals continuously and responds by increasing blood sugar, raising triglycerides, and triggering inflammation throughout the body.',
      'This is why someone can look slim but have serious metabolic problems - if their fat is stored viscerally rather than subcutaneously. And it is why waist circumference is a better health signal than weight alone: a growing waistline usually means growing visceral fat.',
    ],
    whenToUse: 'Reference visceral fat when explaining why BMI and body weight alone are insufficient health markers - especially in men, who accumulate visceral fat more readily than pre-menopausal women, and in older adults, where visceral fat increases even at stable body weight as subcutaneous fat and muscle mass decline. Waist circumference above 102 cm (40 in) in men and 88 cm (35 in) in women is the WHO threshold for high cardiometabolic risk from visceral adiposity.',
    examples: {
      headers: ['Measurement method', 'What it measures', 'Accessible without clinical tools?'],
      rows: [
        ['CT / MRI scan', 'Direct visceral fat volume (cm³)', 'No - requires imaging equipment'],
        ['DEXA scan', 'Estimated visceral fat area', 'No - clinical setting'],
        ['Waist circumference', 'Abdominal girth (strong proxy)', 'Yes - tape measure'],
        ['Waist-to-height ratio', 'Waist as fraction of height (< 0.5 = lower risk)', 'Yes - tape measure + calculator'],
        ['BMI', 'Weight-for-height (does not distinguish fat type)', 'Yes - but cannot detect visceral fat'],
      ],
    },
    pitfalls: 'A normal waist circumference does not guarantee low visceral fat in all cases. The "normal weight obese" phenotype - individuals with a BMI under 25 and a waist under the high-risk threshold but a high body fat percentage - can carry clinically meaningful visceral fat that standard measurements miss. Also, waist circumference in very tall individuals can exceed thresholds without carrying proportional risk; waist-to-height ratio (keeping waist below half of height) corrects for this.',
    faqs: [
      { q: 'What is the difference between visceral fat and subcutaneous fat?', a: 'Subcutaneous fat is stored beneath the skin - the layer you can pinch at the waist, abdomen, or thighs. It is relatively metabolically inert at moderate levels. Visceral fat is stored inside the abdominal cavity, surrounding internal organs, and drains into the portal circulation. Its direct access to the liver makes it far more metabolically harmful per unit of volume than subcutaneous fat.' },
      { q: 'Why do men accumulate more visceral fat than women?', a: 'Estrogen in pre-menopausal women directs fat storage toward subcutaneous depots in the hips and thighs - the "pear" pattern - and actively limits visceral accumulation. Testosterone favors visceral and abdominal deposition. After menopause, when estrogen falls sharply, women shift toward a male-like fat distribution pattern and visceral fat accumulation accelerates, which is one reason their cardiometabolic risk rises post-menopause.' },
      { q: 'Can you reduce visceral fat through diet and exercise?', a: 'Yes, and visceral fat responds to calorie deficit faster than subcutaneous fat. Studies consistently show that even modest weight loss of 5-10% of body weight produces a disproportionate reduction in visceral fat relative to total fat lost. Aerobic exercise has the strongest evidence for visceral fat reduction; resistance training adds benefit by raising metabolic rate and improving insulin sensitivity.' },
      { q: 'What waist circumference indicates high visceral fat risk?', a: 'The WHO defines high cardiometabolic risk thresholds as a waist circumference above 102 cm (40 in) for men and above 88 cm (35 in) for women in European populations. Increased risk begins earlier: above 94 cm (37 in) for men and 80 cm (31.5 in) for women. Lower thresholds apply for South Asian, East Asian, and other ethnic groups, where visceral fat risk increases at smaller waist sizes.' },
    ],
    quiz: {
      topic: 'visceral fat',
      questions: [
        {
          q: 'Why is visceral fat metabolically more harmful than subcutaneous fat?',
          options: [
            'Visceral fat contains more calories per gram than subcutaneous fat, making it harder to burn off through exercise',
            'Visceral fat is located beneath the skin where it compresses nerves and blood vessels directly',
            'Visceral fat drains into the portal circulation, delivering pro-inflammatory cytokines and free fatty acids directly to the liver before the rest of the body',
            'Visceral fat is composed of a different type of lipid cell that secretes more leptin than subcutaneous adipocytes',
          ] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition explains that visceral fat sits inside the abdominal cavity and drains into the portal vein, which goes straight to the liver. This delivers a continuous stream of pro-inflammatory cytokines, free fatty acids, and hormones to the liver, driving insulin resistance, triglyceride production, and systemic inflammation.',
        },
        {
          q: 'According to the examples table, which measurement directly measures visceral fat volume without requiring a proxy?',
          options: [
            'Waist circumference measured with a tape measure at the natural waist',
            'BMI calculated from weight and height',
            'CT or MRI scan measuring visceral fat volume in cm³',
            'Waist-to-height ratio compared to the 0.5 threshold',
          ] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The examples table shows that CT and MRI scans directly measure visceral fat volume (cm³) and are the gold standard. All other methods - waist circumference, waist-to-height ratio, BMI - are proxies or do not measure visceral fat at all. CT and MRI require clinical imaging equipment and are not accessible without medical referral.',
        },
        {
          q: 'The beginnerExplain section describes visceral fat as having "VIP access" to which organ, and why does this matter?',
          options: [
            'The heart - visceral fat presses on the pericardium, directly straining cardiac output',
            'The pancreas - visceral fat impairs insulin secretion by direct physical pressure on beta cells',
            'The liver - visceral fat drains into the portal vein, delivering inflammatory signals continuously and raising blood sugar, triglycerides, and inflammation',
            'The kidneys - visceral fat impairs filtration by increasing intra-abdominal pressure on renal blood flow',
          ] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The beginnerExplain section explains that visceral fat has VIP access to the liver via the portal vein. The liver receives these chemical signals continuously and responds by increasing blood sugar, raising triglycerides, and triggering inflammation throughout the body - which is the core mechanism behind metabolic syndrome.',
        },
        {
          q: 'What does the pitfalls section warn about "normal weight obese" individuals?',
          options: [
            'They have a BMI above 30 but waist circumference below 94 cm, making them difficult to classify under standard guidelines',
            'Their low body weight paradoxically raises visceral fat risk because low muscle mass reduces metabolic rate',
            'They have a BMI under 25 and waist below risk thresholds but can still carry clinically meaningful visceral fat that standard measurements miss',
            'They systematically underestimate their caloric intake, making dietary intervention ineffective without supervised meals',
          ] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section states that the "normal weight obese" phenotype describes individuals with a BMI under 25 and a waist below the high-risk threshold but a high body fat percentage - they can carry clinically meaningful visceral fat that standard BMI and waist measurements miss entirely.',
        },
        {
          q: 'According to the FAQ, what response does visceral fat show to a modest weight loss of 5-10% of body weight compared to subcutaneous fat?',
          options: [
            'Visceral fat and subcutaneous fat reduce proportionally - both decrease at the same rate relative to initial volume',
            'Visceral fat is resistant to dietary restriction and responds mainly to aerobic exercise, not calorie deficit',
            'Visceral fat is preferentially preserved during weight loss - the body burns subcutaneous fat first to protect organs',
            'Visceral fat responds faster to calorie deficit than subcutaneous fat - studies show disproportionate visceral fat reduction relative to total fat lost',
          ] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The FAQ states that visceral fat responds to calorie deficit faster than subcutaneous fat - even modest weight loss of 5-10% of body weight produces a disproportionate reduction in visceral fat relative to total fat lost. Aerobic exercise has the strongest evidence for visceral fat reduction specifically.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'testosterone': {
    definition: [
      'Testosterone is the primary male gender hormone, produced mainly in the Leydig cells of the testes under regulation from the hypothalamic-pituitary-gonadal (HPG) axis. Normal total testosterone in adult men ranges from 300 to 1,000 ng/dL (10.4-34.7 nmol/L), with free testosterone - the biologically active fraction not bound to proteins - representing roughly 1-3% of the total.',
      'Testosterone drives two critical body composition processes: anabolism (stimulating muscle protein synthesis and lean mass accretion) and lipolysis (promoting fat breakdown, especially in visceral depots). This dual action means that well-maintained testosterone levels support a leaner, more metabolically active body composition - while declining levels push body composition in the opposite direction.',
      'The relationship between body fat and testosterone is bidirectional. Adipose tissue contains aromatase, an enzyme that converts testosterone to estradiol (estrogen). Men with higher visceral fat have more aromatase activity, which lowers free testosterone. Low testosterone then reduces muscle mass and raises fat mass, increasing aromatase activity further. Research shows total testosterone declines by approximately 2% for each 1-unit rise in BMI in men with obesity.',
    ],
    beginnerExplain: [
      'Think of testosterone as the engine that keeps muscle running. The more muscle you have, the faster your metabolism burns calories at rest. When body fat rises, aromatase acts like a drain - it converts testosterone into estrogen, slowing the engine. With less testosterone, muscle becomes harder to maintain, metabolism slows, and fat gain accelerates.',
      'The practical implication: losing fat raises testosterone, and higher testosterone makes it easier to build the muscle that accelerates further fat loss. The cycle runs in both directions, which is why resistance training - not just calorie restriction - is important for men at a high BMI.',
    ],
    whenToUse: 'Testosterone levels are relevant when interpreting BMI or body composition results for men, particularly in the overweight (BMI 25-29.9) and obese ranges. A man losing weight who also adds resistance training is more likely to see testosterone recovery than one who restricts calories alone. Clinically measured low testosterone (hypogonadism, typically below 300 ng/dL total) warrants medical evaluation independent of BMI.',
    examples: {
      headers: ['Category', 'Total Testosterone (ng/dL)', 'Clinical implication'],
      rows: [
        ['Optimal', '600 - 1,000', 'Strong anabolic drive; lean body composition easier to maintain'],
        ['Normal', '300 - 600', 'Standard reference range; clinical intervention not typically indicated'],
        ['Low-normal', '300 - 400', 'Below-average; body composition benefits are reduced'],
        ['Hypogonadal', 'Below 300', 'Clinical hypogonadism; medical evaluation recommended'],
      ],
    },
    pitfalls: 'Total testosterone can be normal while free testosterone is low, particularly in obese men where gender hormone-binding globulin (SHBG) levels are altered. A man with a total testosterone of 450 ng/dL but high SHBG may have free testosterone well below the normal range - meaning the biologically active fraction is suppressed even though the headline number looks acceptable. Free testosterone or calculated free testosterone should be checked when total testosterone appears borderline.',
    faqs: [
      { q: 'What is a normal testosterone level for men?', a: 'The standard clinical reference range for total testosterone in adult men is 300 to 1,000 ng/dL. Levels vary with age: men in their 20s often measure 600-900 ng/dL, while men over 60 commonly fall in the 300-500 ng/dL range as a result of the natural 1-2% per year decline that begins around age 30.' },
      { q: 'How much does BMI affect testosterone?', a: 'Research consistently shows total testosterone declines by approximately 2% for each 1-unit increase in BMI. A man moving from BMI 25 to BMI 35 may experience a testosterone decline equivalent to 10-15 years of normal aging. The mechanism is aromatase activity in visceral fat, which converts testosterone to estrogen and suppresses HPG-axis production.' },
      { q: 'What is the difference between total and free testosterone?', a: 'Total testosterone measures all testosterone in the blood. Free testosterone is the small fraction (1-3%) not bound to proteins - primarily gender hormone-binding globulin (SHBG) and albumin. Only free testosterone can enter cells and exert biological effects. In obese men, SHBG can be suppressed, sometimes paradoxically elevating free testosterone despite low total; conversely, high SHBG (common in older men) can leave free testosterone low despite normal total levels.' },
      { q: 'Can weight loss raise testosterone levels?', a: 'Yes, consistently. Multiple clinical studies show that weight loss in obese men raises total testosterone proportionally to the amount of fat lost. A 10% reduction in body weight is associated with an average 15-25% increase in testosterone. The effect is enhanced when weight loss is accompanied by resistance training, which adds an additional anabolic stimulus independent of fat loss.' },
    ],
    quiz: {
      topic: 'testosterone',
      questions: [
        {
          q: 'What is the primary mechanism by which excess body fat lowers testosterone in men?',
          options: [
            'The liver increases testosterone clearance in proportion to body weight, reducing circulating levels',
            'Adipose tissue contains aromatase, which converts testosterone to estrogen - lowering free testosterone and suppressing HPG-axis production',
            'Higher insulin levels from a high-calorie diet directly block testosterone receptors in muscle tissue',
            'The kidneys filter out excess testosterone more rapidly when blood lipids are elevated',
          ] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition states that adipose tissue contains aromatase, an enzyme that converts testosterone to estradiol (estrogen). Men with more visceral fat have more aromatase activity, which lowers free testosterone and triggers the HPG axis to further reduce production.',
        },
        {
          q: 'By approximately how much does total testosterone decline per 1-unit rise in BMI in men with obesity?',
          options: ['0.5%', '1%', '2%', '5%'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition and examples both state that total testosterone declines by approximately 2% for each 1-unit rise in BMI. Moving from BMI 25 to 35 is therefore associated with a testosterone decline equivalent to 10-15 years of normal aging.',
        },
        {
          q: 'What does the beginnerExplain section identify as the main advantage of adding resistance training alongside calorie restriction for men at a high BMI?',
          options: [
            'Resistance training burns more calories than cardio, accelerating the calorie deficit needed for fat loss',
            'Lifting weights directly stimulates aromatase suppression, raising testosterone independently of fat loss',
            'Resistance training builds the muscle that raises metabolic rate, and the testosterone-fat cycle runs in both directions - making further fat loss easier',
            'Weight training raises SHBG, which protects free testosterone from being converted by aromatase',
          ] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The beginnerExplain section states the cycle runs in both directions: losing fat raises testosterone, and higher testosterone makes it easier to build the muscle that accelerates further fat loss. Resistance training is important because calorie restriction alone can take muscle along with fat, worsening the hormonal situation.',
        },
        {
          q: 'A man has a total testosterone of 450 ng/dL but reports symptoms of low testosterone. What does the pitfalls section say should be checked?',
          options: [
            'Cortisol levels, which can suppress testosterone bioavailability when chronically elevated',
            'Free testosterone or calculated free testosterone, since high SHBG can leave free testosterone well below normal even when total appears acceptable',
            'Estradiol levels directly, since high estrogen is a more reliable marker of aromatase activity than free testosterone',
            'LH and FSH levels from the pituitary to determine whether the HPG axis is suppressed',
          ] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section states that a man with a total testosterone of 450 ng/dL but high SHBG may have free testosterone well below the normal range - meaning the biologically active fraction is suppressed even though the headline number looks acceptable. Free testosterone should be checked when total testosterone appears borderline.',
        },
        {
          q: 'According to the FAQ, what average testosterone increase is associated with a 10% reduction in body weight?',
          options: ['5-10%', '15-25%', '30-40%', '50%'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ states that a 10% reduction in body weight is associated with an average 15-25% increase in testosterone. The effect is enhanced when weight loss is accompanied by resistance training, which adds an additional anabolic stimulus independent of fat loss.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'normal-weight-obesity': {
    definition: [
      'Normal weight obesity (NWO) is a clinical condition in which a person\'s BMI falls within the normal range (18.5-24.9) while their body fat percentage is elevated to levels associated with obesity - typically above 30% in women and above 25% in men. BMI measures weight relative to height, not fat relative to lean tissue, so a person with very low muscle mass can carry substantial fat while remaining within a normal BMI range. Research published in the European Heart Journal found NWO present in approximately 30% of women with normal BMI, making it common rather than exceptional.',
      'NWO typically develops through a combination of low muscle mass and elevated fat mass, most often in sedentary adults who have never built meaningful lean tissue. The classic profile is a person who weighs a normal amount for their height but has little muscle - resulting in a high fat-to-muscle ratio that BMI cannot detect. Fat in NWO tends to concentrate in the abdomen, meaning visceral fat accumulation can reach clinically significant levels even at a normal total weight.',
      'The metabolic consequences of NWO are equivalent to those of standard obesity. Studies associate NWO with insulin resistance, elevated triglycerides, reduced HDL cholesterol, hypertension, and increased cardiovascular risk - the same cluster defining metabolic syndrome. This means a person with NWO faces comparable health risks to someone with a BMI of 30+, despite appearing healthy by standard weight-based screening.',
    ],
    beginnerExplain: [
      'Imagine two backpacks that weigh exactly the same. One is packed with textbooks (dense, compact - like muscle). The other is stuffed with foam packing material (light and voluminous - like fat). Both register the same number on a luggage scale, but the foam backpack is taking up far more space and putting far more stress on the seams. BMI is the luggage scale. NWO is what happens when the backpack is mostly foam.',
      'The most accessible check is waist circumference. A waist above 80 cm (31.5 inches) in a woman with a normal BMI is a warning sign worth investigating, even if the scale looks fine. Body fat percentage measurement - via DEXA scan or bioelectrical impedance - gives the definitive answer. A reading above 30% in a woman with a normal BMI confirms NWO.',
    ],
    whenToUse: 'Use NWO when explaining why BMI alone is insufficient for health screening in sedentary adults, postmenopausal women, and older individuals where muscle loss raises the fat-to-muscle ratio without changing total weight. It is most relevant for people with a BMI of 20-24.9 who are sedentary, have never trained regularly, or have lost significant muscle with age. For these groups, waist circumference and body fat percentage provide critical context that BMI cannot.',
    examples: {
      headers: ['Profile', 'BMI', 'Body fat %', 'Waist circumference', 'Metabolic risk'],
      rows: [
        ['Active woman, normal composition', '22', '22%', '74 cm (29 in)', 'Low'],
        ['Sedentary woman, normal weight obesity', '22', '33%', '81 cm (32 in)', 'Elevated'],
        ['Clinical obesity', '31', '40%', '95 cm (37 in)', 'High'],
      ],
    },
    pitfalls: 'The most common misunderstanding is that NWO is treated by weight loss. Since BMI is already normal, further calorie restriction risks losing lean mass and worsening the fat-to-muscle ratio. The correct intervention is resistance training to build muscle and improve body composition, combined with moderate calorie management if visceral fat is elevated. A second pitfall is assuming a waist below the high-risk threshold (88 cm in women, 102 cm in men) rules out NWO - a waist of 82-87 cm can still indicate elevated visceral fat in smaller-framed women. Body fat percentage measurement is more definitive than waist circumference alone.',
    faqs: [
      { q: 'What body fat percentage defines normal weight obesity in women?', a: 'NWO in women is generally defined as a body fat percentage above 30% with a BMI in the normal range (18.5-24.9). Some researchers use 35% as a stricter cutoff, but most clinical studies use 30% as the threshold where metabolic risk increases significantly. The threshold for men is lower: above 25% body fat with a normal BMI.' },
      { q: 'How common is normal weight obesity?', a: 'Research finds NWO in roughly 30% of adults with a normal BMI in developed countries - making it common, not rare. The condition is more prevalent in women than men, in sedentary individuals, and in older adults, particularly postmenopausal women where decades of muscle loss raise the fat-to-muscle ratio without changing body weight.' },
      { q: 'Does normal weight obesity carry the same health risks as clinical obesity?', a: 'Research consistently associates NWO with the same metabolic syndrome markers as clinical obesity: insulin resistance, elevated triglycerides, low HDL, hypertension, and elevated cardiovascular risk. The risks are driven primarily by visceral fat accumulation, not total body weight, which is why NWO is clinically significant despite a normal BMI reading.' },
      { q: 'What is the most practical way to screen for NWO without clinical testing?', a: 'Waist circumference is the most accessible tool. In women, a waist above 80 cm (31.5 inches) with a normal BMI is a warning sign warranting further assessment. Body fat percentage via bioelectrical impedance analysis (BIA scales or DEXA scan) provides the definitive measurement. A reading above 30% body fat in a woman with a normal BMI confirms NWO.' },
    ],
    quiz: {
      topic: 'normal weight obesity',
      questions: [
        {
          q: 'What is the defining characteristic of normal weight obesity (NWO)?',
          options: [
            'A BMI above 25 combined with a body fat percentage below 20%',
            'A BMI in the normal range (18.5-24.9) combined with a body fat percentage elevated to obesity levels',
            'A body fat percentage above 20% in any adult regardless of BMI',
            'A normal body fat percentage combined with a BMI above 30',
          ] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'NWO is defined as a BMI in the normal range (18.5-24.9) while body fat percentage is elevated to obesity levels - above 30% in women and above 25% in men. BMI falls within healthy parameters, but body composition tells a different story.',
        },
        {
          q: 'What body fat percentage threshold generally defines NWO in women?',
          options: [
            'Above 20%',
            'Above 25%',
            'Above 30%',
            'Above 40%',
          ] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition states NWO in women is generally defined as a body fat percentage above 30% with a BMI in the normal range. Some researchers use 35% as a stricter cutoff, but 30% is the most widely used clinical threshold. The threshold for men is lower at above 25%.',
        },
        {
          q: 'Why does BMI fail to detect normal weight obesity?',
          options: [
            'BMI uses an outdated formula that underestimates weight in modern populations',
            'BMI cannot distinguish fat tissue from lean tissue, so a person with low muscle mass can carry high body fat at a normal total weight',
            'BMI is only accurate for men and systematically underestimates body fat in women',
            'BMI measurements are unreliable because body weight fluctuates by 1-2 kg throughout the day',
          ] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'BMI measures weight relative to height, not fat relative to lean tissue. A person with very low muscle mass can carry substantial fat while remaining within a normal BMI range. This is the core mechanism behind NWO - the fat-to-muscle ratio is the variable BMI cannot detect.',
        },
        {
          q: 'Approximately how common is NWO in adults with a normal BMI in developed countries?',
          options: [
            'About 5%',
            'About 15%',
            'About 30%',
            'About 50%',
          ] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'Research - including data published in the European Heart Journal - consistently finds NWO in roughly 30% of adults with a normal BMI. The condition is common rather than exceptional, and is one reason BMI alone is considered insufficient for comprehensive health screening.',
        },
        {
          q: 'What does the pitfalls section identify as the most common NWO treatment mistake?',
          options: [
            'Taking hormonal supplements to raise estrogen levels',
            'Assuming waist circumference below 88 cm fully rules out NWO',
            'Treating NWO with weight loss, which risks losing lean mass and worsening the fat-to-muscle ratio',
            'Relying on BMI measurements taken in the morning vs evening',
          ] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section warns that since BMI is already normal, further calorie restriction risks losing lean mass and worsening the fat-to-muscle ratio. The correct intervention is resistance training to build muscle and improve body composition - not weight loss. The goal is to change body composition, not reduce the number on the scale.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'perimenopause': {
    definition: [
      'Perimenopause is the transitional phase before menopause during which ovarian function declines and estrogen levels become irregular. It typically begins in the mid-40s and lasts 4-8 years, ending 12 months after the final menstrual period - the formal definition of menopause. The average age of menopause in the United States is 52, meaning many women experience perimenopause from their mid-40s onward.',
      'The defining hormonal feature of perimenopause is fluctuating estrogen, not simply declining estrogen. Levels can swing between high and low within a single month, producing irregular cycles, hot flashes, and sleep disruption. From a body composition perspective, the first measurable changes - a slow drift toward abdominal fat storage and mild reductions in resting metabolism - begin before estrogen levels fall consistently. BMI may remain stable during perimenopause while body fat percentage and waist circumference gradually increase.',
      'Perimenopause differs clinically from postmenopause in that the hormonal environment is volatile rather than consistently low. This makes it a window of opportunity for establishing lifestyle habits (resistance training, protein-adequate diet, waist circumference monitoring) that reduce the cardiometabolic impact of the full estrogen withdrawal that follows menopause.',
    ],
    beginnerExplain: [
      'Think of perimenopause as a dimmer switch being turned down slowly - not a light being switched off. The ovaries produce less estrogen on average, but with irregular spikes. Some months feel normal; others bring hot flashes, mood changes, and disrupted sleep. This is distinct from menopause itself, where the dimmer is fully down and stays there.',
      'From a health measurement standpoint, the key practical point is this: your BMI might not change during perimenopause, but your waist circumference might start creeping upward. That drift is worth monitoring - it signals that fat is beginning to redistribute toward the abdomen, which carries real cardiometabolic implications independent of total body weight.',
    ],
    whenToUse: 'Use this term when interpreting BMI or waist circumference in women aged 40-55 who are experiencing menstrual irregularity. Perimenopause complicates BMI interpretation because body composition can shift even when weight stays constant. Waist circumference is the most useful supplementary metric during this phase.',
    examples: {
      headers: ['Stage', 'Hormonal pattern', 'Typical BMI change', 'Body composition change', 'Key monitoring metric'],
      rows: [
        ['Premenopause (30s-early 40s)', 'Stable estrogen', 'Minimal', 'Gynoid fat pattern (hips/thighs)', 'BMI sufficient'],
        ['Perimenopause (mid-40s to ~52)', 'Fluctuating estrogen', 'Minimal to moderate', 'Gradual shift toward abdominal fat', 'Waist circumference + BMI'],
        ['Early postmenopause (0-5 yrs)', 'Low, stable estrogen', 'Modest gain common', 'Accelerated visceral fat shift', 'Waist circumference primary'],
        ['Late postmenopause (10+ yrs)', 'Very low estrogen', 'Variable', 'Established android pattern', 'Waist + cardiometabolic risk composite'],
      ],
    },
    pitfalls: 'The most common misunderstanding is treating perimenopause as synonymous with menopause. They are distinct phases with different hormonal profiles. During perimenopause, BMI can appear stable while body composition shifts meaningfully - so relying on BMI alone gives a false sense of security. Another common error is dismissing perimenopausal symptoms as normal aging without noting that lifestyle interventions (resistance training, protein intake) are substantially more effective during perimenopause than after menopause is established.',
    faqs: [
      { q: 'How long does perimenopause last?', a: 'Perimenopause typically lasts 4-8 years, though the range is wide (1-10+ years). It ends officially when 12 consecutive months have passed without a menstrual period. The final year before that 12-month mark is often the most symptomatic, with the most frequent hot flashes and the most irregular cycles.' },
      { q: 'Can I still get pregnant during perimenopause?', a: 'Yes. Ovulation still occurs during perimenopause, though less predictably. Conception is possible until menopause is confirmed (12 months after the last period). Contraception remains important during perimenopause if pregnancy is not desired.' },
      { q: 'Does perimenopause cause weight gain?', a: 'Perimenopause is associated with fat redistribution rather than large weight gain. The average weight gain during the menopausal transition is roughly 2-3 kg (4-6 lbs). More significant is the shift of fat from hips and thighs to the abdomen - a change that can occur even without meaningful changes in BMI.' },
      { q: 'Is HRT appropriate during perimenopause?', a: 'Yes. Hormone replacement therapy can be appropriate during perimenopause to manage hot flashes, sleep disruption, and early bone loss. Most international guidelines support HRT for perimenopausal women without contraindications, particularly those below age 60. Discuss timing and type with a clinician.' },
    ],
    quiz: {
      topic: 'perimenopause',
      questions: [
        {
          q: 'When does perimenopause officially end?',
          options: ['When estrogen levels fall below a specific lab threshold', 'When 12 consecutive months have passed without a menstrual period', 'When hot flashes stop', 'At the age of 52'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'Perimenopause ends - and menopause begins - when 12 consecutive months have passed without a menstrual period. This is the clinical definition, regardless of estrogen levels or symptom status.',
        },
        {
          q: 'Why might a woman\'s waist circumference increase during perimenopause even if her BMI stays constant?',
          options: ['BMI formulas are inaccurate for women over 40', 'Declining and fluctuating estrogen begins shifting fat from hips and thighs toward the abdomen', 'Muscle mass increases with age, raising BMI while fat redistributes', 'Waist circumference and BMI are unrelated metrics'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'Estrogen plays a direct role in fat distribution. As estrogen becomes irregular during perimenopause, the gynoid (hip and thigh) fat pattern gradually shifts toward android (abdominal) fat storage. BMI, which measures total weight, misses this redistribution entirely.',
        },
        {
          q: 'What is the average age of menopause in the United States, according to this glossary entry?',
          options: ['48', '50', '52', '55'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The entry cites the average age of menopause in the US as 52. Perimenopause typically begins in the mid-40s and lasts 4-8 years, so many women experience perimenopausal changes starting around age 44-48.',
        },
        {
          q: 'Which is described as the most useful monitoring metric during perimenopause?',
          options: ['BMI alone', 'Body weight on a scale', 'Waist circumference alongside BMI', 'Resting heart rate'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The entry states that waist circumference is the most useful supplementary metric during perimenopause, because body composition can shift (fat moving abdominally) even when BMI and scale weight remain stable. BMI alone gives a false sense of security during this phase.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'hormone-replacement-therapy': {
    definition: [
      'Hormone replacement therapy (HRT) is a medical treatment that restores hormones - primarily estrogen, and in most cases progesterone as well - to reduce the physiological consequences of menopause. At menopause, the ovaries sharply reduce estrogen production, triggering hot flashes, sleep disruption, vaginal atrophy, and accelerated bone loss. For women without specific contraindications, HRT is the recommended treatment in most international guidelines for women below age 60 or within 10 years of menopause onset.',
      'The body composition effects of HRT are distinct from its symptomatic effects. Estrogen plays a direct role in fat storage location - directing fat toward subcutaneous (hip and thigh) depots in pre-menopausal women and away from visceral depots. After menopause, the loss of this estrogen signal causes fat to redistribute abdominally. Estrogen-containing HRT partially restores this signal, slowing visceral fat accumulation and supporting lean muscle mass preservation at a given body weight. Two women with identical BMIs may have meaningfully different body compositions depending on their HRT status.',
      'HRT comes in several formulations. Combined HRT includes both estrogen and progesterone (or a synthetic progestogen) and is prescribed to women who have not had a hysterectomy, to protect the uterine lining from unopposed estrogen. Estrogen-only HRT is used by women who have had a hysterectomy. Delivery methods include oral tablets, transdermal patches and gels, vaginal preparations, and implants - and the type, dose, and route of delivery affect both the clinical benefits and the risk profile.',
    ],
    beginnerExplain: [
      'Think of estrogen as a traffic director for fat storage. Before menopause, it routes most fat to the hips, thighs, and breasts - depots that are metabolically quiet. After menopause, without that director, fat increasingly parks in the abdomen instead, where it is metabolically active and harmful. HRT is like reinstating the traffic director at lower authority - it does not fully restore pre-menopausal fat routing, but it slows the abdominal shift considerably.',
      'The practical BMI implication: a woman on HRT may gain a kilogram or two in the first year - mostly fluid - which can nudge BMI upward slightly. But if waist circumference stays stable or declines during that period, the body composition picture is actually improving. BMI alone misses this distinction entirely.',
    ],
    whenToUse: 'Reference HRT when explaining body composition changes after menopause, interpreting BMI in postmenopausal women, or discussing why two women at the same BMI can have different cardiometabolic risk profiles. It is relevant whenever waist circumference or visceral fat is being discussed in the context of the menopausal transition, and when explaining why BMI is a less reliable health indicator for postmenopausal women.',
    examples: {
      headers: ['HRT type', 'Typical users', 'Body composition effect'],
      rows: [
        ['Combined HRT (estrogen + progesterone)', 'Women with a uterus', 'Slows visceral fat gain; modest fluid retention initially'],
        ['Estrogen-only HRT', 'Women post-hysterectomy', 'Slows visceral fat gain; supports lean mass preservation'],
        ['Topical / vaginal estrogen', 'Local symptom relief only', 'Minimal systemic body composition effect'],
        ['Low-dose testosterone HRT', 'Women with low libido or fatigue', 'May support lean mass; used off-label in some protocols'],
      ],
    },
    pitfalls: 'The most common misunderstanding about HRT and weight is that it causes fat gain. Most controlled studies find no significant difference in total fat mass between HRT users and non-users when controlling for other factors. The 1-2 kg weight change some women notice after starting HRT is primarily water retention, not fat. A second pitfall is using BMI alone to monitor body composition response to HRT - a slight BMI rise may reflect fluid retention while visceral fat is actually declining. Waist circumference is the more reliable monitoring tool during HRT.',
    faqs: [
      { q: 'Does HRT cause weight gain?', a: 'Most controlled studies find no significant difference in fat mass between HRT users and non-users. Some women notice 1-2 kg weight change in the first year, primarily from fluid retention rather than fat gain. Estrogen-containing HRT may actually reduce the visceral fat accumulation that typically accompanies menopause, producing a more favorable body composition at the same total weight.' },
      { q: 'Does estrogen in HRT affect where body fat is stored?', a: 'Yes. Estrogen directs fat toward subcutaneous hip and thigh depots rather than visceral abdominal ones. After menopause, losing this signal causes fat to shift abdominally. Estrogen-containing HRT partially restores this, slowing visceral fat accumulation relative to non-HRT users at the same body weight - meaning two women at identical BMIs can have different visceral fat levels depending on HRT status.' },
      { q: 'What is the difference between combined HRT and estrogen-only HRT?', a: 'Combined HRT includes estrogen and progesterone and is prescribed to women who have not had a hysterectomy - progesterone protects the uterine lining from unopposed estrogen. Estrogen-only HRT is used by women post-hysterectomy who have no uterine lining to protect. Both forms contain estrogen, so both have similar body composition effects on visceral fat and lean mass.' },
      { q: 'How does HRT affect BMI interpretation in postmenopausal women?', a: 'HRT does not change the BMI formula or thresholds. However, it changes how body composition relates to BMI: a woman on HRT may have less visceral fat at the same BMI than one not on HRT. This makes BMI an even less reliable indicator of metabolic risk for postmenopausal women on HRT. Waist circumference is the more meaningful companion measure in this group.' },
    ],
    quiz: {
      topic: 'hormone replacement therapy',
      questions: [
        {
          q: 'What hormones does HRT primarily supplement in menopausal women?',
          options: [
            'Testosterone and cortisol',
            'Insulin and glucagon',
            'Estrogen, and progesterone in most cases',
            'FSH and LH (gonadotropins)',
          ] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'HRT restores primarily estrogen, and progesterone for women with a uterus, to reduce the physiological consequences of menopause. Estrogen is the principal hormone responsible for both symptom relief and the body composition effects described in the definition.',
        },
        {
          q: 'How does estrogen in HRT affect fat distribution after menopause?',
          options: [
            'It increases total fat mass by stimulating fat cell growth throughout the body',
            'It has no meaningful effect on fat storage location, only on total fat quantity',
            'It routes fat away from visceral abdominal depots toward subcutaneous hip and thigh depots, slowing abdominal fat accumulation',
            'It converts existing visceral fat directly into subcutaneous fat within three months',
          ] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'Estrogen plays a direct role in directing fat to subcutaneous (hip and thigh) rather than visceral (abdominal) depots. After menopause, without this signal, fat shifts abdominally. HRT partially restores the signal, slowing visceral fat accumulation relative to non-users at the same body weight.',
        },
        {
          q: 'For which group of women is combined HRT (estrogen + progesterone) recommended over estrogen-only HRT?',
          options: [
            'Women over age 65 regardless of surgical history',
            'Women who have not had a hysterectomy, to protect the uterine lining from unopposed estrogen',
            'Women with a history of cardiovascular disease',
            'Women within 5 years of menopause onset only',
          ] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'Combined HRT adds progesterone to protect the uterine lining from the proliferative effects of unopposed estrogen. Women who have had a hysterectomy have no uterine lining to protect and can use estrogen-only HRT. This distinction is the primary clinical driver of which formulation is prescribed.',
        },
        {
          q: 'According to the pitfalls section, what does the 1-2 kg weight change some women notice after starting HRT most likely represent?',
          options: [
            'Increased fat mass from progesterone stimulating fat cell growth',
            'Lean muscle gain from the anabolic effects of estrogen on skeletal muscle',
            'Water retention (fluid) - controlled studies show no significant difference in fat mass between HRT and non-HRT users',
            'Bone density increases from estrogens protective effect on the skeleton',
          ] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section states most studies find no significant difference in fat mass between HRT users and non-users. The modest weight change some women experience is primarily water retention, not fat gain. This is why BMI alone is unreliable for assessing body composition response to HRT.',
        },
        {
          q: 'What measurement is described as more reliable than BMI for monitoring body composition in women on HRT?',
          options: [
            'Body weight measured at the same time each morning',
            'Waist circumference',
            'BMI combined with a visual body shape assessment',
            'Total calorie intake tracked daily',
          ] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section explicitly identifies waist circumference as the more reliable monitoring tool during HRT. A slight BMI rise may reflect fluid retention while visceral fat is actually declining - waist circumference captures this distinction that BMI cannot.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'waist-circumference': {
    definition: [
      'Waist circumference is a direct measure of abdominal adiposity - the accumulation of fat in the trunk region. It is measured at the narrowest point of the torso, typically at or just above the navel, and is a strong independent predictor of metabolic disease risk beyond what BMI captures.',
      'The WHO defines two risk thresholds for each gender. For men: ≥94 cm indicates increased risk; ≥102 cm indicates high risk. For women: ≥80 cm indicates increased risk; ≥88 cm indicates high risk. These thresholds were derived from European populations; some guidelines recommend lower cut-points for South Asian, East Asian, and other ethnic groups where cardiometabolic risk increases at smaller waist sizes.',
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
    quiz: {
      topic: 'waist circumference',
      questions: [
        {
          q: 'What does waist circumference directly measure?',
          options: ['Total body fat mass as a percentage of overall body weight', 'Abdominal adiposity - the accumulation of fat in the trunk region', 'The ratio of hip to waist dimensions used to assess body fat distribution', 'Lean muscle mass in the core and abdominal musculature'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition states waist circumference is a direct measure of abdominal adiposity - the accumulation of fat in the trunk region. It is a strong independent predictor of metabolic disease risk beyond what BMI captures.',
        },
        {
          q: 'What does waist circumference capture about body fat that BMI cannot?',
          options: ['Total caloric surplus accumulated over time reflected as stored fat across all body regions', 'The ratio of fat mass to lean mass, which is better assessed by DEXA or hydrostatic weighing', 'Subcutaneous fat in the hips and thighs, which BMI systematically underestimates in women', 'Visceral adipose tissue (VAT) surrounding the abdominal organs, which drives insulin resistance, inflammation, and dyslipidaemia at higher rates than subcutaneous fat'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The definition explains that waist circumference captures visceral adipose tissue (VAT), which is metabolically active in ways subcutaneous fat is not. VAT drives insulin resistance, systemic inflammation, dyslipidaemia, and hypertension - health effects that BMI cannot detect.',
        },
        {
          q: 'According to the examples table, at what waist circumference does a man reach the "high risk" category?',
          options: ['≥ 102 cm', '≥ 94 cm', '≥ 88 cm', '≥ 110 cm'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The WHO defines two thresholds for men: ≥94 cm is "increased risk" and ≥102 cm is "high risk." The examples table confirms the high risk threshold for men as ≥102 cm. (88 cm is the women\'s high risk threshold.)',
        },
        {
          q: 'What does the pitfalls section identify as the main source of measurement variability in waist circumference?',
          options: ['Differences in tape measure elasticity between brands used in clinical versus home settings', 'Time of day, since waist circumference fluctuates significantly with food and fluid intake', 'Measuring at the wrong anatomical landmark (e.g., at the iliac crest or navel on an obese individual) and failing to keep the tape horizontal or measure at end of normal exhale', 'Variation in posture, since standing versus sitting changes the waist dimension by up to 5 cm'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section states measurement is highly sensitive to technique. The main errors are using the wrong anatomical landmark, angling the tape, and not measuring at the end of a normal exhale. Correct technique requires a horizontal, snug (not compressing) tape at the natural waist.',
        },
        {
          q: 'According to the FAQ, what waist-to-height ratio (WHtR) is associated with lower cardiometabolic risk across a broad range of ethnic groups?',
          options: ['Below 0.4', 'Below 0.5 - meaning waist less than half of height', 'Below 0.6', 'Below 0.45'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ states that many clinicians use the waist-to-height ratio (WHtR), with a value below 0.5 (waist less than half of height) associated with lower cardiometabolic risk. This threshold applies across a broad range of ethnic groups and ages, unlike the WHO absolute thresholds which were derived from European populations.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'ROI',
      questions: [
        {
          q: 'What does Return on Investment (ROI) measure?',
          options: ['The net gain or loss on an investment relative to its initial cost, expressed as a percentage', 'The annualised compound growth rate of an investment over multiple years', 'The total return on shareholders\' equity over a financial period', 'The net present value of future cash flows discounted to today\'s value'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'ROI measures how much an investment gains or loses relative to its cost, calculated as (Final Value - Initial Cost) / Initial Cost x 100. A positive ROI means the investment was profitable; a negative ROI means it lost money.',
        },
        {
          q: 'Why is CAGR a better companion metric than standalone ROI for multi-year investments?',
          options: ['CAGR adjusts for inflation, making it a real return measure that ROI does not provide', 'CAGR eliminates compounding to show simple linear growth for easier comparison across assets', 'CAGR measures absolute dollar returns whereas ROI only measures percentage returns', 'CAGR converts total ROI into an annualised rate that accounts for time, enabling fair comparison across investments held for different periods'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The definition states that ROI ignores time - a 50% ROI is excellent in one year but mediocre over a decade. CAGR converts total ROI into an annualised rate that accounts for the time value of money, making multi-year comparisons meaningful.',
        },
        {
          q: 'From the examples table, which investment generated the highest ROI?',
          options: ['Stock purchase: $10,000 initial cost, $14,500 final value, 45% ROI', 'Marketing campaign: $5,000 initial cost, $18,000 final value, 260% ROI', 'Equipment upgrade: $80,000 initial cost, $95,000 final value, 18.75% ROI', 'Failed product launch: $25,000 initial cost, $12,000 final value, -52% ROI'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The marketing campaign at 260% ROI is the highest in the table. Despite having the smallest absolute dollar gain ($13,000), it produced the greatest return relative to its cost ($5,000 invested).',
        },
        {
          q: 'The pitfalls section warns that a 10% ROI may not be attractive. Under what condition?',
          options: ['When the investment is held for fewer than 3 years, making the time horizon too short to justify the risk', 'When the investment was funded entirely by equity rather than a blend of debt and equity financing', 'When the company\'s weighted average cost of capital (WACC) is 12% - a 10% ROI fails to cover the cost of financing', 'When the ROI is calculated using nominal rather than inflation-adjusted figures'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section states that "a 10% ROI is not attractive if the company\'s cost of capital is 12%." ROI must always be compared against WACC - it only creates value if it exceeds the cost of the capital deployed.',
        },
        {
          q: 'According to the FAQ, what is the only valid benchmark for evaluating whether an ROI is good?',
          options: ['The historical stock market return of 7-10% annualised, inflation-adjusted over long periods', 'The opportunity cost - what else the same capital could have earned in the next best alternative', 'A minimum 3:1 return ratio ($3 return per $1 spent, i.e. 200% ROI) regardless of investment type', 'The company\'s weighted average cost of capital (WACC) for that specific fiscal year'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ states "the only valid comparison is against the opportunity cost: what else could the capital have earned?" There is no universal ROI benchmark - the right reference is always what the alternative use of capital would have returned.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'CAGR',
      questions: [
        {
          q: 'What does CAGR stand for, and what does it measure?',
          options: ['Cumulative Annual Growth Rate - the total growth achieved over a multi-year period', 'Compound Adjusted Growth Return - the inflation-adjusted return on an investment', 'Compound Annual Growth Rate - the annualised growth rate that smooths actual performance into a single constant annual rate', 'Calculated Average Growth Rate - the arithmetic mean of year-by-year growth percentages'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'CAGR (Compound Annual Growth Rate) is the annualised growth rate that would take a value from its starting point to its ending point if it grew at a constant rate each year with compounding. It smooths actual year-to-year performance into a single representative annual figure.',
        },
        {
          q: 'According to the FAQ, why is CAGR more accurate than simple average annual return for volatile investments?',
          options: ['CAGR derives the geometric mean - the single constant rate that produces the actual end value from the actual start value, while simple average sums year-by-year percentages and divides by n', 'CAGR adjusts for inflation using the Consumer Price Index, while simple average return uses nominal figures only', 'CAGR is calculated quarterly and then annualised, giving more granularity than the simple average which uses only annual data points', 'CAGR excludes the first and last years of measurement as anomalies, while simple average includes all years'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The FAQ explains that simple average sums year-by-year percentages and divides by n, while CAGR derives the geometric mean - the single constant rate that produces the actual end value from the actual start value. For volatile investments, CAGR will always be lower than the arithmetic average, making it the more accurate representation of investor experience.',
        },
        {
          q: 'From the examples table, what is the CAGR of the company revenue that grew from $2,000,000 to $6,200,000 over 8 years?',
          options: ['18.5%', '12.7%', '16.1%', '15.2%'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The examples table shows 15.2% CAGR for this scenario. This is the constant annual rate that would take $2,000,000 to $6,200,000 with compounding over 8 years, derived using the formula (6,200,000 / 2,000,000)^(1/8) - 1.',
        },
        {
          q: 'What does the pitfalls section warn about an investment that doubles then halves?',
          options: ['Such an investment should be excluded from CAGR calculations because the formula produces a mathematical error', 'This investment has a CAGR of 0%, yet no investor would describe the experience as a stable 0% return - illustrating that CAGR ignores volatility', 'The CAGR would be negative because gains are taxed while losses are only partially deductible', 'CAGR overstates the return for such an investment, making it appear more attractive than investments with steady growth'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section explicitly states that an investment that doubles then halves has a CAGR of 0%, yet no investor would describe it as a stable 0% return. CAGR ignores the path between start and end, so it must be paired with standard deviation or maximum drawdown for volatile assets.',
        },
        {
          q: 'According to the FAQ, when is CAGR negative?',
          options: ['When the investment was made during a recession and the final measurement falls in a bull market period', 'When inflation exceeds the nominal return, eroding the real value of the investment', 'When the end value is lower than the start value, indicating compound annual decline', 'When dividends or distributions paid out during the measurement period reduce the ending balance'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ states that if the end value is lower than the start value, CAGR will be negative, indicating compound annual decline. This is common for distressed assets, declining industries, or portfolios measured over bear market periods.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'compound interest',
      questions: [
        {
          q: 'What makes compound interest different from simple interest in how it calculates each period\'s interest?',
          options: ['It applies the interest rate to the original principal only, not the accumulated balance', 'It divides the annual rate by the number of compounding periods before applying it to the principal', 'It uses an inflation-adjusted rate rather than the stated nominal rate for each calculation period', 'It calculates interest on the original principal plus all previously accumulated interest, creating an exponential growth loop'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'Compound interest is calculated on the accumulated balance - principal plus all prior interest earned. This creates a compounding feedback loop: the more you have, the more you earn, and the more you have again.',
        },
        {
          q: 'According to the FAQ, how does compound interest growth differ from simple interest growth over long periods?',
          options: ['Simple interest grows linearly (only on principal), while compound interest grows exponentially (on principal plus all accumulated interest), creating an enormous gap over decades', 'Compound interest is always cheaper for borrowers because banks apply it daily rather than annually', 'Simple interest becomes compound interest automatically after 10 years under most financial contracts', 'Both grow at the same rate for the first 5 years, then compound interest accelerates due to regulatory changes'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The FAQ states that simple interest grows linearly (only on the original principal), while compound interest grows exponentially. For short periods and low rates the difference is minimal, but over decades the gap becomes enormous.',
        },
        {
          q: 'From the worked examples table, what is the final balance for $10,000 invested at 6% with monthly compounding over 20 years?',
          options: ['$32,071 (the annual compounding result for the same scenario)', '$34,560', '$33,102', '$31,288'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The examples table shows $33,102 for $10,000 at 6% with monthly compounding over 20 years. This is $1,031 more than the annual compounding result of $32,071, illustrating how compounding frequency matters even at the same stated rate.',
        },
        {
          q: 'According to the pitfalls section, what is the effective annual rate (EAR) of a 12% annual rate that compounds monthly?',
          options: ['12.00% - the stated nominal rate and effective rate are always identical', '13.00%', '12.50%', '12.68%'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The pitfalls section states that a 12% annual rate compounding monthly has an EAR of 12.68%. This is the true annual cost because each month\'s interest is added to the balance before the next month\'s interest is calculated.',
        },
        {
          q: 'The FAQ explains the Rule of 72 as a compound interest shortcut. Using it, approximately how many years does money take to double at a 9% annual rate?',
          options: ['12 years', '8 years', '9 years', '10 years'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ states: divide 72 by the annual interest rate to estimate doubling time. At 9%, that is 72 / 9 = 8 years. At 6%, the Rule of 72 gives 72 / 6 = 12 years.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'current ratio',
      questions: [
        {
          q: 'What does a current ratio below 1.0 indicate about a company\'s short-term financial position?',
          options: ['The company is highly efficient, using leverage to maximise returns on fewer liquid assets', 'The company has a working capital deficit - current liabilities exceed current assets - meaning it relies on future cash generation or credit to meet near-term payments', 'The company\'s assets are 100% financed by equity, giving it the strongest possible balance sheet', 'The ratio signals the company must immediately liquidate all assets to avoid defaulting on obligations'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'A current ratio below 1.0 - sometimes called a working capital deficit - means current liabilities exceed current assets. The definition states this signals reliance on future cash generation or credit facilities to meet near-term payments.',
        },
        {
          q: 'What is the key difference between the current ratio and the quick ratio (acid test)?',
          options: ['The current ratio uses annual balance sheet figures; the quick ratio uses quarterly data for more timely assessment', 'The current ratio measures total assets against total liabilities, while the quick ratio focuses only on cash versus short-term debt', 'The current ratio includes long-term assets in its numerator, making it a broader measure than the quick ratio', 'The quick ratio removes inventory from current assets before dividing by current liabilities, giving a more conservative view of immediate liquidity'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The FAQ explains that the quick ratio subtracts inventory from current assets before dividing by current liabilities. A company with $5M in current assets including $2M of slow-moving inventory has a current ratio of 2.5 but a quick ratio of only 1.5.',
        },
        {
          q: 'From the worked examples table, what is the current ratio for a company with $3,000,000 in current assets and $2,500,000 in current liabilities?',
          options: ['1.20', '2.50', '0.82', '1.50'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'Current Ratio = $3,000,000 / $2,500,000 = 1.20. The table labels this "Adequate - monitor closely," consistent with the whenToUse guidance that 1.2 may be adequate for retail businesses with fast inventory turnover.',
        },
        {
          q: 'What does the pitfalls section warn about interpreting a very high current ratio such as 5.0?',
          options: ['A ratio of 5.0 always provides maximum protection against short-term default and should be the target for all companies', 'A ratio above 3.0 requires special disclosure under accounting standards due to the excess liquidity it represents', 'A high ratio can indicate excessive cash holdings or slow-moving inventory - both signs of poor capital efficiency - and a falling ratio can signal either improving efficiency or deteriorating liquidity, so trend matters as much as the point-in-time number', 'Ratios above 4.0 are exclusively found in SaaS and technology companies and should not be interpreted as a warning sign for those sectors'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section warns that a ratio of 5.0 may indicate the company is holding excessive cash or has slow-moving inventory - signs of poor capital efficiency. A falling ratio can mean either improving efficiency or deteriorating liquidity, so trend analysis is essential.',
        },
        {
          q: 'According to the FAQ, can the current ratio ever produce a negative value?',
          options: ['Yes - when accumulated losses exceed paid-in capital, the negative book value flows into the current ratio calculation', 'Yes - the ratio turns negative whenever current liabilities exceed current assets by more than 50%', 'No - accounting rules prohibit any company from reporting current liabilities greater than current assets on its balance sheet', 'No - both current assets and current liabilities are always positive numbers, so the ratio is always positive; a ratio below 1.0 means negative working capital, but the ratio itself remains positive'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The FAQ explicitly states the current ratio cannot be negative because both inputs are always positive numbers. A ratio below 1.0 is called negative working capital, but the ratio value itself remains a positive number.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'break-even point',
      questions: [
        {
          q: 'What happens at the break-even point?',
          options: ['The business earns profit equal to its total fixed costs', 'Total revenue exactly equals total costs, producing neither profit nor loss', 'Variable costs are fully covered and fixed costs begin to accumulate', 'The business reaches its minimum target return on investment'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The break-even point is where total revenue equals total costs - the business earns no profit and incurs no loss. Below it the business runs at a loss; above it every additional unit generates profit equal to the contribution margin per unit.',
        },
        {
          q: 'Using the first worked example (Fixed Costs $50,000, Price $25, Variable Cost $10), what is the break-even revenue?',
          options: ['$50,000', '$75,000', '$83,333', '$125,000'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'Contribution margin per unit = $25 - $10 = $15. Break-even units = $50,000 / $15 = 3,333. Break-even revenue = 3,333 x $25 = $83,333, matching the first row of the examples table.',
        },
        {
          q: 'What does the margin of safety measure?',
          options: ['The ratio of fixed costs to variable costs at the current sales volume', 'The percentage of revenue that becomes contribution margin', 'The gap between current revenue and the revenue needed to reach target profit', 'How much revenue can decline before the business becomes unprofitable'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The margin of safety is the gap between actual revenue and break-even revenue, expressed as a percentage. Below 10% is considered precarious; a 30% margin means revenue can fall 30% before losses begin.',
        },
        {
          q: 'According to the pitfalls section, what key assumption does basic break-even analysis make that often fails in practice?',
          options: ['That price and variable cost per unit remain constant regardless of sales volume', 'That fixed costs increase proportionally as the business grows', 'That break-even applies only to single-product businesses', 'That the margin of safety must exceed 30% before a product can be launched'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'Break-even analysis assumes constant price and constant variable cost per unit. In practice, bulk discounts, volume-driven input cost reductions, and step increases in fixed costs all invalidate a simple linear model.',
        },
        {
          q: 'What impact did raising price from $25 to $28 have on break-even units, according to the FAQ example (variable cost $10)?',
          options: ['Break-even units increased by 17% due to the higher price reducing demand', 'Break-even units stayed the same because fixed costs were unchanged', 'Break-even revenue doubled as the higher price offset lower unit volume', 'Break-even units fell by 17% as the contribution margin rose from $15 to $18'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'CM rises from $15 (25-10) to $18 (28-10). Each unit now covers more fixed cost, reducing the volume needed to break even. The FAQ states this cuts break-even units by 17%.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'contribution margin',
      questions: [
        {
          q: 'What does the Contribution Margin Ratio measure, and how is it calculated?',
          options: ['CM Ratio = Variable Costs / Revenue, showing what proportion of revenue is consumed by variable costs', 'CM Ratio = Net Income / Revenue, equal to the net profit margin', 'CM Ratio = (Revenue - Variable Costs) / Revenue, showing what percentage of each revenue dollar is available to cover fixed costs and profit', 'CM Ratio = Fixed Costs / Revenue, showing the break-even threshold as a percentage of revenue'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The CM Ratio is (Revenue - Variable Costs) / Revenue. The definition states that a 60% CM Ratio means for every $100 in sales, $60 is available for fixed costs and profit - the other $40 is consumed by variable costs.',
        },
        {
          q: 'According to the definition, how does Contribution Margin differ from Gross Profit for a manufacturer with $500,000 in fixed factory overhead spread across 100,000 units?',
          options: ['CM deducts only truly variable costs, while Gross Profit via COGS also includes the $5 per unit of fixed overhead, making CM per unit $5 higher than gross profit per unit', 'CM is a company-level figure only, while Gross Profit can be calculated per product unit', 'Gross Profit excludes all overhead, while CM includes both fixed and variable costs in its deduction from revenue', 'CM and Gross Profit are identical; the difference is only in terminology used by different industries'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The FAQ explains that COGS includes both variable costs and fixed manufacturing overhead. With $500,000 fixed overhead across 100,000 units, each unit carries $5 of fixed cost in COGS. CM per unit excludes that fixed portion, so it is $5 higher than gross profit per unit.',
        },
        {
          q: 'From the worked examples table, what is the Contribution Margin per unit for Product A (Price $80, Variable Cost $32)?',
          options: ['$32', '$48', '$80', '$18'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'CM per unit = Price - Variable Cost per Unit = $80 - $32 = $48. The table also confirms a 60% CM Ratio ($48 / $80), matching the definition\'s 60% CM Ratio example.',
        },
        {
          q: 'What does the pitfalls section warn about Product B, which shows a negative full-cost profit of -$5 but a positive CM of $15 per unit?',
          options: ['Product B should be immediately discontinued because any product with negative full-cost profit destroys shareholder value', 'Product B\'s positive CM means it is inherently more profitable than Product A and should be prioritised', 'Product B\'s CM proves it covers all its costs, making it a better investment than Product C', 'While Product B contributes to fixed costs in the short run, relying on low-CM products long-term prevents the business from covering its fixed cost base'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The pitfalls section warns that focusing solely on CM can lead to strategically harmful decisions. Product B has positive CM so it contributes toward fixed costs short-term, but relying on it long-term prevents the business from covering its full fixed cost base.',
        },
        {
          q: 'According to the FAQ, which type of business typically achieves the highest Contribution Margin Ratio range?',
          options: ['SaaS and software companies (60-80%), because variable costs like hosting and payment processing are very low', 'Manufacturing companies (30-50%), because they eliminate variable materials costs through economies of scale', 'Service businesses (30-60%), because they have no physical inventory variable costs', 'Retail and distribution (20-40%), because high volume offsets the thin margin per unit'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The FAQ states that SaaS and software companies typically achieve CM Ratios of 60-80% because their variable costs (hosting, payment processing) are very low. Retail and distribution have the lowest range at 20-40%.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'P/E ratio',
      questions: [
        {
          q: 'What investor question does the P/E ratio directly answer?',
          options: ['What percentage of earnings does the company distribute as dividends each year?', 'How much is an investor paying for each dollar of annual profit?', 'What is the total enterprise value relative to annual earnings?', 'What earnings growth rate is required to justify the current stock price?'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition states that P/E "directly answers the investor\'s most fundamental question: how much am I paying for each dollar of annual profit?" It is calculated by dividing the stock price by EPS.',
        },
        {
          q: 'Why is forward P/E typically lower than trailing P/E for growing companies?',
          options: ['Forward P/E uses a different share count that excludes dilutive instruments', 'Trailing P/E includes one-time charges that artificially reduce the earnings denominator', 'Forward P/E is calculated on an after-tax basis while trailing P/E uses pre-tax earnings', 'Forward P/E uses consensus estimates of expected higher future earnings, making the denominator larger relative to today\'s price'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'Forward P/E uses analyst estimates for the next 12 months of expected EPS. For growing companies, future earnings are expected to be higher than today\'s, so dividing the same price by a larger earnings estimate produces a lower P/E.',
        },
        {
          q: 'From the examples table, which company trades at the largest premium to its sector average P/E?',
          options: ['Growth Tech, at 40x vs sector average 28x (+43% premium)', 'Mature Retail, at 10x vs sector average 12x (-17% discount)', 'Utility, at 15x vs sector average 16x (-6% discount)', 'Pharma, at 15x vs sector average 18x (-17% discount)'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'Growth Tech trades at 40x vs its sector average of 28x, a 43% relative premium - the largest in the table. A 43% premium implies investors expect significantly higher growth or quality than the sector peer group.',
        },
        {
          q: 'What does a very low P/E potentially signal, according to the pitfalls section?',
          options: ['The company consistently beats analyst EPS estimates, reducing the apparent denominator', 'Investors anticipate high future earnings growth that will quickly normalise the ratio', 'The stock may be a value trap - a business in terminal decline rather than a genuine bargain', 'The company has high free cash flow that is not yet captured in reported EPS'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section warns that "a very low P/E can signal value or a value trap - a business in terminal decline." A low P/E alone is not a buy signal without understanding why earnings are what they are.',
        },
        {
          q: 'Why is EV/EBITDA preferred over P/E for comparing companies with different levels of leverage?',
          options: ['EV/EBITDA only measures equity value while P/E includes the full enterprise value, making P/E less comparable', 'EV/EBITDA is capital-structure neutral because it uses enterprise value and pre-tax, pre-depreciation earnings, while P/E is affected by leverage and tax', 'P/E can only be used for profitable companies whereas EV/EBITDA applies to both profitable and loss-making businesses', 'EV/EBITDA is always a lower multiple than P/E, making it the more conservative valuation metric'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ states EV/EBITDA uses Enterprise Value (equity + debt - cash) and pre-tax, pre-depreciation earnings, making it capital-structure neutral. P/E is affected by leverage (interest expense reduces earnings) and tax, making cross-company comparison unreliable when leverage differs.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'EPS',
      questions: [
        {
          q: 'What core problem does Earnings Per Share (EPS) solve for investors comparing companies of different sizes?',
          options: ['EPS eliminates the impact of leverage so that all companies can be compared on a debt-free basis', 'EPS adjusts reported net income for one-time charges and restructuring costs to show recurring profitability', 'EPS translates total net income into a per-share figure, enabling direct comparison between companies of vastly different sizes on P/E ratios and other metrics', 'EPS shows the portion of net income distributed to shareholders as dividends during the reporting period'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition states that EPS translates total net income into a per-share figure, enabling investors to compare profitability across companies of vastly different sizes. A $10B and a $500M company both reporting $1.00 EPS can be compared directly on the P/E ratio.',
        },
        {
          q: 'What is the key difference between basic EPS and diluted EPS, and which should be used for P/E analysis?',
          options: ['Basic EPS uses the actual weighted average shares outstanding; diluted EPS assumes all dilutive instruments (options, RSUs, convertibles) are converted - always equal to or lower than basic EPS. Use diluted EPS for P/E analysis as it reflects the worst-case fully converted share count', 'Diluted EPS uses the current share price to adjust the denominator; basic EPS uses the average share price over the period, making basic more conservative for P/E analysis', 'Both figures are identical unless the company pays dividends; the payout reduces diluted EPS but not basic EPS, which only measures retained earnings per share', 'Basic EPS is a mandatory GAAP disclosure; diluted EPS is an optional supplemental figure that smaller companies are not required to report'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition states that diluted EPS adjusts for all dilutive instruments and is always equal to or lower than basic EPS. The whenToUse section explicitly says to use diluted EPS (not basic) for P/E ratio calculations and equity analysis.',
        },
        {
          q: 'From the examples table, what is the diluted EPS for Company A, which has net income of $500,000,000 and 220,000,000 diluted shares?',
          options: ['$2.50 (basic EPS using 200M shares)', '$1.00 (basic EPS for Company B)', '$0.98 (diluted EPS for Company B)', '$2.27 (diluted EPS: $500M / 220M diluted shares)'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The examples table shows Company A\'s diluted EPS as $2.27, calculated by dividing $500,000,000 net income by 220,000,000 diluted shares. This is lower than the basic EPS of $2.50 because the diluted share count includes potential shares from options and other instruments.',
        },
        {
          q: 'What does the pitfalls section warn about using EPS growth as a standalone measure of business performance?',
          options: ['EPS growth above 15% per year is a red flag for potential accounting manipulation and should trigger closer scrutiny', 'A company spending $500M on buybacks can show EPS growth of 10% with zero improvement in actual profitability; always compare EPS growth to net income growth and monitor the share count trend', 'EPS growth is only meaningful for companies with fewer than 500 million diluted shares, as larger share counts distort the per-share growth rate', 'Diluted EPS consistently grows faster than basic EPS, inflating the apparent earnings growth rate for most public companies'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section warns that buybacks can boost EPS by up to 10% with zero profit improvement. Always compare EPS growth to net income growth and track the share count trend to distinguish real earnings growth from financial engineering.',
        },
        {
          q: 'According to the FAQ, what does a payout ratio consistently above 100% indicate about a company\'s dividend sustainability?',
          options: ['The company is retaining more earnings than it distributes, building a strong cash reserve for future investment', 'The company reinvests all earnings into growth rather than paying dividends, which is typical for early-stage technology companies', 'The payout ratio above 100% means the company pays more in dividends than it earns in EPS - unsustainable without borrowing or asset sales', 'A payout ratio above 100% signals that the company uses stock dividends rather than cash, reducing actual cash outflows from operations'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ states that a payout ratio consistently above 100% means the company is paying more in dividends than it earns - unsustainable without borrowing or selling assets. The formula is Payout Ratio = Dividends Per Share / EPS.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'roe': {
    beginnerExplain: ['Think of shareholders\' equity as your personal down payment on a business. If you invest $100,000 of your own money to buy a franchise (with a $400,000 bank loan covering the rest), and the franchise earns $20,000 in net profit that year, your ROE is 20%. The $20,000 is divided by your $100,000 contribution - the bank\'s portion is not in the denominator. This is why two businesses can show the same ROE for very different reasons: one earned it through a high-margin product, the other by borrowing heavily to amplify a thin-margin operation.'],
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
    quiz: {
      topic: 'ROE',
      questions: [
        {
          q: 'What does Return on Equity (ROE) measure?',
          options: ['The total return generated per dollar of total assets, including both debt- and equity-funded assets', 'The annualised dividend income expressed as a percentage of the current stock price', 'How many dollars of net income a company generates for each dollar of shareholders\' equity', 'The operating profit margin before interest and tax relative to the book value of the business'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'ROE measures how many dollars of net income a company generates for each dollar of shareholders\' equity. Shareholders\' equity is the accounting value of assets minus liabilities - what would remain for equity holders if all assets were liquidated at book value and all debts paid.',
        },
        {
          q: 'What are the three multiplicative components in the DuPont decomposition of ROE?',
          options: ['Net Profit Margin x Asset Turnover x Equity Multiplier', 'Gross Profit Margin x Revenue Growth Rate x Debt-to-Equity Ratio', 'EBITDA Margin x Capital Efficiency x Financial Leverage Ratio', 'Operating Margin x Asset Utilisation x Interest Coverage Ratio'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition states that DuPont breaks ROE into Net Profit Margin (Net Income / Revenue) x Asset Turnover (Revenue / Total Assets) x Equity Multiplier (Total Assets / Equity). This framework diagnoses whether ROE is driven by profitability, efficiency, or leverage.',
        },
        {
          q: 'From the examples table, which company achieves the highest ROE, and what is its primary driver?',
          options: ['The bank at 12% ROE, driven primarily by extreme financial leverage (10x equity multiplier)', 'The retailer at 22.5% ROE, driven by asset turnover and leverage combined', 'The industrial company at 30% ROE, driven by a balanced combination of margin, turnover, and leverage', 'The consumer brand at 43.2% ROE, driven primarily by high net profit margin (18%)'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The examples table shows the consumer brand at 43.2% ROE as the highest, with margin listed as the primary driver. Its 18% net margin combined with 1.2x asset turnover and only 2.0x equity multiplier produces the superior result without extreme leverage.',
        },
        {
          q: 'Why can high ROE driven by high leverage be misleading, according to the pitfalls section?',
          options: ['Companies with large equity multipliers typically have lower P/E ratios, understating true profitability for investors', 'The company is amplifying returns through debt, which also amplifies losses in downturns - high debt with a small equity base carries significant bankruptcy risk', 'High leverage increases the equity denominator, which artificially raises the ROE figure beyond real operational performance', 'Debt reduces interest income on the balance sheet, offsetting the leverage benefit in the DuPont calculation'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section warns that a company with a $5M equity base and $100M in debt will show extreme ROE on any net income, but this capital structure carries significant bankruptcy risk. Debt amplifies both gains and losses, so always examine ROE alongside the debt-to-equity ratio.',
        },
        {
          q: 'According to the FAQ, what three distortions can make ROE misleadingly high?',
          options: ['Revenue recognition timing, depreciation method choices, and management compensation structures that reduce reported equity', 'Poor earnings quality, declining asset turnover, and below-market tax rates that inflate net income in the denominator', 'High leverage shrinking the equity denominator, share buybacks funded by debt reducing equity, and goodwill write-downs permanently reducing equity', 'Aggressive inventory write-ups, capitalising operating expenses, and extending accounts payable to boost short-term working capital'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ lists three distortions: (1) high leverage reduces the equity denominator, (2) share buybacks funded by debt mechanically reduce equity without improving the business, and (3) goodwill write-downs or large losses permanently reduce equity, paradoxically raising future ROE calculations.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },


  'roa': {
    definition: [
      'Return on Assets (ROA) measures how much net income a company earns per dollar of total assets on its balance sheet. Total assets include everything the business owns or controls - property, equipment, inventory, receivables, cash - regardless of whether those assets were funded by equity or debt. This is what makes ROA fundamentally different from ROE: because both equity holders and debt holders\' contributions are in the denominator, ROA is not inflated by borrowing.',
      'The relationship between ROA and ROE is direct: ROE = ROA x Equity Multiplier. The equity multiplier (Total Assets / Equity) is the leverage factor. A company with ROA of 5% and an equity multiplier of 4x reports ROE of 20%. Two companies with identical ROA can show very different ROE simply because one uses more debt financing than the other.',
      'ROA is most useful when comparing companies within the same industry that carry different debt levels, or when tracking a single company\'s operational efficiency over time while abstracting away changes in its capital structure.',
    ],
    beginnerExplain: ['Imagine you run a delivery business. You have a van worth $50,000 bought with $10,000 of your own savings and a $40,000 bank loan. At year end the business earned $5,000 net profit. ROA = $5,000 / $50,000 = 10% - the van earned 10 cents for every dollar of asset, regardless of who funded it. ROE = $5,000 / $10,000 = 50% - but that 50% is partly because you borrowed most of the van\'s cost. ROA strips out that borrowing effect and tells you how hard the actual asset is working.'],
    whenToUse: 'Use ROA when comparing companies with different capital structures - for example two banks, two retailers, or two airlines - where ROE comparisons are distorted by different leverage levels. ROA is also useful for tracking whether a company is becoming more or less efficient at deploying its asset base over time, independent of debt decisions made by management.',
    examples: {
      headers: ['Company', 'Net Income', 'Total Assets', 'ROA', 'ROE (for comparison)'],
      rows: [
        ['Asset-light SaaS', '$20M', '$80M', '25%', '25% (equity multiplier ~1x)'],
        ['Consumer brand', '$500M', '$3,500M', '14.3%', '25% (equity multiplier ~1.7x)'],
        ['Retailer', '$150M', '$2,000M', '7.5%', '25% (equity multiplier ~3.3x)'],
        ['Bank', '$1,000M', '$100,000M', '1.0%', '12.5% (equity multiplier ~12x)'],
      ],
    },
    pitfalls: 'ROA can be misleading for companies that use operating leases heavily. Under IFRS 16 and ASC 842, lease assets are now capitalised on the balance sheet, inflating total assets and therefore depressing ROA relative to pre-2019 figures or companies that own rather than lease. When comparing a capital-heavy lessee to a capital-light owner, adjust total assets consistently. ROA is also distorted by intangible assets: a company that grew through acquisitions will have large goodwill on its balance sheet, inflating total assets and depressing ROA even if operational efficiency is identical to an organically-built competitor.',
    faqs: [
      { q: 'What is a good ROA?', a: 'ROA benchmarks vary significantly by industry. Asset-light businesses (software, professional services) can achieve ROA of 15-30%+. Capital-intensive manufacturers typically earn 5-10%. Retailers often sit at 5-8%. Banks are structurally different - a well-run bank achieving 1.0-1.5% ROA is excellent; below 0.5% is weak. Always benchmark against direct industry peers.' },
      { q: 'What is the difference between ROA and ROE?', a: 'ROA uses total assets (debt + equity) as the denominator; ROE uses only shareholders\' equity. Because debt is included in total assets, ROA is unaffected by how the business is financed - it measures pure operational efficiency. ROE is amplified by leverage: a company with ROA of 5% and 4x leverage shows 20% ROE. The gap between a company\'s ROE and ROA directly reflects the impact of its financial leverage.' },
      { q: 'Why do banks have such low ROA compared to other industries?', a: 'Banks\' business model requires holding large asset bases - loans, securities, reserves - to generate their income. A bank might hold $100 of assets (mostly loans) for every $1 of equity. Net income of $1 on $100 of assets is 1% ROA, but against $8 of equity it is 12.5% ROE. The low ROA is structural and expected; it does not indicate poor performance. This is why bank analysts focus on ROE and Net Interest Margin rather than ROA.' },
    ],
    quiz: {
      topic: 'ROA',
      questions: [
        {
          q: 'Why is ROA not inflated by how a business is financed, unlike ROE?',
          options: ['ROA uses EBIT (earnings before interest and tax), excluding financing costs from the numerator entirely', 'ROA measures only tangible assets, excluding financial instruments from the denominator', 'ROA compares operating cash flow to total assets, bypassing accrual accounting entirely', 'ROA uses total assets - funded by both debt and equity holders - in the denominator, not just shareholders\' equity'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The definition states that because both equity holders and debt holders\' contributions are in the denominator (total assets), ROA is not inflated by borrowing. This is what makes ROA fundamentally different from ROE.',
        },
        {
          q: 'What is the mathematical relationship between ROA and ROE?',
          options: ['ROE = ROA x Equity Multiplier (Total Assets / Equity)', 'ROE = ROA / Equity Multiplier (Equity / Total Assets)', 'ROA = ROE x Asset Turnover (Revenue / Total Assets)', 'ROE = ROA plus the Debt-to-Equity ratio as an additive leverage premium'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition states ROE = ROA x Equity Multiplier, where the equity multiplier is Total Assets / Equity. This shows that two companies with identical ROA can report very different ROE simply because one uses more debt financing.',
        },
        {
          q: 'From the examples table, three companies all show 25% ROE but with different ROA. Which achieves 25% ROE with the lowest leverage?',
          options: ['The bank at 1.0% ROA and ~12x equity multiplier', 'The consumer brand at 14.3% ROA and ~1.7x equity multiplier', 'The asset-light SaaS at 25% ROA and equity multiplier ~1x', 'The retailer at 7.5% ROA and ~3.3x equity multiplier'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The examples table shows the asset-light SaaS at 25% ROA with an equity multiplier of approximately 1x - meaning its 25% ROE is driven entirely by operational efficiency with no leverage amplification.',
        },
        {
          q: 'The pitfalls section warns ROA can be misleading for companies using heavy operating leases. Why?',
          options: ['Operating lease payments are classified as interest expense, inflating the numerator of ROA compared to companies that own assets outright', 'Under IFRS 16 and ASC 842, lease assets are now capitalised on the balance sheet, inflating total assets and depressing ROA relative to pre-2019 figures or asset-owning companies', 'Operating leases extend the effective useful life of assets, causing depreciation to be understated and net income to be overstated', 'Companies with heavy operating leases record higher revenues from the assets than companies that own identical assets, creating a numerator bias'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section states that under IFRS 16 and ASC 842, lease assets are now capitalised on the balance sheet, inflating total assets and depressing ROA relative to pre-2019 figures or companies that own rather than lease.',
        },
        {
          q: 'According to the FAQ, why is a bank\'s 1.0-1.5% ROA not considered poor performance?',
          options: ['Banks are exempted from standard ROA benchmarks because their regulatory capital requirements artificially inflate total assets', 'Bank ROA is calculated on a pre-tax basis unlike other industries, making 1.0% equivalent to approximately 5% on an after-tax comparable basis', 'Banks hold large asset bases (loans, securities, reserves) to generate income; 1% ROA against ~8x equity produces 12.5% ROE - the low ROA is structural and expected, not a sign of poor performance', 'Deposit liabilities are excluded from total assets when calculating bank ROA, making the metric non-comparable to non-financial company ROA figures'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ explains that banks hold $100 of assets for every $1 of equity; net income of $1 on $100 assets is 1% ROA but 12.5% ROE. The low ROA is structural and expected, which is why bank analysts focus on ROE and Net Interest Margin rather than ROA.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'roce': {
    definition: [
      'Return on Capital Employed (ROCE) measures how much EBIT (operating profit before interest and tax) a business generates per dollar of long-term capital committed to it. Capital Employed is defined as Total Assets minus Current Liabilities, which equals Shareholders\' Equity plus Long-term Debt. Using EBIT rather than net income makes ROCE independent of how the business is financed and which tax jurisdiction it operates in.',
      'ROCE is the preferred profitability metric for capital-intensive industries - utilities, oil & gas, mining, manufacturing, and infrastructure - where businesses routinely hold billions in fixed assets financed by a mixture of debt and equity. For these businesses, ROE is distorted by leverage variation; ROCE provides a clean comparison of how productively the core asset base is working.',
      'A useful benchmark is to compare ROCE to the Weighted Average Cost of Capital (WACC). If ROCE exceeds WACC, the business is creating economic value; if ROCE falls below WACC, it is destroying value even if accounting profits look positive. This relationship is the foundation of Economic Value Added (EVA) analysis.',
    ],
    beginnerExplain: ['Think of ROCE as the yield on the total capital a business controls - like working out the interest rate your savings account is effectively earning, but for an entire company. If a factory costs $10 million to build and run (funded by $6M of your own money and $4M of bank debt), and it generates $1.5M in operating profit before paying the bank\'s interest, your ROCE is 15%. That 15% is the raw productivity of the factory, before anyone - shareholders or lenders - takes their cut.'],
    whenToUse: 'Use ROCE when comparing capital-intensive businesses where debt levels vary significantly - two utilities or two mining companies may have very different leverage, but a ROCE comparison tells you which one extracts more value from its asset base. ROCE is also useful for internal capital allocation decisions: which business unit or project earns the highest return on the capital it consumes?',
    examples: {
      headers: ['Business', 'EBIT', 'Capital Employed', 'ROCE', 'Interpretation'],
      rows: [
        ['Utility A', '$800M', '$8,000M', '10%', 'Typical regulated utility; WACC ~6-7% - value-creating'],
        ['Utility B', '$600M', '$8,000M', '7.5%', 'Thin margin above WACC; limited reinvestment case'],
        ['Industrial', '$300M', '$1,500M', '20%', 'Above-average for sector; competitive moat likely'],
        ['Retailer', '$120M', '$400M', '30%', 'Asset-light retailer; low fixed capital base'],
      ],
    },
    pitfalls: 'ROCE is sensitive to asset age. A company with old, fully depreciated assets will show very high ROCE because the denominator has shrunk through years of depreciation - without any improvement in operating efficiency. Conversely, a company mid-way through a major capex cycle will show depressed ROCE as capital employed spikes before new assets generate revenue. Compare ROCE to peers at similar stages of their capex cycle, and track the trend over time rather than relying on a single year\'s figure.',
    faqs: [
      { q: 'What is capital employed?', a: 'Capital Employed = Total Assets - Current Liabilities. This equals Non-current Assets + Working Capital, or equivalently Shareholders\' Equity + Long-term Debt. It represents the long-term capital the business has committed to operations. Current liabilities are excluded because they are short-term funding (supplier credit, short-term overdrafts) rather than invested capital.' },
      { q: 'What is a good ROCE?', a: 'ROCE should exceed the company\'s WACC (Weighted Average Cost of Capital) to be value-creating. For capital-intensive regulated industries (utilities, toll roads), ROCE of 8-12% may be excellent. For asset-light businesses, ROCE of 25-40%+ is achievable. A commonly cited rule of thumb is ROCE above 15% is strong for most non-financial industries. Always benchmark within the same sector and stage of the capex cycle.' },
      { q: 'What is the difference between ROCE and ROE?', a: 'ROCE uses EBIT (pre-interest, pre-tax) and includes long-term debt in the denominator - giving a leverage-neutral view of operating efficiency. ROE uses net income (after interest and tax) and uses only equity in the denominator - showing the return to shareholders after the cost of debt has been paid. ROCE is better for operational comparison across businesses with different capital structures; ROE is better for evaluating returns from a shareholder perspective.' },
    ],
    quiz: {
      topic: 'ROCE',
      questions: [
        {
          q: 'What makes ROCE capital-structure neutral compared to ROE?',
          options: ['ROCE uses net income, which is identical regardless of how the business is financed', 'ROCE uses EBIT (operating profit before interest and tax), making it independent of financing decisions and tax jurisdiction', 'ROCE divides operating profit by total equity, excluding all debt from the denominator', 'ROCE measures only revenue-generating assets, excluding financial instruments from the denominator'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition states that using EBIT rather than net income makes ROCE independent of how the business is financed and which tax jurisdiction it operates in. Interest expense and tax are excluded, so two identical operations with different debt levels show the same ROCE.',
        },
        {
          q: 'According to the FAQ, how is Capital Employed calculated?',
          options: ['Current Assets minus Current Liabilities (Net Working Capital)', 'Total Assets minus Long-term Debt (removing the effect of external financing)', 'Shareholders\' Equity plus Short-term Debt (all equity and near-term obligations)', 'Total Assets minus Current Liabilities, which equals Shareholders\' Equity plus Long-term Debt'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The FAQ defines Capital Employed as Total Assets minus Current Liabilities, which is equivalent to Shareholders\' Equity plus Long-term Debt. Current liabilities are excluded because they represent short-term funding rather than invested capital.',
        },
        {
          q: 'What is the key benchmark for deciding whether a ROCE figure creates economic value?',
          options: ['ROCE must exceed the Weighted Average Cost of Capital (WACC) - if ROCE > WACC the business creates value; if below, it destroys value even with positive accounting profits', 'ROCE must exceed the company\'s Return on Equity (ROE) - if ROCE is higher the business is more operationally efficient than its financing structure implies', 'ROCE must exceed 20%, which is the accepted minimum threshold across capital-intensive industries worldwide', 'ROCE must exceed the company\'s dividend yield, confirming enough operating profit to sustain distributions to shareholders'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition states that if ROCE exceeds WACC the business is creating economic value; if ROCE falls below WACC it is destroying value even if accounting profits look positive. This is the foundation of Economic Value Added (EVA) analysis.',
        },
        {
          q: 'Why does a company with old, fully depreciated assets show artificially high ROCE, according to the pitfalls section?',
          options: ['Older assets generate more revenue as they have been refined through years of operational use', 'Old assets attract lower maintenance costs, improving EBIT and therefore the numerator of ROCE', 'The denominator (Capital Employed) shrinks through accumulated depreciation without any improvement in operating efficiency, inflating the ratio', 'Fully depreciated assets are removed from the balance sheet entirely, reducing Capital Employed to near zero'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section states that a company with fully depreciated assets shows very high ROCE because the denominator has shrunk through years of depreciation. A company mid-way through a major capex cycle will conversely show depressed ROCE, so always compare peers at similar capex cycle stages.',
        },
        {
          q: 'According to the FAQ, when is ROCE a better comparison metric than ROE?',
          options: ['When comparing asset-light industries such as software and professional services, where book equity is very small', 'When comparing operational efficiency across businesses with different capital structures, since ROCE is leverage-neutral while ROE is amplified by debt', 'When evaluating returns from a shareholder perspective, since ROCE captures the debt financing effect that directly impacts shareholder value', 'When a company has negative shareholders\' equity due to buybacks, making the ROE denominator unreliable for analysis'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ states ROCE is better for operational comparison across businesses with different capital structures, while ROE is better for evaluating returns from a shareholder perspective. ROCE uses EBIT and includes debt in the denominator, making it unaffected by leverage variation.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'knots',
      questions: [
        {
          q: 'What is the definition of one knot?',
          options: ['One nautical mile per hour - exactly 1.852 km/h and approximately 1.151 mph', 'One statute mile per hour - the maritime speed equivalent used in aviation and shipping worldwide', 'Exactly 1.0 km/h - a metric speed unit adopted for maritime navigation to align with international standards', 'One arcminute of latitude per minute of time - a unit derived directly from Earth\'s coordinate geometry'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition states a knot is a unit of speed equal to one nautical mile per hour, defined as exactly 1.852 km/h (approximately 1.15078 mph or 0.51444 m/s). It is universally accepted in aviation and maritime navigation.',
        },
        {
          q: 'How did sailors originally measure speed in knots before modern instruments?',
          options: ['By timing how long it took a floating marker to travel between two fixed points on the ship\'s hull, then dividing hull length by elapsed seconds', 'By observing the angle of the ship\'s wake relative to the horizon and converting it to a speed using trigonometric tables', 'By counting the number of wave crests passing the bow per minute, multiplied by the estimated wavelength of typical ocean swells', 'By casting a knotted rope with a wooden float overboard and counting how many knots passed through their hands in a 28-second interval'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The definition describes the 17th-century chip log technique: sailors cast a knotted rope attached to a wooden float overboard and counted how many knots passed through their hands in a set time interval (typically 28 seconds). The count gave the ship\'s speed directly in nautical miles per hour.',
        },
        {
          q: 'According to the examples table, what is the km/h equivalent of 490 knots (commercial airliner cruise)?',
          options: ['277.8 km/h', '564 km/h', '907.5 km/h', '1,852 km/h'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The examples table shows 490 kn = 907.5 km/h in the context of commercial airliner cruise. The 564 figure in the table is the mph equivalent, not km/h.',
        },
        {
          q: 'What two errors does the pitfalls section warn about when using knots?',
          options: ['Always adding 15% to a knots reading at altitude because atmospheric pressure reduces effective ground speed, and confusing airspeed with ground speed in headwind conditions', 'Confusing knots with km/h (they differ by nearly double: 35 kn = 64.8 km/h, not 35 km/h), and saying "knots per hour" which is incorrect because a knot already means nautical miles per hour', 'Assuming knots apply only to water speed and not to wind or airspeed, and failing to apply a temperature correction factor at high altitudes', 'Confusing nautical miles with statute miles when converting knots to mph, and using land-based GPS speed readings in nautical contexts without adjustment'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section warns that knots and km/h are off by nearly double (1 kn = 1.852 km/h), so 35 knots is 64.8 km/h not 35 km/h. It also warns that "knots per hour" is incorrect because the unit is simply "knots" - a knot already includes "per hour."',
        },
        {
          q: 'Is 1 knot the same value in all countries?',
          options: ['No. The US uses the international nautical mile (1,852 m) while the UK uses the historical Admiralty nautical mile (1,853.18 m), creating a small difference in precision navigation', 'No. The knot varies slightly by hemisphere because it is defined relative to arcminutes of latitude and Earth is an oblate spheroid with slightly different meridian lengths at different latitudes', 'Yes. The International Hydrographic Organization defines the nautical mile as exactly 1,852 meters worldwide, so 1 knot is exactly 1.852 km/h in every country with no national variants', 'Yes, but only since 1979 when NATO standardized the definition - before that, the US and UK used different values that required correction tables'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ confirms that 1 knot is identical worldwide. The International Hydrographic Organization defines the nautical mile as exactly 1,852 meters, making 1 knot exactly 1.852 km/h with no US or UK variant - unlike the statute mile, which differs from the nautical mile.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'Mach number',
      questions: [
        {
          q: 'What does a Mach number represent?',
          options: ['The absolute speed of an aircraft in km/h, measured at a standard reference altitude of 10,000 meters to enable consistent comparison between aircraft types', 'The ratio of an aircraft\'s ground speed to its cruising airspeed, used to measure efficiency relative to its design operating range', 'The ratio of an object\'s speed to the local speed of sound in the surrounding medium, so Mach 1 means travelling at exactly the speed of sound', 'The percentage of the speed of light at which an object travels, expressed as a decimal fraction used in both aeronautics and relativistic physics'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition states a Mach number is the ratio of an object\'s speed to the local speed of sound in the surrounding medium. Mach 1 means the object is travelling at the speed of sound; Mach 0.5 is half the speed of sound; Mach 2 is twice.',
        },
        {
          q: 'Why do commercial airliners quote cruise speed in Mach rather than km/h?',
          options: ['Because aerodynamic behaviour depends on Mach number, not absolute speed - the same true airspeed produces very different aerodynamic effects at high altitude (where Mach 1 is lower) versus at sea level', 'Because international air traffic control regulations require all flights to report speed in Mach numbers above 25,000 feet to maintain standard separation distances', 'Because km/h measurements require GPS correction for wind speed and direction, which introduces errors at high altitude that Mach number inherently avoids', 'Because Mach numbers are proportional to fuel consumption, making them the natural metric for flight planning and fuel efficiency monitoring'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition explains that an airliner\'s aerodynamic behaviour depends on Mach number, not absolute speed - which is why cruise speeds are quoted in Mach. At cruising altitude (~10,000m), Mach 1 drops to about 1,062 km/h, significantly below the sea-level value of 1,225 km/h.',
        },
        {
          q: 'According to the examples table, at what Mach number do commercial airliners typically cruise, and what is the km/h equivalent at sea-level reference conditions?',
          options: ['Mach 0.5 = 612.5 km/h - a subsonic speed balancing fuel efficiency with passenger comfort', 'Mach 1 = 1,225 km/h - transonic speed that minimises journey time while staying within engine design limits', 'Mach 2 = 2,450 km/h - the same speed the Concorde used for supersonic commercial operations', 'Mach 0.85 = 1,041 km/h - just below the transonic range where shock waves begin forming on control surfaces'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The examples table shows commercial airliners cruise at Mach 0.85, equivalent to 1,041 km/h at sea-level reference conditions. This places them just below the transonic range (Mach 0.8-1.2) where shock waves begin to form.',
        },
        {
          q: 'What does the pitfalls section warn about converting Mach numbers to km/h?',
          options: ['Mach numbers above 1.0 are only valid for military aircraft; commercial aviation regulations prohibit supersonic flight because of sonic boom noise regulations', 'Mach 1 is not a fixed speed - it changes with air temperature, so at 10,000m altitude Mach 1 is about 1,062 km/h, significantly slower than 1,225 km/h at sea level; never convert a Mach number to km/h without specifying altitude and temperature conditions', 'The Mach number on flight instruments is calibrated airspeed that already compensates for pressure differences at altitude and does not need temperature correction', 'Mach measurements become unreliable above Mach 3 because shock wave interactions alter the pressure readings that instruments rely on to compute the speed ratio'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section states Mach 1 is not a fixed speed - it changes with air temperature. At 10,000m altitude with temperatures around -50°C, Mach 1 is about 295 m/s (1,062 km/h), significantly slower than 340 m/s at sea level. The altitude and temperature must always be specified.',
        },
        {
          q: 'What are the correct Mach number ranges for subsonic, transonic, supersonic, and hypersonic flight?',
          options: ['Subsonic below Mach 1.0; Supersonic Mach 1.0-3.0; Hypersonic Mach 3.0+; transonic is not a recognised aviation category', 'Subsonic below Mach 0.8; Transonic Mach 0.8-1.5; Supersonic Mach 1.5-5.0; Hypersonic Mach 5+; Concorde cruised at Mach 2.0', 'Subsonic below Mach 0.8; Transonic Mach 0.8-1.2 (shock waves begin forming); Supersonic Mach 1.2-5; Hypersonic Mach 5 and above - the Space Shuttle re-entered at around Mach 25', 'Subsonic below Mach 0.5; Transonic Mach 0.5-1.0; Supersonic Mach 1.0-4.0; Hypersonic Mach 4.0+'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ gives the exact ranges: Subsonic below Mach 0.8, Transonic Mach 0.8-1.2 (where shock waves begin forming), Supersonic Mach 1.2-5, and Hypersonic Mach 5+. It notes the Concorde cruised at Mach 2 and the Space Shuttle re-entered at around Mach 25.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'nautical-mile': {
    definition: [
      'A nautical mile is a unit of distance equal to exactly 1,852 meters (1.852 km or approximately 1.151 statute miles). It is defined as one arcminute (1/60 of a degree) of latitude along any meridian of Earth\'s surface. This geometric relationship to Earth\'s coordinate system is what makes it essential for navigation.',
      'Because one degree of latitude = 60 nautical miles, navigators can read distances directly off the latitude scale on a chart using a compass or dividers - no conversion required. A ship travelling 1 nautical mile has moved exactly 1 arcminute of latitude toward the equator or poles.',
    ],
    whenToUse: 'Use nautical miles for any oceanic or aviation navigation - measuring distances on charts, filing flight plans, calculating fuel range, and setting waypoints. Combine with knots to express speed: a ship travelling at 20 knots covers 20 nautical miles per hour. For road or land distances, use kilometers or statute miles instead.',
    examples: {
      headers: ['Nautical miles', 'Kilometers', 'Statute miles', 'Context'],
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
    quiz: {
      topic: 'nautical miles',
      questions: [
        {
          q: 'What is a nautical mile, and what geometric property makes it essential for navigation?',
          options: ['A nautical mile is exactly 1,000 meters, equivalent to one kilometer, defined by the International Hydrographic Organization as the standard unit for all maritime distance measurements', 'A nautical mile equals 1,609.344 meters - the same as a statute mile - but named differently to indicate its use in maritime contexts versus land-based travel', 'A nautical mile is exactly 1,852 meters, defined as one arcminute of latitude along any meridian of Earth\'s surface - a geometric link to the coordinate system that lets navigators read distances directly off latitude lines on a chart', 'A nautical mile is approximately 1,852 meters but varies slightly by latitude because Earth is not a perfect sphere, requiring GPS correction factors at extreme latitudes'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition states a nautical mile is exactly 1,852 meters, defined as one arcminute (1/60 of a degree) of latitude along any meridian. This geometric relationship to Earth\'s coordinate system means navigators can read distances directly off the latitude scale on a chart without any conversion.',
        },
        {
          q: 'According to the examples table, how many nautical miles correspond to one full degree of latitude?',
          options: ['60 nautical miles - because a nautical mile is defined as one arcminute (1/60 of a degree) of latitude, so one full degree equals exactly 60 nautical miles', '100 nautical miles - the metric-aligned rounding used when dividing the globe\'s 6,000-nautical-mile circumference into 60 equal segments', '69.05 nautical miles - derived from the statute mile equivalent of one degree of latitude at the equator, used in US government navigation tables', '111.12 nautical miles - based on the kilometer conversion, since one degree at the equator spans approximately 111.12 km'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The examples table shows 60 nmi = 111.12 km = 69.05 mi labeled as "1 degree of latitude." The definition explains this directly: a nautical mile is one arcminute of latitude, so one degree (60 arcminutes) equals exactly 60 nautical miles.',
        },
        {
          q: 'The pitfalls section warns against confusing nautical miles with statute miles. Approximately how much longer is a nautical mile?',
          options: ['About 5% longer - a small difference that only matters for very long ocean voyages where cumulative error builds across multiple waypoints', 'About 10% longer - which is why GPS charts flag the discrepancy when users switch between statute and nautical mile settings', 'They are the same physical distance measured differently; the values 1,852m and 1,609.344m refer to two different calculation methods for the same unit', 'About 15% longer - a nautical mile is 1,852 m versus a statute mile\'s 1,609.344 m, so a "100-mile voyage" means very different distances depending on which unit was intended'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The pitfalls section states a statute mile is 1,609.344 m and a nautical mile is 1,852 m - about 15% longer. It warns that a voyage of "100 miles" could mean very different distances depending on the unit, and that GPS devices must always be verified for the correct setting before navigation.',
        },
        {
          q: 'Is the nautical mile part of the SI (metric) system?',
          options: ['Yes - it is a derived SI unit officially adopted by the International Bureau of Weights and Measures when its metric equivalent of 1,852 m was formally established in 1929', 'No - it is not part of the SI system, but its exact metric definition (1,852 m) was fixed by international agreement in 1929, and the International System of Units allows its continued use alongside SI for maritime and aviation purposes', 'No - the nautical mile has no fixed metric equivalent and varies by country; European authorities use 1,852 m while the US still uses the traditional 1,853.248 m derived from Clarke\'s ellipsoid', 'Yes - the nautical mile was fully metricated in 1960 when the SI system was formally adopted, classified as a supplementary unit for approved navigation contexts'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ states the nautical mile is not part of the SI system. However, its definition of exactly 1,852 m was fixed by international agreement in 1929, and the International System of Units allows its continued use alongside SI units for maritime and aviation purposes.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'gross pay',
      questions: [
        {
          q: 'Which of the following correctly describes what gross pay includes?',
          options: ['Only the agreed base salary or hourly wage rate paid for regular hours worked during the pay period', 'Base salary minus mandatory deductions for Social Security and Medicare, before income tax is applied', 'The amount deposited into your bank account after all voluntary and mandatory deductions are removed', 'Total compensation before any deductions, including base salary, overtime, bonuses, and commissions'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The definition states that gross pay is the total compensation earned before any deductions, and it includes base salary or hourly wages, overtime, bonuses, commissions, and other taxable compensation.',
        },
        {
          q: 'What is the key difference between gross pay and net pay?',
          options: ['Gross pay is the total earned before deductions; net pay is the take-home amount after all taxes and deductions are removed', 'Gross pay includes bonuses and overtime; net pay is the base salary only, excluding all variable compensation', 'Gross pay is calculated monthly; net pay is the bi-weekly or weekly equivalent used for day-to-day budgeting', 'Gross pay covers regular hours only; net pay adds overtime and commission to show total actual compensation'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition explains that gross pay is distinct from net pay (take-home pay). Federal income tax, FICA, health premiums, and retirement contributions are all deducted from gross pay to arrive at the amount actually deposited into your account.',
        },
        {
          q: 'According to the examples table, what is the bi-weekly gross pay for a $60,000 annual salary?',
          options: ['$1,473.46', '$2,500.00', '$2,307.69', '$5,000.00'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The examples table shows that a $60,000 annual salary divided into 26 bi-weekly periods equals $2,307.69 gross per period. The $1,473.46 figure is the net (take-home) pay after all deductions.',
        },
        {
          q: 'What does the pitfalls section warn about using gross pay for monthly budgeting?',
          options: ['Gross pay is too variable because overtime and bonuses are included but not guaranteed each pay period', 'A $60,000 salary sounds like $5,000 per month, but after taxes and deductions most US workers take home only $3,200-$3,800 per month, making gross pay misleading for expense planning', 'Gross pay overstates earnings because Social Security and Medicare contributions legally belong to the government, not the employee', 'Gross pay is unsuitable for comparing job offers because state tax variations make the figure incomparable across locations'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section warns never to budget using gross pay. A $60,000 salary sounds like $5,000/month, but after taxes and deductions, most US workers take home $3,200-$3,800 per month. Net pay should be used for all monthly expense planning.',
        },
        {
          q: 'According to the FAQs, what share of gross pay do most US workers earning $40,000-$100,000 typically take home?',
          options: ['85-90%, because most deductions are voluntary and most workers opt out of major benefits at enrollment', '50-60%, because federal income tax alone consumes approximately one-third of gross earnings in this income range', '75-85%, reflecting a modest deduction rate for workers in low-tax states without employer benefit elections', '65-75%, though higher earners in high-tax states may keep as little as 55-60%'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The FAQ states that for most US workers earning $40,000-$100,000, net pay is roughly 65-75% of gross pay. The exact figure depends on filing status, state taxes, retirement contributions, and benefit elections. Higher earners in high-tax states may keep as little as 55-60%.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'RPM',
      questions: [
        {
          q: 'How is RPM (Revenue Per Mille) calculated?',
          options: ['Total earnings divided by ad impressions, multiplied by 1,000', 'Click-through rate multiplied by cost per click, multiplied by 1,000 page views', 'Total earnings divided by total page views, multiplied by 1,000', 'Total ad revenue divided by the number of active ad units, multiplied by 1,000'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition states RPM is calculated by dividing total earnings by page views, then multiplying by 1,000. For example, $50 earned from 10,000 page views gives an RPM of $5.00.',
        },
        {
          q: 'From the niche RPM table, which content category earns the highest typical RPM?',
          options: ['Finance / Insurance at $15-$40', 'Technology / Software at $10-$25', 'Health / Medical at $8-$20', 'Lifestyle / Food / Travel at $3-$8'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The examples table shows Finance / Insurance at $15-$40 RPM, the highest range in the table. This reflects the high CPC advertisers pay in finance-related keyword auctions.',
        },
        {
          q: 'Why does the pitfalls section recommend analysing RPM over 30+ days rather than a shorter window?',
          options: ['Google AdSense only finalises RPM data after a 30-day processing window for accuracy', 'RPM includes estimated earnings subject to advertiser verification within the first 30 days', 'New content takes 30 days to attract competitive ad bidding, making early RPM unrepresentative', 'A single day with unusually high or low traffic can distort the figure; 30+ days provides a reliable baseline'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The pitfalls section states that a single day with unusually high or low traffic can distort the RPM figure. Always analyse RPM over 30+ days to get a reliable baseline.',
        },
        {
          q: 'What is the key difference between RPM and CPM?',
          options: ['CPM is calculated per 1,000 page views like RPM, but only counts pages where at least one ad was displayed', 'RPM is your publisher earnings per 1,000 page views; CPM is what advertisers pay per 1,000 ad impressions - your RPM will always be lower because Google keeps a revenue share', 'RPM measures all page views including those with no ads loaded; CPM only counts pages where ads were successfully displayed', 'CPM is the gross figure before tax withholding; RPM is the net figure after tax deductions for the publisher\'s country'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ explains that RPM is a publisher metric (earnings per 1,000 page views) while CPM is an advertiser metric (spend per 1,000 ad impressions). RPM is always lower than CPM because Google retains its revenue share before paying the publisher.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'CPC',
      questions: [
        {
          q: 'What percentage of advertiser spend does Google pay to publishers through AdSense for content ads?',
          options: ['Approximately 45% - the remainder is retained by Google as the platform majority share', 'Approximately 55% - a roughly even split with a small platform premium', 'Approximately 68% - Google keeps approximately 32% and pays publishers the rest', 'Approximately 80% - publishers receive the majority as the content creators'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition states that Google keeps approximately 32% and pays publishers approximately 68% of what advertisers spend on content ads. The CPC figure shown in AdSense reports is already this net publisher share.',
        },
        {
          q: 'From the examples table, which niche category commands the highest CPC range?',
          options: ['Finance / Insurance / Legal ($1.00 - $50+)', 'Technology / Software ($0.50 - $8.00)', 'Health / Medical ($0.50 - $5.00)', 'Lifestyle / Food / Travel ($0.10 - $1.50)'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The examples table shows Finance / Insurance / Legal at $1.00 - $50+, the widest and highest range of all five categories. The definition notes that a single click on a finance keyword from a US visitor can be worth more than 100 clicks on a general content page.',
        },
        {
          q: 'According to the whenToUse section, when is improving CPC more impactful for revenue than improving CTR?',
          options: ['When ad impressions are already maximised and no additional traffic can be acquired through any channel', 'When CTR is already below 0.5% and further placement optimisation is no longer technically feasible', 'When the site operates in a niche where ad inventory is limited and CPM pricing applies instead of CPC', 'Improving CPC through targeting higher-value content is often more impactful because a 2x CPC increase doubles earnings without requiring any additional traffic'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The whenToUse section states that improving CPC (by targeting higher-value content) is often more impactful than improving CTR, since a 2x CPC increase doubles earnings without needing any more traffic.',
        },
        {
          q: 'What does the pitfalls section warn about relying on a single click\'s CPC value when setting ad strategy?',
          options: ['Google delays CPC reporting by up to 48 hours, making individual click values unreliable for real-time decisions', 'The CPC in AdSense reports is an average across all clicks in a period; individual clicks vary widely - one might earn $0.02 and the next $4.50 - so strategy should not be based on a single click\'s value', 'CPC values are rounded to two decimal places in reports, creating systematic underreporting for high-value clicks above $10', 'Google only displays CPC data for the top 10% of clicks by value, making the average misleading for low-volume publishers'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section warns that the reported CPC is an average across all clicks. Individual clicks vary enormously depending on which ad was served, so a single click value should not be used as the basis for strategy.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'CTR',
      questions: [
        {
          q: 'How is Click-Through Rate (CTR) calculated for Google AdSense at the page level?',
          options: ['Clicks divided by page views, multiplied by 100 to give a percentage', 'Impressions divided by clicks, showing how many ads are served per click received', 'Revenue divided by total ad impressions, giving the effective earnings per page view', 'Clicks divided by total page sessions including non-ad pages, measuring overall site engagement'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition states that for Google AdSense, CTR is measured at the page level: clicks divided by page views. The general formula is clicks / impressions x 100 - for example, 200 clicks from 10,000 ad impressions gives a 2% CTR.',
        },
        {
          q: 'According to the definition, what is the typical AdSense CTR range for banner ads on content sites?',
          options: ['0.1 - 0.5%', '3 - 5%', '5 - 8%', '1 - 3%'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The definition states that a typical AdSense CTR for banner ads on content sites is 1-3%. The FAQ confirms that below 0.5% usually means ads are poorly placed, while above 3% is strong and achievable with well-placed in-content ads.',
        },
        {
          q: 'According to the whenToUse section, when should you focus on optimising CTR rather than CPC to increase AdSense revenue?',
          options: ['When your site already ranks in the top 3 for its primary keywords and traffic growth has plateaued', 'When your CPC is already strong - in that case, improving ad placement and format can significantly increase earnings without changing your content strategy', 'When your site is less than 12 months old and has not yet been approved for premium ad inventory', 'When your page RPM already exceeds the category benchmark, indicating CTR is the only remaining optimisation lever'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The whenToUse section states that when CPC is already strong, focusing on CTR through better placement and format can significantly increase earnings without changing content strategy. CTR is the right lever when CPC is the strength and placement is the gap.',
        },
        {
          q: 'What does the pitfalls section warn about a CTR that exceeds 10%?',
          options: ['A CTR above 10% automatically switches the account from CPC to CPM-only billing to prevent revenue manipulation', 'Google caps reported CTR at 10% in its dashboard; any higher figure requires a manual data export to verify', 'A CTR above 10% can trigger a Google AdSense review for invalid traffic, as unusually high rates can indicate artificially inflated clicks or deceptive ad placement', 'Revenue earned above a 10% CTR threshold is held in a reserve account for 90 days pending traffic quality verification'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section explicitly warns that a CTR above 10% can trigger a Google AdSense review for invalid traffic. Google monitors CTR patterns and may suspend accounts where clicks appear artificially inflated.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'pareto-principle': {
    definition: [
      'The Pareto principle, widely known as the 80/20 rule, states that roughly 80% of outcomes are produced by 20% of inputs. Italian economist Vilfredo Pareto first documented this pattern in 1896, observing that 20% of Italy\'s population owned 80% of the land. Management consultant Joseph M. Juran later named the principle after Pareto in the 1940s and applied it to quality control and business management.',
      'In ratio terms, the 80/20 split is a 4:1 ratio. The high-impact 20% produces four times the output per unit compared to the remaining 80%. Enter 4:1 into the ratio-to-percentage calculator and you recover exactly 80% and 20%. This ratio framing makes it straightforward to compare against other distributions - a 3:1 ratio gives 75/25, a 9:1 ratio gives 90/10.',
      'The principle is an empirical observation, not a mathematical law. Real distributions vary - 70/30 and 90/10 are both consistent with the underlying idea. The constant is the asymmetry: a minority of inputs accounts for a majority of outputs, almost regardless of domain.',
    ],
    beginnerExplain: [
      'Imagine you run an online store with 100 products. After checking your sales data, you find that 20 of those products generate 80% of all your revenue. The other 80 products together bring in only the remaining 20%. That imbalance - where a small slice of the whole carries most of the weight - is the Pareto principle.',
      'The same pattern shows up everywhere. A software team finds that 20% of their bug reports cause 80% of the crashes. A teacher notices that 20% of students ask 80% of the questions. The exact numbers shift, but the asymmetry is almost always there.',
      'Knowing this helps you make better decisions about where to focus your time. Instead of treating all 100 products equally, you concentrate on the 20 that actually move revenue. The goal is not to ignore the rest - it is to recognize where your effort has the most leverage.',
    ],
    whenToUse: 'Apply the Pareto principle as a prioritization framework when you have many inputs and limited time or resources. Rank your inputs by output contribution, identify the top 20% (or whatever minority drives the majority), and allocate effort there first. It is a diagnostic and planning heuristic - not a calculation - so always verify with real data before cutting or deprioritizing anything.',
    examples: {
      headers: ['Domain', 'The ~20%', 'The ~80% of output'],
      rows: [
        ['Business revenue', 'Top 20% of customers', '~80% of total sales'],
        ['Software quality', '20% of bug types', '~80% of system crashes'],
        ['Wealth distribution', 'Top 20% of earners', '~80% of total wealth'],
        ['Productivity', '20% of daily tasks', '~80% of meaningful results'],
        ['Sports performance', 'Top 20% of players', '~80% of goals/points scored'],
        ['Website traffic', 'Top 20% of pages', '~80% of organic visits'],
      ],
    },
    pitfalls: 'The 80/20 split is an approximation - do not assume it applies exactly without measuring. Eliminating the "bottom 80%" wholesale is a common mistake: those inputs may provide support functions, referrals, or serve as future high-value contributors that are not visible in a single output metric. The principle also does not compound: you cannot apply it recursively to conclude that 4% of inputs cause 64% of all output - each application must be measured independently against fresh data.',
    faqs: [
      {
        q: 'What ratio does the 80/20 rule correspond to?',
        a: 'An 80:20 split is a 4:1 ratio. The high-impact group is four times as productive per unit as the low-impact group. Simplified: 80/20 = 4, so the ratio is 4:1. Enter 4:1 in the ratio-to-percentage calculator to verify: Part A = 80%, Part B = 20%.',
      },
      {
        q: 'Is the Pareto principle always exactly 80/20?',
        a: 'No. The principle describes an asymmetric distribution - a minority of inputs produces a majority of outputs - but the precise split varies by system. Real distributions might be 70/30, 75/25, or 90/10. The 80/20 figure is Pareto\'s original empirical observation about Italian land ownership, generalized as a rule of thumb, not a mathematical constant.',
      },
      {
        q: 'How do I identify the Pareto 20% in my own data?',
        a: 'Sort your inputs by output contribution in descending order, then calculate the cumulative contribution as a percentage of the total. The point where cumulative contribution crosses 80% marks the boundary of your Pareto set. In a spreadsheet: sort by revenue descending, add a cumulative sum column, and find the row where it passes 80% of the total.',
      },
      {
        q: 'Who invented the Pareto principle?',
        a: 'Vilfredo Pareto documented the 80/20 pattern in 1896 while studying land distribution in Italy. The term "Pareto principle" was coined by Joseph M. Juran in the 1940s, who applied it to quality management and named it in Pareto\'s honor. Juran\'s work in manufacturing and quality control spread the concept globally.',
      },
    ],
    quiz: {
      topic: 'the Pareto principle',
      questions: [
        {
          q: 'In ratio terms, what ratio does the standard 80/20 Pareto split correspond to?',
          options: [
            '2:1',
            '4:1',
            '5:1',
            '8:2',
          ] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'An 80:20 split divides to 4:1. The high-impact group produces 80% of results, which is four times the 20% produced by the remaining group. Enter 4:1 into the ratio-to-percentage calculator and you get exactly 80% and 20%.',
        },
        {
          q: 'Who first documented the 80/20 distribution that became the Pareto principle?',
          options: [
            'Joseph M. Juran, while studying manufacturing defects in the 1940s',
            'Vilfredo Pareto, observing Italian land ownership in 1896',
            'Frederick Taylor, studying factory worker productivity in 1911',
            'W. Edwards Deming, analyzing quality control data in the 1950s',
          ] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'Vilfredo Pareto observed in 1896 that 20% of Italy\'s population owned 80% of the land. Joseph M. Juran later named the principle after Pareto when applying it to quality management in the 1940s - but the original observation was Pareto\'s.',
        },
        {
          q: 'A store has 100 products. According to the Pareto principle, how many products would you expect to generate approximately 80% of revenue?',
          options: [
            '5 products',
            '20 products',
            '50 products',
            '80 products',
          ] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The 80/20 rule predicts that roughly 20% of inputs (20 out of 100 products) account for about 80% of outputs (revenue). This is a starting approximation - the actual figure should be verified with real sales data, as the split may be 75/25 or 85/15 in practice.',
        },
        {
          q: 'What is the most common mistake when applying the Pareto principle?',
          options: [
            'Using it for business decisions instead of only scientific research',
            'Assuming the split is always exactly 80/20 without measuring actual data',
            'Applying it to more than three input variables at once',
            'Using ratio notation (4:1) instead of percentage notation (80/20)',
          ] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section flags assuming an exact 80/20 split without measurement. Real distributions vary - 70/30 or 90/10 are equally consistent with the underlying principle. Treating 80/20 as a precise law rather than an empirical approximation leads to misallocated effort.',
        },
        {
          q: 'If a software team applies the Pareto principle and finds that 15 bug types (out of 75 total) cause 80% of crashes, what is the ratio of high-impact to low-impact bugs?',
          options: [
            '1:4',
            '4:1',
            '1:5',
            '3:1',
          ] as [string, string, string, string],
          correct: 0 as const,
          explanation: '15 high-impact bugs vs. 60 low-impact bugs is a 15:60 ratio, which simplifies to 1:4. Note the direction: this is the ratio of the small group to the large group. The 80/20 rule (4:1) describes the output ratio (crashes caused), not the input count ratio - the input count here is 1:4 (15 vs. 60).',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'pay periods',
      questions: [
        {
          q: 'What is the key difference between bi-weekly and semi-monthly pay?',
          options: ['Bi-weekly = 26 cheques/year (every two weeks); semi-monthly = 24 cheques/year (twice a calendar month on fixed dates)', 'Bi-weekly = 24 cheques/year; semi-monthly = 26 cheques/year - the terms are often confused in the opposite direction', 'Both produce exactly 24 cheques per year but on different dates', 'Bi-weekly and semi-monthly are synonyms referring to the same 26-payment-per-year schedule'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition states bi-weekly means every two weeks (26 pay cheques per year), while semi-monthly means twice a calendar month on fixed dates such as the 1st and 15th (24 pay cheques per year). Both are commonly confused.',
        },
        {
          q: 'From the examples table, a $62,400 annual salary paid bi-weekly - what is each cheque amount?',
          options: ['$1,200 per week', '$2,400 every 2 weeks', '$2,600 twice a month', '$5,200 per month'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The examples table shows $62,400 / 26 = $2,400 bi-weekly. Semi-monthly would be $62,400 / 24 = $2,600, which is slightly higher per cheque but with two fewer payments per year.',
        },
        {
          q: 'To annualize a bi-weekly pay cheque correctly, you must multiply by what number?',
          options: ['24 - two payments per month times 12 months', '26 - 52 weeks divided by 2', '52 - the total number of weeks in a year', '12 - the number of months in a year'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section warns: multiplying a bi-weekly pay cheque by 24 (instead of 26) underestimates annual income by 7.7%. Always multiply bi-weekly pay by 26 and semi-monthly pay by 24 to get an accurate annual figure.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'payback-period': {
    definition: [
      'The payback period is the time required for an investment\'s cumulative savings - or income - to equal its initial cost. The formula divides the upfront cost by annual savings: a $10,000 machine saving $2,500 per year has a payback period of 4 years. After that point, every additional year of operation is net gain on top of a recovered cost.',
      'Payback period and ROI are related but answer completely different questions. Payback period asks: "when do I break even?" ROI asks: "how much profit do I make over the investment\'s lifespan?" An investment can have a short payback and modest ROI, or a long payback and exceptional ROI. A solar panel array with an 8-year payback on a 25-year lifespan generates far more total profit than a subscription tool with a 2-month payback on a 2-year lifespan - even though the subscription tool wins on payback period alone. You need both metrics together for a complete picture.',
      'The standard formula assumes constant annual savings. If savings grow over time - as is common when energy prices rise - the actual payback occurs earlier than the formula suggests. The discounted payback period applies a discount rate to each year\'s cash flows before summing them, giving a more conservative estimate for long-horizon investments. For most everyday decisions, the simple formula is sufficient.',
    ],
    beginnerExplain: [
      'Think of a gym membership. You pay $600 upfront for a year\'s access. The alternative is $8 per class, and you go 3 times a week - 156 classes a year. Pay-per-visit cost: $1,248. Annual saving by buying the membership: $648.',
      'Payback period: $600 / $648 = 0.93 years - under 11 months. After that, every class is pure saving. That\'s payback period in everyday life: how long until the upfront cost is covered by the recurring benefit.',
      'ROI is the follow-up question: over the full year, you saved $648 but only paid $600. Net profit = $48. ROI = $48 / $600 = 8%. Payback told you when. ROI tells you how much.',
    ],
    whenToUse: 'Use payback period as a first-pass screening filter when evaluating multiple investment options. Any investment that exceeds your maximum acceptable payback threshold can be eliminated quickly without detailed modelling. For investments that pass the screen, always follow up with total ROI (using the investment lifespan) and annualized ROI to understand the full return picture. Do not use payback period as the sole decision criterion - it measures the risk window, not the reward.',
    examples: {
      headers: ['Scenario', 'Upfront Cost', 'Annual Savings', 'Payback Period', 'Typical Lifespan'],
      rows: [
        ['Solar panels', '$15,000', '$1,800', '8 yr 4 mo', '25 years'],
        ['Heat pump upgrade', '$8,000', '$1,600', '5 years', '20 years'],
        ['Business equipment', '$25,000', '$8,000', '3 yr 1 mo', '10 years'],
        ['SaaS tool vs. manual labor', '$3,600/yr', '$18,000', '2.4 months', '3 years'],
        ['Insulation upgrade', '$6,000', '$1,200', '5 years', '30 years'],
      ],
    },
    pitfalls: 'The most critical weakness of the payback period is that it ignores everything after break-even. Two investments with identical 3-year payback periods look equivalent under this metric - but one with a 4-year lifespan barely turns a profit, while one with a 20-year lifespan generates 17 years of net returns. A useful ratio is payback / lifespan: a 0.2 ratio means you break even in the first 20% of the product\'s life, a strong position. A 0.9 ratio means you barely recoup the cost before it fails. Also watch for gross vs. net savings: a heat pump saving $3,000 in gas but consuming $800 in extra electricity has net savings of only $2,200 - using the gross figure overstates savings by 36%.',
    faqs: [
      { q: 'What is a good payback period?', a: 'It depends on context and lifespan. Business equipment decisions often require payback under 3 years. Home energy investments (solar panels, heat pumps) with 6-10 year payback periods are widely accepted because the products last 20-25 years. SaaS tools replacing manual labor can pay back in weeks. The most useful benchmark is payback relative to lifespan - the lower the ratio, the stronger the investment.' },
      { q: 'How does the payback period differ from ROI?', a: 'Payback period measures time to break even. ROI measures total profitability over the investment\'s full lifespan. They answer different questions: payback tells you the risk window (how long your capital is exposed before recovery); ROI tells you the reward (how much profit you earn once recovered). A 3-year payback on a 4-year product is very different from a 3-year payback on a 20-year product - identical payback, vastly different ROI.' },
      { q: 'What is the discounted payback period?', a: 'The discounted payback period applies a discount rate to each year\'s cash flows before summing them. Because $1,000 received in year 5 is worth less than $1,000 today, discounting gives a more conservative break-even estimate. It is used for large capital projects and long-horizon investments where the time value of money is material. For most everyday investments under 10 years, the simple payback formula is a reasonable approximation.' },
      { q: 'Can the payback period be used for investments with irregular savings?', a: 'Yes, but you need to sum annual cash flows cumulatively until they equal the initial cost, rather than using the simple division formula. List each year\'s savings, accumulate them, and identify the year where the running total crosses the initial investment. The crossover year (and the fraction within it) gives the payback period. The calculator on this site assumes constant savings per period.' },
    ],
    quiz: {
      topic: 'payback period',
      questions: [
        {
          q: 'What does the payback period formula calculate?',
          options: [
            'The total profit generated over an investment\'s full lifespan',
            'The time for cumulative savings to equal the initial investment',
            'The annualized return rate expressed as a percentage',
            'The net present value of all future cash flows discounted to today',
          ] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The payback period formula - Initial Investment / Annual Savings - calculates the time until cumulative savings equal the upfront cost. It answers "when do I break even?", not how much profit is made or what the annual return rate is.',
        },
        {
          q: 'From the examples table on this page, what is the payback period for a heat pump upgrade costing $8,000 with $1,600 in annual savings?',
          options: [
            '3 yr 1 mo',
            '4 yr 8 mo',
            '5 years',
            '6 yr 4 mo',
          ] as [string, string, string, string],
          correct: 2 as const,
          explanation: '$8,000 / $1,600 = 5.0 years exactly. The examples table confirms 5 years. With a typical lifespan of 20 years, the heat pump generates 15 years of net savings after break-even.',
        },
        {
          q: 'According to this page, what is the key difference between payback period and ROI?',
          options: [
            'Payback period uses annual savings; ROI uses daily savings adjusted for compounding',
            'Payback period applies only to physical assets; ROI applies to financial investments',
            'Payback period measures when you break even; ROI measures how much profit you make over the full lifespan',
            'Payback period is expressed in months; ROI is expressed as an annualized percentage',
          ] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition states: "Payback period asks: when do I break even? ROI asks: how much profit do I make over the investment\'s lifespan?" They answer fundamentally different questions - payback measures the risk window, ROI measures the reward. Both are needed together for a complete investment picture.',
        },
        {
          q: 'The pitfalls section introduces a payback/lifespan ratio. What does a ratio of 0.9 indicate?',
          options: [
            'The investment generates a 90% return on capital over its lifetime',
            'The investment pays back in the first 90 days of operation',
            'The investment barely recoups its cost before the product reaches end of life',
            'The investment has a 90% probability of achieving the projected savings',
          ] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section explains that a 0.9 payback/lifespan ratio means you break even in 90% of the product\'s life - barely recouping the cost before it fails. By contrast, a 0.2 ratio means break-even in the first 20% of the lifespan, leaving 80% of the product\'s life as net gain.',
        },
        {
          q: 'What does the whenToUse section say payback period should NOT be used as?',
          options: [
            'A metric for home energy investments such as solar panels and heat pumps',
            'A screening tool for eliminating investments that exceed a maximum threshold',
            'The sole decision criterion, since it measures the risk window but not the reward',
            'A comparison tool across investments with similar lifespans',
          ] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The whenToUse section states: "Do not use payback period as the sole decision criterion - it measures the risk window, not the reward." It should be used as a first-pass filter, always followed by total ROI and annualized ROI for investments that pass the screen.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'sarcopenia': {
    definition: [
      'Sarcopenia is the progressive, age-related loss of skeletal muscle mass, strength, and physical performance. The term comes from the Greek words for flesh (sarx) and poverty (penia). Muscle mass loss typically begins around age 40 at a rate of 3-8% per decade and accelerates after age 65; by age 80 many adults have lost 30-40% of their peak muscle mass. Sarcopenia is now formally recognized as a disease (ICD-10 code M62.84) and carries its own diagnostic criteria distinct from simply being underweight.',
      'The European Working Group on Sarcopenia in Older People (EWGSOP2, 2019) defines sarcopenia by three components: low muscle strength (the primary criterion), low muscle quantity or quality (confirming the diagnosis), and poor physical performance (indicating severity). Practical screening thresholds include grip strength below 27 kg for men or 16 kg for women, and a gait speed below 0.8 meters per second. These can be measured in a clinical setting in under two minutes.',
      'The critical implication for body weight assessment is that sarcopenia can be invisible on a standard scale or BMI reading. Muscle is replaced by fat during the sarcopenic process without necessarily changing total body weight - so a person can have a normal BMI of 23 while having lost substantial functional muscle and accumulated clinically significant fat mass in its place. This state, sometimes called sarcopenic obesity, carries higher fall, fracture, hospitalization, and mortality risk than either sarcopenia or obesity alone.',
    ],
    beginnerExplain: [
      'Imagine a building whose walls look fine from the outside but the structural beams inside have been quietly replaced with foam. The building looks normal from the street - same height, same footprint, same weight - but it\'s no longer strong enough to handle a storm.',
      'Sarcopenia works the same way. The number on the scale and the BMI calculation can stay the same while muscle (the "beams") is gradually replaced by fat (the "foam"). The outside looks unremarkable. But functional strength - the ability to catch yourself after a stumble, carry groceries, or get out of a chair - has been quietly eroded. That\'s why grip strength and walking speed matter more than body weight alone in older adults.',
    ],
    whenToUse: 'Sarcopenia screening is relevant for any adult aged 60 or over experiencing unexplained fatigue, falls, slow walking pace, or difficulty with daily tasks. The SARC-F questionnaire (5 questions about Strength, Assistance walking, Rising from a chair, Climbing stairs, and Falls) is a validated, zero-equipment screen that takes under a minute. A score of 4 or more suggests sarcopenia risk and warrants clinical evaluation. Grip strength dynamometry and a 4-meter gait speed test are the primary confirmatory tools. Resistance exercise 2-3 times per week and protein intake of 1.2-1.6 g/kg body weight per day are the evidence-based first-line interventions.',
    examples: {
      headers: ['Component', 'Definition', 'Threshold (EWGSOP2)'],
      rows: [
        ['Muscle strength', 'Grip strength measured with a hand dynamometer', 'Men: below 27 kg | Women: below 16 kg'],
        ['Muscle quantity', 'Appendicular lean mass relative to height squared (ASM/ht²)', 'Men: below 7.0 kg/m² | Women: below 5.5 kg/m²'],
        ['Physical performance', 'Gait speed over 4 meters', 'Below 0.8 m/s signals severe sarcopenia'],
        ['SARC-F screen', '5-question self-report tool for clinical triage', 'Score 4+ suggests sarcopenia - refer for assessment'],
      ],
    },
    pitfalls: 'The biggest pitfall is relying on BMI or body weight to rule out sarcopenia. A person at BMI 24 with excellent fat stores and minimal muscle mass can be profoundly sarcopenic. The second pitfall is conflating sarcopenia with being underweight: sarcopenic obesity - normal or high BMI with low muscle mass - is common in older adults and more dangerous than either condition alone. A third pitfall is assuming sarcopenia is inevitable and untreatable: randomized trials consistently show that resistance exercise 2-3 times per week produces meaningful gains in muscle strength and functional performance even in adults over 80.',
    faqs: [
      {
        q: 'What is the difference between sarcopenia and general muscle weakness?',
        a: 'Sarcopenia is a specific clinical syndrome defined by low muscle mass, low strength, and low physical performance together - not just feeling weak. General muscle weakness can have many causes (dehydration, illness, poor sleep). Sarcopenia is a structural loss of skeletal muscle tissue that develops over years and is formally diagnosed using grip strength, muscle quantity tests, and gait speed measures (EWGSOP2 criteria).'
      },
      {
        q: 'Can sarcopenia be reversed?',
        a: 'Sarcopenia can be meaningfully improved - though reversal to peak muscle mass is unlikely. Resistance exercise is the most effective intervention, with randomized trials showing gains in grip strength, leg press strength, and walking speed in adults over 65 and even over 80. Adequate protein intake (1.2-1.6 g/kg/day) is essential to support the muscle-building response to exercise. Early intervention produces better results than starting treatment in advanced sarcopenia.'
      },
      {
        q: 'Why does sarcopenia make BMI misleading in older adults?',
        a: 'BMI divides weight by height squared - it cannot distinguish what the weight is made of. In sarcopenia, muscle is replaced by fat without necessarily changing total weight. A 70-year-old with sarcopenia may have the same BMI as they did at 40, but their body composition has shifted significantly toward fat and away from functional muscle. This is why waist circumference, grip strength, and gait speed provide information that BMI cannot.'
      },
      {
        q: 'What is sarcopenic obesity?',
        a: 'Sarcopenic obesity is the coexistence of sarcopenia (low muscle mass and strength) with obesity (excess fat mass). It is common in older adults because weight gain with age often involves simultaneous muscle loss and fat gain. Sarcopenic obesity carries higher mortality and disability risk than either condition alone, partly because standard obesity management (caloric restriction) can worsen sarcopenia if not paired with resistance exercise and adequate protein.'
      },
    ],
    quiz: {
      topic: 'sarcopenia',
      questions: [
        {
          q: 'According to EWGSOP2, what grip strength reading in a man raises a flag for sarcopenia?',
          options: ['Below 35 kg', 'Below 30 kg', 'Below 27 kg', 'Below 22 kg'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The EWGSOP2 2019 consensus sets the grip strength threshold for sarcopenia risk at below 27 kg for men and below 16 kg for women. Grip strength is the primary diagnostic criterion - low strength is both the first sign and the most clinically important component of sarcopenia.',
        },
        {
          q: 'Why can sarcopenia be invisible on a standard bathroom scale or BMI calculation?',
          options: ['Sarcopenic muscle weighs more than fat, inflating the reading', 'The scale only measures bone density, not soft tissue', 'Muscle is replaced by fat without necessarily changing total body weight, so BMI stays the same while body composition deteriorates', 'Sarcopenia causes fluid retention that masks the true muscle deficit'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'Sarcopenia replaces muscle with fat - a tissue swap that leaves total body weight nearly unchanged. Because BMI only divides weight by height, it cannot detect this substitution. A person can have a normal BMI of 23 or 24 while being profoundly sarcopenic.',
        },
        {
          q: 'What is the most effective intervention for sarcopenia, according to clinical evidence?',
          options: ['High-protein diet alone, with no exercise requirement', 'Caloric restriction to reduce body fat and lower metabolic demand on muscles', 'Resistance exercise (strength training) 2-3 times per week, combined with adequate protein intake', 'Aerobic exercise such as walking or swimming at least 5 days per week'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'Resistance exercise is the evidence-based first-line intervention for sarcopenia, with randomized trials showing improvements in grip strength, leg strength, and physical performance even in adults over 80. Adequate protein intake (1.2-1.6 g/kg/day) is essential to support the muscle-building response. Aerobic exercise has benefits but does not build muscle the way resistance training does.',
        },
        {
          q: 'What is sarcopenic obesity, and why is it clinically significant?',
          options: ['Obesity caused exclusively by lack of physical activity, without any dietary component', 'A normal BMI combined with high visceral fat percentage, common in sedentary office workers', 'The coexistence of low muscle mass and high fat mass, which carries higher mortality risk than either condition alone', 'A term for obesity in people who have previously been very muscular athletes'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'Sarcopenic obesity is the coexistence of sarcopenia (low muscle mass and strength) with obesity (excess fat mass). It is more dangerous than either condition alone and is common in older adults. Standard obesity management through caloric restriction can worsen the sarcopenic component if not paired with resistance exercise and adequate protein.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'sales tax',
      questions: [
        {
          q: 'How does the sales tax collection mechanism work in the US?',
          options: ['The government bills buyers directly based on annual spending reported on income tax returns', 'The seller adds the tax to the purchase price, collects it from the buyer, and remits it to the state or local government', 'Retailers pay a flat annual license fee to the state in lieu of collecting individual transaction taxes', 'Buyers self-report and pay sales tax at year-end based on total taxable purchases during the fiscal year'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition states the seller adds the tax to the purchase price, collects it from the buyer, and remits it to the state or local government. This distinguishes sales tax from self-assessed consumption taxes.',
        },
        {
          q: 'How does sales tax differ from income tax and property tax?',
          options: ['Sales tax is a business expense tax on commercial transactions; income tax is a personal tax on wages only', 'Sales tax is collected by the federal government; income tax is collected by state and local governments', 'Sales tax is applied to profit from a sale; income tax taxes the full sale price including cost of goods', 'Sales tax taxes spending at the moment of purchase; income tax taxes earnings; property tax taxes asset ownership'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The definition states: "Unlike income tax (which taxes earnings) or property tax (which taxes assets), sales tax taxes spending at the moment of purchase." It is often described as regressive because lower-income households spend a larger share of income on taxable goods.',
        },
        {
          q: 'From the examples table, what is the total price of a $200.00 item at 7.25% sales tax?',
          options: ['$207.25', '$213.00', '$214.50', '$215.00'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The examples table shows $200.00 at 7.25% = $14.50 tax, for a total of $214.50. Tax is calculated as $200.00 x 0.0725 = $14.50.',
        },
        {
          q: 'A receipt shows a total of $108 at 8% sales tax. What is the correct method to find the pre-tax price?',
          options: ['Divide $108 by 1.08, which gives $100.00', 'Subtract 8% of $108 ($8.64) from $108, which gives $99.36', 'Subtract the tax rate (8%) from 100% to get 92%, then multiply $108 by 0.92', 'Divide $108 by 0.08 to find the tax base, then subtract the tax'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The pitfalls section states the correct method is $108 / 1.08 = $100.00. Subtracting 8% of the total ($8.64) gives $99.36, which is wrong. Always divide by (1 + rate) to reverse out sales tax.',
        },
        {
          q: 'Which five US states have no statewide sales tax?',
          options: ['Texas, Oregon, Delaware, Montana, and Alaska', 'Alaska, Delaware, Montana, New Hampshire, and Oregon', 'Nevada, Delaware, Wyoming, Montana, and New Hampshire', 'Oregon, New Hampshire, Alaska, Hawaii, and Delaware'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ lists the five states with no statewide sales tax as Alaska, Delaware, Montana, New Hampshire, and Oregon. Alaska allows local municipalities to levy their own rates, so some Alaskan cities do charge above 0%.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'VAT',
      questions: [
        {
          q: 'What fundamentally distinguishes VAT from sales tax?',
          options: ['VAT is paid only by manufacturers and wholesalers, not by retailers', 'VAT is a flat rate applied uniformly across all countries, while sales tax rates vary by jurisdiction', 'VAT is collected at every stage of production and distribution, while sales tax is collected only at the final retail sale', 'VAT applies only to goods, while sales tax applies to both goods and services'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'Unlike sales tax, which is collected only at the final retail sale, VAT is collected at every stage of production and distribution. Each business in the chain claims back the VAT it paid on inputs, so only the net value added at each stage is actually taxed.',
        },
        {
          q: 'Who ultimately bears the full cost of VAT?',
          options: ['The end consumer, who cannot reclaim it', 'The retailer, as the last business to collect VAT before the final sale', 'Each business in the supply chain pays an equal share of the total VAT collected', 'The government nets out the cost through the input tax credit system'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The end consumer bears the full VAT cost because they cannot reclaim it. For a business, VAT is broadly neutral: they collect it on sales and reclaim it on purchases.',
        },
        {
          q: 'According to the examples table, what is the gross (VAT-inclusive) price for a €500.00 item in Germany at 19% VAT?',
          options: ['€519.00', '€550.00', '€590.00', '€595.00'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The examples table shows Germany at 19% VAT: net €500.00, VAT amount €95.00, gross price €595.00. (€500 x 0.19 = €95; €500 + €95 = €595.)',
        },
        {
          q: 'What is the correct way to extract the net price from a £120 gross price that includes 20% VAT?',
          options: ['Subtract the VAT percentage directly: £120 - (£120 x 0.20) = £96.00', 'Divide the gross price by (1 + the VAT rate): £120 / 1.20 = £100.00', 'Multiply the gross price by the VAT rate to find the tax, then subtract: £120 - £24 = £96.00', 'Divide the gross price by the VAT rate only: £120 / 0.20 = £600.00'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section states you must divide the gross price by (1 + rate). £120 / 1.20 = £100.00 net. Subtracting 20% of the gross (£24) gives £96, which is wrong because it treats £120 as the base rather than as the gross already containing the tax.',
        },
        {
          q: 'According to the FAQ, what is the relationship between VAT and GST?',
          options: ['GST is a simplified version of VAT with fewer collection stages and lower administration costs', 'VAT applies to goods only, while GST extends the same framework to services', 'VAT and GST are the same type of tax with different names; both use an identical calculation formula', 'GST replaced VAT in most countries after 2010 due to its lower compliance burden for small businesses'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ confirms VAT and GST are the same type of tax with different names. Europe, the UK, and most of Africa and Asia call it VAT; Australia, Canada, India, New Zealand, and Singapore call it GST. The calculation formula is identical.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    pitfalls: "Canada's tax system is especially complex because the federal GST is often combined with a provincial sales tax (PST) or replaced by a <a href=\"/glossary/hst\">Harmonised Sales Tax (HST)</a> that merges both. The combined rate ranges from 5% (Alberta, which has no provincial sales tax) to 15% (New Brunswick, Newfoundland, Nova Scotia, PEI). Always use the combined rate for Canadian calculations.",
    faqs: [
      { q: 'Is GST the same as VAT?', a: 'Yes. GST and VAT are the same type of tax with different names. Both are multi-stage consumption taxes where businesses collect tax on sales and reclaim it on purchases. Europe calls it VAT; Australia, Canada, India, New Zealand, and Singapore call it GST. The formula for calculating both is identical.' },
      { q: 'What is the GST rate in Australia?', a: 'Australia applies a flat 10% GST on most goods and services. Some supplies are GST-free (fresh food, certain medical services, and exports) and some are input-taxed (financial services, residential rent). The Australian GST has been in force since 1 July 2000.' },
      { q: 'How do I reverse GST from a price?', a: 'Divide the GST-inclusive price by (1 + GST Rate / 100). For an AU$110 price including 10% GST: AU$110 / 1.10 = AU$100 net; the GST was AU$10. This is the same reverse formula used for VAT. Never subtract the percentage directly from the gross price.' },
    ],
    quiz: {
      topic: 'GST',
      questions: [
        {
          q: 'How does GST flow through each stage of the supply chain?',
          options: ['Businesses collect GST on sales only; purchases are made without GST, so the full amount collected is remitted to the government', 'GST is charged once at the point of final retail sale only, with no credit or recovery mechanism at earlier production stages', 'Each business pays GST on its purchases and collects GST on its sales, remitting only the difference to the government', 'Businesses pool all collected GST into a trust account and remit the full balance at the end of each annual filing period'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition states that each business in the supply chain pays GST on purchases and collects GST on sales, remitting only the difference. End consumers bear the full cost because they cannot reclaim it.',
        },
        {
          q: 'What is the relationship between GST and VAT?',
          options: ['GST and VAT are the same type of tax with different names; both are multi-stage consumption taxes with identical formulas', 'VAT is a flat-rate tax on all goods, whereas GST uses multiple rates by category, making GST calculations more complex', 'GST applies only at the final retail stage, while VAT cascades independently through every stage of the supply chain', 'VAT applies exclusively in Europe; GST is a replacement system adopted by OECD countries after 2000 using a different formula'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The FAQ confirms that GST and VAT are the same type of tax with different names. Europe calls it VAT; Australia, Canada, India, New Zealand, and Singapore call it GST. The formula for calculating both is identical.',
        },
        {
          q: 'According to the examples table, what is the gross (GST-inclusive) price for a S$100 item in Singapore at the current 9% GST rate?',
          options: ['S$118', 'S$115', 'S$110', 'S$109'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The examples table shows Singapore at 9% GST: net S$100, GST amount S$9, gross price S$109. Singapore raised its GST rate from 8% to 9% in January 2024.',
        },
        {
          q: 'What makes Canadian GST calculations especially complex, according to the pitfalls section?',
          options: ['Canada applies four GST tiers (5%, 12%, 18%, and 28%) by product category, mirroring India\'s multi-rate structure', 'The federal 5% GST is combined with a provincial tax (PST or HST), making the combined rate range from 5% in Alberta to 15% in several other provinces', 'Canada uses a reverse-charge mechanism where the buyer, not the seller, remits GST directly to the government for all B2B transactions', 'Canada applies GST at two separate stages - once at import and once at final retail sale - meaning some goods are effectively taxed twice'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section warns that Canada\'s federal 5% GST is often combined with a provincial sales tax (PST) or replaced by a Harmonised Sales Tax (HST). The combined rate ranges from 5% in Alberta (no provincial tax) to 15% in New Brunswick, Newfoundland, Nova Scotia, and PEI.',
        },
        {
          q: 'A GST-inclusive invoice shows AU$110 with 10% GST included. Which method correctly extracts the net (pre-GST) price?',
          options: ['Subtract 10% of the gross price: AU$110 - AU$11 = AU$99', 'Multiply the gross price by 1.10 to adjust for the tax inclusion: AU$110 x 1.10 = AU$121', 'Divide the gross price by 1.10: AU$110 / 1.10 = AU$100', 'Divide the gross price by the GST rate percentage: AU$110 / 0.10 = AU$1,100'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ states you must divide the GST-inclusive price by (1 + GST Rate / 100). For AU$110 at 10%: AU$110 / 1.10 = AU$100 net. The FAQ explicitly warns never to subtract the rate percentage directly from the gross price, since 10% of AU$110 is AU$11, not AU$10.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'hst': {
    definition: [
      'HST (Harmonised Sales Tax) is a blended federal-provincial consumption tax used in five Canadian provinces. Rather than collecting the 5% federal GST and a separate provincial sales tax (PST) in two distinct streams, participating provinces merged both into a single rate administered by the Canada Revenue Agency (CRA). Ontario applies 13% (5% federal + 8% provincial); New Brunswick, Newfoundland and Labrador, Nova Scotia, and Prince Edward Island each apply 15% (5% federal + 10% provincial).',
      'Like GST and VAT, HST is a multi-stage tax with input tax credits. Registered businesses collect HST on taxable sales and recover it on business purchases by claiming Input Tax Credits (ITCs). Only end consumers bear the full economic cost, since they cannot reclaim HST. The calculation formula is identical to GST and VAT - the only differences are the rate and the fact that both the federal and provincial components arrive in a single charge.',
    ],
    whenToUse: 'Use HST rates when invoicing customers in Ontario, New Brunswick, Newfoundland and Labrador, Nova Scotia, or Prince Edward Island. For customers in Alberta, British Columbia, Manitoba, Quebec, or Saskatchewan, apply the 5% federal GST separately alongside any applicable provincial tax - those provinces do not participate in the harmonised system.',
    examples: {
      headers: ['Province', 'HST rate', 'Net price', 'HST amount', 'Gross price'],
      rows: [
        ['Ontario', '13%', 'CA$100', 'CA$13', 'CA$113'],
        ['New Brunswick', '15%', 'CA$100', 'CA$15', 'CA$115'],
        ['Newfoundland and Labrador', '15%', 'CA$100', 'CA$15', 'CA$115'],
        ['Nova Scotia', '15%', 'CA$100', 'CA$15', 'CA$115'],
        ['Prince Edward Island', '15%', 'CA$100', 'CA$15', 'CA$115'],
      ],
    },
    pitfalls: "The most common mistake is applying HST to a province that does not participate in the harmonised system. Alberta has no provincial sales tax at all - only the 5% federal GST applies. British Columbia, Manitoba, and Saskatchewan each collect a separate PST alongside federal GST; the rates are not combined and the PST is administered provincially, not by the CRA. Quebec uses its own QST (Quebec Sales Tax) at 9.975% on top of the federal 5% GST - also administered separately.",
    faqs: [
      { q: 'Which Canadian provinces use HST?', a: 'Five provinces participate in the harmonised system: Ontario (13%), New Brunswick (15%), Newfoundland and Labrador (15%), Nova Scotia (15%), and Prince Edward Island (15%). Alberta, British Columbia, Manitoba, Quebec, and Saskatchewan do not use HST - each applies the federal GST alongside its own provincial tax structure.' },
      { q: 'What is the difference between HST and GST in Canada?', a: 'GST is the 5% federal tax that applies across all Canadian provinces and territories. HST replaces GST in five participating provinces by merging the federal and provincial portions into one combined rate. In non-participating provinces, businesses charge the federal GST separately from any applicable provincial tax, and may need to file two separate returns.' },
      { q: 'Can businesses recover HST paid on their purchases?', a: 'Yes. Businesses registered for HST claim Input Tax Credits (ITCs) for the HST paid on business-related purchases and expenses. This offsets the HST collected on sales, so only the net difference is remitted to the CRA. End consumers who are not registered for HST cannot claim ITCs and bear the full cost.' },
    ],
    quiz: {
      topic: 'HST',
      questions: [
        {
          q: "Ontario's 13% HST rate is made up of which two components?",
          options: ['5% federal GST plus 8% provincial component', '10% federal GST plus 3% provincial component', '8% federal GST plus 5% provincial component', '5% federal GST plus 8% Quebec QST'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition states Ontario applies 13% HST composed of 5% federal and 8% provincial. All five HST provinces share the same 5% federal component - only the provincial portion differs.',
        },
        {
          q: 'A client in New Brunswick is invoiced CA$500 net. HST is 15%. What is the gross (HST-inclusive) invoice total?',
          options: ['CA$550', 'CA$565', 'CA$575', 'CA$580'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'CA$500 x 1.15 = CA$575. The examples table confirms New Brunswick applies 15% HST: a CA$100 net price becomes CA$115 gross, so the same rate applied to CA$500 gives CA$575.',
        },
        {
          q: 'Which of the following provinces does NOT participate in the HST system?',
          options: ['Ontario', 'British Columbia', 'Nova Scotia', 'New Brunswick'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'British Columbia applies the 5% federal GST separately alongside its own provincial sales tax (PST) - it does not participate in the harmonised system. Ontario, Nova Scotia, and New Brunswick are all HST provinces.',
        },
        {
          q: 'What is a key operational advantage of HST over separate GST plus PST for businesses?',
          options: ['The combined HST rate is always lower than separate GST plus PST combined', 'HST applies to a wider range of goods than GST alone, simplifying product classification', 'Businesses pay no HST on their own purchases, eliminating the need for input tax credit tracking', 'A single registration and one remittance to the CRA replaces separate federal and provincial filings'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The definition notes HST is administered by the CRA rather than split between federal and provincial authorities. Businesses in HST provinces file one return and make one remittance, whereas non-participating provinces require separate federal and provincial filings.',
        },
        {
          q: 'A registered Nova Scotia business paid CA$230 HST on purchases and collected CA$575 HST on sales this quarter. How much must it remit to the CRA?',
          options: ['CA$575', 'CA$345', 'CA$805', 'CA$230'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'Businesses remit only the net HST - collected minus recoverable ITCs. CA$575 collected minus CA$230 paid = CA$345 net remittance. This input tax credit mechanism is what prevents HST from cascading through the supply chain.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'obstetrics': {
    definition: [
      'Obstetrics is the branch of medicine focused on pregnancy, labor, delivery, and the postpartum period - typically the first six weeks after birth. An obstetrician (OB) is a physician who completes a four-year residency in obstetrics and gynecology after medical school. Most OBs practice as OB/GYNs, handling both obstetric care (pregnancy-related) and gynecologic care (reproductive health more broadly).',
      'Obstetric care spans three distinct phases: prenatal (before birth), intrapartum (during labor and delivery), and postpartum (after birth). Each phase involves standardized monitoring protocols - prenatal visits follow a scheduled frequency that increases as the due date approaches, intrapartum care monitors contractions and fetal heart rate, and postpartum care checks for complications such as postpartum hemorrhage, infection, and mood disorders.',
    ],
    beginnerExplain: [
      'Think of obstetrics as project management for pregnancy. The obstetrician is the project lead who monitors progress at regular checkpoints, spots problems early, and coordinates the final delivery. Just as a project manager does not build the product themselves but ensures everything stays on track and handles crises, the OB does not grow the baby - they monitor the process, interpret the data, and step in when something needs clinical attention.',
    ],
    whenToUse: 'See an obstetrician when your pregnancy is classified as high-risk (multiple pregnancy, chronic health conditions, prior complications, age over 35, or IVF conception), when a complication is identified during prenatal care, or when you need a planned cesarean section. Low-risk pregnancies can often be managed by a midwife in collaboration with an OB. In both cases, obstetric involvement is standard at delivery in a hospital setting.',
    examples: {
      headers: ['Obstetric term', 'What it means', 'When it matters'],
      rows: [
        ['Prenatal care', 'Scheduled appointments monitoring mother and fetus throughout pregnancy', 'From confirmation of pregnancy to delivery'],
        ['Estimated Due Date (EDD)', 'The calculated date of expected delivery, 40 weeks from LMP', 'Used to schedule screenings and plan delivery'],
        ['Nuchal translucency scan', 'Ultrasound at 10-13 weeks measuring fluid behind the fetal neck', 'First-trimester screening for chromosomal conditions'],
        ['Anatomy scan', 'Detailed ultrasound at 18-22 weeks checking fetal structure', 'Identifies anatomical abnormalities and confirms growth'],
        ['Induction of labor', 'Medically initiated labor before it begins spontaneously', 'Offered at 41-42 weeks or when complications arise'],
        ['Cesarean section (C-section)', 'Surgical delivery through the abdomen and uterus', 'Planned or emergency when vaginal delivery is not safe'],
        ['Postpartum hemorrhage', 'Heavy bleeding after delivery, the leading cause of maternal mortality worldwide', 'Managed immediately after birth by the obstetric team'],
      ],
    },
    pitfalls: 'Obstetrics and gynecology are closely related but distinct. Gynecology covers the female reproductive system generally - menstrual disorders, contraception, STIs, and non-pregnancy pelvic conditions. Obstetrics covers only the pregnancy-related period. Because most physicians train in both simultaneously, the terms OB and OB/GYN are often used interchangeably in conversation, but the distinction matters when understanding which type of appointment or specialist is being discussed.',
    faqs: [
      { q: 'What is the difference between an obstetrician and a midwife?', a: 'An obstetrician is a physician (MD or DO) who can perform surgery, manage high-risk pregnancies, and handle complications. A midwife is a specialist in normal pregnancy and birth who provides care for low-risk pregnancies. In many countries, midwives manage the majority of uncomplicated births; obstetricians are consulted for complications or planned surgical delivery.' },
      { q: 'How often do you see an obstetrician during pregnancy?', a: 'The standard prenatal visit schedule in the US is approximately monthly until week 28, every two weeks from weeks 28-36, and weekly from week 36 to delivery. This gives roughly 10-15 visits for a 40-week pregnancy. High-risk pregnancies involve more frequent monitoring and may include specialist referrals to maternal-fetal medicine (MFM) physicians.' },
      { q: 'What does "obstetric history" mean on a medical form?', a: 'Obstetric history is a summary of all previous pregnancies and their outcomes. It is commonly recorded using the G/P notation: G (gravida) = total number of pregnancies, P (para) = number of deliveries at or beyond 20 weeks. For example, G3P2 means 3 pregnancies and 2 deliveries. A more detailed TPAL notation adds full-term, preterm, abortion, and living children counts.' },
    ],
    quiz: {
      topic: 'obstetrics',
      questions: [
        {
          q: 'What does the "P" in the obstetric notation G3P2 represent?',
          options: ['Number of pregnancies', 'Number of deliveries at or beyond 20 weeks', 'Number of prenatal appointments', 'Number of postpartum complications'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'In obstetric notation, G stands for gravida (total pregnancies) and P stands for para (deliveries at or beyond 20 weeks). G3P2 means the patient has had 3 pregnancies and 2 deliveries. The difference (G-P) often represents pregnancy losses before 20 weeks, though the detailed TPAL system breaks this down further.',
        },
        {
          q: 'At approximately what gestational age is the anatomy scan performed?',
          options: ['10-13 weeks', '14-16 weeks', '18-22 weeks', '28-32 weeks'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The anatomy scan (also called the mid-pregnancy or anomaly scan) is performed between 18 and 22 weeks of gestational age. At this stage the fetus is large enough for detailed structural imaging but still in a position that allows comprehensive views. It checks fetal organs, limbs, spine, and growth against gestational age.',
        },
        {
          q: 'Which specialist handles high-risk pregnancies requiring subspecialty obstetric care?',
          options: ['Neonatologist', 'Maternal-fetal medicine (MFM) physician', 'Reproductive endocrinologist', 'Pediatric cardiologist'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'Maternal-fetal medicine (MFM) physicians, sometimes called perinatologists, are obstetricians who have completed additional subspecialty training in high-risk pregnancies. They manage conditions such as preeclampsia, fetal anomalies, multiple gestations, and pregnancies complicated by chronic disease. General OB/GYNs refer to MFM for complex cases.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },
  'naegeles-rule': {
    definition: [
      "Naegele's rule is the standard formula for calculating a pregnancy's estimated due date (EDD): add 280 days (40 weeks) to the first day of the last menstrual period (LMP). An equivalent formulation is to add one calendar year, subtract three months, and add seven days to the LMP date. The rule was published by German obstetrician Franz Karl Naegele in 1812 and remains the universal clinical standard for estimating due dates more than 200 years later.",
      "The formula is based on the observation that most pregnancies last approximately 280 days from the LMP in a woman with a standard 28-day cycle. Because ovulation and conception typically occur around day 14 of the cycle, the actual fetal development period is about 266 days (38 weeks) - but gestational age, the universal clinical measure, starts from the LMP. For cycles longer or shorter than 28 days, the EDD is adjusted by the difference from 28 days.",
    ],
    beginnerExplain: [
      "Think of Naegele's rule as a pregnancy countdown timer with a built-in 2-week head start. You set the timer on the first day of your last period - before you were even pregnant. Then you count forward 280 days. The extra 2 weeks at the start account for the time between your period and when ovulation and conception actually happen. It's a clever workaround for the fact that nobody knows the exact moment they conceived, but almost everyone knows when their last period started.",
    ],
    whenToUse: "Use Naegele's rule as the starting point for any pregnancy due date calculation. It applies when you know your LMP date and have a roughly regular cycle. If your cycle differs significantly from 28 days, adjust by the difference: a 35-day cycle means your EDD is 7 days later than the basic formula gives. The rule is superseded by first-trimester ultrasound if the two methods differ by more than 7 days - in that case, the ultrasound measurement takes precedence.",
    examples: {
      headers: ['LMP date', 'Naegele formula (+280 days)', 'Estimated due date'],
      rows: [
        ['January 1, 2026', '+ 280 days', 'October 8, 2026'],
        ['March 15, 2026', '+ 280 days', 'December 20, 2026'],
        ['June 1, 2026', '+ 280 days', 'March 8, 2027'],
        ['September 10, 2026', '+ 280 days (+ 2 days for 30-day cycle)', 'June 19, 2027'],
      ],
    },
    pitfalls: "Naegele's rule assumes a 28-day cycle with ovulation on day 14. Women with irregular cycles, PCOS, or cycles longer than 35 days will find LMP-based dating less reliable, and their due date should be confirmed or adjusted by first-trimester ultrasound. The rule also does not account for IVF pregnancies, where the exact transfer date is known and gives a more precise estimate.",
    faqs: [
      { q: "How accurate is Naegele's rule?", a: "Naegele's rule is accurate to within about 2 weeks for most women with regular cycles. Only about 5% of babies are born on the exact EDD. First-trimester ultrasound improves accuracy to within 5-7 days by measuring actual embryo size rather than relying on cycle assumptions. Most providers confirm or adjust the Naegele estimate with an early scan." },
      { q: "What if my cycle is not 28 days?", a: "Adjust the due date by the difference between your cycle length and 28 days. A 30-day cycle means ovulation happens around day 16 instead of day 14, so your EDD shifts 2 days later. A 25-day cycle moves it 3 days earlier. The pregnancy calculator on this page applies this adjustment automatically when you enter your cycle length in the Last Period mode." },
      { q: "Is Naegele's rule still used today?", a: "Yes - it's still the universal starting point for obstetric dating worldwide. ACOG, the WHO, and virtually every maternity care system begin with Naegele's rule and then adjust using ultrasound if the two methods differ by more than the allowed tolerance (7 days at under 14 weeks, 10 days at 14-28 weeks, 14 days after 28 weeks)." },
    ],
    quiz: {
      topic: "Naegele's rule",
      questions: [
        {
          q: "According to Naegele's rule, how many days are added to the LMP to estimate the due date?",
          options: ['266 days', '270 days', '280 days', '294 days'] as [string, string, string, string],
          correct: 2 as const,
          explanation: "Naegele's rule adds 280 days (40 weeks) to the first day of the last menstrual period. The 280-day window includes roughly 14 days before conception (the pre-ovulation phase of the cycle) plus approximately 266 days of fetal development. The rule was established in 1812 and remains the universal clinical standard.",
        },
        {
          q: "If a woman's LMP was January 1, what is her estimated due date using Naegele's rule?",
          options: ['September 1', 'October 8', 'October 1', 'November 8'] as [string, string, string, string],
          correct: 1 as const,
          explanation: "Adding 280 days to January 1 gives October 8 (January has 31 days, leaving 249 more days to reach 280; counting through February, March, April, May, June, July, August, September, and into October lands on October 8). The equivalent shorthand is: add 1 year, subtract 3 months, add 7 days - January 1, 2026 becomes October 8, 2026.",
        },
        {
          q: "A woman has a 35-day cycle. How should her due date be adjusted from the basic Naegele calculation?",
          options: ['Subtract 7 days', 'Add 7 days', 'No adjustment needed', 'Add 14 days'] as [string, string, string, string],
          correct: 1 as const,
          explanation: "Naegele's rule assumes a 28-day cycle. A 35-day cycle is 7 days longer, meaning ovulation happens around day 21 instead of day 14. Conception therefore occurs 7 days later than the standard formula assumes, so the due date should be pushed 7 days later (add 7 days to the basic calculation).",
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'net pay',
      questions: [
        {
          q: 'What is net pay, and which deduction categories reduce gross pay to arrive at it?',
          options: ['Net pay is gross pay minus only mandatory government-imposed deductions (federal and state income tax); voluntary deductions like 401k and health insurance are excluded from the net pay calculation', 'Net pay is gross pay reduced only by Social Security (6.2%) and Medicare (1.45%), the two universal FICA deductions that apply to all US workers regardless of other elections', 'Net pay equals gross pay minus a flat effective tax rate of approximately 25-30%, which the IRS applies uniformly to all W-2 employees regardless of income or filing status', 'Net pay is the amount deposited into your bank account after all deductions are removed from gross pay - including mandatory deductions (federal/state income tax, Social Security 6.2%, Medicare 1.45%) and voluntary ones (health insurance, 401k, HSA)'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The definition states net pay is the amount deposited into your bank account after all deductions are removed from gross pay. It covers both mandatory deductions (federal income tax, state income tax, Social Security at 6.2%, Medicare at 1.45%) and voluntary ones like health insurance, 401k, and HSA contributions.',
        },
        {
          q: 'According to the definition, what is the approximate annual net pay range for a $60,000 salary for a single filer in a median-tax US state?',
          options: ['$52,000-$56,000 per year - reflecting only FICA deductions of 7.65% without accounting for federal or state income tax', '$42,000-$46,000 per year, or about $1,600-$1,770 bi-weekly - significantly lower than gross after all federal, state, and mandatory deductions', '$38,000-$40,000 per year - the typical range in a high-tax state where state income tax and high health insurance premiums apply simultaneously', '$48,000-$51,000 per year - derived by applying only the federal income tax withholding at the 22% marginal bracket'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition states that for a $60,000 annual salary, a single filer in a median-tax US state typically takes home $42,000-$46,000 per year, or $1,600-$1,770 bi-weekly. This is significantly less than the gross pay figures many people use for budgeting.',
        },
        {
          q: 'The pitfalls section warns against confusing net pay with disposable income. What is the key distinction?',
          options: ['Net pay is after taxes and statutory deductions, but fixed expenses like rent, car payments, and loan repayments further reduce what is truly discretionary - making net pay and disposable income meaningfully different figures', 'Net pay is always lower than disposable income because the IRS requires workers to set aside a portion of take-home pay into an escrow account for future tax shortfalls if withholding was insufficient', 'Disposable income is a gross pay figure before voluntary deductions; net pay is the lower post-deduction amount that reflects actual bank deposits after benefit premiums and retirement contributions', 'Net pay overstates disposable income only for workers with student loan repayments, since income-driven plans are not reflected in payroll deductions but do consume a significant share of take-home pay'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The pitfalls section states net pay is after tax and statutory deductions, but fixed expenses like rent, car payments, and loan repayments reduce what is truly discretionary. Net pay is not disposable income - it is the starting point before personal obligations are accounted for.',
        },
        {
          q: 'Why does a traditional 401k contribution reduce net pay by less than the contribution amount?',
          options: ['401k contributions are matched by the employer dollar-for-dollar, so the employee\'s net pay reduction is offset by the employer match being deposited directly into the take-home account', 'The IRS taxes 401k contributions at a flat 10% withdrawal rate when deposited, so the net pay impact is the contribution minus the pre-paid tax, always less than the nominal deduction', 'Traditional 401k contributions reduce taxable income, which lowers federal and state income tax - so contributing $200 bi-weekly may only reduce net pay by $140-$160 depending on the marginal tax rate', '401k contributions are processed after the payroll tax calculation, meaning Social Security and Medicare are calculated on the full pre-401k gross, and the 401k is deducted purely from the post-FICA remainder'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ explains that traditional 401k contributions reduce taxable income, which lowers federal and state income tax. The tax saving partially offsets the contribution, so a $200 bi-weekly contribution may only reduce net pay by $140-$160 depending on the marginal tax rate.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'merit increases',
      questions: [
        {
          q: 'What distinguishes a merit increase from other types of salary adjustments?',
          options: ['A merit increase is a mandatory annual salary adjustment required by labor law to ensure wages keep pace with industry productivity growth', 'A merit increase is the salary growth that comes from job promotion to a higher pay grade, distinct from in-band increases that stay within the same level', 'A merit increase applies to all employees equally as a fixed percentage, making it different from a bonus which is paid as a lump sum rather than a permanent base increase', 'A merit increase is a salary raise tied directly to individual job performance, distinct from cost-of-living adjustments or across-the-board increases - employers budget a merit pool (typically 3-5% of payroll) and allocate larger raises to high performers'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The definition states a merit increase rewards individual performance and is distinct from automatic COLA or across-the-board increases. Employers budget a merit pool (typically 3-5% of total payroll) and allocate larger raises to high performers, smaller ones to average performers, and nothing to below-average performers.',
        },
        {
          q: 'What is the key difference between a merit increase and a cost-of-living adjustment (COLA)?',
          options: ['A merit increase rewards individual performance; a COLA offsets inflation for all employees. A raise of only 2-3% when inflation is 3% is effectively a COLA with no merit component', 'A COLA rewards individual performance while a merit increase offsets inflation - they work in opposite directions, making combined raises hard to interpret', 'Merit increases and COLAs are calculated the same way but differ in approval: HR approves COLAs based on CPI data while managers approve merit increases based on performance reviews', 'A merit increase is paid as a permanent base salary change while a COLA is a temporary annual bonus that does not raise the base salary or affect future percentage calculations'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The FAQ states merit increases reward individual performance while COLAs simply offset inflation for all employees. Many companies issue a COLA to everyone and a separate merit increase to strong performers. A raise of only 2-3% when inflation is 3% is effectively a COLA with no merit component.',
        },
        {
          q: 'According to the examples table, what is the typical merit increase percentage range for a top performer?',
          options: ['0-2% - most companies reserve the highest pools for the middle tier to reduce flight risk among the largest employee group', '4-6% - the "exceeds expectations" category, which is often mislabeled as top performer in annual review language', '6-10% - a meaningfully higher allocation reflecting the manager directing an outsized portion of the merit pool to their best contributor', '3-5% - matching the overall merit pool, since top performers\' allocation is typically constrained by the total pool available for distribution'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The examples table shows top performers receive 6-10% merit increases. On a $60,000 salary that translates to $3,600-$6,000, and on a $100,000 salary to $6,000-$10,000 - significantly above the "exceeds expectations" tier of 4-6%.',
        },
        {
          q: 'What does the pitfalls section warn about the compounding effect of merit increases?',
          options: ['Receiving a 6% raise in year one often signals the manager used more than their allocated pool, making future merit increases less likely for that employee', 'Merit increases compound over time: a 5% raise versus a 3% raise on $60,000 is only $1,200 in year one, but over 10 years the higher trajectory produces a significantly larger base - negotiate each raise as if permanent, because future raises are percentages of the new higher figure', 'Merit increases are often overstated in offer letters, with actual payouts falling 1-2% below the stated range, making the gap between top and average performer much smaller than guidelines suggest', 'Companies apply merit increases quarterly rather than annually, so employees who focus only on annual reviews miss three additional review cycles per year'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section warns that a 5% raise versus a 3% raise on a $60,000 salary is only $1,200 difference in year one, but the higher trajectory compounds significantly over 10 years. Each raise should be negotiated as if permanent because future percentage increases build on the new higher base.',
        },
        {
          q: 'What approach does the FAQ recommend for negotiating a merit increase above the stated pool percentage?',
          options: ['Reference your total compensation package (equity, benefits, and bonus) rather than base salary, since total comp comparisons reveal larger gaps more effectively', 'Request to see the company\'s salary grade bands for your role before the review, since knowing where your salary falls in the band is the most reliable predictor of merit increase size', 'Document specific quantifiable contributions before your review (revenue generated, costs saved, projects delivered early), frame your ask around market data for your role and location, and a raise 1-2% above the stated merit pool is achievable with strong evidence', 'Delay your request until immediately after a major project success when manager goodwill is highest, since timing matters more than documentation for merit increase outcomes'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ recommends documenting specific, quantifiable contributions before the review - revenue generated, costs saved, projects delivered ahead of schedule - and framing the ask around market data (median salary for your role and location). With strong evidence, a raise 1-2% above the stated merit pool is achievable.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'COLA',
      questions: [
        {
          q: 'What is the primary purpose of a Cost-of-Living Adjustment (COLA)?',
          options: ['To reward employees for above-average performance and productivity improvements during the year', 'To align salaries with market rates paid by competitors in the same labour market and region', 'To gradually increase wages toward a statutory living wage minimum over a multi-year period', 'To preserve purchasing power by automatically offsetting the effect of inflation on wages, salaries, or benefits'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The definition states that a COLA is an automatic increase designed to offset inflation - keeping purchasing power stable as the general price level rises. It is not a performance or market adjustment.',
        },
        {
          q: 'According to the examples table, what was the real outcome of a 3.5% raise in 2022, when US CPI rose by 8.0%?',
          options: ['A +3.5% real gain, because the SSA COLA of 8.7% covered the remaining inflation gap for all workers', 'A -4.5% real loss, because the 3.5% nominal raise was far below the 8.0% inflation rate, reducing actual purchasing power', 'A +0.1% near break-even, because government adjustments offset most of the inflation impact on take-home pay', 'A -8.0% real loss, with the entire raise wiped out and additional purchasing power eroded on top'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The examples table shows that in 2022 (CPI +8.0%), a 3.5% raise produced a -4.5% real loss. A nominal raise below the inflation rate is a real-terms pay cut even though the dollar amount is higher.',
        },
        {
          q: 'What does the pitfalls section warn about when employers bundle COLA and merit increases into a single percentage?',
          options: ['Employees cannot distinguish real performance recognition from an inflation offset, so they should ask their employer to separate the two components to evaluate each independently', 'Bundling is required by law for companies with more than 50 employees and cannot legally be separated on the same payroll period', 'Separating COLA and merit creates two taxable events that increase the employee\'s effective withholding rate for that pay period', 'Combined COLA and merit raises always compound against each other, resulting in over-payment relative to what either component would produce alone'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The pitfalls section warns that a single bundled percentage makes it hard to know whether you received real performance recognition or just an inflation offset. The advice is to ask your employer to separate the COLA component from the merit component.',
        },
        {
          q: 'According to the FAQ, how does the SSA calculate the annual Social Security COLA?',
          options: ['By averaging the full-year CPI-U rate and applying it to all Social Security benefits starting in January', 'By using the Bureau of Labor Statistics inflation figure published in the prior December', 'By comparing the average CPI-W in Q3 of the current year against Q3 of the prior year; if the index rose, benefits increase by that percentage the following January', 'By tracking wage growth rather than price inflation, so the adjustment reflects income growth in the broader economy'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ states that the SSA compares the average CPI-W in Q3 of the current year against Q3 of the previous year. If the index rose, all Social Security benefits increase by that percentage the following January - the 2026 COLA of 2.8% was calculated this way.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'overtime pay',
      questions: [
        {
          q: 'Under the US FLSA, what is the minimum overtime rate for non-exempt employees?',
          options: ['1.25x the regular rate for hours beyond 40 per week', '1.5x the regular rate for hours beyond 40 per week', '2x the regular rate for hours beyond 40 per week', '1.5x only applies to hours beyond 48 per week under federal law'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FLSA requires at least 1.5 times the regular rate of pay for all hours worked beyond 40 in a single workweek for non-exempt employees. Some states like California layer on daily thresholds as well.',
        },
        {
          q: 'A worker earning $20/hr works 50 hours in a week. What is their total gross pay?',
          options: ['$1,000 - straight time for all 50 hours', '$1,100 - $800 regular + $300 overtime (10 hrs x $30)', '$1,200 - $800 regular + $400 overtime (10 hrs x $40)', '$900 - time and a half only on the extra 10 hours with no regular pay included'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'Regular pay: 40 hrs x $20 = $800. Overtime: 10 hrs x $30 (1.5 x $20) = $300. Total = $1,100. The example in the content confirms this calculation.',
        },
        {
          q: 'How is overtime pay taxed compared to regular wages?',
          options: ['At a special higher flat rate set by the IRS for premium pay', 'As ordinary income at the same rate as regular wages - no special overtime tax rate exists', 'Tax-free up to the first 8 hours of overtime per week under FLSA rules', 'At capital gains rates because the overtime premium is considered investment return'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section states that overtime pay is taxed as ordinary income with no special higher rate. Paychecks may show higher withholding during overtime weeks because payroll systems annualize earnings, but this is a timing difference, not a permanent tax increase.',
        },
        {
          q: 'Which workers are NOT automatically entitled to FLSA overtime regardless of hours worked?',
          options: ['Part-time hourly workers earning less than $15/hr', 'Exempt salaried employees whose duties qualify for executive, administrative, or professional exemption above the salary threshold', 'Employees who work remotely or in multiple states during the same workweek', 'Workers on fixed-term contracts or seasonal employment'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section notes that not all employees qualify for overtime. Exempt salaried workers above the FLSA threshold may not receive overtime if their job duties meet the executive, administrative, or professional exemption criteria.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'time and a half',
      questions: [
        {
          q: 'What does "time and a half" mean as an overtime rate?',
          options: ['1.5 times the pre-tax wage after payroll deductions are removed from the base calculation', '1.25 times the regular hourly wage, representing 25% additional pay on top of normal earnings', '1.5 times the regular hourly wage - normal time (1x) plus an additional half (0.5x), totalling 1.5x', '2 times the regular hourly wage, required for all overtime under US federal law'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition states time and a half equals 1.5 times the regular hourly wage. The name reflects the structure: normal time (1x) plus an additional half (0.5x). At $20/hr, time and a half is $30/hr.',
        },
        {
          q: 'From the examples table, what is the time-and-a-half rate for an employee earning $20/hr?',
          options: ['$30.00/hr', '$28.00/hr', '$25.00/hr', '$32.50/hr'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The examples table shows $20/hr regular rate becomes $30.00/hr at time and a half, with $10.00 extra earned per overtime hour. This is calculated as $20 x 1.5 = $30.',
        },
        {
          q: 'The pitfalls section warns 1.5x is not universal outside the US. Which countries are mentioned as starting at a lower rate?',
          options: ['Australia (1.0x for the first two hours) and Germany (1.1x on weekdays)', 'Canada (1.25x on statutory holidays) and the UK (1.1x for standard overtime)', 'Germany (1.2x standard) and Japan (1.35x on weekday overtime)', 'France and Japan, which both start at 1.25x for standard overtime hours'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The pitfalls section states that France starts at 1.25x and Japan at 1.25x - both lower than the US 1.5x minimum. India is also mentioned as requiring 2x, which is higher than 1.5x.',
        },
        {
          q: 'According to the FAQ, which types of bonuses must be included when calculating the overtime regular rate?',
          options: ['Discretionary bonuses paid at the employer\'s sole discretion, such as year-end performance bonuses', 'Non-discretionary bonuses such as attendance or production bonuses, which can raise the effective overtime rate above the simple 1.5x of base wages', 'All bonuses, whether discretionary or non-discretionary, are included in the regular rate for overtime purposes', 'Only signing bonuses paid in the first year of employment must be included in the regular rate calculation'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ states that non-discretionary bonuses (such as attendance or production bonuses) must be included in the regular rate of pay before calculating overtime. Discretionary bonuses paid at the employer\'s sole discretion are excluded.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'fica': {
    definition: [
      'FICA (Federal Insurance Contributions Act) taxes are mandatory payroll taxes withheld from every US W-2 paycheck. The total employee rate is 7.65%: 6.2% for Social Security and 1.45% for Medicare. Social Security is capped - once wages exceed the annual wage base ($176,100 in 2025), no further Social Security tax is withheld for the rest of the year. Medicare has no cap; the 1.45% applies to all wages. High earners also owe an Additional Medicare Tax of 0.9% on wages above $200,000 for single filers ($250,000 for married filing jointly), paid only by the employee.',
      'Employers pay a matching 7.65% on top of each employee\'s wages - 6.2% Social Security and 1.45% Medicare. This means the combined FICA contribution on a paycheck is 15.3%. From an employer\'s perspective, a $100,000 salary actually costs $107,650 before any other benefits. Unlike income tax, which varies by bracket and deductions, FICA is a flat percentage applied mechanically to wages.',
      'Self-employed individuals pay both halves of FICA themselves as the "self-employment tax" of 15.3% on net self-employment income. To offset the extra burden, the IRS allows them to deduct half of the self-employment tax (7.65%) from gross income when calculating federal income tax. FICA does not apply to distributions from S-corporations, partnerships, or pass-through entities - only to wages and salaries.',
    ],
    whenToUse: 'Use FICA estimates when comparing job offers by true take-home value, calculating the real employer cost of a hire (wages plus 7.65% FICA match), or planning self-employment income where you owe the full 15.3% self-employment tax. Also use it when evaluating whether to defer income into pre-tax accounts - traditional 401(k) and HSA contributions reduce FICA taxable wages as well as income tax.',
    examples: {
      headers: ['Gross wages', 'Social Security (6.2%)', 'Medicare (1.45%)', 'Total FICA', 'Employer match'],
      rows: [
        ['$50,000', '$3,100', '$725', '$3,825', '$3,825'],
        ['$100,000', '$6,200', '$1,450', '$7,650', '$7,650'],
        ['$176,100 (wage base)', '$10,918', '$2,553', '$13,471', '$13,471'],
        ['$200,000', '$10,918', '$2,900', '$13,818', '$13,818'],
        ['$250,000 (single, Addl. Medicare)', '$10,918', '$3,625 + $450*', '$14,993*', '$13,818'],
      ],
    },
    pitfalls: '* The Additional Medicare Tax of 0.9% on wages above $200,000 (single) is paid only by the employee - the employer does not match it. Many paycheck calculators omit this line item. The second common mistake is treating the Social Security wage base as fixed: it increases annually. Using the prior year\'s cap overstates Social Security withholding for high earners. Finally, note that FICA is not reduced by the standard deduction or itemized deductions - it applies to gross wages before any income tax adjustments.',
    faqs: [
      { q: 'What does FICA stand for, and what does it fund?', a: 'FICA stands for the Federal Insurance Contributions Act. The Social Security portion (6.2%) funds retirement, disability, and survivor benefits administered by the Social Security Administration. The Medicare portion (1.45%) funds hospital insurance for people 65 and older and certain disabled individuals.' },
      { q: 'Do employers pay FICA in addition to your salary?', a: 'Yes. Employers pay a matching 7.65% on top of every employee\'s wages - separate from and in addition to the gross salary. A $100,000 salaried employee costs the employer at least $107,650 in FICA alone, before health insurance, retirement contributions, or other benefits.' },
      { q: 'Can I avoid paying FICA?', a: 'For most W-2 employees, no. FICA is mandatory and withheld automatically. However, some limited exemptions exist: student workers employed by their own university, members of certain religious groups who have formally opted out, and non-resident aliens on specific visa types may be partially or fully exempt. Self-employed individuals cannot avoid the tax but can deduct half of it.' },
    ],
    quiz: {
      topic: 'FICA taxes',
      questions: [
        {
          q: 'What is the total FICA employee rate, and how is it divided between Social Security and Medicare?',
          options: ['Total FICA employee rate is 12.4%, split as 10.2% Social Security and 2.2% Medicare', 'Total FICA employee rate is 7.65%, split as 6.2% Social Security and 1.45% Medicare, with Social Security capped at the annual wage base', 'Total FICA employee rate is 15.3%, split evenly between Social Security and Medicare, with no cap on either component', 'Total FICA employee rate is 5.65%, covering only Medicare; Social Security is funded separately through employer payroll accounts'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition states the total employee FICA rate is 7.65%: 6.2% for Social Security and 1.45% for Medicare. Social Security is capped at the annual wage base ($176,100 in 2025); Medicare has no cap.',
        },
        {
          q: 'From the worked examples table, what is the total employee FICA withholding on $100,000 in gross wages?',
          options: ['$6,200 (Social Security only, before Medicare is added)', '$6,925 (Social Security plus a partial Medicare contribution)', '$13,818 (the total FICA shown for the $200,000 wage row)', '$7,650 (6.2% Social Security plus 1.45% Medicare = 7.65% x $100,000)'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The examples table shows $7,650 total FICA for $100,000 in gross wages ($6,200 Social Security + $1,450 Medicare). The employer matches this same $7,650, making the combined FICA contribution $15,300 on that salary.',
        },
        {
          q: 'According to the definition, what self-employment tax rate do self-employed individuals pay, and what tax relief is available?',
          options: ['Self-employed individuals pay 15.3% self-employment tax on net self-employment income (both employee and employer FICA halves), but can deduct half (7.65%) from gross income when calculating federal income tax', 'Self-employed individuals pay only the employee half (7.65%) because they have no employer to make the matching contribution on their behalf', 'Self-employed individuals are exempt from FICA; they fund Social Security and Medicare solely through estimated income tax quarterly payments', 'Self-employed individuals pay 12.4% self-employment tax and can deduct the full amount from their adjusted gross income'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition states that self-employed individuals pay the full 15.3% self-employment tax (both halves). To offset the extra burden, the IRS allows them to deduct half (7.65%) from gross income when calculating federal income tax.',
        },
        {
          q: 'What does the pitfalls section warn about the Additional Medicare Tax of 0.9%?',
          options: ['The Additional Medicare Tax of 0.9% is split equally between employee and employer, just like the standard 1.45% Medicare rate', 'The Additional Medicare Tax of 0.9% applies to all wages from the first dollar, not just wages above a threshold', 'The Additional Medicare Tax of 0.9% on wages above $200,000 (single filers) is paid only by the employee - the employer does not match it, and many paycheck calculators omit this line item', 'The Additional Medicare Tax threshold is fixed at $200,000 for all filing statuses, including married filing jointly filers'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section explicitly warns that the 0.9% Additional Medicare Tax on wages above $200,000 (single) is paid only by the employee - the employer does not match it. The threshold for married filing jointly is $250,000, not $200,000.',
        },
        {
          q: 'According to the FAQ, which workers may qualify for a FICA exemption?',
          options: ['All full-time employees working for government agencies or non-profit organisations are automatically exempt from FICA withholding', 'Some limited exemptions apply, including student workers employed by their own university, members of certain religious groups who have formally opted out, and non-resident aliens on specific visa types', 'Self-employed individuals and independent contractors are fully exempt from FICA because they do not receive W-2 wages', 'All employees earning below the Social Security wage base are exempt from Medicare tax but still pay Social Security'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ states that while most W-2 employees cannot avoid FICA, some limited exemptions exist: student workers at their own university, members of certain religious groups who have formally opted out, and non-resident aliens on specific visa types. Self-employed individuals still owe FICA as self-employment tax.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'mfj': {
    definition: [
      'Married Filing Jointly (MFJ) is a US federal income tax filing status available to legally married couples. Both spouses\' income, deductions, and credits are combined on a single tax return. MFJ uses wider tax brackets than single filers - in 2025, the 22% bracket for MFJ starts at $94,300 compared to $47,150 for single filers. The standard deduction is also double: $30,000 MFJ versus $15,000 single in 2025. For most couples where one spouse earns significantly more than the other, MFJ produces a lower combined tax bill than filing separately.',
      'The MFJ benefit is largest when income is unequal between spouses. If one partner earns $120,000 and the other earns $0, filing jointly keeps the higher income in lower brackets. When both spouses earn similar high incomes, the so-called "marriage penalty" can arise - their combined income pushes them into higher brackets than they would face as two single filers. The marriage penalty is most pronounced in the 32%, 35%, and 37% brackets where MFJ thresholds are less than double the single thresholds.',
      'MFJ is one of four federal filing statuses: single, married filing jointly, married filing separately (MFS), and head of household (HoH). Most married couples choose MFJ because it provides broader brackets and a higher standard deduction than MFS. Filing separately is sometimes advantageous when one spouse has significant medical expenses (subject to a 7.5% AGI floor), student loan income-driven repayment plans, or legal liability concerns.',
    ],
    whenToUse: 'Use MFJ if you are legally married and want the lowest combined federal tax bill in most situations. Run a comparison with married filing separately if one spouse has high medical expenses, significant miscellaneous deductions, or an income-driven student loan repayment plan that benefits from a lower individual AGI.',
    examples: {
      headers: ['Filing status', '$180,000 combined income', 'Standard deduction', 'Taxable income', 'Estimated federal tax'],
      rows: [
        ['Single x2 (each $90,000)', 'Two separate returns', '$15,000 x2 = $30,000', '$75,000 each', '~$12,615 each = $25,230 total'],
        ['Married Filing Jointly', 'One joint return', '$30,000', '$150,000 combined', '~$24,183 total'],
        ['Married Filing Separately', 'Two separate returns', '$15,000 x2', '$75,000 each', '~$12,615 each = $25,230 total'],
      ],
    },
    pitfalls: 'Both spouses are jointly and severally liable for taxes, interest, and penalties on an MFJ return - even if only one spouse earned the income or made an error. If you have concerns about a spouse\'s tax compliance, consider filing separately to protect yourself from their tax liabilities. Also note that some tax benefits phase out at lower thresholds for MFJ filers than for single filers (e.g. Roth IRA contribution limits).',
    faqs: [
      { q: 'Does Married Filing Jointly always save taxes?', a: 'No. For two high earners with similar incomes, MFJ can trigger a "marriage penalty" where combined brackets are higher than filing as two single people. This is most pronounced in the 32-37% federal brackets and in states like California. For couples with very unequal incomes (one high earner, one low or non-earner), MFJ almost always saves taxes.' },
      { q: 'Can I file jointly if my spouse has no income?', a: 'Yes. You can file MFJ even if one spouse had zero income, did not work, or did not file individually. The non-earning spouse still signs the joint return. This is often the most tax-efficient option for couples with a stay-at-home partner.' },
      { q: 'What is the difference between MFJ and MFS?', a: 'Married Filing Jointly combines both spouses\' income on one return, uses wider brackets, and doubles the standard deduction. Married Filing Separately (MFS) treats each spouse as nearly independent - each uses single-style brackets and a lower standard deduction. MFS is rarely advantageous for federal taxes but may reduce individual AGI for income-driven student loan repayment calculations or when one spouse has large deductions subject to AGI-based floors.' },
    ],
    quiz: {
      topic: 'Married Filing Jointly',
      questions: [
        {
          q: 'What are the two main tax advantages of Married Filing Jointly (MFJ) over single filing in 2025?',
          options: ['MFJ allows both spouses to claim their individual standard deductions separately, doubling the total amount shielded from tax', 'MFJ grants a $5,000 spousal credit on top of the standard deduction and reduces the effective rate by 3 percentage points for income over $50,000', 'MFJ provides a $30,000 standard deduction (versus $15,000 for single) and uses wider tax brackets - the 22% bracket starts at $94,300 MFJ versus $47,150 for single filers in 2025', 'MFJ merges both spouses\' Social Security credits into one account, permanently reducing their combined FICA obligations and payroll tax burden'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition states the 2025 standard deduction is $30,000 for MFJ versus $15,000 for single, and the 22% bracket for MFJ starts at $94,300 compared to $47,150 for single filers - two structural advantages that reduce the combined tax bill for most couples.',
        },
        {
          q: 'When does MFJ trigger a "marriage penalty" and in which brackets is it most pronounced?',
          options: ['A marriage penalty arises when both spouses earn similar high incomes, pushing combined income into higher brackets than they would face as two separate single filers - most pronounced in the 32-37% brackets where MFJ thresholds are less than double the single thresholds', 'A marriage penalty always occurs in the first year of marriage because the IRS requires a one-time adjustment for the change from single to MFJ filing status', 'A marriage penalty applies only to couples with combined income above $500,000, triggering an automatic 3% surcharge on all joint returns above that threshold', 'The marriage penalty affects MFJ filers who claim the standard deduction instead of itemising, because the standard deduction for MFJ is less than twice the single amount'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition explains the marriage penalty arises when both spouses earn similar high incomes - combined income pushes them into higher brackets than two single filers would face. It is most pronounced in the 32%, 35%, and 37% brackets where MFJ thresholds are less than double the single thresholds.',
        },
        {
          q: 'According to the examples table, what is the estimated federal tax for a couple with $180,000 combined income under MFJ versus MFS?',
          options: ['MFJ: ~$30,000 total; MFS: ~$25,230 total - showing MFS saves about $4,770 for this income level', 'MFJ: ~$24,183 total; MFS: ~$21,230 total - showing MFS saves about $2,953 for this income level', 'MFJ: ~$28,500 total; MFS: ~$25,230 total - showing MFS saves about $3,270 in the higher income brackets', 'MFJ: ~$24,183 total; MFS: ~$25,230 total - showing MFJ saves about $1,047 compared to filing separately'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The examples table shows MFJ produces ~$24,183 in federal tax versus ~$25,230 under MFS for $180,000 combined income - a saving of about $1,047. The MFS result equals two separate single-filer returns, each paying ~$12,615 on $75,000 of taxable income.',
        },
        {
          q: 'What liability risk does the pitfalls section warn about for MFJ filers?',
          options: ['MFJ returns are audited 2.5x more often than separate returns because the combined income triggers higher IRS scrutiny thresholds', 'Both spouses are jointly and severally liable for all taxes, interest, and penalties on an MFJ return - even if only one spouse earned the income or made an error. Concerns about a spouse\'s tax compliance are a valid reason to file separately', 'MFJ filers cannot claim the standard deduction if either spouse had self-employment income; both must itemize, which is often disadvantageous for couples with limited deductible expenses', 'The MFJ standard deduction is recaptured if the couple later divorces, triggering a retroactive tax adjustment for prior years the status was claimed'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section warns that both spouses are jointly and severally liable for all taxes, interest, and penalties on an MFJ return - even if only one spouse earned the income or made an error. It specifically recommends filing separately to protect yourself if you have concerns about a spouse\'s tax compliance.',
        },
        {
          q: 'According to the FAQs, when is Married Filing Separately (MFS) actually advantageous over MFJ?',
          options: ['MFS is always better when both spouses have similar incomes, because splitting into two separate returns keeps each income in the lowest possible bracket regardless of total household earnings', 'MFS is better whenever one spouse has any self-employment income, because it prevents the higher earner\'s income from inflating the combined SE tax calculation', 'MFS may be advantageous when one spouse has an income-driven student loan repayment plan (keeping individual AGI lower reduces monthly payments) or when one spouse has large unreimbursed medical expenses relative to their own income', 'MFS is better for all married couples whose combined income exceeds $200,000, because the AMT threshold for MFJ is lower than for two single filers above that level'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ states MFS is rarely advantageous for federal taxes but may help when one spouse has an income-driven student loan repayment plan (lower individual AGI reduces monthly payments) or large unreimbursed medical expenses (subject to a 7.5% AGI floor that is easier to clear with a lower individual AGI).',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'mfs': {
    definition: [
      'Married Filing Separately (MFS) is a US federal tax filing status that lets married couples file independent returns instead of a joint return. Each spouse reports only their own income, deductions, and credits. MFS uses the same bracket thresholds as single filers and the same $15,000 standard deduction. Because MFJ brackets are designed for two incomes and are roughly double the single thresholds, choosing MFS over MFJ almost always raises the combined tax bill for a couple.',
      'MFS does, however, have specific strategic uses. For borrowers on income-driven student loan repayment plans (IBR, SAVE, PAYE), MFS excludes the other spouse\'s income from the repayment calculation, which can cut monthly loan payments significantly - sometimes enough to outweigh the higher tax cost. MFS can also reduce the AGI of the spouse with large medical expenses: since unreimbursed medical costs are only deductible above 7.5% of your own AGI, a lower individual AGI means a lower floor.',
      'Several tax benefits are completely unavailable under MFS: the Earned Income Credit, the child and dependent care credit, the American Opportunity Tax Credit, the Lifetime Learning Credit, and most education deductions. The Roth IRA contribution limit phases out between $0 and $10,000 MAGI for MFS filers (versus $150,000-$165,000 for single filers in 2025). One additional restriction: if one spouse itemizes deductions, the other must also itemize - they cannot mix strategies.',
    ],
    whenToUse: 'Consider MFS when one spouse is on an income-driven student loan repayment plan and keeping their AGI low materially reduces monthly payments. Also consider it when one spouse has large unreimbursed medical expenses relative to their own income, or when there are legal or liability concerns about signing a joint return. In all other cases, compare the exact tax liability under both statuses before deciding - MFJ is usually lower.',
    examples: {
      headers: ['Scenario', 'Filing status', 'Annual income', 'Est. federal tax', 'Key tradeoff'],
      rows: [
        ['Equal earners, $80K each', 'MFS', '$80,000 each', '~$10,463 each = ~$20,926 total', 'No Earned Income Credit'],
        ['Equal earners, $80K each', 'MFJ', '$160,000 combined', '~$20,405 total', 'Saves ~$521; gains all credits'],
        ['$50K + $50K student loan debt', 'MFS', '$50,000 own income', 'Higher tax but loan payment ~$280/mo', 'SAVE plan based on $50K only'],
        ['$50K + $50K student loan debt', 'MFJ', '$100,000 combined', 'Lower tax but loan payment ~$560/mo', 'SAVE plan based on $100K combined'],
      ],
    },
    pitfalls: 'The biggest mistake with MFS is not running both scenarios side by side. Many filers assume MFS saves money because they want separate returns, without realising they lose the Earned Income Credit, child care credits, and Roth IRA access. The Roth IRA phase-out for MFS starts at $0 MAGI - meaning nearly all MFS filers earning any income are barred from contributing. Also, if your spouse itemises, you must too, even if the standard deduction would be larger for you individually.',
    faqs: [
      { q: 'When does Married Filing Separately actually save money?', a: 'The main scenario is income-driven student loan repayment. If one spouse has large federal student loans on an IBR or SAVE plan, filing separately keeps the other\'s income out of the payment calculation. The loan payment reduction sometimes exceeds the extra tax cost. A second scenario is when one spouse has unusually large unreimbursed medical expenses relative to their own income.' },
      { q: 'Does filing separately hurt your credit score?', a: 'No. Filing status appears only on your tax return and is not reported to credit bureaus. Your credit score is based on debt repayment history, credit utilisation, and account age - none of which are affected by whether you file jointly or separately.' },
      { q: 'Can I switch from MFS to MFJ after filing?', a: 'Yes. You can amend a separately filed return to a joint return by filing an amended return before the three-year statute of limitations expires. However, you cannot amend a joint return to two separate returns after the original filing deadline has passed.' },
      { q: 'Does MFS affect Social Security benefits?', a: 'Indirectly. Social Security benefits become taxable once your combined income (AGI plus non-taxable interest plus half of Social Security) exceeds $25,000 for single or MFS filers - which is lower than the $32,000 MFJ threshold. Filing separately can result in more of your Social Security being taxable if your combined income would have been below the $32,000 MFJ threshold.' },
    ],
    quiz: {
      topic: 'Married Filing Separately',
      questions: [
        {
          q: 'How do MFS bracket thresholds compare to MFJ, and what does this mean for most couples?',
          options: ['MFS uses half the MFJ bracket thresholds, making it the most favorable status for single-income households where one spouse earns significantly more', 'MFS uses entirely different brackets specially designed for couples who prefer separate returns, typically producing the same combined tax as MFJ', 'MFS uses identical bracket thresholds to MFJ but splits them equally, so each spouse pays tax as if earning half of the combined household income', 'MFS uses the same bracket thresholds as single filers and the same $15,000 standard deduction, so choosing MFS over MFJ almost always raises the combined tax bill'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The definition states MFS uses the same bracket thresholds as single filers and the same $15,000 standard deduction. Because MFJ brackets are designed for two incomes and are roughly double the single thresholds, MFS almost always raises the combined tax bill.',
        },
        {
          q: 'From the examples table, what is the tax comparison for two equal earners at $80,000 each under MFS vs MFJ?',
          options: ['Equal earners ($80K each) pay ~$20,926 total under MFS vs ~$20,405 under MFJ, saving ~$521 with MFJ plus regaining access to credits like the Earned Income Credit', 'Equal earners ($80K each) pay ~$20,405 under MFS vs ~$20,926 under MFJ, saving ~$521 with MFS while keeping full independence on each return', 'Equal earners ($80K each) pay identical totals under MFS and MFJ; the only meaningful difference is credit eligibility, not the tax liability itself', 'Equal earners ($80K each) pay ~$15,200 total under MFS vs ~$20,926 under MFJ, a difference of over $5,700 driven by the bracket structure'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The examples table shows equal earners at $80K each pay ~$10,463 each under MFS, totaling ~$20,926, versus ~$20,405 under MFJ. MFJ saves ~$521 and also restores access to credits like the Earned Income Credit.',
        },
        {
          q: 'In the student loan scenario from the examples table, why might MFS produce a better overall outcome despite higher taxes?',
          options: ['MFS prevents the non-borrowing spouse\'s wages from being garnished if the borrower defaults, protecting household income regardless of the repayment plan type', 'On a SAVE plan, MFS bases the monthly payment on $50K individual income (~$280/mo) rather than $100K combined (~$560/mo), potentially cutting the payment by $280/mo in a way that outweighs the extra tax cost', 'MFS allows the borrower to deduct 100% of student loan interest with no income cap, whereas MFJ phases out the deduction above $85,000 combined income', 'MFS automatically qualifies the borrowing spouse for Public Service Loan Forgiveness regardless of employer, which is unavailable under MFJ'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The examples table shows a SAVE plan borrower earning $50K pays ~$280/mo under MFS (based on $50K) vs ~$560/mo under MFJ (based on $100K combined). The definition notes this loan payment reduction sometimes exceeds the extra tax cost.',
        },
        {
          q: 'What is the Roth IRA phase-out range for MFS filers, and why does this matter?',
          options: ['The Roth IRA phase-out for MFS is identical to single filers ($150,000-$165,000 MAGI), so most MFS filers retain full Roth contribution ability', 'MFS filers can contribute to a Roth IRA up to a $10,000 ceiling, after which contributions are capped at 50% of the normal limit until fully phased out at $25,000 MAGI', 'The Roth IRA phase-out for MFS starts at $0 MAGI, meaning nearly all MFS filers earning any income are effectively barred from contributing to a Roth IRA', 'MFS has no effect on Roth IRA eligibility; the $7,000 annual limit and standard phase-out thresholds apply regardless of filing status for married taxpayers'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section states the Roth IRA phase-out for MFS starts at $0 MAGI and phases out by $10,000 - meaning nearly all MFS filers earning any income are barred from contributing, compared to the $150,000-$165,000 range for single filers.',
        },
        {
          q: 'How does MFS affect the taxation of Social Security benefits compared to MFJ?',
          options: ['MFS has no effect on Social Security taxation since benefits are assessed at the household level regardless of how each spouse files their return', 'MFS increases the Social Security taxation threshold from $25,000 to $32,000 per spouse, allowing each to exclude more benefits than single filers', 'MFS automatically exempts 50% of Social Security benefits from federal tax for retirees below a combined household income of $44,000', 'Under MFS, Social Security becomes taxable once income exceeds $25,000 (the same as single), versus $32,000 under MFJ, so couples below the $32,000 MFJ threshold may end up with more benefits taxed by filing separately'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The FAQ states that Social Security benefits become taxable above $25,000 for MFS filers - the same threshold as single, and lower than the $32,000 MFJ threshold. Couples whose combined income falls below $32,000 can end up with more Social Security taxed by choosing MFS.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'hoh': {
    definition: [
      'Head of Household (HOH) is a US federal tax filing status for unmarried taxpayers who financially support a qualifying person in their home. To qualify, you must be unmarried (or considered unmarried) on December 31, have paid more than half the cost of maintaining a home, and have a qualifying child or dependent who lived with you for more than half the year. A qualifying parent who does not live with you is also allowed.',
      'HOH provides meaningfully better tax treatment than single filing. The 2025 standard deduction is $22,500 for HOH versus $15,000 for single - a $7,500 difference that alone saves $825 to $1,650 in tax depending on your bracket. HOH brackets are also wider: the 10% rate applies up to $17,000 (vs $11,925 for single) and the 12% bracket runs to $64,850 (vs $48,475 for single). For a single parent earning $55,000, filing HOH instead of single typically saves $1,500-$2,500 per year.',
      'Married filers can qualify for HOH if they are considered unmarried - meaning they lived apart from their spouse for all of the last six months of the tax year, paid more than half the home costs, and had a qualifying child. This rule helps separated spouses who have not yet completed a divorce but are effectively living as single parents. Legal marital status alone does not prevent HOH if the considered-unmarried test is met.',
    ],
    whenToUse: 'Use HOH if you are unmarried (or considered unmarried), paid more than half the cost of your home, and a qualifying child lived with you for more than six months. It is the most advantageous status available to single parents. Always verify the qualifying-person requirements before claiming HOH - the IRS audits HOH claims regularly, and incorrect filing can trigger back taxes, penalties, and a two-year ban on claiming the status.',
    examples: {
      headers: ['Tax rate', 'Single (2025)', 'Head of Household (2025)', 'HOH advantage'],
      rows: [
        ['10%', '$0 - $11,925', '$0 - $17,000', 'Extra $5,075 taxed at 10% instead of 12%'],
        ['12%', '$11,925 - $48,475', '$17,000 - $64,850', 'Extra $16,375 taxed at 12% instead of 22%'],
        ['22%', '$48,475 - $103,350', '$64,850 - $103,350', 'Same upper threshold'],
        ['Standard deduction', '$15,000', '$22,500', '$7,500 more deducted before any tax'],
      ],
    },
    pitfalls: 'The most common error is claiming HOH without a qualifying person. Your sibling, parent, or adult child may qualify - but only if they meet specific residency, age, and support tests. A second pitfall involves divorced parents: only the custodial parent (the one with whom the child lives for more nights during the year) can claim HOH. The noncustodial parent may be able to claim the child as a dependent via Form 8332, but this does not transfer HOH status. Incorrectly claiming HOH can result in repayment of taxes, a 20% accuracy penalty, and a two-year ban from claiming the status.',
    faqs: [
      { q: 'Can I file as Head of Household if I am still legally married?', a: 'Yes, if you are considered unmarried. To qualify, you must have lived apart from your spouse for all of the last six months of the year, paid more than half the cost of maintaining a home, and have a qualifying child who lived with you for more than half the year. Legal separation or pending divorce is not required - physical separation is.' },
      { q: 'Does my qualifying child need to be my biological child?', a: 'No. A qualifying child for HOH purposes can be your biological child, stepchild, adopted child, foster child, sibling, step-sibling, or a descendant of any of these. The key tests are age (under 19, or under 24 if a full-time student), residency (lived with you more than half the year), and support (the child did not provide more than half of their own support).' },
      { q: 'What is the difference between HOH and single filing status?', a: 'HOH provides a $22,500 standard deduction versus $15,000 for single, and uses wider tax brackets. For a filer with $60,000 of taxable income before the deduction, HOH saves roughly $2,000-$3,000 in federal income tax compared to single filing. The trade-off is that HOH requires meeting strict qualifying-person and household cost tests.' },
      { q: 'Can two parents in the same household both claim Head of Household?', a: 'Only if they have different qualifying children. Two unmarried parents living together can each file HOH if each claims a different child as their qualifying person and each independently paid more than half the cost of maintaining that child\'s home. They cannot both claim HOH using the same child.' },
    ],
    quiz: {
      topic: 'Head of Household',
      questions: [
        {
          q: 'What are the three core requirements to file as Head of Household (HOH)?',
          options: ['You must be divorced with a final court order, have a dependent child, and have paid all housing costs for the full calendar year', 'You must be widowed within the last two years, have at least one dependent listing you as custodial parent, and file before the April deadline', 'You must be unmarried (or considered unmarried), have paid more than half the cost of maintaining a home, and have a qualifying person who lived with you for more than half the year', 'You must have earned income below $100,000, lived apart from any spouse for the full calendar year, and claimed at least two dependents on your return'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition lists three requirements: be unmarried (or considered unmarried) on December 31, have paid more than half the home maintenance cost, and have a qualifying child or dependent who lived with you for more than half the year.',
        },
        {
          q: 'How does the 2025 HOH standard deduction compare to single filing status?',
          options: ['HOH offers a $22,500 standard deduction versus $15,000 for single, giving $7,500 more income shielded from tax before any brackets apply', 'HOH offers a $20,000 standard deduction versus $15,000 for single, a $5,000 difference applied before bracket calculations', 'HOH and single share the same $15,000 standard deduction, but HOH gets a separate $7,500 dependent credit applied after bracket calculations', 'HOH offers a $25,000 standard deduction versus $20,000 for single, matching the Married Filing Jointly deduction for two-income households'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition states the 2025 standard deduction is $22,500 for HOH versus $15,000 for single - a $7,500 difference that alone saves $825 to $1,650 in tax depending on your bracket.',
        },
        {
          q: 'According to the 2025 bracket table, at what income level does the HOH 10% bracket top out?',
          options: ['$11,925 - the same upper threshold as the single filing 10% bracket', '$15,000 - aligned with the single standard deduction, creating a natural tax threshold', '$22,500 - the full HOH standard deduction amount, aligning bracket boundaries with the deduction', '$17,000 - giving $5,075 more income taxed at 10% instead of the higher 12% rate compared to single filing'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The examples table shows the HOH 10% bracket runs from $0 to $17,000, versus $0 to $11,925 for single. This means an extra $5,075 is taxed at 10% rather than 12%, one of the concrete advantages of HOH status.',
        },
        {
          q: 'In a divorce, which parent can claim Head of Household status on their federal return?',
          options: ['Both parents can each claim HOH as long as they live in separate households and each contributes more than 25% of the child\'s annual expenses', 'Only the custodial parent - the one with whom the child lives for more nights during the year. The noncustodial parent may claim the child as a dependent via Form 8332, but this does not transfer HOH status', 'The parent who earns the higher income is automatically assigned HOH status by the IRS based on prior-year W-2 records, regardless of custody arrangements', 'Either parent can claim HOH as long as both parties sign a written agreement and submit it with their federal return'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section explains that only the custodial parent can claim HOH. The noncustodial parent may receive dependency via Form 8332, but the pitfalls section is explicit that this does not transfer HOH status.',
        },
        {
          q: 'Under what condition can two unmarried parents living in the same household both file as Head of Household?',
          options: ['Never - the IRS assigns HOH to only one adult per physical address, automatically going to the higher earner', 'Yes, always - as long as the household has at least two children, regardless of which parent primarily cares for each child', 'Yes, but only if they have different qualifying children and each independently paid more than half the cost of maintaining that child\'s home', 'No - two adults sharing the same mailing address are automatically treated as Married Filing Separately, disqualifying both from HOH'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ states that two unmarried parents in the same household can each file HOH only if each claims a different child as their qualifying person and each independently paid more than half the cost of maintaining that child\'s home. They cannot both use the same child.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'marginal-tax-rate': {
    definition: [
      'The marginal tax rate is the tax rate applied to the last dollar of income you earn - the rate for the highest bracket you have reached. The US federal income tax system is progressive: income is split into brackets, and each bracket\'s rate applies only to the portion of income that falls within that range. In 2025, a single filer earning $60,000 reaches the 22% bracket, but only the income above $48,475 is taxed at 22%. Income in lower brackets is taxed at 10% and 12% respectively.',
      'Because only the marginal income is taxed at the marginal rate, your effective tax rate (total tax divided by total income) is always lower than your marginal rate whenever you span more than one bracket. For the same $60,000 single filer, total 2025 federal income tax works out to roughly $8,100 - an effective rate of about 13.5%, well below the 22% marginal rate. The gap widens at higher incomes because a larger share of income sits in lower brackets.',
      'Marginal tax rate matters most for decisions about additional income. A freelance project, a capital gain, or a year-end bonus will be taxed at your marginal rate (since it adds to income you\'ve already earned). Contributions to a traditional 401(k) or IRA reduce taxable income from the top, so each dollar contributed saves tax at your marginal rate. Knowing your marginal rate turns abstract tax planning into a concrete dollar calculation.',
    ],
    beginnerExplain: [
      'Think of a stadium with tiered ticket prices: the first 12,000 seats cost $10 each, the next 36,000 cost $12 each, and seats above that cost $22 each. If you buy 60,000 seats total, you pay $10 on the first 12,000, $12 on the next 36,000, and $22 on the last 12,000 - you are not charged $22 on all 60,000 seats just because you bought into that tier. That highest tier price ($22) is your marginal rate. The average you actually paid per seat is much lower.',
      'Your tax bracket works the same way. A 22% marginal rate means your last dollar was taxed at 22% - not that you owe 22% of your entire income. The IRS taxes your first dollars at 10%, the next slice at 12%, and only the income above the 22% threshold at 22%. Your effective rate is always the weighted average across all the tiers you used.',
    ],
    whenToUse: 'Use your marginal tax rate when evaluating additional income: a bonus, freelance payment, stock option exercise, or Roth conversion adds income at the top, so it is taxed at your marginal rate. Use it when deciding how much a tax-deductible expense (mortgage interest, 401(k) contribution, HSA contribution) saves in real dollars - a $5,000 deduction at a 22% marginal rate saves exactly $1,100. Do not use it to estimate total tax owed - use effective rate for that.',
    examples: {
      headers: ['2025 Bracket (Single)', 'Income range', 'Rate', 'Tax on this portion'],
      rows: [
        ['1st bracket', '$0 - $11,925', '10%', 'Up to $1,193'],
        ['2nd bracket', '$11,926 - $48,475', '12%', 'Up to $4,386'],
        ['3rd bracket', '$48,476 - $103,350', '22%', 'Up to $12,075'],
        ['4th bracket', '$103,351 - $197,300', '24%', 'Up to $22,548'],
        ['5th bracket', '$197,301 - $250,525', '32%', 'Up to $17,031'],
        ['6th bracket', '$250,526 - $626,350', '35%', 'Up to $131,558'],
        ['7th bracket', 'Over $626,350', '37%', 'On every dollar above'],
      ],
    },
    pitfalls: 'The most common misunderstanding is the "bracket trap" myth: people believe that earning just enough to cross into a higher bracket will result in less take-home pay because "all their income" gets taxed at the higher rate. This is incorrect. Crossing a bracket threshold never reduces net income - only the marginal dollars above the threshold are taxed at the higher rate. Earning one more dollar always increases take-home pay, even if that dollar crosses a bracket. A separate real effect is marginal rate on benefits phase-outs (e.g. child tax credit, EV credits, student loan deduction), where the effective marginal rate on a specific dollar of income can temporarily spike above the nominal bracket rate.',
    faqs: [
      { q: 'What is the difference between marginal tax rate and effective tax rate?', a: 'Marginal rate is the rate on your last dollar of income - the top bracket you\'ve reached. Effective rate is total tax paid divided by total income. For a single filer earning $60,000 in 2025, the marginal rate is 22% but the effective federal rate is roughly 13.5%. Effective rate is always lower than marginal rate for anyone spanning more than one bracket.' },
      { q: 'Does earning more money ever reduce my take-home pay?', a: 'No. In a standard progressive bracket system, earning one more dollar always increases net pay - only that marginal dollar is taxed at the higher rate, not your previous income. The "bracket trap" is a myth. The exception is income-tested benefits that phase out sharply (e.g. premium tax credits, child tax credits), where the effective marginal rate on specific income ranges can temporarily spike.' },
      { q: 'What is the highest US federal marginal income tax rate?', a: 'The top federal income tax rate for individuals is 37% in 2025, applying to single filers earning above $626,350 and married couples filing jointly earning above $751,600. This has remained at 37% since the Tax Cuts and Jobs Act of 2017 lowered it from 39.6%. Most states add their own income tax on top of the federal rate.' },
      { q: 'How does my marginal tax rate affect the value of a 401(k) contribution?', a: 'A traditional 401(k) contribution reduces your taxable income from the top, so each dollar contributed saves tax at your current marginal rate. At a 22% marginal rate, a $5,000 contribution saves $1,100 in federal income tax this year. At 32%, the same contribution saves $1,600. This is why high earners get more immediate tax benefit from pre-tax contributions than lower earners.' },
      { q: 'Do state income taxes have marginal rates too?', a: 'Most states with income tax use a progressive bracket system with their own marginal rates, which stack on top of federal brackets. California\'s top marginal rate is 13.3%, giving a combined federal and state marginal rate of 50.3% for the highest earners. Nine states have no income tax at all. The US Income Tax Calculator covers all 50 states and shows combined effective and marginal rates.' },
    ],
    quiz: {
      topic: 'marginal tax rate',
      questions: [
        {
          q: 'A single filer earns $60,000 in 2025. Their highest bracket is 22%. What does this mean?',
          options: ['They owe 22% of the full $60,000 in federal income tax', 'Only the income above $48,475 is taxed at 22%; lower income is taxed at 10% and 12%', 'Their effective tax rate is 22%', 'They will pay more total tax than a filer earning $48,000 at 12%'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition explains that only income above each bracket threshold is taxed at the higher rate. The first $11,925 is taxed at 10%, the next slice at 12%, and only the income above $48,475 is taxed at 22%. The marginal rate applies to the last bracket, not the full income.',
        },
        {
          q: 'Using the 2025 bracket table, what is the total federal income tax for a single filer earning exactly $48,475?',
          options: ['$5,816', '$1,193 + $4,386 = $5,579', '$48,475 x 12% = $5,817', '$48,475 x 10% = $4,848'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'At $48,475, the filer is at the top of the 12% bracket. Tax = 10% on $11,925 ($1,193) + 12% on ($48,475 - $11,925) = $36,550 x 12% = $4,386. Total: $1,193 + $4,386 = $5,579. No 22% tax applies because income does not exceed $48,475.',
        },
        {
          q: 'What happens to your take-home pay when your income crosses from the 12% bracket into the 22% bracket?',
          options: ['Take-home pay falls because your entire income is now taxed at 22%', 'Take-home pay is unchanged - bracket changes have no effect until year end', 'Take-home pay still increases because only the income above the threshold is taxed at 22%', 'Take-home pay falls by the bracket rate difference (22% minus 12% = 10%) applied to total income'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section explains the "bracket trap" myth directly: only the marginal income above the threshold is taxed at the higher rate. Earning one more dollar always increases take-home pay - crossing a bracket threshold never reduces net income.',
        },
        {
          q: 'A taxpayer in the 24% federal bracket makes a $6,000 traditional IRA contribution. How much does this save in federal income tax?',
          options: ['$720', '$1,440', '$1,200', '$960'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ explains that a traditional retirement contribution reduces taxable income from the top, saving tax at the marginal rate. $6,000 x 24% = $1,440 in federal income tax saved. The higher your marginal rate, the more valuable each pre-tax dollar contributed.',
        },
        {
          q: 'According to the FAQ, what is the top US federal marginal income tax rate in 2025, and which law set it?',
          options: ['39.6%, set by the Affordable Care Act in 2010', '37%, set by the Tax Cuts and Jobs Act of 2017', '35%, set by the Economic Growth and Tax Relief Reconciliation Act of 2001', '40.8%, set by the Inflation Reduction Act of 2022'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ states the top federal rate is 37% in 2025, and has remained at 37% since the Tax Cuts and Jobs Act of 2017 lowered it from the previous 39.6%. It applies to single filers earning above $626,350.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
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
    quiz: {
      topic: 'regular rate of pay',
      questions: [
        {
          q: 'What is the regular rate of pay used for?',
          options: ['Setting the minimum wage floor for a given industry or region', 'Calculating the baseline hourly rate to determine correct overtime compensation under the FLSA', 'Determining the gross annual salary for tax filing purposes', 'Setting the shift differential multiplier for night or weekend work'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition states the regular rate of pay is the baseline hourly rate used to calculate overtime compensation under the FLSA. It must include most forms of compensation before the 1.5x multiplier is applied.',
        },
        {
          q: 'An hourly worker earns $800 base pay plus a $100 non-discretionary bonus in a 40-hour week. What is their regular rate?',
          options: ['$20.00/hr - only the base hourly wage counts', '$22.50/hr - ($800 + $100) / 40 hours', '$21.00/hr - the bonus is averaged over a standard 48-hour work model', '$25.00/hr - the bonus is doubled under FLSA bonus rules'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The examples table shows that hourly workers with a $100 bonus have a total weekly pay of $900 ($800 base + $100 bonus), divided by 40 hours = $22.50/hr regular rate. Non-discretionary bonuses must be included before calculating overtime.',
        },
        {
          q: 'Which of the following is EXCLUDED from the regular rate of pay calculation?',
          options: ['Shift differentials paid for working evenings or weekends', 'Non-discretionary bonuses tied to attendance or production goals', 'Purely discretionary bonuses paid at the employer\'s sole discretion', 'Commission pay earned during the workweek'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition specifies that the regular rate must include base wages, shift differentials, and non-discretionary bonuses, but excludes purely discretionary bonuses, overtime premiums already paid, and certain benefit payments.',
        },
        {
          q: 'What common employer mistake does the pitfalls section warn against?',
          options: ['Using the regular rate to calculate deductions instead of overtime', 'Calculating overtime using base wage only and ignoring bonuses or shift differentials', 'Applying a 2x multiplier when only 1.5x is legally required', 'Dividing the weekly salary by 45 hours instead of 40 hours for salaried workers'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section states many employers mistakenly calculate overtime using base wage only, ignoring bonuses or shift differentials. This understates the regular rate and results in underpayment of overtime - an FLSA violation.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'heffingskorting': {
    definition: [
      'A heffingskorting is a Dutch tax credit that reduces the income tax owed - not the taxable income. This makes it more valuable than a deduction: a €1,000 credit saves exactly €1,000 in tax regardless of your bracket, whereas a €1,000 deduction saves only €355-€495 depending on which bracket you are in.',
      'The two main heffingskortingen for employees are the algemene heffingskorting (general tax credit) and the arbeidskorting (employment credit). Both are calculated as a function of income and phase out at higher incomes. They are applied after Box 1 income tax is computed.',
    ],
    whenToUse: 'Use when calculating Dutch net salary from gross. Both credits reduce your final income tax bill. If the combined credits exceed your income tax, the excess is generally not refundable - you cannot pay negative tax. Use the Netherlands income tax calculator to compute your exact credits automatically.',
    examples: {
      headers: ['Gross income', 'Box 1 tax', 'AHK credit', 'AK credit', 'Net tax'],
      rows: [
        ['€40,000', '€14,175', '€1,628', '€5,685', '€6,862'],
        ['€60,000', '€21,832', '€1,178', '€4,747', '€15,907'],
        ['€80,000', '€32,010', '€0', '€2,109', '€29,901'],
      ],
    },
    pitfalls: 'The heffingskortingen are non-refundable: they can reduce income tax to zero but cannot generate a cash refund on their own. They also phase out - higher earners receive smaller credits. Many online salary calculators only apply the AHK and miss the AK, or vice versa, leading to inaccurate take-home estimates.',
    faqs: [
      { q: 'What is the difference between the algemene heffingskorting and the arbeidskorting?', a: 'The algemene heffingskorting (AHK) is available to all Dutch taxpayers below state pension age. The arbeidskorting is only available to people with employment income - it rewards work. Both phase out at higher incomes. A typical €60,000 employee receives around €1,178 AHK and €4,747 AK in 2026.' },
      { q: 'Are the heffingskortingen applied by the employer or the tax authority?', a: 'The employer deducts payroll tax (loonheffing) monthly, which incorporates an estimated AHK. The full picture - including the arbeidskorting - is reconciled in the annual income tax return (aangifte inkomstenbelasting) with the Belastingdienst (Dutch tax authority).' },
    ],
    quiz: {
      topic: 'heffingskorting',
      questions: [
        {
          q: 'Why is a heffingskorting more valuable than an income tax deduction of the same amount?',
          options: ['A deduction reduces taxable income proportionally, while a heffingskorting only applies to the lowest income bracket and is capped at €1,000 per year', 'A heffingskorting reduces the tax owed directly, so a €1,000 credit saves exactly €1,000 in tax regardless of your bracket; a deduction only saves €355-€495 because it reduces taxable income, not the tax itself', 'A heffingskorting is indexed to inflation annually, while deductions remain fixed, making the credit more valuable in high-inflation years', 'A heffingskorting can be carried forward to future tax years if unused, while a deduction expires at year-end and cannot offset future income'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition states a heffingskorting reduces tax owed - not taxable income. A €1,000 credit saves exactly €1,000 in tax regardless of bracket, whereas a €1,000 deduction saves only €355-€495 depending on which bracket applies.',
        },
        {
          q: 'What is the key difference between the algemene heffingskorting (AHK) and the arbeidskorting (AK)?',
          options: ['The AHK is exclusively for high earners above €80,000 where it provides targeted relief, while the arbeidskorting applies to all taxpayers at a flat rate', 'Both credits apply to all Dutch taxpayers equally, but the AHK phases out before the arbeidskorting, creating a smooth income progression with no cliff', 'The AHK is applied by the employer through monthly payroll tax; the arbeidskorting is only available via the annual tax return and cannot appear on monthly payslips', 'The AHK is available to all Dutch taxpayers below state pension age; the arbeidskorting is only available to people with employment income, rewarding work over other income types'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The FAQ states the AHK is available to all Dutch taxpayers below state pension age, while the arbeidskorting is only available to people with employment income. It is designed to make work financially more rewarding compared to benefits.',
        },
        {
          q: 'According to the examples table, what is the AHK credit for someone earning €80,000 gross?',
          options: ['€0 - the AHK has fully phased out by €80,000 gross income', '€1,178 - the same AHK credit applied at €60,000, as it remains flat above that level', '€1,628 - the maximum AHK credit, which is locked in once income exceeds €40,000', '€2,109 - the same as the arbeidskorting at €80,000, since both credits converge at this income level'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The examples table shows that at €80,000 gross, the AHK credit is €0 - it has fully phased out. The arbeidskorting at that income is €2,109, which is the only credit still reducing the net tax bill.',
        },
        {
          q: 'What does the pitfalls section warn about many online Dutch salary calculators?',
          options: ['They apply both credits at their maximum values regardless of income, overstating take-home pay for higher earners in the phase-out range', 'They confuse Box 1 and Box 3 income, misclassifying investment income as employment income and incorrectly applying the arbeidskorting', 'Many only apply one of the two credits (AHK or AK) and miss the other, leading to inaccurate take-home estimates', 'They assume the credits are refundable and show a cash payout that the Belastingdienst will not actually pay'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section warns that many online salary calculators only apply the AHK and miss the AK, or vice versa, leading to inaccurate take-home estimates. Both credits must be applied together for an accurate net salary figure.',
        },
        {
          q: 'In practice, who applies the heffingskortingen and when are they finalized?',
          options: ['The employee claims both credits directly from the Belastingdienst each month by submitting a digital form, with credits deposited to their bank account', 'Both credits are applied entirely through the annual income tax return; employers do not incorporate any credits into monthly payroll calculations', 'The Belastingdienst applies both credits automatically when they receive the employer\'s annual payroll filing, requiring no action from the employee', 'The employer incorporates an estimated AHK into monthly payroll tax (loonheffing), and the full picture - including the arbeidskorting - is reconciled in the annual tax return with the Belastingdienst'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The FAQ explains that the employer deducts payroll tax (loonheffing) monthly, incorporating an estimated AHK. The full picture - including the arbeidskorting - is reconciled in the annual income tax return (aangifte inkomstenbelasting) with the Belastingdienst.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'arbeidskorting': {
    definition: [
      'The arbeidskorting is a Dutch employment tax credit that reduces income tax for people with wages, salary, or other employment income. It is designed to make work financially more rewarding compared to benefits, by lowering the effective tax rate on earned income.',
      'For 2026 the credit builds in four segments: it grows from 0 to €996 on income up to €11,965 (at 8.324%), continues growing to a peak of €5,685 at €45,592, then phases out at 6.51% per euro until it reaches zero at €132,920. Above €132,920 the credit is nil.',
    ],
    whenToUse: 'Apply the arbeidskorting whenever computing Dutch net salary for an employee. It is one of the two credits that directly reduce Box 1 income tax. It is not available to self-employed individuals using the zelfstandigenaftrek (entrepreneur deduction), benefit recipients, or pensioners - they have different credits.',
    examples: {
      headers: ['Gross income', 'Arbeidskorting', 'Notes'],
      rows: [
        ['€20,000', '€3,744', 'Building phase (segment 2)'],
        ['€45,592', '€5,685', 'Maximum credit reached'],
        ['€80,000', '€3,357', 'Phase-out phase (segment 4)'],
        ['€132,920+', '€0', 'Credit fully phased out'],
      ],
    },
    pitfalls: 'The arbeidskorting is often omitted in quick net salary estimates. Missing it results in significantly overstating the tax burden, especially at mid-range incomes where the credit is near its maximum. Also note: the credit has separate (lower) amounts for AOW recipients above state pension age.',
    faqs: [
      { q: 'At what income is the arbeidskorting at its maximum?', a: 'The arbeidskorting reaches its maximum of €5,685 at an employment income of €45,592 in 2026. Below that income it builds progressively. Above €45,592 the credit phases out at 6.51 cents per euro until it is fully gone at €132,920.' },
      { q: 'Is the arbeidskorting the same as the algemene heffingskorting?', a: 'No. The algemene heffingskorting (AHK) is available to all Dutch taxpayers. The arbeidskorting is only for people with employment income. Both are applied to reduce Box 1 income tax. Together they can cut the effective tax rate substantially, especially for incomes in the €30,000-€60,000 range.' },
    ],
    quiz: {
      topic: 'arbeidskorting',
      questions: [
        {
          q: 'What does the arbeidskorting do?',
          options: ['It reimburses employers for social insurance costs', 'It reduces income tax owed for people with employment income, making work more rewarding than benefits', 'It reduces taxable income before Box 1 rates are applied', 'It exempts the first €5,685 of employment income from all Dutch taxes'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The arbeidskorting is a Dutch employment tax credit that reduces income tax owed directly - not taxable income. It is designed to make work financially more rewarding than benefits by lowering the effective tax rate on earned income.',
        },
        {
          q: 'According to the examples table, at what gross income does the arbeidskorting reach its maximum, and what is that maximum?',
          options: ['€20,000 - maximum €3,744', '€80,000 - maximum €5,685', '€132,920 - credit fully phased out', '€45,592 - maximum €5,685'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The credit reaches its maximum of €5,685 at a gross income of €45,592. Above that level it phases out at 6.51% per euro until it disappears entirely at €132,920.',
        },
        {
          q: 'Which groups are NOT eligible for the arbeidskorting?',
          options: ['Self-employed individuals using the zelfstandigenaftrek, benefit recipients, and pensioners', 'Employees with a gross income above €80,000', 'Part-time workers earning less than €20,000 per year', 'Employees subject to the second or third Box 1 tax bracket'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The arbeidskorting is not available to self-employed individuals using the zelfstandigenaftrek, benefit recipients, or pensioners - those groups have different credits. It is specifically for people with wages, salary, or other employment income.',
        },
        {
          q: 'What does the pitfalls section warn about when estimating Dutch net salary?',
          options: ['Applying the credit to gross income rather than taxable income', 'Confusing the arbeidskorting with the zelfstandigenaftrek', 'Omitting the arbeidskorting entirely, which significantly overstates the tax burden', 'Adding the credit to gross salary instead of deducting it from income tax'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The arbeidskorting is often left out of quick net salary estimates. Missing it significantly overstates the tax burden, especially at mid-range incomes where the credit is near its maximum of €5,685.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'box-1-income-tax': {
    definition: [
      'Box 1 is the Dutch income tax category for income from employment and home ownership (work and home - werk en woning). It covers wages, freelance income, business profit, and the imputed rental value of an owner-occupied home. Most employees only have Box 1 income.',
      'In 2026 Box 1 has three rate brackets. The first bracket (35.75% up to €38,883) is a combined rate including income tax plus social insurance premiums: AOW state pension (17.90%), ANW survivor benefit (0.10%), and WLZ long-term care (9.65%). Brackets 2 and 3 are pure income tax.',
    ],
    whenToUse: 'Use Box 1 rates whenever computing the income tax and social insurance burden for a Dutch employee or self-employed person earning wages or business profits. For investment income use Box 3 (wealth tax). For substantial interest in a company (5%+) use Box 2.',
    examples: {
      headers: ['Income bracket (2026)', 'Rate', 'Includes social insurance?'],
      rows: [
        ['Up to €38,883', '35.75%', 'Yes - AOW 17.90% + ANW 0.10% + WLZ 9.65%'],
        ['€38,883 - €78,426', '37.56%', 'No - income tax only'],
        ['Above €78,426', '49.50%', 'No - income tax only'],
      ],
    },
    pitfalls: 'The first-bracket rate (35.75%) is often misquoted as "just income tax" - it is actually a combined rate including social insurance. AOW recipients do not pay the 17.90% AOW premium, dropping their first bracket rate to 17.85%. Forgetting this distinction leads to overestimating tax for pensioners by nearly 18 percentage points on the first €38,883 of income.',
    faqs: [
      { q: 'Why is the Dutch first tax bracket rate so high at 35.75%?', a: 'The 35.75% rate is a combined rate, not pure income tax. It bundles the income tax rate (8.10%) with three social insurance premiums: AOW state pension (17.90%), ANW survivor benefit (0.10%), and WLZ long-term care (9.65%). AOW recipients do not pay the 17.90% AOW premium, cutting their first-bracket rate to 17.85%.' },
      { q: 'What is the difference between Box 1, Box 2, and Box 3 in the Netherlands?', a: 'Box 1 covers employment and business income (taxed at progressive rates 35.75-49.5%). Box 2 covers income from substantial company interest - dividends and capital gains from a 5%+ stake in a company (26.9% flat in 2026). Box 3 is a wealth tax on savings and investments charged on a deemed return regardless of actual return.' },
    ],
    quiz: {
      topic: 'Box 1 income tax',
      questions: [
        {
          q: 'What types of income fall under Dutch Box 1?',
          options: ['Dividends and capital gains from shares and investment funds', 'Employment income, freelance income, business profit, and the imputed rental value of an owner-occupied home', 'Savings account interest and wealth above a personal exemption threshold', 'Only wages from Dutch employers - foreign employment income goes into Box 3'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition states Box 1 covers income from employment and home ownership, including wages, freelance income, business profit, and the imputed rental value of an owner-occupied home. Most employees only have Box 1 income.',
        },
        {
          q: 'Why is the Dutch first-bracket rate 35.75% rather than a lower pure income tax rate?',
          options: ['It includes a surcharge for environmental levies and municipal taxes applied to all residents', 'It is a combined rate bundling income tax (8.10%) with social insurance premiums: AOW (17.90%), ANW (0.10%), and WLZ (9.65%)', 'The Netherlands applies a flat 35.75% income tax on all brackets up to €38,883 without any further premiums', 'The rate includes both employee and employer social contributions, unlike other countries that split these separately'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition explains the 35.75% first-bracket rate is a combined rate: income tax (8.10%) plus AOW state pension (17.90%), ANW survivor benefit (0.10%), and WLZ long-term care (9.65%). Brackets 2 and 3 are pure income tax.',
        },
        {
          q: 'From the examples table, what is the Box 1 rate for income between €38,883 and €78,426 in 2026?',
          options: ['35.75% - the same combined rate as the first bracket', '37.56% - pure income tax with no social insurance premiums', '42.00% - a mid-range blended rate for middle earners', '49.50% - the top rate that starts from the second bracket'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The examples table shows the second bracket (€38,883 to €78,426) is taxed at 37.56% and explicitly notes it includes no social insurance - it is pure income tax only. Social insurance premiums only apply in the first bracket.',
        },
        {
          q: 'What happens to the first-bracket rate for AOW (state pension) recipients?',
          options: ['It stays at 35.75% - AOW recipients pay the same combined rate as all other taxpayers', 'It drops to approximately 17.85% because they do not pay the 17.90% AOW premium they already receive', 'It increases to 49.50% because pension income is classified as unearned income in a higher bracket', 'They pay 0% on the first €38,883 due to the full AOW exemption credit'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section warns that AOW recipients do not pay the 17.90% AOW premium, dropping their first-bracket rate from 35.75% to 17.85%. Forgetting this distinction leads to overestimating their tax by nearly 18 percentage points on the first €38,883 of income.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'irr': {
    definition: [
      'The Internal Rate of Return (IRR) is the discount rate at which the net present value (NPV) of all cash flows from an investment equals exactly zero. Put simply: it is the implied annual return embedded in a project\'s cash flow schedule. If you invest $100,000 today and receive $40,000, $40,000, and $40,000 over the next three years, IRR is the single annual rate that makes those future receipts worth exactly $100,000 in present-value terms.',
      'IRR has no closed-form algebraic solution for most real-world cash flow schedules - it must be found by numerical iteration. Spreadsheets (Excel IRR function) and financial calculators do this automatically by guessing a rate, computing NPV, and adjusting until NPV reaches zero. This iterative nature is why IRR cannot easily be back-of-envelope calculated for complex projects.',
      'The decision rule is straightforward: if IRR exceeds the project\'s hurdle rate (the minimum required return, often the company\'s weighted average cost of capital), the investment creates value and should be accepted. If IRR falls below the hurdle rate, the project destroys value. When ranking competing projects, higher IRR is generally preferable - but this breaks down when projects differ significantly in scale, duration, or have unusual cash flow patterns.',
    ],
    whenToUse: 'Use IRR when evaluating a single project against a known hurdle rate, or comparing projects with similar scale and time horizon. It is the standard return language in private equity and venture capital: when a fund reports a "25% net IRR," it means that 25% annually is the rate at which the timing-adjusted value of all capital contributions and distributions break even. Pair IRR with MOIC to capture both the efficiency (IRR) and the magnitude (MOIC) of returns. Do not rely on IRR alone when comparing projects of very different sizes - a 40% IRR on $100K may generate far less value than a 20% IRR on $5M.',
    examples: {
      headers: ['Project', 'Initial Investment', 'CF Year 1', 'CF Year 2', 'CF Year 3', 'IRR'],
      rows: [
        ['Project A (steady)', '-$100,000', '$40,000', '$40,000', '$40,000', '9.7%'],
        ['Project B (back-loaded)', '-$100,000', '$0', '$0', '$150,000', '14.5%'],
        ['Project C (large)', '-$250,000', '$80,000', '$90,000', '$120,000', '12.8%'],
        ['Project D (loss)', '-$100,000', '$20,000', '$20,000', '$20,000', '-22.9%'],
      ],
    },
    pitfalls: 'IRR has two well-known failure modes. First, multiple IRRs: if a project has alternating positive and negative cash flows - for example a mine that generates cash for years, then requires expensive environmental remediation at closure - the underlying polynomial can have multiple solutions, making IRR ambiguous. Second, the reinvestment rate assumption: IRR implicitly assumes interim cash flows are reinvested at the IRR rate itself, which is unrealistic for high-IRR projects. In both cases, Modified IRR (MIRR) or NPV is more reliable.',
    faqs: [
      { q: 'What is the difference between IRR and NPV?', a: 'NPV expresses investment value as an absolute dollar figure at a chosen discount rate. IRR is the specific discount rate at which NPV equals zero - it is a percentage, not a dollar amount. For a standard project (cash out then cash in), the two methods agree: if IRR > hurdle rate, NPV at that hurdle rate is positive. They can disagree when ranking competing projects of different scale or timing - in those cases, NPV is more reliable.' },
      { q: 'What is a good IRR?', a: 'It depends on the asset class and risk. Private equity funds typically target 20-30% gross IRR. Venture capital funds may target 30%+ to compensate for portfolio company failures. Corporate investment projects are often evaluated against the company\'s WACC, typically 8-15%. Real estate deals commonly target 12-20% IRR depending on risk profile. The only valid benchmark is the opportunity cost: what else can the capital earn at the same risk level?' },
      { q: 'What is a hurdle rate?', a: 'A hurdle rate is the minimum acceptable IRR for an investment. In corporate finance it is typically the company\'s WACC plus a risk premium. In private equity it is a contractual threshold (commonly 8%) above which the fund manager earns carried interest. Any project with IRR below the hurdle rate is rejected because it earns less than the cost of the capital required to fund it.' },
    ],
    quiz: {
      topic: 'IRR',
      questions: [
        {
          q: 'What does the Internal Rate of Return (IRR) represent?',
          options: ['The expected future value of an investment, calculated by summing all projected cash inflows without discounting them back to present value', 'The discount rate at which the net present value of all cash flows from an investment equals exactly zero - the implied annual return embedded in a project\'s cash flow schedule', 'The ratio of total profit to initial investment, expressed as a percentage of original capital committed regardless of time period', 'The difference between a project\'s cost of capital and its weighted average return on assets, expressed in percentage points as a spread metric'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition states IRR is the discount rate at which the NPV of all cash flows equals exactly zero. It is the implied annual return embedded in the project\'s cash flow schedule - if you invest $100,000 today and receive $40,000/year for 3 years, IRR is the rate that makes those future receipts worth exactly $100,000 today.',
        },
        {
          q: 'When do IRR and NPV agree, and when can they conflict?',
          options: ['IRR and NPV always agree on both accept/reject decisions and project ranking, since they use the same cash flows and only differ in presentation format', 'IRR is more reliable than NPV for all comparisons because it produces a single percentage that can be compared across different investment sizes and time horizons', 'IRR and NPV disagree on accept/reject decisions but agree on project ranking, since the discount rate affects the dollar amount but not the implied return percentage', 'For a standard project both methods agree on accept/reject (IRR above hurdle = positive NPV), but they can disagree when ranking projects of different scale or timing, in which case NPV is more reliable'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The FAQ states that for a standard project (cash out then cash in), if IRR exceeds the hurdle rate, NPV at that rate is positive - both methods agree. They can conflict when ranking competing projects of different scale or timing, and in those cases the FAQ says NPV is more reliable.',
        },
        {
          q: 'According to the examples table, which project has the highest IRR?',
          options: ['Project B (back-loaded) at 14.5% - the three-year wait for the $150,000 payoff implies a higher annual return rate than the steadier projects', 'Project C (large) at 12.8% - its larger investment generates more absolute cash flow than the smaller projects', 'Project A (steady) at 9.7% - the consistent annual cash flows reduce risk and provide the highest risk-adjusted return', 'Project D (loss) because the negative cash flows create a high negative IRR that implies superior return when adjusted for risk'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The examples table shows Project B (back-loaded) has an IRR of 14.5%, the highest of the four projects. Despite receiving no cash until Year 3, the single $150,000 payment on a $100,000 investment implies the highest annual compounding rate.',
        },
        {
          q: 'What are the two main failure modes of IRR identified in the pitfalls section?',
          options: ['IRR fails when projects have different starting dates and when the hurdle rate changes over time; both are fixed by adjusting each cash flow to a common base date', 'IRR can produce artificially high results when costs are understated, and artificially low results when revenues are delayed beyond Year 3 of the cash flow schedule', 'Multiple IRRs (when cash flows alternate between positive and negative, creating an ambiguous polynomial) and the reinvestment rate assumption (interim cash flows are implicitly assumed to reinvest at the IRR rate itself); in both cases MIRR or NPV is more reliable', 'IRR overstates returns on large projects due to a scale bias, and understates returns on small projects because the percentage calculation amplifies small absolute gains disproportionately'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The pitfalls section identifies two failure modes: first, multiple IRRs when a project has alternating positive and negative cash flows (as with a mine requiring closure remediation); second, the reinvestment rate assumption - IRR implicitly assumes interim cash flows are reinvested at the IRR rate itself, which is unrealistic for high-IRR projects.',
        },
        {
          q: 'According to the FAQs, what is the only valid benchmark for determining whether an IRR is "good"?',
          options: ['An IRR above 20%, since below that threshold the inflation-adjusted return approaches zero and the investment destroys real value for institutional investors', 'The opportunity cost of capital at the same risk level - private equity may target 20-30%, venture capital 30%+, corporate projects the company\'s WACC (8-15%), and real estate 12-20%, so the threshold varies by asset class and risk profile', 'At least double the risk-free rate (10-year Treasury yield), a standard institutional benchmark to compare project returns on a risk-adjusted basis', 'The project\'s accounting return on equity (ROE), since ROE reflects the actual historical book return and represents the minimum credible new investment threshold'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ states the only valid benchmark is the opportunity cost: what else can the capital earn at the same risk level? It then gives typical targets by asset class - PE 20-30%, VC 30%+, corporate WACC 8-15%, real estate 12-20% - showing there is no universal "good" IRR independent of context.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'avoirdupois-system': {
    definition: [
      'The avoirdupois system is the standard system of weights used for everyday commercial and domestic purposes in the United States, United Kingdom, and most English-speaking countries. Its foundational unit is the pound (lb), defined since 1959 as exactly 453.59237 grams. The pound divides into 16 ounces (oz); each ounce divides into 16 drams. Larger units build upward: 14 pounds make 1 stone (used in the UK for body weight), 100 pounds make 1 US short hundredweight, and 2,000 pounds make 1 US short ton.',
      'The name comes from the Old French phrase "aveir de peis" meaning "goods of weight" - a medieval trading term for bulk commodities sold by weight rather than by the piece. The system was formally standardized in England during the 14th century and spread globally through British colonial trade.',
      'Avoirdupois is one of three historical weight systems that share unit names but use different values. The troy system - used for precious metals such as gold and silver - uses a heavier ounce (31.1035 g vs 28.3495 g) and a lighter pound (12 troy ounces vs 16 avoirdupois ounces). The apothecary system, historically used in pharmacy, has been entirely replaced by metric in modern clinical contexts.',
    ],
    beginnerExplain: [
      'If you have ever weighed yourself, bought meat at a grocery store, or shipped a parcel, you used the avoirdupois system. It is the default meaning of "pound" and "ounce" in everyday English. When a recipe calls for 8 oz of flour, that is avoirdupois.',
      'The one trap is the word "ounce" in a jewelry or precious metals context. A gold price quoted per ounce uses troy ounces (31.1 g), not avoirdupois ounces (28.35 g) - a difference of about 10%. Outside of precious metals and gemstones, any English-language "ounce" is almost certainly avoirdupois.',
    ],
    whenToUse: 'Use avoirdupois for all everyday weight measurements: body weight, food, postal parcels, luggage, construction materials, and industrial goods. Switch to troy weight when dealing with precious metals, coins, or gemstones. Use metric (grams, kilograms) for scientific work, international trade documents, or any context where precision and unambiguity are required across borders.',
    examples: {
      headers: ['Unit', 'Avoirdupois equivalent', 'Grams (exact)'],
      rows: [
        ['1 dram', '1/16 oz', '1.7718 g'],
        ['1 ounce (oz)', '16 drams', '28.3495 g'],
        ['1 pound (lb)', '16 oz', '453.592 g'],
        ['1 stone', '14 lb', '6,350.29 g'],
        ['1 US short hundredweight', '100 lb', '45,359.2 g'],
        ['1 US short ton', '2,000 lb', '907,185 g (907.185 kg)'],
        ['1 UK long ton', '2,240 lb', '1,016,047 g (1,016.05 kg)'],
      ],
    },
    pitfalls: 'The most important pitfall is confusing the avoirdupois ounce (28.35 g) with the troy ounce (31.10 g). Using the wrong ounce introduces a 9.7% error - significant for precious metals, pharmaceuticals from historical sources, or any contract that uses "oz" without specifying the system. A second pitfall is "ton" ambiguity: the US short ton (2,000 lb), UK long ton (2,240 lb), and metric tonne (2,204.62 lb) are all commonly written as just "ton." In international commodity contracts, "MT" or "t" means metric ton; a US domestic "ton" almost always means the short ton.',
    faqs: [
      { q: 'What is the avoirdupois system?', a: 'The avoirdupois system is the standard weight system used for everyday goods in English-speaking countries. It is built around the pound (453.592 g) and divides it into 16 ounces. It is the default meaning of "pound" and "ounce" in US and UK commerce, distinct from the troy system (used for precious metals) and from metric.' },
      { q: 'How does the avoirdupois ounce differ from the troy ounce?', a: 'The avoirdupois ounce is 28.3495 g; the troy ounce is 31.1035 g - about 9.7% heavier. An avoirdupois pound contains 16 ounces; a troy pound contains only 12 troy ounces. This means a troy pound (373.24 g) is lighter than an avoirdupois pound (453.59 g), despite having a heavier ounce.' },
      { q: 'Why is avoirdupois still used instead of metric?', a: 'Avoirdupois persists primarily in the United States, where metrication was made voluntary in 1975 and never mandated for most commercial uses. It remains the default for body weight, food labeling, and construction in the US. The UK converted most official and commercial uses to metric but retains stone and pounds informally for body weight.' },
      { q: 'What is the difference between a US ton and a UK ton?', a: 'A US short ton is 2,000 avoirdupois pounds (907.185 kg). A UK long ton is 2,240 avoirdupois pounds (1,016.05 kg). A metric tonne is 1,000 kg (2,204.62 lb) - between the two. All three are called "ton" in informal use. In international trade, "ton" almost always means the metric tonne.' },
      { q: 'How do I convert avoirdupois to metric?', a: '1 ounce = 28.3495 g (or divide grams by 28.3495 to reverse). 1 pound = 453.592 g = 0.453592 kg (or multiply kg by 2.20462 to get pounds). These factors are exact by definition since the 1959 International Yard and Pound Agreement, which defined 1 lb = 0.45359237 kg exactly.' },
    ],
    quiz: {
      topic: 'the avoirdupois system',
      questions: [
        {
          q: 'How many ounces are in one avoirdupois pound?',
          options: ['12', '14', '16', '20'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'One avoirdupois pound = 16 ounces. The number 12 applies to the troy pound (12 troy ounces), used for precious metals - not everyday goods.',
        },
        {
          q: 'An avoirdupois ounce weighs 28.35 g. How does that compare to a troy ounce?',
          options: ['They are identical', 'The troy ounce is lighter (about 26 g)', 'The troy ounce is heavier (about 31.1 g)', 'The troy ounce is heavier by exactly 5 g'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'A troy ounce = 31.1035 g, about 9.7% heavier than an avoirdupois ounce (28.3495 g). The troy ounce is used for precious metals; the avoirdupois ounce is the default for everything else.',
        },
        {
          q: 'What does "avoirdupois" literally mean?',
          options: ['Standard commercial weight', 'Goods of weight', 'The pound system', 'Heavy measure'] as [string, string, string, string],
          correct: 1 as const,
          explanation: '"Avoirdupois" comes from the Old French phrase "aveir de peis" meaning "goods of weight" - a medieval trading term for bulk commodities sold by weight. The name reflects its origin as a system for weighing everyday traded goods.',
        },
        {
          q: 'Which of these is NOT an avoirdupois unit?',
          options: ['Dram', 'Stone', 'Troy pound', 'Hundredweight'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The troy pound belongs to the troy weight system, not avoirdupois. Drams (1/16 oz), stones (14 lb), and hundredweights (100 lb in the US) are all avoirdupois units.',
        },
        {
          q: 'A US short ton and a UK long ton are both in avoirdupois pounds. What are the correct values?',
          options: ['US: 2,000 lb; UK: 2,240 lb', 'US: 2,240 lb; UK: 2,000 lb', 'US: 2,000 lb; UK: 2,000 lb', 'US: 2,204 lb; UK: 2,240 lb'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The US short ton = 2,000 lb (907.185 kg). The UK long ton = 2,240 lb (1,016.05 kg). The metric tonne is 1,000 kg (about 2,204 lb). All three are called "ton" in common usage, which is a frequent source of confusion in commodity trade.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'imperial-system': {
    definition: [
      'The imperial system is the traditional British system of units, codified in the British Weights and Measures Act of 1824. It covers length (inches, feet, yards, miles), mass (ounces, pounds, stones, hundredweights, tons), volume (fluid ounces, pints, quarts, gallons), and area (acres, square feet, square miles). Each quantity has its own set of conversion ratios - 12 inches per foot, 16 ounces per pound, 8 pints per gallon - none of which share a common decimal base.',
      'The British Empire spread these units across its colonies. After decolonisation, most countries adopted metric, leaving three notable holdouts: the United States (which uses a close variant called US customary units), Myanmar, and Liberia. The UK officially converted to metric for most purposes but still uses miles for road distances, pints for draught beer and milk, and stones for body weight.',
      'The US customary system is related to but not identical to imperial. The two systems share unit names for most quantities but differ for volume: a US gallon is 3.785 litres, while an imperial gallon is 4.546 litres. A US fluid pint is 473 mL; an imperial pint is 568 mL.',
    ],
    beginnerExplain: [
      'The simplest way to think about imperial is "units with historical names and irregular conversion ratios." There is no single multiplier that links inches to feet to yards to miles the way metric links millimeters to centimeters to meters to kilometers.',
      'Each conversion ratio - 12, 3, 1,760 - was set by historical practice and tradition, not mathematical design. This is why converting 5 miles 3,000 feet to a single unit requires several manual steps, where the metric equivalent would be a trivial decimal shift.',
    ],
    whenToUse: 'Use imperial units when working with US documents, construction in the UK or US, American recipes, or any context where your audience expects those units. For precise engineering calculations or comparisons across borders, convert to metric first to reduce conversion errors and ambiguity.',
    examples: {
      headers: ['Imperial unit', 'Imperial equivalent', 'Metric equivalent'],
      rows: [
        ['1 inch', '-', '2.54 cm'],
        ['1 foot', '12 inches', '30.48 cm'],
        ['1 yard', '3 feet', '0.9144 m'],
        ['1 mile', '1,760 yards', '1.609 km'],
        ['1 ounce (mass)', '-', '28.35 g'],
        ['1 pound', '16 ounces', '453.59 g'],
        ['1 stone', '14 pounds', '6.35 kg'],
        ['1 imperial pint', '20 fl oz', '568 mL'],
        ['1 US pint', '16 fl oz', '473 mL'],
        ['1 imperial gallon', '8 pints', '4.546 L'],
        ['1 US gallon', '-', '3.785 L'],
      ],
    },
    pitfalls: 'The most dangerous imperial pitfall is the US pint vs imperial pint discrepancy. A US recipe calling for 1 pint of cream means 473 mL; a British recipe means 568 mL - a 20% difference that matters in baking. Similarly, a "US ton" (short ton) is 2,000 lb (907 kg), while a "UK ton" (long ton) is 2,240 lb (1,016 kg). Always specify which variant when communicating across borders.',
    faqs: [
      { q: 'What is the simple definition of the imperial system?', a: 'A system of units based on historical British measures, using non-decimal conversion ratios between units: 12 inches per foot, 16 ounces per pound, 1,760 yards per mile. It is still used primarily in the United States (as US customary units) and partially in the UK for a few everyday quantities.' },
      { q: 'How many countries use the imperial system?', a: 'Three countries primarily use imperial-derived units for everyday measurement: the United States, Myanmar, and Liberia. The UK officially uses metric but retains imperial for road distances (miles), draught beer and bottled milk (pints), and informal body weight (stones and pounds).' },
      { q: 'What is the difference between US customary and imperial?', a: 'The two systems share the same names for most units but differ for volume. A US fluid ounce, cup, pint, quart, and gallon are all smaller than their imperial equivalents. The most practically important difference: a US gallon = 3.785 L vs an imperial gallon = 4.546 L.' },
      { q: 'Why does the US still use imperial units?', a: 'The US uses US customary units due to historical inertia. Congress passed the Metric Conversion Act in 1975, but adoption was voluntary and largely did not happen in everyday commerce, construction, or consumer products. US science, medicine, and pharmaceuticals do use metric.' },
      { q: 'What is the difference between metric and imperial?', a: 'Metric uses a base-10 structure with consistent prefixes (kilo-, centi-, milli-), so all unit conversions involve multiplying or dividing by powers of 10. Imperial uses irregular historical ratios that vary by quantity and require memorisation. Converting 5,280 feet to miles requires knowing the 5,280 ratio; converting 5,280 meters to kilometers is simply 5.280.' },
    ],
    quiz: {
      topic: 'the imperial system',
      questions: [
        {
          q: 'What is the key structural difference between the imperial and metric systems?',
          options: [
            'Imperial uses base-10 ratios; metric uses historical ratios',
            'Metric uses base-10 ratios for all conversions; imperial uses irregular historical ratios such as 12, 16, and 1,760',
            'Imperial is only used for length; metric covers all physical quantities',
            'Metric is more precise because its units are physically smaller',
          ] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'Metric is built entirely on powers of 10: 1 km = 1,000 m, 1 kg = 1,000 g. Imperial uses different ratios for every quantity: 12 inches per foot, 16 ounces per pound, 1,760 yards per mile. None of these share a common factor.',
        },
        {
          q: 'How many yards are in 1 mile?',
          options: ['5,280', '880', '1,760', '3,520'],
          correct: 2 as const,
          explanation: '1 mile = 1,760 yards = 5,280 feet. The 5,280 figure is feet per mile; the 1,760 figure is yards per mile (since 3 feet = 1 yard, 5,280 / 3 = 1,760).',
        },
        {
          q: 'How many ounces are in 1 pound in the imperial/US customary system?',
          options: ['8', '10', '12', '16'],
          correct: 3 as const,
          explanation: '1 pound = 16 ounces. This is one of the most commonly needed imperial ratios. 1 pound = 453.59 grams, so 1 ounce = 28.35 grams.',
        },
        {
          q: 'A US recipe calls for 1 pint of milk. How many millilitres is a US pint?',
          options: ['568 mL', '473 mL', '250 mL', '946 mL'],
          correct: 1 as const,
          explanation: 'A US pint = 473 mL. An imperial (UK) pint = 568 mL. These are not the same - using an imperial pint in a US recipe adds about 20% more liquid than intended.',
        },
        {
          q: 'Which of the following is NOT a unit in the imperial system?',
          options: ['Furlong', 'Stone', 'Hectare', 'Hundredweight'],
          correct: 2 as const,
          explanation: 'A hectare is a metric unit of area equal to 10,000 m2. Furlongs (1/8 of a mile), stones (14 pounds), and hundredweights (100 lb in the US, 112 lb in the UK) are all imperial units.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'npv': {
    definition: [
      'Net Present Value (NPV) is the sum of all cash flows from an investment - positive (inflows) and negative (outflows) - each discounted back to their present value using a chosen rate. A positive NPV means the investment generates more value in present-dollar terms than it costs, creating wealth. A negative NPV means it destroys value at the given discount rate.',
      'The discount rate used in NPV analysis represents the investor\'s required return or the company\'s opportunity cost of capital. This rate reflects the time value of money: a dollar received in the future is worth less than a dollar today because the dollar today could be invested to earn a return. Discounting converts all future cash flows into a common "present-day dollar" basis, making cash flows from different time periods directly comparable.',
      'NPV and IRR are the two dominant discounted cash flow (DCF) methods and are mathematically linked: IRR is the specific discount rate at which NPV equals exactly zero. For a standard project (cash out first, cash in later), NPV is positive whenever the actual discount rate is below the IRR, and negative whenever it exceeds the IRR. NPV is preferred by financial academics because it measures absolute value creation in dollars, not just a percentage rate.',
    ],
    whenToUse: 'Use NPV when comparing projects with different scales or very different cash flow timing, where IRR can mislead. NPV directly answers "how many dollars of value does this project create today?" and can be added across projects in a portfolio (IRR cannot be averaged). In capital budgeting, always pair NPV with a sensitivity analysis - known as an NPV profile - showing how the result changes as the discount rate varies. If NPV turns negative at only a small rate increase, the project is fragile.',
    examples: {
      headers: ['Project', 'CF Year 0', 'CF Year 1', 'CF Year 2', 'CF Year 3', 'Discount Rate', 'NPV'],
      rows: [
        ['Factory expansion', '-$500,000', '$150,000', '$200,000', '$250,000', '10%', '+$36,157'],
        ['Equipment upgrade', '-$80,000', '$30,000', '$30,000', '$40,000', '8%', '+$6,427'],
        ['Marketing campaign', '-$50,000', '$70,000', '$0', '$0', '12%', '+$12,500'],
        ['Rejected project', '-$200,000', '$50,000', '$60,000', '$70,000', '15%', '-$30,812'],
      ],
    },
    pitfalls: 'NPV is only as reliable as its two inputs: the discount rate and the cash flow forecasts. Small changes in the discount rate can flip NPV from positive to negative on long-duration projects. Cash flow forecasts beyond 3-5 years are often highly speculative. Most critically, terminal value - the assumed value at the end of the explicit forecast period - typically accounts for 60-80% of total NPV in DCF models, making it the single most important and most uncertain input. Always stress-test terminal value assumptions separately.',
    faqs: [
      { q: 'What is the difference between NPV and IRR?', a: 'NPV is an absolute dollar figure showing how much value a project creates at a chosen discount rate. IRR is the specific discount rate at which NPV = 0 - a percentage. Both are DCF methods and generally agree on accept/reject decisions. They can diverge when ranking competing projects of different scale or duration: NPV is academically preferred because it measures real dollar value added and is additive across a portfolio.' },
      { q: 'What discount rate should I use for NPV?', a: 'For corporate projects, the standard choice is the company\'s Weighted Average Cost of Capital (WACC) - the blended required return across debt and equity. For personal investments, use your required return or opportunity cost (e.g., the return you could earn in an index fund at similar risk). For public sector projects, governments often use a social discount rate of 3-8%. The discount rate is the single most debated input in NPV analysis.' },
      { q: 'Can NPV be negative and the investment still be worthwhile?', a: 'At a given discount rate, a negative NPV means the investment earns less than required and should be rejected. However, changing the discount rate can change the sign of NPV. If your actual cost of capital is lower than your initial assumption, the project may actually be positive-NPV. This is why IRR is useful alongside NPV: IRR tells you exactly what return the project earns, which you then compare to your actual cost of capital.' },
    ],
    quiz: {
      topic: 'NPV',
      questions: [
        {
          q: 'What does Net Present Value (NPV) measure, and what does a positive NPV indicate?',
          options: ['NPV measures the total undiscounted sum of all cash flows from an investment, representing the nominal profit while ignoring the time value of money', 'NPV measures the internal rate of return of an investment expressed as an absolute dollar figure rather than a percentage, adjusted for the investor\'s cost of capital', 'NPV is the sum of all cash flows - inflows and outflows - each discounted to their present value at a chosen rate; a positive NPV means the investment generates more present-dollar value than it costs, creating wealth', 'NPV measures how quickly an investment recovers its initial outlay in discounted terms, expressed as the number of periods for cumulative discounted inflows to exceed the initial investment'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition states NPV is the sum of all cash flows discounted to present value using a chosen rate. A positive NPV means the investment generates more value in present-dollar terms than it costs, creating wealth; a negative NPV means it destroys value at the given discount rate.',
        },
        {
          q: 'From the examples table, what is the NPV of the factory expansion project (-$500,000 initial outflow, $150K/$200K/$250K in years 1-3, at a 10% discount rate)?',
          options: ['+$36,157 - a positive NPV meaning the project creates value above the 10% required return', '+$100,000 - the simple undiscounted net sum of cash flows ($600K total inflows minus $500K outlay)', '-$30,812 - the NPV of the rejected project, which uses a 15% discount rate rather than 10%', '+$6,427 - the NPV of the equipment upgrade project with a smaller $80,000 initial outlay at 8%'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The examples table shows the factory expansion has an NPV of +$36,157 at a 10% discount rate. This positive value means discounting the future inflows at 10% still produces more than the $500,000 outlay, confirming the project creates value at that required return.',
        },
        {
          q: 'What is the mathematical relationship between NPV and IRR, according to the definition?',
          options: ['IRR is always 2-3 percentage points higher than the discount rate used to calculate a positive NPV, reflecting the return premium above the required rate that justifies investment', 'IRR and NPV use the same formula but differ in presentation: IRR shows NPV as a percentage of invested capital while NPV shows it in absolute dollars', 'IRR and NPV have no direct mathematical relationship; they are independent metrics that agree on accept/reject decisions for different mathematical reasons', 'IRR is the specific discount rate at which NPV equals exactly zero; for a standard project, NPV is positive when the actual discount rate is below the IRR, and negative when it exceeds the IRR'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The definition states NPV and IRR are mathematically linked: IRR is the specific discount rate at which NPV equals exactly zero. For a standard project, NPV is positive whenever the actual discount rate is below the IRR, and negative whenever it exceeds the IRR.',
        },
        {
          q: 'What does the pitfalls section identify as the single most important and most uncertain input in DCF models?',
          options: ['Year 1-3 cash flow forecasts, because small errors in near-term revenue projections compound dramatically over the full model horizon', 'Terminal value - the assumed value at the end of the explicit forecast period - which typically accounts for 60-80% of total NPV in DCF models; the section recommends always stress-testing terminal value assumptions separately', 'The initial capital outflow (Year 0), because overestimating project costs is the most common source of NPV distortion in capital budgeting', 'The tax rate applied to operating cash flows, since small changes in the effective tax rate compound through every year and accumulate to a substantial distortion in total NPV'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section states terminal value typically accounts for 60-80% of total NPV in DCF models, making it the single most important and most uncertain input. It specifically recommends always stress-testing terminal value assumptions separately.',
        },
        {
          q: 'Under what circumstance might an investment with a negative NPV at your initial discount rate actually be worthwhile?',
          options: ['A negative NPV investment is never worthwhile by definition, since NPV is designed to identify all value-destroying investments regardless of any changes to assumptions', 'A negative NPV investment can be worthwhile if it has strategic importance (brand value, future optionality) not captured in the numerical cash flow forecasts', 'If the actual cost of capital is lower than the initial discount rate assumption, the project may in fact be positive-NPV; IRR is useful because it tells you exactly what return the project earns, which you then compare to your actual cost of capital', 'A negative NPV investment can be worthwhile if it prevents a competitor from acquiring a key asset, making the defensive strategic value higher than the negative financial NPV'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ states that changing the discount rate can change the sign of NPV. If the actual cost of capital is lower than the initial assumption, the project may be positive-NPV. This is why the FAQ recommends using IRR alongside NPV: IRR reveals the exact return the project earns, which can then be compared to the actual cost of capital.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'moic': {
    definition: [
      'Multiple on Invested Capital (MOIC) - also called Money-on-Money Multiple (MoM) or investment multiple - measures the total value returned by an investment relative to the total capital invested, expressed as a simple multiple. A 3.0x MOIC means every dollar invested returned three dollars in total (the original dollar plus two dollars of gain). MOIC is the primary return metric in private equity, venture capital, and real estate private markets.',
      'MOIC is deliberately simple: it ignores time. A 3.0x MOIC realised in three years and the same 3.0x realised over ten years are reported identically as "3.0x" - despite representing dramatically different annualised returns (roughly 44% vs 12% IRR respectively). This is why MOIC and IRR are always presented together in private markets: MOIC shows how much capital was returned; IRR shows how quickly. Neither metric alone tells the full story.',
      'MOIC is calculated as Total Value Received divided by Total Capital Invested. Total value includes all distributions (dividends, proceeds from partial sales, loan repayments) plus any residual unrealised value (the current estimated value of unsold assets). Capital invested is the sum of all capital drawdowns - the actual cash committed to the investment. On a fund level, MOIC is calculated across the entire portfolio.',
    ],
    whenToUse: 'Use MOIC as the primary return lens for private equity, venture capital, or real estate investments where timing is less predictable and liquidity events are discrete. It directly answers: "did we get our money back, and by how much?" A gross MOIC above 2.0x is generally considered the minimum acceptable return for a typical 5-year private equity hold (compensating for illiquidity and risk). 3.0x-5.0x gross MOIC is considered strong performance. Always combine MOIC with IRR to assess both the magnitude and the pace of returns.',
    examples: {
      headers: ['Investment', 'Capital In', 'Distributions', 'Residual Value', 'MOIC'],
      rows: [
        ['PE fund - portfolio company', '$10M', '$15M', '$20M', '3.5x'],
        ['VC - early stage startup', '$5M', '$0', '$40M (paper)', '8.0x'],
        ['Real estate - rental + sale', '$2M', '$0.5M (rent)', '$3.2M (sale)', '1.85x'],
        ['Distressed debt', '$20M', '$25M', '$0', '1.25x'],
        ['Failed investment', '$3M', '$0.5M', '$0', '0.17x'],
      ],
    },
    pitfalls: 'A high MOIC with a long hold period can mask a mediocre IRR. A 3.0x MOIC over 12 years is only a ~9.6% IRR - below many institutional hurdle rates. Conversely, a fast 2.0x in two years is a 41% IRR. Always check both metrics together. MOIC also treats unrealised (paper) value identically to distributed cash - inflating reported returns for funds with large unsold portfolios. Always distinguish Gross MOIC (before management fees and carried interest) from Net MOIC (after fees). Fees typically reduce MOIC by 0.3x-0.7x over a 10-year fund life.',
    faqs: [
      { q: 'What is the difference between MOIC and IRR?', a: 'MOIC measures the total amount of capital returned relative to invested capital - a simple multiple, time-agnostic. IRR measures the annualised rate of return, accounting for the exact timing of every cash flow. A high MOIC with a slow realisation produces a lower IRR than the same MOIC realised quickly. In private equity, both are always reported together: MOIC for magnitude, IRR for efficiency.' },
      { q: 'What is a good MOIC for private equity?', a: 'Industry benchmarks: below 1.0x means loss of capital; 1.0x-2.0x is below expectations for a standard 5-year PE hold; 2.0x-3.0x is considered adequate to good; 3.0x-5.0x is strong performance; above 5.0x is exceptional, typically reserved for early-stage venture investments in breakout companies. These are gross figures - net MOIC after fees runs 0.3x-0.7x lower.' },
      { q: 'What is the difference between Gross MOIC and Net MOIC?', a: 'Gross MOIC is calculated before deducting management fees and carried interest. Net MOIC reflects what limited partners (investors) actually received after all fees. Management fees (typically 2% per year) reduce capital available for investment; carried interest (typically 20% of profits above the hurdle rate) reduces distributions. A fund with a 3.0x gross MOIC might deliver 2.3x-2.6x net MOIC to investors over a 10-year life.' },
    ],
    quiz: {
      topic: 'MOIC',
      questions: [
        {
          q: 'What does a 3.0x MOIC mean, and what does it NOT tell you?',
          options: ['MOIC is the annualised rate of return on an investment, accounting for the exact timing of each cash inflow and outflow throughout the holding period', 'MOIC is the compound annual growth rate of a fund\'s net asset value, adjusted for management fees and carried interest paid to the general partner', 'Every dollar invested returned three dollars in total (the original dollar plus two dollars of gain), but MOIC says nothing about how long the investment took to achieve that result', 'MOIC is the net present value of all future distributions discounted at the fund\'s hurdle rate, divided by committed capital to produce a per-dollar risk-adjusted return'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition states a 3.0x MOIC means every dollar invested returned three dollars total. However, MOIC is deliberately simple and ignores time - a 3.0x over 3 years and a 3.0x over 10 years are reported identically despite representing roughly 44% vs 12% IRR respectively.',
        },
        {
          q: 'Why are MOIC and IRR always presented together in private equity, rather than just one or the other?',
          options: ['MOIC measures total capital returned as a simple multiple without accounting for time; IRR measures the annualised return accounting for the timing of every cash flow - together they show both the magnitude and the pace of returns', 'MOIC is a gross return measure before fees while IRR is always expressed net of management fees and carried interest, so they complement each other by showing two different fee perspectives on the same investment', 'MOIC is used only for realized investments and IRR only for unrealized ones, so reporting both ensures coverage across the entire portfolio at any point in time', 'MOIC reflects returns across all fund investments combined while IRR applies only to individual portfolio companies, so both are needed to assess fund-level and deal-level performance separately'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition states MOIC shows how much capital was returned and IRR shows how quickly - neither metric alone tells the full story. The same 3.0x MOIC achieved in 3 years versus 10 years produces very different IRRs (roughly 44% vs 12%), which MOIC alone cannot distinguish.',
        },
        {
          q: 'According to the definition, what approximate IRRs correspond to a 3.0x MOIC realised in 3 years versus the same 3.0x realised over 10 years?',
          options: ['3 years = ~25% IRR vs 10 years = ~8% IRR, showing moderate sensitivity of IRR to holding period at 3.0x multiples', '3 years = ~33% IRR vs 10 years = ~10% IRR, the typical range cited in LP benchmark surveys for institutional PE funds', '3 years = ~55% IRR vs 10 years = ~15% IRR, reflecting the outsized annualised impact of compounding at shorter holding periods', '3 years = ~44% IRR vs 10 years = ~12% IRR, demonstrating that identical MOIC figures can represent dramatically different annualised returns'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The definition gives these exact figures: a 3.0x MOIC in three years is roughly a 44% IRR, while the same 3.0x over ten years is roughly 12% IRR. This is why MOIC and IRR are always presented together - MOIC alone cannot reveal how efficiently time was used.',
        },
        {
          q: 'What does the pitfalls section warn about when a fund reports a high gross MOIC with a long hold period?',
          options: ['A high gross MOIC with a long hold automatically means the fund outperformed its benchmark, since absolute return is the only metric that matters to LPs seeking to preserve capital over time', 'A high MOIC with a long hold period can mask a mediocre IRR - a 3.0x over 12 years is only ~9.6% IRR, which is below many institutional hurdle rates. Fees reduce gross MOIC by 0.3x-0.7x further, making the net return even less impressive', 'A high gross MOIC combined with a long hold always indicates fraud or accounting manipulation, since legitimate PE returns require exits within a standard 5-7 year fund cycle', 'Long hold periods produce artificially inflated MOIC figures because distributions are reinvested within the fund structure and compound without fee drag, making comparison to shorter-hold funds misleading'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section states a 3.0x MOIC over 12 years is only ~9.6% IRR - below many institutional hurdle rates. It also warns that fees typically reduce MOIC by 0.3x-0.7x over a 10-year fund life, and that a fast 2.0x in two years produces a 41% IRR - far superior to the slow 3.0x.',
        },
        {
          q: 'According to the FAQ, which MOIC range is considered "adequate to good" performance for a private equity investment?',
          options: ['1.0x-2.0x - the standard acceptable range for a 5-year PE hold that compensates investors for the illiquidity premium over public markets', '1.5x-2.5x - the range covering below-expectations through adequate returns, reflecting median PE fund performance over recent vintages', '2.0x-3.0x - adequate to good; below 2.0x is considered below expectations for a typical 5-year PE hold, while above 3.0x is strong performance', '3.0x-5.0x - the strong performance range that most institutional LP agreements require before carried interest can be claimed by the general partner'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ benchmarks state: below 1.0x means loss of capital; 1.0x-2.0x is below expectations for a standard 5-year PE hold; 2.0x-3.0x is adequate to good; 3.0x-5.0x is strong performance; above 5.0x is exceptional. These are gross figures - net MOIC runs 0.3x-0.7x lower after fees.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'interest-expense': {
    definition: [
      'Interest expense is the cost a company pays to lenders and bondholders for the use of borrowed capital. It accrues based on outstanding debt balances and the applicable interest rate. On the income statement it sits between EBIT (Earnings Before Interest and Tax) and EBT (Earnings Before Tax) - the only line that separates the two metrics.',
      'Interest expense is the mechanism by which financial leverage affects reported earnings. A business with $2M EBIT will report very different EBT depending on whether it is debt-free ($2M EBT) or carrying $20M of debt at 8% ($400K interest expense, $1.6M EBT). Higher debt loads compress EBT and amplify the volatility of Net Income across the business cycle.',
      'Interest expense should not be confused with interest paid. Under accrual accounting, interest expense is recognised as it accrues - regardless of when cash changes hands. A semi-annual coupon bond records monthly interest accruals even though the cash payment occurs twice a year. This timing difference between interest expense and cash interest paid can matter in cash flow analysis.',
    ],
    beginnerExplain: ['Imagine you borrow $10,000 from a bank to buy a car at a 6% annual interest rate. You owe $600 in interest for the year - that\'s your interest expense. For a company it works the same way: every loan, bond, or credit line has an interest rate, and the annual cost of those borrowings shows up on the income statement as interest expense. It comes out of profits before the tax bill is calculated.'],
    whenToUse: 'Focus on interest expense when comparing two companies that look similar at the EBIT level but diverge at EBT or Net Income. The difference is often debt. Track the interest coverage ratio (EBIT / Interest Expense) as the key stress indicator: above 3.0x is comfortable, below 2.0x is a warning, below 1.0x means the company cannot cover interest from operating profit alone.',
    examples: {
      headers: ['Company', 'EBIT', 'Interest Expense', 'EBT', 'Interest Coverage'],
      rows: [
        ['Debt-free SaaS', '$2,000,000', '$0', '$2,000,000', 'N/A'],
        ['Moderately leveraged', '$2,000,000', '$300,000', '$1,700,000', '6.7x'],
        ['Highly leveraged', '$2,000,000', '$1,200,000', '$800,000', '1.7x'],
        ['Below coverage', '$2,000,000', '$2,500,000', '-$500,000', '0.8x'],
      ],
    },
    pitfalls: 'Two traps are common. First, some companies capitalise interest on construction projects - adding it to the asset\'s cost rather than expensing it immediately - which flatters EBIT. Check the notes to financial statements for capitalised interest and add it back when comparing with peers who expense interest directly. Second, income statements sometimes show "net interest expense" (interest expense minus interest income), which understates the gross debt cost for companies holding large cash balances. Always review the gross interest expense and interest income lines separately.',
    faqs: [
      { q: 'What is the difference between interest expense and interest paid?', a: 'Interest expense is the accrued cost on the income statement for the period. Interest paid is the actual cash outflow on the cash flow statement. They differ when payment timing doesn\'t match the accrual period - as with semi-annual bond coupons that record monthly accruals. The cash flow statement reconciles the two.' },
      { q: 'How does interest expense affect EBT?', a: 'EBT = EBIT - Interest Expense. Every dollar of interest reduces EBT by one dollar, which reduces tax and Net Income by less (the tax saving partially offsets the cost). This is why the after-tax cost of debt is lower than the stated rate: after-tax cost = rate × (1 - effective tax rate).' },
      { q: 'What is the interest coverage ratio?', a: 'Interest coverage = EBIT / Interest Expense. It measures how many times over a company can pay its interest from operating profit. A ratio of 3.0x means three dollars of EBIT for every dollar of interest owed. Below 2.0x is a stress warning; below 1.0x means the company cannot service its debt from operations alone.' },
    ],
    quiz: {
      topic: 'interest expense',
      questions: [
        {
          q: 'Where does interest expense sit on the income statement, and what is its relationship to EBIT and EBT?',
          options: ['Interest expense appears above EBIT on the income statement, as a deduction from operating revenue before gross profit is calculated', 'Interest expense appears below EBT on the income statement, after the pre-tax profit line is established and before the tax charge is applied', 'Interest expense sits between EBIT and EBT on the income statement - it is the only line that separates these two metrics, and EBT = EBIT minus interest expense', 'Interest expense is reported separately in the financing activities section of the cash flow statement and does not appear on the income statement'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition states that interest expense sits between EBIT and EBT on the income statement - the only line that separates the two metrics. A company with $2M EBIT reports very different EBT depending on how much debt it carries.',
        },
        {
          q: 'What is the difference between interest expense and interest paid?',
          options: ['Interest expense is the accrued cost recognised on the income statement regardless of when cash is paid; interest paid is the actual cash outflow recorded on the cash flow statement - they differ when payment timing does not match the accrual period', 'Interest expense includes all financing costs including bond premiums and loan origination fees; interest paid refers only to the periodic coupon payments made to bondholders', 'Interest expense is calculated on the principal outstanding at year-end; interest paid is calculated on the average balance throughout the year, making interest paid typically lower for declining-balance loans', 'Interest expense and interest paid are always the same figure; the distinction only matters for cash-basis filers who record expenses when cash is actually transferred'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition explains that interest expense is recognised as it accrues under accrual accounting, regardless of when cash changes hands. A semi-annual coupon bond records monthly interest accruals even though cash is paid only twice a year, creating a timing difference between the income statement and cash flow statement figures.',
        },
        {
          q: 'According to the examples table, what is the interest coverage ratio for the "highly leveraged" company?',
          options: ['6.7x - sufficient coverage with comfortable headroom above the 3.0x threshold', '3.0x - exactly at the minimum comfortable threshold described in the entry', '2.0x - at the warning threshold where stress begins to show', '1.7x - below the 2.0x stress warning level, meaning the company has limited buffer before it cannot cover interest from operating profit'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The examples table shows the highly leveraged company has EBIT of $2,000,000 and interest expense of $1,200,000, giving a coverage ratio of 1.7x. The whenToUse section identifies below 2.0x as a warning level and below 1.0x as inability to cover interest from operations.',
        },
        {
          q: 'What accounting treatment does the pitfalls section warn can cause interest expense to be understated and EBIT to be overstated?',
          options: ['Companies sometimes classify interest expense as an SG&A cost to exclude it from operating margin and flatter EBITDA comparisons with peers', 'Some companies capitalise interest on construction projects - adding it to the asset\'s cost rather than expensing it immediately - which flatters EBIT; check the notes and add capitalised interest back when comparing with peers who expense directly', 'Companies in high-tax jurisdictions sometimes defer interest expense recognition to future periods when the tax shield will be more valuable, temporarily understating the current period\'s interest charge', 'Certain regulated industries allow companies to record interest as revenue when borrowing from group entities, netting the income against expense and dramatically understating gross interest costs'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section warns that some companies capitalise interest on construction projects - adding it to the asset\'s cost rather than expensing it immediately - which flatters EBIT. The second trap is net interest expense presentation, which can understate gross debt cost for companies with large cash balances.',
        },
        {
          q: 'Why is the after-tax cost of debt lower than the stated interest rate?',
          options: ['Interest expense increases EBT by reducing total tax liability, so the gross cost of debt is always lower than the stated coupon rate by a fixed 35%', 'Interest expense is non-deductible for corporate tax in most jurisdictions, but lenders discount the rate for creditworthy borrowers who avoid default risk', 'Because interest expense reduces EBT, the tax on net income falls by the marginal rate on each dollar of interest, making the after-tax cost of debt equal to the stated rate multiplied by (1 minus the effective tax rate)', 'The tax benefit of interest expense is capped at the company\'s dividend yield, because regulators treat debt above that level as equity substitution and deny the deduction'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The FAQ explains that every dollar of interest reduces EBT by one dollar, which reduces tax and net income by less than a dollar because the tax saving partially offsets the cost. The after-tax cost of debt = stated rate x (1 - effective tax rate).',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'principal-and-interest': {
    definition: [
      'Principal and Interest (P&I) are the two components of every fixed-rate amortising loan payment. Principal is the portion that reduces the outstanding loan balance - the amount originally borrowed. Interest is the lender\'s charge for extending credit, calculated as a percentage of the remaining balance at the start of each payment period. Together they make up the calculated monthly payment figure; they do not include property taxes, homeowner\'s insurance, or mortgage insurance, which are separate costs often collected alongside P&I.',
      'The split between principal and interest is not fixed. Because interest is charged on the remaining balance, and that balance is at its maximum on day one, early payments are heavily weighted toward interest. As each payment is made, the balance falls slightly, reducing the next interest charge by a small amount. This compounds over time: in the final years of a 30-year mortgage, the interest portion is tiny because the balance has fallen so low. The process of gradually shifting from interest-heavy to principal-heavy payments is called amortisation.',
      'For a standard 30-year fixed-rate mortgage at 7%, the monthly payment is fixed for all 360 months. But only $246 of Month 1\'s $1,996 payment (12%) reduces the balance; $1,750 (88%) is interest. By Month 180, roughly $696 goes to principal and $1,300 to interest. By Month 360, nearly the entire payment is principal. Over the life of the loan, $418,527 in total interest is paid on the original $300,000 - the lender earns 1.4 times the loan amount in interest charges alone.',
    ],
    beginnerExplain: ['Think of P&I like a restaurant tab that charges a daily fee for staying open. The tab itself is the principal - what you originally owe. The daily fee is interest - the cost of leaving the balance unpaid. Each payment covers that period\'s fee first, then whatever is left chips away at the tab. In Month 1 the tab is at its maximum, so the fee is at its maximum and very little of your payment actually reduces the debt. As months pass and the tab shrinks, the fee shrinks too, and more of each payment goes toward clearing the balance. The payment amount never changes - only the fee-to-balance split shifts, slowly at first, then faster as the balance falls.'],
    whenToUse: 'Analyse the P&I split when evaluating whether to choose a shorter loan term, make extra principal payments, or refinance. The amortisation schedule reveals how much equity is actually building in the early years - often far less than the total payment suggests. Use a 15-year vs 30-year comparison to quantify the interest saving against the higher monthly payment. Extra payments made in Years 1-5 reduce total interest significantly more than the same payment made in Year 20, because they lower the balance on which interest will compound for the remaining term.',
    examples: {
      headers: ['Month', 'Payment', 'Interest', 'Principal', 'Remaining balance'],
      rows: [
        ['1', '$1,996', '$1,750 (87.7%)', '$246 (12.3%)', '$299,754'],
        ['60 (Year 5)', '$1,996', '$1,649 (82.6%)', '$347 (17.4%)', '$282,376'],
        ['180 (Year 15)', '$1,996', '$1,300 (65.1%)', '$696 (34.9%)', '$222,766'],
        ['300 (Year 25)', '$1,996', '$764 (38.3%)', '$1,232 (61.7%)', '$129,888'],
        ['360 (Year 30)', '$1,996', '$12 (0.6%)', '$1,984 (99.4%)', '$0'],
      ],
    },
    pitfalls: 'The most common misconception is treating early mortgage payments as equity-building. On a 30-year mortgage at 7%, only 12% of Month 1\'s payment reduces the balance. After 5 years of payments - $119,760 paid - the outstanding balance has only fallen by roughly $17,600. That means more than 85 cents of every early dollar paid went to interest, not ownership. This is not a feature of any specific lender - it is the mathematical structure of amortising loans. Anyone evaluating whether to sell or refinance within 5 years should calculate the actual principal repaid before assuming they have built meaningful equity.',
    faqs: [
      { q: 'What is the difference between P&I and PITI?', a: 'P&I (Principal and Interest) is the core repayment component determined by the loan amount, rate, and term. PITI extends this to include Property Taxes (T) and Homeowner\'s Insurance (I), which many lenders collect monthly and hold in escrow. Some loans also include PMI (private mortgage insurance) when the down payment is below 20%. The P&I portion is fixed for a fixed-rate loan; the T and I portions adjust annually as tax assessments and insurance premiums change.' },
      { q: 'Why does most of the early mortgage payment go to interest?', a: 'Because interest is charged on the outstanding balance, and the balance starts at its maximum - the full loan amount. At 7%, a $300,000 balance generates $1,750 of interest in Month 1. After that payment, only $246 is applied to the balance. The next month\'s interest is calculated on $299,754 - a difference of just $1.43. The balance falls slowly at first, so the interest portion shrinks slowly. This accelerates as the balance compounds downward through the later years of the loan.' },
      { q: 'Does paying extra principal change the monthly P&I payment?', a: 'No, for a standard amortising fixed-rate loan. Extra payments reduce the outstanding balance and shorten the remaining term, but the contractual monthly payment stays the same - the loan simply ends earlier. Some lenders offer loan recasting (re-amortising at the lower balance to produce a reduced monthly payment), but this typically requires a lump sum and a recast fee. A standard extra payment does not trigger recasting automatically.' },
    ],
    quiz: {
      topic: 'principal and interest',
      questions: [
        {
          q: 'What is the principal component of a loan payment?',
          options: ['The lender\'s charge for extending credit, calculated on the remaining balance', 'The total monthly payment minus property taxes and insurance', 'The portion that reduces the outstanding loan balance', 'The fixed interest charged at the start of the loan term'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'Principal is the portion of each payment that reduces the outstanding balance - the amount originally borrowed. Interest is the separate charge for extending credit, calculated on the remaining balance each period.',
        },
        {
          q: 'In Month 1 of a $300,000, 30-year mortgage at 7%, approximately what percentage of the $1,996 payment goes to principal?',
          options: ['12.3%', '34.9%', '50.0%', '61.7%'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'Only $246 of Month 1\'s $1,996 payment (12.3%) reduces the balance; $1,750 (87.7%) is interest. Because interest is charged on the full $300,000 balance, the interest charge is at its maximum on day one.',
        },
        {
          q: 'Why do extra principal payments made in Years 1-5 of a mortgage save more total interest than the same payment made in Year 20?',
          options: ['The interest rate applied to the loan is higher in the early years', 'Early payments are processed before interest accrues each month', 'The mortgage balance is not yet accruing interest in the first five years', 'They reduce the balance on which interest compounds for the entire remaining term'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'An extra payment in Year 1 lowers the balance that generates interest for the next 29 years. The same payment in Year 20 only avoids interest on a much smaller remaining balance for 10 years - far less impact.',
        },
        {
          q: 'After 5 years of payments on a $300,000, 30-year mortgage at 7%, how much has the outstanding balance actually fallen?',
          options: ['About $60,000', 'About $17,600', 'About $40,000', 'About $50,000'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'Despite paying $119,760 over five years, the balance falls by only roughly $17,600 - meaning more than 85 cents of every early dollar went to interest, not equity. This is the mathematical structure of amortising loans, not a lender-specific feature.',
        },
        {
          q: 'For a standard fixed-rate amortising loan, what happens to the monthly P&I payment when a borrower makes an extra principal payment?',
          options: ['It permanently decreases to reflect the lower balance', 'It temporarily decreases for the following month only', 'It stays the same but the loan ends earlier', 'The lender automatically recasts the loan to a lower payment'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'Extra payments reduce the outstanding balance and shorten the remaining term, but the contractual monthly payment stays the same. Loan recasting - which would reduce the payment - requires a separate lump sum and recast fee and does not happen automatically.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'flsa-duties-test': {
    definition: [
      'The FLSA Duties Test is the second of two requirements a salaried employee must meet before an employer can legally withhold overtime pay. The first requirement is the salary test: the employee must earn at least $684 per week ($35,568 per year) on a guaranteed salary or fee basis, meaning their pay cannot be docked for variations in the quality or quantity of work. The second requirement - the duties test - examines whether the employee\'s actual job responsibilities fall within one of five recognized white-collar exemption categories. Both tests must be satisfied. An employee earning $2,000 per week who fails the duties test remains entitled to FLSA overtime.',
      'The five white-collar exemptions cover: Executive (managing the enterprise or a recognized department, directing at least two full-time equivalent subordinates, and holding real authority to hire or fire); Administrative (primary duty of non-manual work directly related to management or general business operations, combined with the exercise of discretion and independent judgment on matters of significance); Learned or Creative Professional (work requiring advanced knowledge customarily acquired through prolonged specialized study, such as medicine, law, accounting, or engineering - or work requiring invention and originality in a recognized artistic field); Outside Sales (making sales or obtaining orders while customarily and regularly working away from the employer\'s place of business - this exemption has no salary threshold); and Computer Employee (high-level systems analysis, software design, programming, or testing work, qualifying either on a salary basis at $684/week or at an hourly rate of at least $27.63).',
      'The "primary duty" standard governs which tasks count toward exemption. Under 29 CFR 541.700, primary duty means the principal, main, major, or most important duty the employee performs - not necessarily the one that consumes the most hours. A store manager who spends 70% of their shift stocking shelves alongside staff can still have a primary duty of management if that management function is what drives the department\'s operation. This is the "concurrent duties" doctrine, and it is why a time-and-motion study alone does not determine exempt status.',
      'The Highly Compensated Employee (HCE) shortcut applies to employees earning at least $107,432 per year in total annual compensation (with at least $684/week paid on salary or fee basis). HCE employees only need to "customarily and regularly" perform at least one executive, administrative, or professional duty - a significantly lighter standard than the full duties test. The HCE threshold is indexed and reviewed periodically by the Department of Labor.',
    ],
    beginnerExplain: ['Think of the duties test as a two-lock system. Your employer claims you do not need overtime pay because you are a salaried employee. To legally make that claim, they must open two locks: first, your salary must be at least $684 per week on a guaranteed basis (the salary lock). Second, your actual day-to-day work - not your job title, but what you genuinely do - must match one of five government-defined categories (the duties lock). An employee titled "Manager" who never manages anyone fails the duties lock. An employee titled "Associate" who genuinely runs a team, approves hires, and sets department priorities may pass it. If either lock fails, overtime applies regardless of what the business card says.'],
    whenToUse: 'Use the duties test framework whenever a salaried employee regularly works more than 40 hours per week without receiving overtime pay. If you are an employee, check your own classification: does your current salary clear $684/week on a guaranteed basis, and do your actual responsibilities genuinely match one of the five exemption categories? Employers use the test when structuring new roles, reclassifying existing ones, or responding to a DOL audit. HR professionals and employment attorneys use it when reviewing misclassification risk across a workforce - particularly in industries such as retail, banking, insurance, and professional services where the administrative exemption is frequently over-applied.',
    examples: {
      headers: ['Exemption', 'Core requirement', 'Typically qualifies', 'Typically does not qualify'],
      rows: [
        ['Executive', 'Manages enterprise or recognized department; directs 2+ FTE; real hire/fire authority', 'Store manager with staffing control; department head who sets team priorities', '"Shift lead" who watches a crew but cannot hire, fire, or alter schedules'],
        ['Administrative', 'Non-manual work related to management + genuine discretion on matters of significance', 'HR director setting compensation policy; underwriter approving large risks', 'Claims processor following a rigid manual; customer service rep resolving complaints from a script'],
        ['Learned Professional', 'Advanced knowledge in science or learning, customarily acquired by prolonged specialized study', 'Doctor, lawyer, CPA, registered engineer, teacher', 'Paralegal (debated); bookkeeper; licensed practical nurse (LPN, typically non-exempt)'],
        ['Outside Sales', 'Makes sales away from employer\'s place of business; no salary threshold required', 'Territory sales rep who visits clients; insurance agent who meets prospects on-site', 'Inside telephone sales representative working from a company office'],
        ['Computer Employee', 'High-level systems analysis, design, programming, or testing; $684/week salary OR $27.63/hr hourly', 'Senior software engineer designing architecture; lead systems analyst', 'Help-desk technician following troubleshooting scripts; IT support worker'],
      ],
    },
    pitfalls: 'Job title is the most common source of misclassification. An employee titled "Administrative Coordinator" must still satisfy the discretion and independent judgment requirement; the word "Administrative" in the title carries no legal weight under the FLSA. The administrative exemption generates more litigation than any other because "discretion and independent judgment with respect to matters of significance" is inherently fact-specific. Applying a detailed procedure manual precisely, or resolving issues within pre-set authority limits, is skilled rule-following - not discretion and independent judgment. The California trap catches many multi-state employers: California\'s IWC Wage Orders require that exempt employees spend more than 50% of their working time actually performing exempt duties. The federal "primary duty" standard does not impose a percentage floor. An employee who is federal-exempt may still be California-non-exempt, and California\'s overtime exposure can span three years (versus two under the FLSA) with no cap on liquidated damages.',
    faqs: [
      {
        q: 'Can a salaried employee earning well above $684/week still be entitled to overtime?',
        a: 'Yes. Earning above the salary threshold is necessary but not sufficient. An employee earning $1,500 per week who spends most of their time performing routine, non-discretionary tasks fails the duties test and remains entitled to FLSA overtime. This situation is common after promotions where the salary rises above the threshold but the employee\'s actual responsibilities do not change to match an exempt category.',
      },
      {
        q: 'What does "primary duty" mean - is it about the percentage of time spent?',
        a: 'Time spent is relevant but not determinative. The DOL\'s regulation at 29 CFR 541.700 defines primary duty as the "principal, main, major, or most important duty" the employee performs. Under the concurrent duties doctrine, a manager who spends 70% of their hours working alongside subordinates on non-exempt tasks can still have a primary duty of management if the management function is what the role is built around and what gives the employee authority over the team.',
      },
      {
        q: 'Why is the administrative exemption the most litigated of the five?',
        a: 'The phrase "discretion and independent judgment with respect to matters of significance" has no bright-line definition. Courts distinguish between employees who make genuine independent choices with real business consequences - an insurance underwriter approving a $10 million policy, an HR director redesigning a benefits structure - and employees who follow elaborate rules with no real freedom to deviate, such as a loan officer applying a pre-set credit matrix or a compliance analyst checking documents against a fixed checklist. The distinction is not about job complexity or seniority; it is about whether the employee genuinely exercises choice or merely executes a pre-determined process.',
      },
      {
        q: 'What does an employer owe if a worker is misclassified as exempt?',
        a: 'The worker is entitled to recover up to two years of unpaid overtime (three years for a willful violation). The employer may also owe an equal amount as liquidated damages, plus attorney\'s fees and costs. DOL investigations can trigger back-pay obligations for the entire affected workforce, not just the individual who complained. Class-action misclassification settlements in retail, financial services, and insurance regularly reach seven figures. Misclassification risk is highest in industries that have historically over-applied the administrative exemption to large groups of white-collar workers.',
      },
      {
        q: 'How does the computer employee exemption differ from the other four?',
        a: 'It is the only white-collar exemption that can be satisfied by an hourly-paid worker. All other exemptions require the employee to be paid on a salary or fee basis - hourly pay automatically makes a worker non-exempt regardless of duties. Computer employees can qualify either on a salary basis (at least $684/week) or as an hourly worker earning at least $27.63 per hour. The duties requirement is the same either way: the work must involve high-level application of systems analysis, software design, programming, or testing - not routine operations, user training, or help-desk support.',
      },
    ],
    quiz: {
      topic: 'FLSA duties test',
      questions: [
        {
          q: 'What are the TWO requirements an employer must satisfy to legally exempt a salaried employee from FLSA overtime?',
          options: ['The employee must have a supervisory title and earn above the federal minimum wage annualized to 40 hours', 'The salary test (at least $684/week on a guaranteed basis) AND the duties test (actual job responsibilities match one of five white-collar exemption categories)', 'The salary test alone - any employee earning above $684/week is automatically exempt from overtime under the FLSA', 'The duties test alone - employees whose job duties qualify are exempt regardless of how much they earn per week'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition describes the FLSA exemption as a "two-lock system." Both must be satisfied: the salary test (at least $684/week guaranteed) and the duties test (actual responsibilities match an exemption category). Either lock failing means overtime applies.',
        },
        {
          q: 'Which of the five white-collar exemptions has NO salary threshold requirement?',
          options: ['Executive - because the management function implicitly exceeds the salary threshold', 'Administrative - because non-manual office work is treated as inherently professional', 'Outside Sales - because the exemption applies to field salespeople regardless of how they are paid', 'Computer Employee - because tech roles are separately governed by DOL wage guidance'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition explicitly notes the Outside Sales exemption has no salary threshold. Salespeople who make sales or obtain orders while customarily working away from the employer\'s place of business qualify regardless of their pay structure.',
        },
        {
          q: 'Under the FLSA "primary duty" standard, what determines exempt status?',
          options: ['The employee must spend more than 50% of working hours performing exempt duties - time allocation is the sole legal test', 'The principal, main, or most important duty performed - under the concurrent duties doctrine a manager spending 70% of time on non-exempt tasks can still qualify', 'The job title assigned by the employer - "Manager" and "Director" titles automatically satisfy the duties test', 'The number of subordinates supervised - managing at least five full-time employees satisfies the executive exemption'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition states "primary duty" means the principal, main, or most important duty - not necessarily the one consuming the most hours. Under the concurrent duties doctrine, a store manager spending 70% on non-exempt shelf-stocking can still have a primary duty of management if that function defines the role.',
        },
        {
          q: 'What is the "California trap" described in the pitfalls section?',
          options: ['California requires all workers to receive the California minimum wage regardless of FLSA exempt status or salary level', 'California IWC Wage Orders require exempt employees to spend more than 50% of time on exempt duties, stricter than the federal primary duty standard - an employee who is federal-exempt may still be California-non-exempt', 'California extends the FLSA administrative exemption to include all office workers regardless of discretion, creating broader exemptions than federal law', 'California caps misclassification liability at one year of back pay, a more favorable standard than the two-year federal FLSA limit'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section warns multi-state employers that California IWC Wage Orders impose a 50%+ time requirement for exempt duties - stricter than the federal primary duty standard. California\'s overtime exposure also spans three years (versus two under FLSA) with no cap on liquidated damages.',
        },
        {
          q: 'What is the Highly Compensated Employee (HCE) shortcut, and how does it differ from the standard duties test?',
          options: ['HCE employees are entirely exempt from the FLSA, including minimum wage requirements, once they earn above $107,432', 'HCE employees at $107,432+ annually only need to "customarily and regularly" perform at least one exempt duty - a lighter standard than the full duties test', 'HCE employees must satisfy a stricter duties test with all five exemption categories applying simultaneously due to their compensation level', 'HCE status removes the salary threshold entirely so duties alone determine overtime eligibility above $107,432'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition explains that HCE employees earning at least $107,432 annually (with at least $684/week on salary) face a lighter standard: they need only "customarily and regularly" perform at least one executive, administrative, or professional duty. This is significantly easier to satisfy than the full duties test.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'valuation-multiple': {
    definition: [
      'A valuation multiple is a ratio that expresses the price of a business as a multiple of a financial metric - most commonly EBITDA, revenue, earnings, or cash flow. The metric chosen depends on the nature of the business: EBITDA multiples suit profitable, mature companies where D&A is large; revenue multiples are used for high-growth, pre-profit businesses where no earnings yet exist to divide by.',
      'Multiples fall into two families based on their numerator. Enterprise Value multiples (EV/EBITDA, EV/Revenue, EV/EBIT, EV/FCF) use total business value including debt and cash. Equity multiples (P/E, Price/Book, Price/FCF-to-equity) use only market capitalisation. The cardinal rule: always match numerator to denominator. EV against EBITDA (which belongs to all capital providers), market cap against net income (which belongs only to shareholders). Mixing the two - for example, dividing EV by Net Income - produces a meaningless ratio and is one of the most common errors in valuation practice.',
      'Because multiples compress a complex business into a single number, they are most useful for relative valuation: screening whether one company appears cheap or expensive compared with peers. A 10x EV/EBITDA tells you nothing in isolation; it only becomes meaningful when you know the industry median is 8x (implying a premium) or 14x (implying a discount). Multiples are also highly sensitive to the interest rate environment - low rates inflate multiples, high rates compress them - so always anchor comparisons to a consistent time period.',
    ],
    beginnerExplain: ['Imagine your local bakery earns $50,000 profit a year. If a buyer offers $500,000 to purchase it, they\'re paying 10 times the annual profit - a "10x multiple." If a similar bakery sold last year for $700,000, that one went at 14x. Investors use multiples exactly like this: they level the playing field so you can compare whether one business is priced higher or lower than another relative to what it earns, regardless of the absolute size.'],
    whenToUse: 'Use multiples for quick comparable screening - to flag whether a company looks expensive or cheap versus peers - before doing deeper discounted cash flow analysis. Always compare companies in the same industry and at a similar stage of growth. Use EV multiples (EV/EBITDA, EV/Revenue) when the companies you are comparing have different capital structures; use equity multiples (P/E, P/Book) when you are specifically analysing returns to shareholders.',
    examples: {
      headers: ['Company type', 'Multiple used', 'Numerator', 'Denominator', 'Typical range'],
      rows: [
        ['Profitable SaaS', 'EV/Revenue', 'Enterprise Value', 'Revenue', '5x - 15x'],
        ['Mature manufacturer', 'EV/EBITDA', 'Enterprise Value', 'EBITDA', '6x - 12x'],
        ['Pre-profit biotech', 'EV/Revenue', 'Enterprise Value', 'Revenue', '3x - 8x'],
        ['Large-cap equity', 'P/E', 'Market Cap', 'Net Income', '15x - 25x'],
        ['Established bank', 'Price/Book', 'Market Cap', 'Book Value', '0.8x - 2.0x'],
      ],
    },
    pitfalls: 'Cross-sector multiple comparisons are the most frequent mistake. A software company at 20x EBITDA and a retailer at 6x are not one overvalued and one cheap - they are structurally different businesses with different growth rates, capital intensity, and risk. Multiples also reflect the interest rate environment at the time of measurement: the same business will trade at a higher multiple when rates are low (future cash flows are discounted less) and a lower multiple when rates are high. Using pre-2022 benchmarks to value a 2025 business can overstate value by 30-50%. Always anchor your reference multiples to the current rate environment and recent comparable transactions.',
    faqs: [
      { q: 'What is the difference between an EV multiple and an equity multiple?', a: 'EV multiples use Enterprise Value (equity + net debt) in the numerator and a metric that belongs to all capital providers - EBITDA, EBIT, Revenue - in the denominator. Equity multiples use Market Capitalisation and metrics that belong only to shareholders - Net Income, Book Value, Free Cash Flow to Equity. Mixing numerators and denominators (e.g. EV / Net Income or Market Cap / EBITDA) produces a meaningless ratio and is a common analytical error.' },
      { q: 'Why do high-growth companies trade at higher multiples?', a: 'A multiple is a simplified discounted cash flow. A faster-growing business will generate substantially more earnings in years 3-7 than it does today. Buyers pay for those future earnings now, driving up the current multiple. A SaaS company growing 30% per year commands 20x EV/Revenue because investors are pricing in the earnings it does not yet have. A business with 0% growth commands a lower multiple because future earnings will look much like current earnings.' },
      { q: 'Are multiples useful for valuing private companies?', a: 'Yes - comparable company multiples are one of the three main methods for private business valuation (alongside DCF and precedent transactions). Apply the public market multiple for the closest peer group, then apply a private company discount of typically 15-30% to account for illiquidity and concentration risk. The discount narrows as the private company grows larger and more institutional in its operations.' },
    ],
    quiz: {
      topic: 'valuation multiples',
      questions: [
        {
          q: 'What does a valuation multiple express?',
          options: ['A business\'s current market capitalisation divided by its book value of assets', 'The premium an acquirer pays above the target\'s last reported share price', 'A company\'s expected earnings growth rate over the next five years', 'The price of a business as a multiple of a financial metric such as EBITDA, revenue, or earnings'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'A valuation multiple is a ratio that expresses the price of a business as a multiple of a financial metric - most commonly EBITDA, revenue, earnings, or cash flow. The metric chosen depends on the nature of the business.',
        },
        {
          q: 'Why must Enterprise Value (EV) be used as the numerator when the denominator is EBITDA?',
          options: ['EBITDA belongs to all capital providers (debt and equity holders alike), so the numerator must reflect total business value including debt', 'EBITDA is a post-interest metric, so it belongs only to equity shareholders, requiring market cap as the numerator', 'EV and EBITDA both exclude non-cash items, making them conceptually consistent in the same way net income and market cap are consistent', 'Using market cap with EBITDA is acceptable when comparing companies in the same sector with similar debt levels'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The definition states the cardinal rule: always match numerator to denominator. EBITDA belongs to all capital providers, so you must use Enterprise Value (equity + net debt) in the numerator. Dividing EV by Net Income - or Market Cap by EBITDA - produces a meaningless ratio.',
        },
        {
          q: 'According to the examples table, which multiple is typically used to value a mature manufacturer, and what is its typical range?',
          options: ['P/E ratio (market cap / net income), 15x - 25x', 'Price/Book (market cap / book value), 0.8x - 2.0x', 'EV/EBITDA, 6x - 12x', 'EV/Revenue, 5x - 15x'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The examples table shows that mature manufacturers are valued using EV/EBITDA in a range of 6x to 12x. EBITDA multiples suit profitable, mature companies where depreciation and amortization are large relative to earnings.',
        },
        {
          q: 'What does the pitfalls section warn about using pre-2022 benchmarks to value a 2025 business?',
          options: ['Pre-2022 multiples used book value denominators, making them incompatible with today\'s EBITDA-based standards', 'It can overstate value by 30-50% because multiples inflate when interest rates are low and compress when rates rise', 'Pre-2022 transactions involved primarily private equity buyers who pay structurally higher multiples than strategic acquirers', 'Using older benchmarks understates value because companies were smaller then and growth expectations have since risen'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'Multiples are highly sensitive to the interest rate environment. Low rates inflate multiples (future cash flows are discounted less); high rates compress them. Using pre-2022 low-rate benchmarks to value a 2025 business can overstate value by 30-50%.',
        },
        {
          q: 'When applying public market multiples to value a private company, what discount does the FAQ recommend and why?',
          options: ['5-10% to account for the extra reporting costs of remaining private', '35-50% because private companies are typically much smaller than their public peers', 'No discount; public and private multiples are directly comparable when the business model matches', '15-30% to account for illiquidity and concentration risk'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The FAQ states to apply the public market multiple for the closest peer group, then apply a private company discount of typically 15-30% to account for illiquidity and concentration risk. The discount narrows as the private company grows larger and more institutional in its operations.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'metric-system': {
    definition: [
      'The metric system is the international decimal system of measurement, formally known as the International System of Units (SI). Its seven base units are the meter (length), kilogram (mass), second (time), ampere (electric current), kelvin (thermodynamic temperature), mole (amount of substance), and candela (luminous intensity). All other SI units - newtons, joules, pascals, watts - are derived from combinations of these seven.',
      'The system\'s defining feature is its decimal structure: every unit steps up or down by a factor of 10 using standardized prefixes. A kilometer is 1,000 meters; a centimeter is one-hundredth of a meter; a millimeter is one-thousandth. This makes arithmetic straightforward compared to converting feet to miles or ounces to pounds, where each conversion requires a different ratio.',
      'Adopted formally by France in 1795 and spread globally through trade and treaty, the metric system is now the legal system of measurement in 195 of 196 countries. The United States is the most notable exception; it uses US customary units for everyday commerce but relies on metric for science, medicine, the military, and pharmaceutical manufacturing.',
    ],
    beginnerExplain: [
      'Think of metric as "counting in tens at every level." If you know that 1 meter = 100 centimeters and 1 kilogram = 1,000 grams, you can rescale any measurement by moving a decimal point - no memorizing that 5,280 feet make a mile or 16 ounces make a pound.',
      'The same prefix works identically for every base unit: kilo always means 1,000 (kilometer, kilogram, kilojoule), centi always means 1/100 (centimeter, centiliter), milli always means 1/1,000 (millimeter, milligram, millisecond). Learn the prefixes once and they apply everywhere.',
    ],
    whenToUse: 'Use metric when communicating across borders, performing scientific calculations, or working in medicine, engineering, or manufacturing. If you receive measurements in imperial and need to do arithmetic or compare values, convert to metric first. The only reason to stay in imperial is when your specific audience expects those units.',
    examples: {
      headers: ['Prefix', 'Symbol', 'Factor', 'Example'],
      rows: [
        ['giga', 'G', '1,000,000,000 (10^9)', '1 gigabyte = 1,000 megabytes'],
        ['mega', 'M', '1,000,000 (10^6)', '1 megameter = 1,000 km'],
        ['kilo', 'k', '1,000 (10^3)', '1 kilometer = 1,000 meters'],
        ['(base)', '-', '1', 'meter, gram, liter, second'],
        ['centi', 'c', '0.01 (10^-2)', '1 cm = 0.01 meter'],
        ['milli', 'm', '0.001 (10^-3)', '1 mm = 0.001 meter'],
        ['micro', 'μ', '0.000001 (10^-6)', '1 micrometer = 0.000001 m'],
      ],
    },
    pitfalls: 'The most common metric confusion is treating "weight" and "mass" as the same thing. The kilogram is a unit of mass; weight (the force due to gravity) is measured in newtons. In everyday use this distinction is ignored, but in science and engineering it matters. A second common mistake: "metric ton" (tonne, 1,000 kg) is a valid metric unit, but a "US ton" (short ton, 907 kg) is not - and the two differ by almost 10%.',
    faqs: [
      { q: 'What is the simple definition of the metric system?', a: 'A decimal system of measurement where all units relate by powers of 10. It is built on 7 SI base units and a set of standard prefixes (kilo-, centi-, milli-) that work identically across all physical quantities. The same prefix means the same multiplier whether applied to meters, grams, liters, or seconds.' },
      { q: 'How many countries use the metric system?', a: '195 of 196 countries have officially adopted the metric system. The United States is the most notable holdout, using US customary units for everyday commerce while relying on metric for science, medicine, and international trade. Myanmar and Liberia are the other two countries without official metrication, though all three use metric in technical contexts.' },
      { q: 'What are the 7 SI base units?', a: 'Metre (length), kilogram (mass), second (time), ampere (electric current), kelvin (thermodynamic temperature), mole (amount of substance), and candela (luminous intensity). All other SI units are derived from combinations of these seven. For example, a newton (force) = kg x m/s2, and a joule (energy) = kg x m2/s2.' },
      { q: 'What is the difference between metric and imperial?', a: 'Metric uses a base-10 structure with consistent prefixes, so all unit conversions involve multiplying or dividing by powers of 10. Imperial uses irregular historical ratios that vary by quantity: 12 inches per foot, 16 ounces per pound, 1,760 yards per mile. Metric arithmetic is generally faster and less error-prone for any calculation beyond simple look-ups.' },
      { q: 'Why doesn\'t the US use the metric system?', a: 'The US attempted metrication after passing the Metric Conversion Act of 1975, but adoption was voluntary and stalled due to industry inertia and public resistance. US manufacturing, construction, and everyday commerce remain on US customary units. Science, medicine, the military, and pharmaceutical production use metric exclusively - so the US effectively runs two parallel unit systems.' },
    ],
    quiz: {
      topic: 'the metric system',
      questions: [
        {
          q: 'What is the formal name of the metric system?',
          options: [
            'The British System of Units',
            'The International System of Units (SI)',
            'The Universal Decimal System',
            'The French Base-10 Standard',
          ] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The metric system is formally called the International System of Units, abbreviated SI from the French "Systeme International d\'unites." It was adopted in 1960 at the General Conference on Weights and Measures and defines the 7 base units still in use today.',
        },
        {
          q: 'How many millimeters are in 1 meter?',
          options: ['100', '10', '10,000', '1,000'],
          correct: 3 as const,
          explanation: '1 meter = 1,000 millimeters. The prefix "milli" always means 1/1,000 (10^-3), so a millimeter is one-thousandth of a meter. This same ratio applies to milligrams (1/1,000 of a gram) and milliseconds (1/1,000 of a second).',
        },
        {
          q: 'What makes the metric system easier to use for arithmetic than imperial?',
          options: [
            'It uses larger units, reducing the number of conversions needed',
            'It is based on powers of 10, so unit conversions only require moving a decimal point',
            'Its units were standardised first, giving it historical precedence',
            'It uses the same unit names across all countries',
          ] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'Every metric conversion is a multiplication or division by a power of 10. Converting 5,280 meters to kilometers is 5.280 (divide by 1,000). The imperial equivalent - 5,280 feet to miles - requires knowing the 5,280 ratio, then dividing by it.',
        },
        {
          q: 'Which of the following is the most notable country that has NOT officially adopted the metric system as its primary everyday system?',
          options: ['United Kingdom', 'France', 'United States', 'Australia'],
          correct: 2 as const,
          explanation: 'The United States is the most prominent non-metric country. It passed the Metric Conversion Act in 1975 but adoption was voluntary and did not take hold in everyday commerce. The UK, France, and Australia all use metric as their primary measurement system.',
        },
        {
          q: 'Which prefix means one-thousandth (0.001)?',
          options: ['milli-', 'centi-', 'micro-', 'deci-'],
          correct: 0 as const,
          explanation: 'Milli- means 10^-3 = 0.001. A millimeter is 0.001 meters; a milligram is 0.001 grams. Centi- means 0.01 (10^-2), deci- means 0.1 (10^-1), and micro- means 0.000001 (10^-6).',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'mid-market-rate': {
    definition: [
      'The mid-market rate - also called the interbank rate or spot rate - is the midpoint between the bid price and the ask price for a currency pair on the global foreign exchange market. It is calculated as (bid + ask) / 2. This is the rate at which major banks and financial institutions trade currencies with each other in the wholesale FX market, with no retail markup included.',
      'When a consumer or business exchanges money, the provider sources currency at or near the mid-market rate and sells it at a marked-up rate to cover costs and earn a profit. The bid price is what the market maker pays to buy a currency from you; the ask price is what they charge to sell it to you. The mid-market sits exactly between these two - which is why it is the fairest and most neutral benchmark for comparing any exchange offer.',
      'The mid-market rate fluctuates continuously during trading hours - Monday through Friday, 24 hours a day - as supply and demand for each currency shifts in response to economic data, central bank decisions, and market sentiment. The ECB publishes daily euro reference rates at around 16:00 CET based on a concertation of rates from major market participants. Bloomberg and Reuters publish continuously updated mid-market rates throughout the trading day.',
    ],
    beginnerExplain: [
      'Think of buying and selling used cars. A dealer buys your car at one price (bid) and sells it to the next buyer at a higher price (ask). The mid-market rate is the midpoint between these two prices - what the car is "really worth" before the dealer takes their cut.',
      'In currency markets, the dealer is the bank or exchange bureau. When you swap dollars for euros, the bank is acting as that dealer: buying your dollars cheaply and selling euros to you at a markup.',
      'Knowing the mid-market rate tells you exactly what a dollar is worth in euros before any fee - so you can calculate precisely how much any exchange is costing you. If mid-market is 1.10 and your bank gives you 1.07, the cost is (1.10 - 1.07) / 1.10 = 2.7% of the amount converted.',
    ],
    whenToUse: 'Use the mid-market rate as a benchmark whenever you are comparing exchange providers, estimating the true cost of a currency conversion, or setting indicative prices for international invoices. It is not a rate you can transact at directly - every retail provider adds a margin above it - but it is the single most useful reference point for calculating what a conversion is actually costing you. For high-value transactions, convert the mid-market rate cost difference into a cash amount: 1% on a $50,000 transfer is $500.',
    examples: {
      headers: ['Exchange provider', 'EUR 1,000 converted to USD', 'Effective rate', 'USD received', 'Cost vs mid-market'],
      rows: [
        ['Mid-market (reference)', '-', '1.1000', '$1,100.00', '$0 (0%)'],
        ['Fintech service (e.g. Wise)', 'small flat fee + margin', '1.0950', '$1,095.00', '~$5 (0.45%)'],
        ['Credit card (no FX fee)', 'no fee', '1.0930', '$1,093.00', '~$7 (0.64%)'],
        ['High-street bank', 'sometimes flat fee too', '1.0670', '$1,067.00', '~$33 (3.0%)'],
        ['Airport exchange desk', 'sometimes service charge too', '0.9900', '$990.00', '~$110 (10.0%)'],
      ],
    },
    pitfalls: 'The most common mistake is confusing the mid-market rate with the rate a provider will actually offer. No retail provider transacts at mid-market - even the best fintech services charge a small markup. A second frequent error is applying the mid-market rate you checked on one day to a transaction settling days or weeks later. Exchange rates move continuously, and a 2-3% shift over a fortnight is entirely normal for major pairs. Always use the rate confirmed by your provider at settlement for accounting and invoicing purposes, not the reference rate you checked earlier.',
    faqs: [
      { q: 'Is the mid-market rate the same as the real exchange rate?', a: 'Yes, in practice. The mid-market rate is the rate that would prevail if you could trade directly in the interbank market with zero profit margin. It is the global benchmark that all retail rates are priced off. Financial professionals refer to it interchangeably as the spot rate, interbank rate, or real exchange rate. It is the most accurate measure of what one currency is genuinely worth in another.' },
      { q: 'Why can\'t consumers exchange at the mid-market rate?', a: 'The interbank market requires trading in minimum lots of $1 million or more and is open only to licensed financial institutions. Retail customers access currency through banks or brokers that source it near mid-market and apply a markup to cover their spread, hedging costs, and profit. The best fintech services apply markups of 0.35-0.6% on major pairs, getting closer to mid-market than any other retail channel.' },
      { q: 'Does the mid-market rate change on weekends?', a: 'Not materially. The forex market is closed on Saturdays and Sundays, so the rate displayed on the weekend reflects Friday\'s closing price. Rates resume updating when Asian markets open on Monday morning (around midnight UTC). This is why exchange rates sometimes open noticeably higher or lower on Monday - any news over the weekend is priced in at the market open rather than gradually throughout the weekend.' },
      { q: 'How is the mid-market rate different from the official rate in some countries?', a: 'Most major economies allow their currency to float freely, so the mid-market rate is the market-clearing price with no government intervention. Some countries - particularly those with currency controls or managed pegs - publish an official exchange rate set by the central bank that may diverge significantly from the market mid-market rate. In these cases, the official rate is a legal or administrative price rather than a genuine market rate.' },
    ],
    quiz: {
      topic: 'mid-market rates',
      questions: [
        {
          q: 'How is the mid-market rate calculated?',
          options: [
            'The bid price alone, before any markup is added',
            'The weighted average of all currency trades in the past 24 hours',
            'The midpoint between the bid price and the ask price for a currency pair',
            'The official rate set by the central bank each morning',
          ] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The mid-market rate = (bid + ask) / 2. It sits exactly between what a market maker pays to buy a currency and what they charge to sell it, making it the neutral benchmark with no markup included.',
        },
        {
          q: 'What makes the mid-market rate the fairest benchmark for comparing exchange offers?',
          options: [
            'It is updated only once per day so it stays stable for comparison',
            'It includes no retail markup - it is the rate banks use when trading with each other',
            'It is set by central banks to protect consumers from excessive fees',
            'It is the rate all retail providers are legally required to offer',
          ] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The mid-market rate is the wholesale interbank rate with no retail margin added. Every retail provider prices off this rate and adds a markup above it, which is why mid-market is the single most useful reference point.',
        },
        {
          q: 'Based on the comparison table, which provider offers the closest rate to mid-market when converting EUR 1,000 to USD?',
          options: [
            'A high-street bank',
            'An airport exchange desk',
            'A credit card with no FX fee',
            'A fintech service',
          ] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The fintech service applies only a small flat fee and a tight margin, giving a cost of around 0.45% vs mid-market. A high-street bank costs roughly 3% and an airport desk around 10%.',
        },
        {
          q: 'What is the risk of applying the mid-market rate you checked today to a payment settling several weeks later?',
          options: [
            'You may use an inaccurate rate - exchange rates can shift 2-3% over a fortnight',
            'The rate automatically adjusts to the settlement date',
            'Most providers lock in the rate at the time of your initial quote',
            'The difference is negligible because major currencies are stable short-term',
          ] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'Exchange rates move continuously. A 2-3% shift over a fortnight is entirely normal for major pairs. Always use the rate confirmed by your provider at settlement, not a reference rate checked days earlier.',
        },
        {
          q: 'What happens to the mid-market rate on weekends?',
          options: [
            'The ECB publishes a weekend rate at 16:00 CET each Saturday',
            'Major banks update it twice per day on Saturday and Sunday',
            'The forex market is closed, so the displayed rate reflects Friday\'s closing price',
            'The rate is frozen at the IMF\'s published weekly average',
          ] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The forex market does not operate on weekends. The rate shown on Saturday and Sunday is Friday\'s closing price. Any news that breaks over the weekend is priced in when Asian markets open on Monday.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'numerator': {
    definition: [
      'The numerator is the top number in a fraction, written as $$\\frac{a}{b}$$ where $$a$$ is the numerator. It counts how many equal parts of the whole are being considered. The denominator (bottom number) defines how many equal parts the whole is split into; the numerator tells you how many of those parts you have. In 3/8, the numerator 3 means "3 out of 8 parts."',
      'In percentage and ratio calculations, the numerator is the change or the quantity being expressed as a proportion. In the percentage increase formula $$\\frac{\\text{New} - \\text{Old}}{\\text{Old}} \\times 100$$, the numerator is (New - Old) - the absolute change. Increasing the numerator raises the result proportionally; changing the denominator has the inverse effect.',
      'The numerator can be any real number, including zero and negatives. A numerator of zero gives a result of zero (as long as the denominator is non-zero). A negative numerator with a positive denominator produces a negative result - in percentage change, this signals a fall rather than a rise.',
    ],
    beginnerExplain: ['If a pizza is cut into 8 slices and you eat 3, you had 3/8 of the pizza. The "3" at the top is the numerator - it counts how many slices you actually took. Think of the numerator as the answer to "how many?" and the denominator as the answer to "out of how many total?" The numerator is always what you are measuring; the denominator is always the scale you are measuring it against.'],
    whenToUse: 'Identify the numerator by asking: "what quantity am I measuring or comparing?" That value goes on top. In a percentage formula, the numerator is always the change or the part - the thing being expressed as a proportion of the base (denominator). In a rate such as miles per hour, the distance (miles) is the numerator.',
    examples: {
      headers: ['Context', 'Expression', 'Numerator', 'What it counts'],
      rows: [
        ['Pizza slices eaten', '3/8', '3', 'Slices taken from the pizza'],
        ['Exam score', '45/60', '45', 'Marks the student scored'],
        ['Percentage increase', '(58,000 - 50,000) / 50,000', '8,000', 'The salary increase in absolute terms'],
        ['Percentage decrease', '(200 - 150) / 200', '50', 'The price reduction in absolute terms'],
        ['Pass rate', '72 / 120', '72', 'Students who passed the exam'],
      ],
    },
    pitfalls: 'In percentage calculations, a common error is placing the wrong quantity in the numerator. For a percentage increase, the numerator is always (New - Old), not the new value itself. Putting the new value in the numerator produces a meaningless result. Confusing which value is the "change" (numerator) and which is the "base" (denominator) is the root of most percentage errors.',
    faqs: [
      { q: 'What is the difference between numerator and denominator?', a: 'The numerator is the top number - it counts how many parts are selected. The denominator is the bottom number - it defines how many equal parts make up the whole. In 3/8, the 3 is the numerator (parts you have) and the 8 is the denominator (total parts available).' },
      { q: 'Can the numerator be zero?', a: 'Yes. A fraction with a numerator of zero equals zero, provided the denominator is non-zero. In percentage change, a numerator of zero means no change occurred - the new value equals the old value, giving 0%.' },
      { q: 'Can the numerator be larger than the denominator?', a: 'Yes. When the numerator exceeds the denominator, the fraction is greater than 1 (called an improper fraction). In percentage terms, this means a result above 100% - valid for percentage increase but not possible for percentage decrease.' },
    ],
    quiz: {
      topic: 'numerators',
      questions: [
        {
          q: 'In the fraction 5/8, which number is the numerator?',
          options: ['5', '8', '13', '40'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'The numerator is always the top number. In 5/8, the "5" counts how many parts are selected; the "8" (denominator) defines how many equal parts the whole is divided into.',
        },
        {
          q: 'In the percentage increase formula ((New - Old) / Old) x 100, what is the numerator?',
          options: ['The original (old) value', 'The new value', 'The absolute change (New - Old)', 'The result multiplied by 100'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The numerator is the absolute change: (New - Old). The original value is the denominator. Swapping them - putting the new value on top - produces a meaningless result.',
        },
        {
          q: 'A student scores 45 out of 60 on an exam. What is the numerator in the fraction representing their score?',
          options: ['60', '15', '45', '105'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The numerator is the quantity being measured - the student\'s score of 45. The denominator is the total marks available (60). The fraction is 45/60.',
        },
        {
          q: 'What is the value of a fraction when its numerator is zero?',
          options: ['Undefined - zero cannot be a numerator', 'Zero', 'Equal to the denominator', 'Equal to 1'] as [string, string, string, string],
          correct: 1 as const,
          explanation: '0 / b = 0 for any non-zero denominator. In percentage terms, a numerator of zero means no change - the new value equals the starting value, giving a result of 0%.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'denominator': {
    definition: [
      'The denominator is the bottom number in a fraction, written as $$\\frac{a}{b}$$ where $$b$$ is the denominator. It defines how many equal parts the whole has been divided into. The numerator (top number) counts how many of those parts are selected. A fraction is meaningless without knowing the denominator - 3 slices of pizza could be 3/8 or 3/4, and those represent very different amounts.',
      'In percentage and ratio calculations, the denominator is the reference base - the value you are expressing the other number as a proportion of. In the percentage decrease formula $$\\frac{\\text{Old} - \\text{New}}{\\text{Old}} \\times 100$$, the denominator is always the original value. Choosing the wrong denominator is the most common error in percentage calculations, and it always produces a plausible-looking but incorrect result.',
      'One universal rule: the denominator can never be zero. Division by zero is undefined - there is no number that, when multiplied by zero, produces a non-zero numerator. This is why percentage change is mathematically undefined when the starting value is zero.',
    ],
    beginnerExplain: ['Think of a pizza cut into 8 slices. The denominator is 8 - it tells you how many total slices the pizza was divided into. If you eat 3 slices, you had 3/8 of the pizza. The "8" at the bottom defines how big each slice is. A smaller denominator means bigger pieces: 1/2 (denominator = 2) gives you half the pizza, while 1/8 (denominator = 8) gives you one small slice. In any fraction or percentage, the denominator is always the total you are dividing by.'],
    whenToUse: 'Identify the denominator whenever you are setting up a fraction, percentage, ratio, or rate. Ask: "what is the total or reference base?" That is your denominator. In percentage calculations, the original (before) value is always the denominator. In a rate such as miles per hour, the time (hours) is the denominator.',
    examples: {
      headers: ['Context', 'Expression', 'Denominator', 'What it represents'],
      rows: [
        ['Pizza slices eaten', '3/8', '8', 'Total slices the pizza was cut into'],
        ['Exam score', '45/60', '60', 'Total marks available'],
        ['Percentage decrease', '(200 - 150) / 200', '200', 'Original price - the reference value'],
        ['Percentage increase', '(58,000 - 50,000) / 50,000', '50,000', 'Original salary, not the new figure'],
        ['Pass rate', '72 / 120', '120', 'Total students who sat the exam'],
      ],
    },
    pitfalls: 'The most common error is using the new value as the denominator instead of the original. In a price drop from $200 to $150, the decrease is $50. Dividing by $150 (new value) gives 33.3%; dividing by the correct denominator - $200 (original) - gives 25%. The new-value version always overstates a decrease and understates an increase. Always ask "what was the starting reference?" before choosing a denominator.',
    faqs: [
      { q: 'What is the difference between numerator and denominator?', a: 'The numerator is the top number - it counts how many parts you have. The denominator is the bottom number - it defines how many equal parts make up the whole. In 3/8, the numerator 3 counts the selected pieces; the denominator 8 is the total number of slices.' },
      { q: 'Why can\'t the denominator be zero?', a: 'Division by zero is undefined. If the denominator were 0, you would need a number that, multiplied by 0, equals the numerator - but any number multiplied by 0 is always 0. No consistent answer exists, so the expression is undefined rather than infinite or zero.' },
      { q: 'In a percentage formula, which value is the denominator?', a: 'The original (starting) value is always the denominator in percentage increase and percentage decrease formulas. The numerator is the change (new minus old, or old minus new). Putting the new value in the denominator is the most common percentage calculation mistake.' },
    ],
    quiz: {
      topic: 'denominators',
      questions: [
        {
          q: 'In the fraction 3/8, which number is the denominator?',
          options: ['3', '8', '11', '5'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The denominator is always the bottom number. In 3/8, the "8" defines the total number of equal parts; the "3" (numerator) counts how many parts are selected.',
        },
        {
          q: 'In the percentage decrease formula ((Old - New) / Old) x 100, which value is the denominator?',
          options: ['The new (lower) value', 'The difference between old and new', 'The original (old) value', 'The average of old and new'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The original value is always the denominator in percentage decrease. Using the new value overstates the result - in a drop from $200 to $150, dividing by $150 gives 33.3% instead of the correct 25%.',
        },
        {
          q: 'Why is division by zero (a denominator of 0) undefined?',
          options: ['Calculators return an error so it is treated as undefined by convention', 'Zero is not a valid integer', 'No number multiplied by zero can equal a non-zero numerator', 'Division by zero always equals infinity'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'If x / 0 = q, then q x 0 must equal x. But any number multiplied by 0 is always 0, so no value of q satisfies the equation. The operation is genuinely undefined, not a calculator limitation.',
        },
        {
          q: 'A student scored 45 out of 60 on an exam. What is the denominator in the fraction representing their score?',
          options: ['45', '15', '105', '60'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'The denominator represents the total - the 60 marks available. The fraction is 45/60. The numerator 45 is the score; the denominator 60 is the whole being divided.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'weighted-average': {
    definition: [
      'A weighted average assigns each value a weight that reflects how much data it represents before the average is computed. The formula multiplies each value by its weight, sums the products, and divides by the total weight. The result is identical to what you would get by combining all individual data points and computing a single overall rate.',
      'The concept appears whenever groups of different sizes are combined. A simple arithmetic mean treats every value equally, so smaller groups get the same influence as larger ones - producing a misleading result. A weighted average corrects for this by scaling each value to the size of the group it came from.',
      'Weights can be any unit that represents the denominator of each value: sample size, total marks, hours, impression counts, or investment amounts. The only requirement is that all weights use the same unit.',
    ],
    beginnerExplain: [
      'Think of two test scores: you scored 90% on a 10-question quiz and 70% on a 100-question exam. Simple average: (90 + 70) / 2 = 80%. But the exam had ten times as many questions, so your overall performance is much closer to 70%.',
      'Weighted average: (90 x 10 + 70 x 100) / (10 + 100) = (900 + 7000) / 110 = 72.7%. That number matches what you would get if you counted all 110 questions directly. The weighted average always matches the direct count.',
    ],
    whenToUse: 'Use a weighted average any time the values you are combining came from groups or items of different sizes. Common cases: combining pass rates from cohorts with different enrollment counts, calculating course grades from assignments worth different marks, blending ad campaign click-through rates from runs with different impression counts, or computing portfolio returns weighted by position size. When all groups have equal size, simple average and weighted average give the same result.',
    examples: {
      headers: ['Scenario', 'Values', 'Weights', 'Simple avg', 'Weighted avg'],
      rows: [
        ['Pass rates, unequal groups', '60%, 80%', '200, 50 people', '70%', '64%'],
        ['Course grades', '80%, 90%, 70%', '30, 10, 60 marks', '80%', '75%'],
        ['Campaign CTR', '3%, 8%', '10,000, 1,000 impressions', '5.5%', '3.45%'],
        ['Survey satisfaction', '72%, 88%', '500, 100 respondents', '80%', '74.7%'],
        ['Equal groups (same size)', '70%, 80%', '100, 100 people', '75%', '75%'],
      ],
    },
    pitfalls: 'The most common error is treating percentages as their own weights - for example, using "40% of the course" as the weight for a grade rather than the underlying mark total. This works only when those percentage weights already sum to 100. A second pitfall is mixing units across weights: combining people with hours, or marks with credit hours, produces a meaningless result. Always confirm all weights share the same unit.',
    faqs: [
      {
        q: 'Is weighted average always more accurate than simple average?',
        a: 'When groups differ in size, yes - weighted average is the only mathematically correct method. When all groups are equal in size, both methods give identical results and either is valid. "More accurate" only applies when there is a size difference to account for.',
      },
      {
        q: 'What should I use as the weight for each percentage?',
        a: 'Use whatever was the denominator when the percentage was originally calculated: the number of people in a group, the total marks available for an assignment, the number of impressions in a campaign, or the value of an investment position. If you know the raw counts, they are always the correct weight.',
      },
      {
        q: 'Can the weights be decimals or fractions?',
        a: 'Yes. Weights do not need to be whole numbers or sum to any particular value. What matters is that they are proportional to the actual sizes of the groups. If one group is 2.5 times the size of another, its weight should be 2.5 times larger.',
      },
    ],
    quiz: {
      topic: 'weighted average',
      questions: [
        {
          q: 'A class of 200 students has a 60% pass rate. A second class of 50 students has an 80% pass rate. What is the combined pass rate?',
          options: ['70%', '72%', '64%', '68%'] as [string, string, string, string],
          correct: 2 as const,
          explanation: '(60 x 200 + 80 x 50) / (200 + 50) = (12,000 + 4,000) / 250 = 64%. The larger class dominates, pulling the result toward its 60% rate rather than splitting the difference at 70%.',
        },
        {
          q: 'When does weighted average give the same result as simple average?',
          options: ['When all percentages are below 50%', 'When all values are positive', 'When all groups have equal size', 'When there are only two groups'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'Equal weights cancel out in the formula: (P1 x W + P2 x W) / (W + W) = (P1 + P2) / 2. The group size no longer matters when every group is the same size, so both methods produce identical results.',
        },
        {
          q: 'What should you use as the weight for a test score percentage?',
          options: ['The percentage score itself', 'The number of correct answers', 'The total marks available for the test', 'The student\'s overall average'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The weight should be the denominator that was used to calculate the percentage - in this case, the total marks available. A test worth 60 marks gets a weight of 60; a quiz worth 10 marks gets a weight of 10.',
        },
        {
          q: 'Which of the following is a pitfall when calculating a weighted average?',
          options: ['Using sample size as the weight', 'Mixing weights in different units (e.g. some in people, some in hours)', 'Having more than three groups', 'Using percentages greater than 100%'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'All weights must share the same unit. Mixing people with hours, or marks with credit hours, produces a number with no real-world meaning. Convert all weights to the same unit before computing the average.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },
  'gcd': {
    definition: [
      'The GCD (Greatest Common Divisor) of two positive integers is the largest integer that divides both numbers exactly, leaving no remainder. It is also called the Greatest Common Factor (GCF) or Highest Common Factor (HCF). GCD(12, 8) = 4 because 4 divides both 12 and 8 perfectly, and no integer larger than 4 does the same.',
      'The most efficient method for finding the GCD is the Euclidean algorithm: divide the larger number by the smaller, take the remainder, and repeat until the remainder is zero. The last non-zero remainder is the GCD. Example: GCD(18, 24) - divide 24 by 18, remainder 6. Divide 18 by 6, remainder 0. GCD = 6.',
      'In fraction arithmetic, the GCD is used to simplify (reduce) a fraction to its lowest terms. Dividing both numerator and denominator by their GCD produces an equivalent fraction where the two parts share no common factor other than 1.',
    ],
    beginnerExplain: [
      'Imagine you have 12 apples and 8 oranges and want to arrange them into identical groups with no fruit left over. The largest number of equal groups possible is 4 - giving 3 apples and 2 oranges per group. That "4" is GCD(12, 8).',
      'For fractions, the GCD tells you how much you can shrink the fraction without changing its value. 12/18 divided top and bottom by GCD(12, 18) = 6 gives 2/3 - the same fraction, at its smallest.',
    ],
    whenToUse: 'Use the GCD to simplify fractions after addition, subtraction, or multiplication, and as an intermediate step when computing the LCM via LCM(a, b) = a × b ÷ GCD(a, b). Always check the GCD before reporting a fraction result to confirm it is fully reduced.',
    examples: {
      headers: ['Numbers', 'GCD', 'Application'],
      rows: [
        ['12, 8', '4', '12/8 simplifies to 3/2'],
        ['18, 24', '6', '18/24 simplifies to 3/4'],
        ['7, 13', '1', 'Coprime: 7/13 is already in lowest terms'],
        ['100, 75', '25', '100/75 simplifies to 4/3'],
        ['6, 9', '3', 'LCD(6,9) = 6×9÷3 = 18'],
      ],
    },
    pitfalls: 'GCD(a, b) = 1 means the numbers are coprime - the fraction is already in simplest form. This is not an error; it confirms no further reduction is possible. A common mistake is stopping at a common divisor that is not the greatest - dividing 18/24 by 2 gives 9/12, but the GCD is 6 and the fully reduced form is 3/4. Always verify you have found the greatest, not just a, common divisor.',
    faqs: [
      { q: 'What is the difference between GCD and LCM?', a: 'GCD finds the largest shared factor (used to simplify fractions and compute LCD). LCM finds the smallest shared multiple (used to find a common denominator). They are linked: GCD(a, b) × LCM(a, b) = a × b, so knowing one gives you the other.' },
      { q: 'What does it mean when GCD equals 1?', a: 'When GCD(a, b) = 1, the numbers are coprime - they share no common factor other than 1. For a fraction, this means it is already fully reduced. For denominators, it means their LCD equals their product.' },
      { q: 'How do you find the GCD without the Euclidean algorithm?', a: 'List all factors of each number and find the largest one they share. For 12 and 8: factors of 12 are 1, 2, 3, 4, 6, 12; factors of 8 are 1, 2, 4, 8. Largest shared factor is 4. For large numbers the Euclidean algorithm is much faster.' },
    ],
    quiz: {
      topic: 'GCD',
      questions: [
        {
          q: 'What does GCD(18, 24) equal, and how is it found with the Euclidean algorithm?',
          options: ['GCD = 12, found by dividing both numbers by their average', 'GCD = 6, found by dividing 24 by 18 (remainder 6), then 18 by 6 (remainder 0) - last non-zero remainder is 6', 'GCD = 3, found by dividing both 18 and 24 by the smallest prime factor (3)', 'GCD = 4, found by listing all shared factors and picking the greatest'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition walks through this exact example: divide 24 by 18, remainder 6. Divide 18 by 6, remainder 0. The last non-zero remainder is 6, so GCD(18, 24) = 6. The examples table confirms 18/24 simplifies to 3/4.',
        },
        {
          q: 'What does it mean when GCD(7, 13) = 1?',
          options: ['One of the numbers is prime, so the algorithm always returns 1 for primes', '7 and 13 are coprime - they share no common factor other than 1, and 7/13 is already in its simplest form', 'The Euclidean algorithm failed because both numbers are odd, so 1 is returned as the default value', 'The fraction 7/13 must be converted to a different form before it can be simplified'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section and FAQ explain that GCD(a, b) = 1 means the numbers are coprime. The fraction is already fully reduced - no further simplification is possible. The examples table lists GCD(7, 13) = 1 with the note "Coprime: 7/13 is already in lowest terms."',
        },
        {
          q: 'You want to simplify the fraction 12/8. What is the correct fully reduced result?',
          options: ['6/4 - dividing by 2 is sufficient', '3/2 - dividing numerator and denominator by GCD(12, 8) = 4', '2/3 - swap numerator and denominator after finding the GCD', '4/3 - divide only the larger of the two numbers by the GCD'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'GCD(12, 8) = 4. Dividing both by 4 gives 3/2. The pitfalls section warns against stopping at a divisor that is not the greatest - dividing by 2 gives 6/4 which is correct but not fully reduced.',
        },
        {
          q: 'What is the relationship between GCD and LCM?',
          options: ['GCD and LCM are inverses: GCD(a,b) = 1 / LCM(a,b) for all positive integers', 'GCD(a, b) x LCM(a, b) = a x b - knowing one gives you the other', 'GCD always equals LCM when both numbers are multiples of 10', 'LCM is always smaller than GCD for numbers greater than 10'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ states: "GCD(a, b) x LCM(a, b) = a x b, so knowing one gives you the other." The whenToUse section also notes this: LCM(a, b) = a x b / GCD(a, b), making GCD the intermediate step for computing LCM.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },
  'lcd': {
    definition: [
      'The LCD (Lowest Common Denominator) is the smallest positive integer that is evenly divisible by both denominators in a pair of fractions. It equals the LCM of the two denominators. For the fractions 3/4 and 1/6, LCD(4, 6) = LCM(4, 6) = 12.',
      'The LCD is the essential step in adding or subtracting fractions with different denominators. Converting both fractions to the LCD makes their denominators identical, meaning each fraction counts the same-sized parts - so numerators can be added or subtracted directly.',
      'Computing the LCD: LCD(b, d) = (b × d) ÷ GCD(b, d). For denominators 4 and 6: GCD(4, 6) = 2, so LCD = (4 × 6) ÷ 2 = 12. When denominators are coprime (GCD = 1), the LCD equals their product.',
    ],
    beginnerExplain: [
      'You want to add 1/4 and 1/3 of a pizza. But fourths and thirds are different slice sizes, so you cannot count them together yet. The LCD asks: what is the smallest number of equal slices you could cut both pizzas into so the sizes match? The answer is 12 - twelfths work for both evenly. That is the LCD.',
      'Once both fractions are in twelfths: 1/4 = 3/12 and 1/3 = 4/12. Now the slice size is identical and 3/12 + 4/12 = 7/12.',
    ],
    whenToUse: 'Use the LCD whenever you add or subtract fractions with different denominators. It also applies to comparing fractions (convert both to the LCD, then compare numerators) and to simplifying complex fractions that have fractions in their numerator or denominator.',
    examples: {
      headers: ['Denominators b, d', 'GCD(b, d)', 'LCD = b×d÷GCD', 'Note'],
      rows: [
        ['4, 6', '2', '12', '4×6÷2 = 12'],
        ['3, 5', '1', '15', 'Coprime: LCD = product'],
        ['6, 9', '3', '18', '6×9÷3 = 18'],
        ['5, 10', '5', '10', '10 is already a multiple of 5'],
        ['8, 12', '4', '24', '8×12÷4 = 24'],
      ],
    },
    pitfalls: 'Using the product b × d as the common denominator always works, but when GCD > 1 it produces unnecessarily large numbers. For 3/4 + 1/6, using 24 instead of 12 gives 18/24 + 4/24 = 22/24, requiring simplification to 11/12. Starting with the LCD skips that extra step. When denominators are coprime, the product IS the LCD so there is no saving to be had.',
    faqs: [
      { q: 'What is the difference between LCD and LCM?', a: 'LCD (Lowest Common Denominator) is the same mathematical object as LCM (Lowest Common Multiple), applied specifically to the denominators of fractions. LCD(b, d) = LCM(b, d). LCD is the fraction-context term; LCM is the more general number-theory term.' },
      { q: 'Is the LCD always the product of the two denominators?', a: 'Only when the denominators are coprime. For 3/5 + 2/7, LCD = 5 × 7 = 35. For 3/4 + 1/6, GCD(4, 6) = 2, so LCD = 12, not 24. The product is always a valid common denominator but not always the lowest.' },
      { q: 'Can the LCD be one of the existing denominators?', a: 'Yes - when one denominator is a multiple of the other. LCD(5, 10) = 10 because 10 is already divisible by 5. Only the first fraction needs converting: 2/5 becomes 4/10, and 3/10 stays unchanged.' },
    ],
    quiz: {
      topic: 'LCD',
      questions: [
        {
          q: 'What is LCD(4, 6), and how is it calculated?',
          options: ['24 - multiply the two denominators together since they share no common factors', '12 - calculated as (4 x 6) / GCD(4, 6) = 24 / 2 = 12', '8 - add the two denominators and divide by the number of fractions', '6 - the larger denominator is always the LCD when one is a multiple of the other'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition shows LCD(b, d) = (b x d) / GCD(b, d). GCD(4, 6) = 2, so LCD = (4 x 6) / 2 = 12. The examples table confirms this: denominators 4 and 6 give LCD = 12.',
        },
        {
          q: 'When adding 1/4 + 1/3, what is the correct process using the LCD?',
          options: ['Add numerators and denominators directly: 1+1 / 4+3 = 2/7', 'Find LCD = 12, convert 1/4 to 3/12 and 1/3 to 4/12, then add: 3/12 + 4/12 = 7/12', 'Find LCD = 12, convert 1/4 to 4/12 and 1/3 to 3/12, then add: 7/12', 'Multiply both fractions by the product of denominators 4 x 3 = 12, giving 12/12 = 1'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The beginnerExplain section walks through this: LCD(4, 3) = 12. Converting: 1/4 = 3/12 (multiply by 3/3) and 1/3 = 4/12 (multiply by 4/4). Adding: 3/12 + 4/12 = 7/12.',
        },
        {
          q: 'From the examples table, what is LCD(5, 10)?',
          options: ['50 - the product of 5 and 10', '15 - the sum of the two denominators', '10 - because 10 is already a multiple of 5', '5 - the GCD of 5 and 10 is the LCD in this case'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The examples table shows LCD(5, 10) = 10 with the note "10 is already a multiple of 5." When one denominator is already a multiple of the other, the LCD is simply the larger denominator and only the first fraction needs converting.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },
  'lcm': {
    definition: [
      'The LCM (Lowest Common Multiple) of two positive integers is the smallest positive integer that is a multiple of both. LCM(4, 6) = 12 because 12 is the smallest number appearing in both the multiples of 4 (4, 8, 12, 16...) and the multiples of 6 (6, 12, 18...).',
      'The fastest way to compute LCM uses the GCD identity: LCM(a, b) = (a × b) ÷ GCD(a, b). For LCM(4, 6): GCD(4, 6) = 2, so LCM = (4 × 6) ÷ 2 = 12. When a and b are coprime (GCD = 1), LCM equals their product.',
      'In fraction arithmetic, the LCM of two denominators is the LCD - the smallest number that allows both fractions to be expressed with a shared denominator so their numerators can be added or subtracted.',
    ],
    beginnerExplain: [
      'Bus A comes every 4 minutes. Bus B comes every 6 minutes. Both leave together at time zero. When is the next time they leave at the same moment? Multiples of 4: 4, 8, 12... Multiples of 6: 6, 12... First overlap: 12 minutes. That is LCM(4, 6) = 12.',
      'In fractions the idea is identical: LCM of two denominators finds the smallest slot where both denominators fit evenly, so you can rewrite both fractions in same-sized pieces before adding.',
    ],
    whenToUse: 'Use LCM when finding the LCD for fraction addition or subtraction, when solving scheduling problems (next coincidence of two repeating events), or when scaling quantities to the smallest common unit. LCM and GCD together are the two key tools in elementary number theory.',
    examples: {
      headers: ['a', 'b', 'GCD(a,b)', 'LCM = a×b÷GCD', 'Check'],
      rows: [
        ['4', '6', '2', '12', 'Multiples of 4 and 6 first meet at 12'],
        ['3', '5', '1', '15', 'Coprime: LCM = product'],
        ['6', '9', '3', '18', 'Multiples of 6 and 9 first meet at 18'],
        ['5', '10', '5', '10', '10 is already a multiple of 5'],
        ['7', '13', '1', '91', 'Coprime: LCM = 7×13'],
      ],
    },
    pitfalls: 'LCM(a, b) × GCD(a, b) = a × b is a useful check: if you know three of the four values you can derive the fourth. Also: LCM(a, a) = a and LCM(1, n) = n. For three or more numbers, compute pairwise: LCM(a, b, c) = LCM(LCM(a, b), c).',
    faqs: [
      { q: 'What is the difference between LCM and GCD?', a: 'GCD is the largest factor shared by two numbers - used to simplify fractions. LCM is the smallest multiple shared by two numbers - used to find a common denominator. They are linked: GCD(a, b) × LCM(a, b) = a × b.' },
      { q: 'When does LCM equal the product a × b?', a: 'When a and b are coprime - they share no common factor other than 1. Examples: LCM(3, 5) = 15, LCM(7, 11) = 77. When GCD > 1, LCM is smaller than the product.' },
      { q: 'How does LCM differ from LCD?', a: 'LCD (Lowest Common Denominator) is the same concept as LCM applied specifically to the denominators of fractions. LCD(b, d) = LCM(b, d). LCM is the general term; LCD is used in the fraction arithmetic context.' },
    ],
    quiz: {
      topic: 'LCM',
      questions: [
        {
          q: 'What is LCM(4, 6) and what does it represent?',
          options: ['10 - the sum of the two numbers', '12 - the smallest positive integer that is a multiple of both 4 and 6', '24 - the product of 4 and 6', '2 - the GCD of 4 and 6, which equals the LCM for small numbers'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The definition states LCM(4, 6) = 12 because 12 is the smallest number appearing in both the multiples of 4 (4, 8, 12...) and the multiples of 6 (6, 12...). Calculated via formula: LCM = (4 x 6) / GCD(4, 6) = 24 / 2 = 12.',
        },
        {
          q: 'Bus A arrives every 4 minutes and Bus B arrives every 6 minutes. Both depart together at time zero. When is the next time they depart simultaneously?',
          options: ['10 minutes - by adding the two intervals', '12 minutes - LCM(4, 6) = 12, the first overlap in both schedules', '24 minutes - the product of 4 x 6, the safe common multiple', '8 minutes - the first multiple of 4 that is also a multiple of 2'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The beginnerExplain section uses this exact bus analogy. Multiples of 4: 4, 8, 12... Multiples of 6: 6, 12... The first overlap is 12 minutes. LCM(4, 6) = 12 gives the next simultaneous departure.',
        },
        {
          q: 'When does LCM(a, b) equal the product a x b?',
          options: ['Always - multiplying the two numbers always gives the LCM', 'When a and b are coprime (GCD = 1) - they share no common factor other than 1', 'When a equals b - identical numbers always produce a product-equal LCM', 'When both a and b are even numbers divisible by 2'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The FAQ states LCM equals the product only when a and b are coprime. Examples from the table: LCM(3, 5) = 15 = 3x5 (coprime); LCM(7, 13) = 91 = 7x13 (coprime). When GCD > 1, LCM is smaller than the product.',
        },
        {
          q: 'What is the relationship between LCM(a, b) and GCD(a, b)?',
          options: ['LCM(a, b) = GCD(a, b) for all pairs of integers greater than 1', 'LCM(a, b) x GCD(a, b) = a x b - knowing three of the four values gives you the fourth', 'LCM(a, b) is always greater than GCD(a, b) by a factor of exactly 10', 'LCM and GCD are independent - there is no algebraic relationship between them'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The pitfalls section states: "LCM(a, b) x GCD(a, b) = a x b is a useful check: if you know three of the four values you can derive the fourth." This identity links the two fundamental number theory tools.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'leap-year': {
    definition: [
      'A leap year is a calendar year containing 366 days instead of the standard 365. The extra day is added as February 29 - "leap day." This correction keeps the Gregorian calendar synchronized with Earth\'s orbit around the Sun. The astronomical year (one complete Earth orbit) is approximately 365.2422 days. Without the correction, the calendar would drift by roughly 24 days per century.',
      'The Gregorian rule for determining leap years has three conditions applied in order: a year divisible by 4 is a leap year; however, century years (1700, 1800, 1900) are not leap years even though divisible by 4; except that century years divisible by 400 are leap years (2000 was a leap year, 1900 was not). This three-part rule reduces the remaining calendar error to about 26 seconds per year - accurate enough that no further correction will be needed for several thousand years.',
      'The name "leap year" refers to the way fixed calendar dates behave. In an ordinary year, any date falls one weekday later than the same date the previous year. In a leap year, dates after February 29 "leap" an extra day - falling two weekdays later than the previous year instead of one. This is why a birthday falling on Tuesday in 2023 would fall on Thursday in 2024 (a leap year) rather than Wednesday.',
    ],
    beginnerExplain: [
      'Think of it like this: Earth takes about 365 and a quarter days to orbit the Sun, but the calendar only has whole days. So we count 365 days per year and bank the leftover quarter-day. After four years, we\'ve saved up four quarters - one full day. We spend that saved day on February 29.',
      'Without this correction, the calendar would drift. Midsummer holidays would slowly slide into autumn over centuries, and the seasons would no longer line up with the months people expect. The three-part Gregorian rule (divisible by 4, except centuries, except centuries divisible by 400) fine-tunes the correction so the drift is down to 26 seconds per year instead of 11 minutes.',
    ],
    whenToUse: 'Relevant whenever you calculate durations spanning February of a potential leap year. Any range that crosses February 29 is exactly 1 day longer than the same range in a non-leap year. Age calculators, date difference calculators, recurring billing systems, and contract duration tools all need to apply the full three-part Gregorian rule - not just the simple "divisible by 4" check.',
    examples: {
      headers: ['Year', 'Divisible by 4?', 'Divisible by 100?', 'Divisible by 400?', 'Leap year?'],
      rows: [
        ['2024', 'Yes', 'No', '-', 'Yes'],
        ['2023', 'No', '-', '-', 'No'],
        ['2000', 'Yes', 'Yes', 'Yes', 'Yes'],
        ['1900', 'Yes', 'Yes', 'No', 'No'],
        ['2100', 'Yes', 'Yes', 'No', 'No'],
        ['2400', 'Yes', 'Yes', 'Yes', 'Yes'],
      ],
    },
    pitfalls: 'The most common programming error is using only year % 4 === 0 and forgetting the century exception. This incorrectly classifies 1900, 2100, 2200, and 2300 as leap years. The correct logic is: (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0. A secondary issue: people born on February 29 have no legal birthday in non-leap years. The UK, New Zealand, and Hong Kong use March 1 as the legal date for age-of-majority calculations; many other jurisdictions use February 28. Always verify the specific rule when leap-day birthdays affect legal age thresholds.',
    faqs: [
      { q: 'Why is 2000 a leap year but 1900 is not?', a: 'Both are divisible by 4, but century years only qualify as leap years if also divisible by 400. 2000 divided by 400 is exactly 5, so 2000 qualifies. 1900 divided by 400 is 4.75, so 1900 does not. The same rule excludes 2100, 2200, and 2300 from being leap years.' },
      { q: 'How does a leap year affect date range calculations?', a: 'Any date range that spans February 29 is exactly 1 day longer than the same range in a non-leap year. For example, January 1 to March 1 is 59 days in 2023 and 60 days in 2024. Ranges that begin and end entirely before March 1, or entirely after February, are unaffected by whether the year is a leap year.' },
      { q: 'What is the correct code to check for a leap year?', a: 'The full three-part Gregorian rule: (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0. The simple year % 4 === 0 check misclassifies century years like 1900 and 2100 as leap years. Most standard date libraries apply this correctly, but custom implementations should always test against 1900 (not a leap year) and 2000 (a leap year).' },
      { q: 'How many days are in a 4-year period?', a: 'Exactly 1,461 days: three ordinary years of 365 days (1,095) plus one leap year of 366 days. This 1,461-day block is the fundamental unit underlying the Gregorian calendar\'s correction. A 400-year Gregorian cycle contains exactly 97 leap years and 146,097 days.' },
      { q: 'What happens to February 29 birthdays in non-leap years?', a: 'Legal practice varies by jurisdiction. The UK, New Zealand, and Hong Kong treat March 1 as the legal birthday for purposes such as driving licenses and the age of majority in non-leap years. Many other countries use February 28. People born on February 29 often celebrate on either date depending on personal preference and local custom.' },
    ],
    quiz: {
      topic: 'leap years',
      questions: [
        {
          q: 'Which of the following years is NOT a leap year according to the Gregorian rule?',
          options: ['2024', '2000', '1900', '2028'] as [string, string, string, string],
          correct: 2 as const,
          explanation: '1900 is divisible by 4 but also divisible by 100 - and since it is not divisible by 400, it is not a leap year. 2000 qualifies because it is divisible by 400. 2024 and 2028 are both divisible by 4 and not century years.',
        },
        {
          q: 'What is the correct programming condition to determine whether a year is a leap year?',
          options: ['year % 4 === 0', 'year % 4 === 0 && year % 100 === 0', '(year % 4 === 0 && year % 100 !== 0) || year % 400 === 0', 'year % 400 === 0'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The three-part Gregorian rule requires all conditions. Divisible by 4 is necessary but not sufficient - century years are excluded unless also divisible by 400. The simple year % 4 === 0 check incorrectly classifies 1900 and 2100 as leap years.',
        },
        {
          q: 'By how many days is January 1 to March 1 longer in a leap year than in a non-leap year?',
          options: ['0 days - the leap day is added at the end of the year', '1 day', '2 days', '4 days'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'Any date range spanning February 29 is exactly 1 day longer in a leap year. January 1 to March 1 is 59 days in a non-leap year and 60 days in a leap year. Ranges that begin and end entirely before March 1 or entirely after February are unaffected.',
        },
        {
          q: 'How many leap years are there in a complete 400-year Gregorian cycle?',
          options: ['100 - one every four years exactly', '97 - the century exception removes 3 of the 100', '96 - each century loses one leap year', '98 - only years ending in 00 and divisible by 400 are excluded'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'A 400-year cycle would have 100 leap years under the simple divisible-by-4 rule. The century exception removes 4 (1700, 1800, 1900, 2100-equivalent), but the divisible-by-400 rule adds one back (the year 2000-equivalent). Net result: 100 - 4 + 1 = 97 leap years per 400-year cycle, giving 146,097 total days.',
        },
        {
          q: 'What calendar drift does the Gregorian rule reduce the annual error to, compared to the Julian calendar\'s 11 minutes per year?',
          options: ['1 minute per year', '30 seconds per year', 'About 26 seconds per year', '1 second per year'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The definition states the Gregorian rule reduces the remaining calendar error to about 26 seconds per year - accurate enough that no correction will be needed for several thousand years. The Julian calendar\'s simpler rule drifted by 11 minutes per year, accumulating to 1 full day every 128 years.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

  'geriatric-bmi': {
    definition: [
      'Geriatric BMI refers to the interpretation of Body Mass Index using age-specific thresholds for adults aged 65 and over. The standard WHO BMI cutoffs (Underweight below 18.5, Normal 18.5-24.9, Overweight 25-29.9) were developed from population studies that include all adults and do not reflect how the relationship between BMI and health risk shifts with age. Applying standard thresholds to older adults can give a misleading picture in both directions.',
      'Most geriatric and clinical nutrition guidelines - including those from ESPEN (European Society for Clinical Nutrition and Metabolism) - recommend an optimal BMI range of 23-27.5 for adults 65 and over. Below 23, and especially below 22, is associated with frailty risk, malnutrition, immune suppression, falls, and higher all-cause mortality. The lower bound is higher than in younger adults because low body weight in older age almost always signals muscle loss, poor nutrition, or chronic disease - not metabolic health.',
      'The upper bound of 27.5 reflects a finding sometimes called the "obesity paradox": large meta-analyses consistently show that older adults with BMI 25-30 have equal or lower all-cause mortality compared to those in the standard normal range. The most widely accepted explanation is that a moderate weight reserve provides energy and protein buffers during acute illness, hospitalization, or periods of reduced appetite - events that are far more common in older adults than in younger populations.',
    ],
    beginnerExplain: [
      'Imagine two people with exactly the same BMI of 19 - one is 28 years old, the other is 76. For the 28-year-old, BMI 19 is lean but healthy. For the 76-year-old, it is a warning sign: too little body reserve to recover well from surgery, a serious infection, or a few weeks of reduced appetite.',
      'Standard BMI thresholds were designed with younger adults in mind. Geriatric BMI guidelines shift the safe minimum upward to 23 because the danger zone at age 70+ is being too lean, not too heavy. A 71-year-old at BMI 26 is not overweight by geriatric standards - they are sitting in the optimal range with a reasonable reserve for the unexpected.',
    ],
    whenToUse: 'Use geriatric BMI interpretation whenever you are assessing BMI in an adult aged 65 or over. Do not apply the standard adult thresholds (18.5 normal, 25 overweight) to this age group - they will understate the risk of low weight and overstate the risk of moderately elevated weight. The senior BMI calculator at calculations.tools automatically applies the 23-27.5 optimal range alongside the standard category. Waist circumference (above 88 cm for women, 102 cm for men) and grip strength (EWGSOP2 thresholds: below 27 kg for men, 16 kg for women) are important complementary measures that BMI alone cannot capture.',
    examples: {
      headers: ['BMI range', 'Senior interpretation', 'Key clinical concern'],
      rows: [
        ['Below 22', 'Malnutrition risk (ESPEN/GLIM criterion)', 'Immune suppression, muscle wasting, poor wound healing, falls'],
        ['22-23', 'Below senior optimal range', 'Frailty risk; weight maintenance is a priority'],
        ['23-27.5', 'Senior optimal range', 'Lowest all-cause mortality in geriatric population studies'],
        ['27.5-30', 'Slightly above optimal range', 'Modest increased metabolic risk; monitor waist circumference'],
        ['30 and above', 'Obese', 'Elevated cardiometabolic risk; mobility limitation; falls risk through different mechanism'],
      ],
    },
    pitfalls: 'The most common mistake is applying the standard adult Normal range (18.5-24.9) to older patients and treating a BMI of 20 or 21 as healthy. In an adult over 70, this range signals undernutrition risk. A second pitfall is ignoring body composition: two people can share the same BMI while one has healthy muscle mass and the other has sarcopenia, where muscle has been replaced by fat without changing weight. A third pitfall is treating geriatric BMI ranges as rigid rules - clinical context, functional status, and trajectory (is weight stable or falling?) matter more than any single number.',
    faqs: [
      {
        q: 'What BMI is considered healthy for a 70-year-old?',
        a: 'Geriatric guidelines recommend a BMI of 23-27.5 as the optimal range for adults aged 70 and over. A BMI below 23 in this age group is associated with frailty, malnutrition, and higher mortality. A BMI of 25-27, which is classified as overweight in standard adult tables, does not carry elevated mortality risk for older adults.'
      },
      {
        q: 'Why is the healthy BMI range higher for seniors than for younger adults?',
        a: 'Two reasons: low BMI in older adults signals muscle loss, poor nutrition, and immune decline rather than metabolic health - risks that are more dangerous at this age. And BMI in the standard overweight range (25-30) does not increase all-cause mortality in older adults the way it does in younger people. Both findings push the optimal range upward.'
      },
      {
        q: 'Is geriatric BMI interpretation different for men and women over 65?',
        a: 'The 23-27.5 optimal range applies to both genders in most geriatric guidelines. However, women over 65 face additional considerations: postmenopausal estrogen loss accelerates fat redistribution toward the abdomen, and bone density loss raises fracture risk at lower weights. Waist circumference above 88 cm is a specific risk marker for postmenopausal women regardless of BMI category.'
      },
      {
        q: 'At what age does geriatric BMI interpretation begin to apply?',
        a: 'Most geriatric guidelines use age 65 as the cutoff, which is why the senior BMI calculator applies age-specific interpretation from that point. Some researchers and clinical tools use 70 as the threshold, particularly for the strictest malnutrition criteria (ESPEN defines BMI below 22 as a malnutrition risk factor specifically for adults over 70). Between 65 and 70, clinical judgment is needed based on the individual\'s health status.'
      },
    ],
    quiz: {
      topic: 'geriatric BMI',
      questions: [
        {
          q: 'What is the geriatric optimal BMI range recommended by most geriatric guidelines for adults aged 65 and over?',
          options: ['18.5-24.9 (same as the standard adult range)', '20-25', '23-27.5', '25-30'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'Most geriatric guidelines - including ESPEN - recommend a BMI of 23-27.5 as the optimal range for adults 65 and over. This is higher than the standard adult range of 18.5-24.9 because low body weight carries greater risk at this age and a BMI of 25-30 does not increase mortality in older adults the way it does in younger people.',
        },
        {
          q: 'What is the "obesity paradox" in the context of geriatric BMI?',
          options: ['Older adults with obesity live longer because they exercise more', 'Adults 65+ with BMI 25-30 show equal or lower all-cause mortality compared to those in the standard normal range', 'Obesity becomes more common after 65 because metabolic rate slows', 'Overweight seniors have a lower BMI than the scale suggests due to height loss'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The "obesity paradox" refers to the consistent finding from large meta-analyses that older adults with BMI 25-30 have equal or lower all-cause mortality than those with BMI 18.5-24.9. The leading explanation is that moderate weight provides an energy and protein reserve during acute illness - something that matters far more at 70+ than at 35.',
        },
        {
          q: 'At what BMI level does ESPEN define a malnutrition risk factor for adults over 70?',
          options: ['Below 18.5', 'Below 20', 'Below 21', 'Below 22'] as [string, string, string, string],
          correct: 3 as const,
          explanation: 'ESPEN defines a BMI below 22 as a risk factor for malnutrition specifically in adults over 70. More broadly, a BMI below 23 is considered below the senior optimal range and is associated with frailty risk in this age group. This is substantially higher than the standard adult underweight cutoff of 18.5.',
        },
        {
          q: 'Why does sarcopenia make BMI less reliable as a health indicator in older adults?',
          options: ['Sarcopenia causes BMI to fall rapidly, making the number too low to trust', 'Muscle is denser than fat, so sarcopenia inflates BMI above its true level', 'Sarcopenia replaces muscle with fat without changing body weight, so BMI can appear normal while body composition deteriorates', 'Sarcopenia is only relevant for adults over 80, not for those in their 60s and 70s'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'Sarcopenia replaces muscle with fat - a tissue swap that leaves body weight and therefore BMI nearly unchanged while body composition worsens significantly. A person can have a "normal" BMI of 23 while having lost substantial muscle mass and replaced it with fat - a state that BMI cannot detect but that carries real fall, fracture, and functional decline risk.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },
  'fetal-age': {
    definition: [
      'Fetal age - also called embryonic age, fertilization age, or conceptional age - is the age of an embryo or fetus counted from the date of fertilization. It is approximately two weeks less than gestational age, because gestational counting starts at the last menstrual period, roughly two weeks before ovulation and conception occur.',
      'At term (week 40 gestational age), a baby is approximately 38 weeks fetal age. Fetal age is the measure used in embryology and developmental biology - when a textbook says "the heart begins beating at week 4," it typically means week 4 of fetal age (week 6 of gestational age). Understanding which system a source uses prevents misinterpreting developmental milestones by two full weeks.',
    ],
    beginnerExplain: [
      'Imagine you are baking bread. The recipe says "rise for 2 hours," but the clock on the wall started running 2 hours before you even mixed the ingredients. Fetal age is like the actual baking time - it starts when the dough was made (fertilization). Gestational age is like the wall clock - it started running earlier, before anything was in the bowl. The bread takes the same time to bake either way; the two clocks just disagree on what time it is.',
    ],
    whenToUse: 'Use fetal age when reading embryology or IVF laboratory reports, which frequently state "embryonic age" or "days post-fertilization." IVF clinics use fetal age precisely - a Day-5 blastocyst is 5 days of fetal age. Consumer pregnancy apps vary: some label weeks in gestational age, others in fetal age, so always check which system an app uses when comparing it to information from your obstetrician.',
    examples: {
      headers: ['Fetal age', 'Gestational age', 'Key milestone'],
      rows: [
        ['2 weeks', '4 weeks', 'Implantation in the uterine wall'],
        ['4 weeks', '6 weeks', 'Heartbeat detectable by transvaginal ultrasound'],
        ['8 weeks', '10 weeks', 'Embryonic period ends; fetal period begins'],
        ['10-11 weeks', '12-13 weeks', 'End of first trimester; highest-risk period over'],
        ['18 weeks', '20 weeks', 'Halfway point; anatomy scan window'],
        ['35 weeks', '37 weeks', 'Full term begins'],
        ['38 weeks', '40 weeks', 'Estimated due date'],
      ],
    },
    pitfalls: 'The most common error is mixing up fetal age and gestational age when reading about fetal development. A source that says "at 8 weeks the fetus looks distinctly human" is almost certainly using fetal age (gestational age 10 weeks). If you see a claim that conflicts with what your doctor told you by about 2 weeks, the source is probably using the other counting system. IVF clinics and embryology textbooks use fetal age; obstetricians and midwives always use gestational age.',
    faqs: [
      { q: 'Why do embryology books and OB/GYN doctors use different counting systems?', a: 'Embryologists count from fertilization because they are studying biological development, where the starting event (fertilization) is precisely defined. Obstetricians count from the LMP because patients rarely know the exact fertilization date, and the LMP is a consistent, observable event that standardizes screening and viability timelines across all pregnancies.' },
      { q: 'Does fetal age matter for IVF pregnancies?', a: 'Yes, and IVF is the one context where fetal age is clinically used. The embryo transfer record states the embryo\'s age in days (Day 3, Day 5, or Day 6), which is the fetal age at the moment of transfer. Gestational age on transfer day is calculated by adding 14 days to the embryo age, because the equivalent LMP would have been 14 days before fertilization.' },
      { q: 'Is "fetal age" and "conceptual age" the same thing?', a: 'Yes. Fetal age, embryonic age, fertilization age, and conceptional age all refer to the same measurement: age counted from fertilization. The term varies by source - clinical labs tend to say "days post-fertilization," embryology texts say "embryonic age," and some patient-facing resources say "fetal age." They all describe the same number.' },
    ],
    quiz: {
      topic: 'fetal age',
      questions: [
        {
          q: 'If a baby is 40 weeks of gestational age at birth, what is the approximate fetal age?',
          options: ['36 weeks', '38 weeks', '40 weeks', '42 weeks'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'Fetal age is approximately 2 weeks less than gestational age, because gestational counting starts at the LMP - about 2 weeks before fertilization. A term baby at 40 weeks gestational age has been developing for approximately 38 weeks of fetal age.',
        },
        {
          q: 'An embryology textbook states "the heart begins beating at week 4." In which counting system is this stated?',
          options: ['Gestational age', 'Fetal age', 'Lunar age', 'Trimester age'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'Embryology and developmental biology textbooks use fetal age (counted from fertilization). Week 4 of fetal age corresponds to week 6 of gestational age - which is when a transvaginal ultrasound can first detect the heartbeat. Obstetricians would describe the same event as occurring "at 6 weeks."',
        },
        {
          q: 'A Day-5 IVF blastocyst is transferred. What is the gestational age on transfer day?',
          options: ['0 weeks, 5 days', '2 weeks, 0 days', '2 weeks, 5 days', '1 week, 5 days'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'On transfer day, the embryo\'s fetal age is 5 days. Gestational age adds 14 days (2 weeks) to account for the pre-ovulation phase. So gestational age on Day-5 transfer day is 14 + 5 = 19 days, or 2 weeks and 5 days.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },
  'gestational-age': {
    definition: [
      'Gestational age is the age of a pregnancy measured in weeks and days from the first day of the last menstrual period (LMP), not from the date of conception. A full-term pregnancy is 40 weeks of gestational age. This counting method starts about two weeks before fertilization actually occurs, because ovulation and conception happen roughly two weeks after the LMP begins.',
      'All obstetric milestones are expressed in gestational weeks: viability is established around week 24, full term begins at week 37, and post-term is week 42 or later. A baby delivered at 40 weeks gestational age has been developing as an embryo or fetus for approximately 38 weeks - the two figures differ because gestational age includes the pre-conception phase of the menstrual cycle.',
    ],
    beginnerExplain: [
      'Imagine a race where the clock starts two minutes before the runners leave the starting line. The runners are not actually moving for those first two minutes, but the official race time includes them anyway. Gestational age works the same way - the pregnancy "clock" starts at your last period, not when conception happened. So when your doctor says you are 10 weeks pregnant, the baby has only existed for about 8 weeks.',
    ],
    whenToUse: 'Gestational age is the number your obstetrician, midwife, and every pregnancy app uses for scheduling screenings and interpreting growth measurements. Use it when reading ultrasound reports, scheduling the anatomy scan (weeks 18-22), understanding test windows, and tracking fetal size milestones. The pregnancy calculator on this page calculates gestational age from whichever input you provide.',
    examples: {
      headers: ['Gestational age', 'Approximate fetal age', 'Clinical milestone'],
      rows: [
        ['6 weeks', '4 weeks', 'Heartbeat detectable by transvaginal ultrasound'],
        ['10-13 weeks', '8-11 weeks', 'First trimester screening and nuchal translucency scan'],
        ['20 weeks', '18 weeks', 'Halfway point; anatomy scan window'],
        ['24 weeks', '22 weeks', 'Viability threshold'],
        ['37 weeks', '35 weeks', 'Full term begins'],
        ['40 weeks', '38 weeks', 'Estimated due date'],
      ],
    },
    pitfalls: 'Do not confuse gestational age with fetal age (also called embryonic age or fertilization age). Gestational age is always about 2 weeks more than fetal age. When a pregnancy website says "your baby at week 8," check whether it means gestational week 8 (fetal age ~6 weeks, embryo about the size of a raspberry) or fetal week 8 (gestational age ~10 weeks, about the size of a kumquat). The difference is a full trimester of development on some consumer apps.',
    faqs: [
      { q: 'Why does gestational age start at the last period and not conception?', a: 'Most people know when their last period started, but few know the exact date of conception. The LMP date is a reliable, observable event that can be recorded consistently. Counting from the LMP also means all providers use the same starting point, keeping screening timelines and viability thresholds standardized across all pregnancies worldwide.' },
      { q: 'Can gestational age be wrong if my cycles are irregular?', a: 'Yes. LMP-based gestational age assumes ovulation on day 14 of a 28-day cycle. If you have longer cycles (e.g., 35 days), ovulation happens around day 21, so LMP dating overestimates gestational age by about a week. A first-trimester ultrasound corrects for this by measuring the embryo directly, and ACOG recommends adjusting the due date if ultrasound differs by more than 7 days.' },
      { q: 'What is the difference between gestational age and fetal age?', a: 'Gestational age is measured from the LMP and includes the two weeks before conception. Fetal age (embryonic age) is measured from fertilization and is always about 2 weeks less than gestational age. Clinicians universally use gestational age; fetal age appears more often in embryology textbooks and some consumer pregnancy apps.' },
    ],
    quiz: {
      topic: 'gestational age',
      questions: [
        {
          q: 'A full-term pregnancy is defined as how many weeks of gestational age?',
          options: ['38 weeks', '39 weeks', '40 weeks', '42 weeks'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'A full-term pregnancy is 40 weeks of gestational age, counted from the first day of the last menstrual period. "Full term" as a clinical label refers to 37-41 weeks. 38 weeks is the approximate fetal age at term - 2 weeks less than gestational age because gestational counting starts before conception.',
        },
        {
          q: 'If a woman is 12 weeks gestational age, approximately how long has the fetus been developing?',
          options: ['10 weeks', '12 weeks', '14 weeks', '8 weeks'] as [string, string, string, string],
          correct: 0 as const,
          explanation: 'Gestational age is approximately 2 weeks more than fetal (developmental) age. At 12 weeks gestational age, the embryo/fetus has been developing for about 10 weeks, since gestational counting starts at the LMP - about 2 weeks before ovulation and conception actually occur.',
        },
        {
          q: 'Why is gestational age measured from the LMP rather than from conception?',
          options: ['Because LMP is more biologically meaningful than conception', 'Because the LMP is a known, observable date while exact conception is rarely known', 'Because LMP predicts birth weight more accurately', 'Because conception is not a recognized medical event'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'The LMP is used because it is a known, recorded date - most people can recall or check when their last period started. The exact date of conception is rarely known from natural intercourse. Using a consistent, observable starting point allows all providers worldwide to use the same timeline for screening windows and viability thresholds.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },
  'gestational-weight-gain': {
    definition: [
      'Gestational weight gain (GWG) is the total weight gained between conception and delivery. It is not simply fat - it includes the weight of the fetus (~3.3 kg at term), placenta (~0.7 kg), amniotic fluid (~0.8 kg), expanded blood volume (~1.5 kg), uterine and breast tissue growth (~1.4 kg combined), extracellular fluid (~1.5 kg), and maternal fat stores (~3-4 kg built as an energy buffer for breastfeeding.',
      'The Institute of Medicine (IOM) published evidence-based GWG guidelines in 2009, updated from the 1990 version to reflect modern obesity prevalence. These guidelines set total gain targets and per-week rates by pre-pregnancy BMI category, and are endorsed by ACOG, the CDC, and most obstetric bodies worldwide.',
      'GWG outside the recommended range - either too much or too little - is associated with distinct adverse outcomes. Excessive GWG (which affects approximately 47% of US pregnant women per CDC data) is the more common problem and is linked to macrosomia, C-section delivery, and long-term postpartum weight retention. Insufficient GWG is linked to preterm birth and small-for-gestational-age infants.',
    ],
    beginnerExplain: [
      'Think of GWG targets like a recipe that accounts for your starting pantry. The baby needs roughly the same "ingredients" (nutrients, energy, space to grow) regardless of the mother\'s starting weight. If your pantry is already well-stocked - meaning you have more stored energy from a higher pre-pregnancy BMI - the recipe calls for fewer new ingredients from the store.',
      'A woman with obesity (BMI 32) has a GWG target of 5-9 kg, not because she should restrict food, but because her body can supply more from existing reserves. A woman who is underweight (BMI 17) has a target of 12.5-18 kg because she needs to build those reserves from scratch. The baby\'s needs are nearly identical in both cases - only the starting balance differs.',
    ],
    whenToUse: 'Calculate your pre-pregnancy BMI first using the BMI Calculator for Pregnant Women, then match your BMI category to the IOM table to find your total gain range. The per-week rate applies from the second trimester onward - first trimester gain is typically 0.5-2 kg total and does not follow a fixed weekly rate. Use GWG tracking at prenatal appointments to check whether cumulative gain is on pace, above, or below range.',
    examples: {
      headers: ['Pre-pregnancy BMI', 'Category', 'Total gain', 'Per week (2nd + 3rd trimester)'],
      rows: [
        ['Below 18.5', 'Underweight', '12.5-18 kg (28-40 lbs)', '0.44-0.58 kg (1.0-1.3 lbs)'],
        ['18.5-24.9', 'Normal weight', '11.5-16 kg (25-35 lbs)', '0.35-0.50 kg (0.8-1.0 lbs)'],
        ['25.0-29.9', 'Overweight', '7-11.5 kg (15-25 lbs)', '0.23-0.33 kg (0.5-0.7 lbs)'],
        ['30.0 and above', 'Obese', '5-9 kg (11-20 lbs)', '0.17-0.27 kg (0.4-0.6 lbs)'],
        ['Twins, normal weight', 'Multiple', '17-25 kg', 'No fixed weekly rate'],
        ['Twins, obese', 'Multiple', '11-19 kg', 'No fixed weekly rate'],
      ],
    },
    pitfalls: 'The most common mistake is applying the normal-weight target (11.5-16 kg) to women with overweight or obesity, leading to excess gain. A second pitfall is expecting first-trimester gain to match the per-week rate: the weekly rate applies only from the second trimester; minimal or even negative first-trimester gain due to nausea does not need to be "made up." A third pitfall is treating these as rigid rules - the IOM ranges are population-level guidelines, not individual prescriptions. Fetal growth monitoring, maternal health, and clinical judgment always take precedence over hitting a GWG number.',
    faqs: [
      {
        q: 'What happens if I gain more than the recommended amount during pregnancy?',
        a: 'Gaining above the IOM range is associated with higher rates of macrosomia (birth weight above 4 kg), C-section delivery, and postpartum weight retention. The absolute risk increase per individual pregnancy is modest. Small excesses are less concerning than consistent excess gain across the second and third trimesters.'
      },
      {
        q: 'Are the IOM 2009 gestational weight gain guidelines still current?',
        a: 'Yes - the IOM 2009 guidelines remain the standard reference endorsed by ACOG, the CDC, and most obstetric bodies. Some researchers have proposed lower targets for women with severe obesity (BMI 40+), where weight-neutral gain may be safe, but no revised official guidelines have been issued as of 2024.'
      },
      {
        q: 'Does gestational weight gain affect the baby\'s long-term health?',
        a: 'Yes. Excessive GWG is linked to higher rates of childhood obesity in offspring, partly through epigenetic mechanisms affecting metabolic programming in utero. The effect is not solely explained by birth weight. Insufficient GWG is linked to small-for-gestational-age outcomes and associated developmental risks.'
      },
      {
        q: 'Why do women with obesity have a lower GWG target?',
        a: 'The fetus needs roughly the same nutritional inputs regardless of maternal BMI. Women with obesity have greater pre-existing fat stores that the body can draw on to meet fetal energy demands, so less new maternal fat accumulation is needed. The lower target reflects starting reserves, not a caloric restriction policy.'
      },
    ],
    quiz: {
      topic: 'gestational weight gain',
      questions: [
        {
          q: 'According to IOM 2009, what is the recommended total gestational weight gain for a woman with a pre-pregnancy BMI of 27.2 (overweight)?',
          options: ['11.5-16 kg (25-35 lbs)', '12.5-18 kg (28-40 lbs)', '7-11.5 kg (15-25 lbs)', '5-9 kg (11-20 lbs)'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'BMI 27.2 falls in the overweight range (25.0-29.9), which carries a total recommended gain of 7-11.5 kg (15-25 lbs). The 11.5-16 kg range applies to normal-weight women and is a common mix-up.',
        },
        {
          q: 'What proportion of US pregnant women gain more than the IOM recommends?',
          options: ['Around 20%', 'Around 35%', 'Around 47%', 'Around 60%'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'CDC data show approximately 47% of US pregnant women exceed the IOM-recommended gestational weight gain range. Excessive gain is the more common problem; insufficient gain is relatively less frequent and most common in women with severe nausea or underweight pre-pregnancy BMI.',
        },
        {
          q: 'Why do women with obesity have a lower GWG target than normal-weight women?',
          options: ['They need fewer calories because pregnancy metabolism is slower at higher BMI', 'Their existing fat stores can supply energy for fetal development, so less new fat accumulation is needed', 'IOM guidelines penalise higher BMI to incentivise pre-conception weight loss', 'The fetus grows more slowly in women with obesity, requiring less total energy'] as [string, string, string, string],
          correct: 1 as const,
          explanation: 'Women with obesity have greater pre-existing stored energy that the body can draw on to meet fetal demands. The fetus needs roughly the same nutritional inputs regardless of maternal BMI - the lower target reflects a higher starting reserve, not a caloric restriction policy.',
        },
        {
          q: 'The IOM per-week weight gain rate applies from which point in pregnancy?',
          options: ['From the first prenatal appointment, typically week 8-10', 'From the start of conception, week 1', 'From the second trimester onward (roughly week 14)', 'Only in the third trimester (week 27 onward)'] as [string, string, string, string],
          correct: 2 as const,
          explanation: 'The weekly rate in the IOM table applies to the second and third trimesters combined. First-trimester total gain is small (0.5-2 kg across all categories) and does not follow a fixed weekly rate. Minimal or negative first-trimester gain due to nausea is normal.',
        },
      ] satisfies { q: string; options: [string, string, string, string]; correct: 0 | 1 | 2 | 3; explanation: string }[],
    },
  },

};
