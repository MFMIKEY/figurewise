# FigureWise 🧮

A fast, free **personal-finance calculator site** — built to earn passive income from ads
and affiliate links once it ranks on Google. Zero frameworks, zero hosting cost, no build
tooling to break: plain HTML/CSS/JS generated from simple config files.

**New here? Read these three, in order:**
1. **`DEPLOY.md`** — get it online for free (~5 min)
2. **`MONEY.md`** — connect ads + affiliates and the honest plan to actually earn
3. This file — how it works and how to add calculators

---

## Quick start

```bash
npm run build     # generates the static site into dist/
npm run serve     # preview at http://localhost:8080
```

Deploy the **`dist/`** folder anywhere (see `DEPLOY.md`). That's the entire site.

## What's inside

```
src/
  site.config.js      ← YOUR settings: brand, domain, AdSense ID, affiliate links
  template.js         ← turns config into SEO-rich HTML (head tags, schema, nav, ads)
  pages.js            ← About / Contact / Privacy / Disclaimer content
  calculators/        ← one file per calculator (this is the site's content)
    mortgage.js, auto-loan.js, ...
assets/
  style.css           ← the whole design system (light + dark)
  calc.js             ← ~4KB runtime: live updates, breakdown bars, amortization tables
build.js              ← the generator (reads everything, writes dist/)
serve.js              ← tiny local preview server
dist/                 ← generated output — deploy THIS (created by build)
```

## How a calculator works

Each file in `src/calculators/` exports a config object: the input fields, the output
fields, a pure `compute(v)` function (the math, which runs live in the browser), plus the
SEO content and FAQ. The generator handles everything else — layout, meta tags, structured
data, internal links, ad placement.

Open `src/calculators/mortgage.js` — the top of the file documents every field.

## Add a new calculator

Two ways:

- **Ask me.** Say "add a [BMI / paycheck / ROI / car-affordability / …] calculator" and
  I'll generate the file, verify the math, and rebuild. Minutes, and free. This is the
  intended low-effort path — more calculators = more Google traffic = more income.
- **Yourself.** Copy an existing file in `src/calculators/`, change the fields + `compute`
  + content, then `npm run build`. Everything else (nav, footer, sitemap, homepage card,
  structured data) updates automatically.

## Rebrand / rename

Everything user-facing lives in `src/site.config.js` — the name, tagline, domain, colors
(edit `--brand` in `assets/style.css`), ads, and affiliate links. Change, rebuild, deploy.

## Notes

- All calculators are **estimates for education**, not financial advice — this is stated
  on every page and in the disclaimer (important for both trust and ad-network approval).
- No user data leaves the browser; the math runs client-side.
