import store from '/src/store/store.ts';
import cloneDeep from '/src/utils/cloneDeep.ts';

type SocketOptions = {
  userId: string
  chatId: string
  token: string
}

class SocketChat {
  constructor() {
    if (this.socket) {
      return this.socket;
    }
  }

  connect(webSocketOptions:SocketOptions) {
    const { userId, chatId, token } = webSocketOptions;
    const url = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`;
    this.socket = new WebSocket(url);
    this.socket.addEventListener('open', () => {
      console.log('Connection start');
      store.set('messages', []);
      this.socket.send(JSON.stringify({
        content: '0',
        type: 'get old',
      }));
    });

    this.socket.addEventListener('message', (event) => {
      if (!store.state.messages) {
        store.set('messages', []);
      }
      const dataMessages = JSON.parse(event.data);
      const { messages } = store.getState();
      const newMessages = cloneDeep(messages);
      if (Array.isArray(dataMessages)) {
        newMessages.push(...JSON.parse(event.data));
        newMessages.reverse();
      } else {
        newMessages.push(JSON.parse(event.data));
      }
      store.set('messages', newMessages);
    });

    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket.addEventListener('error', (event) => {
      console.log('Ошибка', event.message);
    });
  }

  send(message) {
    this.socket.send(JSON.stringify({
      content: message,
      type: 'message',
    }));
  }
}

export default new SocketChat();
