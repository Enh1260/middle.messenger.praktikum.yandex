import ChatsApi, {
  ChatsPostData,
  ChatsUsersPostData,
  ChatsDeletePostData,
  ChatsGetTokenPostData,
} from '/src/api/chats.api.ts';
import store from '/src/store/store.ts';

class ChatsController {
  public static async create(postData: ChatsPostData) {
    ChatsApi.create(postData);
    ChatsController.requestAll();
  }

  public static async requestAll() {
    const chats = await ChatsApi.request();
    store.set('chats', chats.response);
  }

  public static async requestToken(postData: ChatsGetTokenPostData) {
    const token = await ChatsApi.requestToken(postData);
    return token;
  }

  public static async addUsers(postData: ChatsUsersPostData) {
    await ChatsApi.addUsers(postData);
  }

  public static async deleteUsers(postData: ChatsUsersPostData) {
    await ChatsApi.deleteUsers(postData);
  }

  public static async deleteChat(postData: ChatsDeletePostData) {
    await ChatsApi.deleteChat(postData);
  }
}

export default ChatsController;
