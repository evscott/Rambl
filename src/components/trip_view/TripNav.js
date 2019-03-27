import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

/**
 *  TripNav displays the navigation required for any trip view,
 *  along with appropriate redirections
 */

export default class TripNav extends Component {
  /***************************** Core functions *****************************/
  handleSubmit(e) {
    e.preventDefault();
    this.props.onLogout();
  }

  /**************************** Visual component ****************************/
  render() {
    if (!this.props.isAuthenticated && !this.props.isFetching) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <div className="title">
            <h3>
              <span className="red">R</span>
              <span className="yellow">a</span>
              <span className="dark-blue">m</span>
              <span className="red">b</span>
              <span className="dark-blue">l</span>
            </h3>
          </div>

          <Link to="/dashboard">
            <Button className="btn btn-light">Dashboard</Button>
          </Link>

          {/* Logout button */}
          <Form name="logout" onSubmit={this.handleSubmit}>
            <Button className="btn btn-default" type="submit">
              Logout
            </Button>
          </Form>
        </div>
      );
    }
  }
}
