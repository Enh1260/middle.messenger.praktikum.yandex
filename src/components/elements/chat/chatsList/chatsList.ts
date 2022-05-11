import Block from '../../../../utils/block';
import template from './chatsList.pug';
import ChatItem from '../../../../components/elements/chat/chatItem/index';

class ChatsList extends Block {
  initChildren() {
    this.children.chatItems = this.createBlocks(this.props.chats, ChatItem) || [];
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
export default ChatsList;
