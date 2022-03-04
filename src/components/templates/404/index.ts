import Page404 from './404.ts';
import renderDOM from '/src/utils/renderDom.ts';
import './404.scss';

document.addEventListener('DOMContentLoaded', () => {
  const page404 = new Page404();
  renderDOM('#app', page404);
});
