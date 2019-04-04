import { ToDoItem } from './ToDoItem';
import { connect } from 'react-redux';
import { updateTranInDb } from '../../../../redux/actions/tranActions';
import { updatePlanInDb } from '../../../../redux/actions/planActions';
import { updateAccomInDb } from '../../../../redux/actions/accomActions';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateTran: (tran) => {
      dispatch(updateTranInDb(tran));
    },
    onUpdatePlan: (plan) => {
      dispatch(updatePlanInDb(plan));
    },
    onUpdateAccom: (accom) => {
      dispatch(updateAccomInDb(accom));
    }
  };
};

const ToDoItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoItem);

export default ToDoItemContainer;
