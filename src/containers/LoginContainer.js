import { connect } from 'react-redux';
import { Login } from '../components/Login';
import { login, logout } from '../redux/actions/authActions';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = () => {
  return {
    onLogin: user => {
      login(user);
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
