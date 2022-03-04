import Block from '/src/utils/block.ts';
import template from './chat.pug';
import ChatsList from '/src/components/elements/chat/chatsList/chatsList.ts';
import ChatRoom from '/src/components/elements/chat/chatRoom/index.ts';

const dataChatsList: [{
  title: string,
  text: string,
  date: string,
  unseen?: number
}] = [
  {
    title: 'Josh',
    text: 'Hello World!!',
    date: '23-01-2022',
    unseen: 3,
  },
  {
    title: 'Илья',
    text: 'Друзья, у меня для вас особенный выпуск новостей!...',
    date: '24-01-2022',
    unseen: 1,
  },
  {
    title: 'Alina',
    text: 'Some another text',
    date: '30-01-2022',
    unseen: 2,
  },
];

class ChatPage extends Block {
  render() {
    this.children.chatsList = new ChatsList({ dataChatsList });
    this.children.chatRoom = new ChatRoom();

    return this.compile(template, { ...this.props });
  }
}
export default ChatPage;
