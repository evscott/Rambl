import { connect } from 'react-redux';
import { signup } from '../../../redux/actions/authActions';
import SignUp from './SignUp';

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    isFetching: state.user.isFetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: user => {
      dispatch(signup(user));
    }
  };
};

const SignUpContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);

export default SignUpContainer;
