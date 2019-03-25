import { connect } from 'react-redux';
import AccomNew from './AccomNew';
import { addAccomToDb } from '../../../../redux/actions/accomActions';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (accom) => {
      dispatch(addAccomToDb(accom));
    }
  };
};

const AccomNewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccomNew);

export default AccomNewContainer;
