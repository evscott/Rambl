import React, { Component } from 'react';

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        <h1> {this.props.f_name} </h1>
        <h1> {this.props.l_name} </h1>
        <h1> {this.props.email} </h1>
      </div>
    );
  }
}
