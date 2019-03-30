import { connect } from 'react-redux';
import { UserInfoForm } from './UserInfoForm';

const mapStateToProps = (state) => {
  return {
    user_id: state.user.user.user_id,
    f_name: state.user.user.f_name,
    l_name: state.user.user.l_name,
    email: state.user.user.email
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const UserInfoFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoForm);

export default UserInfoFormContainer;
