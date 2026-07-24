// ============================================================================
// build.js — reads every calculator + page and writes a static site to /dist.
// Run with:  npm run build   (or: node build.js)
// The /dist folder is 100% static HTML/CSS/JS. Deploy it anywhere for free.
// ============================================================================
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { site, categories } from "./src/site.config.js";
import {
  setCalcs,
  setBasePath,
  renderHome,
  renderCalculatorPage,
  renderContentPage,
} from "./src/template.js";
import { pages } from "./src/pages.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "dist");
const CALC_DIR = path.join(__dirname, "src", "calculators");
const ASSET_DIR = path.join(__dirname, "assets");
const TODAY = new Date().toISOString().slice(0, 10);

// Env overrides let CI (e.g. GitHub Pages) build for a sub-path + real URL
// without editing committed config. Local/Cloudflare builds use the defaults.
if (process.env.SITE_URL) site.url = process.env.SITE_URL.replace(/\/$/, "");
const BASE = (process.env.BASE_PATH || site.basePath || "").replace(/\/$/, "");
setBasePath(BASE);

// ---- helpers ---------------------------------------------------------------
function writePage(urlPath, html) {
  // "/" -> dist/index.html ; "/about/" -> dist/about/index.html ;
  // "/404.html" -> dist/404.html (explicit file paths kept as-is)
  let rel;
  if (urlPath === "/") rel = "index.html";
  else if (urlPath.endsWith(".html")) rel = urlPath.replace(/^\//, "");
  else rel = path.join(urlPath.replace(/^\/|\/$/g, ""), "index.html");
  const file = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html, "utf8");
  return urlPath;
}

async function loadCalculators() {
  const files = fs
    .readdirSync(CALC_DIR)
    .filter((f) => f.endsWith(".js"))
    .sort();
  const calcs = [];
  for (const f of files) {
    const mod = await import(pathToFileURL(path.join(CALC_DIR, f)).href);
    if (mod.default && mod.default.slug) calcs.push(mod.default);
    else console.warn("  ! skipped (no default/slug):", f);
  }
  // order: by category order in config, then by optional .order, then h1
  const catOrder = Object.keys(categories);
  calcs.sort((a, b) => {
    const c = catOrder.indexOf(a.category) - catOrder.indexOf(b.category);
    if (c !== 0) return c;
    const o = (a.order || 100) - (b.order || 100);
    if (o !== 0) return o;
    return (a.h1 || "").localeCompare(b.h1 || "");
  });
  return calcs;
}

// ---- assets ----------------------------------------------------------------
function faviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#1f8f5f"/><path d="M9 22V10h9v3h-6v2.5h5.2v3H12V22H9z" fill="#fff"/><circle cx="22.5" cy="20.5" r="2.5" fill="#8be0b8"/></svg>`;
}

function sitemap(urls) {
  const body = urls
    .map(
      (u) =>
        `  <url><loc>${site.url}${BASE}${u === "/" ? "/" : u}</loc><lastmod>${TODAY}</lastmod><changefreq>monthly</changefreq><priority>${
          u === "/" ? "1.0" : "0.8"
        }</priority></url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function robots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${site.url}${BASE}/sitemap.xml\n`;
}

// ---- run -------------------------------------------------------------------
async function main() {
  console.log("Building", site.name, "→ /dist");
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  const calcs = await loadCalculators();
  setCalcs(calcs);
  console.log(`  ${calcs.length} calculators loaded`);

  const urls = [];

  // homepage
  const home = renderHome(calcs);
  urls.push(writePage(home.path, home.html));

  // calculator pages
  for (const c of calcs) {
    // resolve related labels (defensive: keep only existing slugs)
    if (c.related) c.related = c.related.filter((r) => calcs.some((x) => x.slug === r.slug));
    const page = renderCalculatorPage(c);
    urls.push(writePage(page.path, page.html));
  }

  // content pages
  for (const p of pages) {
    const page = renderContentPage(p);
    urls.push(writePage(page.path, page.html));
  }

  // 404
  writePage("/404.html".replace(/\/$/, ""), renderContentPage({
    slug: "404",
    title: "Page not found",
    metaTitle: `Page not found — ${site.name}`,
    description: "Sorry, that page doesn't exist.",
    path: "/404.html",
    bodyHtml: `<p>Sorry, we couldn't find that page. Try the <a href="/">homepage</a> to browse all calculators.</p>`,
  }).html);

  // assets
  fs.cpSync(ASSET_DIR, path.join(DIST, "assets"), { recursive: true });
  fs.writeFileSync(path.join(DIST, "favicon.svg"), faviconSvg(), "utf8");
  fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemap(urls), "utf8");
  fs.writeFileSync(path.join(DIST, "robots.txt"), robots(), "utf8");
  if (site.adsenseClient) {
    // ads.txt authorizes Google to sell your inventory — needed for AdSense.
    fs.writeFileSync(
      path.join(DIST, "ads.txt"),
      `google.com, ${site.adsenseClient.replace(/^ca-/, "")}, DIRECT, f08c47fec0942fa0\n`,
      "utf8"
    );
  }

  console.log(`  ${urls.length} pages written`);
  console.log("Done. Deploy the /dist folder.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
