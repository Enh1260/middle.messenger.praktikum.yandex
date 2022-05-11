import Block, { TComponentProps } from '../../../../utils/block';
import { TUser } from '../../../../types/user.type';
import template from './chatAddUser.pug';
import Input from '../../../../components/elements/input/input';
import Button from '../../../../components/elements/button/button';
import UserController from '../../../../controllers/User.controller';
import SearchUserList from '../../../../components/elements/chat/searchUserList/index';
import ChatsController from '../../../../controllers/Chats.controller';

class ChatAddUser extends Block {
  constructor(props: TComponentProps) {
    super({
      ...props,
      events: {
        submit(event:any) {
          event.preventDefault();
          const form: HTMLElement = this.getContent();
          const users:number[] = [];
          const selector = 'input[type="checkbox"]:checked';
          const checkBoxes: NodeListOf<HTMLInputElement> = form.querySelectorAll(selector);
          checkBoxes.forEach((item) => users.push(Number(item.value)));
          ChatsController.addUsers({
            users,
            chatId: this.props.chatId,
          });
          this.eventBus.emit('hidePopup');
        },
      },
    });
  }

  setUserList(userList: TUser[]) {
    (this.children.userList as Block).setProps({ users: userList });
  }

  initChildren() {
    this.children.input = new Input({
      className: 'auth-form__input',
      name: 'users',
      placeholder: 'ID пользователя',
      events: {
        async input() {
          const inputValue = this.getContent().value;
          const response = await UserController.search({ login: inputValue });
          this.eventBus.emit('setUserList', response);
        },
      },
    });
    this.children.input.eventBus.on('setUserList', this.setUserList.bind(this));
    this.children.userList = new SearchUserList({});
    this.children.btnSubmit = new Button({
      className: 'default-button',
      textBtn: 'Добавить в чат',
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
export default ChatAddUser;
