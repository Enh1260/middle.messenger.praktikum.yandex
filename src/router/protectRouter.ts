import Router from './router';
import Route from './route';
import AuthController from '../controllers/Auth.controller';

class ProtectRouter extends Router {
  protected static __instance: ProtectRouter;

  constructor(rootQuery: string) {
    super(rootQuery);
    if (ProtectRouter.__instance) {
      return ProtectRouter.__instance;
    }
  }

  async _onRoute(pathname: string) {
    await this._protectOnRoute(pathname);
  }

  async _protectOnRoute(pathname: string) {
    const route = this.getRoute(pathname) as Route;
    if (route.isAuthProtected()) {
      const isAuth = await AuthController.checkAuth();
      if (!isAuth) {
        this.go('/sign-in');
        return;
      }
    }
    this._handleOnRoute(route);
  }

  _handleOnRoute(route: Route) {
    if (this._currentRoute) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;
    route.render();
  }
}

export default ProtectRouter;
