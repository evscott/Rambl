import { connect } from 'react-redux';
import { getSortedTrips } from '../../../redux/getters/getTrips';
import UpcomingJumbotron from './UpcomingJumbotron';

const mapStateToProps = (state) => {
  return {
    trip: getSortedTrips(state).active.shift()
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const UpcomingJumbotronContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpcomingJumbotron);

export default UpcomingJumbotronContainer;
