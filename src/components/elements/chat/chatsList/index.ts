import ChatsList from './chatsList';
import { connect } from '../../../../utils/connect';

const withStore = (state: any) => ({
  chats: state.chats,
});

export default connect(withStore)(ChatsList);
