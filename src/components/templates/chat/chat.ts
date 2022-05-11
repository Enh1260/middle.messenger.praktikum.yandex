import Block, { TComponentProps } from '../../../utils/block';
import template from './chat.pug';
import ChatRoom from '../../../components/elements/chat/chatRoom/index';
import ChatsList from '../../../components/elements/chat/chatsList/index';
import Button from '../../../components/elements/button/index';
import Popup from '../../../components/elements/popup/index';
import AuthController from '../../../controllers/Auth.controller';
import ChatsController from '../../../controllers/Chats.controller';
import Form from '../../../components/elements/form/index';
import Link from '../../../components/elements/link/index';
import Input from '../../../components/elements/input/index';

class ChatPage extends Block {
  constructor(props: TComponentProps) {
    AuthController.getUser();
    ChatsController.requestAll();
    super({ ...props, chats: [] });
  }

  initChildren() {
    const formCreateChat = new Form({
      className: 'auth-form__form',
      btnSubmit: {
        className: 'default-button',
        textBtn: 'Создать',
      },
      events: {
        submit(event: any) {
          event.preventDefault();
          const data = this.getFormData();
          ChatsController.create(data);
          ChatsController.requestAll();
          this.eventBus.emit('hidePopup');
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
    this.children.chatsList = new ChatsList({});
    this.children.chatRoom = new ChatRoom({});
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
    }) as Block;
    this.children.btnCreateChat = new Button({
      className: 'chat__button-add-chat',
      events: {
        click: () => {
          (this.children.popupCreateChat as Block).show();
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
export default ChatPage;
