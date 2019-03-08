import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import { logout } from '../../redux/actions/authActions';
import { updateUserInfoInDb } from '../../redux/actions/userActions';

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
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

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default DashboardContainer;
