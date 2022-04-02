import AuthApi, { RegistrationData, LoginData, GetUserResponse } from '/src/api/auth.api.ts';
import store from '/src/store/store.ts';
import router from '/src/router/index.ts';

class AuthController {
  constructor()

  public async registration(postData: RegistrationData): Promise<void> {
    const response = await AuthApi.registration(postData);
    if (response.status === 200) {
      router.go('/messenger');
    }
  }

  public async login(postData: LoginData): Promise<void> {
    await AuthApi.login(postData);
    router.go('/messenger');
    await this.getUser();
  }

  public async logout(): Promise<void> {
    await AuthApi.logout();
    router.go('/');
  }

  public async checkAuth(): Promise<boolean> {
    const response = await AuthApi.getUser();
    return response.status === 200;
  }

  public async getUser(): Promise<GetUserResponse> {
    const user = await AuthApi.getUser();
    const data = user.response;
    if (user.response.avatar) {
      data.avatar = `https://ya-praktikum.tech/api/v2/resources${user.response.avatar}`;
    }
    store.set('currentUser', data);
    return user;
  }
}

export default new AuthController();
