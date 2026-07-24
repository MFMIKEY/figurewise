export default {
  slug: "inflation",
  category: "saving",
  icon: "📉",
  cardTitle: "Inflation Calculator",
  cardBlurb: "See how rising prices shrink what your money can buy over time.",
  h1: "Inflation Calculator",
  metaTitle: "Inflation Calculator — Value of Money Over Time | FigureWise",
  metaDescription:
    "Free inflation calculator: see how rising prices raise the future cost of a purchase and erode the purchasing power of your money over any number of years.",
  intro:
    "See how inflation quietly raises the future cost of the things you buy — and how much less a fixed amount of cash will be worth after years of rising prices.",
  affiliateGroup: null,

  inputs: [
    { id: "amount", label: "Amount today", prefix: "$", default: 1000, min: 0, max: 10000000, step: 100 },
    { id: "years", label: "Years", suffix: "yrs", default: 10, min: 1, max: 60, step: 1 },
    { id: "inflationRate", label: "Average annual inflation", suffix: "%", default: 3, min: 0, max: 20, step: 0.1 },
  ],

  outputs: [
    { id: "futureCost", label: "Future cost", format: "currency", primary: true },
    { id: "purchasingPower", label: "What today's money will be worth", format: "currency" },
    { id: "totalIncrease", label: "Total increase", format: "currency" },
  ],

  compute: function (v) {
    var amount = Math.max(0, v.amount || 0);
    var years = Math.max(0, v.years || 0);
    var i = (v.inflationRate || 0) / 100;
    var factor = Math.pow(1 + i, years);
    var futureCost = amount * factor;
    var purchasingPower = factor > 0 ? amount / factor : amount;
    return { futureCost: futureCost, purchasingPower: purchasingPower, totalIncrease: futureCost - amount };
  },

  content: {
    howItWorks: `<p>Inflation is the slow, steady rise in the price of everyday goods and services. When prices go up, each dollar buys a little less than it did before — so the same shopping cart, tank of gas or monthly rent costs more next year than it does today.</p>
<p>This calculator looks at that shift from two angles. First, it shows the <strong>future cost</strong>: how much you'll need down the road to buy something that costs a set amount now. Second, it shows <strong>purchasing power</strong>: what a fixed pile of cash left untouched would actually be worth, in today's terms, after inflation chips away at it year after year.</p>`,
    formula: `<p>Inflation compounds — each year's increase builds on the one before it, just like interest. To find what something will cost in the future, you grow today's price by the inflation rate for every year that passes:</p>
<div class="formula">Future cost = Amount × (1 + inflation)^years</div>
<p>To find the purchasing power of money you simply hold, you divide by that same growth factor, which tells you what a future dollar is worth in today's money:</p>
<div class="formula">Purchasing power = Amount ÷ (1 + inflation)^years</div>
<p>Here <strong>inflation</strong> is the average annual rate written as a decimal (3% = 0.03) and <strong>years</strong> is the length of time. Because the rate is applied every year, even a modest 3% adds up to a big gap over a couple of decades.</p>`,
    tips: `<ul>
<li><strong>Try the long-run average.</strong> Historically, prices in the U.S. have risen roughly 3% a year on average. Plug that in for a realistic baseline, then test higher and lower rates to see the range of outcomes.</li>
<li><strong>Watch the doubling effect.</strong> At about 3% inflation, prices roughly double in 24 years. Small annual increases compound into surprisingly large changes over a working lifetime.</li>
<li><strong>Cash on its own loses ground.</strong> Money sitting idle earns nothing while prices climb. To keep pace, the return on your savings needs to at least match the inflation rate.</li>
<li><strong>Plan future goals in future dollars.</strong> When budgeting for college, a car or retirement years away, use the future cost figure — not today's price tag — so you aren't caught short.</li>
</ul>`,
  },

  faq: [
    {
      q: "What is purchasing power?",
      a: "Purchasing power is how much a given amount of money can actually buy. As inflation pushes prices up, the same dollars buy fewer goods and services, so their purchasing power falls over time even though the number on the bill stays the same.",
    },
    {
      q: "What inflation rate should I use?",
      a: "There is no single correct number, since inflation changes year to year. Long-run U.S. inflation has averaged around 3% annually, which makes a reasonable default. It's worth trying a couple of rates to see a realistic range rather than betting on one exact figure.",
    },
    {
      q: "How does inflation affect my savings?",
      a: "If your savings sit in an account earning less than the inflation rate, their real value shrinks each year even as the balance holds steady. To preserve purchasing power, the return on your money needs to keep up with — or beat — inflation.",
    },
    {
      q: "Why does inflation compound instead of just adding up?",
      a: "Each year's price increase is calculated on top of the already-higher price from the year before, so the effect builds on itself. That compounding is why 3% a year over 20 years raises costs far more than a simple 3% × 20 would suggest.",
    },
  ],

  related: [
    { slug: "compound-interest", label: "Compound Interest Calculator" },
    { slug: "savings-goal", label: "Savings Goal Calculator" },
    { slug: "retirement", label: "Retirement Calculator" },
  ],
};
