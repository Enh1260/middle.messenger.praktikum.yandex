import Block from '/src/utils/block.ts';
import template from './chatsList.pug';
import ChatItem from '/src/components/elements/chat/chatItem/index.ts';

class ChatsList extends Block {
  render() {
    this.children.chatItems = this.createBlocks(this.props.dataChatsList, ChatItem);
    return this.compile(template, {
      chatItems: this.props.chatItems,
    });
  }
}
export default ChatsList;
