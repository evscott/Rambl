import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import EventField from '../event_fields/EventField';
import EventFieldEdit from '../event_fields/EventFieldEdit';
import {
  usdFormatter,
  convertToNumber
} from '../../../shared/currencyFormatter';
import { formatForMysql } from '../../../shared/dateFormatter';

export default class TranInfo extends Component {
  constructor(props) {
    super(props);
    this.state = this.getState(this.props.tran);
    this.getTran = this.getTran.bind(this);
    this.onClick = this.onClick.bind(this);
    this.getField = this.getField.bind(this);
    this.reserveEditMode = this.reserveEditMode.bind(this);
  }

  /**************************** Helper functions ****************************/

  /**
   * Receives and formats the values of a tran event from props.
   * @param tran
   * @returns {{method: string, loc_begin: string, loc_end: *,
   * begin_time: string, end_time: string, cost: string, dscript: string}}
   */
  getState(tran) {
    return {
      method: {
        name: 'method',
        type: 'Method',
        value: tran.method ? tran.method : 'unspecified',
        editMode: false
      },
      loc_begin: {
        name: 'loc_begin',
        type: 'Departing from',
        value: tran.loc ? tran.loc : 'unspecified',
        editMode: false
      },
      loc_end: {
        name: 'loc_end',
        type: 'Arriving to',
        value: tran.loc_end ? tran.loc_end : 'unspecified',
        editMode: false
      },
      begin_time: {
        name: 'begin_time',
        type: 'Begins',
        value: tran.begin_time.toString(),
        editMode: false
      },
      end_time: {
        name: 'end_time',
        type: 'Ends',
        value: tran.end_time.toString(),
        editMode: false
      },
      cost: {
        name: 'cost',
        type: 'Cost',
        value: tran.cost ? usdFormatter.format(tran.cost) : 'unspecified',
        editMode: false
      },
      dscript: {
        name: 'dscript',
        type: 'Description',
        value: tran.dscript ? tran.dscript : 'unspecified',
        editMode: false
      }
    };
  }

  /**
   *
   */
  getTran() {
    return {
      e_id: this.props.tran.e_id,
      trip_id: this.props.tran.trip_id,
      method: this.state.method.value,
      loc: this.state.loc_begin.value,
      loc_end: this.state.loc_end.value,
      begin_time: formatForMysql(this.state.begin_time.value),
      end_time: formatForMysql(this.state.end_time.value),
      cost: convertToNumber(this.state.cost.value),
      dscript: this.state.dscript.value,
      completed: 0,
      priority: 0
    };
  }

  /**
   *
   * @param field
   */
  reserveEditMode(field) {
    for (let f in this.state) {
      if (field.name != f) {
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
      console.log(this.getTran());
      // this.props.onUpdate(this.getTran());
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
            <tr>{this.getField(this.state.method)}</tr>
            <tr>{this.getField(this.state.loc_begin)}</tr>
            <tr>{this.getField(this.state.loc_end)}</tr>
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

TranInfo.propTypes = {
  tran: PropTypes.object.isRequired
};
