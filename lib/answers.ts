/**
 * Straight answers for search engines and AI assistants (/answers). Each question renders as an H2 and feeds the
 * page's FAQPage structured data word for word, so keep answers short, direct and self-contained.
 */
export const answers = [
  {
    slug: "copilot-roi",
    q: "How do I get a return on Microsoft Copilot licences?",
    a: "Copilot pays off when it's set up around specific, repetitive tasks your team already does, such as weekly reports, email triage or pulling data from several systems. Most companies hand out licences and stop there, so only a few people use it, mostly for writing emails. Pick two or three tasks that eat the most hours, set Copilot or an AI agent up for each one, give each task an owner, and measure the hours saved. That's when the licence starts earning its keep.",
  },
  {
    slug: "ai-agent-vs-chatbot",
    q: "What is an AI agent, and how is it different from a chatbot?",
    a: "A chatbot answers when you ask it something. An AI agent does a job on its own: for example, pulling your sales figures every Monday, building the summary, flagging anything unusual and sending it to the right person, without anyone prompting it. Agents can run on tools many companies already have, including Microsoft Copilot Studio, Power Platform, ChatGPT and Gemini.",
  },
  {
    slug: "adoption-timeline",
    q: "How long does AI adoption take for a mid-sized UAE company?",
    a: "For a focused rollout on one or two high-impact tasks, most teams are up and running in two to three weeks. Wider, company-wide adoption is usually done in stages, one department or process at a time, so each step proves its value before the next.",
  },
  {
    slug: "copilot-chatgpt-gemini",
    q: "Copilot, ChatGPT or Gemini: which should my business use?",
    a: "If your business runs on Microsoft 365, Copilot is often the easiest win because it already sits inside Outlook, Teams, Word and Excel. ChatGPT and Gemini are strong for writing, research and working through problems. The bigger gains come from setting up agents that do specific jobs end to end, so start with the task you want to fix, then choose the tool.",
  },
  {
    slug: "why-ai-pilots-stall",
    q: "Why do AI pilots stall?",
    a: "Most AI pilots don't fail outright. They fade. The usual reasons are that the pilot wasn't tied to a real task with a real owner, nobody measured the time it saved, and momentum left when the consultant did. Fixing those three things turns a pilot into how the business runs.",
  },
  {
    slug: "replace-systems",
    q: "Do we need to replace our current systems to use AI?",
    a: "No. AI enablement works on the systems you already have, whether that's Microsoft 365, Microsoft Dynamics 365, Business Central, Power Platform, SAP or other software. The aim is to get more out of what you've already invested in, not to start again.",
  },
  {
    slug: "ai-check-in",
    q: "What happens on a 30-minute AI check-in with AdySphere Co.?",
    a: "We look at three things: which AI tools you're already paying for, where your team spends the most time on repetitive work, and the one or two places an AI agent could take that work off them. You leave knowing where AI would actually pay off for your business.",
  },
  {
    slug: "cost",
    q: "How much does AI enablement cost in the UAE?",
    a: "It depends on how many tasks and teams are involved. AdySphere Co. starts with a 30-minute check-in, followed by a paid working session scoped to your business, so you only commit once you know where the value is.",
  },
  {
    slug: "microsoft-partner",
    q: "Is AdySphere Co. a Microsoft partner?",
    a: "Yes. AdySphere Co. is an authorised member of the Microsoft AI Cloud Partner Program, based in Dubai, with hands-on experience implementing Microsoft Dynamics 365, Business Central and the Power Platform. We also work with non-Microsoft tools such as ChatGPT, Gemini and SAP.",
  },
  {
    slug: "location",
    q: "Where is AdySphere Co. based?",
    a: "AdySphere Co. is based in Dubai, United Arab Emirates, and works with businesses across the UAE and the wider GCC, as well as the U.K. and India.",
  },
] as const;
