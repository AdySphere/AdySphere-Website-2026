export const site = {
  name: "AdySphere Co.",
  url: "https://adysphere.com",
  email: "mallicka@adysphere.com",
  phone: "+971 58 532 3522",
  phoneHref: "tel:+971585323522",
  phoneUk: "+44 7301 839764",
  phoneUkHref: "tel:+447301839764",
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
    slug: "professional-services",
    short: "Services & IT",
    word: "Services",
    name: "Professional services & IT",
    body: "Project margins leak through unbilled changes, idle resources and timesheets that arrive late. We connect quoting, resourcing, delivery and billing so you see margin while you can still protect it.",
    solutions: [
      "Quote to cash in one flow: quoting, resourcing, time and expense, project accounting and billing",
      "Resource planning by skill, availability and margin",
      "Live project margin and utilisation reporting for leadership",
    ],
    platforms: ["Microsoft Dynamics 365 Project Operations", "Microsoft Dynamics 365 Sales", "Power BI", "Zoho for smaller teams"],
    ai: "Drafts project status updates and flags work drifting over budget before the invoice goes out.",
  },
  {
    slug: "commodity-trading",
    short: "Trading",
    word: "Trading",
    name: "Commodity trading",
    body: "Every deal carries its own purchase and sales contracts, terms and exposure. We model the contract lifecycle per deal in Microsoft Dynamics 365, so operations, finance and trading work from the same record.",
    solutions: [
      "Per-deal contract lifecycle linking purchase and sales",
      "Shipments, documents and invoicing tied back to each deal",
      "Position and exposure reporting that finance and trading both trust",
    ],
    platforms: ["Microsoft Dynamics 365 Finance & Operations", "Power Platform", "Custom deal capture applications"],
    ai: "Reads contracts and shipping documents, checks the terms against the deal record and flags mismatches for review.",
  },
  {
    slug: "manufacturing-food",
    short: "Manufacturing",
    word: "Manufacturing",
    name: "Manufacturing & food",
    body: "Planning, procurement, quality and inventory pull in different directions. We bring them into one supply chain system, with traceability and the reporting your auditors and customers ask for.",
    solutions: [
      "Planning, procurement, production and inventory in one system",
      "Batch and lot traceability from supplier to customer",
      "Quality checks and audit-ready reporting",
    ],
    platforms: ["Microsoft Dynamics 365 Supply Chain Management", "Microsoft Dynamics 365 Business Central", "Zoho Inventory"],
    ai: "Spots demand shifts and supplier delays early, and suggests reorder changes for a planner to approve.",
  },
  {
    slug: "real-estate",
    short: "Real estate",
    word: "Real estate",
    name: "Real estate",
    body: "Leases, projects, contractors and service requests usually live in separate tools. We bring them together so asset, project and finance teams stop reconciling each other's spreadsheets.",
    solutions: [
      "Leases, tenancies and renewals in one place",
      "Projects and contractors tracked against budget",
      "Service requests and maintenance connected to the asset and to finance",
    ],
    platforms: ["Microsoft Dynamics 365 Customer Service", "Power Apps", "Custom applications"],
    ai: "Triages incoming service requests and summarises lease terms for asset and finance teams.",
  },
  {
    slug: "field-service",
    short: "Field service",
    word: "Field service",
    name: "Field service businesses",
    body: "Engineers, parts, contracts and SLAs need to meet on the right site at the right time. We set up work orders, scheduling and mobile working, and connect them to finance so every visit is billed.",
    solutions: [
      "Work orders, scheduling and dispatch",
      "Mobile working for engineers, with parts and asset history",
      "Service contracts and SLAs billed through finance",
    ],
    platforms: ["Microsoft Dynamics 365 Field Service", "Power Apps", "Zoho for smaller teams"],
    ai: "Briefs engineers with the job history and suggests schedules that respect SLAs and travel time.",
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
