import BaseApi from './base-api.ts';
import HTTPTransport from '/src/utils/HTTPTransport.ts';

const authApiInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');

export interface RegistrationData{
  login: string;
  password: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  email: string;
}

export interface LoginData{
  login: string;
  password: string;
}

class AuthApi extends BaseApi {
  public static async registration(postData: RegistrationData) {
    return authApiInstance.post('/signup', { data: postData });
  }

  public static async login(postData: LoginData) {
    return authApiInstance.post('/signin', { data: postData });
  }

  public static async logout() {
    return authApiInstance.post('/logout');
  }

  public static async getUser() {
    return authApiInstance.get('/user');
  }
}
export default AuthApi;
