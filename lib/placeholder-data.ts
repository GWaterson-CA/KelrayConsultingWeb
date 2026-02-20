import type { CaseStudy } from "@/lib/types";

export const PLACEHOLDER_CASE_STUDIES: CaseStudy[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    title: "Mid-Size HVAC Supplier Automated Quote Prep",
    slug: "mid-size-hvac-supplier-automated-quote-prep",
    summary:
      "Automated quote preparation and product lookup to cut estimator prep time and improve win-rate on high-volume bids.",
    industry: "Manufacturing & Distribution",
    problem:
      "Estimators were spending too much time gathering specs, checking inventory, and stitching quote documents from disconnected systems.",
    approach:
      "Mapped the quoting workflow, integrated ERP inventory data, and built an AI-assisted quote preparation workflow with guardrails and human approval checkpoints.",
    deliverables: [
      "AI capability audit and workflow map",
      "Quote assistant integrated with ERP",
      "Prompt library and usage playbook",
      "Team training for estimators and sales ops",
    ],
    tools: ["OpenAI", "Zapier", "NetSuite API", "Google Sheets"],
    results:
      "The team reduced quote prep bottlenecks and shipped consistent proposal packs in hours instead of days.",
    metrics: [
      { label: "Quote prep time", value: "-42%", outcomeType: "time_saved" },
      { label: "Quote cycle speed", value: "2.1x", outcomeType: "revenue_growth" },
      { label: "Missed line-item errors", value: "-31%", outcomeType: "risk_reduction" },
    ],
    testimonial_quote:
      "We didn't need to hire another estimator. We fixed the workflow and unlocked more output from the team we already had.",
    featured: true,
    published: true,
    published_at: "2025-06-11T00:00:00.000Z",
    created_at: "2025-06-01T00:00:00.000Z",
    updated_at: "2025-06-11T00:00:00.000Z",
    tags: ["automation", "quoting", "erp integration"],
    media: [
      {
        id: "media-1",
        case_study_id: "11111111-1111-1111-1111-111111111111",
        type: "image",
        url: "/images/case-study-hvac.svg",
        alt: "Abstract dashboard illustrating automated quoting workflows",
        sort_order: 1,
      },
      {
        id: "media-2",
        case_study_id: "11111111-1111-1111-1111-111111111111",
        type: "video",
        url: "/videos/case-loop.mp4",
        alt: "Looping AI data flow animation",
        sort_order: 2,
      },
    ],
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    title: "Regional Legal Group Cut Intake Response Time",
    slug: "regional-legal-group-cut-intake-response-time",
    summary:
      "Built a retrieval-based intake assistant and triage process that improved lead handling and reduced manual handoffs.",
    industry: "Professional Services",
    problem:
      "Leads arrived through multiple channels, intake notes were inconsistent, and follow-up response time was hurting conversion.",
    approach:
      "Created an intake decision workflow with prompt-based qualification logic, CRM sync, and daily QA checks for safe responses.",
    deliverables: [
      "Intake process redesign",
      "AI assistant for first-touch responses",
      "CRM workflow automation",
      "Quality checklist and governance policy",
    ],
    tools: ["OpenAI", "HubSpot", "Make", "Notion"],
    results:
      "The firm moved from ad hoc intake to a structured, measurable process that improved speed and consistency.",
    metrics: [
      { label: "First response time", value: "-67%", outcomeType: "time_saved" },
      { label: "Qualified consults", value: "+24%", outcomeType: "revenue_growth" },
      { label: "Manual rework", value: "-38%", outcomeType: "cost_reduced" },
    ],
    testimonial_quote:
      "Our team has fewer dropped leads and far better context before each consultation call.",
    featured: true,
    published: true,
    published_at: "2025-05-07T00:00:00.000Z",
    created_at: "2025-04-28T00:00:00.000Z",
    updated_at: "2025-05-07T00:00:00.000Z",
    tags: ["intake", "crm", "llm workflow"],
    media: [
      {
        id: "media-3",
        case_study_id: "22222222-2222-2222-2222-222222222222",
        type: "image",
        url: "/images/case-study-legal.svg",
        alt: "Workflow diagram showing AI-powered client intake",
        sort_order: 1,
      },
    ],
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    title: "Construction Services Firm Standardized Reporting",
    slug: "construction-services-firm-standardized-reporting",
    summary:
      "Unified project reporting and internal knowledge retrieval to improve delivery confidence across project managers.",
    industry: "Construction",
    problem:
      "Project updates, safety notes, and client reports were fragmented across spreadsheets and chat threads.",
    approach:
      "Implemented a central data workflow and generated standardized report outputs from structured templates and field data.",
    deliverables: [
      "Data workflow architecture",
      "Template-driven reporting automation",
      "Knowledge base indexing",
      "Manager onboarding sessions",
    ],
    tools: ["OpenAI", "Airtable", "Power BI", "Microsoft Teams"],
    results:
      "Managers reduced weekly admin load and clients got clearer, more consistent project updates.",
    metrics: [
      { label: "Weekly reporting time", value: "-11 hrs/wk", outcomeType: "time_saved" },
      { label: "Status escalation incidents", value: "-29%", outcomeType: "risk_reduction" },
      { label: "Operational overhead", value: "-18%", outcomeType: "cost_reduced" },
    ],
    testimonial_quote:
      "The reporting process finally feels like a system instead of heroics.",
    featured: true,
    published: true,
    published_at: "2025-03-18T00:00:00.000Z",
    created_at: "2025-03-01T00:00:00.000Z",
    updated_at: "2025-03-18T00:00:00.000Z",
    tags: ["internal tooling", "reporting", "knowledge base"],
    media: [
      {
        id: "media-4",
        case_study_id: "33333333-3333-3333-3333-333333333333",
        type: "image",
        url: "/images/case-study-construction.svg",
        alt: "Data dashboard with construction project analytics",
        sort_order: 1,
      },
      {
        id: "media-5",
        case_study_id: "33333333-3333-3333-3333-333333333333",
        type: "video",
        url: "/videos/case-loop.mp4",
        alt: "Looping system dashboard animation",
        sort_order: 2,
      },
    ],
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    title: "DTC Brand Built AI Support Copilot",
    slug: "dtc-brand-built-ai-support-copilot",
    summary:
      "Deployed a support copilot for agents to resolve repetitive tickets and draft high-quality responses faster.",
    industry: "E-commerce",
    problem:
      "Support agents were repeating policy lookups and response drafting, causing backlog and response inconsistency.",
    approach:
      "Built a support copilot with knowledge retrieval, policy prompts, and escalation routes for sensitive issues.",
    deliverables: [
      "Support workflow audit",
      "Copilot interface and retrieval layer",
      "Escalation playbook",
      "Agent training and scorecards",
    ],
    tools: ["OpenAI", "Shopify", "Gorgias", "Klaviyo"],
    results:
      "Support quality improved while backlog dropped during seasonal peaks.",
    metrics: [
      { label: "Average handling time", value: "-36%", outcomeType: "time_saved" },
      { label: "Ticket backlog", value: "-44%", outcomeType: "cost_reduced" },
      { label: "CSAT", value: "+11 pts", outcomeType: "revenue_growth" },
    ],
    testimonial_quote:
      null,
    featured: false,
    published: true,
    published_at: "2025-08-02T00:00:00.000Z",
    created_at: "2025-07-20T00:00:00.000Z",
    updated_at: "2025-08-02T00:00:00.000Z",
    tags: ["support", "knowledge retrieval", "operations"],
    media: [
      {
        id: "media-6",
        case_study_id: "44444444-4444-4444-4444-444444444444",
        type: "image",
        url: "/images/case-study-dtc.svg",
        alt: "Customer support operations dashboard",
        sort_order: 1,
      },
    ],
  },
  {
    id: "55555555-5555-5555-5555-555555555555",
    title: "Insurance Brokerage Improved Renewal Ops",
    slug: "insurance-brokerage-improved-renewal-ops",
    summary:
      "Introduced AI-assisted renewal checklists and document prep to reduce compliance risk and admin burden.",
    industry: "Insurance",
    problem:
      "Renewal specialists were overloaded by repetitive document review and deadline coordination.",
    approach:
      "Designed a staged AI workflow with review checkpoints, policy comparisons, and automatic reminder triggers.",
    deliverables: [
      "Renewal process redesign",
      "Checklist automation",
      "Document assistant",
      "Governance and QA controls",
    ],
    tools: ["OpenAI", "Microsoft 365", "Zapier", "SharePoint"],
    results:
      "The brokerage processed renewals more predictably with lower admin burden and fewer deadline misses.",
    metrics: [
      { label: "Renewal prep time", value: "-33%", outcomeType: "time_saved" },
      { label: "Compliance exceptions", value: "-27%", outcomeType: "risk_reduction" },
      { label: "Ops cost", value: "-14%", outcomeType: "cost_reduced" },
    ],
    testimonial_quote:
      null,
    featured: false,
    published: true,
    published_at: "2025-09-09T00:00:00.000Z",
    created_at: "2025-08-25T00:00:00.000Z",
    updated_at: "2025-09-09T00:00:00.000Z",
    tags: ["compliance", "insurance", "automation"],
    media: [
      {
        id: "media-7",
        case_study_id: "55555555-5555-5555-5555-555555555555",
        type: "image",
        url: "/images/case-study-insurance.svg",
        alt: "Renewal operations workflow graphic",
        sort_order: 1,
      },
    ],
  },
];
