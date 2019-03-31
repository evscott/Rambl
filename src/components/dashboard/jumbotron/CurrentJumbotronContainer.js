import { connect } from 'react-redux';
import { getActiveEvents } from '../../../redux/getters/getEvents';
import CurrentJumbotron from './CurrentJumbotron';

const mapStateToProps = (state, ownProps) => {
  let activeEvents = getActiveEvents(state, ownProps.id);
  console.log(activeEvents);

  return {
    currEvents: activeEvents.current,
    upcomingEvents: activeEvents.upcoming
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const CurrentJumbotronContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentJumbotron);

export default CurrentJumbotronContainer;
