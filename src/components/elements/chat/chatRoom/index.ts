import ChatRoom from './chatRoom.ts';
import './chatRoom.scss';
import { connect } from '/src/utils/connect.ts';

const withStore = (state) => ({
  currentChat: state.currentChat,
  currentUser: state.currentUser,
});

export default connect(withStore)(ChatRoom);
