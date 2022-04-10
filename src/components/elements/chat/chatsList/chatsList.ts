import Block from '/src/utils/block.ts';
import template from './chatsList.pug';
import ChatItem from '/src/components/elements/chat/chatItem/index.ts';

class ChatsList extends Block {
  initChildren() {
    this.children.chatItems = this.createBlocks(this.props.chats, ChatItem) || [];
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
export default ChatsList;
