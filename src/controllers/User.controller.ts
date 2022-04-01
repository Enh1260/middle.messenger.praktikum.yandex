import UserApi, {
  UserPostData,
  UserPasswordPostData,
  UserSearchPostData,
} from '/src/api/user.api.ts';
import AuthController from './Auth.controller.ts';

class UserController {
  public static async updateUser(postData: UserPostData) {
    await UserApi.updateUser(postData);
    AuthController.getUser();
  }

  public static async updatePassword(postData: UserPasswordPostData) {
    await UserApi.updatePassword(postData);
  }

  public static async updateAvatar(postData: Blob) {
    await UserApi.updateAvatar(postData);
  }

  public static async search(postData: UserSearchPostData) {
    await UserApi.search(postData);
  }
}

export default UserController;
