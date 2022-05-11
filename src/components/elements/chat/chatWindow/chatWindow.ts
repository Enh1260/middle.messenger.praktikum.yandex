import Block from '../../../../utils/block';
import template from './chatWindow.pug';
import ChatMessage from '../../../../components/elements/chat/chatMessage/index';
import { IMessage } from '../../../../types/message.interface';

class ChatWindow extends Block {
  componentDidUpdate(oldProps: any, newProps: any) {
    const isEqual = (oldProps?.currentUserId === newProps.currentUserId)
      && (oldProps.messages?.length === newProps.messages?.length);

    if (this.props.messages && this.props.messages?.length) {
      this.props.messages = this.props.messages.map((item: IMessage) => {
        item.isItself = this.props.currentUserId === item.user_id;
        item.timeNumber = Date.parse(item.time);
        return item;
      }).sort((a: IMessage, b: IMessage) =>
        (a.timeNumber as number) - (b.timeNumber as number));
    }
    return isEqual;
  }

  componentDidMount() {
    const chatWindowEl = document.getElementById('chat-window');
    if (chatWindowEl) {
      chatWindowEl.scroll(0, chatWindowEl.scrollHeight);
    }
  }

  initChildren() {
    const messages = this.props.messages || [];
    if (this.props.messages) {
      this.children.chatMessages = this.createBlocks(messages, ChatMessage);
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
export default ChatWindow;
