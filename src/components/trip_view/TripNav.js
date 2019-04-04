import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './TripNav.css';
import UserInfo from '../user/UserInfo';

/**
 *  DashboardNav displays the navigation required on the dashboard,
 *  along with appropriate redirections
 */

export default class DashboardNav extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
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
              <span className="light-blue">m</span>
              <span className="red">b</span>
              <span className="dark-blue">l</span>
            </h3>
          </div>
          <div className="menu-items">
            <Link to="/dashboard">Dashboard</Link>

            {/* User Info */}
            <div className="usr-nav">
              <div className="menu-expand">
                <UserInfo />
              </div>
              <div className="usr-dropdown">
                {/* Logout button */}
                <div
                  className="dropdown-item"
                  onClick={(e) => this.handleLogout(e)}
                >
                  Logout
                </div>
              </div>
            </div>
          </div>
        </nav>
      );
    }
  }
}
