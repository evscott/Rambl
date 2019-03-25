import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { convertToNumber } from '../../../../shared/currencyFormatter';
import { formatDateForMySql } from '../../../../shared/dateFormatter';
import { EventNewForm } from '../EventNewForm';

export default class AccomNew extends Component {
  constructor(props) {
    super(props);
    this.getAccom = this.getAccom.bind(this);
    this.getState = this.getState.bind(this);
    this.state = this.getState();
  }

  /**************************** Helper functions ****************************/

  /**
   * Receives and formats the values of a tran event from props.
   * @param tran
   * @returns {{method: string, loc_begin: string, loc_end: *,
   * begin_time: string, end_time: string, cost: string, dscript: string}}
   */
  getState() {
    return {
      loc: {
        name: 'loc',
        type: 'Location',
        value: null
      },
      begin_time: {
        name: 'begin_time',
        type: 'Begins',
        value: this.props.begin_time ? this.props.begin_time : null
      },
      end_time: {
        name: 'end_time',
        type: 'Ends',
        value: this.props.end_time ? this.props.end_time.toString() : null
      },
      cost: {
        name: 'cost',
        type: 'Cost',
        value: null
      },
      dscript: {
        name: 'dscript',
        type: 'Description',
        value: null
      }
    };
  }

  /**
   * TODO
   * @param tran
   * @returns {{method: *, loc: *, loc_end: *, begin_time, end_time, cost: (string|*), dscript: *, completed: number, priority: number}}
   */
  getAccom(tran) {
    return {
      loc: tran.loc_begin.value,
      begin_time: formatDateForMySql(tran.begin_time.value),
      end_time: formatDateForMySql(tran.end_time.value),
      cost: convertToNumber(tran.cost.value),
      dscript: tran.dscript.value,
      completed: 0,
      priority: 0
    };
  }

  /**************************** Visual component ****************************/

  render() {
    return (
      <div>
        <EventNewForm
          event={this.state}
          getEvent={this.getAccom}
          eventType={'accom'}
          begin_time={this.props.begin_time}
          end_time={this.props.end_time}
        />
      </div>
    );
  }
}

AccomNew.propTypes = {
  begin_time: PropTypes.object,
  end_time: PropTypes.object
};
