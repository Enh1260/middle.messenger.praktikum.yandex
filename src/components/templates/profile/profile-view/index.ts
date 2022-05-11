import ProfileViewPage from './profile-view';
import { connect } from '../../../../utils/connect';
import '/src/styles/profile.scss';
import '/src/styles/profile-form.scss';

const withStore = (state: any) => {
  console.log('state in withstore', state);
  return { currentUser: state.currentUser };
};

export default connect(withStore)(ProfileViewPage);
