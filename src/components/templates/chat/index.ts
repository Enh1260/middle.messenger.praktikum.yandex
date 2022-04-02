import ChatPage from './chat.ts';
import './chat.scss';
import './chat-main.scss';
import './chat-side.scss';
import { connect } from '/src/utils/connect.ts';

const withStore = (state) => ({
  currentUser: state.currentUser,
});
export default connect(withStore)(ChatPage);
