import renderDOM from '../utils/renderDom.ts';

function isEqual(lhs, rhs) {
  return lhs === rhs;
}

class Route {
  constructor(pathname, view, props) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      document.querySelector(this._props.rootQuery).innerHTML = '';
    }
  }

  match(pathname) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
    }
    renderDOM(this._props.rootQuery, this._block);
  }
}

export default Route;
