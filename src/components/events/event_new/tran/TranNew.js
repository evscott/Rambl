import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { convertToNumber } from '../../../../shared/currencyFormatter';
import { formatDateForMySql } from '../../../../shared/dateFormatter';
import { EventNewForm } from '../EventNewForm';
import '../EventNewForm.css';

export default class TranNew extends Component {
  constructor(props) {
    super(props);
    this.getTran = this.getTran.bind(this);
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
      method: null,
      loc_begin: null,
      loc_end: null,
      begin_time: this.props.begin_time ? this.props.begin_time : null,
      end_time: this.props.end_time ? this.props.end_time : null,
      cost: null,
      dscript: null
    };
  }

  /**
   * TODO
   * @param tran
   * @returns {{method: *, loc: *, loc_end: *, begin_time, end_time, cost: (string|*), dscript: *, completed: number, priority: number}}
   */
  getTran(tran) {
    return {
      method: tran.method,
      loc: tran.loc_begin,
      loc_end: tran.loc_end,
      begin_time: formatDateForMySql(tran.begin_time),
      end_time: formatDateForMySql(tran.end_time),
      cost: tran.cost,
      dscript: tran.dscript,
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
          getEvent={this.getTran}
          eventType={'tran'}
          begin_time={this.props.begin_time}
          end_time={this.props.end_time}
          addEvent={this.props.addTran}
        />
      </div>
    );
  }
}

TranNew.propTypes = {
  begin_time: PropTypes.object,
  end_time: PropTypes.object
};
