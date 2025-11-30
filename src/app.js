import { Router } from './router.js';
import { renderTopbar, renderFooter } from './components/layout.js';
import { services, pulseSections } from './data.js';
import { navigate } from './navigation.js';

const app = document.getElementById('app');

const kpis = [
  { pill: 'Reliability', value: '99.98%', label: 'Fleet uptime across monitored assets', trend: '+0.3% this week' },
  { pill: 'Predictive maintenance', value: '126', label: 'Anomalies intercepted before downtime', trend: '+18% MoM' },
  { pill: 'Energy management', value: '14.2%', label: 'Load trimmed during peak windows', trend: '-1.2MW shaved' },
  { pill: 'Digital twins', value: '24', label: 'Production twins synchronized and ready', trend: '+4 new NPI models' }
];

const signalCards = [
  { title: 'Agent Builder', value: '8 copilots live', tag: 'Shift-ready assistance', status: 'healthy' },
  { title: 'Predictive Maintenance', value: '126 events auto-routed', tag: '12 assets guarded', status: 'healthy' },
  { title: 'Energy Management', value: '14.2% load relief', tag: 'DR-ready', status: 'watch' },
  { title: 'Digital Twin Simulator', value: '24 twins synced', tag: 'Scenario lab', status: 'healthy' }
];

const activityFeed = [
  { title: 'Compressor 7 anomaly contained', detail: 'Predictive Maintenance • SLA 3m', tag: 'Line 12' },
  { title: 'Load shift executed for tariff window', detail: 'Energy Management • Demand response', tag: 'Grid ops' },
  { title: 'Digital twin rehearsal approved', detail: 'Digital Twin Simulator • Runbook 4', tag: 'NPI' },
  { title: 'Agent Builder published new SOP', detail: 'Industrial AI Agent Builder • Shift A', tag: 'Line 5' }
];

const serviceSignals = {
  'industrial-ai-agent-builder': { live: '8 copilots live', owner: 'Ops copilots', state: 'healthy' },
  'predictive-maintenance': { live: '126 events guarded', owner: 'Reliability pod', state: 'healthy' },
  'quality-control-automation': { live: 'FPY +4.6%', owner: 'Quality lab', state: 'healthy' },
  'energy-management': { live: '14.2% shaved', owner: 'Energy desk', state: 'watch' },
  'digital-twin-simulator': { live: '24 twins synced', owner: 'Simulation team', state: 'healthy' },
  'pulse-platform': { live: 'Fleet linked', owner: 'Command center', state: 'healthy' }
};

const serviceStatus = services.map((service) => ({
  ...service,
  meta: serviceSignals[service.slug] || { live: 'Ready to deploy', owner: 'Sync.ai team', state: 'healthy' }
}));

function renderShell(content, activePath) {
  app.innerHTML = `
    <div class="layout">
      ${renderTopbar(activePath)}
      <main class="page">${content}</main>
      ${renderFooter()}
    </div>
  `;
}

function renderServiceGrid(compact = false) {
  return `
    <div class="service-matrix">
      ${serviceStatus
        .map(
          (service) => `
            <article class="service-card">
              <div class="service-meta">
                <span class="status ${service.meta.state === 'watch' ? 'warning' : ''}">
                  <span class="dot"></span>${service.meta.state === 'watch' ? 'Watch' : 'Healthy'}
                </span>
                <span class="pill"><span class="dot"></span>${service.meta.live}</span>
              </div>
              <h3>${service.name}</h3>
              <p class="light">${service.blurb}</p>
              <div class="bar"></div>
              <div class="service-features">
                ${service.features
                  .slice(0, compact ? 2 : 3)
                  .map((f) => `<div>• ${f}</div>`)
                  .join('')}
              </div>
              <div class="service-meta">
                <span class="chip"><span class="dot"></span>${service.meta.owner}</span>
                <div class="actions">
                  <button class="button secondary" onclick="window.navigate('/service/${service.slug}')">Open</button>
                  ${compact ? '' : '<button class="button ghost">Request Demo</button>'}
                </div>
              </div>
            </article>
          `
        )
        .join('')}
    </div>
  `;
}

function renderHero() {
  return `
    <section class="hero dashboard-hero">
      <div class="hero-copy">
        <div class="badge-row">
          <span class="badge">Command dashboard</span>
          <span class="badge">Audit-ready</span>
          <span class="badge">Cross-domain AI</span>
        </div>
        <h1>Run Agent Builder, Digital Twins, predictive maintenance, and energy automation from one pane.</h1>
        <p>Sync.ai blends reliability, quality, and energy orchestration into a single control surface with guardrails, observability, and playbooks that ship with every engagement.</p>
        <div class="actions">
          <button class="button" onclick="window.navigate('/services')">Launch services</button>
          <button class="button ghost" onclick="window.navigate('/pulse')">View Pulse platform</button>
        </div>
        <div class="stacked">
          <span class="chip"><span class="dot"></span>Live guardrails enabled</span>
          <span class="chip"><span class="dot"></span>Last sync: 2m ago</span>
        </div>
      </div>
      <div class="hero-visual">
        <div class="service-meta">
          <h4>Live control signals</h4>
          <span class="pill"><span class="dot"></span>Healthy</span>
        </div>
        <div class="signal-grid">
          ${signalCards
            .map(
              (card) => `
                <div class="signal-card">
                  <div class="service-meta">
                    <span class="status ${card.status === 'watch' ? 'warning' : ''}">
                      <span class="dot"></span>${card.title}
                    </span>
                    <span class="light">${card.tag}</span>
                  </div>
                  <strong>${card.value}</strong>
                </div>
              `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}

function renderKPISection() {
  return `
    <section class="section-block">
      <div class="section-title">
        <h2>Control center snapshot</h2>
        <span>Reliability, energy, and quality signals tracked in one view.</span>
      </div>
      <div class="kpi-grid">
        ${kpis
          .map(
            (kpi) => `
              <div class="kpi">
                <span class="pill"><span class="dot"></span>${kpi.pill}</span>
                <div class="kpi-value">${kpi.value}</div>
                <div class="kpi-label">${kpi.label}</div>
                <div class="trend">${kpi.trend}</div>
              </div>
            `
          )
          .join('')}
      </div>
    </section>
  `;
}

function renderOperationsSection() {
  return `
    <div class="section-block dual">
      <div class="panel">
        <div class="section-title">
          <h3>Live activity</h3>
          <span>Latest actions across services.</span>
        </div>
        <div class="activity-list">
          ${activityFeed
            .map(
              (item) => `
                <div class="activity">
                  <div>
                    <strong>${item.title}</strong>
                    <div class="light">${item.detail}</div>
                  </div>
                  <span class="pill">${item.tag}</span>
                </div>
              `
            )
            .join('')}
        </div>
      </div>
      <div class="panel">
        <div class="section-title">
          <h3>Engagement blueprint</h3>
          <span>Built-in playbooks for every rollout.</span>
        </div>
        <div class="list">
          <div>• Discovery sprint with telemetry intake and OT/IT review</div>
          <div>• Pilot with guardrails, SLA tracking, and clear success KPIs</div>
          <div>• Full rollout: enablement for operators, audits, and support</div>
        </div>
        <div class="badge-row" style="margin-top:12px;">
          <span class="badge">Safe by default</span>
          <span class="badge">OT-native</span>
          <span class="badge">Security-forward</span>
        </div>
      </div>
    </div>
  `;
}

function renderHome() {
  const content = `
    ${renderHero()}
    ${renderKPISection()}
    <section class="section-block">
      <div class="section-title">
        <h2>Service command deck</h2>
        <span>Agent Builder, Digital Twins, Predictive Maintenance, Energy Management, and more.</span>
      </div>
      ${renderServiceGrid(true)}
    </section>
    ${renderOperationsSection()}
  `;
  renderShell(content, '/');
}

function renderServicesPage() {
  const content = `
    <section class="hero">
      <div class="badge-row">
        <span class="badge">Command-grade</span>
        <span class="badge">Industrial-ready</span>
      </div>
      <h1>Services built for production-scale operations.</h1>
      <p>Every engagement pairs domain experts with resilient AI tooling so you can act faster, automate safely, and prove impact in weeks.</p>
      <div class="actions">
        <button class="button">Request demo</button>
        <button class="button secondary" onclick="window.navigate('/pulse')">See Pulse platform</button>
      </div>
    </section>
    <section class="section-block">
      <div class="section-title">
        <h2>Service catalog</h2>
        <span>Click into each service for full detail and workflows.</span>
      </div>
      ${renderServiceGrid()}
    </section>
  `;
  renderShell(content, '/services');
}

function renderServiceDetail({ slug }) {
  const service = services.find((s) => s.slug === slug);
  if (!service) {
    navigate('/services');
    return;
  }

  const content = `
    <div class="section-title">
      <h2>${service.name}</h2>
      <span>${service.blurb}</span>
    </div>
    <div class="dual" style="margin-top:16px;">
      <div class="panel">
        <h3>Key Features</h3>
        <div class="list">${service.features.map((f) => `<div>• ${f}</div>`).join('')}</div>
      </div>
      <div class="panel">
        <h3>Example Workflows</h3>
        <div class="list">${service.workflows.map((f) => `<div>• ${f}</div>`).join('')}</div>
      </div>
    </div>
    <div class="panel" style="margin-top:18px;">
      <h3>Benefits</h3>
      <div class="badge-row">
        ${service.benefits.map((b) => `<span class="badge">${b}</span>`).join('')}
      </div>
    </div>
    <div class="actions" style="margin-top:16px;">
      <button class="button">Request Demo</button>
      <button class="button secondary" onclick="window.navigate('/services')">Back to Services</button>
    </div>
  `;
  renderShell(content, '/services');
}

function renderPulsePage() {
  const content = `
    <section class="hero">
      <div class="badge-row">
        <span class="badge">Pulse Platform</span>
        <span class="badge">Shared governance</span>
      </div>
      <h1>Pulse: the unified industrial AI platform.</h1>
      <p>Pulse connects every Sync.ai capability with shared guardrails, observability, and a data fabric so your plants stay coordinated and auditable.</p>
      <div class="actions">
        <button class="button">Request demo</button>
        <button class="button secondary" onclick="window.navigate('/services')">View services</button>
      </div>
    </section>
    <div class="dual" style="margin-top:24px;">
      <div class="panel">
        <h3>What Pulse Delivers</h3>
        <div class="list">
          <div>• Multi-agent orchestration across reliability, quality, and energy</div>
          <div>• Unified dashboards for alarms, KPIs, and shifts</div>
          <div>• Governed data pipelines with lineage and observability</div>
          <div>• Monitoring for drift, SLAs, and policy compliance</div>
        </div>
      </div>
      <div class="panel">
        <h3>How Pulse Unifies Services</h3>
        <p class="tagline">Pulse is the layer that links each Sync.ai service into one cohesive experience.</p>
        <div class="badge-row">
          <span class="badge">Agents</span>
          <span class="badge">Pipelines</span>
          <span class="badge">Dashboards</span>
          <span class="badge">Monitoring</span>
        </div>
      </div>
    </div>
    <div class="section-title" style="margin-top:30px;">
      <h2>Platform Canvas</h2>
      <span>Simple diagram placeholders for architecture storytelling.</span>
    </div>
    <div class="diagram-row">
      ${pulseSections
        .map(
          (item) => `
            <div class="panel">
              <h3>${item.title}</h3>
              <p class="tagline">${item.description}</p>
              <div class="diagram-block">${item.diagram}</div>
            </div>
          `
        )
        .join('')}
    </div>
  `;
  renderShell(content, '/pulse');
}

new Router([
  { pattern: '/', component: renderHome },
  { pattern: '/home', component: renderHome },
  { pattern: '/services', component: renderServicesPage },
  { pattern: '/pulse', component: renderPulsePage },
  { pattern: '/service/:slug', component: renderServiceDetail }
]);
