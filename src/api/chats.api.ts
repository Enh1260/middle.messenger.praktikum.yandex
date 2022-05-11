import HTTPTransport from '../utils/HTTPTransport';
import { TUser } from '../types/user.type';

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

export interface ChatsGetResponce extends Promise<Response>{
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    },
    time: string;
    content: string;
  }
}

interface DeleteChatResponce extends Promise<Response>{
  userId: number;
  result: {
    id: number;
    title: string;
    avatar: string;
  }
}

export interface GetTokenResponce extends Promise<Response>{
    token: string;
}

class ChatsApi {
  protected apiInstance: HTTPTransport;

  constructor() {
    this.apiInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats');
  }

  public async create(postData: ChatsPostData): Promise<Response> {
    return this.apiInstance.post('/', { data: postData });
  }

  public async request(postData: ChatsGetPostData | null = {}): Promise<ChatsGetResponce> {
    return this.apiInstance.get('/', { data: postData });
  }

  public async getUsers(chatId: number): Promise<TUser[]> {
    return this.apiInstance.get(`/${chatId}/users`);
  }

  public async addUsers(postData: ChatsUsersPostData): Promise<Response> {
    return this.apiInstance.put('/users', { data: postData });
  }

  public async deleteUsers(postData: ChatsUsersPostData): Promise<Response> {
    return this.apiInstance.delete('/users', { data: postData });
  }

  public async deleteChat(postData: ChatsDeletePostData): Promise<DeleteChatResponce> {
    return this.apiInstance.delete('/', { data: postData });
  }

  public async requestToken(postData: number/* ChatsGetTokenPostData */): Promise<string> {
    const token = await this.apiInstance.post(`/token/${postData}`)
      .then((data: GetTokenResponce) => data.token);
    return token;
  }
}
export default new ChatsApi();
