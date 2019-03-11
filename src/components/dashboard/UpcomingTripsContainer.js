import { connect } from 'react-redux';
import { getSortedTrips } from '../../redux/getters/getTrips';
import UpcomingTrips from './UpcomingTrips';

const mapStateToProps = (state) => {
  return {
    upcoming: getSortedTrips(state).active
  };
};

const mapDispatchToProps = (dispatch) => {
  return { };
};

const UpcomingTripsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpcomingTrips);

export default UpcomingTripsContainer;
