import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import EventField from '../event_fields/EventField';
import { usdFormatter } from '../../../shared/inputFormatter';
import { initiateEdit, finishEdit } from '../../global/EditButtons';
import EventFieldEdit from '../event_fields/EventFieldEdit';

export default class TranInfo extends Component {
  constructor(props) {
    super(props);
    this.state = this.getState(this.props.tran);

    this.onClick = this.onClick.bind(this);
  }

  /**************************** Helper functions ****************************/

  /**
   * Receives and formats the values of a tran from props.
   * @param tran
   * @returns {{method: string, loc_begin: string, loc_end: *,
   * begin_time: string, end_time: string, cost: string, dscript: string}}
   */
  getState(tran) {
    return {
      eventType: {
        name: 'eventType',
        type: 'Event type',
        value: tran.event_type,
        editMode: false
      },
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
   * TODO
   * @param field
   * @returns {*}
   */
  getField(field) {
    if (field.editMode === true) {
      return <EventFieldEdit fieldType={field.type} fieldValue={field.value} />;
    } else {
      return <EventField fieldType={field.type} fieldValue={field.value} />;
    }
  }

  /**
   * TODO
   * @param field
   * @param onClick
   * @returns {*}
   */
  getButton(field, onClick) {
    if (field.editMode === true) {
      return finishEdit(field, onClick);
    } else {
      return initiateEdit(field, onClick);
    }
  }

  /***************************** Core functions *****************************/

  /**
   * TODO
   * @param e
   */
  onClick(field) {
    console.log(this.state.method);
    this.setState({
      [field.name]: {
        name: field.name,
        type: field.type,
        value: field.value,
        editMode: !field.editMode
      }
    });
  }

  /**************************** Visual component ****************************/

  render() {
    return (
      <div>
        <Table className="table-hover">
          <tbody>
            <tr>{this.getField(this.state.eventType)}</tr>
            <tr>
              {this.getField(this.state.method)}
              {this.getButton(this.state.method, this.onClick)}
            </tr>
            <tr>
              {this.getField(this.state.loc_begin)}
              {this.getButton(this.state.loc_begin, this.onClick)}
            </tr>
            <tr>
              {this.getField(this.state.loc_end)}
              {this.getButton(this.state.loc_end, this.onClick)}
            </tr>
            <tr>
              {this.getField(this.state.begin_time)}
              {this.getButton(this.state.begin_time, this.onClick)}
            </tr>
            <tr>
              {this.getField(this.state.end_time)}
              {this.getButton(this.state.end_time, this.onClick)}
            </tr>
            <tr>
              {this.getField(this.state.cost)}
              {this.getButton(this.state.cost, this.onClick)}
            </tr>
            <tr>
              {this.getField(this.state.dscript)}
              {this.getButton(this.state.dscript, this.onClick)}
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

TranInfo.propTypes = {
  tran: PropTypes.object.isRequired
};
