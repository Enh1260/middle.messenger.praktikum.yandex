import ChatMessage from './chatMessage.ts';
import './chatMessage.scss';
import { connect } from '/src/utils/connect.ts';

const withStore = (state) => ({
  currentUserId: state.currentUser.id,
});

export default connect(withStore)(ChatMessage);
