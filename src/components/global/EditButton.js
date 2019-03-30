import React, { Component } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Generic edit button which accepts an onClick handler.
 */
export class EditButton extends Component {
  render() {
    return (
      <OverlayTrigger
        key={'1'}
        placement={'left'}
        overlay={<Tooltip>Want to change this?</Tooltip>}
      >
        <Button
          size={'sm'}
          variant={'success'}
          onClick={this.props.handleChange}
        >
          <FontAwesomeIcon icon={['fas', 'pencil-alt']} />
        </Button>
      </OverlayTrigger>
    );
  }
}

EditButton.propTypes = {
  handleChange: PropTypes.func.isRequired
};
