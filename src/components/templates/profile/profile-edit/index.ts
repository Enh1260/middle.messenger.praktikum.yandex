import ProfileEditPage from './profile-edit.ts';
import renderDOM from '../../../../utils/renderDom.ts';
import '/src/styles/profile.scss';
import '/src/styles/profile-form.scss';

document.addEventListener('DOMContentLoaded', () => {
  const profileEditPage = new ProfileEditPage();
  renderDOM('#app', profileEditPage);
});
