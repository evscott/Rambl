import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import '../EventNewForm.css';

export class ToggleDisplayDates extends Component {
  render() {
    if (this.props.eventType === 'plan')
      // display toggle display dates field
      return (
        <div>
          <Form.Group>
            <Form.Check
              label="Ignore dates"
              type={'checkbox'}
              key={1}
              onChange={this.props.toggleDisplayDates}
            />
          </Form.Group>
        </div>
      );
    else return null;
  }
}

ToggleDisplayDates.propTypes = {
  eventType: PropTypes.string.isRequired,
  toggleDisplayDates: PropTypes.func.isRequired
};
