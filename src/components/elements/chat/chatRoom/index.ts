import ChatRoom from './chatRoom';
import './chatRoom.scss';
import { connect } from '../../../../utils/connect';
import { IStoreState } from '../../../../types/store-state.interface';

const withStore = (state: IStoreState) => ({
  currentChat: state.currentChat,
});

export default connect(withStore)(ChatRoom);
