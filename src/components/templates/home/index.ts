import HomePage from './home.ts';
import './home.scss';
import '/src/styles/index.scss';
import renderDOM from '/src/utils/renderDOM.ts';

document.addEventListener('DOMContentLoaded', () => {
  const homePage = new HomePage();
  renderDOM('#app', homePage);
});
