import { connect } from 'react-redux';
import NewTripForm from './NewTripForm';
import { addTripToDb } from '../../redux/actions/tripActions';

const mapStateToProps = (state) => {
  return {};
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
)(NewTripForm);

export default NewTripFormContainer;
