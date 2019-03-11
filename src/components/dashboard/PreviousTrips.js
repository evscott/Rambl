import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PreviousTrips extends Component {
  constructor(props) {
    super(props);
  }

  /***************************** Core functions *****************************/
  getAllPrevious(){
    const listItems = this.props.previous.map((trip) =>
      <div>
        <Link to={"/?id=" + trip.id + "&view=month"}>
          <p>{trip.name}</p>
        </Link>
        <p>{trip.dscript}</p>
      </div>
    );

    return(listItems);
  }

  /**************************** Visual component ****************************/
  render() {
    const allPrevious = this.getAllPrevious();

    return(
      <div className="container">
        <div className="header">
          <h1>Previous Trips</h1>
        </div>

        {allPrevious}
      </div>
    );
  }
}
