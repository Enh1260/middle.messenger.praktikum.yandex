import Block from '/src/utils/block.ts';
import template from './chatItem.pug';

class ChatItem extends Block {
  render() {
    return this.compile(template, { ...this.props });
  }
}
export default ChatItem;
