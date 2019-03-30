import { connect } from 'react-redux';
import { getPrioritizedEvents } from '../../../redux/getters/getEvents';
import Highlights from './Highlights';

const mapStateToProps = (state, ownProps) => {
  return {
    highPriority: getPrioritizedEvents(state, ownProps.id).highPriority
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const HighlightsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Highlights);

export default HighlightsContainer;
