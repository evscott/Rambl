import { connect } from 'react-redux';
import { getSortedTrips } from '../../redux/getters/getTrips';
import PreviousTrips from './PreviousTrips';
import { deleteTripInDb } from '../../redux/actions/tripActions';

const mapStateToProps = (state) => {
  return {
    previous: getSortedTrips(state).inactive
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTrip: (trip) => {
      dispatch(deleteTripInDb(trip));
    }
  };
};

const PreviousTripsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviousTrips);

export default PreviousTripsContainer;
