import ChatsApi, {
  ChatsPostData,
  ChatsUsersPostData,
  ChatsDeletePostData,
  ChatsGetTokenPostData,
  GetTokenResponce,
} from '/src/api/chats.api.ts';
import store from '/src/store/store.ts';

class ChatsController {
  constructor() {
    return this;
  }

  public async create(postData: ChatsPostData): Promise<void> {
    ChatsApi.create(postData);
    this.requestAll();
  }

  public async requestAll(): Promise<void> {
    const chats = await ChatsApi.request();
    store.set('chats', chats.response);
  }

  public async requestToken(postData: ChatsGetTokenPostData): Promise<GetTokenResponce[]> {
    const token = await ChatsApi.requestToken(postData);
    return token;
  }

  public async addUsers(postData: ChatsUsersPostData): Promise<void> {
    await ChatsApi.addUsers(postData);
  }

  public async deleteUsers(postData: ChatsUsersPostData): Promise<void> {
    await ChatsApi.deleteUsers(postData);
  }

  public async deleteChat(postData: ChatsDeletePostData): Promise<void> {
    await ChatsApi.deleteChat(postData);
  }
}

export default new ChatsController();
