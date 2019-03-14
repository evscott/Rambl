import { connect } from 'react-redux';
import { EventModal } from './EventModal';
import { updatePlanInDb } from '../../../../redux/actions/planActions';

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatePlan: (plan) => {
      dispatch(updatePlanInDb(plan));
    }
  };
};

const EventModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventModal);

export default EventModalContainer;
