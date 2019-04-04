import { connect } from 'react-redux';
import UserInfoButton from './UserInfoButton';

const mapStateToProps = (state, ownProps) => {
  return {
    name: state.user.user.f_name,
    toggleShow: ownProps.toggleShow
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const UserInfoButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoButton);

export default UserInfoButtonContainer;
