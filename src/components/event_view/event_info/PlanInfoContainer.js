import { connect } from 'react-redux';
import PlanInfo from './PlanInfo';

import { updatePlanInDb } from '../../../redux/actions/planActions';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (plan) => {
      dispatch(updatePlanInDb(plan));
    }
  };
};

const PlanInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanInfo);

export default PlanInfoContainer;
