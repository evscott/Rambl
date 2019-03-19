import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  usdFormatter,
  convertToNumber
} from '../../../../shared/currencyFormatter';
import { formatDateForMySql } from '../../../../shared/dateFormatter';
import { EventInfo } from '../EventInfo';

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
      }
    };
  }

  /**
   * Gets the accommodation.
   */
  getAccom() {
    return {
      e_id: this.props.accom.e_id,
      trip_id: this.props.accom.trip_id,
      loc: this.state.loc.value,
      begin_time: formatDateForMySql(this.state.begin_time.value),
      end_time: formatDateForMySql(this.state.end_time.value),
      cost: convertToNumber(this.state.cost.value),
      dscript: this.state.dscript.value,
      completed: 0,
      priority: 0
    };
  }

  /**************************** Visual component ****************************/

  render() {
    return (
      <EventInfo
        state={this.getState(this.props.accom)}
        getEvent={this.getAccom}
        onUpdate={this.props.onUpdate}
      />
    );
  }
}

AccomInfo.propTypes = {
  accom: PropTypes.object.isRequired
};
