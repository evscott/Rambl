import React, { Component } from 'react';
import PlanInfoContainer from './event_info/PlanInfoContainer';
import AccomInfo from './event_info/AccomInfo';
import TranInfoContainer from './event_info/TranInfoContainer';
import PropTypes from 'prop-types';

/**
 * EventView is a handler component designed to determine what type of event
 * to display, as well as to also serve state methods to - i.e. updatePlan,
 * updateAccom, updateTran... Etc
 */
export default class EventView extends Component {
  /**************************** Visual component ****************************/
  render() {
    if (this.props.event === null)
      return <div>Error: Event object is null.</div>;
    switch (this.props.event.event_type) {
      case 'plan':
        return <PlanInfoContainer plan={this.props.event} />;
      case 'accom':
        return <AccomInfo accom={this.props.event} />;
      case 'trans':
        return <TranInfoContainer tran={this.props.event} />;
      default:
        return <div>Unable to fetch information for this event type.</div>;
    }
  }
}

EventView.propTypes = {
  event: PropTypes.object.isRequired
};
