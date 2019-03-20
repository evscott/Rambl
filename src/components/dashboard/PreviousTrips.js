import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 *  This component displays a list of all previous
 *  trips recorded by user
 */

export default class PreviousTrips extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasPrevious: this.props.previous && this.props.previous.length
    };
    this.getAllPrevious = this.getAllPrevious.bind(this);
    this.getPreviousDiv = this.getPreviousDiv.bind(this);
  }

  /**************************** Helper functions ****************************/
  // Get information for each previous trip
  getAllPrevious() {
    return this.props.previous.map((trip) => (
      <div key={trip.trip_id}>
        <Link to={'/trip?id=' + trip.trip_id + '&view=month'}>
          <p>{trip.name}</p>
        </Link>
        <p>{trip.dscript}</p>
      </div>
    ));
  }

  /***************************** Core functions *****************************/
  // Generate header and call to helper function if previous trips exist
  getPreviousDiv() {
    if (this.state.hasPrevious) {
      return (
        <div id="section-previous">
          <h1>Previous Trips</h1>
          {this.getAllPrevious()}
        </div>
      );
    }
  }

  /**************************** Visual component ****************************/
  render() {
    return <div>{this.getPreviousDiv()}</div>;
  }
}
