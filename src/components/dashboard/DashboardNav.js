import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import NewTripModal from './NewTripModal';
import './DashboardNav.css';
import UserInfo from '../user/UserInfo';

/**
 *  DashboardNav displays the navigation required on the dashboard,
 *  along with appropriate redirections
 */

export default class DashboardNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewTrip: false
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.startCreateEvent = this.startCreateEvent.bind(this);
    this.quitCreateEvent = this.quitCreateEvent.bind(this);
  }

  /***************************** Core functions *****************************/
  /**
   * Logs user out
   * @param e click event
   */
  handleLogout(e) {
    e.preventDefault();
    this.props.onLogout();
  }

  /**
   * This closes the create trip modal.
   */
  quitCreateEvent() {
    this.setState({ showNewTrip: false });
  }

  /**
   * This opens the create trip modal.
   * @param e click event
   */
  startCreateEvent(e) {
    e.preventDefault();
    this.setState({ showNewTrip: true });
  }

  /**************************** Visual component ****************************/
  render() {
    if (!this.props.isAuthenticated && !this.props.isFetching) {
      return <Redirect to="/" />;
    } else {
      return (
        <nav>
          <div className="name">
            <h3>
              <span className="red">R</span>
              <span className="yellow">a</span>
              <span className="dark-blue">m</span>
              <span className="red">b</span>
              <span className="dark-blue">l</span>
            </h3>
          </div>
          <div className="menu-items">
            <a className="page-scroll" href="#section-upcoming">
              Upcoming Trips
            </a>
            <a className="page-scroll" href="#section-previous">
              Previous Trips
            </a>

            {/* New Trip Control */}
            <Form name="new-trip" onSubmit={this.startCreateEvent}>
              <Button className="btn btn-default" type="submit">
                Add Trip
              </Button>
            </Form>
            <NewTripModal
              show={this.state.showNewTrip}
              onHide={this.quitCreateEvent}
            />

            {/* User Info */}
            <UserInfo/>

            {/* Logout button */}
            <Form name="logout" onSubmit={this.handleLogout}>
              <Button className="btn btn-default" type="submit">
                Logout
              </Button>
            </Form>
          </div>
        </nav>
      );
    }
  }
}
