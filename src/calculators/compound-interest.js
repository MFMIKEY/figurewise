export default {
  slug: "compound-interest",
  category: "saving",
  icon: "📈",
  cardTitle: "Compound Interest Calculator",
  cardBlurb: "See how savings grow with compound interest and monthly contributions.",
  h1: "Compound Interest Calculator",
  metaTitle: "Compound Interest Calculator with Contributions | FigureWise",
  metaDescription:
    "Free compound interest calculator with monthly contributions. See how a starting balance and regular deposits grow, plus total interest earned over time.",
  intro:
    "See how a starting balance and steady monthly contributions can snowball over the years as your returns begin earning returns of their own. Adjust the rate, time frame and compounding frequency to picture your future balance.",
  affiliateGroup: "savings",

  inputs: [
    { id: "principal", label: "Starting amount", prefix: "$", default: 10000, min: 0, max: 1000000, step: 500 },
    { id: "monthlyContribution", label: "Monthly contribution", prefix: "$", default: 200, min: 0, max: 10000, step: 50 },
    { id: "annualRate", label: "Annual return", suffix: "%", default: 7, min: 0, max: 30, step: 0.1 },
    { id: "years", label: "Years", suffix: "yrs", default: 20, min: 1, max: 60, step: 1 },
    { id: "compoundsPerYear", label: "Compounding", type: "select", default: 12, options: [
      { value: 1, label: "Annually" }, { value: 2, label: "Semi-annually" }, { value: 4, label: "Quarterly" },
      { value: 12, label: "Monthly" }, { value: 365, label: "Daily" } ] },
  ],

  outputs: [
    { id: "futureValue", label: "Future value", format: "currency0", primary: true },
    { id: "totalContributions", label: "Total contributions", format: "currency0" },
    { id: "totalInterest", label: "Total interest earned", format: "currency0" },
  ],

  breakdown: { title: "Contributions vs. interest", parts: [
    { outputId: "totalContributions", label: "Contributions", color: "#1f8f5f" },
    { outputId: "totalInterest", label: "Interest", color: "#f6a52f" } ] },

  compute: function (v) {
    var principal = Math.max(0, v.principal || 0);
    var pmt = Math.max(0, v.monthlyContribution || 0);
    var years = Math.max(0, v.years || 0);
    var m = Math.max(1, Math.round(v.compoundsPerYear || 12));
    var rate = (v.annualRate || 0) / 100;
    var effAnnual = Math.pow(1 + rate / m, m) - 1;
    var monthlyRate = Math.pow(1 + effAnnual, 1 / 12) - 1;
    var n = Math.round(years * 12);
    var bal = principal;
    for (var i = 0; i < n; i++) { bal = bal * (1 + monthlyRate) + pmt; }
    var totalContributions = principal + pmt * n;
    return { futureValue: bal, totalContributions: totalContributions, totalInterest: bal - totalContributions };
  },

  content: {
    howItWorks: `<p>Compound interest is the reason a modest savings habit can turn into a large balance over time. Instead of earning a return only on the money you put in, you also earn a return on the interest you've already earned. Each period the growth is added to your balance, and the next period's growth is calculated on that bigger number — so the balance builds on itself and accelerates.</p>
<p>This calculator combines two engines of growth: your <strong>starting amount</strong> and the <strong>monthly contributions</strong> you keep adding. Every month the running balance grows by your effective monthly return and then your fresh contribution is added on top. Over 10, 20 or 30 years, the interest portion often ends up dwarfing what you actually deposited.</p>`,
    formula: `<p>First the calculator converts your annual return into an <strong>effective monthly rate</strong>. Your nominal rate is compounded at the frequency you choose to find the effective annual return, which is then spread evenly across the 12 months:</p>
<div class="formula">i<sub>month</sub> = (1 + (1 + r ÷ m)<sup>m</sup> − 1)<sup>1/12</sup> − 1</div>
<p>where <strong>r</strong> is the annual return (as a decimal) and <strong>m</strong> is the number of compounding periods per year. Then, for each month, the balance earns that rate and your contribution is added:</p>
<div class="formula">balance = balance × (1 + i<sub>month</sub>) + monthly contribution</div>
<p>Repeating that step for every month across your chosen time frame produces the future value shown above.</p>`,
    tips: `<ul>
<li><strong>Time is the strongest lever.</strong> Because growth compounds on itself, adding five extra years often does more for your final balance than a much larger monthly contribution. Try nudging the years slider to see it.</li>
<li><strong>Contributions do the heavy lifting early on.</strong> In the first years your deposits make up most of the balance; later, interest takes over. Automating a fixed monthly transfer keeps that momentum going.</li>
<li><strong>Compounding frequency matters less than you'd expect.</strong> Switching from annual to daily compounding at the same rate changes the result only slightly — the return and the time frame drive far more of the outcome.</li>
<li><strong>Treat the return as an estimate.</strong> The rate here is an assumption, not a guarantee. Fees, taxes and inflation all reduce real-world growth, so it's wise to model a more conservative rate as well.</li>
</ul>`,
  },

  faq: [
    {
      q: "How does the compounding frequency affect my results?",
      a: `A higher compounding frequency lets interest start earning interest sooner, so daily compounding yields slightly more than annual compounding at the same rate. In practice the difference is small — the annual return and how long you stay invested matter far more.`,
    },
    {
      q: "What's the difference between compound and simple interest?",
      a: `Simple interest is calculated only on your original balance, so it grows in a straight line. Compound interest is calculated on your balance plus all previously earned interest, which is why it accelerates and pulls ahead over long time frames.`,
    },
    {
      q: "Is a 7% annual return realistic?",
      a: `Seven percent is a common planning assumption based on long-run stock market averages before inflation, but actual returns vary widely year to year and are never guaranteed. Model a lower rate too so you have a more cautious picture.`,
    },
    {
      q: "Does this calculator account for taxes and inflation?",
      a: `No — it shows growth in today's dollars before any taxes or inflation. To gauge real purchasing power, use a lower "real" rate of return, or pair this with an inflation calculator to see what your future balance is worth today.`,
    },
  ],

  related: [
    { slug: "investment", label: "Investment Calculator" },
    { slug: "retirement", label: "Retirement Calculator" },
    { slug: "savings-goal", label: "Savings Goal Calculator" },
  ],
};
