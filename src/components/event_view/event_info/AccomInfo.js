import React, { Component } from 'react';
import EventField from '../event_fields/EventField';
import { usdFormatter } from '../../../shared/inputFormatter';
import PropTypes from 'prop-types';
import { initiateEdit } from '../../global/EditButtons';
import { Table } from 'react-bootstrap';

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
              <EventField fieldType={'Event Type'} fieldValue={'Accom'} />
            </tr>
            <tr>
              <EventField fieldType={'Location'} fieldValue={this.state.loc} />
              {initiateEdit(this.state, this.onClick)}
            </tr>
            <tr>
              <EventField
                fieldType={'Begins'}
                fieldValue={this.state.begin_time}
              />
              {initiateEdit(this.state, this.onClick)}
            </tr>
            <tr>
              <EventField fieldType={'Ends'} fieldValue={this.state.end_time} />
              {initiateEdit(this.state, this.onClick)}
            </tr>
            <tr>
              <EventField fieldType={'Cost'} fieldValue={this.state.cost} />
              {initiateEdit(this.state, this.onClick)}
            </tr>
            <tr>
              <EventField
                fieldType={'Description'}
                fieldValue={this.state.dscript}
              />
              {initiateEdit(this.state, this.onClick)}
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

AccomInfo.propTypes = {
  accom: PropTypes.object.isRequired
};
