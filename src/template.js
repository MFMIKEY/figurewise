// ============================================================================
// template.js — turns config + calculators into full, SEO-rich HTML documents.
// Pure string builders. No client code here except what we intentionally emit.
// ============================================================================
import { site, categories } from "./site.config.js";

export function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const YEAR = 2026; // build stamp; update in build.js if you like

// All calculators, set once by build.js before rendering, so the footer can
// render real category links (good for SEO + internal linking).
let CALCS = [];
export function setCalcs(list) {
  CALCS = list || [];
}

// Base path prefix for all internal links + assets. Empty "" = served at site
// root (local preview, Cloudflare/Netlify, custom domain). Set to "/figurewise"
// (etc.) only when hosting under a sub-path, e.g. GitHub Project Pages. build.js
// sets this from the BASE_PATH env var or site.config.basePath.
let BASE = "";
export function setBasePath(b) {
  BASE = (b || "").replace(/\/$/, "");
}

// ---- shared partials -------------------------------------------------------
function head({ title, description, path, jsonld }) {
  const canonical = site.url + BASE + path;
  const ga = site.ga4
    ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(site.ga4)}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${esc(site.ga4)}');</script>`
    : "";
  const adsense = site.adsenseClient
    ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${esc(
        site.adsenseClient
      )}" crossorigin="anonymous"></script>`
    : "";
  const ld = (jsonld || [])
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`)
    .join("\n");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#1f8f5f">
<link rel="icon" href="${BASE}/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${BASE}/assets/style.css">
${adsense}
${ga}
${ld}
</head>`;
}

function logoSvg() {
  return `<svg class="logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#1f8f5f"/><path d="M9 22V10h9v3h-6v2.5h5.2v3H12V22H9z" fill="#fff"/><circle cx="22.5" cy="20.5" r="2.5" fill="#8be0b8"/></svg>`;
}

function header() {
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header"><nav class="nav">
<a class="brand" href="${BASE}/">${logoSvg()}<span>${esc(site.name)}</span></a>
<div class="nav-links">
<a href="${BASE}/#calculators">Calculators</a>
<a href="${BASE}/about/">About</a>
<a href="${BASE}/contact/">Contact</a>
</div></nav></header>`;
}

function footer() {
  const links = Object.keys(categories)
    .map((key) => {
      const items = CALCS.filter((c) => c.category === key)
        .map((c) => `<a href="${BASE}/calculators/${c.slug}/">${esc(c.cardTitle || c.h1)}</a>`)
        .join("");
      if (!items) return "";
      return `<div><h4>${esc(categories[key].label)}</h4>${items}</div>`;
    })
    .join("");
  return `<footer class="site-footer">
<div class="footer-inner">
<div>
<a class="brand" href="${BASE}/">${logoSvg()}<span>${esc(site.name)}</span></a>
<p style="margin-top:12px;font-size:.9rem;color:var(--text-mute)">${esc(site.tagline)}</p>
</div>
${links}
<div><h4>Site</h4>
<a href="${BASE}/about/">About</a>
<a href="${BASE}/contact/">Contact</a>
<a href="${BASE}/privacy/">Privacy Policy</a>
<a href="${BASE}/disclaimer/">Disclaimer</a>
</div>
</div>
<div class="footer-bottom">
<p>&copy; ${YEAR} ${esc(site.name)}. All calculators are for general educational purposes only and are not financial advice.</p>
<p>Made for people who like clear answers.</p>
</div>
</footer>`;
}

// Ad unit: real AdSense when configured, tasteful placeholder otherwise.
export function adSlot(label) {
  if (site.adsenseClient && site.adsenseSlot) {
    return `<div class="ad-slot"><ins class="adsbygoogle" style="display:block" data-ad-client="${esc(
      site.adsenseClient
    )}" data-ad-slot="${esc(
      site.adsenseSlot
    )}" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>`;
  }
  return `<div class="ad-slot"><div class="ad-ph">Advertisement${
    label ? " · " + esc(label) : ""
  }</div></div>`;
}

// Affiliate card for a given group key ("savings" | "loans" | "debt").
export function affiliateCard(groupKey) {
  const a = site.affiliate[groupKey];
  if (!a || !a.enabled || !a.url) return "";
  return `<aside class="affiliate-card">
<div class="ac-body">
<div class="ac-label">${esc(a.label)}</div>
<p class="ac-text">${esc(a.text)}</p>
</div>
<a class="btn" href="${esc(a.url)}" target="_blank" rel="sponsored noopener">${esc(a.cta)}</a>
<div class="ac-disc">Advertising disclosure: this is a paid partner link. We may earn a commission at no cost to you.</div>
</aside>`;
}

function shell({ title, description, path, jsonld, bodyClass, main }) {
  return `${head({ title, description, path, jsonld })}
<body${bodyClass ? ` class="${bodyClass}"` : ""}>
${header()}
<main id="main">
${main}
</main>
${footer()}
</body>
</html>`;
}

// ---- calculator page -------------------------------------------------------
export function renderCalculatorPage(calc) {
  const path = `/calculators/${calc.slug}/`;
  const title = calc.metaTitle || `${calc.h1} — Free & Instant | ${site.name}`;
  const description = calc.metaDescription;

  // structured data: FAQ + breadcrumb + softwareapp
  const jsonld = [];
  if (calc.faq && calc.faq.length) {
    jsonld.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: calc.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  jsonld.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url + BASE + "/" },
      { "@type": "ListItem", position: 2, name: calc.h1, item: site.url + BASE + path },
    ],
  });
  jsonld.push({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: calc.h1,
    url: site.url + BASE + path,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  });

  // inputs
  const inputsHtml = calc.inputs
    .map((inp) => {
      const help = inp.help ? ` <span class="help">${esc(inp.help)}</span>` : "";
      if (inp.type === "select") {
        const opts = inp.options
          .map(
            (o) =>
              `<option value="${esc(o.value)}"${o.value === inp.default ? " selected" : ""}>${esc(
                o.label
              )}</option>`
          )
          .join("");
        return `<div class="field"><label for="f_${inp.id}">${esc(
          inp.label
        )}${help}</label><select id="f_${inp.id}" data-input="${inp.id}">${opts}</select></div>`;
      }
      const hasPre = inp.prefix ? " has-prefix" : "";
      const hasSuf = inp.suffix ? " has-suffix" : "";
      const pre = inp.prefix ? `<span class="adorn prefix">${esc(inp.prefix)}</span>` : "";
      const suf = inp.suffix ? `<span class="adorn suffix">${esc(inp.suffix)}</span>` : "";
      const attrs = [
        `id="f_${inp.id}"`,
        `data-input="${inp.id}"`,
        `type="number"`,
        `value="${inp.default}"`,
        `inputmode="decimal"`,
        inp.min != null ? `min="${inp.min}"` : "",
        inp.max != null ? `max="${inp.max}"` : "",
        inp.step != null ? `step="${inp.step}"` : `step="any"`,
      ]
        .filter(Boolean)
        .join(" ");
      const range =
        inp.min != null && inp.max != null
          ? `<input type="range" data-range="${inp.id}" min="${inp.min}" max="${inp.max}" step="${
              inp.step != null ? inp.step : 1
            }" value="${inp.default}" aria-hidden="true" tabindex="-1">`
          : "";
      return `<div class="field"><label for="f_${inp.id}">${esc(
        inp.label
      )}${help}</label><div class="input-wrap${hasPre}${hasSuf}">${pre}<input ${attrs}>${suf}</div>${range}</div>`;
    })
    .join("\n");

  // outputs
  const primary = calc.outputs.find((o) => o.primary) || calc.outputs[0];
  const secondary = calc.outputs.filter((o) => o !== primary && !o.hidden);
  const secondaryHtml = secondary
    .map(
      (o) =>
        `<li><span class="rr-label">${esc(o.label)}</span><span class="rr-value" data-output="${
          o.id
        }">—</span></li>`
    )
    .join("");

  const breakdownHtml = calc.breakdown ? `<div data-breakdown></div>` : "";
  const scheduleHtml = calc.schedule ? `<div data-schedule></div>` : "";

  // affiliate + ads
  const aff = calc.affiliateGroup ? affiliateCard(calc.affiliateGroup) : "";

  // content prose
  const prose = renderProse(calc);

  // related
  const related =
    calc.related && calc.related.length
      ? `<h2>Related calculators</h2><div class="related-list">${calc.related
          .map((r) => `<a href="${BASE}/calculators/${r.slug}/">${esc(r.label)}</a>`)
          .join("")}</div>`
      : "";

  // inline spec + compute
  const spec = {
    inputs: calc.inputs.map((i) => ({ id: i.id, type: i.type || "number", default: i.default })),
    outputs: calc.outputs.map((o) => ({ id: o.id, format: o.format })),
    breakdown: calc.breakdown || null,
    schedule: !!calc.schedule,
    currency: "$",
    currencyCode: "USD",
    locale: "en-US",
  };
  const inlineScript = `<script>window.__CALC__=${JSON.stringify(spec)};
window.__compute=${calc.compute.toString()};</script>
<script src="${BASE}/assets/calc.js" defer></script>`;

  const main = `
<div class="container narrow">
<nav class="breadcrumb"><a href="${BASE}/">Home</a> › ${esc(calc.h1)}</nav>
<h1>${esc(calc.h1)}</h1>
<p class="sub" style="color:var(--text-soft);font-size:1.08rem;margin-top:-.3em">${esc(calc.intro)}</p>
</div>

<div class="container">
<form class="calc-layout" data-calc-form autocomplete="off">
<section class="panel"><div class="panel-head">Your numbers</div><div class="panel-body">
${inputsHtml}
</div></section>
<section class="panel"><div class="panel-head">Result</div><div class="panel-body">
<div class="result-primary"><div class="r-label">${esc(primary.label)}</div><div class="r-value" data-output="${
    primary.id
  }">—</div></div>
<ul class="result-rows">${secondaryHtml}</ul>
${breakdownHtml}
</div></section>
</form>
</div>

<div class="container narrow">
${aff}
${adSlot("in-article")}
${scheduleHtml}
<div class="disclaimer">${esc(
    calc.disclaimer ||
      "This calculator provides estimates for general educational purposes only and is not financial advice. Your actual figures may differ. Verify important decisions with a qualified professional."
  )}</div>
<div class="prose">
${prose}
</div>
${related}
${adSlot("footer")}
</div>
${inlineScript}`;

  return { path, html: shell({ title, description, path, jsonld, main }) };
}

function renderProse(calc) {
  let out = "";
  if (calc.content) {
    if (calc.content.howItWorks) {
      out += `<h2>How the ${esc(calc.h1.replace(/ Calculator.*/i, ""))} works</h2>${calc.content.howItWorks}`;
    }
    if (calc.content.formula) {
      out += `<h2>The formula</h2>${calc.content.formula}`;
    }
    if (calc.content.tips) {
      out += `<h2>Tips & things to know</h2>${calc.content.tips}`;
    }
    if (calc.content.extra) {
      out += calc.content.extra;
    }
  }
  if (calc.faq && calc.faq.length) {
    out += `<h2>Frequently asked questions</h2><div class="faq">${calc.faq
      .map(
        (f) =>
          `<details><summary>${esc(f.q)}</summary><p>${f.a}</p></details>`
      )
      .join("")}</div>`;
  }
  return out;
}

// ---- generic content page --------------------------------------------------
export function renderContentPage({ slug, title, metaTitle, description, bodyHtml, path }) {
  const p = path || `/${slug}/`;
  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url + BASE + "/" },
        { "@type": "ListItem", position: 2, name: title, item: site.url + BASE + p },
      ],
    },
  ];
  const main = `<div class="container narrow">
<nav class="breadcrumb"><a href="${BASE}/">Home</a> › ${esc(title)}</nav>
<h1>${esc(title)}</h1>
<div class="prose">${bodyHtml}</div>
</div>`;
  return {
    path: p,
    html: shell({ title: metaTitle || `${title} — ${site.name}`, description, path: p, jsonld, main }),
  };
}

// ---- homepage --------------------------------------------------------------
export function renderHome(calcs) {
  const byCat = {};
  Object.keys(categories).forEach((k) => (byCat[k] = []));
  calcs.forEach((c) => {
    (byCat[c.category] = byCat[c.category] || []).push(c);
  });

  const sections = Object.keys(categories)
    .map((key) => {
      const list = byCat[key] || [];
      if (!list.length) return "";
      const cards = list
        .map(
          (c) =>
            `<a class="card" href="${BASE}/calculators/${c.slug}/"><span class="card-ico">${
              c.icon || "🧮"
            }</span><h3>${esc(c.cardTitle || c.h1)}</h3><p>${esc(c.cardBlurb || calcShort(c))}</p></a>`
        )
        .join("");
      return `<div class="cat-label">${esc(categories[key].label)}</div><div class="grid">${cards}</div>`;
    })
    .join("");

  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      url: site.url + BASE + "/",
      description: site.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: calcs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.h1,
        url: site.url + BASE + `/calculators/${c.slug}/`,
      })),
    },
  ];

  const main = `
<div class="container">
<section class="hero">
<span class="eyebrow">100% free · no sign-up</span>
<h1>${esc(site.tagline)}</h1>
<p class="sub">${esc(site.description)}</p>
</section>
${adSlot("home-top")}
<div id="calculators"></div>
${sections}
${adSlot("home-bottom")}
<section style="text-align:center;padding:40px 0 10px;max-width:680px;margin:0 auto">
<h2>Why FigureWise?</h2>
<p>Most money calculators bury the answer under ads and jargon. Ours give you the number instantly, show the math, and never ask you to sign up. Every result updates live as you type — perfect for comparing "what if" scenarios before you make a big financial decision.</p>
</section>
</div>`;

  return {
    path: "/",
    html: shell({
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
      path: "/",
      jsonld,
      main,
    }),
  };
}

function calcShort(c) {
  return c.intro && c.intro.length < 90 ? c.intro : (c.metaDescription || "").slice(0, 88);
}
