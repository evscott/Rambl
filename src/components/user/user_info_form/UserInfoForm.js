import React, { Component } from 'react';
import './UserInfoForm.css';

export class UserInfoForm extends Component {
  /**************************** Visual component ****************************/

  render() {
    return (
      <div>
        <div>
          <p className={'display-inline'}>People know you as </p>
          <b className={'user-name'}>
            {this.props.f_name} {this.props.l_name}
          </b>
        </div>
        <div>
          <p className={'display-inline'}>People contact you at </p>
          <b className={'user-email'}>{this.props.email}</b>
        </div>
      </div>
    );
  }
}
