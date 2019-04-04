import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  usdFormatter,
  convertToNumber
} from '../../../../shared/currencyFormatter';
import { formatDateForMySql } from '../../../../shared/dateFormatter';
import { EventInfoForm } from '../EventInfoForm';

export default class AccomInfo extends Component {
  constructor(props) {
    super(props);
    this.state = this.getState(this.props.accom);
    this.getAccom = this.getAccom.bind(this);
  }

  /**************************** Helper functions ****************************/

  /**
   * Receives and formats the values of a accom event from props.
   * @param accom
   * @returns {{method: string, loc_begin: string, loc_end: *,
   * begin_time: string, end_time: string, cost: string, dscript: string}}
   */
  getState(accom) {
    return {
      loc: {
        name: 'loc',
        type: 'Location',
        value: accom.loc ? accom.loc : 'unspecified',
        editMode: false
      },
      begin_time: {
        name: 'begin_time',
        type: 'Begins',
        value: accom.begin_time.toString(),
        editMode: false
      },
      end_time: {
        name: 'end_time',
        type: 'Ends',
        value: accom.end_time.toString(),
        editMode: false
      },
      cost: {
        name: 'cost',
        type: 'Cost',
        value: accom.cost ? usdFormatter.format(accom.cost) : 'unspecified',
        editMode: false
      },
      dscript: {
        name: 'dscript',
        type: 'Description',
        value: accom.dscript ? accom.dscript : 'unspecified',
        editMode: false
      },
      priority: {
        name: 'priority',
        type: 'Priority',
        value: accom.priority,
        editMode: false
      }
    };
  }

  /**
   * Gets the accom object formatted for MySql and Redux.
   * @param accom object to get.
   * @returns {{e_id: number, trip_id: *, loc: *, begin_time: string, end_time: string, cost: (string|*), dscript: *, completed: number, priority: number}}
   */
  getAccom(accom) {
    return {
      e_id: this.props.accom.e_id,
      trip_id: this.props.accom.trip_id,
      loc: accom.loc.value,
      begin_time: formatDateForMySql(accom.begin_time.value),
      end_time: formatDateForMySql(accom.end_time.value),
      cost: convertToNumber(accom.cost.value),
      dscript: accom.dscript.value,
      completed: 0,
      priority: accom.priority.value
    };
  }

  /**************************** Visual component ****************************/

  render() {
    return (
      <EventInfoForm
        state={this.getState(this.props.accom)}
        trip_id={this.props.accom.trip_id}
        e_id={this.props.accom.e_id}
        getEvent={this.getAccom}
        onUpdate={this.props.onUpdate}
        onDelete={this.props.onDelete}
        close={this.props.close}
      />
    );
  }
}

AccomInfo.propTypes = {
  accom: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired
};
