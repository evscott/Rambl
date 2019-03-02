import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { logout } from '../../../redux/actions/authActions';

const mapStateToProps = state => {
  return {
    user: state.user,
    isFetching: state.user.isFetching,
    isAuthenticated: state.user.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
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
