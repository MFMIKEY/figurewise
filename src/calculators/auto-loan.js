export default {
  slug: "auto-loan",
  category: "loans",
  icon: "🚗",
  cardTitle: "Auto Loan Calculator",
  cardBlurb: "Estimate your monthly car payment with sales tax, trade-in and down payment.",
  h1: "Auto Loan Calculator",
  metaTitle: "Auto Loan Calculator — Monthly Car Payment with Tax | FigureWise",
  metaDescription:
    "Free auto loan calculator that folds sales tax, your down payment and trade-in into the loan. See your real monthly car payment and total interest in seconds.",
  intro:
    "Work out your true monthly car payment with sales tax, a trade-in and a down payment all figured in — then see how much interest the loan actually costs over its full term.",
  affiliateGroup: "loans",

  inputs: [
    { id: "vehiclePrice", label: "Vehicle price", prefix: "$", default: 35000, min: 0, max: 150000, step: 500 },
    { id: "downPayment", label: "Down payment", prefix: "$", default: 5000, min: 0, max: 100000, step: 500 },
    { id: "tradeIn", label: "Trade-in value", prefix: "$", default: 0, min: 0, max: 100000, step: 500 },
    { id: "salesTaxRate", label: "Sales tax rate", suffix: "%", default: 7, min: 0, max: 15, step: 0.1 },
    { id: "interestRate", label: "Interest rate (APR)", suffix: "%", default: 7.5, min: 0, max: 25, step: 0.1 },
    { id: "loanTermMonths", label: "Loan term", type: "select", default: 60, options: [
      { value: 36, label: "36 months" }, { value: 48, label: "48 months" },
      { value: 60, label: "60 months" }, { value: 72, label: "72 months" }, { value: 84, label: "84 months" } ] },
  ],

  outputs: [
    { id: "monthlyPayment", label: "Estimated monthly payment", format: "currency", primary: true },
    { id: "loanAmount", label: "Amount financed", format: "currency0" },
    { id: "salesTax", label: "Sales tax", format: "currency0" },
    { id: "totalInterest", label: "Total interest", format: "currency0" },
    { id: "totalOfPayments", label: "Total of payments", format: "currency0" },
  ],

  breakdown: { title: "Principal vs. interest", parts: [
    { outputId: "loanAmount", label: "Principal", color: "#1f8f5f" },
    { outputId: "totalInterest", label: "Interest", color: "#f6a52f" } ] },

  schedule: true,

  compute: function (v) {
    var price = Math.max(0, v.vehiclePrice || 0);
    var down = Math.max(0, v.downPayment || 0);
    var trade = Math.max(0, v.tradeIn || 0);
    var taxable = Math.max(0, price - trade);
    var salesTax = taxable * ((v.salesTaxRate || 0) / 100);
    var loan = Math.max(0, price + salesTax - down - trade);
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
    return { monthlyPayment: pi, loanAmount: loan, salesTax: salesTax, totalInterest: totalInterest, totalOfPayments: pi * n, _schedule: sched };
  },

  content: {
    howItWorks: `<p>Financing a car isn&rsquo;t just the sticker price divided by the number of months. In most U.S. states you pay <strong>sales tax</strong> on the vehicle, and dealers typically roll that tax straight into the loan. This calculator starts from the vehicle price, applies your state&rsquo;s tax rate, then subtracts your <strong>down payment</strong> and any <strong>trade-in</strong> to find the amount you actually borrow.</p>
<p>That financed balance is spread across the term you choose &mdash; anywhere from 36 to 84 months &mdash; at your loan&rsquo;s APR. Early payments lean heavily toward interest and later ones toward the principal, and the amortization schedule below traces that shift month by month so you can see exactly when the balance starts falling fast.</p>`,
    formula: `<p>First the taxable amount and financed balance are worked out, then the standard amortizing-loan formula sets the payment:</p>
<div class="formula">Amount financed = Price + (Price &minus; Trade-in) &times; Tax rate &minus; Down payment &minus; Trade-in</div>
<div class="formula">M = P &times; [ r(1 + r)<sup>n</sup> ] &divide; [ (1 + r)<sup>n</sup> &minus; 1 ]</div>
<p>Here <strong>P</strong> is the amount financed, <strong>r</strong> is your APR divided by 12, and <strong>n</strong> is the number of monthly payments. Note the trade-in is subtracted <em>before</em> tax is calculated &mdash; most states only tax the price difference &mdash; and then again from the balance you borrow, so it helps you twice.</p>`,
    tips: `<ul>
<li><strong>A trade-in can lower your tax bill.</strong> In most states sales tax applies only to price minus trade-in, so a $10,000 trade-in at a 7% rate saves about $700 in tax on top of reducing what you borrow.</li>
<li><strong>Watch the 72&ndash;84 month temptation.</strong> A longer term shrinks the monthly figure but piles on interest and can leave you owing more than the car is worth. Switch the term above to compare.</li>
<li><strong>Get pre-approved before the dealership.</strong> A rate quote from your bank or credit union gives you a benchmark and negotiating power against dealer financing.</li>
<li><strong>Put the APR, not the &ldquo;interest rate,&rdquo; in the box.</strong> APR folds in mandatory loan fees, so it reflects the true cost of borrowing more accurately.</li>
</ul>`,
  },

  faq: [
    {
      q: "Does this calculator include sales tax in the car payment?",
      a: "Yes. Enter your state&rsquo;s sales tax rate and it&rsquo;s applied to the vehicle price minus your trade-in, then financed into the loan along with the rest of the balance &mdash; which is how most dealerships structure the deal.",
    },
    {
      q: "How does a trade-in affect my monthly payment?",
      a: "A trade-in helps in two ways: in most states it lowers the amount subject to sales tax, and it directly reduces the balance you finance. Both effects shrink your monthly payment and the total interest you pay.",
    },
    {
      q: "Is a longer loan term a good idea to lower my payment?",
      a: "A 72- or 84-month loan lowers the monthly payment but increases total interest, and because cars depreciate quickly you can end up &ldquo;underwater&rdquo; &mdash; owing more than the vehicle is worth. Compare the total of payments across terms before deciding.",
    },
    {
      q: "What&rsquo;s the difference between APR and interest rate?",
      a: "The interest rate is the cost of borrowing the principal, while APR also includes certain mandatory loan fees, making it a fuller picture of what the loan costs. Enter the APR here for the most realistic estimate.",
    },
  ],

  related: [
    { slug: "loan", label: "Loan Calculator" },
    { slug: "mortgage", label: "Mortgage Calculator" },
    { slug: "salary", label: "Salary to Hourly Calculator" },
  ],
};
