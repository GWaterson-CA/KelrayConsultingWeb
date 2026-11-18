export const BRAND = {
  name: "Ascent Business Solutions",
  shortName: "Ascent",
  domain: "ascentbusinesssolutions.ca",
  siteUrl: "https://www.ascentbusinesssolutions.ca",
  email: "hello@ascentbusinesssolutions.ca",
  tagline: "Your outsourced AI specialist — custom tools, team training, and hands-on implementation.",
  description:
    "Ascent Business Solutions is the AI partner for businesses that want custom tools, confident teams, and real results — without hiring a full-time AI specialist.",
};

// Publish canonical URLs on the same host that serves production traffic.
const configuredUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || BRAND.siteUrl);
if (configuredUrl.hostname === BRAND.domain) configuredUrl.hostname = "www." + BRAND.domain;
export const siteUrl = configuredUrl.origin;
