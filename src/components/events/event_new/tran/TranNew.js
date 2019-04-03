import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDateForMySql } from '../../../../shared/dateFormatter';
import { EventNewForm } from '../EventNewForm';
import '../EventNewForm.css';

export default class TranNew extends Component {
  constructor(props) {
    super(props);
    this.getTran = this.getTran.bind(this);
    this.getState = this.getState.bind(this);
  }

  /**************************** Helper functions ****************************/

  /**
   * Initializes a tran state using begin_time and end_time if provided.
   * @returns {{loc: null, cost: null, method: null, loc_end: null,
   * end_time: *, begin_time: *, dscript: null}}
   */
  getState() {
    return {
      method: null,
      loc: null, // This indicates the initial loc, but name is loc for consistency.
      loc_end: null,
      begin_time: this.props.begin_time ? this.props.begin_time : null,
      end_time: this.props.end_time ? this.props.end_time : null,
      cost: null,
      dscript: null
    };
  }

  /**
   * Gets a tran object formatted for MySql.
   * @param tran object to be formatted.
   * @returns {{loc: (null|loc|{editMode, name, type, value}),
   * trip_id: String, cost: *, method: *,
   * loc_end: (null|loc_end|{editMode, name, type, value}|string|*), end_time,
   * begin_time, dscript: *, completed: number, priority: number}}
   */
  getTran(tran) {
    console.log(tran);
    return {
      trip_id: this.props.trip_id,
      method: tran.method,
      loc: tran.loc,
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
          event={this.getState()}
          getEvent={this.getTran}
          eventType={'tran'}
          begin_time={this.props.begin_time}
          end_time={this.props.end_time}
          addEvent={this.props.addTran}
          close={this.props.close}
        />
      </div>
    );
  }
}

TranNew.propTypes = {
  trip_id: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  begin_time: PropTypes.object,
  end_time: PropTypes.object
};
