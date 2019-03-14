import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './EventFieldEdit.css';
import { FormInput } from '../../global/FormInput';
import Form from 'react-bootstrap/Form';

/**
 * EventField is a visual element for an event, which receives and displays
 * a field type and value.
 */

export default class EventFieldEdit extends Component {
  /***************************** Core functions *****************************/
  handleSubmit(e) {
    e.preventDefault();
  }

  handleChange(e) {}

  /**************************** Visual component ****************************/
  render() {
    return (
      <td>
        <Form name="form" className="form-inline" onSubmit={this.handleSubmit}>
          <FormInput
            displayName={this.props.fieldType}
            name={this.props.fieldType}
            type={this.props.fieldType}
            handleChange={this.handleChange}
            value={this.props.fieldValue}
          />
        </Form>
      </td>
    );
  }
}

EventFieldEdit.propTypes = {
  fieldType: PropTypes.string.isRequired,
  fieldValue: PropTypes.string.isRequired
};
