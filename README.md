# Celestiq Technologies — company website

https://celestiqtech.com · *Building Digital Products. Empowering Businesses.*

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL and CONTACT_WEBHOOK_URL
npm run dev                  # http://localhost:3010
npm run build && npm start   # production
```

## Structure

```
src/app/                  layout (fonts, default metadata, Organization/WebSite JSON-LD,
                          analytics, theme script), home, about, contact,
                          services + services/[slug], products + products/[slug],
                          projects + projects/[slug] (404 until a project exists),
                          api/contact, sitemap, robots, manifest, icons,
                          opengraph-image (the logo share image used by every page)
src/components/brand/     LogoMark + Logo (animated SVG monogram)
src/components/layout/    Header (sticky, active-section, mobile menu), ThemeToggle, Footer
src/components/sections/  Hero, TechMarquee, Services, Products, ScreenViewer,
                          WhyUs, Process, About, Contact, ContactForm
src/components/ui/        Reveal/Stagger, ParallaxY, Button, frames, headings,
                          Portfolio (ProductLogo, TagList)
src/lib/content.ts        ALL copy, services, products, process.
                          Add a product here and every card, detail page, header menu item,
                          footer link, sitemap entry and JSON-LD block follows.
src/lib/site.ts           site URL, nav, contact details, social links, indexing switch,
                          verification/analytics IDs
src/lib/seo.ts            pageMetadata(): title, description, canonical, robots, OG, X card
src/lib/schema.ts         JSON-LD builders (WebPage, Service, SoftwareApplication, FAQ, …)
src/lib/og.tsx            1200×630 logo share image (logoOgImage)
src/lib/contact.ts        validation shared by the form and the API route
```

## Brand

| Asset | File |
| --- | --- |
| Mark (light bg / dark bg / mono) | `public/celestiq/mark.svg`, `mark-dark.svg`, `mark-mono.svg` |
| Logo lockup with "Technologies" descriptor (light / dark bg) | `public/celestiq/logo-light.svg`, `logo-dark.svg` |
| App icon | `public/celestiq/app-icon.svg`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` |
| Favicon / Apple icon | `src/app/icon.svg`, `src/app/apple-icon.png` |

The mark is a **G enclosing an N**, with a "spark" node at the G's opening to signal forward motion.
Colors: ink `#070B18`, electric `#3D7BFF`, violet `#6D5BFF`, lilac `#B49CFF`, signal `#3DDCC4`.
Type: Sora (display), Inter (text). The lockup SVGs use live Sora text. Before sending them to
print or other tools, convert the text to outlines.

## Themes

Dark is the brand default. `layout.tsx` sets `data-theme` on `<html>` before first paint, from the
visitor's saved choice or their OS preference; the header toggle saves a choice. Light-theme values
live under `:root[data-theme="light"]` in `globals.css`. `text-white`, `bg-white/…` and `border-white/…`
mean "high-contrast ink" and flip with the theme. Use `text-snow` for text that must stay white on
electric/violet fills, and the `light:` / `dark:` variants for anything else.

## Content sources (all real)

- **Autonexa** — screenshots from `autonexa/public/landing`, logo from `autonexa/public/brand`.
- **Flowza** — cropped frames from `Flowza-Restaurant-App-Flow.mp4`; logo from `flowza-restaurant/public/brand`.
  The video predates the current indigo Flowza logo, so its screens show the earlier orange styling.
  Clinic features come from the codebase, which has no screenshots yet. To add some, drop images in
  `public/products/flowza/` and append them to `media` in `src/lib/content.ts`.
- **BuildPilot** — captured from the BuildPilot app (`builtpilot-web`) running locally: home page, platform,
  AI section, sign-in and mobile. The app's own UI and README spell it "BuildPilot", so the site does too
  (`name` in `src/lib/content.ts`). Features come from its landing page, README and routes. The signed-in
  dashboard needs an account, so there are no in-app captures yet. Add them to `public/products/buildpilot/`
  and to `media`. Public URL: https://builtpilot-web.vercel.app (from the repo's `lib/app-url.ts`).


## SEO

- **Every page** exports metadata through `pageMetadata()` in `src/lib/seo.ts`, with its own
  title (~50–60 chars), description (~140–160), canonical URL, Open Graph and X card. Every page
  shares the same image when posted on social media: the Celestiq logo (`app/opengraph-image.tsx`). Service and
  product SEO text lives next to its content in `src/lib/content.ts` (`seo` on each entry).
- **Structured data:** the layout emits Organization and WebSite once; each page emits one `@graph`
  (WebPage / AboutPage / ContactPage / CollectionPage, BreadcrumbList, plus Service,
  SoftwareApplication, ItemList or FAQPage as relevant). Only facts from `site` and `content` are used,
  with no ratings, reviews, prices or addresses. Add contact details and socials to `site.ts` and they flow in.
- **Sitemap & robots** are generated from the content arrays. Bump `site.contentUpdated` when copy
  changes so `<lastmod>` stays accurate. Preview deployments (and `SITE_NOINDEX=1`) are blocked.
- **Redirects:** `www.` → apex with a 301 (`next.config.ts`); HTTPS is enforced by the host, with HSTS.
- **International:** one English site for all markets, so there is no `hreflang`. Add it only when
  genuinely localized pages (e.g. Arabic) exist.
- **Adding a project (case study):** append to `projects` in `src/lib/content.ts`, only with the
  client's permission and verifiable facts. `/projects`, its sitemap entries and the footer link appear
  automatically.

### Search Console, Bing and analytics

1. Buy the domain and point `celestiqtech.com` and `www.celestiqtech.com` at the host.
2. **Google Search Console** → Add property → *URL prefix* `https://celestiqtech.com` → *HTML tag*.
   Put the `content` value in `GOOGLE_SITE_VERIFICATION`, redeploy, click *Verify*.
   (Or use a *Domain* property with a DNS TXT record, which needs no code.)
3. In Search Console → *Sitemaps*, submit `https://celestiqtech.com/sitemap.xml`, then use
   *URL inspection* → *Request indexing* on the home page.
4. **Bing Webmaster Tools:** import from Search Console, or set `BING_SITE_VERIFICATION`.
5. **Analytics:** set `NEXT_PUBLIC_GTM_ID` (GA4 configured inside GTM) or `NEXT_PUBLIC_GA_ID`.
   A successful enquiry sends a `generate_lead` event (`project_type`, `page_path`); mark it as a
   key event in GA4. Add a consent banner / Consent Mode before enabling analytics for UK/EU visitors.
6. Check pages with Google's Rich Results Test and https://validator.schema.org.

## To finish before launch

1. `NEXT_PUBLIC_SITE_URL` — defaults to `https://celestiqtech.com`; override only for previews.
2. **Contact form delivery.** Recommended: email. Set `CONTACT_TO_EMAIL` plus `SMTP_HOST`, `SMTP_PORT`,
   `SMTP_USER` and `SMTP_PASS`. For Gmail, use an App Password from
   https://myaccount.google.com/apppasswords, not your normal password. Each enquiry arrives as an email
   with the visitor set as Reply-To. Alternatively, set `CONTACT_WEBHOOK_URL` to an `http(s)` endpoint that
   accepts a JSON POST. With neither set, dev logs submissions and production returns a clear 503.
   Set the same variables in your hosting provider (e.g. Vercel → Settings → Environment Variables).
3. `site.contact` and `site.socials` in `src/lib/site.ts` — the UI and structured data only render
   them once they are filled in.
