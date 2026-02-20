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

export type TrustedTeam = {
  name: string;
  website?: string;
  logoUrl?: string;
};

export const trustedTeams: TrustedTeam[] = [
  {
    name: "Kelray Heating",
    website: "https://www.kelrayheating.ca",
    logoUrl: "https://kelrayheating.ca/cdn/shop/files/Kelray_outdoor_heating.png?v=1748285830&width=600",
  },
  {
    name: "FrothMonkey",
    website: "https://www.frothmonkey.com",
    logoUrl: "https://www.frothmonkey.com/FrothMonkey%20Logo%20Blue.png",
  },
  {
    name: "MetalQuoteHQ",
  },
  {
    name: "MayDay Metals",
  },
  {
    name: "OSO Industries",
    website: "https://www.osoindustries.com",
    logoUrl:
      "https://static1.squarespace.com/static/64a495790ac7724e5f2709b7/t/67847fa7f6a7485ca78d940c/1736736679217/LOGO+copy.png?format=1500w",
  },
  {
    name: "Business Innovation Society of Sea to Sky",
    website: "https://www.biss2s.com",
    logoUrl:
      "https://static.wixstatic.com/media/512006_e0324144a65a475498b1f3da1ada90c6~mv2.png/v1/fill/w_1200,h_244,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/512006_e0324144a65a475498b1f3da1ada90c6~mv2.png",
  },
  {
    name: "Vista Security",
    website: "https://www.vistasecurity.ca",
    logoUrl:
      "https://static1.squarespace.com/static/608b2c7e845e223dfb473325/t/60f0db492606b657d3530810/1626397513149/Vistasecurityca_print.png?format=1500w",
  },
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
