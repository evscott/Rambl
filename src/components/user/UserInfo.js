import React, { Component } from 'react';
import UserInfoButton from './user_info_button/UserInfoButton';
import { UserModal } from './user_modal/UserModal';

/**
 *  TODO
 */
export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.toggleShow = this.toggleShow.bind(this);
  }

  /***************************** Core functions *****************************/

  /**
   * Toggles whether to show the user info modal or not.
   */
  toggleShow() {
    this.setState({ show: !this.state.show });
  }

  /**************************** Visual component ****************************/

  render() {
    return (
      <div>
        <UserInfoButton toggleShow={this.toggleShow} />
        <UserModal show={this.state.show} onHide={this.toggleShow} />
      </div>
    );
  }
}
