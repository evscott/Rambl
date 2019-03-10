import React, { Component } from 'react';

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
  }

  /***************************** Core functions *****************************/

  /**************************** Visual component ****************************/

  render() {
    return (
      <div>
        <div>
          <button className="btn btn-primary pull-right" type="submit">
            Edit
          </button>
        </div>
        <div>
          Display user mode
          <p>{this.props.user.f_name}</p>
          <p>{this.props.user.l_name}</p>
          <p>{this.props.user.email}</p>
        </div>
      </div>
    );
  }
}
