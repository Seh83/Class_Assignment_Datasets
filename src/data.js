export const services = [
  {
    name: 'Industrial AI Agent Builder',
    slug: 'industrial-ai-agent-builder',
    blurb: 'Configurable AI agents for line-side decisioning and operator copilots.',
    features: [
      'No-code agent canvas with reusable skills and guardrails',
      'Connectors to PLCs, MES, and historian data',
      'Inline safety checks with policy-driven actions'
    ],
    workflows: [
      'Operator copilots surface root causes with telemetry context',
      'Automated set-point tuning across lines based on quality signals',
      'Shift handover digests with action tracking'
    ],
    benefits: [
      'Reduce unplanned downtime through faster resolutions',
      'Standardize best-practice responses across sites',
      'Auditable, policy-compliant automation'
    ]
  },
  {
    name: 'Predictive Maintenance',
    slug: 'predictive-maintenance',
    blurb: 'Asset-level health scoring, anomaly detection, and maintenance playbooks.',
    features: [
      'Model library for rotating equipment, compressors, and packaging lines',
      'Auto-retraining with data drift and performance monitoring',
      'Technician-ready recommendations with parts & labor forecasting'
    ],
    workflows: [
      'Condition-based maintenance scheduling with live risk scoring',
      'Automated ticketing into CMMS with rich diagnostics',
      'Escalation routing for critical alarms with SLA tracking'
    ],
    benefits: [
      'Extend asset life and reduce emergency repairs',
      'Increase first-time fix rates',
      'Optimize maintenance spend with clear ROI'
    ]
  },
  {
    name: 'Quality Control Automation',
    slug: 'quality-control-automation',
    blurb: 'Inline inspection and automated dispositioning with AI vision and signals.',
    features: [
      'Multimodal inspection combining cameras and process data',
      'Edge-to-cloud deployment options with OTA updates',
      'Automated containment and rework routing'
    ],
    workflows: [
      'Real-time visual QA with defect classification and trends',
      'Automated quarantine rules for suspect lots',
      'Feedback loop into recipe and parameter optimization'
    ],
    benefits: [
      'Increase first-pass yield',
      'Reduce scrap and rework labor',
      'Shorten investigation time for deviations'
    ]
  },
  {
    name: 'Energy Management',
    slug: 'energy-management',
    blurb: 'Optimization of energy-intensive operations with AI-driven load shaping.',
    features: [
      'Real-time load forecasting and tariff-aware scheduling',
      'Automated demand response with site safety controls',
      'Carbon-aware production planning dashboards'
    ],
    workflows: [
      'Peak shaving strategies across plants and microgrids',
      'Smart HVAC, boiler, and chiller orchestration',
      'Energy performance contracts with savings verification'
    ],
    benefits: [
      'Lower energy spend and carbon intensity',
      'Avoid peak penalties without sacrificing throughput',
      'Transparency for sustainability reporting'
    ]
  },
  {
    name: 'Digital Twin Simulator',
    slug: 'digital-twin-simulator',
    blurb: 'Physics and data-driven twins to rehearse scenarios before they hit production.',
    features: [
      'Hybrid physics/ML models for critical assets',
      'Scenario sandboxing for what-if analysis',
      'Synthetic data generation for rare events'
    ],
    workflows: [
      'Line changeover rehearsal with throughput and quality projections',
      'Safety interlock validation before OTA updates',
      'New product introduction planning with staffing simulations'
    ],
    benefits: [
      'De-risk operational changes',
      'Accelerate commissioning cycles',
      'Improve confidence with validated playbooks'
    ]
  },
  {
    name: 'Pulse: Unified Industrial AI Platform',
    slug: 'pulse-platform',
    blurb: 'Operate every Sync.ai capability from one orchestration layer.',
    features: [
      'Multi-agent orchestration with governance',
      'Unified dashboards for reliability, quality, and energy',
      'Secure data fabric for streaming and historical signals'
    ],
    workflows: [
      'Cross-domain automation chains connecting QA to maintenance and energy',
      'Command center with real-time situational awareness',
      'Lifecycle management for agents, models, and pipelines'
    ],
    benefits: [
      'One platform to coordinate every plant',
      'Common observability and compliance layer',
      'Faster rollout with reusable patterns'
    ]
  }
];

export const pulseSections = [
  {
    title: 'Multi-Agent Orchestration',
    description: 'Compose guardrailed agents that hand off tasks across reliability, quality, and energy domains.',
    diagram: 'Agents orchestrated with role-based policies and escalation rules.'
  },
  {
    title: 'Dashboards & Command Center',
    description: 'Unified view of fleet health, production KPIs, alerts, and operator responses.',
    diagram: 'Live situational dashboard with shift-level snapshots.'
  },
  {
    title: 'Data Pipelines',
    description: 'Stream, store, and transform operational data with built-in governance and lineage.',
    diagram: 'Ingest -> Model -> Action pipelines with observability overlays.'
  },
  {
    title: 'Monitoring & Compliance',
    description: 'Model drift, SLA adherence, and safety checks built into every workflow.',
    diagram: 'Drift monitors, SLA timers, and audit-ready reports.'
  }
];
