import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    console.log(props.user.f_name);
  }

  render() {
    return (
      <div>
        <h1> Eyy {this.props.user.f_name} </h1>
      </div>
    );
  }
}
