import { connect } from 'react-redux';
import TripNav from './TripNav';
import { logout } from '../../redux/actions/authActions';

const mapStateToProps = (state) => {
  return {
    isFetching: state.user.isFetching,
    isAuthenticated: state.user.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(logout());
    }
  };
};

const TripNavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TripNav);

export default TripNavContainer;
