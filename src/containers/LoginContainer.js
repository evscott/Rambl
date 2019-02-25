import { connect } from 'react-redux';
import { Login } from '../components/Login';
import { login, logout } from '../redux/actions/authActions';

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authenticate.isAuthenticated
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
