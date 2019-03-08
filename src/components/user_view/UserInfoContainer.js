import { connect } from 'react-redux';
import UserInfo from './UserInfo';

const mapStateToProps = (state) => {
  return {
    f_name: state.user.user.f_name,
    l_name: state.user.user.l_name,
    email: state.user.user.email
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const UserInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);

export default UserInfoContainer;
