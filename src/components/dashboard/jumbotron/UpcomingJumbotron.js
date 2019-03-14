import React, { Component } from 'react';

export default class UpcomingJumbotron extends Component {
  /**************************** Visual component ****************************/
  render() {
    return (
      <div>
        <p>countdown component here</p>
        <p>until</p>
        <h2>{this.props.trip.name}</h2>
        <p>Highlight component here</p>
        <p>Notes: {this.props.trip.dscript}</p>
        <p>Stats component here</p>
      </div>
    );
  }
}
