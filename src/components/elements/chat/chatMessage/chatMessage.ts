import Block from '/src/utils/block.ts';
import template from './chatMessage.pug';

class ChatMessage extends Block {
  constructor(props) {
    super({
      ...props,
      isItself: props.user_id === props.currentUserId,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
export default ChatMessage;
