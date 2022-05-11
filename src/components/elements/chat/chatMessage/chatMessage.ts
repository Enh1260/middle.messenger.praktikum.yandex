import Block, { TComponentProps } from '../../../../utils/block';
import template from './chatMessage.pug';

class ChatMessage extends Block {
  constructor(props: TComponentProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
export default ChatMessage;
