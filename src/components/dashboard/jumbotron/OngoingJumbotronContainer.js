import { connect } from 'react-redux';
import { getActiveEvents } from '../../../redux/getters/getEvents';
import OngoingJumbotron from './OngoingJumbotron';
import { getSortedTrips } from '../../../redux/getters/getTrips';

const mapStateToProps = (state, ownProps) => {
  let activeEvents = getActiveEvents(state, ownProps.trip_id);

  return {
    currEvents: activeEvents.current,
    upcomingEvents: activeEvents.upcoming,
    trip: getSortedTrips(state).active.shift()
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const OngoingJumbotronContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OngoingJumbotron);

export default OngoingJumbotronContainer;
