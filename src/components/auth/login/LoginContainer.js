import { connect } from 'react-redux';
import { login } from '../../../redux/actions/authActions';
import Login from './Login';

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    isFetching: state.user.isFetching,
    isSynced: state.trips.isSynced
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (user) => {
      dispatch(login(user));
    }
  };
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;
