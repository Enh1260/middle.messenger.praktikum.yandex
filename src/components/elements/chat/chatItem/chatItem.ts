import Block, { TComponentProps } from '../../../../utils/block';
import template from './chatItem.pug';
import ChatsController from '../../../../controllers/Chats.controller';

class ChatItem extends Block {
  constructor(props: TComponentProps) {
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

  async openChat(): Promise<void> {
    await ChatsController.open(this.props.id);
    const newStateProps = { ...this.props };
    ChatsController.setCurrentChat(newStateProps);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
export default ChatItem;
