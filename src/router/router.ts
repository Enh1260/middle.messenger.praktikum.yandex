import Route from './route.ts';

class Router {
  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    this._options = null;
    Router.__instance = this;
  }

  use(pathname, block, options) {
    this.options = options;
    const route = new Route(pathname, block, {
      rootQuery: this._rootQuery,
      isAuth: options?.isAuth,
    });
    this.routes.push(route);
    return this;
  }

  start(): void {
    window.onpopstate = (event) => {
      this._onRoute(event.currentTarget.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname) {
    const route = this.getRoute(pathname);
    if (this._currentRoute) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;
    route.render(route, pathname);
  }

  go(pathname) {
    this.history.pushState({}, '/', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default Router;
