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
      "We look at how your business runs today and pinpoint exactly where AI will save the most time and money. You get a clear plan, not a generic report.",
  },
  {
    icon: GraduationCap,
    title: "Team Training & Workshops",
    description:
      "Hands-on sessions tailored to each role — managers, operations, front-line staff. Your team learns to use AI confidently in their actual day-to-day work.",
  },
  {
    icon: Workflow,
    title: "Process Automation",
    description:
      "We take the repetitive tasks your team dreads and automate them — quoting, data entry, reporting, follow-ups — so your people can focus on higher-value work.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Custom AI Tools",
    description:
      "The tools you've always wished existed but couldn't find off the shelf. We build them to fit how your team already works, not the other way around.",
  },
  {
    icon: Puzzle,
    title: "Systems Integration",
    description:
      "Connect your existing software — CRM, accounting, project management — so information flows automatically and AI can work across your whole business.",
  },
  {
    icon: Database,
    title: "Data & Reporting",
    description:
      "Get your business data organized so AI actually has something useful to work with. Better data in means better decisions out.",
  },
];

export const processTimeline = [
  { title: "Discover", detail: "We learn how your business works, what's eating up time, and where the biggest opportunities are." },
  { title: "Recommend", detail: "You get a clear roadmap of what to do first, what it'll cost, and what results to expect." },
  { title: "Pilot", detail: "We start with one quick win so you can see real value before committing to anything bigger." },
  { title: "Build", detail: "We build and connect the tools, automations, and workflows your team needs." },
  { title: "Train", detail: "Your team gets hands-on training so they're confident using everything we've built." },
  { title: "Improve", detail: "We keep optimizing based on what's working and what your team is telling us." },
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
    title: "Your business comes first",
    description: "We focus on what saves you time and money — not on shiny demos or buzzwords.",
  },
  {
    icon: Building2,
    title: "We work like part of your team",
    description: "We learn your business, work within your constraints, and design around how your people actually operate.",
  },
  {
    icon: Bot,
    title: "Built to last, not to depend on us",
    description: "Everything we build is designed so your team can own, use, and improve it after we hand it off.",
  },
];
