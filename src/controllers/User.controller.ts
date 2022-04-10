import UserApi, {
  UserPostData,
  UserPasswordPostData,
  UserSearchPostData,
} from '/src/api/user.api.ts';
import AuthController from './Auth.controller.ts';

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

  public async updateAvatar(postData: Blob): Promise<void> {
    await UserApi.updateAvatar(postData);
  }

  public async search(postData: UserSearchPostData): Promise<void> {
    await UserApi.search(postData);
  }
}

export default new UserController();
