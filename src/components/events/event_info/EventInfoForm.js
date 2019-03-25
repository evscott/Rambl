import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import EventFieldView from '../event_fields/EventFieldView';
import EventFieldEdit from '../event_fields/EventFieldEdit';

export class EventInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.state;
    this.onEdit = this.onEdit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  /**
   * Reserves editing to just one field element at a time.
   * @param fieldName to reserve edit mode for.
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
   * Gets either an editable or viewable field representing a value of a
   * plan object.
   * @param field to be retrieved.
   * @returns {*} either an editable or viewable field.
   */
  getField(field) {
    if (field.editMode) {
      return (
        <EventFieldEdit
          field={field}
          end_time={this.state.end_time}
          type={field.type}
          name={field.name}
          value={field.value}
          onCancel={this.onCancel}
          onSave={this.onSave}
        />
      );
    } else {
      return (
        <EventFieldView
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
   * Switch field into or out of edit mode.
   * @param name of field.
   * @param type of field.
   * @param value of field.
   * @param editMode to be flipped.
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
   * Cancel update.
   * @param name of field.
   * @param type of field.
   * @param value of field.
   */
  onCancel(name, type, value) {
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
   * On save update event with new value.
   * @param name of field.
   * @param type of field.
   * @param newValue of field to be updated.
   */
  onSave(name, type, newValue) {
    this.setState(
      {
        [name]: {
          name: name,
          type: type,
          value: newValue,
          editMode: false
        }
      },
      () => {
        // Wait for async set state to complete then update event
        this.props.onUpdate(this.props.getEvent(this.state));
      }
    );
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

EventInfoForm.propTypes = {
  state: PropTypes.object.isRequired,
  getEvent: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};
