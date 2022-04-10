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

export interface ChatsGetResponce {
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
      phone: strin;
    },
    time: string;
    content: string;
  }
}

interface DeleteChatResponce{
  userId: number;
  result: {
    id: number;
    title: string;
    avatar: string;
  }
}

export interface GetTokenResponce {
    token: string;
}

class ChatsApi {
  constructor() {
    this.apiInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats');
  }

  public async create(postData: ChatsPostData): Promise<string> {
    return this.apiInstance.post('/', { data: postData });
  }

  public async request(postData: ChatsGetPostData | null): Promise<ChatsGetResponce[]> {
    return this.apiInstance.get('/', { data: postData });
  }

  public async addUsers(postData: ChatsUsersPostData): Promise<string> {
    return this.apiInstance.put('/users', { data: postData });
  }

  public async deleteUsers(postData: ChatsUsersPostData): Promise<string> {
    return this.apiInstance.delete('/users', { data: postData });
  }

  public async deleteChat(postData: ChatsDeletePostData): Promise<DeleteChatResponce> {
    return this.apiInstance.delete('/', { data: postData });
  }

  public async requestToken(postData: ChatsGetTokenPostData): Promise<GetTokenResponce[]> {
    const token = await this.apiInstance.post(`/token/${postData}`)
      .then((data) => data.response);
    return token;
  }
}
export default new ChatsApi();
