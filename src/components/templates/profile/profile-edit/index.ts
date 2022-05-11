import ProfileEditPage from './profile-edit';
import { connect } from '../../../../utils/connect';
import '/src/styles/profile.scss';
import '/src/styles/profile-form.scss';

const withStore = (state: any) => ({
  currentUser: state.currentUser,
});

export default connect(withStore)(ProfileEditPage);
