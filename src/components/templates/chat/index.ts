import ChatPage from './chat.ts';
import './chat.scss';
import './chat-main.scss';
import './chat-side.scss';
import renderDOM from '../../../utils/renderDom.ts';

document.addEventListener('DOMContentLoaded', () => {
  const chatPage = new ChatPage();
  renderDOM('#chat-page', chatPage);
});
