import { connect } from 'react-redux';
import DashboardNav from './DashboardNav';
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

const DashboardNavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardNav);

export default DashboardNavContainer;
