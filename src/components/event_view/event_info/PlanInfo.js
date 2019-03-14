import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import EventField from '../event_fields/EventField';
import { usdFormatter } from '../../../shared/inputFormatter';
import { editEventButton } from '../EditEventButton';
import '../EventView.css';

export default class PlanInfo extends Component {
  constructor(props) {
    super(props);
    this.state = this.getState(this.props.plan);
  }

  /**************************** Helper functions ****************************/

  /**
   * Receives and formats the values of a plan from props.
   * @param plan
   * @returns {{eventType: *, loc: string, begin_time: string, end_time: string,
   * cost: string, dscript: string}}
   */
  getState(plan) {
    return {
      e_id: plan.e_id,
      trip_id: plan.trip_id,
      eventType: plan.eventType,
      loc: plan.loc ? plan.loc : 'unspecified',
      begin_time: plan.begin_time.toString(),
      end_time: plan.end_time.toString(),
      cost: plan.cost ? usdFormatter.format(305.2) : 'unspecified',
      dscript: plan.dscript ? plan.dscript : 'unspecified'
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
              <EventField fieldType={'Event type'} fieldValue={'Plan'} />
            </tr>
            <tr>
              <EventField fieldType={'Location'} fieldValue={this.state.loc} />
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

PlanInfo.propTypes = {
  plan: PropTypes.object.isRequired
};
