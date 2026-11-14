# NextGen Technologies — company website

https://thenextgentech.co · *Building Digital Products. Empowering Businesses.*

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL and CONTACT_WEBHOOK_URL
npm run dev                  # http://localhost:3010
npm run build && npm start   # production
```

## Structure

```
src/app/                  layout (fonts, metadata, JSON-LD, theme script), home,
                          products (list), products/[slug] (detail), api/contact,
                          sitemap, robots,
                          manifest, opengraph-image, icons
src/components/brand/     LogoMark + Logo (animated SVG monogram)
src/components/layout/    Header (sticky, active-section, mobile menu), ThemeToggle, Footer
src/components/sections/  Hero, TechMarquee, Services, Products, ScreenViewer,
                          WhyUs, Process, About, Contact, ContactForm
src/components/ui/        Reveal/Stagger, ParallaxY, Button, frames, headings,
                          Portfolio (ProductLogo, TagList)
src/lib/content.ts        ALL copy, services, products, process.
                          Add a product here and every card, detail page, header menu item,
                          footer link, sitemap entry and JSON-LD block follows.
src/lib/site.ts           site URL, nav, contact details, social links
src/lib/contact.ts        validation shared by the form and the API route
```

## Brand

| Asset | File |
| --- | --- |
| Mark (light bg / dark bg / mono) | `public/brand/mark.svg`, `mark-dark.svg`, `mark-mono.svg` |
| Logo lockup with "Technologies" descriptor (light / dark bg) | `public/brand/logo-light.svg`, `logo-dark.svg` |
| App icon | `public/brand/app-icon.svg`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` |
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


## To finish before launch

1. `NEXT_PUBLIC_SITE_URL` — defaults to `https://thenextgentech.co`; override only for previews.
2. **Contact form delivery.** Recommended: email. Set `CONTACT_TO_EMAIL` plus `SMTP_HOST`, `SMTP_PORT`,
   `SMTP_USER` and `SMTP_PASS`. For Gmail, use an App Password from
   https://myaccount.google.com/apppasswords, not your normal password. Each enquiry arrives as an email
   with the visitor set as Reply-To. Alternatively, set `CONTACT_WEBHOOK_URL` to an `http(s)` endpoint that
   accepts a JSON POST. With neither set, dev logs submissions and production returns a clear 503.
   Set the same variables in your hosting provider (e.g. Vercel → Settings → Environment Variables).
3. `site.contact` and `site.socials` in `src/lib/site.ts` — the UI and structured data only render
   them once they are filled in.
