import { connect } from 'react-redux';
import ThankYouMsg from '../components/ThankYouMsg';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const ThankYouMsgContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ThankYouMsg);

export default ThankYouMsgContainer;
