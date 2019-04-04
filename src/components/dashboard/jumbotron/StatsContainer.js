import { connect } from 'react-redux';
import { getTripEvents } from '../../../redux/getters/getEvents';
import StatsComponent from './StatsComponent';
import { getCurrTrip, getSortedTrips } from '../../../redux/getters/getTrips';

const mapStateToProps = (state, ownProps) => {
  let currTrip = getCurrTrip(state).trip;
  return {
    events: getTripEvents(state, currTrip.trip_id),
    trips: getSortedTrips(state),
    trip: currTrip,
    coolState: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const StatsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsComponent);

export default StatsContainer;
