export const site = {
  name: "AdySphere Co.",
  url: "https://adysphere.com",
  email: "mallicka@adysphere.com",
  phone: "+971 58 532 3522",
  phoneHref: "tel:+971585323522",
  phoneUk: "+44 7301 839764",
  phoneUkHref: "tel:+447301839764",
  phoneIn: "+91 93212 69873",
  phoneInHref: "tel:+919321269873",
  /** Where we work, as shown on the contact page and in the footer. */
  location: "U.A.E | U.K. | India",
  linkedin: "https://www.linkedin.com/company/adysphere-co/",
  instagram: "https://www.instagram.com/adysphere/",
  positioning: "We implement Microsoft Dynamics 365 and Power Platform properly, then enable AI that removes work instead of adding it.",
  description:
    "Dubai-based Microsoft AI Cloud Partner implementing Microsoft Dynamics 365 and Power Platform, and enabling AI that removes work across your departments.",
} as const;

export const founder = {
  name: "Adyasha Mallick",
  title: "Founder & CEO",
  shortBio:
    "Techno-functional Microsoft Dynamics 365 consultant who designs the solution and stays with it to go-live. BE Computer Science from BITS Pilani (First Division with Distinction) and a PGCert in Data Intensive Astrophysics from Cardiff University.",
  linkedin: "https://www.linkedin.com/in/adyasha-mallick-adcm/",
  // TODO: add /public/people/adyasha-mallick.jpg (4:5 portrait) and set the path here. Until then no photo shows.
  photo: "",
  /** The founder's vision, shown as a quote on the homepage. Edit freely. */
  vision:
    "The revolution isn't using AI. It's enabling it: built into how your business runs, so it sharpens strategy, optimises processes and closes the gaps where data and money leak.",
} as const;

export const nav = [
  { href: "/solutions", label: "Solutions" },
  { href: "/ai-enablement", label: "AI Enablement" },
  { href: "/industries", label: "Industries" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/research", label: "Research" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
] as const;

/**
 * Artwork the hero turns into particles: the AdySphere circuit face. Bright (teal) pixels become particles;
 * the background is transparent. hero-face.png is the full-quality source; the site serves the lighter WebP.
 */
export const heroArt = "/brand/hero-face.webp";

/**
 * Background video for the Dubai skyline section. Leave null to show the code-drawn skyline.
 * To use real footage: add an MP4 (H.264, 1920x1080, 10-20 s loop, under ~6 MB) and a poster frame to /public/media,
 * then set e.g. { src: "/media/dubai-skyline.mp4", poster: "/media/dubai-skyline.jpg" }.
 * Free licensed sources: pexels.com/search/videos/dubai%20skyline, pixabay.com/videos/search/dubai.
 */
export const cityVideo: { src: string; poster: string } | null = null;

/** One label for the booking intent, used everywhere. */
export const bookCta = { href: "/contact", label: "Book a Business X-Ray" } as const;

/** The departments AI is enabled across, shown as nodes in the hero. */
export const departments = ["Projects", "Finance", "Sales", "Service", "Supply Chain"] as const;

export const departmentExamples: Record<(typeof departments)[number], { question: string; action: string }> = {
  Projects: {
    question: "Why is the margin on this project slipping?",
    action:
      "Reads timesheets, change requests and vendor bills together, finds the unbilled change, and drafts the change order for the project manager to approve.",
  },
  Finance: {
    question: "Which projects will go over budget this month?",
    action:
      "Flags projects heading over budget before month-end, with the entries driving the overrun, so finance acts before the close instead of explaining it after.",
  },
  Sales: {
    question: "Can we deliver what we are about to quote?",
    action:
      "Checks the quote against resource capacity and past delivery on similar deals, so sales does not promise what the delivery team cannot staff.",
  },
  Service: {
    question: "What does the engineer need before the visit?",
    action:
      "Triages the incoming case, pulls the asset, contract and visit history, and drafts the first response and the work order for review.",
  },
  "Supply Chain": {
    question: "What runs short before the next delivery?",
    action:
      "Watches supplier lead times against open orders and stock, and proposes the re-order with the reason, before the shortage reaches the floor.",
  },
};

export const offers = [
  {
    slug: "business-x-ray",
    step: "Diagnose",
    name: "Business X-Ray",
    summary:
      "An affordable, department-by-department diagnostic of how your business runs today: data, workflows, handoffs and reporting gaps.",
    forWho: "Leadership teams who know something is costing them, but not exactly where, or what to fix first.",
    included: [
      "Interviews and working sessions with each department",
      "Map of your data, systems and the handoffs between teams",
      "Where reporting breaks down and decisions arrive late",
      "Written report with findings per department",
      "Prioritised roadmap: what to fix, in what order, and why",
    ],
    starts: "A scoping call, then a fixed-fee proposal for the X-Ray.",
    href: "/solutions#business-x-ray",
  },
  {
    slug: "implementation",
    step: "Implement",
    name: "Choose the right software for you",
    summary:
      "We specialise in Microsoft Dynamics 365 and Power Platform implementation. We also implement Zoho and build custom applications where your business needs something of its own, because a unique business deserves unique attention.",
    forWho:
      "Companies replacing spreadsheets and disconnected tools, choosing their first proper system, or rescuing a rollout that stalled.",
    included: [
      "Help choosing the right platform for your size, budget and processes",
      "Microsoft Dynamics 365 and Power Platform, designed by a techno-functional consultant",
      "Zoho implementation for teams that need a lighter, faster start",
      "Custom applications for requirements no off-the-shelf product covers",
      "Data migration, integrations, Power BI reporting, training and go-live support",
    ],
    starts: "Usually after a Business X-Ray, or from your existing requirements if you already have them.",
    href: "/solutions#implementation",
  },
  {
    slug: "ai-enablement",
    step: "Enable AI",
    name: "AI Enablement",
    summary:
      "AI built into how your business runs, so it sharpens decisions and removes work instead of creating another tool to check.",
    forWho:
      "Businesses on Microsoft Dynamics 365, and businesses on any other stack, who want AI in production rather than another pilot.",
    included: [
      "AI Enablement Blueprint: where AI pays back first",
      "Already on a Microsoft Dynamics 365 tenant? Microsoft Dynamics 365 AI solutions with Copilot Studio and Power Platform",
      "On other systems? Custom AI architecture built on Claude, designed for your industry",
      "One shared AI layer across departments, not one bot per task",
      "Runs inside your own tenant and cloud, under your security, with a full audit trail",
    ],
    starts: "With an AI Enablement Blueprint: a clear map of where AI pays back first.",
    href: "/ai-enablement",
  },
] as const;

export const modules = [
  {
    name: "Project Operations",
    forWho: "Project-based and professional services firms",
    included: "Quoting, resourcing, time and expense, project accounting and billing in one flow.",
  },
  {
    name: "Sales / Customer Engagement",
    forWho: "B2B sales teams and contract-heavy businesses",
    included: "Pipeline, quotes, contracts and account history that sales and delivery both trust.",
  },
  {
    name: "Customer Service",
    forWho: "Teams handling cases, SLAs and service contracts",
    included: "Case management, entitlements, routing and a single view of the customer.",
  },
  {
    name: "Field Service",
    forWho: "Businesses with engineers, assets and site visits",
    included: "Work orders, scheduling, assets, parts and mobile working for technicians.",
  },
  {
    name: "Finance & Operations: Supply Chain",
    forWho: "Trading, manufacturing and multi-entity groups",
    included: "Procurement, inventory, warehousing and production across legal entities.",
  },
  {
    name: "Business Central",
    forWho: "Growing companies that need a complete ERP without the overhead",
    included: "Finance, sales, purchasing and inventory in one system, ready to scale.",
  },
  {
    name: "Power Platform",
    forWho: "Every Microsoft Dynamics 365 customer",
    included: "Power Apps and Power Automate to close the gaps between systems and teams.",
  },
  {
    name: "Power BI",
    forWho: "Leadership and finance teams",
    included: "Executive dashboards on one semantic model, with role-based access.",
  },
] as const;

export const industries = [
  {
    slug: "trading-manufacturing",
    short: "Trading & manufacturing",
    name: "Trading & manufacturing",
    body: "Deals, purchasing, production and stock pull in different directions, and margin leaks in the gaps. We connect the chain from contract to invoice so operations, trading and finance work from the same record.",
    solutions: [
      "One record per deal, from purchase through production to sale",
      "Planning, procurement, inventory and quality in one supply chain system",
      "Live margin and stock reporting across entities",
    ],
    platforms: ["Microsoft Dynamics 365 Supply Chain Management", "Microsoft Dynamics 365 Finance & Operations", "Power Platform"],
    ai: "Flags deals drifting from their contracted margin, and checks supplier documents against the order.",
    caseStudy: "trading-manufacturing",
  },
  {
    slug: "real-estate",
    short: "Real estate",
    name: "Real estate",
    body: "Leases, assets, contractors and service requests usually live in separate tools. We bring them together so leasing, facilities and finance stop reconciling each other's spreadsheets, and nothing goes unbilled.",
    solutions: [
      "Leases, assets and tenants in one connected record",
      "Service requests and maintenance linked to the asset and to finance",
      "Renewals, escalations and recharges that raise themselves",
    ],
    platforms: ["Microsoft Dynamics 365 Customer Service", "Microsoft Dynamics 365 Finance & Operations", "Power Apps"],
    ai: "Triages service requests by urgency, and summarises lease terms for asset and finance teams.",
    caseStudy: "real-estate",
  },
  {
    slug: "sustainability",
    short: "Sustainability",
    name: "Sustainability",
    body: "Sustainability figures are often gathered once a year by email and spreadsheet, apart from the finance and operations data behind them. We hold them in the same system, with an owner and a source for every number.",
    solutions: [
      "One data model for energy, emissions, waste and suppliers",
      "Collection and validation from meters, invoices and supplier submissions",
      "Reporting built from the same data as finance and operations",
    ],
    platforms: ["Microsoft Dynamics 365 Finance & Operations", "Microsoft Dynamics 365 Business Central", "Custom applications"],
    ai: "Reads utility invoices and supplier documents, and extracts each figure with its source.",
    caseStudy: "sustainability",
  },
  {
    slug: "space-technology",
    short: "Space technology",
    name: "Space technology",
    body: "Long, milestone-driven programmes run across engineering, project and finance tools that do not talk to each other. We link the work to the money, so cost and progress are visible while there is still time to act.",
    solutions: [
      "A work breakdown linked to budget, procurement and time",
      "Milestone billing and funding claims from live data",
      "One programme record for engineering, project and finance teams",
    ],
    platforms: ["Microsoft Dynamics 365 Project Operations", "Microsoft Dynamics 365 Finance & Operations", "Custom applications"],
    ai: "Flags work packages trending over budget or behind schedule, and drafts customer and funder reports.",
    caseStudy: "space-tech",
  },
  {
    slug: "ecommerce-retail",
    short: "E-commerce & retail",
    name: "E-commerce & retail",
    body: "Every storefront and marketplace keeps its own stock, orders and customers, and margin disappears between them. We bring every channel onto one record, connected to finance.",
    solutions: [
      "One product, stock and customer record for every channel",
      "Orders, returns and refunds flowing into stock and finance",
      "Margin visible per order, product and channel",
    ],
    platforms: ["Microsoft Dynamics 365 Business Central", "Zoho suite for smaller operations", "Custom integrations"],
    ai: "Answers customer order questions from live data, and forecasts demand by channel.",
    caseStudy: "ecommerce-retail",
  },
] as const;

export const faqs = [
  {
    q: "Who implements Microsoft Dynamics 365 Project Operations in Dubai?",
    a: "AdySphere Co. is a Dubai-based Microsoft AI Cloud Partner that implements Microsoft Dynamics 365 Project Operations for project-based businesses in the UAE, covering quoting, resourcing, time and expense, project accounting and billing.",
  },
  {
    q: "What does a Business X-Ray include?",
    a: "A Business X-Ray is an affordable, department-by-department diagnostic. We review your data, workflows, handoffs and reporting gaps, then deliver a written report and a prioritised roadmap of what to fix first.",
  },
  {
    q: "What is AI Enablement for Microsoft Dynamics 365?",
    a: "AI Enablement puts AI inside the Microsoft systems your teams already use. One shared AI layer works across departments, inside your own tenant and security roles, and people approve the actions that matter. It starts with an AI Enablement Blueprint.",
  },
  {
    q: "Can you enable AI if we do not use Microsoft Dynamics 365?",
    a: "Yes. For businesses on other ERP and CRM systems, we design custom AI architecture built on Claude, fitted to your industry and connected to your existing systems through APIs. The governance stays the same: your data, your security, a full audit trail.",
  },
  {
    q: "Do you only work with Microsoft Dynamics 365?",
    a: "No. We specialise in Microsoft Dynamics 365 and Power Platform, and we also implement Zoho and build custom applications when a business needs something of its own. For AI, we build on Microsoft Dynamics 365 where you already run it, and design custom AI architecture on Claude where you do not.",
  },
  {
    q: "Do you sell Microsoft licences?",
    a: "Yes. AdySphere Co. is a Microsoft indirect reseller, so licensing, implementation and AI can sit under one roof.",
  },
  {
    q: "Where are you based?",
    a: "AdySphere Co. is based in Dubai and works with clients across the U.A.E, the U.K. and India.",
  },
] as const;
