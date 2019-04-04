import React, { Component } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { PriorityIndicator } from './PriorityIndicator';

/**
 * Generic edit button which accepts an onClick handler.
 */
export class PriorityButton extends Component {
  /**************************** Visual component ****************************/

  render() {
    return (
      <OverlayTrigger
        key={'1'}
        placement={'right'}
        overlay={<Tooltip>Your events priority!</Tooltip>}
      >
        <Button className={'priority-btn'} onClick={this.props.handleChange}>
          <PriorityIndicator priority={this.props.priority} />
        </Button>
      </OverlayTrigger>
    );
  }
}

PriorityButton.propTypes = {
  handleChange: PropTypes.func.isRequired,
  priority: PropTypes.any.isRequired
};
