import { connect } from 'react-redux';
import AccomInfo from './AccomInfo';
import {
  deleteAccomInDb,
  updateAccomInDb
} from '../../../../redux/actions/accomActions';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (accom) => {
      dispatch(updateAccomInDb(accom));
    },
    onDelete: (accom) => {
      dispatch(deleteAccomInDb(accom));
    }
  };
};

const AccomInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccomInfo);

export default AccomInfoContainer;
