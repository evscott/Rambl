import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ThankYouMsg extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="container">
        <h1>Thank you</h1>
        <p>Your registration has been processed</p>
        <Link to="/" className="btn btn-default">
          Back
        </Link>
      </div>
    );
  }
}
