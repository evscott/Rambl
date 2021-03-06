import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Generic submit button which accepts an onClick handler.
 */
export class SubmitButton extends Component {
  /**************************** Visual component ****************************/

  render() {
    return (
      <Button size={'sm'} variant={'primary'} onClick={this.props.handleChange}>
        Submit
      </Button>
    );
  }
}

SubmitButton.propTypes = {
  handleChange: PropTypes.func.isRequired
};
