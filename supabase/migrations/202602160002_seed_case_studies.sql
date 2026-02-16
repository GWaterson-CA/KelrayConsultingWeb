insert into public.case_studies (
  id,
  title,
  slug,
  summary,
  industry,
  problem,
  approach,
  deliverables,
  tools,
  results,
  metrics,
  testimonial_quote,
  featured,
  published,
  published_at,
  tags,
  created_at,
  updated_at
)
values
  (
    '11111111-1111-1111-1111-111111111111',
    'Mid-Size HVAC Supplier Automated Quote Prep',
    'mid-size-hvac-supplier-automated-quote-prep',
    'Automated quote preparation and product lookup to cut estimator prep time and improve win-rate on high-volume bids.',
    'Manufacturing & Distribution',
    'Estimators were spending too much time gathering specs, checking inventory, and stitching quote documents from disconnected systems.',
    'Mapped the quoting workflow, integrated ERP inventory data, and built an AI-assisted quote preparation workflow with guardrails and human approval checkpoints.',
    'AI capability audit and workflow map
Quote assistant integrated with ERP
Prompt library and usage playbook
Team training for estimators and sales ops',
    'OpenAI
Supabase
Zapier
NetSuite API',
    'The team reduced quote prep bottlenecks and shipped consistent proposal packs in hours instead of days.',
    '[{"label":"Quote prep time","value":"-42%","outcomeType":"time_saved"},{"label":"Quote cycle speed","value":"2.1x","outcomeType":"revenue_growth"},{"label":"Missed line-item errors","value":"-31%","outcomeType":"risk_reduction"}]'::jsonb,
    'We didn''t need to hire another estimator. We fixed the workflow and unlocked more output from the team we already had.',
    true,
    true,
    '2025-06-11T00:00:00.000Z',
    '{automation,quoting,"erp integration"}',
    '2025-06-01T00:00:00.000Z',
    '2025-06-11T00:00:00.000Z'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Regional Legal Group Cut Intake Response Time',
    'regional-legal-group-cut-intake-response-time',
    'Built a retrieval-based intake assistant and triage process that improved lead handling and reduced manual handoffs.',
    'Professional Services',
    'Leads arrived through multiple channels, intake notes were inconsistent, and follow-up response time was hurting conversion.',
    'Created an intake decision workflow with prompt-based qualification logic, CRM sync, and daily QA checks for safe responses.',
    'Intake process redesign
AI assistant for first-touch responses
CRM workflow automation
Quality checklist and governance policy',
    'OpenAI
HubSpot
Supabase
Make',
    'The firm moved from ad hoc intake to a structured, measurable process that improved speed and consistency.',
    '[{"label":"First response time","value":"-67%","outcomeType":"time_saved"},{"label":"Qualified consults","value":"+24%","outcomeType":"revenue_growth"},{"label":"Manual rework","value":"-38%","outcomeType":"cost_reduced"}]'::jsonb,
    'Our team has fewer dropped leads and far better context before each consultation call.',
    true,
    true,
    '2025-05-07T00:00:00.000Z',
    '{intake,crm,"llm workflow"}',
    '2025-04-28T00:00:00.000Z',
    '2025-05-07T00:00:00.000Z'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Construction Services Firm Standardized Reporting',
    'construction-services-firm-standardized-reporting',
    'Unified project reporting and internal knowledge retrieval to improve delivery confidence across project managers.',
    'Construction',
    'Project updates, safety notes, and client reports were fragmented across spreadsheets and chat threads.',
    'Implemented a central data workflow and generated standardized report outputs from structured templates and field data.',
    'Data workflow architecture
Template-driven reporting automation
Knowledge base indexing
Manager onboarding sessions',
    'OpenAI
Airtable
Supabase
Power BI',
    'Managers reduced weekly admin load and clients got clearer, more consistent project updates.',
    '[{"label":"Weekly reporting time","value":"-11 hrs/wk","outcomeType":"time_saved"},{"label":"Status escalation incidents","value":"-29%","outcomeType":"risk_reduction"},{"label":"Operational overhead","value":"-18%","outcomeType":"cost_reduced"}]'::jsonb,
    'The reporting process finally feels like a system instead of heroics.',
    true,
    true,
    '2025-03-18T00:00:00.000Z',
    '{"internal tooling",reporting,"knowledge base"}',
    '2025-03-01T00:00:00.000Z',
    '2025-03-18T00:00:00.000Z'
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'DTC Brand Built AI Support Copilot',
    'dtc-brand-built-ai-support-copilot',
    'Deployed a support copilot for agents to resolve repetitive tickets and draft high-quality responses faster.',
    'E-commerce',
    'Support agents were repeating policy lookups and response drafting, causing backlog and response inconsistency.',
    'Built a support copilot with knowledge retrieval, policy prompts, and escalation routes for sensitive issues.',
    'Support workflow audit
Copilot interface and retrieval layer
Escalation playbook
Agent training and scorecards',
    'OpenAI
Shopify
Gorgias
Supabase',
    'Support quality improved while backlog dropped during seasonal peaks.',
    '[{"label":"Average handling time","value":"-36%","outcomeType":"time_saved"},{"label":"Ticket backlog","value":"-44%","outcomeType":"cost_reduced"},{"label":"CSAT","value":"+11 pts","outcomeType":"revenue_growth"}]'::jsonb,
    null,
    false,
    true,
    '2025-08-02T00:00:00.000Z',
    '{support,"knowledge retrieval",operations}',
    '2025-07-20T00:00:00.000Z',
    '2025-08-02T00:00:00.000Z'
  ),
  (
    '55555555-5555-5555-5555-555555555555',
    'Insurance Brokerage Improved Renewal Ops',
    'insurance-brokerage-improved-renewal-ops',
    'Introduced AI-assisted renewal checklists and document prep to reduce compliance risk and admin burden.',
    'Insurance',
    'Renewal specialists were overloaded by repetitive document review and deadline coordination.',
    'Designed a staged AI workflow with review checkpoints, policy comparisons, and automatic reminder triggers.',
    'Renewal process redesign
Checklist automation
Document assistant
Governance and QA controls',
    'OpenAI
Supabase
Microsoft 365
Zapier',
    'The brokerage processed renewals more predictably with lower admin burden and fewer deadline misses.',
    '[{"label":"Renewal prep time","value":"-33%","outcomeType":"time_saved"},{"label":"Compliance exceptions","value":"-27%","outcomeType":"risk_reduction"},{"label":"Ops cost","value":"-14%","outcomeType":"cost_reduced"}]'::jsonb,
    null,
    false,
    true,
    '2025-09-09T00:00:00.000Z',
    '{compliance,insurance,automation}',
    '2025-08-25T00:00:00.000Z',
    '2025-09-09T00:00:00.000Z'
  )
on conflict (slug)
do update set
  title = excluded.title,
  summary = excluded.summary,
  industry = excluded.industry,
  problem = excluded.problem,
  approach = excluded.approach,
  deliverables = excluded.deliverables,
  tools = excluded.tools,
  results = excluded.results,
  metrics = excluded.metrics,
  testimonial_quote = excluded.testimonial_quote,
  featured = excluded.featured,
  published = excluded.published,
  published_at = excluded.published_at,
  tags = excluded.tags,
  updated_at = excluded.updated_at;

insert into public.case_study_media (id, case_study_id, type, url, alt, sort_order)
values
  ('a1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'image', '/images/case-study-hvac.svg', 'Abstract dashboard illustrating automated quoting workflows', 1),
  ('a1111111-1111-1111-1111-111111111112', '11111111-1111-1111-1111-111111111111', 'video', '/videos/case-loop.mp4', 'Looping AI data flow animation', 2),
  ('a2222222-2222-2222-2222-222222222221', '22222222-2222-2222-2222-222222222222', 'image', '/images/case-study-legal.svg', 'Workflow diagram showing AI-powered client intake', 1),
  ('a3333333-3333-3333-3333-333333333331', '33333333-3333-3333-3333-333333333333', 'image', '/images/case-study-construction.svg', 'Data dashboard with construction project analytics', 1),
  ('a3333333-3333-3333-3333-333333333332', '33333333-3333-3333-3333-333333333333', 'video', '/videos/case-loop.mp4', 'Looping system dashboard animation', 2),
  ('a4444444-4444-4444-4444-444444444441', '44444444-4444-4444-4444-444444444444', 'image', '/images/case-study-dtc.svg', 'Customer support operations dashboard', 1),
  ('a5555555-5555-5555-5555-555555555551', '55555555-5555-5555-5555-555555555555', 'image', '/images/case-study-insurance.svg', 'Renewal operations workflow graphic', 1)
on conflict (id) do update set
  case_study_id = excluded.case_study_id,
  type = excluded.type,
  url = excluded.url,
  alt = excluded.alt,
  sort_order = excluded.sort_order;
