import Router from './router.ts';
import HomePage from '/src/components/templates/home/index.ts';
import LoginPage from '/src/components/templates/login/index.ts';
import RegistrationPage from '/src/components/templates/registration/index.ts';
import ChatPage from '/src/components/templates/chat/index.ts';
import ProfileViewPage from '/src/components/templates/profile/profile-view/index.ts';
import ProfileEditPage from '/src/components/templates/profile/profile-edit/index.ts';
import PasswordEditPage from '/src/components/templates/profile/password-edit/index.ts';
import Page404 from '/src/components/templates/404/index.ts';
import Page500 from '/src/components/templates/500/index.ts';

const router = new Router('#app');

router
  .use('/', HomePage)
  .use('/sign-in', LoginPage)
  .use('/sign-up', RegistrationPage)
  .use('/messenger', ChatPage)
  .use('/settings', ProfileViewPage)
  .use('/settings-edit', ProfileEditPage)
  .use('/settings-password', PasswordEditPage)
  .use('/404', Page404)
  .use('/500', Page500)
  .start();

export default router;
