import Route, { TRouteOptions } from './route';

class Router {
  protected static __instance: Router;

  protected routes: Route[];

  protected history: History;

  protected _currentRoute?: Route;

  protected _rootQuery: string;

  protected _options: TRouteOptions;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  use(pathname: string, block: any, options: TRouteOptions = { isAuth: false }) {
    this._options = options;
    const route = new Route(pathname, block, this._rootQuery, {
      isAuth: options?.isAuth,
    });
    this.routes.push(route);
    return this;
  }

  start(): void {
    window.onpopstate = (event: any) => {
      this._onRoute(event.currentTarget.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname) as Route;
    if (this._currentRoute) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '/', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default Router;
