// ============================================================================
// SITE CONFIG — change these values to make the site yours.
// This is the ONE file you touch to rebrand, set your domain, and turn on ads.
// ============================================================================

export const site = {
  // --- Brand -----------------------------------------------------------------
  name: "FigureWise",
  tagline: "Free money calculators that actually make sense.",
  // Your live URL once deployed (no trailing slash). Used for canonical URLs,
  // sitemap, and social share tags. Change this AFTER you pick a domain.
  url: "https://figurewise.com",
  // Sub-path the site is served under. Leave "" for a domain or Cloudflare/
  // Netlify (served at root). The GitHub Pages workflow sets this automatically
  // to "/figurewise" via the BASE_PATH env var — you don't need to touch it.
  basePath: "",
  // Short blurb used on the homepage + meta descriptions.
  description:
    "Free, fast, no-signup calculators for mortgages, loans, savings, debt payoff, retirement and more. Clear answers with the math shown.",
  author: "FigureWise",
  locale: "en_US",

  // --- Monetization ----------------------------------------------------------
  // 1) GOOGLE ADSENSE
  //    Leave adsenseClient EMPTY ("") until your AdSense account is approved.
  //    When empty, NO ad code loads and tasteful placeholders show instead, so
  //    the site looks clean while you wait for approval.
  //    Once approved, paste your publisher ID like "ca-pub-1234567890123456".
  adsenseClient: "",
  // Optional: a specific ad slot ID for in-content units. Fill after approval.
  adsenseSlot: "",
  // While ads aren't configured, show nothing where ads will go (clean site).
  // Set to true only if you want to preview ad placement as dashed boxes.
  showAdPlaceholders: false,

  // 2) AFFILIATE SPOTS
  //    Each calculator can show ONE tasteful "recommended" card. Fill these with
  //    YOUR real affiliate links once you join programs (see MONEY.md). If a URL
  //    is empty, that card is hidden automatically — nothing fake is ever shown.
  affiliate: {
    // Shown on savings / investment / retirement calculators
    savings: {
      enabled: false,
      label: "Earn more on your savings",
      text: "Compare today's top high-yield savings accounts.",
      cta: "See rates",
      url: "", // <-- your affiliate link
    },
    // Shown on mortgage / loan / refinance calculators
    loans: {
      enabled: false,
      label: "Shopping for a rate?",
      text: "Compare personalized mortgage & loan offers in minutes.",
      cta: "Compare offers",
      url: "", // <-- your affiliate link
    },
    // Shown on debt / credit-card calculators
    debt: {
      enabled: false,
      label: "Pay off debt faster",
      text: "See balance-transfer and consolidation options.",
      cta: "Explore options",
      url: "", // <-- your affiliate link
    },
  },

  // --- Analytics (optional) --------------------------------------------------
  // Paste a Google Analytics 4 Measurement ID like "G-XXXXXXXXXX" to turn on
  // traffic tracking. Leave empty to disable.
  ga4: "",

  // Show a small cookie/consent notice at the bottom (recommended for AdSense
  // and good practice). Once you enable Google's own consent messaging in the
  // AdSense dashboard (for EEA/UK visitors), you can set this to false.
  cookieNotice: true,

  // --- Contact ---------------------------------------------------------------
  contactEmail: "hello@figurewise.com",
};

// Site-wide categories used for grouping + internal links.
export const categories = {
  loans: { label: "Loans & Mortgages", blurb: "Know your payment before you sign." },
  saving: { label: "Saving & Investing", blurb: "Watch your money grow over time." },
  debt: { label: "Debt Payoff", blurb: "Get out of debt with a real plan." },
  income: { label: "Income & Everyday", blurb: "Paychecks, tips, and quick math." },
};
