import { connect } from 'react-redux';
import { getSortedTrips, getCurrTrip } from '../../redux/getters/getTrips';
import DboardJumbotron from './DboardJumbotron';

const mapStateToProps = (state) => {
  return {
    upcoming: getSortedTrips(state).active,
    isCurrent: getCurrTrip(state).current
  };
};

const mapDispatchToProps = (dispatch) => {
  return { };
};

const DboardJumbotronContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DboardJumbotron);

export default DboardJumbotronContainer;
