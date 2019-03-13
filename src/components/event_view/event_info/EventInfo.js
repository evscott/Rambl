import React, { Component } from 'react';
import PlanInfo from '../events/PlanInfo';
import AccomInfo from '../events/AccomInfo';
import TranInfo from '../events/TranInfo';

/**
 * EventInfo is a handler component designed to determine what type of event
 * to display, as well as to also serve state methods to - i.e. updatePlan,
 * updateAccom, updateTran... Etc
 */
export default class EventInfo extends Component {
  constructor(props) {
    super(props);
  }

  /**************************** Visual component ****************************/

  render() {
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
        return <div>Unable to fetch information for this event</div>;
    }
  }
}
