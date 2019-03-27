import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDateForMySql } from '../../../../shared/dateFormatter';
import { EventNewForm } from '../EventNewForm';

export default class PlanNew extends Component {
  constructor(props) {
    super(props);
    this.getPlan = this.getPlan.bind(this);
    this.getState = this.getState.bind(this);
  }

  /**************************** Helper functions ****************************/

  /**
   * Initializes a plan state using begin_time and end_time if provided.
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
   * Gets a plan object formatted for MySql. If plan object contains a true
   * useDates variable, then dates are used else the plan is added without
   * dates.
   * @param plan object to be formatted, containing useDates flag.
   * @returns {*} plan object formatted for MySql, containing or not
   * containing dates.
   */
  getPlan(plan) {
    if (plan.useDates)
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
    else
      return {
        trip_id: this.props.trip_id,
        loc: plan.loc_begin,
        begin_time: null,
        end_time: null,
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
          event={this.getState()}
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
