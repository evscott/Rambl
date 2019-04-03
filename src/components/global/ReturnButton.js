import React, { Component } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Generic return button which accepts an onClick handler.
 */
export class ReturnButton extends Component {
  render() {
    return (
      <OverlayTrigger
        key={'1'}
        placement={'left'}
        overlay={<Tooltip>Go back?</Tooltip>}
      >
        <Button
          size={'sm'}
          variant={'secondary'}
          onClick={this.props.handleChange}
        >
          <FontAwesomeIcon icon={['fas', 'long-arrow-alt-left']} />
        </Button>
      </OverlayTrigger>
    );
  }
}

ReturnButton.propTypes = {
  handleChange: PropTypes.func.isRequired
};
