import Router from './router.ts';
import AuthController from '../controllers/Auth.controller.ts';

class ProtectRouter extends Router {
  constructor(rootQuery) {
    super(rootQuery);
    if (ProtectRouter.__instance) {
      return ProtectRouter.__instance;
    }
  }

  async _onRoute(pathname) {
    await this._protectOnRoute(pathname);
  }

  async _protectOnRoute(pathname) {
    const route = this.getRoute(pathname);
    if (route.isAuthProtected()) {
      const isAuth = await AuthController.checkAuth();
      if (!isAuth) {
        this.go('/sign-in');
        return;
      }
    }
    this._handleOnRoute(route, pathname);
  }

  _handleOnRoute(route, pathname) {
    if (this._currentRoute) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;
    route.render(route, pathname);
  }
}

export default ProtectRouter;
