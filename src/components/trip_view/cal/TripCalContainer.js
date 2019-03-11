import { connect } from 'react-redux';
import { TripCal } from './TripCal';
import { getTripEvents } from '../../../redux/getters/getEvents';
import { convertAllDates } from '../../../redux/getters/convertDate';
import queryString from 'query-string';

const mapStateToProps = (state, ownProps) => {
  // Get the trip id and the calendar view from the URL
  let vals = queryString.parse(ownProps.location.search);
  return {
    events: convertAllDates(getTripEvents(state, vals.id)),
    view: vals.view
  };
};

const mapDispatchToProps = () => {
  return {};
};

const TripCalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TripCal);

export default TripCalContainer;
