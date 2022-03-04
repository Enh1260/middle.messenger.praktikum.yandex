import ProfileViewPage from './profile-view.ts';
import renderDOM from '../../../../utils/renderDom.ts';
import '/src/styles/profile.scss';
import '/src/styles/profile-form.scss';
import '/src/styles/index.scss';

document.addEventListener('DOMContentLoaded', () => {
  const profileViewPage = new ProfileViewPage();
  renderDOM('#app', profileViewPage);
});
