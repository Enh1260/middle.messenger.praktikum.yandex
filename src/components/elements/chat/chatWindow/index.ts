import ChatWindow from './chatWindow.ts';
import { connect } from '/src/utils/connect.ts';

const withStore = (state) => ({
  messages: state.messages,
  currentUserId: state.currentUser.id,
});

export default connect(withStore)(ChatWindow);
