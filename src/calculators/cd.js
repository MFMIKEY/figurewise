export default {
  slug: "cd",
  category: "saving",
  icon: "🔒",
  cardTitle: "CD Calculator",
  cardBlurb: "See what a certificate of deposit is worth at maturity from its APY.",
  h1: "CD Calculator",
  metaTitle: "CD Calculator — Certificate of Deposit Maturity Value | FigureWise",
  metaDescription:
    "Free CD calculator: enter your deposit, APY and term in months to see the value at maturity and total interest earned on a certificate of deposit.",
  intro:
    "See exactly what your certificate of deposit will be worth when it matures. Enter your deposit, the APY the bank is offering and the term in months to get your maturity value and total interest.",
  affiliateGroup: "savings",

  inputs: [
    { id: "deposit", label: "Deposit amount", prefix: "$", default: 10000, min: 0, max: 10000000, step: 500 },
    { id: "apy", label: "APY", suffix: "%", default: 4.5, min: 0, max: 15, step: 0.05, help: "Annual percentage yield." },
    { id: "termMonths", label: "Term (months)", suffix: "mo", default: 12, min: 1, max: 120, step: 1 },
  ],

  outputs: [
    { id: "finalValue", label: "Value at maturity", format: "currency0", primary: true },
    { id: "interestEarned", label: "Interest earned", format: "currency0" },
  ],

  breakdown: {
    title: "Deposit vs. interest",
    parts: [
      { outputId: "deposit", label: "Deposit", color: "#1f8f5f" },
      { outputId: "interestEarned", label: "Interest", color: "#f6a52f" },
    ],
  },

  compute: function (v) {
    var deposit = Math.max(0, v.deposit || 0);
    var apy = (v.apy || 0) / 100;
    var years = Math.max(0, (v.termMonths || 0) / 12);
    var finalValue = deposit * Math.pow(1 + apy, years);
    return { finalValue: finalValue, interestEarned: finalValue - deposit, deposit: deposit };
  },

  content: {
    howItWorks: `<p>A <strong>certificate of deposit (CD)</strong> is a savings product where you lock up a fixed sum for a set term — a few months to several years — in exchange for a fixed rate. In return for not touching the money, the bank or credit union pays you more than a regular savings account, and the rate is guaranteed for the whole term.</p>
<p>This calculator takes the <strong>APY</strong> (annual percentage yield) the institution advertises and your term in months, then projects the single lump sum you&rsquo;ll receive when the CD matures. Because APY already bakes in how often the CD compounds, you don&rsquo;t have to know whether interest is credited daily, monthly or quarterly — the maturity value comes out the same.</p>`,
    formula: `<p>Since APY is an <em>effective</em> annual rate that already accounts for compounding, the value at maturity is a simple growth calculation:</p>
<div class="formula">Maturity value = Deposit × (1 + APY)^(months ÷ 12)</div>
<p>Here <strong>APY</strong> is written as a decimal (4.5% becomes 0.045) and the exponent is the term in years — so a 12-month CD uses an exponent of 1, and an 18-month CD uses 1.5. The <strong>interest earned</strong> is simply the maturity value minus your original deposit.</p>`,
    tips: `<ul>
<li><strong>Compare by APY, not the nominal rate.</strong> APY already folds in compounding frequency, so it&rsquo;s the number that lets you compare two CDs fairly on a single line.</li>
<li><strong>Watch for early-withdrawal penalties.</strong> Cashing out before maturity usually costs you several months of interest, so only commit money you won&rsquo;t need during the term.</li>
<li><strong>Consider a CD ladder.</strong> Splitting your deposit across CDs of different lengths keeps part of your money coming due regularly while still capturing longer-term rates.</li>
<li><strong>Check what happens at maturity.</strong> Many CDs auto-renew into a new term at the current rate unless you withdraw within a short grace period.</li>
</ul>`,
  },

  faq: [
    {
      q: "How is CD interest calculated?",
      a: "Because the advertised APY already reflects how often the CD compounds, the maturity value is your deposit multiplied by (1 + APY) raised to the term in years. This calculator does that math for you and also shows the interest earned on top of your original deposit.",
    },
    {
      q: "What is the difference between APY and interest rate on a CD?",
      a: "The interest rate is the base rate before compounding, while the APY (annual percentage yield) is the effective yearly return after compounding is applied. APY is always equal to or higher than the stated rate, and it&rsquo;s the fairer number to compare offers with.",
    },
    {
      q: "Can I lose money in a CD?",
      a: "A CD from an FDIC-insured bank or NCUA-insured credit union protects your principal up to the applicable limits, so you won&rsquo;t lose your deposit. You can, however, forfeit some earned interest as a penalty if you withdraw before the term ends.",
    },
    {
      q: "Is CD interest taxable?",
      a: "Generally yes — interest earned on a CD is treated as taxable income in the year it is credited, even if you don&rsquo;t withdraw it. The figures here are estimates before any taxes; check with a tax professional for your specific situation.",
    },
  ],

  related: [
    { slug: "compound-interest", label: "Compound Interest Calculator" },
    { slug: "savings-goal", label: "Savings Goal Calculator" },
    { slug: "investment", label: "Investment Calculator" },
  ],
};
