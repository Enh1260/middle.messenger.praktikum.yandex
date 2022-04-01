import ChatPage from './chat.ts';
import './chat.scss';
import './chat-main.scss';
import './chat-side.scss';
import { connect } from '/src/utils/connect.ts';

// const withUser = connect()
const withStore = (state) => ({
  currentUser: state.currentUser,
/*  chats: state.chats, */
/*  currentChat: state.currentChat, */
});
export default connect(withStore/* state => state.currentUser */)(ChatPage);
