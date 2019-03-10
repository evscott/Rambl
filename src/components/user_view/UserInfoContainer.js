import { connect } from 'react-redux';
import UserInfo from './UserInfo';
import { updateUserInfoInDb } from '../../redux/actions/userActions';

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (f_name, l_name) => {
      dispatch(updateUserInfoInDb({ f_name: f_name, l_name: l_name }));
    }
  };
};

const UserInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);

export default UserInfoContainer;
