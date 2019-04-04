import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import EventFieldView from './fields/EventFieldView';
import EventFieldEdit from './fields/EventFieldEdit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './fields/EventFieldView.css';
import { PriorityButton } from '../../global/PriorityButton';

export class EventInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.state;
    this.onEdit = this.onEdit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.togglePriority = this.togglePriority.bind(this);
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

  /**
   * Deletes an event.
   */
  onDelete() {
    this.props.onDelete(this.props.getEvent(this.state));
    this.props.close();
  }

  /**
   * Toggles the priority of an event.
   */
  togglePriority() {
    let priority = this.state.priority.value;
    priority = (priority + 1) % 3;
    this.onSave(this.state.priority.name, this.state.priority.type, priority);
  }

  /**************************** Visual component ****************************/

  render() {
    let fields = (
      <Table className="table-hover">
        <tbody>
          {Object.keys(this.state)
            .filter((field) => field !== 'priority')
            .map((field) => (
              <tr key={field}>{this.getField(this.state[field])}</tr>
            ))}
        </tbody>
      </Table>
    );

    return (
      <div>
        {fields}
        <div className="flex-wrap-center content-bottom align-center">
          <OverlayTrigger
            key="1"
            placement="left"
            overlay={<Tooltip>Delete Event</Tooltip>}
          >
            <div onClick={() => this.onDelete()}>
              <FontAwesomeIcon className="clickable med-icon red" icon="bomb" />
            </div>
          </OverlayTrigger>
          <PriorityButton
            handleChange={this.togglePriority}
            priority={this.state.priority.value}
          />
        </div>
      </div>
    );
  }
}

EventInfoForm.propTypes = {
  state: PropTypes.object.isRequired,
  getEvent: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};
