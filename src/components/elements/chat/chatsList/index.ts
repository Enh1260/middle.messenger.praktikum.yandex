import ChatsList from './chatsList.ts';
import { connect } from '/src/utils/connect.ts';

const withStore = (state) => ({
  chats: state.chats,
});

export default connect(withStore)(ChatsList);
