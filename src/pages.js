import { site } from "./site.config.js";

// Static content pages. AdSense requires a real About, Contact, and Privacy
// Policy before it will approve a site — these satisfy that and build trust.
export const pages = [
  {
    slug: "about",
    title: `About ${site.name}`,
    metaTitle: `About ${site.name} — Free Financial Calculators`,
    description: `Learn about ${site.name}, a free collection of fast, no-signup financial calculators that show their work.`,
    bodyHtml: `
<p>${site.name} makes free, no-nonsense financial calculators. Our goal is simple: give you a clear, accurate number in seconds — and show the math behind it — without the sign-ups, paywalls, or wall-to-wall clutter that plague most money websites.</p>
<h2>What we build</h2>
<p>Every tool here runs instantly in your browser, updates live as you type, and works on your phone. We cover the money questions people ask most often: mortgage and loan payments, how savings grow, how to get out of debt, and what a paycheck really works out to.</p>
<h2>How we keep it free</h2>
<p>${site.name} is supported by advertising and by clearly-marked partner links. When you use one of those links we may earn a commission, at no extra cost to you. That revenue keeps every calculator free for everyone. We only place partner links where they're genuinely relevant, and we always label them.</p>
<h2>Our promise on accuracy</h2>
<p>We test the formulas behind every calculator and explain how each one works so you can check our math. That said, our tools produce <strong>estimates for educational purposes</strong> and can't account for every detail of your situation. For big decisions, please confirm the numbers with a qualified professional. See our <a href="/disclaimer/">full disclaimer</a>.</p>
<p>Questions or spot something off? We'd love to hear from you on our <a href="/contact/">contact page</a>.</p>`,
  },
  {
    slug: "contact",
    title: "Contact Us",
    metaTitle: `Contact ${site.name}`,
    description: `Get in touch with the ${site.name} team with feedback, corrections, or partnership questions.`,
    bodyHtml: `
<p>We read every message. Whether you've found a bug, want a calculator we don't have yet, spotted a number that looks wrong, or want to talk about a partnership — reach out.</p>
<h2>Email</h2>
<p>The fastest way to reach us is by email:</p>
<p><a href="mailto:${site.contactEmail}"><strong>${site.contactEmail}</strong></a></p>
<h2>Suggest a calculator</h2>
<p>Is there a money question you wish you could answer in one click? Tell us what it is and we'll consider building it. Reader suggestions drive a lot of what we add.</p>
<h2>Corrections</h2>
<p>Accuracy matters to us. If a result doesn't look right, email us the calculator name and the numbers you entered, and we'll investigate promptly.</p>`,
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    metaTitle: `Privacy Policy — ${site.name}`,
    description: `How ${site.name} handles data, cookies, and advertising. We don't collect the numbers you type into our calculators.`,
    bodyHtml: `
<p><em>Last updated: 2026.</em></p>
<p>${site.name} ("we", "us") respects your privacy. This policy explains what information is and isn't collected when you use ${site.url}.</p>
<h2>The numbers you enter stay on your device</h2>
<p>Our calculators run entirely in your browser. The figures you type — incomes, balances, loan amounts — are <strong>never sent to us or stored on our servers</strong>. When you close or refresh the page, they're gone.</p>
<h2>Information collected automatically</h2>
<p>Like most websites, we use analytics to understand which calculators are popular and how the site performs. This may include your approximate location, device and browser type, and the pages you visit. This data is aggregated and does not personally identify you.</p>
<h2>Advertising and cookies</h2>
<p>We use third-party advertising, which may include Google AdSense. Advertising partners may use cookies or similar technologies to show ads relevant to you. Google's use of advertising cookies enables it and its partners to serve ads based on your visits to this and other sites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google Ads Settings</a>, and learn more at <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener">Google's advertising policies</a>.</p>
<h2>Affiliate links</h2>
<p>Some outbound links are affiliate or partner links, clearly labeled. If you click one and take an action (such as opening an account), we may earn a commission. This never changes the price you pay and never affects the results our calculators show.</p>
<h2>Your choices</h2>
<p>You can disable cookies in your browser settings and use browser extensions to limit tracking. Most of our tools work fully even with cookies disabled.</p>
<h2>Children's privacy</h2>
<p>Our site is intended for a general audience and is not directed at children under 13. We do not knowingly collect personal information from children.</p>
<h2>Changes to this policy</h2>
<p>We may update this policy from time to time. Material changes will be reflected by the "last updated" date above.</p>
<h2>Contact</h2>
<p>Questions about privacy? Email <a href="mailto:${site.contactEmail}">${site.contactEmail}</a>.</p>`,
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    metaTitle: `Disclaimer — ${site.name}`,
    description: `${site.name} calculators provide estimates for educational purposes only and are not financial advice.`,
    bodyHtml: `
<p>The calculators and content on ${site.name} are provided for <strong>general informational and educational purposes only</strong>. They are not financial, investment, tax, legal, or accounting advice, and should not be relied upon as such.</p>
<h2>Estimates, not guarantees</h2>
<p>Our tools use standard formulas and the numbers you provide to produce estimates. Real-world results depend on many factors we can't capture — exact lender terms, fees, taxes, rounding, timing, and changes in rates or law. Actual figures will differ.</p>
<h2>No professional relationship</h2>
<p>Using this site does not create any advisor–client relationship. Before making a financial decision, consult a qualified professional who can review your specific circumstances.</p>
<h2>No warranty</h2>
<p>We work to keep our calculators accurate but make no warranty, express or implied, about their completeness, reliability, or suitability for any purpose. ${site.name} is not liable for any loss arising from use of the site.</p>
<h2>Third-party links</h2>
<p>We link to third-party sites and partners for your convenience. We don't control their content and aren't responsible for it. Some links are affiliate links, as explained in our <a href="/privacy/">Privacy Policy</a>.</p>`,
  },
];
