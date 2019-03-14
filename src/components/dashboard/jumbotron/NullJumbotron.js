import React, { Component } from 'react';

export default class NullJumbotron extends Component {
  /**************************** Visual component ****************************/
  render() {
    return (
      <div>
        <p>You have no upcoming trips</p>
        <p>Create one now!</p>
      </div>
    );
  }
}
