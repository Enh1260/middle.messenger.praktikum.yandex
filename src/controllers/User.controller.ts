import UserApi, {
  UserPostData,
  UserPasswordPostData,
  UserSearchPostData,
} from '../api/user.api';
import AuthController from './Auth.controller';

class UserController {
  constructor() {
    return this;
  }

  public async updateUser(postData: UserPostData): Promise<void> {
    await UserApi.updateUser(postData);
    AuthController.getUser();
  }

  public async updatePassword(postData: UserPasswordPostData): Promise<void> {
    await UserApi.updatePassword(postData);
  }

  public async updateAvatar(postData: FormData): Promise<void> {
    await UserApi.updateAvatar(postData);
  }

  public async search(postData: UserSearchPostData): Promise<any> {
    const response = await UserApi.search(postData);
    return response;
  }
}

export default new UserController();
