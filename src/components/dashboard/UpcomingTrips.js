import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UpcomingTrips extends Component {
  constructor(props) {
    super(props);
  }

  /***************************** Core functions *****************************/
  getAllUpcoming(){
    const listItems = this.props.upcoming.map((trip) =>
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
    const allUpcoming = this.getAllUpcoming();

    return(
      <div className="container">
        <div className="header">
          <h1>Upcoming Trips</h1>
        </div>

        {allUpcoming}
      </div>
    );
  }
}
