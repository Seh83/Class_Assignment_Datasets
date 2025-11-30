export function renderTopbar(activePath) {
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Pulse Platform', path: '/pulse' }
  ];

  return `
    <header class="topbar">
      <div class="topbar-inner">
        <div class="brand" role="button" tabindex="0" aria-label="Sync.ai home" onclick="window.navigate('/');">
          <div class="brand-mark">S</div>
          <div>
            Sync.ai
            <div class="tagline">Industrial AI Systems</div>
          </div>
        </div>
        <nav class="nav" aria-label="Primary">
          ${navItems
            .map(
              (item) =>
                `<a href="#${item.path}" class="${activePath === item.path ? 'active' : ''}">${item.label}</a>`
            )
            .join('')}
        </nav>
      </div>
    </header>
  `;
}

export function renderFooter() {
  return `
    <footer class="footer">
      <div class="footer-inner">
        <div>
          <strong>Sync.ai</strong>
          <div class="tagline">Precision-grade industrial AI for every plant.</div>
        </div>
        <div class="meta-grid">
          <div class="meta-box">
            <div class="kv">
              <strong>Locations</strong>
              <span>Distributed command centers across NA & EU</span>
            </div>
          </div>
          <div class="meta-box">
            <div class="kv">
              <strong>Engagement</strong>
              <span>Start with a 6-week pilot aligned to uptime, quality, or energy targets.</span>
            </div>
          </div>
          <div class="meta-box">
            <div class="kv">
              <strong>Support</strong>
              <span>24/7 on-call engineers and operator enablement.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `;
}
