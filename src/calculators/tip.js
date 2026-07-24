export default {
  slug: "tip",
  category: "income",
  icon: "🧾",
  cardTitle: "Tip Calculator",
  cardBlurb: "Split the bill and get the tip right, instantly.",
  h1: "Tip Calculator",
  metaTitle: "Tip Calculator — Split the Bill & Tip Instantly | FigureWise",
  metaDescription:
    "Free tip calculator: enter your bill, choose a tip percentage, and split it between any number of people. See the tip, total, and amount per person instantly.",
  intro: "Enter your bill, pick a tip percentage, and split it any way you like — the tip, total and per-person amount update as you type.",
  affiliateGroup: null,

  inputs: [
    { id: "bill", label: "Bill amount", prefix: "$", default: 60, min: 0, max: 5000, step: 1 },
    { id: "tipPercent", label: "Tip", suffix: "%", default: 18, min: 0, max: 100, step: 1 },
    { id: "people", label: "Split between", suffix: "people", default: 2, min: 1, max: 50, step: 1 },
  ],

  outputs: [
    { id: "perPersonTotal", label: "Each person pays", format: "currency", primary: true },
    { id: "tipAmount", label: "Tip amount", format: "currency" },
    { id: "total", label: "Total with tip", format: "currency" },
    { id: "perPersonTip", label: "Tip per person", format: "currency" },
  ],

  compute: function (v) {
    var bill = Math.max(0, v.bill || 0);
    var pct = Math.max(0, v.tipPercent || 0);
    var people = Math.max(1, Math.round(v.people || 1));
    var tip = bill * (pct / 100);
    var total = bill + tip;
    return {
      tipAmount: tip,
      total: total,
      perPersonTotal: total / people,
      perPersonTip: tip / people,
    };
  },

  content: {
    howItWorks: `<p>The tip is simply your bill multiplied by the tip percentage. The total is the bill plus the tip, and the per-person figures divide those amounts by the number of people splitting the check.</p>`,
    tips: `<ul>
<li><strong>15–20%</strong> is standard for table service in the U.S. — 18% is a common default.</li>
<li>Tip on the <strong>pre-tax</strong> total if you want to be precise, though many people tip on the full amount for simplicity.</li>
<li>For large groups, check the receipt — some restaurants add an automatic gratuity, so you may not need to tip again.</li>
</ul>`,
  },

  faq: [
    {
      q: "How much should I tip?",
      a: "In the U.S., 15–20% is typical for sit-down restaurant service, with 18% a common middle-ground default. For exceptional service many people tip 20% or more.",
    },
    {
      q: "How do I split a bill with a tip?",
      a: "Add the tip to the bill to get the total, then divide by the number of people. This calculator does both steps automatically — just set the number of people.",
    },
    {
      q: "Should I tip on the total before or after tax?",
      a: "Either is acceptable. Tipping on the pre-tax amount is technically more precise, but tipping on the full total is common and only differs by a small amount.",
    },
  ],

  related: [
    { slug: "salary", label: "Salary to Hourly Calculator" },
    { slug: "savings-goal", label: "Savings Goal Calculator" },
  ],
};
