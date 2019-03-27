import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import '../EventNewForm.css';

export class ToggleUseDates extends Component {
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
              onChange={this.props.toggleUseDates}
            />
          </Form.Group>
        </div>
      );
    else return null;
  }
}

ToggleUseDates.propTypes = {
  eventType: PropTypes.string.isRequired,
  toggleUseDates: PropTypes.func.isRequired
};
