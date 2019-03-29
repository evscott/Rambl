import { connect } from 'react-redux';
import { UserEdit } from './UserEdit';
import { updateUserInfoInDb } from '../../../redux/actions/userActions';

const mapStateToProps = (state) => {
  return {
    f_name: state.user.user.f_name,
    l_name: state.user.user.l_name
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => {
      dispatch(updateUserInfoInDb(user));
    }
  };
};

const UserEditContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserEdit);

export default UserEditContainer;
