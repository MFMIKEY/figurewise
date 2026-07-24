export default {
  slug: "401k",
  category: "saving",
  icon: "🏦",
  cardTitle: "401(k) Calculator",
  cardBlurb: "See how contributions and an employer match grow your 401(k) over time.",
  h1: "401(k) Calculator",
  metaTitle: "401(k) Calculator — Growth With Employer Match | FigureWise",
  metaDescription:
    "Free 401k calculator that shows how your balance grows from contributions, employer match, and investment returns. See exactly where every dollar comes from.",
  intro:
    "See how a 401(k) turns your paycheck contributions and your employer's match into a much bigger balance over time — and how much of the total comes from your own money, the free match, and compounding growth.",
  affiliateGroup: "savings",

  inputs: [
    { id: "currentBalance", label: "Current 401(k) balance", prefix: "$", default: 20000, min: 0, max: 10000000, step: 1000 },
    { id: "annualSalary", label: "Annual salary", prefix: "$", default: 70000, min: 0, max: 2000000, step: 1000 },
    { id: "contributionPercent", label: "Your contribution", suffix: "%", default: 6, min: 0, max: 100, step: 0.5, help: "Percent of salary you contribute." },
    { id: "employerMatchPercent", label: "Employer match", suffix: "%", default: 50, min: 0, max: 200, step: 5, help: "% of your contribution they match." },
    { id: "matchLimitPercent", label: "Match limit", suffix: "%", default: 6, min: 0, max: 25, step: 0.5, help: "Up to this % of your salary." },
    { id: "annualReturn", label: "Annual return", suffix: "%", default: 7, min: 0, max: 20, step: 0.1 },
    { id: "years", label: "Years", suffix: "yrs", default: 25, min: 1, max: 50, step: 1 },
  ],

  outputs: [
    { id: "endingBalance", label: "Balance at the end", format: "currency0", primary: true },
    { id: "yourContributions", label: "Your contributions", format: "currency0" },
    { id: "employerContributions", label: "Employer match", format: "currency0" },
    { id: "investmentGrowth", label: "Investment growth", format: "currency0" },
  ],

  breakdown: {
    title: "What makes up your balance",
    parts: [
      { outputId: "startingBalance", label: "Starting balance", color: "#77808f" },
      { outputId: "yourContributions", label: "Your contributions", color: "#1f8f5f" },
      { outputId: "employerContributions", label: "Employer match", color: "#2f6df6" },
      { outputId: "investmentGrowth", label: "Growth", color: "#f6a52f" },
    ],
  },

  compute: function (v) {
    var bal = Math.max(0, v.currentBalance || 0);
    var salary = Math.max(0, v.annualSalary || 0);
    var contribPct = Math.max(0, v.contributionPercent || 0) / 100;
    var matchPct = Math.max(0, v.employerMatchPercent || 0) / 100;
    var matchLimit = Math.max(0, v.matchLimitPercent || 0) / 100;
    var r = (v.annualReturn || 0) / 100 / 12;
    var n = Math.round((v.years || 0) * 12);
    var startBal = bal;
    var yourMonthly = (salary * contribPct) / 12;
    var employerMonthly = (Math.min(contribPct, matchLimit) * salary * matchPct) / 12;
    var monthlyAdd = yourMonthly + employerMonthly;
    for (var i = 0; i < n; i++) { bal = bal * (1 + r) + monthlyAdd; }
    var yourContributions = yourMonthly * n;
    var employerContributions = employerMonthly * n;
    return {
      endingBalance: bal,
      startingBalance: startBal,
      yourContributions: yourContributions,
      employerContributions: employerContributions,
      investmentGrowth: bal - (startBal + yourContributions + employerContributions)
    };
  },

  content: {
    howItWorks: `<p>A 401(k) grows from three things working together: the money you already have saved, the slice of each paycheck you contribute, and any match your employer adds on top. This calculator starts with your current balance, then adds your monthly contribution — your salary times the percent you set aside — plus the employer match every month.</p>
<p>The employer match is calculated on your contribution but capped at a limit, usually a set percent of your salary. Each month the whole balance also earns a return and compounds, so the earlier contributions have more time to snowball. The result breaks your ending balance into what you put in, what your employer added, and how much came purely from investment growth.</p>`,
    formula: `<p>Every month the calculator adds two deposits, then applies the monthly return to the whole balance. Your deposit and the employer's match are:</p>
<div class="formula">Your monthly = (Salary × Your %) ÷ 12</div>
<div class="formula">Employer monthly = (min(Your %, Match limit %) × Salary × Match %) ÷ 12</div>
<p>The balance then grows month after month using the compounding step below, where <strong>r</strong> is the annual return divided by 12:</p>
<div class="formula">New balance = Old balance × (1 + r) + Your monthly + Employer monthly</div>
<p>Because the match is a percentage of what you contribute (only up to the salary limit), it is essentially free money added on top of your own savings.</p>`,
    tips: `<ul>
<li><strong>Always contribute enough to get the full match.</strong> If your employer matches up to 6% of salary, contributing less than 6% leaves free money on the table.</li>
<li><strong>Raise your contribution slowly.</strong> Bumping your percent by even 1% a year — often timed with a raise — can add a large amount to the ending balance without pinching your take-home pay much.</li>
<li><strong>Start early and let compounding work.</strong> Try changing the years input to see how contributions made sooner grow far more than the same dollars added later.</li>
<li><strong>Treat the return as an estimate.</strong> A 7% average is common for a diversified portfolio, but real returns vary year to year, so test a lower rate to see a more conservative picture.</li>
</ul>`,
  },

  faq: [
    {
      q: "How does the employer match actually work?",
      a: "Your employer matches a percentage of what you contribute, up to a salary limit. With a 50% match on the first 6% of pay, contributing 6% of a $70,000 salary earns an extra 50 cents for every dollar you put in on that portion — money you only get if you contribute.",
    },
    {
      q: "What is a good percentage to contribute to a 401(k)?",
      a: "A common starting point is at least enough to capture the full employer match, then working toward 10–15% of your salary over time. The right number depends on your budget and goals, so treat this as general guidance rather than personalized advice.",
    },
    {
      q: "What return should I assume for my 401(k)?",
      a: "This calculator defaults to 7%, a rough long-term average for a diversified stock-and-bond mix before inflation. Actual returns swing up and down each year, so it helps to test a lower rate to see a more cautious estimate.",
    },
    {
      q: "Does this calculator account for taxes or contribution limits?",
      a: "No. It shows pre-tax growth and does not apply the annual IRS contribution limit or any taxes on withdrawals. It is an educational estimate, not tax or investment advice, so check current limits and consult a professional for your situation.",
    },
  ],

  related: [
    { slug: "retirement", label: "Retirement Calculator" },
    { slug: "investment", label: "Investment Calculator" },
    { slug: "compound-interest", label: "Compound Interest Calculator" },
  ],
};
