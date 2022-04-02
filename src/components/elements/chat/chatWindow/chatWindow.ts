import Block from '/src/utils/block.ts';
import template from './chatWindow.pug';
import ChatMessage from '/src/components/elements/chat/chatMessage/index.ts';

class ChatWindow extends Block {
  initChildren() {
    if (this.props.messages && this.props.messages?.length) {
      const messages = this.props.messages.map((item) => {
        item.currentUserId = this.props.currentUserId;
        return item;
      });
      this.children.chatMessages = this.createBlocks(messages, ChatMessage);
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
export default ChatWindow;
