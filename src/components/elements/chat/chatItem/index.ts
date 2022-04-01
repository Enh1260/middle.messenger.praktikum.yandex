import ChatItem from './chatItem.ts';
import { connect } from '/src/utils/connect.ts';
import './chatItem.scss';

const withStore = (state) => ({
  userId: state.currentUser.id,
});

export default connect(withStore)(ChatItem);
