export default {
  slug: "loan",
  category: "loans",
  icon: "💵",
  cardTitle: "Loan Calculator",
  cardBlurb: "Find the monthly payment on any fixed-rate personal or general loan.",
  h1: "Loan Calculator",
  metaTitle: "Loan Calculator — Monthly Personal Loan Payment | FigureWise",
  metaDescription:
    "Free loan calculator to find your monthly personal loan payment. Enter the amount, APR and term to see total interest, total paid and a full payoff schedule.",
  intro:
    "Work out the monthly payment on any fixed-rate loan in seconds. Enter how much you're borrowing, the APR and the term to see your payment, total interest, and a month-by-month payoff schedule.",
  affiliateGroup: "loans",

  inputs: [
    { id: "loanAmount", label: "Loan amount", prefix: "$", default: 15000, min: 0, max: 200000, step: 500 },
    { id: "interestRate", label: "Interest rate (APR)", suffix: "%", default: 9, min: 0, max: 40, step: 0.1 },
    {
      id: "loanTermMonths",
      label: "Loan term",
      type: "select",
      default: 60,
      options: [
        { value: 12, label: "12 months" },
        { value: 24, label: "24 months" },
        { value: 36, label: "36 months" },
        { value: 48, label: "48 months" },
        { value: 60, label: "60 months" },
        { value: 72, label: "72 months" },
        { value: 84, label: "84 months" },
      ],
    },
  ],

  outputs: [
    { id: "monthlyPayment", label: "Monthly payment", format: "currency", primary: true },
    { id: "totalInterest", label: "Total interest", format: "currency0" },
    { id: "totalPaid", label: "Total paid", format: "currency0" },
  ],

  breakdown: {
    title: "Principal vs. interest",
    parts: [
      { outputId: "loanAmount", label: "Principal", color: "#1f8f5f" },
      { outputId: "totalInterest", label: "Interest", color: "#f6a52f" },
    ],
  },

  schedule: true,

  compute: function (v) {
    var loan = Math.max(0, v.loanAmount || 0);
    var r = (v.interestRate || 0) / 100 / 12;
    var n = Math.round(v.loanTermMonths || 60);
    var pi;
    if (n <= 0) pi = 0;
    else if (r > 0) pi = (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    else pi = loan / n;
    var bal = loan, sched = [], totalInterest = 0;
    for (var i = 1; i <= n && i <= 600; i++) {
      var interest = bal * r;
      var principal = pi - interest;
      if (principal > bal) principal = bal;
      bal -= principal;
      totalInterest += interest;
      sched.push({ period: i, payment: pi, principal: principal, interest: interest, balance: bal });
    }
    return { monthlyPayment: pi, totalInterest: totalInterest, totalPaid: pi * n, loanAmount: loan, _schedule: sched };
  },

  content: {
    howItWorks: `<p>A personal or general loan lets you borrow a fixed amount of money and pay it back in equal monthly installments over a set number of months. Each payment is the same size, so the cost is predictable from day one — useful for consolidating debt, covering a large purchase, or funding a one-off expense.</p>
<p>Every payment covers two things: the <strong>interest</strong> the lender charges on your remaining balance, and a chunk of the <strong>principal</strong> you originally borrowed. Because interest is charged on what you still owe, early payments lean heavily toward interest and later ones toward principal. The schedule below traces that shift right down to your final payment.</p>`,
    formula: `<p>The monthly payment on a fixed-rate loan comes from the standard amortization formula:</p>
<div class="formula">M = P × [ r(1 + r)<sup>n</sup> ] ÷ [ (1 + r)<sup>n</sup> − 1 ]</div>
<p>Here <strong>P</strong> is the amount you borrow, <strong>r</strong> is the monthly interest rate (the APR divided by 12), and <strong>n</strong> is the number of monthly payments in the term. Multiply that monthly payment by <strong>n</strong> to get the total paid, then subtract <strong>P</strong> to reveal the total interest — the real price of borrowing.</p>`,
    tips: `<ul>
<li><strong>Watch the APR, not just the rate.</strong> APR folds in most lender fees, so it&rsquo;s the fairest number to compare offers side by side.</li>
<li><strong>A shorter term saves interest.</strong> Dropping from 60 to 36 months raises the monthly payment but can cut total interest sharply — try both terms above to see the trade-off.</li>
<li><strong>Check for prepayment penalties.</strong> If your loan has none, paying a little extra each month shrinks the balance faster and lowers the interest you owe.</li>
<li><strong>Borrow only what you need.</strong> A larger loan amount raises every payment and the total interest, so round down where you can.</li>
</ul>`,
  },

  faq: [
    {
      q: "How is my monthly loan payment calculated?",
      a: "It uses the standard amortization formula, which spreads your loan amount plus interest into equal monthly payments across the term. Enter the amount you're borrowing, the APR, and how many months you have to repay, and the calculator does the rest.",
    },
    {
      q: "What's the difference between the interest rate and the APR?",
      a: "The interest rate is the cost of borrowing the principal, while the APR also includes certain lender fees, making it a truer measure of what the loan costs. Comparing loans by APR gives you a more accurate apples-to-apples comparison.",
    },
    {
      q: "Will a longer loan term lower my monthly payment?",
      a: "Yes — stretching the same balance over more months makes each payment smaller. The catch is that you pay interest for longer, so the total cost of the loan goes up. Switch the term above to compare the monthly payment against the total interest.",
    },
    {
      q: "Does paying extra each month reduce the total interest?",
      a: "It can, as long as your loan has no prepayment penalty. Extra payments go straight to the principal, which shrinks the balance that interest is charged on and helps you clear the loan sooner.",
    },
  ],

  related: [
    { slug: "auto-loan", label: "Auto Loan Calculator" },
    { slug: "mortgage", label: "Mortgage Calculator" },
    { slug: "credit-card-payoff", label: "Credit Card Payoff Calculator" },
  ],
};
