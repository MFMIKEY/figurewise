export default {
  slug: "roi",
  category: "saving",
  icon: "📊",
  cardTitle: "ROI Calculator",
  cardBlurb: "See your total ROI, net profit and annualized return on any investment.",
  h1: "ROI Calculator",
  metaTitle: "ROI Calculator — Total & Annualized Return | FigureWise",
  metaDescription:
    "Free ROI calculator: enter your amount invested and final value to see total return on investment, net profit in dollars, and your annualized yearly return.",
  intro:
    "Turn a simple before-and-after into real numbers — see how much an investment gained as a percentage, in dollars, and as an equivalent return per year.",
  affiliateGroup: "savings",

  inputs: [
    { id: "initialInvestment", label: "Amount invested", prefix: "$", default: 10000, min: 0, max: 10000000, step: 100 },
    { id: "finalValue", label: "Final value", prefix: "$", default: 15000, min: 0, max: 50000000, step: 100 },
    { id: "years", label: "Holding period (years)", suffix: "yrs", default: 3, min: 0.1, max: 100, step: 0.1 },
  ],

  outputs: [
    { id: "totalROI", label: "Total ROI", format: "percent", primary: true },
    { id: "netProfit", label: "Net profit", format: "currency0" },
    { id: "annualizedROI", label: "Annualized return", format: "percent" },
  ],

  compute: function (v) {
    var initial = v.initialInvestment || 0;
    var finalVal = v.finalValue || 0;
    var years = Math.max(0, v.years || 0);
    var profit = finalVal - initial;
    var totalROI = initial !== 0 ? (profit / initial) * 100 : 0;
    var annualized = (initial > 0 && finalVal > 0 && years > 0) ? (Math.pow(finalVal / initial, 1 / years) - 1) * 100 : 0;
    return { totalROI: totalROI, netProfit: profit, annualizedROI: annualized };
  },

  content: {
    howItWorks: `<p><strong>Return on investment (ROI)</strong> measures how much you made relative to what you put in. Enter the amount you invested, what it is worth now, and how long you held it. The calculator shows your total ROI as a percentage, your net profit in dollars, and an annualized return that puts everything on a per-year basis.</p>
<p>Total ROI alone can be misleading because it ignores time — a 50% gain over ten years is far weaker than 50% in one year. The <strong>annualized return</strong> fixes that by converting your total gain into the steady yearly rate that would have produced it, so you can compare investments held for different lengths of time on equal footing.</p>`,
    formula: `<p>Total ROI compares your profit to your original outlay:</p>
<div class="formula">Total ROI = (Final value − Amount invested) ÷ Amount invested</div>
<p>To account for the holding period, the annualized return finds the equivalent compounding rate per year:</p>
<div class="formula">Annualized ROI = (Final value ÷ Amount invested)^(1 ÷ Years) − 1</div>
<p>Both results are shown as percentages. If you invest $10,000 and it grows to $15,000 over 3 years, total ROI is 50%, while the annualized return is about 14.5% per year.</p>`,
    tips: `<ul>
<li><strong>Always compare annualized, not total.</strong> Two investments can both return 50%, but the one that got there in two years crushed the one that took eight.</li>
<li><strong>Include every cost.</strong> For a truer picture, add fees, commissions and taxes into your amount invested, and use the after-cost value as your final value.</li>
<li><strong>Watch out for inflation.</strong> A 6% annualized return during 4% inflation is really closer to a 2% gain in buying power — check our Inflation Calculator to adjust.</li>
<li><strong>ROI ignores risk.</strong> A high return earned by taking big risks is not automatically better than a steadier, lower one. Weigh both.</li>
</ul>`,
  },

  faq: [
    {
      q: "What is a good ROI?",
      a: "It depends on the investment and how long you held it. As a rough benchmark, the broad U.S. stock market has historically averaged roughly 7-10% per year before inflation, so an annualized return in that range is often considered solid. Anything you compare should be measured on the same annualized, per-year basis.",
    },
    {
      q: "What is the difference between total ROI and annualized ROI?",
      a: "Total ROI is your overall percentage gain from start to finish, no matter how long it took. Annualized ROI converts that total into an equivalent yearly rate, so you can fairly compare investments held for different lengths of time.",
    },
    {
      q: "Does this ROI calculator account for taxes and fees?",
      a: "Not directly. To factor them in, add any commissions or purchase fees to your amount invested, and enter your after-tax, after-cost proceeds as the final value. The result will then reflect your real net return.",
    },
    {
      q: "Can ROI be negative?",
      a: "Yes. If your final value is less than the amount you invested, your net profit and ROI are negative, meaning you lost money. The calculator handles this and shows the loss as a negative percentage and dollar amount.",
    },
  ],

  related: [
    { slug: "investment", label: "Investment Calculator" },
    { slug: "compound-interest", label: "Compound Interest Calculator" },
    { slug: "cd", label: "CD Calculator" },
  ],
};
