export default {
  slug: "paycheck",
  category: "income",
  icon: "🧮",
  cardTitle: "Paycheck Calculator",
  cardBlurb: "See your real take-home pay after federal, FICA and state taxes.",
  h1: "Paycheck / Take-Home Pay Calculator",
  metaTitle: "Paycheck Calculator — Take-Home Pay After Taxes | FigureWise",
  metaDescription:
    "Free paycheck calculator estimates your take-home pay after 2025 federal income tax, FICA and state tax. See net pay per check and your effective tax rate.",
  intro:
    "Turn a gross salary into the number that actually lands in your bank account. Enter your pay and see your estimated take-home pay per paycheck, plus where every tax dollar goes.",
  affiliateGroup: null,

  inputs: [
    { id: "grossSalary", label: "Gross annual salary", prefix: "$", default: 60000, min: 0, max: 2000000, step: 1000 },
    { id: "filingStatus", label: "Filing status", type: "select", default: "single", options: [
      { value: "single", label: "Single" }, { value: "married", label: "Married filing jointly" } ] },
    { id: "payFrequency", label: "Pay frequency", type: "select", default: 26, options: [
      { value: 52, label: "Weekly" }, { value: 26, label: "Every 2 weeks" }, { value: 24, label: "Twice a month" }, { value: 12, label: "Monthly" } ] },
    { id: "preTaxDeductions", label: "Pre-tax deductions (yearly)", prefix: "$", default: 0, min: 0, max: 500000, step: 500, help: "401(k), HSA, etc." },
    { id: "stateTaxRate", label: "State tax rate", suffix: "%", default: 0, min: 0, max: 15, step: 0.1, help: "Your flat state rate; 0 if none." },
  ],

  outputs: [
    { id: "takeHomePerPaycheck", label: "Take-home per paycheck", format: "currency", primary: true },
    { id: "annualTakeHome", label: "Annual take-home", format: "currency0" },
    { id: "federalTax", label: "Federal income tax", format: "currency0" },
    { id: "ficaTax", label: "FICA (SS + Medicare)", format: "currency0" },
    { id: "stateTax", label: "State tax", format: "currency0" },
    { id: "effectiveRate", label: "Effective tax rate", format: "percent" },
  ],

  breakdown: { title: "Where your pay goes", parts: [
    { outputId: "annualTakeHome", label: "Take-home", color: "#1f8f5f" },
    { outputId: "federalTax", label: "Federal", color: "#f6a52f" },
    { outputId: "ficaTax", label: "FICA", color: "#2f6df6" },
    { outputId: "stateTax", label: "State", color: "#b26a00" } ] },

  compute: function (v) {
    var gross = Math.max(0, v.grossSalary || 0);
    var preTax = Math.max(0, v.preTaxDeductions || 0);
    var status = v.filingStatus === "married" ? "married" : "single";
    var freq = Math.max(1, Math.round(v.payFrequency || 26));
    var stateRate = Math.max(0, v.stateTaxRate || 0) / 100;
    var stdDed = status === "married" ? 30000 : 15000;
    var brackets = status === "married"
      ? [[0, 0.10], [23850, 0.12], [96950, 0.22], [206700, 0.24], [394600, 0.32], [501050, 0.35], [751600, 0.37]]
      : [[0, 0.10], [11925, 0.12], [48475, 0.22], [103350, 0.24], [197300, 0.32], [250525, 0.35], [626350, 0.37]];
    var fedTaxable = Math.max(0, gross - preTax - stdDed);
    var fedTax = 0;
    for (var i = 0; i < brackets.length; i++) {
      var lo = brackets[i][0];
      var rate = brackets[i][1];
      var hi = i + 1 < brackets.length ? brackets[i + 1][0] : Infinity;
      if (fedTaxable > lo) fedTax += (Math.min(fedTaxable, hi) - lo) * rate;
      else break;
    }
    var ss = Math.min(gross, 176100) * 0.062;
    var medicare = gross * 0.0145;
    var fica = ss + medicare;
    var stateTax = Math.max(0, gross - preTax) * stateRate;
    var totalTax = fedTax + fica + stateTax;
    var annualTakeHome = Math.max(0, gross - preTax - totalTax);
    return {
      takeHomePerPaycheck: annualTakeHome / freq,
      annualTakeHome: annualTakeHome,
      federalTax: fedTax,
      ficaTax: fica,
      stateTax: stateTax,
      effectiveRate: gross > 0 ? (totalTax / gross) * 100 : 0
    };
  },

  content: {
    howItWorks: `<p>Your <strong>gross salary</strong> is the headline number in your offer letter, but it&rsquo;s never what shows up in your account. This calculator peels away the three big deductions that stand between gross and net pay: federal income tax, FICA (Social Security and Medicare), and your state income tax. Any pre-tax contributions you make &mdash; like a 401(k) or HSA &mdash; are subtracted first, which shrinks the income the IRS taxes.</p>
<p>Once the taxes are estimated for the whole year, we divide your take-home pay by how often you get paid. Pick weekly, every two weeks, twice a month, or monthly and the <strong>per-paycheck</strong> figure updates instantly, so you can see the exact amount you can plan a budget around.</p>`,
    formula: `<p>Federal income tax is <strong>marginal</strong>: each slice of income is taxed at its own rate, not one flat rate on everything. We first find your taxable income, then walk it up the 2025 brackets:</p>
<div class="formula">Taxable income = Gross &minus; Pre-tax deductions &minus; Standard deduction</div>
<p>FICA is a flat payroll tax split into two pieces, calculated on your gross pay:</p>
<div class="formula">FICA = 6.2% Social Security (up to $176,100) + 1.45% Medicare</div>
<p>State tax here is a simple flat rate you enter, applied to gross minus pre-tax deductions. Your final number is:</p>
<div class="formula">Take-home per check = (Gross &minus; Pre-tax &minus; All taxes) &divide; Pay periods</div>`,
    tips: `<ul>
<li><strong>Raise your pre-tax deductions.</strong> Every dollar you route into a 401(k) or HSA lowers your federal and state taxable income, so the true cost to your paycheck is less than the dollar you save.</li>
<li><strong>Watch your effective rate, not your bracket.</strong> Being &ldquo;in the 22% bracket&rdquo; doesn&rsquo;t mean 22% of your pay vanishes &mdash; the effective rate shown here is the blended average across all your income.</li>
<li><strong>Match the pay frequency to your job.</strong> A &ldquo;twice a month&rdquo; (24) schedule and an &ldquo;every two weeks&rdquo; (26) schedule produce different per-check amounts for the same salary because of the number of paydays.</li>
<li><strong>Set your state rate honestly.</strong> Nine states have no income tax (enter 0), while others are progressive &mdash; use your approximate effective state rate for the closest estimate.</li>
</ul>`,
  },

  faq: [
    {
      q: "How is take-home pay calculated from my salary?",
      a: "We start with your gross salary, subtract pre-tax deductions, then subtract three taxes: federal income tax (using 2025 marginal brackets after the standard deduction), FICA at 7.65%, and your flat state rate. What remains is your annual take-home, divided by your number of pay periods.",
    },
    {
      q: "Why is my net pay so much lower than my gross salary?",
      a: "Federal income tax, Social Security (6.2%) and Medicare (1.45%) together take a meaningful bite before you ever see the money, and state tax adds more in most states. This is why your effective tax rate &mdash; shown above &mdash; is the number worth watching.",
    },
    {
      q: "Does this paycheck calculator include Social Security and Medicare?",
      a: "Yes. FICA is included as 6.2% Social Security on wages up to the $176,100 cap plus 1.45% Medicare on all wages. It does not include the extra 0.9% Medicare surtax that applies to very high earners.",
    },
    {
      q: "What if my state has no income tax?",
      a: "Just leave the state tax rate at 0%. States like Texas, Florida and Washington have no state income tax, so your take-home pay will be higher than it would be in a state that does.",
    },
  ],

  disclaimer: "This is a simplified 2025 federal estimate. It excludes tax credits, the additional 0.9% Medicare surtax on high earners, local taxes, and detailed state rules (state is a flat rate you enter). Your actual paycheck may differ — treat this as a ballpark, not tax advice.",

  related: [
    { slug: "salary", label: "Salary to Hourly Calculator" },
    { slug: "home-affordability", label: "Home Affordability Calculator" },
    { slug: "tip", label: "Tip Calculator" },
  ],
};
