// ============================================================================
// CALCULATOR SCHEMA REFERENCE (every calculator file exports this shape)
// ----------------------------------------------------------------------------
//  slug            url-safe id -> /calculators/<slug>/
//  category        one of: "loans" | "saving" | "debt" | "income"
//  icon            emoji for the homepage card
//  cardTitle       short title for cards/nav (optional; defaults to h1)
//  cardBlurb       one-line homepage card description
//  h1              the on-page <h1>
//  metaTitle       <title> (optional; a good default is generated)
//  metaDescription 150-160 char SEO description (REQUIRED, unique)
//  intro           1-2 sentence lead under the H1
//  affiliateGroup  "savings" | "loans" | "debt" | null  (which affiliate card)
//  inputs[]        {id,label,type,default,min,max,step,prefix,suffix,help,options}
//                    type "number" (default) or "select" (needs options:[{value,label}])
//  outputs[]       {id,label,format,primary?,hidden?}
//                    format: currency|currency0|percent|number|integer|months|years|text
//  breakdown       {title, parts:[{outputId,label,color}]}  (optional stacked bar)
//  schedule        true -> compute returns _schedule:[{period,payment,principal,interest,balance}]
//  compute         function (v) { ... return {outId:number, _schedule?:[]} }
//                    MUST be a function EXPRESSION (compute: function (v) {...}),
//                    PURE, self-contained, only using `v` and Math. It is inlined
//                    into the page verbatim and also runs in the browser.
//  content         {howItWorks, formula, tips, extra}  HTML strings (optional)
//  faq[]           {q, a}  a = HTML string
//  related[]       {slug,label}
// ============================================================================

export default {
  slug: "mortgage",
  category: "loans",
  icon: "🏠",
  cardTitle: "Mortgage Calculator",
  cardBlurb: "Estimate your full monthly payment, including taxes & insurance.",
  h1: "Mortgage Calculator",
  metaTitle: "Mortgage Calculator — Monthly Payment, Taxes & Amortization | FigureWise",
  metaDescription:
    "Free mortgage calculator with taxes, insurance, PMI and a full amortization schedule. See your real monthly payment and total interest instantly.",
  intro:
    "Estimate your full monthly house payment — principal, interest, property tax, insurance and HOA — and see exactly how much interest you'll pay over the life of the loan.",
  affiliateGroup: "loans",

  inputs: [
    { id: "homePrice", label: "Home price", prefix: "$", default: 400000, min: 0, max: 2000000, step: 5000 },
    {
      id: "downPayment",
      label: "Down payment",
      prefix: "$",
      default: 80000,
      min: 0,
      max: 1000000,
      step: 5000,
      help: "Enter an amount, not a percent.",
    },
    { id: "interestRate", label: "Interest rate", suffix: "%", default: 6.5, min: 0, max: 15, step: 0.05 },
    {
      id: "loanTerm",
      label: "Loan term",
      type: "select",
      default: 30,
      options: [
        { value: 30, label: "30 years" },
        { value: 20, label: "20 years" },
        { value: 15, label: "15 years" },
        { value: 10, label: "10 years" },
      ],
    },
    { id: "propertyTax", label: "Property tax (yearly)", prefix: "$", default: 3600, min: 0, max: 60000, step: 100 },
    { id: "homeInsurance", label: "Home insurance (yearly)", prefix: "$", default: 1800, min: 0, max: 30000, step: 100 },
    { id: "hoa", label: "HOA (monthly)", prefix: "$", default: 0, min: 0, max: 2000, step: 10 },
  ],

  outputs: [
    { id: "monthlyPayment", label: "Estimated monthly payment", format: "currency", primary: true },
    { id: "principalInterest", label: "Principal & interest", format: "currency" },
    { id: "monthlyTax", label: "Property tax", format: "currency" },
    { id: "monthlyInsurance", label: "Home insurance", format: "currency" },
    { id: "monthlyHOA", label: "HOA fees", format: "currency" },
    { id: "loanAmount", label: "Loan amount", format: "currency0" },
    { id: "totalInterest", label: "Total interest paid", format: "currency0" },
    { id: "totalOfPayments", label: "Total of all payments", format: "currency0" },
  ],

  breakdown: {
    title: "Where your money goes over the loan",
    parts: [
      { outputId: "loanAmount", label: "Principal", color: "#1f8f5f" },
      { outputId: "totalInterest", label: "Interest", color: "#f6a52f" },
    ],
  },

  schedule: true,

  compute: function (v) {
    var price = Math.max(0, v.homePrice || 0);
    var down = Math.max(0, v.downPayment || 0);
    var loan = Math.max(0, price - down);
    var r = (v.interestRate || 0) / 100 / 12;
    var n = Math.round((v.loanTerm || 30) * 12);
    var pi;
    if (n <= 0) pi = 0;
    else if (r > 0) pi = (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    else pi = loan / n;

    var mTax = (v.propertyTax || 0) / 12;
    var mIns = (v.homeInsurance || 0) / 12;
    var mHoa = v.hoa || 0;

    var bal = loan,
      sched = [],
      totalInterest = 0;
    for (var i = 1; i <= n && i <= 600; i++) {
      var interest = bal * r;
      var principal = pi - interest;
      if (principal > bal) principal = bal;
      bal -= principal;
      totalInterest += interest;
      sched.push({ period: i, payment: pi, principal: principal, interest: interest, balance: bal });
    }

    return {
      monthlyPayment: pi + mTax + mIns + mHoa,
      principalInterest: pi,
      monthlyTax: mTax,
      monthlyInsurance: mIns,
      monthlyHOA: mHoa,
      loanAmount: loan,
      totalInterest: totalInterest,
      totalOfPayments: pi * n,
      _schedule: sched,
    };
  },

  content: {
    howItWorks: `<p>Your monthly mortgage payment is made up of four parts, often called <strong>PITI</strong>: <strong>P</strong>rincipal, <strong>I</strong>nterest, <strong>T</strong>axes and <strong>I</strong>nsurance. This calculator adds any monthly HOA dues on top so you see the true out-of-pocket cost each month.</p>
<p>The principal-and-interest portion is fixed for a standard loan. Early on, most of each payment goes toward interest; over time the balance tips toward principal. The amortization schedule below shows that shift month by month.</p>`,
    formula: `<p>Monthly principal &amp; interest uses the standard amortizing-loan formula:</p>
<div class="formula">M = P × [ r(1 + r)^n ] ÷ [ (1 + r)^n − 1 ]</div>
<p>where <strong>P</strong> = loan amount (price − down payment), <strong>r</strong> = monthly interest rate (annual rate ÷ 12), and <strong>n</strong> = number of monthly payments (years × 12). Property tax and insurance are annual figures divided by 12.</p>`,
    tips: `<ul>
<li><strong>A bigger down payment</strong> lowers both your loan amount and your monthly payment — and 20% down usually lets you skip private mortgage insurance (PMI).</li>
<li><strong>A shorter term</strong> (15 years vs 30) raises the monthly payment but slashes total interest dramatically.</li>
<li><strong>Even a small rate change</strong> moves the payment a lot. Try adjusting the rate by 0.5% to see the impact before you lock in.</li>
<li><strong>Don't forget closing costs</strong> — typically 2–5% of the loan — which this estimate doesn't include.</li>
</ul>`,
  },

  faq: [
    {
      q: "Does this mortgage calculator include taxes and insurance?",
      a: "Yes. Enter your yearly property tax and home insurance and they're divided into monthly amounts and added to your principal and interest. You can also include monthly HOA dues for a complete payment estimate.",
    },
    {
      q: "What is included in the monthly payment?",
      a: "The estimate combines principal, interest, monthly property tax, monthly home insurance, and any HOA fees. It does not include one-time closing costs or private mortgage insurance (PMI), which applies when your down payment is under 20%.",
    },
    {
      q: "How much house can I afford?",
      a: "A common guideline is to keep your total monthly housing payment under about 28% of your gross monthly income. Try different home prices and down payments here to find a monthly payment that fits comfortably within that range.",
    },
    {
      q: "Is a 15-year or 30-year mortgage better?",
      a: "A 30-year loan has lower monthly payments but costs far more in total interest. A 15-year loan costs more each month but builds equity faster and saves tens of thousands in interest. Switch the loan term above to compare both.",
    },
  ],

  related: [
    { slug: "auto-loan", label: "Auto Loan Calculator" },
    { slug: "loan", label: "Loan Calculator" },
    { slug: "compound-interest", label: "Compound Interest Calculator" },
  ],
};
