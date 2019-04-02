import { connect } from 'react-redux';
import { getActiveEvents } from '../../../redux/getters/getEvents';
import OngoingJumbotron from './OngoingJumbotron';

const mapStateToProps = (state, ownProps) => {
  let activeEvents = getActiveEvents(state, ownProps.trip.trip_id);

  return {
    currEvents: activeEvents.current,
    upcomingEvents: activeEvents.upcoming,
    trip: ownProps.trip
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
