import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 *  PreviousTrips displays a list of all previous
 *  trips recorded by user
 */

export default class PreviousTrips extends Component {
  /**************************** Helper functions ****************************/
  hasPrevious() {
    return this.props.previous && this.props.previous.length;
  }

  /**
   * Generates HTML for each previous trip
   * @returns {*} HTML for each trip in props.previous array
   */
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
  /**
   * Generate header and call to helper function if previous trips exist
   * @returns {*} All HTML for previous trips component
   */
  getPreviousDiv() {
    if (this.hasPrevious()) {
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
