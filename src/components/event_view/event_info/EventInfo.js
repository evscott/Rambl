import React, { Component } from 'react';
import PlanInfo from '../events/PlanInfo';
import AccomInfo from '../events/AccomInfo';
import TranInfo from '../events/TranInfo';
import PropTypes from 'prop-types';

/**
 * EventInfo is a handler component designed to determine what type of event
 * to display, as well as to also serve state methods to - i.e. updatePlan,
 * updateAccom, updateTran... Etc
 */
export default class EventInfo extends Component {
  /**************************** Visual component ****************************/

  render() {
    if (this.props.event === null)
      return <div>Error: Event object is null.</div>;
    switch (this.props.event.event_type) {
      case 'plan':
        return <PlanInfo plan={this.props.event} />;
        break;
      case 'accom':
        return <AccomInfo accom={this.props.event} />;
        break;
      case 'trans':
        return <TranInfo tran={this.props.event} />;
        break;
      default:
        return <div>Unable to fetch information for this event type.</div>;
    }
  }
}

EventInfo.propTypes = {
  event: PropTypes.object.isRequired
};
