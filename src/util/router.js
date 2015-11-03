import pathToRegexp from 'path-to-regexp';

// Tiny on purpose router
// pushState by default, hash change as fallback or optional
class Router {
  constructor(usePushState = 'true') {
    this._hasPushState = !!(window.history && window.history.pushState);
    this._usePushState = !!(usePushState && this._hasPushState);
    this._prefix = this._usePushState ? '/' : '#/';
    this._onpopstate = this._onpopstate.bind(this);
    this._onhashchange = this._onhashchange.bind(this);
    this.default = '*'; // Or 404
    this.routes = {};
    // this.history = []; // TODO: internal history track
  }

  _onpopstate(ev) {
    ev.preventDefault();
    this.match();
  }

  _onhashchange(ev) {
    ev.preventDefault();
    this.match();
  }

  start() {
    // ES6 note, Router === this.constructor, assigning value to it creates static class property
    if (Router.started) throw new Error('Router has already been started');
    Router.started = true;
    this.match();
    if (this._usePushState) {
      window.addEventListener('popstate', this._onpopstate);
    } else {
      window.addEventListener('hashchange', this._onhashchange);
    }
  }

  stop() {
    Router.started = false;
    if (this._usePushState) {
      window.removeEventListener('popstate', this._onpopstate);
    } else {
      window.removeEventListener('hashchange', this._onhashchange);
    }
  }

  getPath() {
    var path = decodeURIComponent(window.location.pathname);
    return path.charAt(0) === '/' ? path.slice(1) : path;
  }

  getHash() {
    return window.location.hash.replace(this._prefix, '');
  }

  getFragment() {
    return this._usePushState ? this.getPath() : this.getHash();
  }

  // Match current location with defined routes and invoke handler
  match() {
    let fragment = this.getFragment();
    let match = null;
    let route = null;
    let matched = null;
    let args = [];
    for (let path in this.routes) {
      match = this.routes[path].re.exec(decodeURIComponent(fragment));
      if (match) {
        route = this.routes[path];
        for (let i = 1, l = match.length; i < l; i++) {
          args.push(match[i]);
        }
        matched = {
          path: fragment,
          args: args
        };
        break;
      }
    }
    if (!matched && this.routes.hasOwnProperty(this.default)) {
      route = this.routes[this.default];
      matched = { path: this.default, args: [fragment] };
    }
    return route.handler(matched);
  }

  // Set route and assign handler
  on(path, handler, opts) {
    let route = {};
    route.keys = [];
    route.re = pathToRegexp(path, route.keys);
    route.handler = handler;
    route.opts = opts;
    this.routes[path] = route;
  }

  // Go to location
  go(path) {
    if (this._usePushState) {
      window.history.pushState({}, document.title, this._prefix + path);
      this.match(); // pushState() doesn't trigger popstate
    } else {
      window.location.hash = this._prefix + path;
    }
  }

  // Go back
  back() {
    window.history.back();
  }
}

let router = new Router();

export default router;
