import Block from '/src/utils/block.ts';
import template from './chatRoom.pug';

class ChatForm extends Block {
  render() {
    this.children.btnSubmit = new Button({
      type: 'submit',
      className: 'chat-room__submit',
    });
    return this.compile(template, { ...this.props });
  }
}

export default ChatForm;
