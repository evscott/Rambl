import { connect } from 'react-redux';
import TranNew from './TranNew';
import { addTranToDb } from '../../../../redux/actions/tranActions';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (tran) => {
      dispatch(addTranToDb(tran));
    }
  };
};

const TranNewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TranNew);

export default TranNewContainer;
