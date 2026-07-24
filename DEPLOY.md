# 🚀 Get FigureWise live (for free)

Your site is 100% static HTML/CSS/JS in the **`dist/`** folder. That means you can host it
**free, forever**, on several services.

> **✅ Already set up for you: automatic deploys.** The repo at
> **github.com/MFMIKEY/figurewise** includes a GitHub Actions workflow that rebuilds and
> publishes the site on **every push** — no external account needed. Jump to **Option A**
> to switch it on (one click). Options B/C are alternatives if you'd rather use
> Cloudflare/Netlify.

First, always rebuild so `dist/` is fresh:

```bash
npm run build
```

---

## Option A — GitHub Pages, automatic (recommended, no other account)

The workflow is already in the repo (`.github/workflows/deploy.yml`). You just flip it on:

1. On GitHub, open your repo → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. That's it. The workflow runs on every push and publishes to:
   **https://mfmikey.github.io/figurewise/**

The first deploy kicks off automatically once the source is set (or push any change /
click **Actions → Deploy to GitHub Pages → Run workflow**). Every future change I make and
push goes live on its own in ~1 minute.

> **Custom domain later?** Open `.github/workflows/deploy.yml`, set `BASE_PATH:` to `""`
> and `SITE_URL:` to your domain; add the domain under Settings → Pages; push. (The site
> is built to work at either a sub-path or a root domain — no other changes needed.)

---

## Option B — Netlify Drop (no repo needed, ~2 minutes)

Best if you just want it online *right now*.

1. Go to **https://app.netlify.com/drop**
2. Drag the **`dist`** folder onto the page.
3. It's live instantly at a `something-random.netlify.app` URL.
4. (Optional) Make a free Netlify account to keep it + add a custom domain later.

Downside: to update it, you drag the folder again. Fine for starting out.

---

## Option C — Cloudflare Pages via GitHub (alternative auto-deploy)

Best "set it and forget it": every time you change the site, it redeploys itself. Free,
fast, and includes free HTTPS + a global CDN.

1. **Put the project on GitHub** (I can do this for you — just ask, and say the word to
   create the repo). Or manually: create a repo, push this folder.
2. Go to **https://dash.cloudflare.com** → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git**, and pick your repo.
3. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy. You get a free `your-project.pages.dev` URL, and it rebuilds on every push.

> GitHub Pages and Vercel work too, with the same `npm run build` → `dist` settings.

---

## Get a custom domain (recommended before applying to AdSense)

A real domain (like `figurewise.com`) makes the site look legit and **greatly improves
AdSense approval odds**.

1. Buy one at **Cloudflare Registrar** (at-cost pricing, ~$10/yr) or Namecheap/Porkbun.
2. Point it at your host:
   - **Cloudflare Pages:** add the domain in the Pages project → *Custom domains*. If you
     bought it at Cloudflare, DNS is automatic.
   - **Netlify:** *Domain settings* → *Add custom domain*, follow the DNS steps.
3. **Update `src/site.config.js`:** set `url:` to your real `https://yourdomain.com` (no
   trailing slash), then `npm run build` and redeploy. This fixes canonical URLs + sitemap.

HTTPS is automatic and free on all these hosts.

---

## After it's live — the money checklist

Do these in order (details in **`MONEY.md`**):

- [ ] Buy + connect a custom domain (above)
- [ ] Submit `sitemap.xml` in **Google Search Console** ← do this first, it's the big one
- [ ] Submit to **Bing Webmaster Tools**
- [ ] Apply to **Google AdSense**; when approved, paste your ID into `src/site.config.js`
- [ ] Join 1–2 affiliate networks (Impact / CJ / FlexOffers); turn on the cards in config
- [ ] Rebuild + redeploy

That's the whole setup. From there it's mostly waiting for Google + occasionally adding
calculators.
