import BaseApi from './base-api.ts';
// import UserApi from '/src/api/user.api.ts';
import HTTPTransport from '/src/utils/HTTPTransport.ts';

export interface UserPostData{
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  email: string;
}

export interface UserPasswordPostData{
  oldPassword: string;
  newPassword: string;
}

export interface UserSearchPostData{
  login: string;
}

const userApiInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/user');

class UserApi extends BaseApi {
  public static async updateUser(postData: UserPostData) {
    return userApiInstance.put('/profile', { data: postData });
  }

  public static async updatePassword(postData: UserPasswordPostData) {
    return userApiInstance.put('/password', { data: postData });
  }

  public static async updateAvatar(postData: Blob) {
    return userApiInstance.put('/profile/avatar', {
      data: postData,
      headers: ['content-type', 'multipart/form-data'],
    });
  }

  public static async search(postData: UserSearchPostData) {
    return userApiInstance.post('/search', { data: postData });
  }
}
export default UserApi;
