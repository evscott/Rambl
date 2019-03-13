import React, { Component } from 'react';
import EventField from '../event_field/EventField';
import { usdFormatter } from '../../../shared/inputFormatter';

export default class AccomInfo extends Component {
  constructor(props) {
    super(props);
    this.state = this.getState(this.props.accom);
  }

  /**************************** Helper functions ****************************/

  /**
   * Receives and formats the values of an accom from props.
   * @param accom
   * @returns {{eventType: *, loc: string, begin_time: string, end_time: string,
   * cost: string, dscript: string}}
   */
  getState(accom) {
    return {
      eventType: accom.eventType,
      loc: accom.loc ? accom.loc : 'unspecified',
      begin_time: accom.begin_time.toString(),
      end_time: accom.end_time.toString(),
      cost: accom.cost ? usdFormatter.format(accom.cost) : 'unspecified',
      dscript: accom.dscript ? accom.dscript : 'unspecified'
    };
  }

  /**************************** Visual component ****************************/

  render() {
    return (
      <div>
        <EventField fieldType={'Event Type'} fieldValue={'Accom'} />
        <EventField fieldType={'Location'} fieldValue={this.state.loc} />
        <EventField fieldType={'Begins'} fieldValue={this.state.begin_time} />
        <EventField fieldType={'Ends'} fieldValue={this.state.end_time} />
        <EventField fieldType={'Cost'} fieldValue={this.state.cost} />
        <EventField fieldType={'Description'} fieldValue={this.state.dscript} />
      </div>
    );
  }
}
