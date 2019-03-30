import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

export class TogglePasswordChange extends Component {
  /**************************** Visual component ****************************/
  render() {
    return (
      <div>
        <Form.Group>
          <Form.Check
            label="Change password"
            type={'checkbox'}
            key={1}
            onChange={this.props.toggle}
          />
        </Form.Group>
      </div>
    );
  }
}

TogglePasswordChange.propTypes = {
  toggle: PropTypes.func.isRequired
};
