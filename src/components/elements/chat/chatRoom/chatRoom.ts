import Block from '/src/utils/block.ts';
import template from './chatRoom.pug';
import Button from '/src/components/elements/button/button.ts';
import ChatsController from '/src/controllers/Chats.controller.ts';
import Popup from '/src/components/elements/popup/index.ts';
import Form from '/src/components/elements/form/index.ts';
import Input from '/src/components/elements/input/input.ts';
import ChatWindow from '/src/components/elements/chat/chatWindow/index.ts';
import SocketChat from '/src/utils/socketChat.ts';
import store from '/src/store/store.ts';

const searchInputProps = {
  className: 'auth-form__input',
  name: 'users',
  placeholder: 'ID пользователя',
};
const btnAddUserProps: {
  type: string,
  className: string,
  events: Record<string, (string) => void>
} = {
  type: 'button',
  textBtn: 'Добавить пользователя',
  className: 'chat__menu-btn',
  events: {
    click() {
      this.eventBus().emit('openPopup', 'popupAddUser');
    },
  },
};
const btnDeleteUserProps: {
  type: string,
  className: string,
  events: Record<string, (string) => void>
} = {
  type: 'button',
  textBtn: 'Удалить пользователя',
  className: 'chat__menu-btn',
  events: {
    click() {
      this.eventBus().emit('openPopup', 'popupDeleteUser');
    },
  },
};
const btnDeleteChatProps: {
  type: string,
  className: string,
  events: Record<string, (string) => void>
} = {
  type: 'button',
  textBtn: 'Удалить чат',
  className: 'chat__menu-btn',
  events: {
    click() {
      this.eventBus().emit('openPopup', 'popupDeleteChat');
    },
  },
};

const btnSubmitProps: {
  type: string,
  className: string,
  events: Record<string, (string) => void>
} = {
  type: 'submit',
  className: 'chat-room__submit',
  events: {
    click: (event) => {
      event.preventDefault();
      const message = document.querySelector('[name=message]').value;
      if (message.length > 0) {
        SocketChat.send(message);
      }
    },
  },
};

class ChatRoom extends Block {
  openPopup(popupComponentName) {
    this.children[popupComponentName].show();
  }

  initChildren() {
    if (this.props.currentChat) {
      this.children.chatWindow = new ChatWindow();
      this.children.btnAddUser = new Button(btnAddUserProps);
      this.children.btnAddUser.eventBus().on('openPopup', this.openPopup.bind(this));
      this.children.btnDeleteUser = new Button(btnDeleteUserProps);
      this.children.btnDeleteUser.eventBus().on('openPopup', this.openPopup.bind(this));
      this.children.btnDeleteChat = new Button(btnDeleteChatProps);
      this.children.btnDeleteChat.eventBus().on('openPopup', this.openPopup.bind(this));
      this.children.btnSubmit = new Button(btnSubmitProps);
      this.children.btnSubmit.eventBus().on('send-message');
      this.children.popupAddUser = new Popup({
        title: 'Добавить пользователя',
        content: new Form({
          currentChat: this.props.currentChat,
          className: 'search_user__form',
          btnSubmit: {
            className: 'default-button',
            textBtn: 'Добавить пользователя',
          },
          contentProps: [
            {
              component: Input,
              props: searchInputProps,
            },
          ],
          events: {
            submit(event) {
              event.preventDefault();
              const data = this.getFormData();

              ChatsController.addUsers(JSON.stringify({
                users: [data.users],
                chatId: this.props.currentChat.id,
              }));
            },
          },
        }),
      });
      this.children.popupDeleteUser = new Popup({
        title: 'Удалить пользователя',
        content: new Form({
          currentChat: this.props.currentChat,
          className: 'search_user__form',
          btnSubmit: {
            className: 'default-button',
            textBtn: 'Удалить пользователя',
          },
          contentProps: [
            {
              component: Input,
              props: searchInputProps,
            },
          ],
          events: {
            submit(event) {
              event.preventDefault();
              const data = this.getFormData();
              ChatsController.deleteUsers(JSON.stringify({
                users: [data.users],
                chatId: this.props.currentChat.id,
              }));
            },
          },
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
            async submit(event) {
              event.preventDefault();
              await ChatsController.deleteChat(JSON.stringify({
                chatId: this.props.currentChat.id,
              }));
              ChatsController.requestAll();
              store.set('currentChat', null);
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
