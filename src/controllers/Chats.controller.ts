import ChatsApi, {
  ChatsPostData,
  ChatsUsersPostData,
  ChatsDeletePostData,
} from '../api/chats.api';
import { TUser } from '../types/user.type';
import { IChat } from '../types/chat.interface';
import store from '../store/store';
import AuthController from './Auth.controller';
import ChatWebSocketController from './ChatWebSocket.controller';

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
    store.set('chats', chats);
  }

  public async open(chatId: number) {
    const currentUser = await AuthController.getCurrentUser();
    const currentUserId = currentUser.id;
    const token = await this.requestToken(chatId);
    ChatWebSocketController.open({
      userId: currentUserId,
      chatId,
      token,
    });
  }

  public sendMessage(message: string) {
    ChatWebSocketController.sendMessage(message);
  }

  public async requestToken(postData: number/* ChatsGetTokenPostData */): Promise<string> {
    const token = await ChatsApi.requestToken(postData);
    return token;
  }

  public async setCurrentChat(postData: IChat): Promise<void> {
    postData.users = await this.getUsers(postData.id);
    store.set('currentChat', postData);
  }

  public async getUsers(chatId: number): Promise<TUser[]> {
    const users = await ChatsApi.getUsers(chatId);
    return users;
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
