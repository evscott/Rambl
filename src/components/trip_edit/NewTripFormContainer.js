import { connect } from 'react-redux';
import TripForm from './TripForm';
import { addTripToDb } from '../../redux/actions/tripActions';

const mapStateToProps = (state, ownProps) => {
  return {
    close: ownProps.close
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTrip: (trip) => {
      dispatch(addTripToDb(trip));
    }
  };
};

const NewTripFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TripForm);

export default NewTripFormContainer;
