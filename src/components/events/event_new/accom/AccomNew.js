import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDateForMySql } from '../../../../shared/dateFormatter';
import { EventNewForm } from '../EventNewForm';

export default class AccomNew extends Component {
  constructor(props) {
    super(props);
    this.state = this.getState();
    this.getAccom = this.getAccom.bind(this);
    this.getState = this.getState.bind(this);
  }

  /**************************** Helper functions ****************************/

  /**
   * Initializes an accom state using begin_time and end_time if provided.
   * @returns {{loc: null, cost: null, end_time: *, begin_time: *, dscript: null}}
   */
  getState() {
    return {
      loc: null,
      begin_time: this.props.begin_time ? this.props.begin_time : null,
      end_time: this.props.end_time ? this.props.end_time : null,
      cost: null,
      dscript: null
    };
  }

  /**
   * Gets an accom object formatted for MySql.
   * @param accom object to be formatted.
   * @returns {{loc: (null|loc_begin|{editMode, name, type, value}),
   * trip_id: String, cost: *, end_time, begin_time, dscript: *,
   * completed: number, priority: number}}
   */
  getAccom(accom) {
    return {
      trip_id: this.props.trip_id,
      loc: accom.loc_begin,
      begin_time: formatDateForMySql(accom.begin_time),
      end_time: formatDateForMySql(accom.end_time),
      cost: accom.cost,
      dscript: accom.dscript,
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
          addEvent={this.props.addAccom}
          close={this.props.close}
        />
      </div>
    );
  }
}

AccomNew.propTypes = {
  trip_id: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  begin_time: PropTypes.object,
  end_time: PropTypes.object
};
