import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import EventField from '../event_fields/EventField';
import EventFieldEdit from '../event_fields/EventFieldEdit';

export class EventInfo extends Component {
  constructor(props) {
    super(props);
    this.state = props.state;
    this.onClick = this.onClick.bind(this);
  }

  /**
   * Reserves editing to just one field element at a time.
   * @param field to reserve edit mode for.
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
          onClick={this.onClick}
        />
      );
    } else {
      return <EventField field={field} onClick={this.onClick} />;
    }
  }

  /***************************** Core functions *****************************/

  /**
   * Either puts a field into edit mode or dispatches an update of the field.
   * @param field to be put into edit mode or be updated.
   * @param newValue to update plan object with.
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
      console.log('Updated state!', newValue, this.state);
      setTimeout(() => {
        // Buffer for render to complete
        this.props.onUpdate(this.props.getEvent());
      }, 500);
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
  state: PropTypes.object.isRequired
};
