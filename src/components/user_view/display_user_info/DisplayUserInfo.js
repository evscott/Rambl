import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
  }

  /***************************** Core functions *****************************/

  /**************************** Visual component ****************************/

  render() {
    return (
      <div className="container">
        <div className="header">
          <h1>User info</h1>
        </div>
        <div>
          <p>{this.props.user.f_name}</p>
          <p>{this.props.user.l_name}</p>
          <p>{this.props.user.email}</p>
        </div>
        <Link to="/dashboard" className="btn btn-default">
          Back
        </Link>
        <Link to="/userinfo/edit" className="btn btn-primary">
          Edit
        </Link>
      </div>
    );
  }
}
