import RegistrationPage from './registration.ts';
import renderDOM from '../../../utils/renderDom.ts';
import '/src/styles/auth.scss';
import '/src/styles/index.scss';

document.addEventListener('DOMContentLoaded', () => {
  const registrationPage = new RegistrationPage();
  renderDOM('#app', registrationPage);
});
