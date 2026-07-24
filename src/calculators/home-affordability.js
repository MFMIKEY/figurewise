export default {
  slug: "home-affordability",
  category: "loans",
  icon: "🔑",
  cardTitle: "Home Affordability Calculator",
  cardBlurb: "See how much house you can afford using the 28/36 rule.",
  h1: "Home Affordability Calculator",
  metaTitle: "Home Affordability Calculator — How Much House Can I Afford | FigureWise",
  metaDescription:
    "How much house can I afford? This home affordability calculator uses the 28/36 rule, your income, debts, down payment and rate to set your home-buying budget.",
  intro:
    "Wondering how much house you can afford? Enter your income, monthly debts, down payment and rate to see a realistic home price and monthly payment before you start shopping.",
  affiliateGroup: "loans",

  inputs: [
    { id: "annualIncome", label: "Gross annual household income", prefix: "$", default: 90000, min: 0, max: 1000000, step: 1000 },
    { id: "monthlyDebts", label: "Other monthly debt payments", prefix: "$", default: 500, min: 0, max: 50000, step: 50, help: "Car, student loans, credit-card minimums." },
    { id: "downPayment", label: "Down payment", prefix: "$", default: 40000, min: 0, max: 2000000, step: 1000 },
    { id: "interestRate", label: "Interest rate", suffix: "%", default: 6.5, min: 0, max: 15, step: 0.05 },
    { id: "loanTerm", label: "Loan term", type: "select", default: 30, options: [
      { value: 30, label: "30 years" }, { value: 20, label: "20 years" }, { value: 15, label: "15 years" } ] },
    { id: "propertyTaxRate", label: "Property tax rate", suffix: "%", default: 1.1, min: 0, max: 5, step: 0.05, help: "Annual, as a % of home value." },
    { id: "insuranceRate", label: "Home insurance rate", suffix: "%", default: 0.5, min: 0, max: 3, step: 0.05, help: "Annual, as a % of home value." },
  ],

  outputs: [
    { id: "maxHomePrice", label: "Home price you can afford", format: "currency0", primary: true },
    { id: "maxLoan", label: "Loan amount", format: "currency0" },
    { id: "monthlyPayment", label: "Max monthly payment (PITI)", format: "currency" },
    { id: "principalInterest", label: "Principal & interest", format: "currency" },
  ],

  compute: function (v) {
    var income = Math.max(0, v.annualIncome || 0);
    var debts = Math.max(0, v.monthlyDebts || 0);
    var down = Math.max(0, v.downPayment || 0);
    var r = (v.interestRate || 0) / 100 / 12;
    var n = Math.round((v.loanTerm || 30) * 12);
    var taxIns = ((v.propertyTaxRate || 0) + (v.insuranceRate || 0)) / 100 / 12;
    var grossMonthly = income / 12;
    var maxPITI = Math.max(0, Math.min(0.28 * grossMonthly, 0.36 * grossMonthly - debts));
    var mFactor;
    if (n <= 0) mFactor = 0;
    else if (r > 0) mFactor = (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    else mFactor = 1 / n;
    var denom = mFactor + taxIns;
    var homePrice = denom > 0 ? (maxPITI + down * mFactor) / denom : down;
    if (homePrice < down) homePrice = down;
    var loan = Math.max(0, homePrice - down);
    var pi = loan * mFactor;
    return { maxHomePrice: homePrice, maxLoan: loan, monthlyPayment: maxPITI, principalInterest: pi };
  },

  content: {
    howItWorks: `<p>Lenders don&rsquo;t decide what you can afford by looking at the home price alone &mdash; they look at how much of your income already goes toward debt. This calculator applies the well-known <strong>28/36 rule</strong>: your housing payment should stay under about 28% of your gross monthly income, and all of your debt combined (housing plus car, student and credit-card payments) should stay under about 36%.</p>
<p>We take the smaller of those two limits as your maximum monthly payment, then work backwards. Using your interest rate, loan term, and estimated property tax and insurance, we solve for the largest home price whose full monthly payment &mdash; principal, interest, taxes and insurance &mdash; still fits inside that limit. Add your down payment and you get a realistic target price to shop within.</p>`,
    formula: `<p>First we find the maximum monthly payment allowed by each rule and keep the lower one:</p>
<div class="formula">Max payment = min( 0.28 &times; monthly income, 0.36 &times; monthly income &minus; other debts )</div>
<p>That payment has to cover principal &amp; interest <em>plus</em> monthly taxes and insurance. Using the amortization factor <strong>f = r(1 + r)<sup>n</sup> &divide; [(1 + r)<sup>n</sup> &minus; 1]</strong> (where <strong>r</strong> is the monthly rate and <strong>n</strong> the number of payments), and a monthly tax-and-insurance rate <strong>t</strong>, we solve for the home price:</p>
<div class="formula">Home price = ( Max payment + Down payment &times; f ) &divide; ( f + t )</div>
<p>The loan amount is simply the home price minus your down payment.</p>`,
    tips: `<ul>
<li><strong>Pay down monthly debts first.</strong> Every $100 of car or credit-card payment you clear frees up roughly $100 of housing budget under the 36% back-end limit &mdash; sometimes worth tens of thousands in home price.</li>
<li><strong>A larger down payment raises your ceiling.</strong> It doesn&rsquo;t change your monthly payment limit, but it stacks directly on top of the loan you qualify for to lift the home price you can reach.</li>
<li><strong>Watch the rate.</strong> A one-point jump in interest rate can cut your affordable price by 10% or more. Re-run the numbers whenever rates move before you make an offer.</li>
<li><strong>Leave a cushion.</strong> Qualifying for a payment isn&rsquo;t the same as being comfortable with it. Consider buying below your maximum to leave room for maintenance, savings and life.</li>
</ul>`,
  },

  faq: [
    {
      q: "How much house can I afford on my income?",
      a: "A common rule of thumb is that your total monthly housing payment should stay under about 28% of your gross monthly income, with all debts combined under 36%. Enter your income and debts above and this calculator turns those limits into a specific home price.",
    },
    {
      q: "What is the 28/36 rule?",
      a: "The 28/36 rule is a lending guideline: keep housing costs at or below 28% of gross monthly income (the front-end ratio) and total debt payments at or below 36% (the back-end ratio). This tool uses whichever limit is lower to set your maximum monthly payment.",
    },
    {
      q: "Does my down payment change how much I can afford?",
      a: "Yes. Your income and debts cap the monthly payment you qualify for, which determines the loan size. Your down payment then adds on top of that loan, so a bigger down payment directly raises the total home price you can afford.",
    },
    {
      q: "Is this the same as a mortgage pre-approval?",
      a: "No. This is an estimate for planning your budget, not a lending decision. A real pre-approval also weighs your credit score, employment history, assets and documented income, so your actual approved amount may differ.",
    },
  ],

  related: [
    { slug: "mortgage", label: "Mortgage Calculator" },
    { slug: "loan", label: "Loan Calculator" },
    { slug: "paycheck", label: "Paycheck Calculator" },
  ],
};
