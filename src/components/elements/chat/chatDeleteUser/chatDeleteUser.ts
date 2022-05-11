import Block, { TComponentProps } from '../../../../utils/block';
import { TUser } from '../../../../types/user.type';
import template from './chatDeleteUser.pug';
import Button from '../../../../components/elements/button/button';
import SearchUserList from '../../../../components/elements/chat/searchUserList/index';
import ChatsController from '../../../../controllers/Chats.controller';

class ChatDeleteUser extends Block {
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
          ChatsController.deleteUsers({
            users,
            chatId: this.props.currentChat.id,
          });
          this.eventBus.emit('hidePopup');
        },
      },
    });
  }

  initChildren() {
    if (this.props.currentChat) {
      this.props.deletingUsers = (this.props.currentChat.users as TUser[]).filter((user) =>
        user.id !== (this.props.currentChat.created_by));
    }
    this.children.userList = new SearchUserList({
      users: this.props.deletingUsers,
    });
    this.children.btnSubmit = new Button({
      className: 'default-button',
      textBtn: 'Удалить пользователя',
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
export default ChatDeleteUser;
