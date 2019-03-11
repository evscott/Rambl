import { connect } from 'react-redux';
import { getSortedTrips } from '../../redux/getters/getTrips';
import PreviousTrips from './PreviousTrips';

const mapStateToProps = (state) => {
  return {
    previous: getSortedTrips(state).inactive
  };
};

const mapDispatchToProps = (dispatch) => {
  return { };
};

const PreviousTripsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviousTrips);

export default PreviousTripsContainer;
