import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import EventField from '../event_fields/EventField';
import EventFieldEdit from '../event_fields/EventFieldEdit';
import {
  usdFormatter,
  convertToNumber
} from '../../../shared/currencyFormatter';
import { formatDateForMySql } from '../../../shared/dateFormatter';

export default class PlanInfo extends Component {
  constructor(props) {
    super(props);
    this.state = this.getState(this.props.plan);
    this.getPlan = this.getPlan.bind(this);
    this.onClick = this.onClick.bind(this);
    this.getField = this.getField.bind(this);
    this.reserveEditMode = this.reserveEditMode.bind(this);
  }

  /**************************** Helper functions ****************************/

  /**
   * Receives and formats the values of a plan event from props.
   * @param plan
   * @returns {{method: string, loc_begin: string, loc_end: *,
   * begin_time: string, end_time: string, cost: string, dscript: string}}
   */
  getState(plan) {
    return {
      loc: {
        name: 'loc',
        type: 'Location',
        value: plan.loc ? plan.loc : 'unspecified',
        editMode: false
      },
      begin_time: {
        name: 'begin_time',
        type: 'Begins',
        value: plan.begin_time.toString(),
        editMode: false
      },
      end_time: {
        name: 'end_time',
        type: 'Ends',
        value: plan.end_time.toString(),
        editMode: false
      },
      cost: {
        name: 'cost',
        type: 'Cost',
        value: plan.cost ? usdFormatter.format(plan.cost) : 'unspecified',
        editMode: false
      },
      dscript: {
        name: 'dscript',
        type: 'Description',
        value: plan.dscript ? plan.dscript : 'unspecified',
        editMode: false
      }
    };
  }

  /**
   *
   */
  getPlan() {
    return {
      e_id: this.props.plan.e_id,
      trip_id: this.props.plan.trip_id,
      loc: this.state.loc.value,
      begin_time: formatDateForMySql(this.state.begin_time.value),
      end_time: formatDateForMySql(this.state.end_time.value),
      cost: convertToNumber(this.state.cost.value),
      dscript: this.state.dscript.value,
      completed: 0,
      priority: 0
    };
  }

  /**
   * TODO
   * @param field
   */
  reserveEditMode(field) {
    for (let f in this.state) {
      if (field.name !== f) {
        this.setState({
          [f]: {
            ...this.state[f],
            editMode: false
          }
        });
      }
    }
  }

  /**
   * TODO
   * @param field
   * @returns {*}
   */
  getField(field) {
    if (field.editMode === true) {
      return (
        <EventFieldEdit
          field={field}
          end_time={this.state.end_time}
          onClick={this.onClick}
        />
      );
    } else {
      return <EventField field={field} onClick={this.onClick} />;
    }
  }

  /***************************** Core functions *****************************/

  /**
   * TODO
   * @param e
   */
  onClick(field, newValue) {
    this.reserveEditMode(field); // Reserve edit mode for this field
    if (newValue) {
      this.setState({
        [field.name]: {
          ...field,
          editMode: !field.editMode,
          value: newValue
        }
      });
      setTimeout(() => {
        // Buffer for render to complete
        this.props.onUpdate(this.getPlan());
      }, 100);
    } else {
      this.setState({
        [field.name]: {
          ...field,
          editMode: !field.editMode
        }
      });
    }
  }

  /**************************** Visual component ****************************/

  render() {
    return (
      <div>
        <Table className="table-hover">
          <tbody>
            <tr>{this.getField(this.state.loc)}</tr>
            <tr>{this.getField(this.state.begin_time)}</tr>
            <tr>{this.getField(this.state.end_time)}</tr>
            <tr>{this.getField(this.state.cost)}</tr>
            <tr>{this.getField(this.state.dscript)}</tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

PlanInfo.propTypes = {
  plan: PropTypes.object.isRequired
};
