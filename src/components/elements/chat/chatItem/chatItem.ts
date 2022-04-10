import Block from '/src/utils/block.ts';
import template from './chatItem.pug';
import ChatsController from '/src/controllers/Chats.controller.ts';
import SocketChat from '/src/utils/socketChat.ts';
import store from '/src/store/store.ts';

class ChatItem extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        click() {
          this.openChat();
        },
      },
      last_message: props.last_message?.content || props.last_message,
    });
  }

  async openChat(): void {
    const tokenData = await ChatsController.requestToken(this.props.id);

    SocketChat.connect({
      userId: this.props.userId,
      chatId: this.props.id,
      token: tokenData.token,
    });
    store.set('currentChat', this.props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
export default ChatItem;
