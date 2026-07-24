export default {
  slug: "credit-card-payoff",
  category: "debt",
  icon: "💳",
  cardTitle: "Credit Card Payoff Calculator",
  cardBlurb: "See how many months to clear your card — and the interest it costs.",
  h1: "Credit Card Payoff Calculator",
  metaTitle: "Credit Card Payoff Calculator — Time & Interest | FigureWise",
  metaDescription:
    "Free credit card payoff calculator: see how long to pay off your credit card at a fixed monthly payment and exactly how much interest you'll pay along the way.",
  intro:
    "Enter your balance, APR, and what you can pay each month to see how long it takes to become debt-free — and the total interest that fixed payment will cost you.",
  affiliateGroup: "debt",

  inputs: [
    { id: "balance", label: "Card balance", prefix: "$", default: 6000, min: 0, max: 100000, step: 100 },
    { id: "apr", label: "APR", suffix: "%", default: 22, min: 0, max: 40, step: 0.1 },
    { id: "monthlyPayment", label: "Monthly payment", prefix: "$", default: 250, min: 0, max: 10000, step: 10 },
  ],

  outputs: [
    { id: "payoffTime", label: "Time to pay off", format: "months", primary: true },
    { id: "totalInterest", label: "Total interest", format: "currency0" },
    { id: "totalPaid", label: "Total paid", format: "currency0" },
  ],

  compute: function (v) {
    var bal = Math.max(0, v.balance || 0);
    var r = (v.apr || 0) / 100 / 12;
    var pay = Math.max(0, v.monthlyPayment || 0);
    var original = bal;
    var months = 0, interest = 0;
    if (bal > 0 && pay <= bal * r) {
      return { payoffTime: Infinity, totalInterest: Infinity, totalPaid: Infinity };
    }
    while (bal > 0 && months < 1200) {
      var i = bal * r;
      interest += i;
      bal = bal + i - pay;
      months++;
    }
    return { payoffTime: months, totalInterest: interest, totalPaid: original + interest };
  },

  content: {
    howItWorks: `<p>Credit cards charge interest on whatever balance you carry from month to month. Each statement period the card applies about one-twelfth of your <strong>APR</strong> to the balance, adds that interest on, then subtracts your payment. Whatever is left rolls into the next month and starts earning interest all over again.</p>
<p>Because interest keeps compounding on the shrinking balance, a fixed payment clears the debt faster and faster as you go — but only if that payment stays comfortably above the monthly interest charge. This calculator repeats the month-by-month cycle for you until the balance reaches zero, then reports how many months it took and what you paid in interest along the way.</p>`,
    formula: `<p>Each month the balance is updated like this:</p>
<div class="formula">new balance = balance + (balance × APR ÷ 12) − monthly payment</div>
<p>The term <strong>balance × APR ÷ 12</strong> is that month's interest. The calculator loops through this step over and over, adding up the interest, until the balance hits zero.</p>
<p>There is a catch: if your payment is <strong>less than or equal to one month of interest</strong>, the balance never shrinks and the debt is never repaid. When that happens the result shows a dash instead of a number, because no fixed payment that small can ever clear the card.</p>`,
    tips: `<ul>
<li><strong>Always pay more than the minimum.</strong> Minimum payments are often set near the monthly interest, which is why they can stretch a payoff over decades. Even an extra $25 a month can cut months or years off the timeline.</li>
<li><strong>Chase a lower APR.</strong> A balance-transfer card with a 0% intro period, or a personal loan at a lower rate, can send far more of each payment toward the actual balance instead of interest.</li>
<li><strong>Keep the payment fixed as the balance drops.</strong> It's tempting to pay less once the minimum falls, but holding your payment steady is what makes the payoff accelerate.</li>
<li><strong>Stop adding new charges.</strong> Fresh purchases reset your progress; try leaving the card alone until it's cleared.</li>
</ul>`,
  },

  faq: [
    {
      q: "How long will it take to pay off my credit card?",
      a: "It depends on your balance, APR, and how much you pay each month. Enter those three numbers above and the calculator loops through the interest and payments month by month to show the exact number of months to reach a zero balance.",
    },
    {
      q: "Why does the result show a dash instead of a number?",
      a: "That means your monthly payment is less than or equal to one month of interest, so the balance never falls. When a payment only covers the interest charge, the card can never be paid off — you'd need to increase the payment to make progress.",
    },
    {
      q: "How much interest will I pay on my credit card?",
      a: "The <strong>Total interest</strong> figure adds up every monthly interest charge from now until the balance is gone. A higher APR or a smaller monthly payment means the balance lingers longer, so you pay more interest overall.",
    },
    {
      q: "Will paying more each month really make a difference?",
      a: "Yes, and often a dramatic one. Because interest compounds on the remaining balance, a larger payment clears the debt sooner and cuts total interest sharply. Try raising the monthly payment above to see how quickly the payoff time and interest shrink.",
    },
  ],

  related: [
    { slug: "debt-payoff", label: "Debt Payoff Calculator" },
    { slug: "loan", label: "Loan Calculator" },
    { slug: "compound-interest", label: "Compound Interest Calculator" },
  ],
};
