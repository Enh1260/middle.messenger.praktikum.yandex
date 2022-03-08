import LoginPage from './login.ts';
import '/src/styles/auth.scss';
import '/src/styles/index.scss';
import renderDOM from '../../../utils/renderDom.ts';

document.addEventListener('DOMContentLoaded', () => {
  const loginPage = new LoginPage();
  renderDOM('#app', loginPage);
});
