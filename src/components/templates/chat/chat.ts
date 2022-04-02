import Block from '/src/utils/block.ts';
import template from './chat.pug';
import ChatRoom from '/src/components/elements/chat/chatRoom/index.ts';
import ChatsList from '/src/components/elements/chat/chatsList/index.ts';
import Button from '/src/components/elements/button/index.ts';
import Popup from '/src/components/elements/popup/index.ts';
import AuthController from '/src/controllers/Auth.controller.ts';
import ChatsController from '/src/controllers/Chats.controller.ts';
import Form from '/src/components/elements/form/index.ts';
import Link from '/src/components/elements/link/index.ts';
import Input from '/src/components/elements/input/index.ts';

class ChatPage extends Block {
  constructor(props) {
    super({ ...props, currentUser: {}, chats: [] });
    AuthController.getUser();
    ChatsController.requestAll();
  }

  chatItemHandler(currentChat: object): void {
    this.enterChat(currentChat).bind(this);
  }

  componentDidMount() {
    return true;
  }

  initChildren() {
    const formCreateChat = new Form({
      className: 'auth-form__form',
      btnSubmit: {
        className: 'default-button',
        textBtn: 'Создать',
      },
      events: {
        submit(event) {
          event.preventDefault();
          const data = JSON.stringify(this.getFormData());
          ChatsController.create(data);
          ChatsController.requestAll();
        },
      },
      contentProps: [
        {
          component: Input,
          props: {
            className: 'auth-form__input',
            placeholder: 'Имя',
            name: 'title',
          },
        },
      ],
    });

    this.children.linkProfile = new Link({
      text: 'Профиль',
      href: '/settings',
      className: 'button-link',
    });
    this.children.chatsList = new ChatsList();
    this.children.chatRoom = new ChatRoom();
    this.children.btnLogout = new Button({
      textBtn: 'Выйти',
      className: 'chat__button-logout',
      events: {
        click: () => {
          AuthController.logout();
        },
      },
    });
    this.children.popupCreateChat = new Popup({
      title: 'Создать чат',
      content: formCreateChat,
    });
    this.children.btnCreateChat = new Button({
      className: 'chat__button-add-chat',
      events: {
        click: () => {
          this.children.popupCreateChat.show();
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
export default ChatPage;
