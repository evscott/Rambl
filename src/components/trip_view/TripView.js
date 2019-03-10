import React, { Component } from 'react';
import TripCalContainer from './cal/TripCalContainer';
import { CalViewOptions } from './cal/CalViewOptions';

export class TripView extends Component {
  render() {
    return (
      <div>
        <CalViewOptions history={this.props.history} />
        <TripCalContainer location={this.props.location} />
      </div>
    );
  }
}
