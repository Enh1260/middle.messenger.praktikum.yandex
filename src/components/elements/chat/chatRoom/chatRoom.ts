import Block from '../../../../utils/block';
import template from './chatRoom.pug';
import Button from '../../../../components/elements/button/button';
import ChatsController from '../../../../controllers/Chats.controller';
import Popup from '../../../../components/elements/popup/index';
import Form from '../../../../components/elements/form/index';
import ChatWindow from '../../../../components/elements/chat/chatWindow/index';
import store from '../../../../store/store';
import ChatAddUser from '../chatAddUser/index';
import ChatDeleteUser from '../chatDeleteUser/index';

const btnAddUserProps: {
  type: string,
  className: string,
  textBtn: string,
  events: Record<string, () => void>
} = {
  type: 'button',
  textBtn: 'Добавить пользователя',
  className: 'chat__menu-btn',
  events: {
    click() {
      this.eventBus.emit('openPopup', 'popupAddUser');
    },
  },
};
const btnDeleteUserProps: {
  type: string,
  className: string,
  textBtn: string,
  events: Record<string, () => void>
} = {
  type: 'button',
  textBtn: 'Удалить пользователя',
  className: 'chat__menu-btn',
  events: {
    click() {
      this.eventBus.emit('openPopup', 'popupDeleteUser');
    },
  },
};
const btnDeleteChatProps: {
  type: string,
  className: string,
  textBtn: string,
  events: Record<string, () => void>
} = {
  type: 'button',
  textBtn: 'Удалить чат',
  className: 'chat__menu-btn',
  events: {
    click() {
      this.eventBus.emit('openPopup', 'popupDeleteChat');
    },
  },
};

const btnSubmitProps: {
  type: string,
  className: string,
  events: Record<string, (event: any) => void>
} = {
  type: 'submit',
  className: 'chat-room__submit',
  events: {
    click: (event: any) => {
      event.preventDefault();
      const messageInput = document.querySelector('[name=message]') as HTMLInputElement;
      const message = messageInput.value;
      if (message.length > 0) {
        ChatsController.sendMessage(message);
        messageInput.value = '';
      }
    },
  },
};

class ChatRoom extends Block {
  openPopup(popupComponentName: string) {
    (this.children[popupComponentName] as Block).show();
  }

  componentDidMount() {
    this.children.chatWindow = new ChatWindow({});
  }

  initChildren() {
    if (this.props.currentChat) {
      this.children.btnAddUser = new Button(btnAddUserProps) as Block;
      this.children.btnAddUser.eventBus.on('openPopup', this.openPopup.bind(this));
      this.children.btnDeleteUser = new Button(btnDeleteUserProps);
      this.children.btnDeleteUser.eventBus.on('openPopup', this.openPopup.bind(this));
      this.children.btnDeleteChat = new Button(btnDeleteChatProps);
      this.children.btnDeleteChat.eventBus.on('openPopup', this.openPopup.bind(this));
      this.children.btnSubmit = new Button(btnSubmitProps);
      this.children.popupAddUser = new Popup({
        title: 'Добавить пользователя',
        content: new ChatAddUser({ chatId: this.props.currentChat.id }),
      });
      this.children.popupDeleteUser = new Popup({
        title: 'Удалить пользователя',
        content: new ChatDeleteUser({
          currentChat: this.props.currentChat,
        }),
      });
      this.children.popupDeleteChat = new Popup({
        title: 'Удалить чат',
        content: new Form({
          currentChat: this.props.currentChat,
          className: 'search_user__form',
          btnSubmit: {
            className: 'default-button',
            textBtn: 'Удалить чат',
          },
          events: {
            async submit(event: any) {
              event.preventDefault();
              await ChatsController.deleteChat({
                chatId: this.props.currentChat.id,
              });
              ChatsController.requestAll();
              store.set('currentChat', null);
              this.eventBus.emit('hidePopup');
            },
          },
        }),
      });
    } else {
      this.children = {};
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default ChatRoom;
