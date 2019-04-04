import { connect } from 'react-redux';
import TripForm from './TripForm';
import { updateTripInDb } from '../../redux/actions/tripActions';

const mapStateToProps = (state, ownProps) => {
  return {
    close: ownProps.close
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTrip: (trip) => {
      dispatch(updateTripInDb(trip));
    }
  };
};

const UpdateTripFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TripForm);

export default UpdateTripFormContainer;
