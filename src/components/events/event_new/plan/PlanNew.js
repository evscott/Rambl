import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDateForMySql } from '../../../../shared/dateFormatter';
import { EventNewForm } from '../EventNewForm';
import AccomNewContainer from '../../EventNewDirector';

export default class PlanNew extends Component {
  constructor(props) {
    super(props);
    this.state = this.getState();
    this.getPlan = this.getPlan.bind(this);
    this.getState = this.getState.bind(this);
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
      loc: null,
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
  getPlan(plan) {
    return {
      trip_id: this.props.trip_id,
      loc: plan.loc_begin,
      begin_time: formatDateForMySql(plan.begin_time),
      end_time: formatDateForMySql(plan.end_time),
      cost: plan.cost,
      dscript: plan.dscript,
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
          getEvent={this.getPlan}
          eventType={'plan'}
          begin_time={this.props.begin_time}
          end_time={this.props.end_time}
          addEvent={this.props.addPlan}
          close={this.props.close}
        />
      </div>
    );
  }
}

PlanNew.propTypes = {
  trip_id: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  begin_time: PropTypes.object,
  end_time: PropTypes.object
};
