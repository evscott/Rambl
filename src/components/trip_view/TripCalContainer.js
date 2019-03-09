import { connect } from 'react-redux';
import { TripCal } from './TripCal';
import { getTripEvents } from '../../redux/getters/getEvents';
import { convertAllDates } from '../../redux/getters/convertDate';
import queryString from 'query-string';

const mapStateToProps = (state, ownProps) => {
  let vals = queryString.parse(ownProps.location.search);
  return {
    events: convertAllDates(getTripEvents(state, vals.id))
  };
};

const mapDispatchToProps = () => {
  return {};
};

const TripCalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TripCal);

export default TripCalContainer
