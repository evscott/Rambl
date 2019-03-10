import { connect } from 'react-redux';
import DisplayUserInfo from './DisplayUserInfo';

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  };
};

const DisplayUserInfoContainer = connect(mapStateToProps)(DisplayUserInfo);

export default DisplayUserInfoContainer;
