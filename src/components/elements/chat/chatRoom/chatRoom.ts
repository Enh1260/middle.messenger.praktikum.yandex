import Block from '/src/utils/block.ts';
import template from './chatRoom.pug';
import Button from '/src/components/elements/button/button.ts';
import ChatMessage from '/src/components/elements/chat/chatMessage/index.ts';
import HTTPTransport from '/src/utils/HTTPTransport.ts';

const dataChatMessage: [{
  messageText: string,
  messageDate: string,
  isSelf: boolean
}] = [
  {
    messageText: 'Some text',
    messageDate: '12:09',
    isSelf: false,
  },
  {
    messageText: 'Some my text',
    messageDate: '12:13',
    isSelf: true,
  },
];

const btnSubmitProps:{
  type: string,
  className: string,
  events: Record<string, (string) => void>
} = {
  type: 'submit',
  className: 'chat-room__submit',
  events: {
    click: (event) => {
      event.preventDefault();
      const message = document.querySelector('[name=message]').value;
      const formData = { message };
      if (message.length > 0) {
        const fetch = new HTTPTransport();
        fetch.post('/message', { data: formData });
      }
    },
  },
};
class ChatRoom extends Block {
  render() {
    this.children.chatMessages = this.createBlocks(dataChatMessage, ChatMessage);
    this.children.btnSubmit = new Button(btnSubmitProps);
    return this.compile(template, { ...this.props });
  }
}

export default ChatRoom;
