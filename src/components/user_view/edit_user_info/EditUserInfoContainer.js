import { connect } from 'react-redux';
import EditUserInfo from './EditUserInfo';
import { updateUserInfoInDb } from '../../../redux/actions/userActions';

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    isFetching: state.user.isFetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (f_name, l_name) => {
      dispatch(updateUserInfoInDb({ f_name: f_name, l_name: l_name }));
    }
  };
};

const EditUserInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUserInfo);

export default EditUserInfoContainer;
