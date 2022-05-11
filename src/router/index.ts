import ProtectRouter from './protectRouter';
import HomePage from '../components/templates/home/index';
import LoginPage from '../components/templates/login/index';
import RegistrationPage from '../components/templates/registration/index';
import ChatPage from '../components/templates/chat/index';
import ProfileViewPage from '../components/templates/profile/profile-view/index';
import ProfileEditPage from '../components/templates/profile/profile-edit/index';
import PasswordEditPage from '../components/templates/profile/password-edit/index';
import Page404 from '../components/templates/404/index';
import Page500 from '../components/templates/500/index';

const router = new ProtectRouter('#app');

router
  .use('/', HomePage)
  .use('/sign-in', LoginPage)
  .use('/sign-up', RegistrationPage)
  .use('/messenger', ChatPage, { isAuth: true })
  .use('/settings', ProfileViewPage, { isAuth: true })
  .use('/settings-edit', ProfileEditPage, { isAuth: true })
  .use('/settings-password', PasswordEditPage, { isAuth: true })
  .use('/404', Page404)
  .use('/500', Page500)
  .start();

export default router;
