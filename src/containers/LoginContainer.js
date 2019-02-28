import { connect } from 'react-redux';
import { login, logout } from '../redux/actions/authActions';
import Login from '../components/Login';

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    isFetching: state.user.isFetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: user => {
      dispatch(login(user));
    },
    onLogout: () => {
      dispatch(logout());
    }
  };
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;
