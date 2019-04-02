import { connect } from 'react-redux';
import Landing from './Landing';

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const LandingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);

export default LandingContainer;
