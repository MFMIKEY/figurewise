export default {
  slug: "salary",
  category: "income",
  icon: "💰",
  cardTitle: "Salary to Hourly Calculator",
  cardBlurb: "Convert pay between hourly, weekly, monthly and yearly in one step.",
  h1: "Salary to Hourly Calculator",
  metaTitle: "Salary to Hourly Calculator — Convert Any Pay | FigureWise",
  metaDescription:
    "Convert pay between hourly, weekly, monthly and yearly with this salary to hourly calculator. Enter any amount plus your hours and weeks to see each equivalent.",
  intro:
    "Turn any pay figure into its hourly, weekly, monthly and yearly equivalents. Enter an amount, tell us your usual hours and weeks, and see every version of your pay side by side.",
  affiliateGroup: null,

  inputs: [
    { id: "amount", label: "Pay amount", prefix: "$", default: 60000, min: 0, max: 2000000, step: 1000 },
    { id: "payType", label: "This amount is", type: "select", default: "annual", options: [
      { value: "annual", label: "Per year" }, { value: "monthly", label: "Per month" },
      { value: "weekly", label: "Per week" }, { value: "hourly", label: "Per hour" } ] },
    { id: "hoursPerWeek", label: "Hours per week", default: 40, min: 1, max: 100, step: 1 },
    { id: "weeksPerYear", label: "Weeks per year", default: 52, min: 1, max: 52, step: 1 },
  ],

  outputs: [
    { id: "hourly", label: "Hourly", format: "currency", primary: true },
    { id: "weekly", label: "Weekly", format: "currency" },
    { id: "monthly", label: "Monthly", format: "currency" },
    { id: "annual", label: "Yearly", format: "currency" },
  ],

  compute: function (v) {
    var amt = Math.max(0, v.amount || 0);
    var hpw = Math.max(0, v.hoursPerWeek || 0);
    var wpy = Math.max(0, v.weeksPerYear || 0);
    var type = v.payType;
    var annual;
    if (type === "monthly") annual = amt * 12;
    else if (type === "weekly") annual = amt * wpy;
    else if (type === "hourly") annual = amt * hpw * wpy;
    else annual = amt;
    var hoursYear = hpw * wpy;
    return {
      hourly: hoursYear > 0 ? annual / hoursYear : 0,
      weekly: wpy > 0 ? annual / wpy : 0,
      monthly: annual / 12,
      annual: annual
    };
  },

  content: {
    howItWorks: `<p>Pay gets quoted in whatever unit is convenient — an annual salary in a job offer, an hourly rate on a timesheet, a weekly or monthly figure on a payslip. This calculator lets you type in <strong>any one of those</strong> and instantly see the other three, so you can compare offers or budgets on equal footing.</p>
<p>The two settings that make the conversion accurate are your <strong>hours per week</strong> and <strong>weeks per year</strong>. A full-time year is usually 40 hours across 52 weeks, but if you work part-time, take unpaid weeks off, or count paid holiday differently, adjust those fields and every result updates to match your real schedule.</p>`,
    formula: `<p>The calculator first converts whatever you enter into a single <strong>yearly</strong> figure, then divides that back down into each equivalent:</p>
<div class="formula">Yearly ÷ (hours per week × weeks per year) = Hourly</div>
<p>Working outward from the annual number, weekly pay is yearly &divide; weeks per year, and monthly pay is yearly &divide; 12. If you enter an hourly rate instead, it runs the other direction: hourly &times; hours per week &times; weeks per year gives the yearly total, which then feeds the weekly and monthly results.</p>`,
    tips: `<ul>
<li><strong>Match the weeks to your reality.</strong> Two weeks of unpaid leave means 50 weeks, not 52 — that alone changes your hourly figure by roughly 4%.</li>
<li><strong>These are gross numbers.</strong> They show pay before taxes, benefits and retirement contributions, so your actual take-home will be lower.</li>
<li><strong>Comparing a salaried offer to hourly work?</strong> Convert both to a yearly figure using the hours you expect to work, including any unpaid overtime a salaried role may involve.</li>
<li><strong>Quick sanity check:</strong> a $52,000 salary works out to almost exactly $25 an hour at 40 hours a week — handy for eyeballing whether an offer is in range.</li>
</ul>`,
  },

  faq: [
    {
      q: "How do I convert my salary to an hourly wage?",
      a: "Divide your yearly salary by the number of hours you work in a year — that is your hours per week multiplied by your weeks per year. At 40 hours over 52 weeks, a $60,000 salary is about $28.85 an hour. Enter your own numbers above to get an exact figure.",
    },
    {
      q: "How do I convert an hourly rate to an annual salary?",
      a: "Multiply your hourly rate by your hours per week and then by your weeks per year. For example, $25 an hour at 40 hours across 52 weeks is $52,000 a year. Set the &ldquo;This amount is&rdquo; menu to <strong>Per hour</strong> to do it here.",
    },
    {
      q: "Why does changing weeks per year affect my hourly pay?",
      a: "Fewer paid weeks means the same yearly salary is spread over fewer working hours, so each hour is worth more. Dropping from 52 to 50 weeks raises the hourly equivalent because you are earning the same total in less time.",
    },
    {
      q: "Are these figures before or after tax?",
      a: "They are gross amounts, meaning before income tax, insurance and any retirement deductions. Your take-home pay will be lower, so treat these numbers as a starting point for comparison rather than what lands in your account.",
    },
  ],

  related: [
    { slug: "tip", label: "Tip Calculator" },
    { slug: "savings-goal", label: "Savings Goal Calculator" },
    { slug: "compound-interest", label: "Compound Interest Calculator" },
  ],
};
