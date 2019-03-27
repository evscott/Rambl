import { connect } from 'react-redux';
import { TripCal } from './TripCal';
import { getTripEvents } from '../../../../redux/getters/getEvents';
import { convertAllDates } from '../../../../redux/getters/convertDate';
import queryString from 'query-string';

const mapStateToProps = (state, ownProps) => {
  // Get the trip id and the calendar view from the URL
  // Note: the convertAllDates() method takes all of the dates in the object
  // and turns them into javascript Date objects (if they aren't already).
  let queries = queryString.parse(ownProps.location.search);
  return {
    events: convertAllDates(getTripEvents(state, queries.id, queries.filter)),
    view: queries.view
  };
};

const TripCalContainer = connect(mapStateToProps)(TripCal);

export default TripCalContainer;
