import React, { Component } from 'react';
import DboardJumbotronContainer from './jumbotron/DboardJumbotronContainer';
import UpcomingTripsContainer from './UpcomingTripsContainer';
import PreviousTripsContainer from './PreviousTripsContainer';
import DashboardNavContainer from './DashboardNavContainer';
import './Dashboard.css';
import UserInfoButton from './user_info_button/UserInfoButton';

/**
 *  Dashboard is a component that holds all of the dashboard helper components
 */

export default class Dashboard extends Component {
  /**************************** Visual component ****************************/
  render() {
    return (
      <div>
        <UserInfoButton />
        <div className="sidebar">
          <DashboardNavContainer />
        </div>
        <div className="container-right">
          <h1>Hello, {this.props.user.f_name}</h1>
          <DboardJumbotronContainer />
          <UpcomingTripsContainer />
          <PreviousTripsContainer />
        </div>
      </div>
    );
  }
}
