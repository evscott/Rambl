import { connect } from 'react-redux';
import PlanNew from './PlanNew';
import { addPlanToDb } from '../../../../redux/actions/planActions';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (plan) => {
      dispatch(addPlanToDb(plan));
    }
  };
};

const PlanNewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanNew);

export default PlanNewContainer;
