import { connect } from 'react-redux';
import { login, logout } from '../redux/actions/authActions';
import Login from '../components/Login';

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    isFetching: state.user.isFetching,
    user: state.user.user
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
