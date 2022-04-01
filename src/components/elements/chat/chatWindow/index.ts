import ChatWindow from './chatWindow.ts';
import { connect } from '/src/utils/connect.ts';

const withStore = (state) => ({
  messages: state.messages,
});

export default connect(withStore)(ChatWindow);
