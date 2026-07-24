export default {
  slug: "savings-goal",
  category: "saving",
  icon: "🎯",
  cardTitle: "Savings Goal Calculator",
  cardBlurb: "Find the monthly deposit you need to hit a savings target on time.",
  h1: "Savings Goal Calculator",
  metaTitle: "Savings Goal Calculator — Monthly Savings Needed | FigureWise",
  metaDescription:
    "Free savings goal calculator that shows how much to save per month to reach your target by a set date. Accounts for your current balance and expected growth.",
  intro:
    "Tell us your target, your timeline and what you've already saved, and we'll show the monthly deposit that gets you there — plus how much of the goal your interest quietly covers for you.",
  affiliateGroup: "savings",

  inputs: [
    { id: "goalAmount", label: "Savings goal", prefix: "$", default: 50000, min: 0, max: 5000000, step: 1000 },
    { id: "currentSavings", label: "Current savings", prefix: "$", default: 5000, min: 0, max: 5000000, step: 500 },
    { id: "years", label: "Years to save", suffix: "yrs", default: 5, min: 1, max: 50, step: 1 },
    { id: "annualRate", label: "Annual return", suffix: "%", default: 5, min: 0, max: 30, step: 0.1 },
  ],

  outputs: [
    { id: "monthlyRequired", label: "Save this per month", format: "currency", primary: true },
    { id: "totalDeposits", label: "Total you deposit", format: "currency0" },
    { id: "interestEarned", label: "Interest earned", format: "currency0" },
  ],

  compute: function (v) {
    var goal = Math.max(0, v.goalAmount || 0);
    var current = Math.max(0, v.currentSavings || 0);
    var years = Math.max(0, v.years || 0);
    var r = (v.annualRate || 0) / 100 / 12;
    var n = Math.round(years * 12);
    var futureCurrent = current * Math.pow(1 + r, n);
    var needed = Math.max(0, goal - futureCurrent);
    var pmt;
    if (n <= 0) pmt = needed;
    else if (r > 0) pmt = (needed * r) / (Math.pow(1 + r, n) - 1);
    else pmt = needed / n;
    var totalDeposits = pmt * n;
    return { monthlyRequired: pmt, totalDeposits: totalDeposits, interestEarned: Math.max(0, goal - current - totalDeposits) };
  },

  content: {
    howItWorks: `<p>Instead of asking &ldquo;how much will I have?&rdquo;, a savings goal works backward from a number you actually care about — a house down payment, an emergency fund, a wedding, a car. You fix the target and the deadline, and the calculator solves for the one thing you control: the deposit you make each month.</p>
<p>Your money doesn't sit still while you save. The balance you already have keeps growing, and every deposit you add earns a return of its own. This tool grows your current savings forward to your target date first, then works out the monthly amount needed to cover only the gap that's left — so you're never asked to save more than you truly need.</p>`,
    formula: `<p>First, your existing balance is grown to the deadline using compound interest, then subtracted from the goal to find the remaining gap:</p>
<div class="formula">Gap = Goal − Current × (1 + r)^n</div>
<p>The monthly deposit that fills that gap comes from the ordinary-annuity payment formula, which accounts for the growth each deposit earns before the deadline:</p>
<div class="formula">Deposit = Gap × r ÷ [ (1 + r)^n − 1 ]</div>
<p>Here <strong>r</strong> is the monthly return (annual return ÷ 12) and <strong>n</strong> is the number of months (years × 12). When the return is zero, the deposit is simply the gap divided by the number of months.</p>`,
    tips: `<ul>
<li><strong>Start with the number, not the payment.</strong> Nail down what the goal actually costs today, then let the calculator tell you the monthly deposit — guessing the deposit first almost always undershoots.</li>
<li><strong>Automate the deposit.</strong> Set up an automatic transfer for the monthly figure the day after payday, so the money moves before you're tempted to spend it.</li>
<li><strong>Be conservative with the return.</strong> For a goal only a year or two away, a savings account or CD rate is realistic; stretching the assumed return to hit a lower deposit just hides the shortfall.</li>
<li><strong>Buying more time beats squeezing your budget.</strong> Adding a year or two to the timeline can lower the required monthly deposit far more comfortably than trying to save an aggressive amount.</li>
</ul>`,
  },

  faq: [
    {
      q: "How much should I save each month to reach my goal?",
      a: "Enter your target amount, how many years you have, your current balance and an expected annual return. The calculator solves for the exact monthly deposit that closes the gap, so you don't have to guess.",
    },
    {
      q: "Does it account for interest on my current savings?",
      a: "Yes. Your existing balance is grown forward to the target date using compound interest, and only the remaining shortfall is used to work out your monthly deposit — so a healthy starting balance directly lowers what you need to save.",
    },
    {
      q: "What annual return should I assume?",
      a: "Use a rate that matches where the money will sit. High-yield savings accounts and CDs are typically in the low single digits, while long-term diversified investments have historically averaged more but carry risk. All returns here are estimates, not guarantees.",
    },
    {
      q: "What if I can't afford the monthly amount?",
      a: "You have three levers: extend the timeline, lower the goal, or add to your starting balance. Adjust any input above and watch the required deposit update — stretching the deadline usually eases the monthly figure the most.",
    },
  ],

  related: [
    { slug: "compound-interest", label: "Compound Interest Calculator" },
    { slug: "retirement", label: "Retirement Calculator" },
    { slug: "inflation", label: "Inflation Calculator" },
  ],
};
