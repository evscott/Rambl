import { connect } from 'react-redux';
import UserInfo from './UserInfo';

const mapStateToProps = (state) => {
  return {
    user: state.user.user
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
