/**
 * Site content. Product media below are real captures:
 *  - Autonexa: screenshots from the Autonexa app (autonexa/public/landing).
 *  - Flowza: frames from the official Flowza app-flow video.
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

export type Service = {
  slug: string;
  title: string;
  icon: ServiceIcon;
  summary: string;
  details: string;
  deliverables: string[];
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
  /** Extra modules that exist in the product but have no screenshots yet */
  modules?: { title: string; icon?: "clinic" | "layers"; items: string[] }[];
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
      { src: "/products/flowza/queue.jpg", width: 960, height: 800, label: "Live queue", alt: "Flowza guest phone showing token A045 next to the host's live queue screen", frame: "raw" },
      { src: "/products/flowza/display.jpg", width: 1460, height: 680, label: "Lobby display", alt: "Flowza waiting-area display showing now serving A045 and the next tokens", frame: "raw" },
      { src: "/products/flowza/call.jpg", width: 960, height: 800, label: "Guest called", alt: "Flowza notifying a guest that their table is ready while the host queue marks them as called", frame: "raw" },
      { src: "/products/flowza/setup.jpg", width: 1040, height: 680, label: "Setup & QR", alt: "Flowza restaurant setup form and printable QR code to join the waitlist", frame: "raw" },
      { src: "/products/flowza/seated.jpg", width: 960, height: 800, label: "Seated", alt: "Flowza guest screen confirming they are seated while table stats update", frame: "raw" },
    ],
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
