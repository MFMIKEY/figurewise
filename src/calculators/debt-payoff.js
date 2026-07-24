export default {
  slug: "debt-payoff",
  category: "debt",
  icon: "🧾",
  cardTitle: "Debt Payoff Calculator",
  cardBlurb: "See how much sooner you clear a debt by paying a little extra each month.",
  h1: "Debt Payoff Calculator",
  metaTitle: "Debt Payoff Calculator — Pay Off Debt Faster | FigureWise",
  metaDescription:
    "Free debt payoff calculator shows how much faster you clear a balance and how much interest you save by adding an extra payment each month. Compare side by side.",
  intro:
    "See how a little extra each month changes everything. Enter your balance and payment, add an extra amount, and watch how many months and how much interest you save.",
  affiliateGroup: "debt",

  inputs: [
    { id: "balance", label: "Current balance", prefix: "$", default: 10000, min: 0, max: 500000, step: 100 },
    { id: "apr", label: "APR", suffix: "%", default: 18, min: 0, max: 40, step: 0.1 },
    { id: "monthlyPayment", label: "Current monthly payment", prefix: "$", default: 300, min: 0, max: 20000, step: 10 },
    { id: "extraPayment", label: "Extra monthly payment", prefix: "$", default: 100, min: 0, max: 20000, step: 10 },
  ],

  outputs: [
    { id: "payoffWithExtra", label: "Payoff time with extra", format: "months", primary: true },
    { id: "payoffWithoutExtra", label: "Payoff time without extra", format: "months" },
    { id: "interestSaved", label: "Interest saved", format: "currency0" },
    { id: "timeSaved", label: "Time saved", format: "months" },
  ],

  compute: function (v) {
    var balance = Math.max(0, v.balance || 0);
    var r = (v.apr || 0) / 100 / 12;
    var base = Math.max(0, v.monthlyPayment || 0);
    var extra = Math.max(0, v.extraPayment || 0);
    function sim(pay) {
      var bal = balance, months = 0, interest = 0;
      if (bal > 0 && pay <= bal * r) return { months: Infinity, interest: Infinity };
      while (bal > 0 && months < 1200) {
        var i = bal * r; interest += i; bal = bal + i - pay; months++;
      }
      return { months: months, interest: interest };
    }
    var a = sim(base);
    var b = sim(base + extra);
    return {
      payoffWithExtra: b.months,
      payoffWithoutExtra: a.months,
      interestSaved: (isFinite(a.interest) && isFinite(b.interest)) ? Math.max(0, a.interest - b.interest) : Infinity,
      timeSaved: (isFinite(a.months) && isFinite(b.months)) ? Math.max(0, a.months - b.months) : Infinity
    };
  },

  content: {
    howItWorks: `<p>Every month, interest is charged on whatever balance you still owe. Your payment first covers that month&rsquo;s interest, and only what&rsquo;s left over actually shrinks the balance. When your payment is barely above the interest, progress crawls &mdash; which is exactly how a debt can linger for years.</p>
<p>Adding an <strong>extra payment</strong> attacks the balance directly. Because a smaller balance means less interest next month, that extra amount snowballs: each dollar of extra payment frees up future dollars that used to go to interest. This calculator runs your payoff twice &mdash; once with the extra and once without &mdash; so you can see the time and interest you save side by side.</p>`,
    formula: `<p>There&rsquo;s no single closed-form answer here, so the calculator <strong>simulates</strong> your balance month by month until it reaches zero. Each month it applies interest, then subtracts your payment:</p>
<div class="formula">new balance = balance + (balance &times; APR &divide; 12) &minus; payment</div>
<p>It repeats that loop twice: once with your current payment, and once with your current payment <strong>plus the extra</strong>. The difference in months is your <strong>time saved</strong>, and the difference in total interest charged is your <strong>interest saved</strong>. If a payment never exceeds the monthly interest, the balance never falls &mdash; so that scenario is flagged as never paying off.</p>`,
    tips: `<ul>
<li><strong>Beat the monthly interest first.</strong> If your payment is less than one month of interest (balance &times; APR &divide; 12), the balance actually grows. Make sure both payments clear that bar.</li>
<li><strong>Front-load the extra.</strong> Extra payments made early save far more than the same amount added years later, because they cut interest on every remaining month.</li>
<li><strong>Round up your payment.</strong> Bumping a $300 payment to $325 feels minor but can shave months off the payoff &mdash; try small extras above and watch the result move.</li>
<li><strong>Chase a lower APR too.</strong> A balance transfer or lower-rate loan reduces the interest charged each month, which stretches every dollar of payment further.</li>
</ul>`,
  },

  faq: [
    {
      q: "How does paying extra help me pay off debt faster?",
      a: "Your extra payment goes straight to the principal balance, not to interest. A smaller balance means less interest is charged next month, so more of every future payment chips away at the debt &mdash; the effect compounds and pulls your payoff date much closer.",
    },
    {
      q: "How much interest can an extra payment really save?",
      a: "It depends on your APR, balance, and how large the extra is, but on high-rate debt the savings are often striking. Enter your own numbers above and compare the &ldquo;interest saved&rdquo; and &ldquo;time saved&rdquo; figures to see your specific result.",
    },
    {
      q: "Why does the calculator say my debt will never pay off?",
      a: "That happens when your monthly payment is equal to or less than one month of interest, so the balance never shrinks. Increase your payment or your extra amount until it exceeds the balance times your monthly rate (APR divided by 12).",
    },
    {
      q: "Should I pay off debt or save the money instead?",
      a: "As a general rule, paying down debt that charges a higher rate than you could reliably earn saving tends to come out ahead, though keeping a small emergency cushion first is wise. This is educational information, not personalized financial advice.",
    },
  ],

  related: [
    { slug: "credit-card-payoff", label: "Credit Card Payoff Calculator" },
    { slug: "loan", label: "Loan Calculator" },
    { slug: "savings-goal", label: "Savings Goal Calculator" },
  ],
};
