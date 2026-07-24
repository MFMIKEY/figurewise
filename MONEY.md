# 💸 How this site makes money (and the honest version of "passive")

Read this once. It's the difference between a site that sits there earning nothing
and one that actually pays you.

## The honest truth first

There is **no button that prints money**. This site is a real *asset*: build it once,
and it can earn for years with very little upkeep. But money follows **traffic**, and
traffic follows **Google rankings**, which take **2–6 months** to build for a new site.

So the realistic path is:

1. **Week 1** — get it live + set up ads/affiliates (this doc). ~2–3 hours, one time.
2. **Months 1–3** — Google discovers and starts ranking your pages. Earnings: near $0.
3. **Months 3–9** — pages climb, traffic compounds, earnings become real.
4. **After that** — mostly hands-off. You occasionally add a calculator (ask me — it
   takes me minutes) and check a dashboard.

People who make $500–$5,000/mo from calculator/tool sites are common. People who make
it in week one are not real. Anyone promising the latter is selling you something.

**What you get paid for:** every 1,000 visitors ("RPM") on a finance site typically earns
**$10–$40** from display ads alone — finance is one of the highest-paying ad niches, which
is exactly why I picked it. Affiliate commissions (below) can add much more per visitor.

---

## The two income streams (both already wired into the site)

### 1. Display ads — Google AdSense (easiest, fully passive)

Ads are already placed on every page. They stay invisible until you connect your account.

**Steps (one time, ~30 min + waiting for approval):**

1. Go to **https://adsense.google.com** and sign up (free) with your Google account.
2. Add your site's domain (you'll have one after `DEPLOY.md`).
3. AdSense reviews your site. Approval usually takes **a few days to 2 weeks**. Sites get
   approved faster when they have: real content (✅ you have it — every calculator has an
   explainer + FAQ), an About / Contact / Privacy page (✅ built for you), and a custom
   domain (do `DEPLOY.md` first).
4. Once approved, AdSense gives you a **publisher ID** like `ca-pub-1234567890123456`.
5. Open `src/site.config.js`, set:
   ```js
   adsenseClient: "ca-pub-1234567890123456",   // your ID
   adsenseSlot: "1234567890",                    // an ad-unit ID from AdSense
   ```
6. Rebuild (`npm run build`) and redeploy. Real ads now show; the placeholders disappear.
   The build also auto-generates the required `ads.txt` file.

> Tip: **Ezoic** and **Mediavine** pay more than AdSense but need minimum traffic
> (Ezoic ~none now, Mediavine 50k sessions/mo). Start with AdSense; upgrade later.

### 2. Affiliate links — higher payout per visitor

Each money calculator can show ONE tasteful "recommended" card (e.g. a high-yield savings
account on the savings calculators). These are **hidden until you add your own links**, so
nothing fake ever appears.

**Programs worth joining (free), matched to your calculators:**

| Calculator page | Good affiliate programs |
|---|---|
| Savings / investment / retirement | High-yield savings & broker referrals (e.g. via **Impact**, **CJ**, **FlexOffers**), Wealthfront/Betterment/SoFi partner programs |
| Mortgage / loan / auto-loan | LendingTree, Credible, or loan marketplaces (via CJ / Impact) |
| Debt / credit-card payoff | Balance-transfer & consolidation offers (via FlexOffers / CJ) |

The easiest on-ramps are the aggregator networks — **Impact.com**, **CJ.com**,
**FlexOffers.com** — one signup gets you many finance advertisers. Amazon Associates is
easy too but pays little for finance.

**To turn a card on:** open `src/site.config.js`, find the `affiliate` block, set
`enabled: true` and paste your link into `url`. Rebuild + redeploy. Done.

> ⚠️ Only recommend things you'd genuinely stand behind, and keep the "advertising
> disclosure" label (it's already there). It's required by the FTC and keeps you honest.

---

## Getting traffic (the part that actually earns you money)

This is 90% of the game. In rough order of effort-to-payoff:

1. **Google Search Console** (do this day one, 15 min):
   - Go to **https://search.google.com/search-console**, add your domain, verify it.
   - Submit your sitemap: enter `sitemap.xml`. This tells Google every page exists.
   - This is the single highest-leverage thing you can do. It's how Google finds you.
2. **Bing Webmaster Tools** (5 min, same idea): https://www.bing.com/webmasters — free
   extra traffic, and it feeds ChatGPT/Copilot search too.
3. **Let it bake.** Google needs weeks to trust a new site. Don't panic at $0 early.
4. **Add more calculators over time.** More pages = more keywords = more traffic. Just ask
   me — "add a BMI / paycheck / ROI / X calculator" — and I'll generate it in minutes.
   More pages is the #1 lever after the site exists.
5. **A few backlinks help a lot.** Answer relevant questions on Reddit / Quora / forums and
   link your calculator when it genuinely helps. Even 5–10 good links move rankings.
6. **Optional:** a Pinterest account pinning your calculators (finance does well there).

You do **not** need to write blog posts, make videos, or post daily. The calculators
themselves are the content, and they rank on their own once indexed.

---

## Your realistic "barely touch it" routine

- **One time (week 1):** deploy, connect AdSense, join 1–2 affiliate networks, submit to
  Search Console. ~2–3 hours total.
- **Monthly (~20 min):** glance at AdSense + Search Console. See which calculators get
  traffic. Ask me to add 1–2 new calculators in the topics that are working.
- **That's it.** No inventory, no customers, no support tickets, no shipping.

---

## Want me to automate even more?

I can set up a **scheduled agent** that runs on its own to, for example:
- add a new calculator every couple of weeks (more pages = more traffic, automatically), or
- email you a monthly traffic + earnings summary.

Just say the word and I'll set it up (it needs your go-ahead because it creates a
recurring task). Until then, adding calculators on request is already fast and free.
