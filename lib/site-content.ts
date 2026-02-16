import {
  Bot,
  BriefcaseBusiness,
  Building2,
  Database,
  GraduationCap,
  Puzzle,
  Radar,
  Sparkles,
  Workflow,
} from "lucide-react";

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Book" },
  { href: "/contact", label: "Contact" },
];

export const services = [
  {
    icon: Radar,
    title: "AI Capability Review",
    description:
      "We audit workflows, tools, and bottlenecks to identify where AI can move the needle on speed, quality, and margin.",
  },
  {
    icon: GraduationCap,
    title: "Team Training",
    description:
      "Practical workshops for leadership and staff on prompting, workflow design, and governance inside real business use cases.",
  },
  {
    icon: Workflow,
    title: "Process Automation",
    description:
      "Automate repetitive internal processes using LLM workflows, task orchestration, and reliable handoff checkpoints.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Custom AI Tools",
    description:
      "Build fit-for-purpose internal tools that align with how your team already operates instead of forcing a new stack.",
  },
  {
    icon: Puzzle,
    title: "Systems Integration",
    description:
      "Connect CRM, ERP, support, and data systems so AI outputs can actually trigger useful downstream actions.",
  },
  {
    icon: Database,
    title: "Data Workflows",
    description:
      "Design clean data paths and governance so AI has reliable context, traceability, and measurable business outcomes.",
  },
];

export const processTimeline = [
  { title: "Discover", detail: "Map the current state, constraints, and high-value opportunities." },
  { title: "Recommend", detail: "Prioritized roadmap with outcomes, risks, and implementation options." },
  { title: "Pilot", detail: "Fast proof-of-value in one process or team with clear success criteria." },
  { title: "Implement", detail: "Production rollout with integrations, governance, and team ownership." },
  { title: "Train", detail: "Hands-on enablement for staff and management with role-specific workflows." },
  { title: "Iterate", detail: "Continuous optimization using performance metrics and user feedback." },
];

export const logoPlaceholders = [
  "Kelray Heating",
  "FrothMonkey",
  "MetalQuoteHQ",
  "MayDay Metals",
  "Quantum Technologies",
  "Business Innovation Society of Sea to Sky",
];

export const testimonials = [
  {
    quote:
      "We moved from scattered AI experiments to a clear operating system that actually saves our team time every week.",
    name: "COO, Professional Services Firm",
  },
  {
    quote:
      "The engagement paid for itself in one quarter through faster turnaround and lower manual workload.",
    name: "Director of Operations, Distribution Company",
  },
  {
    quote:
      "The training made adoption easy. Teams understood both how to use AI and when not to use it.",
    name: "Founder, Multi-location Services Business",
  },
];

export const values = [
  {
    icon: Sparkles,
    title: "Business-First AI",
    description: "We optimize for measurable business outcomes, not novelty demos.",
  },
  {
    icon: Building2,
    title: "Embedded Partnership",
    description: "We work like an extension of your team and design around your constraints.",
  },
  {
    icon: Bot,
    title: "Practical Adoption",
    description: "Solutions are built for maintainability, handoff, and long-term internal ownership.",
  },
];
