import { connect } from 'react-redux';
import { getSortedTrips } from '../../redux/getters/getTrips';
import UpcomingTrips from './UpcomingTrips';
import { deleteTripInDb } from '../../redux/actions/tripActions';

const mapStateToProps = (state) => {
  return {
    upcoming: getSortedTrips(state).active
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTrip: (trip) => {
      dispatch(deleteTripInDb(trip));
    }
  };
};

const UpcomingTripsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpcomingTrips);

export default UpcomingTripsContainer;
