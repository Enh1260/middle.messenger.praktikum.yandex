import BaseApi from './base-api.ts';
import HTTPTransport from '/src/utils/HTTPTransport.ts';

export interface ChatsPostData{
  title: string;
}

export interface ChatsUsersPostData{
  users: number[];
  chatId: number;
}

export interface ChatsDeletePostData{
  chatId: number;
}

export interface ChatsGetPostData{
  limit?: number;
  title?: string;
}

export interface ChatsGetTokenPostData{
  id: number;
}

const chatsApiInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2');

class ChatsApi extends BaseApi {
  public static async create(postData: ChatsPostData) {
    return chatsApiInstance.post('/chats', { data: postData });
  }

  public static async request(postData: ChatsGetPostData | null) {
    return chatsApiInstance.get('/chats', { data: postData });
  }

  public static async addUsers(postData: ChatsUsersPostData) {
    return chatsApiInstance.put('/chats/users', { data: postData });
  }

  public static async deleteUsers(postData: ChatsUsersPostData) {
    return chatsApiInstance.delete('/chats/users', { data: postData });
  }

  public static async deleteChat(postData: ChatsDeletePostData) {
    return chatsApiInstance.delete('/chats', { data: postData });
  }

  public static async requestToken(postData: ChatsGetTokenPostData) {
    const token = await chatsApiInstance.post(`/chats/token/${postData}`)
      .then((data) => data.response);
    return token;
  }
}
export default ChatsApi;
