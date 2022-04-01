import Block from '/src/utils/block.ts';
import template from './chatsList.pug';
import ChatItem from '/src/components/elements/chat/chatItem/index.ts';

class ChatsList extends Block {
/*  async openChat(currentChat): void {
    const tokenData = await ChatsController.requestToken(currentChat.id);
    currentChat.token = tokenData.token;
    connectChat({
      userId: this.props.currentUser.id,
      chatId: currentChat.id,
      token: tokenData.token,
    });
    store.set('currentChat', currentChat);
  }  */
  initChildren() {
    this.children.chatItems = this.createBlocks(this.props.chats, ChatItem) || [];
    /*    this.children.chatItems.forEach((item) => {
      item.eventBus().on('enter-chat', this.openChat.bind(this));
    }); */
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
export default ChatsList;
