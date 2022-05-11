import ChatWindow from './chatWindow';
import { connect } from '../../../../utils/connect';
import { IStoreState } from '../../../../types/store-state.interface';

const withStore = (state: IStoreState) => ({
  messages: state.messages,
  currentUserId: state?.currentUser?.id,
});

export default connect(withStore)(ChatWindow);
