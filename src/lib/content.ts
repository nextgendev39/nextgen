/**
 * Site content. Product media below are real captures:
 *  - Autonexa: screenshots from the Autonexa app (autonexa/public/landing).
 *  - Flowza: screenshots of the Flowza clinic dashboard (app /dashboard).
 *  - BuildPilot: captures of the BuildPilot app's public pages (builtpilot-web).
 *
 * To add a product, append an entry below. Every list, card,
 * detail page, sitemap entry, footer link and structured-data block is
 * generated from these arrays.
 */

export type Media = {
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
  /**
   * "desktop" renders in a browser chrome; "phone" in a device frame;
   * "raw" on the cream video backdrop (Flowza frames); "plain" as-is.
   */
  frame?: "desktop" | "phone" | "raw" | "plain";
};

/** A wordmark image with optional variant for light backgrounds. */
export type Wordmark = {
  /** Version for dark backgrounds (default theme) */
  src: string;
  /** Version for light backgrounds; falls back to `src` */
  srcLight?: string;
  width: number;
  height: number;
};

/**
 * Category labels shown on cards. Use only labels that are accurate for the
 * product.
 */
export type Tag = "SaaS Product" | "Automotive" | "Healthcare" | "Restaurants" | "Construction";

/* ─────────────────────────────── Services ─────────────────────────────── */

export type ServiceIcon = "web" | "design" | "app" | "api" | "mobile" | "modernize";

export type Faq = { q: string; a: string };

/** Search metadata for a page. Titles ~50–60 chars, descriptions ~140–160. */
export type Seo = { title: string; description: string; keywords: string[] };

export type Service = {
  slug: string;
  title: string;
  icon: ServiceIcon;
  summary: string;
  details: string;
  deliverables: string[];
  /* Dedicated service page (/services/[slug]) */
  seo: Seo;
  /** The page's H1 */
  headline: string;
  intro: string[];
  offerings: { title: string; text: string }[];
  idealFor: string[];
  /** Celestiq products that show this capability in production */
  relatedProducts: string[];
  faqs: Faq[];
};

export const services: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    icon: "web",
    summary:
      "Fast, search-friendly marketing sites and corporate websites that turn visitors into enquiries.",
    details:
      "We design and engineer websites around your business goals — clear messaging, strong performance and content your team can manage without a developer.",
    deliverables: ["Responsive, accessible builds", "SEO & Core Web Vitals tuning", "CMS & analytics setup", "Lead capture & integrations"],
    seo: {
      title: "Website Development Services with Next.js | Celestiq",
      description:
        "Custom website development with Next.js and React: fast, accessible, SEO-ready company websites with CMS, analytics and lead capture built in.",
      keywords: ["website development company", "Next.js development company", "corporate website development", "React.js development services"],
    },
    headline: "Website development that turns visitors into enquiries",
    intro: [
      "Your website is often the first conversation a customer has with your business. We plan, design and build websites around that conversation: clear messaging, fast pages and a path from first visit to enquiry.",
      "We typically build with Next.js, React and TypeScript, render pages ahead of time wherever possible, and treat search visibility, accessibility and Core Web Vitals as part of the build rather than an add-on.",
    ],
    offerings: [
      { title: "Company & marketing websites", text: "Corporate sites, product sites and landing pages structured around your services and the questions your customers ask." },
      { title: "Next.js & React development", text: "Modern, typed front-ends that load quickly, stay maintainable and are easy for future developers to pick up." },
      { title: "Technical SEO & performance", text: "Semantic markup, metadata, sitemaps, structured data and Core Web Vitals tuning built into every page." },
      { title: "CMS, analytics & integrations", text: "Content your team can edit, analytics you can trust, and enquiry forms connected to email, CRM or chat." },
    ],
    idealFor: ["Businesses replacing an outdated website", "Startups launching a new product", "Companies that need a faster, search-friendly site"],
    relatedProducts: ["autonexa"],
    faqs: [
      {
        q: "Which technology do you use to build websites?",
        a: "We typically use Next.js, React and TypeScript with Tailwind CSS. Pages are pre-rendered where possible, which keeps them fast and easy for search engines to read.",
      },
      {
        q: "Can our team update the website without a developer?",
        a: "Yes. When content changes often, we set up a content management system so your team can edit pages, posts and media themselves.",
      },
      {
        q: "Is SEO included in website development?",
        a: "Technical SEO is part of every build: clean URLs, metadata, sitemaps, structured data, image optimisation and Core Web Vitals. Ongoing content marketing is a separate engagement.",
      },
    ],
  },
  {
    slug: "product-ui-ux-design",
    title: "Product UI/UX Design",
    icon: "design",
    summary:
      "Research-led interfaces and design systems that make complex software feel effortless.",
    details:
      "From discovery workshops to high-fidelity prototypes, we shape flows that users understand on the first try and engineers can ship consistently.",
    deliverables: ["User flows & wireframes", "Interactive prototypes", "Design systems & components", "Usability reviews"],
    seo: {
      title: "Product UI/UX Design Services for SaaS & Apps | Celestiq",
      description:
        "UI/UX design for SaaS platforms, web apps and mobile apps: user flows, wireframes, interactive prototypes and design systems your engineers can ship.",
      keywords: ["UI/UX design services", "SaaS product design", "design systems", "app UX design"],
    },
    headline: "Product UI/UX design for software people enjoy using",
    intro: [
      "Good software design starts with how people actually work. We map the jobs your users need to get done, then shape flows, screens and components that make those jobs obvious.",
      "Because the same team designs and engineers our own products, our designs are built to be shipped: consistent components, realistic states and specifications developers can follow.",
    ],
    offerings: [
      { title: "Research & user flows", text: "Workshops, journey mapping and flow diagrams that agree what the product must do before pixels are drawn." },
      { title: "Wireframes & prototypes", text: "Low-fidelity layouts and clickable prototypes to test ideas with stakeholders and users early." },
      { title: "Design systems", text: "Reusable components, tokens and patterns that keep every screen consistent as the product grows." },
      { title: "Usability reviews", text: "Audits of existing products that pinpoint friction and prioritise fixes by impact." },
    ],
    idealFor: ["Teams planning a new SaaS product", "Products that feel hard to use", "Companies that need a consistent design system"],
    relatedProducts: ["flowza", "buildpilot"],
    faqs: [
      {
        q: "Can you redesign an existing product?",
        a: "Yes. We start with a usability review of the current product, agree priorities with you, and redesign in stages so your users are never hit with a jarring change.",
      },
      {
        q: "Do you deliver designs that developers can build from?",
        a: "Yes. We deliver components, states and specifications in a design system, and we can build the front-end ourselves so nothing is lost in handover.",
      },
      {
        q: "Do you design for both web and mobile?",
        a: "Yes. We design responsive web applications, mobile apps and installable web apps, keeping one consistent design language across them.",
      },
    ],
  },
  {
    slug: "web-application-development",
    title: "Web Application Development",
    icon: "app",
    summary:
      "Custom SaaS platforms, dashboards and internal tools built to scale with your operations.",
    details:
      "We build multi-tenant platforms, role-based dashboards and workflow tools on modern, typed stacks — engineered for reliability from day one.",
    deliverables: ["SaaS & multi-tenant platforms", "Role-based dashboards", "Realtime features", "Secure authentication"],
    seo: {
      title: "Custom Web Application & SaaS Development | Celestiq",
      description:
        "Custom web application and SaaS development: multi-tenant platforms, CRMs, dashboards, internal tools and AI features, built on modern, typed stacks.",
      keywords: ["custom software development", "web application development", "SaaS application development", "custom CRM development", "AI software development"],
    },
    headline: "Custom web application and SaaS development",
    intro: [
      "We build the software businesses run on: SaaS platforms, customer portals, CRMs, dashboards and internal tools that replace spreadsheets and disconnected apps.",
      "We also build and operate our own SaaS products, so we design for the realities of production from day one: multi-tenancy, roles and permissions, realtime updates, security and the ability to grow without a rewrite.",
    ],
    offerings: [
      { title: "SaaS product development", text: "Multi-tenant platforms with subscriptions, onboarding, roles and per-customer configuration." },
      { title: "CRMs & business systems", text: "Custom CRMs, inventory, booking and operations systems shaped around how your team actually works." },
      { title: "Dashboards & internal tools", text: "Role-based dashboards and workflow tools that put live data and actions in one place." },
      { title: "AI features", text: "Assistants and automations that answer questions and surface alerts from your own business data." },
    ],
    idealFor: ["Founders building a SaaS product", "Businesses outgrowing spreadsheets", "Teams replacing off-the-shelf tools that no longer fit"],
    relatedProducts: ["autonexa", "flowza", "buildpilot"],
    faqs: [
      {
        q: "Can you build a SaaS product from scratch?",
        a: "Yes. We have built and run our own SaaS platforms (Autonexa, Flowza and BuildPilot), covering everything from multi-tenant architecture and authentication to billing-ready data models and admin tools.",
      },
      {
        q: "Do you build custom CRMs and internal tools?",
        a: "Yes. We build CRMs, booking and inventory systems, dashboards and workflow tools around your processes, with role-based access for each team.",
      },
      {
        q: "Can you add AI features to our application?",
        a: "Yes. BuildPilot includes an AI assistant that answers questions from live project data, and we can build similar assistants and automations on top of your own data.",
      },
    ],
  },
  {
    slug: "api-development-integrations",
    title: "API Development & Integrations",
    icon: "api",
    summary:
      "Robust APIs and integrations that connect your products, payments, messaging and data.",
    details:
      "We design clean, documented APIs and connect the services your business depends on — so data flows where it is needed, securely.",
    deliverables: ["REST & webhook APIs", "Third-party integrations", "Messaging & notifications", "Documentation & monitoring"],
    seo: {
      title: "API Development & Integration Services | Celestiq",
      description:
        "API development and system integration: REST and webhook APIs, payment, messaging and CRM integrations, and business automation that keeps data in sync.",
      keywords: ["API development services", "system integration", "business automation software", "webhook integrations"],
    },
    headline: "API development and integrations that keep your business connected",
    intro: [
      "Most businesses run on several systems that don't talk to each other. We design clean APIs and build the integrations between your products, payments, messaging and data, so information moves automatically and securely.",
      "Every API we ship is documented and monitored, so your team and partners can rely on it long after launch.",
    ],
    offerings: [
      { title: "REST & webhook APIs", text: "Well-structured, versioned APIs with authentication, validation and clear error handling." },
      { title: "Third-party integrations", text: "Payments, email, CRMs, accounting and other services connected to your product." },
      { title: "Messaging & notifications", text: "WhatsApp, SMS and email notifications triggered by real events in your system." },
      { title: "Business automation", text: "Automated workflows that remove manual data entry and keep systems in sync." },
    ],
    idealFor: ["Products that need a public or partner API", "Teams copying data between systems by hand", "Businesses adding payments or messaging"],
    relatedProducts: ["flowza", "buildpilot"],
    faqs: [
      {
        q: "Which services can you integrate with?",
        a: "Any service with a reliable API: payment gateways, email and messaging providers such as WhatsApp and SMS gateways, CRMs, accounting tools and internal systems.",
      },
      {
        q: "Do you document the APIs you build?",
        a: "Yes. Every API comes with documentation and monitoring so your developers and partners can integrate confidently.",
      },
      {
        q: "Can you connect our existing systems without replacing them?",
        a: "Usually, yes. We build integrations and automations around the tools you already use, and only recommend replacing a system when it blocks your goals.",
      },
    ],
  },
  {
    slug: "android-ios-app-development",
    title: "Android & iOS App Development",
    icon: "mobile",
    summary:
      "Mobile apps and installable web apps that keep your customers and teams connected on the go.",
    details:
      "We deliver cross-platform mobile experiences and progressive web apps with native-feeling performance, offline support and push notifications.",
    deliverables: ["Cross-platform apps", "Progressive web apps", "Push notifications", "App store readiness"],
    seo: {
      title: "Mobile App Development Company for Android & iOS | Celestiq",
      description:
        "Android and iOS app development: cross-platform mobile apps and installable web apps with offline support, push notifications and app store readiness.",
      keywords: ["mobile app development company", "Android app development", "iOS app development", "progressive web app development"],
    },
    headline: "Android and iOS app development",
    intro: [
      "Mobile apps keep customers and field teams connected wherever they are. We build cross-platform apps and installable progressive web apps that feel fast and native, without maintaining separate codebases for every device.",
      "We help you choose the right approach for your users and budget, then design, build and prepare the app for release.",
    ],
    offerings: [
      { title: "Cross-platform apps", text: "One codebase for Android and iOS, with native-feeling performance and platform conventions respected." },
      { title: "Progressive web apps", text: "Installable web apps that work offline and update instantly, with no app store required." },
      { title: "Push notifications", text: "Timely, relevant alerts that bring users back at the right moment." },
      { title: "App store readiness", text: "Builds, store assets and checks prepared for App Store and Google Play review." },
    ],
    idealFor: ["Businesses launching a customer app", "Teams that work on site or on the move", "Web products that need a mobile companion"],
    relatedProducts: ["buildpilot", "autonexa"],
    faqs: [
      {
        q: "Should we build a native app or a cross-platform app?",
        a: "For most business apps, a cross-platform app or a progressive web app gives the best balance of cost, speed and reach. We recommend native development only when a feature genuinely requires it.",
      },
      {
        q: "What is a progressive web app?",
        a: "A website that installs like an app, works offline and can send notifications. BuildPilot, for example, is an installable PWA that site teams use on their phones.",
      },
      {
        q: "Do you help publish apps to the App Store and Google Play?",
        a: "Yes. We prepare the builds, store listings and assets, and support you through the review process.",
      },
    ],
  },
  {
    slug: "code-modernization-upgrades",
    title: "Code Modernization & Upgrades",
    icon: "modernize",
    summary:
      "Upgrade legacy codebases to modern frameworks — faster, safer and easier to maintain.",
    details:
      "We audit, refactor and migrate ageing applications incrementally, reducing risk while improving performance, security and developer velocity.",
    deliverables: ["Codebase & security audits", "Framework migrations", "Performance optimisation", "Test coverage & CI"],
    seo: {
      title: "Legacy Code Modernization & Upgrade Services | Celestiq",
      description:
        "Legacy application modernization: codebase audits, framework migrations, performance and security upgrades, delivered incrementally to reduce risk.",
      keywords: ["legacy application modernization", "framework migration", "digital transformation services", "code refactoring services"],
    },
    headline: "Code modernization and upgrades without the big-bang rewrite",
    intro: [
      "Ageing codebases slow teams down: features take longer, bugs multiply and security patches fall behind. We modernize applications step by step, keeping them running while they improve.",
      "We start with an audit of your code, dependencies and infrastructure, agree a prioritised plan, then migrate and refactor in small, tested releases.",
    ],
    offerings: [
      { title: "Codebase & security audits", text: "A clear report on risks, outdated dependencies and the changes that will pay off first." },
      { title: "Framework migrations", text: "Upgrades to current versions of React, Next.js and Node.js, or migration from older stacks." },
      { title: "Performance optimisation", text: "Faster pages and APIs through profiling, caching and better data access." },
      { title: "Tests & CI", text: "Automated tests and pipelines that make every future change safer." },
    ],
    idealFor: ["Applications on unsupported frameworks", "Products that are slow or hard to change", "Teams preparing to scale or add features"],
    relatedProducts: [],
    faqs: [
      {
        q: "Do we need a complete rewrite?",
        a: "Rarely. We prefer incremental migration, replacing and improving parts of the system in stages so the business keeps running and risk stays low.",
      },
      {
        q: "What does a modernization project start with?",
        a: "An audit of your codebase, dependencies, security and infrastructure, followed by a prioritised plan that shows what to change first and why.",
      },
      {
        q: "Will users notice downtime during the upgrade?",
        a: "We plan releases in small, tested steps with rollback options, so changes can go live without disrupting your users.",
      },
    ],
  },
];

/* ─────────────────────────────── Products ─────────────────────────────── */

export type Product = {
  slug: string;
  name: string;
  category: string;
  tags: Tag[];
  description: string;
  longDescription: string;
  /** Full wordmark image. If absent, `mark` + the product name is rendered. */
  logo?: Wordmark;
  /** Square app icon, used when there is no wordmark image */
  mark?: { src: string; width: number; height: number };
  accent: { from: string; to: string };
  industries: string[];
  features: { title: string; text: string }[];
  /** Screens for the tabbed viewer and detail gallery (landscape) */
  media: Media[];
  /** Optional portrait capture shown in a phone frame on the detail page */
  mobile?: Media;
  /** Public product URL, when one exists */
  website?: string;
  /** Captures of the product's public website (1920×1200 desktop + 780×1688 phone), shown as the cover */
  showcase?: { desktop: Media; mobile: Media };
  /** Extra modules that exist in the product but have no screenshots yet */
  modules?: { title: string; icon?: "clinic" | "layers"; items: string[] }[];
  /** Product-specific search metadata (kept separate from company keywords) */
  seo: Seo;
  /** Celestiq services that this product demonstrates (internal links) */
  relatedServices: string[];
};

export const products: Product[] = [
  {
    slug: "autonexa",
    name: "Autonexa",
    category: "Automotive SaaS Platform",
    tags: ["SaaS Product", "Automotive"],
    description:
      "A digital platform designed to simplify automotive business operations and deliver smarter vehicle marketplace experiences.",
    longDescription:
      "Autonexa gives car showrooms one place to run stock, bookings, payments, customers and their online storefront — with role-based access for every team member and full English and Arabic support.",
    logo: { src: "/products/autonexa/logo-dark.png", srcLight: "/products/autonexa/logo-light.png", width: 720, height: 192 },
    mark: { src: "/products/autonexa/mark-dark.png", width: 421, height: 256 },
    accent: { from: "#E5B85C", to: "#B9862F" },
    industries: ["Car showrooms", "Dealer groups", "Used-car traders"],
    website: "https://autonexa-ten.vercel.app",
    showcase: {
      desktop: { src: "/products/autonexa/site-desktop.webp", width: 1920, height: 1200, label: "Website", alt: "Autonexa website on desktop: run your whole car dealership from one screen, with the sales dashboard below", frame: "desktop" },
      mobile: { src: "/products/autonexa/site-mobile.webp", width: 780, height: 1688, label: "Mobile", alt: "Autonexa website on a mobile phone", frame: "phone" },
    },
    seo: {
      title: "Autonexa | Car Showroom & Dealer Management Software",
      description:
        "Autonexa is car showroom and dealer management software: vehicle inventory, bookings, payments, customers and a dealer website, in English and Arabic.",
      keywords: ["car dealer management software", "car showroom software", "automotive dealership software", "vehicle inventory management"],
    },
    relatedServices: ["web-application-development", "website-development"],
    features: [
      { title: "Inventory & stock pipeline", text: "Track every vehicle from in-transit to ready-for-sale and sold." },
      { title: "Bookings & payments", text: "Deposits, balances due and overdue alerts in one view." },
      { title: "Customer records", text: "Buyers, contacts and booking history across the showroom." },
      { title: "Dealer storefront", text: "Publish stock to a branded website with search and filters." },
      { title: "Vehicle history", text: "A full audit trail of status changes, pricing and documents." },
      { title: "English & Arabic", text: "Complete right-to-left interface for regional teams." },
    ],
    media: [
      { src: "/products/autonexa/dashboard.webp", width: 1920, height: 1200, label: "Dashboard", alt: "Autonexa dashboard showing monthly sales, bookings, booking outcomes and sales team activity", frame: "desktop" },
      { src: "/products/autonexa/stock.webp", width: 1600, height: 1200, label: "Inventory", alt: "Autonexa inventory screen with stock pipeline and vehicle list", frame: "desktop" },
      { src: "/products/autonexa/booking.webp", width: 1600, height: 1200, label: "Bookings", alt: "Autonexa bookings screen with active bookings and amounts to collect", frame: "desktop" },
      { src: "/products/autonexa/customers.webp", width: 1600, height: 1200, label: "Customers", alt: "Autonexa customers directory with booking counts and sales executives", frame: "desktop" },
      { src: "/products/autonexa/website.webp", width: 1600, height: 1200, label: "Storefront", alt: "Autonexa dealer storefront website with vehicle search and featured cars", frame: "desktop" },
      { src: "/products/autonexa/history.webp", width: 1600, height: 1200, label: "Vehicle history", alt: "Autonexa vehicle detail page with status history and activity log", frame: "desktop" },
      { src: "/products/autonexa/arabic.webp", width: 1600, height: 1200, label: "Arabic (RTL)", alt: "Autonexa inventory screen in Arabic with right-to-left layout", frame: "desktop" },
    ],
  },
  {
    slug: "flowza",
    name: "Flowza",
    category: "Multi-industry Queue Management SaaS",
    tags: ["SaaS Product", "Restaurants", "Healthcare"],
    description:
      "A smart queue and business management platform built for restaurants, clinics, hospitals and service businesses.",
    longDescription:
      "Flowza replaces crowded doors and paper lists with a live digital queue. Guests join by scanning a QR code, get notified when it is their turn, and your team runs the floor — or the clinic — from one screen.",
    logo: { src: "/products/flowza/flowza-logo-dark.svg", srcLight: "/products/flowza/flowza-logo.svg", width: 236, height: 64 },
    mark: { src: "/products/flowza/flowza-mark.svg", width: 64, height: 64 },
    accent: { from: "#4C5BF5", to: "#19B8C9" },
    industries: ["Restaurants", "Clinics", "Hospitals", "Service businesses"],
    website: "https://flowza-restaurant.vercel.app",
    showcase: {
      desktop: { src: "/products/flowza/site-desktop.webp", width: 1920, height: 1200, label: "Website", alt: "Flowza website on desktop: One Platform. Every Queue. Better Experiences, with the live queue dashboard", frame: "desktop" },
      mobile: { src: "/products/flowza/site-mobile.webp", width: 780, height: 1688, label: "Mobile", alt: "Flowza website on a mobile phone", frame: "phone" },
    },
    seo: {
      title: "Flowza | Queue Management System for Restaurants & Clinics",
      description:
        "Flowza is a QR-based queue management system for restaurants, clinics and hospitals, with live queues, WhatsApp and SMS alerts and lobby displays.",
      keywords: ["queue management system", "restaurant waitlist software", "clinic queue management", "QR code queue system"],
    },
    relatedServices: ["web-application-development", "api-development-integrations"],
    features: [
      { title: "QR join, no app needed", text: "Customers scan, enter their details and get a live token." },
      { title: "Live staff queue", text: "Call next, seat or serve, and see wait times update in realtime." },
      { title: "WhatsApp & SMS alerts", text: "Automatic messages tell people when it is their turn." },
      { title: "Lobby display screens", text: "Show who is being served on any TV in the waiting area." },
      { title: "Tables & sections", text: "Visual table status — seated, clearing or ready." },
      { title: "Multi-branch", text: "Run every location and team role from one account." },
    ],
    modules: [
      {
        title: "Clinic & patient management",
        icon: "clinic",
        items: ["Appointments", "Doctors & availability", "Departments & services", "Patient records", "Patient queue"],
      },
    ],
    media: [
      { src: "/products/flowza/app-overview.webp", width: 1920, height: 1200, label: "Dashboard", alt: "Flowza clinic dashboard with patient, appointment, waiting and consultation counts, today's schedule and doctor availability", frame: "desktop" },
      { src: "/products/flowza/app-queue.webp", width: 1920, height: 1200, label: "Patient queue", alt: "Flowza patient queue with waiting, next-to-call, in-consultation and completed counts, department queues and the live queue", frame: "desktop" },
      { src: "/products/flowza/app-appointments.webp", width: 1920, height: 1200, label: "Appointments", alt: "Flowza weekly appointment calendar with doctor, department, service and status filters", frame: "desktop" },
      { src: "/products/flowza/app-customers.webp", width: 1920, height: 1200, label: "Patients", alt: "Flowza patient list with phone numbers, visit counts, last visit and created dates", frame: "desktop" },
      { src: "/products/flowza/app-doctors.webp", width: 1920, height: 1200, label: "Doctors", alt: "Flowza doctors screen with each doctor's department, services offered and weekly schedule", frame: "desktop" },
      { src: "/products/flowza/app-availability.webp", width: 1920, height: 1200, label: "Doctor availability", alt: "Flowza doctor availability with consultation length, bookable time slots and weekly working hours", frame: "desktop" },
    ],
    mobile: { src: "/products/flowza/app-queue-mobile.webp", width: 780, height: 1688, label: "Mobile", alt: "Flowza patient queue on a mobile phone, with the bottom tab bar", frame: "phone" },
  },
  {
    slug: "buildpilot",
    name: "BuildPilot",
    category: "Construction Management SaaS",
    tags: ["SaaS Product", "Construction"],
    description:
      "A construction management workspace for civil engineers and contractors — projects, BOQ, materials, quotations, labour and team in one place.",
    longDescription:
      "BuildPilot replaces site spreadsheets with one workspace. Teams plan jobs and budgets, build BOQs and quotations, track materials, labour and expenses, and keep clients updated — with role-based access and an AI assistant that answers from live project data.",
    mark: { src: "/products/buildpilot/mark.png", width: 512, height: 512 },
    accent: { from: "#F59E0B", to: "#EA580C" },
    industries: ["Civil engineers", "Contractors", "Site teams"],
    website: "https://builtpilot-web.vercel.app",
    showcase: {
      desktop: { src: "/products/buildpilot/site-desktop.webp", width: 1920, height: 1200, label: "Website", alt: "BuildPilot website on desktop: run every construction project with clarity", frame: "desktop" },
      mobile: { src: "/products/buildpilot/site-mobile.webp", width: 780, height: 1688, label: "Mobile", alt: "BuildPilot website on a mobile phone", frame: "phone" },
    },
    seo: {
      title: "BuildPilot | Construction Management Software for Contractors",
      description:
        "BuildPilot is construction management software for contractors and civil engineers: projects, BOQ, materials, quotations, labour, costs and an AI assistant.",
      keywords: ["construction management software", "BOQ software", "contractor management software", "construction project management app"],
    },
    relatedServices: ["web-application-development", "android-ios-app-development"],
    features: [
      { title: "Projects & site progress", text: "Plan jobs, budgets and daily site progress in one place." },
      { title: "BOQ & estimates", text: "Manage quantities, rates, measurements and cost breakdowns." },
      { title: "Materials & vendors", text: "Track stock received, used and remaining on every site." },
      { title: "Quotation templates", text: "Build estimates from templates or blank quotes with live section totals." },
      { title: "Team & roles", text: "Invite admins, project managers, engineers and site staff with the right access." },
      { title: "Cost control", text: "Compare estimated and actual spend before overruns grow." },
      { title: "BuildPilot AI", text: "Ask about pending materials, quotations, tasks and cost alerts using live project data." },
      { title: "Client portal", text: "Share project and quotation updates with clients through a secure link." },
    ],
    modules: [
      {
        title: "Also in BuildPilot",
        icon: "layers",
        items: ["Daily site reports", "Labour & attendance", "Project expenses", "WhatsApp notifications", "English · Arabic · Hindi · Tamil", "INR & AED", "Installable PWA"],
      },
    ],
    media: [
      { src: "/products/buildpilot/landing.webp", width: 1920, height: 1200, label: "Overview", alt: "BuildPilot home page: run every construction project with clarity", frame: "desktop" },
      { src: "/products/buildpilot/platform.webp", width: 1920, height: 1200, label: "Platform", alt: "BuildPilot platform modules: projects, BOQ and estimates, materials, quotation templates, team and roles, cost control", frame: "desktop" },
      { src: "/products/buildpilot/ai.webp", width: 1920, height: 1200, label: "BuildPilot AI", alt: "BuildPilot AI project copilot answering what needs attention today", frame: "desktop" },
      { src: "/products/buildpilot/sign-in.webp", width: 1920, height: 1200, label: "Sign in", alt: "BuildPilot sign-in screen for construction teams", frame: "desktop" },
    ],
    mobile: { src: "/products/buildpilot/mobile.webp", width: 780, height: 1688, label: "Mobile", alt: "BuildPilot on a mobile phone", frame: "phone" },
  },
];

/* ─────────────────────────────── Projects ─────────────────────────────── */

/**
 * Client work (case studies). Publish a project only with the client's
 * permission, and only with facts you can stand behind: no invented metrics.
 * While this list is empty, /projects returns 404 and is left out of the
 * sitemap and navigation, so no thin page is ever indexed.
 */
export const projectCategories = ["Web App", "Website"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  slug: string;
  name: string;
  client: string;
  industry: string;
  /** What kind of build it was; drives the filter tabs on /projects */
  category: ProjectCategory;
  /** One-sentence summary for cards and the meta description fallback */
  summary: string;
  /** Case-study body paragraphs */
  body: string[];
  services: string[];
  tech: string[];
  /** Live URL, when public */
  website?: string;
  /** Desktop screenshot (1920×1200) */
  cover?: Media;
  /** Phone screenshot, shown overlapping the desktop cover */
  mobile?: Media;
  seo: Seo;
};

export const projects: Project[] = [
  {
    slug: "zohaan-motors",
    name: "Zohaan Motors",
    client: "Zohaan Motors",
    industry: "Automotive · Used-car showroom",
    category: "Web App",
    summary:
      "An invite-only operations workspace for a UAE used-car showroom, tracking every vehicle from acquisition through inspection, workshop, pricing and booking.",
    body: [
      "Zohaan Motors runs a used-car showroom in the UAE. Each vehicle goes through acquisition, inspection, workshop repairs, pricing and finally a customer booking, and the team needed one place to follow it through every step.",
      "We built a private staff workspace that follows each vehicle through its lifecycle, with controlled status changes. It covers acquisition and its financials, inspection checklists, workshop jobs with costs and quality checks, pricing, and bookings with payment terms. Push alerts warn staff before a booking's payment deadline passes.",
      "Access is invite-only. A Super Admin invites each staff member, who verifies with an emailed code before setting a password. Role-based permissions decide what each person can see and change, and database row-level security enforces those same rules. The interface works in English and Arabic (right-to-left), with prices in AED and dates in Dubai time.",
    ],
    services: ["Web Application Development", "Product UI/UX Design"],
    tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Drizzle ORM", "Web Push"],
    website: "https://autonexa-ten.vercel.app/",
    cover: {
      src: "/projects/zohaan-motors/desktop.webp",
      width: 1920,
      height: 1200,
      label: "Desktop",
      alt: "Car dealership software on desktop: run your whole car dealership from one screen, with a sales and bookings dashboard",
      frame: "desktop",
    },
    mobile: {
      src: "/projects/zohaan-motors/mobile.webp",
      width: 780,
      height: 1688,
      label: "Mobile",
      alt: "Car dealership software on a mobile phone",
      frame: "phone",
    },
    seo: {
      title: "Zohaan Motors | Used-Car Showroom Management System Case Study",
      description:
        "How Celestiq built Zohaan Motors' showroom workspace: vehicle acquisition, inspection, workshop, pricing and bookings with role-based access, in English and Arabic.",
      keywords: ["car showroom management software", "used car dealer software UAE", "vehicle inventory system", "dealership management system"],
    },
  },
  {
    slug: "mirna",
    name: "Mirna",
    client: "Mirna",
    industry: "Retail · Ecommerce",
    category: "Web App",
    summary:
      "A UAE-first ecommerce platform with an admin app and a bilingual English/Arabic storefront, covering catalogue, variants, cart, checkout and Stripe payments.",
    body: [
      "Mirna is an online store built for the UAE first, with AED pricing and English and Arabic. It is designed so more countries, currencies and languages can be added later without a rewrite.",
      "The platform is two applications that share one Supabase backend. Staff manage the store in the admin app: products, categories, tags, attributes, variants, stock, delivery, payments and contact details. Customers shop in the storefront, which has search, filters, product pages with size and colour options, a cart, a wishlist, saved addresses, checkout, verified-buyer reviews and order history.",
      "Payments go through Stripe, with card and Apple Pay. Order placement runs in a single database transaction: prices are recalculated on the server, stock is reserved, and repeat submissions never create a second order. The storefront supports right-to-left Arabic, light and dark themes, works as an installable PWA, and includes structured data, hreflang tags and a sitemap for search engines.",
    ],
    services: ["Web Application Development", "Website Development", "API Development & Integrations"],
    tech: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Stripe", "Tailwind CSS"],
    cover: {
      src: "/projects/mirna/desktop.webp",
      width: 1920,
      height: 1200,
      label: "Desktop",
      alt: "Mirna storefront on desktop: The new collection hero with abaya photography, and the Women collection below",
      frame: "desktop",
    },
    mobile: {
      src: "/projects/mirna/mobile.webp",
      width: 780,
      height: 1688,
      label: "Mobile",
      alt: "Mirna storefront on a mobile phone",
      frame: "phone",
    },
    seo: {
      title: "Mirna | Bilingual Ecommerce Platform Case Study for the UAE",
      description:
        "How Celestiq built Mirna: an English/Arabic ecommerce storefront and admin for the UAE with variants, cart, checkout, Stripe and Apple Pay payments, and a PWA.",
      keywords: ["ecommerce development UAE", "Arabic ecommerce website", "Next.js ecommerce", "Stripe Apple Pay integration"],
    },
  },
  {
    slug: "compass-trading",
    name: "Compass Trading",
    client: "Compass Trading LLC FZ",
    industry: "Automotive · Vehicle export",
    category: "Website",
    summary:
      "A fast, search-optimised marketing website for a Dubai vehicle exporter, built to turn visitors into WhatsApp, phone and email enquiries.",
    body: [
      "Compass Trading LLC FZ exports vehicles from the UAE. It needed a website that presents the business with confidence and makes it easy for buyers to get in touch.",
      "We designed and built a single-page site with an interactive 3D hero, sections on the company, its services and why to choose it, a brand marquee and a gallery of exported vehicles. Enquiries go straight to the team: an enquiry form opens WhatsApp with the vehicle and destination already filled in, and there are click-to-call, email and floating WhatsApp buttons.",
      "The site is built for search and speed. It includes metadata, Open Graph cards, a sitemap and JSON-LD structured data for the business, images served as AVIF and WebP, and a 3D scene and analytics that load only after the page is ready. Every WhatsApp, phone and email click is tracked through Google Tag Manager and GA4, so the team can count enquiries as conversions.",
    ],
    services: ["Website Development", "Product UI/UX Design"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Google Tag Manager", "Google Analytics 4"],
    website: "https://compasstradingllc.ae/",
    cover: {
      src: "/projects/compass-trading/desktop.webp",
      width: 1920,
      height: 1200,
      label: "Desktop",
      alt: "Compass Trading website on desktop: Your Trusted Car Export Company in the UAE, with WhatsApp and call buttons",
      frame: "desktop",
    },
    mobile: {
      src: "/projects/compass-trading/mobile.webp",
      width: 780,
      height: 1688,
      label: "Mobile",
      alt: "Compass Trading website on a mobile phone",
      frame: "phone",
    },
    seo: {
      title: "Compass Trading | Vehicle Export Website Case Study, Dubai",
      description:
        "How Celestiq built Compass Trading's vehicle export website: a fast, SEO-ready Next.js site with WhatsApp enquiries, conversion tracking and an interactive 3D hero.",
      keywords: ["car export website Dubai", "automotive website development", "WhatsApp lead generation website", "Next.js business website"],
    },
  },
  {
    slug: "easy-fly-tourism",
    name: "Easy Fly Tourism",
    client: "Easy Fly Tourism",
    industry: "Travel · Tourism & visas",
    category: "Website",
    summary:
      "A website for a Dubai travel agency that presents its ticketing, UAE visa and visa-extension services and brings in enquiries by form, phone, email and WhatsApp.",
    body: [
      "Easy Fly Tourism is a travel agency in Deira, Dubai. It books flight tickets to destinations worldwide, processes 30-day and 60-day Dubai visas with single or multiple entry, and extends visas by up to 30 days for visitors already in the UAE.",
      "We built a single-page website around those services. A full-screen \"Discover Your Destination\" hero leads into the agency's story, a clear breakdown of its three services, opening hours and the office address. The phone number and sales email sit at the top of every page.",
      "The site is built to turn visitors into enquiries. A contact form sends messages straight to the sales inbox, an \"Enquire Now\" call to action appears throughout the page, and a floating WhatsApp button lets visitors start a chat. The layout adapts to phones, and sections animate in as the visitor scrolls.",
    ],
    services: ["Website Development"],
    tech: ["HTML5", "CSS3", "Bootstrap 5", "jQuery", "EmailJS"],
    website: "https://easyflytourism.com/",
    cover: {
      src: "/projects/easy-fly/desktop.webp",
      width: 1920,
      height: 1200,
      label: "Desktop",
      alt: "Easy Fly Tourism website on desktop: Discover Your Destination hero with world landmarks and a suitcase",
      frame: "desktop",
    },
    mobile: {
      src: "/projects/easy-fly/mobile.webp",
      width: 780,
      height: 1688,
      label: "Mobile",
      alt: "Easy Fly Tourism website on a mobile phone",
      frame: "phone",
    },
    seo: {
      title: "Easy Fly Tourism | Travel Agency Website Case Study, Dubai",
      description:
        "How Celestiq built Easy Fly Tourism's website: a responsive travel agency site for ticketing, Dubai visas and visa extensions, with form, phone and WhatsApp enquiries.",
      keywords: ["travel agency website Dubai", "tourism website development", "visa services website", "UAE travel agency web design"],
    },
  },
];

/* ─────────────────────────────── Why / Process ─────────────────────────────── */

export type WhyIcon = "target" | "cpu" | "layers" | "sparkles" | "shield" | "lifebuoy";

export const reasons: { icon: WhyIcon; title: string; text: string }[] = [
  { icon: "target", title: "Business-focused solutions", text: "Every feature is tied to an outcome — revenue, efficiency or customer experience — not technology for its own sake." },
  { icon: "cpu", title: "Modern technology", text: "Typed, well-supported stacks like Next.js, React and PostgreSQL that your future team will be glad to inherit." },
  { icon: "layers", title: "Scalable architecture", text: "Multi-tenant, modular foundations that grow from first customer to many branches without a rewrite." },
  { icon: "sparkles", title: "Premium UI/UX", text: "Interfaces crafted with the same care we put into our own products — clear, fast and on-brand." },
  { icon: "shield", title: "Performance & security", text: "Core Web Vitals, role-based access and data protection are part of the build, not an afterthought." },
  { icon: "lifebuoy", title: "Long-term technical support", text: "We stay on after launch to maintain, monitor and evolve what we have built together." },
];

export const processSteps = [
  {
    title: "Discover & Strategize",
    text: "We dig into your goals, users and constraints, then shape a focused scope and roadmap.",
    points: ["Workshops & research", "Scope & roadmap", "Technical planning"],
  },
  {
    title: "Design & Build",
    text: "Designers and engineers work side by side in short iterations, with working software you can review early.",
    points: ["UX & UI design", "Agile development", "Regular demos"],
  },
  {
    title: "Implement & Launch",
    text: "We test, harden and deploy — then handle the go-live so your team and customers are ready on day one.",
    points: ["QA & security checks", "Deployment & data migration", "Team onboarding"],
  },
  {
    title: "Measure & Optimize",
    text: "After launch we watch real usage, fix friction and ship improvements that compound over time.",
    points: ["Analytics & monitoring", "Iterative improvements", "Ongoing support"],
  },
] as const;

export const projectTypes = [
  ...services.map((s) => s.title),
  ...products.map((p) => `${p.name} enquiry`),
  "Something else",
];
