import renderDOM from '../utils/renderDom';

function isEqual(lhs: any, rhs: any) {
  return lhs === rhs;
}
export type TRouteOptions = {
  isAuth?: boolean,
  rootQuery?: string
}
class Route {
  protected _pathname: string;

  protected _blockClass: any;

  protected _block: any;

  protected rootQuery: string;

  protected _props?: {
      isAuth?: boolean;
      rootQuery?: string;
    };

  constructor(pathname: string, view: any, rootQuery: string, props: TRouteOptions) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
    this.rootQuery = rootQuery;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block && this.rootQuery) {
      const rootQuery = document.querySelector(this.rootQuery);
      if (rootQuery) {
        rootQuery.innerHTML = '';
      }
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  isAuthProtected() {
    if (this._props?.isAuth) {
      return this._props.isAuth;
    }
    return false;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
    }
    renderDOM(this.rootQuery, this._block);
  }
}

export default Route;
