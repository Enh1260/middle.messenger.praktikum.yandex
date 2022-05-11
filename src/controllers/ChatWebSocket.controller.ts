import SocketChat from '../utils/socketChat';

type SocketOptions = {
  userId: number
  chatId: number
  token: string
}
class ChatWebSocketController extends SocketChat {
  public open(webSocketOptions:SocketOptions) {
    const { userId, chatId, token } = webSocketOptions;
    const url = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`;
    super.connect(url);
  }

  public sendMessage(message: string) {
    super.send(message, 'message');
  }
}

export default new ChatWebSocketController();
