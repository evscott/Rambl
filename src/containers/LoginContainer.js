import { connect } from 'react-redux';
import { Login } from '../components/Login';
import { login, logout } from '../redux/actions/authActions';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: user => {
      console.log('Clicked onLogin button');
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
