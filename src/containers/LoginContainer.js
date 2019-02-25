import { connect } from 'react-redux';
import { Login } from '../components/Login';
import { login, logout } from '../redux/actions/authActions';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: user => {
      login();
    },
    onLogout: () => {
      logout();
    }
  };
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;
