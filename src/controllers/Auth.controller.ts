import AuthApi, { RegistrationData, LoginData, GetUserResponse } from '../api/auth.api';
import store from '../store/store';
import router from '../router/index';

class AuthController {
  public async registration(postData: RegistrationData): Promise<void> {
    const response = await AuthApi.registration(postData);
    if (response) {
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
    const response = await this.getCurrentUser();
    return !!response?.id;// return response.status === 200;
  }

  public async getCurrentUser(): Promise<GetUserResponse> {
    const user = await AuthApi.getUser();
    const data = user;
    if (user.avatar) {
      data.avatar = `https://ya-praktikum.tech/api/v2/resources${user.avatar}`;
    }
    return user;
  }

  public async getUser(): Promise<GetUserResponse> {
    const user = await AuthApi.getUser();
    const data = user;
    if (user.avatar) {
      data.avatar = `https://ya-praktikum.tech/api/v2/resources${user.avatar}`;
    }
    store.set('currentUser', data);
    return user;
  }
}

export default new AuthController();
