import Page500 from './500.ts';
import renderDOM from '../../../utils/renderDom.ts';
import './500.scss';

document.addEventListener('DOMContentLoaded', () => {
  const page500 = new Page500();
  renderDOM('#app', page500);
});
