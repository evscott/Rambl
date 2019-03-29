import React, { Component } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './UserInfoButton.css';
import PropTypes from 'prop-types';

export default class UserInfoButton extends Component {
  /**************************** Helper functions ****************************/

  /**
   * Dynamically changes the user icon depending on the minute of the hour.
   * Just for fun :3
   * @returns {string} the current user icon.
   */
  userIcon() {
    let thisMinute = new Date().getMinutes();
    switch (thisMinute % 10) {
      case 0:
        return 'grin-beam';
      case 1:
        return 'grin-wink';
      case 2:
        return 'grin-tongue';
      case 3:
        return 'grin-tongue-squint';
      case 4:
        return 'grin-tongue-wink';
      case 5:
        return 'laugh-beam';
      case 6:
        return 'grin-stars';
      case 7:
        return 'grin';
      case 8:
        return 'laugh-wink';
      case 9:
        return 'laugh';
      default:
        return 'grin-beam';
    }
  }

  /**************************** Visual component ****************************/

  render() {
    this.userIcon();
    return (
      <OverlayTrigger
        key={'1'}
        placement={'left'}
        overlay={
          <Tooltip>
            About <strong> you </strong>
          </Tooltip>
        }
      >
        <Button className={'user-info'} onClick={this.props.toggleShow}>
          <FontAwesomeIcon size={'lg'} icon={['fas', this.userIcon()]} />
        </Button>
      </OverlayTrigger>
    );
  }
}

UserInfoButton.propTypes = {
  toggleShow: PropTypes.func.isRequired
};
