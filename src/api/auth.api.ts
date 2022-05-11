import HTTPTransport from '../utils/HTTPTransport';

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

interface RegistrationResponse{
  id: number;
}

export interface GetUserResponse extends Response{
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

class AuthApi {
  constructor() {
    return this;
  }

  public async registration(postData: RegistrationData): Promise<RegistrationResponse> {
    return authApiInstance.post('/signup', { data: postData });
  }

  public async login(postData: LoginData): Promise<string> {
    return authApiInstance.post('/signin', { data: postData });
  }

  public async logout(): Promise<string> {
    return authApiInstance.post('/logout');
  }

  public async getUser(): Promise<GetUserResponse> {
    return authApiInstance.get('/user');
  }
}
export default new AuthApi();
