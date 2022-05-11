import ChatPage from './chat';
import './chat.scss';
import './chat-main.scss';
import './chat-side.scss';
import './chat-search-user.scss';
import { connect } from '../../../utils/connect';

const withStore = (state: any) => ({
  currentUser: state.currentUser,
});
export default connect(withStore)(ChatPage);
