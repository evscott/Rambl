import { connect } from 'react-redux';
import { getCurrTrip, getSortedTrips } from '../../../redux/getters/getTrips';
import DboardJumbotron from './DboardJumbotron';

const mapStateToProps = (state) => {
  return {
    currTripInfo: getCurrTrip(state),
    allActiveTrips: getSortedTrips(state).active,
    user: state.user.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const DboardJumbotronContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DboardJumbotron);

export default DboardJumbotronContainer;
