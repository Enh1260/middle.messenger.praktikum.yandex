import HomePage from './home.ts';
import './home.scss';
import '/src/styles/index.scss';
import renderDOM from '../../../utils/renderDom.ts';

document.addEventListener('DOMContentLoaded', () => {
  const homePage = new HomePage();
  renderDOM('#app', homePage);
});
