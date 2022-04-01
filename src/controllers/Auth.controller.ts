import AuthApi, { RegistrationData, LoginData } from '/src/api/auth.api.ts';
import router from '/src/router/index.ts';
import store from '/src/store/store.ts';

class AuthController {
  public static async registration(postData: RegistrationData) {
    await AuthApi.registration(postData);
    router.go('/sign-in');
  }

  public static async login(postData: LoginData) {
    await AuthApi.login(postData);
    router.go('/messenger');
    await AuthController.getUser();
  }

  public static async logout() {
    await AuthApi.logout();
    router.go('/');
  }

  public static async getUser() {
    const user = await AuthApi.getUser();
    const data = user.response;
    data.avatar = `https://ya-praktikum.tech/api/v2/resources${user.response.avatar}`;
    store.set('currentUser', data);
  }
}

export default AuthController;
