import { connect } from 'react-redux';
import AccomInfo from './AccomInfo';

import { updateAccomInDb } from '../../../redux/actions/accomActions';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (accom) => {
      dispatch(updateAccomInDb(accom));
    }
  };
};

const AccomInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccomInfo);

export default AccomInfoContainer;
