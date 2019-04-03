import React, { Component } from 'react';
import DboardJumbotronContainer from './jumbotron/DboardJumbotronContainer';
import UpcomingTripsContainer from './UpcomingTripsContainer';
import PreviousTripsContainer from './PreviousTripsContainer';
import DashboardNavContainer from './DashboardNavContainer';
import './Dashboard.css';

/**
 *  Dashboard is a component that holds all of the dashboard helper components
 */

export default class Dashboard extends Component {
  /**************************** Visual component ****************************/
  render() {
    return (
      <div>
        <div className="top-bar">
          <DashboardNavContainer />
        </div>
        <DboardJumbotronContainer />
        <UpcomingTripsContainer />
        <PreviousTripsContainer />
      </div>
    );
  }
}
