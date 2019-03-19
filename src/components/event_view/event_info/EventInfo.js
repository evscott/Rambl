import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import EventField from '../event_fields/EventField';
import EventFieldEdit from '../event_fields/EventFieldEdit';

export class EventInfo extends Component {
  constructor(props) {
    super(props);
    this.state = props.state;
    this.onEdit = this.onEdit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  /**
   * Reserves editing to just one field element at a time.
   * @param field to reserve edit mode for.
   */
  reserveEditMode(fieldName) {
    for (let f in this.state) {
      if (fieldName !== f) {
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
   * Gets either a editable or viewable field representing a value of a
   * plan object.
   * @param field to be retrieved.
   * @returns {*} either an editable or viewable field.
   */
  getField(field) {
    if (field.editMode === true) {
      return (
        <EventFieldEdit
          field={field}
          end_time={this.state.end_time}
          type={field.type}
          name={field.name}
          value={field.value}
          editMode={field.editMode}
          onCancel={this.onCancel}
          onSave={this.onSave}
        />
      );
    } else {
      return (
        <EventField
          field={field}
          type={field.type}
          name={field.name}
          value={field.value}
          editMode={field.editMode}
          onEdit={this.onEdit}
        />
      );
    }
  }

  /***************************** Core functions *****************************/

  /**
   *
   * @param field
   */
  onEdit(name, type, value, editMode) {
    this.reserveEditMode(name); // Reserve edit mode for this field
    this.setState({
      [name]: {
        name: name,
        type: type,
        value: value,
        editMode: !editMode
      }
    });
  }

  /**
   *
   * @param field
   */
  onCancel(name, type, value, editMode) {
    this.setState({
      [name]: {
        name: name,
        type: type,
        value: value,
        editMode: false
      }
    });
  }

  /**
   *
   * @param field
   * @param newValue
   */
  onSave(name, type, newValue, editMode) {
    this.setState({
      [name]: {
        name: name,
        type: type,
        value: newValue,
        editMode: false
      }
    });
  }

  /**************************** Visual component ****************************/

  render() {
    let fields = (
      <Table className="table-hover">
        <tbody>
          {Object.keys(this.state).map((field) => (
            <tr key={field}>{this.getField(this.state[field])}</tr>
          ))}
        </tbody>
      </Table>
    );

    return <div>{fields}</div>;
  }
}

EventInfo.propTypes = {
  state: PropTypes.object.isRequired,
  getEvent: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};
