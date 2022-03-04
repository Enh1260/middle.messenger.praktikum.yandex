import PasswordEditPage from './password-edit.ts';
import renderDOM from '/src/utils/renderDOM.ts';
import '/src/styles/profile.scss';
import '/src/styles/profile-form.scss';
import '/src/styles/index.scss';

document.addEventListener('DOMContentLoaded', () => {
  const passwordEditPage = new PasswordEditPage();
  renderDOM('#app', passwordEditPage);
});
