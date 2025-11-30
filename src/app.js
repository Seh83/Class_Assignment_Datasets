import { Router } from './router.js';
import { renderTopbar, renderFooter } from './components/layout.js';
import { services, pulseSections } from './data.js';
import { navigate } from './navigation.js';

const app = document.getElementById('app');

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
    <div class="grid grid-3">
      ${services
        .map(
          (service, idx) => `
            <article class="card">
              <div class="icon">${idx + 1}</div>
              <div>
                <h3>${service.name}</h3>
                <p>${service.blurb}</p>
              </div>
              <div class="badge-row">
                ${service.features
                  .slice(0, 2)
                  .map((f) => `<span class="badge">${f}</span>`)
                  .join('')}
              </div>
              <div class="actions">
                <button class="button" onclick="window.navigate('/service/${service.slug}')">Learn More</button>
                ${compact ? '' : '<button class="button secondary">Request Demo</button>'}
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
      <div class="badge-row">
        <span class="badge">Industrial AI</span>
        <span class="badge">Command Center</span>
        <span class="badge">Built for Uptime</span>
      </div>
      <h1>Sync.ai keeps industrial systems predictable, safe, and continuously optimized.</h1>
      <p>From agent copilots on the line to enterprise-wide orchestration, Sync.ai blends reliability, quality, and energy automation into one precise operating layer.</p>
      <div class="actions">
        <button class="button" onclick="window.navigate('/services')">Explore Services</button>
        <button class="button secondary" onclick="window.navigate('/pulse')">See Pulse Platform</button>
      </div>
    </section>
  `;
}

function renderHome() {
  const content = `
    ${renderHero()}
    <div class="section-title" style="margin-top:32px;">
      <h2>Services</h2>
      <span>Built for production plants, validated in the field.</span>
    </div>
    ${renderServiceGrid()}
    <div class="dual" style="margin-top:32px;">
      <div class="panel">
        <h3>Pulse Platform</h3>
        <p class="tagline">Unified orchestration that connects every Sync.ai capability.</p>
        <div class="list">
          <div>• Multi-agent governance and runbooks</div>
          <div>• Shared observability across quality, reliability, and energy</div>
          <div>• Deployment guardrails, approvals, and traceability</div>
        </div>
        <div class="actions" style="margin-top:12px;">
          <button class="button" onclick="window.navigate('/pulse')">Open Pulse Overview</button>
          <button class="button secondary">Request Demo</button>
        </div>
      </div>
      <div class="panel">
        <h3>Engagement Blueprint</h3>
        <div class="list">
          <div>• Discovery sprints with telemetry intake and OT/IT review</div>
          <div>• Pilot with measurable uptime, FPY, or energy outcomes</div>
          <div>• Rollout toolkit: playbooks, operator enablement, and support</div>
        </div>
        <div class="badge-row" style="margin-top:12px;">
          <span class="badge">Safe by default</span>
          <span class="badge">OT-native</span>
          <span class="badge">Security-forward</span>
        </div>
      </div>
    </div>
  `;
  renderShell(content, '/');
}

function renderServicesPage() {
  const content = `
    <section class="hero">
      <h1>Services built for production-scale operations.</h1>
      <p>Every Sync.ai engagement pairs domain experts with resilient AI tooling so you can act faster, automate safely, and prove impact in weeks.</p>
      <div class="actions">
        <button class="button">Request Demo</button>
        <button class="button secondary" onclick="window.navigate('/pulse')">See Pulse Platform</button>
      </div>
    </section>
    <div class="section-title" style="margin-top:32px;">
      <h2>Service Catalog</h2>
      <span>Click into each service for full detail and workflows.</span>
    </div>
    ${renderServiceGrid()}
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
      <h1>Pulse: the unified industrial AI platform.</h1>
      <p>Pulse connects every Sync.ai capability with shared governance, observability, and data fabric so your plants stay coordinated and auditable.</p>
      <div class="actions">
        <button class="button">Request Demo</button>
        <button class="button secondary" onclick="window.navigate('/services')">View Services</button>
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
