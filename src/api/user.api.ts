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

class UserApi {
  constructor() {
    this.apiInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/user');
  }

  public async updateUser(postData: UserPostData) {
    return this.apiInstance.put('/profile', { data: postData });
  }

  public async updatePassword(postData: UserPasswordPostData) {
    return this.apiInstance.put('/password', { data: postData });
  }

  public async updateAvatar(postData: Blob) {
    return this.apiInstance.put('/profile/avatar', {
      data: postData,
      headers: ['content-type', 'multipart/form-data'],
    });
  }

  public async search(postData: UserSearchPostData) {
    return this.apiInstance.post('/search', { data: postData });
  }
}
export default new UserApi();
