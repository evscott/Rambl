import React, { Component } from 'react';
import EventField from '../event_fields/EventField';
import { usdFormatter } from '../../../shared/inputFormatter';
import PropTypes from 'prop-types';
import { editEventButton } from '../EditEventButton';
import { Table } from 'react-bootstrap';

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

  /**
   * TODO
   * @param e
   */
  onClick(e) {}

  /**************************** Visual component ****************************/

  render() {
    return (
      <div>
        <Table className="table-hover">
          <tbody>
            <tr>
              <EventField
                fieldType={'Event Type'}
                fieldValue={'Transportation'}
              />
            </tr>
            <tr>
              <EventField fieldType={'Method'} fieldValue={this.state.method} />
              {editEventButton(this.state, this.onClick)}
            </tr>
            <tr>
              <EventField
                fieldType={'Departing'}
                fieldValue={this.state.loc_begin}
              />
              {editEventButton(this.state, this.onClick)}
            </tr>
            <tr>
              <EventField
                fieldType={'Arriving'}
                fieldValue={this.state.loc_end}
              />
              {editEventButton(this.state, this.onClick)}
            </tr>
            <tr>
              <EventField
                fieldType={'Begins'}
                fieldValue={this.state.begin_time}
              />
              {editEventButton(this.state, this.onClick)}
            </tr>
            <tr>
              <EventField fieldType={'Ends'} fieldValue={this.state.end_time} />
              {editEventButton(this.state, this.onClick)}
            </tr>
            <tr>
              <EventField fieldType={'Cost'} fieldValue={this.state.cost} />
              {editEventButton(this.state, this.onClick)}
            </tr>
            <tr>
              <EventField
                fieldType={'Description'}
                fieldValue={this.state.dscript}
              />
              {editEventButton(this.state, this.onClick)}
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

TranInfo.propTypes = {
  tran: PropTypes.object.isRequired
};
