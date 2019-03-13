import React, { Component } from 'react';
import EventField from '../event_field/EventField';
import { usdFormatter } from '../../../shared/inputFormatter';

export default class TranInfo extends Component {
  constructor(props) {
    super(props);
    this.state = this.getState(this.props.tran);
  }

  /**************************** Helper functions ****************************/

  /**
   * Receives and formats the values of a tran from props.
   * @param tran
   * @returns {{eventType: *, method: string, loc_begin: string, loc_end: *,
   * begin_time: string, end_time: string, cost: string, dscript: string}}
   */
  getState(tran) {
    return {
      eventType: tran.eventType,
      method: tran.method ? tran.method : 'unspecified',
      loc_begin: tran.loc ? tran.loc : 'unspecified',
      loc_end: tran.loc_end ? tran.loc_end : 'unspecified',
      begin_time: tran.begin_time.toString(),
      end_time: tran.end_time.toString(),
      cost: tran.cost ? usdFormatter.format(tran.cost) : 'unspecified',
      dscript: tran.dscript ? tran.dscript : 'unspecified'
    };
  }

  /**************************** Visual component ****************************/

  render() {
    return (
      <div>
        <EventField fieldType={'Event Type'} fieldValue={'Transportation'} />
        <EventField fieldType={'Method'} fieldValue={this.state.method} />
        <EventField fieldType={'Departing'} fieldValue={this.state.loc_begin} />
        <EventField fieldType={'Arriving'} fieldValue={this.state.loc_end} />
        <EventField fieldType={'Begins'} fieldValue={this.state.begin_time} />
        <EventField fieldType={'Ends'} fieldValue={this.state.end_time} />
        <EventField fieldType={'Cost'} fieldValue={this.state.cost} />
        <EventField fieldType={'Description'} fieldValue={this.state.dscript} />
      </div>
    );
  }
}
