# 💰 Get approved by AdSense & start earning — the exact checklist

Follow this top to bottom. Steps marked **[you]** need your accounts; steps marked
**[claude]** I do for you (just ask).

---

## Where you stand: approval-readiness ✅

AdSense reviewers reject sites that look thin, sketchy, or incomplete. Yours already has
what they look for:

- ✅ Real, original content on every page (each calculator has an explainer + FAQ)
- ✅ **About**, **Contact**, **Privacy Policy**, and **Disclaimer** pages
- ✅ Clean navigation, mobile-friendly, fast, no broken links
- ✅ A privacy policy that discloses cookies + advertising
- ✅ Cookie notice on the site
- ✅ `ads.txt` auto-generated the moment you add your publisher ID
- ✅ AdSense verification tag auto-added the moment you add your publisher ID
- ✅ HTTPS (automatic on GitHub Pages / any modern host)

**The one thing that most improves approval odds: a custom domain** (next section).

---

## Step 1 — Get a custom domain [you + claude]  ⭐ do this first

AdSense strongly prefers a domain you own over a free `*.github.io` subdomain. A domain is
~$10/year and is the single biggest boost to approval odds (and to looking trustworthy).

- **[you]** Buy a domain — [Cloudflare Registrar](https://dash.cloudflare.com) (at-cost),
  [Porkbun](https://porkbun.com), or [Namecheap](https://namecheap.com). Something like
  `figurewise.com` or your own name.
- **[claude]** Tell me the domain and I'll: point the build at it, set it up on GitHub
  Pages, and give you the exact DNS records to paste in. ~10 minutes of your time.

> You *can* apply with the `github.io` URL to start, but expect approval to be harder.
> A domain removes that friction.

---

## Step 2 — Add a little more content [claude]  (optional but helps)

More quality pages = stronger application + more traffic later. Ask me to add a few more
calculators (paycheck/tax, rent-vs-buy, ROI, car affordability, BMI, tip variants, etc.).
I build, verify the math, and auto-deploy them in minutes. Aim for ~15–20 calculators
before applying if you want the strongest case.

---

## Step 3 — Apply to AdSense [you]

1. Go to **https://adsense.google.com** → sign up with your Google account.
2. Enter your site URL (your custom domain from Step 1).
3. Fill in your **country**, accept terms, and add your **payment address** (this must be a
   real address — Google mails a verification PIN here later).
4. AdSense gives you a code snippet / asks you to connect the site. **You don't need to
   paste code by hand** — instead do Step 4 so the verification tag is already live.
5. Submit for review. **Approval takes ~3 days to 2 weeks.** Don't touch anything while you
   wait; just make sure the site stays live (it will).

---

## Step 4 — Drop in your publisher ID [you: 1 line + claude]

As soon as AdSense gives you a **publisher ID** (looks like `ca-pub-1234567890123456`):

1. Open **`src/site.config.js`** and set:
   ```js
   adsenseClient: "ca-pub-1234567890123456",   // your ID
   adsenseSlot:   "1234567890",                 // an ad-unit ID (create one in AdSense)
   ```
2. Commit + push (or ask me — **[claude]** I'll do it and it auto-deploys).

This automatically: adds the AdSense verification `<meta>` tag, loads the ad script, fills
the ad slots with real ads, and generates `ads.txt`. The "Advertisement" placeholders
disappear.

> You can add just `adsenseClient` first (for verification during review), then add
> `adsenseSlot` once approved to turn on real ad units.

---

## Step 5 — Set up getting paid [you]

In the AdSense dashboard:
- **Payments → add your bank account** (for direct deposit).
- **Verify your address** with the PIN Google mails you once earnings hit ~$10.
- Add **tax info** if prompted.
- Payout happens **automatically, monthly, once your balance passes $100.**

---

## Step 6 — Turn on the traffic (this is what actually earns) [you]

Ads with no visitors = $0. Do this the day you go live (don't wait for AdSense approval):

1. **[Google Search Console](https://search.google.com/search-console)** → add your site →
   submit your sitemap (`sitemap.xml`). *This is the #1 lever.*
2. **[Bing Webmaster Tools](https://www.bing.com/webmasters)** → same thing (also feeds AI
   search).
3. Then let it rank (weeks–months) and ask me to keep adding calculators.

---

## Step 7 — Add affiliate income too [you + claude]  (optional, higher payout)

Bigger per-visitor money than ads. Join a network (free): **Impact**, **CJ**, or
**FlexOffers** — one signup unlocks many finance advertisers.
- **[you]** Get approved, grab your links.
- **[you or claude]** Paste them into the `affiliate` block in `src/site.config.js` and set
  `enabled: true`. The labeled "recommended" cards appear only where relevant.

---

## The honest timeline

| When | What happens |
|---|---|
| Day 1 | Domain + apply to AdSense + submit sitemap to Search Console |
| Days 3–14 | AdSense reviews; Google starts indexing your pages |
| Weeks 2–8 | Pages begin ranking; first trickle of traffic + earnings |
| Months 3–9 | Traffic compounds; earnings become meaningful, mostly hands-off |

Nobody earns real money in week one. But this is a real asset that pays while you sleep
once traffic arrives — and adding calculators (ask me anytime) keeps it growing.
