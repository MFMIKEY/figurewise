export default {
  slug: "student-loan",
  category: "loans",
  icon: "🎓",
  cardTitle: "Student Loan Calculator",
  cardBlurb: "See your monthly student loan payment and total interest by payoff date.",
  h1: "Student Loan Calculator",
  metaTitle: "Student Loan Calculator — Payment & Interest | FigureWise",
  metaDescription:
    "Free student loan calculator: enter your balance, rate and repayment term to see your monthly student loan payment, total interest and full payoff cost.",
  intro:
    "See what your student loan really costs each month — enter your balance, rate and repayment term to get your monthly payment plus the total interest you'll pay before it's gone.",
  affiliateGroup: "loans",

  inputs: [
    { id: "loanAmount", label: "Loan balance", prefix: "$", default: 30000, min: 0, max: 500000, step: 500 },
    { id: "interestRate", label: "Interest rate", suffix: "%", default: 6, min: 0, max: 20, step: 0.05 },
    {
      id: "loanTermYears",
      label: "Repayment term",
      type: "select",
      default: 10,
      options: [
        { value: 10, label: "10 years (standard)" },
        { value: 15, label: "15 years" },
        { value: 20, label: "20 years" },
        { value: 25, label: "25 years" },
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
    var n = Math.round((v.loanTermYears || 10) * 12);
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
    howItWorks: `<p>This calculator treats your student loan like any other fixed-rate, amortizing loan. You enter your current <strong>balance</strong>, your <strong>interest rate</strong>, and how many years you'll take to repay, and it works out a single fixed monthly payment that clears the balance right on schedule.</p>
<p>Every payment covers that month's interest first, and whatever is left chips away at the principal. In the early years a large share goes to interest; as the balance shrinks, more of each payment goes to principal. The schedule below shows that month-by-month shift all the way to a $0 balance.</p>`,
    formula: `<p>The fixed monthly payment comes from the standard amortizing-loan formula:</p>
<div class="formula">M = P × [ r(1 + r)^n ] ÷ [ (1 + r)^n − 1 ]</div>
<p>where <strong>P</strong> is your loan balance, <strong>r</strong> is the monthly interest rate (annual rate ÷ 12), and <strong>n</strong> is the total number of monthly payments (years × 12). <strong>Total interest</strong> is the sum of the interest portion of every payment, and <strong>total paid</strong> is your monthly payment multiplied by the number of months.</p>`,
    tips: `<ul>
<li><strong>Shorten the term to save.</strong> A 10-year payoff costs more per month than 20 or 25 years, but the total interest is far lower. Toggle the term to compare.</li>
<li><strong>Paying extra goes straight to principal.</strong> Even $50 more a month shrinks the balance faster and cuts the interest you'll pay overall.</li>
<li><strong>Rate matters more than you think.</strong> If you have several loans, compare rates here and target the highest-rate balance first.</li>
<li><strong>Model a refinance before you commit.</strong> Plug in a new rate and term to see whether refinancing would actually lower your total cost — and remember federal loans lose their protections if you refinance privately.</li>
</ul>`,
  },

  faq: [
    {
      q: "How is my monthly student loan payment calculated?",
      a: "It uses the standard amortization formula: your balance, monthly interest rate, and number of payments produce one fixed monthly amount that pays the loan off exactly at the end of the term. Enter your numbers above to see it instantly.",
    },
    {
      q: "How much interest will I pay on my student loans?",
      a: "The total interest depends on your balance, rate, and how long you take to repay. This calculator adds up the interest in every scheduled payment and shows it as a single figure so you can see the true cost of the loan.",
    },
    {
      q: "Should I choose a longer repayment term to lower my payment?",
      a: "A longer term lowers the monthly payment but increases total interest, because you're borrowing the money for more years. Compare the 10-, 15-, 20-, and 25-year options above to weigh a comfortable payment against the extra interest.",
    },
    {
      q: "Does this work for federal and private student loans?",
      a: "Yes — the math is the same for any fixed-rate loan, so it works for federal Direct Loans, Parent PLUS loans, and private loans alike. It models standard fixed-payment repayment, not income-driven plans whose payments change with your earnings.",
    },
  ],

  related: [
    { slug: "loan", label: "Loan Calculator" },
    { slug: "debt-payoff", label: "Debt Payoff Calculator" },
    { slug: "salary", label: "Salary to Hourly Calculator" },
  ],
};
