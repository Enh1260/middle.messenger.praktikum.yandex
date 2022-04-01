import ProfileViewPage from './profile-view.ts';
import { connect } from '/src/utils/connect.ts';
import '/src/styles/profile.scss';
import '/src/styles/profile-form.scss';

const withStore = (state) => ({
  currentUser: state.currentUser,
});

export default connect(withStore)(ProfileViewPage);
