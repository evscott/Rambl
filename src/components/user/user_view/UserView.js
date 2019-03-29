import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './UserView.css';
import { EditButton } from '../../global/EditButton';

/**
 * This component simply displays a users information.
 */
export class UserView extends Component {
  /**************************** Visual component ****************************/

  render() {
    return (
      <div>
        <div>
          <p className={'margin-left display-inline'}>People know you as </p>
          <b className={'user-name'}>
            {this.props.f_name} {this.props.l_name}
          </b>
        </div>
        <div>
          <p className={'margin-left display-inline'}>People contact you at </p>
          <b className={'user-email'}>{this.props.email}</b>
        </div>
        <div className={'edit-button'}>
          <EditButton handleChange={this.props.onEdit} />
        </div>
      </div>
    );
  }
}

UserView.propTypes = {
  onEdit: PropTypes.func.isRequired
};
