import React, { Component } from 'react';
import EventField from '../event_field/EventField';
import { usdFormatter } from '../../../shared/inputFormatter';

export default class PlanInfo extends Component {
  constructor(props) {
    super(props);
    this.state = this.getState(this.props.plan);
  }

  /**************************** Helper functions ****************************/

  /**
   * Receives and formats the values of a plan from props.
   * @param plan
   * @returns {{eventType: *, loc: string, begin_time: string, end_time: string,
   * cost: string, dscript: string}}
   */
  getState(plan) {
    return {
      eventType: plan.eventType,
      loc: plan.loc ? plan.loc : 'unspecified',
      begin_time: plan.begin_time.toString(),
      end_time: plan.end_time.toString(),
      cost: plan.cost ? usdFormatter.format(plan.cost) : 'unspecified',
      dscript: plan.dscript ? plan.dscript : 'unspecified'
    };
  }

  /**************************** Visual component ****************************/

  render() {
    return (
      <div>
        <EventField fieldType={'Event Type'} fieldValue={'Plan'} />
        <EventField fieldType={'Location'} fieldValue={this.state.loc} />
        <EventField fieldType={'Begins'} fieldValue={this.state.begin_time} />
        <EventField fieldType={'Ends'} fieldValue={this.state.end_time} />
        <EventField fieldType={'Cost'} fieldValue={this.state.cost} />
        <EventField fieldType={'Description'} fieldValue={this.state.dscript} />
      </div>
    );
  }
}
