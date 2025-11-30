import { Router } from './router.js';
import { renderTopbar, renderFooter } from './components/layout.js';
import { services, pulseSections } from './data.js';
import { navigate } from './navigation.js';

const app = document.getElementById('app');

const kpis = [
  { title: 'HVAC Fleet Health', value: '92%', label: 'Fleet uptime across monitored assets', trend: '+1.2% from last month', direction: 'up' },
  { title: 'Energy Savings (Mo.)', value: '$1,250', label: 'Energy trimmed from tariff windows', trend: '+210 vs last month', direction: 'up' },
  { title: 'Comfort Index', value: '98%', label: 'Environmental quality across sites', trend: '-0.5% from last month', direction: 'down' },
  { title: 'Open Actions', value: '3', label: 'Operational follow-ups', trend: '1 high priority', direction: 'neutral' }
];

const fleetAssets = [
  {
    name: 'Empty Can Conveyor',
    location: 'San Francisco Line 1',
    status: 'Running',
    service: 'Agent Builder',
    serviceSlug: 'industrial-ai-agent-builder',
    model: 'Custom GLB Model',
    stats: { efficiency: '96%', temp: '42°C', vibration: '1.8', rul: '720h' },
    signal: 'Normal'
  },
  {
    name: 'Depalletizer #1',
    location: 'San Francisco Line 1',
    status: 'Running',
    service: 'Predictive Maintenance',
    serviceSlug: 'predictive-maintenance',
    model: 'Custom GLB Model',
    stats: { efficiency: '92%', temp: '68°C', vibration: '2.3', rul: '485h' },
    signal: 'Normal'
  },
  {
    name: 'Packer #2',
    location: 'San Francisco Line 1',
    status: 'Running',
    service: 'Digital Twin Simulator',
    serviceSlug: 'digital-twin-simulator',
    model: 'Custom GLB Model',
    stats: { efficiency: '94%', temp: '55°C', vibration: '1.9', rul: '580h' },
    signal: 'Warning'
  },
  {
    name: 'Boiler Loop',
    location: 'Austin Energy Pod',
    status: 'Running',
    service: 'Energy Management',
    serviceSlug: 'energy-management',
    model: 'Custom GLB Model',
    stats: { efficiency: '91%', temp: '38°C', vibration: '1.4', rul: '640h' },
    signal: 'Normal'
  }
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
    <section class="hero">
      <div class="section-title" style="align-items:flex-start;">
        <div>
          <div class="badge-row">
            <span class="badge">Pulse Dashboard</span>
            <span class="badge">Black & White</span>
          </div>
          <h1>Real-time system management for Agent Builder, Digital Twins, Predictive Maintenance, and Energy Management.</h1>
          <p>Demo-ready dashboard with synthetic signals across services, sites, and assets—aligned to the reference layout.</p>
        </div>
        <div class="toolbar">
          <select class="select" aria-label="Select site">
            <option>All Sites</option>
            <option>San Francisco Line 1</option>
            <option>Austin Energy Pod</option>
          </select>
          <button class="button secondary">Filters</button>
          <button class="button secondary">Assets</button>
          <button class="button">Engage Copilot</button>
        </div>
      </div>
    </section>
  `;
}

function renderKPISection() {
  return `
    <section class="section-block">
      <div class="section-title">
        <h2>Fleet snapshot</h2>
        <span>Synth data to mirror the reference dashboard layout.</span>
      </div>
      <div class="kpi-grid">
        ${kpis
          .map(
            (kpi) => `
              <div class="kpi">
                <div class="label">${kpi.title}</div>
                <div class="kpi-value">${kpi.value}</div>
                <div class="kpi-label">${kpi.label}</div>
                <div class="trend ${kpi.direction === 'down' ? 'down' : kpi.direction === 'neutral' ? 'neutral' : ''}">${kpi.trend}</div>
              </div>
            `
          )
          .join('')}
      </div>
    </section>
  `;
}

function renderFleetAssets() {
  return `
    <section class="section-block">
      <div class="section-title">
        <h2>Fleet assets</h2>
        <span>Synthetic equipment signals spanning every service.</span>
      </div>
      <div class="asset-grid">
        ${fleetAssets
          .map(
            (asset) => `
              <article class="asset-card">
                <div class="asset-header">
                  <div>
                    <strong>${asset.name}</strong>
                    <div class="asset-subtitle">${asset.location}</div>
                  </div>
                  <span class="pill status ${asset.signal === 'Warning' ? 'warning' : ''}">
                    <span class="dot"></span>${asset.status}
                  </span>
                </div>
                <div class="asset-body">
                  <div class="service-meta">
                    <span class="tag">${asset.model}</span>
                    <div class="legend-row">
                      <span class="pill"><span class="dot green"></span>Normal</span>
                      <span class="pill"><span class="dot amber"></span>Warning</span>
                      <span class="pill"><span class="dot red"></span>Critical</span>
                    </div>
                  </div>
                  <div class="asset-image">${asset.service}</div>
                </div>
                <div class="stat-grid">
                  <div class="stat">
                    <div class="label">Efficiency</div>
                    <strong>${asset.stats.efficiency}</strong>
                  </div>
                  <div class="stat">
                    <div class="label">Temp</div>
                    <strong>${asset.stats.temp}</strong>
                  </div>
                  <div class="stat">
                    <div class="label">Vibration</div>
                    <strong>${asset.stats.vibration}</strong>
                  </div>
                  <div class="stat">
                    <div class="label">RUL</div>
                    <strong>${asset.stats.rul}</strong>
                  </div>
                </div>
                <div class="chart-line"></div>
                <div class="service-meta">
                  <span class="light">3D Model</span>
                  <div class="actions">
                    <button class="button secondary" onclick="window.navigate('/service/${asset.serviceSlug}')">View details</button>
                  </div>
                </div>
              </article>
            `
          )
          .join('')}
      </div>
    </section>
  `;
}

function renderHome() {
  const content = `
    ${renderHero()}
    ${renderKPISection()}
    ${renderFleetAssets()}
    <section class="section-block">
      <div class="section-title">
        <h2>Service command deck</h2>
        <span>Agent Builder, Digital Twins, Predictive Maintenance, Energy Management, and more.</span>
      </div>
      ${renderServiceGrid(true)}
    </section>
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
