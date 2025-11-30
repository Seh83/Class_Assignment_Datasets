export class Router {
  constructor(routes) {
    this.routes = routes;
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  parseHash() {
    const hash = window.location.hash.replace('#', '') || '/';
    return hash.startsWith('/') ? hash : `/${hash}`;
  }

  handleRoute() {
    const path = this.parseHash();
    const match = this.matchRoute(path);
    if (match) {
      match.component(match.params);
    }
  }

  matchRoute(path) {
    for (const route of this.routes) {
      const { pattern, component } = route;
      const paramNames = [];
      const regex = new RegExp('^' + pattern.replace(/:[^/]+/g, (name) => {
        paramNames.push(name.substring(1));
        return '([^/]+)';
      }) + '$');
      const match = path.match(regex);
      if (match) {
        const params = {};
        paramNames.forEach((name, i) => {
          params[name] = decodeURIComponent(match[i + 1]);
        });
        return { component, params };
      }
    }
    return null;
  }
}
