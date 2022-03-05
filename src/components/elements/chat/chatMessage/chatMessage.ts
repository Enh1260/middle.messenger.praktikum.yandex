import Block from '/src/utils/block.ts';
import template from './chatMessage.pug';

class ChatMessage extends Block {
  constructor(props) {
    super(props);

    if (this.props.isSelf) {
      this.getContent().classList.add('message-right');
      const messageBody: HTMLElement = this.getContent()
        .getElementsByClassName('chat-message__body')[0];
      messageBody.classList.add('message-self');
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
export default ChatMessage;
