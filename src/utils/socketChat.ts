import store from '../store/store';
import { IMessage } from '../types/message.interface';

abstract class SocketChat {
  protected socket: WebSocket;

  protected connect(url: string) {
    this.socket = new WebSocket(url);
    this.addOpenEvent();
    this.addMessageEvent();
    this.addErrorEvent();
    this.addCloseEvent();
  }

  protected getMessages() {
    this.send(0, 'get old');
  }

  protected send(content: any, type: string) {
    this.socket.send(JSON.stringify({
      content,
      type,
    }));
  }

  addOpenEvent() {
    this.socket.addEventListener('open', () => {
      console.log('Connection start');
      store.set('messages', []);
      //      store.set('messages', null);
      this.getMessages();
    });
  }

  addMessageEvent() {
    this.socket.addEventListener('message', (event) => {
      let { messages } = store.getState();
      const dataFromSocket = JSON.parse(event.data);
      if (Array.isArray(dataFromSocket)) {
        messages = dataFromSocket;
      } else {
        (messages as IMessage[]).push(dataFromSocket);
      }

      store.set('messages', messages);
    });
  }

  addErrorEvent() {
    this.socket.addEventListener('error', (event: ErrorEvent) => {
      console.log('Ошибка', event.message);
    });
  }

  addCloseEvent() {
    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });
  }
}

/* class SocketChat {
  protected socket: IWebSocket
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
      const { messages } = store.getState();
      if (messages) {
        store.set('messages', []);
      }
      const dataMessages: any = JSON.parse(event.data);

      const newMessages = cloneDeep(messages as []);
      if (Array.isArray(dataMessages)) {
        newMessages.push(...dataMessages);
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

    this.socket.addEventListener('error', (event: ErrorEvent) => {
      console.log('Ошибка', event.message);
    });
  }

  send(message: string) {
    this.socket.send(JSON.stringify({
      content: message,
      type: 'message',
    }));
  }
} */

export default SocketChat;
