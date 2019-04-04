import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './UserInfoButton.css';
import PropTypes from 'prop-types';

/**
 * Playful button which displays rotating emoji icons, and accepts
 * an onClick handler.
 */
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
      <div className="user-info flex-wrap-center align-center" onClick={this.props.toggleShow}>
        <div className="small-padding">{this.props.name}</div>
        <FontAwesomeIcon size={'lg'} icon={['fas', this.userIcon()]} />
      </div>
    );
  }
}

UserInfoButton.propTypes = {
  toggleShow: PropTypes.func.isRequired
};
