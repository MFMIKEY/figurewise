export default {
  slug: "retirement",
  category: "saving",
  icon: "🌴",
  cardTitle: "Retirement Calculator",
  cardBlurb: "Project your nest egg from savings, monthly contributions & returns.",
  h1: "Retirement Savings Calculator",
  metaTitle: "Retirement Calculator — Project Your 401k & Nest Egg | FigureWise",
  metaDescription:
    "Free retirement calculator that projects your nest egg from current savings, monthly contributions and expected returns. See your 401k growth and compound gains.",
  intro:
    "See how much your retirement savings could grow by the day you stop working — starting from what you have now, what you add each month, and the return you expect along the way.",
  affiliateGroup: "savings",

  inputs: [
    { id: "currentAge", label: "Current age", default: 30, min: 18, max: 80, step: 1 },
    { id: "retirementAge", label: "Retirement age", default: 65, min: 40, max: 90, step: 1 },
    { id: "currentSavings", label: "Current savings", prefix: "$", default: 25000, min: 0, max: 10000000, step: 1000 },
    { id: "monthlyContribution", label: "Monthly contribution", prefix: "$", default: 500, min: 0, max: 50000, step: 50 },
    { id: "annualReturn", label: "Annual return", suffix: "%", default: 7, min: 0, max: 20, step: 0.1 },
  ],

  outputs: [
    { id: "balanceAtRetirement", label: "Balance at retirement", format: "currency0", primary: true },
    { id: "totalContributions", label: "Total contributions", format: "currency0" },
    { id: "totalGrowth", label: "Investment growth", format: "currency0" },
  ],

  breakdown: {
    title: "Contributions vs. growth",
    parts: [
      { outputId: "totalContributions", label: "Contributions", color: "#1f8f5f" },
      { outputId: "totalGrowth", label: "Growth", color: "#f6a52f" },
    ],
  },

  compute: function (v) {
    var age = Math.max(0, v.currentAge || 0);
    var retire = Math.max(age, v.retirementAge || age);
    var current = Math.max(0, v.currentSavings || 0);
    var pmt = Math.max(0, v.monthlyContribution || 0);
    var r = (v.annualReturn || 0) / 100 / 12;
    var n = Math.round((retire - age) * 12);
    var bal = current;
    for (var i = 0; i < n; i++) { bal = bal * (1 + r) + pmt; }
    var totalContributions = current + pmt * n;
    return { balanceAtRetirement: bal, totalContributions: totalContributions, totalGrowth: bal - totalContributions };
  },

  content: {
    howItWorks: `<p>Your future nest egg comes from three ingredients working together: the money you&rsquo;ve <strong>already saved</strong>, the amount you <strong>keep adding every month</strong>, and the <strong>growth</strong> those dollars earn while they sit invested. The longer that money has to compound, the more the growth piece does the heavy lifting for you.</p>
<p>This calculator rolls your balance forward one month at a time until the year you plan to retire. Each month it applies your expected return, then adds your latest contribution &mdash; so the gains you earn early keep earning gains of their own, year after year.</p>`,
    formula: `<p>Each month the balance grows by your expected return and then your new contribution is added on top:</p>
<div class="formula">balance = balance &times; (1 + r) + monthly contribution</div>
<p>Here <strong>r</strong> is your annual return divided by 12 (a 7% return becomes 0.0058 per month). The step repeats once for every month between your current age and retirement age &mdash; that&rsquo;s <strong>(retirement age &minus; current age) &times; 12</strong> times. Your total contributions are simply your starting savings plus every monthly deposit, and the rest of the ending balance is investment growth.</p>`,
    tips: `<ul>
<li><strong>Start sooner, not bigger.</strong> Because gains compound, a modest amount invested in your 20s often outgrows a much larger amount started in your 40s. Nudge the current age down a few years to see the difference.</li>
<li><strong>Grab the full employer 401(k) match.</strong> If your workplace matches contributions, that&rsquo;s an immediate return on your money before markets even move &mdash; add it into your monthly contribution figure.</li>
<li><strong>Raise contributions with every pay bump.</strong> Try increasing the monthly amount by \$100 and watch how much the ending balance jumps &mdash; small, automatic increases barely dent your take-home pay.</li>
<li><strong>Be realistic with the return.</strong> A long-term stock-and-bond mix has historically landed somewhere in the mid single digits after inflation. Test a lower rate too so your plan holds up if markets disappoint.</li>
</ul>`,
  },

  faq: [
    {
      q: "How much should I save for retirement each month?",
      a: "A frequently cited rule of thumb is to set aside around 15% of your gross income, including any employer match. The right number depends on your target retirement age and lifestyle, so adjust the monthly contribution above until the projected balance feels comfortable.",
    },
    {
      q: "What rate of return should I assume?",
      a: "Many people model a diversified portfolio with a long-term average in the range of about 6% to 8% before inflation, but returns vary widely year to year and are never guaranteed. It&rsquo;s wise to run the calculator with a lower rate as well to stress-test your plan.",
    },
    {
      q: "Does this calculator work for a 401(k) or IRA?",
      a: "Yes. Enter your current 401(k) or IRA balance as your current savings and your combined monthly deposits &mdash; including any employer match &mdash; as the monthly contribution. The projection treats all of it as one growing, tax-advantaged pot.",
    },
    {
      q: "Does the projection account for inflation?",
      a: "No. The balance shown is a future dollar amount, so a portion of the growth simply keeps pace with rising prices. To gauge today&rsquo;s buying power, use a lower &lsquo;real&rsquo; return, or check our Inflation Calculator to translate the figure into current dollars.",
    },
  ],

  related: [
    { slug: "compound-interest", label: "Compound Interest Calculator" },
    { slug: "investment", label: "Investment Calculator" },
    { slug: "savings-goal", label: "Savings Goal Calculator" },
  ],
};
